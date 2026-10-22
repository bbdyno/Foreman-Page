// Checks the published site: every internal link and asset answers 200, the film plays,
// and screenshots at desktop/mobile width in light/dark land in screenshots/<date>/.
//   node verify.mjs [base-url]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = (process.argv[2] || 'https://bbdyno.github.io/Foreman-Page/').replace(/\/?$/, '/');
const ROOT = path.resolve(import.meta.dirname, '..');
const day = new Date().toISOString().slice(0, 10);
const shots = path.join(ROOT, 'screenshots', day);
fs.mkdirSync(shots, { recursive: true });

const pages = ['', 'pricing/', 'privacy/', 'terms/', 'support/'].flatMap((p) => [p, 'ko/' + p]);
const browser = await chromium.launch();
const problems = [];

// 1) links and assets
const seen = new Map();
const check = async (url) => {
  if (seen.has(url)) return seen.get(url);
  const r = await fetch(url, { method: 'GET', redirect: 'follow' }).then((x) => x.status).catch((e) => String(e));
  seen.set(url, r);
  return r;
};
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const p of pages) {
    const url = BASE + p;
    const res = await page.goto(url, { waitUntil: 'networkidle' });
    if (res.status() !== 200) problems.push(`${url} -> ${res.status()}`);
    const refs = await page.evaluate(() => [
      ...[...document.querySelectorAll('a[href]')].map((a) => a.href),
      ...[...document.querySelectorAll('img[src], source[src], video[poster], link[href]')].map((e) => e.src || e.poster || e.href),
      ...[...document.querySelectorAll('source[srcset]')].map((e) => new URL(e.getAttribute('srcset'), location.href).href),
    ]);
    for (const ref of new Set(refs)) {
      const u = ref.split('#')[0];
      if (!u.startsWith(BASE)) continue;
      const st = await check(u);
      if (st !== 200) problems.push(`${p || '/'}: ${u} -> ${st}`);
    }
  }
  await ctx.close();
}

// 2) film playback and screenshots
const film = {};
for (const [name, viewport, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['mobile', { width: 390, height: 844 }, true]]) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport, colorScheme: scheme, deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile });
    const page = await ctx.newPage();
    for (const lang of ['ko', 'en']) {
      const url = BASE + (lang === 'ko' ? 'ko/' : '');
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(shots, `${lang}-home-${name}-${scheme}.png`) });
      await page.screenshot({ path: path.join(shots, `${lang}-home-${name}-${scheme}-full.png`), fullPage: true });
      await page.locator('#film').scrollIntoViewIfNeeded();
      await page.waitForTimeout(3000);
      const st = await page.evaluate(() => { const v = document.getElementById('film'); return { paused: v.paused, t: v.currentTime, src: v.currentSrc.split('/').pop(), w: v.videoWidth }; });
      film[`${lang}-${name}-${scheme}`] = st;
      if (st.paused || st.t < 1 || !st.w) problems.push(`film not playing: ${lang} ${name} ${scheme} ${JSON.stringify(st)}`);
      await page.locator('.film').screenshot({ path: path.join(shots, `${lang}-film-${name}-${scheme}.png`) });
      await page.goto(BASE + (lang === 'ko' ? 'ko/' : '') + 'pricing/', { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(shots, `${lang}-pricing-${name}-${scheme}.png`) });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) problems.push(`horizontal overflow ${overflow}px: ${lang} pricing ${name}`);
    }
    await ctx.close();
  }
}
await browser.close();

const report = { base: BASE, checked: seen.size, film, problems };
fs.writeFileSync(path.join(shots, 'report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`checked ${seen.size} internal URLs on ${pages.length} pages`);
console.log('film:', JSON.stringify(film));
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'no problems');
