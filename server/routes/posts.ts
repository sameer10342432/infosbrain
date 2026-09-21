import { Router, Response } from 'express';
import db from '../db/index.js';
import { requireAdmin, optionalAdmin, AuthenticatedRequest } from '../auth.js';

const router = Router();

// Helper to generate a clean URL slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Ensure unique slug in database
export function ensureUniqueSlug(title: string, currentId?: string): string {
  const baseSlug = slugify(title) || 'untitled-post';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = db
      .prepare('SELECT id FROM posts WHERE slug = ?' + (currentId ? ' AND id != ?' : ''))
      .get(currentId ? [slug, currentId] : [slug]) as { id: string } | undefined;

    if (!existing) return slug;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

// Calculate reading time from HTML content
export function calculateReadingTime(html: string): string {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// -------------------------------------------------------------
// PUBLIC POSTS API
// -------------------------------------------------------------

// GET /api/posts - Get published posts
router.get('/', (req, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 12));
  const offset = (page - 1) * limit;
  const categorySlug = req.query.category as string | undefined;
  const tagSlug = req.query.tag as string | undefined;
  const search = req.query.search as string | undefined;
  const featured = req.query.featured === 'true';

  let whereClauses = ["posts.status = 'published'"];
  const params: any[] = [];

  if (categorySlug && categorySlug !== 'All' && categorySlug !== 'all') {
    whereClauses.push('(categories.slug = ? OR categories.name = ?)');
    params.push(categorySlug, categorySlug);
  }

  if (tagSlug) {
    whereClauses.push(`EXISTS (
      SELECT 1 FROM post_tags pt
      JOIN tags t ON pt.tagId = t.id
      WHERE pt.postId = posts.id AND (t.slug = ? OR t.name = ?)
    )`);
    params.push(tagSlug, tagSlug);
  }

  if (search && search.trim()) {
    whereClauses.push('(posts.title LIKE ? OR posts.excerpt LIKE ? OR posts.content LIKE ?)');
    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  if (featured) {
    whereClauses.push('posts.isFeatured = 1');
  }

  const whereSql = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

  // Get total count
  const countStmt = db.prepare(`
    SELECT COUNT(DISTINCT posts.id) as total
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    ${whereSql}
  `);
  const total = (countStmt.get(...params) as { total: number }).total;

  // Get posts
  const postsStmt = db.prepare(`
    SELECT
      posts.id, posts.title, posts.slug, posts.excerpt, posts.featuredImage, posts.featuredImageAlt,
      posts.publishedAt, posts.readingTime, posts.isFeatured, posts.createdAt,
      categories.name as categoryName, categories.slug as categorySlug,
      authors.name as authorName, authors.role as authorRole, authors.profileImage as authorImage
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    LEFT JOIN authors ON posts.authorId = authors.id
    ${whereSql}
    ORDER BY posts.publishedAt DESC, posts.createdAt DESC
    LIMIT ? OFFSET ?
  `);

  const rawPosts = postsStmt.all(...params, limit, offset) as any[];

  // Fetch tags for each post
  const postsWithTags = rawPosts.map((post) => {
    const tags = db.prepare(`
      SELECT t.id, t.name, t.slug
      FROM tags t
      JOIN post_tags pt ON pt.tagId = t.id
      WHERE pt.postId = ?
    `).all(post.id) as { id: string; name: string; slug: string }[];

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.categoryName || 'General',
      categorySlug: post.categorySlug || 'general',
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      readTime: post.readingTime || '5 min read',
      author: post.authorName || 'InfosBrain Team',
      authorRole: post.authorRole || '',
      authorImage: post.authorImage || '',
      imageUrl: post.featuredImage || '',
      imageAlt: post.featuredImageAlt || post.title,
      isFeatured: Boolean(post.isFeatured),
      tags: tags.map((t) => t.name),
      tagSlugs: tags.map((t) => t.slug),
    };
  });

  res.json({
    posts: postsWithTags,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /api/posts/:slug - Get post details
router.get('/:slug', optionalAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { slug } = req.params;
  const isPreview = req.query.preview === 'true';

  let postQuery = `
    SELECT
      posts.*,
      categories.name as categoryName, categories.slug as categorySlug,
      authors.name as authorName, authors.role as authorRole, authors.bio as authorBio,
      authors.profileImage as authorImage, authors.socialLinks as authorSocial
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    LEFT JOIN authors ON posts.authorId = authors.id
    WHERE posts.slug = ?
  `;

  // If not admin and not previewing with valid admin token, only return published posts
  if (!req.user || !isPreview) {
    postQuery += " AND posts.status = 'published'";
  }

  const post = db.prepare(postQuery).get(slug) as any;

  if (!post) {
    res.status(404).json({ error: 'Post not found.' });
    return;
  }

  // Fetch tags
  const tags = db.prepare(`
    SELECT t.id, t.name, t.slug
    FROM tags t
    JOIN post_tags pt ON pt.tagId = t.id
    WHERE pt.postId = ?
  `).all(post.id) as { id: string; name: string; slug: string }[];

  // Fetch related posts (same category or common tags)
  const relatedPosts = db.prepare(`
    SELECT
      posts.id, posts.title, posts.slug, posts.excerpt, posts.featuredImage,
      posts.publishedAt, posts.readingTime,
      categories.name as categoryName
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    WHERE posts.status = 'published' AND posts.id != ?
      AND (posts.categoryId = ? OR posts.categoryId IS NOT NULL)
    ORDER BY (posts.categoryId = ?) DESC, posts.publishedAt DESC
    LIMIT 3
  `).all(post.id, post.categoryId, post.categoryId) as any[];

  res.json({
    post: {
      ...post,
      category: post.categoryName || 'General',
      author: {
        name: post.authorName || 'InfosBrain Team',
        role: post.authorRole || '',
        bio: post.authorBio || '',
        profileImage: post.authorImage || '',
        socialLinks: post.authorSocial ? JSON.parse(post.authorSocial) : {},
      },
      tags: tags.map((t) => t.name),
      tagItems: tags,
      formattedDate: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
    },
    relatedPosts: relatedPosts.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      imageUrl: r.featuredImage,
      category: r.categoryName || 'General',
      readTime: r.readingTime || '5 min read',
      date: r.publishedAt
        ? new Date(r.publishedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
    })),
  });
});

// -------------------------------------------------------------
// ADMIN POSTS API (PROTECTED)
// -------------------------------------------------------------

// GET /api/admin/posts - Admin list posts
router.get('/admin/all', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
  const offset = (page - 1) * limit;

  const status = req.query.status as string | undefined;
  const categoryId = req.query.categoryId as string | undefined;
  const authorId = req.query.authorId as string | undefined;
  const search = req.query.search as string | undefined;
  const sort = (req.query.sort as string) || 'newest';

  let whereClauses: string[] = [];
  const params: any[] = [];

  if (status && status !== 'all') {
    whereClauses.push('posts.status = ?');
    params.push(status);
  }

  if (categoryId && categoryId !== 'all') {
    whereClauses.push('posts.categoryId = ?');
    params.push(categoryId);
  }

  if (authorId && authorId !== 'all') {
    whereClauses.push('posts.authorId = ?');
    params.push(authorId);
  }

  if (search && search.trim()) {
    whereClauses.push('(posts.title LIKE ? OR posts.slug LIKE ? OR posts.excerpt LIKE ?)');
    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  const whereSql = whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : '';

  let orderSql = 'ORDER BY posts.createdAt DESC';
  if (sort === 'oldest') orderSql = 'ORDER BY posts.createdAt ASC';
  else if (sort === 'updated') orderSql = 'ORDER BY posts.updatedAt DESC';
  else if (sort === 'alphabetical') orderSql = 'ORDER BY posts.title ASC';
  else if (sort === 'published') orderSql = 'ORDER BY posts.publishedAt DESC';

  const countStmt = db.prepare(`SELECT COUNT(*) as total FROM posts ${whereSql}`);
  const total = (countStmt.get(...params) as { total: number }).total;

  const listStmt = db.prepare(`
    SELECT
      posts.id, posts.title, posts.slug, posts.status, posts.isFeatured,
      posts.publishedAt, posts.scheduledAt, posts.createdAt, posts.updatedAt,
      posts.readingTime, posts.featuredImage,
      categories.name as categoryName,
      authors.name as authorName
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    LEFT JOIN authors ON posts.authorId = authors.id
    ${whereSql}
    ${orderSql}
    LIMIT ? OFFSET ?
  `);

  const posts = listStmt.all(...params, limit, offset);

  res.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /api/admin/posts/:id - Get single post for editor
router.get('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const post = db.prepare(`
    SELECT posts.*, categories.name as categoryName, authors.name as authorName
    FROM posts
    LEFT JOIN categories ON posts.categoryId = categories.id
    LEFT JOIN authors ON posts.authorId = authors.id
    WHERE posts.id = ?
  `).get(id) as any;

  if (!post) {
    res.status(404).json({ error: 'Post not found.' });
    return;
  }

  const tags = db.prepare(`
    SELECT t.id, t.name, t.slug
    FROM tags t
    JOIN post_tags pt ON pt.tagId = t.id
    WHERE pt.postId = ?
  `).all(id) as { id: string; name: string; slug: string }[];

  res.json({
    post: {
      ...post,
      tags: tags.map((t) => t.name),
      isFeatured: Boolean(post.isFeatured),
      robotsIndex: Boolean(post.robotsIndex),
      robotsFollow: Boolean(post.robotsFollow),
    },
  });
});

// POST /api/admin/posts - Create post
router.post('/admin', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const {
    title,
    slug: rawSlug,
    excerpt,
    content,
    featuredImage,
    featuredImageAlt,
    authorId,
    categoryId,
    status = 'draft',
    publishedAt: reqPubAt,
    scheduledAt,
    isFeatured = false,
    readingTime: reqReadingTime,
    seoTitle,
    seoDescription,
    focusKeyword,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    robotsIndex = true,
    robotsFollow = true,
    tags = [],
  } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Title is required.' });
    return;
  }

  const id = 'post_' + Math.random().toString(36).substring(2, 10);
  const slug = ensureUniqueSlug(rawSlug ? String(rawSlug).trim() : title);
  const cleanContent = content || '';
  const readingTime = reqReadingTime || calculateReadingTime(cleanContent);
  const now = new Date().toISOString();

  let publishedAt = reqPubAt || null;
  if (status === 'published' && !publishedAt) {
    publishedAt = now;
  }

  db.prepare(`
    INSERT INTO posts (
      id, title, slug, excerpt, content, featuredImage, featuredImageAlt,
      authorId, categoryId, status, publishedAt, scheduledAt, isFeatured,
      readingTime, seoTitle, seoDescription, focusKeyword, canonicalUrl,
      ogTitle, ogDescription, ogImage, robotsIndex, robotsFollow,
      createdAt, updatedAt, createdBy, updatedBy
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    id,
    title.trim(),
    slug,
    excerpt ? excerpt.trim() : '',
    cleanContent,
    featuredImage || null,
    featuredImageAlt || null,
    authorId || null,
    categoryId || null,
    status,
    publishedAt,
    scheduledAt || null,
    isFeatured ? 1 : 0,
    readingTime,
    seoTitle || title.trim(),
    seoDescription || excerpt || '',
    focusKeyword || '',
    canonicalUrl || '',
    ogTitle || title.trim(),
    ogDescription || excerpt || '',
    ogImage || featuredImage || null,
    robotsIndex ? 1 : 0,
    robotsFollow ? 1 : 0,
    now,
    now,
    req.user!.name,
    req.user!.name
  );

  // Handle Tags
  handlePostTags(id, tags);

  res.status(201).json({
    success: true,
    id,
    slug,
    message: status === 'published' ? 'Post published successfully!' : 'Post saved successfully!',
  });
});

// PUT /api/admin/posts/:id - Update post
router.put('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT id, slug, status, publishedAt FROM posts WHERE id = ?').get(id) as any;

  if (!existing) {
    res.status(404).json({ error: 'Post not found.' });
    return;
  }

  const {
    title,
    slug: rawSlug,
    excerpt,
    content,
    featuredImage,
    featuredImageAlt,
    authorId,
    categoryId,
    status = existing.status,
    publishedAt: reqPubAt,
    scheduledAt,
    isFeatured,
    readingTime: reqReadingTime,
    seoTitle,
    seoDescription,
    focusKeyword,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    robotsIndex,
    robotsFollow,
    tags,
  } = req.body;

  if (!title || !title.trim()) {
    res.status(400).json({ error: 'Title is required.' });
    return;
  }

  const slug = rawSlug ? ensureUniqueSlug(String(rawSlug).trim(), id) : existing.slug;
  const cleanContent = content !== undefined ? content : '';
  const readingTime = reqReadingTime || calculateReadingTime(cleanContent);
  const now = new Date().toISOString();

  let publishedAt = reqPubAt !== undefined ? reqPubAt : existing.publishedAt;
  if (status === 'published' && !publishedAt) {
    publishedAt = now;
  }

  db.prepare(`
    UPDATE posts SET
      title = ?, slug = ?, excerpt = ?, content = ?, featuredImage = ?, featuredImageAlt = ?,
      authorId = ?, categoryId = ?, status = ?, publishedAt = ?, scheduledAt = ?, isFeatured = ?,
      readingTime = ?, seoTitle = ?, seoDescription = ?, focusKeyword = ?, canonicalUrl = ?,
      ogTitle = ?, ogDescription = ?, ogImage = ?, robotsIndex = ?, robotsFollow = ?,
      updatedAt = ?, updatedBy = ?
    WHERE id = ?
  `).run(
    title.trim(),
    slug,
    excerpt ? excerpt.trim() : '',
    cleanContent,
    featuredImage || null,
    featuredImageAlt || null,
    authorId || null,
    categoryId || null,
    status,
    publishedAt,
    scheduledAt || null,
    isFeatured ? 1 : 0,
    readingTime,
    seoTitle || title.trim(),
    seoDescription || excerpt || '',
    focusKeyword || '',
    canonicalUrl || '',
    ogTitle || title.trim(),
    ogDescription || excerpt || '',
    ogImage || featuredImage || null,
    robotsIndex === false ? 0 : 1,
    robotsFollow === false ? 0 : 1,
    now,
    req.user!.name,
    id
  );

  if (tags && Array.isArray(tags)) {
    handlePostTags(id, tags);
  }

  res.json({
    success: true,
    id,
    slug,
    message: status === 'published' ? 'Post updated and published!' : 'Post updated successfully!',
  });
});

// DELETE /api/admin/posts/:id - Delete post
router.delete('/admin/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
  res.json({ success: true, message: 'Post deleted successfully.' });
});

// POST /api/admin/posts/:id/duplicate - Duplicate post
router.post('/admin/:id/duplicate', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const original = db.prepare('SELECT * FROM posts WHERE id = ?').get(id) as any;

  if (!original) {
    res.status(404).json({ error: 'Post not found.' });
    return;
  }

  const newId = 'post_' + Math.random().toString(36).substring(2, 10);
  const newTitle = `${original.title} (Copy)`;
  const newSlug = ensureUniqueSlug(newTitle);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO posts (
      id, title, slug, excerpt, content, featuredImage, featuredImageAlt,
      authorId, categoryId, status, publishedAt, scheduledAt, isFeatured,
      readingTime, seoTitle, seoDescription, focusKeyword, canonicalUrl,
      ogTitle, ogDescription, ogImage, robotsIndex, robotsFollow,
      createdAt, updatedAt, createdBy, updatedBy
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, 'draft', null, null, 0,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `).run(
    newId,
    newTitle,
    newSlug,
    original.excerpt,
    original.content,
    original.featuredImage,
    original.featuredImageAlt,
    original.authorId,
    original.categoryId,
    original.readingTime,
    newTitle,
    original.seoDescription,
    original.focusKeyword,
    '',
    newTitle,
    original.ogDescription,
    original.ogImage,
    original.robotsIndex,
    original.robotsFollow,
    now,
    now,
    req.user!.name,
    req.user!.name
  );

  // Copy tags
  const origTags = db.prepare('SELECT tagId FROM post_tags WHERE postId = ?').all(id) as { tagId: string }[];
  const insertPostTag = db.prepare('INSERT INTO post_tags (postId, tagId) VALUES (?, ?)');
  origTags.forEach((t) => insertPostTag.run(newId, t.tagId));

  res.json({
    success: true,
    id: newId,
    slug: newSlug,
    message: 'Post duplicated successfully as Draft.',
  });
});

// POST /api/admin/posts/bulk - Bulk action
router.post('/admin/bulk', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { action, ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400).json({ error: 'No posts selected.' });
    return;
  }

  const now = new Date().toISOString();

  if (action === 'delete') {
    const delStmt = db.prepare('DELETE FROM posts WHERE id = ?');
    db.transaction(() => {
      ids.forEach((id) => delStmt.run(id));
    })();
    res.json({ success: true, message: `Deleted ${ids.length} post(s).` });
  } else if (action === 'publish') {
    const pubStmt = db.prepare("UPDATE posts SET status = 'published', publishedAt = COALESCE(publishedAt, ?), updatedAt = ? WHERE id = ?");
    db.transaction(() => {
      ids.forEach((id) => pubStmt.run(now, now, id));
    })();
    res.json({ success: true, message: `Published ${ids.length} post(s).` });
  } else if (action === 'unpublish') {
    const unpubStmt = db.prepare("UPDATE posts SET status = 'draft', updatedAt = ? WHERE id = ?");
    db.transaction(() => {
      ids.forEach((id) => unpubStmt.run(now, id));
    })();
    res.json({ success: true, message: `Unpublished ${ids.length} post(s).` });
  } else if (action === 'archive') {
    const archStmt = db.prepare("UPDATE posts SET status = 'archived', updatedAt = ? WHERE id = ?");
    db.transaction(() => {
      ids.forEach((id) => archStmt.run(now, id));
    })();
    res.json({ success: true, message: `Archived ${ids.length} post(s).` });
  } else {
    res.status(400).json({ error: 'Invalid bulk action.' });
  }
});

// Helper for managing tag relationships
function handlePostTags(postId: string, tags: string[]) {
  // Clear existing
  db.prepare('DELETE FROM post_tags WHERE postId = ?').run(postId);

  const insertTag = db.prepare('INSERT OR IGNORE INTO tags (id, name, slug, createdAt) VALUES (?, ?, ?, ?)');
  const insertPostTag = db.prepare('INSERT OR IGNORE INTO post_tags (postId, tagId) VALUES (?, ?)');
  const now = new Date().toISOString();

  tags.forEach((tag) => {
    const name = String(tag).trim();
    if (!name) return;
    const slug = slugify(name);
    const tagId = 'tag_' + slug;

    insertTag.run(tagId, name, slug, now);
    insertPostTag.run(postId, tagId);
  });
}

export default router;
