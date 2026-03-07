import Image from 'next/image';

type BlogCoverImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  compact?: boolean;
};

export default function BlogCoverImage({
  src,
  alt,
  width,
  height,
  priority = false,
  compact = false,
}: BlogCoverImageProps) {
  if (!src) {
    return null;
  }

  return (
    <figure
      className={`blog-cover-frame${compact ? ' blog-cover-frame--compact' : ''}`}
    >
      <div className='blog-cover-photo'>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className='h-auto w-full'
        />
      </div>
    </figure>
  );
}
