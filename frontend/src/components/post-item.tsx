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
    <article className='flex flex-col gap-2 py-6 hover:text-foreground/60 md:px-24'>
      <Link href={`/${slug}`}>
        <h2 className='text-xl font-bold'>{title}</h2>
        <p>{description}</p>
        <p>{formatDate(publishedAt)}</p>
      </Link>
    </article>
  );
}
