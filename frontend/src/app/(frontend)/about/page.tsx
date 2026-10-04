import AboutGlanceNote from '@/components/about-glance-note';
import MainHeading from '@/components/main-heading';
import RichText from '@/components/rich-text';
import { copyMetadata, getCopy } from '@/lib/content';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return copyMetadata((await getCopy('about')).meta);
}

export default async function About() {
  const copy = await getCopy('about');
  return (
    <main id='main-content' tabIndex={-1} className='page-shell'>
      {/* Page left, glance note pinned beside it; on narrower screens the
          note comes first, above the page. */}
      <article className='content-shell motion-fade-in flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10'>
        <section className='section-card notebook-page readable-prose prose w-full min-w-0 space-y-6 px-6 py-8 text-foreground lg:prose-lg sm:px-8'>
          <MainHeading text={copy.heading} />
          <div className='notebook-lines space-y-6'>
            <p className='display-script text-justify text-4xl'>
              {copy.greeting}
            </p>
            <RichText data={copy.body} />
            <p className='display-script text-4xl'>{copy.signature}</p>
            <p className='display-script text-2xl'>
              {copy.postscript.text}{' '}
              <Link
                className='underline decoration-mint decoration-2 underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                href='/contact'
              >
                {copy.postscript.link}
              </Link>
            </p>
          </div>
        </section>
        <div className='order-first mt-6 w-full max-w-sm lg:order-none lg:mt-28 lg:w-80 lg:shrink-0'>
          <AboutGlanceNote copy={copy.glance} />
        </div>
      </article>
    </main>
  );
}
