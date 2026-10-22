"""Imports the brand mockups (Foreman/docs/design/mockups/*.png) as site images.

  .venv/bin/python screens.py [path/to/mockups]

Each mockup <Platform>-<Screen>-<light|dark>.png becomes assets/screens/<key>-<mode>.webp,
A file with the same name in tools/captures/ (a real app capture) takes the mockup's place.
scaled to 2x of its point size, and assets/screens/screens.json lists what exists. The brand
repository is only read. Screens that are not in the mockups yet are simply left out of the site.
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
    'iOS-Lock': ('ios-lock', 'phone'), 'iOS-Inbox': ('ios-inbox', 'phone'), 'iOS-Home': ('ios-home', 'phone'),
    'iOS-Session': ('ios-session', 'phone'), 'iOS-Terminal': ('ios-terminal', 'phone'), 'iOS-Agents': ('ios-agents', 'phone'),
    'iOS-NewSession': ('ios-new-session', 'phone'), 'iOS-Autopilot': ('ios-autopilot', 'phone'),
    'watchOS-Approve': ('watch-approve', 'watch'),
    'iPad-Grid': ('ipad-grid', 'ipad'),
    'Mac-Workspace': ('mac-workspace', 'mac'), 'Mac-MenuBar': ('mac-menubar', 'menu'),
    'Mac-Orchestrate': ('mac-orchestrate', 'mac'), 'Mac-Pipeline': ('mac-orchestrate', 'mac'),
    'Mac-Capture': ('mac-capture', 'mac'),
    'Android-Home': ('android-home', 'phone'), 'Android-Shade': ('android-shade', 'phone'), 'Android-Inbox': ('android-inbox', 'phone'), 'Windows-Main': ('windows-main', 'mac'),
}
# device scale of the source images, by kind (mockups/2x and real captures are @2x)
SCALE = {'phone': 2, 'watch': 2, 'ipad': 2, 'mac': 2, 'menu': 2}

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()
manifest, unknown = {}, []
files = {f.name: f for f in SRC.glob('*.png')}
files.update({f.name: f for f in CAPTURES.glob('*.png')} if CAPTURES.exists() else {})
for f in sorted(files.values(), key=lambda p: p.name):
    m = re.match(r'(.+)-(light|dark|aod)$', f.stem)
    if m and m.group(2) == 'aod':
        continue
    name, mode = (m.group(1), m.group(2)) if m else (f.stem, 'light')
    if name not in KEYS:
        unknown.append(f.name)
        continue
    key, kind = KEYS[name]
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
