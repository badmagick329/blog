'use client';

import LivePreviewListener from '@/components/live-preview-listener';
import { usePathname } from 'next/navigation';

// Shown on every page while draft mode is on, which only a logged-in admin
// can turn on; pages then render drafts of posts and copy alike.
export default function DraftBanner() {
  const pathname = usePathname();
  return (
    <>
      <LivePreviewListener />
      <p className='content-shell mt-6 rounded-md bg-secondary px-4 py-2 text-center text-secondary-foreground'>
        You’re previewing the latest draft.{' '}
        {/* A plain link: the exit route is a route handler, not a page. */}
        <a
          href={`/next/exit-preview?${new URLSearchParams({ path: pathname })}`}
          className='font-semibold underline'
        >
          Leave preview
        </a>
      </p>
    </>
  );
}
