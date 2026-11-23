import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPortfolio } from './build.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 5173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
  '.map': 'application/json',
};

const watchMode = !process.argv.includes('--preview');

await buildPortfolio({ isDev: watchMode });

if (watchMode) {
  let timer = null;
  const triggerRebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      buildPortfolio({ isDev: true }).catch((err) => console.error('[rebuild error]', err));
    }, 120);
  };

  fs.watch(path.join(rootDir, 'src'), { recursive: true }, triggerRebuild);
  fs.watch(path.join(rootDir, 'index.html'), triggerRebuild);
}

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url || '/', `http://localhost:${port}`);
  let relPath = decodeURIComponent(reqUrl.pathname);
  if (relPath === '/' || relPath === '') relPath = '/index.html';

  const filePath = path.normalize(path.join(distDir, relPath));
  if (!filePath.startsWith(distDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const fallback = path.join(distDir, 'index.html');
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    fs.createReadStream(fallback).pipe(res);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n  3D Portfolio running at: http://localhost:${port}/\n`);
});
