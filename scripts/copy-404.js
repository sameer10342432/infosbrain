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
}
