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
    <article className='border-border flex flex-col gap-2 rounded-md border-2 py-3'>
      <h2 className='text-xl font-bold'>
        <Link href={`/${slug}`}>{title}</Link>
      </h2>
      <p>{description}</p>
      <p className='text-foreground'>{publishedAt}</p>
    </article>
  );
}
