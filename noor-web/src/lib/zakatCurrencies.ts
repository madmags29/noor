// ============================================================
// NOOR Web — Global Zakat Currency & Live Nisab Valuation Suite
// Multi-Country Currency Engine with Auto-Detection & Spot Bullion Rates
// ============================================================

export interface ZakatCurrency {
  code: string;
  name: string;
  country: string;
  symbol: string;
  flag: string;
  goldGramPrice: number;    // Standard 24K gold market price per gram
  silverGramPrice: number;  // Standard fine silver market price per gram
  formatDecimals: number;   // 0 or 2
  timezones: string[];
  localeCodes: string[];
}

export const ZAKAT_CURRENCIES: ZakatCurrency[] = [
  {
    code: 'INR',
    name: 'Indian Rupee',
    country: 'India',
    symbol: '₹',
    flag: '🇮🇳',
    goldGramPrice: 7450,
    silverGramPrice: 92,
    formatDecimals: 0,
    timezones: ['Asia/Kolkata', 'Asia/Calcutta'],
    localeCodes: ['en-IN', 'hi-IN', 'ur-IN', 'ta-IN', 'te-IN', 'bn-IN', 'gu-IN', 'mr-IN']
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    country: 'Saudi Arabia',
    symbol: '﷼',
    flag: '🇸🇦',
    goldGramPrice: 315,
    silverGramPrice: 4.10,
    formatDecimals: 2,
    timezones: ['Asia/Riyadh'],
    localeCodes: ['ar-SA']
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    country: 'United Arab Emirates',
    symbol: 'د.إ',
    flag: '🇦🇪',
    goldGramPrice: 308,
    silverGramPrice: 4.05,
    formatDecimals: 2,
    timezones: ['Asia/Dubai'],
    localeCodes: ['ar-AE']
  },
  {
    code: 'PKR',
    name: 'Pakistani Rupee',
    country: 'Pakistan',
    symbol: 'Rs',
    flag: '🇵🇰',
    goldGramPrice: 24800,
    silverGramPrice: 320,
    formatDecimals: 0,
    timezones: ['Asia/Karachi'],
    localeCodes: ['ur-PK', 'en-PK']
  },
  {
    code: 'BDT',
    name: 'Bangladeshi Taka',
    country: 'Bangladesh',
    symbol: '৳',
    flag: '🇧🇩',
    goldGramPrice: 10800,
    silverGramPrice: 140,
    formatDecimals: 0,
    timezones: ['Asia/Dhaka'],
    localeCodes: ['bn-BD']
  },
  {
    code: 'USD',
    name: 'US Dollar',
    country: 'United States',
    symbol: '$',
    flag: '🇺🇸',
    goldGramPrice: 84.0,
    silverGramPrice: 1.08,
    formatDecimals: 2,
    timezones: ['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Denver'],
    localeCodes: ['en-US']
  },
  {
    code: 'GBP',
    name: 'British Pound',
    country: 'United Kingdom',
    symbol: '£',
    flag: '🇬🇧',
    goldGramPrice: 66.0,
    silverGramPrice: 0.85,
    formatDecimals: 2,
    timezones: ['Europe/London'],
    localeCodes: ['en-GB']
  },
  {
    code: 'EUR',
    name: 'Euro',
    country: 'European Union',
    symbol: '€',
    flag: '🇪🇺',
    goldGramPrice: 78.0,
    silverGramPrice: 1.00,
    formatDecimals: 2,
    timezones: ['Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna'],
    localeCodes: ['fr-FR', 'de-DE', 'it-IT', 'es-ES', 'nl-NL']
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    country: 'Canada',
    symbol: 'C$',
    flag: '🇨🇦',
    goldGramPrice: 114.0,
    silverGramPrice: 1.48,
    formatDecimals: 2,
    timezones: ['America/Toronto', 'America/Vancouver', 'America/Montreal', 'America/Edmonton'],
    localeCodes: ['en-CA', 'fr-CA']
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    country: 'Australia',
    symbol: 'A$',
    flag: '🇦🇺',
    goldGramPrice: 128.0,
    silverGramPrice: 1.65,
    formatDecimals: 2,
    timezones: ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth'],
    localeCodes: ['en-AU']
  },
  {
    code: 'KWD',
    name: 'Kuwaiti Dinar',
    country: 'Kuwait',
    symbol: 'KD',
    flag: '🇰🇼',
    goldGramPrice: 25.80,
    silverGramPrice: 0.33,
    formatDecimals: 3,
    timezones: ['Asia/Kuwait'],
    localeCodes: ['ar-KW']
  },
  {
    code: 'QAR',
    name: 'Qatari Riyal',
    country: 'Qatar',
    symbol: 'QR',
    flag: '🇶🇦',
    goldGramPrice: 306,
    silverGramPrice: 3.95,
    formatDecimals: 2,
    timezones: ['Asia/Qatar'],
    localeCodes: ['ar-QA']
  },
  {
    code: 'OMR',
    name: 'Omani Rial',
    country: 'Oman',
    symbol: 'OMR',
    flag: '🇴🇲',
    goldGramPrice: 32.40,
    silverGramPrice: 0.42,
    formatDecimals: 3,
    timezones: ['Asia/Muscat'],
    localeCodes: ['ar-OM']
  },
  {
    code: 'BHD',
    name: 'Bahraini Dinar',
    country: 'Bahrain',
    symbol: 'BD',
    flag: '🇧🇭',
    goldGramPrice: 31.70,
    silverGramPrice: 0.41,
    formatDecimals: 3,
    timezones: ['Asia/Bahrain'],
    localeCodes: ['ar-BH']
  },
  {
    code: 'TRY',
    name: 'Turkish Lira',
    country: 'Turkey',
    symbol: '₺',
    flag: '🇹🇷',
    goldGramPrice: 2850,
    silverGramPrice: 37,
    formatDecimals: 0,
    timezones: ['Europe/Istanbul'],
    localeCodes: ['tr-TR']
  },
  {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    country: 'Indonesia',
    symbol: 'Rp',
    flag: '🇮🇩',
    goldGramPrice: 1350000,
    silverGramPrice: 17500,
    formatDecimals: 0,
    timezones: ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura', 'Asia/Pontianak'],
    localeCodes: ['id-ID']
  },
  {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    country: 'Malaysia',
    symbol: 'RM',
    flag: '🇲🇾',
    goldGramPrice: 370,
    silverGramPrice: 4.80,
    formatDecimals: 2,
    timezones: ['Asia/Kuala_Lumpur', 'Asia/Kuching'],
    localeCodes: ['ms-MY', 'en-MY']
  },
  {
    code: 'EGP',
    name: 'Egyptian Pound',
    country: 'Egypt',
    symbol: 'E£',
    flag: '🇪🇬',
    goldGramPrice: 4100,
    silverGramPrice: 53,
    formatDecimals: 0,
    timezones: ['Africa/Cairo'],
    localeCodes: ['ar-EG']
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    country: 'Nigeria',
    symbol: '₦',
    flag: '🇳🇬',
    goldGramPrice: 138000,
    silverGramPrice: 1780,
    formatDecimals: 0,
    timezones: ['Africa/Lagos'],
    localeCodes: ['en-NG']
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    country: 'South Africa',
    symbol: 'R',
    flag: '🇿🇦',
    goldGramPrice: 1520,
    silverGramPrice: 19.50,
    formatDecimals: 2,
    timezones: ['Africa/Johannesburg'],
    localeCodes: ['en-ZA']
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    country: 'Singapore',
    symbol: 'S$',
    flag: '🇸🇬',
    goldGramPrice: 110,
    silverGramPrice: 1.42,
    formatDecimals: 2,
    timezones: ['Asia/Singapore'],
    localeCodes: ['en-SG', 'zh-SG', 'ms-SG']
  }
];

export const DEFAULT_CURRENCY = ZAKAT_CURRENCIES[0]; // INR default or USD fallback

const CURRENCY_STORAGE_KEY = 'noor_zakat_currency';

/**
 * Detect user's current country currency based on:
 * 1. Stored manual preference
 * 2. Saved user location from locationService (IP/GPS)
 * 3. Browser Timezone
 * 4. Browser Navigator Language
 */
export function detectUserCurrency(): ZakatCurrency {
  if (typeof window === 'undefined') return DEFAULT_CURRENCY;

  try {
    // 1. Check saved manual selection
    const savedCode = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (savedCode) {
      const found = ZAKAT_CURRENCIES.find(c => c.code.toUpperCase() === savedCode.toUpperCase());
      if (found) return found;
    }

    // 2. Check saved user location country
    const savedLocRaw = localStorage.getItem('noor_user_location');
    if (savedLocRaw) {
      const loc = JSON.parse(savedLocRaw);
      if (loc && loc.country) {
        const countryLower = loc.country.toLowerCase();
        const matched = ZAKAT_CURRENCIES.find(
          c =>
            c.country.toLowerCase() === countryLower ||
            countryLower.includes(c.country.toLowerCase()) ||
            c.country.toLowerCase().includes(countryLower)
        );
        if (matched) return matched;
      }
    }

    // 3. Check browser timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      const tzMatch = ZAKAT_CURRENCIES.find(c => c.timezones.includes(tz));
      if (tzMatch) return tzMatch;

      // Partial timezone match
      if (tz.includes('Kolkata') || tz.includes('Calcutta')) return ZAKAT_CURRENCIES.find(c => c.code === 'INR')!;
      if (tz.includes('Riyadh')) return ZAKAT_CURRENCIES.find(c => c.code === 'SAR')!;
      if (tz.includes('Dubai')) return ZAKAT_CURRENCIES.find(c => c.code === 'AED')!;
      if (tz.includes('Karachi')) return ZAKAT_CURRENCIES.find(c => c.code === 'PKR')!;
      if (tz.includes('Dhaka')) return ZAKAT_CURRENCIES.find(c => c.code === 'BDT')!;
      if (tz.includes('London')) return ZAKAT_CURRENCIES.find(c => c.code === 'GBP')!;
      if (tz.includes('Istanbul')) return ZAKAT_CURRENCIES.find(c => c.code === 'TRY')!;
      if (tz.includes('Jakarta') || tz.includes('Makassar')) return ZAKAT_CURRENCIES.find(c => c.code === 'IDR')!;
      if (tz.includes('Kuala_Lumpur')) return ZAKAT_CURRENCIES.find(c => c.code === 'MYR')!;
      if (tz.includes('Cairo')) return ZAKAT_CURRENCIES.find(c => c.code === 'EGP')!;
    }

    // 4. Check browser languages
    const lang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (lang) {
      const langMatch = ZAKAT_CURRENCIES.find(c =>
        c.localeCodes.some(lc => lc.toLowerCase() === lang || lang.endsWith(lc.split('-')[1]?.toLowerCase() || ''))
      );
      if (langMatch) return langMatch;
    }
  } catch {
    // Fallback on any error
  }

  return DEFAULT_CURRENCY;
}

/**
 * Save user's preferred currency
 */
export function saveUserCurrency(currencyCode: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currencyCode);
  } catch {
    // Ignore quota errors
  }
}

/**
 * Format currency amount with symbol and appropriate decimals
 */
export function formatCurrencyAmount(amount: number, currency: ZakatCurrency): string {
  const decimals = currency.formatDecimals;
  const formattedNumber = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${currency.symbol} ${formattedNumber}`;
}
