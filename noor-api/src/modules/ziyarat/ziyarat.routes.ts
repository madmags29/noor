// ============================================================
// NOOR API — Ziyarat Routes
// ============================================================

import { Router } from 'express';
import { ziyaratController } from './ziyarat.controller.js';

export const ziyaratRouter = Router();

ziyaratRouter.get('/', (req, res) => ziyaratController.getDargahs(req, res));
ziyaratRouter.get('/nearby', (req, res) => ziyaratController.getNearbyDargahs(req, res));
ziyaratRouter.get('/urs', (req, res) => ziyaratController.getUpcomingUrs(req, res));
ziyaratRouter.get('/pending', (req, res) => ziyaratController.getPendingSubmissions(req, res));
ziyaratRouter.get('/:idOrSlug', (req, res) => ziyaratController.getDargahByIdOrSlug(req, res));
ziyaratRouter.post('/submit', (req, res) => ziyaratController.submitCommunityDargah(req, res));
ziyaratRouter.patch('/:id/verify', (req, res) => ziyaratController.verifyDargah(req, res));
ziyaratRouter.post('/ingest', (req, res) => ziyaratController.bulkIngest(req, res));
