
import type { Metadata, Viewport } from 'next';
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
  metadataBase: new URL('https://aiinsociety.in'),
  title: {
    default: 'AI Innovation Society',
    template: '%s | AI Innovation Society',
  },
  description: 'Your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'AI Education', 'AI Research', 'Ethical AI', 'AI for Good', 'AIIS'],
  openGraph: {
    title: 'AI Innovation Society | Empowering the Future of AI',
    description: 'Explore AI Innovation – your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
    url: 'https://aiinsociety.in',
    siteName: 'AI Innovation Society',
    images: [
      {
        url: '/assests/images/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'AI Innovation Society | Empowering the Future of AI',
    description: 'Explore AI Innovation – your partner in harnessing Artificial Intelligence for business growth. From automation to analytics, we create smart AI-driven solutions that empower innovation and efficiency.',
    images: ['https://aiinsociety.in/assests/images/logo.png'],
  },
  alternates: {
    canonical: 'https://aiinsociety.in',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${sourceCodePro.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/assests/images/apple-touch-icon.png" />
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
