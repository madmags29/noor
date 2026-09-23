// ============================================================
// NOOR API — Ziyarat, Dargahs & Islamic Heritage Types
// ============================================================

export type SpiritualLineage =
  | 'Chishti'
  | 'Qadiri'
  | 'Naqshbandi'
  | 'Suhrawardi'
  | 'Mevlevi'
  | 'Shadhili'
  | 'Tijaniyya'
  | 'Rifa\'i'
  | 'Idrisiyya'
  | 'Bektashi'
  | 'Shattari'
  | 'Wali Sanga'
  | 'Badawiyya'
  | 'Kubrawi'
  | 'Ahl al-Bayt'
  | 'Sahabah'
  | 'General Islamic Heritage';

export type VerificationStatus = 'verified' | 'pending_review' | 'needs_scholarly_audit' | 'rejected';

export interface GeographicCoordinates {
  latitude: number;
  longitude: number;
  altitudeMeters?: number;
  address: string;
  city: string;
  stateProvince: string;
  country: string;
  region: 'South Asia' | 'Middle East' | 'Central Asia' | 'North Africa' | 'Europe' | 'Southeast Asia' | 'Americas';
  nearestAirport?: string;
  nearestRailwayStation?: string;
  googleMapsUrl: string;
}

export interface AssociatedFigure {
  name: string;
  arabicName: string;
  urduName: string;
  honorificTitles: string[];
  spiritualLineage: SpiritualLineage;
  birthYearHijri?: number;
  deathYearHijri: number;
  gregorianDeathYear: number;
  biographicalSummary: string;
  seminalWorks?: string[];
  spiritualMaster?: string;
  distinguishedDisciples?: string[];
}

export interface UrsCalendarEvent {
  title: string;
  hijriMonthNumber: number; // 1 to 12
  hijriMonthName: string;
  hijriDayStart: number;
  hijriDayEnd: number;
  gregorianApproximateSeason: string;
  ritualsDescription: string;
  estimatedAnnualAttendance?: string;
}

export interface VisitingGuidelines {
  visitingHours: string;
  bestTimeToVisit: string;
  etiquetteAndAdab: string[];
  dressCodeRequirements: string;
  genderSpecificArrangements: string;
  wheelchairAccessibility: boolean;
  langarNiazDetails: string;
  entryFee: string;
}

export interface MediaAsset {
  id: string;
  type: 'photo' | 'video' | 'audio';
  title: string;
  url: string;
  thumbnailUrl?: string;
  authorAttribution: string;
  license: 'Public Domain' | 'Creative Commons BY-SA 4.0' | 'Fair Use Educational' | 'Waqf Archive Permission';
  sourceUrl?: string;
}

export interface AcademicSourceCitation {
  id: string;
  workTitle: string;
  author: string;
  originalPublicationYearHijriOrCe: string;
  archiveOrPublisher: string;
  pageOrVolumeReference?: string;
  primaryLanguage: 'Arabic' | 'Persian' | 'Urdu' | 'Turkish' | 'English' | 'Javanese' | 'Bengali' | string;
  isbnOrCatalogNumber?: string;
  verificationLevel: 'Primary Classical Chronicle' | 'Secondary Peer-Reviewed' | 'Government Heritage Survey';
}

export interface DargahItem {
  id: string;
  slug: string;
  name: string;
  arabicName: string;
  urduName: string;
  primaryHonorific: string;
  spiritualLineage: SpiritualLineage;
  historicalPeriodCentury: string;
  yearEstablishedGregorian: number;
  architecturalStyle: string;
  historicalSummary: string;
  detailedChronicle: string;
  coordinates: GeographicCoordinates;
  associatedFigures: AssociatedFigure[];
  ursEvent: UrsCalendarEvent;
  visitingInfo: VisitingGuidelines;
  mediaAssets: MediaAsset[];
  sourceCitations: AcademicSourceCitation[];
  verificationStatus: VerificationStatus;
  verifiedByScholar?: string;
  lastScholarlyAuditDate: string;
  distanceKm?: number; // Calculated dynamically on client
}

export interface CommunitySubmissionPayload {
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  spiritualLineage: SpiritualLineage;
  associatedSaintName: string;
  hijriUrsMonth: number;
  hijriUrsDays: string;
  visitingHours: string;
  historicalSummary: string;
  primarySourceReference: string;
  submitterName: string;
  submitterEmail: string;
  photoUrl?: string;
  licenseConfirmation: boolean;
}
