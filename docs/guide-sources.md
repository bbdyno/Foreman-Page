# 가이드 수치와 근거

사용 가이드(`/ko/guide/`, `/guide/`)에 쓴 수치와, 코드만으로 단정하기 어려운 설명의 근거입니다. 실제 iCloud·Google 실연동 e2e는 아직 돌리지 못했습니다(2026-10-23 기준, 네트워크 문제). 그래서 동작을 단정하는 수치는 스파이크 실측치만 쓰고, 여기에 출처를 남깁니다. e2e를 돌리면 이 표의 수치를 그 결과로 바꿉니다.

## 시험 측정 수치

| 가이드 문장 (앵커) | 수치 | 출처 | 측정 조건 |
| --- | --- | --- | --- |
| 호스트가 보낸 알림이 앱이 꺼져 있을 때도 0.4~1초 안에 iPhone에 닿았습니다 (`cloud-iphone`) | 0.43~0.95초. 포그라운드 449·455·511·525·829ms, 백그라운드 448·476·952ms, 강제 종료 433·499·673ms | `Foreman-Spikes/REPORT.md` §6 “실측” (요약 L304·L315, 표 L336–340) | 호스트 REST 쓰기 → CloudKit 푸시 → iPhone 알림. 사무실 Wi-Fi, HTTP 프록시 경유(L473) |
| P2P 연결은 1초 안에 열렸습니다 (`connection-outside`) | STUN 포함 540·715·753ms, 같은 LAN 호스트 후보만 약 210ms | `Foreman-Spikes/REPORT.md` §1 “연결 시간” (요약 L13, 표 L34–38) | pion WebRTC. Go↔Go, Go↔iOS **시뮬레이터**. 실기기·실제 NAT 뒤 측정은 아님 |

## 코드에서 확인한 설명 (main b427465)

| 가이드 문장 (앵커) | 근거 |
| --- | --- |
| iCloud 경유일 때 출력이 몇 초씩 묶여 도착할 수 있습니다 (`connection-outside`) | 터미널 출력은 1초 단위로 묶어 보냄(`host/internal/transport/mailbox/mailbox.go:12-16`), 호스트의 iCloud 확인 주기는 활동 직후 3초·한가할 때 45초(`docs/CLOUD.md` §4). e2e 지연은 측정 전 |
| 앱이 가능한 경로를 한꺼번에 시도하고, 느린 경로에서도 더 빠른 경로를 계속 시도해 옮겨 갑니다 (`connection`, `connection-outside`) | `host/core/client.go:243-266` (200ms 간격 경주, 우편함 1초 지연), L146–152·L247–249 (1·3·10·30초, 이후 1분마다 재시도). iOS 앱은 같은 Go 코어(`Foremancore`)를 씀 |
| “같은 Wi-Fi”에는 공유기가 열어 준 경로도 포함됩니다 (`connection-outside`) | 공유기 포트 매핑·IPv6 주소로 직접 붙어도 전송이 `lan-websocket`이라 앱은 LAN(“같은 Wi-Fi”)으로 표시(`apple/ForemanKit/Sources/ForemanKit/AgentBridge.swift:20-29`, `host/core/client.go:1075-1092`) |
| 집 밖 연결은 iPhone·iPad 앱 (`connection`) | 원격 경로는 iOS 앱만 사용(`apple/iOS/Sources/App/AppModel.swift:330-341`). Mac 앱과 Flutter 앱에는 아직 없음(`clients/flutter/README.md:116`) |
| “로그인 상태 유지”를 체크하면 몇 주 동안 다시 묻지 않습니다 (`cloud-icloud`) | 앱 문구 그대로(`apple/HostHelper/Sources/CloudView.swift:78`). Apple 문서 기준 2주, 2주 연속 사용은 측정 전(`docs/CLOUD.md` L36) |
| iPhone과 호스트가 같은 Apple ID여야 합니다 (`cloud-icloud`, `cloud-iphone`, `faq-outside`) | 두 쪽이 같은 사용자의 CloudKit 개인 데이터베이스를 읽고 씀(`docs/CLOUD.md` §2). 스파이크에서 같은 userRecordName 확인(`Foreman-Spikes/REPORT.md` L329) |
| 클라우드에 저장되는 기록과 보관 기간 (`cloud-data`) | `docs/CLOUD.md` §2·§3, `host/internal/rendezvous/signal.go:24`, `host/internal/cloud/notice.go:37`, `host/internal/rendezvous/queue.go:107` |
