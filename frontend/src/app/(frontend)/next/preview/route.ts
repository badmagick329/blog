import config from '@payload-config';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import { getSafeRedirect } from 'payload/shared';

// Turns on draft mode for a logged-in admin and opens `path`. Draft mode
// makes post pages render the latest draft; Next signs its cookie, so it
// cannot be set any other way.
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const safePath = path && getSafeRedirect({ redirectTo: path, fallbackTo: '' });
  if (!safePath) {
    return new Response('Missing or unsafe preview path', { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  const draft = await draftMode();
  if (!user) {
    draft.disable();
    return new Response('Log in to the admin to preview drafts', {
      status: 403,
    });
  }

  draft.enable();
  redirect(safePath);
}
