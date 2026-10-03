import type { Post } from '@/payload-types';
import config from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload, type Where } from 'payload';
import { cache } from 'react';

// Published, and not scheduled for a later day.
function visibleToVisitors(): Where {
  return {
    and: [
      { _status: { equals: 'published' } },
      { publishedAt: { less_than_equal: new Date().toISOString() } },
    ],
  };
}

export async function getVisiblePosts() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: visibleToVisitors(),
    sort: '-publishedAt',
    pagination: false,
  });
  return docs;
}

export async function getLatestPostWithCover() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: { and: [visibleToVisitors(), { cover: { exists: true } }] },
    sort: '-publishedAt',
    limit: 1,
  });
  return docs[0] ?? null;
}

/**
 * The post at `slug` as visitors see it, or its latest draft (scheduled or
 * not) in draft mode, which only a logged-in admin can turn on. Cached per
 * request, so metadata and page share one query.
 */
export const getPost = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    draft,
    where: draft
      ? { slug: { equals: slug } }
      : { and: [visibleToVisitors(), { slug: { equals: slug } }] },
    limit: 1,
  });
  return docs[0] ?? null;
});

export type Cover = { url: string; width: number; height: number; alt: string };

/** The post's cover at the 1 : 0.7 cover size, or null without one. */
export function coverOf(post: Post): Cover | null {
  const media = post.cover;
  if (!media || typeof media !== 'object') {
    return null;
  }
  const size = media.sizes?.cover;
  const url = size?.url ?? media.url;
  const width = size?.width ?? media.width;
  const height = size?.height ?? media.height;
  if (!url || !width || !height) {
    return null;
  }
  return { url, width, height, alt: media.alt || post.title };
}
