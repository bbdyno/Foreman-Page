# Mac 앱 자동 업데이트 (Sparkle)

Developer ID로 배포하는 Mac 앱(Foreman, Foreman Host)은 Sparkle로 업데이트합니다. 업데이트 피드는 이 저장소의 GitHub Pages에, 앱 파일은 이 저장소의 GitHub Releases에 둡니다. 우리 서버는 없습니다. App Store로 내는 빌드에는 Sparkle을 넣지 않습니다.

## 자리

| 무엇 | 위치 | 앱 설정 |
| --- | --- | --- |
| Foreman 피드 | `appcast/appcast.xml` → <https://bbdyno.github.io/Foreman-Page/appcast/appcast.xml> | `SUFeedURL` |
| Foreman Host 피드 | `appcast/host.xml` → <https://bbdyno.github.io/Foreman-Page/appcast/host.xml> | `SUFeedURL` |
| 릴리스 노트 | `appcast/notes/<버전>.html`(영어), `appcast/notes/<버전>.ko.html`(한국어) | 피드의 `sparkle:releaseNotesLink` |
| 앱 파일 | GitHub Releases, 태그 `mac-v<버전>`(Foreman) · `host-mac-v<버전>`(Foreman Host) | 피드의 `enclosure` |
| 서명 공개 키 | 앱의 Info.plist | `SUPublicEDKey` |

- 두 피드는 지금 항목이 없는 빈 채널입니다. 항목이 없으면 Sparkle은 "업데이트 없음"으로 처리합니다.
- Foreman 저장소는 비공개라서 그 저장소의 Releases 파일은 받을 수 없습니다. 앱 파일은 공개 저장소인 이 저장소(`bbdyno/Foreman-Page`)의 Releases에 올립니다.
- 앱 파일을 git에 넣지 않습니다. GitHub는 파일당 100MB, Pages 사이트는 1GB까지라서 버전이 쌓이면 넘칩니다. Releases 파일은 파일당 2GB까지 올라갑니다.
- `.nojekyll`이 있어 Pages가 `appcast/` 아래 파일을 그대로 내보냅니다.

## 서명 키 (한 번만)

```bash
./bin/generate_keys
```

Sparkle 배포판의 `generate_keys`가 EdDSA 키 쌍을 만들고, 개인 키를 릴리스하는 Mac의 로그인 키체인에 넣은 뒤 공개 키를 출력합니다. 공개 키는 두 앱의 Info.plist `SUPublicEDKey`에 넣습니다. 개인 키는 이 저장소나 Foreman 저장소에 절대 넣지 않습니다. 백업은 `generate_keys -x <파일>`로 내보내 비밀번호 관리자에 보관하고, 내보낸 파일은 지웁니다.

## 릴리스 순서

버전 번호는 앱의 `CFBundleVersion`(빌드 번호, 매번 증가)과 `CFBundleShortVersionString`(표시용)을 그대로 씁니다. 한 번 올린 버전 번호는 다시 쓰지 않습니다.

1. Xcode에서 Developer ID로 서명해 내보낸 앱을 공증하고 스테이플합니다.

   ```bash
   ditto -c -k --keepParent Foreman.app Foreman-1.0.0.zip
   xcrun notarytool submit Foreman-1.0.0.zip --keychain-profile <프로필> --wait
   xcrun stapler staple Foreman.app
   ditto -c -k --keepParent Foreman.app Foreman-1.0.0.zip   # 스테이플한 앱으로 다시 묶기
   ```

2. 업데이트 파일에 서명합니다. 출력된 `sparkle:edSignature`와 `length`를 피드 항목에 씁니다.

   ```bash
   ./bin/sign_update Foreman-1.0.0.zip
   ```

3. Releases에 올립니다. 이 Mac의 기본 `gh` 호스트가 회사 GHE일 수 있으니 호스트를 지정합니다.

   ```bash
   GH_HOST=github.com gh release create mac-v1.0.0 Foreman-1.0.0.zip --repo bbdyno/Foreman-Page --title "Foreman 1.0.0" --notes-file appcast/notes/1.0.0.html
   ```

4. 릴리스 노트 `appcast/notes/1.0.0.html`, `appcast/notes/1.0.0.ko.html`을 쓰고, 피드 `<channel>` 안 맨 위에 항목을 추가합니다.

   ```xml
   <item>
     <title>Foreman 1.0.0</title>
     <pubDate>Thu, 30 Oct 2026 10:00:00 +0900</pubDate>
     <sparkle:version>100</sparkle:version>
     <sparkle:shortVersionString>1.0.0</sparkle:shortVersionString>
     <sparkle:minimumSystemVersion>26.0</sparkle:minimumSystemVersion>
     <sparkle:releaseNotesLink>https://bbdyno.github.io/Foreman-Page/appcast/notes/1.0.0.html</sparkle:releaseNotesLink>
     <sparkle:releaseNotesLink xml:lang="ko">https://bbdyno.github.io/Foreman-Page/appcast/notes/1.0.0.ko.html</sparkle:releaseNotesLink>
     <enclosure url="https://github.com/bbdyno/Foreman-Page/releases/download/mac-v1.0.0/Foreman-1.0.0.zip"
                length="12345678" type="application/octet-stream"
                sparkle:edSignature="(sign_update 출력)"/>
   </item>
   ```

   `minimumSystemVersion`은 앱의 배포 대상(Deployment Target)과 같게 둡니다. Foreman Host는 `appcast/host.xml`에 같은 형식으로, 태그 `host-mac-v<버전>`의 파일을 가리키게 씁니다.

5. 피드와 노트를 커밋하고 push합니다. Pages 캐시 때문에 앱에 보이기까지 최대 10분쯤 걸립니다.

6. 확인합니다.

   ```bash
   curl -sI https://bbdyno.github.io/Foreman-Page/appcast/appcast.xml
   curl -sIL https://github.com/bbdyno/Foreman-Page/releases/download/mac-v1.0.0/Foreman-1.0.0.zip
   ```

   피드가 200이고, 파일 주소가 리디렉션을 거쳐 200이며 크기가 `length`와 같으면 됩니다. Sparkle은 Releases의 리디렉션을 따라갑니다. 마지막으로 한 단계 낮은 버전을 설치한 Mac에서 "업데이트 확인"을 눌러 설치까지 해 봅니다.

## 되돌리기

- 문제가 있는 버전은 피드에서 그 항목을 지우면 더 이상 내려가지 않습니다. 이미 받은 사람을 되돌리려면 고친 빌드를 더 높은 `sparkle:version`으로 올립니다.
- Releases의 파일은 지우지 않습니다. 이미 받은 피드 사본이 그 주소를 가리킬 수 있습니다.

## 사이트의 다운로드 링크

사이트의 Mac 직접 다운로드는 `https://github.com/bbdyno/Foreman-Page/releases/latest`를 가리키면 늘 최신 릴리스 페이지가 열립니다. 파일로 바로 받게 하려면 릴리스마다 버전 없는 이름(`Foreman.zip`)도 함께 올리고 `releases/latest/download/Foreman.zip`을 씁니다. 이때 `latest`는 가장 최근에 올린 릴리스이므로, Foreman과 Foreman Host를 같은 저장소에 올릴 때는 Foreman Host 릴리스를 "Set as the latest release" 없이 올립니다(`gh release create … --latest=false`).
