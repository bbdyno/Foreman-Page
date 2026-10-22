#!/bin/sh
# Copies the inputs the film needs into the project (the brand repository is only read):
# v2 mockups -> assets/img, Phosphor icons and the brand logo -> reel/brand.js
set -eu
here=$(cd "$(dirname "$0")" && pwd)
design="${1:-$here/../../../Foreman/docs/design}"
mkdir -p "$here/assets/img"
cp "$design"/mockups/*.png "$here/assets/img/"
node "$here/brandjs.mjs" "$design" > "$here/reel/brand.js"
echo "prepared: $(ls "$here/assets/img" | wc -l | tr -d ' ') mockups, reel/brand.js"
