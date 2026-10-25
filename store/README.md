# 스토어 등록 자료

App Store, Google Play, Microsoft Store에 올릴 앱 소개 문구와 스크린샷입니다. 한국어와 영어 두 언어로 준비했습니다. 문구는 Foreman main b427465에 구현된 것만 씁니다. 플랫폼마다 그 앱에서 실제로 되는 기능만 적었습니다. 예를 들어 집 밖 연결과 Pro 기능 설명은 Apple 앱 목록에만 있습니다.

원본은 `tools/store/content.mjs`(문구)와 Foreman 저장소의 실제 앱 캡처입니다. 이 폴더의 파일은 모두 `node store/build.mjs`(`tools/`에서 실행)로 만듭니다. 빌드할 때 모든 문구를 스토어 한도와 대조하고, 하나라도 넘으면 빌드를 멈춥니다. 직접 고치지 말고 `content.mjs`를 고친 뒤 다시 빌드하세요.

## 폴더

폴더 구조는 fastlane `deliver`(App Store)와 `supply`(Google Play) 형식을 따르므로 그대로 업로드에 쓸 수 있습니다.

```
store/
  app-store/
    metadata/{ko,en-US}/       name, subtitle, promotional_text, description, keywords,
                               support_url, marketing_url, privacy_url (.txt)
    screenshots/{ko,en-US}/
      iphone-6.9/  1320×2868 ×7     iphone-6.5/  1284×2778 ×7     iphone-6.3/  1206×2622 ×7
      ipad-13/     2064×2752 ×3     mac/         2880×1800 ×4
    screenshots/watch/         416×496 ×1 (모든 언어 공통)
  google-play/metadata/android/{ko-KR,en-US}/
    title, short_description, full_description (.txt), changelogs/1.txt
    images/icon.png (512×512), featureGraphic.png (1024×500)
    images/phoneScreenshots/   1080×1920 ×6
    images/sevenInchScreenshots/  1920×1080 ×3     images/tenInchScreenshots/  2560×1440 ×3
  microsoft-store/
    {ko-KR,en-US}/   description, short_description, features, search_terms, whats_new,
                     screenshot_captions, privacy_url, support_url (.txt)
                     screenshots/  2880×1800 ×4
    StoreLogo-300.png
```

## 스토어 규격 (2026-10-23 공식 문서 기준)

| 스토어 | 항목 | 한도 | 이 자료 | 출처 |
| --- | --- | --- | --- | --- |
| App Store | 이름 · 부제 | 2–30자 · 30자 | 21자 · ko 16자 / en 30자 | [App information](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information) |
| App Store | 프로모션 텍스트 · 설명 | 170자 · 4000자 | ko 84·1380 / en 153·2587 | [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information) |
| App Store | 키워드 | 100바이트, 쉼표 뒤 공백 없음, 다른 앱·회사 이름 금지 | ko 74바이트 / en 83바이트 | 같은 문서, [Product page](https://developer.apple.com/app-store/product-page/) |
| App Store | 새로운 기능 | 4000자, 첫 버전에는 입력란이 없음 | 비워 둠 | 같은 문서 |
| App Store | 스크린샷 | 기기 크기마다 1–10장, PNG·JPEG, 알파 채널 금지. iPhone은 6.1"/6.3"급이 필수이고 6.9"를 주면 6.5"는 필요 없음. iPad 13" 필수(iPad 지원 시), Mac은 16:10 네 가지 크기, Watch는 기종별 한 크기 | iPhone 6.9·6.5·6.3, iPad 13, Mac 2880×1800, Watch 416×496(Series 10·11) | [Screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/) |
| Google Play | 앱 이름 · 간단한 설명 · 자세한 설명 | 30 · 80 · 4000자 | ko 21·30·1021 / en 21·66·1913 | [Store listing](https://support.google.com/googleplay/android-developer/answer/9859152) |
| Google Play | 출시 노트 | 언어당 500자 | ko 79 / en 180 | [Release notes](https://support.google.com/googleplay/android-developer/answer/9859348) |
| Google Play | 아이콘 · 그래픽 이미지 | 512×512 PNG(알파 허용) · 1024×500(알파 금지) | 있음 | [Preview assets](https://support.google.com/googleplay/android-developer/answer/9866151) |
| Google Play | 스크린샷 | 기기 종류당 최대 8장, 변 320–3840px, 긴 변이 짧은 변의 2배 이하, 알파 금지. 추천 노출에는 1080px 이상 9:16 또는 16:9가 4장 이상 필요 | 휴대폰 6장(9:16), 태블릿 7"·10" 각 3장(16:9) | 같은 문서 |
| Microsoft Store | 설명 · 간단한 설명 · 제품 기능 | 10,000자 · 1000자(앞 270자만 보이는 곳이 있음) · 20개×200자 | ko 356·86·8개 / en 705·164·8개 | [Store listing](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/add-and-edit-store-listing-info) |
| Microsoft Store | 검색어 | 7개 이하(정책 10.1.3), 제출 필수 항목은 아님 | 7개 | [Store policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies) |
| Microsoft Store | 이번 버전의 새로운 기능 | 1500자, 첫 제출은 비워 둠 | 비워 둠 | Store listing 문서 |
| Microsoft Store | 스크린샷 | 데스크톱 1366×768 이상(4K까지), PNG, 최대 10장, 장당 50MB 이하. 캡션 200자. 아래 1/3은 오버레이로 가려질 수 있음 | 2880×1800 4장, 캡션 `screenshot_captions.txt` | [Screenshots and images](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/screenshots-and-images) |
| Microsoft Store | 스토어 로고 | 1:1 300×300 권장 | 있음 | 같은 문서 |

## 스토어 이름

세 스토어 모두 **"Foreman: Agent Remote"**로 등록했습니다. "Foreman"은 App Store와 Microsoft Store에서 이미 쓰이고 있었습니다. 앱 안의 이름과 브랜드는 Foreman입니다.

| 스토어 | 식별자 |
| --- | --- |
| App Store | 앱 ID 6826943850, 번들 `com.bbdyno.foreman.ios` |
| Google Play | 패키지 `com.bbdyno.foreman` |
| Microsoft Store | Store ID 9N7SBRZGF595, 2027-01-26까지 제출해야 이름 예약 유지 |

## 주소

| | 한국어 | 영어 |
| --- | --- | --- |
| 지원 | <https://bbdyno.github.io/Foreman-Page/ko/support/> | <https://bbdyno.github.io/Foreman-Page/support/> |
| 개인정보 처리방침 | <https://bbdyno.github.io/Foreman-Page/ko/privacy/> | <https://bbdyno.github.io/Foreman-Page/privacy/> |
| 이용약관 | <https://bbdyno.github.io/Foreman-Page/ko/terms/> | <https://bbdyno.github.io/Foreman-Page/terms/> |
| 마케팅 | <https://bbdyno.github.io/Foreman-Page/ko/> | <https://bbdyno.github.io/Foreman-Page/> |

## 스크린샷

- 모든 화면은 실제 앱을 찍은 캡처입니다. 위쪽에 짧은 문구를 두고 그 아래에 캡처를 배치했으며, 기기 테두리는 그리지 않았습니다. 색은 브랜드 v3의 흑백을 따르고, 캡처의 라이트·다크 모드에 맞춰 바탕색을 정했습니다. Microsoft Store는 캡션을 따로 입력하는 칸이 있어서 캡처를 손대지 않고 그대로 씁니다.
- 출처:
  - Apple 앱: `Foreman/docs/screens` (데모 데이터)
  - Android 휴대폰: `Foreman/clients/flutter/docs/screens` (Pixel 9 에뮬레이터, 목 코어)
  - Windows: 같은 폴더의 `windows-*`. Windows는 CI에서만 실행할 수 있어서 Flutter 테스트 렌더러로 그린 화면입니다. 맑은 고딕 대신 Pretendard가 들어갔습니다.
- **Android 태블릿 화면은 이 저장소에서 새로 그렸습니다.** Foreman에 태블릿 캡처가 없어서, Windows 화면과 같은 방법(Flutter 테스트 렌더러 + 목 코어)으로 Android 앱을 1280×800dp 태블릿 크기로 렌더했습니다. Foreman 저장소는 건드리지 않고 임시 복사본에서 렌더합니다(`tools/store/flutter-tablet/run.sh` → `tools/store/captures/`). Roboto·Noto Sans CJK KR 대신 Pretendard로 그려지므로, 실기기 태블릿 캡처가 생기면 같은 파일 이름으로 바꿔 넣으세요.
- `tools/store/captures/`에 Foreman 캡처와 같은 이름의 PNG를 두면 그 파일이 먼저 쓰입니다.

## 확인하고 정할 것

- **앱 이름**: 세 스토어 모두 "Foreman"으로 썼습니다. 이미 쓰는 이름이라 등록되지 않으면 이름 뒤에 설명을 붙인 대안(예: "Foreman: 에이전트 승인" / "Foreman: Agent Approvals")으로 바꾸고 `content.mjs`에서 한도를 다시 확인하세요.
- **영어 목록**: 앱 화면이 아직 한국어뿐이라 영어 설명에 "The app’s interface is currently in Korean."을 넣었고, 영어 스크린샷에도 한국어 화면이 나옵니다. 앱에 영어 UI가 생기면 이 문장을 지우고 영어 캡처로 다시 빌드하세요.
- **Microsoft Store 결제**: Windows 앱의 스토어 결제는 아직 연결 전입니다(Foreman `clients/flutter/windows/runner/store_channel.cpp`). 그래서 Windows 설명에는 구독 이야기를 넣지 않았습니다.
- **Android·Windows의 집 밖 연결**: Flutter 앱에는 아직 클라우드 경로가 없어서 해당 설명에서 뺐습니다.
- **개인정보 설문**: 각 스토어의 개인정보 설문(App Store 개인정보 라벨, Google Play 데이터 보안, Microsoft 개인정보)은 이 자료에 없습니다. 개발자가 수집하는 데이터는 없지만, 구매 처리(StoreKit·Google Play Billing)와 사용자 본인 iCloud 사용을 어떻게 답할지는 직접 확인해서 입력하세요.
