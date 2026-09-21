import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// GET /api/authors - List authors
router.get('/', (_req, res: Response) => {
  const authors = db.prepare(`
    SELECT
      a.*,
      COUNT(p.id) as postCount
    FROM authors a
    LEFT JOIN posts p ON p.authorId = a.id AND p.status = 'published'
    GROUP BY a.id
    ORDER BY a.name ASC
  `).all();

  const formatted = authors.map((a: any) => ({
    ...a,
    socialLinks: a.socialLinks ? JSON.parse(a.socialLinks) : {},
  }));

  res.json({ authors: formatted });
});

// Admin: POST /api/admin/authors
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { name, role, bio, profileImage, socialLinks } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Author name is required.' });
    return;
  }

  const id = 'auth_' + Math.random().toString(36).substring(2, 9);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO authors (id, name, role, bio, profileImage, socialLinks, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    name.trim(),
    role ? role.trim() : 'Content Specialist',
    bio ? bio.trim() : null,
    profileImage || null,
    socialLinks ? JSON.stringify(socialLinks) : JSON.stringify({}),
    now
  );

  res.status(201).json({
    success: true,
    author: { id, name: name.trim(), role, bio, profileImage, socialLinks },
    message: 'Author created successfully.',
  });
});

// Admin: PUT /api/admin/authors/:id
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT id FROM authors WHERE id = ?').get(id);
  if (!existing) {
    res.status(404).json({ error: 'Author not found.' });
    return;
  }

  const { name, role, bio, profileImage, socialLinks } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Author name is required.' });
    return;
  }

  db.prepare(`
    UPDATE authors SET
      name = ?, role = ?, bio = ?, profileImage = ?, socialLinks = ?
    WHERE id = ?
  `).run(
    name.trim(),
    role ? role.trim() : 'Content Specialist',
    bio ? bio.trim() : null,
    profileImage || null,
    socialLinks ? JSON.stringify(socialLinks) : JSON.stringify({}),
    id
  );

  res.json({ success: true, message: 'Author updated successfully.' });
});

// Admin: DELETE /api/admin/authors/:id
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM authors WHERE id = ?').run(id);
  res.json({ success: true, message: 'Author deleted successfully.' });
});

export default router;
