import { postgresAdapter } from '@payloadcms/db-postgres';
import {
  FixedToolbarFeature,
  LinkFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Media } from './collections/Media';
import { Posts } from './collections/Posts';
import { Users } from './collections/Users';
import { migrations } from './migrations';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Features with no use on this site: posts never embed relationship cards or
// checklists, and the default link feature is replaced by one that can link
// to other posts.
const droppedFeatures = new Set(['checklist', 'link', 'relationship']);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Krista Lomu',
    },
  },
  collections: [Posts, Media, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter(({ key }) => !droppedFeatures.has(key)),
      LinkFeature({ enabledCollections: ['posts'] }),
      // The client isn't technical; a visible toolbar beats discovering the
      // selection toolbar and Markdown shortcuts.
      FixedToolbarFeature(),
    ],
  }),
  // Payload refuses to start without these, so a missing value fails at the
  // first request rather than at build time, when images are built without
  // any runtime secrets.
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Production applies pending migrations on start; development pushes the
    // schema straight from this config.
    prodMigrations: migrations,
  }),
  graphQL: {
    disable: true,
  },
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
