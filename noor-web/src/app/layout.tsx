import type { Metadata } from 'next';
import './globals.css';
import JsonLd from '../components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nooreilahi.com'),
  title: {
    default: 'Noor-e-ilahi — Islamic Prayer Times, Quran, Qibla & Zakat | Global Islamic Platform',
    template: '%s | Noor-e-ilahi',
  },
  description:
    'Noor-e-ilahi is the world\'s most complete free Islamic platform: precise astronomical prayer times, Noble Quran with 11-language audio, authentic Hisn al-Muslim duas, 3D Qibla compass, Zakat calculator, Hajj & Umrah guide, Janazah guide, Hijri calendar, live Makkah streams, 31 global Ziyarat shrines, and offline support. 100% ad-free.',
  keywords: [
    'Noor-e-ilahi',
    'Islamic App',
    'prayer times',
    'prayer times today',
    'Fajr time',
    'Azan time',
    'Namaz time',
    'read Quran online',
    'Quran translation',
    'Quran audio',
    'offline Quran',
    'Qibla direction',
    'find Qibla',
    'Kaaba direction',
    'Wudu step by step',
    'how to perform Wudu',
    'how to perform Salah',
    'Ghusl guide',
    'Salatul Janazah',
    'Islamic funeral prayer',
    'Hajj guide 2026',
    'Umrah guide 2026',
    'Hajj steps',
    'Umrah steps',
    'Ihram rules',
    'Tawaf',
    'Arafat',
    'Zamzam',
    'Miqat stations',
    'Zakat calculator 2026',
    'Nisab gold silver',
    'Islamic charity',
    'Islamic duas',
    'Hisn al-Muslim',
    'morning adhkar',
    'evening adhkar',
    'Ajmer Sharif',
    'Nizamuddin Auliya',
    'Mevlana Rumi',
    'Islamic shrines',
    'dargah directory',
    'Hijri calendar 2026',
    'Ramadan 2026',
    'Eid al-Fitr 2026',
    'Islamic travel prayer',
    'Qasr prayer',
    'Islamic etiquette',
    'Nikah guide',
    'Islamic marriage',
    'Islamic kids education',
    'Arabic alphabet kids',
    'live Makkah stream',
    'Kaaba live 24/7',
    'Islamic search engine',
    'Noor AI Islamic assistant',
  ],
  authors: [{ name: 'Noor-e-ilahi Global Islamic Foundation', url: 'https://www.nooreilahi.com' }],
  creator: 'Noor-e-ilahi Ecosystem',
  publisher: 'Noor-e-ilahi',
  category: 'religion',
  classification: 'Islamic Digital Platform',
  alternates: {
    canonical: 'https://www.nooreilahi.com',
    languages: {
      'x-default': 'https://www.nooreilahi.com',
      'en': 'https://www.nooreilahi.com?lang=en',
      'en-GB': 'https://www.nooreilahi.com?lang=en',
      'en-US': 'https://www.nooreilahi.com?lang=en',
      'hi': 'https://www.nooreilahi.com?lang=hi',
      'hi-IN': 'https://www.nooreilahi.com?lang=hi',
      'ur': 'https://www.nooreilahi.com?lang=ur',
      'ur-PK': 'https://www.nooreilahi.com?lang=ur',
      'ar': 'https://www.nooreilahi.com?lang=ar',
      'ar-SA': 'https://www.nooreilahi.com?lang=ar',
      'bn': 'https://www.nooreilahi.com?lang=bn',
      'bn-BD': 'https://www.nooreilahi.com?lang=bn',
      'tr': 'https://www.nooreilahi.com?lang=tr',
      'tr-TR': 'https://www.nooreilahi.com?lang=tr',
      'id': 'https://www.nooreilahi.com?lang=id',
      'id-ID': 'https://www.nooreilahi.com?lang=id',
      'ta': 'https://www.nooreilahi.com?lang=ta',
      'ta-IN': 'https://www.nooreilahi.com?lang=ta',
      'ml': 'https://www.nooreilahi.com?lang=ml',
      'ml-IN': 'https://www.nooreilahi.com?lang=ml',
      'mr': 'https://www.nooreilahi.com?lang=mr',
      'mr-IN': 'https://www.nooreilahi.com?lang=mr',
      'gu': 'https://www.nooreilahi.com?lang=gu',
      'gu-IN': 'https://www.nooreilahi.com?lang=gu',
      'ms': 'https://www.nooreilahi.com?lang=id',
      'ms-MY': 'https://www.nooreilahi.com?lang=id',
      'fr': 'https://www.nooreilahi.com?lang=en',
      'de': 'https://www.nooreilahi.com?lang=en',
    },
  },
  openGraph: {
    title: 'Noor-e-ilahi — Prayer Times, Quran, Qibla, Zakat & Islamic Guides',
    description:
      'The world\'s most complete free Islamic platform: prayer times, Quran audio, Qibla compass, Zakat calculator, Hajj/Umrah guide, duas, Hijri calendar, live Makkah, and 31 global Ziyarat shrines. 100% ad-free.',
    url: 'https://www.nooreilahi.com',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&h=630&q=90',
        width: 1200,
        height: 630,
        alt: 'Noor-e-ilahi — Holy Kaaba at Masjid al-Haram, Makkah Al-Mukarramah',
        type: 'image/jpeg',
      },
      {
        url: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&h=630&q=90',
        width: 1200,
        height: 630,
        alt: 'Noor-e-ilahi — Al-Masjid an-Nabawi, Madinah Al-Munawwarah',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'ur_PK', 'hi_IN', 'tr_TR', 'id_ID', 'bn_BD', 'ms_MY', 'fr_FR', 'de_DE'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor-e-ilahi — Prayer Times, Quran, Qibla & Zakat | Islamic Platform',
    description:
      'Precise prayer times, Quran audio (11 languages), Qibla compass, Zakat calculator, Hajj/Umrah guide, 31 global Ziyarat shrines. 100% free & ad-free.',
    images: ['https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&h=630&q=90'],
    creator: '@nooreilahi',
    site: '@nooreilahi',
  },
  other: {
    'geo.region': 'SA-02',
    'geo.placename': 'Makkah Al-Mukarramah',
    'geo.position': '21.4225;39.8262',
    'ICBM': '21.4225, 39.8262',
    'ai-content-declarations': 'Scholarly Verified Islamic Corpus — Zero Synthetic Inventions',
    'citation_title': 'Noor-e-ilahi: Global Islamic Digital Ecosystem',
    'citation_publisher': 'Noor-e-ilahi Global Islamic Foundation',
    'citation_language': 'en, hi, ur, ar, tr, id, bn, ta, ml, mr, gu',
    'citation_online_date': '2025/01/01',
    'apple-itunes-app': 'app-id=6478901234, app-argument=noor://',
    'google-play-app': 'app-id=com.noor.app',
    'theme-color': '#02120d',
    'color-scheme': 'dark',
    'rating': 'general',
    'revisit-after': '3 days',
    'language': 'English, Arabic, Urdu, Hindi, Bengali, Turkish, Indonesian, Tamil, Malayalam, Marathi, Gujarati',
    'coverage': 'Worldwide',
    'distribution': 'Global',
    'target': 'all',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'U0EUqGVn0UMNM7TTtNVZQ2zVq0FaT-s_ndT_E_cfBJU',
    yandex: 'noor-yandex-verification-2026',
    other: {
      'msvalidate.01': 'noor-bing-verification-2026',
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
        <link rel="alternate" type="text/plain" href="https://www.nooreilahi.com/llms.txt" title="LLMs.txt AEO Knowledge Base" />
        <link rel="author" href="https://www.nooreilahi.com/llms.txt" />
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
