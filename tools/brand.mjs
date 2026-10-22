// Copies the Foreman brand files into assets/brand and renders the raster icons and OG images.
//   node brand.mjs [path/to/Foreman/docs/design]
// The brand repository is only read; its logo SVGs are generated there by tools/build_logo.py.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const BRAND = process.argv[2] || path.resolve(ROOT, '../Foreman/docs/design');
const out = path.join(ROOT, 'assets/brand');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// Where each brand file is looked for, in order. A new brand version that names its files
// differently only needs a new candidate here; nothing else in the site refers to these paths.
// Brand v3 (black and white, "pulse" symbol). Final logo files are looked for first; until the
// design repository has them, the lockup and favicon are composed from the pulse mark and the
// v2 wordmark (which v3 keeps), and the app icon is the pulse app icon example.
const V3 = 'v3';
const SYMBOL = process.env.SYMBOL || 'pulse';
const FILES = {
  'lockup.svg': [`${V3}/logo/lockup-black.svg`, `${V3}/logo/lockup-ink.svg`, `${V3}/logo/lockup.svg`],
  'lockup-white.svg': [`${V3}/logo/lockup-white.svg`],
  'favicon.svg': [`${V3}/logo/favicon.svg`, `${V3}/app-icon/favicon.svg`],
  'symbol-ink.svg': [`${V3}/logo/symbol-black.svg`, `${V3}/symbol/${SYMBOL}/mark-black.svg`],
  'symbol-white.svg': [`${V3}/logo/symbol-white.svg`, `${V3}/symbol/${SYMBOL}/mark-white.svg`],
  'symbol-small.svg': [`${V3}/logo/symbol-small-black.svg`, `${V3}/symbol/${SYMBOL}/mark-small-black.svg`],
  'app-icon.svg': [`${V3}/app-icon/ios/AppIcon-default.svg`, `${V3}/symbol/${SYMBOL}/appicon-black.svg`],
  'wordmark.svg': [`${V3}/logo/wordmark-black.svg`, 'logo/wordmark-ink.svg'],
};
const missing = [];
for (const [to, candidates] of Object.entries(FILES)) {
  const from = candidates.find((c) => fs.existsSync(path.join(BRAND, c)));
  if (!from) { missing.push(`${to} (looked for ${candidates.join(', ')})`); continue; }
  fs.copyFileSync(path.join(BRAND, from), path.join(out, to));
}
const read = (f) => fs.readFileSync(path.join(out, f), 'utf8');
const viewBox = (svg) => svg.match(/viewBox="([^"]+)"/)[1].split(/[\s,]+/).map(Number);
const inner = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/, '');

// Lockup: the mark's baseline (the flat line) sits on the wordmark baseline and its pulse is one
// x-height tall; mark and wordmark are one stroke width × 1.25 apart (the v2 lockup rule).
function composeLockup(color) {
  const mark = read('symbol-ink.svg'), word = read('wordmark.svg');
  const meta = JSON.parse(fs.readFileSync(path.join(BRAND, 'logo/wordmark-meta.json'), 'utf8'));
  const d = mark.match(/ d="([^"]+)"/)[1];
  const ys = [...d.matchAll(/V(-?[\d.]+)/g)].map((m) => +m[1]);
  const xs = [...d.matchAll(/[MH](-?[\d.]+)/g)].map((m) => +m[1]);
  const base = Math.max(...ys, +d.match(/^M[\d.]+ (-?[\d.]+)/)[1]), top = Math.min(...ys);
  const sw = +mark.match(/stroke-width="([\d.]+)"/)[1];
  const k = meta.xHeight / (base - top);
  const [wx, wy, ww, wh] = viewBox(word);
  const markW = (Math.max(...xs) - Math.min(...xs)) * k, gap = sw * k * 1.25;
  const y0 = Math.min(wy, -(base - top + sw / 2) * k), y1 = Math.max(wy + wh, (sw / 2) * k);
  const W = markW + gap + ww, H = y1 - y0;
  const body = `<g transform="translate(${-Math.min(...xs) * k} ${-base * k}) scale(${k})"><path d="${d}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linejoin="miter" stroke-miterlimit="4"/></g>`
    + `<g transform="translate(${markW + gap - wx} 0)">${inner(word).replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${color}"`)}</g>`;
  const h = 96, w = +(W / H * h).toFixed(1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 ${y0.toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="Foreman"><title>Foreman</title>${body}</svg>\n`;
}
// Favicon: the small (heavier) mark in white on a black plate, legible on light and dark tabs.
function composeFavicon() {
  const d = read('symbol-small.svg').match(/ d="([^"]+)"/)[1];
  const sw = +read('symbol-small.svg').match(/stroke-width="([\d.]+)"/)[1];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-label="Foreman"><title>Foreman</title><rect width="32" height="32" rx="7" fill="#000000"/><g transform="translate(5 5) scale(${22 / 64})"><path d="${d}" fill="none" stroke="#FFFFFF" stroke-width="${sw}" stroke-linejoin="miter" stroke-miterlimit="4"/></g></svg>\n`;
}
const composed = [];
if (!fs.existsSync(path.join(out, 'lockup.svg')) || missing.some((m) => m.startsWith('lockup.svg'))) { fs.writeFileSync(path.join(out, 'lockup.svg'), composeLockup('#000000')); composed.push('lockup.svg'); }
if (missing.some((m) => m.startsWith('lockup-white.svg'))) { fs.writeFileSync(path.join(out, 'lockup-white.svg'), composeLockup('#FFFFFF')); composed.push('lockup-white.svg'); }
if (missing.some((m) => m.startsWith('favicon.svg'))) { fs.writeFileSync(path.join(out, 'favicon.svg'), composeFavicon()); composed.push('favicon.svg'); }
fs.copyFileSync(path.join(out, 'lockup.svg'), path.join(out, 'lockup-ink.svg'));
for (const f of composed) { const i = missing.findIndex((m) => m.startsWith(f)); if (i >= 0) missing.splice(i, 1); }
if (composed.length) console.log('composed from the mark and wordmark:', composed.join(', '));
if (missing.length) { console.error('brand files not found:\n  ' + missing.join('\n  ')); process.exit(1); }

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
  ko: { title: '내 컴퓨터의 코딩 에이전트를<br>어디서든 관리합니다.', sub: 'iPhone · iPad · Mac · Apple Watch · Android · Windows. 우리 서버 0대.', badge: '당신 차례' },
  en: { title: 'Manage the coding agents<br>on your computer from anywhere.', sub: 'iPhone · iPad · Mac · Apple Watch · Android · Windows. Zero servers of ours.', badge: 'Your turn' },
};
// The "your turn" mark: a filled circle 0.6 × the text size (brand v3 status shapes).
const hand = '<span style="width:16px;height:16px;border-radius:50%;background:currentColor;display:inline-block"></span>';
for (const [lang, t] of Object.entries(og)) {
  await shoot(`<div lang="${lang}" style="position:relative;width:1200px;height:630px;background:${L.paper};color:${L.ink};font-family:${theme.fonts.sans};word-break:keep-all">
  <div style="position:absolute;left:80px;top:76px;width:200px">${svg('lockup-ink.svg').replace(/ width="[\d.]+" height="[\d.]+"/, ' style="width:240px;height:auto;display:block"')}</div>
  <div style="position:absolute;left:80px;top:208px;font-size:64px;font-weight:600;letter-spacing:-0.02em;line-height:1.16">${t.title}</div>
  <div style="position:absolute;left:80px;top:400px;display:inline-flex;align-items:center;gap:12px;background:${L['signal-container'] || L.signal};color:${L['on-signal-container'] || L['on-signal']};font-size:26px;font-weight:600;padding:10px 20px;border-radius:8px">${hand}${t.badge}</div>
  <div style="position:absolute;left:80px;right:80px;bottom:72px;padding-top:24px;border-top:1px solid ${L.rule};font-size:26px;color:${L['ink-2']}">${t.sub}</div>
</div>`, 1200, 630, `og-${lang}.png`);
}
await browser.close();
console.log('brand assets in', path.relative(ROOT, out));
