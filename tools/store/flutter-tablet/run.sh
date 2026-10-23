#!/bin/sh
# Renders the Android (Material) app at tablet size into tools/store/captures/, for the Google Play
# 7" and 10" tablet screenshots. Same method as the Flutter app's own Windows captures
# (clients/flutter/test/capture/fluent_capture_test.dart): the Flutter test renderer with the mock core.
# The Foreman repository is only read: the app is copied to a temporary folder and rendered there.
# In the copy, text styles name 'Roboto' explicitly (what Android uses for an unnamed family) so the
# test renderer draws them with the loaded font (Pretendard stands in for Roboto + Noto Sans CJK KR).
#   sh store/flutter-tablet/run.sh            (needs flutter and Pretendard in ~/Library/Fonts)
set -eu
here=$(cd "$(dirname "$0")" && pwd)
app="${1:-$here/../../../../Foreman/clients/flutter}"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
rsync -a --exclude build "$app/" "$tmp/app/"
cd "$tmp/app"
grep -rl "TextStyle(" lib/ui | grep -v phosphor | xargs sed -i '' "s/TextStyle(\([^)]\)/TextStyle(fontFamily: 'Roboto', \1/g"
sed -i '' "s#brightness: scheme.brightness);#brightness: scheme.brightness, fontFamily: 'Roboto');#" lib/ui/material/theme.dart
cp "$here/material_tablet_capture_test.dart" test/capture/
mkdir -p "$here/../captures"
OUT="$here/../captures" flutter test --no-pub test/capture/material_tablet_capture_test.dart || true   # the test reports pending mock timers after the images are written
ls "$here/../captures"/android-tablet-*.png
