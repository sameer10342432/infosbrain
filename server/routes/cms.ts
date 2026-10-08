import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// ===================================================
// UNIFIED FRONTEND BUNDLE: GET /api/cms/all
// Fast, single-trip loader for all published website content
// ===================================================
router.get('/all', (_req, res: Response) => {
  try {
    // 1. Team & Leadership
    const teamRows = db.prepare(`
      SELECT * FROM team_members
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const formattedTeam = teamRows.map((r: any) => ({
      ...r,
      achievements: r.achievements ? JSON.parse(r.achievements) : [],
      skills: r.skills ? JSON.parse(r.skills) : [],
      role: r.designation,
      imageUrl: r.profileImage,
      bio: r.bio || '',
    }));

    // 2. Services
    const serviceRows = db.prepare(`
      SELECT * FROM services
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const formattedServices = serviceRows.map((r: any) => ({
      ...r,
      featured: Boolean(r.featured),
      features: r.features ? JSON.parse(r.features) : [],
      benefits: r.benefits ? JSON.parse(r.benefits) : [],
      deliverables: r.deliverables ? JSON.parse(r.deliverables) : [],
      technologies: r.technologies ? JSON.parse(r.technologies) : [],
      process: r.process ? JSON.parse(r.process) : [],
      faqs: r.faqs ? JSON.parse(r.faqs) : [],
    }));

    // 3. Statistics
    const statRows = db.prepare(`
      SELECT * FROM statistics
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    // 4. Testimonials
    const testRows = db.prepare(`
      SELECT * FROM testimonials
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    // 5. FAQs
    const faqRows = db.prepare(`
      SELECT * FROM faqs
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    // 6. Global Locations
    const locRows = db.prepare(`
      SELECT * FROM locations
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const formattedLocs = locRows.map((r: any) => ({
      ...r,
      coordinates: r.coordinates ? JSON.parse(r.coordinates) : { x: 50, y: 50 },
      servicesProvided: r.servicesProvided ? JSON.parse(r.servicesProvided) : [],
    }));

    // 7. Case Studies
    const caseRows = db.prepare(`
      SELECT * FROM case_studies
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const formattedCases = caseRows.map((r: any) => ({
      ...r,
      services: r.services ? JSON.parse(r.services) : [],
      results: r.results ? JSON.parse(r.results) : [],
      technologies: r.technologies ? JSON.parse(r.technologies) : [],
      testimonial: r.testimonial ? JSON.parse(r.testimonial) : undefined,
    }));

    // 8. Careers
    const careerRows = db.prepare(`
      SELECT * FROM careers
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const formattedCareers = careerRows.map((r: any) => ({
      ...r,
      requirements: r.requirements ? JSON.parse(r.requirements) : [],
      responsibilities: r.responsibilities ? JSON.parse(r.responsibilities) : [],
    }));

    // 9. Partnerships
    const partnerRows = db.prepare(`
      SELECT * FROM partnerships
      WHERE LOWER(status) = 'published'
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    // 10. Sections & Page Banners
    const sectionRows = db.prepare(`
      SELECT * FROM sections
      ORDER BY displayOrder ASC
    `).all();

    const sectionsByKey: Record<string, any> = {};
    sectionRows.forEach((s: any) => {
      sectionsByKey[s.sectionKey] = {
        ...s,
        isVisible: s.status === 'visible',
      };
    });

    // 11. Site Settings
    const settingRows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
    const settingsObj: Record<string, string> = {};
    settingRows.forEach((row) => {
      settingsObj[row.key] = row.value;
    });

    res.json({
      members: formattedTeam,
      leadership: formattedTeam.filter((m) => m.category === 'leadership'),
      teamMembers: formattedTeam.filter((m) => m.category === 'team'),
      services: formattedServices,
      statistics: statRows.map((s: any) => ({
        id: s.id,
        value: s.number,
        label: s.label,
        suffix: s.suffix || '',
        icon: s.icon,
      })),
      testimonials: testRows,
      faqs: faqRows,
      locations: formattedLocs,
      caseStudies: formattedCases,
      careers: formattedCareers,
      partnerships: partnerRows,
      sections: sectionsByKey,
      settings: settingsObj,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// SECTIONS & PAGE BANNERS MANAGEMENT
// ===================================================

// GET /api/cms/sections/admin
router.get('/sections/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM sections ORDER BY displayOrder ASC').all();
    res.json({ sections: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cms/sections/admin/:sectionKey - Update a section's contents & visibility
router.put('/sections/admin/:sectionKey', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sectionKey } = req.params;
    const existing = db.prepare('SELECT id FROM sections WHERE sectionKey = ?').get(sectionKey);
    if (!existing) {
      res.status(404).json({ error: 'Section not found' });
      return;
    }

    const {
      title,
      subtitle,
      badge,
      highlightText,
      description,
      primaryCtaText,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl,
      image,
      status = 'visible',
      displayOrder,
    } = req.body;

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE sections SET
        title = ?, subtitle = ?, badge = ?, highlightText = ?, description = ?,
        primaryCtaText = ?, primaryCtaUrl = ?, secondaryCtaText = ?, secondaryCtaUrl = ?,
        image = ?, status = ?, updatedAt = ?
      WHERE sectionKey = ?
    `).run(
      title !== undefined ? title : null,
      subtitle !== undefined ? subtitle : null,
      badge !== undefined ? badge : null,
      highlightText !== undefined ? highlightText : null,
      description !== undefined ? description : null,
      primaryCtaText !== undefined ? primaryCtaText : null,
      primaryCtaUrl !== undefined ? primaryCtaUrl : null,
      secondaryCtaText !== undefined ? secondaryCtaText : null,
      secondaryCtaUrl !== undefined ? secondaryCtaUrl : null,
      image !== undefined ? image : null,
      status || 'visible',
      now,
      sectionKey
    );

    const updated = db.prepare('SELECT * FROM sections WHERE sectionKey = ?').get(sectionKey);
    res.json({ success: true, section: updated, message: 'Section updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/cms/sections/admin/:sectionKey/visibility - 1-click Show / Hide toggle
router.patch('/sections/admin/:sectionKey/visibility', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sectionKey } = req.params;
    const { status } = req.body; // 'visible' | 'hidden'
    if (!status || !['visible', 'hidden'].includes(status)) {
      res.status(400).json({ error: 'Status must be visible or hidden' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE sections SET status = ?, updatedAt = ? WHERE sectionKey = ?').run(status, now, sectionKey);
    res.json({ success: true, message: `Section visibility updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// TESTIMONIALS MANAGEMENT
// ===================================================

router.get('/testimonials', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM testimonials WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    res.json({ testimonials: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/testimonials/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM testimonials ORDER BY displayOrder ASC, createdAt DESC`).all();
    res.json({ testimonials: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/testimonials/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      clientName,
      company,
      designation,
      country,
      flag,
      rating = 5,
      avatarText,
      avatarUrl,
      testimonial,
      videoThumbnail,
      videoUrl,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!clientName || !testimonial) {
      res.status(400).json({ error: 'Client name and testimonial are required' });
      return;
    }

    const id = 't_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO testimonials (
        id, clientName, company, designation, country, flag, rating, avatarText,
        avatarUrl, testimonial, videoThumbnail, videoUrl, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      clientName.trim(),
      company ? company.trim() : '',
      designation ? designation.trim() : 'Executive',
      country || null,
      flag || null,
      Number(rating) || 5,
      avatarText || null,
      avatarUrl || null,
      testimonial.trim(),
      videoThumbnail || null,
      videoUrl || null,
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    res.status(201).json({ success: true, id, message: 'Testimonial created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/testimonials/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      clientName,
      company,
      designation,
      country,
      flag,
      rating = 5,
      avatarText,
      avatarUrl,
      testimonial,
      videoThumbnail,
      videoUrl,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!clientName || !testimonial) {
      res.status(400).json({ error: 'Client name and testimonial are required' });
      return;
    }

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE testimonials SET
        clientName = ?, company = ?, designation = ?, country = ?, flag = ?,
        rating = ?, avatarText = ?, avatarUrl = ?, testimonial = ?, videoThumbnail = ?,
        videoUrl = ?, displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      clientName.trim(),
      company ? company.trim() : '',
      designation ? designation.trim() : 'Executive',
      country || null,
      flag || null,
      Number(rating) || 5,
      avatarText || null,
      avatarUrl || null,
      testimonial.trim(),
      videoThumbnail || null,
      videoUrl || null,
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    res.json({ success: true, message: 'Testimonial updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/testimonials/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// FAQS MANAGEMENT
// ===================================================

router.get('/faqs', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM faqs WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    res.json({ faqs: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/faqs/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM faqs ORDER BY displayOrder ASC, createdAt DESC`).all();
    res.json({ faqs: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/faqs/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { question, answer, category = 'General', displayOrder = 0, status = 'published' } = req.body;
    if (!question || !answer) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }

    const id = 'faq_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO faqs (id, question, answer, category, displayOrder, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, question.trim(), answer.trim(), category, Number(displayOrder) || 0, status, now, now);

    res.status(201).json({ success: true, id, message: 'FAQ created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/faqs/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { question, answer, category = 'General', displayOrder = 0, status = 'published' } = req.body;
    if (!question || !answer) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE faqs SET question = ?, answer = ?, category = ?, displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(question.trim(), answer.trim(), category, Number(displayOrder) || 0, status, now, id);

    res.json({ success: true, message: 'FAQ updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/faqs/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM faqs WHERE id = ?').run(id);
    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// STATISTICS (TRUST METRICS) MANAGEMENT
// ===================================================

router.get('/statistics', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM statistics WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    res.json({ statistics: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/statistics/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM statistics ORDER BY displayOrder ASC`).all();
    res.json({ statistics: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/statistics/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { number, label, suffix = '+', icon = 'TrendingUp', displayOrder = 0, status = 'published' } = req.body;
    if (!number || !label) {
      res.status(400).json({ error: 'Number and label are required' });
      return;
    }

    const id = 'stat_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO statistics (id, number, label, suffix, icon, displayOrder, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, number.trim(), label.trim(), suffix || '', icon || 'TrendingUp', Number(displayOrder) || 0, status, now, now);

    res.status(201).json({ success: true, message: 'Statistic created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/statistics/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { number, label, suffix = '+', icon = 'TrendingUp', displayOrder = 0, status = 'published' } = req.body;
    if (!number || !label) {
      res.status(400).json({ error: 'Number and label are required' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE statistics SET number = ?, label = ?, suffix = ?, icon = ?, displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(number.trim(), label.trim(), suffix || '', icon || 'TrendingUp', Number(displayOrder) || 0, status, now, id);

    res.json({ success: true, message: 'Statistic updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/statistics/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM statistics WHERE id = ?').run(id);
    res.json({ success: true, message: 'Statistic deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// CASE STUDIES MANAGEMENT
// ===================================================

router.get('/case-studies', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM case_studies WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      services: r.services ? JSON.parse(r.services) : [],
      results: r.results ? JSON.parse(r.results) : [],
      technologies: r.technologies ? JSON.parse(r.technologies) : [],
      testimonial: r.testimonial ? JSON.parse(r.testimonial) : undefined,
    }));
    res.json({ caseStudies: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/case-studies/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM case_studies ORDER BY displayOrder ASC, createdAt DESC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      services: r.services ? JSON.parse(r.services) : [],
      results: r.results ? JSON.parse(r.results) : [],
      technologies: r.technologies ? JSON.parse(r.technologies) : [],
      testimonial: r.testimonial ? JSON.parse(r.testimonial) : undefined,
    }));
    res.json({ caseStudies: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/case-studies/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      slug,
      client,
      industry,
      category = 'Web Development',
      imageUrl,
      challenge,
      strategy,
      solution,
      services = [],
      results = [],
      technologies = [],
      testimonial,
      metaTitle,
      metaDescription,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !client || !industry) {
      res.status(400).json({ error: 'Title, client, and industry are required' });
      return;
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const id = 'cs_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO case_studies (
        id, slug, title, client, industry, category, imageUrl, challenge, strategy,
        solution, services, results, technologies, testimonial, metaTitle, metaDescription,
        displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      cleanSlug,
      title.trim(),
      client.trim(),
      industry.trim(),
      category,
      imageUrl || null,
      challenge ? challenge.trim() : '',
      strategy ? strategy.trim() : '',
      solution ? solution.trim() : '',
      JSON.stringify(Array.isArray(services) ? services : []),
      JSON.stringify(Array.isArray(results) ? results : []),
      JSON.stringify(Array.isArray(technologies) ? technologies : []),
      testimonial ? JSON.stringify(testimonial) : null,
      metaTitle || null,
      metaDescription || null,
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    res.status(201).json({ success: true, id, message: 'Case study created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/case-studies/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      client,
      industry,
      category = 'Web Development',
      imageUrl,
      challenge,
      strategy,
      solution,
      services = [],
      results = [],
      technologies = [],
      testimonial,
      metaTitle,
      metaDescription,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !client || !industry) {
      res.status(400).json({ error: 'Title, client, and industry are required' });
      return;
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE case_studies SET
        slug = ?, title = ?, client = ?, industry = ?, category = ?, imageUrl = ?,
        challenge = ?, strategy = ?, solution = ?, services = ?, results = ?,
        technologies = ?, testimonial = ?, metaTitle = ?, metaDescription = ?,
        displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      cleanSlug,
      title.trim(),
      client.trim(),
      industry.trim(),
      category,
      imageUrl || null,
      challenge ? challenge.trim() : '',
      strategy ? strategy.trim() : '',
      solution ? solution.trim() : '',
      JSON.stringify(Array.isArray(services) ? services : []),
      JSON.stringify(Array.isArray(results) ? results : []),
      JSON.stringify(Array.isArray(technologies) ? technologies : []),
      testimonial ? JSON.stringify(testimonial) : null,
      metaTitle || null,
      metaDescription || null,
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    res.json({ success: true, message: 'Case study updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/case-studies/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM case_studies WHERE id = ?').run(id);
    res.json({ success: true, message: 'Case study deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// CAREERS / JOBS MANAGEMENT
// ===================================================

router.get('/careers', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM careers WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      requirements: r.requirements ? JSON.parse(r.requirements) : [],
      responsibilities: r.responsibilities ? JSON.parse(r.responsibilities) : [],
    }));
    res.json({ careers: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/careers/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM careers ORDER BY displayOrder ASC, createdAt DESC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      requirements: r.requirements ? JSON.parse(r.requirements) : [],
      responsibilities: r.responsibilities ? JSON.parse(r.responsibilities) : [],
    }));
    res.json({ careers: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/careers/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      department,
      type = 'Full-time / Remote',
      location = 'Global Remote',
      experience = '3+ years',
      description,
      requirements = [],
      responsibilities = [],
      applicationEmail = 'careers@infosbrain.com',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }

    const id = 'job_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO careers (
        id, title, department, type, location, experience, description,
        requirements, responsibilities, applicationEmail, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      title.trim(),
      department ? department.trim() : 'Engineering',
      type,
      location,
      experience,
      description.trim(),
      JSON.stringify(Array.isArray(requirements) ? requirements : []),
      JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      applicationEmail || 'careers@infosbrain.com',
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    res.status(201).json({ success: true, id, message: 'Career position created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/careers/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      type = 'Full-time / Remote',
      location = 'Global Remote',
      experience = '3+ years',
      description,
      requirements = [],
      responsibilities = [],
      applicationEmail = 'careers@infosbrain.com',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE careers SET
        title = ?, department = ?, type = ?, location = ?, experience = ?,
        description = ?, requirements = ?, responsibilities = ?, applicationEmail = ?,
        displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      title.trim(),
      department ? department.trim() : 'Engineering',
      type,
      location,
      experience,
      description.trim(),
      JSON.stringify(Array.isArray(requirements) ? requirements : []),
      JSON.stringify(Array.isArray(responsibilities) ? responsibilities : []),
      applicationEmail || 'careers@infosbrain.com',
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    res.json({ success: true, message: 'Career position updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/careers/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM careers WHERE id = ?').run(id);
    res.json({ success: true, message: 'Career position deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// GLOBAL LOCATIONS MANAGEMENT
// ===================================================

router.get('/locations', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM locations WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      coordinates: r.coordinates ? JSON.parse(r.coordinates) : { x: 50, y: 50 },
      servicesProvided: r.servicesProvided ? JSON.parse(r.servicesProvided) : [],
    }));
    res.json({ locations: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/locations/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM locations ORDER BY displayOrder ASC, createdAt DESC`).all();
    const formatted = rows.map((r: any) => ({
      ...r,
      coordinates: r.coordinates ? JSON.parse(r.coordinates) : { x: 50, y: 50 },
      servicesProvided: r.servicesProvided ? JSON.parse(r.servicesProvided) : [],
    }));
    res.json({ locations: formatted });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/locations/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      city,
      country,
      region = 'Global',
      role,
      flag,
      address,
      teamSize,
      contactEmail,
      contactPhone,
      localSuccessStory,
      coordinates = { x: 50, y: 50 },
      imageUrl,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!city || !country || !address || !contactEmail) {
      res.status(400).json({ error: 'City, country, address, and email are required' });
      return;
    }

    const id = 'loc_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO locations (
        id, city, country, region, role, flag, address, teamSize, contactEmail,
        contactPhone, localSuccessStory, coordinates, imageUrl, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      city.trim(),
      country.trim(),
      region,
      role ? role.trim() : 'Operations Center',
      flag || '🌐',
      address.trim(),
      teamSize || null,
      contactEmail.trim(),
      contactPhone || null,
      localSuccessStory || null,
      JSON.stringify(coordinates || { x: 50, y: 50 }),
      imageUrl || null,
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    res.status(201).json({ success: true, id, message: 'Location created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/locations/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      city,
      country,
      region = 'Global',
      role,
      flag,
      address,
      teamSize,
      contactEmail,
      contactPhone,
      localSuccessStory,
      coordinates = { x: 50, y: 50 },
      imageUrl,
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!city || !country || !address || !contactEmail) {
      res.status(400).json({ error: 'City, country, address, and email are required' });
      return;
    }

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE locations SET
        city = ?, country = ?, region = ?, role = ?, flag = ?, address = ?,
        teamSize = ?, contactEmail = ?, contactPhone = ?, localSuccessStory = ?,
        coordinates = ?, imageUrl = ?, displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      city.trim(),
      country.trim(),
      region,
      role ? role.trim() : 'Operations Center',
      flag || '🌐',
      address.trim(),
      teamSize || null,
      contactEmail.trim(),
      contactPhone || null,
      localSuccessStory || null,
      JSON.stringify(coordinates || { x: 50, y: 50 }),
      imageUrl || null,
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    res.json({ success: true, message: 'Location updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/locations/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM locations WHERE id = ?').run(id);
    res.json({ success: true, message: 'Location deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===================================================
// PARTNERSHIPS MANAGEMENT
// ===================================================

router.get('/partnerships', (_req, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM partnerships WHERE LOWER(status) = 'published' ORDER BY displayOrder ASC`).all();
    res.json({ partnerships: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/partnerships/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`SELECT * FROM partnerships ORDER BY displayOrder ASC, createdAt DESC`).all();
    res.json({ partnerships: rows });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/partnerships/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      partnerName,
      logo,
      website = 'https://infosbrain.com',
      description,
      category = 'Corporate Enterprises',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!partnerName) {
      res.status(400).json({ error: 'Partner name is required' });
      return;
    }

    const id = 'part_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO partnerships (id, partnerName, logo, website, description, category, displayOrder, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, partnerName.trim(), logo || null, website || null, description || null, category, Number(displayOrder) || 0, status, now, now);

    res.status(201).json({ success: true, message: 'Partnership created successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/partnerships/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      partnerName,
      logo,
      website = 'https://infosbrain.com',
      description,
      category = 'Corporate Enterprises',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!partnerName) {
      res.status(400).json({ error: 'Partner name is required' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE partnerships SET partnerName = ?, logo = ?, website = ?, description = ?, category = ?, displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(partnerName.trim(), logo || null, website || null, description || null, category, Number(displayOrder) || 0, status, now, id);

    res.json({ success: true, message: 'Partnership updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/partnerships/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM partnerships WHERE id = ?').run(id);
    res.json({ success: true, message: 'Partnership deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
