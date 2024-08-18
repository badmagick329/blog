'use client';

import Image from 'next/image';

import ErrorImage from '../../public/images/unicorn-confused-416.png';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4'>
      <h1 className='pb-8 text-4xl font-semibold'>
        Whoops - the servers are not serving it seems.{' '}
      </h1>
      <Image src={ErrorImage} width={300} height={300} alt='Unicorn Confused' />
      <p>Don’t worry! Things should be back and running in no time.</p>
    </div>
  );
}
