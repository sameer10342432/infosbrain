import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db/index.js';
import { requireAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// Configure storage
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .substring(0, 30);
    const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  },
});

// File filter for images only
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, SVG, GIF) are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// GET /api/admin/media - List media
router.get('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 30));
  const offset = (page - 1) * limit;
  const search = req.query.search as string | undefined;

  let whereSql = '';
  const params: any[] = [];

  if (search && search.trim()) {
    whereSql = 'WHERE originalName LIKE ? OR filename LIKE ?';
    const term = `%${search.trim()}%`;
    params.push(term, term);
  }

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM media ${whereSql}`);
  const total = (countStmt.get(...params) as { total: number }).total;

  const listStmt = db.prepare(`
    SELECT * FROM media
    ${whereSql}
    ORDER BY createdAt DESC
    LIMIT ? OFFSET ?
  `);

  const media = listStmt.all(...params, limit, offset);

  res.json({
    media,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// POST /api/admin/media/upload - Upload file
router.post(
  '/admin/upload',
  requireAdmin,
  (req: AuthenticatedRequest, res: Response): void => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ error: 'File size exceeds maximum limit of 5MB.' });
          return;
        }
        res.status(400).json({ error: err.message });
        return;
      } else if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: 'No image file uploaded.' });
        return;
      }

      const id = 'media_' + Math.random().toString(36).substring(2, 10);
      const url = `/uploads/${req.file.filename}`;
      const now = new Date().toISOString();

      db.prepare(`
        INSERT INTO media (id, filename, originalName, mimeType, size, url, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        req.file.filename,
        req.file.originalname,
        req.file.mimetype,
        req.file.size,
        url,
        now
      );

      res.status(201).json({
        success: true,
        media: {
          id,
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          url,
          createdAt: now,
        },
        message: 'Image uploaded successfully.',
      });
    });
  }
);

// DELETE /api/admin/media/:id - Delete media
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const item = db.prepare('SELECT * FROM media WHERE id = ?').get(id) as any;

  if (!item) {
    res.status(404).json({ error: 'Media file not found.' });
    return;
  }

  // Delete file from disk
  const filePath = path.join(UPLOADS_DIR, item.filename);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch {
      // Continue even if disk file is missing
    }
  }

  db.prepare('DELETE FROM media WHERE id = ?').run(id);
  res.json({ success: true, message: 'Media file deleted successfully.' });
});

export default router;
