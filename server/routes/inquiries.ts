import { Router, Request, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';
import nodemailer from 'nodemailer';

const router = Router();

// Helper to send email notification (fails gracefully if SMTP not configured)
async function sendNotificationEmail(inquiry: {
  name: string;
  email: string;
  business?: string;
  phone?: string;
  service?: string;
  budget?: string;
  projectDetails: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    // SMTP not configured, skip email quietly
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });

    const targetEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'info@infosbrain.com';
    const mailOptions = {
      from: process.env.SMTP_FROM || `"InfosBrain Website" <${user}>`,
      to: targetEmail,
      subject: `[New Inquiry] ${inquiry.name} - ${inquiry.service || 'General Inquiry'}`,
      text: `New consultation inquiry received:\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone || 'N/A'}\nCompany: ${inquiry.business || 'N/A'}\nService: ${inquiry.service || 'N/A'}\nBudget: ${inquiry.budget || 'N/A'}\n\nProject Details:\n${inquiry.projectDetails}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('SMTP notification skipped/failed:', (err as Error).message);
  }
}

// Public: POST /api/inquiries
router.post('/', async (req: Request, res: Response) => {
  const {
    name,
    fullName, // Support alias from existing ContactPage form
    business,
    company, // Support alias
    email,
    phone,
    service,
    budget,
    projectDetails,
    message, // Support alias
    source = 'Website Contact Form',
  } = req.body;

  const clientName = (name || fullName || '').trim();
  const clientEmail = (email || '').toLowerCase().trim();
  const clientDetails = (projectDetails || message || '').trim();

  if (!clientName || !clientEmail || !clientDetails) {
    res.status(400).json({ error: 'Name, email, and project details are required.' });
    return;
  }

  // Basic email format check
  if (!clientEmail.includes('@') || !clientEmail.includes('.')) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  const id = 'inq_' + Math.random().toString(36).substring(2, 10);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO inquiries (
      id, name, business, email, phone, service, budget, projectDetails, source, status, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?)
  `).run(
    id,
    clientName,
    (business || company || '').trim(),
    clientEmail,
    (phone || '').trim(),
    (service || '').trim(),
    (budget || '').trim(),
    clientDetails,
    source,
    now,
    now
  );

  // Send email asynchronously in background
  sendNotificationEmail({
    name: clientName,
    email: clientEmail,
    business: business || company,
    phone,
    service,
    budget,
    projectDetails: clientDetails,
  }).catch(() => {});

  res.status(201).json({
    success: true,
    id,
    message: 'Thank you! Your project brief has been received. Our senior practice directors will review it within 24 hours.',
  });
});

// Admin: GET /api/admin/inquiries
router.get('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
  const offset = (page - 1) * limit;
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  let whereClauses: string[] = [];
  const params: any[] = [];

  if (status && status !== 'all') {
    whereClauses.push('status = ?');
    params.push(status);
  }

  if (search && search.trim()) {
    whereClauses.push('(name LIKE ? OR email LIKE ? OR business LIKE ? OR service LIKE ? OR projectDetails LIKE ?)');
    const term = `%${search.trim()}%`;
    params.push(term, term, term, term, term);
  }

  const whereSql = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM inquiries ${whereSql}`);
  const total = (countStmt.get(...params) as { total: number }).total;

  const listStmt = db.prepare(`
    SELECT * FROM inquiries
    ${whereSql}
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ?
  `);

  const inquiries = listStmt.all(...params, limit, offset);

  // Count by status
  const countsByStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM inquiries GROUP BY status
  `).all() as { status: string; count: number }[];

  const statusMap: Record<string, number> = {
    New: 0,
    Contacted: 0,
    'In Progress': 0,
    Converted: 0,
    Closed: 0,
    Spam: 0,
  };
  countsByStatus.forEach((c) => {
    statusMap[c.status] = c.count;
  });

  res.json({
    inquiries,
    statusCounts: statusMap,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Admin: PATCH /api/admin/inquiries/:id/status
router.patch('/admin/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'];
  if (!allowedStatuses.includes(status)) {
    res.status(400).json({ error: 'Invalid status value.' });
    return;
  }

  const now = new Date().toISOString();
  db.prepare('UPDATE inquiries SET status = ?, updatedAt = ? WHERE id = ?').run(status, now, id);

  res.json({ success: true, message: `Inquiry marked as ${status}.` });
});

// Admin: DELETE /api/admin/inquiries/:id
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);
  res.json({ success: true, message: 'Inquiry deleted successfully.' });
});

export default router;
