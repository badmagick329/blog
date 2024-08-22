import MainHeading from '@/components/main-heading';
import { cn } from '@/lib/utils';
import { Euphoria_Script } from 'next/font/google';

const euphoria_script = Euphoria_Script({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className='mx-4 flex flex-1 flex-col items-center'>
      <div className='prose text-foreground dark:prose-invert lg:prose-lg'>
        <article className='flex h-full w-full flex-col items-center gap-16 pt-8'>
          <section className='flex flex-col items-center justify-center'>
            <p className={cn('mb-2 mt-6 text-4xl',euphoria_script.className)}>Lovely to see you.</p>
            <MainHeading
              text='Welcome to my corner of the universe.'
              withProse
            />
            <p>
              I’m Krista, a copywriter and coffee aficionado. Go ahead and
              explore my little website.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
