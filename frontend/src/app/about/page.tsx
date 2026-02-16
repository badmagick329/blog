import MainHeading from '@/components/main-heading';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Euphoria_Script } from 'next/font/google';
import Link from 'next/link';

const euphoria_script = Euphoria_Script({
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'About',
  description:
    'A professional content and copywriter from London, with experience in finance, Human Resources, taxation, investing, personal development and travel. ',
};

export default function About() {
  return (
    <main className='page-shell'>
      <article className='content-shell motion-fade-in prose readable-prose text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='About' />
        <section className='space-y-6 text-justify'>
          <p className={cn('text-justify text-4xl', euphoria_script.className)}>
            Hi.
          </p>
          <p>I’m happy to see you find your way to my little website.</p>
          <p>
            I’m Krista, a copywriter based in the vibrant city of London. For
            years now, I’ve been freelancing as a content writer, fueled by
            copious amounts of coffee and an unending love for words.
          </p>
          <p>
            Through my professional writing, I’ve worked with fantastic
            companies, from multinationals to smaller startups and solo
            entrepreneurs. My work has allowed me to explore a diverse range of
            topics, from finance and HR to travel and personal development. I’ve
            written blogs, newsletters, white papers, emails and social media
            content — all sorts of materials to support business growth.
          </p>
          <p>
            What drives me most is my curiosity — I love exploring new projects
            and ideas and supporting remarkable people and teams in achieving
            their goals. I’ve connected with wonderful people and am excited
            about the new experiences I’ve yet to discover.
          </p>
          <p>
            Thank you for visiting my website and spending a few of your
            precious moments with me. I hope you enjoy what you find and come
            visit again.
          </p>
          <p>Until next time,</p>
          <p className={cn('text-4xl', euphoria_script.className)}>Krista</p>
          <p className={cn('text-2xl', euphoria_script.className)}>
            Psst. Check out{' '}
            <Link
              className='underline decoration-accent/60 underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              href='/contact'
              aria-label='my contact details'
            >
              my contact details
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
}
