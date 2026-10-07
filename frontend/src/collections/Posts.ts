import { type CollectionConfig, slugField } from 'payload';

// Opens the post through the draft-mode route, which checks the admin login.
function previewUrl(slug: unknown) {
  if (typeof slug !== 'string' || !slug) {
    return null;
  }
  const params = new URLSearchParams({
    path: `/posts/${encodeURIComponent(slug)}`,
  });
  return `/next/preview?${params}`;
}

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    // The REST API is public; visitors only ever see published versions.
    read: ({ req: { user } }) =>
      user ? true : { _status: { equals: 'published' } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => previewUrl(data?.slug),
    },
    preview: (data) => previewUrl(data?.slug),
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 99,
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 999,
      admin: {
        description: 'One or two sentences for search results and link previews.',
      },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'The polaroid photo shown with the post.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description:
          'Shown as the post date. A future date keeps a published post hidden until midday UTC that day.',
      },
    },
    slugField({ position: 'sidebar' }),
  ],
  versions: {
    drafts: {
      // Autosaved drafts are what Live Preview renders while she types;
      // visitors keep seeing the published version until she publishes.
      autosave: { interval: 800 },
    },
    maxPerDoc: 50,
  },
};
