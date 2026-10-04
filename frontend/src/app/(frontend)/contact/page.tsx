import ContactForm from '@/components/contact-form';
import ContactNote from '@/components/contact-note';
import MainHeading from '@/components/main-heading';
import RichText from '@/components/rich-text';
import { copyMetadata, getCopy } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return copyMetadata((await getCopy('contact')).meta);
}

export default async function Contact() {
  const copy = await getCopy('contact');
  return (
    <main id='main-content' tabIndex={-1} className='page-shell'>
      {/* The form is the main card; the note with other ways to get in touch
          is pinned beside it, and falls below it on narrower screens. */}
      <article className='content-shell motion-fade-in flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10'>
        <section className='section-card readable-prose prose w-full min-w-0 space-y-6 px-6 py-8 text-foreground lg:prose-lg sm:px-8'>
          <MainHeading text={copy.heading} />
          <RichText data={copy.intro} className='space-y-6 text-justify' />
          <ContactForm copy={copy.form} />
          <section className='display-script text-center text-4xl'>
            <p>{copy.closing}</p>
          </section>
        </section>
        <div className='mt-6 w-full max-w-sm lg:mt-16 lg:w-96 lg:max-w-none lg:shrink-0'>
          <ContactNote copy={copy.note} />
        </div>
      </article>
    </main>
  );
}
