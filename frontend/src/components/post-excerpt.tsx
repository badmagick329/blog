import RichText from '@/components/rich-text';
import type { Post } from '@/payload-types';

export default function PostExcerpt({ body }: { body: Post['body'] }) {
  return (
    <section className='post-excerpt container prose mx-auto max-w-3xl p-2 text-justify lg:prose-xl'>
      <RichText data={body} />
    </section>
  );
}
