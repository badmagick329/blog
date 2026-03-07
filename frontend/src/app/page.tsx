import MainHeading from '@/components/main-heading';
import { homeQuickLinkLabels, navIconConfig } from '@/lib/nav-icons';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Euphoria_Script } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const euphoria_script = Euphoria_Script({
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Explore the world of a professional freelance content and copywriter. Get in touch to transform your next writing or marketing project.',
};

export default function Home() {
  const quickLinks = homeQuickLinkLabels.map((label) => navIconConfig[label]);

  return (
    <main className='page-shell'>
      <article className='content-shell motion-fade-in flex h-full w-full flex-col items-center gap-8'>
        <section className='section-card readable-prose flex w-full max-w-3xl flex-col items-center gap-4 px-6 py-10 text-center sm:px-10'>
          <p className={cn('text-3xl sm:text-4xl', euphoria_script.className)}>
            Lovely to see you.
          </p>
          <MainHeading
            text={'I’m Krista, a freelance content and copywriter.'}
            withProse
            className='max-w-[18ch] text-4xl sm:text-5xl'
          />
          <p className='readable-prose text-base text-foreground/85 sm:text-lg'>
            Go ahead and explore my little website.
          </p>
        </section>
        <section className='w-full max-w-3xl'>
          <div className='subtle-divider mb-10 mt-6' />
          <ul className='grid gap-3 sm:grid-cols-3'>
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-label={`${item.label} page link`}
                  className='section-card motion-lift flex items-center justify-center gap-3 px-4 py-4 text-sm font-medium text-foreground/90 hover:-translate-y-1 hover:border-accent/50 hover:text-foreground hover:shadow-[0_16px_32px_hsl(0_0%_0%/0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:flex-col sm:gap-2 sm:text-base'
                >
                  <Image
                    className='motion-lift dark:invert'
                    src={item.image}
                    width={36}
                    height={36}
                    alt={item.alt}
                    unoptimized
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
