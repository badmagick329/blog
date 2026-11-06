/**
 * One-off: re-crops every Media image that is not 10:7 to its largest
 * centered 10:7 box, for images uploaded before the site required that
 * shape (`src/lib/image-ratio.ts`). Until they are re-cropped, the Media hooks
 * refuse to save them.
 *
 * It works through the target site's REST API with an admin login, sending
 * the crop the way the admin's cropper does. The server crops its own stored
 * original and rebuilds the `cover` size, so the database and the files on
 * disk stay in step, and the same run works against development and
 * production. Images already 10:7 are skipped, so it can be repeated.
 *
 *   IMPORT_URL=… IMPORT_EMAIL=… IMPORT_PASSWORD=… \
 *     pnpm payload run scripts/recrop-media.ts          # dry run: lists changes
 *   … pnpm payload run scripts/recrop-media.ts apply    # makes them
 *
 * (`payload run` drops `--flags`, hence the bare word.)
 */
import {
  centeredCrop,
  cropBox,
  hasImageRatio,
  uploadEditsQuery,
} from '../src/lib/image-ratio';

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
const apply = process.argv.slice(2).includes('apply');

async function api<T>(route: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}/api${route}`, init);
  if (!response.ok) {
    throw new Error(
      `${init.method ?? 'GET'} ${route}: ${response.status} ${await response.text()}`
    );
  }
  return response.json() as Promise<T>;
}

type MediaDoc = {
  id: number;
  filename: string;
  width: number;
  height: number;
  sizes?: { cover?: { width?: number; height?: number } };
};

const dims = (doc: MediaDoc) =>
  `${doc.width}×${doc.height}, cover ${doc.sizes?.cover?.width}×${doc.sizes?.cover?.height}`;

async function main() {
  console.log(`${apply ? 'Applying' : 'Dry run'} against ${baseUrl}`);
  const { token } = await api<{ token: string }>('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const auth = { Authorization: `JWT ${token}` };

  const { docs } = await api<{ docs: MediaDoc[] }>(
    '/media?depth=0&pagination=false&sort=id',
    { headers: auth }
  );
  let changed = 0;
  for (const doc of docs) {
    const label = `#${doc.id} ${doc.filename}`;
    if (hasImageRatio(doc.width, doc.height)) {
      console.log(`skip ${label}: already 10:7 (${dims(doc)})`);
      continue;
    }
    // Stored originals are WebP without EXIF orientation, so the stored
    // width and height are the ones the server crops.
    const crop = centeredCrop(doc.width, doc.height);
    const box = cropBox(crop, doc.width, doc.height);
    if (!apply) {
      console.log(
        `would crop ${label}: ${dims(doc)} -> ${box.width}×${box.height} at (${box.left}, ${box.top})`
      );
      changed++;
      continue;
    }
    const { doc: updated } = await api<{ doc: MediaDoc }>(
      `/media/${doc.id}?depth=0&${uploadEditsQuery(crop)}`,
      {
        method: 'PATCH',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );
    if (!hasImageRatio(updated.width, updated.height)) {
      throw new Error(`${label} came back ${dims(updated)}`);
    }
    console.log(`cropped ${label}: ${dims(doc)} -> ${updated.filename} ${dims(updated)}`);
    changed++;
  }
  console.log(
    `${changed} of ${docs.length} ${apply ? 're-cropped' : 'to re-crop'}`
  );
}

await main();
