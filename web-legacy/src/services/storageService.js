// NOOR Storage & User Preferences Manager
const DEFAULT_PREFS = {
  theme: 'light',
  language: 'en',
  calculationMethod: 'MWL',
  asrMethod: 'standard',
  city: 'London',
  country: 'United Kingdom',
  lat: 51.5074,
  lng: -0.1278,
  tasbihCount: 0,
  tasbihTarget: 33,
  completedPrayers: { fajr: true, dhuhr: true, asr: false, maghrib: false, isha: false },
  bookmarks: ['surah-1-1', 'hadith-bukhari-1', 'dua-morning-1'],
  offlineDownloaded: ['quran-basic', 'duas-hisn', 'hajj-guide'],
  onboardingCompleted: true
};

class StorageService {
  constructor() {
    this.prefs = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem('noor_user_prefs');
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS;
    } catch {
      return DEFAULT_PREFS;
    }
  }

  save() {
    try {
      localStorage.setItem('noor_user_prefs', JSON.stringify(this.prefs));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }

  get(key) {
    return this.prefs[key];
  }

  set(key, value) {
    this.prefs[key] = value;
    this.save();
  }

  togglePrayer(prayerKey) {
    if (!this.prefs.completedPrayers) {
      this.prefs.completedPrayers = {};
    }
    this.prefs.completedPrayers[prayerKey] = !this.prefs.completedPrayers[prayerKey];
    this.save();
    return this.prefs.completedPrayers[prayerKey];
  }

  toggleBookmark(id) {
    if (!this.prefs.bookmarks) {
      this.prefs.bookmarks = [];
    }
    const idx = this.prefs.bookmarks.indexOf(id);
    if (idx > -1) {
      this.prefs.bookmarks.splice(idx, 1);
    } else {
      this.prefs.bookmarks.push(id);
    }
    this.save();
    return this.isBookmarked(id);
  }

  isBookmarked(id) {
    return this.prefs.bookmarks ? this.prefs.bookmarks.includes(id) : false;
  }
}

export const storageService = new StorageService();
