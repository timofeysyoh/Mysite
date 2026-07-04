import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const jogiCardsCard =
  '{description:"Website for the JogiCards app",linkUrl:"https://jogicards.web.app/index.html"}';
const jogiChatCard =
  '{description:"Artificial intelligence in JogiChat chat",linkUrl:"https://jogichat.web.app/"}';

export function customizeMainBundle(source) {
  if (source.includes(jogiChatCard)) {
    return source;
  }

  if (!source.includes(jogiCardsCard)) {
    throw new Error('Could not locate the Website project cards in the hosting bundle.');
  }

  return source.replace(jogiCardsCard, `${jogiCardsCard},${jogiChatCard}`);
}

export async function applyHostingCustomizations(root = 'hosting-copy') {
  const index = await readFile(join(root, 'index.html'), 'utf8');
  const main = index.match(/\bsrc="([^"]*main-[^"]+\.js)"/)?.[1];

  if (!main) {
    throw new Error('Could not find the hosted main bundle in index.html.');
  }

  const mainPath = join(root, main);
  const source = await readFile(mainPath, 'utf8');
  const customized = customizeMainBundle(source);

  if (customized !== source) {
    await writeFile(mainPath, customized);
    console.log('Applied local hosting customization: JogiChat Website card.');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await applyHostingCustomizations(process.env.HOSTING_COPY_DIR ?? 'hosting-copy');
}
