import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const distDir = path.resolve(process.cwd(), 'dist');

// Serve static frontend in production
app.use(express.static(distDir));

// SPA fallback for all unhandled client routes (e.g. /admin/*, /about, /services/*)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/sitemap.xml' || req.path === '/rss.xml') {
    return next();
  }
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[InfosBrain Production Server] Listening on http://0.0.0.0:${PORT}`);
});
