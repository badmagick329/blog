import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

// Builders for rich-text default values, so globals can be seeded with the
// site's current wording without a data migration. The node shapes match what
// Payload's Lexical editor saves.

type Node = Record<string, unknown>;
type Inline = string | Node;

const block = { format: '', indent: 0, version: 1, direction: 'ltr' };

function inline(children: Inline[]): Node[] {
  return children.map((child) =>
    typeof child === 'string' ? text(child) : child
  );
}

export function text(value: string, format = 0): Node {
  return {
    type: 'text',
    text: value,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  };
}

export const italic = (value: string) => text(value, 2);

export function link(value: string, url: string): Node {
  return {
    ...block,
    type: 'link',
    version: 3,
    fields: { linkType: 'custom', url, newTab: false },
    children: [text(value)],
  };
}

export function p(...children: Inline[]): Node {
  return {
    ...block,
    type: 'paragraph',
    textFormat: 0,
    textStyle: '',
    children: inline(children),
  };
}

export function h2(value: string): Node {
  return { ...block, type: 'heading', tag: 'h2', children: [text(value)] };
}

export function ul(...items: Inline[][]): Node {
  return {
    ...block,
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map((children, index) => ({
      ...block,
      type: 'listitem',
      value: index + 1,
      children: inline(children),
    })),
  };
}

export function doc(...children: Node[]): DefaultTypedEditorState {
  return {
    root: { ...block, type: 'root', children },
  } as unknown as DefaultTypedEditorState;
}
