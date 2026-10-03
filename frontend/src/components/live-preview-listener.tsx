'use client';

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

// Re-renders the page from the server each time the admin autosaves, so Live
// Preview follows the draft as it is typed. Admin and site share an origin.
export default function LivePreviewListener() {
  const router = useRouter();
  return (
    <RefreshRouteOnSave
      refresh={router.refresh}
      serverURL={typeof window === 'undefined' ? '' : window.location.origin}
    />
  );
}
