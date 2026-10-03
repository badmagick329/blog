import type { Post } from '@/payload-types';
import {
  type JSXConvertersFunction,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react';

// The whole post card is a link, and a link inside a link is invalid HTML
// that breaks hydration, so the excerpt shows link text without the link.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  link: ({ node, nodesToJSX }) => (
    <span>{nodesToJSX({ nodes: node.children })}</span>
  ),
  autolink: ({ node, nodesToJSX }) => (
    <span>{nodesToJSX({ nodes: node.children })}</span>
  ),
});

// The card clamps the excerpt to three lines; a few top-level blocks fill
// them without sending the whole post in the list page's HTML.
const EXCERPT_BLOCKS = 4;

export default function PostExcerpt({ body }: { body: Post['body'] }) {
  const excerpt = {
    ...body,
    root: {
      ...body.root,
      children: body.root.children.slice(0, EXCERPT_BLOCKS),
    },
  };
  return (
    <section className='post-excerpt container prose mx-auto max-w-3xl p-2 text-justify lg:prose-xl'>
      <LexicalRichText
        data={excerpt}
        converters={converters}
        disableContainer
      />
    </section>
  );
}
