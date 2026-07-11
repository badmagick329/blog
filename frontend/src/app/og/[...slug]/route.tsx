import { posts } from '#site/content';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type OpenGraphImageProps = {
  params: {
    slug: string[];
  };
};

export function GET(_: Request, { params }: OpenGraphImageProps) {
  const slug = params.slug.join('/');
  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post?.coverImage) {
    return new Response(null, { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#111111',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <img
          alt={post.title}
          src={post.coverImage}
          style={{
            height: '100%',
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
