// Builds store/: listing text (fastlane-style folders) and screenshot sets for App Store, Google Play
// and Microsoft Store, from tools/store/content.mjs and the real app captures in the Foreman repository
// (read only). Every text field is checked against its store's limit; the build stops on a breach.
//
//   node store/build.mjs            (from tools/; needs playwright and tools/.venv for PNG clean-up)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { APP_STORE, GOOGLE_PLAY, MICROSOFT_STORE, CAPTIONS, URLS } from './content.mjs';

const TOOLS = path.resolve(import.meta.dirname, '..');
const ROOT = path.resolve(TOOLS, '..');
const OUT = path.join(ROOT, 'store');
const FOREMAN = path.resolve(ROOT, '../Foreman');
const APPLE = path.join(FOREMAN, 'docs/screens');
const FLUTTER = path.join(FOREMAN, 'clients/flutter/docs/screens');
const EXTRA = path.join(TOOLS, 'store/captures');           // captures made for the store (store/README.md)
const ICONS = path.join(FOREMAN, 'docs/design/v3/app-icon');
const LOGO = path.join(FOREMAN, 'docs/design/v3/logo');
const LOCALES = { ko: { apple: 'ko', play: 'ko-KR', ms: 'ko-KR' }, en: { apple: 'en-US', play: 'en-US', ms: 'en-US' } };

// ---------------------------------------------------------------- text ---
const problems = [];
const chars = (s) => [...s].length;
const bytes = (s) => Buffer.byteLength(s, 'utf8');
function check(store, lang, field, value, max, unit = 'chars', min = 0) {
  const n = unit === 'bytes' ? bytes(value) : chars(value);
  if (n > max || n < min) problems.push(`${store} ${lang} ${field}: ${n} ${unit} (limit ${min ? min + '–' : ''}${max})`);
  return n;
}
function write(rel, text) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text.endsWith('\n') || !text ? text : text + '\n');
}
const report = [];
for (const lang of ['ko', 'en']) {
  const A = APP_STORE[lang], loc = LOCALES[lang].apple;
  const a = {
    name: check('App Store', lang, 'name', A.name, 30, 'chars', 2),
    subtitle: check('App Store', lang, 'subtitle', A.subtitle, 30),
    promotional_text: check('App Store', lang, 'promotional_text', A.promotional_text, 170),
    description: check('App Store', lang, 'description', A.description, 4000),
    keywords: check('App Store', lang, 'keywords', A.keywords, 100, 'bytes'),
  };
  if (/,\s/.test(A.keywords)) problems.push(`App Store ${lang} keywords: no spaces after commas`);
  for (const [k, v] of Object.entries(A)) write(`app-store/metadata/${loc}/${k}.txt`, v);
  write(`app-store/metadata/${loc}/support_url.txt`, URLS[lang].support);
  write(`app-store/metadata/${loc}/marketing_url.txt`, URLS[lang].marketing);
  write(`app-store/metadata/${loc}/privacy_url.txt`, URLS[lang].privacy);
  report.push(['App Store', lang, a]);

  const G = GOOGLE_PLAY[lang], gl = LOCALES[lang].play;
  const g = {
    title: check('Google Play', lang, 'title', G.title, 30),
    short_description: check('Google Play', lang, 'short_description', G.short_description, 80),
    full_description: check('Google Play', lang, 'full_description', G.full_description, 4000),
    changelog: check('Google Play', lang, 'changelog', G.changelog, 500),
  };
  write(`google-play/metadata/android/${gl}/title.txt`, G.title);
  write(`google-play/metadata/android/${gl}/short_description.txt`, G.short_description);
  write(`google-play/metadata/android/${gl}/full_description.txt`, G.full_description);
  write(`google-play/metadata/android/${gl}/changelogs/1.txt`, G.changelog);
  report.push(['Google Play', lang, g]);

  const M = MICROSOFT_STORE[lang], ml = LOCALES[lang].ms;
  const m = {
    description: check('Microsoft Store', lang, 'description', M.description, 10000),
    short_description: check('Microsoft Store', lang, 'short_description', M.short_description, 270),
    features: M.features.length,
    search_terms: M.search_terms.length,
  };
  if (M.features.length > 20) problems.push(`Microsoft Store ${lang} features: more than 20`);
  M.features.forEach((f, i) => check('Microsoft Store', lang, `feature ${i + 1}`, f, 200));
  if (M.search_terms.length > 7) problems.push(`Microsoft Store ${lang} search terms: more than 7`);
  Object.entries(M.captions).forEach(([k, v]) => check('Microsoft Store', lang, `caption ${k}`, v, 200));
  write(`microsoft-store/${ml}/description.txt`, M.description);
  write(`microsoft-store/${ml}/short_description.txt`, M.short_description);
  write(`microsoft-store/${ml}/features.txt`, M.features.join('\n'));
  write(`microsoft-store/${ml}/search_terms.txt`, M.search_terms.join('\n'));
  write(`microsoft-store/${ml}/whats_new.txt`, M.whats_new);
  write(`microsoft-store/${ml}/privacy_url.txt`, URLS[lang].privacy);
  write(`microsoft-store/${ml}/support_url.txt`, URLS[lang].support);
  write(`microsoft-store/${ml}/screenshot_captions.txt`, Object.entries(M.captions).map(([k, v]) => `${k}.png\t${v}`).join('\n'));
  report.push(['Microsoft Store', lang, m]);
}
if (problems.length) { console.error('LIMITS:\n' + problems.join('\n')); process.exit(1); }

// --------------------------------------------------------- screenshots ---
const T = {   // brand v3 tokens (DESIGN.md §4)
  light: { bg: '#FFFFFF', ink: '#000000', ink2: '#6B6B6B', edge: '#E3E3E3' },
  dark: { bg: '#000000', ink: '#FFFFFF', ink2: '#8C8C8C', edge: '#333333' },
};
const fontCss = fs.readFileSync(path.join(ROOT, 'assets/fonts/fonts.css'), 'utf8')
  .replace(/url\(([^)]+)\)/g, (_, u) => `url(file://${path.join(ROOT, 'assets/fonts', u)})`);
const src = (dir, name) => {
  for (const d of [EXTRA, dir]) { const f = path.join(d, name); if (fs.existsSync(f)) return f; }
  throw new Error('missing capture ' + name);
};
const A_ = (n) => src(APPLE, n), F_ = (n) => src(FLUTTER, n);

// layouts, as fractions of the canvas width
const L = {
  phone: { pad: 0.08, top: 0.075, font: 0.074, gap: 0.06, shot: 0.84, radius: 0.085 },
  tablet: { pad: 0.07, top: 0.06, font: 0.064, gap: 0.045, shot: 0.86, radius: 0.025 },
  desktop: { pad: 0.06, top: 0.045, font: 0.042, gap: 0.03, shot: 0.86, radius: 0.008 },
};
function composed({ W, H, kind, mode, cap, img, crop }) {
  const t = T[mode], l = L[kind];
  const pad = Math.round(W * l.pad), sw = Math.round(W * l.shot);
  return `<!doctype html><meta charset="utf-8"><style>${fontCss}
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:${t.bg}}
  body{font-family:'Pretendard Variable',sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;align-items:center}
  .cap{box-sizing:border-box;width:${sw}px;margin-top:${Math.round(W * l.top)}px;font-weight:650;letter-spacing:-0.025em;line-height:1.16;font-size:${Math.round(W * l.font)}px;color:${t.ink}}
  .cap span{display:block;white-space:nowrap}.cap span+span{color:${t.ink2}}
  .shot{width:${sw}px;margin-top:${Math.round(W * l.gap)}px;border-radius:${Math.round(sw * l.radius)}px;box-shadow:0 0 0 ${Math.max(2, Math.round(W / 700))}px ${t.edge};overflow:hidden;flex:none;${crop ? `height:${Math.round(sw * crop)}px;` : ''}}
  .shot img{display:block;width:100%}
  </style><div class="cap">${cap.map((x) => `<span>${x}</span>`).join('')}</div><div class="shot"><img src="file://${img}"></div>`;
}
function side({ W, H, mode, cap, img, imgW }) {   // caption on the left, a small panel on the right (menu bar)
  const t = T[mode];
  return `<!doctype html><meta charset="utf-8"><style>${fontCss}
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:${t.bg}}
  body{font-family:'Pretendard Variable',sans-serif;-webkit-font-smoothing:antialiased;display:flex;align-items:center;gap:${Math.round(W * 0.07)}px;padding:0 ${Math.round(W * 0.09)}px;box-sizing:border-box}
  .cap{flex:1;font-weight:650;letter-spacing:-0.025em;line-height:1.16;font-size:${Math.round(W * 0.045)}px;color:${t.ink}}
  .cap span{display:block;white-space:nowrap}.cap span+span{color:${t.ink2}}
  img{width:${imgW}px;border-radius:24px;box-shadow:0 0 0 3px ${t.edge},0 40px 80px rgba(0,0,0,.12)}
  </style><div class="cap">${cap.map((x) => `<span>${x}</span>`).join('')}</div><img src="file://${img}">`;
}
function featureGraphic(lang) {
  const line = lang === 'ko' ? ['내 컴퓨터의 코딩 에이전트를', '어디서든 보고 승인합니다'] : ['Follow and approve the coding agents', 'on your computer, from anywhere'];
  return `<!doctype html><meta charset="utf-8"><style>${fontCss}
  html,body{margin:0;width:1024px;height:500px;overflow:hidden;background:#000}
  body{font-family:'Pretendard Variable',sans-serif;-webkit-font-smoothing:antialiased;padding:72px 80px;box-sizing:border-box;color:#fff}
  img{height:76px;display:block}
  p{margin:96px 0 0;font-size:40px;font-weight:650;letter-spacing:-0.02em;line-height:1.2}
  p span{display:block;white-space:nowrap}p span+span{color:#8C8C8C}
  </style><img src="file://${path.join(LOGO, 'lockup-white.svg')}"><p>${line.map((x) => `<span>${x}</span>`).join('')}</p>`;
}
const svgPage = (file, size) => `<!doctype html><style>html,body{margin:0;width:${size}px;height:${size}px;overflow:hidden;background:transparent}img{width:${size}px;height:${size}px;display:block}</style><img src="file://${file}">`;

// sets -------------------------------------------------------------------
const IPHONE = [
  ['inbox', 'iPhone-Inbox-light.png', 'light'], ['widgets', 'iPhone-Widgets-dark.png', 'dark'], ['danger', 'iPhone-SessionDanger-light.png', 'light'],
  ['session', 'iPhone-Session-light.png', 'light'], ['terminal', 'iPhone-Terminal-dark.png', 'dark'], ['home', 'iPhone-Home-light.png', 'light'],
  ['autopilot', 'iPhone-Autopilot-light.png', 'light'],
];
const IPAD = [['grid', 'iPad-Grid-light.png', 'light'], ['ipadInbox', 'iPad-Inbox-light.png', 'light'], ['ipadSession', 'iPad-Session-dark.png', 'dark']];
const MAC = [['workspace', 'Mac-Workspace-light.png', 'light'], ['macGrid', 'Mac-Grid-light.png', 'light'], ['macInbox', 'Mac-Inbox-dark.png', 'dark']];
const PHONE_SIZES = { 'iphone-6.9': [1320, 2868], 'iphone-6.5': [1284, 2778], 'iphone-6.3': [1206, 2622] };
const ANDROID = [
  ['aHome', 'android-home-light.png', 'light'], ['aInbox', 'android-inbox-light.png', 'light'], ['aShade', 'android-notifications-dark.png', 'dark', 1172 / 1080],
  ['aSession', 'android-session-h-macbookpro-0d7c3b55-light.png', 'light'], ['aTerminal', 'android-session-h-macmini-5c9d11a0-terminal-dark.png', 'dark'],
  ['aPairing', 'android-pairing-light.png', 'light'],
];
const ANDROID_TABLET = [   // rendered by tools/store/flutter-tablet (see store/README.md); used only when present
  ['aHome', 'android-tablet-home-light.png', 'light'], ['aInbox', 'android-tablet-inbox-light.png', 'light'], ['aSession', 'android-tablet-session-light.png', 'light'],
];
const WINDOWS = [['windows-home', 'windows-home-light.png'], ['windows-inbox', 'windows-inbox-light.png'], ['windows-sessions', 'windows-sessions-dark.png'], ['windows-host', 'windows-host-light.png']];

const shots = [];   // [outRel, html, W, H, keepAlpha]
for (const lang of ['ko', 'en']) {
  const C = CAPTIONS[lang], al = LOCALES[lang].apple, gl = LOCALES[lang].play;
  for (const [dev, [W, H]] of Object.entries(PHONE_SIZES)) {
    IPHONE.forEach(([k, f, mode], i) => shots.push([`app-store/screenshots/${al}/${dev}/${String(i + 1).padStart(2, '0')}-${k}.png`, composed({ W, H, kind: 'phone', mode, cap: C[k], img: A_(f) }), W, H]));
  }
  IPAD.forEach(([k, f, mode], i) => shots.push([`app-store/screenshots/${al}/ipad-13/${String(i + 1).padStart(2, '0')}-${k}.png`, composed({ W: 2064, H: 2752, kind: 'tablet', mode, cap: C[k], img: A_(f) }), 2064, 2752]));
  MAC.forEach(([k, f, mode], i) => shots.push([`app-store/screenshots/${al}/mac/${String(i + 1).padStart(2, '0')}-${k}.png`, composed({ W: 2880, H: 1800, kind: 'desktop', mode, cap: C[k], img: A_(f) }), 2880, 1800]));
  shots.push([`app-store/screenshots/${al}/mac/04-menubar.png`, side({ W: 2880, H: 1800, mode: 'light', cap: C.menubar, img: A_('Mac-MenuBar-light.png'), imgW: 880 }), 2880, 1800]);
  ANDROID.forEach(([k, f, mode, crop], i) => shots.push([`google-play/metadata/android/${gl}/images/phoneScreenshots/${String(i + 1).padStart(2, '0')}-${k}.png`, composed({ W: 1080, H: 1920, kind: 'phone', mode, cap: C[k], img: F_(f), crop }), 1080, 1920]));
  const tablets = ANDROID_TABLET.filter(([, f]) => fs.existsSync(path.join(EXTRA, f)));
  for (const [dir, W, H] of [['sevenInchScreenshots', 1920, 1080], ['tenInchScreenshots', 2560, 1440]]) {   // landscape 16:9
    tablets.forEach(([k, f, mode], i) => shots.push([`google-play/metadata/android/${gl}/images/${dir}/${String(i + 1).padStart(2, '0')}-${k}.png`, composed({ W, H, kind: 'desktop', mode, cap: C[k], img: path.join(EXTRA, f) }), W, H]));
  }
  shots.push([`google-play/metadata/android/${gl}/images/featureGraphic.png`, featureGraphic(lang), 1024, 500]);
}
const copies = [];  // [outRel, source] used as they are
copies.push(['app-store/screenshots/watch/01-approve.png', A_('Watch-Approve-dark.png')]);   // 416×496, all locales
for (const lang of ['ko', 'en']) WINDOWS.forEach(([k, f]) => copies.push([`microsoft-store/${LOCALES[lang].ms}/screenshots/${k}.png`, F_(f)]));
shots.push(['google-play/metadata/android/ko-KR/images/icon.png', svgPage(path.join(ICONS, 'android/play-store-512.svg'), 512), 512, 512, true]);
shots.push(['microsoft-store/StoreLogo-300.png', svgPage(path.join(ICONS, 'windows/StoreLogo-300.svg'), 300), 300, 300, true]);

for (const d of ['app-store/screenshots', 'google-play/metadata/android/ko-KR/images', 'google-play/metadata/android/en-US/images']) fs.rmSync(path.join(OUT, d), { recursive: true, force: true });
for (const lang of ['ko', 'en']) fs.rmSync(path.join(OUT, `microsoft-store/${LOCALES[lang].ms}/screenshots`), { recursive: true, force: true });

const browser = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));   // installed Chrome when Playwright's own browser is missing
const page = await browser.newPage({ deviceScaleFactor: 1 });
const opaque = [];
for (const [rel, html, W, H, keepAlpha] of shots) {
  await page.setViewportSize({ width: W, height: H });
  const tmp = path.join(OUT, '.page.html');
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // shrink a caption until its longest line fits
    for (const cap of document.querySelectorAll('.cap')) {
      let fs = parseFloat(getComputedStyle(cap).fontSize);
      const fits = () => [...cap.children].every((s) => s.scrollWidth <= cap.clientWidth + 1);
      while (!fits() && fs > 10) { fs -= 2; cap.style.fontSize = fs + 'px'; }
    }
  });
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  await page.screenshot({ path: f, omitBackground: !!keepAlpha });
  if (!keepAlpha) opaque.push(f);
}
fs.rmSync(path.join(OUT, '.page.html'), { force: true });
await browser.close();
for (const [rel, from] of copies) { const f = path.join(OUT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.copyFileSync(from, f); opaque.push(f); }
fs.cpSync(path.join(OUT, 'google-play/metadata/android/ko-KR/images/icon.png'), path.join(OUT, 'google-play/metadata/android/en-US/images/icon.png'));

// App Store and Google Play refuse alpha channels in screenshots: flatten to RGB.
execFileSync(path.join(TOOLS, '.venv/bin/python'), ['-c', `
import sys
from PIL import Image
for f in sys.argv[1:]:
    im = Image.open(f)
    if im.mode != 'RGB':
        im.convert('RGB').save(f, optimize=True)
`, ...opaque]);

for (const [store, lang, r] of report) console.log(`${store} ${lang}: ${Object.entries(r).map(([k, v]) => `${k} ${v}`).join(', ')}`);
console.log(`${shots.length + copies.length} images`);
