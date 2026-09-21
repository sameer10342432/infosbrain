-- SQLite Schema for InfosBrain CMS

PRAGMA foreign_keys = ON;

-- Users (Admins)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  passwordHash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  seoTitle TEXT,
  seoDescription TEXT,
  createdAt TEXT NOT NULL
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  createdAt TEXT NOT NULL
);

-- Authors
CREATE TABLE IF NOT EXISTS authors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  profileImage TEXT,
  socialLinks TEXT, -- JSON string
  createdAt TEXT NOT NULL
);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featuredImage TEXT,
  featuredImageAlt TEXT,
  authorId TEXT REFERENCES authors(id) ON DELETE SET NULL,
  categoryId TEXT REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'scheduled', 'archived'
  publishedAt TEXT,
  scheduledAt TEXT,
  isFeatured INTEGER NOT NULL DEFAULT 0,
  readingTime TEXT,
  seoTitle TEXT,
  seoDescription TEXT,
  focusKeyword TEXT,
  canonicalUrl TEXT,
  ogTitle TEXT,
  ogDescription TEXT,
  ogImage TEXT,
  robotsIndex INTEGER NOT NULL DEFAULT 1,
  robotsFollow INTEGER NOT NULL DEFAULT 1,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  createdBy TEXT,
  updatedBy TEXT
);

-- Post to Tag Many-to-Many
CREATE TABLE IF NOT EXISTS post_tags (
  postId TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tagId TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (postId, tagId)
);

-- Media Library
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  originalName TEXT NOT NULL,
  mimeType TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- Contact Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  budget TEXT,
  projectDetails TEXT NOT NULL,
  source TEXT DEFAULT 'Website Contact Form',
  status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'In Progress', 'Converted', 'Closed', 'Spam'
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Site Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes for fast querying & high performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_publishedAt ON posts(publishedAt);
CREATE INDEX IF NOT EXISTS idx_posts_scheduledAt ON posts(scheduledAt);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(categoryId);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(authorId);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_createdAt ON inquiries(createdAt);
