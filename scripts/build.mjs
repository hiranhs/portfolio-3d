import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const publicAssetsDir = path.join(rootDir, 'public', 'assets');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export async function buildPortfolio({ isDev = false } = {}) {
  const start = Date.now();
  fs.mkdirSync(distAssetsDir, { recursive: true });

  // 1. Bundle React + TypeScript + Three.js + EmailJS + Lucide via esbuild
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src', 'main.tsx')],
    bundle: true,
    format: 'esm',
    target: ['es2020'],
    jsx: 'automatic',
    minify: !isDev,
    sourcemap: isDev,
    outfile: path.join(distAssetsDir, 'app.js'),
    define: {
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    },
    loader: {
      '.css': 'empty',
    },
  });

  // 2. Compile Tailwind CSS via PostCSS programmatically
  const cssInputPath = path.join(rootDir, 'src', 'index.css');
  const rawCss = fs.readFileSync(cssInputPath, 'utf8');
  const tailwindConfigPath = path.join(rootDir, 'tailwind.config.js');
  const cssResult = await postcss([
    tailwindcss(tailwindConfigPath),
    autoprefixer(),
  ]).process(rawCss, {
    from: cssInputPath,
    to: path.join(distAssetsDir, 'style.css'),
  });
  fs.writeFileSync(path.join(distAssetsDir, 'style.css'), cssResult.css, 'utf8');

  // 3. Copy public/assets -> dist/assets
  copyDirRecursive(publicAssetsDir, distAssetsDir);

  // 4. Generate dist/index.html with clean relative asset links (GitHub Pages ready)
  const rawHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const builtHtml = rawHtml
    .replace('href="/assets/favicon.svg?v=2"', 'href="./assets/favicon.svg?v=2"')
    .replace(
      '</head>',
      '    <link rel="stylesheet" href="./assets/style.css" />\n  </head>'
    )
    .replace(
      '<script type="module" src="/src/main.tsx"></script>',
      '<script type="module" src="./assets/app.js"></script>'
    );

  fs.writeFileSync(path.join(distDir, 'index.html'), builtHtml, 'utf8');

  const jsSizeKb = (fs.statSync(path.join(distAssetsDir, 'app.js')).size / 1024).toFixed(1);
  const cssSizeKb = (fs.statSync(path.join(distAssetsDir, 'style.css')).size / 1024).toFixed(1);
  console.log(
    `[build] Built dist/ in ${Date.now() - start}ms — app.js (${jsSizeKb} KB), style.css (${cssSizeKb} KB)`
  );
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectRun) {
  buildPortfolio({ isDev: false }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
