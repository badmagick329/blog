import MainHeading from '@/components/main-heading';
import PageTime from '@/components/page-time';
import { cn } from '@/lib/utils';
import { Euphoria_Script } from 'next/font/google';

const euphoria_script = Euphoria_Script({ weight: '400', subsets: ['latin'] });

export default function About() {
  return (
    <main className='flex w-full flex-1 flex-col items-center'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='About' />
        <section className='text-justify'>
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
            Since I was a child, I’ve loved to write and read; words remain
            magical to me, even after all these years.
          </p>
          <p>
            Through my professional writing, I’ve worked with fantastic
            companies, from multinationals to smaller startups and solo
            entrepreneurs. My work has allowed me to explore a diverse range of
            topics, from finance and HR to travel and personal development.
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
            <a
              className='hover:text-accent'
              href='/contact'
              aria-label='my contact details'
            >
              my contact details
            </a>
          </p>
        </section>
      </article>
      <PageTime route='about' />
    </main>
  );
}
