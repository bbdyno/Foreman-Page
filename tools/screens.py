"""Imports the brand mockups (Foreman/docs/design/mockups/*.png) as site images.

  .venv/bin/python screens.py [path/to/mockups]

Each mockup <Platform>-<Screen>-<light|dark>.png becomes assets/screens/<key>-<mode>.webp,
scaled to 2x of its point size, and assets/screens/screens.json lists what exists. The brand
repository is only read. Screens that are not in the mockups yet are simply left out of the site.
"""
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'Foreman/docs/design/mockups'
OUT = ROOT / 'assets/screens'

# mockup name (without mode) -> (site key, kind)
KEYS = {
    'iOS-Lock': ('ios-lock', 'phone'), 'iOS-Inbox': ('ios-inbox', 'phone'), 'iOS-Home': ('ios-home', 'phone'),
    'iOS-Session': ('ios-session', 'phone'), 'iOS-Terminal': ('ios-terminal', 'phone'), 'iOS-Agents': ('ios-agents', 'phone'),
    'iOS-NewSession': ('ios-new-session', 'phone'), 'iOS-Autopilot': ('ios-autopilot', 'phone'),
    'watchOS-Approve': ('watch-approve', 'watch'),
    'iPad-Grid': ('ipad-grid', 'ipad'),
    'Mac-Workspace': ('mac-workspace', 'mac'), 'Mac-MenuBar': ('mac-menubar', 'menu'),
    'Mac-Orchestrate': ('mac-orchestrate', 'mac'), 'Mac-Pipeline': ('mac-orchestrate', 'mac'),
    'Android-Home': ('android-home', 'phone'), 'Windows-Main': ('windows-main', 'mac'),
}
# device scale of the mockups, by kind (iPhone 17 Pro and Apple Watch are @3x, iPad and Mac @2x)
SCALE = {'phone': 3, 'watch': 3, 'ipad': 2, 'mac': 2, 'menu': 2}

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()
manifest, unknown = {}, []
for f in sorted(SRC.glob('*.png')):
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
    e = manifest.setdefault(key, {'kind': kind, 'w': im.width, 'h': im.height, 'source': name})
    e[mode] = f'assets/screens/{dst.name}'
for e in manifest.values():
    e.setdefault('light', e.get('dark'))
(OUT / 'screens.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
print('screens:', ', '.join(sorted(manifest)))
if unknown:
    print('not mapped (add to KEYS if the site should show them):', ', '.join(unknown))
