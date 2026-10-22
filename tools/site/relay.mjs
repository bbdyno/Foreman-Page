// How the apps reach the host when a direct connection fails ("the mailbox").
// Kept in one place because the Android/Windows path is still being validated.
export const RELAY = {
  ko: {
    any: '내 클라우드 계정',
    apple: '내 iCloud',
    appleDevices: 'iPhone·iPad·Mac·Apple Watch',
    other: '내 Google Drive의 앱 전용 폴더',
    otherDevices: 'Android·Windows 앱',
    otherScope: '앱 전용 폴더에는 Foreman이 만든 파일만 있고, 다른 파일은 보지 않습니다.',
    appleStore: 'CloudKit 개인 데이터베이스',
  },
  en: {
    any: 'your cloud account',
    apple: 'your iCloud',
    appleDevices: 'iPhone, iPad, Mac and Apple Watch',
    other: 'an app-only folder in your Google Drive',
    otherDevices: 'the Android and Windows apps',
    otherScope: 'The app-only folder holds only files Foreman created; Foreman does not see your other files.',
    appleStore: 'CloudKit private database',
  },
};
