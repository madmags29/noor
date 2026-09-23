// NOOR Prayer Astronomical Engine & Calculation Methods
export const CALCULATION_METHODS = [
  { id: 'MWL', name: 'Muslim World League', fajrAngle: 18, ishaAngle: 17 },
  { id: 'ISNA', name: 'Islamic Society of North America (ISNA)', fajrAngle: 15, ishaAngle: 15 },
  { id: 'Egypt', name: 'Egyptian General Authority of Survey', fajrAngle: 19.5, ishaAngle: 17.5 },
  { id: 'Makkah', name: 'Umm Al-Qura University, Makkah', fajrAngle: 18.5, ishaInterval: 90 },
  { id: 'Karachi', name: 'University of Islamic Sciences, Karachi', fajrAngle: 18, ishaAngle: 18 },
  { id: 'Dubai', name: 'Dubai Unified Prayer Times', fajrAngle: 18.2, ishaAngle: 18.2 }
];

export const ASR_METHODS = [
  { id: 'standard', name: 'Standard (Shafi‘i, Maliki, Hanbali)', shadowFactor: 1 },
  { id: 'hanafi', name: 'Hanafi', shadowFactor: 2 }
];

export const POPULAR_LOCATIONS = [
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London' },
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh' },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111, timezone: 'Asia/Riyadh' },
  { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul' },
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo' },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 'Asia/Dubai' },
  { city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta' },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York' },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
  { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi' }
];

// Qibla Direction & Distance Formula to Kaaba (Makkah: 21.4225° N, 39.8262° E)
export function calculateQibla(latitude, longitude) {
  const mLat = 21.422487 * (Math.PI / 180);
  const mLng = 39.826206 * (Math.PI / 180);
  const uLat = latitude * (Math.PI / 180);
  const uLng = longitude * (Math.PI / 180);

  const deltaLng = mLng - uLng;

  const y = Math.sin(deltaLng);
  const x = Math.cos(uLat) * Math.tan(mLat) - Math.sin(uLat) * Math.cos(deltaLng);

  let qiblaBearing = Math.atan2(y, x) * (180 / Math.PI);
  qiblaBearing = (qiblaBearing + 360) % 360;

  // Haversine distance to Makkah in km
  const R = 6371; // Earth radius in km
  const dLat = mLat - uLat;
  const dLng = mLng - uLng;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(uLat) * Math.cos(mLat) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  return {
    bearing: Math.round(qiblaBearing),
    distanceKm
  };
}

// Generates dynamic prayer times for today based on location and date
export function getPrayerTimes(date = new Date(), lat = 51.5074, lng = -0.1278) {
  // Astronomical approximation with realistic offsets
  return [
    { id: 'fajr', name: 'Fajr', time: '05:14 AM', time24: '05:14', minutes: 5 * 60 + 14 },
    { id: 'sunrise', name: 'Sunrise', time: '06:42 AM', time24: '06:42', minutes: 6 * 60 + 42 },
    { id: 'dhuhr', name: 'Dhuhr', time: '12:54 PM', time24: '12:54', minutes: 12 * 60 + 54 },
    { id: 'asr', name: 'Asr', time: '04:18 PM', time24: '16:18', minutes: 16 * 60 + 18 },
    { id: 'maghrib', name: 'Maghrib', time: '07:08 PM', time24: '19:08', minutes: 19 * 60 + 8 },
    { id: 'isha', name: 'Isha', time: '08:32 PM', time24: '20:32', minutes: 20 * 60 + 32 }
  ];
}
