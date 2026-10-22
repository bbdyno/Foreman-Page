// Copies the Foreman brand files into assets/brand and renders the raster icons and OG images.
//   node brand.mjs [path/to/Foreman/docs/design]
// The brand repository is only read; its logo SVGs are generated there by tools/build_logo.py.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const BRAND = process.argv[2] || path.resolve(ROOT, '../Foreman/docs/design');
const out = path.join(ROOT, 'assets/brand');
fs.mkdirSync(out, { recursive: true });

const copy = (from, to) => fs.copyFileSync(path.join(BRAND, from), path.join(out, to));
copy('logo/lockup-ink.svg', 'lockup.svg');          // inlined in the header (frame follows text color)
copy('logo/lockup-ink.svg', 'lockup-ink.svg');
copy('logo/lockup-white.svg', 'lockup-white.svg');
copy('logo/favicon.svg', 'favicon.svg');            // plate version: legible at 16–32 px on light tabs
copy('logo/symbol-ink.svg', 'symbol-ink.svg');
copy('logo/symbol-white.svg', 'symbol-white.svg');
copy('app-icon/ios/AppIcon-default.svg', 'app-icon.svg');

const theme = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'theme/theme.json'), 'utf8'));
const fontsCss = path.join(ROOT, 'assets/fonts/fonts.css');
const svg = (f) => fs.readFileSync(path.join(out, f), 'utf8');

const browser = await chromium.launch();
async function shoot(html, w, h, file, scale = 1) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  const tmp = path.join(ROOT, 'assets/fonts/.brand.render.html');      // next to fonts.css so its relative URLs resolve
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="fonts.css">
<style>html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:transparent}svg{display:block}</style></head><body>${html}</body></html>`);
  await page.goto('file://' + tmp);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, file), omitBackground: true });
  fs.rmSync(tmp);
  await page.close();
}

const fit = (s) => s.replace(/ width="[\d.]+" height="[\d.]+"/, ' width="100%" height="100%"');
await shoot(fit(svg('favicon.svg')), 32, 32, 'favicon-32.png');
await shoot(fit(svg('app-icon.svg')), 180, 180, 'apple-touch-icon.png');

// OG images: brand background, lockup, one line of copy, the "your turn" badge as the one signal.
const L = theme.light;
const og = {
  ko: { title: '내 Mac의 코딩 에이전트를<br>어디서든 관리합니다.', sub: 'iPhone · iPad · Mac · Apple Watch. 우리 서버 0대, 내 Mac과 내 iCloud만.', badge: '당신 차례' },
  en: { title: 'Manage the coding agents<br>on your Mac from anywhere.', sub: 'iPhone · iPad · Mac · Apple Watch. Zero servers of ours: only your Mac and your iCloud.', badge: 'Your turn' },
};
const hand = fs.readFileSync(path.join(ROOT, 'assets/icons/hand-tap.svg'), 'utf8').replace('<svg ', '<svg width="30" height="30" ');
for (const [lang, t] of Object.entries(og)) {
  await shoot(`<div lang="${lang}" style="position:relative;width:1200px;height:630px;background:${L.paper};color:${L.ink};font-family:${theme.fonts.sans};word-break:keep-all">
  <div style="position:absolute;left:80px;top:76px;width:200px">${svg('lockup-ink.svg').replace(/ width="[\d.]+" height="[\d.]+"/, ' width="200" height="43.8"')}</div>
  <div style="position:absolute;left:80px;top:208px;font-size:64px;font-weight:600;letter-spacing:-0.02em;line-height:1.16">${t.title}</div>
  <div style="position:absolute;left:80px;top:400px;display:inline-flex;align-items:center;gap:12px;background:${L.signal};color:${L['on-signal']};font-size:26px;font-weight:600;padding:10px 20px 10px 16px;border-radius:12px">${hand}${t.badge}</div>
  <div style="position:absolute;left:80px;right:80px;bottom:72px;padding-top:24px;border-top:1px solid ${L.rule};font-size:26px;color:${L['ink-2']}">${t.sub}</div>
</div>`, 1200, 630, `og-${lang}.png`);
}
await browser.close();
console.log('brand assets in', path.relative(ROOT, out));
