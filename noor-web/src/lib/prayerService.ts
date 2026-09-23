// ============================================================
// NOOR Web — Astronomical Prayer Calculation & Qibla Engine
// ============================================================

export interface PrayerTimeItem {
  id: string;
  name: string;
  arabicName: string;
  time: string;
  time24: string;
  minutes: number;
}

export interface PrayerCalculationConfig {
  fajrAngle: number;
  ishaAngle: number;
  ishaInterval?: number;
  name: string;
}

export const CALCULATION_METHODS: Record<string, PrayerCalculationConfig> = {
  MWL: { fajrAngle: 18, ishaAngle: 17, name: 'Muslim World League' },
  ISNA: { fajrAngle: 15, ishaAngle: 15, name: 'Islamic Society of North America (ISNA)' },
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5, name: 'Egyptian General Authority of Survey' },
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaInterval: 90, name: 'Umm Al-Qura University, Makkah' },
  Karachi: { fajrAngle: 18, ishaAngle: 18, name: 'Univ. of Islamic Sciences, Karachi' },
  Dubai: { fajrAngle: 18.2, ishaAngle: 18.2, name: 'Dubai Unified Prayer Times' },
};

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function sin(d: number): number { return Math.sin(d * DEG); }
function cos(d: number): number { return Math.cos(d * DEG); }
function tan(d: number): number { return Math.tan(d * DEG); }
function asin(x: number): number { return RAD * Math.asin(x); }
function acos(x: number): number { return RAD * Math.acos(x); }
function atan2(y: number, x: number): number { return RAD * Math.atan2(y, x); }

function julianDate(year: number, month: number, day: number): number {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function sunPosition(jd: number) {
  const D = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * D) % 360;
  const q = (280.459 + 0.98564736 * D) % 360;
  const L = (q + 1.915 * sin(g) + 0.020 * sin(2 * g)) % 360;
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  const declination = asin(sin(e) * sin(L));
  let eqt = q / 15 - RA;
  if (eqt > 12) eqt -= 24;
  if (eqt < -12) eqt += 24;
  return { declination, equation: eqt };
}

function computeAngleTime(angle: number, latitude: number, declination: number, direction: 'ccw' | 'cw'): number {
  const part = (sin(angle) - sin(latitude) * sin(declination)) / (cos(latitude) * cos(declination));
  if (part > 1 || part < -1) return NaN;
  const hourAngle = acos(part) / 15;
  return direction === 'ccw' ? hourAngle : -hourAngle;
}

function formatTimeComponents(hours: number): { time12: string; time24: string; minutes: number } {
  if (isNaN(hours)) return { time12: '--:--', time24: '--:--', minutes: 0 };
  hours = ((hours % 24) + 24) % 24;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const safeM = m === 60 ? 0 : m;
  const safeH = m === 60 ? (h + 1) % 24 : h;

  const time24 = `${String(safeH).padStart(2, '0')}:${String(safeM).padStart(2, '0')}`;
  const period = safeH >= 12 ? 'PM' : 'AM';
  const h12 = safeH % 12 || 12;
  const time12 = `${String(h12).padStart(2, '0')}:${String(safeM).padStart(2, '0')} ${period}`;

  return { time12, time24, minutes: safeH * 60 + safeM };
}

export function calculateDayPrayerTimes(
  lat: number,
  lng: number,
  date: Date = new Date(),
  methodKey: string = 'MWL',
  asrFactor: number = 1
): PrayerTimeItem[] {
  const timezone = -date.getTimezoneOffset() / 60;
  const method = CALCULATION_METHODS[methodKey] || CALCULATION_METHODS.MWL;

  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { declination, equation } = sunPosition(jd);

  const dhuhrDec = 12 + timezone - lng / 15 - equation;
  const sunriseHA = computeAngleTime(-0.833, lat, declination, 'ccw');
  const sunriseDec = dhuhrDec - sunriseHA;
  const sunsetDec = dhuhrDec + sunriseHA;

  const fajrHA = computeAngleTime(-method.fajrAngle, lat, declination, 'ccw');
  const fajrDec = dhuhrDec - fajrHA;

  const asrAngle = RAD * Math.atan(1 / (asrFactor + tan(Math.abs(lat - declination))));
  const asrHA = computeAngleTime(asrAngle, lat, declination, 'cw');
  const asrDec = dhuhrDec - asrHA;

  const maghribDec = sunsetDec;

  let ishaDec: number;
  if (method.ishaInterval) {
    ishaDec = maghribDec + method.ishaInterval / 60;
  } else {
    const ishaHA = computeAngleTime(-method.ishaAngle, lat, declination, 'cw');
    ishaDec = dhuhrDec - ishaHA;
  }

  const fajr = formatTimeComponents(fajrDec);
  const sunrise = formatTimeComponents(sunriseDec);
  const dhuhr = formatTimeComponents(dhuhrDec);
  const asr = formatTimeComponents(asrDec);
  const maghrib = formatTimeComponents(maghribDec);
  const isha = formatTimeComponents(ishaDec);

  return [
    { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', time: fajr.time12, time24: fajr.time24, minutes: fajr.minutes },
    { id: 'sunrise', name: 'Sunrise', arabicName: 'الشروق', time: sunrise.time12, time24: sunrise.time24, minutes: sunrise.minutes },
    { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', time: dhuhr.time12, time24: dhuhr.time24, minutes: dhuhr.minutes },
    { id: 'asr', name: 'Asr', arabicName: 'العصر', time: asr.time12, time24: asr.time24, minutes: asr.minutes },
    { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', time: maghrib.time12, time24: maghrib.time24, minutes: maghrib.minutes },
    { id: 'isha', name: 'Isha', arabicName: 'العشاء', time: isha.time12, time24: isha.time24, minutes: isha.minutes },
  ];
}

export function calculateQiblaBearing(lat: number, lng: number): { bearing: number; distanceKm: number } {
  const mLat = 21.422487 * DEG;
  const mLng = 39.826206 * DEG;
  const uLat = lat * DEG;
  const uLng = lng * DEG;

  const deltaLng = mLng - uLng;
  const y = Math.sin(deltaLng);
  const x = Math.cos(uLat) * Math.tan(mLat) - Math.sin(uLat) * Math.cos(deltaLng);

  let qiblaBearing = Math.atan2(y, x) * RAD;
  qiblaBearing = (qiblaBearing + 360) % 360;

  const R = 6371;
  const dLat = mLat - uLat;
  const dLng = mLng - uLng;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(uLat) * Math.cos(mLat) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return {
    bearing: Math.round(qiblaBearing),
    distanceKm: Math.round(R * c),
  };
}
