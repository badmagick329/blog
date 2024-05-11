import MainHeading from '@/components/main-heading';
import Image from 'next/image';

import CoffeeCup from '../../../public/images/coffee-cup.png';

export default function About() {
  return (
    <main className='flex w-full flex-1 flex-col items-center'>
      <article className='container prose dark:prose-invert lg:prose-lg'>
        <MainHeading text='About' />
        <section>
          <Image
            className='float-right ml-[15px]'
            src={CoffeeCup}
            alt='Coffee cup'
            width={100}
            height={100}
          />
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
        </section>
      </article>
    </main>
  );
}
