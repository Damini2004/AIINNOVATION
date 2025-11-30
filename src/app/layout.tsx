
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './animations.css';
import './members.css';
import { AppHeader } from '@/components/header';
import { Footer } from '@/components/footer';
import './footer.css';
import { Suspense } from 'react';
import Loading from './loading';
import { Space_Grotesk, Inter, Source_Code_Pro } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'AI Innovation | Cutting-Edge AI Solutions for Smarter Businesses',
  description: 'Your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'AI Education', 'AI Research', 'Ethical AI', 'AI for Good', 'AIIS'],
  openGraph: {
    title: 'AI Innovation | Cutting-Edge AI Solutions for Smarter Businesses',
    description: 'Explore AI Innovation – your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
    url: 'https://aiinsociety.in',
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
    title: 'AI Innovation | Cutting-Edge AI Solutions for Smarter Businesses',
    description: 'Explore AI Innovation – your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
    images: ['https://aiinsociety.in/assests/images/logo.png'], // Update with a real OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${sourceCodePro.variable}`}>
      <head>
        <link rel="canonical" href="https://aiinsociety.in/" />
        <link rel="apple-touch-icon" href="/assests/images/apple-touch-icon.png" />
        {/* Add your Google Analytics script here */}
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background light flex flex-col')}>
        <AppHeader />
        <main className="flex-1">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
