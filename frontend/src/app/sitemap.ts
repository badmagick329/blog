import { posts } from '#site/content';
import { postIsPublished } from '@/lib/utils';
import type { MetadataRoute } from 'next';

const siteUrl = 'https://kristalomu.com';
const pages = ['/', '/about', '/contact', '/terms-of-use', '/posts'];

export const revalidate = 60;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}` })),
    ...posts
      .filter((post) => postIsPublished(post))
      .map((post) => ({ url: `${siteUrl}/posts/${post.slugAsParams}` })),
  ];
}
