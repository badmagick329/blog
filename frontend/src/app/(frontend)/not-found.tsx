import RichText from '@/components/rich-text';
import { getCopy } from '@/lib/content';
import Image from 'next/image';

import NotFoundImage from '../../../public/images/unicorn-surprised-375.webp';

export default async function NotFound() {
  const { notFound: copy } = await getCopy('site');
  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex grow flex-col items-center justify-center gap-4'
    >
      <h1 className='pb-8 text-4xl font-semibold'>{copy.heading}</h1>
      <p className='pb-4 text-xl'>{copy.subheading}</p>
      <Image
        src={NotFoundImage}
        width={300}
        height={300}
        alt='Unicorn Surprised'
      />
      <RichText data={copy.body} className='not-found-body' />
    </main>
  );
}
