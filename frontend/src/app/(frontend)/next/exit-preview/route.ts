import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { getSafeRedirect } from 'payload/shared';

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const path = request.nextUrl.searchParams.get('path') ?? '/';
  redirect(getSafeRedirect({ redirectTo: path, fallbackTo: '/' }));
}
