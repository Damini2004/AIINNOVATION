import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './animations.css';
import './members.css';
import { AppHeader } from '@/app/header';
import { Footer } from '@/components/footer';
import './footer.css';
import { Suspense } from 'react';
import Loading from './loading';


export const metadata: Metadata = {
  metadataBase: new URL('https://aiinnovation-zmoi.vercel.app'),
  title: {
    template: '%s | AI Innovation',
    default: 'AI Innovation | AI Solutions for Education & Research',
  },
  description: 'AI Innovation Society: Your partner for AI-driven growth. We offer smart solutions in automation, analytics, education, and research to boost efficiency and success.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'AI Education', 'AI Research', 'Ethical AI', 'AI for Good', 'AIIS'],
  openGraph: {
    title: 'AI Innovation | AI Solutions for Education & Research',
    description: 'AI Innovation Society: Your partner for AI-driven growth. We offer smart solutions in automation, analytics, education, and research to boost efficiency and success.',
    url: 'https://aiinnovation-zmoi.vercel.app',
    siteName: 'AI Innovation',
    images: [
      {
        url: 'https://aiinsociety.in/assests/images/logo.png', // Update with a real OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'AI Innovation | AI Solutions for Education & Research',
    description: 'AI Innovation Society: Your partner for AI-driven growth. We offer smart solutions in automation, analytics, education, and research to boost efficiency and success.',
    images: ['https://aiinsociety.in/assests/images/logo.png'], // Update with a real OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://aiinnovation-zmoi.vercel.app/" />
        <link rel="apple-touch-icon" href="/assests/images/apple-touch-icon.png" />
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
      <body className={cn('font-body antialiased min-h-screen bg-background light flex flex-col')}>
        <AppHeader />
        <Suspense fallback={<Loading />}>
          <main className="flex-1">{children}</main>
        </Suspense>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
