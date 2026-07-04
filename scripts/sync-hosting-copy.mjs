import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { applyHostingCustomizations } from './hosting-customizations.mjs';

const origin = process.env.HOSTING_ORIGIN ?? 'https://timofeysyoh-850dd.web.app';
const outDir = process.env.HOSTING_COPY_DIR ?? 'hosting-copy';

const initialQueue = [
  '/',
  '/demos/jogicards/',
  '/demos/portfolio-site/index.html',
  '/demos/project-workshop/index.html',
];

const seen = new Set();
const queue = [...initialQueue];

function normalizePath(value, basePath = '/') {
  if (
    !value ||
    value.includes('${') ||
    value.startsWith('data:') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('#')
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(value, new URL(basePath, origin));
  } catch {
    return null;
  }

  if (url.origin !== origin) {
    return null;
  }

  url.hash = '';
  url.search = '';
  return url.pathname || '/';
}

function localPath(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '') || 'index.html';
  return join(outDir, clean.endsWith('/') ? `${clean}index.html` : clean);
}

function enqueue(value, basePath = '/') {
  const pathname = normalizePath(value, basePath);
  if (pathname && !seen.has(pathname) && !queue.includes(pathname)) {
    queue.push(pathname);
  }
}

function discover(text, pathname, contentType) {
  if (contentType.includes('text/html')) {
    for (const match of text.matchAll(/\b(?:src|href)=["']([^"']+)["']/gi)) {
      enqueue(match[1], pathname);
    }
  }

  if (contentType.includes('text/css') || pathname.endsWith('.css')) {
    for (const match of text.matchAll(/url\((?:["']?)([^)"']+)(?:["']?)\)/gi)) {
      enqueue(match[1], pathname);
    }
  }

  if (contentType.includes('javascript') || pathname.endsWith('.js')) {
    for (const match of text.matchAll(/(?:import\(|from\s+|import\s+)["']([^"']+)["']/g)) {
      enqueue(match[1], pathname);
    }

    for (const match of text.matchAll(/["']([^"']+\.(?:html|js|css|png|jpg|jpeg|webp|svg|gif|ico|json|woff2?|ttf|pdf))["']/gi)) {
      enqueue(match[1], pathname);
    }

    for (const match of text.matchAll(/["'](\/demos\/[^"']+)["']/gi)) {
      enqueue(match[1], pathname);
    }
  }
}

async function download(pathname) {
  seen.add(pathname);

  const response = await fetch(new URL(pathname, origin));
  if (!response.ok) {
    console.warn(`skip ${pathname}: ${response.status}`);
    return;
  }

  const contentType = response.headers.get('content-type') || '';
  const bytes = new Uint8Array(await response.arrayBuffer());

  // Firebase Hosting rewrites missing assets to index.html. Keep that behavior
  // in the static server fallback instead of saving HTML as fake image/script files.
  if (contentType.includes('text/html') && /\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith('.html')) {
    return;
  }

  const path = localPath(pathname);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, bytes);

  if (/text|javascript|json|css|html|xml/.test(contentType) || /\.(?:html|css|js|json|svg)$/i.test(pathname)) {
    discover(new TextDecoder().decode(bytes), pathname, contentType);
  }
}

await rm(outDir, { recursive: true, force: true });

while (queue.length > 0) {
  const next = queue.shift();
  if (next && !seen.has(next)) {
    await download(next);
  }
}

const index = await readFile(join(outDir, 'index.html'), 'utf8');
const main = index.match(/\bsrc="([^"]*main-[^"]+\.js)"/)?.[1] ?? 'not found';

console.log(`Synced ${seen.size} hosting URLs into ${outDir}`);
console.log(`Hosted main bundle: ${main}`);
await applyHostingCustomizations(outDir);
