import MainHeading from '@/components/main-heading';
import Image from 'next/image';
import Link from 'next/link';

import EmailIcon from '../../../public/images/email-icon.png';
import LinkedinLogo from '../../../public/images/linkedin-icon.png';

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

export default function Contact() {
  return (
    <main className='flex w-full flex-1 flex-col items-center'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='Contact Me' />
        <section>
          <p>
            Would I like to get in touch? Thank you for asking and yes — I’m
            always ready for new connections and would love to hear from you!
            Whether you’re looking for a copywriter for your project, want to
            collaborate on a personal project or just have a great suggestion to
            share (book recommendations are especially welcome!), you can get in
            touch via: My email. My LinkedIn. I hope to hear from you!
          </p>
          <section className='flex items-center justify-around gap-8'>
            <Link
              href='https://www.linkedin.com'
              target='_blank'
              aria-label='Linkedin Link'
            >
              <Image
                src={LinkedinLogo}
                className='rounded-full'
                width={50}
                height={50}
                alt='Linkedin Icon'
              />
            </Link>
            <Link
              href={`mailto:${EMAIL_ADDRESS}`}
              target='_blank'
              aria-label='Email Link'
            >
              <Image
                src={EmailIcon}
                className='rounded-full'
                width={50}
                height={50}
                alt='Email Icon'
              />
            </Link>
          </section>
        </section>
      </article>
    </main>
  );
}
