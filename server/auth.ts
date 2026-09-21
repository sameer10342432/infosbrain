import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from './db/index.js';

const JWT_SECRET = process.env.AUTH_SECRET || 'infosbrain_super_secure_production_jwt_secret_key_2026';
const TOKEN_EXPIRY = '7d';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

// Generate JWT token
export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Verify token
export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch {
    return null;
  }
}

// Admin Authentication Middleware
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  let token: string | undefined;

  // 1. Check HTTP-only cookie
  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  // 2. Check Authorization Header (Bearer)
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No authentication token provided' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session token' });
    return;
  }

  // Verify user still exists in database
  const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(payload.id) as AuthUser | undefined;
  if (!user) {
    res.status(401).json({ error: 'Unauthorized: User account no longer exists' });
    return;
  }

  req.user = user;
  next();
}

// Optional Auth (for preview mode or public endpoints)
export function optionalAdmin(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  let token: string | undefined;

  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(payload.id) as AuthUser | undefined;
      if (user) {
        req.user = user;
      }
    }
  }

  next();
}

// Brute-force protection for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export function checkLoginRateLimit(ip: string): { allowed: boolean; waitMinutes?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record) return { allowed: true };

  if (record.count >= MAX_ATTEMPTS) {
    const elapsed = now - record.lastAttempt;
    if (elapsed < LOCKOUT_MS) {
      const waitMinutes = Math.ceil((LOCKOUT_MS - elapsed) / (60 * 1000));
      return { allowed: false, waitMinutes };
    } else {
      // Lockout expired, reset
      loginAttempts.delete(ip);
      return { allowed: true };
    }
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;
  loginAttempts.set(ip, record);
}

export function resetLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}
