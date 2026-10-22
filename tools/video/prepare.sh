#!/bin/sh
# Copies the inputs the film needs into the project (the brand repository is only read):
# mockups -> assets/img (real captures in tools/captures replace mockups of the same name),
# theme tokens -> reel/theme.css, icons + logo + mockup background colors -> reel/brand.js
set -eu
here=$(cd "$(dirname "$0")" && pwd)
design="${1:-$here/../../../Foreman/docs/design}"
PY="${PY:-$here/../.venv/bin/python}"
mkdir -p "$here/assets/img"
cp "$design"/mockups/*.png "$here/assets/img/"
if ls "$here/../captures/"*.png >/dev/null 2>&1; then cp "$here/../captures/"*.png "$here/assets/img/"; fi
# The lock screen scene hides the notification by painting over it with the screen's own background.
"$PY" - "$here/assets/img" "$here/out/mockup-bg.json" <<'PYEOF'
import json, sys
from pathlib import Path
from PIL import Image
img, out = Path(sys.argv[1]), Path(sys.argv[2])
out.parent.mkdir(parents=True, exist_ok=True)
res = {}
for name in ['iOS-Lock-dark', 'iOS-Lock-light']:
    f = img / f'{name}.png'
    if f.exists():
        im = Image.open(f).convert('RGB')
        x, y = round(im.width * 0.083), round(im.height * 0.744)        # empty area left of the notification menu
        res[name] = '#%02X%02X%02X' % im.getpixel((x, y))
out.write_text(json.dumps(res))
PYEOF
node "$here/brandjs.mjs" "$design" "$here/out/mockup-bg.json"
echo "prepared: $(ls "$here/assets/img" | wc -l | tr -d ' ') images"
