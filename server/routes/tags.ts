import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';
import { slugify } from './posts.js';

const router = Router();

// GET /api/tags - List tags
router.get('/', (_req, res: Response) => {
  const tags = db.prepare(`
    SELECT
      t.*,
      COUNT(pt.postId) as postCount
    FROM tags t
    LEFT JOIN post_tags pt ON pt.tagId = t.id
    GROUP BY t.id
    ORDER BY postCount DESC, t.name ASC
  `).all();
  res.json({ tags });
});

// Admin: POST /api/admin/tags - Create tag
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { name, slug: rawSlug } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Tag name is required.' });
    return;
  }

  const baseSlug = rawSlug ? slugify(String(rawSlug)) : slugify(name);
  let slug = baseSlug;
  let counter = 1;
  while (db.prepare('SELECT id FROM tags WHERE slug = ?').get(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const id = 'tag_' + slug;
  const now = new Date().toISOString();

  db.prepare('INSERT INTO tags (id, name, slug, createdAt) VALUES (?, ?, ?, ?)').run(
    id,
    name.trim(),
    slug,
    now
  );

  res.status(201).json({
    success: true,
    tag: { id, name: name.trim(), slug },
    message: 'Tag created successfully.',
  });
});

// Admin: PUT /api/admin/tags/:id - Update tag
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, slug: rawSlug } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Tag name is required.' });
    return;
  }

  const slug = rawSlug ? slugify(String(rawSlug)) : slugify(name);
  const checkDuplicate = db.prepare('SELECT id FROM tags WHERE slug = ? AND id != ?').get(slug, id);
  if (checkDuplicate) {
    res.status(400).json({ error: 'A tag with this slug already exists.' });
    return;
  }

  db.prepare('UPDATE tags SET name = ?, slug = ? WHERE id = ?').run(name.trim(), slug, id);
  res.json({ success: true, message: 'Tag updated successfully.' });
});

// Admin: DELETE /api/admin/tags/:id - Delete tag
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM tags WHERE id = ?').run(id);
  res.json({ success: true, message: 'Tag deleted successfully.' });
});

export default router;
