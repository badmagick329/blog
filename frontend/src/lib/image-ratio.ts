/**
 * Every image on the site has one shape, 10:7 landscape (the 800×560 `cover`
 * size), so a cover and a body image look the same on every screen. The
 * admin's cropper, the Media hooks, the importer and the re-crop script all
 * share this file so they agree on the shape and on what "centered" means.
 * Pure arithmetic: it runs in the browser and in Node.
 */

/** Height divided by width. */
export const IMAGE_RATIO = 0.7;

/** Width divided by height, the form `react-image-crop` takes. */
export const IMAGE_ASPECT = 10 / 7;

/**
 * True when `height` is within 1px of `width × 0.7`. One pixel of slack
 * covers the rounding sharp does when it scales a 10:7 image down.
 */
export function hasImageRatio(width: number, height: number) {
  return Math.abs(height - width * IMAGE_RATIO) <= 1;
}

/** A crop rectangle in percent of the image, Payload's `uploadEdits.crop`. */
export type PercentCrop = {
  unit: '%';
  x: number;
  y: number;
  width: number;
  height: number;
};

/** The largest 10:7 box centered in a `width` × `height` image. */
export function centeredCrop(width: number, height: number): PercentCrop {
  let boxWidth = width;
  let boxHeight = width * IMAGE_RATIO;
  if (boxHeight > height) {
    boxHeight = height;
    boxWidth = height / IMAGE_RATIO;
  }
  return {
    unit: '%',
    x: ((width - boxWidth) / 2 / width) * 100,
    y: ((height - boxHeight) / 2 / height) * 100,
    width: (boxWidth / width) * 100,
    height: (boxHeight / height) * 100,
  };
}

/**
 * Turns a percent crop into the pixel box the server extracts. The box's
 * width and position come from the crop; its height is always derived from
 * the width, and the box is shrunk or moved to fit inside the image, so the
 * result is 10:7 whatever a caller sent.
 */
export function cropBox(
  crop: Pick<PercentCrop, 'x' | 'y' | 'width'>,
  width: number,
  height: number
) {
  const boxWidth = Math.min(
    Math.round((crop.width / 100) * width),
    width,
    Math.floor(height / IMAGE_RATIO)
  );
  const boxHeight = Math.round(boxWidth * IMAGE_RATIO);
  const clamp = (value: number, max: number) =>
    Math.min(Math.max(Math.round(value), 0), max);
  return {
    left: clamp((crop.x / 100) * width, width - boxWidth),
    top: clamp((crop.y / 100) * height, height - boxHeight),
    width: boxWidth,
    height: boxHeight,
  };
}

/**
 * The query string that sends `crop` the way Payload's admin does
 * (`?uploadEdits[crop][x]=…`), for scripts that upload through the REST API.
 */
export function uploadEditsQuery(crop: PercentCrop) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(crop)) {
    params.set(`uploadEdits[crop][${key}]`, String(value));
  }
  return params.toString();
}
