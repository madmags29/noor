// ============================================================
// NOOR Shared Types — Prayer
// ============================================================

import type { Coordinates } from './common';

/** Supported prayer calculation methods */
export enum CalculationMethod {
  MuslimWorldLeague = 'MWL',
  Egyptian = 'EGYPT',
  Karachi = 'KARACHI',
  UmmAlQura = 'UMM_AL_QURA',
  Dubai = 'DUBAI',
  MoonsightingCommittee = 'MOONSIGHTING',
  ISNA = 'ISNA',
  Kuwait = 'KUWAIT',
  Qatar = 'QATAR',
  Singapore = 'SINGAPORE',
  Turkey = 'TURKEY',
  Tehran = 'TEHRAN',
  Custom = 'CUSTOM',
}

/** Asr calculation method */
export enum AsrMethod {
  Standard = 'standard',   // Shafi, Maliki, Hanbali
  Hanafi = 'hanafi',
}

/** High latitude adjustment rule */
export enum HighLatitudeRule {
  MiddleOfNight = 'middle_of_night',
  SeventhOfNight = 'seventh_of_night',
  TwilightAngle = 'twilight_angle',
  None = 'none',
}

/** Individual prayer identifiers */
export type PrayerId = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

/** Complete prayer times for a day */
export interface PrayerTimes {
  date: string; // ISO date
  fajr: string; // HH:mm
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  coordinates: Coordinates;
  timezone: string;
  calculationMethod: CalculationMethod;
  asrMethod: AsrMethod;
}

/** User prayer configuration */
export interface PrayerSettings {
  userId: string;
  calculationMethod: CalculationMethod;
  asrMethod: AsrMethod;
  highLatitudeRule: HighLatitudeRule;
  fajrAngle?: number;
  ishaAngle?: number;
  adjustments: Partial<Record<PrayerId, number>>; // Minutes offset per prayer
}

/** Prayer tracking record */
export interface PrayerRecord {
  id: string;
  userId: string;
  prayerId: PrayerId;
  date: string;
  completed: boolean;
  completedAt?: string;
  onTime?: boolean;
}

/** Prayer time with next/current status */
export interface PrayerTimeEntry {
  id: PrayerId;
  name: string;
  time: string; // HH:mm
  isNext: boolean;
  isCurrent: boolean;
  isCompleted: boolean;
  remainingMinutes?: number;
}

/** Qibla direction result */
export interface QiblaDirection {
  direction: number; // Degrees from North
  distance: number;  // Kilometers to Kaaba
  coordinates: Coordinates;
}
