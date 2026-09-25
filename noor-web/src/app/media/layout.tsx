import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Islamic Media & Adhan — Live Makkah 24/7 & Recitations',
  description:
    'Watch live Makkah Haram 24/7 broadcasts, listen to beautiful Quran recitations, Islamic nasheeds, and global Adhan audio for all daily prayers.',
  keywords: [
    'Adhan audio',
    'Makkah Adhan live',
    'live Makkah 24/7',
    'Islamic media',
    'Quran recitation audio',
    'Abdul Basit recitation',
    'Mishary Alafasy recitation',
    'Sheikh Sudais recitation',
    'Islamic nasheed',
    'Azan Makkah',
    'Adhan Madinah',
    'online Azan',
    'beautiful Adhan audio',
    'Islamic audio streaming',
    'listen to Adhan',
    'Fajr Adhan audio',
    'Islamic radio',
    'Quran audio online',
    'Muslim music halal',
    'Islamic content streaming',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/media',
    languages: {
      'x-default': 'https://www.nooreilahi.com/media',
      en: 'https://www.nooreilahi.com/media?lang=en',
      ar: 'https://www.nooreilahi.com/media?lang=ar',
    },
  },
  openGraph: {
    title: 'Adhan & Islamic Media — Live Makkah & Quran Recitations | Noor-e-ilahi',
    description: 'Live Makkah 24/7, beautiful Adhan audio, Quran recitations and Islamic media in one place.',
    url: 'https://www.nooreilahi.com/media',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adhan & Islamic Media | Noor-e-ilahi',
    description: 'Live Makkah Adhan 24/7, Quran recitations by top reciters, and Islamic audio.',
  },
};

export default function MediaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
