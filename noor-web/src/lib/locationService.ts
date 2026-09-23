// ============================================================
// NOOR Web — Location Service & Worldwide City Catalog
// ============================================================

export interface CityLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  region: string;
  isAutoDetected?: boolean;
}

export const POPULAR_CITIES: CityLocation[] = [
  // Middle East
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, region: 'Middle East' },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111, region: 'Middle East' },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753, region: 'Middle East' },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, region: 'Middle East' },
  { city: 'Abu Dhabi', country: 'United Arab Emirates', lat: 24.4539, lng: 54.3773, region: 'Middle East' },
  { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310, region: 'Middle East' },
  { city: 'Kuwait City', country: 'Kuwait', lat: 29.3759, lng: 47.9774, region: 'Middle East' },
  { city: 'Amman', country: 'Jordan', lat: 31.9454, lng: 35.9284, region: 'Middle East' },
  { city: 'Jerusalem (Al-Quds)', country: 'Palestine', lat: 31.7683, lng: 35.2137, region: 'Middle East' },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, region: 'North Africa' },
  { city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, region: 'North Africa' },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, region: 'Europe' },

  // South Asia
  { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, region: 'South Asia' },
  { city: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587, region: 'South Asia' },
  { city: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479, region: 'South Asia' },
  { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, region: 'South Asia' },
  { city: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025, region: 'South Asia' },
  { city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, region: 'South Asia' },
  { city: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, region: 'South Asia' },

  // Southeast Asia
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, region: 'Southeast Asia' },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, region: 'Southeast Asia' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, region: 'Southeast Asia' },

  // Europe & Americas
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, region: 'Europe' },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, region: 'Europe' },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, region: 'North America' },
  { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, region: 'North America' },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, region: 'Oceania' }
];

export const DEFAULT_LOCATION: CityLocation = POPULAR_CITIES[0]; // Makkah

const LOCATION_STORAGE_KEY = 'noor_user_location';

/**
 * Get previously saved/detected location from localStorage
 */
export function getSavedUserLocation(): CityLocation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number' && parsed.city) {
      return parsed;
    }
  } catch {
    // Ignore JSON errors
  }
  return null;
}

/**
 * Persist user location to localStorage
 */
export function saveUserLocation(loc: CityLocation): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
  } catch {
    // Ignore quota errors
  }
}

/**
 * Auto-detect user's location via fast IP Geolocation or browser Geolocation API
 */
export async function detectUserLocation(forceFresh: boolean = false): Promise<CityLocation> {
  // If not forced, return cached location if available
  if (!forceFresh) {
    const saved = getSavedUserLocation();
    if (saved) return saved;
  }

  // 1. First attempt: Fast IP Geolocation via ipwho.is (zero permission prompt, instant)
  try {
    const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.success && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
        const detected: CityLocation = {
          city: data.city || data.region || 'Detected City',
          country: data.country || 'Detected Country',
          lat: data.latitude,
          lng: data.longitude,
          region: data.region || 'Global',
          isAutoDetected: true
        };
        saveUserLocation(detected);
        return detected;
      }
    }
  } catch {
    // IP detection failed, continue to browser geolocation
  }

  // 2. Second attempt: Browser GPS Geolocation API (if granted)
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          enableHighAccuracy: false
        });
      });

      const { latitude, longitude } = position.coords;
      const closest = findClosestCity(latitude, longitude);
      const detected: CityLocation = {
        city: closest.city,
        country: closest.country,
        lat: latitude,
        lng: longitude,
        region: closest.region,
        isAutoDetected: true
      };
      saveUserLocation(detected);
      return detected;
    } catch {
      // Browser geolocation dismissed or timed out
    }
  }

  // 3. Fallback to Makkah if all network checks fail
  return DEFAULT_LOCATION;
}

/**
 * Find closest city from catalog
 */
export function findClosestCity(lat: number, lng: number): CityLocation {
  let closest = POPULAR_CITIES[0];
  let minDistance = Infinity;

  for (const city of POPULAR_CITIES) {
    const dLat = (city.lat - lat) * (Math.PI / 180);
    const dLng = (city.lng - lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat * (Math.PI / 180)) * Math.cos(city.lat * (Math.PI / 180)) * Math.sin(dLng / 2) ** 2;
    const distance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    if (distance < minDistance) {
      minDistance = distance;
      closest = city;
    }
  }

  return closest;
}
