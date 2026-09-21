import { Router, Request, Response } from 'express';
import db from '../db/index.js';

const router = Router();

// GET /sitemap.xml
router.get('/sitemap.xml', (_req: Request, res: Response) => {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://infosbrain.com').replace(/\/$/, '');

  const staticPages = [
    { loc: '', changefreq: 'daily', priority: '1.0' },
    { loc: '/services', changefreq: 'weekly', priority: '0.9' },
    { loc: '/ai-solutions', changefreq: 'weekly', priority: '0.9' },
    { loc: '/case-studies', changefreq: 'weekly', priority: '0.8' },
    { loc: '/blog', changefreq: 'daily', priority: '0.8' },
    { loc: '/about', changefreq: 'monthly', priority: '0.7' },
    { loc: '/industries', changefreq: 'monthly', priority: '0.7' },
    { loc: '/careers', changefreq: 'weekly', priority: '0.6' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  ];

  // Fetch only published posts
  const posts = db.prepare(`
    SELECT slug, publishedAt, updatedAt
    FROM posts
    WHERE status = 'published'
    ORDER BY publishedAt DESC
  `).all() as { slug: string; publishedAt: string; updatedAt: string }[];

  const xmlUrls = [
    ...staticPages.map(
      (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...posts.map((post) => {
      const lastMod = (post.updatedAt || post.publishedAt || new Date().toISOString()).split('T')[0];
      return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// GET /rss.xml
router.get('/rss.xml', (_req: Request, res: Response) => {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://infosbrain.com').replace(/\/$/, '');

  const posts = db.prepare(`
    SELECT posts.title, posts.slug, posts.excerpt, posts.publishedAt, categories.name as categoryName
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    WHERE posts.status = 'published'
    ORDER BY posts.publishedAt DESC
    LIMIT 30
  `).all() as any[];

  const items = posts
    .map((p) => {
      const pubDate = p.publishedAt ? new Date(p.publishedAt).toUTCString() : new Date().toUTCString();
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <guid>${baseUrl}/blog/${p.slug}</guid>
      <description><![CDATA[${p.excerpt || ''}]]></description>
      <category><![CDATA[${p.categoryName || 'Technology'}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>InfosBrain - Technical Intelligence &amp; Growth Insights</title>
    <link>${baseUrl}/blog</link>
    <description>Tactical briefings on enterprise architecture, SEO algorithms, and digital scale.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  res.header('Content-Type', 'application/rss+xml');
  res.send(rss);
});

export default router;
