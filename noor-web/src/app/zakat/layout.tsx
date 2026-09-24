import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zakat Calculator 2026 — Calculate Your Zakat on Gold, Silver & Savings',
  description:
    'Free online Zakat calculator 2026 with live gold & silver nisab prices. Calculate Zakat on savings, gold, silver, investments, and trade inventory in your local currency. Based on authentic Hanafi & Shafi\'i jurisprudence.',
  keywords: [
    'Zakat calculator 2026',
    'Zakat calculator online',
    'how to calculate Zakat',
    'Nisab gold 2026',
    'Nisab silver 2026',
    'Zakat on savings',
    'Zakat on gold',
    'Zakat on silver',
    'Zakat on investments',
    'Zakat 2.5 percent',
    'Zakat eligible recipients',
    'pay Zakat online',
    'Islamic charity calculator',
    'Zakat al-Mal',
    'Zakat ul Fitr',
    'Hawl Zakat',
    'Zakat Hanafi method',
    'Zakat calculation method',
    'obligatory charity Islam',
    'Islamic finance calculator',
    'Muslim wealth purification',
    'Sadaqah calculator',
    'Fitra amount 2026',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/zakat',
    languages: {
      'x-default': 'https://www.nooreilahi.com/zakat',
      en: 'https://www.nooreilahi.com/zakat?lang=en',
      ar: 'https://www.nooreilahi.com/zakat?lang=ar',
      ur: 'https://www.nooreilahi.com/zakat?lang=ur',
    },
  },
  openGraph: {
    title: 'Zakat Calculator 2026 — Gold, Silver & Savings Nisab | Noor-e-ilahi',
    description:
      'Calculate your Zakat liability accurately. Live gold/silver nisab, multi-currency support, authentic Hanafi & Shafi\'i jurisprudence.',
    url: 'https://www.nooreilahi.com/zakat',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zakat Calculator 2026 | Noor-e-ilahi',
    description: 'Free Zakat calculator with live gold/silver nisab. Multi-currency. Authentic jurisprudence.',
  },
};

export default function ZakatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
