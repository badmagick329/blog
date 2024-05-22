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
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia. Sit irure elit esse ea nulla sunt ex occaecat
            reprehenderit commodo officia dolor Lorem duis laboris cupidatat
            officia voluptate. Culpa proident adipisicing id nulla nisi laboris
            ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo
            ex non excepteur duis sunt velit enim. Voluptate laboris sint
            cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
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
