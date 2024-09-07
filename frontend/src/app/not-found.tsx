import Image from 'next/image';

import NotFoundImage from '../../public/images/unicorn-surprised-375.png';

export default function NotFound() {
  return (
    <div className='flex grow flex-col items-center justify-center gap-4'>
      <h1 className='pb-8 text-4xl font-semibold'>You did it!</h1>
      <p className='pb-4 text-xl'>You found the 404 page.</p>
      <Image
        src={NotFoundImage}
        width={300}
        height={300}
        alt='Unicorn Surprised'
      />
      <p>
        If this wasn’t intentional, please return to the{' '}
        <a
          className='font-semibold hover:cursor-pointer hover:text-foreground/60'
          href='/'
        >
          home page
        </a>{' '}
        and try again.
      </p>
    </div>
  );
}
