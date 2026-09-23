'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'ur'
  | 'ar'
  | 'bn'
  | 'ta'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'tr'
  | 'id';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  region?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr', region: 'India (National)' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', region: 'Pakistan & South Asia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', region: 'Middle East & North Africa' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr', region: 'Global' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', dir: 'ltr', region: 'West Bengal & Bangladesh' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', region: 'Tamil Nadu & Sri Lanka' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', dir: 'ltr', region: 'Kerala' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr', region: 'Gujarat' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr', region: 'Turkey' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr', region: 'Indonesia' },
];

export const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    appName: 'Noor-e-ilahi',
    appSubtitle: 'Your Deen. Your Daily Companion.',
    home: 'Home',
    prayers: 'Prayers',
    quran: 'Noble Quran',
    duas: 'Duas & Dhikr',
    qibla: 'Qibla Compass',
    ziyarat: 'Ziyarat & Dargahs',
    media: 'Sacred Media',
    calendar: 'Hijri Calendar',
    app: 'Mobile App',
    dashboard: 'Deen Tracker',
    namesOfAllah: '99 Names of Allah',
    giving: 'Sadaqah Jariyah',
    askAi: 'Ask Noor AI',
    search: 'Search platform...',
    selectLocation: 'Select City',
    explore: 'Explore',
    more: 'More',
    login: 'Sign In',
    continueGoogle: 'Continue with Google',
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    nextPrayer: 'Next Prayer',
    timeRemaining: 'remaining',
    dailyVerse: 'Verse of the Day',
    dailyHadith: 'Daily Hadith',
    adhanVoice: 'Adhan Voice',
    menu: 'Menu',
    language: 'Language',
    selectLanguage: 'Select Language',
    allRightsReserved: 'All rights reserved',
    prayerTimetable: 'Astronomical Prayer Timetable',
    qadaTracker: 'Daily Qada Tracker',
    surahsCatalog: '114 Surahs of the Quran',
    sanctuariesDirectory: 'Classical Sanctuaries & Holy Dargahs',
    allNations: 'All Nations',
    listenAdhan: 'Listen to Adhan',
    activeAdhan: 'Active Prayer Call',
    autoDetectedNotice: 'Auto-detected based on your location',
    // Hero Section
    heroBadge: 'Global Islamic Digital Ecosystem',
    heroTitle1: 'Your Deen.',
    heroTitle2: 'Your Daily Companion.',
    heroDesc: 'Designed for millions of Muslims worldwide. Seamless astronomical prayer schedules, the Noble Quran with blessed recitations, verified Hisn al-Muslim duas, spherical Qibla compass, and AI-powered spiritual guidance.',
    ctaPrayerTimes: 'Full Prayer Timetable',
    ctaQuran: 'Noble Quran (114 Surahs)',
    ctaMobileLab: 'Mobile App Lab',
    trustAuthentic: 'Verified Authentic Sources',
    trustShariah: '100% Shariah Compliant',
    trustAdFree: '0% Obscene Advertising',
    ramadanNotice: '14 Ramadan 1448 AH • Holy Month of Fasting',
    pilgrimsCount: '(128k+ Pilgrims)',
    hadithQuote: '"The best among you are those who learn the Quran and teach it." — Sahih al-Bukhari 5027',
    readQuranCta: 'Read Quran →',
    upcomingSalaah: 'Upcoming Salaah',
    timeUntilAdhan: 'Time Until Adhan',
    elapsed: 'elapsed',
    stopAdhan: 'Stop Adhan (Makkah)',
    listenAdhanMakkah: 'Listen to Adhan (Makkah)',
    openQiblaTooltip: 'Open Qibla Direction',
    standardAsrMethod: 'MWL • Standard Asr',
    // Quick Navigation Pillars
    pillarPrayersTitle: 'Prayer Times',
    pillarPrayersDesc: '7-Day Timetable',
    pillarPrayersBadge: 'Salaah',
    pillarQuranTitle: 'Noble Quran',
    pillarQuranDesc: '114 Surahs & Reciters',
    pillarQuranBadge: 'Recitations',
    pillarDuasTitle: 'Duas & Tasbih',
    pillarDuasDesc: 'Hisn al-Muslim',
    pillarDuasBadge: 'Adhkar',
    pillarQiblaTitle: 'Qibla Compass',
    pillarQiblaDesc: 'Spherical Kaaba Azimuth',
    pillarQiblaBadge: 'Heading',
    pillarMediaTitle: 'Islamic Media',
    pillarMediaDesc: 'Pixabay 4K Photos',
    pillarMediaBadge: 'Gallery',
    pillarCalendarTitle: 'Hijri Calendar',
    pillarCalendarDesc: '12 Sacred Months',
    pillarCalendarBadge: '1448 AH',
    // Prayer Times Section
    salaahEngine: 'Astronomical Salaah Engine',
    dailyPrayerTimes: 'Daily Prayer Times',
    precisionCalculationFor: 'Precision celestial calculation for',
    previousDay: 'Previous Day',
    today: 'Today',
    nextDay: 'Next Day',
    methodMadhab: 'Method & Madhab',
    calculationMethod: 'Calculation Method',
    asrJurisprudence: 'Asr Jurisprudence (Madhab)',
    standardMadhab: 'Standard (Shafi\'i, Maliki, Hanbali)',
    hanafiMadhab: 'Hanafi (2x Shadow)',
    currentBadge: 'Current',
    sunriseLabel: 'Sunrise',
    salaahLabel: 'Salaah',
    ramadanFastingTimes: 'Ramadan 1448 AH • Fasting Times',
    sehriEnds: 'Sehri Ends:',
    iftarSunset: 'Iftar (Sunset):',
    viewRamadanSchedule: 'View 7-Day Ramadan Schedule',
    // Daily Ayah Section
    verseOfTheDay: 'Verse of the Day',
    showEnglish: 'Show English',
    showHindi: 'हिन्दी अनुवाद',
    showUrdu: 'اردو ترجمہ',
    pauseRecitation: 'Pause Recitation',
    listenRecitation: 'Listen Recitation',
    copyVerse: 'Copy Verse',
    bookmarkVerse: 'Bookmark',
    readTafsir: 'Read Tafsir',
    tafsirTitle: 'Tafsir Ibn Kathir: Virtues of Ayat al-Kursi',
    tafsirBody: 'This is the greatest verse in the Book of Allah. In a Sahih Hadith, the Messenger of Allah ﷺ asked Ubayy ibn Ka\'b: "Which verse in the Book of Allah is the greatest?" He replied: "Allah and His Messenger know best." The Prophet repeated the question, and Ubayy replied: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum (Ayat al-Kursi)." The Prophet ﷺ patted his chest and said: "May knowledge be easy and delightful for you, O Abu al-Mundhir!"',
    // Quran Section
    nobleScripture: 'The Noble Scripture',
    browseHolyQuran: 'Browse Holy Quran',
    quranDesc: 'Read, listen to blessed reciters, and ponder the timeless words of Allah SWT',
    searchSurahPlaceholder: 'Search Surah (e.g. Kahf, 18, Mulk)...',
    filterAll: 'All',
    filterMeccan: 'Meccan',
    filterMedinan: 'Medinan',
    ayahsCount: 'ayahs',
    versesCount: 'Verses',
    juzLabel: 'Juz',
    bismillahTranslation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    ayahNumber: 'Ayah',
    playVerse: 'Play Verse',
    // Duas Section
    supplicationsTitle: 'Supplications & Remembrance',
    duasHeading: 'Duas & Daily Adhkar',
    duasDesc: 'Authentic invocations from the Quran and Sunnah (Hisn al-Muslim)',
    openDigitalTasbih: 'Open Digital Tasbih',
    interactiveTasbih: 'Interactive Digital Tasbih',
    tapToCount: 'Tap to Count',
    targetLabel: 'Target',
    countLabel: 'Count',
    resetCounter: 'Reset Counter',
    catAll: 'All Categories',
    catMorning: 'Morning & Evening',
    catSleep: 'Sleep & Waking',
    catProtection: 'Protection',
    catTravel: 'Travel',
    catDaily: 'Daily Life',
    catForgiveness: 'Forgiveness',
    catHardship: 'Hardship',
    // Qibla Section
    sacredDirection: 'Sacred Direction',
    interactiveQibla: 'Interactive Qibla Direction',
    qiblaDesc: 'Calculated using the great-circle trigonometric formula towards the Holy Kaaba in Makkah Al-Mukarramah (21.4225° N, 39.8262° E). Align your prayers with exact spherical precision from anywhere on Earth.',
    qiblaHeadingLabel: 'Qibla Heading',
    fromNorth: 'from North',
    distanceToKaaba: 'Distance to Kaaba',
    kilometers: 'kilometers',
    currentOrigin: 'Current Origin',
    kaabaMarker: 'Kaaba',
    // Media Section
    visualTreasures: 'Islamic Visual Treasures',
    mediaGalleryHeading: 'Islamic Media Gallery',
    mediaGalleryDesc: 'Live high-definition imagery and cinematography powered by Pixabay API',
    photosTab: 'Photos',
    cinematicVideosTab: 'Cinematic Videos',
    curatingMedia: 'Curating Islamic media...',
    creatorLabel: 'Creator',
    // Calendar Section
    sacredTimeline: 'Sacred Islamic Timeline',
    hijriCalendarHeading: 'Hijri Calendar & Holy Observances',
    hijriCalendarDesc: 'Track key lunar calendar milestones and prepare for blessed worship seasons',
    currentHijriMonth: 'Current: Ramadan 1448 AH',
    specialBlessings: 'Special Blessings',
    eventRamadanTitle: 'Blessed Ramadan',
    eventRamadanDesc: 'The sacred month of fasting, intense night prayers (Taraweeh), and Quran revelation.',
    eventRamadanBadge: 'Fasting & Mercy',
    eventQadrTitle: 'Laylat al-Qadr',
    eventQadrDesc: 'The Night of Power, better than a thousand months. Angels descend with divine peace until dawn.',
    eventQadrBadge: 'Night of Power',
    eventFitrTitle: 'Eid al-Fitr',
    eventFitrDesc: 'The global celebration of breaking the fast with communal prayer and joy.',
    eventFitrBadge: 'Islamic Eid',
    eventArafahTitle: 'Day of Arafah',
    eventArafahDesc: 'The crowning climax of the Hajj pilgrimage. Fasting on this day forgives two years of sins.',
    eventArafahBadge: 'Hajj Pinnacle',
    eventAdhaTitle: 'Eid al-Adha',
    eventAdhaDesc: 'The Festival of Sacrifice commemorating the profound devotion of Prophet Ibrahim (AS).',
    eventAdhaBadge: 'Major Eid',
    eventAshuraTitle: 'Day of Ashura',
    eventAshuraDesc: 'The day Allah delivered Prophet Musa (AS) and Bani Israel from Pharaoh.',
    eventAshuraBadge: 'Sacred Day',
    // Monetization Section
    proBannerBadge: 'NOOR Pro & Global Mobile Apps',
    carryLightHeading: 'Carry the Light of Deen in Your Pocket.',
    carryLightDesc: 'Experience the full power of NOOR on your iPhone and Android device. Accurate offline prayer times, full Quran reciter streaming, interactive digital tasbih, and instant Qibla heading.',
    openSimulator: 'Open Interactive Device Simulator',
    appStoreDetails: 'App Store Details',
    googlePlayPackage: 'Google Play Package',
    ethicalHalalModel: 'Ethical Halal Model',
    freeForever: '100% Free',
    optionalSupporter: 'Optional Pro Supporter: $4.99/mo',
    supporterDesc: 'Fund server infrastructure, bandwidth, and free distribution to needy communities as Sadaqah Jariyah.',
    viewTelemetry: 'View Revenue Telemetry →',
    proMembershipTitle: 'Noor-e-ilahi Pro Membership',
    proMembershipDesc: 'Premium tier for dedicated worshippers: ad-free serenity, offline high-fidelity Quran reciter downloads, and unlimited Islamic AI consultations.',
    proFeat1: 'Offline audio storage',
    proFeat2: 'Advanced multi-scholar Tafsir',
    proFeat3: 'Home & lockscreen widgets',
    proPrice: '$4.99/mo or $39.99/yr',
    verifiedDirectoryTitle: 'Verified Halal Directory',
    verifiedDirectoryDesc: 'Curated global directory connecting millions of Muslim pilgrims with certified Halal restaurants, Hajj & Umrah agencies, and Islamic financial institutions.',
    halalFeat1: 'Certified Halal verification',
    halalFeat2: 'Direct WhatsApp pilgrimage booking',
    halalFeat3: 'Zero gambling or interest ads',
    halalTag: 'Sponsored B2B Partnerships',
    digitalWaqfTitle: 'Digital Waqf & Zakat Hub',
    digitalWaqfDesc: 'Integrated Zakat calculation gateway and voluntary tech Waqf donations enabling Muslims to earn continuous Sadaqah Jariyah while supporting Islamic technology.',
    waqfFeat1: '100% transparent donation distribution',
    waqfFeat2: 'Verified humanitarian charity partners',
    waqfFeat3: 'Annual transparency reports',
    waqfTag: 'Sadaqah Jariyah Fund',
    // Footer
    footerAbout: '“Your Deen. Your Daily Companion.” Built to serve millions of Muslims worldwide with astronomical prayer times, the Noble Quran, authentic adhkar, and state-of-the-art Islamic technology.',
    iosApp: 'iOS App',
    androidApp: 'Android App',
    colIslamicFeatures: 'Islamic Features',
    colPlatformApps: 'Platform & Apps',
    colHalalEcosystem: 'Halal Ecosystem',
    footerCopyright: '© 2026 Noor-e-ilahi Global Islamic Technology Platform. Certified 100% Shariah Compliant.',
    sitemapXml: 'Sitemap XML',
    robotsTxt: 'Robots.txt',
    adminPortal: 'Admin Portal',
  },
  hi: {
    appName: 'नूर-ए-इलाही',
    appSubtitle: 'आपका दीन. आपका दैनिक साथी.',
    home: 'होम',
    prayers: 'नमाज़',
    quran: 'पवित्र क़ुरआन',
    duas: 'दुआएं व तस्बीह',
    qibla: 'क़िब्ला',
    ziyarat: 'ज़ियारत व दरगाहें',
    media: 'पवित्र मीडिया',
    calendar: 'हिजरी कैलेंडर',
    app: 'मोबाइल ऐप',
    dashboard: 'दीन ट्रैकर',
    namesOfAllah: 'अल्लाह के ९९ नाम',
    giving: 'सदक़ा जारिया',
    askAi: 'नूर एआई',
    search: 'तलाश करें...',
    selectLocation: 'शहर चुनें',
    explore: 'और देखें',
    more: 'और',
    login: 'लॉग इन',
    continueGoogle: 'Google के साथ जारी रखें',
    fajr: 'फ़ज्र',
    sunrise: 'सूर्योदय',
    dhuhr: 'ज़ुहर',
    asr: 'असर',
    maghrib: 'मग़रिब',
    isha: 'ईशा',
    nextPrayer: 'अगली नमाज़',
    timeRemaining: 'शेष समय',
    dailyVerse: 'आज की आयत',
    dailyHadith: 'दैनिक हदीस',
    adhanVoice: 'अज़ान की आवाज़',
    menu: 'मेन्यू',
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    prayerTimetable: 'नमाज़ का खगोलीय समय',
    qadaTracker: 'क़ज़ा नमाज़ ट्रैकर',
    surahsCatalog: 'क़ुरआन की ११४ सूरतें',
    sanctuariesDirectory: 'पवित्र ज़ियारतें व औलिया की दरगाहें',
    allNations: 'सभी देश',
    listenAdhan: 'अज़ान सुनें',
    activeAdhan: 'सक्रिय अज़ान',
    autoDetectedNotice: 'आपके राज्य व देश के अनुसार भाषा चुनी गई',
    // Hero Section
    heroBadge: 'वैश्विक इस्लामी डिजिटल मंच',
    heroTitle1: 'आपका दीन।',
    heroTitle2: 'आपका दैनिक साथी।',
    heroDesc: 'दुनिया भर के करोड़ों मुसलमानों के लिए समर्पित। सटीक खगोलीय नमाज़ का समय, तिलावत के साथ पवित्र क़ुरआन, प्रामाणिक हिस्नुल मुस्लिम दुआएं, क़िब्ला कम्पास और आधुनिक इस्लामिक मार्गदर्शन।',
    ctaPrayerTimes: 'नमाज़ का पूरा समय',
    ctaQuran: 'पवित्र क़ुरआन (११४ सूरह)',
    ctaMobileLab: 'मोबाइल ऐप लैब',
    trustAuthentic: 'प्रामाणिक व विश्वसनीय स्रोत',
    trustShariah: '१००% शरीअत सम्मत',
    trustAdFree: 'शून्य अश्लील विज्ञापन',
    ramadanNotice: '१४ रमज़ान १४४८ हिजरी • बरकतों का मुक़द्दस महीना',
    pilgrimsCount: '(१.२८ लाख+ नमाज़ी)',
    hadithQuote: '"तुम में सबसे बेहतर वह है जो क़ुरआन सीखे और दूसरों को सिखाए।" — सहीह बुख़ारी ५०२७',
    readQuranCta: 'क़ुरआन पढ़ें →',
    upcomingSalaah: 'आगामी नमाज़',
    timeUntilAdhan: 'अज़ान में शेष समय',
    elapsed: 'बीत चुका',
    stopAdhan: 'अज़ान रोकें (मक्का मुकर्रमा)',
    listenAdhanMakkah: 'अज़ान सुनें (मक्का मुकर्रमा)',
    openQiblaTooltip: 'क़िब्ला रुख़ देखें',
    standardAsrMethod: 'MWL • मानक असर',
    // Quick Navigation Pillars
    pillarPrayersTitle: 'नमाज़ का समय',
    pillarPrayersDesc: '७ दिनों का समय',
    pillarPrayersBadge: 'नमाज़',
    pillarQuranTitle: 'पवित्र क़ुरआन',
    pillarQuranDesc: '११४ सूरह व क़ारी',
    pillarQuranBadge: 'तिलावत',
    pillarDuasTitle: 'दुआएं व तस्बीह',
    pillarDuasDesc: 'हिस्नुल मुस्लिम',
    pillarDuasBadge: 'अज़कार',
    pillarQiblaTitle: 'क़िब्ला कम्पास',
    pillarQiblaDesc: 'सटीक काबा दिशा',
    pillarQiblaBadge: 'दिशा',
    pillarMediaTitle: 'इस्लामिक मीडिया',
    pillarMediaDesc: '४के तस्वीरें व वीडियो',
    pillarMediaBadge: 'गैलरी',
    pillarCalendarTitle: 'हिजरी कैलेंडर',
    pillarCalendarDesc: '१२ मुक़द्दस महीने',
    pillarCalendarBadge: '१४४८ हिजरी',
    // Prayer Times Section
    salaahEngine: 'खगोलीय नमाज़ इंजन',
    dailyPrayerTimes: 'दैनिक नमाज़ का समय',
    precisionCalculationFor: 'सटीक खगोलीय गणना —',
    previousDay: 'पिछला दिन',
    today: 'आज',
    nextDay: 'अगला दिन',
    methodMadhab: 'तरीक़ा व मसलक',
    calculationMethod: 'गणना विधि (कैलकुलेशन मैथड)',
    asrJurisprudence: 'असर नमाज़ का मसलक',
    standardMadhab: 'मानक (शाफ़ई, मालिकी, हम्बली)',
    hanafiMadhab: 'हनफ़ी (दोहरा साया)',
    currentBadge: 'वर्तमान',
    sunriseLabel: 'सूर्योदय',
    salaahLabel: 'नमाज़',
    ramadanFastingTimes: 'रमज़ान मुबारक १४४८ हिजरी • रोज़ा समय',
    sehriEnds: 'सहरी समाप्त:',
    iftarSunset: 'इफ़्तार (सूर्यास्त):',
    viewRamadanSchedule: '७ दिनों का रमज़ान शेड्यूल देखें',
    // Daily Ayah Section
    verseOfTheDay: 'आज की आयत',
    showEnglish: 'Show English',
    showHindi: 'हिन्दी अनुवाद',
    showUrdu: 'اردو ترجمہ',
    pauseRecitation: 'तिलावत रोकें',
    listenRecitation: 'तिलावत सुनें',
    copyVerse: 'आयत कॉपी करें',
    bookmarkVerse: 'बुकमार्क करें',
    readTafsir: 'तफ़्सीर पढ़ें',
    tafsirTitle: 'तफ़्सीर इब्न कसीर: आयतुल कुर्सी की फ़ज़ीलत',
    tafsirBody: 'यह अल्लाह की किताब की सबसे अज़ीम आयत है। सहीह हदीस में है कि रसूलुल्लाह ﷺ ने हज़रत उबय्य इब्न काब (रज़ि.) से पूछा: "अल्लाह की किताब में सबसे अज़ीम आयत कौन सी है?" उन्होंने अर्ज़ किया: "अल्लाहु ला इलाहा इल्ला हुवल हय्युल क़य्यूम (आयतुल कुर्सी)"। इस पर नबी करीम ﷺ ने उनके सीने पर हाथ फेरते हुए फ़रमाया: "ऐ अबू अल-मुंज़िर! तुम्हें इल्म मुबारक हो!"',
    // Quran Section
    nobleScripture: 'मुक़द्दस कलाम',
    browseHolyQuran: 'पवित्र क़ुरआन का अध्ययन',
    quranDesc: 'पढ़ें, मशहूर क़ारियों की तिलावत सुनें और अल्लाह तआला के पाक कलाम पर विचार करें',
    searchSurahPlaceholder: 'सूरह खोजें (जैसे कहफ़, 18, मुल्क)...',
    filterAll: 'सभी',
    filterMeccan: 'मक्की',
    filterMedinan: 'मदनी',
    ayahsCount: 'आयात',
    versesCount: 'आयात',
    juzLabel: 'पारा',
    bismillahTranslation: 'अल्लाह के नाम से शुरू जो बहुत मेहरबान और निहायत रहम करने वाला है।',
    ayahNumber: 'आयत',
    playVerse: 'आयत सुनें',
    // Duas Section
    supplicationsTitle: 'दुआएं व अज़कार',
    duasHeading: 'दुआएं व दैनिक अज़कार',
    duasDesc: 'क़ुरआन और सुन्नत से प्रामाणिक दुआएं (हिस्नुल मुस्लिम)',
    openDigitalTasbih: 'डिजिटल तस्बीह खोलें',
    interactiveTasbih: 'इंटरएक्टिव डिजिटल तस्बीह',
    tapToCount: 'गिनने के लिए टैप करें',
    targetLabel: 'लक्ष्य',
    countLabel: 'गिनें',
    resetCounter: 'तस्बीह रीसेट करें',
    catAll: 'सभी दुआएं',
    catMorning: 'सुबह व शाम',
    catSleep: 'सोने व जागने की',
    catProtection: 'हिफ़ाज़त व सुरक्षा',
    catTravel: 'सफ़र की दुआ',
    catDaily: 'दैनिक जीवन',
    catForgiveness: 'तौबा व इस्तिग़फ़ार',
    catHardship: 'कठिनाई व परेशानी',
    // Qibla Section
    sacredDirection: 'पवित्र रुख़',
    interactiveQibla: 'क़िब्ला रुख़ व दिशा',
    qiblaDesc: 'मक्का मुकर्रमा में काबा शरीफ़ (21.4225° N, 39.8262° E) की ओर ग्रेट-सर्किल त्रिकोणमितीय सूत्र से गणना की गई। दुनिया में कहीं से भी सटीक काबा दिशा में नमाज़ अदा करें।',
    qiblaHeadingLabel: 'क़िब्ला डिग्री',
    fromNorth: 'उत्तर से',
    distanceToKaaba: 'काबा शरीफ़ से दूरी',
    kilometers: 'किलोमीटर',
    currentOrigin: 'आपका वर्तमान शहर',
    kaabaMarker: 'काबा',
    // Media Section
    visualTreasures: 'इस्लामिक दृश्य खजाना',
    mediaGalleryHeading: 'इस्लामिक मीडिया गैलरी',
    mediaGalleryDesc: 'Pixabay API द्वारा संचालित सजीव हाई-डेफिनिशन तस्वीरें व वीडियोग्राफी',
    photosTab: 'तस्वीरें',
    cinematicVideosTab: 'सिनेमैटिक वीडियो',
    curatingMedia: 'इस्लामिक मीडिया लोड हो रहा है...',
    creatorLabel: 'रचनाकार',
    // Calendar Section
    sacredTimeline: 'इस्लामिक पवित्र तिथियां',
    hijriCalendarHeading: 'हिजरी कैलेंडर व इस्लामी त्योहार',
    hijriCalendarDesc: 'चांद के अनुसार इस्लामी महीनों व मुक़द्दस दिनों की जानकारी',
    currentHijriMonth: 'वर्तमान: रमज़ान १४४८ हिजरी',
    specialBlessings: 'विशेष फ़ज़ीलत व रहमत',
    eventRamadanTitle: 'मुबारक रमज़ान',
    eventRamadanDesc: 'रोज़ों का मुक़द्दस महीना, तरावीह और क़ुरआन के नुज़ूल का समय।',
    eventRamadanBadge: 'रोज़ा व रहमत',
    eventQadrTitle: 'शब-ए-क़द्र (लैलतुल क़द्र)',
    eventQadrDesc: 'हज़ार महीनों से बेहतर बरकतों वाली रात, जिसमें फ़रिश्ते उतरते हैं।',
    eventQadrBadge: 'क़द्र की रात',
    eventFitrTitle: 'ईद-उल-फ़ित्र',
    eventFitrDesc: 'माहे रमज़ान के मुकम्मल होने पर नमाज़ और ख़ुशियों का त्योहार।',
    eventFitrBadge: 'ईद की ख़ुशियां',
    eventArafahTitle: 'यौम-ए-अराफ़ा',
    eventArafahDesc: 'हज का सबसे अहम दिन। इस दिन रोज़ा रखने से दो साल के गुनाह माफ़ होते हैं।',
    eventArafahBadge: 'हज का शिखर',
    eventAdhaTitle: 'ईद-उल-अज़हा (बक़रीद)',
    eventAdhaDesc: 'हज़रत इब्राहीम (अलै.) की अज़ीम क़ुरबानी की याद में मनाया जाने वाला त्योहार।',
    eventAdhaBadge: 'बड़ी ईद',
    eventAshuraTitle: 'यौम-ए-आशूरा',
    eventAshuraDesc: 'जिस दिन अल्लाह तआला ने हज़रत मूसा (अलै.) को फ़िरऔन से निजात दिलाई थी।',
    eventAshuraBadge: 'मुक़द्दस दिन',
    // Monetization Section
    proBannerBadge: 'नूर प्रो व ग्लोबल मोबाइल ऐप्स',
    carryLightHeading: 'अपने मोबाइल में रखें दीन की रौशनी।',
    carryLightDesc: 'आईफ़ोन और एंड्रॉइड पर नूर की पूरी ताक़त का अनुभव करें। ऑफ़लाइन नमाज़ का समय, क़ुरआन की तिलावत, डिजिटल तस्बीह और सटीक क़िब्ला रुख़।',
    openSimulator: 'इंटरएक्टिव मोबाइल सिमुलेटर खोलें',
    appStoreDetails: 'ऐप्पल ऐप स्टोर',
    googlePlayPackage: 'गूगल प्ले स्टोर',
    ethicalHalalModel: 'हलाल व नैतिक मॉडल',
    freeForever: '१००% मुफ़्त',
    optionalSupporter: 'ऐच्छिक प्रो सहयोग: ₹१९९/माह',
    supporterDesc: 'सर्वर, तकनीकी खर्च और ज़रूरतमंदों तक मुफ़्त पहुंचाने के लिए सदक़ा जारिया।',
    viewTelemetry: 'मंच विवरण देखें →',
    proMembershipTitle: 'नूर-ए-इलाही प्रो सदस्यता',
    proMembershipDesc: 'इबादत में सुकून: पूरी तरह विज्ञापन मुक्त, ऑफ़लाइन क़ुरआन डाउनलोड और असीमित एआई इस्लामिक परामर्श।',
    proFeat1: 'ऑफ़लाइन ऑडियो व तिलावत',
    proFeat2: 'विस्तृत बहु-विद्वान तफ़्सीर',
    proFeat3: 'होम व लॉकस्क्रीन विजेट्स',
    proPrice: '₹१९९/माह या ₹१,५९९/वर्ष',
    verifiedDirectoryTitle: 'प्रमाणित हलाल निर्देशिका',
    verifiedDirectoryDesc: 'हलाल रेस्तरां, प्रमाणित हज व उमराह टूर्स और इस्लामी वित्तीय संस्थानों की वैश्विक सूची।',
    halalFeat1: 'सत्यापित हलाल प्रमाणन',
    halalFeat2: 'सीधा व्हाट्सएप यात्रा बुकिंग',
    halalFeat3: 'शून्य सूद व जुआ विज्ञापन',
    halalTag: 'प्रायोजित बिज़नेस साझेदारी',
    digitalWaqfTitle: 'डिजिटल वक़्फ़ व ज़कात केंद्र',
    digitalWaqfDesc: 'सटीक ज़कात कैलकुलेटर और इस्लामिक तकनीक के विकास हेतु सदक़ा जारिया वक़्फ़ दान।',
    waqfFeat1: '१००% पारदर्शी दान वितरण',
    waqfFeat2: 'सत्यापित चैरिटी पार्टनर्स',
    waqfFeat3: 'वार्षिक पारदर्शिता रिपोर्ट',
    waqfTag: 'सदक़ा जारिया फंड',
    // Footer
    footerAbout: '“आपका दीन. आपका दैनिक साथी।” दुनिया भर के मुसलमानों की सेवा के लिए समर्पित — सटीक नमाज़, पवित्र क़ुरआन, प्रामाणिक अज़कार और अत्याधुनिक तकनीक।',
    iosApp: 'iOS ऐप',
    androidApp: 'Android ऐप',
    colIslamicFeatures: 'इस्लामिक सुविधाएं',
    colPlatformApps: 'मंच व ऐप्स',
    colHalalEcosystem: 'हलाल मंच',
    footerCopyright: '© २०२६ नूर-ए-इलाही ग्लोबल इस्लामिक टेक्नोलॉजी। १००% शरीअत सम्मत व आधुनिक प्रणाली।',
    sitemapXml: 'साइटमैप XML',
    robotsTxt: 'Robots.txt',
    adminPortal: 'एडमिन पोर्टल',
  },
  ur: {
    appName: 'نُورِ اِلٰہی',
    appSubtitle: 'آپ کا دین، آپ کا روزمرہ کا رفیق۔',
    home: 'ہوم',
    prayers: 'نماز',
    quran: 'قرآن مجید',
    duas: 'دعائیں و تسبیح',
    qibla: 'قبلہ رخ',
    ziyarat: 'زیارات و درگاہیں',
    media: 'مقدس میڈیا',
    calendar: 'ہجری کیلنڈر',
    app: 'موبائل ایپ',
    dashboard: 'دین ٹریکر',
    namesOfAllah: 'اسمائے حسنیٰ',
    giving: 'صدقہ جاریہ',
    askAi: 'نور اے آئی',
    search: 'تلاش کریں...',
    selectLocation: 'شہر منتخب کریں',
    explore: 'مزید دریافت کریں',
    more: 'مزید',
    login: 'لاگ ان',
    continueGoogle: 'گوگل کے ساتھ جاری رکھیں',
    fajr: 'فجر',
    sunrise: 'طلوعِ آفتاب',
    dhuhr: 'ظہر',
    asr: 'عصر',
    maghrib: 'مغرب',
    isha: 'عشاء',
    nextPrayer: 'اگلی نماز',
    timeRemaining: 'باقی وقت',
    dailyVerse: 'آج کی آیت',
    dailyHadith: 'فرمانِ نبوی ﷺ',
    adhanVoice: 'اذان کی آواز',
    menu: 'مینو',
    language: 'زبان',
    selectLanguage: 'زبان کا انتخاب کریں',
    allRightsReserved: 'جملہ حقوق محفوظ ہیں',
    prayerTimetable: 'اوقاتِ نماز کا مکمل جدول',
    qadaTracker: 'قضائے عمری اور روزانہ قضا',
    surahsCatalog: 'قرآن مجید کی ۱۱۴ سورتیں',
    sanctuariesDirectory: 'مقدس زیارات اور اولیاء اللہ کی درگاہیں',
    allNations: 'تمام ممالک',
    listenAdhan: 'اذان سنیں',
    activeAdhan: 'منتخب کردہ اذان',
    autoDetectedNotice: 'آپ کے مقام اور ریاست کے مطابق خودکار زبان',
  },
  ar: {
    appName: 'نور الإلهي',
    appSubtitle: 'دينك ورفيقك اليومي.',
    home: 'الرئيسية',
    prayers: 'الصلوات',
    quran: 'القرآن الكريم',
    duas: 'الأدعية والأذكار',
    qibla: 'القبلة',
    ziyarat: 'الزيارات والمراقد',
    media: 'الوسائط والمشاهد',
    calendar: 'التقويم الهجري',
    app: 'تطبيق الهاتف',
    dashboard: 'متابعة العبادات',
    namesOfAllah: 'أسماء الله الحسنى',
    giving: 'الصدقة الجارية',
    askAi: 'اسأل نور الذكي',
    search: 'البحث في المنصة...',
    selectLocation: 'اختر المدينة',
    explore: 'استكشف',
    more: 'المزيد',
    login: 'تسجيل الدخول',
    continueGoogle: 'المتابعة مع جوجل',
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    nextPrayer: 'الصلاة القادمة',
    timeRemaining: 'متبقي',
    dailyVerse: 'آية اليوم',
    dailyHadith: 'حديث شريف',
    adhanVoice: 'صوت الأذان',
    menu: 'القائمة',
    language: 'اللغة',
    selectLanguage: 'اختر لغة التطبيق',
    allRightsReserved: 'جميع الحقوق محفوظة',
    prayerTimetable: 'مواقيت الصلاة الفلكية الدقيقة',
    qadaTracker: 'سجل قضاء الصلوات',
    surahsCatalog: '١١٤ سورة من القرآن الكريم',
    sanctuariesDirectory: 'دليل المقامات الشريفة والمزارات',
    allNations: 'جميع الدول',
    listenAdhan: 'استمع للأذان',
    activeAdhan: 'أذان الصلاة المعتمد',
    autoDetectedNotice: 'تم تحديد اللغة تلقائياً حسب دولتك',
  },
  bn: {
    appName: 'নূর-এ-ইলাহী',
    appSubtitle: 'আপনার দীন. আপনার প্রতিদিনের সঙ্গী.',
    home: 'হোম',
    prayers: 'নামাজ',
    quran: 'আল-কুরআন',
    duas: 'দোয়া ও তাসবীহ',
    qibla: 'কিবলা',
    ziyarat: 'জিয়ারত ও দরগাহ',
    media: 'পবিত্র মিডিয়া',
    calendar: 'হিজরি ক্যালেন্ডার',
    app: 'মোবাইল অ্যাপ',
    dashboard: 'দীন ট্র্যাকার',
    namesOfAllah: 'আল্লাহর ৯৯টি নাম',
    giving: 'সাদকাহ জারিয়াহ',
    askAi: 'নূর এআই',
    search: 'অনুসন্ধান...',
    selectLocation: 'শহর নির্বাচন করুন',
    login: 'লগইন',
    continueGoogle: 'Google দিয়ে চালিয়ে যান',
    fajr: 'ফজর',
    sunrise: 'সূর্যোদয়',
    dhuhr: 'যোহর',
    asr: 'আসর',
    maghrib: 'মাগরিব',
    isha: 'ইশা',
    nextPrayer: 'পরবর্তী নামাজ',
    timeRemaining: 'বাকি সময়',
    dailyVerse: 'আজকের আয়াত',
    dailyHadith: 'আজকের হাদিস',
    adhanVoice: 'আজানের সুর',
    menu: 'মেন্যু',
    language: 'ভাষা',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত',
    prayerTimetable: 'নামাজের জ্যোতির্বিদ্যা সময়সূচি',
    qadaTracker: 'কাজা নামাজ ট্র্যাকার',
    surahsCatalog: 'পবিত্র কুরআনের ১১৪টি সূরা',
    sanctuariesDirectory: 'পবিত্র জিয়ারত ও আউলিয়া দরগাহ',
    allNations: 'সকল দেশ',
    listenAdhan: 'আজান শুনুন',
    activeAdhan: 'নির্বাচিত আজান',
    autoDetectedNotice: 'আপনার রাজ্য বা দেশের ভিত্তিতে বাংলা ভাষা স্বয়ংক্রিয়ভাবে নির্বাচিত',
  },
  ta: {
    appName: 'நூர்-ஏ-இலாஹி',
    appSubtitle: 'உங்கள் மார்க்கம். உங்கள் அன்றாட தோழன்.',
    home: 'முகப்பு',
    prayers: 'தொழுகை',
    quran: 'திருக்குர்ஆன்',
    duas: 'துஆ & தஸ்பீஹ்',
    qibla: 'கிப்லா',
    ziyarat: 'ஜியாரத் & தர்காக்கள்',
    media: 'புனித மீடியா',
    calendar: 'ஹிஜ்ரி நாள்காட்டி',
    app: 'மொபைல் செயலி',
    dashboard: 'தீன் கண்காணிப்பாளர்',
    namesOfAllah: 'அல்லாஹ்வின் 99 பெயர்கள்',
    giving: 'ஸதகா ஜாரியா',
    askAi: 'நூர் AI',
    search: 'தேடுக...',
    selectLocation: 'நகரத்தைத் தேர்வுசெய்க',
    login: 'உள்நுழைக',
    continueGoogle: 'Google உடன் தொடர்க',
    fajr: 'ஃபஜ்ர்',
    sunrise: 'சூரிய உதயம்',
    dhuhr: 'ளுஹர்',
    asr: 'அஸர்',
    maghrib: 'மஃக்ரிப்',
    isha: 'இஷா',
    nextPrayer: 'அடுத்த தொழுகை',
    timeRemaining: 'மீதமுள்ள நேரம்',
    dailyVerse: 'இன்றைய வசனம்',
    dailyHadith: 'இன்றைய நபிமொழி',
    adhanVoice: 'பாங்கு குரல்',
    menu: 'பட்டியல்',
    language: 'மொழி',
    selectLanguage: 'மொழியைத் தேர்வுசெய்க',
    allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை',
    prayerTimetable: 'துல்லியமான தொழுகை நேரங்கள்',
    qadaTracker: 'களா தொழுகை கண்காணிப்பாளர்',
    surahsCatalog: 'திருக்குர்ஆனின் 114 அத்தியாயங்கள்',
    sanctuariesDirectory: 'புனித தலங்கள் மற்றும் தர்காக்கள்',
    allNations: 'அனைத்து நாடுகள்',
    listenAdhan: 'பாங்கு கேட்க',
    activeAdhan: 'தேர்ந்தெடுக்கப்பட்ட பாங்கு',
    autoDetectedNotice: 'உங்கள் இருப்பிடத்திற்கு ஏற்ப தமிழ் மொழி தானாக அமைக்கப்பட்டது',
  },
  ml: {
    appName: 'നൂർ-ഇ-ഇലാഹി',
    appSubtitle: 'നിങ്ങളുടെ ദീൻ. നിങ്ങളുടെ നിത്യജീവിത സഹായി.',
    home: 'ഹോം',
    prayers: 'നിസ്കാരം',
    quran: 'വിശുദ്ധ ഖുർആൻ',
    duas: 'പ്രാർത്ഥനകൾ',
    qibla: 'ഖിബ്‌ല',
    ziyarat: 'സിയാറത്ത് & മഖാമുകൾ',
    media: 'ഇസ്ലാമിക മീഡിയ',
    calendar: 'ഹിജ്റ കലണ്ടർ',
    app: 'മൊബൈൽ ആപ്പ്',
    dashboard: 'ദീൻ ട്രാക്കർ',
    namesOfAllah: 'അസ്മാഉൽ ഹുസ്ന',
    giving: 'സ്വദഖ ജാരിയ',
    askAi: 'നൂർ AI',
    search: 'തിരയുക...',
    selectLocation: 'സ്ഥലം തിരഞ്ഞെടുക്കുക',
    login: 'ലോഗിൻ',
    continueGoogle: 'Google ഉപയോഗിച്ച് തുടരുക',
    fajr: 'സുബ്ഹി',
    sunrise: 'സൂര്യോദയം',
    dhuhr: 'ളുഹ്ർ',
    asr: 'അസ്വർ',
    maghrib: 'മഗ്‌രിബ്',
    isha: 'ഇശാ',
    nextPrayer: 'അടുത്ത നിസ്കാരം',
    timeRemaining: 'ബാക്കി സമയം',
    dailyVerse: 'ഇന്നത്തെ ആയത്ത്',
    dailyHadith: 'ഇന്നത്തെ ഹദീസ്',
    adhanVoice: 'ബാങ്ക് ശബ്ദം',
    menu: 'മെനു',
    language: 'ഭാഷ',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    allRightsReserved: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം',
    prayerTimetable: 'നിസ്കാര സമയങ്ങൾ',
    qadaTracker: 'ഖളാഅ് ട്രാക്കർ',
    surahsCatalog: 'ഖുർആനിലെ 114 സൂറത്തുകൾ',
    sanctuariesDirectory: 'പുണ്യ മഖാമുകൾ',
    allNations: 'എല്ലാ രാജ്യങ്ങളും',
    listenAdhan: 'ബാങ്ക് കേൾക്കുക',
    activeAdhan: 'തിരഞ്ഞെടുത്ത ബാങ്ക്',
    autoDetectedNotice: 'കേരള സംസ്ഥാനം കണ്ടെത്തി; മലയാളം ഭാഷ സ്വയം സജ്ജമാക്കി',
  },
  mr: {
    appName: 'नूर-ए-इलाही',
    appSubtitle: 'तुमचा दीन. तुमचा दैनिक साथी.',
    home: 'मुख्यपृष्ठ',
    prayers: 'नमाज़',
    quran: 'पवित्र क़ुरआन',
    duas: 'दुआ व तस्बीह',
    qibla: 'क़िब्ला',
    ziyarat: 'झियारत व दर्गा',
    media: 'पवित्र मीडिया',
    calendar: 'हिजरी कॅलेंडर',
    app: 'मोबाइल ॲप',
    dashboard: 'दीन ट्रॅकर',
    namesOfAllah: 'अल्लाहची ९९ नावे',
    giving: 'सदक़ा जारिया',
    askAi: 'नूर एआय',
    search: 'शोधा...',
    selectLocation: 'शहर निवडा',
    login: 'लॉग इन',
    continueGoogle: 'Google सह पुढे जा',
    fajr: 'फज्र',
    sunrise: 'सूर्योदय',
    dhuhr: 'जुहर',
    asr: 'असर',
    maghrib: 'मगरीब',
    isha: 'इशा',
    nextPrayer: 'पुढील नमाज़',
    timeRemaining: 'उर्वरित वेळ',
    dailyVerse: 'आजची आयत',
    dailyHadith: 'दैनिक हदीस',
    adhanVoice: 'अज़ान आवाज',
    menu: 'मेनू',
    language: 'भाषा',
    selectLanguage: 'भाषा निवडा',
    allRightsReserved: 'सर्व हक्क राखीव',
    prayerTimetable: 'नमाज़ची अचूक वेळ',
    qadaTracker: 'कझा नमाज़ ट्रॅकर',
    surahsCatalog: 'क़ुरआनमधील ११४ सूरह',
    sanctuariesDirectory: 'पवित्र झियारत व दर्गा',
    allNations: 'सर्व देश',
    listenAdhan: 'अज़ान ऐका',
    activeAdhan: 'सक्रिय अज़ान',
    autoDetectedNotice: 'तुमच्या राज्यानुसार (महाराष्ट्र) मराठी भाषा निवडली गेली',
  },
  gu: {
    appName: 'નૂર-એ-ઇલાહી',
    appSubtitle: 'તમારો દીન. તમારો દૈનિક સાથી.',
    home: 'હોમ',
    prayers: 'નમાઝ',
    quran: 'પવિત્ર કુરઆન',
    duas: 'દુઆ અને તસ્બીહ',
    qibla: 'કિબલા',
    ziyarat: 'ઝિયારત અને દરગાહ',
    media: 'પવિત્ર મીડિયા',
    calendar: 'હિજરી કેલેન્ડર',
    app: 'મોબાઈલ એપ',
    dashboard: 'દીન ટ્રેકર',
    namesOfAllah: 'અલ્લાહના ૯૯ નામો',
    giving: 'સદકા જારિયા',
    askAi: 'નૂર એઆઈ',
    search: 'શોધો...',
    selectLocation: 'શહેર પસંદ કરો',
    login: 'લોગ ઇન',
    continueGoogle: 'Google સાથે ચાલુ રાખો',
    fajr: 'ફજર',
    sunrise: 'સૂર્યોદય',
    dhuhr: 'ઝોહર',
    asr: 'અસર',
    maghrib: 'મગરીબ',
    isha: 'ઇશા',
    nextPrayer: 'આગામી નમાઝ',
    timeRemaining: 'બાકી સમય',
    dailyVerse: 'આજની આયત',
    dailyHadith: 'દૈનિક હદીસ',
    adhanVoice: 'અઝાન અવાજ',
    menu: 'મેનુ',
    language: 'ભાષા',
    selectLanguage: 'ભાષા પસંદ કરો',
    allRightsReserved: 'સર્વાધિકાર સુરક્ષિત',
    prayerTimetable: 'નમાઝનો ચોક્કસ સમય',
    qadaTracker: 'કઝા નમાઝ ટ્રેકર',
    surahsCatalog: 'કુરઆનની ૧૧૪ સૂરાઓ',
    sanctuariesDirectory: 'પવિત્ર ઝિયારત અને દરગાહ',
    allNations: 'બધા દેશો',
    listenAdhan: 'અઝાન સાંભળો',
    activeAdhan: 'પસંદ કરેલ અઝાન',
    autoDetectedNotice: 'ગુજરાત રાજ્ય અનુસાર ગુજરાતી ભાષા આપમેળે સેટ થઈ',
  },
  tr: {
    appName: 'Nûr-i İlâhî',
    appSubtitle: 'Dininiz. Günlük Manevi Yoldaşınız.',
    home: 'Ana Sayfa',
    prayers: 'Namaz Vakitleri',
    quran: 'Kur\'an-ı Kerim',
    duas: 'Dualar ve Zikir',
    qibla: 'Kıble Pusulası',
    ziyarat: 'Ziyaretler & Türbeler',
    media: 'Kutsal Medya',
    calendar: 'Hicri Takvim',
    app: 'Mobil Uygulama',
    dashboard: 'İbadet Takibi',
    namesOfAllah: 'Esmâü\'l-Hüsnâ',
    giving: 'Sadaka-i Cariye',
    askAi: 'Nur AI',
    search: 'Arama yapın...',
    selectLocation: 'Şehir Seç',
    login: 'Giriş Yap',
    continueGoogle: 'Google ile Devam Et',
    fajr: 'İmsak',
    sunrise: 'Güneş',
    dhuhr: 'Öğle',
    asr: 'İkindi',
    maghrib: 'Akşam',
    isha: 'Yatsı',
    nextPrayer: 'Sonraki Vakit',
    timeRemaining: 'kaldı',
    dailyVerse: 'Günün Ayeti',
    dailyHadith: 'Günün Hadisi',
    adhanVoice: 'Ezan Sesi',
    menu: 'Menü',
    language: 'Dil',
    selectLanguage: 'Dil Seçiniz',
    allRightsReserved: 'Tüm hakları saklıdır',
    prayerTimetable: 'Hassas Astronomik Namaz Vakitleri',
    qadaTracker: 'Kaza Namazı Takibi',
    surahsCatalog: 'Kur\'an-ı Kerim 114 Sure',
    sanctuariesDirectory: 'Mübarek Makamlar ve Türbeler',
    allNations: 'Tüm Ülkeler',
    listenAdhan: 'Ezanı Dinle',
    activeAdhan: 'Aktif Ezan Sesi',
    autoDetectedNotice: 'Konumunuza göre Türkçe dili otomatik olarak seçildi',
  },
  id: {
    appName: 'Nur-i Ilahi',
    appSubtitle: 'Agama Anda. Sahabat Harian Anda.',
    home: 'Beranda',
    prayers: 'Jadwal Sholat',
    quran: 'Al-Qur\'an Suci',
    duas: 'Doa & Dzikir',
    qibla: 'Kompas Kiblat',
    ziyarat: 'Ziarah & Makam',
    media: 'Media Islami',
    calendar: 'Kalender Hijriah',
    app: 'Aplikasi Ponsel',
    dashboard: 'Pelacak Ibadah',
    namesOfAllah: 'Asmaul Husna',
    giving: 'Sedekah Jariyah',
    askAi: 'Tanya Nur AI',
    search: 'Cari konten...',
    selectLocation: 'Pilih Kota',
    login: 'Masuk',
    continueGoogle: 'Lanjutkan dengan Google',
    fajr: 'Subuh',
    sunrise: 'Terbit',
    dhuhr: 'Dzuhur',
    asr: 'Ashar',
    maghrib: 'Maghrib',
    isha: 'Isya',
    nextPrayer: 'Sholat Berikutnya',
    timeRemaining: 'tersisa',
    dailyVerse: 'Ayat Hari Ini',
    dailyHadith: 'Hadits Hari Ini',
    adhanVoice: 'Suara Adzan',
    menu: 'Menu',
    language: 'Bahasa',
    selectLanguage: 'Pilih Bahasa',
    allRightsReserved: 'Hak cipta dilindungi undang-undang',
    prayerTimetable: 'Jadwal Sholat Astronomi Akurat',
    qadaTracker: 'Pelacak Sholat Qadha',
    surahsCatalog: '114 Surah Al-Qur\'an',
    sanctuariesDirectory: 'Direktori Ziarah & Makam Para Wali',
    allNations: 'Semua Negara',
    listenAdhan: 'Dengarkan Adzan',
    activeAdhan: 'Pilihan Panggilan Adzan',
    autoDetectedNotice: 'Bahasa Indonesia otomatis diaktifkan berdasarkan lokasi Anda',
  },
};

/**
 * Intelligent native language resolver based on country and state/region
 */
export function resolveNativeLanguage(country: string, region: string): SupportedLanguage {
  const normCountry = (country || '').toLowerCase();
  const normRegion = (region || '').toLowerCase();

  // 1. India - Check Specific State / Region
  if (
    normCountry.includes('india') ||
    normCountry.includes('bharat') ||
    normCountry === 'in'
  ) {
    // West Bengal
    if (normRegion.includes('bengal') || normRegion.includes('kolkata') || normRegion.includes('calcutta')) {
      return 'bn';
    }
    // Tamil Nadu
    if (normRegion.includes('tamil') || normRegion.includes('chennai') || normRegion.includes('madurai')) {
      return 'ta';
    }
    // Kerala
    if (normRegion.includes('kerala') || normRegion.includes('kochi') || normRegion.includes('trivandrum') || normRegion.includes('calicut')) {
      return 'ml';
    }
    // Maharashtra
    if (normRegion.includes('maharashtra') || normRegion.includes('mumbai') || normRegion.includes('pune') || normRegion.includes('nagpur')) {
      return 'mr';
    }
    // Gujarat
    if (normRegion.includes('gujarat') || normRegion.includes('ahmedabad') || normRegion.includes('surat') || normRegion.includes('vadodara')) {
      return 'gu';
    }
    // Kashmir or Hyderabad/Telangana with Urdu heritage
    if (normRegion.includes('kashmir') || normRegion.includes('srinagar') || normRegion.includes('hyderabad')) {
      return 'ur';
    }
    // Default for India is Hindi
    return 'hi';
  }

  // 2. Pakistan -> Urdu
  if (normCountry.includes('pakistan') || normCountry === 'pk') {
    return 'ur';
  }

  // 3. Bangladesh -> Bengali
  if (normCountry.includes('bangladesh') || normCountry === 'bd') {
    return 'bn';
  }

  // 4. Arab World -> Arabic
  const arabCountries = [
    'saudi arabia', 'saudi', 'uae', 'united arab emirates', 'dubai', 'abu dhabi',
    'egypt', 'morocco', 'iraq', 'syria', 'palestine', 'jordan', 'kuwait', 'qatar',
    'oman', 'bahrain', 'yemen', 'lebanon', 'algeria', 'tunisia', 'libya', 'sudan'
  ];
  if (arabCountries.some((c) => normCountry.includes(c))) {
    return 'ar';
  }

  // 5. Turkey -> Turkish
  if (normCountry.includes('turkey') || normCountry.includes('türkiye') || normCountry === 'tr') {
    return 'tr';
  }

  // 6. Indonesia & Malaysia -> Indonesian / Malay
  if (normCountry.includes('indonesia') || normCountry.includes('malaysia') || normCountry === 'id' || normCountry === 'my') {
    return 'id';
  }

  // 7. Check browser navigator language if available
  if (typeof navigator !== 'undefined' && navigator.language) {
    const langPrefix = navigator.language.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGUAGES.some((l) => l.code === langPrefix)) {
      return langPrefix as SupportedLanguage;
    }
  }

  // Default international
  return 'en';
}

interface DetectedLocationInfo {
  country?: string;
  region?: string;
  isAutoDetected: boolean;
}

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguageInfo: LanguageInfo;
  isRtl: boolean;
  t: (key: string) => string;
  detectedLocation: DetectedLocationInfo | null;
  dismissNotice: () => void;
  showAutoNotice: boolean;
}

const MANUAL_LANG_KEY = 'noor_user_manual_language';
const PREFERRED_LANG_KEY = 'noor_preferred_language';

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  currentLanguageInfo: SUPPORTED_LANGUAGES[0],
  isRtl: false,
  t: (key: string) => key,
  detectedLocation: null,
  dismissNotice: () => {},
  showAutoNotice: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [detectedLocation, setDetectedLocation] = useState<DetectedLocationInfo | null>(null);
  const [showAutoNotice, setShowAutoNotice] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if user already manually selected a language
    let manualChoice: string | null = null;
    try {
      manualChoice = localStorage.getItem(MANUAL_LANG_KEY);
      if (manualChoice && TRANSLATIONS[manualChoice as SupportedLanguage]) {
        const chosen = manualChoice as SupportedLanguage;
        setLanguageState(chosen);
        applyLanguageToDoc(chosen);
        return;
      }
    } catch {
      // ignore
    }

    // 2. Otherwise, auto-detect country & state
    detectAndApplyLanguage();
  }, []);

  const detectAndApplyLanguage = async () => {
    try {
      // Check cached location first
      const savedLoc = localStorage.getItem('noor_user_location');
      if (savedLoc) {
        const parsed = JSON.parse(savedLoc);
        if (parsed.country) {
          const autoLang = resolveNativeLanguage(parsed.country, parsed.region || parsed.city || '');
          setLanguageState(autoLang);
          applyLanguageToDoc(autoLang);
          setDetectedLocation({
            country: parsed.country,
            region: parsed.region || parsed.city,
            isAutoDetected: true,
          });
          setShowAutoNotice(true);
          return;
        }
      }

      // Fast IP detection via ipwho.is
      const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.country) {
          const autoLang = resolveNativeLanguage(data.country, data.region || data.city || '');
          setLanguageState(autoLang);
          applyLanguageToDoc(autoLang);
          setDetectedLocation({
            country: data.country,
            region: data.region || data.city,
            isAutoDetected: true,
          });
          setShowAutoNotice(true);
          try {
            localStorage.setItem(PREFERRED_LANG_KEY, autoLang);
          } catch {}
          return;
        }
      }
    } catch {
      // Network failure, use browser locale
    }

    // Fallback to browser locale
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserCode = navigator.language.split('-')[0].toLowerCase();
      if (TRANSLATIONS[browserCode as SupportedLanguage]) {
        const lang = browserCode as SupportedLanguage;
        setLanguageState(lang);
        applyLanguageToDoc(lang);
        return;
      }
    }
  };

  const applyLanguageToDoc = (lang: SupportedLanguage) => {
    const info = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = info.dir;
    }
  };

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    applyLanguageToDoc(newLang);
    setShowAutoNotice(false);
    try {
      localStorage.setItem(MANUAL_LANG_KEY, newLang);
      localStorage.setItem(PREFERRED_LANG_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const dismissNotice = () => setShowAutoNotice(false);

  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const isRtl = currentLanguageInfo.dir === 'rtl';

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguageInfo,
        isRtl,
        t,
        detectedLocation,
        dismissNotice,
        showAutoNotice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
