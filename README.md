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
| Cloud mailbox wording (iCloud for Apple devices, Google Drive app folder for Android/Windows) | `tools/site/relay.mjs`, the one place to change it | used by the copy, the privacy policy and the FAQ |
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

## Changing the brand

Everything visual comes from the Foreman design repository (`Foreman/docs/design`, read only). A new brand version needs no edits to pages, CSS or scenes, only a rebuild:

```sh
cd tools
node theme/from-brand.mjs            # tokens.json -> theme/theme.json (prints roles it had to fill by fallback)
node brand.mjs                       # logo, favicon, touch icon, OG images
.venv/bin/python screens.py          # mockups -> assets/screens
node site/build.mjs                  # assets/tokens.css + pages
node a11y.mjs                        # axe-core on all pages, light and dark (needs a local server on :8765)
sh video/prepare.sh && sh video/build.sh    # film tokens (reel/theme.css), logo, mockups; render ko/en
node verify.mjs                      # after pushing: live links, film playback, screenshots
```

- `theme/from-brand.mjs` maps the brand's semantic tokens to the site's roles. A brand that leaves a role out (a monochrome brand may have no separate signal, success or danger color) gets the nearest role it does define; the script lists those substitutions.
- `brand.mjs` looks for each logo file under several names (`FILES` at the top). A brand that names its files differently needs a new candidate there.
- Logo colors: parts drawn in the brand ink become `currentColor` (so the header logo follows light/dark); parts in the brand accent, if any, take `--signal`.
- The film reads the same `theme.json` (`video/brandjs.mjs` writes `reel/theme.css`). Its closing logo works with any lockup SVG: if the logo has a block drawn in the brand accent, the film's cursor flies into that spot; otherwise the logo is revealed from the left. The lock screen scene paints over the notification with the mockup's own background color, sampled by `prepare.sh`.
- If the brand changes fonts, update `fonts` in `from-brand.mjs`, the font packages in `vendor.mjs`, and add the font to the film with `new_project.py video --fonts "Family:wght@400;600"`.

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
