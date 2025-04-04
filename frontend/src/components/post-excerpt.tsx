import { MDXContent } from '@/components/mdx-components';
import '@/styles/mdx.css';

export default async function PostExcerpt({ body }: { body: string }) {
  return (
    <section className='mdx-excerpt container prose mx-auto max-w-3xl p-2 text-justify dark:prose-invert lg:prose-xl'>
      <MDXContent code={body} />
    </section>
  );
}
