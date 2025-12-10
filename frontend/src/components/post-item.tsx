import PostNavButton from '@/components/post-nav-button';
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
      <PostNavButton slug={slug}>
        <section className='flex flex-col gap-2'>
          <h2 className='bg-primary p-2 text-xl font-bold sm:text-2xl'>
            {title}
          </h2>
          <p className='p-2 text-sm font-semibold'>{formatDate(publishedAt)}</p>
          <PostExcerpt body={description} />
        </section>
      </PostNavButton>
    </article>
  );
}
