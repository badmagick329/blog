import type { CSSProperties } from 'react';
import Image from 'next/image';

type BlogCoverImageProps = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  seed: string;
  priority?: boolean;
  compact?: boolean;
};

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: string) {
  let state = hashString(seed) || 1;

  return function nextRandom() {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x100000000;
  };
}

function toRange(randomValue: number, min: number, max: number) {
  return min + (max - min) * randomValue;
}

function getPolaroidStyle(seed: string): CSSProperties {
  const nextRandom = createSeededRandom(seed);

  const frameRotate = toRange(nextRandom(), -1.9, 1.9);
  const topTapeRotate = toRange(nextRandom(), 31, 43);
  const topTapeXOffset = toRange(nextRandom(), -0.3, 0.35);
  const topTapeYOffset = toRange(nextRandom(), -0.18, 0.12);
  const bottomTapeRotate = toRange(nextRandom(), 44, 56);
  const bottomTapeXOffset = toRange(nextRandom(), -0.35, 0.4);
  const bottomTapeYOffset = toRange(nextRandom(), -0.18, 0.14);

  return {
    '--polaroid-rotate': `${frameRotate.toFixed(2)}deg`,
    '--tape-top-rotate': `${topTapeRotate.toFixed(2)}deg`,
    '--tape-top-x-offset': `${topTapeXOffset.toFixed(3)}rem`,
    '--tape-top-y-offset': `${topTapeYOffset.toFixed(3)}rem`,
    '--tape-bottom-rotate': `${bottomTapeRotate.toFixed(2)}deg`,
    '--tape-bottom-x-offset': `${bottomTapeXOffset.toFixed(3)}rem`,
    '--tape-bottom-y-offset': `${bottomTapeYOffset.toFixed(3)}rem`,
  } as CSSProperties;
}

export default function BlogCoverImage({
  src,
  alt,
  width,
  height,
  seed,
  priority = false,
  compact = false,
}: BlogCoverImageProps) {
  if (!src) {
    return null;
  }

  return (
    <figure
      className={`blog-cover-frame${compact ? ' blog-cover-frame--compact' : ''}`}
      style={getPolaroidStyle(seed)}
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
