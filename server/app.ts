import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

// Import routers
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import categoriesRoutes from './routes/categories.js';
import tagsRoutes from './routes/tags.js';
import authorsRoutes from './routes/authors.js';
import mediaRoutes from './routes/media.js';
import inquiriesRoutes from './routes/inquiries.js';
import settingsRoutes from './routes/settings.js';
import seoRoutes from './routes/seo.js';
import cronRoutes, { initScheduledPublisher } from './cron.js';
import teamRoutes from './routes/team.js';
import servicesRoutes from './routes/services.js';
import cmsRoutes from './routes/cms.js';

export const app = express();

// Base middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Disable caching for all API endpoints so changes are immediately visible
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Static uploads and assets directory
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
app.use('/uploads', express.static(uploadsDir));

const assetDir = path.resolve(process.cwd(), 'Asset');
app.use(['/assets', '/Asset'], (req, _res, next) => {
  if (req.url.includes('global-presence-bg')) {
    req.url = req.url.replace('global-presence-bg', 'global-presence');
  }
  if (/\.(jpg|jpeg)$/i.test(req.url)) {
    req.url = req.url.replace(/\.(jpg|jpeg)$/i, '.png');
  }
  next();
});
app.use('/assets', express.static(assetDir));
app.use('/Asset', express.static(assetDir));

// SEO XML routes at root
app.use('/', seoRoutes);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/cron', cronRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/cms', cmsRoutes);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start background scheduled post publisher
initScheduledPublisher(60000);

export default app;
