# Mac 앱 자동 업데이트 (Sparkle)

Developer ID로 배포하는 Mac 앱(Foreman, Foreman Host)은 Sparkle로 업데이트합니다. 업데이트 피드는 이 저장소의 GitHub Pages에, 앱 파일은 이 저장소의 GitHub Releases에 둡니다. 우리 서버는 없습니다. App Store로 내는 빌드에는 Sparkle을 넣지 않습니다.

## 자리

| 무엇 | 위치 | 앱 설정 |
| --- | --- | --- |
| Foreman 피드 | `appcast/foreman-mac.xml` → <https://bbdyno.github.io/Foreman-Page/appcast/foreman-mac.xml> | `SUFeedURL` |
| Foreman Host 피드 | `appcast/foreman-host.xml` → <https://bbdyno.github.io/Foreman-Page/appcast/foreman-host.xml> | `SUFeedURL` |
| 앱 파일 | GitHub Releases, 태그 `v<버전>` 하나에 `Foreman-<버전>.dmg`와 `Foreman-Host-<버전>.dmg`(+`SHA256SUMS`) | 피드의 `enclosure` |
| 서명 공개 키 | 앱의 Info.plist | `SUPublicEDKey` |

- 피드 주소는 Foreman 저장소 `apple/Project.swift`(`appcastBase`)에 들어 있습니다. 이미 설치된 앱이 읽는 주소라서 바꾸지 않습니다.
- Foreman 저장소는 비공개라서 앱 파일은 공개 저장소인 이 저장소(`bbdyno/Foreman-Page`)의 Releases에 올립니다. git에는 넣지 않습니다.
- `.nojekyll`이 있어 Pages가 `appcast/` 아래 파일을 그대로 내보냅니다.

## 서명 키

EdDSA 비밀키는 릴리스하는 Mac의 로그인 키체인(계정 `foreman`)에만 있습니다. 만들기·백업·옮기기는 Foreman 저장소 `apple/RELEASE.md`를 따릅니다.

## 릴리스 순서

1. Foreman 저장소에서 빌드·서명·공증·DMG·피드 항목까지 한 번에 만듭니다(`apple/RELEASE.md`). 피드 파일은 이 저장소의 `appcast/`에 바로 쓰입니다.

   ```bash
   apple/tools/release-mac.sh --version 1.0.0 --build 1 --appcast-dir ../Foreman-Page/appcast
   ```

2. Releases에 올립니다. 이 Mac의 기본 `gh` 호스트가 회사 GHE일 수 있으니 호스트를 지정합니다.

   ```bash
   GH_HOST=github.com gh release create v1.0.0 --repo bbdyno/Foreman-Page --title "Foreman 1.0.0 (Mac)" Foreman-Host-1.0.0.dmg Foreman-1.0.0.dmg SHA256SUMS
   ```

3. `tools/site/downloads.mjs`의 버전과 주소를 바꾸고 사이트를 다시 빌드합니다(`cd tools && node site/build.mjs`).

4. 피드와 사이트를 커밋하고 push합니다. Pages 캐시 때문에 앱에 보이기까지 최대 10분쯤 걸립니다.

5. 확인합니다.

   ```bash
   curl -sI https://bbdyno.github.io/Foreman-Page/appcast/foreman-mac.xml
   curl -sIL https://github.com/bbdyno/Foreman-Page/releases/download/v1.0.0/Foreman-1.0.0.dmg
   ```

   피드가 200이고, 파일 주소가 리디렉션을 거쳐 200이며 크기가 `length`와 같으면 됩니다. 마지막으로 한 단계 낮은 버전을 설치한 Mac에서 "업데이트 확인"을 눌러 설치까지 해 봅니다.

## 되돌리기

- 문제가 있는 버전은 피드에서 그 항목을 지우면 더 이상 내려가지 않습니다. 이미 받은 사람을 되돌리려면 고친 빌드를 더 높은 `sparkle:version`으로 올립니다.
- Releases의 파일은 지우지 않습니다. 이미 받은 피드 사본이 그 주소를 가리킬 수 있습니다.

## 사이트의 다운로드 링크

홈의 "Mac 직접 다운로드"와 가이드의 설치 절은 `tools/site/downloads.mjs`의 DMG 주소를 씁니다. 파일 이름에 버전이 들어가므로 릴리스마다 이 파일을 고칩니다.
