import MainHeading from '@/components/main-heading';
import Image from 'next/image';

import CoffeeCup from '../../../public/images/coffee-cup.png';

export default function About() {
  return (
    <main className='flex w-full flex-1 flex-col items-center'>
      <article className='container prose pt-8 text-foreground dark:prose-invert lg:prose-lg'>
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
            Hi. I’m thrilled you’ve found your way to my little corner of the
            web. I’m happy to see you find your way to my little website. I’m
            Krista, a copywriter based in the vibrant city of London. For years
            now, I’ve been freelancing as a content writer, fuelled by copious
            amounts of coffee and an unending love for words. Since I was a
            child, I’ve loved to write and read; words remain magical to me,
            even after all these years. Through my professional writing, I’ve
            worked with fantastic companies, from multinationals to smaller
            startups and solo entrepreneurs. My work has allowed me to explore a
            diverse range of topics, from finance and HR to travel and personal
            development. What drives me most is my curiosity — I love exploring
            new projects and ideas and supporting remarkable people and teams in
            achieving their goals. I’ve connected with wonderful people and am
            excited about the new experiences I’ve yet to discover. Thank you
            for visiting my website and spending a few of your precious moments
            with me. I hope you enjoy what you find and come visit again. Until
            next time, Krista Psst. You can find my contact details here.
          </p>
        </section>
      </article>
    </main>
  );
}
