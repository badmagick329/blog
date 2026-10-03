'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Dancing_Script, JetBrains_Mono, Vollkorn } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
// After globals.css, so the theme wins ties with the base rules.
import '@/styles/theme.css';

// Self-hosted at build time; `styles/theme.css` applies them through these
// variables.
const vollkorn = Vollkorn({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-vollkorn',
});
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        vollkorn.variable,
        dancingScript.variable,
        jetbrainsMono.variable
      )}
    >
      <head>
        <Script
          src='/ingest/js/script.js'
          data-domain='kristalomu.com'
          data-api='/ingest/api/event'
        />
      </head>
      <body className='flex min-h-dvh flex-col bg-background text-foreground'>
        <a href='#main-content' className='skip-link'>
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
