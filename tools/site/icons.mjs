// Phosphor Light icons (assets/icons, MIT), inlined so they follow currentColor.
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve(import.meta.dirname, '../../assets/icons');
const cache = new Map();
export function icon(name, cls = 'ico') {
  if (!cache.has(name)) cache.set(name, fs.readFileSync(path.join(DIR, `${name}.svg`), 'utf8').trim());
  return cache.get(name).replace('<svg ', `<svg class="${cls}" aria-hidden="true" focusable="false" `);
}
