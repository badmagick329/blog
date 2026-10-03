import ContactForm from '@/components/contact-form';
import ContactNote from '@/components/contact-note';
import MainHeading from '@/components/main-heading';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Need a content writer for business or personal projects? Contact a professional copywriter to get results with your blog, newsletters, emails and social media.',
};

export default function Contact() {
  return (
    <main id='main-content' tabIndex={-1} className='page-shell'>
      {/* The form is the main card; the note with other ways to get in touch
          is pinned beside it, and falls below it on narrower screens. */}
      <article className='content-shell motion-fade-in flex flex-col items-center gap-14 lg:flex-row lg:items-start lg:justify-center lg:gap-10'>
        <section className='section-card prose readable-prose w-full min-w-0 space-y-6 px-6 py-8 text-foreground sm:px-8 lg:prose-lg'>
          <MainHeading text='Would I like to get in touch?' />
          <p className='text-justify'>
            Thank you for asking and yes — I’m always ready for new connections
            and would love to hear from you!
          </p>
          <p className='text-justify'>
            Whether you’re looking for a content writer for your business, want
            to collaborate on a project or just have a great (book) suggestion
            to share, leave me a message right here:
          </p>
          <ContactForm />
          <section
            className='text-center text-4xl display-script'
          >
            <p> I hope to hear from you!</p>
          </section>
        </section>
        <div className='mt-6 w-full max-w-sm lg:mt-16 lg:w-96 lg:max-w-none lg:shrink-0'>
          <ContactNote />
        </div>
      </article>
    </main>
  );
}
