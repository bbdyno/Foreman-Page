"""Imports the site's product screens: real app captures where they exist, brand mockups otherwise.

  .venv/bin/python screens.py [path/to/mockups]

Each screen becomes assets/screens/<key>-<mode>.webp, scaled to 2x of its point size, and
assets/screens/screens.json lists what exists. Sources, first match wins:
  1. tools/captures/<mockup name>-<mode>.png (a capture dropped in by hand)
  2. REAL: captures of the built apps in Foreman/docs/screens (Apple) and
     Foreman/clients/flutter/docs/screens (Android, Windows)
  3. the brand mockups (Foreman/docs/design/v3/mockups/2x)
The Foreman repository is only read. Screens with no source are left out of the site.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT.parent / 'Foreman/docs/design'
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else next(p for p in [DESIGN / 'v3/mockups/2x', DESIGN / 'mockups/2x'] if p.exists())   # @2x, no device frame, square corners
OUT = ROOT / 'assets/screens'
CAPTURES = Path(__file__).resolve().parent / 'captures'

# mockup name (without mode) -> (site key, kind)
KEYS = {
    'iOS-Lock': ('ios-lock', 'phone'), 'iOS-Inbox': ('ios-inbox', 'phone'), 'iOS-InboxDanger': ('ios-inbox-danger', 'phone'), 'iOS-Home': ('ios-home', 'phone'),
    'iOS-Session': ('ios-session', 'phone'), 'iOS-Terminal': ('ios-terminal', 'phone'), 'iOS-Agents': ('ios-agents', 'phone'),
    'iOS-NewSession': ('ios-new-session', 'phone'), 'iOS-Autopilot': ('ios-autopilot', 'phone'),
    'watchOS-Approve': ('watch-approve', 'watch'),
    'iPad-Grid': ('ipad-grid', 'ipad'),
    'Mac-Workspace': ('mac-workspace', 'mac'), 'Mac-MenuBar': ('mac-menubar', 'menu'),
    'Mac-Orchestrate': ('mac-orchestrate', 'mac'), 'Mac-Pipeline': ('mac-orchestrate', 'mac'),
    'Mac-Capture': ('mac-capture', 'mac'),
    'Android-Home': ('android-home', 'phone'), 'Android-Shade': ('android-shade', 'phone'), 'Android-Inbox': ('android-inbox', 'phone'), 'Windows-Main': ('windows-main', 'mac'),
}
FOREMAN = ROOT.parent / 'Foreman'
# site key -> (capture file stem without -light/-dark, device scale, crop box in source pixels or None)
REAL = {
    'ios-lock': (FOREMAN / 'docs/screens/iPhone-Widgets', 3, None), 'ios-home': (FOREMAN / 'docs/screens/iPhone-Home', 3, None),
    'ios-inbox': (FOREMAN / 'docs/screens/iPhone-Inbox', 3, None), 'ios-inbox-danger': (FOREMAN / 'docs/screens/iPhone-SessionDanger', 3, None),
    'ios-session': (FOREMAN / 'docs/screens/iPhone-Session', 3, None), 'ios-terminal': (FOREMAN / 'docs/screens/iPhone-Terminal', 3, None),
    'ios-agents': (FOREMAN / 'docs/screens/iPhone-Agents', 3, None), 'ios-new-session': (FOREMAN / 'docs/screens/iPhone-NewSession', 3, None),
    'ios-autopilot': (FOREMAN / 'docs/screens/iPhone-Autopilot', 3, None), 'watch-approve': (FOREMAN / 'docs/screens/Watch-Approve', 2, None),
    'ipad-grid': (FOREMAN / 'docs/screens/iPad-Grid', 2, None), 'mac-workspace': (FOREMAN / 'docs/screens/Mac-Workspace', 2, None),
    'mac-menubar': (FOREMAN / 'docs/screens/Mac-MenuBar', 2, None),
    'android-home': (FOREMAN / 'clients/flutter/docs/screens/android-home', 2.625, None),
    'android-inbox': (FOREMAN / 'clients/flutter/docs/screens/android-inbox', 2.625, None),
    'android-shade': (FOREMAN / 'clients/flutter/docs/screens/android-notifications', 2.625, (0, 0, 1080, 1172)),
    'windows-main': (FOREMAN / 'clients/flutter/docs/screens/windows-home', 2, None),
}
REAL_KIND = {'ipad-grid': 'tablet'}
MAX_W = {'tablet': 1400}

# device scale of the source images, by kind (mockups/2x and real captures are @2x)
SCALE = {'phone': 2, 'watch': 2, 'ipad': 2, 'tablet': 2, 'mac': 2, 'menu': 2}

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()
manifest, unknown = {}, []
files = {f.name: f for f in SRC.glob('*.png')}
files.update({f.name: f for f in CAPTURES.glob('*.png')} if CAPTURES.exists() else {})
by_key = {}
for name, (key, kind) in KEYS.items():
    by_key.setdefault(key, (name, kind))
for key, (stem, scale, box) in REAL.items():
    name, kind = by_key[key]
    kind = REAL_KIND.get(key, kind)
    for mode in ('light', 'dark'):
        if (CAPTURES / f'{name}-{mode}.png').exists():
            continue
        src = stem.parent / f'{stem.name}-{mode}.png'
        if not src.exists():
            continue
        im = Image.open(src).convert('RGB')
        if box:
            im = im.crop(box)
        w = min(round(im.width * 2 / scale), MAX_W.get(kind, 4000))
        if w != im.width:
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        dst = OUT / f'{key}-{mode}.webp'
        im.save(dst, 'WEBP', quality=90, method=6)
        e = manifest.setdefault(key, {'kind': kind, 'w': im.width, 'h': im.height, 'source': src.relative_to(FOREMAN).as_posix(), 'capture': True})
        e[mode] = f'assets/screens/{dst.name}'
for f in sorted(files.values(), key=lambda p: p.name):
    m = re.match(r'(.+)-(light|dark|aod)$', f.stem)
    if m and m.group(2) == 'aod':
        continue
    name, mode = (m.group(1), m.group(2)) if m else (f.stem, 'light')
    if name not in KEYS:
        unknown.append(f.name)
        continue
    key, kind = KEYS[name]
    if key in manifest and f.parent != CAPTURES:
        continue   # a real capture already stands in for this mockup
    im = Image.open(f).convert('RGB')
    s = 2 / SCALE[kind]
    if s != 1:
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    dst = OUT / f'{key}-{mode}.webp'
    im.save(dst, 'WEBP', quality=90, method=6)
    e = manifest.setdefault(key, {'kind': kind, 'w': im.width, 'h': im.height, 'source': name, 'capture': f.parent == CAPTURES})
    e[mode] = f'assets/screens/{dst.name}'
for e in manifest.values():
    e.setdefault('light', e.get('dark'))
(OUT / 'screens.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
print('screens:', ', '.join(sorted(manifest)))
if unknown:
    print('not mapped (add to KEYS if the site should show them):', ', '.join(unknown))
