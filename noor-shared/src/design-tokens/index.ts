// ============================================================
// NOOR Design Tokens
// ============================================================

export const colors = {
  // Primary palette
  primary: {
    50:  '#E8F5EE',
    100: '#C6E6D4',
    200: '#A0D4B8',
    300: '#7AC29C',
    400: '#5DB487',
    500: '#0F4C3A', // Deep Emerald — primary brand
    600: '#0D4233',
    700: '#0A3529',
    800: '#072920',
    900: '#041C15',
  },
  // Forest Green
  forest: {
    500: '#1A6B50',
    600: '#155A43',
    700: '#104935',
  },
  // Warm Ivory
  ivory: {
    50:  '#FFFDF8',
    100: '#FBF8F0',
    200: '#F5EFE0',
    300: '#EDE4CC',
    400: '#E4D8B8',
    500: '#D9CBA4',
  },
  // Soft Sand
  sand: {
    50:  '#FDFBF7',
    100: '#FAF6EC',
    200: '#F5EDDA',
    300: '#EDE0C4',
    400: '#E4D3AE',
    500: '#D4C19A',
  },
  // Charcoal
  charcoal: {
    50:  '#F5F5F5',
    100: '#E5E5E5',
    200: '#CCCCCC',
    300: '#999999',
    400: '#666666',
    500: '#333333',
    600: '#2A2A2A',
    700: '#1F1F1F',
    800: '#171717',
    900: '#0F0F0F',
  },
  // Subtle Gold accent
  gold: {
    50:  '#FDF9EC',
    100: '#FAF0CC',
    200: '#F5E1A0',
    300: '#EDCF6E',
    400: '#E3BC48',
    500: '#C5A059', // Muted Gold — accent
    600: '#A88840',
    700: '#876D33',
  },
  // Semantic
  success: '#22C55E',
  warning: '#F59E0B',
  error:   '#EF4444',
  info:    '#3B82F6',
  // Backgrounds
  white:   '#FFFFFF',
  black:   '#000000',
} as const;

export const spacing = {
  0:  '0px',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  7:  '28px',
  8:  '32px',
  9:  '36px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export const radius = {
  sm:   '8px',
  md:   '12px',
  lg:   '16px',
  xl:   '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

export const typography = {
  fontFamily: {
    latin: "'Inter', 'system-ui', '-apple-system', sans-serif",
    arabic: "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs:   '0.75rem',   // 12px
    sm:   '0.875rem',  // 14px
    base: '1rem',      // 16px
    lg:   '1.125rem',  // 18px
    xl:   '1.25rem',   // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  lineHeight: {
    tight:  '1.25',
    normal: '1.5',
    relaxed: '1.75',
    arabic: '2.2',
  },
} as const;

export const shadows = {
  sm:  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md:  '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg:  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl:  '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  emerald: '0 8px 24px rgba(15, 76, 58, 0.18)',
  gold: '0 4px 12px rgba(197, 160, 89, 0.2)',
} as const;

/** Minimum touch target for accessibility */
export const MIN_TOUCH_TARGET = 44;
