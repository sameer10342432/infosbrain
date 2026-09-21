import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';
import { slugify } from './posts.js';

const router = Router();

// Public: GET /api/categories
router.get('/', (_req, res: Response) => {
  const categories = db.prepare(`
    SELECT
      c.*,
      COUNT(CASE WHEN p.status = 'published' THEN 1 END) as postCount
    FROM categories c
    LEFT JOIN posts p ON p.categoryId = c.id
    GROUP BY c.id
    ORDER BY c.name ASC
  `).all();
  res.json({ categories });
});

// Admin: GET /api/admin/categories
router.get('/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  const categories = db.prepare(`
    SELECT
      c.*,
      COUNT(p.id) as totalPosts,
      COUNT(CASE WHEN p.status = 'published' THEN 1 END) as publishedPosts
    FROM categories c
    LEFT JOIN posts p ON p.categoryId = c.id
    GROUP BY c.id
    ORDER BY c.name ASC
  `).all();
  res.json({ categories });
});

// Admin: POST /api/admin/categories
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { name, slug: rawSlug, description, seoTitle, seoDescription } = req.body;

  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Category name is required.' });
    return;
  }

  const baseSlug = rawSlug ? slugify(String(rawSlug)) : slugify(name);
  let slug = baseSlug;
  let counter = 1;
  while (db.prepare('SELECT id FROM categories WHERE slug = ?').get(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const id = 'cat_' + slug;
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO categories (id, name, slug, description, seoTitle, seoDescription, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    name.trim(),
    slug,
    description ? description.trim() : null,
    seoTitle ? seoTitle.trim() : `${name.trim()} Insights | InfosBrain`,
    seoDescription ? seoDescription.trim() : description || null,
    now
  );

  res.status(201).json({
    success: true,
    category: { id, name: name.trim(), slug, description, seoTitle, seoDescription },
    message: 'Category created successfully.',
  });
});

// Admin: PUT /api/admin/categories/:id
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(id) as any;

  if (!existing) {
    res.status(404).json({ error: 'Category not found.' });
    return;
  }

  const { name, slug: rawSlug, description, seoTitle, seoDescription } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ error: 'Category name is required.' });
    return;
  }

  const slug = rawSlug ? slugify(String(rawSlug)) : existing.slug;
  const checkDuplicate = db.prepare('SELECT id FROM categories WHERE slug = ? AND id != ?').get(slug, id);
  if (checkDuplicate) {
    res.status(400).json({ error: 'A category with this slug already exists.' });
    return;
  }

  db.prepare(`
    UPDATE categories SET
      name = ?, slug = ?, description = ?, seoTitle = ?, seoDescription = ?
    WHERE id = ?
  `).run(
    name.trim(),
    slug,
    description ? description.trim() : null,
    seoTitle ? seoTitle.trim() : null,
    seoDescription ? seoDescription.trim() : null,
    id
  );

  res.json({
    success: true,
    message: 'Category updated successfully.',
  });
});

// Admin: DELETE /api/admin/categories/:id
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  res.json({ success: true, message: 'Category deleted successfully.' });
});

export default router;
