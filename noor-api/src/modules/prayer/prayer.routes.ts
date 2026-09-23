// ============================================================
// NOOR API — Prayer Module Routes
// ============================================================

import { Router, Request, Response } from 'express';
import { calculatePrayerTimes, calculateQiblaDirection } from '../../services/prayerCalculation.js';

export const prayerRouter = Router();

// Calculation methods supported
const METHODS: Record<string, { fajrAngle: number; ishaAngle: number; ishaInterval?: number; name: string }> = {
  MWL: { fajrAngle: 18, ishaAngle: 17, name: 'Muslim World League' },
  ISNA: { fajrAngle: 15, ishaAngle: 15, name: 'Islamic Society of North America' },
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5, name: 'Egyptian General Authority of Survey' },
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaInterval: 90, name: 'Umm Al-Qura University, Makkah' },
  Karachi: { fajrAngle: 18, ishaAngle: 18, name: 'University of Islamic Sciences, Karachi' },
  Dubai: { fajrAngle: 18.2, ishaAngle: 18.2, name: 'Dubai Unified Prayer Times' },
};

/**
 * GET /api/v1/prayer/methods
 */
prayerRouter.get('/methods', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: Object.entries(METHODS).map(([id, val]) => ({
      id,
      name: val.name,
      fajrAngle: val.fajrAngle,
      ishaAngle: val.ishaAngle,
      ishaInterval: val.ishaInterval,
    })),
  });
});

/**
 * GET /api/v1/prayer/qibla
 * Query: lat, lng
 */
prayerRouter.get('/qibla', (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string) || 51.5074;
  const lng = parseFloat(req.query.lng as string) || -0.1278;

  const result = calculateQiblaDirection(lat, lng);
  res.json({
    success: true,
    data: {
      latitude: lat,
      longitude: lng,
      qiblaDirection: result.direction,
      distanceKm: result.distance,
      kaabaCoordinates: { lat: 21.4225, lng: 39.8262 },
    },
  });
});

/**
 * GET /api/v1/prayer/times
 * Query: lat, lng, date, timezone, method, asrFactor
 */
prayerRouter.get('/times', (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string) || 21.4225; // default Makkah
  const lng = parseFloat(req.query.lng as string) || 39.8262;
  const dateStr = req.query.date as string;
  const date = dateStr ? new Date(dateStr) : new Date();
  
  // Timezone offset in hours
  let tz = parseFloat(req.query.timezone as string);
  if (isNaN(tz)) {
    tz = -date.getTimezoneOffset() / 60;
  }

  const methodKey = (req.query.method as string) || 'MWL';
  const method = METHODS[methodKey] || METHODS.MWL;
  const asrFactor = parseInt(req.query.asrFactor as string, 10) === 2 ? 2 : 1;

  const times = calculatePrayerTimes({
    latitude: lat,
    longitude: lng,
    date,
    timezone: tz,
    method,
    asrFactor,
  });

  const qibla = calculateQiblaDirection(lat, lng);

  res.json({
    success: true,
    data: {
      date: date.toISOString().split('T')[0],
      location: { latitude: lat, longitude: lng, timezone: tz },
      method: { id: methodKey, name: method.name },
      asrSchool: asrFactor === 2 ? 'Hanafi' : 'Standard',
      times,
      qibla: {
        bearing: qibla.direction,
        distanceKm: qibla.distance,
      },
    },
  });
});
