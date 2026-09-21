import { Router, Request, Response } from 'express';
import db from './db/index.js';

const router = Router();

// Function to find and publish scheduled posts
export function publishScheduledPosts(): number {
  const now = new Date().toISOString();

  const duePosts = db.prepare(`
    SELECT id, title, scheduledAt
    FROM posts
    WHERE status = 'scheduled'
      AND scheduledAt IS NOT NULL
      AND scheduledAt <= ?
  `).all(now) as { id: string; title: string; scheduledAt: string }[];

  if (duePosts.length === 0) return 0;

  const updateStmt = db.prepare(`
    UPDATE posts SET
      status = 'published',
      publishedAt = COALESCE(scheduledAt, ?),
      updatedAt = ?
    WHERE id = ?
  `);

  db.transaction(() => {
    duePosts.forEach((p) => {
      updateStmt.run(now, now, p.id);
      console.log(`[Scheduled Publisher] Published: "${p.title}" (ID: ${p.id})`);
    });
  })();

  return duePosts.length;
}

// Start internal cron interval (runs every 60s)
let cronTimer: NodeJS.Timeout | null = null;

export function initScheduledPublisher(intervalMs = 60000) {
  if (cronTimer) clearInterval(cronTimer);

  // Run once on startup
  publishScheduledPosts();

  cronTimer = setInterval(() => {
    try {
      publishScheduledPosts();
    } catch (err) {
      console.error('[Scheduled Publisher Error]', err);
    }
  }, intervalMs);

  return cronTimer;
}

// Endpoint for external cron jobs (cPanel cron, curl, GitHub Actions)
router.all('/publish-scheduled', (req: Request, res: Response) => {
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = req.headers['x-cron-secret'] || req.query.secret;

  if (cronSecret && providedSecret !== cronSecret) {
    res.status(403).json({ error: 'Forbidden: Invalid cron secret' });
    return;
  }

  const publishedCount = publishScheduledPosts();
  res.json({
    success: true,
    publishedCount,
    timestamp: new Date().toISOString(),
  });
});

export default router;
