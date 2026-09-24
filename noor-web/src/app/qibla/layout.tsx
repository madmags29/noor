import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qibla Direction — Find Kaaba Direction from Your Location with 3D Compass',
  description:
    'Find the exact Qibla direction (direction of the Holy Kaaba in Makkah) from anywhere in the world. Uses spherical great-circle trigonometry with GPS and gyroscope sensor calibration. Works offline. True-North magnetic compensation.',
  keywords: [
    'Qibla direction',
    'find Qibla',
    'Qibla compass online',
    'Kaaba direction',
    'Makkah direction',
    'which direction to pray',
    'Qibla finder',
    'Kibla direction',
    'Islamic compass',
    'prayer direction',
    'Qibla London',
    'Qibla New York',
    'Qibla Dubai',
    'Qibla calculator',
    'find Qibla from my location',
    'true north Qibla',
    'GPS Qibla direction',
    'Qibla app',
    'spherical Qibla calculation',
    'great circle Kaaba direction',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/qibla',
    languages: {
      'x-default': 'https://www.nooreilahi.com/qibla',
      en: 'https://www.nooreilahi.com/qibla?lang=en',
      ar: 'https://www.nooreilahi.com/qibla?lang=ar',
      ur: 'https://www.nooreilahi.com/qibla?lang=ur',
    },
  },
  openGraph: {
    title: 'Qibla Direction Finder — 3D Kaaba Compass | Noor-e-ilahi',
    description:
      'Find the exact Qibla direction from your location using GPS & spherical great-circle trigonometry. Works offline.',
    url: 'https://www.nooreilahi.com/qibla',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qibla Direction Finder | Noor-e-ilahi',
    description: 'Find exact Kaaba direction from anywhere worldwide using GPS & spherical trigonometry.',
  },
};

export default function QiblaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
