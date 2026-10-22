#!/bin/sh
# Renders the film in both languages and makes the published files.
#   sh build.sh            (run sh prepare.sh first so assets/img and reel/brand.js exist)
# Needs: node, ffmpeg, the showreel skill scripts (S), Python with numpy (tools/.venv).
set -eu
here=$(cd "$(dirname "$0")" && pwd)
S="${S:-$HOME/.claude/skills/showreel/scripts}"
PY="${PY:-$here/../.venv/bin/python}"
cd "$here"
"$PY" "$S/synth_music.py" music audio/music/spec.json audio/music/music.wav
"$PY" "$S/music_tools.py" analyze audio/music/music.wav
"$PY" "$S/timeline.py" script.json --music-analysis audio/music/analysis.json
"$PY" "$S/mix.py" timeline.json
for lang in ko en; do
  echo "window.LANG = '$lang';" > reel/lang.js
  node "$S/render.mjs" --dir reel --out "out/video-$lang.mp4" --sub 4 --format png
  "$PY" "$S/finish.py" --video "out/video-$lang.mp4" --audio audio/mix.wav --name "foreman-$lang" --outdir out --poster 38.5 --timeline timeline.json
done
echo "window.LANG = 'ko';" > reel/lang.js
sh encode.sh
