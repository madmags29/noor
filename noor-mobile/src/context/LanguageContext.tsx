import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    quran: 'Quran',
    duas: 'Duas',
    qibla: 'Qibla',
    ziyarat: 'Ziyarat',
    media: 'Media',
    calendar: 'Calendar',
    dashboard: 'Tracker',
    namesOfAllah: '99 Names',
    giving: 'Sadaqah',
    askAi: 'Noor AI',
    search: 'Search...',
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
    selectLanguage: 'Select Native Language',
  },
  hi: {
    appName: 'नूर-ए-इलाही',
    appSubtitle: 'आपका दीन. आपका दैनिक साथी.',
    home: 'होम',
    prayers: 'नमाज़',
    quran: 'क़ुरआन',
    duas: 'दुआएं',
    qibla: 'क़िब्ला',
    ziyarat: 'ज़ियारत',
    media: 'मीडिया',
    calendar: 'कैलेंडर',
    dashboard: 'ट्रैकर',
    namesOfAllah: '९९ नाम',
    giving: 'सदक़ा',
    askAi: 'नूर एआई',
    search: 'खोजें...',
    login: 'लॉग इन',
    continueGoogle: 'Google से जारी रखें',
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
    adhanVoice: 'अज़ान आवाज़',
    menu: 'मेन्यू',
    language: 'भाषा',
    selectLanguage: 'मातृभाषा चुनें',
  },
  ur: {
    appName: 'نُورِ اِلٰہی',
    appSubtitle: 'آپ کا دین، آپ کا روزمرہ کا رفیق۔',
    home: 'ہوم',
    prayers: 'نماز',
    quran: 'قرآن',
    duas: 'دعائیں',
    qibla: 'قبلہ',
    ziyarat: 'زیارات',
    media: 'میڈیا',
    calendar: 'کیلنڈر',
    dashboard: 'ٹریکر',
    namesOfAllah: 'اسمائے حسنیٰ',
    giving: 'صدقہ',
    askAi: 'نور اے آئی',
    search: 'تلاش...',
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
    selectLanguage: 'زبان منتخب کریں',
  },
  ar: {
    appName: 'نور الإلهي',
    appSubtitle: 'دينك ورفيقك اليومي.',
    home: 'الرئيسية',
    prayers: 'الصلوات',
    quran: 'القرآن',
    duas: 'الأدعية',
    qibla: 'القبلة',
    ziyarat: 'الزيارات',
    media: 'المرئيات',
    calendar: 'التقويم',
    dashboard: 'المتابعة',
    namesOfAllah: 'الأسماء الحسنى',
    giving: 'الصدقة',
    askAi: 'نور الذكي',
    search: 'بحث...',
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
  },
  bn: {
    appName: 'নূর-এ-ইলাহী',
    appSubtitle: 'আপনার দীন. আপনার প্রতিদিনের সঙ্গী.',
    home: 'হোম',
    prayers: 'নামাজ',
    quran: 'কুরআন',
    duas: 'দোয়া',
    qibla: 'কিবলা',
    ziyarat: 'জিয়ারত',
    media: 'মিডিয়া',
    calendar: 'ক্যালেন্ডার',
    dashboard: 'ট্র্যাকার',
    namesOfAllah: '৯৯ নাম',
    giving: 'সাদকাহ',
    askAi: 'নূর এআই',
    search: 'অনুসন্ধান...',
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
    selectLanguage: 'মাতৃভাষা নির্বাচন করুন',
  },
  ta: {
    appName: 'நூர்-ஏ-இலாஹி',
    appSubtitle: 'உங்கள் மார்க்கம். உங்கள் அன்றாட தோழன்.',
    home: 'முகப்பு',
    prayers: 'தொழுகை',
    quran: 'குர்ஆன்',
    duas: 'துஆக்கள்',
    qibla: 'கிப்லா',
    ziyarat: 'ஜியாரத்',
    media: 'மீடியா',
    calendar: 'நாள்காட்டி',
    dashboard: 'கண்காணிப்பாளர்',
    namesOfAllah: '99 பெயர்கள்',
    giving: 'ஸதகா',
    askAi: 'நூர் AI',
    search: 'தேடுக...',
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
    selectLanguage: 'தாய்மொழியைத் தேர்வுசெய்க',
  },
  ml: {
    appName: 'നൂർ-ഇ-ഇലാഹി',
    appSubtitle: 'നിങ്ങളുടെ ദീൻ. നിങ്ങളുടെ നിത്യജീവിത സഹായി.',
    home: 'ഹോം',
    prayers: 'നിസ്കാരം',
    quran: 'ഖുർആൻ',
    duas: 'പ്രാർത്ഥനകൾ',
    qibla: 'ഖിബ്‌ല',
    ziyarat: 'സിയാറത്ത്',
    media: 'മീഡിയ',
    calendar: 'കലണ്ടർ',
    dashboard: 'ട്രാക്കർ',
    namesOfAllah: '99 നാമങ്ങൾ',
    giving: 'സ്വദഖ',
    askAi: 'നൂർ AI',
    search: 'തിരയുക...',
    login: 'ലോഗിൻ',
    continueGoogle: 'Google വഴി തുടരുക',
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
  },
  mr: {
    appName: 'नूर-ए-इलाही',
    appSubtitle: 'तुमचा दीन. तुमचा दैनिक साथी.',
    home: 'मुख्यपृष्ठ',
    prayers: 'नमाज़',
    quran: 'क़ुरआन',
    duas: 'दुआ',
    qibla: 'क़िब्ला',
    ziyarat: 'झियारत',
    media: 'मीडिया',
    calendar: 'कॅलेंडर',
    dashboard: 'ट्रॅकर',
    namesOfAllah: '९९ नावे',
    giving: 'सदक़ा',
    askAi: 'नूर एआय',
    search: 'शोधा...',
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
  },
  gu: {
    appName: 'નૂર-એ-ઇલાહી',
    appSubtitle: 'તમારો દીન. તમારો દૈનિક સાથી.',
    home: 'હોમ',
    prayers: 'નમાઝ',
    quran: 'કુરઆન',
    duas: 'દુઆ',
    qibla: 'કિબલા',
    ziyarat: 'ઝિયારત',
    media: 'મીડિયા',
    calendar: 'કેલેન્ડર',
    dashboard: 'ટ્રેકર',
    namesOfAllah: '૯૯ નામો',
    giving: 'સદકા',
    askAi: 'નૂર એઆઈ',
    search: 'શોધો...',
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
  },
  tr: {
    appName: 'Nûr-i İlâhî',
    appSubtitle: 'Dininiz. Günlük Manevi Yoldaşınız.',
    home: 'Ana Sayfa',
    prayers: 'Namaz',
    quran: 'Kur\'an',
    duas: 'Dualar',
    qibla: 'Kıble',
    ziyarat: 'Ziyaretler',
    media: 'Medya',
    calendar: 'Takvim',
    dashboard: 'Takip',
    namesOfAllah: 'Esmâü\'l-Hüsnâ',
    giving: 'Sadaka',
    askAi: 'Nur AI',
    search: 'Ara...',
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
  },
  id: {
    appName: 'Nur-i Ilahi',
    appSubtitle: 'Agama Anda. Sahabat Harian Anda.',
    home: 'Beranda',
    prayers: 'Sholat',
    quran: 'Al-Qur\'an',
    duas: 'Doa',
    qibla: 'Kiblat',
    ziyarat: 'Ziarah',
    media: 'Media',
    calendar: 'Kalender',
    dashboard: 'Pelacak',
    namesOfAllah: 'Asmaul Husna',
    giving: 'Sedekah',
    askAi: 'Nur AI',
    search: 'Cari...',
    login: 'Masuk',
    continueGoogle: 'Lanjutkan dengan Google',
    fajr: 'Subuh',
    sunrise: 'Terbit',
    dhuhr: 'Dzuhur',
    asr: 'Ashar',
    maghrib: 'Maghrib',
    isha: 'Isya',
    nextPrayer: 'Berikutnya',
    timeRemaining: 'tersisa',
    dailyVerse: 'Ayat Hari Ini',
    dailyHadith: 'Hadits Hari Ini',
    adhanVoice: 'Suara Adzan',
    menu: 'Menu',
    language: 'Bahasa',
    selectLanguage: 'Pilih Bahasa',
  },
};

export function resolveNativeLanguage(country: string, region: string): SupportedLanguage {
  const normCountry = (country || '').toLowerCase();
  const normRegion = (region || '').toLowerCase();

  // 1. India - Match State
  if (normCountry.includes('india') || normCountry.includes('bharat') || normCountry === 'in') {
    if (normRegion.includes('bengal') || normRegion.includes('kolkata')) return 'bn';
    if (normRegion.includes('tamil') || normRegion.includes('chennai')) return 'ta';
    if (normRegion.includes('kerala') || normRegion.includes('kochi')) return 'ml';
    if (normRegion.includes('maharashtra') || normRegion.includes('mumbai')) return 'mr';
    if (normRegion.includes('gujarat') || normRegion.includes('ahmedabad')) return 'gu';
    if (normRegion.includes('kashmir') || normRegion.includes('hyderabad')) return 'ur';
    return 'hi';
  }

  // 2. Pakistan -> Urdu
  if (normCountry.includes('pakistan') || normCountry === 'pk') return 'ur';

  // 3. Bangladesh -> Bengali
  if (normCountry.includes('bangladesh') || normCountry === 'bd') return 'bn';

  // 4. Arab Countries -> Arabic
  const arabCountries = ['saudi', 'uae', 'emirates', 'egypt', 'morocco', 'iraq', 'syria', 'palestine', 'jordan', 'kuwait', 'qatar', 'oman', 'bahrain'];
  if (arabCountries.some((c) => normCountry.includes(c))) return 'ar';

  // 5. Turkey -> Turkish
  if (normCountry.includes('turkey') || normCountry.includes('türkiye') || normCountry === 'tr') return 'tr';

  // 6. Indonesia -> Indonesian
  if (normCountry.includes('indonesia') || normCountry === 'id') return 'id';

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
}

const MANUAL_KEY = '@noor_user_manual_language';

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  currentLanguageInfo: SUPPORTED_LANGUAGES[0],
  isRtl: false,
  t: (key: string) => key,
  detectedLocation: null,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [detectedLocation, setDetectedLocation] = useState<DetectedLocationInfo | null>(null);

  useEffect(() => {
    initLanguage();
  }, []);

  const initLanguage = async () => {
    try {
      // 1. Check if user manually saved language preference previously
      const saved = await AsyncStorage.getItem(MANUAL_KEY);
      if (saved && TRANSLATIONS[saved as SupportedLanguage]) {
        setLanguageState(saved as SupportedLanguage);
        return;
      }

      // 2. Auto-detect via fast IP geolocation
      const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.country) {
          const autoLang = resolveNativeLanguage(data.country, data.region || data.city || '');
          setLanguageState(autoLang);
          setDetectedLocation({
            country: data.country,
            region: data.region || data.city,
            isAutoDetected: true,
          });
        }
      }
    } catch {
      // ignore
    }
  };

  const setLanguage = async (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      await AsyncStorage.setItem(MANUAL_KEY, newLang);
    } catch {
      // ignore
    }
  };

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
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
