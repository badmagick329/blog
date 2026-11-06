import path from 'path';
import type { CollectionConfig } from 'payload';

import { applyImageCrop, requireImageRatio } from './media-shape';

// A volume in production (see docker-compose.yml); `frontend/media` locally.
const mediaDir = process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media');

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Upload photos as they are: you crop each one to the site’s landscape shape, and it is converted to WebP and resized automatically.',
  },
  hooks: {
    beforeOperation: [applyImageCrop],
    beforeValidate: [requireImageRatio],
  },
  fields: [
    {
      // The 10:7 crop for a newly picked file, in percent. Shown as the
      // cropper, which opens as soon as a file is picked (the component says
      // why it is a field). Virtual: `media-shape.ts` applies it to the file
      // and drops it, so it is never stored.
      name: 'crop',
      type: 'json',
      virtual: true,
      admin: {
        components: {
          Field: '/components/admin/image-cropper#ImageCropper',
        },
        disableBulkEdit: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
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
    // Every image is cropped to 10:7 on upload (`media-shape.ts`), so the
    // `cover` size is a plain resize: a focal point has nothing to choose,
    // and Payload's free-form crop tool would break the shape. Turning both
    // off also removes Payload's "Edit image" button.
    focalPoint: false,
    crop: false,
    // Bulk upload has its own form state that the cropper cannot reach, so
    // images are added one at a time.
    bulkUpload: false,
    // Caps the stored original: phone photos are several megabytes and far
    // larger than the site shows.
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
        // skipped, so every image has an 800 px version.
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
