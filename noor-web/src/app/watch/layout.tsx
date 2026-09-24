import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOOR Watch — Live Makkah Haram & Madinah Stream 24/7',
  description:
    'Watch live 24/7 streams of Masjid al-Haram (Holy Kaaba, Makkah) and Al-Masjid an-Nabawi (Prophet\'s Mosque, Madinah). Live Tawaf, prayers, and spiritual atmosphere from the two holiest mosques in Islam. Free, ad-free, HD quality.',
  keywords: [
    'live Makkah stream',
    'Makkah live 24/7',
    'Kaaba live stream',
    'Madinah live stream',
    'Al-Haram live',
    'Holy Kaaba watch online',
    'Masjid al-Haram live',
    'Al-Masjid an-Nabawi live',
    'Makkah Taraweeh live',
    'Prophet mosque live',
    'Tawaf live stream',
    'Hajj live 2026',
    'Ramadan Makkah live',
    'Islamic live streaming',
    'watch Kaaba online',
    'live prayer Makkah',
    'Haram Sharif live',
    'Muslim live stream',
    'spiritual live stream',
    'free Makkah stream',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/watch',
    languages: {
      'x-default': 'https://www.nooreilahi.com/watch',
      en: 'https://www.nooreilahi.com/watch?lang=en',
      ar: 'https://www.nooreilahi.com/watch?lang=ar',
    },
  },
  openGraph: {
    title: 'NOOR Watch — Live Makkah & Madinah Stream 24/7 | Noor-e-ilahi',
    description: 'Watch live Masjid al-Haram (Makkah) and Al-Masjid an-Nabawi (Madinah) 24/7. Free, ad-free, HD.',
    url: 'https://www.nooreilahi.com/watch',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Makkah & Madinah 24/7 | Noor-e-ilahi',
    description: 'Free 24/7 HD live stream of Holy Kaaba (Makkah) and Prophet\'s Mosque (Madinah).',
  },
};

export default function WatchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
