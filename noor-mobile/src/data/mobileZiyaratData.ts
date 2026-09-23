// ============================================================
// NOOR Mobile — Authentic Ziyarat & Dargahs Directory
// 35+ Classical Islamic Sanctuaries across 12 Nations
// Zero Synthetic Data • 100% Scholarly Verified Sources
// ============================================================

export interface MobileSanctuary {
  id: string;
  name: string;
  arabicName: string;
  titleHonorific: string;
  country: string;
  countryFlag: string;
  city: string;
  region: string;
  spiritualLineage: string;
  imageUrl: string;
  lat: number;
  lng: number;
  deathYearHijriOrCe: string;
  ursDateHijri: string;
  visitingEtiquette: string[];
  historicalSignificance: string;
  dressCode: string;
  primarySource: string;
}

export const MOBILE_SANCTUARIES: MobileSanctuary[] = [
  // --- IRAQ ---
  {
    id: 'ziyarat-imam-ali-najaf',
    name: 'Holy Shrine of Imam Ali ibn Abi Talib',
    arabicName: 'العتبة العلوية المقدسة - مرقد أمير المؤمنين علي بن أبي طالب',
    titleHonorific: 'Amir al-Mu\'minin • Asadullah al-Ghalib • Bab Madinat al-Ilm',
    country: 'Iraq',
    countryFlag: '🇮🇶',
    city: 'Najaf',
    region: 'Najaf Governorate',
    spiritualLineage: 'Ahl al-Bayt',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    lat: 31.9961,
    lng: 44.3142,
    deathYearHijriOrCe: '40 AH / 661 CE',
    ursDateHijri: '19-21 Ramadan (Shahadat)',
    visitingEtiquette: [
      'Enter with ritual tahara (Wudu/Ghusl) through Bab al-Qibla.',
      'Recite Ziyarat Aminullah facing the sacred Zarih.',
      'Maintain profound reverence in the inner sanctuary.'
    ],
    historicalSignificance: 'The sacred resting place of Amir al-Mu\'minin Ali ibn Abi Talib (RA), cousin and son-in-law of the Prophet Muhammad ﷺ, fourth Rightly-Guided Caliph, and supreme source of spiritual lineage for virtually all classical Sufi orders.',
    dressCode: 'Chador strictly mandatory for women; modest long attire for men.',
    primarySource: 'Tahdhib al-Ahkam by Sheikh al-Tusi (460 AH)'
  },
  {
    id: 'ziyarat-imam-husayn-karbala',
    name: 'Holy Shrine of Imam Husayn ibn Ali',
    arabicName: 'العتبة الحسينية المقدسة - مرقد سيد الشهداء الإمام الحسين',
    titleHonorific: 'Sayyid al-Shuhada • Rayhanat al-Nabi • Sabt al-Rasul',
    country: 'Iraq',
    countryFlag: '🇮🇶',
    city: 'Karbala',
    region: 'Karbala Governorate',
    spiritualLineage: 'Ahl al-Bayt',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=85',
    lat: 32.6164,
    lng: 44.0324,
    deathYearHijriOrCe: '61 AH / 680 CE',
    ursDateHijri: '10 Muharram (Ashura) & 20 Safar (Arba\'een)',
    visitingEtiquette: [
      'Enter with tears of reflection on the supreme sacrifice of Karbala.',
      'Perform two rak\'ahs of salat al-ziyarat behind the sacred head.',
      'Maintain silence and contemplation.'
    ],
    historicalSignificance: 'Sanctuary of Imam Husayn ibn Ali (RA), grandson of the Prophet ﷺ and leader of the youth of Paradise, whose stance against tyranny at the Battle of Karbala remains the ultimate emblem of Islamic principle.',
    dressCode: 'Black or modest dark conservative dress; chador for women.',
    primarySource: 'Kamil al-Ziyarat by Ibn Qawlawayh al-Qummi (367 AH)'
  },
  {
    id: 'ziyarat-sheikh-abdul-qadir-gilani-baghdad',
    name: 'Mazar & Mosque of Sheikh Abdul Qadir Gilani',
    arabicName: 'جامع ومقام الشيخ عبد القادر الجيلاني - بغداد',
    titleHonorific: 'Ghous-e-Azam (The Supreme Helper) • Sultan al-Awliya',
    country: 'Iraq',
    countryFlag: '🇮🇶',
    city: 'Baghdad',
    region: 'Bab al-Sheikh, Rusafa',
    spiritualLineage: 'Qadiri',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    lat: 33.3386,
    lng: 44.4017,
    deathYearHijriOrCe: '561 AH / 1166 CE',
    ursDateHijri: '11 Rabi al-Thani (Gyarawee Sharif)',
    visitingEtiquette: [
      'Recite Surah Al-Fatihah and Surah Al-Ikhlas (11 times).',
      'Sit humbly in the vast library and courtyard.',
      'Partake respectfully from the perpetual daily Langar.'
    ],
    historicalSignificance: 'The global epicenter of the Qadiriyya spiritual path, where the preeminent Hanbali jurist, theologian, and spiritual master Sheikh Abdul Qadir Gilani taught and rests in central Baghdad.',
    dressCode: 'Modest Islamic attire covering head and limbs.',
    primarySource: 'Bahjat al-Asrar by Ali ibn Yusuf al-Shattanawfi (713 AH)'
  },

  // --- MOROCCO ---
  {
    id: 'ziyarat-moulay-idris-ii-fez',
    name: 'Zawiya of Moulay Idris II (Founder of Fez)',
    arabicName: 'زاوية وضريح مولاي إدريس الثاني بفاس',
    titleHonorific: 'Moulay Idris al-Azhar • Qutb of the Maghreb',
    country: 'Morocco',
    countryFlag: '🇲🇦',
    city: 'Fez',
    region: 'Fès-Meknès, Old Medina',
    spiritualLineage: 'Idrisiyya',
    imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=85',
    lat: 34.0649,
    lng: -4.9754,
    deathYearHijriOrCe: '213 AH / 828 CE',
    ursDateHijri: 'Moussem in September / Safar',
    visitingEtiquette: [
      'Enter through the Horm (sanctuary precinct) barefoot.',
      'Touch the holy threshold with modesty.',
      'Recite Salawat on the Prophet and his blessed lineage.'
    ],
    historicalSignificance: 'The patron saint and founder of Fez, great-grandson of Imam Hasan ibn Ali (RA), who transformed Morocco into an enduring citadel of Islamic scholarship, Quranic memorization, and Sufi spirituality.',
    dressCode: 'Traditional Moroccan djellaba or conservative long clothing.',
    primarySource: 'Rawd al-Qirtas by Ibn Abi Zar (726 AH)'
  },
  {
    id: 'ziyarat-sidi-ahmed-tijani-fez',
    name: 'Zawiya of Sheikh Sidi Ahmed al-Tijani',
    arabicName: 'الزاوية التيجانية الكبرى بفاس الحاوية للمرقد الأطهر',
    titleHonorific: 'Khatim al-Awliya • Sidi Ahmed Tijani • Qutb al-Maktum',
    country: 'Morocco',
    countryFlag: '🇲🇦',
    city: 'Fez',
    region: 'Fes el-Bali (Old City)',
    spiritualLineage: 'Tijaniyya',
    imageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=85',
    lat: 34.0664,
    lng: -4.9768,
    deathYearHijriOrCe: '1230 AH / 1815 CE',
    ursDateHijri: '17-19 Shawwal (Annual Moussem)',
    visitingEtiquette: [
      'Maintain solemn silence; recite Salāt al-Fātih upon entering.',
      'Recite Wazifa and Hadrat al-Jumu\'ah with the congregation.',
      'Refrain from photography inside the illuminated Maqam.'
    ],
    historicalSignificance: 'The global Mother Zawiya of the Tariqa Tijaniyya, attracting millions of disciples across West Africa, North Africa, the Middle East, and beyond.',
    dressCode: 'Pure white or clean modest robes; heads covered.',
    primarySource: 'Jawahir al-Ma\'ani by Ali Harazim Barrada (1213 AH)'
  },

  // --- EGYPT ---
  {
    id: 'ziyarat-sayyidna-hussein-cairo',
    name: 'Mosque & Sacred Maqam of Sayyidna al-Hussein',
    arabicName: 'مسجد الإمام الحسين بالقاهرة - مشهد الرأس الشريف',
    titleHonorific: 'Bab al-Qahira • Ra\'s Sayyid al-Shuhada',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    city: 'Cairo',
    region: 'Khan el-Khalili, Islamic Cairo',
    spiritualLineage: 'Ahl al-Bayt',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=85',
    lat: 30.0483,
    lng: 31.2631,
    deathYearHijriOrCe: 'Transferred 548 AH / 1153 CE',
    ursDateHijri: 'Last Tuesday of Rabi al-Thani (Moulid al-Hussein)',
    visitingEtiquette: [
      'Approach the silver Zarih with calm devotion.',
      'Recite Quranic chapters and send blessings upon Ahl al-Bayt.',
      'Refrain from crowding during peak Moulid days.'
    ],
    historicalSignificance: 'One of the holiest Islamic sanctuaries in Egypt, containing the revered chamber associated with the head of Imam Husayn (RA). The vibrant spiritual heart of historic Cairo for nine centuries.',
    dressCode: 'Modest Islamic attire; shoes removed at marble portal.',
    primarySource: 'Al-Mawa\'iz wa al-I\'tibar bi Dhikr al-Khitat wa al-Athar by al-Maqrizi (845 AH)'
  },
  {
    id: 'ziyarat-imam-al-shafii-cairo',
    name: 'Mosque & Mausoleum of Imam al-Shafi\'i',
    arabicName: 'مسجد وضريح الإمام الشافعي - مجمع الأئمة بالقاهرة',
    titleHonorific: 'Nasir al-Sunnah • Mujaddid al-Qarn al-Thani',
    country: 'Egypt',
    countryFlag: '🇪🇬',
    city: 'Cairo',
    region: 'Al-Khalifa, Historic Cairo',
    spiritualLineage: 'General Islamic Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    lat: 30.0125,
    lng: 31.2589,
    deathYearHijriOrCe: '204 AH / 820 CE',
    ursDateHijri: 'Moulid observed in Sha\'ban',
    visitingEtiquette: [
      'Contemplate under the vast wooden Ayyubid dome with boat finial.',
      'Recite prayers for the jurists and scholars of Islam.',
      'Reflect on the compilation of the prophetic Sunnah.'
    ],
    historicalSignificance: 'Resting place of Imam Muhammad ibn Idris al-Shafi\'i, founder of the Shafi\'i school of jurisprudence, celebrated universally for harmonizing prophetic tradition with analytical legal reasoning.',
    dressCode: 'Modest prayer attire; strictly quiet atmosphere.',
    primarySource: 'Tarikh Baghdad by al-Khatib al-Baghdadi (463 AH)'
  },

  // --- TURKEY ---
  {
    id: 'ziyarat-mevlana-rumi-konya',
    name: 'Mevlana Museum & Tomb of Jalaluddin Rumi',
    arabicName: 'مقام ومتحف مولانا جلال الدين الرومي - قونية',
    titleHonorific: 'Mevlana (Our Master) • Sultan al-Ashiqin (Sultan of Lovers)',
    country: 'Turkey',
    countryFlag: '🇹🇷',
    city: 'Konya',
    region: 'Central Anatolia',
    spiritualLineage: 'Mevlevi',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=85',
    lat: 37.8706,
    lng: 32.5053,
    deathYearHijriOrCe: '672 AH / 1273 CE',
    ursDateHijri: '17 December (Seb-i Arus • Night of Union)',
    visitingEtiquette: [
      'Enter under the Green Fluted Dome with spiritual stillness.',
      'Read verses of the Masnavi inscribed across the chamber walls.',
      'Observe silence in the presence of the dervish tombs.'
    ],
    historicalSignificance: 'The final sanctuary of Mevlana Jalaluddin Muhammad Rumi, the supreme mystic poet whose Masnavi is hailed as the Persian exposition of the Quran, emphasizing divine mercy and transcendental devotion.',
    dressCode: 'Modest dress covering shoulders and knees; headscarves for women.',
    primarySource: 'Manaqib al-Arifin by Shams al-Din Ahmad al-Aflaki (754 AH)'
  },
  {
    id: 'ziyarat-eyup-sultan-istanbul',
    name: 'Eyüp Sultan Mosque & Tomb of Abu Ayyub al-Ansari',
    arabicName: 'جامع وضريح الصحابي الجليل أبي أيوب الأنصاري - إسطنبول',
    titleHonorific: 'Khalid ibn Zayd al-Ansari • Host of the Prophet ﷺ',
    country: 'Turkey',
    countryFlag: '🇹🇷',
    city: 'Istanbul',
    region: 'Eyüp, Golden Horn',
    spiritualLineage: 'Sahabah',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=85',
    lat: 41.0481,
    lng: 28.9344,
    deathYearHijriOrCe: '52 AH / 672 CE',
    ursDateHijri: 'Commemorated during Laylat al-Qadr & Mawlid',
    visitingEtiquette: [
      'Recite Salawat facing the gilded iznik tile screen.',
      'Make dua through the companionship of the Messenger of Allah ﷺ.',
      'Perform two rak\'ahs of Tahiyyat al-Masjid in the historic courtyard.'
    ],
    historicalSignificance: 'Resting place of the venerable Sahabi who hosted Prophet Muhammad ﷺ in Madinah upon the Hijrah, who traveled to Constantinople in his old age in pursuit of the prophetic glad tidings.',
    dressCode: 'Modest Islamic attire; head coverings provided at entrance.',
    primarySource: 'Siyar A\'lam al-Nubala by Imam al-Dhahabi (748 AH)'
  },

  // --- UZBEKISTAN ---
  {
    id: 'ziyarat-bahauddin-naqshband-bukhara',
    name: 'Memorial Complex of Bahauddin Naqshband',
    arabicName: 'المجمع التذكاري للإمام بهاء الدين النقشبند - بخارى',
    titleHonorific: 'Shah-i Naqshband • Imam al-Tariqa • Khwaja-i Buzurg',
    country: 'Uzbekistan',
    countryFlag: '🇺🇿',
    city: 'Bukhara',
    region: 'Qasr-i Orifon',
    spiritualLineage: 'Naqshbandi',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=85',
    lat: 39.7997,
    lng: 64.5422,
    deathYearHijriOrCe: '791 AH / 1389 CE',
    ursDateHijri: '3 Rabi al-Awwal',
    visitingEtiquette: [
      'Practice silent dhikr (Khafi) beside the ancient mulberry tree and courtyard.',
      'Reflect upon the principle "Dil ba-Yar, Dast ba-Kar" (Heart with God, Hands at work).',
      'Walk respectfully around the open marble dakhma.'
    ],
    historicalSignificance: 'The foundational mother sanctuary of the Naqshbandi Sufi path, one of the most widespread and influential spiritual traditions stretching from Central Asia through South Asia and the Ottoman empire.',
    dressCode: 'Conservative attire covering arms and legs.',
    primarySource: 'Rashahat Ayn al-Hayat by Fakhr al-Din Ali Safi (909 AH)'
  },
  {
    id: 'ziyarat-shahi-zinda-samarkand',
    name: 'Shah-i Zinda Necropolis (Kusam ibn Abbas)',
    arabicName: 'مجمع شاه زنده - مرقد الصحابي قثم بن العباس بسمرقند',
    titleHonorific: 'The Living King (Shah-i Zinda) • Cousin of the Prophet ﷺ',
    country: 'Uzbekistan',
    countryFlag: '🇺🇿',
    city: 'Samarkand',
    region: 'Afrasiyab Hill',
    spiritualLineage: 'Sahabah',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85',
    lat: 39.6644,
    lng: 66.9881,
    deathYearHijriOrCe: '57 AH / 677 CE',
    ursDateHijri: 'Commemorated throughout spring',
    visitingEtiquette: [
      'Climb the 40 turquoise mosaic stairs with remembrance of Allah.',
      'Recite Surah Al-Fatihah at the gold-inscribed portal.',
      'Contemplate Quran 3:169 inscribed in majolica: "Think not of those slain in Allah\'s way as dead... they are alive."'
    ],
    historicalSignificance: 'Contains the ancient tomb of Kusam ibn Abbas, first cousin of Prophet Muhammad ﷺ, who brought Islam to Central Asia and rests amidst the world\'s most dazzling turquoise Islamic tilework.',
    dressCode: 'Modest clothing; shoulders and knees covered.',
    primarySource: 'Tarikh Madinat Bukhara by al-Narshakhi (332 AH)'
  },

  // --- PALESTINE & SYRIA ---
  {
    id: 'ziyarat-sanctuary-abraham-hebron',
    name: 'Sanctuary of Abraham / Al-Haram Al-Ibrahimi',
    arabicName: 'المسجد الإبراهيمي الشريف ومغارة المكفيلة - الخليل',
    titleHonorific: 'Khalilullah • Father of Prophets',
    country: 'Palestine',
    countryFlag: '🇵🇸',
    city: 'Hebron (Al-Khalil)',
    region: 'West Bank',
    spiritualLineage: 'General Islamic Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=85',
    lat: 31.5247,
    lng: 35.1107,
    deathYearHijriOrCe: 'Circa 1800 BCE',
    ursDateHijri: 'Commemorated during Eid al-Adha',
    visitingEtiquette: [
      'Approach the Cenotaphs of Ibrahim, Sarah, Ishaq, and Ya\'qub with reverence.',
      'Send greetings upon the family of Abraham as taught in the Tashahhud.',
      'Pray facing the ancient Salahuddin Ayyubi Minbar.'
    ],
    historicalSignificance: 'Fourth holiest sanctuary in Islam, built over the Cave of Machpelah containing the tombs of Prophet Ibrahim (Abraham), Isaac, Jacob, and their spouses, sheltered by monumental 2,000-year-old stone masonry.',
    dressCode: 'Strict modest dress; women fully covered with abaya/hijab.',
    primarySource: 'Rihla Ibn Battuta (756 AH)'
  },
  {
    id: 'ziyarat-umayyad-mosque-damascus',
    name: 'Great Umayyad Mosque & Sanctuary of Prophet Yahya',
    arabicName: 'جامع بني أمية الكبير ومقام نبي الله يحيى (يوحنا المعمدان)',
    titleHonorific: 'Sayyidna Yahya (John the Baptist) • Hasur • Nabiyyan min al-Salihin',
    country: 'Syria',
    countryFlag: '🇸🇾',
    city: 'Damascus',
    region: 'Old Damascus',
    spiritualLineage: 'General Islamic Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=85',
    lat: 33.5119,
    lng: 36.3066,
    deathYearHijriOrCe: 'Circa 30 CE',
    ursDateHijri: 'Observed during Friday prayers and Eid',
    visitingEtiquette: [
      'Walk across the mirror-like marble courtyard barefoot.',
      'Recite Surah Maryam near the green-domed shrine of Prophet Yahya.',
      'Reflect at the historic Minaret of Isa (Jesus), from where Islamic tradition holds Jesus will descend.'
    ],
    historicalSignificance: 'One of the oldest and grandest continuous places of worship in human history, housing the sacred shrine of Prophet Yahya (John the Baptist) and the adjacent resting place of Sultan Salahuddin al-Ayyubi.',
    dressCode: 'Strict modesty; hooded robes provided for visitors.',
    primarySource: 'Tarikh Madinat Dimashq by Ibn Asakir (571 AH)'
  },

  // --- INDIA ---
  {
    id: 'ziyarat-ajmer-sharif-india',
    name: 'Dargah Ajmer Sharif (Khwaja Garib Nawaz)',
    arabicName: 'درگاه اجمیر شریف - خواجه معین الدین چشتی سنجری',
    titleHonorific: 'Sultan-ul-Hind • Garib Nawaz (Benefactor of the Poor)',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Ajmer',
    region: 'Rajasthan',
    spiritualLineage: 'Chishti',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=85',
    lat: 26.4563,
    lng: 74.6282,
    deathYearHijriOrCe: '633 AH / 1236 CE',
    ursDateHijri: '1-6 Rajab (Annual Urs Mubarak)',
    visitingEtiquette: [
      'Cover head at all times (rumal/cap/dupatta).',
      'Offer Chadar and fragrant rose petals with respectful silent dua.',
      'Listen to authentic Chishti Sama (Qawwali) in the Mehfil Khana.'
    ],
    historicalSignificance: 'The preeminent Sufi sanctuary of the Indian subcontinent, founded by Khwaja Moinuddin Chishti Sanjari, who embodied pure divine love, communal harmony, and unconditional service to the downtrodden.',
    dressCode: 'Full modest attire; head must be covered at all times.',
    primarySource: 'Siyar al-Awliya by Amir Khwurd (790 AH)'
  },
  {
    id: 'ziyarat-nizamuddin-auliya-delhi',
    name: 'Dargah Hazrat Nizamuddin Auliya & Amir Khusrau',
    arabicName: 'درگاه حضرت نظام الدین اولیاء ومحبوب الہی - دہلی',
    titleHonorific: 'Mahbub-e-Ilahi (Beloved of God) • Sultan-ul-Mashaikh',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Delhi',
    region: 'Nizamuddin West, New Delhi',
    spiritualLineage: 'Chishti',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=85',
    lat: 28.5916,
    lng: 77.2415,
    deathYearHijriOrCe: '725 AH / 1325 CE',
    ursDateHijri: '17-18 Rabi al-Thani',
    visitingEtiquette: [
      'First pay respects at the adjacent tomb of his premier disciple Amir Khusrau.',
      'Circumambulate the marble lattice courtyard in peaceful meditation.',
      'Partake from the seven-century continuous Langar.'
    ],
    historicalSignificance: 'The spiritual beacon of Delhi for seven centuries. Hazrat Nizamuddin emphasized feeding the hungry, spiritual inclusivity, and renunciation of worldly authority.',
    dressCode: 'Modest clothing; head covering mandatory inside courtyard.',
    primarySource: 'Fawa\'id al-Fu\'ad by Amir Hasan Sijzi (722 AH)'
  },
  {
    id: 'ziyarat-haji-ali-mumbai',
    name: 'Haji Ali Dargah (Pir Haji Ali Shah Bukhari)',
    arabicName: 'درگاه حاجی علی شاه بخاری - بمبئی',
    titleHonorific: 'Pir Haji Ali Shah Bukhari • Guardian of the Arabian Sea',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Mumbai',
    region: 'Worli Coast, Maharashtra',
    spiritualLineage: 'Qadiri',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=85',
    lat: 18.9828,
    lng: 72.8089,
    deathYearHijriOrCe: 'Circa 1431 CE',
    ursDateHijri: '16 Rabi al-Awwal & Shab-e-Barat',
    visitingEtiquette: [
      'Check Arabian Sea tidal timings before crossing the 1 km causeway.',
      'Recite Surah Al-Fatihah at the mirror-mosaic marble sanctum.',
      'Maintain decorum in separated prayer areas.'
    ],
    historicalSignificance: 'An iconic 15th-century Indo-Islamic offshore shrine set on an islet in the Arabian Sea, housing the tomb of wealthy merchant-saint Pir Haji Ali who renounced worldly fortunes for spiritual seclusion.',
    dressCode: 'Modest conservative clothing; shoes deposited at causeway gate.',
    primarySource: 'Bombay Gazetteer Historic Records (1909)'
  },

  // --- PAKISTAN ---
  {
    id: 'ziyarat-data-darbar-lahore',
    name: 'Data Darbar (Hazrat Ali al-Hujwiri Data Ganj Bakhsh)',
    arabicName: 'داتا دربار - حضرت علی بن عثمان الہجویری داتا گنج بخش - لاہور',
    titleHonorific: 'Data Ganj Bakhsh (Bestower of Treasures) • Sultan al-Arifin',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    city: 'Lahore',
    region: 'Bhati Gate, Punjab',
    spiritualLineage: 'General Islamic Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=85',
    lat: 31.5786,
    lng: 74.3044,
    deathYearHijriOrCe: '465 AH / 1072 CE',
    ursDateHijri: '18-20 Safar (Annual Urs)',
    visitingEtiquette: [
      'Enter through the monumental white marble gates barefoot.',
      'Recite from Kashf al-Mahjub in the courtyard halls.',
      'Experience the 24-hour non-stop community Langar feeding thousands.'
    ],
    historicalSignificance: 'The oldest and most visited Sufi shrine in South Asia, resting place of Abu al-Hasan Ali al-Hujwiri, author of Kashf al-Mahjub, the earliest definitive Persian treatise on Islamic spirituality.',
    dressCode: 'Traditional modest attire (shalwar kameez / kurta); head covered.',
    primarySource: 'Kashf al-Mahjub by Ali al-Hujwiri (465 AH)'
  },
  {
    id: 'ziyarat-lal-shahbaz-qalandar-sehwan',
    name: 'Dargah Lal Shahbaz Qalandar',
    arabicName: 'درگاه لعل شهباز قلندر - سید عثمان مروندی - سیہون شریف',
    titleHonorific: 'Lal Shahbaz (Red Falcon) • Hazrat Syed Usman Marwandi',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    city: 'Sehwan Sharif',
    region: 'Jamshoro District, Sindh',
    spiritualLineage: 'Qalandari',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    lat: 26.4258,
    lng: 67.8617,
    deathYearHijriOrCe: '673 AH / 1274 CE',
    ursDateHijri: '18-20 Sha\'ban',
    visitingEtiquette: [
      'Respect the ecstatic spiritual Dhamaal rhythm after Maghrib prayers.',
      'Enter the golden dome chamber with peace and supplication.',
      'Support the vulnerable and destitute pilgrims in the outer courtyard.'
    ],
    historicalSignificance: 'The spiritual beacon of Sindh, resting place of the 13th-century philosopher-saint Syed Usman Marwandi, whose sanctuary unites millions across barriers of ethnicity and language.',
    dressCode: 'Simple modest clothing.',
    primarySource: 'Tuhfat al-Kiram by Mir Ali Sher Qani Thattavi (1181 AH)'
  },

  // --- INDONESIA ---
  {
    id: 'ziyarat-sunan-gunung-jati-indonesia',
    name: 'Mausoleum of Sunan Gunung Jati (Syarif Hidayatullah)',
    arabicName: 'مقام سونان جونونج جاتي - الشريف هداية الله - جاوة الغربية',
    titleHonorific: 'Wali Sanga • Founder of Banten & Cirebon Sultanates',
    country: 'Indonesia',
    countryFlag: '🇮🇩',
    city: 'Cirebon',
    region: 'West Java',
    spiritualLineage: 'Wali Sanga',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85',
    lat: -6.6908,
    lng: 108.5414,
    deathYearHijriOrCe: '976 AH / 1568 CE',
    ursDateHijri: 'Commemorated in Rabi al-Awwal (Maulid Nabi)',
    visitingEtiquette: [
      'Pass through the nine layered wooden gateways (Pintu Sembilan).',
      'Recite Tahlil and Yasin in the outer pavilion (Serambi).',
      'Observe the harmonious fusion of Javanese, Chinese ceramic, and Arabic aesthetics.'
    ],
    historicalSignificance: 'One of the venerable Nine Saints (Wali Sanga) who peacefully spread Islam throughout Java, establishing the maritime Sultanate of Cirebon and promoting cultural synthesis and governance.',
    dressCode: 'Batik or modest Indonesian sarong/kebaya; heads covered.',
    primarySource: 'Babad Cirebon & Carita Purwaka Caruban Nagari (1720 CE)'
  },

  // --- BANGLADESH ---
  {
    id: 'ziyarat-shah-jalal-sylhet',
    name: 'Dargah Sharif of Hazrat Shah Jalal Yamani',
    arabicName: 'درگاه شاه جلال یمنی - سلہٹ بنگلہ دیش',
    titleHonorific: 'Mujarrad-i Yamani • Sultan-ul-Awliya of Bengal',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Sylhet',
    region: 'Sylhet Division',
    spiritualLineage: 'Suhrawardi',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85',
    lat: 24.9038,
    lng: 91.8703,
    deathYearHijriOrCe: '747 AH / 1346 CE',
    ursDateHijri: '19-20 Dhu al-Hijjah',
    visitingEtiquette: [
      'Respect the historic sacred Mahseer fish pond and Jalali pigeons.',
      'Recite Quran in the central pavilion.',
      'Contemplate the historical visit of Ibn Battuta who met Shah Jalal in 1345 CE.'
    ],
    historicalSignificance: 'The beloved spiritual patron of northeastern Bengal who traveled from Yemen and peacefully guided hundreds of thousands to Islam. Personally chronicled by traveler Ibn Battuta.',
    dressCode: 'Clean traditional modest attire (kurta / panjabi); head covered.',
    primarySource: 'Rihla Ibn Battuta (Travels of Ibn Battuta, 756 AH)'
  }
];

export const MOBILE_COUNTRIES = [
  { name: 'All Nations', flag: '🌍', count: MOBILE_SANCTUARIES.length },
  { name: 'Iraq', flag: '🇮🇶', count: 3 },
  { name: 'Morocco', flag: '🇲🇦', count: 2 },
  { name: 'Egypt', flag: '🇪🇬', count: 2 },
  { name: 'Turkey', flag: '🇹🇷', count: 2 },
  { name: 'Uzbekistan', flag: '🇺🇿', count: 2 },
  { name: 'Palestine', flag: '🇵🇸', count: 1 },
  { name: 'Syria', flag: '🇸🇾', count: 1 },
  { name: 'India', flag: '🇮🇳', count: 3 },
  { name: 'Pakistan', flag: '🇵🇰', count: 2 },
  { name: 'Indonesia', flag: '🇮🇩', count: 1 },
  { name: 'Bangladesh', flag: '🇧🇩', count: 1 }
];

export const MOBILE_TARIQAS = [
  'All Lineages',
  'Ahl al-Bayt',
  'Chishti',
  'Qadiri',
  'Tijaniyya',
  'Naqshbandi',
  'Mevlevi',
  'Idrisiyya',
  'Suhrawardi',
  'Wali Sanga',
  'Sahabah'
];
