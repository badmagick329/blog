import MainHeading from '@/components/main-heading';
import Image from 'next/image';

import BackgroundImage from '../../public/images/coffee-cup.png';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center'>
      <div className='prose text-foreground dark:prose-invert lg:prose-lg'>
        <article className='flex h-full w-full flex-col items-center gap-16 pt-8'>
          <section className='flex flex-col items-center justify-center'>
            <MainHeading text='Home Page' />
            <p>
              Lovely to see you. Welcome to my corner of the universe. I’m
              Krista, a copywriter and coffee aficionado. Go ahead and explore
              my little website.
            </p>
          </section>
          <section className='grid grid-cols-3 gap-4'>
            <section>
              <Image
                src={BackgroundImage}
                alt='Coffee cup'
                width={200}
                height={200}
              />
              <p>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </p>
            </section>
            <section>
              <Image
                src={BackgroundImage}
                alt='Coffee cup'
                width={200}
                height={200}
              />
              <p>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </p>
            </section>
            <section>
              <Image
                src={BackgroundImage}
                alt='Coffee cup'
                width={200}
                height={200}
              />
              <p>
                Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                sint cillum sint consectetur cupidatat.
              </p>
            </section>
          </section>
        </article>
      </div>
    </main>
  );
}
