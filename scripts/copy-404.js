import fs from 'fs';
import path from 'path';

const distIndex = path.resolve(process.cwd(), 'dist', 'index.html');
const dist404 = path.resolve(process.cwd(), 'dist', '404.html');

if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404);
  console.log('[Build] Successfully generated dist/404.html for SPA static hosting');
}
