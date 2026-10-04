import Image from 'next/image';

import EmailIcon from '../../public/images/email-icon.webp';
import LinkedinLogo from '../../public/images/linkedin-icon.webp';

const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS;

const linkClass =
  'underline decoration-mint decoration-2 underline-offset-4 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

// The other ways to reach Krista, pinned beside the contact form. It shares the
// About page's sticky-note styling (`glance-note`), so both notes stay alike.
type ContactNoteCopy = {
  title: string;
  linkedinLink: string;
  linkedinUrl: string;
  linkedinText: string;
  emailHeading: string;
  emailText: string;
  footer: string;
};

export default function ContactNote({ copy }: { copy: ContactNoteCopy }) {
  return (
    <aside
      aria-labelledby='contact-note-title'
      className='section-card glance-note relative px-6 pb-8 pt-9'
    >
      {/* Needle tip sits at about (31%, 85%) of the canvas; it lands just
          inside the top edge. */}
      <Image
        src='/images/about/push-pin.webp'
        alt=''
        width={1254}
        height={1254}
        className='pointer-events-none absolute -top-11 left-[calc(50%-1.75rem)] h-[4.5rem] w-[4.5rem] select-none'
      />
      <h2
        id='contact-note-title'
        className='glance-note-title glance-note-title--plain text-4xl font-semibold leading-tight'
      >
        {copy.title}
      </h2>
      <ul className='mt-6 flex flex-col gap-6 text-base leading-snug'>
        <li className='flex items-start gap-4'>
          <Image
            src={LinkedinLogo}
            width={44}
            height={44}
            alt=''
            className='shrink-0 rounded-full'
          />
          <div>
            <a
              href={copy.linkedinUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={`font-semibold ${linkClass}`}
            >
              {copy.linkedinLink}
            </a>
            <p className='mt-1'>{copy.linkedinText}</p>
          </div>
        </li>
        <li className='flex items-start gap-4'>
          <Image
            src={EmailIcon}
            width={44}
            height={44}
            alt=''
            className='shrink-0 rounded-full'
          />
          <div>
            <p className='font-semibold'>{copy.emailHeading}</p>
            <p className='mt-1'>
              {copy.emailText}{' '}
              <a href={`mailto:${EMAIL_ADDRESS}`} className={linkClass}>
                {EMAIL_ADDRESS}
              </a>
              .
            </p>
          </div>
        </li>
      </ul>
      <p className='mt-8 border-t border-foreground/20 pt-5 text-base italic leading-snug'>
        {copy.footer}
      </p>
    </aside>
  );
}
