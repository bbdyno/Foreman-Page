// Runs axe-core on every page (light and dark) and prints the violations.
//   node a11y.mjs [base-url]      (default: a local server on :8765)
// Color contrast is reported separately: it depends on the brand palette.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'http://localhost:8765/').replace(/\/?$/, '/');
const AXE = fs.readFileSync(path.join(import.meta.dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
const pages = ['', 'guide/', 'pricing/', 'privacy/', 'terms/', 'support/'].flatMap((p) => [p, 'ko/' + p]);
const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));   // installed Chrome when Playwright's own browser is missing
const found = new Map();
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme, viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(BASE + p, { waitUntil: 'load' });
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ['violations'] })).violations
      .map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) })));
    for (const v of res) {
      const key = `${v.id}`;
      if (!found.has(key)) found.set(key, { ...v, where: new Set() });
      found.get(key).where.add(`${p || '/'} (${scheme})`);
    }
  }
  await ctx.close();
}
await browser.close();
const all = [...found.values()];
const contrast = all.filter((v) => v.id === 'color-contrast');
const rest = all.filter((v) => v.id !== 'color-contrast');
for (const v of rest) console.log(`[${v.impact}] ${v.id}: ${v.help}\n   ${[...v.where].join(', ')}\n   e.g. ${v.nodes.join(' | ')}`);
console.log(rest.length ? `${rest.length} rule(s) violated` : 'no violations (except color contrast, checked separately)');
for (const v of contrast) console.log(`[contrast] ${[...v.where].join(', ')}\n   e.g. ${v.nodes.join(' | ')}`);
process.exit(0);
