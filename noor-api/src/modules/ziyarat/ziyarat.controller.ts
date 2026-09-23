// ============================================================
// NOOR API — Ziyarat Controller
// ============================================================

import { Request, Response } from 'express';
import { ziyaratService } from './ziyarat.service.js';
import { SpiritualLineage, VerificationStatus } from './ziyarat.types.js';

export class ZiyaratController {
  public async getDargahs(req: Request, res: Response): Promise<void> {
    try {
      const { query, country, lineage, status, page, limit } = req.query;

      const result = await ziyaratService.getDargahs({
        query: query ? String(query) : undefined,
        country: country ? String(country) : undefined,
        lineage: lineage ? (lineage as SpiritualLineage) : undefined,
        status: status ? (status as VerificationStatus) : undefined,
        page: page ? parseInt(String(page), 10) : 1,
        limit: limit ? parseInt(String(limit), 10) : 20,
      });

      res.status(200).json({
        success: true,
        data: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async getDargahByIdOrSlug(req: Request, res: Response): Promise<void> {
    try {
      const idOrSlug = String(req.params.idOrSlug);
      const dargah = await ziyaratService.getDargahByIdOrSlug(idOrSlug);

      if (!dargah) {
        res.status(404).json({ success: false, error: 'Dargah or shrine not found' });
        return;
      }

      res.status(200).json({ success: true, data: dargah });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async getNearbyDargahs(req: Request, res: Response): Promise<void> {
    try {
      const lat = parseFloat(String(req.query.lat));
      const lng = parseFloat(String(req.query.lng));
      const radiusKm = req.query.radiusKm ? parseFloat(String(req.query.radiusKm)) : 3000;

      if (isNaN(lat) || isNaN(lng)) {
        res.status(400).json({ success: false, error: 'Valid latitude and longitude coordinates are required' });
        return;
      }

      const nearby = await ziyaratService.getNearbyDargahs(lat, lng, radiusKm);
      res.status(200).json({ success: true, count: nearby.length, data: nearby });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async getUpcomingUrs(req: Request, res: Response): Promise<void> {
    try {
      const hijriMonth = req.query.hijriMonth ? parseInt(String(req.query.hijriMonth), 10) : 9;
      const ursList = await ziyaratService.getUpcomingUrsDargahs(hijriMonth);
      res.status(200).json({ success: true, data: ursList });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async submitCommunityDargah(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      if (!payload.name || !payload.city || !payload.country || !payload.primarySourceReference) {
        res.status(400).json({
          success: false,
          error: 'Name, City, Country, and Primary Source Reference are strictly mandatory.'
        });
        return;
      }

      const created = await ziyaratService.submitCommunityDargah(payload);
      res.status(201).json({
        success: true,
        message: 'Community submission recorded and queued for scholarly audit.',
        data: created
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async getPendingSubmissions(req: Request, res: Response): Promise<void> {
    try {
      const pending = await ziyaratService.getPendingSubmissions();
      res.status(200).json({ success: true, count: pending.length, data: pending });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async verifyDargah(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { status, scholarName } = req.body;

      if (!status || !scholarName) {
        res.status(400).json({ success: false, error: 'Verification status and scholarName are required.' });
        return;
      }

      const updated = await ziyaratService.updateVerificationStatus(id, status, scholarName);
      if (!updated) {
        res.status(404).json({ success: false, error: 'Dargah not found.' });
        return;
      }

      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public async bulkIngest(req: Request, res: Response): Promise<void> {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) {
        res.status(400).json({ success: false, error: 'Body must contain an array of items.' });
        return;
      }

      const result = await ziyaratService.bulkIngest(items);
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

export const ziyaratController = new ZiyaratController();
