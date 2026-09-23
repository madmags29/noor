// ============================================================
// NOOR API — Rate Limiter Middleware
// ============================================================

import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'You have exceeded the rate limit. Please try again later.',
  },
});
