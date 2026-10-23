#!/bin/sh
# Copies the inputs the film needs into the project (the Foreman repository is only read):
# real app captures (Foreman/docs/screens) -> assets/img (a PNG of the same name in tools/captures wins),
# theme tokens -> reel/theme.css, icons + logo + capture background colors -> reel/brand.js
set -eu
here=$(cd "$(dirname "$0")" && pwd)
design="${1:-$here/../../../Foreman/docs/design}"
screens="${SCREENS:-$design/../screens}"
PY="${PY:-$here/../.venv/bin/python}"
# the captures the scenes use (scenes.js): s02 lock screen and widgets, Watch; s03 iPad grid, Mac workspace
rm -rf "$here/assets/img"; mkdir -p "$here/assets/img"
for f in iPhone-Widgets-dark Watch-Approve-dark iPad-Grid-light Mac-Workspace-light; do
  cp "$screens/$f.png" "$here/assets/img/"
done
if ls "$here/../captures/"*.png >/dev/null 2>&1; then cp "$here/../captures/"*.png "$here/assets/img/"; fi
# The widget scene hides the allowed row by painting over it with the widget's own background.
"$PY" - "$here/assets/img" "$here/out/mockup-bg.json" <<'PYEOF'
import json, sys
from pathlib import Path
from PIL import Image
img, out = Path(sys.argv[1]), Path(sys.argv[2])
out.parent.mkdir(parents=True, exist_ok=True)
res = {}
f = img / 'iPhone-Widgets-dark.png'
if f.exists():
    im = Image.open(f).convert('RGB')
    res['iPhone-Widgets-dark'] = '#%02X%02X%02X' % im.getpixel((600, 2030))   # empty area of the "your turn" widget
out.write_text(json.dumps(res))
PYEOF
node "$here/brandjs.mjs" "$design" "$here/out/mockup-bg.json"
echo "prepared: $(ls "$here/assets/img" | wc -l | tr -d ' ') images"
