'use client';

import { Button, useField, useFormFields } from '@payloadcms/ui';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactCrop, { type PercentCrop as LibraryCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
  IMAGE_ASPECT,
  type PercentCrop,
  centeredCrop,
} from '@/lib/image-ratio';

type Picked = { url: string; width: number; height: number };

/**
 * The 10:7 cropper for Media uploads (`src/lib/image-ratio.ts`).
 *
 * It renders Media's virtual `crop` field rather than Payload's
 * `upload.admin.components.controls` slot, because that slot sits inside
 * the empty dropzone and unmounts the moment a file is picked
 * (`@payloadcms/ui/dist/elements/Upload/index.js`). A field stays mounted
 * for the whole form, in the Media page, the drawers the post editor opens,
 * and the bulk upload drawer a file dropped on a field opens, so it sees
 * every picked file however it arrived.
 *
 * On each new file it sets the largest centered 10:7 crop straight away, so
 * the shape holds even if the dialog is dismissed, then opens the dialog to
 * adjust it. The crop is the field's value and travels with the form data;
 * the server applies it (`src/collections/media-shape.ts`). Payload's own
 * `uploadEdits` would not do: the bulk upload drawer keeps those in state
 * this component cannot reach.
 */
export function ImageCropper() {
  const file = useFormFields(([fields]) => fields.file?.value);
  const { value: fieldCrop, setValue } = useField<PercentCrop | null>({
    path: 'crop',
  });
  const [picked, setPicked] = useState<Picked | null>(null);
  // The crop shown here. It is copied into the field rather than read back
  // from it, because a form refresh from the server can drop the field's
  // value.
  const [crop, setCrop] = useState<PercentCrop | null>(null);
  const [draft, setDraft] = useState<PercentCrop | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const wanted = crop ?? null;
    if (JSON.stringify(wanted) !== JSON.stringify(fieldCrop ?? null)) {
      setValue(wanted, wanted === null);
    }
  }, [crop, fieldCrop, setValue]);

  // Renaming the file in Payload's filename box swaps in a new File with the
  // same bytes; keyed on content, that neither resets the crop nor reopens
  // the dialog.
  const fileKey =
    file instanceof File && file.type.startsWith('image/')
      ? `${file.size}:${file.lastModified}:${file.type}`
      : null;
  const fileRef = useRef(file);
  fileRef.current = file;

  useEffect(() => {
    if (!fileKey) {
      setPicked(null);
      setCrop(null);
      setOpen(false);
      return;
    }
    const url = URL.createObjectURL(fileRef.current as File);
    const image = new Image();
    let current = true;
    // Browsers apply EXIF orientation to naturalWidth/naturalHeight, as the
    // server does with sharp's rotate(), so both see the same shape.
    image.onload = () => {
      if (!current) {
        return;
      }
      const next = {
        url,
        width: image.naturalWidth,
        height: image.naturalHeight,
      };
      const initial = centeredCrop(next.width, next.height);
      setPicked(next);
      setCrop(initial);
      setDraft(initial);
      setOpen(true);
    };
    image.src = url;
    return () => {
      current = false;
      URL.revokeObjectURL(url);
    };
  }, [fileKey]);

  useEffect(() => {
    if (!open) {
      return;
    }
    // Captured on window and stopped, so Escape closes only this dialog and
    // not the Payload drawer underneath, which would drop the picked file.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);

  if (!picked || !crop) {
    return null;
  }

  const save = () => {
    if (draft) {
      setCrop(draft);
    }
    setOpen(false);
  };

  return (
    <div className='image-cropper field-type'>
      <div className='image-cropper__summary'>
        <CropPreview picked={picked} crop={crop} />
        <div>
          <p>
            Every image on the site has the same landscape shape. This is the
            part of your photo that will be kept.
          </p>
          <Button
            buttonStyle='secondary'
            size='small'
            margin={false}
            onClick={() => {
              setDraft(crop);
              setOpen(true);
            }}
          >
            Adjust crop
          </Button>
        </div>
      </div>
      {open &&
        createPortal(
          <div
            className='image-cropper__backdrop'
            role='dialog'
            aria-modal='true'
            aria-labelledby='image-cropper-title'
          >
            <div className='image-cropper__dialog'>
              <h2 id='image-cropper-title'>Crop the photo</h2>
              <p>
                Drag the box to choose what stays in view, or drag its corners
                to zoom in. The shape stays the same for every image on the
                site.
              </p>
              <div className='image-cropper__stage'>
                <ReactCrop
                  crop={draft ?? crop}
                  aspect={IMAGE_ASPECT}
                  keepSelection
                  ruleOfThirds
                  minWidth={40}
                  onChange={(_, percent: LibraryCrop) =>
                    setDraft({ ...percent, unit: '%' })
                  }
                >
                  <img src={picked.url} alt='' />
                </ReactCrop>
              </div>
              <div className='image-cropper__actions'>
                <Button
                  buttonStyle='secondary'
                  margin={false}
                  onClick={() =>
                    setDraft(centeredCrop(picked.width, picked.height))
                  }
                >
                  Reset
                </Button>
                <Button margin={false} onClick={save}>
                  Use this crop
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/** The kept part of the photo, at the site's shape. */
function CropPreview({ picked, crop }: { picked: Picked; crop: PercentCrop }) {
  return (
    <div className='image-cropper__preview'>
      <img
        src={picked.url}
        alt=''
        style={{
          width: `${(100 / crop.width) * 100}%`,
          height: `${(100 / crop.height) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}
