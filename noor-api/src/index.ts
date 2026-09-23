// ============================================================
// NOOR API — Main Server Entry
// ============================================================

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

// Route Modules
import { healthRouter } from './modules/health/health.routes.js';
import { prayerRouter } from './modules/prayer/prayer.routes.js';
import { quranRouter } from './modules/quran/quran.routes.js';
import { duasRouter } from './modules/duas/duas.routes.js';
import { searchRouter } from './modules/search/search.routes.js';
import { calendarRouter } from './modules/calendar/calendar.routes.js';
import { ziyaratRouter } from './modules/ziyarat/ziyarat.routes.js';

const app = express();

// ---- Global Middleware ----
app.use(helmet());
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.isProduction ? 'combined' : 'dev'));
app.use(apiRateLimiter);

// ---- API v1 Routes ----
const v1 = express.Router();
v1.use('/health', healthRouter);
v1.use('/prayer', prayerRouter);
v1.use('/quran', quranRouter);
v1.use('/duas', duasRouter);
v1.use('/search', searchRouter);
v1.use('/calendar', calendarRouter);
v1.use('/ziyarat', ziyaratRouter);

app.use('/api/v1', v1);

// ---- Error Handling ----
app.use(notFoundHandler);
app.use(errorHandler);

// ---- Start Server ----
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════════╗`);
  console.log(`  ║   NOOR API Server                        ║`);
  console.log(`  ║   Port: ${PORT}                             ║`);
  console.log(`  ║   Env:  ${config.nodeEnv.padEnd(22)}       ║`);
  console.log(`  ║   API:  /api/v1/                          ║`);
  console.log(`  ╚══════════════════════════════════════════╝\n`);
});

export default app;
