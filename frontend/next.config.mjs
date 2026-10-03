// Next 16 builds with Turbopack, which takes no webpack plugins, so Velite
// runs here as the config loads. Next loads the config in more than one
// process; the env flag keeps it to a single Velite run.
const isDev = process.argv.includes('dev');
const isBuild = process.argv.includes('build');
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  const { build } = await import('velite');
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
export default {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://analytics.mgck.ink',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
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
