import type {
  DefaultTypedEditorState,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical';
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react';

// Links to other posts store the linked document. A link whose post was
// deleted since falls back to the blog rather than breaking the page.
function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }) {
  const value = linkNode.fields.doc?.value;
  return typeof value === 'object' && value && 'slug' in value && value.slug
    ? `/posts/${value.slug}`
    : '/posts';
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
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
