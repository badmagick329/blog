import MainHeading from '@/components/main-heading';
import { cn } from '@/lib/utils';
import { Euphoria_Script } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import EmailIcon from '../../../public/images/email-icon.png';
import LinkedinLogo from '../../../public/images/linkedin-icon.png';

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;
const euphoria_script = Euphoria_Script({ weight: '400', subsets: ['latin'] });

export default function Contact() {
  return (
    <main className='flex w-full flex-1 flex-col items-center'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
        <MainHeading text='Would I like to get in touch?' />
        <section>
          <p className='text-justify'>
            Thank you for asking and yes — I’m always ready for new connections
            and would love to hear from you!
          </p>
          <p className='text-justify'>
            Whether you’re looking for a content writer for your project, want
            to collaborate on a project or just have a great (book) suggestion
            to share, you can get in touch via:
          </p>
          <section className='flex items-center justify-around gap-8'>
            <Link
              href='https://www.linkedin.com/in/kristalomu'
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
