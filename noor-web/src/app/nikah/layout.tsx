import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nikah & Islamic Marriage Guide — Requirements & Mahr',
  description:
    'Complete Islamic Nikah guide: pillars of valid marriage, Mahr rules, contract conditions, rights of spouses, and wedding duas based on authentic Fiqh.',
  keywords: [
    'Islamic Nikah guide',
    'how to perform Nikah',
    'Nikah requirements Islam',
    'Mahr bridal gift Islam',
    'Islamic marriage contract',
    'Wali in Nikah',
    'Islamic wedding dua',
    'Islamic marriage rights',
    'husband wife rights Islam',
    'Islamic family law',
    'Muslim marriage guide',
    'Nikah conditions Fiqh',
    'Ijab and Qubul Nikah',
    'Muslim wedding etiquette',
    'Islamic divorce talaq',
    'parenting in Islam',
    'marriage dua Arabic',
    'Islamic family planning',
    'Walima wedding feast Islam',
    'halal marriage guide',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/nikah',
    languages: {
      'x-default': 'https://www.nooreilahi.com/nikah',
      en: 'https://www.nooreilahi.com/nikah?lang=en',
      ar: 'https://www.nooreilahi.com/nikah?lang=ar',
      ur: 'https://www.nooreilahi.com/nikah?lang=ur',
    },
  },
  openGraph: {
    title: 'Islamic Nikah & Marriage Guide — Mahr, Rights & Duas | Noor-e-ilahi',
    description:
      'Complete Nikah guide: 5 pillars of Islamic marriage, Mahr rules, husband/wife rights, wedding duas, and family law.',
    url: 'https://www.nooreilahi.com/nikah',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Islamic Nikah & Marriage Guide | Noor-e-ilahi',
    description: 'Complete Nikah guide with Mahr rules, marriage requirements, and authentic wedding duas.',
  },
};

export default function NikahLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
