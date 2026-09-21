import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Ensure data and uploads directories exist
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DB_PATH = process.env.DATABASE_PATH || path.join(DATA_DIR, 'infosbrain.db');
const db = new Database(DB_PATH);

// Enable WAL mode & foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize schema
const schemaPath = path.resolve(__dirname, 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schema);
}

// Helper for seeding initial data
export function seedDatabase() {
  // 1. Initial Admin User
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@infosbrain.com').toLowerCase().trim();
  const rawAdminPass = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);

  if (!existingUser) {
    const passwordHash = bcrypt.hashSync(rawAdminPass, 10);
    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO users (id, email, passwordHash, name, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      'usr_' + Math.random().toString(36).substring(2, 9),
      adminEmail,
      passwordHash,
      'InfosBrain Admin',
      'admin',
      now,
      now
    );
  }

  // 2. Initial Categories
  const initialCategories = [
    { name: 'SEO', slug: 'seo', description: 'Technical SEO, search engine algorithms, and organic visibility.' },
    { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Holistic multi-channel digital marketing playbooks.' },
    { name: 'Web Development', slug: 'web-development', description: 'Modern frontend architecture, headless platforms, and high-performance engineering.' },
    { name: 'E-commerce', slug: 'ecommerce', description: 'Storefront optimization, conversion acceleration, and scalable retail architecture.' },
    { name: 'Social Media', slug: 'social-media', description: 'Organic audience building, brand advocacy, and content distribution.' },
    { name: 'Paid Advertising', slug: 'paid-advertising', description: 'Targeted ROAS optimization, PPC, server-side tracking, and performance media.' },
    { name: 'Business Growth', slug: 'business-growth', description: 'Strategic scaling, revenue operations, and digital transformation insights.' },
    { name: 'Technology', slug: 'technology', description: 'Emerging tech, artificial intelligence integrations, and enterprise cloud solutions.' },
  ];

  const insertCat = db.prepare(`
    INSERT OR IGNORE INTO categories (id, name, slug, description, seoTitle, seoDescription, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  initialCategories.forEach((cat) => {
    insertCat.run(
      'cat_' + cat.slug,
      cat.name,
      cat.slug,
      cat.description,
      `${cat.name} Insights & Intelligence | InfosBrain`,
      cat.description,
      new Date().toISOString()
    );
  });

  // 3. Initial Authors
  const initialAuthors = [
    {
      id: 'auth_editorial',
      name: 'InfosBrain Editorial Team',
      role: 'Technology & Strategy Editorial Board',
      bio: 'Cross-functional engineering and digital growth specialists documenting tactical playbooks and industry analyses.',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'auth_architect',
      name: 'Principal Solutions Architect',
      role: 'Enterprise Systems & Cloud Engineering Lead',
      bio: 'Specialist in distributed microservices, Core Web Vitals acceleration, and scalable cloud deployments.',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const insertAuthor = db.prepare(`
    INSERT OR IGNORE INTO authors (id, name, role, bio, profileImage, socialLinks, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  initialAuthors.forEach((a) => {
    insertAuthor.run(a.id, a.name, a.role, a.bio, a.profileImage, JSON.stringify({ linkedin: 'https://linkedin.com' }), new Date().toISOString());
  });

  // 4. Initial Site Settings
  const defaultSettings: Record<string, string> = {
    brand_name: 'InfosBrain',
    tagline: 'Transforming Ideas into Intelligent Digital Solutions',
    contact_email: 'info@infosbrain.com',
    secondary_email: 'contact@infosbrain.com',
    seo_title: 'InfosBrain | Transforming Ideas into Intelligent Digital Solutions',
    seo_description: 'InfosBrain is a technology-driven company delivering software development, artificial intelligence, cloud technologies, cybersecurity, and digital transformation consulting.',
    seo_og_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    social_facebook: '',
    social_instagram: '',
    social_linkedin: 'https://www.linkedin.com/company/infosbrain',
    social_x: '',
    social_youtube: '',
    social_tiktok: '',
  };

  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)
  `);

  for (const [k, v] of Object.entries(defaultSettings)) {
    insertSetting.run(k, v);
  }

  // 5. Seed initial posts if none exist
  const postCount = db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number };
  if (postCount.count === 0) {
    const seedPosts = [
      {
        id: 'bp-1',
        slug: 'future-of-technical-seo-core-web-vitals',
        title: 'The Future of Technical SEO: How Core Web Vitals and Semantic Search Drive Organic Dominance',
        excerpt: 'Explore how modern search engines evaluate site architecture, interaction to next paint (INP), and structured entity schema to award first-page rankings in competitive markets.',
        content: `<h2>The Paradigm Shift in Search Algorithms</h2><p>Search engine optimization has permanently evolved from superficial keyword stuffing into a rigorous engineering discipline. Google and modern search platforms now reward sites that deliver instant interactivity, clean semantic document hierarchies, and clear structured knowledge graphs.</p><h3>Core Web Vitals & INP (Interaction to Next Paint)</h3><p>Page speed is no longer just a luxury metric—it directly dictates crawler budget and user conversion rates. Optimizing Interaction to Next Paint ensures that complex interactive elements respond within milliseconds without locking up the main browser thread.</p><blockquote>Prioritize data pipelines and Core Web Vitals before pouring capital into paid acquisition. Performance optimizations directly compound your organic and paid acquisition efficiency.</blockquote><h3>Structured Entity Schema</h3><p>By mapping out your organization's services, articles, and thought leaders with JSON-LD linked data schemas, you provide search crawlers with unambiguous machine-readable context, cementing topical authority across competitive commercial queries.</p>`,
        categorySlug: 'seo',
        authorId: 'auth_editorial',
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: 'Artificial Intelligence and Search Algorithms Representation',
        isFeatured: 1,
        readingTime: '6 min read',
        status: 'published',
        publishedAt: '2025-10-24T10:00:00.000Z',
        tags: ['SEO', 'Core Web Vitals', 'Search Engine Optimization', 'Google Algorithms'],
      },
      {
        id: 'bp-2',
        slug: 'scaling-paid-ads-post-cookie-era',
        title: 'Mastering Paid Advertising in the Post-Cookie Era: First-Party Data & Server-Side Tracking',
        excerpt: 'A comprehensive guide to configuring Meta CAPI, Google Enhanced Conversions, and predictive creative testing to maintain 5x+ ROAS despite browser privacy restrictions.',
        content: `<h2>The Attribution Crisis</h2><p>Browser restrictions, intelligent tracking prevention, and evolving consumer privacy regulations have fundamentally disrupted traditional browser-based tracking pixels. Media buyers relying solely on client-side tracking frequently experience 20-35% attribution gaps.</p><h3>Implementing Server-Side Conversions API (CAPI)</h3><p>Server-to-server tracking securely transmits verified purchase and lead events directly from your backend infrastructure to advertising network APIs. This bypasses ad-blockers and browser sandboxes, restoring signal fidelity for algorithmic bidding engines.</p><h3>High-Velocity Creative Testing Frameworks</h3><p>With algorithmic ad platforms automating audience targeting, your creative assets have become the primary lever for audience segmentation. Consistent testing of differentiated hooks, emotional angles, and problem-centric messaging ensures sustained return on ad spend without budget fatigue.</p>`,
        categorySlug: 'paid-advertising',
        authorId: 'auth_editorial',
        featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: 'Data Analytics and Performance Marketing Dashboard',
        isFeatured: 1,
        readingTime: '8 min read',
        status: 'published',
        publishedAt: '2025-11-02T10:00:00.000Z',
        tags: ['Paid Media', 'Meta Ads', 'Google Ads', 'ROAS', 'Tracking'],
      },
      {
        id: 'bp-3',
        slug: 'why-headless-architecture-wins-ecommerce',
        title: 'Why Headless E-commerce Architecture is the Secret Weapon for High-Volume Brands',
        excerpt: 'Discover how separating your frontend storefront from your backend e-commerce engine unlocks unmatched page speed, total design freedom, and elevated average order values.',
        content: `<h2>Monolithic vs. Headless E-commerce</h2><p>Traditional monolithic e-commerce platforms couple frontend user interfaces with backend business logic, payment handling, and database operations. While effective for startup merchants, high-growth brands inevitably hit wall after wall of performance bottlenecks and theme inflexibility.</p><h3>Speed Compounding Conversion Rates</h3><p>Decoupling the frontend using high-performance static or server-rendered frameworks yields sub-second page transitions. Every 100ms improvement in checkout and product catalog load times measurably uplifts completed transactions and average order value.</p><h3>Omnichannel Scalability</h3><p>A unified headless backend API allows your product catalog and inventory logic to power web stores, native mobile applications, social commerce feeds, and custom kiosks from a single source of truth without duplicated engineering overhead.</p>`,
        categorySlug: 'ecommerce',
        authorId: 'auth_architect',
        featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: 'Modern Web Architecture and Development Team Collaboration',
        isFeatured: 1,
        readingTime: '7 min read',
        status: 'published',
        publishedAt: '2025-11-14T10:00:00.000Z',
        tags: ['E-commerce', 'Headless Commerce', 'Next.js', 'Web Architecture'],
      },
    ];

    const insertPost = db.prepare(`
      INSERT INTO posts (
        id, title, slug, excerpt, content, featuredImage, featuredImageAlt,
        authorId, categoryId, status, publishedAt, isFeatured, readingTime,
        seoTitle, seoDescription, focusKeyword, canonicalUrl, ogTitle, ogDescription, ogImage,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertPostTag = db.prepare(`
      INSERT OR IGNORE INTO post_tags (postId, tagId) VALUES (?, ?)
    `);

    const insertTag = db.prepare(`
      INSERT OR IGNORE INTO tags (id, name, slug, createdAt) VALUES (?, ?, ?, ?)
    `);

    seedPosts.forEach((post) => {
      const cat = db.prepare('SELECT id FROM categories WHERE slug = ?').get(post.categorySlug) as { id: string } | undefined;
      const categoryId = cat ? cat.id : null;
      const now = new Date().toISOString();

      insertPost.run(
        post.id,
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.featuredImage,
        post.featuredImageAlt,
        post.authorId,
        categoryId,
        post.status,
        post.publishedAt,
        post.isFeatured,
        post.readingTime,
        post.title,
        post.excerpt,
        post.tags[0] || 'InfosBrain',
        `https://infosbrain.com/blog/${post.slug}`,
        post.title,
        post.excerpt,
        post.featuredImage,
        now,
        now
      );

      post.tags.forEach((tagName) => {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const tagId = 'tag_' + tagSlug;
        insertTag.run(tagId, tagName, tagSlug, now);
        insertPostTag.run(post.id, tagId);
      });
    });
  }

  // 6. Seed representative form inquiries if none or few exist
  const inqCount = db.prepare('SELECT COUNT(*) as count FROM inquiries').get() as { count: number };
  if (inqCount.count < 5) {
    const seedInquiries = [
      {
        id: 'inq_contact_1',
        name: 'Marcus Sterling',
        business: 'Vanguard Retail Systems',
        email: 'marcus@vanguardretail.co.uk',
        phone: '+44 20 7946 0912',
        service: 'Enterprise Headless Platform',
        budget: '£40,000 - £75,000',
        projectDetails: '[Timeline: Immediate (1-2 months)] [NDA Requested: Yes]\n\nPlanning a comprehensive overhaul of our high-volume multi-brand storefront. Need Next.js SSR frontend and microservices backend with SAP integration.',
        source: 'Website Contact Page',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'inq_consult_1',
        name: 'Dr. Evelyn Reed',
        business: 'BioGen Diagnostics',
        email: 'ereed@biogendiagnostics.com',
        phone: '+1 (415) 555-0198',
        service: 'Cybersecurity & ISO/GDPR Compliance',
        budget: 'Consultation',
        projectDetails: '[Requested Time: Tomorrow, 2:00 PM GMT]\n\nNeed technical advisory on HIPAA/GDPR certified cloud data pipeline architecture before clinical trial rollout.',
        source: 'Consultation Modal',
        status: 'Contacted',
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: 'inq_ai_1',
        name: 'Tariq Mansoor',
        business: 'Apex Logistics Global',
        email: 'tmansoor@apexlogistics.ae',
        phone: '+971 4 312 8890',
        service: 'AI Solution: Autonomous AI Agents & Task Orchestration',
        budget: '$30,000 - $50,000',
        projectDetails: 'Feasibility scoping request: Automate dispatch routing, customs paperwork validation, and exception handling using multi-agent workflows.',
        source: 'AI Feasibility Scoping (Autonomous AI Agents)',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'inq_home_1',
        name: 'Sofia Al-Hassan',
        business: 'FinTech Horizons',
        email: 'sofia@fintechhorizons.qa',
        phone: '+974 4412 3456',
        service: 'Custom Software Development',
        budget: '$50,000+',
        projectDetails: 'Looking for senior React & Node.js engineering squad to accelerate launch of our digital banking onboarding portal.',
        source: 'Homepage Contact Section (CONSULTATION)',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      },
      {
        id: 'inq_career_1',
        name: 'David K. Osei',
        business: 'Experience: 5-8 Years',
        email: 'david.osei@devcloud.tech',
        phone: '+233 24 456 7890',
        service: 'Career: Senior Cloud Platform Engineer',
        budget: 'Engineering',
        projectDetails: '[Role Applied: Senior Cloud Platform Engineer (DevOps & Infrastructure, Remote EMEA)]\n[Portfolio: https://github.com/david-cloud]\n\nExperienced in Terraform, Kubernetes, and automated zero-downtime CI/CD pipelines.',
        source: 'Careers Application (Senior Cloud Platform Engineer)',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'inq_news_1',
        name: 'Newsletter Subscriber',
        business: '',
        email: 'insights.subscriber@cloudpulse.io',
        phone: '',
        service: 'Blog Newsletter Subscription',
        budget: 'Subscriber',
        projectDetails: 'Subscribed to Weekly Executive Briefings & Technical Insights from Blog page.',
        source: 'Blog Newsletter Form',
        status: 'Converted',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ];

    const insertInq = db.prepare(`
      INSERT OR IGNORE INTO inquiries (
        id, name, business, email, phone, service, budget, projectDetails, source, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    seedInquiries.forEach((item) => {
      insertInq.run(
        item.id,
        item.name,
        item.business,
        item.email,
        item.phone,
        item.service,
        item.budget,
        item.projectDetails,
        item.source,
        item.status,
        item.createdAt,
        item.createdAt
      );
    });
  }
}

// Run initial seed on load
seedDatabase();

export default db;
