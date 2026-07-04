import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { customizeMainBundle } from './hosting-customizations.mjs';

const origin = process.env.HOSTING_ORIGIN ?? 'https://timofeysyoh-850dd.web.app';
const root = process.env.HOSTING_COPY_DIR ?? 'hosting-copy';

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(path)));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function remoteUrl(path) {
  const rel = relative(root, path).split(sep).map(encodeURIComponent).join('/');
  return new URL(rel === 'index.html' ? '/' : `/${rel}`, origin);
}

const files = await listFiles(root);
const mismatches = [];
let checked = 0;
let cursor = 0;

async function worker() {
  while (cursor < files.length) {
    const index = cursor++;
    const path = files[index];
    const url = remoteUrl(path);
    const response = await fetch(url);

    if (!response.ok) {
      mismatches.push(`${relative(root, path)}: HTTP ${response.status}`);
      continue;
    }

    const [localBytes, downloadedRemoteBytes] = await Promise.all([
      readFile(path),
      response.arrayBuffer().then((buffer) => Buffer.from(buffer)),
    ]);
    const rel = relative(root, path);
    const remoteBytes = /^main-[A-Z0-9]+\.js$/i.test(rel)
      ? Buffer.from(customizeMainBundle(downloadedRemoteBytes.toString('utf8')))
      : downloadedRemoteBytes;

    if (sha256(localBytes) !== sha256(remoteBytes)) {
      mismatches.push(`${rel}: content differs`);
    }

    checked++;
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));

console.log(`Checked ${checked}/${files.length} files against ${origin}`);

if (mismatches.length > 0) {
  console.error(mismatches.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Hosting copy matches the live deployment plus local customizations.');
}
