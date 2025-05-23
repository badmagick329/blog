'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Forum } from 'next/font/google';
import Script from 'next/script';

import './globals.css';

const forum = Forum({
  weight: '400',
  display: 'swap',
  adjustFontFallback: false,
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Script
          src='https://analytics.mgck.ink/js/script.js'
          data-domain='kristalomu.com'
          strategy='afterInteractive'
        />
      </head>
      <body
        className={cn(
          'flex min-h-dvh flex-col bg-gradient-to-br from-background-start to-background-end font-sans text-foreground',
          forum.className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
