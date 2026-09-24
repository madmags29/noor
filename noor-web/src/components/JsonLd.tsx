// ============================================================
// NOOR Web — Schema.org JSON-LD (SEO, AEO & GEO Knowledge Graph)
// Full Schema.org compliance for Google, Perplexity, Gemini, ChatGPT
// ============================================================

export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.nooreilahi.com/#organization',
        name: 'Noor-e-ilahi Global Islamic Platform',
        alternateName: [
          'NOOR',
          'نُورِ اِلٰہی',
          'Noor Islamic Ecosystem',
          'Noor-e-ilahi App',
          'Noor Deen Companion',
        ],
        url: 'https://www.nooreilahi.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=512&q=90',
          caption: 'Noor-e-ilahi Islamic Digital Ecosystem Logo',
          width: 512,
          height: 512,
        },
        slogan: 'Your Deen. Your Daily Companion.',
        description:
          'World-class global Islamic digital technology ecosystem offering precision astronomical prayer times, Noble Quran audio recitation with synchronized verse tracking, authentic Hisn al-Muslim duas, 3D spherical Qibla direction, and verified global Ziyarat chronicles across 12 nations.',
        knowsAbout: [
          'Islamic Theology & Jurisprudence (Fiqh)',
          'Astronomical Prayer Time Calculation',
          'Noble Quranic Recitation & Tajweed',
          'Authentic Hadith Collections (Kutub al-Sittah)',
          'Hisn al-Muslim Daily Supplications',
          'Spherical Great-Circle Kaaba Geodesy',
          'Sufi Heritage & Historical Ziyarat Sanctuaries',
          'Hijri Lunar-Solar Calendars',
          'Islamic Adhan Broadcasts',
        ],
        foundingDate: '2025',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support & Scholarly Inquiries',
          email: 'support@nooreilahi.com',
          availableLanguage: [
            'English',
            'Arabic',
            'Urdu',
            'Hindi',
            'Turkish',
            'Indonesian',
            'Bengali',
          ],
        },
        sameAs: [
          'https://twitter.com/nooreilahi',
          'https://facebook.com/nooreilahi',
          'https://instagram.com/nooreilahi',
          'https://github.com/madmags29/noor',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.nooreilahi.com/#website',
        url: 'https://www.nooreilahi.com',
        name: 'Noor-e-ilahi — Your Deen. Your Daily Companion.',
        alternateName: 'NOOR Islamic Ecosystem',
        description:
          'The premier ad-free Islamic digital platform for astronomical prayer times, Noble Quran, Hisn al-Muslim duas, 3D Qibla compass, and global Ziyarat chronicles.',
        publisher: {
          '@id': 'https://www.nooreilahi.com/#organization',
        },
        inLanguage: [
          'en',
          'hi',
          'ur',
          'ar',
          'bn',
          'tr',
          'id',
          'ta',
          'ml',
          'mr',
          'gu',
        ],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              'https://www.nooreilahi.com/quran?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.hero-description', '.prayer-card-summary'],
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.nooreilahi.com/#web-app',
        name: 'Noor-e-ilahi Web Platform',
        url: 'https://www.nooreilahi.com',
        operatingSystem:
          'All Modern Web Browsers (Chrome, Safari, Edge, Firefox)',
        applicationCategory: 'LifestyleApplication',
        applicationSubCategory: 'Religious & Spiritual Tools',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'Astronomical Prayer Times for Any Global Coordinates',
          'High-Fidelity Adhan Audio Broadcasts from Makkah and Medina',
          '114 Quran Surahs with Word-by-Word Audio Synchronization',
          '31 Academically Audited Ziyarat and Dargahs across 12 Nations',
          'Interactive 3D Qibla Compass with Spherical Trigonometry',
          'Authentic Hisn al-Muslim Duas and Adhkar with Arabic, Transliteration, and Translation',
          '11 Full-Featured Localized Languages with Native RTL Support',
        ],
      },
      {
        '@type': 'MobileApplication',
        '@id': 'https://www.nooreilahi.com/#mobile-app',
        name: 'Noor-e-ilahi Mobile App',
        operatingSystem: 'iOS 15.0+, Android 8.0+',
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
        installUrl: 'https://www.nooreilahi.com/app-preview',
        downloadUrl: 'https://www.nooreilahi.com/app-preview',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.nooreilahi.com/#breadcrumbs',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.nooreilahi.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Prayer Times',
            item: 'https://www.nooreilahi.com/prayer-times',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Noble Quran',
            item: 'https://www.nooreilahi.com/quran',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Global Ziyarat & Dargahs',
            item: 'https://www.nooreilahi.com/ziyarat',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Authentic Duas',
            item: 'https://www.nooreilahi.com/duas',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: '3D Qibla Compass',
            item: 'https://www.nooreilahi.com/qibla',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Hijri Calendar',
            item: 'https://www.nooreilahi.com/calendar',
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Media & Adhan',
            item: 'https://www.nooreilahi.com/media',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.nooreilahi.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Noor-e-ilahi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Noor-e-ilahi is an international, ad-free Islamic digital technology ecosystem providing precision astronomical prayer times, high-fidelity Adhan broadcasts, the Noble Quran with word-by-word recitations, authentic Hisn al-Muslim supplications, a 3D spherical Qibla compass, and the world’s first academically audited Global Ziyarat & Dargahs directory across 12 countries.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Noor-e-ilahi calculate precise prayer times for my location?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Noor uses scientific solar zenith astronomical algorithms based on the user’s exact geographic coordinates, elevation, and atmospheric refraction. It supports six major worldwide Islamic calculation conventions (Muslim World League, ISNA, Umm Al-Qura Makkah, Egyptian General Authority of Survey, University of Islamic Sciences Karachi, and Shia Leva Institute Qum) with configurable Standard and Hanafi Asr juristic methods.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the Noor 3D Qibla compass find the Kaaba direction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Qibla direction is computed using the Great-Circle forward azimuth spherical trigonometry formula targeting the exact coordinates of the Holy Kaaba in Makkah (21.422487° N, 39.826206° E), integrated with true-north geomagnetic compensation and device gyroscope orientation sensors.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Global Ziyarat & Dargahs directory on Noor-e-ilahi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Ziyarat directory features 31 academically audited historical Islamic shrines, Sufi dargahs, Ahl al-Bayt sanctuaries, and Sahabah memorials across 12 nations (including Ajmer Sharif, Hazrat Nizamuddin Auliya, Mevlana Rumi Konya, Imam Ali Najaf, Imam Husayn Karbala, Data Ganj Bakhsh Lahore, and Lal Shahbaz Qalandar) with GPS coordinates, historical chronicles, and authentic visiting etiquette (Adab al-Ziyarat).',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Noor-e-ilahi display advertisements or sell user data?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Noor-e-ilahi is 100% ad-free and privacy-first. There is zero commercial advertising, zero third-party trackers, and no behavioral profiling. All astronomical coordinate calculations run client-side.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which languages are supported on Noor-e-ilahi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Noor-e-ilahi offers native support for 11 global languages: English, Arabic, Urdu (with native Right-to-Left RTL typography), Hindi, Bengali, Turkish, Indonesian, Tamil, Malayalam, Marathi, and Gujarati.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can AI engines and search bots find machine-readable context for Noor-e-ilahi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'AI crawlers and answer engines (Perplexity, ChatGPT, Claude, Gemini) can retrieve official structured context directly at https://www.nooreilahi.com/llms.txt and https://www.nooreilahi.com/llms-full.txt.',
            },
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': 'https://www.nooreilahi.com/#ziyarat-list',
        name: 'Audited Global Islamic Ziyarat & Heritage Sanctuaries',
        description:
          'Directory of 31 audited Sufi shrines, Ahl al-Bayt sanctuaries, and historical Islamic heritage sites across 12 nations.',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'TouristAttraction',
              name: 'Ajmer Sharif Dargah (Khwaja Moinuddin Chishti Gharib Nawaz)',
              url: 'https://www.nooreilahi.com/ziyarat/dargah-hazrat-khwaja-moinuddin-chishti-ajmer-sharif',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.4561,
                longitude: 74.6282,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Ajmer',
                addressRegion: 'Rajasthan',
                addressCountry: 'India',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'TouristAttraction',
              name: 'Hazrat Nizamuddin Auliya Dargah (Sultan-ul-Mashaikh)',
              url: 'https://www.nooreilahi.com/ziyarat/dargah-hazrat-nizamuddin-auliya-delhi',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.5916,
                longitude: 77.2415,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New Delhi',
                addressCountry: 'India',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'TouristAttraction',
              name: 'Mevlana Jalaluddin Rumi Shrine (Mevlana Museum)',
              url: 'https://www.nooreilahi.com/ziyarat/mevlana-jalaluddin-rumi-tomb-konya',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 37.8708,
                longitude: 32.5053,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Konya',
                addressCountry: 'Turkey',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'TouristAttraction',
              name: 'Holy Shrine of Imam Ali Ibn Abi Talib',
              url: 'https://www.nooreilahi.com/ziyarat/holy-shrine-of-imam-ali-najaf-iraq',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 31.9961,
                longitude: 44.3142,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Najaf',
                addressCountry: 'Iraq',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'TouristAttraction',
              name: 'Data Ganj Bakhsh (Hazrat Ali Hujwiri)',
              url: 'https://www.nooreilahi.com/ziyarat/data-darbar-hazrat-ali-hujwiri-lahore',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 31.5794,
                longitude: 74.3031,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lahore',
                addressCountry: 'Pakistan',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'TouristAttraction',
              name: 'Lal Shahbaz Qalandar Dargah',
              url: 'https://www.nooreilahi.com/ziyarat/dargah-hazrat-lal-shahbaz-qalandar-sehwan-sharif',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.4252,
                longitude: 67.8617,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sehwan Sharif',
                addressCountry: 'Pakistan',
              },
            },
          },
          {
            '@type': 'ListItem',
            position: 7,
            item: {
              '@type': 'TouristAttraction',
              name: 'Haji Ali Dargah',
              url: 'https://www.nooreilahi.com/ziyarat/dargah-hazrat-haji-ali-shah-bukhari-mumbai',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 18.9772,
                longitude: 72.8093,
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Mumbai',
                addressCountry: 'India',
              },
            },
          },
        ],
      },
      {
        '@type': 'Place',
        '@id': 'https://www.nooreilahi.com/#kaaba',
        name: 'The Holy Kaaba (Al-Kaaba Al-Musharrafa)',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.422487,
          longitude: 39.826206,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Al-Haram',
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
