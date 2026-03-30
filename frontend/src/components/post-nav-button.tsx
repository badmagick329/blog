import Link from 'next/link';

export default function PostNavButton({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className='hover:text-foreground'
      href={`/${slug}`}
    >
      {children}
    </Link>
  );
}
