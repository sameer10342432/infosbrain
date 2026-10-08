import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function expressApiPlugin(): Plugin {
  return {
    name: 'express-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (
          url.startsWith('/api') ||
          url.startsWith('/uploads') ||
          url.startsWith('/assets') ||
          url.startsWith('/Asset') ||
          url.startsWith('/sitemap.xml') ||
          url.startsWith('/rss.xml')
        ) {
          try {
            const { default: app } = await import('./server/app.ts');
            app(req as any, res as any, next);
          } catch (err) {
            console.error('[API Middleware Error]', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal server error in API middleware' }));
            }
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    base: process.env.VITE_BASE || (process.env.GITHUB_ACTIONS ? '/infosbrain/' : '/'),
    plugins: [react(), tailwindcss(), expressApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2022',
      },
    },
    build: {
      target: 'es2022',
    },
  };
});

