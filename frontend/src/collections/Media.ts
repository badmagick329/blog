import path from 'path';
import type { CollectionConfig } from 'payload';

// A volume in production (see docker-compose.yml); `frontend/media` locally.
const mediaDir = process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media');

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Upload photos as they are: they are converted to WebP and resized automatically. Set the focal point so the cover crop keeps the important part.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Describes the image for people who cannot see it. Covers fall back to the post title.',
      },
    },
  ],
  upload: {
    staticDir: mediaDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    focalPoint: true,
    crop: true,
    // The original is kept so a cover can be re-cropped later, but capped:
    // phone photos are several megabytes and far larger than the site shows.
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      {
        // Covers are shown at most ~430 CSS px wide, so 800 px covers
        // high-density screens. Small uploads are enlarged rather than
        // skipped, so every cover has the 1 : 0.7 shape.
        name: 'cover',
        width: 800,
        height: 560,
        withoutEnlargement: false,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
    adminThumbnail: 'cover',
  },
};
