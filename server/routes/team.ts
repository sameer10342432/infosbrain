import { Router, Response } from 'express';
import fs from 'fs';
import path from 'path';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// Category normalization helper
export function normalizeCategory(cat?: string): 'leadership' | 'team' {
  if (!cat) return 'leadership';
  const c = String(cat).trim().toLowerCase();
  if (
    c.includes('leadership') ||
    c.includes('executive') ||
    c.includes('showcase') ||
    c === 'lead' ||
    c === 'director'
  ) {
    return 'leadership';
  }
  return 'team';
}

// Helper to format team row
export function formatTeamMember(row: any) {
  const category = normalizeCategory(row.category);
  return {
    ...row,
    category,
    achievements: row.achievements ? JSON.parse(row.achievements) : [],
    skills: row.skills ? JSON.parse(row.skills) : [],
    // Provide both naming conventions so existing UI components work out-of-the-box
    role: row.designation,
    imageUrl: row.profileImage,
    bio: row.bio || '',
  };
}

// Helper to keep static JSON endpoints synchronized whenever SQLite mutations happen
export function syncTeamStaticFiles() {
  try {
    const rows = db.prepare(`
      SELECT * FROM team_members
      WHERE LOWER(status) IN ('published', 'active', 'visible')
         OR status IS NULL
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const members = rows.map(formatTeamMember);
    const leadership = members.filter((m) => m.category === 'leadership');
    const teamMembers = members.filter((m) => m.category === 'team');

    const payload = JSON.stringify({ members, leadership, teamMembers }, null, 2);

    const destinations = [
      path.resolve(process.cwd(), 'public', 'api', 'team.json'),
      path.resolve(process.cwd(), 'public', 'api', 'team'),
      path.resolve(process.cwd(), 'dist', 'api', 'team.json'),
      path.resolve(process.cwd(), 'dist', 'api', 'team'),
    ];

    for (const dest of destinations) {
      const dir = path.dirname(dest);
      if (fs.existsSync(dir)) {
        fs.writeFileSync(dest, payload, 'utf8');
      }
    }
  } catch (err) {
    console.warn('[Team Static Sync Notice]', err);
  }
}

// GET /api/team - Public list of published team members
router.get('/', (_req, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM team_members
      WHERE LOWER(status) IN ('published', 'active', 'visible')
         OR status IS NULL
      ORDER BY displayOrder ASC, createdAt ASC
    `).all();

    const members = rows.map(formatTeamMember);
    const leadership = members.filter((m) => m.category === 'leadership');
    const teamMembers = members.filter((m) => m.category === 'team');

    res.json({
      members,
      leadership,
      teamMembers,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/team/admin - Admin list (all records including drafts/hidden)
router.get('/admin', requireAdmin, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM team_members
      ORDER BY displayOrder ASC, createdAt DESC
    `).all();

    res.json({ members: rows.map(formatTeamMember) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/team/admin - Create new team member
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      qualification,
      designation,
      bio,
      profileImage,
      linkedinUrl,
      achievements = [],
      skills = [],
      category = 'leadership',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!designation || !designation.trim()) {
      res.status(400).json({ error: 'Designation / Role is required' });
      return;
    }

    const id = 'tm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const now = new Date().toISOString();

    const cleanAchievements = Array.isArray(achievements)
      ? achievements.filter((a: any) => typeof a === 'string' && a.trim().length > 0)
      : [];
    const cleanSkills = Array.isArray(skills)
      ? skills.filter((s: any) => typeof s === 'string' && s.trim().length > 0)
      : [];

    db.prepare(`
      INSERT INTO team_members (
        id, name, qualification, designation, bio, profileImage, linkedinUrl,
        achievements, skills, category, displayOrder, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      name.trim(),
      qualification ? qualification.trim() : null,
      designation.trim(),
      bio ? bio.trim() : null,
      profileImage || null,
      linkedinUrl ? linkedinUrl.trim() : null,
      JSON.stringify(cleanAchievements),
      JSON.stringify(cleanSkills),
      category,
      Number(displayOrder) || 0,
      status,
      now,
      now
    );

    const created = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id);
    syncTeamStaticFiles();
    res.status(201).json({
      success: true,
      member: formatTeamMember(created),
      message: 'Team member created successfully',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/team/admin/:id - Update team member
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id FROM team_members WHERE id = ?').get(id);
    if (!existing) {
      res.status(404).json({ error: 'Team member not found' });
      return;
    }

    const {
      name,
      qualification,
      designation,
      bio,
      profileImage,
      linkedinUrl,
      achievements = [],
      skills = [],
      category = 'leadership',
      displayOrder = 0,
      status = 'published',
    } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!designation || !designation.trim()) {
      res.status(400).json({ error: 'Designation / Role is required' });
      return;
    }

    const cleanAchievements = Array.isArray(achievements)
      ? achievements.filter((a: any) => typeof a === 'string' && a.trim().length > 0)
      : [];
    const cleanSkills = Array.isArray(skills)
      ? skills.filter((s: any) => typeof s === 'string' && s.trim().length > 0)
      : [];
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE team_members SET
        name = ?, qualification = ?, designation = ?, bio = ?, profileImage = ?,
        linkedinUrl = ?, achievements = ?, skills = ?, category = ?,
        displayOrder = ?, status = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      name.trim(),
      qualification ? qualification.trim() : null,
      designation.trim(),
      bio ? bio.trim() : null,
      profileImage || null,
      linkedinUrl ? linkedinUrl.trim() : null,
      JSON.stringify(cleanAchievements),
      JSON.stringify(cleanSkills),
      category,
      Number(displayOrder) || 0,
      status,
      now,
      id
    );

    const updated = db.prepare('SELECT * FROM team_members WHERE id = ?').get(id);
    syncTeamStaticFiles();
    res.json({
      success: true,
      member: formatTeamMember(updated),
      message: 'Team member updated successfully',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/team/admin/:id/status - Quick toggle status (published/hidden)
router.patch('/admin/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['published', 'draft', 'hidden'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE team_members SET status = ?, updatedAt = ? WHERE id = ?').run(status, now, id);
    syncTeamStaticFiles();

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/team/admin/reorder - Update display order of multiple items
router.put('/admin/reorder', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items } = req.body; // Array of { id: string, displayOrder: number }
    if (!Array.isArray(items)) {
      res.status(400).json({ error: 'Items must be an array of { id, displayOrder }' });
      return;
    }

    const updateStmt = db.prepare('UPDATE team_members SET displayOrder = ?, updatedAt = ? WHERE id = ?');
    const now = new Date().toISOString();

    const transaction = db.transaction((rows: any[]) => {
      for (const item of rows) {
        if (item.id && typeof item.displayOrder === 'number') {
          updateStmt.run(item.displayOrder, now, item.id);
        }
      }
    });

    transaction(items);
    syncTeamStaticFiles();
    res.json({ success: true, message: 'Reordered successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/team/admin/:id - Delete team member
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id, name FROM team_members WHERE id = ?').get(id);
    if (!existing) {
      res.json({ success: true, message: 'Team member removed or already deleted' });
      return;
    }

    db.prepare('DELETE FROM team_members WHERE id = ?').run(id);
    syncTeamStaticFiles();
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
