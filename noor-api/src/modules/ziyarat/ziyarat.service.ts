// ============================================================
// NOOR API — Ziyarat & Dargah Service Layer
// ============================================================

import {
  DargahItem,
  CommunitySubmissionPayload,
  VerificationStatus,
  SpiritualLineage
} from './ziyarat.types.js';
import { VERIFIED_DARGAHS_DATABASE } from './ziyarat.data.js';

// In-memory data store initialized with verified seed data
let dargahsStore: DargahItem[] = [...VERIFIED_DARGAHS_DATABASE];
let pendingSubmissions: (CommunitySubmissionPayload & { id: string; submittedAt: string; status: 'pending' | 'approved' | 'rejected' })[] = [];

/**
 * Haversine Great-Circle Distance in Kilometers
 */
function calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export class ZiyaratService {
  /**
   * Search and filter Dargahs
   */
  public async getDargahs(filters: {
    query?: string;
    country?: string;
    lineage?: SpiritualLineage | 'all';
    status?: VerificationStatus;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let result = dargahsStore.filter(d => {
      if (filters.status && d.verificationStatus !== filters.status) return false;
      if (filters.country && filters.country !== 'all' && d.coordinates.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }
      if (filters.lineage && filters.lineage !== 'all' && d.spiritualLineage !== filters.lineage) {
        return false;
      }
      if (filters.query) {
        const q = filters.query.toLowerCase().trim();
        const matchName = d.name.toLowerCase().includes(q) || d.urduName.includes(q) || d.arabicName.includes(q);
        const matchCity = d.coordinates.city.toLowerCase().includes(q) || d.coordinates.country.toLowerCase().includes(q);
        const matchSaint = d.associatedFigures.some(f => f.name.toLowerCase().includes(q) || f.urduName.includes(q));
        const matchHonorific = d.primaryHonorific.toLowerCase().includes(q);
        return matchName || matchCity || matchSaint || matchHonorific;
      }
      return true;
    });

    const total = result.length;
    const paginated = result.slice((page - 1) * limit, page * limit);

    return {
      data: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Find single Dargah by id or slug
   */
  public async getDargahByIdOrSlug(idOrSlug: string): Promise<DargahItem | null> {
    return dargahsStore.find(d => d.id === idOrSlug || d.slug === idOrSlug) || null;
  }

  /**
   * Find Dargahs near coordinates, ordered by distance
   */
  public async getNearbyDargahs(lat: number, lng: number, radiusKm: number = 2000) {
    const withDistance = dargahsStore.map(d => {
      const distance = calculateHaversineDistanceKm(lat, lng, d.coordinates.latitude, d.coordinates.longitude);
      return {
        ...d,
        distanceKm: distance
      };
    });

    const filtered = withDistance
      .filter(d => d.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return filtered;
  }

  /**
   * Get Dargahs ordered by upcoming Urs
   */
  public async getUpcomingUrsDargahs(currentHijriMonth: number = 9) {
    return [...dargahsStore].sort((a, b) => {
      const aMonthDiff = (a.ursEvent.hijriMonthNumber - currentHijriMonth + 12) % 12;
      const bMonthDiff = (b.ursEvent.hijriMonthNumber - currentHijriMonth + 12) % 12;
      if (aMonthDiff !== bMonthDiff) {
        return aMonthDiff - bMonthDiff;
      }
      return a.ursEvent.hijriDayStart - b.ursEvent.hijriDayStart;
    });
  }

  /**
   * Submit community contribution for review
   */
  public async submitCommunityDargah(payload: CommunitySubmissionPayload) {
    const submission = {
      ...payload,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'pending' as const
    };
    pendingSubmissions.push(submission);
    return submission;
  }

  /**
   * Get list of pending community submissions
   */
  public async getPendingSubmissions() {
    return pendingSubmissions;
  }

  /**
   * Admin: Verify and approve / reject Dargah
   */
  public async updateVerificationStatus(id: string, status: VerificationStatus, scholarName: string) {
    const index = dargahsStore.findIndex(d => d.id === id);
    if (index === -1) return null;

    dargahsStore[index] = {
      ...dargahsStore[index],
      verificationStatus: status,
      verifiedByScholar: scholarName,
      lastScholarlyAuditDate: new Date().toISOString().split('T')[0]
    };

    return dargahsStore[index];
  }

  /**
   * Admin: Ingest bulk valid Dargah items
   */
  public async bulkIngest(items: DargahItem[]) {
    let addedCount = 0;
    for (const item of items) {
      if (!dargahsStore.some(d => d.id === item.id || d.slug === item.slug)) {
        dargahsStore.push(item);
        addedCount++;
      }
    }
    return {
      addedCount,
      totalCount: dargahsStore.length
    };
  }
}

export const ziyaratService = new ZiyaratService();
