// 한국어 콘텐츠. build.mjs가 이 값으로 ko/ 아래 페이지를 만듭니다.
import { icon } from './icons.mjs';
import { RELAY } from './relay.mjs';
const R = RELAY.ko;
const REPO = 'https://github.com/bbdyno/Foreman-Page';
const ARROW = icon('arrow-right');
const EFFECTIVE = '2026년 10월 22일';

export default {
  lang: 'ko',
  ui: {
    skip: '본문으로 건너뛰기',
    home: '홈',
    navLabel: '주요 메뉴',
    footNav: '사이트 링크',
    nav: { home: '소개', features: '기능', pricing: '요금제', support: '지원', privacy: '개인정보 처리방침', terms: '이용약관' },
    otherLang: 'English',
    status: '출시 준비 중',
    footLine: '내 컴퓨터에서 도는 코딩 에이전트를 iPhone·iPad·Mac·Apple Watch·Android·Windows에서 관리하는 앱. 우리 서버 없이 동작합니다.',
    legal: '© 2026 Foreman. Apple, iPhone, iPad, Mac, Apple Watch, iCloud, Face ID, App Store는 Apple Inc.의 상표입니다. Android, Google Play는 Google LLC의, Windows, Microsoft Store는 Microsoft Corporation의 상표입니다. Claude는 Anthropic, Codex는 OpenAI, Gemini는 Google의 상표입니다. Foreman은 이 회사들과 제휴하지 않은 독립 앱입니다.',
    toc: '목차',
    ogAlt: 'Foreman 로고와 문구: 내 컴퓨터의 코딩 에이전트를 어디서든 관리합니다.',
    yes: '포함',
    no: '없음',
  },

  home: {
    metaTitle: 'Foreman — 내 컴퓨터의 코딩 에이전트를 어디서든',
    metaDescription: 'Claude Code, Codex, Gemini CLI 세션을 iPhone·iPad·Mac·Apple Watch·Android·Windows에서 이어 보고, 답하고, 승인합니다. Remote Control을 켤 필요도, 우리 서버도 없습니다.',
    devices: 'iPhone · iPad · Mac · Apple Watch · Android · Windows',
    title: '내 컴퓨터의 코딩 에이전트를 어디서든 관리합니다.',
    lede: '세션마다 Remote Control을 켤 필요가 없습니다. Mac이나 Windows PC에서 평소처럼 Claude Code, Codex, Gemini CLI를 실행하면 Foreman이 세션을 맡고, iPhone·iPad·Mac·Apple Watch·Android·Windows에서 이어 보고, 답하고, 승인할 수 있습니다.',
    launch: '아직 출시 전입니다. 첫 버전부터 모든 기기용 앱을 함께 내고, 에이전트를 돌리는 컴퓨터(호스트)로는 Mac과 Windows PC를 지원합니다.',
    storesTitle: '출시하면 여기서 내려받습니다',
    stores: [
      ['app-store-logo', 'App Store', 'iPhone · iPad · Apple Watch'],
      ['google-play-logo', 'Google Play', 'Android'],
      ['windows-logo', 'Microsoft Store', 'Windows 앱 · Windows 호스트'],
      ['apple-logo', 'Mac 직접 다운로드', 'Mac 앱 · Mac 호스트'],
    ],
    storeState: '출시 준비 중',
    jumpFeatures: '무엇을 하는지 보기',
    jumpZero: '서버 없이 동작하는 방식',
    turnBadge: '당신 차례',
    turnText: '에이전트가 승인이나 답을 기다릴 때만 알립니다. 나머지 시간에는 조용합니다.',
    facts: [
      ['우리 서버', '0대'],
      ['데이터가 지나는 곳', '내 컴퓨터 · 내 기기 · 내 클라우드 계정'],
      ['회원 가입', '없음'],
    ],
    heroShot: { key: 'ios-lock', alt: 'iPhone 잠금화면. Foreman 알림에서 에이전트의 명령을 바로 허용하거나 거부할 수 있습니다.', cap: 'iPhone · 잠금화면 승인' },
    filmLabel: 'Foreman 소개 영상',
    filmCaption: '40초 · 여기서는 소리 없이 재생되고, 내려받는 파일에는 음악이 있습니다.',
    filmDownload: '1080p MP4 내려받기',
    sections: [
      {
        key: 'approve', label: '승인',
        title: '자리를 비운 사이 기다리는 일을, 손 안에서 끝냅니다.',
        text: ['에이전트가 권한을 묻거나 질문하면 모든 컴퓨터의 요청이 승인 인박스 한곳에 모입니다. 명령마다 위험도를 표시하고, 되돌릴 수 없는 작업은 Face ID를 거쳐야 허용됩니다.'],
        points: [
          ['bell-ringing', '<b>잠금화면 알림</b>에서 바로 허용하거나 거부'],
          ['fingerprint', '<b><code>rm -rf</code>, <code>push --force</code>, 운영 DB</b> 같은 작업은 항상 Face ID'],
          ['watch', '<b>Apple Watch</b>에서 손목으로 승인 (Pro)'],
          ['gauge', '<b>Live Activity</b>로 테스트·빌드 진행률 확인 (Pro)'],
        ],
        shots: [
          { key: 'ios-inbox', alt: '승인 인박스. git push 요청은 위험도 낮음, prisma migrate deploy 요청은 위험도 높음으로 표시되고 Face ID로 허용 버튼이 있습니다.', cap: 'iPhone · 승인 인박스' },
          { key: 'ios-inbox-danger', alt: '위험한 요청만 모아 본 승인 인박스. 운영 DB 마이그레이션, main 브랜치 강제 푸시처럼 되돌릴 수 없는 요청은 테두리와 경고 표지로 구분되고 Face ID로만 허용됩니다.', cap: 'iPhone · 되돌릴 수 없는 요청' },
          { key: 'ios-lock', alt: '잠금화면. Live Activity에 실행 중인 세션 세 개가 보이고, 아래 알림에서 git push를 허용하거나 거부할 수 있습니다.', cap: 'iPhone · 잠금화면' },
          { key: 'watch-approve', alt: 'Apple Watch 화면. Kumquat 세션의 git push 승인 요청과 거부·허용 버튼.', cap: 'Apple Watch' },
        ],
      },
      {
        key: 'session', label: '세션',
        title: '대화로 읽거나, 터미널 그대로 보거나.',
        text: ['세션은 컴퓨터에 상주하는 프로세스가 소유합니다. 터미널 창을 닫거나 연결이 끊겨도 에이전트는 계속 돌고, 다시 열면 놓친 출력부터 이어 받습니다. 컴퓨터 앞의 터미널과 휴대폰이 같은 세션을 함께 볼 수도 있습니다.'],
        points: [
          ['chat-text', '<b>대화 뷰</b>: 지시와 답, 읽고 고친 파일, diff'],
          ['terminal-window', '<b>터미널 뷰</b>: 실제 PTY 화면과 ESC·TAB·CTRL 키 줄'],
          ['arrows-left-right', '<b>끊긴 지점부터</b> 빠짐도 중복도 없이 이어 받기'],
          ['plugs-connected', '<b>평소처럼 실행</b>한 세션도 그대로 가져오기'],
        ],
        shots: [
          { key: 'ios-home', alt: '현황 화면. 당신 차례 3, 실행 중 5, 오늘 완료 14와 답을 기다리는 세션 목록이 보입니다.', cap: 'iPhone · 현황' },
          { key: 'ios-session', alt: '대화 뷰. 재시도 정책을 고친 diff와 재시도 상한을 묻는 질문, 3회와 5회 선택 버튼.', cap: 'iPhone · 대화 뷰' },
          { key: 'ios-terminal', alt: '터미널 뷰. Gemini CLI가 xcodebuild 테스트를 돌리며 118개 중 42개 통과, 1개 실패를 보여 줍니다.', cap: 'iPhone · 터미널 뷰' },
        ],
      },
      {
        key: 'agents', label: '에이전트 연결',
        title: '도구마다 계정과 한도가 달라도, 한 목록에서.',
        text: ['컴퓨터에 설치된 에이전트 CLI를 찾아 연결합니다. Claude Code, Codex, Gemini CLI, OpenCode처럼 계정과 한도가 제각각인 도구를 한 화면에서 보고, 남은 한도와 리셋 시각을 함께 확인합니다. Free에서는 두 종류까지 연결할 수 있습니다.'],
        points: [
          ['plugs-connected', '<b>Claude Code · Codex · Gemini CLI · OpenCode</b>, 그 밖의 CLI는 터미널 모드로'],
          ['users-three', '<b>개인 계정과 업무 계정</b>을 나눠 연결'],
          ['hourglass-medium', '<b>5시간·주간 한도</b>와 리셋까지 남은 시간'],
          ['lock-simple', '<b>API 키</b>는 호스트 컴퓨터에만 보관'],
        ],
        shots: [
          { key: 'ios-agents', alt: '에이전트 연결 화면. Claude Code, Codex, Gemini CLI, OpenCode 네 개가 연결되어 있고 한도 페일오버가 켜져 있습니다.', cap: 'iPhone · 에이전트' },
          { key: 'ios-new-session', alt: '새 세션 화면. 호스트와 폴더를 고르고, Claude Code와 Codex 두 에이전트로 레이스를 시작합니다.', cap: 'iPhone · 새 세션' },
        ],
      },
      {
        key: 'orchestrate', label: '에이전트 연계', pro: true,
        title: 'Claude가 한도에 닿으면, Codex가 이어받습니다.',
        text: ['Pro에서는 에이전트끼리 일을 넘깁니다. 한도에 가까워지면 지금까지의 요약과 diff를 들고 다음 에이전트가 이어서 작업합니다. 구현, 리뷰, 테스트를 단계마다 다른 에이전트에게 맡길 수도 있습니다.'],
        rows: [
          ['한도 페일오버', 'Claude 개인 계정이 95%에 닿으면 업무 계정, Codex, Gemini 순서로 넘깁니다. 모두 소진되면 리셋을 기다렸다가 다시 시작합니다.'],
          ['인계', '요약과 diff를 함께 넘겨서 맥락을 잃지 않습니다.'],
          ['파이프라인', '구현은 Claude Code, 리뷰는 Codex, 테스트와 수정은 Gemini CLI. 단계 순서를 템플릿으로 저장합니다.'],
          ['레이스', '같은 지시를 두 에이전트에게 주고, 테스트 결과와 diff를 나란히 비교해 하나를 채택합니다.'],
        ],
        shots: [
          { key: 'mac-orchestrate', alt: 'Mac의 에이전트 연계 화면. Kumquat 작업을 구현(Claude Code, 완료), 리뷰(Codex, 진행 중), 테스트(Gemini CLI), PR(Claude Code, 승인 필요) 단계로 나눴고, 오른쪽에 한도 페일오버 순서와 오늘의 인계 기록, 아래에 인계 요약과 diff가 있습니다.', cap: 'Mac · 에이전트 연계' },
        ],
      },
      {
        key: 'autopilot', label: 'Autopilot', pro: true,
        title: '자는 동안에도 세션이 멈추지 않게.',
        text: ['자주 허용하는 명령은 규칙으로 정해 두면 묻지 않고 진행합니다. 한도에 걸려 멈춘 세션은 리셋 직후 이어서 진행하고, 아침에는 밤사이 끝난 일과 막힌 일, 남은 한도를 한 장으로 받아 봅니다.'],
        points: [
          ['list-checks', '<b>승인 규칙</b>: 읽기 전용 명령, 테스트·빌드, 지정한 브랜치 푸시'],
          ['shield-check', '<b>되돌릴 수 없는 작업</b>은 규칙과 상관없이 항상 Face ID'],
          ['clock-countdown', '<b>한도 리셋</b> 직후 멈춘 세션 자동 재개'],
          ['sun', '<b>아침 브리핑</b>: 정한 시각에 밤사이 결과를 요약'],
        ],
        shots: [
          { key: 'ios-autopilot', alt: 'Autopilot 화면. Claude 5시간 한도가 1시간 42분 뒤 리셋되면 멈춘 세션 두 개를 이어 가고, 읽기 전용 명령·테스트·feat/* 브랜치 푸시는 자동 허용, 되돌릴 수 없는 작업은 항상 Face ID입니다. 아래에 아침 브리핑 설정이 있습니다.', cap: 'iPhone · Autopilot' },
        ],
      },
      {
        key: 'ipad', label: 'iPad',
        title: 'iPad는 관제 화면이 됩니다.',
        text: ['여러 컴퓨터의 세션을 타일로 펼쳐 봅니다. 답을 기다리는 세션이 앞에 오고, 타일에서 바로 허용하거나 답할 수 있습니다.'],
        shots: [
          { key: 'ipad-grid', alt: 'iPad 관제 그리드. 세션 아홉 개가 타일로 펼쳐져 있고, 답을 기다리는 타일에는 허용·거부 버튼, 실행 중인 타일에는 최근 출력과 진행률이 보입니다.', cap: 'iPad · 관제 그리드' },
        ],
      },
      {
        key: 'mac', label: 'Mac',
        title: 'Mac에서는 넓은 작업 공간으로.',
        text: ['Mac 앱은 호스트별 세션 목록과 대화·터미널·변경 보기를 한 창에 둡니다. 승인 요청은 대화 위에 바로 뜨고, 오른쪽에는 호스트 상태와 한도가 함께 보입니다. 에이전트가 도는 Mac에서는 메뉴 막대의 작은 도우미가 그 Mac을 호스트로 유지합니다.'],
        shots: [
          { key: 'mac-workspace', alt: 'Mac 워크스페이스. 왼쪽에 Mac mini·MacBook Pro·Mac Studio별 세션 목록, 가운데에 Kumquat 세션의 대화와 git push 승인 요청, 아래에 터미널, 오른쪽에 호스트 정보와 한도가 있습니다.', cap: 'Mac · 워크스페이스' },
          { key: 'mac-menubar', alt: 'Mac 메뉴 막대의 Foreman 메뉴. 이 Mac이 호스트로 동작 중이며, 당신 차례인 세션 두 개와 실행 중인 세션 세 개가 보입니다.', cap: '호스트 Mac · 메뉴 막대' },
          { key: 'mac-capture', alt: 'Foreman Mac 앱의 실제 화면.', cap: 'Mac · 실제 앱 화면' },
        ],
      },
      {
        key: 'zero', id: 'zero', label: '서버 0대',
        title: '우리 서버 0대. 내 컴퓨터와 내 기기, 그리고 내 클라우드 계정만 거칩니다.',
        text: [
          '연결은 먼저 내 기기와 내 컴퓨터를 직접 잇습니다. 직접 닿지 않을 때만 내 클라우드 계정을 우편함처럼 씁니다. 어느 경로로 붙든 끊긴 지점부터 같은 방식으로 이어 받습니다.',
          `호스트 컴퓨터는 그 컴퓨터의 iCloud 로그인과 상관없습니다. 회사 Mac이나 Windows PC에서도 똑같이 동작하고, 접근 권한은 내 휴대폰이 발급해 암호화된 채널로 넘겨줍니다.`,
        ],
        path: `내 기기<span class="sep">${ARROW}</span>내 컴퓨터(Mac · Windows)<span class="sep">${ARROW}</span>Claude Code · Codex · Gemini CLI`,
        routes: [
          ['wifi-high', 'LAN 직결', '같은 네트워크에서는 컴퓨터를 찾아 바로 연결합니다.'],
          ['arrows-left-right', 'P2P 직결', '밖에서는 WebRTC로 컴퓨터와 직접 연결합니다. 연결 정보는 내 클라우드 계정으로 주고받습니다.'],
          ['cloud', '클라우드 우편함', `직접 닿지 않을 때만 거칩니다. ${R.appleDevices}는 ${R.apple}, ${R.otherDevices}은 ${R.other}를 씁니다. ${R.otherScope}`],
        ],
        note: '모든 데이터는 기기 사이에서 종단간 암호화되고, 개발자는 아무것도 저장하거나 열어 보지 않습니다. 연결 경로를 찾을 때 공개 STUN 서버에 내 공인 IP 주소를 확인하는 것 말고는, 세션 내용이 내 컴퓨터와 내 기기, 내 클라우드 계정 밖으로 나가지 않습니다.',
      },
      {
        key: 'platforms', label: '지원 기기',
        title: '첫 버전부터 모든 기기에서.',
        text: ['에이전트가 도는 컴퓨터(호스트)와 관리하는 기기 모두 첫 출시에 함께 지원합니다. 앱은 각 플랫폼의 디자인 문법을 따릅니다.'],
        rows: [
          ['앱', 'iPhone · iPad · Mac · Apple Watch · Android · Windows'],
          ['호스트', 'macOS · Windows. Mac mini나 늘 켜 두는 Windows PC가 잘 맞습니다.'],
        ],
        shots: [
          { key: 'android-home', alt: 'Android 앱의 현황 화면. 당신 차례·실행 중·완료 수와 세션 목록이 Material 3 스타일로 보입니다.', cap: 'Android · 현황' },
          { key: 'android-shade', alt: 'Android 알림 창. Foreman 알림에서 에이전트의 승인 요청을 바로 허용하거나 거부할 수 있습니다.', cap: 'Android · 알림에서 승인' },
          { key: 'windows-main', alt: 'Windows 앱의 메인 창. 왼쪽 세션 목록과 오른쪽 세션 내용이 Fluent 스타일로 보입니다.', cap: 'Windows · 메인 창' },
        ],
      },
      {
        key: 'plans', label: '요금제',
        title: '두 종류의 에이전트까지는 무료입니다.',
        text: ['에이전트끼리 일을 넘기고 기다림을 줄이는 기능은 Pro에 있습니다. 아래는 출시 예정 가격입니다.'],
        plans: [
          { name: 'Free', price: '무료', text: '에이전트 2종, 호스트 1대, 동시 세션 3개, 기록 7일' },
          { name: 'Pro', price: '$7.99/월', text: '연계 기능, Autopilot, Watch·Live Activity·위젯, 무제한. 연간 $69' },
          { name: 'Team', price: '$14/인·월', text: '공유 호스트, 승인 위임과 2인 승인, 감사 로그' },
        ],
        more: '요금제 자세히 보기',
      },
    ],
  },

  pricing: {
    metaTitle: '요금제 — Foreman',
    metaDescription: 'Foreman의 Free, Pro, Team 요금제와 기능 비교. 출시 예정 가격입니다.',
    kicker: '출시 예정 가격',
    title: '요금제',
    lede: '아래는 출시 예정 가격이며 출시 때 바뀔 수 있습니다. 결제는 App Store, Google Play, Microsoft Store에서 하고, 나라별 가격은 각 스토어가 정합니다.',
    tiers: [
      { id: 'free', name: 'Free', price: '무료', unit: '', alt: '&nbsp;', for: '컴퓨터 한 대로 시작하는 개인', items: ['에이전트 2종까지 한 화면에서', '호스트 1대 · 동시 세션 3개', '대화 뷰와 터미널 뷰', '승인·질문 알림', 'LAN · P2P 직결 · 클라우드 우편함', '세션 기록 7일'] },
      { id: 'pro', name: 'Pro', pro: false, price: '$7.99', unit: '/월', alt: '연간 $69', for: '여러 에이전트를 엮어 쓰는 개인', items: ['한도 페일오버 · 에이전트 간 인계', '파이프라인 · 레이스', '에이전트 · 계정 무제한', '호스트 · 세션 무제한', 'Autopilot 승인 규칙 · 리셋 자동 재개', 'Live Activity · Apple Watch · 위젯', '아침 브리핑 · 기록 무제한 검색'] },
      { id: 'team', name: 'Team', price: '$14', unit: '/인·월', alt: '&nbsp;', for: '빌드 머신을 같이 쓰는 팀', items: ['Pro의 모든 기능', '공유 호스트 · 세션 넘겨받기', '승인 위임 · 2인 승인', '감사 로그 내보내기', 'iCloud 공유로 팀원 초대'] },
    ],
    compareTitle: '기능 비교',
    compareHead: '기능',
    compare: [
      { group: '연결', rows: [
        ['LAN 직결 · P2P 직결 · 클라우드 우편함', true, true, true],
        ['호스트(Mac · Windows PC)', '1대', '무제한', '무제한'],
        ['동시 세션', '3개', '무제한', '무제한'],
        ['에이전트 종류 · 계정', '2종', '무제한', '무제한'],
      ] },
      { group: '세션과 승인', rows: [
        ['대화 뷰 · 터미널 뷰', true, true, true],
        ['승인 인박스 · 위험도 · Face ID', true, true, true],
        ['승인·질문 알림', true, true, true],
        ['Live Activity · Apple Watch · 위젯', false, true, true],
        ['세션 기록', '7일', '무제한 · 검색', '무제한 · 검색'],
      ] },
      { group: '에이전트 연계', rows: [
        ['한도 페일오버 · 인계', false, true, true],
        ['파이프라인 · 레이스', false, true, true],
        ['Autopilot 승인 규칙 · 리셋 자동 재개', false, true, true],
        ['아침 브리핑', false, true, true],
      ] },
      { group: '팀', rows: [
        ['공유 호스트 · 세션 넘겨받기', false, false, true],
        ['승인 위임 · 2인 승인', false, false, true],
        ['감사 로그 내보내기', false, false, true],
        ['iCloud 공유로 팀원 초대', false, false, true],
      ] },
    ],
    footnote: '어느 요금제든 우리 서버를 거치지 않습니다. 구독 정보도 스토어와 내 클라우드 계정에서 확인합니다.',
    faqTitle: '결제에 대해',
    faq: [
      ['Mac 앱도 따로 구독해야 하나요?', ['아니요. iPhone이나 iPad에서 구독하면 같은 Apple 계정으로 로그인한 Mac 앱에서도 Pro를 씁니다. Mac 앱은 App Store가 서명한 구독 내역을 내 iCloud에서 읽어 확인합니다.']],
      ['구독은 어떻게 해지하나요?', ['구독한 스토어에서 해지합니다. iPhone·iPad는 설정 앱에서 내 이름을 누르고 [구독]으로, Android는 Google Play 앱의 [결제 및 정기 결제]로, Windows는 Microsoft 계정의 [서비스 및 구독]으로 들어가 Foreman을 고릅니다. 해지해도 이미 결제한 기간이 끝날 때까지 Pro를 쓸 수 있고, 그 뒤에는 Free로 바뀝니다. 세션 기록은 Free 범위(7일)만 남습니다.']],
      ['Team은 어떻게 결제하나요?', ['Team의 결제와 초대 방식은 출시 때 이 페이지에 안내합니다. 팀원 초대는 iCloud 공유를 씁니다.']],
      ['무료 체험이 있나요?', ['Free 요금제는 기간 제한 없이 씁니다. Pro 체험 기간은 출시 때 정합니다.']],
    ],
  },

  privacy: {
    metaTitle: '개인정보 처리방침 — Foreman',
    metaDescription: 'Foreman은 개발자가 운영하는 서버가 없고 개인정보를 수집하지 않습니다. 데이터는 이용자의 컴퓨터와 기기, 이용자의 클라우드 계정에만 저장됩니다.',
    kicker: `시행일 ${EFFECTIVE}`,
    title: '개인정보 처리방침',
    lede: 'Foreman은 개발자가 운영하는 서버가 없고, 개발자는 이용자의 개인정보를 수집하지 않습니다.',
    sections: [
      { id: 'summary', h: '요약', body: `<p class="summary">Foreman이 다루는 데이터는 이용자의 컴퓨터와 기기, 그리고 이용자의 클라우드 계정(${R.apple} 또는 ${R.other})에만 저장됩니다. 개발자는 그 데이터를 받거나 볼 수 없습니다.</p>
      <ul><li>회원 가입이 없고, 이름·이메일·전화번호를 받지 않습니다.</li><li>광고 식별자, 분석 도구, 추적 SDK를 쓰지 않습니다.</li><li>모든 데이터는 기기 사이에서 종단간 암호화되어 오가고, 개발자는 아무것도 저장하거나 열람하지 않습니다.</li></ul>` },
      { id: 'collect', h: '개발자가 수집하는 정보', body: `<p>없습니다. 개발자는 중계 서버, 로그 서버, 계정 서버를 운영하지 않으므로 이용자의 정보가 개발자에게 전송되지 않습니다.</p>` },
      { id: 'data', h: '앱이 다루는 데이터와 저장 위치', body: `<p>앱이 동작하려면 아래 데이터가 필요합니다. 모두 이용자가 관리하는 곳에만 저장됩니다.</p>
      <ul>
        <li><strong>세션 출력과 기록</strong>(에이전트의 터미널 출력, 대화, 변경 내용): 에이전트가 도는 이용자의 컴퓨터(호스트). 기기와 컴퓨터를 직접 연결할 수 없을 때만 이용자의 클라우드 계정을 우편함으로 씁니다.</li>
        <li><strong>클라우드 우편함</strong>: ${R.appleDevices}는 ${R.apple}(${R.appleStore}), ${R.otherDevices}은 ${R.other}. ${R.otherScope} 우편함에 오가는 내용도 종단간 암호화되어 있습니다.</li>
        <li><strong>승인 요청과 질문</strong>: 이용자의 컴퓨터와 기기, 위의 클라우드 우편함.</li>
        <li><strong>페어링 정보와 API 키</strong>: 이용자 기기와 컴퓨터의 키체인(또는 각 OS의 보안 저장소). 에이전트 API 키는 에이전트가 도는 컴퓨터에만 둡니다. 호스트의 접근 권한은 이용자의 휴대폰이 발급해 암호화된 채널로 넘겨주며, 호스트 컴퓨터의 iCloud 로그인과는 관계없습니다.</li>
        <li><strong>설정과 승인 규칙</strong>: 이용자의 기기와 클라우드 계정.</li>
      </ul>
      <p>클라우드 계정에 저장된 데이터는 해당 서비스(Apple iCloud, Google Drive)의 약관과 개인정보 처리방침을 따릅니다.</p>` },
      { id: 'third', h: '외부 서비스와의 통신', body: `<ul>
        <li><strong>Apple</strong>: ${R.appleDevices}에서 iCloud(CloudKit), 푸시 알림, App Store 결제를 이용합니다. Apple 기기의 알림은 이용자 iCloud에 등록한 구독을 통해 Apple이 직접 보냅니다.</li>
        <li><strong>Google</strong>: ${R.otherDevices}은 우편함으로 ${R.other}를 씁니다. Android 앱의 결제는 Google Play가 처리합니다.</li>
        <li><strong>Microsoft</strong>: Windows 앱의 배포와 결제는 Microsoft Store가 처리합니다.</li>
        <li><strong>공개 STUN 서버</strong>(stun.cloudflare.com, stun.l.google.com): 기기 사이 직접 연결 경로를 찾을 때 이용자의 공인 IP 주소를 확인하는 데만 씁니다. 세션 내용은 보내지 않습니다. 각 서버 운영자의 정책이 적용됩니다.</li>
        <li><strong>에이전트 제공자</strong>: Claude Code, Codex, Gemini CLI 같은 에이전트는 이용자의 컴퓨터에서 이용자가 직접 실행하며, 각 제공자의 약관과 개인정보 처리방침에 따라 해당 서비스와 통신합니다. Foreman은 에이전트의 통신에 끼어들거나 대신 데이터를 보내지 않습니다.</li>
      </ul>` },
      { id: 'crash', h: '크래시 리포트와 진단 정보', body: `<p>앱 안에 별도의 크래시 수집 도구를 넣지 않습니다. 개발자가 받는 크래시 정보는 각 스토어(App Store, Google Play, Microsoft Store)가 기본으로 제공하는 범위에 한하며, 이용자가 기기 설정에서 개발자와 공유하기로 동의한 경우에만 Apple, Google, Microsoft를 통해 전달됩니다. 이 정보에는 이용자를 식별하는 정보가 포함되지 않습니다.</p>` },
      { id: 'payment', h: '결제', body: `<p>구독 결제는 구독한 스토어(App Store, Google Play, Microsoft Store)가 처리합니다. 개발자는 결제 수단이나 청구 정보를 받지 않습니다. 직접 내려받은 Mac 앱은 App Store가 서명한 구독 내역을 이용자 iCloud에서 읽어 구독 상태를 확인합니다.</p>` },
      { id: 'delete', h: '보관과 삭제', body: `<p>데이터는 이용자가 지울 때까지 이용자의 컴퓨터와 기기, 클라우드 계정에 남습니다. Free 요금제의 세션 기록은 7일이 지나면 자동으로 지워집니다. 앱을 삭제하면 해당 기기의 데이터가 지워집니다. iCloud에 남은 데이터는 iPhone 설정 앱에서 내 이름, [iCloud], [계정 저장 공간 관리] 순으로 들어가 Foreman을 골라 지우고, Google Drive의 앱 전용 폴더는 Google Drive 설정의 [앱 관리]에서 Foreman의 숨겨진 앱 데이터를 삭제해 지웁니다. 호스트의 세션 기록은 호스트 앱 설정에서 지웁니다.</p>` },
      { id: 'website', h: '이 웹사이트', body: `<p>이 웹사이트는 GitHub Pages에서 제공됩니다. 쿠키, 분석 도구, 외부 글꼴 서버를 쓰지 않습니다. GitHub는 서비스 운영을 위해 접속 기록(IP 주소 등)을 처리할 수 있으며, 이는 <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">GitHub 개인정보 처리방침</a>을 따릅니다.</p>` },
      { id: 'children', h: '아동', body: `<p>Foreman은 개발자를 위한 도구이며 만 14세 미만 아동을 대상으로 하지 않습니다. 개발자는 아동의 개인정보를 포함해 어떤 개인정보도 수집하지 않습니다.</p>` },
      { id: 'changes', h: '방침의 변경', body: `<p>이 방침이 바뀌면 이 페이지에 새 내용과 시행일을 게시합니다. 변경 이력은 <a href="${REPO}/commits/main/ko/privacy/index.html">GitHub 저장소</a>에서 볼 수 있습니다.</p>` },
      { id: 'contact', h: '문의', body: `<p>개인정보에 관한 문의는 <a href="${REPO}/issues">GitHub Issues</a>로 남겨 주세요. 공개 이슈에는 개인정보를 적지 마세요.</p>` },
    ],
  },

  terms: {
    metaTitle: '이용약관 — Foreman',
    metaDescription: 'Foreman 앱 이용약관.',
    kicker: `시행일 ${EFFECTIVE}`,
    title: '이용약관',
    lede: 'Foreman 앱과 이 웹사이트를 이용할 때 적용되는 약관입니다. 스토어에서 받은 앱에는 그 스토어의 사용권 계약(App Store의 Apple 표준 EULA 등)도 함께 적용됩니다.',
    sections: [
      { id: 'scope', h: '적용 범위', body: `<p>이 약관은 Foreman의 iPhone, iPad, Mac, Apple Watch, Android, Windows 앱과 호스트 프로그램, 그리고 이 웹사이트에 적용됩니다. 앱을 설치하거나 사용하면 이 약관에 동의한 것으로 봅니다. 이 약관과 각 스토어의 사용권 계약(Apple 표준 EULA 등)이 충돌하면 그 스토어에서 받은 앱에는 스토어의 계약이 우선합니다.</p>` },
      { id: 'service', h: '앱이 하는 일', body: `<p>Foreman은 이용자의 컴퓨터(Mac 또는 Windows PC)에서 실행되는 코딩 에이전트 세션을 이용자의 다른 기기에서 보고, 입력하고, 승인할 수 있게 하는 도구입니다. Foreman은 에이전트를 제공하지 않습니다. Claude Code, Codex, Gemini CLI 같은 에이전트의 이용에는 각 제공자의 약관이 적용되며, 이용자가 직접 계정과 이용 한도를 관리합니다.</p>` },
      { id: 'responsibility', h: '승인과 명령에 대한 책임', body: `<p>Foreman에서 허용하거나 Autopilot 규칙으로 자동 허용한 명령은 이용자의 컴퓨터에서 이용자의 권한으로 실행됩니다. 앱이 보여 주는 위험도는 참고용 판단이며 정확성을 보장하지 않습니다. 명령 실행으로 생긴 결과(파일 변경·삭제, 배포, 데이터베이스 변경, 비용 발생 등)에 대한 책임은 이용자에게 있습니다. 중요한 작업은 승인 전에 내용을 확인하세요.</p>` },
      { id: 'subscription', h: '구독과 결제', body: `<ul>
        <li>Pro와 Team은 자동 갱신 구독입니다. 결제와 갱신, 환불은 구독한 스토어(App Store, Google Play, Microsoft Store)의 정책을 따릅니다.</li>
        <li>구독은 현재 기간이 끝나기 최소 24시간 전에 해지하지 않으면 자동으로 갱신됩니다. 해지는 기기 설정의 구독 관리에서 합니다.</li>
        <li>이 웹사이트에 적힌 가격은 출시 예정 가격이며, 실제 가격은 스토어에 표시된 가격을 따릅니다.</li>
      </ul>` },
      { id: 'user', h: '이용자의 의무', body: `<ul>
        <li>자신이 관리 권한을 가진 컴퓨터와 계정에만 Foreman을 연결합니다.</li>
        <li>에이전트 제공자와 Apple의 약관을 지킵니다.</li>
        <li>앱을 이용해 법령을 어기거나 다른 사람의 시스템에 허가 없이 접근하지 않습니다.</li>
      </ul>` },
      { id: 'ip', h: '지식재산', body: `<p>앱과 웹사이트의 소프트웨어, 디자인, 상표에 대한 권리는 개발자에게 있습니다. 이용자의 코드, 세션 내용, 데이터에 대한 권리는 이용자에게 있으며, 개발자는 이를 받거나 이용하지 않습니다.</p>` },
      { id: 'warranty', h: '보증의 부인', body: `<p>앱은 "있는 그대로" 제공됩니다. 개발자는 앱이 중단 없이 또는 오류 없이 동작한다고 보증하지 않습니다. 연결은 이용자의 네트워크, 호스트 컴퓨터의 전원·잠자기 상태, 이용자의 클라우드 서비스(iCloud, Google Drive)와 공개 STUN 서버의 상태에 영향을 받습니다.</p>` },
      { id: 'liability', h: '책임의 제한', body: `<p>관련 법령이 허용하는 범위에서, 개발자는 앱 이용으로 생긴 간접적·부수적·결과적 손해에 책임지지 않으며, 개발자의 책임은 이용자가 직전 12개월 동안 Foreman에 지급한 금액을 넘지 않습니다. 법령상 제한할 수 없는 책임은 예외로 합니다.</p>` },
      { id: 'changes', h: '약관의 변경과 종료', body: `<p>약관을 바꾸면 이 페이지에 새 내용과 시행일을 게시합니다. 이용자는 언제든 앱을 삭제하고 구독을 해지해 이용을 끝낼 수 있습니다.</p>` },
      { id: 'contact', h: '문의', body: `<p>약관에 관한 문의는 <a href="${REPO}/issues">GitHub Issues</a>로 남겨 주세요.</p>` },
    ],
  },

  support: {
    metaTitle: '지원 — Foreman',
    metaDescription: 'Foreman 문의 방법과 자주 묻는 질문.',
    kicker: '지원',
    title: '도움이 필요하신가요?',
    lede: '문의와 버그 신고는 GitHub Issues로 받습니다. 공개 이슈에는 API 키, 토큰, 개인정보를 적지 마세요.',
    contact: [
      { icon: 'github-logo', h: '문의와 버그 신고', p: '어떤 기기와 OS 버전에서 무엇을 했을 때 어떤 일이 생겼는지 적어 주세요. 화면 캡처가 있으면 빨리 확인할 수 있습니다.', href: `${REPO}/issues/new`, link: '새 이슈 열기' },
      { icon: 'shield-check', h: '보안 문제 제보', p: '보안 취약점은 공개 이슈 대신 GitHub의 비공개 취약점 제보 기능으로 알려 주세요.', href: `${REPO}/security/advisories/new`, link: '비공개로 제보하기' },
    ],
    faqTitle: '자주 묻는 질문',
    faq: [
      ['Foreman은 무엇인가요?', ['Mac이나 Windows PC에서 도는 코딩 에이전트(Claude Code, Codex, Gemini CLI 등)의 세션을 iPhone, iPad, Mac, Apple Watch, Android, Windows에서 보고 입력하고 승인하는 앱입니다. 세션마다 원격 기능을 따로 켤 필요 없이, 평소처럼 실행한 세션을 가져옵니다.']],
      ['언제 출시되나요?', ['지금은 개발 중이고 출시일은 정하지 않았습니다. 첫 버전부터 iPhone·iPad·Mac·Apple Watch·Android·Windows 앱과 Mac·Windows 호스트를 함께 냅니다. 출시하면 이 사이트에 App Store, Google Play, Microsoft Store, Mac 직접 다운로드 링크를 올립니다.']],
      ['어떤 컴퓨터를 호스트로 쓸 수 있나요?', ['Mac과 Windows PC입니다. 늘 켜 두는 Mac mini나 데스크톱 PC가 잘 맞고, 노트북도 됩니다. 밖에서 쓰려면 호스트가 잠자기에 들지 않도록 설정해 두세요.']],
      ['정말 서버를 거치지 않나요?', [`개발자가 운영하는 서버는 없습니다. 같은 네트워크에서는 직접, 밖에서는 WebRTC로 직접 연결하고, 그것도 안 될 때만 내 클라우드 계정(${R.appleDevices}는 ${R.apple}, ${R.otherDevices}은 ${R.other})을 우편함으로 씁니다. 직접 연결 경로를 찾을 때 공개 STUN 서버에 공인 IP 주소를 확인하는 것이 유일한 외부 통신입니다.`]],
      ['밖에서 연결이 안 돼요.', ['호스트 컴퓨터가 켜져 있고 잠자기 상태가 아닌지, 휴대폰에서 그 호스트와 페어링했는지, 앱을 쓰는 기기가 iCloud(Android·Windows 앱은 Google 계정)에 로그인되어 있는지 확인해 주세요. 회사망처럼 직접 연결을 막는 네트워크에서는 자동으로 클라우드 우편함을 거치며, 이때 터미널 출력은 1~2초씩 늦게 보일 수 있습니다.']],
      ['Free에서 연결할 수 있는 에이전트는 몇 개인가요?', ['두 종류까지입니다. 예를 들어 Claude Code와 Codex를 함께 쓸 수 있습니다. 호스트는 1대, 동시 세션은 3개까지이며, 에이전트 사이 인계와 페일오버 같은 연계 기능은 Pro에 있습니다.']],
      ['API 키는 어디에 저장되나요?', ['에이전트가 도는 컴퓨터의 보안 저장소(Mac은 키체인)에만 저장됩니다. 휴대폰이나 클라우드 계정으로 보내지 않습니다.']],
    ],
  },
};
