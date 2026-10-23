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
| Product screens | Real app captures (`Foreman/docs/screens`, `clients/flutter/docs/screens`), brand mockups where none exists | `tools/screens.py` → `assets/screens/*.webp`, `screens.json` |
| Layout and type | `assets/site.css` (uses only the token variables) | by hand |
| Fonts, icons | npm packages pinned in `tools/package.json` | `tools/vendor.mjs` → `assets/fonts/`, `assets/icons/` |
| Promo film | `tools/video/` (concept, storyboard, scenes, music spec) | `tools/video/build.sh` → `assets/video/` |

Screens with neither a capture nor a mockup are left out of the pages, not replaced by placeholders. When the design repository adds a mockup, map its name in `tools/screens.py` (`KEYS`) and reference the key from the copy.

## Build

```sh
cd tools
npm install && npx playwright install chromium
python3 -m venv .venv && .venv/bin/pip install pillow numpy
node vendor.mjs                          # fonts and icons into assets/
node theme/from-brand.mjs                # brand tokens -> theme.json
node brand.mjs                           # logo, favicon, touch icon, OG images
.venv/bin/python screens.py              # captures (or mockups) -> assets/screens
node site/build.mjs                      # tokens.css + the ten pages
```

The film uses the showreel skill's engine (`~/.claude/skills/showreel`, not vendored here):

```sh
python3 ~/.claude/skills/showreel/scripts/new_project.py video --ratio 16:9 --duration 40   # engine.js, fx.js, fonts
sh video/prepare.sh                      # captures and logo into the film project
sh video/build.sh                        # music, render (ko, en), mix, finish, site encodes
```

`build.sh` writes `assets/video/foreman-<lang>-1080p.mp4` (download, with music), `foreman-loop-<lang>.{webm,mp4}` (720p, muted, for the landing page) and `foreman-poster-<lang>.jpg`. The landing page shows the film only when these files exist.

## Changing the brand

Everything visual comes from the Foreman design repository (`Foreman/docs/design`, read only). A new brand version needs no edits to pages, CSS or scenes, only a rebuild:

```sh
cd tools
node theme/from-brand.mjs            # tokens.json -> theme/theme.json (prints roles it had to fill by fallback)
node brand.mjs                       # logo, favicon, touch icon, OG images
.venv/bin/python screens.py          # captures (or mockups) -> assets/screens
node site/build.mjs                  # assets/tokens.css + pages
node a11y.mjs                        # axe-core on all pages, light and dark (needs a local server on :8765)
sh video/prepare.sh && sh video/build.sh    # film tokens (reel/theme.css), logo, captures; render ko/en
node verify.mjs                      # after pushing: live links, film playback, screenshots
```

- `theme/from-brand.mjs` maps the brand's semantic tokens to the site's roles. A brand that leaves a role out (a monochrome brand may have no separate signal, success or danger color) gets the nearest role it does define; the script lists those substitutions.
- `brand.mjs` looks for each logo file under several names (`FILES` at the top). A brand that names its files differently needs a new candidate there.
- Logo colors: parts drawn in the brand ink become `currentColor` (so the header logo follows light/dark); parts in the brand accent, if any, take `--signal`.
- The film reads the same `theme.json` (`video/brandjs.mjs` writes `reel/theme.css`). Its closing logo works with any lockup SVG: if the logo has a block drawn in the brand accent, the film's cursor flies into that spot; otherwise the logo is revealed from the left. The lock screen scene paints over the notification with the mockup's own background color, sampled by `prepare.sh`.
- If the brand changes fonts, update `fonts` in `from-brand.mjs`, the font packages in `vendor.mjs`, and add the font to the film with `new_project.py video --fonts "Family:wght@400;600"`.

## Real captures

The site shows captures of the built apps wherever they exist, and the brand mockups only for screens that have no capture yet. `tools/screens.py` takes them from the Foreman repository (read only): `docs/screens` for the Apple apps and `clients/flutter/docs/screens` for Android and Windows (the Windows set is drawn by the Flutter test renderer). A PNG in `tools/captures/` with the **mockup's file name** overrides both. Rebuild with `.venv/bin/python screens.py && node site/build.mjs`.

Site (`tools/screens.py` → `assets/screens/<key>-<light|dark>.webp`; `REAL` in the script maps keys to captures):

| Site key | Real capture | Shown in |
| --- | --- | --- |
| `ios-lock` | `iPhone-Widgets-*` (Live Activity and widgets) | Hero |
| `ios-inbox`, `ios-inbox-danger`, `watch-approve` | `iPhone-Inbox-*`, `iPhone-SessionDanger-*`, `Watch-Approve-dark` | Approvals |
| `ios-home`, `ios-session`, `ios-terminal` | `iPhone-Home-*`, `iPhone-Session-*`, `iPhone-Terminal-*` | Sessions |
| `ios-agents`, `ios-new-session` | `iPhone-Agents-*`, `iPhone-NewSession-*` | Agents |
| `ios-autopilot` | `iPhone-Autopilot-*` | Autopilot (Pro) |
| `ipad-grid` | `iPad-Grid-*` (portrait) | iPad |
| `mac-workspace`, `mac-menubar` | `Mac-Workspace-*`, `Mac-MenuBar-*` | Mac |
| `android-home`, `android-shade`, `windows-main` | `android-home-*`, `android-notifications-*` (cropped), `windows-home-*` | Platforms |
| `mac-orchestrate` | none yet (no mockup either, so the slot is left out) | Agent handoff (Pro) |

The user guide takes its captures the same way through `tools/guide_screens.py` (see `assets/guide/guide.json`).

The film uses real captures too. `tools/video/prepare.sh` copies them from `Foreman/docs/screens` (a PNG of the same name in `tools/captures/` wins), and `scenes.js` depends on these coordinates:

| Time | Image | Coordinates the scene depends on |
| --- | --- | --- |
| 0:05–0:14 | `iPhone-Widgets-dark.png` (1206×2622) | Kumquat ● in the "your turn" widget at x 112, y 2010, 25 px (`CAP.dot`, the match cut); that row at y 1968–2090 (`CAP.row`, hidden after Allow); Allow button centre (1025, 2021) (`CAP.allow`) |
| 0:11–0:14 | `Watch-Approve-dark.png` (416×496) | none |
| 0:14–0:18 | `iPad-Grid-light.png` (2064×2752, portrait) | zoom point (40, 620), so the waiting Kumquat tile stays whole |
| 0:18–0:22 | `Mac-Workspace-light.png` (2880×1772) | zoom point (1430, 780) on the approval card |

A capture with a different pixel size or layout needs those numbers re-measured in `scenes.js`. Rebuild with `sh video/prepare.sh && sh video/build.sh` (needs the showreel skill engine).

## Store listings

`store/` holds the App Store, Google Play and Microsoft Store listing text and screenshot sets; see [store/README.md](store/README.md).

## Mac app updates (Sparkle)

The Mac apps update through Sparkle from this Pages site, with no server of ours: feeds at `appcast/appcast.xml` (Foreman) and `appcast/host.xml` (Foreman Host), files in this repository's GitHub Releases. The full procedure (keys, signing, item template, checks) is in [docs/mac-updates.md](docs/mac-updates.md).

`.nojekyll` is present so Pages serves every path as is.

## Sources and licenses

[CREDITS.md](CREDITS.md) lists fonts, icons, images and music. [DESIGN.md](DESIGN.md) has the design research and how the brand rules were applied.
