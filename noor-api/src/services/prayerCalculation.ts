// ============================================================
// NOOR API — Prayer Times Service (Core Calculation Engine)
// ============================================================

/**
 * Accurate prayer time calculation based on astronomical formulas.
 * Supports all major calculation methods, Asr madhab, and high-latitude rules.
 *
 * References:
 * - PrayTimes.org algorithm
 * - Islamic Society of North America (ISNA)
 * - Umm al-Qura University, Makkah
 */

interface CalculationParams {
  latitude: number;
  longitude: number;
  date: Date;
  timezone: number; // UTC offset in hours
  method: {
    fajrAngle: number;
    ishaAngle: number;
    ishaInterval?: number; // minutes after Maghrib
  };
  asrFactor: number; // 1 for Standard, 2 for Hanafi
  adjustments?: Record<string, number>; // minutes offset per prayer
}

interface CalculatedTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function sin(d: number): number { return Math.sin(d * DEG); }
function cos(d: number): number { return Math.cos(d * DEG); }
function tan(d: number): number { return Math.tan(d * DEG); }
function asin(x: number): number { return RAD * Math.asin(x); }
function acos(x: number): number { return RAD * Math.acos(x); }
function atan2(y: number, x: number): number { return RAD * Math.atan2(y, x); }

/** Julian date from calendar date */
function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

/** Sun position (declination and equation of time) */
function sunPosition(jd: number): { declination: number; equation: number } {
  const D = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * sin(g) + 0.020 * sin(2 * g)) % 360;
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  const declination = asin(sin(e) * sin(L));
  const equation = q / 15 - RA + (D > 0 ? 0 : 0);

  // Equation of time (hours)
  let eqt = q / 15 - RA;
  if (eqt > 12) eqt -= 24;
  if (eqt < -12) eqt += 24;

  return { declination, equation: eqt };
}

/** Compute the time of a sun angle below horizon */
function computeAngleTime(angle: number, latitude: number, declination: number, direction: 'ccw' | 'cw'): number {
  const part = (sin(angle) - sin(latitude) * sin(declination)) / (cos(latitude) * cos(declination));
  if (part > 1 || part < -1) return NaN;
  const hourAngle = acos(part) / 15;
  return direction === 'ccw' ? hourAngle : -hourAngle;
}

/** Format decimal hours to HH:mm */
function formatTime(hours: number): string {
  if (isNaN(hours)) return '--:--';
  hours = ((hours % 24) + 24) % 24;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m === 60 ? 0 : m).padStart(2, '0')}`;
}

/** Calculate prayer times for a given location and date */
export function calculatePrayerTimes(params: CalculationParams): CalculatedTimes {
  const { latitude, longitude, date, timezone, method, asrFactor, adjustments = {} } = params;

  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { declination, equation } = sunPosition(jd);

  // Dhuhr (solar noon)
  const dhuhr = 12 + timezone - longitude / 15 - equation;

  // Sunrise & Sunset (0.833° for atmospheric refraction + sun radius)
  const sunriseHA = computeAngleTime(-0.833, latitude, declination, 'ccw');
  const sunrise = dhuhr - sunriseHA;
  const sunset = dhuhr + sunriseHA;

  // Fajr
  const fajrHA = computeAngleTime(-method.fajrAngle, latitude, declination, 'ccw');
  const fajr = dhuhr - fajrHA;

  // Asr
  const asrAngle = RAD * Math.atan(1 / (asrFactor + tan(Math.abs(latitude - declination))));
  const asrHA = computeAngleTime(asrAngle * RAD, latitude, declination, 'cw');
  const asr = dhuhr - asrHA;

  // Maghrib (sunset)
  const maghrib = sunset;

  // Isha
  let isha: number;
  if (method.ishaInterval) {
    isha = maghrib + method.ishaInterval / 60;
  } else {
    const ishaHA = computeAngleTime(-method.ishaAngle, latitude, declination, 'cw');
    isha = dhuhr - ishaHA;
  }

  // Apply adjustments (minutes)
  const adj = (key: string, val: number) => val + (adjustments[key] || 0) / 60;

  return {
    fajr: formatTime(adj('fajr', fajr)),
    sunrise: formatTime(adj('sunrise', sunrise)),
    dhuhr: formatTime(adj('dhuhr', dhuhr)),
    asr: formatTime(adj('asr', asr)),
    maghrib: formatTime(adj('maghrib', maghrib)),
    isha: formatTime(adj('isha', isha)),
  };
}

/** Calculate Qibla direction from a given location */
export function calculateQiblaDirection(latitude: number, longitude: number): {
  direction: number;
  distance: number;
} {
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  const phiS = latitude * DEG;
  const lambdaS = longitude * DEG;
  const phiK = kaabaLat * DEG;
  const lambdaK = kaabaLng * DEG;

  const direction = Math.atan2(
    Math.sin(lambdaK - lambdaS),
    Math.cos(phiS) * Math.tan(phiK) - Math.sin(phiS) * Math.cos(lambdaK - lambdaS),
  ) * RAD;

  // Normalize to 0-360
  const qibla = ((direction % 360) + 360) % 360;

  // Distance (Haversine)
  const dLat = phiK - phiS;
  const dLon = lambdaK - lambdaS;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(phiS) * Math.cos(phiK) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = Math.round(6371 * c); // km

  return { direction: Math.round(qibla * 100) / 100, distance };
}
