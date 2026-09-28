import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Noor-e-ilahi Web & Mobile App',
  description:
    'Privacy Policy for Noor-e-ilahi Web and Mobile Apps. We respect your Amanah: 100% ad-free, zero tracking, ephemeral location for prayer times, and no data selling.',
  keywords: [
    'Noor-e-ilahi privacy policy',
    'Islamic app privacy',
    'prayer times data safety',
    'Qibla compass location privacy',
    'ad-free Islamic app',
    'zero tracking Quran app',
    'GDPR Islamic app',
    'Google Play data safety Noor',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/privacy',
    languages: {
      'x-default': 'https://www.nooreilahi.com/privacy',
      en: 'https://www.nooreilahi.com/privacy?lang=en',
      ur: 'https://www.nooreilahi.com/privacy?lang=ur',
      ar: 'https://www.nooreilahi.com/privacy?lang=ar',
    },
  },
  openGraph: {
    title: 'Privacy Policy | Noor-e-ilahi Web & Mobile Ecosystem',
    description:
      'Learn how Noor-e-ilahi protects your privacy across our web platform and mobile apps. Zero ads, ephemeral location for prayer times, and strict privacy protection.',
    url: 'https://www.nooreilahi.com/privacy',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Noor-e-ilahi Web & Mobile App',
    description: 'Privacy Policy for Noor-e-ilahi: 100% ad-free, zero tracking, and complete privacy protection.',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
