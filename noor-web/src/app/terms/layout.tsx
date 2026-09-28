import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Noor-e-ilahi Web & Mobile App',
  description:
    'Terms and Conditions for Noor-e-ilahi Web and Mobile Apps. Guidelines on religious utility use, astronomical timetable disclaimers, intellectual property, and community conduct.',
  keywords: [
    'Noor-e-ilahi terms and conditions',
    'terms of service Noor',
    'Islamic app terms',
    'prayer time calculation disclaimer',
    'Zakat calculator terms',
    'Quran app terms of use',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/terms',
    languages: {
      'x-default': 'https://www.nooreilahi.com/terms',
      en: 'https://www.nooreilahi.com/terms?lang=en',
      ur: 'https://www.nooreilahi.com/terms?lang=ur',
      ar: 'https://www.nooreilahi.com/terms?lang=ar',
    },
  },
  openGraph: {
    title: 'Terms & Conditions | Noor-e-ilahi Web & Mobile Ecosystem',
    description:
      'Terms and Conditions governing the use of Noor-e-ilahi across website and mobile applications.',
    url: 'https://www.nooreilahi.com/terms',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions | Noor-e-ilahi Web & Mobile App',
    description: 'Terms and Conditions for Noor-e-ilahi Web and Mobile applications.',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
