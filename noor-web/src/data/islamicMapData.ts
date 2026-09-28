// ============================================================
// NOOR Web — Global Islamic Map Database (OpenStreetMap)
// World's Most Revered Mosques, Ziyarat Points, Dargahs & Holy Sites
// Note: Only authentic, confirmed Muslim sanctuary imagery used.
// If not available, thumbnailUrl is empty to display official NOOR-E-ILAHI placeholder.
// ============================================================

export type MapPointType = 'mosque' | 'dargah' | 'holy_site';

export interface IslamicMapPoint {
  id: string;
  name: string;
  arabicUrduName?: string;
  type: MapPointType;
  city: string;
  country: string;
  region: 'Middle East' | 'South Asia' | 'Central Asia' | 'North Africa' | 'Europe' | 'Southeast Asia' | 'Americas' | 'East Asia';
  latitude: number;
  longitude: number;
  shortContent: string;
  thumbnailUrl: string; // If empty string, NoorPlaceholderImage is automatically rendered
  century?: string;
  slug?: string;
  googleMapsUrl?: string;
  architecturalStyle?: string;
}

export const ISLAMIC_MAP_POINTS: IslamicMapPoint[] = [
  // ==========================================
  // 1. HOLY SANCTUARIES
  // ==========================================
  {
    id: 'masjid-al-haram',
    name: 'Masjid al-Haram (The Holy Kaaba)',
    arabicUrduName: 'المسجد الحرام • الكعبة المشرفة • مكة المكرمة',
    type: 'holy_site',
    city: 'Makkah',
    country: 'Saudi Arabia',
    region: 'Middle East',
    latitude: 21.4225,
    longitude: 39.8262,
    shortContent: 'The most sacred sanctuary in Islam, encircling the Holy Kaaba (Qibla of all Muslims). Destination of the annual Hajj and Umrah pilgrimages, Zamzam well, and Maqam Ibrahim.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    century: 'Time of Prophet Ibrahim (AS)',
    architecturalStyle: 'Grand Islamic Multi-Tier White Marble & 9 Minarets',
    googleMapsUrl: 'https://maps.google.com/?q=21.4225,39.8262'
  },
  {
    id: 'masjid-an-nabawi',
    name: 'Masjid an-Nabawi (The Prophet\'s Mosque)',
    arabicUrduName: 'المسجد النبوي الشريف • القبة الخضراء • المدينة المنورة',
    type: 'holy_site',
    city: 'Madinah',
    country: 'Saudi Arabia',
    region: 'Middle East',
    latitude: 24.4672,
    longitude: 39.6109,
    shortContent: 'Second holiest sanctuary in Islam, founded by Prophet Muhammad (PBUH) upon the Hijrah. Encompasses the Rawdah ash-Sharifah and the Green Dome over the Prophet\'s resting place.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
    century: '1st Century AH / 622 CE',
    architecturalStyle: 'Iconic Green Dome, Rawdah & Kinetic Umbrella Courtyards',
    googleMapsUrl: 'https://maps.google.com/?q=24.4672,39.6109'
  },
  {
    id: 'masjid-al-aqsa',
    name: 'Masjid al-Aqsa & Dome of the Rock (Al-Quds)',
    arabicUrduName: 'المسجد الأقصى المبارك وقبة الصخرة • القدس الشريف',
    type: 'holy_site',
    city: 'Jerusalem',
    country: 'Palestine',
    region: 'Middle East',
    latitude: 31.7761,
    longitude: 35.2358,
    shortContent: 'Third holiest sanctuary in Islam and the first Qibla. Site of the Miraculous Night Journey (Isra and Mi\'raj) of the Prophet Muhammad (PBUH).',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
    century: '7th–8th Century CE (Umayyad Era)',
    architecturalStyle: 'Octagonal Golden Dome & Umayyad Silver Leaded Qibli Mosque',
    googleMapsUrl: 'https://maps.google.com/?q=31.7761,35.2358'
  },
  {
    id: 'quba-mosque',
    name: 'Masjid Quba',
    arabicUrduName: 'مسجد قباء • المدينة المنورة',
    type: 'mosque',
    city: 'Madinah',
    country: 'Saudi Arabia',
    region: 'Middle East',
    latitude: 24.4394,
    longitude: 39.6172,
    shortContent: 'The first mosque built in Islamic history, its first stones laid by Prophet Muhammad (PBUH). Praying two units of Salah here carries the spiritual reward of an Umrah.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    century: '622 CE (1st Year Hijri)',
    architecturalStyle: 'Pure White Quad-Dome Classical Hijazi Architecture',
    googleMapsUrl: 'https://maps.google.com/?q=24.4394,39.6172'
  },

  // ==========================================
  // 2. WORLD FAMOUS HISTORIC MOSQUES
  // ==========================================
  {
    id: 'sultan-ahmed-mosque',
    name: 'Sultan Ahmed Mosque (Blue Mosque)',
    arabicUrduName: 'جامع السلطان أحمد • إسطنبول',
    type: 'mosque',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    latitude: 41.0054,
    longitude: 28.9768,
    shortContent: 'Masterpiece of classical Ottoman imperial architecture commissioned by Sultan Ahmed I. Renowned for its six towering minarets and 20,000 handmade Iznik turquoise ceramic tiles.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
    century: '1616 CE',
    architecturalStyle: 'Ottoman Classical Central-Dome with Six Minarets',
    googleMapsUrl: 'https://maps.google.com/?q=41.0054,28.9768'
  },
  {
    id: 'hagia-sophia-grand-mosque',
    name: 'Hagia Sophia Grand Mosque (Ayasofya-i Kebir)',
    arabicUrduName: 'جامع آيا صوفيا الكبير • إسطنبول',
    type: 'mosque',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    latitude: 41.0086,
    longitude: 28.9802,
    shortContent: 'Monumental architectural wonder converted to an imperial mosque following Sultan Mehmed II\'s conquest in 1453. Features colossal gilded calligraphy medallions by Kazasker Mustafa Izzet.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    century: 'Consecrated 1453 CE as Imperial Mosque',
    architecturalStyle: 'Monumental Byzantine-Ottoman Fusion Dome',
    googleMapsUrl: 'https://maps.google.com/?q=41.0086,28.9802'
  },
  {
    id: 'sheikh-zayed-grand-mosque',
    name: 'Sheikh Zayed Grand Mosque',
    arabicUrduName: 'جامع الشيخ زايد الكبير • أبوظبي',
    type: 'mosque',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Middle East',
    latitude: 24.4128,
    longitude: 54.475,
    shortContent: 'One of the world\'s largest contemporary mosques, clad in Macedonian Sivec white marble. Houses the world\'s largest hand-knotted Persian carpet and 24-carat gold-plated chandeliers.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512632570417-a6096a60775d?auto=format&fit=crop&w=800&q=80',
    century: '2007 CE',
    architecturalStyle: 'Neo-Islamic Mughal, Moorish & Fatimid Symphony',
    googleMapsUrl: 'https://maps.google.com/?q=24.4128,54.475'
  },
  {
    id: 'hassan-ii-mosque',
    name: 'Hassan II Mosque',
    arabicUrduName: 'مسجد الحسن الثاني • الدار البيضاء',
    type: 'mosque',
    city: 'Casablanca',
    country: 'Morocco',
    region: 'North Africa',
    latitude: 33.6086,
    longitude: -7.6328,
    shortContent: 'Perched dramatically over the Atlantic Ocean, featuring a 210-meter minaret that directs a laser beam toward Makkah. Showcases exquisite hand-carved Moroccan stucco and Zellij tilework.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1569420038-d68f23f669db?auto=format&fit=crop&w=800&q=80',
    century: '1993 CE',
    architecturalStyle: 'Moroccan Moorish Oceanfront Masterpiece',
    googleMapsUrl: 'https://maps.google.com/?q=33.6086,-7.6328'
  },
  {
    id: 'badshahi-mosque-lahore',
    name: 'Badshahi Mosque',
    arabicUrduName: 'بادشاہی مسجد • لاہور',
    type: 'mosque',
    city: 'Lahore',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 31.5882,
    longitude: 74.3105,
    shortContent: 'Monumental Mughal congregational mosque commissioned by Emperor Aurangzeb Alamgir. Constructed with carved red sandstone with white marble inlay overlooking the Lahore Fort.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    century: '1673 CE (1084 AH)',
    architecturalStyle: 'Classical Mughal Red Sandstone Imperial Courtyard',
    googleMapsUrl: 'https://maps.google.com/?q=31.5882,74.3105'
  },
  {
    id: 'jama-masjid-delhi',
    name: 'Jama Masjid (Masjid-i-Jahan Numa)',
    arabicUrduName: 'جامع مسجد دہلی • ہندوستان',
    type: 'mosque',
    city: 'Delhi',
    country: 'India',
    region: 'South Asia',
    latitude: 28.6507,
    longitude: 77.2334,
    shortContent: 'Principal imperial congregational mosque built by Mughal Emperor Shah Jahan. Built of red sandstone and pure white marble with three grand domes and two 40-meter minarets.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
    century: '1656 CE (1066 AH)',
    architecturalStyle: 'High Mughal Red Sandstone & Marble Monument',
    googleMapsUrl: 'https://maps.google.com/?q=28.6507,77.2334'
  },
  {
    id: 'faisal-mosque',
    name: 'Faisal Mosque',
    arabicUrduName: 'مسجد الملك فيصل • إسلام آباد',
    type: 'mosque',
    city: 'Islamabad',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 33.7297,
    longitude: 73.0372,
    shortContent: 'National mosque of Pakistan nestled at the foot of Margalla Hills, designed by Turkish architect Vedat Dalokay resembling a Bedouin desert tent, flanked by four 88-meter minarets.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
    century: '1986 CE',
    architecturalStyle: 'Modernist Bedouin Tent Architecture & Turkish Minarets',
    googleMapsUrl: 'https://maps.google.com/?q=33.7297,73.0372'
  },
  {
    id: 'umayyad-mosque-damascus',
    name: 'Umayyad Mosque (Great Mosque of Damascus)',
    arabicUrduName: 'جامع بني أمية الكبير • دمشق',
    type: 'mosque',
    city: 'Damascus',
    country: 'Syria',
    region: 'Middle East',
    latitude: 33.5119,
    longitude: 36.3067,
    shortContent: 'One of the oldest and largest sacred congregational mosques in the world, completed under Caliph Al-Walid I in 715 CE. Holds the Shrine of Prophet Yahya (John the Baptist).',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    century: '715 CE (96 AH)',
    architecturalStyle: 'Classical Umayyad Golden Mosaics & Roman Arcades',
    googleMapsUrl: 'https://maps.google.com/?q=33.5119,36.3067'
  },
  {
    id: 'cordoba-mosque',
    name: 'Great Mosque of Cordoba (Mezquita de Córdoba)',
    arabicUrduName: 'مسجد قرطبة الكبير • الأندلس',
    type: 'mosque',
    city: 'Cordoba',
    country: 'Spain',
    region: 'Europe',
    latitude: 37.8792,
    longitude: -4.7794,
    shortContent: 'Pinnacle of Andalusian Moorish architecture established by Abd al-Rahman I. Celebrated globally for its hypostyle hall with 856 red-and-white jasper, onyx, and marble double arches.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80',
    century: '785 CE (169 AH)',
    architecturalStyle: 'Moorish Andalusian Horseshoe Arcades & Golden Mihrab',
    googleMapsUrl: 'https://maps.google.com/?q=37.8792,-4.7794'
  },
  {
    id: 'al-azhar-mosque',
    name: 'Al-Azhar Mosque & University',
    arabicUrduName: 'الجامع الأزهر الشريف • القاهرة',
    type: 'mosque',
    city: 'Cairo',
    country: 'Egypt',
    region: 'North Africa',
    latitude: 30.0457,
    longitude: 31.2627,
    shortContent: 'Established in 970 CE during the Fatimid Caliphate, renowned as the chief beacon of Sunni Islamic scholarship, legal jurisprudence, and Arabic language for over a millennium.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80',
    century: '970 CE (359 AH)',
    architecturalStyle: 'Fatimid, Ayyubid & Mamluk Layered Minarets',
    googleMapsUrl: 'https://maps.google.com/?q=30.0457,31.2627'
  },
  {
    id: 'istiqlal-mosque',
    name: 'Istiqlal Mosque (Masjid Istiqlal)',
    arabicUrduName: 'مسجد الاستقلال • جاكرتا',
    type: 'mosque',
    city: 'Jakarta',
    country: 'Indonesia',
    region: 'Southeast Asia',
    latitude: -6.1702,
    longitude: 106.8315,
    shortContent: 'The largest mosque in Southeast Asia, built to commemorate Indonesian independence. Accommodates up to 120,000 worshippers under a grand 45-meter stainless steel dome.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    century: '1978 CE',
    architecturalStyle: 'Tropical Monumentalism & Stainless Steel Central Dome',
    googleMapsUrl: 'https://maps.google.com/?q=-6.1702,106.8315'
  },
  {
    id: 'kul-sharif-mosque',
    name: 'Kul Sharif Mosque (Kazan Kremlin)',
    arabicUrduName: 'مسجد قول شريف • قازان',
    type: 'mosque',
    city: 'Kazan',
    country: 'Russia',
    region: 'Europe',
    latitude: 55.7983,
    longitude: 49.1052,
    shortContent: 'Prominent jewel of Tatarstan inside the UNESCO Kazan Kremlin. Features soaring turquoise domes and minarets commemorating the ancient Volga Bulgarian Islamic legacy.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    century: '2005 CE Reconstructed',
    architecturalStyle: 'Volga Tatar Revivalist Turquoise Spired Domes',
    googleMapsUrl: 'https://maps.google.com/?q=55.7983,49.1052'
  },
  {
    id: 'putra-mosque',
    name: 'Putra Mosque (Pink Mosque)',
    arabicUrduName: 'مسجد بوترا • بوتراجايا',
    type: 'mosque',
    city: 'Putrajaya',
    country: 'Malaysia',
    region: 'Southeast Asia',
    latitude: 2.9361,
    longitude: 101.6892,
    shortContent: 'Rose-tinted granite sanctuary facing Putrajaya Lake. Features a 116-meter five-tiered minaret modeled after the Sheikh Omar Mosque in Baghdad.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
    century: '1999 CE',
    architecturalStyle: 'Rose Granite Persian-Islamic Lakefront Architecture',
    googleMapsUrl: 'https://maps.google.com/?q=2.9361,101.6892'
  },

  // ==========================================
  // 3. SACRED ZIYARAT POINTS & HISTORIC DARGAHS
  // (Uses authentic Muslim sanctuary photos or NOOR-E-ILAHI placeholder)
  // ==========================================
  {
    id: 'dargah-ajmer-sharif',
    name: 'Dargah Ajmer Sharif (Khwaja Gharib Nawaz)',
    arabicUrduName: 'درگاہ اجمیر شریف خواجہ معین الدین چشتی غریب نواز',
    type: 'dargah',
    city: 'Ajmer',
    country: 'India',
    region: 'South Asia',
    latitude: 26.4562,
    longitude: 74.6277,
    shortContent: 'The revered sanctuary of Hazrat Khwaja Moinuddin Hasan Chishti (RA), Sultan-ul-Hind. Pioneer of Chishti Sufism in India, famous for universal love and feeding the destitute (Langar).',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1236 CE (7th Century AH)',
    slug: 'ajmer-sharif-khwaja-moinuddin-chishti',
    architecturalStyle: 'White Marble Dome, Silver Plated Doors & Mughal Gateways',
    googleMapsUrl: 'https://maps.google.com/?q=26.4562,74.6277'
  },
  {
    id: 'dargah-nizamuddin-aulia',
    name: 'Dargah Hazrat Nizamuddin Aulia',
    arabicUrduName: 'درگاہ حضرت نظام الدین اولیاء • محبوب الٰہی • دہلی',
    type: 'dargah',
    city: 'Delhi',
    country: 'India',
    region: 'South Asia',
    latitude: 28.5912,
    longitude: 77.2415,
    shortContent: 'Sacred resting place of Hazrat Nizamuddin Aulia (Mahbub-e-Ilahi) and his beloved disciple, poet Amir Khusrau. Epicenter of spiritual qawwali, adab, and charity for 700+ years.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1325 CE (725 AH)',
    slug: 'hazrat-nizamuddin-aulia-delhi',
    architecturalStyle: 'Fluted White Marble Dome, Red Sandstone Jali Screens',
    googleMapsUrl: 'https://maps.google.com/?q=28.5912,77.2415'
  },
  {
    id: 'dargah-haji-ali',
    name: 'Haji Ali Dargah',
    arabicUrduName: 'درگاہ حاجی علی شاہ بخاری • ممبئی',
    type: 'dargah',
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
    latitude: 18.9778,
    longitude: 72.8089,
    shortContent: 'World-famous offshore sanctuary of Pir Haji Ali Shah Bukhari (RA) set 500 meters into the Arabian Sea on an islet accessible via a causeway during low tide.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1431 CE',
    slug: 'haji-ali-dargah-mumbai',
    architecturalStyle: 'Pure Makrana White Marble Indo-Islamic Offshore Shrine',
    googleMapsUrl: 'https://maps.google.com/?q=18.9778,72.8089'
  },
  {
    id: 'data-darbar-lahore',
    name: 'Data Darbar (Hazrat Ali Hujwiri)',
    arabicUrduName: 'داتا دربار حضرت علی ہجویری داتا گنج بخش • لاہور',
    type: 'dargah',
    city: 'Lahore',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 31.5794,
    longitude: 74.3039,
    shortContent: 'One of the oldest and largest Sufi shrines in South Asia. Resting place of Ali Hujwiri (Data Ganj Bakhsh), author of the seminal Persian Sufi treatise Kashf al-Mahjub.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1077 CE (465 AH)',
    slug: 'data-darbar-ali-hujwiri-lahore',
    architecturalStyle: 'Grand White Carved Marble Courtyard & Gold Inscriptions',
    googleMapsUrl: 'https://maps.google.com/?q=31.5794,74.3039'
  },
  {
    id: 'shrine-imam-husayn-karbala',
    name: 'Shrine of Imam Husayn ibn Ali',
    arabicUrduName: 'الروضة الحسينية المقدسة • كربلاء المقدسة',
    type: 'dargah',
    city: 'Karbala',
    country: 'Iraq',
    region: 'Middle East',
    latitude: 32.6164,
    longitude: 44.0324,
    shortContent: 'The sacred resting place of Imam Husayn (RA), grandson of Prophet Muhammad (PBUH) and martyr of Karbala (680 CE). Destination of the annual Arbaeen pilgrimage.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '680 CE (61 AH)',
    slug: 'imam-husayn-karbala',
    architecturalStyle: 'Solid Gold Dome, Twin Gilded Minarets & Mirrored Mirrorwork (Aineh-Kari)',
    googleMapsUrl: 'https://maps.google.com/?q=32.6164,44.0324'
  },
  {
    id: 'shrine-imam-ali-najaf',
    name: 'Shrine of Imam Ali ibn Abi Talib',
    arabicUrduName: 'الروضة الحيدرية الشريفة • النجف الأشرف',
    type: 'dargah',
    city: 'Najaf',
    country: 'Iraq',
    region: 'Middle East',
    latitude: 31.9961,
    longitude: 44.3142,
    shortContent: 'The holy sanctuary of Ali ibn Abi Talib (RA), cousin and son-in-law of Prophet Muhammad (PBUH) and fourth Righteous Caliph. Renowned for its solid gold dome.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '977 CE Established',
    slug: 'imam-ali-najaf',
    architecturalStyle: 'Solid Gilded Dome & 7,777 Pure Gold Tiles',
    googleMapsUrl: 'https://maps.google.com/?q=31.9961,44.3142'
  },
  {
    id: 'mevlana-rumi-konya',
    name: 'Mevlana Rumi Mausoleum & Museum',
    arabicUrduName: 'مقام مولانا جلال الدين الرومي • قونية',
    type: 'dargah',
    city: 'Konya',
    country: 'Turkey',
    region: 'Europe',
    latitude: 37.8707,
    longitude: 32.505,
    shortContent: 'The sacred tomb of Jalal al-Din Muhammad Rumi, world-celebrated mystic poet and master of the Mevlevi whirling dervishes. Marked by its iconic turquoise ribbed dome (Kubbe-i Hadra).',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1274 CE',
    slug: 'mevlana-rumi-konya',
    architecturalStyle: 'Seljuk Fluted Turquoise Glazed Tile Dome',
    googleMapsUrl: 'https://maps.google.com/?q=37.8707,32.505'
  },
  {
    id: 'eyup-sultan-istanbul',
    name: 'Eyup Sultan Mosque & Tomb (Abu Ayyub al-Ansari)',
    arabicUrduName: 'جامع ومقام الصحابي أبي أيوب الأنصاري • إسطنبول',
    type: 'dargah',
    city: 'Istanbul',
    country: 'Turkey',
    region: 'Europe',
    latitude: 41.0478,
    longitude: 28.9341,
    shortContent: 'The resting place of Hazrat Abu Ayyub al-Ansari (RA), venerable companion and standard-bearer of the Prophet Muhammad (PBUH) who hosted the Prophet in Madinah.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1458 CE',
    slug: 'eyup-sultan-istanbul',
    architecturalStyle: 'Classical Ottoman Imperial Tile Mausoleum',
    googleMapsUrl: 'https://maps.google.com/?q=41.0478,28.9341'
  },
  {
    id: 'dargah-shah-jalal',
    name: 'Dargah Hazrat Shah Jalal',
    arabicUrduName: 'درگاہ شاہ جلال مجرد یمنی • سلہٹ',
    type: 'dargah',
    city: 'Sylhet',
    country: 'Bangladesh',
    region: 'South Asia',
    latitude: 24.8998,
    longitude: 91.8714,
    shortContent: 'The most sacred spiritual sanctuary in Bangladesh, resting place of Hazrat Shah Jalal Yamani (RA), who brought the light of Islam and Chishti-Suhrawardi wisdom to Sylhet in 1303 CE.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1346 CE',
    slug: 'shah-jalal-sylhet',
    architecturalStyle: 'Bengal-Mughal White Marble Complex & Sacred Spring Pond',
    googleMapsUrl: 'https://maps.google.com/?q=24.8998,91.8714'
  },
  {
    id: 'dargah-sabir-pak-kalyar',
    name: 'Dargah Sabir Pak (Alauddin Ali Ahmed Sabir)',
    arabicUrduName: 'درگاہ صابر پاک کلیری • رڑکی',
    type: 'dargah',
    city: 'Kalyar Sharif',
    country: 'India',
    region: 'South Asia',
    latitude: 29.8789,
    longitude: 77.9356,
    shortContent: 'The spiritual fortress of Hazrat Alauddin Ali Ahmed Sabir Kalyari (RA), nephew and disciple of Baba Farid Ganjshakar. Known for immense Jalali spiritual power and patience.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1291 CE (690 AH)',
    slug: 'sabir-pak-kalyar-sharif',
    architecturalStyle: 'Chishti-Sabiri Golden Spired Marble Sanctuary',
    googleMapsUrl: 'https://maps.google.com/?q=29.8789,77.9356'
  },
  {
    id: 'dargah-lal-shahbaz-qalandar',
    name: 'Dargah Lal Shahbaz Qalandar',
    arabicUrduName: 'درگاہ لعل شہباز قلندر • سہون شریف',
    type: 'dargah',
    city: 'Sehwan Sharif',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 26.4258,
    longitude: 67.8617,
    shortContent: 'The ecstatic sanctuary of Hazrat Usman Marwandi (Lal Shahbaz Qalandar), 13th-century philosopher and Qalandari master known for profound love of divine unity.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1356 CE Established',
    slug: 'lal-shahbaz-qalandar-sehwan',
    architecturalStyle: 'Sindhi Kashikari Blue Glazed Tiles & Solid Gold Gate',
    googleMapsUrl: 'https://maps.google.com/?q=26.4258,67.8617'
  },
  {
    id: 'shrine-bahauddin-naqshband',
    name: 'Memorial Complex of Bahauddin Naqshband',
    arabicUrduName: 'مقام الإمام بهاء الدين النقشبند • بخارى',
    type: 'dargah',
    city: 'Bukhara',
    country: 'Uzbekistan',
    region: 'Central Asia',
    latitude: 39.7892,
    longitude: 64.5372,
    shortContent: 'Resting place of Khwaja Bahauddin Naqshband (RA), founder of the Naqshbandi Sufi Tariqah. Features calm turquoise courtyards, ancient mulberry trees, and stone chortaqs.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1389 CE (791 AH)',
    slug: 'bahauddin-naqshband-bukhara',
    architecturalStyle: 'Timurid-Shaybanid Brickwork, Majolica & Chortaq',
    googleMapsUrl: 'https://maps.google.com/?q=39.7892,64.5372'
  },
  {
    id: 'shrine-imam-bukhari',
    name: 'Mausoleum of Imam al-Bukhari',
    arabicUrduName: 'مقام الإمام البخاري • سمرقند',
    type: 'dargah',
    city: 'Hartang, Samarkand',
    country: 'Uzbekistan',
    region: 'Central Asia',
    latitude: 39.7719,
    longitude: 66.9022,
    shortContent: 'The monumental sanctuary of Muhammad ibn Ismail al-Bukhari, compiler of Sahih al-Bukhari, universally regarded as the most authentic compilation of Prophetic Hadith.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '870 CE (256 AH)',
    slug: 'imam-bukhari-samarkand',
    architecturalStyle: 'Ribbed Blue Majolica Dome with Quranic Friezes',
    googleMapsUrl: 'https://maps.google.com/?q=39.7719,66.9022'
  },
  {
    id: 'dargah-khwaja-gesudaraz',
    name: 'Dargah Khwaja Banda Nawaz Gesudaraz',
    arabicUrduName: 'درگاہ خواجہ بندہ نواز گیسو دراز • گلبرگہ',
    type: 'dargah',
    city: 'Gulbarga',
    country: 'India',
    region: 'South Asia',
    latitude: 17.3353,
    longitude: 76.8436,
    shortContent: 'Resting place of Hazrat Khwaja Syed Muhammad Gesudaraz (RA), famed scholar and Chishti master who nurtured Islamic literature in early Urdu (Deccani), Persian, and Arabic.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1422 CE (825 AH)',
    slug: 'khwaja-banda-nawaz-gulbarga',
    architecturalStyle: 'Bahmani-Deccani Architectural Synthesis & Polished Domes',
    googleMapsUrl: 'https://maps.google.com/?q=17.3353,76.8436'
  },
  {
    id: 'dargah-waris-ali-shah',
    name: 'Dargah Haji Waris Ali Shah (Dewa Sharif)',
    arabicUrduName: 'درگاہ حاجی وارث علی شاہ دیوہ شریف • بارہ بنکی',
    type: 'dargah',
    city: 'Dewa Sharif',
    country: 'India',
    region: 'South Asia',
    latitude: 27.0428,
    longitude: 81.1648,
    shortContent: 'Sanctuary of Hazrat Haji Waris Ali Shah (RA), 19th-century Qadiri-Chishti saint known for the universal message: "Jo Rab Hai Wahi Sab Hai" (The Lord of one is the Lord of all).',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1905 CE',
    slug: 'waris-ali-shah-dewa-sharif',
    architecturalStyle: 'Monumental Yellow Sandstone & Marble Monument with Silver Doors',
    googleMapsUrl: 'https://maps.google.com/?q=27.0428,81.1648'
  },
  {
    id: 'dargah-baba-farid',
    name: 'Dargah Baba Farid Ganjshakar',
    arabicUrduName: 'درگاہ بابا فرید گنج شکر • پاکپتن',
    type: 'dargah',
    city: 'Pakpattan',
    country: 'Pakistan',
    region: 'South Asia',
    latitude: 30.3417,
    longitude: 73.3853,
    shortContent: 'Sanctuary of Hazrat Fariduddin Ganjshakar (RA), venerable 12th-century Chishti master and pioneer Punjabi mystic poet whose verses are renowned across South Asia.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '1266 CE (664 AH)',
    slug: 'baba-farid-pakpattan',
    architecturalStyle: 'Classical Bahishti Darwaza & White Domes',
    googleMapsUrl: 'https://maps.google.com/?q=30.3417,73.3853'
  },
  {
    id: 'shrine-imam-reza',
    name: 'Imam Reza Shrine Complex',
    arabicUrduName: 'حرم الإمام علي بن موسى الرضا • مشهد',
    type: 'dargah',
    city: 'Mashhad',
    country: 'Iran',
    region: 'Middle East',
    latitude: 36.288,
    longitude: 59.6157,
    shortContent: 'The largest mosque complex in the world by area. Resting place of Ali al-Rida (RA), the 8th Imam, adorned with a massive gold dome, Goharshad Mosque, and seven expansive courtyards.',
    thumbnailUrl: '', // Uses official NOOR-E-ILAHI placeholder image
    century: '818 CE Established',
    architecturalStyle: 'Safavid Gilded Domes, Mirror Glasswork & Seven Grand Sahn Courtyards',
    googleMapsUrl: 'https://maps.google.com/?q=36.288,59.6157'
  }
];

// Helper to filter points
export function getFilteredMapPoints(
  type: MapPointType | 'all' = 'all',
  searchQuery: string = ''
): IslamicMapPoint[] {
  let list = ISLAMIC_MAP_POINTS;

  if (type !== 'all') {
    list = list.filter((p) => p.type === type);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.shortContent.toLowerCase().includes(q) ||
        (p.arabicUrduName && p.arabicUrduName.toLowerCase().includes(q))
    );
  }

  return list;
}
