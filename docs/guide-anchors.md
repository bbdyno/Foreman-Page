# 가이드 앵커 목록

앱의 도움말 링크가 가리키는 고정 앵커입니다. 이 ID는 바꾸지 않습니다. 절을 고쳐 쓰더라도 ID는 그대로 두고, 제목만 바꿉니다.

- 한국어: `https://bbdyno.github.io/Foreman-Page/ko/guide/#<id>`
- 영어: `https://bbdyno.github.io/Foreman-Page/guide/#<id>`
- 한국어와 영어 페이지의 ID는 같습니다. 앱은 기기 언어가 한국어면 `/ko/guide/`, 아니면 `/guide/`를 엽니다.
- 원본: `tools/site/guide-ko.mjs`, `tools/site/guide-en.mjs`. 빌드할 때 두 페이지의 ID가 같은지 확인합니다.

## 지금 페이지에 있는 앵커

| ID | 수준 | 제목(한국어) |
| --- | --- | --- |
| `start` | 절 | 시작하기 |
| `start-mac-host` | 소절 | Mac 호스트 설치 |
| `start-windows-host` | 소절 | Windows 호스트 설치 |
| `start-apps` | 소절 | 앱 설치 |
| `pairing` | 절 | 페어링 |
| `pairing-qr` | 소절 | QR 코드로 연결 |
| `pairing-code` | 소절 | 6자리 확인 코드 |
| `pairing-hosts` | 소절 | 여러 호스트와 연결 상태 |
| `pairing-devices` | 소절 | 기기 관리와 폐기 |
| `pairing-remove` | 소절 | 앱에서 호스트 지우기 |
| `agents` | 절 | 에이전트 연결 |
| `agents-supported` | 소절 | 지원하는 에이전트 |
| `agents-shell` | 소절 | 터미널에서 평소처럼 실행하기 |
| `agents-connect` | 소절 | 발견된 에이전트 연결 |
| `agents-unguarded` | 소절 | 승인 없이 실행하는 에이전트 |
| `agents-plan` | 소절 | Free에서 쓸 수 있는 에이전트 |
| `approvals` | 절 | 승인과 질문 |
| `approvals-inbox` | 소절 | 승인 인박스 |
| `approvals-risk` | 소절 | 위험도 |
| `approvals-face-id` | 소절 | Face ID로 허용 |
| `approvals-lock-screen` | 소절 | 잠금화면과 Live Activity |
| `approvals-watch` | 소절 | Apple Watch |
| `approvals-questions` | 소절 | 질문에 답하기 |
| `approvals-rules` | 소절 | 자동 허용 규칙 |
| `sessions` | 절 | 세션 |
| `sessions-views` | 소절 | 대화, 터미널, 변경 |
| `sessions-terminal` | 소절 | 터미널 보기와 키 막대 |
| `sessions-new` | 소절 | 새 세션 |
| `sessions-worktree` | 소절 | worktree 격리 |
| `sessions-search` | 소절 | 검색 |
| `sessions-ipad-mac` | 소절 | iPad와 Mac에서 |
| `pro` | 절 | Pro |
| `pro-subscribe` | 소절 | 구독하기 |
| `pro-restore` | 소절 | 구매 복원과 해지 |
| `pro-hosts` | 소절 | 여러 호스트에서 쓰기 |
| `pro-free` | 소절 | Free와 Pro의 차이 |
| `always-on` | 절 | 항상 켜 두기 |
| `always-on-mac` | 소절 | Mac |
| `always-on-windows` | 소절 | Windows |
| `always-on-doctor` | 소절 | foreman doctor |
| `privacy` | 절 | 개인정보와 보안 |
| `privacy-servers` | 소절 | 우리 서버 0대 |
| `privacy-encryption` | 소절 | 종단간 암호화 |
| `privacy-keys` | 소절 | 키가 저장되는 곳 |
| `faq` | 절 | 자주 묻는 질문 |
| `faq-terminal-closed` | 소절 | 터미널 창을 닫으면 세션도 끝나나요? |
| `faq-host-restart` | 소절 | 호스트를 다시 시작하면 어떻게 되나요? |
| `faq-not-showing` | 소절 | 터미널에서 실행한 에이전트가 앱에 안 보여요. |
| `faq-face-id` | 소절 | 위험한 요청을 알림에서 허용할 수 없어요. |
| `faq-lost-phone` | 소절 | 휴대폰을 잃어버렸어요. |
| `faq-numbers-differ` | 소절 | 페어링할 때 숫자가 달라요. |
| `faq-support` | 소절 | 다른 문제가 있어요. |
| `cli` | 절 | CLI 참고 |
| `cli-sessions` | 소절 | 세션 |
| `cli-pairing` | 소절 | 페어링과 기기 |
| `cli-shim` | 소절 | 셸 연동 |
| `cli-autostart` | 소절 | 로그온 시 시작 |
| `cli-status` | 소절 | 상태와 점검 |

## 예약한 앵커 (페이지에 아직 없음)

아래 기능이 main에 병합되면 해당 절을 채우면서 이 ID를 씁니다. 사이트 화면에는 예약 표시를 두지 않고, 이 목록에만 적어 둡니다. 앱은 이 ID로 링크를 미리 걸어도 되지만, 절이 채워지기 전에는 페이지 맨 위가 열립니다.

| ID | 들어갈 내용 | 들어갈 자리 | 기다리는 트랙 |
| --- | --- | --- | --- |
| `cloud` | 클라우드 계정 연결(iCloud · Google Drive 앱 전용 폴더) | 새 절, `pairing` 다음 (3절) | cloud |
| `cloud-icloud` | iCloud 연결 | `cloud` 소절 | cloud |
| `cloud-google-drive` | Google Drive 연결 | `cloud` 소절 | cloud |
| `connection` | 밖에서 연결하기(P2P · 우편함) | 새 절, `always-on` 다음 (9절) | cloud |
| `connection-outside` | 집·회사 밖에서 호스트에 붙기 | `connection` 소절 | cloud |
| `connection-diagnostics` | 연결 경로 확인과 진단 | `connection` 소절 | cloud |
| `start-android` | Android 앱 설치 | `start` 소절 | flutter |
| `start-windows-app` | Windows 앱 설치 | `start` 소절 | flutter |
| `approvals-android` | Android 알림에서 승인 | `approvals` 소절 | flutter |
| `pro-failover` | 장애 조치 | `pro` 소절 | 미정 |
| `pro-handoff` | 다른 호스트로 넘기기 | `pro` 소절 | 미정 |
| `pro-pipeline` | 파이프라인 | `pro` 소절 | 미정 |
| `pro-race` | 여러 에이전트 경주 | `pro` 소절 | 미정 |
| `pro-briefing` | 브리핑 | `pro` 소절 | 미정 |
| `agents-import` | 지난 세션 가져오기 | `agents` 소절 | 미정 |
| `always-on-mac-doctor` | Mac에서 `foreman doctor`(FileVault · 자동 켜짐 점검) | `always-on` 소절 | host |

예약 ID를 페이지에 쓰기 시작하면 위 표에서 지우고 "지금 페이지에 있는 앵커" 표로 옮깁니다.
