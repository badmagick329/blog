'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import {
  Allura,
  Buda,
  Comforter,
  Euphoria_Script,
  Forum,
  Inter,
  Linden_Hill,
  Sedan,
} from 'next/font/google';
import { useState } from 'react';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const buda = Buda({ weight: '300', subsets: ['latin'] });
const forum = Forum({ weight: '400', subsets: ['latin'] });
const sedan = Sedan({ weight: '400', subsets: ['latin'] });
const linden_hill = Linden_Hill({ weight: '400', subsets: ['latin'] });
const allura = Allura({ weight: '400', subsets: ['latin'] });
const comforter = Comforter({ weight: '400', subsets: ['latin'] });
const euphoria_script = Euphoria_Script({ weight: '400', subsets: ['latin'] });

const fonts = {
  inter,
  buda,
  forum,
  sedan,
  linden_hill,
  allura,
  comforter,
  euphoria_script,
};

export type FontsType = typeof fonts;

// export const metadata: Metadata = {
//   title: 'Under Construction',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [chosenFont, setChosenFont] = useState<keyof FontsType>('buda');

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col bg-background px-1 font-sans text-foreground',
          fonts[chosenFont].className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header
            fonts={fonts}
            chosenFont={chosenFont}
            setChosenFont={setChosenFont}
          />
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
