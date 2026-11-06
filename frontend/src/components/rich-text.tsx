import type {
  DefaultTypedEditorState,
  SerializedLinkNode,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical';
import {
  type JSXConverter,
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react';

import type { Media } from '@/payload-types';

// Links to other posts store the linked document. A link whose post was
// deleted since falls back to the blog rather than breaking the page.
function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }) {
  const value = linkNode.fields.doc?.value;
  return typeof value === 'object' && value && 'slug' in value && value.slug
    ? `/posts/${value.slug}`
    : '/posts';
}

/**
 * Images in a post's body. Payload's default converter wraps them in
 * `<picture>` with the `cover` size as a `max-width: 800px` source, which
 * swapped in a different picture on small screens. Every image is 10:7
 * (`src/lib/image-ratio.ts`), so both files show the same framing and
 * `srcset` only picks a resolution. `sizes` is the prose column: full width
 * on phones, at most about 33rem (65ch) from small tablets up.
 */
const upload: JSXConverter<SerializedUploadNode> = ({ node }) => {
  const media = node.value as Media | number;
  if (typeof media !== 'object' || !media.url) {
    return null;
  }
  const cover = media.sizes?.cover;
  const srcSet = [
    cover?.url && cover.width && `${cover.url} ${cover.width}w`,
    media.width && `${media.url} ${media.width}w`,
  ]
    .filter(Boolean)
    .join(', ');
  return (
    <img
      src={cover?.url ?? media.url}
      srcSet={srcSet || undefined}
      sizes='(min-width: 40rem) 33rem, 100vw'
      width={media.width ?? undefined}
      height={media.height ?? undefined}
      alt={(node.fields?.alt as string | undefined) || media.alt || ''}
      loading='lazy'
      decoding='async'
    />
  );
};

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  upload,
});

export default function RichText({
  data,
  className,
}: {
  data: DefaultTypedEditorState;
  className?: string;
}) {
  return (
    <LexicalRichText
      data={data}
      converters={converters}
      className={className}
      disableContainer={!className}
    />
  );
}
