import { getVisiblePosts } from '@/lib/posts';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://kristalomu.com';
const pages = ['/', '/about', '/contact', '/terms-of-use', '/posts'];

// Per request, like the post pages, so it always lists what visitors see.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getVisiblePosts();
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...posts.map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: post.updatedAt,
    })),
  ];
}
