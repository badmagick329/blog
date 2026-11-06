import { readFile } from 'fs/promises';
import path from 'path';
import {
  APIError,
  type CollectionBeforeOperationHook,
  type CollectionBeforeValidateHook,
} from 'payload';
import sharp from 'sharp';

import {
  type PercentCrop,
  cropBox,
  hasImageRatio,
} from '../lib/image-ratio';

/**
 * Keeps every Media image at 10:7 (`src/lib/image-ratio.ts`). Two hooks:
 *
 * `applyImageCrop` (beforeOperation) runs before Payload touches any file.
 * It applies the crop itself and hands Payload an already-10:7 file, or
 * refuses an off-ratio file that came without a crop. The crop arrives in
 * one of two ways:
 * - the admin's cropper puts it in the virtual `crop` field, which travels
 *   with the form's own data, so it works in every upload form, including
 *   the bulk upload drawer Payload opens when a file is dropped on a field;
 * - REST callers (importer, `scripts/recrop-media.ts`) send Payload's own
 *   `?uploadEdits[crop]=…`. With no new file, that re-crops the stored
 *   original.
 * It crops rather than leaving `uploadEdits.crop` to Payload because
 * Payload's crop (`payload/dist/uploads/cropImage.js`) cuts the raw bytes:
 * it ignores EXIF orientation, so phone photos crop in the wrong place, and
 * with our `withoutEnlargement` resize options it stores the cropped
 * original unconverted and uncapped (a JPEG named `.webp`). It must run
 * this early because an update that replaces the file deletes the old one
 * before any validate or change hook (`collections/operations/utilities/
 * update.js`, `deleteAssociatedFiles`); refusing later would leave the
 * document pointing at deleted files.
 *
 * `requireImageRatio` (beforeValidate) checks the final stored `width` and
 * `height`, which Payload has computed by then (`generateFileData` runs
 * before the validate hooks in `create.js` and `updateByID.js`). It catches
 * whatever the first hook did not see, and blocks saves on images stored
 * before the rule, until `scripts/recrop-media.ts` re-crops them.
 */

const shapeMessage = (width: number, height: number) =>
  `This image is ${width}×${height}. Every image on the site must be cropped to the 10:7 landscape shape (for example 800×560) before it is saved.`;

type RawCrop = Partial<Record<keyof PercentCrop, string | number>>;

type UploadEdits = {
  crop?: RawCrop;
  widthInPixels?: unknown;
  heightInPixels?: unknown;
};

/**
 * A crop from the request (numbers in form data, strings in a query
 * string), or undefined. Untrusted: anything malformed is refused.
 */
function readCrop(raw: RawCrop | null | undefined) {
  if (!raw) {
    return undefined;
  }
  const crop = {
    x: Number(raw.x),
    y: Number(raw.y),
    width: Number(raw.width),
  };
  if (
    !Object.values(crop).every(Number.isFinite) ||
    crop.width <= 0 ||
    (raw.unit !== undefined && raw.unit !== '%')
  ) {
    throw new APIError(
      'The crop must be given in percent of the image.',
      400,
      undefined,
      true
    );
  }
  return crop;
}

export const applyImageCrop: CollectionBeforeOperationHook = async ({
  args,
  collection,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') {
    return args;
  }
  const data = args.data as { crop?: RawCrop | null } | undefined;
  const formCrop = readCrop(data?.crop);
  if (data) {
    delete data.crop;
  }
  const edits = req.query?.uploadEdits as UploadEdits | undefined;
  const queryCrop = readCrop(edits?.crop);
  // Payload must never crop again on top of ours.
  if (edits) {
    delete edits.crop;
    delete edits.widthInPixels;
    delete edits.heightInPixels;
  }
  // Access is checked after this hook; don't decode images for visitors
  // whose request will be refused anyway.
  if (!req.user) {
    return args;
  }

  let file = req.file;
  // The form's crop belongs to the file picked in that form; without a new
  // file it is left over from an earlier upload and must not re-crop.
  const crop = file ? (formCrop ?? queryCrop) : queryCrop;
  const id = 'id' in args ? (args.id as number | string | undefined) : undefined;
  if (!file && crop) {
    if (operation !== 'update' || id === undefined) {
      throw new APIError('Crop one image at a time.', 400, undefined, true);
    }
    // Re-crop of a stored image: start from its stored original. Payload
    // treats the result as a replacement file, so it gets a new filename
    // and the old files are deleted.
    const doc = await req.payload.findByID({
      collection: collection.slug as 'media',
      id,
      depth: 0,
      req,
    });
    if (!doc.filename || !collection.upload.staticDir) {
      throw new APIError('This image has no stored file.', 400, undefined, true);
    }
    const stored = await readFile(
      path.join(collection.upload.staticDir, doc.filename)
    );
    file = {
      data: stored,
      mimetype: doc.mimeType ?? 'image/webp',
      name: doc.filename,
      size: stored.length,
    };
  }
  if (!file) {
    return args;
  }

  const input = file.tempFilePath || file.data;
  // The size after EXIF orientation: what people see, and crop in the
  // browser. Phone photos often store a 90° turn there.
  const { width, height } = (await sharp(input).metadata()).autoOrient;
  if (!crop) {
    if (!hasImageRatio(width, height)) {
      throw new APIError(shapeMessage(width, height), 400, undefined, true);
    }
    return args;
  }

  // Lossless PNG, so the WebP Payload makes from it is encoded only once;
  // scaled to the collection's cap first to keep the buffer small.
  const cropped = await sharp(input)
    .rotate()
    .extract(cropBox(crop, width, height))
    .resize(collection.upload.resizeOptions)
    .png({ compressionLevel: 2 })
    .toBuffer();
  req.file = {
    ...file,
    data: cropped,
    mimetype: 'image/png',
    size: cropped.length,
    tempFilePath: undefined,
  };
  return args;
};

export const requireImageRatio: CollectionBeforeValidateHook = ({
  data,
  originalDoc,
}) => {
  const width = data?.width ?? originalDoc?.width;
  const height = data?.height ?? originalDoc?.height;
  if (
    typeof width === 'number' &&
    typeof height === 'number' &&
    !hasImageRatio(width, height)
  ) {
    throw new APIError(shapeMessage(width, height), 400, undefined, true);
  }
  return data;
};
