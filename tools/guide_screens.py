"""Imports real app captures for the user guide into assets/guide/ (WebP, 2x).

  .venv/bin/python guide_screens.py

Sources (read only): Foreman/docs/screens (Apple apps, brand v3) and the Flutter app's
clients/flutter/docs/screens (Android, Windows). Captures marked as taken with the old
brand colors (android-real-*) are not used. A file in tools/captures/ with the same name
replaces the source capture. Only captures the guide pages use (tools/site/guide-*.mjs) are
published.
"""
import json
import re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
FOREMAN = ROOT.parent / 'Foreman'
FLUTTER = next((p for p in [FOREMAN / 'clients/flutter/docs/screens', ROOT.parent / 'Foreman-wt/flutter/clients/flutter/docs/screens'] if p.exists()), None)
CAPTURES = Path(__file__).resolve().parent / 'captures'
OUT = ROOT / 'assets/guide'

# key: (directory, file stem without -light/-dark, kind, device scale)
SHOTS = {
    'iphone-home': ('apple', 'iPhone-Home', 'phone', 3), 'iphone-inbox': ('apple', 'iPhone-Inbox', 'phone', 3),
    'iphone-session': ('apple', 'iPhone-Session', 'phone', 3), 'iphone-session-danger': ('apple', 'iPhone-SessionDanger', 'phone', 3),
    'iphone-terminal': ('apple', 'iPhone-Terminal', 'phone', 3), 'iphone-changes': ('apple', 'iPhone-Changes', 'phone', 3),
    'iphone-sessions': ('apple', 'iPhone-Sessions', 'phone', 3), 'iphone-hosts': ('apple', 'iPhone-Hosts', 'phone', 3),
    'iphone-agents': ('apple', 'iPhone-Agents', 'phone', 3), 'iphone-search': ('apple', 'iPhone-Search', 'phone', 3),
    'iphone-new-session': ('apple', 'iPhone-NewSession', 'phone', 3), 'iphone-autopilot': ('apple', 'iPhone-Autopilot', 'phone', 3),
    'iphone-pairing': ('apple', 'iPhone-Pairing', 'phone', 3), 'iphone-settings': ('apple', 'iPhone-Settings', 'phone', 3),
    'iphone-paywall': ('apple', 'iPhone-Paywall', 'phone', 3), 'iphone-widgets': ('apple', 'iPhone-Widgets', 'phone', 3),
    'ipad-grid': ('apple', 'iPad-Grid', 'tablet', 2), 'ipad-inbox': ('apple', 'iPad-Inbox', 'tablet', 2), 'ipad-session': ('apple', 'iPad-Session', 'tablet', 2),
    'watch-approve': ('apple', 'Watch-Approve', 'watch', 2),
    'mac-workspace': ('apple', 'Mac-Workspace', 'desktop', 2), 'mac-grid': ('apple', 'Mac-Grid', 'desktop', 2),
    'mac-inbox': ('apple', 'Mac-Inbox', 'desktop', 2), 'mac-menubar': ('apple', 'Mac-MenuBar', 'panel', 2),
    'android-home': ('flutter', 'android-home', 'phone', 2.625), 'android-inbox': ('flutter', 'android-inbox', 'phone', 2.625),
    'android-session': ('flutter', 'android-session-h-macbookpro-0d7c3b55', 'phone', 2.625),
    'android-terminal': ('flutter', 'android-session-h-macmini-5c9d11a0-terminal', 'phone', 2.625),
    'android-changes': ('flutter', 'android-session-h-macmini-3e1a9c20-changes', 'phone', 2.625),
    'android-new-session': ('flutter', 'android-new-session', 'phone', 2.625), 'android-agents': ('flutter', 'android-agents-h-macmini', 'phone', 2.625),
    'android-sessions': ('flutter', 'android-sessions', 'phone', 2.625), 'android-hosts': ('flutter', 'android-hosts', 'phone', 2.625),
    'android-host-offline': ('flutter', 'android-host-h-macstudio', 'phone', 2.625), 'android-settings': ('flutter', 'android-settings', 'phone', 2.625),
    'android-subscription': ('flutter', 'android-subscription', 'phone', 2.625), 'android-pairing': ('flutter', 'android-pairing', 'phone', 2.625),
    'android-notifications': ('flutter', 'android-notifications', 'phone', 2.625),
    'windows-home': ('flutter', 'windows-home', 'desktop', 2), 'windows-sessions': ('flutter', 'windows-sessions', 'desktop', 2),
    'windows-inbox': ('flutter', 'windows-inbox', 'desktop', 2), 'windows-host': ('flutter', 'windows-host', 'desktop', 2),
    'windows-settings': ('flutter', 'windows-settings', 'desktop', 2),
}
MAX_W = {'phone': 2 * 402, 'tablet': 1600, 'watch': 2 * 208, 'desktop': 1800, 'panel': 2 * 320}

SITE = Path(__file__).resolve().parent / 'site'
USED = {k for f in SITE.glob('guide-*.mjs') for k in re.findall(r"key: '([a-z0-9-]+)'", f.read_text())}
unknown = USED - SHOTS.keys()
if unknown:
    raise SystemExit('guide uses unknown captures: ' + ', '.join(sorted(unknown)))

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()
manifest, missing = {}, []
for key, (where, stem, kind, scale) in SHOTS.items():
    if key not in USED:
        continue
    base = FOREMAN / 'docs/screens' if where == 'apple' else FLUTTER
    for mode in ('light', 'dark'):
        name = f'{stem}-{mode}.png'
        src = CAPTURES / name if (CAPTURES / name).exists() else (base / name if base else None)
        if not src or not src.exists():
            continue
        im = Image.open(src).convert('RGB')
        w = min(round(im.width * 2 / scale), MAX_W[kind])
        if w != im.width:
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        dst = OUT / f'{key}-{mode}.webp'
        im.save(dst, 'WEBP', quality=88, method=6)
        e = manifest.setdefault(key, {'kind': kind, 'w': im.width, 'h': im.height, 'source': str(src.relative_to(src.parents[2]))})
        e[mode] = f'assets/guide/{dst.name}'
    if key not in manifest:
        missing.append(key)
    else:
        manifest[key].setdefault('light', manifest[key].get('dark'))
(OUT / 'guide.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
print(f'{len(manifest)} captures', '· missing: ' + ', '.join(missing) if missing else '')
