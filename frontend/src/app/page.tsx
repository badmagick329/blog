import MainHeading from '@/components/main-heading';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Euphoria_Script } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import EmailImage from '../../public/images/email.png';
import IDImage from '../../public/images/id-card.png';

const euphoria_script = Euphoria_Script({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.',
};

export default function Home() {
  return (
    <main className='mx-4 flex flex-1 flex-col items-center'>
      <div className='prose text-foreground dark:prose-invert lg:prose-lg'>
        <article className='flex h-full w-full flex-col items-center gap-16 pt-8'>
          <section className='flex flex-col items-center justify-center'>
            <p className={cn('mb-2 mt-6 text-4xl', euphoria_script.className)}>
              Lovely to see you.
            </p>
            <MainHeading
              text={'I’m Krista, a freelance content and copywriter.'}
              withProse
            />
            <p className='text-2xl'>Go ahead and explore my little website.</p>
          </section>
          <section className='flex w-full justify-around'>
            <Link href={`/about`} aria-label='About page link'>
              <abbr title='About'>
                <Image
                  className='hover:animate-wiggle dark:invert'
                  src={IDImage}
                  width={50}
                  height={50}
                  alt='ID Card Icon'
                  unoptimized
                />
              </abbr>
            </Link>
            <Link href={`/contact`} aria-label='Contact page link'>
              <abbr title='Contact'>
                <Image
                  className='hover:animate-wiggle dark:invert'
                  src={EmailImage}
                  width={50}
                  height={50}
                  alt='Email Icon'
                  unoptimized
                />
              </abbr>
            </Link>
          </section>
        </article>
      </div>
    </main>
  );
}
