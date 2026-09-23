// ============================================================
// NOOR Constants — Supported Languages (90+)
// ============================================================

import type { SupportedLocale } from '../types/common';

export const SUPPORTED_LANGUAGES: SupportedLocale[] = [
  // Core languages
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', script: 'Devanagari', enabled: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', script: 'Bengali', enabled: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', script: 'Gurmukhi', enabled: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', script: 'Gujarati', enabled: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr', script: 'Devanagari', enabled: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', script: 'Telugu', enabled: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', script: 'Tamil', enabled: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', direction: 'ltr', script: 'Kannada', enabled: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr', script: 'Malayalam', enabled: true },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', direction: 'ltr', script: 'Bengali', enabled: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', direction: 'ltr', script: 'Odia', enabled: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', direction: 'ltr', script: 'Devanagari', enabled: true },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', direction: 'ltr', script: 'Sinhala', enabled: true },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی', direction: 'rtl', script: 'Arabic', enabled: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргыз', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'jv', name: 'Javanese', nativeName: 'Basa Jawa', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr', script: 'Greek', enabled: true },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'zh-Hans', name: 'Chinese (Simplified)', nativeName: '简体中文', direction: 'ltr', script: 'Han', enabled: true },
  { code: 'zh-Hant', name: 'Chinese (Traditional)', nativeName: '繁體中文', direction: 'ltr', script: 'Han', enabled: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', script: 'Kana', enabled: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', script: 'Hangul', enabled: true },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', direction: 'ltr', script: 'Cyrillic', enabled: true },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr', script: 'Thai', enabled: true },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', direction: 'ltr', script: 'Khmer', enabled: true },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', direction: 'ltr', script: 'Myanmar', enabled: true },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', direction: 'ltr', script: 'Lao', enabled: true },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', direction: 'ltr', script: 'Georgian', enabled: true },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', direction: 'ltr', script: 'Armenian', enabled: true },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', direction: 'ltr', script: 'Ethiopic', enabled: true },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ff', name: 'Fulfulde', nativeName: 'Fulfulde', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'om', name: 'Oromo', nativeName: 'Oromoo', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ', direction: 'ltr', script: 'Ethiopic', enabled: true },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy', direction: 'ltr', script: 'Latin', enabled: true },
  { code: 'zgh', name: 'Tamazight', nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', direction: 'ltr', script: 'Tifinagh', enabled: true },
];

/** RTL language codes for quick lookup */
export const RTL_LANGUAGES = new Set(
  SUPPORTED_LANGUAGES.filter(l => l.direction === 'rtl').map(l => l.code)
);

/** Get direction for a language code */
export function getTextDirection(code: string): 'ltr' | 'rtl' {
  return RTL_LANGUAGES.has(code) ? 'rtl' : 'ltr';
}

/** Default language */
export const DEFAULT_LANGUAGE = 'en';
