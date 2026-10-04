import path from 'path';
import type { CollectionConfig } from 'payload';

// Not in Media's folder: Media is public, and its file route serves anything
// under its folder, subfolders included. A volume in production (see
// docker-compose.yml); `frontend/feedback-uploads` locally.
const screenshotDir = path.resolve(process.cwd(), 'feedback-uploads');

// Kept apart from Media so screenshots never show up in the cover picker or
// get cover crops, and stay private: Payload's default access needs a login,
// for the files too.
export const FeedbackScreenshots: CollectionConfig = {
  slug: 'feedback-screenshots',
  labels: { singular: 'Feedback screenshot', plural: 'Feedback screenshots' },
  admin: {
    group: 'Feedback',
  },
  fields: [],
  upload: {
    staticDir: screenshotDir,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: { format: 'webp', options: { quality: 85 } },
  },
};
