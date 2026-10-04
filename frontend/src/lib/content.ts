import type { Config } from '@/payload-types';
import config from '@payload-config';
import type { Metadata } from 'next';
import { draftMode, headers } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';

type GlobalSlug = keyof Config['globals'];

/**
 * A page's editable copy as visitors see it, or its latest draft in draft
 * mode, which only a logged-in admin can turn on. Cached per request, so the
 * layout, metadata and page share one query per global.
 */
export const getCopy = cache(
  async <T extends GlobalSlug>(slug: T): Promise<Config['globals'][T]> => {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config });
    return payload.findGlobal({ slug, draft, depth: 1 });
  }
);

/**
 * Whether the request comes from a logged-in admin. Visitors carry no Payload
 * cookie, so they never cost a database query.
 */
export async function isAdmin() {
  const requestHeaders = await headers();
  if (!requestHeaders.get('cookie')?.includes('payload-token=')) return false;
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: requestHeaders });
  return Boolean(user);
}

export function copyMetadata(meta: {
  title: string;
  description?: string | null;
}): Metadata {
  return {
    title: meta.title,
    description: meta.description || undefined,
  };
}
