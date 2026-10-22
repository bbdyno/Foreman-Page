# Foreman Page

Marketing, pricing, privacy, terms and support pages for Foreman, in English (root) and Korean (`ko/`), the promo film, and the place where the Mac app's Sparkle updates will live.

Published with GitHub Pages from `main` at <https://bbdyno.github.io/Foreman-Page/>.

## Pages

| Page | English | Korean |
| --- | --- | --- |
| Landing | `index.html` | `ko/index.html` |
| Pricing | `pricing/` | `ko/pricing/` |
| Privacy Policy | `privacy/` | `ko/privacy/` |
| Terms of Use | `terms/` | `ko/terms/` |
| Support | `support/` | `ko/support/` |

The HTML is generated and committed. All links are relative, so the site works from any base path. To preview, serve the folder (`python3 -m http.server`).

## Where things come from

| What | Source | Made by |
| --- | --- | --- |
| Copy | `tools/site/en.mjs`, `tools/site/ko.mjs` | `tools/site/build.mjs` (templates) |
| Colors, fonts, easing | Foreman brand `docs/design/tokens.json` (Foreman repository, read only) | `tools/theme/from-brand.mjs` → `tools/theme/theme.json` → `assets/tokens.css` |
| Logo, favicon, touch icon, OG images | Foreman brand `docs/design/logo`, `app-icon` | `tools/brand.mjs` → `assets/brand/` |
| Product screens | Foreman brand `docs/design/mockups/*-{light,dark}.png` | `tools/screens.py` → `assets/screens/*.webp`, `screens.json` |
| Layout and type | `assets/site.css` (uses only the token variables) | by hand |
| Fonts, icons | npm packages pinned in `tools/package.json` | `tools/vendor.mjs` → `assets/fonts/`, `assets/icons/` |
| Promo film | `tools/video/` (concept, storyboard, scenes, music spec) | `tools/video/build.sh` → `assets/video/` |

Screens that are not in the mockups yet are left out of the pages, not replaced by placeholders. When the design repository adds a mockup, map its name in `tools/screens.py` (`KEYS`) and reference the key from the copy.

## Build

```sh
cd tools
npm install && npx playwright install chromium
python3 -m venv .venv && .venv/bin/pip install pillow numpy
node vendor.mjs                          # fonts and icons into assets/
node theme/from-brand.mjs                # brand tokens -> theme.json
node brand.mjs                           # logo, favicon, touch icon, OG images
.venv/bin/python screens.py              # mockups -> assets/screens
node site/build.mjs                      # tokens.css + the ten pages
```

The film uses the showreel skill's engine (`~/.claude/skills/showreel`, not vendored here):

```sh
python3 ~/.claude/skills/showreel/scripts/new_project.py video --ratio 16:9 --duration 40   # engine.js, fx.js, fonts
sh video/prepare.sh                      # mockups and logo into the film project
sh video/build.sh                        # music, render (ko, en), mix, finish, site encodes
```

`build.sh` writes `assets/video/foreman-<lang>-1080p.mp4` (download, with music), `foreman-loop-<lang>.{webm,mp4}` (720p, muted, for the landing page) and `foreman-poster-<lang>.jpg`. The landing page shows the film only when these files exist.

## Real captures (replacing mockups later)

Until the apps adopt the v2 theme, every product image is a design mockup. Real captures replace them without touching the pages or the film code: put a PNG with the **same file name as the mockup** into `tools/captures/` (2x, no device frame), then rebuild (`.venv/bin/python screens.py && node site/build.mjs`, and for the film `sh video/prepare.sh && sh video/build.sh`).

Site (`tools/screens.py` → `assets/screens/<key>-<light|dark>.webp`):

| Mockup file name | Site key | Shown in |
| --- | --- | --- |
| `iOS-Lock-{light,dark}` | `ios-lock` | Hero; Approvals |
| `iOS-Inbox-*`, `watchOS-Approve-dark` | `ios-inbox`, `watch-approve` | Approvals |
| `iOS-Home-*`, `iOS-Session-*`, `iOS-Terminal-*` | `ios-home`, `ios-session`, `ios-terminal` | Sessions |
| `iOS-Agents-*`, `iOS-NewSession-*` | `ios-agents`, `ios-new-session` | Agents |
| `Mac-Orchestrate-*` | `mac-orchestrate` | Agent handoff (Pro) |
| `iOS-Autopilot-*` | `ios-autopilot` | Autopilot (Pro) |
| `iPad-Grid-*` | `ipad-grid` | iPad |
| `Mac-Workspace-*`, `Mac-MenuBar-*` | `mac-workspace`, `mac-menubar` | Mac |
| `Mac-Capture-*` | `mac-capture` | Mac. An extra slot for the real Mac app; it appears only once this file exists |
| `Android-Home-*`, `Android-Shade-*`, `Windows-Main-*` | `android-home`, `android-shade`, `windows-main` | Platforms |

Film (`tools/video/reel/scenes.js`; the film uses the @3x mockups from `docs/design/mockups/`, copied by `prepare.sh`):

| Time | Image | Coordinates the scene depends on |
| --- | --- | --- |
| 0:05–0:14 | `iOS-Lock-dark.png` (1206×2622) | Live Activity "your turn" tile at x 84, y 1498 (`TILE1`); notification crop y 1622–1900, menu crop y 1912–2336, Allow row centre (760, 1988) |
| 0:11–0:14 | `watchOS-Approve-dark.png` (624×744) | none |
| 0:14–0:18 | `iPad-Grid-light.png` (2752×2064) | zoom point (985, 300) on the waiting Kumquat tile |
| 0:18–0:22 | `Mac-Workspace-light.png` (2880×1800) | zoom point (1430, 430) on the approval bar |

A capture with a different pixel size or layout needs those numbers re-measured in `scenes.js`.

## Mac app updates (Sparkle), reserved

The Mac app is distributed with Developer ID and will update through Sparkle, served from this Pages site without any server of ours:

- `updates/appcast.xml`: the feed, `SUFeedURL = https://bbdyno.github.io/Foreman-Page/updates/appcast.xml`
- `updates/notes/<version>.html`: release notes linked from each `<item>`
- Signed and notarized `.zip`/`.dmg` files go to GitHub Releases of this repository (tag `mac-v<version>`), not into git: Pages has a 1 GB site limit and git a 100 MB file limit. Each `enclosure` points at `https://github.com/bbdyno/Foreman-Page/releases/download/mac-v<version>/Foreman-<version>.zip` with its EdDSA signature.

`.nojekyll` is present so Pages serves every path as is.

## Sources and licenses

[CREDITS.md](CREDITS.md) lists fonts, icons, images and music. [DESIGN.md](DESIGN.md) has the design research and how the brand rules were applied.
