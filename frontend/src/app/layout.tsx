'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import Script from 'next/script';

import './globals.css';

// The constant condition lets the bundler drop the import in production, so
// candidate design CSS and font links never ship to the live site.
const DesignSwitcher =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('@/components/design-switcher'), { ssr: false })
    : null;

const forum = localFont({
  src: '../fonts/Forum-Regular.ttf',
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          src='/ingest/js/script.js'
          data-domain='kristalomu.com'
          data-api='/ingest/api/event'
        />
      </head>
      <body
        className={cn(
          'flex min-h-dvh flex-col bg-gradient-to-br from-background-start to-background-end bg-fixed font-sans text-foreground',
          forum.className
        )}
      >
        <a href='#main-content' className='skip-link'>
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <Toaster />
        {DesignSwitcher && <DesignSwitcher />}
      </body>
    </html>
  );
}
