# 제작노트 — Foreman 홍보 영상

## 산출물

| 파일 | 내용 |
| --- | --- |
| `assets/video/foreman-ko-1080p.mp4`, `foreman-en-1080p.mp4` | 1920×1080 30fps H.264 High, 40초, 합성 음악(AAC 160k, −14 LUFS). 사이트의 내려받기 링크 |
| `assets/video/foreman-loop-{ko,en}.webm` / `.mp4` | 1280×720, 소리 없음. 랜딩 페이지 자동재생(음소거·반복, 컨트롤 있음, 동작 줄이기 설정이면 자동재생 안 함) |
| `assets/video/foreman-poster-{ko,en}.jpg` | 38.5초 엔드카드 프레임 |
| `tools/video/out/foreman-{ko,en}.mp4` | 렌더 마스터(커밋하지 않음, `build.sh`로 다시 만든다) |

## 정한 것

- 콘셉트: "켜진 커서 하나"(`concept.md`). 버린 후보: 밤 근무 타임랩스(큰 숫자 히어로가 중심이 됨), 크레인 지브(장식 그래픽이 제품 화면을 밀어냄).
- 길이 40초, 5구간(`storyboard.md`). 나레이션 없음, 화면 카피를 자막 겸 주 카피로. 한국어·영어 두 벌.
- 음악: `synth_music.py`로 합성(샘플 없음, 라이선스 문제 없음). ElevenLabs 키가 없고 유료 서비스를 새로 쓰지 않기로 해서 합성 경로를 썼다.
- 제품 화면: 디자인 시스템의 v2 시안 PNG만(iOS-Lock-dark, watchOS-Approve-dark, iPad-Grid-light, Mac-Workspace-light). 코드로 그린 것은 모션 레이어(커서 블록, 세션 목록, 한도 카드, 경로 선, 로고 조립)뿐.
- 로고는 브랜드 lockup SVG를 그대로 쓰고 커서 블록만 영상의 커서가 들어가 채운다.

## 검수 (qa_check.py, 마지막 렌더)

- 규격: 1920×1080, 30fps, yuv420p·tv, 1200프레임, −14.0 LUFS, true peak −2.7 dBFS 이하 ✓
- 섬광 0회 ✓
- 움직임: 멈춘 화면 58%, 큰 움직임 p90 2.3. 스킬 기준(20%, 7)에는 못 미친다. 브랜드 모션 원칙("상태가 바뀔 때만 움직인다", 감속형)을 따르느라 화면 전체가 크게 바뀌는 순간을 장면 전환에만 두었다. 1~2초 정지는 대부분 카피를 읽는 시간이다. 첫 초안(73%)에서 목록 재정렬, 화면 안으로 다가가는 카메라, 한도 게이지 쪽 푸시를 더해 줄였다.
- 비평: 맥락 없는 서브에이전트 판정은 `qa/critique_01.md`(커밋하지 않는 qa 폴더)에 남기고 반영했다.

## 공개 전 확인할 것

- 소리를 직접 들어 봐 주세요. 음악은 수치(음량·피크)로만 확인했습니다.
- 화면 속 프로젝트 이름(Kumquat, HyroxSim, DynoCam 등)과 수치는 시안의 예시 데이터입니다.
- 시안이 바뀌면 `sh prepare.sh && sh build.sh`로 다시 만듭니다.

## 다시 만들기

```sh
cd tools
python3 ~/.claude/skills/showreel/scripts/new_project.py video --ratio 16:9 --duration 40   # 엔진·폰트(저장소에 넣지 않음)
sh video/prepare.sh      # 시안·로고·아이콘을 영상 프로젝트로
sh video/build.sh        # 음악 합성 → 타임라인 → 믹스 → ko/en 렌더(모션 블러 4) → 마감 → 사이트용 인코딩
```
