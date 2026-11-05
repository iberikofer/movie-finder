import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '../context/LanguageContext';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import Header from '../components/Header/Header';
import PWAProvider from '../components/PWA/PWAProvider';
import '../index.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Movie Finder',
  description:
    'Movie Finder - discover trending movies, search film titles, and check out ratings, cast, and user reviews.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Movie Finder',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#062c26',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>
        <div id="ambient-gradient" className="ambientGradient" aria-hidden="true" />
        <PWAProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Header>{children}</Header>
          </LanguageProvider>
        </PWAProvider>
      </body>
    </html>
  );
}

