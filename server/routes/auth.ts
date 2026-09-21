import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/index.js';
import {
  generateToken,
  requireAdmin,
  AuthenticatedRequest,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
  AuthUser,
} from '../auth.js';

const router = Router();

// Login
router.post('/login', (req, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const { allowed, waitMinutes } = checkLoginRateLimit(ip);

  if (!allowed) {
    res.status(429).json({
      error: `Too many failed login attempts. Please try again in ${waitMinutes} minute(s).`,
    });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const user = db.prepare('SELECT id, email, passwordHash, name, role FROM users WHERE email = ?').get(normalizedEmail) as
    | (AuthUser & { passwordHash: string })
    | undefined;

  if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
    recordFailedLogin(ip);
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  resetLoginAttempts(ip);

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = generateToken(authUser);

  // Set HTTP-only cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  res.json({
    success: true,
    token,
    user: authUser,
  });
});

// Logout
router.post('/logout', (_req, res: Response) => {
  res.clearCookie('admin_token', { path: '/' });
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Get Current User Profile
router.get('/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});

// Update Profile & Password
router.put('/profile', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { name, email, currentPassword, newPassword } = req.body;

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  const now = new Date().toISOString();

  // If password change is requested
  if (newPassword) {
    if (!currentPassword) {
      res.status(400).json({ error: 'Current password is required to change password.' });
      return;
    }
    if (!bcrypt.compareSync(String(currentPassword), user.passwordHash)) {
      res.status(400).json({ error: 'Current password is incorrect.' });
      return;
    }
    if (String(newPassword).length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters long.' });
      return;
    }

    const newHash = bcrypt.hashSync(String(newPassword), 10);
    db.prepare('UPDATE users SET passwordHash = ?, updatedAt = ? WHERE id = ?').run(newHash, now, userId);
  }

  // Update name / email
  const updatedName = name ? String(name).trim() : user.name;
  let updatedEmail = user.email;

  if (email && String(email).toLowerCase().trim() !== user.email) {
    const checkEmail = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(String(email).toLowerCase().trim(), userId);
    if (checkEmail) {
      res.status(400).json({ error: 'Email address is already in use.' });
      return;
    }
    updatedEmail = String(email).toLowerCase().trim();
  }

  db.prepare('UPDATE users SET name = ?, email = ?, updatedAt = ? WHERE id = ?').run(updatedName, updatedEmail, now, userId);

  const updatedUser: AuthUser = {
    id: userId,
    email: updatedEmail,
    name: updatedName,
    role: user.role,
  };

  const token = generateToken(updatedUser);
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  res.json({
    success: true,
    user: updatedUser,
    token,
    message: 'Profile updated successfully.',
  });
});

export default router;
