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
          {
            '@type': 'ListItem',
            position: 9,
            name: 'Prayer & Purification Guides',
            item: 'https://www.nooreilahi.com/guides',
          },
          {
            '@type': 'ListItem',
            position: 10,
            name: 'Hajj & Umrah Field Guide',
            item: 'https://www.nooreilahi.com/hajj-umrah',
          },
          {
            '@type': 'ListItem',
            position: 11,
            name: 'Zakat & Sadaqah Hub',
            item: 'https://www.nooreilahi.com/zakat',
          },
          {
            '@type': 'ListItem',
            position: 12,
            name: 'Janazah & Bereavement Guide',
            item: 'https://www.nooreilahi.com/janazah',
          },
          {
            '@type': 'ListItem',
            position: 13,
            name: 'Search Islam Encyclopedia',
            item: 'https://www.nooreilahi.com/search',
          },
          {
            '@type': 'ListItem',
            position: 14,
            name: 'NOOR Travel Mode',
            item: 'https://www.nooreilahi.com/travel',
          },
          {
            '@type': 'ListItem',
            position: 15,
            name: 'Islamic Etiquette (Adab)',
            item: 'https://www.nooreilahi.com/etiquette',
          },
          {
            '@type': 'ListItem',
            position: 16,
            name: 'Nikah & Family Education',
            item: 'https://www.nooreilahi.com/nikah',
          },
          {
            '@type': 'ListItem',
            position: 17,
            name: 'NOOR Kids',
            item: 'https://www.nooreilahi.com/kids',
          },
          {
            '@type': 'ListItem',
            position: 18,
            name: 'NOOR Watch',
            item: 'https://www.nooreilahi.com/watch',
          },
          {
            '@type': 'ListItem',
            position: 19,
            name: 'Contact & Support',
            item: 'https://www.nooreilahi.com/contact',
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
            name: 'How do I perform Wudu (ablution) step by step according to the Sunnah?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'According to authentic Sunni jurisprudence, Wudu consists of 8 steps: 1. Sincere Intention (Niyyah) & saying Bismillah. 2. Washing hands to wrists 3 times. 3. Rinsing the mouth (Madmadah) 3 times. 4. Sniffing water into nostrils (Istinshaq) 3 times. 5. Washing the full face 3 times (Fard). 6. Washing arms including elbows 3 times right then left (Fard). 7. Wiping the head (Masah) and ears once (Fard). 8. Washing both feet up to ankles 3 times starting with right (Fard). Conclude by reciting the Shahadah supplication.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is Salatul Janazah (Funeral Prayer) performed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Salatul Janazah is a communal obligation (Fard Kifayah) performed standing with four Takbeers without any Ruku or Sujud: After the 1st Takbeer, recite Surah Al-Fatiha. After the 2nd Takbeer, recite Durood Ibrahim upon Prophet Muhammad ﷺ. After the 3rd Takbeer, recite the authentic Prophetic Dua for the deceased. After the 4th Takbeer, pause briefly for a Dua for the living, then conclude with Taslim to the right.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the Nisab of Zakat in Gold and Silver?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Nisab threshold for Zakat is 87.48 grams (7.5 Tola / 20 Mithqals) for Gold, or 612.36 grams (52.5 Tola / 200 Dirhams) for Silver. When a Muslim holds net zakatable wealth (cash, savings, gold, silver, shares, trade inventory minus immediate debts) exceeding the Nisab for one full lunar year (Hawl), 2.5% of that wealth must be distributed to the 8 Quranically designated recipient categories.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the minimum travel distance to qualify for Qasr (shortened) prayer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The majority of Islamic jurists define the Safar distance as approximately 77 kilometers (48 miles). Once a traveler passes city limits intending to travel this distance, they shorten 4-rak\'ah Fard prayers (Dhuhr, Asr, Isha) to 2 rak\'ahs, may combine Dhuhr with Asr and Maghrib with Isha during journey transit, and may wipe over thick socks/Khuffayn for up to 72 hours (3 days and nights).',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the 5 mandatory pillars of an Islamic Nikah (Marriage)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A valid Islamic Nikah requires: 1. Mutual consent (Ijab & Qubul) from bride and groom. 2. The Bride\'s Guardian (Wali). 3. Two sane, adult, upright Muslim witnesses. 4. Mandatory Bridal Gift (Mahr) agreed upon and gifted exclusively to the bride. 5. Public proclamation without concealment.',
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
      {
        '@type': 'Place',
        '@id': 'https://www.nooreilahi.com/#nabawi',
        name: 'Al-Masjid an-Nabawi (The Prophet\'s Mosque)',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 24.4672,
          longitude: 39.6111,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Madinah Al-Munawwarah',
          addressCountry: 'Saudi Arabia',
        },
      },
      {
        '@type': 'Place',
        '@id': 'https://www.nooreilahi.com/#aqsa',
        name: 'Al-Masjid al-Aqsa (Bait al-Maqdis)',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 31.7761,
          longitude: 35.2358,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Old City, Jerusalem',
          addressCountry: 'Palestine',
        },
      },
      {
        '@type': 'HowTo',
        '@id': 'https://www.nooreilahi.com/guides#howto-wudu',
        name: 'How to Perform Wudu (Ablution) Step-by-Step according to Sunnah',
        description: 'Complete 8-step guide to ritual purification before prayer with authentic hadith evidence.',
        totalTime: 'PT3M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Intention (Niyyah) & Bismillah',
            text: 'Form the sincere intention in your heart to purify yourself for Allah, then say: "Bismillah".',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Washing Hands to Wrists',
            text: 'Wash both hands up to the wrists three times, ensuring water passes between fingers.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Rinsing the Mouth (Madmadah)',
            text: 'Take water with the right hand and rinse the mouth thoroughly three times.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Sniffing Water into Nostrils (Istinshaq)',
            text: 'Inhale water gently into nostrils using right hand and blow it out with the left hand, three times.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Washing the Face (Fard)',
            text: 'Wash the entire face three times, from hair-line to jawbone, and from ear to ear.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Washing the Arms including Elbows (Fard)',
            text: 'Wash the right arm from fingertips up to and including the elbow 3 times, then repeat for the left arm.',
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Wiping the Head & Ears (Masah) (Fard)',
            text: 'Wipe wet hands from forehead over the crown to the nape and back once, then clean inside and outside of ears.',
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Washing the Feet to Ankles (Fard)',
            text: 'Wash the right foot up to the ankle 3 times cleaning between toes, then repeat for the left foot. Conclude with the Shahadah supplication.',
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://www.nooreilahi.com/janazah#howto-janazah',
        name: 'How to Pray Salatul Janazah (Islamic Funeral Prayer)',
        description: 'Step-by-step funeral prayer guide with 4 Takbeers and authentic verbatim Arabic Duas.',
        totalTime: 'PT5M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: '1st Takbeer: Recite Surah Al-Fatiha',
            text: 'Say "Allahu Akbar", fold hands, and recite Surah Al-Fatiha in a low voice.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: '2nd Takbeer: Recite Durood Ibrahim',
            text: 'Say "Allahu Akbar" and recite Durood Ibrahim sending peace and blessings upon Prophet Muhammad ﷺ.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '3rd Takbeer: Supplication for Deceased',
            text: 'Say "Allahu Akbar" and recite the authentic Prophetic supplication asking Allah to forgive the deceased and expand their grave.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: '4th Takbeer: Supplication for Living & Taslim',
            text: 'Say "Allahu Akbar", make a brief Dua for the living Ummah, then turn head to the right and declare "As-salamu \'alaykum wa rahmatullah".',
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': 'https://www.nooreilahi.com/zakat#howto-zakat',
        name: 'How to Calculate Zakat on Wealth (2.5%)',
        description: 'Step-by-step calculation of annual Zakat liability using Gold and Silver Nisab standards.',
        totalTime: 'PT5M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Check the Current Nisab Threshold',
            text: 'Determine the Nisab: 87.48 grams of Gold or 612.36 grams of Silver using current spot prices.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Sum All Zakatable Assets',
            text: 'Calculate total cash savings, gold/silver value, active trade inventory, and liquid shares.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Deduct Immediate Liabilities',
            text: 'Subtract immediate due bills, unpaid debts, and overdue living expenses from your total assets.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Multiply Net Zakatable Wealth by 2.5%',
            text: 'If your net wealth held for a lunar year (Hawl) equals or exceeds Nisab, pay exactly 2.5% to verified charitable causes.',
          },
        ],
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
