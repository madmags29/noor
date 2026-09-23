// ============================================================
// NOOR Web — Schema.org JSON-LD (SEO, AEO & GEO Architecture)
// ============================================================

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://noor.app/#organization',
        name: 'Noor-e-ilahi Global Islamic Platform',
        url: 'https://noor.app',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=512&q=90',
          caption: 'Noor-e-ilahi Islamic Digital Ecosystem Logo',
        },
        slogan: 'Your Deen. Your Daily Companion.',
        description: 'Global Islamic digital ecosystem offering astronomical prayer times, Quran audio recitation, authentic duas, and spherical Qibla direction.',
        sameAs: [
          'https://twitter.com/nooreilahi',
          'https://facebook.com/nooreilahi',
          'https://instagram.com/nooreilahi',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://noor.app/#website',
        url: 'https://noor.app',
        name: 'Noor-e-ilahi',
        description: 'World-Class Global Islamic Digital Ecosystem',
        publisher: {
          '@id': 'https://noor.app/#organization',
        },
        inLanguage: ['en', 'ar', 'ur', 'id', 'tr', 'fr'],
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://noor.app/quran?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Noor-e-ilahi: Prayer Times, Quran & Qibla',
        operatingSystem: 'iOS, Android, Web',
        applicationCategory: 'LifestyleApplication',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '128450',
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://noor.app/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is NOOR Islamic Digital Ecosystem?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NOOR is a global Islamic technology platform that unifies astronomical prayer times, live Adhan audio, the Holy Quran with worldwide recitations, Hisn al-Muslim duas, 3D Qibla compass, and AI Islamic assistance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How are prayer times calculated in NOOR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NOOR utilizes precise solar astronomical algorithms based on coordinates and UTC offset, supporting all recognized Islamic conventions including Muslim World League (MWL), ISNA, Umm Al-Qura University (Makkah), and Egyptian Authority.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does NOOR calculate Qibla direction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Qibla is determined using the spherical great-circle trigonometric formula towards the Holy Kaaba in Makkah (21.4225° N, 39.8262° E), providing accurate compass bearing and exact distance in kilometers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I download NOOR on iOS and Android?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, NOOR is built with React Native and Expo for iOS and Android, available for download on the Apple App Store and Google Play Store.',
            },
          },
        ],
      },
      {
        '@type': 'Place',
        name: 'The Holy Kaaba (Al-Kaaba Al-Musharrafa)',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.422487,
          longitude: 39.826206,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Makkah Al-Mukarramah',
          addressCountry: 'Saudi Arabia',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
