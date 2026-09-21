import { Router, Request, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// Public: GET /api/settings
router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  rows.forEach((r) => {
    // Exclude any internal sensitive keys if present
    if (!r.key.startsWith('secret_')) {
      settings[r.key] = r.value;
    }
  });

  res.json({ settings });
});

// Admin: GET /api/admin/settings
router.get('/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  rows.forEach((r) => {
    settings[r.key] = r.value;
  });

  // Check email configuration status safely
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD
  );

  res.json({
    settings,
    emailConfig: {
      configured: smtpConfigured,
      host: process.env.SMTP_HOST || 'Not configured',
      port: process.env.SMTP_PORT || '587',
      user: process.env.SMTP_USER ? process.env.SMTP_USER.replace(/(.{2})(.*)(@.*)/, '$1***$3') : 'Not configured',
      from: process.env.SMTP_FROM || 'Not configured',
    },
  });
});

// Admin: PUT /api/admin/settings
router.put('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { settings } = req.body;
  if (!settings || typeof settings !== 'object') {
    res.status(400).json({ error: 'Settings object is required.' });
    return;
  }

  const upsertStmt = db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);

  db.transaction(() => {
    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'string') {
        upsertStmt.run(key, value.trim());
      }
    }
  })();

  res.json({ success: true, message: 'Settings saved successfully.' });
});

export default router;
