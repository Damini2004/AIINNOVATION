import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './animations.css';
import './members.css';
import { Footer } from '@/components/footer';
import { AppHeader } from '@/components/header';
import './footer.css';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Code Showcase',
  description: 'A showcase of code snippets with AI-powered features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background light')}>
        <AppHeader />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
