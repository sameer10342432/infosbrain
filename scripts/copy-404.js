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
  console.log('[Build] Successfully verified Hostinger .htaccess, robots.txt, and sitemap.xml in dist/');
}

