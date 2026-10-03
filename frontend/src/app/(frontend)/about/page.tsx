import AboutGlanceNote from '@/components/about-glance-note';
import MainHeading from '@/components/main-heading';
import type { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'About',
  description:
    'A professional content and copywriter from London, with experience in finance, Human Resources, taxation, investing, personal development and travel. ',
};

export default function About() {
  return (
    <main id='main-content' tabIndex={-1} className='page-shell'>
      {/* Page left, glance note pinned beside it; on narrower screens the
          note comes first, above the page. */}
      <article className='content-shell motion-fade-in flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10'>
        <section className='section-card notebook-page prose readable-prose w-full min-w-0 space-y-6 px-6 py-8 text-foreground sm:px-8 lg:prose-lg'>
          <MainHeading text='About' />
          <div className='notebook-lines space-y-6'>
            <p className='text-justify text-4xl display-script'>
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
            <p className='text-4xl display-script'>Krista</p>
            <p className='text-2xl display-script'>
              Psst. Check out{' '}
              <Link
                className='underline decoration-mint decoration-2 underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                href='/contact'
              >
                my contact details
              </Link>
            </p>
          </div>
        </section>
        <div className='order-first mt-6 w-full max-w-sm lg:order-none lg:mt-28 lg:w-80 lg:shrink-0'>
          <AboutGlanceNote />
        </div>
      </article>
    </main>
  );
}
