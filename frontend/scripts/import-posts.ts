/**
 * One-off import of the pre-CMS posts into a running site through its REST
 * API: `content/posts/<slug>.mdx` (frontmatter plus Markdown) and the cover
 * `public/covers/<slug>.webp`. Talking to the API rather than a database
 * means the target's own upload pipeline crops and converts the covers, and
 * the same run works against development and production.
 *
 *   IMPORT_URL=http://localhost:5000 IMPORT_EMAIL=… IMPORT_PASSWORD=… \
 *     pnpm payload run scripts/import-posts.ts
 *
 * On a site with no users yet it registers IMPORT_EMAIL as the first admin,
 * which also closes the admin's open "create first user" screen. Posts whose
 * slug already exists are skipped, so a failed run can simply be repeated.
 */
import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

import configPromise from '../src/payload.config';

const postsDir = path.resolve('content/posts');
const coversDir = path.resolve('public/covers');

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name}`);
  }
  return value;
}

const baseUrl = requireEnv('IMPORT_URL').replace(/\/$/, '');
const email = requireEnv('IMPORT_EMAIL');
const password = requireEnv('IMPORT_PASSWORD');

async function api<T>(route: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}/api${route}`, init);
  if (!response.ok) {
    throw new Error(
      `${init.method ?? 'GET'} ${route}: ${response.status} ${await response.text()}`
    );
  }
  return response.json() as Promise<T>;
}

async function authenticate() {
  const body = JSON.stringify({ email, password });
  const headers = { 'Content-Type': 'application/json' };
  const { initialized } = await api<{ initialized: boolean }>('/users/init');
  const route = initialized ? '/users/login' : '/users/first-register';
  const { token } = await api<{ token: string }>(route, {
    method: 'POST',
    headers,
    body,
  });
  console.log(initialized ? 'Logged in' : `Registered ${email} as first admin`);
  return { Authorization: `JWT ${token}` };
}

type Frontmatter = { title: string; description?: string; publishedAt: string };

/**
 * Rewrites the few spots where the posts' MDX and Lexical's Markdown import
 * disagree: Lexical leaves `_text_` literal when it touches punctuation, as
 * in `‘_simple_’`, but accepts `*text*` there; and its line-based rules
 * (such as `---` for a divider) miss lines that end in `\r`.
 */
function toLexicalMarkdown(markdown: string) {
  return (
    markdown
      .replace(/\r\n/g, '\n')
      // Odd parts are link targets `](…)`, whose underscores are URL text.
      .split(/(\]\([^)]*\))/)
      .map((part, index) =>
        index % 2
          ? part
          : part.replace(/(?<![\w\\])_(?=\S)([^_\n]+?)(?<=\S)_(?!\w)/g, '*$1*')
      )
      .join('')
  );
}

// Lexical's IS_SUPERSCRIPT text format flag.
const SUPERSCRIPT = 64;

type LexicalNode = {
  type: string;
  text?: string;
  // A bit set on text nodes; alignment such as 'left' on element nodes.
  format?: number | string;
  children?: LexicalNode[];
};

/** Markdown has no superscript, so `<sup>…</sup>` arrives as literal text. */
function liftSuperscripts(node: LexicalNode) {
  if (!node.children) {
    return;
  }
  node.children = node.children.flatMap((child) => {
    liftSuperscripts(child);
    if (child.type !== 'text' || !child.text?.includes('<sup>')) {
      return [child];
    }
    return child.text
      .split(/(<sup>[\s\S]*?<\/sup>)/)
      .filter(Boolean)
      .map((part) => {
        const sup = part.match(/^<sup>([\s\S]*)<\/sup>$/);
        return sup
          ? { ...child, text: sup[1], format: Number(child.format ?? 0) | SUPERSCRIPT }
          : { ...child, text: part };
      });
  });
}

// The posts' frontmatter is flat `key: value` lines, so no YAML parser.
function parsePost(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('No frontmatter');
  }
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':');
    if (separator > 0) {
      fields[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
  }
  if (!fields.title || !/^\d{4}-\d{2}-\d{2}$/.test(fields.publishedAt ?? '')) {
    throw new Error('Frontmatter needs title and publishedAt (YYYY-MM-DD)');
  }
  return {
    frontmatter: fields as Frontmatter,
    markdown: match[2].trim(),
  };
}

async function main() {
  const config = await configPromise;
  const editorConfig = await editorConfigFactory.default({ config });
  const auth = await authenticate();

  const files = (await readdir(postsDir)).filter((file) => file.endsWith('.mdx'));
  for (const file of files.sort()) {
    const slug = path.basename(file, '.mdx');
    const existing = await api<{ totalDocs: number }>(
      `/posts?${new URLSearchParams({ 'where[slug][equals]': slug, draft: 'true', limit: '1' })}`,
      { headers: auth }
    );
    if (existing.totalDocs > 0) {
      console.log(`skip ${slug}: already imported`);
      continue;
    }

    const { frontmatter, markdown } = parsePost(
      await readFile(path.join(postsDir, file), 'utf-8')
    );

    const upload = new FormData();
    upload.append(
      'file',
      new Blob([await readFile(path.join(coversDir, `${slug}.webp`))], {
        type: 'image/webp',
      }),
      `${slug}.webp`
    );
    // Required by the API even with no fields; alt falls back to the title.
    upload.append('_payload', JSON.stringify({}));
    const { doc: cover } = await api<{ doc: { id: number } }>('/media', {
      method: 'POST',
      headers: auth,
      body: upload,
    });

    const body = convertMarkdownToLexical({
      editorConfig,
      markdown: toLexicalMarkdown(markdown),
    });
    liftSuperscripts(body.root as unknown as LexicalNode);

    await api('/posts', {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: frontmatter.title,
        description: frontmatter.description,
        // Noon UTC is the same calendar day in London all year.
        publishedAt: `${frontmatter.publishedAt}T12:00:00.000Z`,
        cover: cover.id,
        body,
        // Keep the existing URLs rather than regenerating them from titles.
        slug,
        generateSlug: false,
        _status: 'published',
      }),
    });
    console.log(`imported ${slug}`);
  }
}

await main();
process.exit(0);
