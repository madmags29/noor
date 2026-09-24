import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Noor-e-ilahi — Support, Scholarly Feedback & Partnerships',
  description:
    'Contact the Noor-e-ilahi team for technical support, scholarly correction submissions, partnership inquiries, press inquiries, and feature requests. Email: support@nooreilahi.com',
  keywords: [
    'contact Noor-e-ilahi',
    'Islamic app support',
    'Noor support email',
    'Islamic platform contact',
    'report Islamic content',
    'Islamic scholarship feedback',
    'Noor partnership',
    'Islamic app feedback',
  ],
  alternates: {
    canonical: 'https://www.nooreilahi.com/contact',
  },
  openGraph: {
    title: 'Contact Noor-e-ilahi — Support & Inquiries',
    description: 'Reach our team for support, scholarly feedback, partnerships, and feature requests.',
    url: 'https://www.nooreilahi.com/contact',
    siteName: 'Noor-e-ilahi Islamic Ecosystem',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
