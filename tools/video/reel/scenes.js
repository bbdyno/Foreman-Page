/* Foreman 홍보 영상 — concept.md "켜진 커서 하나".
 * 라임 커서 블록 하나(전역 레이어)가 장면을 잇는다: 세션 목록의 "당신 차례" → 잠금화면 Live Activity → 마지막 Γ 심볼.
 * 제품 화면은 v2 시안 PNG(assets/img, prepare.sh)만 쓰고, 코드로는 모션 그래픽 레이어만 그린다.
 * 화면은 시각 t 의 순수 함수다(engine.js 규칙). 언어는 lang.js 의 window.LANG. */
const { ease, prog, kf, clamp, lerp, css, h, s, cue, bezier } = REEL;
REEL.config({ duration: 40, fps: 30, width: 1920, height: 1080, audio: null });

const BE = bezier(0.2, 0, 0, 1);      // 브랜드 감속형(BRAND §7)
const BX = bezier(0.3, 0, 1, 1);      // 브랜드 퇴장
const L = window.LANG === 'en' ? 'en' : 'ko';
document.documentElement.lang = L;
const T = { s02: cue('scene.s02', 6), s03: cue('scene.s03', 14), s04: cue('scene.s04', 22), s05: cue('scene.s05', 30) };

const COPY = {
  ko: {
    c1: ['자리를 비운 사이,', '에이전트가 당신을 기다립니다.'],
    c2: ['잠금화면에서', '바로 허용합니다.'],
    allowed: '허용됨 · Mac mini에서 실행 중',
    wrist: 'Apple Watch에서도.',
    c3: ['여러 에이전트, 여러 컴퓨터.', '한 화면에서.'],
    agents: 'Claude Code · Codex · Gemini CLI · OpenCode',
    c4: ['Claude가 한도에 닿으면,', 'Codex가 이어받습니다.'],
    turn: '당신 차례', running: '실행 중', done: '완료', offline: '오프라인', waiting: '대기',
    limit5: '5시간 한도', weekly: '주간 한도', reset: '리셋 대기 · 1:42',
    claudeAcct: '개인 Max', codexAcct: 'ChatGPT 계정',
    proFeature: 'Pro 기능',
    task: 'Kumquat · 페이월 리팩터', summary: '요약 1.2k 토큰과 diff를 함께 넘김', files: '파일 11',
    nodes: ['내 기기', '내 클라우드 계정', '내 컴퓨터'], fallback: '직접 닿지 않을 때만',
    z1: '우리 서버 0대.', z2: '내 컴퓨터와 내 기기, 내 클라우드 계정만.',
    devices: 'iPhone · iPad · Mac · Apple Watch · Android · Windows', soon: '출시 준비 중',
    rows: [
      ['HyroxSim · 위젯 테스트', 'Gemini CLI · Mac mini', 'xcodebuild test', 'run', '42/118'],
      ['DynoCam · 캡처 파이프라인', 'Codex · MacBook Pro', 'swift build', 'idle-run', '72%'],
      ['Kumquat · 페이월 리팩터', 'Claude Code · Mac mini', 'git push origin feat/paywall', 'turn', ''],
      ['NudgeMate · ATT 문구', 'Claude Code · Mac mini', 'gh pr create', 'done', ''],
      ['TripFit · 크롤러', 'OpenCode · Windows PC', 'npm run crawl', 'offline', ''],
    ],
  },
  en: {
    c1: ['While you’re away,', 'an agent is waiting for you.'],
    c2: ['Allow it right from', 'the Lock Screen.'],
    allowed: 'Allowed · running on Mac mini',
    wrist: 'Or from Apple Watch.',
    c3: ['Every agent, every computer.', 'On one screen.'],
    agents: 'Claude Code · Codex · Gemini CLI · OpenCode',
    c4: ['When Claude hits its limit,', 'Codex takes over.'],
    turn: 'Your turn', running: 'Running', done: 'Done', offline: 'Offline', waiting: 'Waiting',
    limit5: '5-hour limit', weekly: 'Weekly limit', reset: 'Waiting for reset · 1:42',
    claudeAcct: 'Personal Max', codexAcct: 'ChatGPT account',
    proFeature: 'Pro feature',
    task: 'Kumquat · paywall refactor', summary: 'Hands over a 1.2k-token summary and the diff', files: '11 files',
    nodes: ['Your devices', 'Your cloud account', 'Your computer'], fallback: 'only when there’s no direct route',
    z1: 'Zero servers of ours.', z2: 'Only your computer, your devices and your cloud account.',
    devices: 'iPhone · iPad · Mac · Apple Watch · Android · Windows', soon: 'Coming soon',
    rows: [
      ['HyroxSim · widget tests', 'Gemini CLI · Mac mini', 'xcodebuild test', 'run', '42/118'],
      ['DynoCam · capture pipeline', 'Codex · MacBook Pro', 'swift build', 'idle-run', '72%'],
      ['Kumquat · paywall refactor', 'Claude Code · Mac mini', 'git push origin feat/paywall', 'turn', ''],
      ['NudgeMate · ATT copy', 'Claude Code · Mac mini', 'gh pr create', 'done', ''],
      ['TripFit · crawler', 'OpenCode · Windows PC', 'npm run crawl', 'offline', ''],
    ],
  },
}[L];

// ── helpers ─────────────────────────────────────────────────────────────
function icon(parent, name, size, color) {
  const e = h('span', 'ico a', parent);
  e.innerHTML = window.ICONS[name];
  css(e, { width: size + 'px', height: size + 'px', color });
  return e;
}
function caption(parent, lines, x, bottom, color, color2) {
  const c = h('div', 'cap', parent);
  css(c, { left: x + 'px', bottom: bottom + 'px', color });
  const spans = lines.map((t, i) => { const sp = h('span', i ? 'l2' : '', c, t); css(sp, { display: 'block' }); if (i && color2) sp.style.color = color2; return sp; });
  return { el: c, spans };
}
// 줄마다 아래에서 올라오는 등장, 끝에서 위로 빠지는 퇴장
function showLines(spans, lt, at, outAt) {
  spans.forEach((sp, i) => {
    const p = prog(lt, at + i * 0.18, 0.6, BE);
    const o = outAt == null ? 0 : prog(lt, outAt + i * 0.05, 0.35, BX);
    css(sp, { opacity: p * (1 - o), transform: `translateY(${(1 - p) * 28 - o * 24}px)` });
  });
}
function phoneImg(parent, src, x, y, height) {
  const k = height / 2622;
  const g = h('div', 'a', parent);
  css(g, { left: x + 'px', top: y + 'px', width: '1206px', height: '2622px', transformOrigin: '0 0', transform: `scale(${k})` });
  const im = REEL.img(src); g.appendChild(im); css(im, { position: 'absolute', left: 0, top: 0, width: '1206px', height: '2622px' });
  return { g, k, im };
}

// ── 장면 위치 상수(겹치는 장면 사이 매치 컷용) ─────────────────────────────
const LIST = { x: 720, y: 170, w: 1100, row: 122 };
const TURN_ROW = 2;
const SORT = (t) => prog(t, 2.35, 0.75, BE);              // 2.35s: 당신 차례인 세션이 목록 맨 위로
const TILE0 = { x: LIST.x, y: LIST.y + TURN_ROW * LIST.row + (LIST.row - 52) / 2, s: 52, r: 12 };
const rowIndex = (i, t) => (i === TURN_ROW ? lerp(TURN_ROW, 0, SORT(t)) : i < TURN_ROW ? lerp(i, i + 1, SORT(t)) : i);
const PHONE2 = { x: 1210, y: 60, h: 960 };
const K2 = PHONE2.h / 2622;
const TILE1 = { x: PHONE2.x + 84 * K2, y: PHONE2.y + 1498 * K2, s: 60 * K2, r: 15 * K2 };   // Live Activity 의 당신 차례 타일
// 엔드카드 로고: 브랜드 lockup SVG 의 크기와(있다면) 브랜드 강조색으로 칠한 커서 블록 위치를 읽는다.
// 커서가 있는 로고면 영상의 커서가 그 자리로 들어가고, 없으면 로고가 왼쪽부터 드러난다.
const LOGO_GEO = (() => {
  const svg = new DOMParser().parseFromString(window.LOGO.lockup, 'image/svg+xml').documentElement;
  const [, , vw, vh] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
  const acc = (window.LOGO.accent || '').toLowerCase();
  const el = acc ? [...svg.querySelectorAll('rect')].find((e) => (e.getAttribute('fill') || '').toLowerCase() === acc) : null;
  const num = (e, a) => Number(e.getAttribute(a) || 0);
  return { vw, vh, cursor: el ? { x: num(el, 'x'), y: num(el, 'y'), w: num(el, 'width'), h: num(el, 'height'), r: num(el, 'rx') } : null };
})();
const LOCK = { x: 120, y: 330, k: 1051 / LOGO_GEO.vw };
const CUR_END = LOGO_GEO.cursor && { x: LOCK.x + LOGO_GEO.cursor.x * LOCK.k, y: LOCK.y + LOGO_GEO.cursor.y * LOCK.k, w: LOGO_GEO.cursor.w * LOCK.k, h: LOGO_GEO.cursor.h * LOCK.k, r: LOGO_GEO.cursor.r * LOCK.k };

// ── 배경: 밤(s01–s02) ────────────────────────────────────────────────────
REEL.overlay(() => {}, { layer: 'back', setup: (p) => { const b = h('div', 'full', p); css(b, { background: 'var(--night)' }); } });

// ── s01 기다림 ───────────────────────────────────────────────────────────
REEL.scene({
  id: 's01', start: 0, end: T.s02 - 0.5 / 30,
  setup(el) {
    this.rows = COPY.rows.map((r, i) => {
      const row = h('div', 'a', el);
      css(row, { left: LIST.x + 'px', top: LIST.y + i * LIST.row + 'px', width: LIST.w + 'px', height: LIST.row + 'px', borderTop: '1px solid var(--night-line)' });
      const st = r[3];
      const ic = st === 'turn' ? null
        : icon(row, st === 'run' ? 'circle-notch' : st === 'idle-run' ? 'pause-circle' : st === 'done' ? 'check-circle' : 'cloud-slash', 40,
          st === 'run' ? 'var(--running-d)' : st === 'done' ? 'var(--success-d)' : 'var(--night-3)');
      if (ic) css(ic, { left: '6px', top: (LIST.row - 40) / 2 + 'px' });
      const run = st === 'turn' ? icon(row, 'circle-notch', 40, 'var(--running-d)') : null;
      if (run) css(run, { left: '4px', top: (LIST.row - 40) / 2 + 'px' });
      const name = h('div', 'a', row, r[0]); css(name, { left: '80px', top: '20px', fontSize: '34px', fontWeight: 600, color: 'var(--night-text)', letterSpacing: '-0.01em' });
      const meta = h('div', 'a', row, r[1]); css(meta, { left: '80px', top: '68px', fontSize: '24px', color: 'var(--night-3)' });
      const cmd = h('div', 'a mono', row, r[2]); css(cmd, { left: '560px', top: '42px', fontSize: '25px', color: 'var(--night-2)' });
      const label = { run: r[4], 'idle-run': r[4], done: COPY.done, offline: COPY.offline, turn: r[4] }[st];
      const rt = h('div', 'a', row, label); css(rt, { right: '0', top: '42px', fontSize: '25px', color: 'var(--night-3)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' });
      return { row, run, rt, st };
    });
    const last = h('div', 'a', el); css(last, { left: LIST.x + 'px', top: LIST.y + COPY.rows.length * LIST.row + 'px', width: LIST.w + 'px', borderTop: '1px solid var(--night-line)' });
    this.last = last;
    this.cap = caption(el, COPY.c1, 120, 150, 'var(--night-text)', 'var(--night-2)');
    css(this.cap.el, { width: '580px' });
  },
  render(lt) {
    const out = prog(lt, 4.7, 0.5, BX);
    this.rows.forEach((r, i) => {
      const p = prog(lt, -0.35 + i * 0.07, 0.8, BE);
      const drift = -18 * prog(lt, 0, 5.2, ease.inOutSine);
      const dyRow = (rowIndex(i, lt) - i) * LIST.row;
      css(r.row, { opacity: p * (1 - out), transform: `translateY(${(1 - p) * 24 + drift + dyRow}px) translateX(${-out * 420}px)`, zIndex: i === TURN_ROW ? 2 : 1 });
      if (i === 0) r.rt.textContent = `${42 + Math.floor(prog(lt, 0.4, 4.2, ease.linear) * 9)}/118`;
      if (i === 1) {
        const fin = lt >= 3.1;
        r.rt.textContent = fin ? COPY.done : `${72 + Math.floor(prog(lt, 0.4, 2.6, ease.linear) * 27)}%`;
        r.row.children[0].innerHTML = window.ICONS[fin ? 'check-circle' : 'pause-circle'];
        r.row.children[0].style.color = fin ? 'var(--success-d)' : 'var(--night-3)';
        r.row.children[0].style.transform = `scale(${fin ? lerp(0.92, 1, prog(lt, 3.1, 0.25, BE)) : 1})`;
      }
      if (r.st === 'run') r.row.children[0].style.transform = `rotate(${(lt / 1.2) * 360}deg)`;   // 화면에서 하나만 돈다
      if (r.st === 'turn') {
        const on = lt >= 1.2;
        r.run.style.opacity = on ? 0 : 1;
        r.rt.textContent = on ? COPY.turn : COPY.running;
        css(r.rt, { color: on ? 'var(--signal-d)' : 'var(--night-3)', fontWeight: on ? 600 : 400 });
        r.row.style.background = on ? `linear-gradient(rgba(var(--signal-d-rgb),${0.06 * prog(lt, 1.2, 0.25, BE)}), rgba(var(--signal-d-rgb),${0.06 * prog(lt, 1.2, 0.25, BE)})), var(--night)` : 'var(--night)';
      }
    });
    css(this.last, { opacity: 1 - out, transform: `translateY(${-18 * prog(lt, 0, 5.2, ease.inOutSine)}px) translateX(${-out * 420}px)` });
    showLines(this.cap.spans, lt, 1.7, 4.75);
  },
});

// ── s02 잠금화면 승인 ─────────────────────────────────────────────────────
REEL.scene({
  id: 's02', start: T.s02 - 0.9, end: T.s03,
  setup(el) {
    this.ph = phoneImg(el, '../assets/img/iOS-Lock-dark.png', PHONE2.x, PHONE2.y, PHONE2.h);
    const g = this.ph.g;
    // 알림과 메뉴 자리는 잠금화면 바탕색으로 덮었다가, 같은 시안을 잘라 낸 조각으로 차례로 보여 준다
    this.cover = h('div', 'a', g); css(this.cover, { left: 0, top: '1606px', width: '1206px', height: '734px', background: (window.MOCKUP_BG || {})['iOS-Lock-dark'] || 'var(--night)' });
    const piece = (inset, origin) => {
      const im = REEL.img('../assets/img/iOS-Lock-dark.png'); g.appendChild(im);
      css(im, { position: 'absolute', left: 0, top: 0, width: '1206px', height: '2622px', clipPath: `inset(${inset})`, transformOrigin: origin });
      return im;
    };
    this.note = piece('1622px 24px 722px 24px', '603px 1760px');
    this.menu = piece('1912px 20px 286px 352px', '1170px 1912px');
    this.tap = h('div', 'a', g); css(this.tap, { left: '700px', top: '1928px', width: '120px', height: '120px', borderRadius: '60px', background: 'rgba(var(--night-text-rgb), .28)' });
    this.watch = frameImg(el, '../assets/img/watchOS-Approve-dark.png', 624, 744, 820, 470, 300, 0);
    this.cap = caption(el, [...COPY.c2, COPY.wrist], 120, 150, 'var(--night-text)', 'var(--night-2)');
    this.ok = h('div', 'a', el); css(this.ok, { left: '120px', bottom: '84px', fontSize: '30px', color: 'var(--night-2)', display: 'flex', alignItems: 'center', gap: '12px', height: '36px' });
    const ic = icon(this.ok, 'check-circle', 34, 'var(--success-d)'); css(ic, { position: 'relative' });
    h('span', '', this.ok, COPY.allowed);
  },
  render(lt) {
    const t0 = 0.9;                       // 장면 큐(6.0) = lt 0.9
    const enter = prog(lt, 0.25, 0.9, BE);
    const exit = prog(lt, 8.9 - 0.6, 0.5, BX);
    const push = prog(lt, t0 + 1.2, 3.2, ease.inOutSine) * (1 - prog(lt, t0 + 5.0, 1.6, ease.inOutSine));
    const k = K2 * (1 + 0.1 * push);
    css(this.ph.g, { transform: `translate(${-push * 70}px, ${(1 - enter) * 320 - push * 30 - exit * 120}px) scale(${k})`, opacity: enter * (1 - exit) });
    // 알림 등장(6.9) → 길게 눌러 메뉴(8.6) → 허용 탭(10.0) → 메뉴·알림 닫힘
    const tTap = 10.0 - (T.s02 - 0.9);
    const nIn = prog(lt, t0 + 0.9, 0.5, BE), nOut = prog(lt, tTap + 0.55, 0.4, BX);
    css(this.note, { opacity: nIn * (1 - nOut), transform: `translateY(${(1 - nIn) * 120 - nOut * 60}px) scale(${1 - nOut * 0.04})` });
    const mIn = prog(lt, tTap - 1.4, 0.35, BE), mOut = prog(lt, tTap + 0.25, 0.3, BX);
    css(this.menu, { opacity: mIn * (1 - mOut), transform: `scale(${lerp(0.94, 1, mIn) - mOut * 0.04})` });
    const tp = prog(lt, tTap - 0.25, 0.5, ease.linear);
    css(this.tap, { opacity: tp > 0 && tp < 1 ? Math.sin(tp * Math.PI) : 0, transform: `scale(${lerp(0.5, 1.1, tp)})` });
    showLines(this.cap.spans.slice(0, 2), lt, t0 + 0.6, 8.9 - 0.7);
    showLines(this.cap.spans.slice(2), lt, tTap + 1.9, 8.9 - 0.7);
    const w = prog(lt, tTap + 1.7, 0.8, BE) * (1 - prog(lt, 8.9 - 0.6, 0.45, BX));
    css(this.watch.g, { opacity: w, transform: `translateY(${(1 - w) * 140}px)` });
    const ok = prog(lt, tTap + 0.7, 0.5, BE) * (1 - prog(lt, 8.9 - 0.7, 0.35, BX));
    css(this.ok, { opacity: ok, transform: `translateY(${(1 - ok) * 16}px)` });
  },
});

// ── s03 한 화면에서(밝아짐): iPad 관제 그리드 → Mac 워크스페이스 ───────────────
function frameImg(parent, src, w0, h0, x, y, width, radius) {
  const k = width / w0;
  const vp = h('div', 'a', parent);
  css(vp, { left: x + 'px', top: y + 'px', width: width + 'px', height: h0 * k + 'px', borderRadius: radius + 'px', overflow: 'hidden',
    boxShadow: radius ? '0 0 0 1.5px rgba(var(--shadow-rgb),.16), 0 30px 60px rgba(var(--shadow-rgb),.10)' : 'none' });
  const im = REEL.img(src); vp.appendChild(im);
  css(im, { position: 'absolute', left: 0, top: 0, width: w0 + 'px', height: h0 + 'px', transformOrigin: '0 0', transform: `scale(${k})` });
  // z 배 확대하되 시안 좌표 (px, py) 가 제자리에 머물게 한다
  const zoom = (z, px, py) => { im.style.transform = `translate(${px * k * (1 - z)}px, ${py * k * (1 - z)}px) scale(${k * z})`; };
  return { g: vp, vp, im, k, zoom };
}
REEL.scene({
  id: 's03', start: T.s03 - 0.5, end: T.s04,
  setup(el) {
    this.root = h('div', 'full', el); css(this.root, { background: 'var(--bg)' });
    this.ipad = frameImg(this.root, '../assets/img/iPad-Grid-light.png', 2752, 2064, 790, 150, 1080, 26);
    this.mac = frameImg(this.root, '../assets/img/Mac-Workspace-light.png', 2880, 1800, 780, 200, 1080, 14);
    this.cap = caption(this.root, COPY.c3, 120, 214, 'var(--ink)', 'var(--ink2)');
    css(this.cap.el, { width: '600px' });
    this.ag = h('div', 'a', this.root, COPY.agents); css(this.ag, { left: '120px', bottom: '150px', fontSize: '26px', color: 'var(--ink3)', width: '600px' });
  },
  render(lt) {
    const wipe = prog(lt, 0, 0.5, ease.swift);
    css(this.root, { clipPath: `inset(${(1 - wipe) * 100}% 0 0 0)` });
    const out = prog(lt, 8.5 - 0.5, 0.45, BX);
    const swap = 4.3;                                   // iPad → Mac(18.3)
    const e1 = prog(lt, 0.25, 0.9, BE), x1 = prog(lt, swap, 0.7, BE);
    css(this.ipad.g, { opacity: e1 * (1 - x1), transform: `translate(${-x1 * 260}px, ${(1 - e1) * 260}px) scale(${1 - 0.04 * x1})` });
    // iPad: 답을 기다리는 Kumquat 타일로 다가갔다가(15.6–16.9) 빠진다
    const zi = prog(lt, 2.1, 1.2, BE) * (1 - prog(lt, 3.6, 0.7, BE));
    this.ipad.zoom(1 + 0.8 * zi, 985, 300);
    const e2 = prog(lt, swap + 0.1, 0.8, BE);
    css(this.mac.g, { opacity: e2 * (1 - out), transform: `translate(${(1 - e2) * 420 - out * 900}px, 0px)` });
    // Mac: 대화 위의 승인 요청 줄로 다가간다(19.6–)
    const zm = prog(lt, swap + 1.3, 1.3, BE) * (1 - prog(lt, 7.6, 0.4, BE));
    this.mac.zoom(1 + 0.7 * zm, 1430, 430);
    showLines(this.cap.spans, lt, 1.0, 8.5 - 0.6);
    const a = prog(lt, 1.8, 0.6, BE) * (1 - prog(lt, 8.5 - 0.6, 0.35, BX));
    css(this.ag, { opacity: a, transform: `translateY(${(1 - a) * 16}px)` });
  },
});

// ── s04 인계(Pro) ───────────────────────────────────────────────────────
REEL.scene({
  id: 's04', start: T.s04 - 0.2, end: T.s05,
  setup(el) {
    this.root = h('div', 'full', el); css(this.root, { background: 'var(--bg)' });
    const card = (x, name, acct, gaugeLabel) => {
      const c = h('div', 'a', this.root);
      css(c, { left: x + 'px', top: '170px', width: '500px', height: '660px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '20px' });
      const n = h('div', 'a', c, name); css(n, { left: '40px', top: '36px', fontSize: '40px', fontWeight: 600, letterSpacing: '-0.02em' });
      const a = h('div', 'a', c, acct); css(a, { left: '40px', top: '92px', fontSize: '24px', color: 'var(--ink3)' });
      const st = h('div', 'a', c); css(st, { left: '40px', top: '150px', height: '36px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '24px', color: 'var(--ink2)' });
      const icRun = icon(st, 'circle-notch', 30, 'var(--accent)'); css(icRun, { position: 'relative' });
      const icWait = icon(st, 'pause-circle', 30, 'var(--ink3)'); css(icWait, { position: 'relative' });
      const stText = h('span', '', st);
      const gl = h('div', 'a', c, gaugeLabel); css(gl, { left: '40px', top: '236px', fontSize: '22px', color: 'var(--ink3)' });
      const num = h('div', 'a', c); css(num, { right: '40px', top: '214px', fontSize: '56px', fontWeight: 600, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' });
      const bars = h('div', 'a', c); css(bars, { left: '40px', right: '40px', top: '300px', height: '16px', display: 'flex', gap: '5px' });
      const segs = Array.from({ length: 20 }, () => { const b = h('i', '', bars); css(b, { flex: 1, background: 'var(--sunken)', borderRadius: '3px' }); return b; });
      return { c, icRun, icWait, stText, num, segs };
    };
    this.cam = h('div', 'full', this.root);
    const root = this.root; this.root = this.cam;
    this.A = card(760, 'Claude Code', COPY.claudeAcct, COPY.limit5);
    this.B = card(1300, 'Codex', COPY.codexAcct, COPY.weekly);
    // 작업 카드: Claude 열에서 Codex 열로 넘어간다
    this.task = h('div', 'a', this.root);
    css(this.task, { left: '800px', top: '572px', width: '420px', height: '236px', background: 'var(--sunken)', borderRadius: '14px', padding: '30px', boxSizing: 'border-box' });
    const tt = h('div', '', this.task, COPY.task); css(tt, { fontSize: '28px', fontWeight: 600, letterSpacing: '-0.01em' });
    const td = h('div', 'mono', this.task); css(td, { fontSize: '24px', marginTop: '18px', color: 'var(--ink2)' });
    td.innerHTML = `<span style="color:var(--success)">+412</span> <span style="color:var(--danger-text)">−188</span> · ${COPY.files}`;
    const ts = h('div', '', this.task, COPY.summary); css(ts, { fontSize: '22px', marginTop: '18px', color: 'var(--ink3)', lineHeight: 1.35 });
    this.log = ['Edit PaywallView.swift', 'Edit SubscriptionStore.swift', 'Run swift test  PASS 64', 'git commit'].map((t, i) => {
      const ln = h('div', 'a mono', this.root, t);
      css(ln, { left: '800px', top: '512px', fontSize: '21px', color: 'var(--ink2)' });
      return ln;
    });
    this.root = root;
    this.cap = caption(this.root, COPY.c4, 120, 214, 'var(--ink)', 'var(--ink2)');
    css(this.cap.el, { width: '600px' });
    this.pro = h('div', 'a', this.root, COPY.proFeature); css(this.pro, { left: '120px', bottom: '150px', fontSize: '24px', fontWeight: 600, color: 'var(--on-accent-c)', background: 'var(--accent-c)', borderRadius: '6px', padding: '2px 12px' });
  },
  render(lt) {
    const t0 = 0.2;
    const tHand = 27.6 - (T.s04 - 0.2);
    const out = prog(lt, 8.2 - 0.45, 0.45, BX);
    const tH = 27.6 - (T.s04 - 0.2);
    const push = prog(lt, 1.0, tH - 1.2, ease.inOutSine);
    const follow = prog(lt, tH - 0.1, 1.0, BE);
    const ox = lerp(1010, 1550, follow), oz = 1 + 0.1 * push - 0.03 * follow;
    css(this.cam, { transformOrigin: `${ox}px 470px`, transform: `scale(${oz})` });
    [this.A, this.B].forEach((X, i) => {
      const e = prog(lt, i * 0.12, 0.8, BE);
      css(X.c, { opacity: e * (1 - out), transform: `translate(${(1 - e) * 700}px, ${-out * 160}px)` });
    });
    const lq = Math.floor(lt * 30) / 30;                // 숫자는 프레임 단위로만 바뀐다(모션 블러에 겹치지 않게)
    const pct = Math.round(lerp(81, 95, prog(lq, t0 + 0.6, tHand - t0 - 1.4, ease.inOutSine)));
    const handed = lt >= tHand;
    this.A.num.textContent = pct + '%';
    this.A.segs.forEach((b, i) => { b.style.background = (i + 1) * 5 <= pct ? 'var(--ink)' : 'var(--sunken)'; });
    this.B.num.textContent = '46%';
    const hv = prog(lt, tHand, 0.4, BE);
    this.A.c.style.opacity = String(Number(this.A.c.style.opacity || 1) * (1 - 0.35 * hv));
    this.B.c.style.boxShadow = `0 0 0 ${2 * hv}px var(--accent)`;
    this.B.segs.forEach((b, i) => { b.style.background = (i + 1) * 5 <= 46 ? 'var(--ink)' : 'var(--sunken)'; });
    // 상태: Claude 실행 중 → 리셋 대기, Codex 대기 → 실행 중(화면에서 도는 아이콘은 하나)
    this.A.icRun.style.display = handed ? 'none' : ''; this.A.icWait.style.display = handed ? '' : 'none';
    this.A.stText.textContent = handed ? COPY.reset : COPY.running;
    this.B.icRun.style.display = handed ? '' : 'none'; this.B.icWait.style.display = handed ? 'none' : '';
    this.B.stText.textContent = handed ? COPY.running : COPY.waiting;
    (handed ? this.B : this.A).icRun.style.transform = `rotate(${(lt / 1.2) * 360}deg)`;
    const mv = prog(lt, tHand - 0.15, 0.75, BE);
    const lift = Math.sin(mv * Math.PI);
    const te = prog(lt, t0 + 0.5, 0.7, BE);
    // Claude 카드 안에서 지금 하는 일이 한 줄씩 바뀐다(인계되면 멈춘다)
    this.log.forEach((ln, i) => {
      const a = prog(lt, t0 + 1.1 + i * 0.95, 0.3, BE), b = i < 3 ? prog(lt, t0 + 0.8 + (i + 1) * 0.95, 0.25, BX) : prog(lt, tHand - 0.3, 0.3, BX);
      css(ln, { opacity: a * (1 - b) * (1 - out), transform: `translate(${(1 - prog(lt, t0 + 0.1, 0.8, BE)) * 700}px, ${(1 - a) * 12 - b * 12 - out * 160}px)` });
    });
    css(this.task, { opacity: te * (1 - out), transform: `translate(${(1 - te) * 700 + mv * 540}px, ${-lift * 18 - out * 160}px) scale(${1 + lift * 0.03})`,
      boxShadow: `0 ${lift * 18}px ${lift * 36}px rgba(var(--shadow-rgb),${0.12 * lift})` });
    showLines(this.cap.spans, lt, t0 + 0.7, 8.2 - 0.6);
    const pr = prog(lt, t0 + 1.6, 0.4, bezier(0.34, 1.56, 0.64, 1)) * (1 - prog(lt, 8.2 - 0.6, 0.35, BX));
    css(this.pro, { opacity: clamp(pr), transform: `scale(${lerp(0.92, 1, clamp(pr))})`, transformOrigin: '0 50%' });
  },
});

// ── s05 서버 0대 → 로고 ─────────────────────────────────────────────────
REEL.scene({
  id: 's05', start: T.s05 - 0.2, end: 40,
  setup(el) {
    this.root = h('div', 'full', el); css(this.root, { background: 'var(--bg)' });
    const Y = 250, xs = [330, 960, 1590], YC = 450;
    this.svg = s('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, this.root);
    css(this.svg, { position: 'absolute', left: 0, top: 0 });
    const path = (d, w, col) => { const p = s('path', { d, fill: 'none', stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, this.svg); const L = p.getTotalLength(); p.style.strokeDasharray = L; p._len = L; return p; };
    this.lines = [path(`M${xs[0] + 150},${Y} L${xs[2] - 150},${Y}`, 3, 'var(--accent)')];          // 직접 연결
    this.fall = [path(`M${xs[0]},${Y + 128} Q${xs[0] + 60},${YC + 10} ${xs[1] - 90},${YC + 10}`, 2, 'var(--line2)'),
                 path(`M${xs[1] + 90},${YC + 10} Q${xs[2] - 60},${YC + 10} ${xs[2]},${Y + 128}`, 2, 'var(--line2)')];
    this.dot = s('circle', { r: 9, cy: Y, fill: 'var(--accent)' }, this.svg);
    const icons = [['device-mobile', 'device-tablet', 'laptop', 'watch'], ['cloud'], ['desktop']];
    const at = [[xs[0], Y], [xs[1], YC], [xs[2], Y]];
    this.nodes = at.map(([x, y], i) => {
      const n = h('div', 'a', this.root); css(n, { left: x - 220 + 'px', top: y - 50 + 'px', width: '440px', height: '200px' });
      const row = h('div', 'a', n); css(row, { left: 0, right: 0, top: 0, height: '100px', display: 'flex', justifyContent: 'center', gap: '10px' });
      icons[i].forEach((nm) => { const e = icon(row, nm, icons[i].length > 1 ? 64 : 100, i === 1 ? 'var(--ink2)' : 'var(--ink)'); css(e, { position: 'relative', alignSelf: 'center' }); });
      const t = h('div', 'a', n, COPY.nodes[i]); css(t, { left: 0, right: 0, top: '112px', textAlign: 'center', fontSize: '32px', fontWeight: 600, color: i === 1 ? 'var(--ink2)' : 'var(--ink)' });
      if (i === 1) { const fb = h('div', 'a', n, COPY.fallback); css(fb, { left: 0, right: 0, top: '156px', textAlign: 'center', fontSize: '24px', color: 'var(--ink3)' }); }
      return n;
    });
    this.z1 = h('div', 'a', this.root, COPY.z1); css(this.z1, { left: '120px', top: '660px', fontSize: '80px', fontWeight: 600, letterSpacing: '-0.025em' });
    this.z2 = h('div', 'a', this.root, COPY.z2); css(this.z2, { left: '120px', top: '762px', width: '1680px', fontSize: L === 'en' ? '60px' : '72px', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--ink2)', textWrap: 'balance' });
    // 엔드카드 로고: 브랜드 lockup SVG 를 그대로 쓰고, 커서는 전역 커서가 들어와 채운다
    this.logo = h('div', 'a', this.root); css(this.logo, { left: LOCK.x + 'px', top: LOCK.y + 'px', width: LOGO_GEO.vw * LOCK.k + 'px', height: LOGO_GEO.vh * LOCK.k + 'px' });
    this.logo.innerHTML = window.LOGO.lockup.replace(/<title>.*?<\/title>/, '').replace(/ width="[\d.]+" height="[\d.]+"/, ' width="100%" height="100%"');
    const acc = (window.LOGO.accent || '').toLowerCase();
    const cur = acc && [...this.logo.querySelectorAll('rect')].find((e) => (e.getAttribute('fill') || '').toLowerCase() === acc);
    if (cur) cur.style.opacity = 0;                                    // 영상의 커서가 이 자리를 채운다
    this.mark = this.logo.querySelector('svg');
    this.dev = h('div', 'a', this.root); css(this.dev, { left: LOCK.x + 'px', top: LOCK.y + LOGO_GEO.vh * LOCK.k + 64 + 'px', fontSize: '42px', fontWeight: 500, color: 'var(--ink2)' });
    this.dev.textContent = `${COPY.devices}  ·  ${COPY.soon}`;
    this.xs = xs;
  },
  render(lt) {
    const t0 = 0.2;
    const out = prog(lt, 4.0, 0.4, BX);
    this.nodes.forEach((n, i) => {
      const e = i === 1 ? prog(lt, 1.4, 0.6, BE) : prog(lt, 0.05 + i * 0.15, 0.7, BE);
      css(n, { opacity: e * (1 - out), transform: `translateY(${(1 - e) * (i === 1 ? 40 : 220) - out * 30}px)` });
    });
    this.lines.forEach((p) => { p.style.strokeDashoffset = p._len * (1 - prog(lt, 0.4, 0.8, BE)); p.style.opacity = 1 - out; });
    this.fall.forEach((p, i) => { p.style.strokeDashoffset = p._len * (1 - prog(lt, 1.3 + i * 0.25, 0.7, BE)); p.style.opacity = 1 - out; });
    const run = ((lt - 1.2) / 1.6) % 1;
    const xA = this.xs[0] + 150, xB = this.xs[2] - 150;
    this.dot.setAttribute('cx', lerp(xA, xB, ease.inOutSine(clamp(run))));
    this.dot.style.opacity = lt > 1.2 ? (1 - out) * Math.min(1, (lt - 1.2) * 4) : 0;
    const z1 = prog(lt, t0 + 1.6, 0.6, BE), z2 = prog(lt, t0 + 2.5, 0.6, BE);
    css(this.z1, { opacity: z1 * (1 - out), transform: `translateY(${(1 - z1) * 40 - out * 30}px)` });
    css(this.z2, { opacity: z2 * (1 - out), transform: `translateY(${(1 - z2) * 40 - out * 30}px)` });
    // 로고 조립: 커서가 자리를 잡고(34.9) 프레임이 자란 뒤(35.0–35.7) 워드마크(35.6–36.3)
    const tl = 34.55 - (T.s05 - 0.2);
    const fr = prog(lt, tl, 1.1, BE);                                  // 로고가 왼쪽부터 드러난다
    css(this.mark, { clipPath: `inset(0 ${(1 - fr) * 100}% 0 0)`, opacity: fr > 0 ? 1 : 0, transform: `translateX(${(1 - fr) * -12}px)` });
    const dv = prog(lt, tl + 1.4, 0.6, BE);
    css(this.dev, { opacity: dv, transform: `translateY(${(1 - dv) * 16}px)` });
  },
});

// ── 전역 커서 블록 ──────────────────────────────────────────────────────
REEL.overlay((t) => {
  const c = window.__cursor;
  if (!c) return;
  // 1) s01: Kumquat 줄에서 켜진다(1.2)  2) 4.8–6.3: 잠금화면 Live Activity 타일로  3) 34.4–35.0: 로고의 커서 자리로
  let vis = 0, x = TILE0.x, y = TILE0.y, w = TILE0.s, hh = TILE0.s, r = TILE0.r, icon = 1, col = 'var(--signal-d)';
  if (t >= 1.2 && t < 6.8) {
    vis = 1;
    const m = prog(t, 4.75, 1.55, BE);
    x = lerp(TILE0.x, TILE1.x, m); y = lerp(TILE0.y, TILE1.y, m);
    w = hh = lerp(TILE0.s, TILE1.s, m); r = lerp(TILE0.r, TILE1.r, m);
    const outS01 = prog(t, 4.7, 0.5, BX);
    x -= outS01 * 120 * (1 - m);                                  // 목록과 함께 잠깐 밀렸다가 떠난다
    y += (-18 * prog(t, 0, 5.2, ease.inOutSine) + (rowIndex(TURN_ROW, t) - TURN_ROW) * LIST.row) * (1 - m);
    vis = 1 - prog(t, 6.45, 0.25, ease.linear);                   // 시안의 같은 타일에 겹치며 사라진다
    const pop = t < 1.6 ? lerp(0.92, 1, prog(t, 1.2, 0.25, BE)) : 1;
    w *= pop; hh *= pop;
  } else if (t >= 34.15 && CUR_END) {
    vis = prog(t, 34.15, 0.25, BE);
    const m = prog(t, 34.15, 0.55, BE);
    const cx = lerp(960, CUR_END.x + CUR_END.w / 2, m), cy = lerp(540, CUR_END.y + CUR_END.h / 2, m);
    w = lerp(120, CUR_END.w, m); hh = lerp(120, CUR_END.h, m); r = lerp(26, CUR_END.r, m);
    x = cx - w / 2; y = cy - hh / 2; icon = 1 - prog(t, 34.15, 0.3, BE); col = 'var(--signal)';
  }
  css(c, { opacity: vis, left: x + 'px', top: y + 'px', width: w + 'px', height: hh + 'px', borderRadius: r + 'px', background: col, display: vis > 0 ? 'block' : 'none' });
  c.firstChild.style.opacity = icon;
}, { layer: 'top', setup: (p) => {
  const c = h('div', 'a', p); window.__cursor = c; c.style.zIndex = 50;
  const ic = h('span', 'ico a', c); ic.innerHTML = window.ICONS['hand-tap'];
  css(ic, { left: '18%', top: '18%', width: '64%', height: '64%', color: 'var(--on-signal)' });
} });
