import MainHeading from '@/components/main-heading';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Euphoria_Script } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import EmailIcon from '../../../public/images/email-icon.webp';
import LinkedinLogo from '../../../public/images/linkedin-icon.webp';

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const euphoria_script = Euphoria_Script({
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Need a content writer for business or personal projects? Contact a professional copywriter to get results with your blog, newsletters, emails and social media.',
};

export default function Contact() {
  return (
    <main className='page-shell'>
      <article className='content-shell readable-prose motion-fade-in prose text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='Would I like to get in touch?' />
        <section className='space-y-6'>
          <p className='text-justify'>
            Thank you for asking and yes — I’m always ready for new connections
            and would love to hear from you!
          </p>
          <p className='text-justify'>
            Whether you’re looking for a content writer for your business, want
            to collaborate on a project or just have a great (book) suggestion
            to share, you can get in touch via:
          </p>
          <section className='not-prose grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2'>
            <Link
              className='section-card motion-lift flex min-h-[150px] flex-col items-center justify-center gap-2 px-5 py-6 text-center hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_14px_24px_hsl(0_0%_0%/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              href='https://www.linkedin.com/in/kristalomu'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Linkedin Link, Opens in new tab'
            >
              <Image
                src={LinkedinLogo}
                className='rounded-full'
                width={44}
                height={44}
                alt='Linkedin Icon'
              />
              <span className='text-lg font-semibold text-foreground'>
                LinkedIn
              </span>
            </Link>
            <Link
              className='section-card motion-lift flex min-h-[150px] flex-col items-center justify-center gap-2 px-5 py-6 text-center hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_14px_24px_hsl(0_0%_0%/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              href={`mailto:${EMAIL_ADDRESS}`}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Email Link, Opens in new tab'
            >
              <Image
                src={EmailIcon}
                className='rounded-full'
                width={44}
                height={44}
                alt='Email Icon'
              />
              <span className='text-lg font-semibold text-foreground'>
                Email
              </span>
            </Link>
          </section>
          <section
            className={cn('text-center text-4xl', euphoria_script.className)}
          >
            <p> I hope to hear from you!</p>
          </section>
        </section>
      </article>
    </main>
  );
}
