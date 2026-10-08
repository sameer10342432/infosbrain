import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const dist404 = path.resolve(distDir, '404.html');

const redirectHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>InfosBrain | Loading...</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
`;

if (fs.existsSync(distDir)) {
  fs.writeFileSync(dist404, redirectHtml, 'utf8');
  console.log('[Build] Successfully generated dist/404.html with SPA redirect for GitHub Pages');

  const assetDir = path.resolve(process.cwd(), 'Asset');
  if (fs.existsSync(assetDir)) {
    const distAssets = path.resolve(distDir, 'assets');
    fs.cpSync(assetDir, distAssets, { recursive: true });

    // Also support .jpg and global-presence-bg extensions in dist/assets for static deployments
    if (fs.existsSync(distAssets)) {
      const files = fs.readdirSync(distAssets);
      files.forEach(f => {
        if (f.endsWith('.png')) {
          const jpgName = f.replace(/\.png$/, '.jpg');
          const jpgPath = path.join(distAssets, jpgName);
          if (!fs.existsSync(jpgPath)) {
            fs.copyFileSync(path.join(distAssets, f), jpgPath);
          }
        }
      });
      const gpPng = path.join(distAssets, 'global-presence.png');
      const gpBgJpg = path.join(distAssets, 'global-presence-bg.jpg');
      const gpBgPng = path.join(distAssets, 'global-presence-bg.png');
      if (fs.existsSync(gpPng)) {
        if (!fs.existsSync(gpBgJpg)) fs.copyFileSync(gpPng, gpBgJpg);
        if (!fs.existsSync(gpBgPng)) fs.copyFileSync(gpPng, gpBgPng);
      }
    }

    const distAssetCap = path.resolve(distDir, 'Asset');
    if (!fs.existsSync(distAssetCap)) {
      fs.cpSync(distAssets, distAssetCap, { recursive: true });
    }

    console.log('[Build] Successfully synchronized Asset/ into dist/assets and dist/Asset');
  }

  // Ensure Hostinger deployment files (.htaccess, robots.txt, sitemap.xml) are present in dist/
  const publicDir = path.resolve(process.cwd(), 'public');
  ['.htaccess', 'robots.txt', 'sitemap.xml', 'favicon.svg'].forEach(file => {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
  // Copy data directory to dist/data for SQLite availability on Hostinger
  const dataDir = path.resolve(process.cwd(), 'data');
  const distDataDir = path.resolve(distDir, 'data');
  if (fs.existsSync(dataDir)) {
    fs.mkdirSync(distDataDir, { recursive: true });
    const dbSrc = path.join(dataDir, 'infosbrain.db');
    if (fs.existsSync(dbSrc)) {
      fs.copyFileSync(dbSrc, path.join(distDataDir, 'infosbrain.db'));
    }
  }

  // Generate static API endpoints for static hosting environments (Hostinger / GitHub Pages)
  try {
    const dbPath = path.resolve(process.cwd(), 'data', 'infosbrain.db');
    if (fs.existsSync(dbPath)) {
      const { default: Database } = await import('better-sqlite3');
      const db = new Database(dbPath);
      const teamRows = db.prepare(`
        SELECT * FROM team_members
        WHERE LOWER(status) IN ('published', 'active', 'visible')
           OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();

      const normalizeCat = (cat) => {
        if (!cat) return 'leadership';
        const c = String(cat).trim().toLowerCase();
        if (c.includes('leadership') || c.includes('executive') || c.includes('showcase') || c === 'lead' || c === 'director') return 'leadership';
        return 'team';
      };

      const formattedTeam = teamRows.map(r => ({
        ...r,
        category: normalizeCat(r.category),
        achievements: r.achievements ? JSON.parse(r.achievements) : [],
        skills: r.skills ? JSON.parse(r.skills) : [],
        role: r.designation,
        imageUrl: r.profileImage,
        bio: r.bio || ''
      }));

      const leadership = formattedTeam.filter(m => m.category === 'leadership');
      const teamMembers = formattedTeam.filter(m => m.category === 'team');

      const teamPayload = {
        members: formattedTeam,
        leadership,
        teamMembers
      };

      const apiDir = path.resolve(distDir, 'api');
      const cmsDir = path.resolve(apiDir, 'cms');
      fs.mkdirSync(cmsDir, { recursive: true });

      const publicApiDir = path.resolve(process.cwd(), 'public', 'api');
      const publicCmsDir = path.resolve(publicApiDir, 'cms');
      fs.mkdirSync(publicCmsDir, { recursive: true });

      const teamJsonContent = JSON.stringify(teamPayload, null, 2);
      fs.writeFileSync(path.join(apiDir, 'team.json'), teamJsonContent, 'utf8');
      fs.writeFileSync(path.join(apiDir, 'team'), teamJsonContent, 'utf8');
      fs.writeFileSync(path.join(publicApiDir, 'team.json'), teamJsonContent, 'utf8');
      fs.writeFileSync(path.join(publicApiDir, 'team'), teamJsonContent, 'utf8');

      // 2. Services
      const serviceRows = db.prepare(`
        SELECT * FROM services
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();
      const formattedServices = serviceRows.map((r) => ({
        ...r,
        featured: Boolean(r.featured),
        features: r.features ? JSON.parse(r.features) : [],
        benefits: r.benefits ? JSON.parse(r.benefits) : [],
        deliverables: r.deliverables ? JSON.parse(r.deliverables) : [],
        technologies: r.technologies ? JSON.parse(r.technologies) : [],
        process: r.process ? JSON.parse(r.process) : [],
        faqs: r.faqs ? JSON.parse(r.faqs) : [],
      }));

      // 3. Testimonials
      const testRows = db.prepare(`
        SELECT * FROM testimonials
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();

      // 4. FAQs
      const faqRows = db.prepare(`
        SELECT * FROM faqs
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();

      // 5. Locations
      const locRows = db.prepare(`
        SELECT * FROM locations
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();
      const formattedLocs = locRows.map((r) => ({
        ...r,
        coordinates: r.coordinates ? JSON.parse(r.coordinates) : { x: 50, y: 50 },
        servicesProvided: r.servicesProvided ? JSON.parse(r.servicesProvided) : [],
      }));

      // 6. Case Studies
      const caseRows = db.prepare(`
        SELECT * FROM case_studies
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();
      const formattedCases = caseRows.map((r) => ({
        ...r,
        services: r.services ? JSON.parse(r.services) : [],
        results: r.results ? JSON.parse(r.results) : [],
        technologies: r.technologies ? JSON.parse(r.technologies) : [],
      }));

      // 7. Careers
      const careerRows = db.prepare(`
        SELECT * FROM careers
        WHERE LOWER(status) IN ('published', 'active', 'visible') OR status IS NULL
        ORDER BY displayOrder ASC, createdAt ASC
      `).all();
      const formattedCareers = careerRows.map((r) => ({
        ...r,
        requirements: r.requirements ? JSON.parse(r.requirements) : [],
        responsibilities: r.responsibilities ? JSON.parse(r.responsibilities) : [],
      }));

      // 8. Sections & Settings
      const sectionRows = db.prepare('SELECT * FROM sections ORDER BY displayOrder ASC').all();
      const sectionsByKey = {};
      sectionRows.forEach((s) => {
        sectionsByKey[s.sectionKey] = { ...s, isVisible: s.status === 'visible' };
      });
      const settingRows = db.prepare('SELECT key, value FROM settings').all();
      const settingsObj = {};
      settingRows.forEach((s) => {
        settingsObj[s.key] = s.value;
      });

      // Write dist/api/cms/all and public/api/cms/all
      const cmsAllPayload = {
        members: formattedTeam,
        leadership,
        teamMembers,
        services: formattedServices,
        testimonials: testRows,
        faqs: faqRows,
        locations: formattedLocs,
        caseStudies: formattedCases,
        careers: formattedCareers,
        sections: sectionsByKey,
        settings: settingsObj,
      };
      const cmsAllJsonContent = JSON.stringify(cmsAllPayload, null, 2);
      fs.writeFileSync(path.join(cmsDir, 'all.json'), cmsAllJsonContent, 'utf8');
      fs.writeFileSync(path.join(cmsDir, 'all'), cmsAllJsonContent, 'utf8');
      fs.writeFileSync(path.join(publicCmsDir, 'all.json'), cmsAllJsonContent, 'utf8');
      fs.writeFileSync(path.join(publicCmsDir, 'all'), cmsAllJsonContent, 'utf8');

      // Sync router.php to dist/api/router.php
      const routerPhpSrc = path.join(publicApiDir, 'router.php');
      if (fs.existsSync(routerPhpSrc)) {
        fs.copyFileSync(routerPhpSrc, path.join(apiDir, 'router.php'));
      }

      console.log(`[Build] Successfully generated static API endpoints for ${formattedTeam.length} published team members and all CMS tables in dist/api and public/api`);
      db.close();
    }
  } catch (err) {
    console.warn('[Build] Warning generating static API endpoints:', err.message);
  }
}


