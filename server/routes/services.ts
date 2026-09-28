import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

function formatService(row: any) {
  return {
    ...row,
    featured: Boolean(row.featured),
    features: row.features ? JSON.parse(row.features) : [],
    benefits: row.benefits ? JSON.parse(row.benefits) : [],
    deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
    technologies: row.technologies ? JSON.parse(row.technologies) : [],
    process: row.process ? JSON.parse(row.process) : [],
    faqs: row.faqs ? JSON.parse(row.faqs) : [],
  };
}

// GET /api/services - Public list of published services
router.get('/', (_req, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM services
      WHERE status = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    res.json({ services: rows.map(formatService) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/services/:slug - Public single service by slug
router.get('/:slug', (req, res: Response) => {
  try {
    const { slug } = req.params;
    const row = db.prepare('SELECT * FROM services WHERE slug = ?').get(slug);
    if (!row) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ service: formatService(row) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/services/admin - Admin list (all records)
router.get('/admin/all', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM services
      ORDER BY displayOrder ASC, createdAt DESC
    `).all();

    res.json({ services: rows.map(formatService) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/services/admin - Create new service
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      slug,
      category = 'Development',
      iconName = 'Code2',
      featured = false,
      imageUrl,
      shortDescription,
      heroSubtitle,
      description,
      features = [],
      benefits = [],
      deliverables = [],
      technologies = [],
      process = [],
      faqs = [],
      ctaText = 'Start Your Project',
      metaTitle,
      metaDescription,
      focusKeyword,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const existing = db.prepare('SELECT id FROM services WHERE slug = ?').get(cleanSlug);
    if (existing) {
      res.status(400).json({ error: `A service with slug "${cleanSlug}" already exists.` });
      return;
    }

    const id = 'svc_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO services (
        id, slug, title, category, iconName, featured, imageUrl, shortDescription,
        heroSubtitle, description, features, benefits, deliverables, technologies,
        process, faqs, ctaText, metaTitle, metaDescription, focusKeyword,
        displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      cleanSlug,
      title.trim(),
      category,
      iconName,
      featured ? 1 : 0,
      imageUrl || null,
      shortDescription ? shortDescription.trim() : '',
      heroSubtitle ? heroSubtitle.trim() : null,
      description ? description.trim() : null,
      JSON.stringify(Array.isArray(features) ? features : []),
      JSON.stringify(Array.isArray(benefits) ? benefits : []),
      JSON.stringify(Array.isArray(deliverables) ? deliverables : []),
      JSON.stringify(Array.isArray(technologies) ? technologies : []),
      JSON.stringify(Array.isArray(process) ? process : []),
      JSON.stringify(Array.isArray(faqs) ? faqs : []),
      ctaText || 'Start Your Project',
      metaTitle || null,
      metaDescription || null,
      focusKeyword || null,
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    const created = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
    res.status(201).json({
      success: true,
      service: formatService(created),
      message: 'Service created successfully',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/services/admin/:id - Update service
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id FROM services WHERE id = ?').get(id);
    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    const {
      title,
      slug,
      category = 'Development',
      iconName = 'Code2',
      featured = false,
      imageUrl,
      shortDescription,
      heroSubtitle,
      description,
      features = [],
      benefits = [],
      deliverables = [],
      technologies = [],
      process = [],
      faqs = [],
      ctaText = 'Start Your Project',
      metaTitle,
      metaDescription,
      focusKeyword,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const slugCheck = db.prepare('SELECT id FROM services WHERE slug = ? AND id != ?').get(cleanSlug, id);
    if (slugCheck) {
      res.status(400).json({ error: `A service with slug "${cleanSlug}" already exists.` });
      return;
    }

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE services SET
        slug = ?, title = ?, category = ?, iconName = ?, featured = ?, imageUrl = ?,
        shortDescription = ?, heroSubtitle = ?, description = ?, features = ?,
        benefits = ?, deliverables = ?, technologies = ?, process = ?, faqs = ?,
        ctaText = ?, metaTitle = ?, metaDescription = ?, focusKeyword = ?,
        displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      cleanSlug,
      title.trim(),
      category,
      iconName,
      featured ? 1 : 0,
      imageUrl || null,
      shortDescription ? shortDescription.trim() : '',
      heroSubtitle ? heroSubtitle.trim() : null,
      description ? description.trim() : null,
      JSON.stringify(Array.isArray(features) ? features : []),
      JSON.stringify(Array.isArray(benefits) ? benefits : []),
      JSON.stringify(Array.isArray(deliverables) ? deliverables : []),
      JSON.stringify(Array.isArray(technologies) ? technologies : []),
      JSON.stringify(Array.isArray(process) ? process : []),
      JSON.stringify(Array.isArray(faqs) ? faqs : []),
      ctaText || 'Start Your Project',
      metaTitle || null,
      metaDescription || null,
      focusKeyword || null,
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    const updated = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
    res.json({
      success: true,
      service: formatService(updated),
      message: 'Service updated successfully',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/services/admin/:id/status - Quick toggle status
router.patch('/admin/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['published', 'draft', 'hidden'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE services SET status = ?, updatedAt = ? WHERE id = ?').run(status, now, id);
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/services/admin/reorder - Update order
router.put('/admin/reorder', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      res.status(400).json({ error: 'Items must be an array' });
      return;
    }

    const updateStmt = db.prepare('UPDATE services SET displayOrder = ?, updatedAt = ? WHERE id = ?');
    const now = new Date().toISOString();

    const transaction = db.transaction((rows: any[]) => {
      for (const item of rows) {
        if (item.id && typeof item.displayOrder === 'number') {
          updateStmt.run(item.displayOrder, now, item.id);
        }
      }
    });

    transaction(items);
    res.json({ success: true, message: 'Reordered successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/services/admin/:id - Delete service
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id FROM services WHERE id = ?').get(id);
    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    db.prepare('DELETE FROM services WHERE id = ?').run(id);
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
