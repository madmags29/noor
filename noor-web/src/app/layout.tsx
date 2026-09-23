import type { Metadata } from 'next';
import './globals.css';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://noor.app'),
  title: {
    default: 'Noor-e-ilahi — Your Deen. Your Daily Companion. | Global Islamic Platform',
    template: '%s | Noor-e-ilahi Islamic Ecosystem',
  },
  description: 'World-class Islamic digital technology platform offering astronomical prayer times, Quran audio recitations, authentic Hisn al-Muslim duas, interactive Qibla compass, Hijri calendar, and AI Islamic companion.',
  keywords: [
    'Noor-e-ilahi', 'NOOR', 'Islamic App', 'Prayer Times', 'Azan', 'Quran Recitation', 'Qibla Direction', 'Duas', 'Adhkar', 'Hijri Calendar', 'Makkah Live', 'Islamic Technology', 'Ummah', 'Zakat Calculator'
  ],
  authors: [{ name: 'Noor-e-ilahi Global Islamic Foundation' }],
  creator: 'Noor-e-ilahi Ecosystem',
  publisher: 'Noor-e-ilahi',
  alternates: {
    canonical: 'https://noor.app',
    languages: {
      'en-US': 'https://noor.app',
      'ar-SA': 'https://noor.app?lang=ar',
      'ur-PK': 'https://noor.app?lang=ur',
      'id-ID': 'https://noor.app?lang=id',
      'tr-TR': 'https://noor.app?lang=tr',
    },
  },
  openGraph: {
    title: 'Noor-e-ilahi — Your Deen. Your Daily Companion.',
    description: 'The premier Islamic technology platform for prayer times, Quran, duas, Qibla, and AI-powered guidance.',
    url: 'https://noor.app',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&h=630&q=90',
        width: 1200,
        height: 630,
        alt: 'Noor-e-ilahi — The Holy Kaaba at Makkah Al-Mukarramah',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor-e-ilahi — Your Deen. Your Daily Companion.',
    description: 'Precision astronomical prayer times, Quran audio, authentic duas, and Qibla compass.',
    images: ['https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&h=630&q=90'],
    creator: '@nooreilahi',
  },
  other: {
    'geo.region': 'SA-02',
    'geo.placename': 'Makkah Al-Mukarramah',
    'geo.position': '21.4225;39.8262',
    'ICBM': '21.4225, 39.8262',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#02120d',
};

import { LanguageProvider } from '../context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#02120d] text-[#f3f4f6] antialiased flex flex-col selection:bg-amber-500 selection:text-black"
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
