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
    <article className='flex flex-col items-center'>
      <div className='prose dark:prose-invert'>
        <Link
          className='no-underline hover:text-foreground/60'
          href={`/${slug}`}
        >
          <section className='flex flex-col gap-4'>
            <h2 className='m-0'>{title}</h2>
            <p className='m-0 text-sm font-semibold'>
              {formatDate(publishedAt)}
            </p>
            <p className='m-0'>{description}</p>
          </section>
        </Link>
      </div>
    </article>
  );
}
