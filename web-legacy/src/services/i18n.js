// NOOR Internationalization & Direction Service
import { LANGUAGES } from '../data/languages.js';
import { TRANSLATIONS } from '../data/translations.js';

class I18nService {
  constructor() {
    this.currentLanguage = localStorage.getItem('noor_lang') || 'en';
    this.listeners = [];
  }

  init() {
    this.applyLanguage(this.currentLanguage);
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getLanguageMeta(code = this.currentLanguage) {
    return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
  }

  t(key, fallback = '') {
    const langDict = TRANSLATIONS[this.currentLanguage] || TRANSLATIONS['en'];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = TRANSLATIONS['en'];
    return defaultDict[key] || fallback || key;
  }

  setLanguage(code) {
    if (!LANGUAGES.find(l => l.code === code)) return;
    this.currentLanguage = code;
    localStorage.setItem('noor_lang', code);
    this.applyLanguage(code);
    this.notify();
  }

  applyLanguage(code) {
    const meta = this.getLanguageMeta(code);
    document.documentElement.lang = code;
    document.documentElement.dir = meta.dir;
    if (meta.dir === 'rtl') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.currentLanguage, this.getLanguageMeta()));
    window.dispatchEvent(new CustomEvent('noor:language-changed', { detail: { lang: this.currentLanguage } }));
  }
}

export const i18n = new I18nService();
