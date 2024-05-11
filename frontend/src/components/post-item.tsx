import { formatDate } from '@/lib/utils';
import Link from 'next/link';

type PostItemProps = {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
};
export default function PostItem({
  slug,
  title,
  description,
  publishedAt,
}: PostItemProps) {
  return (
    <article className='flex flex-col items-center gap-2 md:px-24'>
      <div className='prose dark:prose-invert'>
        <Link
          className='no-underline hover:text-foreground/60'
          href={`/${slug}`}
        >
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{formatDate(publishedAt)}</p>
        </Link>
      </div>
    </article>
  );
}
