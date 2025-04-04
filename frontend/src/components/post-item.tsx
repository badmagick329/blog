import { formatDate } from '@/lib/utils';
import Link from 'next/link';

import PostExcerpt from './post-excerpt';

type PostItemProps = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
};
export default function PostItem({
  slug,
  title,
  description,
  publishedAt,
}: PostItemProps) {
  return (
    <article className='not-prose flex flex-col items-center overflow-hidden rounded-sm border-2 border-solid border-primary'>
      <Link className='no-underline hover:text-foreground/60' href={`/${slug}`}>
        <section className='flex flex-col gap-2'>
          <h2 className='bg-primary p-2 text-2xl font-semibold'>{title}</h2>
          <p className='p-2 text-sm font-semibold'>{formatDate(publishedAt)}</p>
          <PostExcerpt body={description} />
        </section>
      </Link>
    </article>
  );
}
