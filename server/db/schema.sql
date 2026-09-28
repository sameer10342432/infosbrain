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

-- Team & Leadership
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  qualification TEXT,
  designation TEXT NOT NULL,
  bio TEXT,
  profileImage TEXT,
  linkedinUrl TEXT,
  achievements TEXT, -- JSON array of strings
  skills TEXT, -- JSON array of strings
  category TEXT NOT NULL DEFAULT 'leadership', -- 'leadership' or 'team'
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published', -- 'published', 'draft', 'hidden'
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Development',
  iconName TEXT NOT NULL DEFAULT 'Code2',
  featured INTEGER NOT NULL DEFAULT 0,
  imageUrl TEXT,
  shortDescription TEXT NOT NULL,
  heroSubtitle TEXT,
  description TEXT,
  features TEXT, -- JSON array of strings
  benefits TEXT, -- JSON array of strings
  deliverables TEXT, -- JSON array of strings
  technologies TEXT, -- JSON array of strings
  process TEXT, -- JSON array of { phase, description }
  faqs TEXT, -- JSON array of { q, a }
  ctaText TEXT DEFAULT 'Start Your Project',
  metaTitle TEXT,
  metaDescription TEXT,
  focusKeyword TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Industries
CREATE TABLE IF NOT EXISTS industries (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  iconName TEXT NOT NULL DEFAULT 'Briefcase',
  tagline TEXT,
  description TEXT,
  imageUrl TEXT,
  challenges TEXT, -- JSON array of strings
  solutions TEXT, -- JSON array of strings
  relevantServices TEXT, -- JSON array of strings
  metaTitle TEXT,
  metaDescription TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Development',
  imageUrl TEXT,
  challenge TEXT,
  strategy TEXT,
  solution TEXT,
  services TEXT, -- JSON array of strings
  results TEXT, -- JSON array of { label, value }
  technologies TEXT, -- JSON array of strings
  testimonial TEXT, -- JSON { quote, author, role }
  metaTitle TEXT,
  metaDescription TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  clientName TEXT NOT NULL,
  company TEXT NOT NULL,
  designation TEXT NOT NULL,
  country TEXT,
  flag TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  avatarText TEXT,
  avatarUrl TEXT,
  testimonial TEXT NOT NULL,
  videoThumbnail TEXT,
  videoUrl TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Careers / Jobs
CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  experience TEXT,
  description TEXT NOT NULL,
  requirements TEXT, -- JSON array of strings
  responsibilities TEXT, -- JSON array of strings
  applicationEmail TEXT DEFAULT 'careers@infosbrain.com',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Global Locations
CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT 'Global',
  role TEXT NOT NULL,
  flag TEXT NOT NULL,
  address TEXT NOT NULL,
  teamSize TEXT,
  contactEmail TEXT NOT NULL,
  contactPhone TEXT,
  localSuccessStory TEXT,
  coordinates TEXT, -- JSON { x, y }
  imageUrl TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Partnerships & Client Logos
CREATE TABLE IF NOT EXISTS partnerships (
  id TEXT PRIMARY KEY,
  partnerName TEXT NOT NULL,
  logo TEXT,
  website TEXT,
  description TEXT,
  category TEXT DEFAULT 'Corporate Enterprises',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Statistics / Trust Metrics
CREATE TABLE IF NOT EXISTS statistics (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  label TEXT NOT NULL,
  suffix TEXT DEFAULT '+',
  icon TEXT DEFAULT 'TrendingUp',
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

-- Sections & Page Banners (Show / Hide, Headings, CTAs)
CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  sectionKey TEXT UNIQUE NOT NULL,
  page TEXT NOT NULL DEFAULT 'home',
  title TEXT,
  subtitle TEXT,
  badge TEXT,
  highlightText TEXT,
  description TEXT,
  primaryCtaText TEXT,
  primaryCtaUrl TEXT,
  secondaryCtaText TEXT,
  secondaryCtaUrl TEXT,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'visible', -- 'visible' or 'hidden'
  contentJson TEXT, -- JSON for extra data
  displayOrder INTEGER NOT NULL DEFAULT 0,
  updatedAt TEXT NOT NULL
);

-- Navigation Items
CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  path TEXT NOT NULL,
  parentId TEXT,
  groupName TEXT,
  description TEXT,
  icon TEXT,
  displayOrder INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
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

CREATE INDEX IF NOT EXISTS idx_team_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(displayOrder);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(displayOrder);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_faqs_status ON faqs(status);
CREATE INDEX IF NOT EXISTS idx_careers_status ON careers(status);
CREATE INDEX IF NOT EXISTS idx_locations_status ON locations(status);
CREATE INDEX IF NOT EXISTS idx_sections_key ON sections(sectionKey);
CREATE INDEX IF NOT EXISTS idx_sections_page ON sections(page);

