# InfosBrain - Digital Technology & Marketing Agency

Production website for **InfosBrain** featuring a complete, secure **Admin Panel** and **Blog CMS**, embedded **SQLite database**, **Media Library**, **Contact Inquiries CRM**, and dynamic **XML Sitemap & RSS Feed** generation.

---

## Architecture Overview

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, TipTap Rich Text Editor.
- **Backend**: Node.js, Express, Better-SQLite3, Multer, Bcrypt, JWT, Nodemailer.
- **Database**: Embedded SQLite (`data/infosbrain.db`) with WAL mode and foreign key integrity.
- **Development**: Unified Vite Dev Server (`npm run dev`) with automated Express API middleware mounting.
- **Production**: Standalone Node.js server (`npm start`) serving static assets and API routes.

---

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Key variables:
- `ADMIN_EMAIL`: Initial administrator email (default: `admin@infosbrain.com`)
- `ADMIN_PASSWORD`: Initial administrator password (default: `Admin@123456`)
- `AUTH_SECRET`: Secret key for JWT session tokens
- `NEXT_PUBLIC_SITE_URL`: Base URL (e.g. `http://localhost:3001` or `https://infosbrain.com`)
- `SMTP_*`: Optional SMTP settings for inquiry dispatch notifications

### 3. Run Locally

```bash
npm run dev
```

- Public Website: `http://localhost:3001` (or port 3000)
- Admin Login: `http://localhost:3001/admin/login`

---

## Admin Panel & CMS Portal

Access the CMS at:
**`/admin`** (or **`/admin/login`**)

### Default Initial Credentials:
- **Email**: `admin@infosbrain.com`
- **Password**: `Admin@123456`
*(Password can be updated anytime under `/admin/profile`)*

### Modules Available:
1. **Executive Dashboard** (`/admin/dashboard`): Real-time metrics on articles, drafts, scheduled posts, categories, tags, and new inquiries.
2. **Blog CMS** (`/admin/posts`):
   - Create, edit, duplicate, draft, publish, schedule, archive, and delete articles.
   - Auto-slug generator with manual override and uniqueness guarantee.
   - Full WYSIWYG TipTap rich editor (Headings, bold/italic, blockquotes, code blocks, lists, links, media).
   - Character guidance for SEO Titles (50-60 chars) and Meta Descriptions (150-160 chars).
   - OpenGraph and Twitter/X card metadata.
   - Featured article toggle for the homepage showcase.
   - Live preview mode simulation matching the public website.
3. **Categories** (`/admin/categories`): Full CRUD for blog categories with post count tracking.
4. **Tags** (`/admin/tags`): Manage micro-taxonomies and article tags.
5. **Authors** (`/admin/authors`): Manage practice directors and editorial contributors.
6. **Media Library** (`/admin/media`):
   - Secure drag-and-drop image uploader (JPG, PNG, WebP, SVG up to 5MB).
   - One-click image URL copying and direct post insertion.
7. **Contact Inquiries CRM** (`/admin/inquiries`):
   - Prospective client project briefs submitted via `/contact` and consultation modals.
   - Status tracking: `New`, `Contacted`, `In Progress`, `Converted`, `Closed`, `Spam`.
8. **Site Settings** (`/admin/settings`): Brand names, contact emails, default SEO tags, and social media channels.
9. **Admin Profile** (`/admin/profile`): Name, email, and secure password updates with current password verification.

---

## Scheduled Publishing & Cron

The server includes an automated background publisher that checks for posts scheduled to go live every 60 seconds.

For external scheduled tasks (e.g., cPanel Cron, curl, or GitHub Actions), trigger:
```bash
curl -X GET "https://yourdomain.com/api/cron/publish-scheduled?secret=YOUR_CRON_SECRET"
```

---

## Dynamic SEO & Feeds

- **Dynamic XML Sitemap**: `http://localhost:3001/sitemap.xml`
  *(Includes all core public pages and automatically adds newly published blog posts)*
- **Dynamic RSS Feed**: `http://localhost:3001/rss.xml`
  *(RSS 2.0 feed containing published technical briefings)*

---

## Production Build & Deployment

### Build Frontend
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

For cPanel or standard Node.js hosting:
1. Upload the project files to the server.
2. Run `npm install --omit=dev`.
3. Set your environment variables in `.env`.
4. Point the Node.js application startup file to `server/index.ts` (using `tsx`) or build output.
