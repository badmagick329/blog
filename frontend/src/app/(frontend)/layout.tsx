import DraftBanner from '@/components/draft-banner';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { getCopy } from '@/lib/content';
import { cn } from '@/lib/utils';
// After globals.css, so the theme wins ties with the base rules.
import '@/styles/theme.css';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import Script from 'next/script';

import './globals.css';

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

// Every page reads its copy from the database per request: images are built
// without database access, and saved copy then shows at once.
export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getCopy('site');
  const { isEnabled: draft } = await draftMode();
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
        <Header name={site.name} nav={site.nav} />
        {draft && <DraftBanner />}
        {children}
        <Footer name={site.name} terms={site.footer.terms} />
        <Toaster />
      </body>
    </html>
  );
}
