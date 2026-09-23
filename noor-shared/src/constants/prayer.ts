// ============================================================
// NOOR Constants — Prayer Calculation Methods
// ============================================================

import { CalculationMethod, AsrMethod, HighLatitudeRule } from '../types/prayer';

export interface CalculationMethodParams {
  id: CalculationMethod;
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  ishaInterval?: number; // Minutes after Maghrib (alternative to angle)
  region: string;
}

/** All supported prayer calculation methods with their parameters */
export const CALCULATION_METHODS: Record<CalculationMethod, CalculationMethodParams> = {
  [CalculationMethod.MuslimWorldLeague]: {
    id: CalculationMethod.MuslimWorldLeague,
    name: 'Muslim World League',
    fajrAngle: 18,
    ishaAngle: 17,
    region: 'Global',
  },
  [CalculationMethod.Egyptian]: {
    id: CalculationMethod.Egyptian,
    name: 'Egyptian General Authority of Survey',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
    region: 'Africa, Syria, Lebanon',
  },
  [CalculationMethod.Karachi]: {
    id: CalculationMethod.Karachi,
    name: 'University of Islamic Sciences, Karachi',
    fajrAngle: 18,
    ishaAngle: 18,
    region: 'Pakistan, Bangladesh, India, Afghanistan',
  },
  [CalculationMethod.UmmAlQura]: {
    id: CalculationMethod.UmmAlQura,
    name: 'Umm al-Qura University, Makkah',
    fajrAngle: 18.5,
    ishaAngle: 0,
    ishaInterval: 90,
    region: 'Saudi Arabia',
  },
  [CalculationMethod.Dubai]: {
    id: CalculationMethod.Dubai,
    name: 'Dubai',
    fajrAngle: 18.2,
    ishaAngle: 18.2,
    region: 'UAE',
  },
  [CalculationMethod.MoonsightingCommittee]: {
    id: CalculationMethod.MoonsightingCommittee,
    name: 'Moonsighting Committee',
    fajrAngle: 18,
    ishaAngle: 18,
    region: 'Global',
  },
  [CalculationMethod.ISNA]: {
    id: CalculationMethod.ISNA,
    name: 'Islamic Society of North America',
    fajrAngle: 15,
    ishaAngle: 15,
    region: 'North America',
  },
  [CalculationMethod.Kuwait]: {
    id: CalculationMethod.Kuwait,
    name: 'Kuwait',
    fajrAngle: 18,
    ishaAngle: 17.5,
    region: 'Kuwait',
  },
  [CalculationMethod.Qatar]: {
    id: CalculationMethod.Qatar,
    name: 'Qatar',
    fajrAngle: 18,
    ishaAngle: 0,
    ishaInterval: 90,
    region: 'Qatar',
  },
  [CalculationMethod.Singapore]: {
    id: CalculationMethod.Singapore,
    name: 'Majlis Ugama Islam Singapura',
    fajrAngle: 20,
    ishaAngle: 18,
    region: 'Singapore',
  },
  [CalculationMethod.Turkey]: {
    id: CalculationMethod.Turkey,
    name: 'Diyanet İşleri Başkanlığı',
    fajrAngle: 18,
    ishaAngle: 17,
    region: 'Turkey',
  },
  [CalculationMethod.Tehran]: {
    id: CalculationMethod.Tehran,
    name: 'Institute of Geophysics, University of Tehran',
    fajrAngle: 17.7,
    ishaAngle: 14,
    region: 'Iran',
  },
  [CalculationMethod.Custom]: {
    id: CalculationMethod.Custom,
    name: 'Custom',
    fajrAngle: 18,
    ishaAngle: 17,
    region: 'Custom',
  },
};

/** Default prayer settings */
export const DEFAULT_PRAYER_SETTINGS = {
  calculationMethod: CalculationMethod.MuslimWorldLeague,
  asrMethod: AsrMethod.Standard,
  highLatitudeRule: HighLatitudeRule.MiddleOfNight,
};

/** Kaaba coordinates (Makkah) */
export const KAABA_COORDINATES = {
  latitude: 21.4225,
  longitude: 39.8262,
};
