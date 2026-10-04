import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { Field, GlobalConfig } from 'payload';

// Each page's copy is a global. Their defaults are the wording the site had
// before it became editable: Payload returns them for a global that has never
// been saved, so a fresh database shows the same site with no seeding.

/** Opens `path` through the draft-mode route, which checks the admin login. */
export function previewUrl(path: string) {
  return `/next/preview?${new URLSearchParams({ path })}`;
}

export function copyGlobal({
  slug,
  label,
  path,
  description,
  fields,
}: {
  slug: string;
  label: string;
  /** The page Live Preview opens; site-wide copy previews on the home page. */
  path: string;
  description?: string;
  fields: Field[];
}): GlobalConfig {
  const url = previewUrl(path);
  return {
    slug,
    label,
    // Pages read globals through the local API; the REST API has no need to
    // show anyone drafts.
    access: {
      read: ({ req: { user } }) => Boolean(user),
    },
    admin: {
      group: 'Site copy',
      description,
      livePreview: { url },
      preview: () => url,
    },
    versions: {
      drafts: { autosave: { interval: 800 } },
      max: 50,
    },
    fields,
  };
}

type FieldOptions = { label?: string; description?: string };

export function text(
  name: string,
  defaultValue: string,
  { label, description }: FieldOptions = {}
): Field {
  return {
    name,
    type: 'text',
    label,
    required: true,
    defaultValue,
    admin: { description },
  };
}

export function textarea(
  name: string,
  defaultValue: string,
  { label, description }: FieldOptions = {}
): Field {
  return {
    name,
    type: 'textarea',
    label,
    required: true,
    defaultValue,
    admin: { description },
  };
}

export function richText(
  name: string,
  defaultValue: DefaultTypedEditorState,
  { label, description }: FieldOptions = {}
): Field {
  return {
    name,
    type: 'richText',
    label,
    required: true,
    defaultValue,
    admin: { description },
  };
}

export function group(
  name: string,
  label: string,
  fields: Field[],
  description?: string
): Field {
  return { name, type: 'group', label, admin: { description }, fields };
}

/** Title and description for the browser tab, search results and shares. */
export function meta(title: string, description?: string): Field {
  return group('meta', 'Search and link previews', [
    text('title', title, { description: 'Shown in the browser tab.' }),
    {
      name: 'description',
      type: 'textarea',
      defaultValue: description,
      admin: {
        description:
          'One or two sentences for search results and link previews.',
      },
    },
  ]);
}
