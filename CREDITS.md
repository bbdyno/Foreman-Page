# Credits

Third-party material used on this site and in the promo film. Versions are pinned in `tools/package.json`; files were copied from the npm packages by `tools/vendor.mjs` on 2026-10-22.

| What | Source | Version | License | Where |
| --- | --- | --- | --- | --- |
| Phosphor Icons, Light weight | `@phosphor-icons/core` (https://phosphoricons.com) | 2.1.1 | MIT, `assets/icons/LICENSE` | `assets/icons/*.svg`, inlined in the pages and the film |
| Pretendard Variable (dynamic subset) | `pretendard` npm package (https://github.com/orioncactus/pretendard) | 1.3.9 | SIL Open Font License 1.1, `assets/fonts/LICENSE-Pretendard.txt` | `assets/fonts/pretendard/` |
| JetBrains Mono Variable | `@fontsource-variable/jetbrains-mono` (https://www.jetbrains.com/lp/mono/) | 5.3.0 | SIL Open Font License 1.1, `assets/fonts/LICENSE-JetBrains-Mono.txt` | `assets/fonts/jetbrains-mono-*.woff2` |

Icons used: arrow-right, arrow-up-right, arrows-left-right, bell-ringing, chat-text, check, check-circle, circle-notch, clock-countdown, cloud, cloud-slash, device-mobile, device-tablet, download-simple, fingerprint, gauge, github-logo, globe-simple, hand-tap, hard-drives, hourglass-medium, laptop, list-checks, lock-simple, minus, pause-circle, plugs-connected, plus, shield-check, sun, terminal-window, users-three, watch, wifi-high (plus a few vendored for later use).

## Brand and images

- Logo, favicon and app icon (`assets/brand/`): the Foreman brand v2 files from the Foreman repository (`docs/design/logo`, `docs/design/app-icon`), owned by Foreman. The wordmark outlines come from Inter Tight (OFL-1.1) and are converted to paths there.
- Product screens (`assets/screens/`): the Foreman v2 design mockups (`docs/design/mockups`), converted to WebP at twice their point size by `tools/screens.py`.
- OG images (`assets/brand/og-*.png`): rendered by `tools/brand.mjs` from the logo and the fonts above.
- No stock photography is used.

## Film

- Made by `tools/video/` from the assets above (see `tools/video/concept.md` and `storyboard.md`) with the showreel engine.
- Music: synthesized for this film by `synth_music.py` (numpy, no samples) from `tools/video/audio/music/spec.json`. No third-party recordings. No narration.
