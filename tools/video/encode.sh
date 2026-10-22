#!/bin/sh
# Derives the site files from out/foreman-<lang>.mp4 (made by build.sh).
set -eu
here=$(cd "$(dirname "$0")" && pwd)
dst="$here/../../assets/video"
mkdir -p "$dst"
for lang in ko en; do
  src="$here/out/foreman-$lang.mp4"
  [ -f "$src" ] || { echo "skip $lang (no master)"; continue; }
  # Download: 1920x1080 H.264 High with the music
  ffmpeg -y -loglevel error -i "$src" -c:v libx264 -profile:v high -preset slow -crf 20 -pix_fmt yuv420p \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -c:a aac -b:a 160k -movflags +faststart "$dst/foreman-$lang-1080p.mp4"
  # Site loop (muted autoplay): 1280x720, no audio, VP9 and H.264
  ffmpeg -y -loglevel error -i "$src" -an -vf scale=1280:720:flags=lanczos -c:v libvpx-vp9 -b:v 0 -crf 38 \
    -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$dst/foreman-loop-$lang.webm"
  ffmpeg -y -loglevel error -i "$src" -an -vf scale=1280:720:flags=lanczos -c:v libx264 -profile:v high -preset slow -crf 26 \
    -pix_fmt yuv420p -movflags +faststart "$dst/foreman-loop-$lang.mp4"
  # Poster: the closing frame with the logo
  ffmpeg -y -loglevel error -ss 38.5 -i "$src" -frames:v 1 -vf scale=1600:900:flags=lanczos -q:v 3 "$dst/foreman-poster-$lang.jpg"
  echo "encoded $lang"
done
ls -la "$dst"
