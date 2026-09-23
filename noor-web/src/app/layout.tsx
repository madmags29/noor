import type { Metadata } from 'next';
import './globals.css';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://noor.app'),
  title: {
    default: 'Noor-e-ilahi — Your Deen. Your Daily Companion. | Global Islamic Platform',
    template: '%s | Noor-e-ilahi Islamic Ecosystem',
  },
  description:
    'World-class Islamic digital technology platform offering astronomical prayer times, Quran audio recitations, authentic Hisn al-Muslim duas, 3D Qibla compass, Hijri calendar, audited global Ziyarat sanctuaries, and Noor AI companion.',
  keywords: [
    'Noor-e-ilahi',
    'NOOR',
    'Islamic App',
    'Prayer Times',
    'Namaz Vakitleri',
    'Azan',
    'Quran Recitation',
    'Qibla Direction',
    'Duas',
    'Adhkar',
    'Ziyarat',
    'Dargahs',
    'Ajmer Sharif',
    'Nizamuddin Auliya',
    'Rumi Konya',
    'Hijri Calendar',
    'Makkah Live',
    'Islamic Technology',
    'Ummah',
    'Zakat Calculator',
    'AEO Islamic Assistant',
  ],
  authors: [{ name: 'Noor-e-ilahi Global Islamic Foundation' }],
  creator: 'Noor-e-ilahi Ecosystem',
  publisher: 'Noor-e-ilahi',
  alternates: {
    canonical: 'https://noor.app',
    languages: {
      'x-default': 'https://noor.app',
      'en': 'https://noor.app?lang=en',
      'hi': 'https://noor.app?lang=hi',
      'ur': 'https://noor.app?lang=ur',
      'ar': 'https://noor.app?lang=ar',
      'bn': 'https://noor.app?lang=bn',
      'tr': 'https://noor.app?lang=tr',
      'id': 'https://noor.app?lang=id',
      'ta': 'https://noor.app?lang=ta',
      'ml': 'https://noor.app?lang=ml',
      'mr': 'https://noor.app?lang=mr',
      'gu': 'https://noor.app?lang=gu',
    },
  },
  openGraph: {
    title: 'Noor-e-ilahi — Your Deen. Your Daily Companion.',
    description:
      'The premier Islamic technology platform for astronomical prayer times, Noble Quran, Hisn al-Muslim duas, 3D Qibla compass, and global Ziyarat chronicles.',
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
    alternateLocale: ['ar_SA', 'ur_PK', 'hi_IN', 'tr_TR', 'id_ID', 'bn_BD'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor-e-ilahi — Your Deen. Your Daily Companion.',
    description:
      'Precision astronomical prayer times, Noble Quran audio, authentic duas, 3D Qibla compass, and 31 audited global Ziyarat shrines.',
    images: ['https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&h=630&q=90'],
    creator: '@nooreilahi',
  },
  other: {
    'geo.region': 'SA-02',
    'geo.placename': 'Makkah Al-Mukarramah',
    'geo.position': '21.4225;39.8262',
    'ICBM': '21.4225, 39.8262',
    'ai-content-declarations': 'Scholarly Verified Islamic Corpus with Zero Synthetic Inventions',
    'citation_title': 'Noor-e-ilahi: Global Islamic Digital Platform',
    'citation_publisher': 'Noor-e-ilahi Global Islamic Foundation',
    'citation_language': 'en, hi, ur, ar, tr, id, bn, ta, ml, mr, gu',
    'apple-itunes-app': 'app-id=6478901234, app-argument=noor://',
    'google-play-app': 'app-id=com.noor.app',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '64x64', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/icon', sizes: '64x64', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#02120d',
};


import Script from 'next/script';
import { LanguageProvider } from '../context/LanguageContext';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6VEVYV7DX2';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <JsonLd />
        <link rel="alternate" type="text/plain" href="https://noor.app/llms.txt" title="LLMs.txt AEO Knowledge Base" />
        <link rel="author" href="https://noor.app/llms.txt" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#02120d] text-[#f3f4f6] antialiased flex flex-col selection:bg-amber-500 selection:text-black"
      >
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
