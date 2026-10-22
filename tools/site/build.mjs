// Generates every HTML page of the site from the content in ko.mjs and en.mjs.
// Output is plain static HTML committed to the repository (GitHub Pages serves it as is).
//   node tools/site/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import ko from './ko.mjs';
import en from './en.mjs';
import { icon } from './icons.mjs';
import { theme, writeTokensCss } from '../theme/tokens.mjs';

const ROOT = path.resolve(import.meta.dirname, '../..');
export const SITE = 'https://bbdyno.github.io/Foreman-Page/';
export const REPO = 'https://github.com/bbdyno/Foreman-Page';

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Brand lockup (assets/brand/lockup.svg, copied from the brand repository by tools/brand.mjs).
// Logo parts drawn in the brand ink follow the text color; a brand accent (if any) takes --signal.
function lockup() {
  const svg = fs.readFileSync(path.join(ROOT, 'assets/brand/lockup.svg'), 'utf8')
    .replace(/<title>.*?<\/title>/, '')
    .replace(/ width="[\d.]+" height="[\d.]+"/, '')
    .replace(/role="img" aria-label="[^"]*"/, 'aria-hidden="true" focusable="false"')
    .replace(new RegExp(`fill="${theme.logo.ink}"`, 'gi'), 'fill="currentColor"')
    .replace(theme.logo.accent ? new RegExp(`fill="${theme.logo.accent}"`, 'gi') : /$^/, 'style="fill:var(--signal)"');
  return svg.replace('<svg ', '<svg class="lockup" ');
}
const LOCKUP = lockup();

// Product screens. tools/screens.mjs writes assets/screens/screens.json from the brand mockups.
const SCREENS = exists('assets/screens/screens.json') ? JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/screens/screens.json'), 'utf8')) : {};
const hasVideo = (lang) => exists(`assets/video/foreman-loop-${lang}.webm`) && exists(`assets/video/foreman-loop-${lang}.mp4`) && exists(`assets/video/foreman-${lang}-1080p.mp4`);

// page keys and their paths relative to the language root
const PAGES = { home: '', pricing: 'pricing/', privacy: 'privacy/', terms: 'terms/', support: 'support/' };
const langRoot = { en: '', ko: 'ko/' };
function rel(lang, page, to) {
  const depth = (langRoot[lang] + PAGES[page]).split('/').filter(Boolean).length;
  return '../'.repeat(depth) + to || './';
}

function layout(c, page, { title, description, body }) {
  const lang = c.lang;
  const other = lang === 'ko' ? 'en' : 'ko';
  const r = (p) => rel(lang, page, p) || './';
  const here = langRoot[lang] + PAGES[page];
  const there = langRoot[other] + PAGES[page];
  const link = (key) => r(langRoot[lang] + PAGES[key]);
  const cur = (key) => (key === page ? ' aria-current="page"' : '');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="${theme.light.paper}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="${theme.dark.paper}" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="${SITE}${here}">
<link rel="alternate" hreflang="${lang}" href="${SITE}${here}">
<link rel="alternate" hreflang="${other}" href="${SITE}${there}">
<link rel="alternate" hreflang="x-default" href="${SITE}${PAGES[page]}">
<link rel="icon" href="${r('assets/brand/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${r('assets/brand/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r('assets/brand/apple-touch-icon.png')}">
<link rel="stylesheet" href="${r('assets/fonts/fonts.css')}">
<link rel="stylesheet" href="${r('assets/tokens.css')}">
<link rel="stylesheet" href="${r('assets/site.css')}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Foreman">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE}${here}">
<meta property="og:image" content="${SITE}assets/brand/og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.ui.ogAlt)}">
<meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
</head>
<body>
<a class="skip" href="#main">${c.ui.skip}</a>
<header class="top">
  <div class="wrap">
    <a class="brand" href="${link('home')}" aria-label="Foreman ${c.ui.home}">${LOCKUP}</a>
    <nav class="nav" aria-label="${c.ui.navLabel}">
      <a href="${link('home')}#features">${c.ui.nav.features}</a>
      <a href="${link('pricing')}"${cur('pricing')}>${c.ui.nav.pricing}</a>
      <a href="${link('support')}"${cur('support')}>${c.ui.nav.support}</a>
      <a class="lang" href="${r(there)}" hreflang="${other}" lang="${other}">${icon('globe-simple')}<span>${c.ui.otherLang}</span></a>
    </nav>
    <span class="status">${c.ui.status}</span>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="brand" href="${link('home')}" aria-label="Foreman ${c.ui.home}">${LOCKUP}</a>
      <p>${c.ui.footLine}</p>
    </div>
    <nav aria-label="${c.ui.footNav}">
      <a href="${link('home')}">${c.ui.nav.home}</a>
      <a href="${link('pricing')}"${cur('pricing')}>${c.ui.nav.pricing}</a>
      <a href="${link('support')}"${cur('support')}>${c.ui.nav.support}</a>
      <a href="${link('privacy')}"${cur('privacy')}>${c.ui.nav.privacy}</a>
      <a href="${link('terms')}"${cur('terms')}>${c.ui.nav.terms}</a>
      <a href="${REPO}">GitHub</a>
    </nav>
    <p class="legal">${c.ui.legal}</p>
  </div>
</footer>
</body>
</html>
`;
}

// ---------------------------------------------------------------- parts ---

// A product screen: one image, or a light/dark pair that follows the color scheme.
function shot(c, page, s, eager = false) {
  const sc = SCREENS[s.key];
  if (!sc) return '';
  const r = (p) => rel(c.lang, page, p);
  const img = `<img src="${r(sc.light)}" width="${sc.w}" height="${sc.h}" alt="${esc(s.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const pic = sc.dark ? `<picture><source srcset="${r(sc.dark)}" media="(prefers-color-scheme: dark)">${img}</picture>` : img;
  return `<figure class="shot shot-${sc.kind}">${pic}<figcaption>${s.cap}</figcaption></figure>`;
}
const shots = (c, page, list) => {
  const items = (list || []).map((x) => shot(c, page, x)).filter(Boolean);
  if (!items.length) return '';
  const small = (list || []).every((x) => SCREENS[x.key] && ['phone', 'watch'].includes(SCREENS[x.key].kind));
  return `<div class="shots${small ? ' shots-row' : ''}">${items.join('')}</div>`;
};

const points = (list) => `<ul class="points">${list.map(([ic, html]) => `<li>${icon(ic)}<span>${html}</span></li>`).join('')}</ul>`;
const rows = (list) => `<dl class="rows">${list.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
const routes = (list) => `<ol class="routes">${list.map(([ic, k, v]) => `<li>${icon(ic)}<div><h3>${k}</h3><p>${v}</p></div></li>`).join('')}</ol>`;

function section(c, page, s, i) {
  return `<section class="sec"${s.id ? ` id="${s.id}"` : ''} aria-labelledby="h-${s.key}">
  <div class="wrap sec-grid">
    <div class="sec-index"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="name">${s.label}</span>${s.pro ? '<span class="pro">Pro</span>' : ''}</div>
    <div class="sec-body">
      <h2 id="h-${s.key}">${s.title}</h2>
      ${s.text.map((p) => `<p class="body">${p}</p>`).join('\n      ')}
      ${s.path ? `<p class="path">${s.path}</p>` : ''}
      ${s.routes ? routes(s.routes) : ''}
      ${s.points ? points(s.points) : ''}
      ${s.rows ? rows(s.rows) : ''}
      ${s.note ? `<p class="note">${s.note}</p>` : ''}
      ${s.plans ? `<div class="plans-brief">${s.plans.map((p) => `<div><span class="name">${p.name}</span><span class="price">${p.price}</span><p>${p.text}</p></div>`).join('')}</div><a class="more" href="${rel(c.lang, page, langRoot[c.lang] + 'pricing/')}">${s.more}${icon('arrow-right')}</a>` : ''}
      ${shots(c, page, s.shots)}
    </div>
  </div>
</section>`;
}

function home(c) {
  const h = c.home;
  const r = (p) => rel(c.lang, 'home', p);
  const heroShot = shot(c, 'home', h.heroShot, true);
  const body = `
<section class="hero${heroShot ? ' has-shot' : ''}">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="meta">${h.devices}</p>
      <h1>${h.title}</h1>
      <p class="lede">${h.lede}</p>
      <p class="turn"><span class="badge">${icon('hand-tap')}${h.turnBadge}</span><span>${h.turnText}</span></p>
      <dl class="facts">${h.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <p class="launch">${icon('hourglass-medium')}<span>${h.launch}</span></p>
      <section class="stores" aria-labelledby="stores-title"><h2 id="stores-title" class="meta">${h.storesTitle}</h2>
        <ul>${h.stores.map(([ic, name, what]) => `<li>${icon(ic)}<div><span class="store">${name}</span><span class="what">${what}</span><span class="state">${h.storeState}</span></div></li>`).join('')}</ul>
      </section>
      <p class="jump"><a href="#features">${h.jumpFeatures}${icon('arrow-right')}</a><a href="#zero">${h.jumpZero}${icon('arrow-right')}</a></p>
    </div>
    ${heroShot ? `<div class="hero-shot">${heroShot}</div>` : ''}
  </div>
  ${hasVideo(c.lang) ? `<div class="wrap">
    <figure class="film">
      <div class="film-frame">
        <video id="film" controls muted loop playsinline preload="metadata" poster="${r(`assets/video/foreman-poster-${c.lang}.jpg`)}" aria-label="${esc(h.filmLabel)}">
          <source src="${r(`assets/video/foreman-loop-${c.lang}.webm`)}" type="video/webm">
          <source src="${r(`assets/video/foreman-loop-${c.lang}.mp4`)}" type="video/mp4">
        </video>
      </div>
      <figcaption><span>${h.filmCaption}</span><a href="${r(`assets/video/foreman-${c.lang}-1080p.mp4`)}" download>${icon('download-simple')}${h.filmDownload}</a></figcaption>
    </figure>
  </div>` : ''}
</section>
<div id="features"></div>
${h.sections.map((s, i) => section(c, 'home', s, i)).join('\n')}
${hasVideo(c.lang) ? `<script>
(function () {
  var v = document.getElementById('film');
  if (!v || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) { v.autoplay = true; return; }
  new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); } });
  }, { threshold: 0.35 }).observe(v);
})();
</script>` : ''}`;
  return layout(c, 'home', { title: h.metaTitle, description: h.metaDescription, body });
}

function pricing(c) {
  const p = c.pricing;
  const cell = (v) => v === true ? `${icon('check')}<span class="sr-only">${c.ui.yes}</span>` : v === false ? `<span class="no">${icon('minus')}</span><span class="sr-only">${c.ui.no}</span>` : v;
  const body = `
<div class="wrap">
  <div class="page-head"><p class="meta">${p.kicker}</p><h1>${p.title}</h1><p>${p.lede}</p></div>
  <div class="tiers">
    ${p.tiers.map((t) => `<section class="tier" aria-labelledby="t-${t.id}">
      <h2 id="t-${t.id}">${t.name}</h2>
      <p class="price">${t.price}<small>${t.unit}</small></p>
      <p class="alt">${t.alt}</p>
      <p class="for">${t.for}</p>
      <ul>${t.items.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}</ul>
    </section>`).join('\n    ')}
  </div>
  <section class="block" aria-labelledby="h-compare">
    <h2 id="h-compare">${p.compareTitle}</h2>
    <div class="compare-wrap">
      <table class="compare">
        <thead><tr><th scope="col">${p.compareHead}</th><th scope="col">Free</th><th scope="col">Pro</th><th scope="col">Team</th></tr></thead>
        ${p.compare.map((g) => `<tbody><tr class="group"><th colspan="4" scope="colgroup">${g.group}</th></tr>` + g.rows.map(([k, a, b, d]) => `<tr><th scope="row">${k}</th><td>${cell(a)}</td><td>${cell(b)}</td><td>${cell(d)}</td></tr>`).join('') + '</tbody>').join('\n        ')}
      </table>
    </div>
    <p class="note">${p.footnote}</p>
  </section>
  <section class="block" aria-labelledby="h-pfaq">
    <h2 id="h-pfaq">${p.faqTitle}</h2>
    <div class="faq">${p.faq.map(([q, a]) => `<details><summary><span>${q}</span>${icon('plus')}</summary><div class="a">${a.map((x) => `<p>${x}</p>`).join('')}</div></details>`).join('')}</div>
  </section>
</div>`;
  return layout(c, 'pricing', { title: p.metaTitle, description: p.metaDescription, body });
}

function doc(c, page, d) {
  const body = `
<div class="wrap">
  <div class="page-head"><p class="meta">${d.kicker}</p><h1>${d.title}</h1><p>${d.lede}</p></div>
  <div class="doc">
    <div class="doc-meta"><nav aria-label="${c.ui.toc}"><p class="meta">${c.ui.toc}</p><ol>${d.sections.map((s) => `<li><a href="#${s.id}">${s.h}</a></li>`).join('')}</ol></nav></div>
    <article class="prose">
      ${d.sections.map((s) => `<h2 id="${s.id}">${s.h}</h2>\n      ${s.body}`).join('\n      ')}
    </article>
  </div>
</div>`;
  return layout(c, page, { title: d.metaTitle, description: d.metaDescription, body });
}

function support(c) {
  const s = c.support;
  const body = `
<div class="wrap">
  <div class="page-head"><p class="meta">${s.kicker}</p><h1>${s.title}</h1><p>${s.lede}</p></div>
  <div class="contact">
    ${s.contact.map((x) => `<div><h2>${icon(x.icon)}${x.h}</h2><p>${x.p}</p><a class="go" href="${x.href}">${x.link}${icon('arrow-up-right')}</a></div>`).join('')}
  </div>
  <section class="block" aria-labelledby="h-faq">
    <h2 id="h-faq">${s.faqTitle}</h2>
    <div class="faq">${s.faq.map(([q, a]) => `<details><summary><span>${q}</span>${icon('plus')}</summary><div class="a">${a.map((x) => `<p>${x}</p>`).join('')}</div></details>`).join('')}</div>
  </section>
</div>`;
  return layout(c, 'support', { title: s.metaTitle, description: s.metaDescription, body });
}

writeTokensCss();
for (const c of [en, ko]) {
  const base = path.join(ROOT, langRoot[c.lang]);
  const write = (p, html) => { const f = path.join(base, p, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
  write('', home(c));
  write('pricing', pricing(c));
  write('privacy', doc(c, 'privacy', c.privacy));
  write('terms', doc(c, 'terms', c.terms));
  write('support', support(c));
}
console.log('built 10 pages');
