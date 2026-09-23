// NOOR Global Location & Auto-Detection Service
import { calculateQibla, getPrayerTimes } from '../data/prayerData.js';
import { storageService } from './storageService.js';

export const GLOBAL_LOCATIONS = [
  // Middle East & North Africa
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, region: 'Middle East' },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111, region: 'Middle East' },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, region: 'Middle East' },
  { city: 'Jeddah', country: 'Saudi Arabia', lat: 21.5433, lng: 39.1728, region: 'Middle East' },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, region: 'Middle East' },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, region: 'Middle East' },
  { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310, region: 'Middle East' },
  { city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774, region: 'Middle East' },
  { city: 'Muscat', country: 'Oman', lat: 23.5880, lng: 58.3829, region: 'Middle East' },
  { city: 'Manama', country: 'Bahrain', lat: 26.2285, lng: 50.5860, region: 'Middle East' },
  { city: 'Amman', country: 'Jordan', lat: 31.9454, lng: 35.9284, region: 'Middle East' },
  { city: 'Jerusalem (Al-Quds)', country: 'Palestine', lat: 31.7683, lng: 35.2137, region: 'Middle East' },
  { city: 'Beirut', country: 'Lebanon', lat: 33.8938, lng: 35.5018, region: 'Middle East' },
  { city: 'Baghdad', country: 'Iraq', lat: 33.3152, lng: 44.3661, region: 'Middle East' },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, region: 'North Africa' },
  { city: 'Alexandria', country: 'Egypt', lat: 31.2001, lng: 29.9187, region: 'North Africa' },
  { city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, region: 'North Africa' },
  { city: 'Rabat', country: 'Morocco', lat: 34.0209, lng: -6.8416, region: 'North Africa' },
  { city: 'Tunis', country: 'Tunisia', lat: 36.8065, lng: 10.1815, region: 'North Africa' },
  { city: 'Algiers', country: 'Algeria', lat: 36.7538, lng: 3.0588, region: 'North Africa' },
  { city: 'Tripoli', country: 'Libya', lat: 32.8872, lng: 13.1913, region: 'North Africa' },

  // South Asia
  { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, region: 'South Asia' },
  { city: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, region: 'South Asia' },
  { city: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479, region: 'South Asia' },
  { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, region: 'South Asia' },
  { city: 'Chittagong', country: 'Bangladesh', lat: 22.3569, lng: 91.7832, region: 'South Asia' },
  { city: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025, region: 'South Asia' },
  { city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, region: 'South Asia' },
  { city: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, region: 'South Asia' },
  { city: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946, region: 'South Asia' },
  { city: 'Lucknow', country: 'India', lat: 26.8467, lng: 80.9462, region: 'South Asia' },
  { city: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, region: 'South Asia' },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, region: 'South Asia' },
  { city: 'Kabul', country: 'Afghanistan', lat: 34.5553, lng: 69.2075, region: 'South Asia' },

  // Southeast Asia
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, region: 'Southeast Asia' },
  { city: 'Surabaya', country: 'Indonesia', lat: -7.2575, lng: 112.7521, region: 'Southeast Asia' },
  { city: 'Bandung', country: 'Indonesia', lat: -6.9175, lng: 107.6191, region: 'Southeast Asia' },
  { city: 'Medan', country: 'Indonesia', lat: 3.5952, lng: 98.6722, region: 'Southeast Asia' },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, region: 'Southeast Asia' },
  { city: 'Penang', country: 'Malaysia', lat: 5.4141, lng: 100.3288, region: 'Southeast Asia' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, region: 'Southeast Asia' },
  { city: 'Bandar Seri Begawan', country: 'Brunei', lat: 4.9031, lng: 114.9398, region: 'Southeast Asia' },
  { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, region: 'Southeast Asia' },
  { city: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, region: 'Southeast Asia' },

  // Europe & Turkey
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, region: 'Europe' },
  { city: 'Ankara', country: 'Turkey', lat: 39.9334, lng: 32.8597, region: 'Europe' },
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, region: 'Europe' },
  { city: 'Birmingham', country: 'United Kingdom', lat: 52.4862, lng: -1.8904, region: 'Europe' },
  { city: 'Manchester', country: 'United Kingdom', lat: 53.4808, lng: -2.2426, region: 'Europe' },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, region: 'Europe' },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, region: 'Europe' },
  { city: 'Frankfurt', country: 'Germany', lat: 50.1109, lng: 8.6821, region: 'Europe' },
  { city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, region: 'Europe' },
  { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, region: 'Europe' },
  { city: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, region: 'Europe' },
  { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, region: 'Europe' },
  { city: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522, region: 'Europe' },
  { city: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, region: 'Europe' },
  { city: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, region: 'Europe' },
  { city: 'Sarajevo', country: 'Bosnia and Herzegovina', lat: 43.8563, lng: 18.4131, region: 'Europe' },
  { city: 'Baku', country: 'Azerbaijan', lat: 40.4093, lng: 49.8671, region: 'Europe' },

  // North America
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, region: 'North America' },
  { city: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298, region: 'North America' },
  { city: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437, region: 'North America' },
  { city: 'Houston', country: 'United States', lat: 29.7604, lng: -95.3698, region: 'North America' },
  { city: 'Dallas', country: 'United States', lat: 32.7767, lng: -96.7970, region: 'North America' },
  { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, region: 'North America' },
  { city: 'Montreal', country: 'Canada', lat: 45.5017, lng: -73.5673, region: 'North America' },
  { city: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207, region: 'North America' },

  // Sub-Saharan Africa
  { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, region: 'Africa' },
  { city: 'Abuja', country: 'Nigeria', lat: 9.0765, lng: 7.3986, region: 'Africa' },
  { city: 'Kano', country: 'Nigeria', lat: 12.0022, lng: 8.5920, region: 'Africa' },
  { city: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219, region: 'Africa' },
  { city: 'Mogadishu', country: 'Somalia', lat: 2.0469, lng: 45.3182, region: 'Africa' },
  { city: 'Khartoum', country: 'Sudan', lat: 15.5007, lng: 32.5599, region: 'Africa' },
  { city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473, region: 'Africa' },
  { city: 'Cape Town', country: 'South Africa', lat: -33.9249, lng: 18.4241, region: 'Africa' },
  { city: 'Dakar', country: 'Senegal', lat: 14.7167, lng: -17.4677, region: 'Africa' },

  // Central Asia & Oceania
  { city: 'Tashkent', country: 'Uzbekistan', lat: 41.2995, lng: 69.2401, region: 'Central Asia' },
  { city: 'Samarkand', country: 'Uzbekistan', lat: 39.6542, lng: 66.9597, region: 'Central Asia' },
  { city: 'Almaty', country: 'Kazakhstan', lat: 43.2220, lng: 76.8512, region: 'Central Asia' },
  { city: 'Astana', country: 'Kazakhstan', lat: 51.1694, lng: 71.4491, region: 'Central Asia' },
  { city: 'Bishkek', country: 'Kyrgyzstan', lat: 42.8746, lng: 74.5698, region: 'Central Asia' },
  { city: 'Dushanbe', country: 'Tajikistan', lat: 38.5598, lng: 68.7870, region: 'Central Asia' },
  { city: 'Ashgabat', country: 'Turkmenistan', lat: 37.9601, lng: 58.3261, region: 'Central Asia' },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, region: 'Oceania' },
  { city: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, region: 'Oceania' },
  { city: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633, region: 'Oceania' }
];

class LocationService {
  constructor() {
    this.current = this.loadSavedLocation();
    this.listeners = [];
  }

  loadSavedLocation() {
    const saved = storageService.get('saved_location');
    if (saved && saved.city) return saved;
    return {
      city: 'London',
      country: 'United Kingdom',
      lat: 51.5074,
      lng: -0.1278,
      isAutoDetected: false
    };
  }

  getCurrentLocation() {
    return this.current;
  }

  setLocation(loc, isAuto = false) {
    this.current = {
      ...loc,
      isAutoDetected: isAuto
    };
    storageService.set('saved_location', this.current);
    this.notify();
  }

  // Auto-detect user's country & city using Geolocation API or IP
  async detectUserLocation() {
    return new Promise((resolve) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const nearest = this.findNearestLocation(latitude, longitude);
            const detected = {
              city: nearest ? nearest.city : 'Local Area',
              country: nearest ? nearest.country : 'Detected Location',
              lat: latitude,
              lng: longitude,
              isAutoDetected: true
            };
            this.setLocation(detected, true);
            resolve({ success: true, location: detected });
          },
          async () => {
            // Fallback to IP geolocation
            const ipLoc = await this.detectByIP();
            resolve(ipLoc);
          },
          { timeout: 7000, enableHighAccuracy: false }
        );
      } else {
        this.detectByIP().then(resolve);
      }
    });
  }

  async detectByIP() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('IP API response not OK');
      const data = await res.json();
      const detected = {
        city: data.city || 'Detected City',
        country: data.country_name || 'Detected Country',
        lat: data.latitude || 51.5074,
        lng: data.longitude || -0.1278,
        isAutoDetected: true
      };
      this.setLocation(detected, true);
      return { success: true, location: detected };
    } catch {
      // Return default location gracefully
      return { success: false, location: this.current };
    }
  }

  findNearestLocation(lat, lng) {
    let best = null;
    let minDistance = Infinity;

    for (const loc of GLOBAL_LOCATIONS) {
      const d = Math.hypot(loc.lat - lat, loc.lng - lng);
      if (d < minDistance) {
        minDistance = d;
        best = loc;
      }
    }
    return best || GLOBAL_LOCATIONS[0];
  }

  searchLocations(query) {
    if (!query || query.trim().length === 0) return GLOBAL_LOCATIONS;
    const q = query.toLowerCase().trim();
    return GLOBAL_LOCATIONS.filter(l => 
      l.city.toLowerCase().includes(q) || 
      l.country.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q)
    );
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.current));
    window.dispatchEvent(new CustomEvent('noor:location-changed', { detail: this.current }));
  }
}

export const locationService = new LocationService();
