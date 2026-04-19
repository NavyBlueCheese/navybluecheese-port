// src/app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import LanguageSidebar from '@/components/LanguageSidebar';
import { Providers } from './providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Navy — Nunnapat Pulsawas',
    template: '%s · Navy',
  },
  description:
    'Researcher, writer, and manga illustrator. Financial Engineering & International Commerce at Korea University.',
  openGraph: {
    title: 'Navy — Nunnapat Pulsawas',
    description:
      'Researcher, writer, and manga illustrator. Financial Engineering & International Commerce at Korea University.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-ink antialiased overflow-x-hidden">
        <Providers>
          <Cursor />
          <LanguageSidebar />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
