'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostNavButton({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <button className='hover:text-foreground/60'>{children}</button>;
  }
  return (
    <button
      className='hover:text-foreground/60'
      onClick={() => router.push(`/${slug}`)}
    >
      {children}
    </button>
  );
}
