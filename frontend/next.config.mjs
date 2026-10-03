import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/ingest/js/script.js',
        destination: 'https://analytics.mgck.ink/js/script.js',
      },
      {
        source: '/ingest/api/event',
        destination: 'https://analytics.mgck.ink/api/event',
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
