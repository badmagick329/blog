import Image from "next/image";
import BackgroundImage from "../../public/images/coffee-cup.png";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/font/Thuressia.ttf",
  display: "swap",
});

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center">
      <div
        className={`flex gap-4 ${myFont.className} flex-wrap justify-center`}
      >
        <div className="flex flex-col gap-12 justify-center text-center md:pt-12 tracking-widest">
          <span className="text-4xl sm:text-6xl md:text-8xl">
            The site is brewing.
          </span>
          <span className="text-lg sm:text-2xl md:text-3xl">
            We'll be back shortly.
          </span>
          <span className="text-lg sm:text-2xl font-light md:text-3xl">
            Thank you for your patience!
          </span>
        </div>
        <div className="w-[300px] sm:w-[400px]">
        <Image src={BackgroundImage} alt="Coffee Cup" unoptimized />
        </div>
      </div>
    </main>
  );
}
