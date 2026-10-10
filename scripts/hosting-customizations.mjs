import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const jogiCardsCard =
  '{description:"Website for the JogiCards app",linkUrl:"https://jogicards.web.app/index.html"}';
const jogiChatCard =
  '{description:"Artificial intelligence in JogiChat chat",linkUrl:"https://jogichat.web.app/"}';
const removedWebsiteCards = [
  '{description:"Website using Angular framework for JavaScript",linkUrl:"/demos/portfolio-site/index.html"}',
  '{description:"A site based on pure JavaScript without the use of components",linkUrl:"/demos/project-workshop/index.html"}',
];

function removeCompiledArrayItem(source, item) {
  if (!source.includes(item)) {
    return source;
  }

  return source.replace(`,${item}`, '').replace(`${item},`, '').replace(item, '');
}

export function customizeMainBundle(source) {
  let customized = source;

  for (const card of removedWebsiteCards) {
    customized = removeCompiledArrayItem(customized, card);
  }

  if (customized.includes(jogiChatCard)) {
    return customized;
  }

  if (!customized.includes(jogiCardsCard)) {
    throw new Error('Could not locate the Website project cards in the hosting bundle.');
  }

  return customized.replace(jogiCardsCard, `${jogiCardsCard},${jogiChatCard}`);
}

export function findMainBundleSrc(index) {
  const main = index.match(/\bsrc="([^"]*main-[^"?]+\.js)(?:\?[^"]*)?"/)?.[1];

  if (!main) {
    throw new Error('Could not find the hosted main bundle in index.html.');
  }

  return main;
}

function customizedMainSrc(src, bundle) {
  const hash = createHash('sha256').update(bundle).digest('hex').slice(0, 12);
  return `${src.replace(/\?.*$/, '')}?v=jogichat-${hash}`;
}

export function customizeIndexHtml(index, bundle) {
  const main = findMainBundleSrc(index);
  const versionedMain = customizedMainSrc(main, bundle);

  return index.replace(/\bsrc="([^"]*main-[^"?]+\.js)(?:\?[^"]*)?"/, `src="${versionedMain}"`);
}

export async function applyHostingCustomizations(root = 'hosting-copy') {
  const index = await readFile(join(root, 'index.html'), 'utf8');
  const main = findMainBundleSrc(index).replace(/^\/+/, '');

  const mainPath = join(root, main);
  const source = await readFile(mainPath, 'utf8');
  const customized = customizeMainBundle(source);

  let changed = false;

  if (customized !== source) {
    await writeFile(mainPath, customized);
    changed = true;
  }

  const customizedIndex = customizeIndexHtml(index, customized);

  if (customizedIndex !== index) {
    await writeFile(join(root, 'index.html'), customizedIndex);
    changed = true;
  }

  if (changed) {
    console.log('Applied local hosting customizations.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await applyHostingCustomizations(process.env.HOSTING_COPY_DIR ?? 'hosting-copy');
}
