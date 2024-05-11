import MainHeading from '@/components/main-heading';
import Image from 'next/image';

import BackgroundImage from '../../public/images/coffee-cup.png';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col items-center'>
      <div className='prose dark:prose-invert lg:prose-lg'>
        <article className='flex h-full w-full flex-col items-center gap-16 pt-8'>
          <section className='flex flex-col items-center justify-center'>
            <MainHeading text='Home Page' />
            <p>
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat
              reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
              ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
              officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
              occaecat reprehenderit commodo officia dolor Lorem duis laboris
              cupidatat officia voluptate. Culpa proident adipisicing id nulla
              nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
              reprehenderit commodo ex non excepteur duis sunt velit enim.
              Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
              culpa et culpa duis.
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
