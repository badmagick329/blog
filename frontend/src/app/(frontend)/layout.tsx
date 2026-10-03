'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import Script from 'next/script';

import './globals.css';
// After globals.css, so the theme wins ties with the base rules.
import '@/styles/theme.css';

// Committed latin-subset variable fonts (from Fontsource; OFL licences beside
// them), so image builds never depend on reaching Google Fonts.
// `styles/theme.css` applies them through these variables.
const vollkorn = localFont({
  src: [
    { path: '../../fonts/Vollkorn-Variable.woff2', style: 'normal' },
    { path: '../../fonts/Vollkorn-Italic-Variable.woff2', style: 'italic' },
  ],
  weight: '400 900',
  variable: '--font-vollkorn',
});
const dancingScript = localFont({
  src: '../../fonts/DancingScript-Variable.woff2',
  weight: '400 700',
  variable: '--font-dancing-script',
});
const jetbrainsMono = localFont({
  src: '../../fonts/JetBrainsMono-Variable.woff2',
  weight: '100 800',
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
