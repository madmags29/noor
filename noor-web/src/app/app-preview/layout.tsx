import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noor-e-ilahi App — Free Islamic App for iOS & Android',
  description:
    'Download the Noor-e-ilahi Islamic mobile app for iOS and Android: prayer times, offline Quran, Qibla compass, duas, and AI assistant.',
  keywords: [
    'Islamic app download',
    'Muslim app iOS',
    'Muslim app Android',
    'Islamic prayer app',
    'best Islamic app 2026',
    'Noor app download',
    'prayer times app',
    'Quran app offline',
    'Qibla app',
    'Islamic companion app',
    'Muslim daily app',
    'Islamic reminder app',
    'Azan app',
    'ad-free Islamic app',
    'Islamic all in one app',
    'halal app',
    'Islamic productivity app',
    'Muslim lifestyle app',
    'deen app download',
    'Islamic app free',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/app-preview',
    languages: {
      'x-default': 'https://www.nooreilahi.com/app-preview',
      en: 'https://www.nooreilahi.com/app-preview?lang=en',
    },
  },
  openGraph: {
    title: 'Download Noor-e-ilahi App — Free Islamic Companion for iOS & Android',
    description: 'Prayer times, offline Quran, Qibla, duas, Hijri calendar & Noor AI. 100% free, ad-free.',
    url: 'https://www.nooreilahi.com/app-preview',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Noor-e-ilahi — Free Islamic App | iOS & Android',
    description: 'The ultimate Islamic companion app. Prayer times, Quran, Qibla, duas. Free, ad-free.',
  },
};

export default function AppPreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
