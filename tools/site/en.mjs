// English content. build.mjs renders the root pages from these values.
import { icon } from './icons.mjs';
import { RELAY } from './relay.mjs';
import { MAC } from './downloads.mjs';
import guide from './guide-en.mjs';
const R = RELAY.en;
const REPO = 'https://github.com/bbdyno/Foreman-Page';
const ARROW = icon('arrow-right');
const EFFECTIVE = 'October 22, 2026';

export default {
  lang: 'en',
  guide,
  ui: {
    skip: 'Skip to content',
    home: 'home',
    navLabel: 'Main menu',
    footNav: 'Site links',
    nav: { guide: 'Guide', home: 'Overview', features: 'Features', pricing: 'Pricing', support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Use' },
    otherLang: '한국어',
    status: 'In development',
    footLine: 'An app for managing the coding agents that run on your computer from iPhone, iPad, Mac, Apple Watch, Android and Windows. It works without any servers of ours.',
    legal: '© 2026 Foreman. Apple, iPhone, iPad, Mac, Apple Watch, iCloud, Face ID and App Store are trademarks of Apple Inc. Android and Google Play are trademarks of Google LLC; Windows and Microsoft Store of Microsoft Corporation. Claude is a trademark of Anthropic, Codex of OpenAI and Gemini of Google. Foreman is an independent app and is not affiliated with these companies.',
    anchor: 'Link to this section',
    toc: 'Contents',
    ogAlt: 'Foreman logo and the line: Manage the coding agents on your computer from anywhere.',
    yes: 'Included',
    no: 'Not included',
  },

  home: {
    metaTitle: 'Foreman — your computer’s coding agents, from anywhere',
    metaDescription: 'Follow, answer and approve Claude Code, Codex and Gemini CLI sessions from iPhone, iPad, Mac, Apple Watch, Android and Windows. No Remote Control per session, and no servers of ours.',
    devices: 'iPhone · iPad · Mac · Apple Watch · Android · Windows',
    title: 'Manage the coding agents on your computer from anywhere.',
    lede: 'No need to turn on Remote Control for every session. Start Claude Code, Codex or Gemini CLI on your Mac or Windows PC the way you always do. Foreman picks the session up, and you can follow it, answer it and approve it from iPhone, iPad, Mac, Apple Watch, Android and Windows.',
    launch: 'Foreman isn’t out yet. The apps for every device ship together in the first version, and the computer that runs your agents (the host) can be a Mac or a Windows PC.',
    storesTitle: 'Where to get it at launch',
    stores: [
      ['app-store-logo', 'App Store', 'iPhone · iPad · Apple Watch'],
      ['google-play-logo', 'Google Play', 'Android'],
      ['windows-logo', 'Microsoft Store', 'Windows app · Windows host'],
      ['apple-logo', 'Direct download for Mac', 'Mac app · Mac host', [[`Foreman app ${MAC.version} (DMG)`, MAC.app], [`Foreman Host ${MAC.version} (DMG)`, MAC.host]]],
    ],
    storeState: 'Coming at launch',
    jumpFeatures: 'See what it does',
    jumpZero: 'How it works without servers',
    turnBadge: 'Your turn',
    turnText: 'Foreman speaks up only when an agent is waiting for your approval or answer. The rest of the time it stays quiet.',
    facts: [
      ['Servers of ours', 'Zero'],
      ['Where your data goes', 'Your computer · your devices · your cloud account'],
      ['Sign-up', 'None'],
    ],
    heroShot: { key: 'ios-lock', alt: 'iPhone Lock Screen Live Activity and widgets: 5 running, 3 waiting for you, and a widget that allows the git push in Kumquat right away.', cap: 'iPhone · Live Activity and widgets' },
    filmLabel: 'Foreman introduction video',
    filmCaption: '40 seconds · plays here without sound; the download has music.',
    filmDownload: 'Download 1080p MP4',
    sections: [
      {
        key: 'approve', label: 'Approvals',
        title: 'When an agent waits for you, answer from your pocket.',
        text: ['When an agent asks for permission or has a question, the requests from all your computers land in one approval inbox. Every command shows its risk, and anything that can’t be undone needs Face ID.'],
        points: [
          ['bell-ringing', '<b>Allow or deny</b> straight from the Lock Screen notification'],
          ['fingerprint', '<b><code>rm -rf</code>, <code>push --force</code>, production databases</b> always ask for Face ID'],
          ['watch', '<b>Approve on Apple Watch</b> (Pro)'],
          ['gauge', '<b>Live Activity</b> for test and build progress (Pro)'],
        ],
        shots: [
          { key: 'ios-inbox', alt: 'Approval inbox. A git push in Kumquat is reversible and has an Allow button; a prisma migrate deploy in FitBoost-Backend is set apart with a ▲ risky mark and a heavy outline and can only be allowed with Face ID.', cap: 'iPhone · Approval inbox' },
          { key: 'ios-inbox-danger', alt: 'A risky request inside a session conversation. The production database migration sits in a heavy outlined box with only Deny and Allow with Face ID.', cap: 'iPhone · Irreversible requests' },
          { key: 'watch-approve', alt: 'Apple Watch showing an approval request for git push origin feat/paywall in the Kumquat session, with Deny and Allow buttons.', cap: 'Apple Watch' },
        ],
      },
      {
        key: 'session', label: 'Sessions',
        title: 'Read it as a conversation, or see the real terminal.',
        text: ['A resident process on your computer owns each session. Close the terminal window or lose the connection and the agent keeps running; reopen it and you pick up from the output you missed. The terminal at your computer and your phone can watch the same session at the same time.'],
        points: [
          ['chat-text', '<b>Conversation view</b>: prompts, replies, files read and edited, diffs'],
          ['terminal-window', '<b>Terminal view</b>: the actual PTY with an ESC, TAB and CTRL key row'],
          ['arrows-left-right', '<b>Resume where it dropped</b>, with nothing missed or repeated'],
          ['plugs-connected', '<b>Sessions started as usual</b> show up without any wrapper'],
        ],
        shots: [
          { key: 'ios-home', alt: 'Status screen: 3 waiting for you, 5 running, 14 done today, with the sessions waiting for an answer and the running ones.', cap: 'iPhone · Status' },
          { key: 'ios-session', alt: 'Conversation view with a diff of a retry policy and a question about the retry limit, with 3 and 5 (recommended) as answers.', cap: 'iPhone · Conversation view' },
          { key: 'ios-terminal', alt: 'Terminal view. The Kumquat session, watched together with the local terminal on the Mac mini, shows xcodebuild test output, with the key bar below.', cap: 'iPhone · Terminal view' },
        ],
      },
      {
        key: 'agents', label: 'Agents',
        title: 'Different accounts and limits, one list.',
        text: ['Foreman finds the agent CLIs installed on your computer and connects them. See Claude Code, Codex, Gemini CLI and OpenCode side by side, each with its own account, remaining limit and reset time. Free connects up to two kinds of agent.'],
        points: [
          ['plugs-connected', '<b>Claude Code · Codex · Gemini CLI · OpenCode</b>, any other CLI in terminal mode'],
          ['users-three', '<b>Personal and work accounts</b> connected separately'],
          ['hourglass-medium', '<b>5-hour and weekly limits</b> with time to reset'],
          ['lock-simple', '<b>API keys</b> stay on the host computer'],
        ],
        shots: [
          { key: 'ios-agents', alt: 'Agents screen: Claude Code, Codex, Gemini CLI and OpenCode connected with their accounts and limits, and Copilot CLI and Goose found on the host with Connect buttons.', cap: 'iPhone · Agents' },
          { key: 'ios-new-session', alt: 'New session screen with Mac mini as the host, ~/Personal/Kumquat as the folder and Claude Code as the agent.', cap: 'iPhone · New session' },
        ],
      },
      {
        key: 'orchestrate', label: 'Agent handoff', pro: true,
        title: 'When Claude hits its limit, Codex takes over.',
        text: ['With Pro, agents hand work to each other. Close to a limit, the next agent continues with a summary and the diff so far. You can also give implementation, review and testing to different agents, one stage after another.'],
        rows: [
          ['Limit failover', 'When your personal Claude account reaches 95%, work moves to your work account, then Codex, then Gemini. When all are spent, it waits for the reset and starts again.'],
          ['Handoff', 'The summary and the diff travel with the task, so context isn’t lost.'],
          ['Pipeline', 'Claude Code implements, Codex reviews, Gemini CLI tests and fixes. Save the order as a template.'],
          ['Race', 'Give two agents the same task, compare test results and diffs side by side, keep one.'],
        ],
        shots: [
          { key: 'mac-orchestrate', alt: 'Agent handoff on Mac. The Kumquat task is split into implement (Claude Code, done), review (Codex, in progress), test (Gemini CLI) and PR (Claude Code, needs approval); the failover order and today’s handoff log are on the right, the handoff summary and diff below.', cap: 'Mac · Agent handoff' },
        ],
      },
      {
        key: 'autopilot', label: 'Autopilot', pro: true,
        title: 'Sessions keep moving while you sleep.',
        text: ['Turn the commands you always allow into rules, and they go through without asking. Sessions that stopped at a limit continue right after the reset, and in the morning you get one page with what finished, what got stuck and how much limit is left.'],
        points: [
          ['list-checks', '<b>Approval rules</b>: read-only commands, tests and builds, pushes to chosen branches'],
          ['shield-check', '<b>Irreversible actions</b> always need Face ID, whatever the rules say'],
          ['clock-countdown', '<b>Resume after the limit resets</b>, automatically'],
          ['sun', '<b>Morning briefing</b> at the time you choose'],
        ],
        shots: [
          { key: 'ios-autopilot', alt: 'Autopilot. When the Claude 5-hour limit resets in 1 hour 41 minutes, two stopped sessions continue; read-only commands, tests and builds, and feat/* pushes are allowed automatically, and irreversible actions always need Face ID. The morning briefing setting is below.', cap: 'iPhone · Autopilot' },
        ],
      },
      {
        key: 'ipad', label: 'iPad',
        title: 'iPad becomes the control room.',
        text: ['Lay out the sessions from all your computers as tiles. Sessions waiting for you come first, and you can allow or answer right on the tile.'],
        shots: [
          { key: 'ipad-grid', alt: 'iPad control grid. Twelve sessions in a table divided by shared lines: cells waiting for you have Allow and Deny buttons, running cells show their latest output.', cap: 'iPad · Control grid' },
        ],
      },
      {
        key: 'mac', label: 'Mac',
        title: 'On the Mac, a full workspace.',
        text: ['The Mac app keeps sessions by host, plus conversation, terminal and changes views, in one window. Approval requests appear right above the conversation, with host status and limits on the right. On the Mac where agents run, a small menu bar helper keeps that Mac working as a host.'],
        shots: [
          { key: 'mac-workspace', alt: 'Mac workspace: sessions by host in the sidebar, a session conversation with an approval request in the middle, the terminal in a drawer below and host details on the right.', cap: 'Mac · Workspace' },
          { key: 'mac-menubar', alt: 'The Foreman Host menu in the Mac menu bar. This Mac is running as a host, with two sessions waiting for you and three running.', cap: 'Host Mac · Menu bar' },
          { key: 'mac-capture', alt: 'The Foreman Mac app, as it runs.', cap: 'Mac · The app as it runs' },
        ],
      },
      {
        key: 'zero', id: 'zero', label: 'Zero servers',
        title: 'Zero servers of ours. Only your computer, your devices and your cloud account.',
        text: [
          'Foreman first connects your device straight to your computer. Only when it can’t reach it directly does it use your cloud account as a mailbox. Whichever route it lands on, it resumes from the same point the same way.',
          'The host computer doesn’t depend on whose iCloud it is signed in to: a work Mac or a Windows PC works the same way. Your phone issues the host’s access and hands it over through an encrypted channel.',
        ],
        path: `Your devices<span class="sep">${ARROW}</span>your computer (Mac · Windows)<span class="sep">${ARROW}</span>Claude Code · Codex · Gemini CLI`,
        routes: [
          ['wifi-high', 'LAN direct', 'On the same network, the app finds your computer and connects directly.'],
          ['arrows-left-right', 'Peer to peer', 'Away from home, it connects to your computer directly over WebRTC. Connection details are exchanged through your cloud account.'],
          ['cloud', 'Cloud mailbox', `Used only when a direct connection isn’t possible: ${R.apple} for ${R.appleDevices}, and ${R.other} for ${R.otherDevices}. ${R.otherScope}`],
        ],
        note: 'All data is end-to-end encrypted between your devices, and the developer stores and reads nothing. Apart from asking a public STUN server for your public IP address while finding a route, session content never leaves your computer, your devices and your cloud account.',
      },
      {
        key: 'platforms', label: 'Platforms',
        title: 'Every device, from the first version.',
        text: ['The computers that run your agents (hosts) and the devices you manage them from are all supported at launch. Each app follows its own platform’s design conventions.'],
        rows: [
          ['Apps', 'iPhone · iPad · Mac · Apple Watch · Android · Windows'],
          ['Hosts', 'macOS · Windows. A Mac mini or a Windows PC that stays on works best.'],
        ],
        shots: [
          { key: 'android-home', alt: 'Status screen of the Android app: counts of waiting, running and finished sessions, the session list and four tabs at the bottom.', cap: 'Android · Status' },
          { key: 'android-shade', alt: 'Android notification shade with Foreman notifications: a question in DynoCam and an approval needed in NudgeMate.', cap: 'Android · Notifications' },
          { key: 'windows-main', alt: 'Status screen of the Windows app: the menu and host list on the left, three sessions waiting for you and four running in the middle.', cap: 'Windows · Status' },
        ],
      },
      {
        key: 'plans', label: 'Pricing',
        title: 'Free for up to two kinds of agent.',
        text: ['The features that let agents hand work to each other and cut the waiting are in Pro. These are the planned launch prices.'],
        plans: [
          { name: 'Free', price: '$0', text: '2 kinds of agent, 1 host, 3 sessions at a time, 7 days of history' },
          { name: 'Pro', price: '$7.99/mo', text: 'Agent handoff, Autopilot, Watch, Live Activity and widgets, no limits. $69 a year' },
          { name: 'Team', price: '$14/user/mo', text: 'Shared hosts, delegated and two-person approval, audit log' },
        ],
        more: 'See pricing in detail',
      },
    ],
  },

  pricing: {
    metaTitle: 'Pricing — Foreman',
    metaDescription: 'Foreman Free, Pro and Team plans and how they compare. Planned launch prices.',
    kicker: 'Planned launch prices',
    title: 'Pricing',
    lede: 'These are planned launch prices and may change at release. You pay through the App Store, Google Play or Microsoft Store, and each store sets the price in each country.',
    tiers: [
      { id: 'free', name: 'Free', price: '$0', unit: '', alt: '&nbsp;', for: 'For one person and one computer', items: ['Up to 2 kinds of agent in one place', '1 host · 3 sessions at a time', 'Conversation and terminal views', 'Approval and question notifications', 'LAN · peer to peer · cloud mailbox', '7 days of session history'] },
      { id: 'pro', name: 'Pro', price: '$7.99', unit: '/month', alt: '$69 a year', for: 'For people who combine several agents', items: ['Limit failover · handoff between agents', 'Pipelines · races', 'Unlimited agents and accounts', 'Unlimited hosts and sessions', 'Autopilot rules · resume after reset', 'Live Activity · Apple Watch · widgets', 'Morning briefing · unlimited searchable history'] },
      { id: 'team', name: 'Team', price: '$14', unit: '/user/month', alt: '&nbsp;', for: 'For teams sharing build machines', items: ['Everything in Pro', 'Shared hosts · take over sessions', 'Delegated approval · two-person approval', 'Audit log export', 'Invite teammates with iCloud sharing'] },
    ],
    compareTitle: 'Compare plans',
    compareHead: 'Feature',
    compare: [
      { group: 'Connection', rows: [
        ['LAN direct · peer to peer · cloud mailbox', true, true, true],
        ['Hosts (Mac · Windows PC)', '1', 'Unlimited', 'Unlimited'],
        ['Sessions at a time', '3', 'Unlimited', 'Unlimited'],
        ['Kinds of agent · accounts', '2', 'Unlimited', 'Unlimited'],
      ] },
      { group: 'Sessions and approvals', rows: [
        ['Conversation and terminal views', true, true, true],
        ['Approval inbox · risk · Face ID', true, true, true],
        ['Approval and question notifications', true, true, true],
        ['Live Activity · Apple Watch · widgets', false, true, true],
        ['Session history', '7 days', 'Unlimited, searchable', 'Unlimited, searchable'],
      ] },
      { group: 'Agents working together', rows: [
        ['Limit failover · handoff', false, true, true],
        ['Pipelines · races', false, true, true],
        ['Autopilot rules · resume after reset', false, true, true],
        ['Morning briefing', false, true, true],
      ] },
      { group: 'Team', rows: [
        ['Shared hosts · take over sessions', false, false, true],
        ['Delegated approval · two-person approval', false, false, true],
        ['Audit log export', false, false, true],
        ['Invite teammates with iCloud sharing', false, false, true],
      ] },
    ],
    footnote: 'No plan goes through a server of ours. Your subscription is checked with the store and your cloud account too.',
    faqTitle: 'About billing',
    faq: [
      ['Do I need a separate subscription for the Mac app?', ['No. Subscribe on iPhone or iPad and the Mac app signed in with the same Apple Account gets Pro too. The Mac app reads the App Store–signed subscription record from your iCloud.']],
      ['How do I cancel?', ['Cancel in the store you subscribed through: on iPhone or iPad, open Settings, tap your name, then Subscriptions; on Android, open Google Play and go to Payments & subscriptions; on Windows, go to Services & subscriptions in your Microsoft account. Pro stays on until the end of the period you paid for, then you’re on Free, which keeps 7 days of session history.']],
      ['How does Team billing work?', ['Team billing and invitations will be described on this page at launch. Teammates are invited through iCloud sharing.']],
      ['Is there a free trial?', ['The Free plan has no time limit. The length of a Pro trial will be set at launch.']],
    ],
  },

  privacy: {
    metaTitle: 'Privacy Policy — Foreman',
    metaDescription: 'Foreman has no servers run by its developer and collects no personal information. Your data stays on your computer, your devices and your cloud account.',
    kicker: `Effective ${EFFECTIVE}`,
    title: 'Privacy Policy',
    lede: 'Foreman has no servers run by its developer, and the developer does not collect your personal information.',
    sections: [
      { id: 'summary', h: 'Summary', body: `<p class="summary">The data Foreman works with is stored only on your computer, your devices and your cloud account (${R.apple} or ${R.other}). The developer cannot receive or see it.</p>
      <ul><li>There is no sign-up. We don’t ask for your name, email address or phone number.</li><li>No advertising identifiers, analytics or tracking SDKs.</li><li>All data travels between your devices end-to-end encrypted, and the developer stores and reads nothing.</li></ul>` },
      { id: 'collect', h: 'Information the developer collects', body: `<p>None. The developer runs no relay, logging or account servers, so none of your information is sent to the developer.</p>` },
      { id: 'data', h: 'Data the app handles and where it is stored', body: `<p>The app needs the data below to work. All of it is stored only in places you control.</p>
      <ul>
        <li><strong>Session output and history</strong> (an agent’s terminal output, conversation and changes): on the computer where the agent runs (the host). Only when your device can’t reach the host directly is your cloud account used as a mailbox.</li>
        <li><strong>Cloud mailbox</strong>: ${R.apple} (${R.appleStore}) for ${R.appleDevices}; ${R.other} for ${R.otherDevices}. ${R.otherScope} What passes through the mailbox is end-to-end encrypted too.</li>
        <li><strong>Approval requests and questions</strong>: on your computer and devices, and in the cloud mailbox above.</li>
        <li><strong>Pairing details and API keys</strong>: in the keychain (or the operating system’s secure storage) of your devices and computer. Agent API keys stay on the computer where the agent runs. Your phone issues the host’s access and hands it over through an encrypted channel; it does not depend on the host computer’s iCloud sign-in.</li>
        <li><strong>Settings and approval rules</strong>: on your devices and in your cloud account.</li>
      </ul>
      <p>Data stored in your cloud account is subject to that service’s terms and privacy policy (Apple iCloud, Google Drive).</p>` },
      { id: 'third', h: 'Communication with other services', body: `<ul>
        <li><strong>Apple</strong>: ${R.appleDevices} use iCloud (CloudKit), push notifications and App Store payments. Notifications on Apple devices are sent by Apple directly, through a subscription registered in your iCloud.</li>
        <li><strong>Google</strong>: ${R.otherDevices} use ${R.other} as the mailbox. Payments in the Android app are processed by Google Play.</li>
        <li><strong>Microsoft</strong>: the Windows app is distributed and paid for through Microsoft Store.</li>
        <li><strong>Public STUN servers</strong> (stun.cloudflare.com, stun.l.google.com): used only to learn your public IP address while finding a direct route between your devices. No session content is sent. Each operator’s own policy applies.</li>
        <li><strong>Agent providers</strong>: agents such as Claude Code, Codex and Gemini CLI run on your computer because you start them, and they talk to their own services under their providers’ terms and privacy policies. Foreman does not intercept their traffic or send data on their behalf.</li>
      </ul>` },
      { id: 'crash', h: 'Crash reports and diagnostics', body: `<p>The app contains no crash-reporting tool of its own. The only crash information the developer receives is what each store (App Store, Google Play, Microsoft Store) provides by default, and only if you agreed in your device settings to share it with developers. It does not identify you.</p>` },
      { id: 'payment', h: 'Payments', body: `<p>Subscriptions are processed by the store you subscribe through (App Store, Google Play, Microsoft Store). The developer receives no payment or billing details. The directly downloaded Mac app checks your subscription by reading the App Store–signed record from your iCloud.</p>` },
      { id: 'delete', h: 'Retention and deletion', body: `<p>Data stays on your computer, your devices and your cloud account until you delete it. On the Free plan, session history older than 7 days is deleted automatically. Deleting the app removes its data from that device. Data left in iCloud can be removed on iPhone: open Settings, tap your name, then iCloud and Manage Account Storage, and choose Foreman. The app-only folder in Google Drive is removed under Manage apps in Google Drive settings, by deleting Foreman’s hidden app data. Session history on the host is deleted in the host app’s settings.</p>` },
      { id: 'website', h: 'This website', body: `<p>This website is served by GitHub Pages. It uses no cookies, no analytics and no external font services. GitHub may process access logs (such as IP addresses) to operate its service, under the <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">GitHub General Privacy Statement</a>.</p>` },
      { id: 'children', h: 'Children', body: `<p>Foreman is a tool for software developers and is not directed at children under 13. The developer collects no personal information from anyone, including children.</p>` },
      { id: 'changes', h: 'Changes to this policy', body: `<p>If this policy changes, the new text and its effective date will be posted on this page. You can see every change in the <a href="${REPO}/commits/main/privacy/index.html">GitHub repository</a>.</p>` },
      { id: 'contact', h: 'Contact', body: `<p>For questions about privacy, open an issue on <a href="${REPO}/issues">GitHub Issues</a>. Please don’t put personal information in a public issue.</p>` },
    ],
  },

  terms: {
    metaTitle: 'Terms of Use — Foreman',
    metaDescription: 'Terms of use for the Foreman apps.',
    kicker: `Effective ${EFFECTIVE}`,
    title: 'Terms of Use',
    lede: 'These terms apply when you use the Foreman apps and this website. Apps downloaded from a store are also covered by that store’s license terms, such as Apple’s standard End User License Agreement (EULA) for the App Store.',
    sections: [
      { id: 'scope', h: 'Scope', body: `<p>These terms cover the Foreman apps for iPhone, iPad, Mac, Apple Watch, Android and Windows, the host program, and this website. By installing or using the apps you agree to these terms. Where these terms conflict with a store’s license terms (such as Apple’s standard EULA), the store’s terms prevail for apps obtained from that store.</p>` },
      { id: 'service', h: 'What the app does', body: `<p>Foreman is a tool that lets you view, type into and approve the coding agent sessions running on your computer (Mac or Windows PC) from your other devices. Foreman does not provide the agents. Your use of agents such as Claude Code, Codex and Gemini CLI is governed by their providers’ terms, and you manage your own accounts and usage limits.</p>` },
      { id: 'responsibility', h: 'Responsibility for approvals and commands', body: `<p>Commands you allow in Foreman, or that Autopilot rules allow for you, run on your computer with your permissions. The risk level the app shows is guidance and is not guaranteed to be accurate. You are responsible for the results of running commands, including changed or deleted files, deployments, database changes and costs. Check important actions before you approve them.</p>` },
      { id: 'subscription', h: 'Subscriptions and payment', body: `<ul>
        <li>Pro and Team are auto-renewing subscriptions. Payment, renewal and refunds follow the policies of the store you subscribed through (App Store, Google Play, Microsoft Store).</li>
        <li>A subscription renews automatically unless cancelled at least 24 hours before the end of the current period. Cancel in your device’s subscription settings.</li>
        <li>Prices on this website are planned launch prices; the price shown in the store applies.</li>
      </ul>` },
      { id: 'user', h: 'Your obligations', body: `<ul>
        <li>Connect Foreman only to computers and accounts you are authorized to manage.</li>
        <li>Follow the terms of the agent providers and of Apple.</li>
        <li>Don’t use the app to break the law or to access other people’s systems without permission.</li>
      </ul>` },
      { id: 'ip', h: 'Intellectual property', body: `<p>The developer holds the rights to the software, design and trademarks of the apps and website. You hold the rights to your code, session content and data; the developer neither receives nor uses them.</p>` },
      { id: 'warranty', h: 'Disclaimer of warranties', body: `<p>The apps are provided “as is”. The developer does not warrant that they will run without interruption or error. Connections depend on your network, the host computer’s power and sleep state, and the availability of your cloud service (iCloud, Google Drive) and public STUN servers.</p>` },
      { id: 'liability', h: 'Limitation of liability', body: `<p>To the extent permitted by law, the developer is not liable for indirect, incidental or consequential damages arising from use of the apps, and the developer’s total liability is limited to the amount you paid for Foreman in the preceding 12 months. Liability that cannot be limited by law is excluded from this limitation.</p>` },
      { id: 'changes', h: 'Changes and termination', body: `<p>If these terms change, the new text and its effective date will be posted on this page. You can stop using Foreman at any time by deleting the apps and cancelling your subscription.</p>` },
      { id: 'contact', h: 'Contact', body: `<p>For questions about these terms, open an issue on <a href="${REPO}/issues">GitHub Issues</a>.</p>` },
    ],
  },

  support: {
    metaTitle: 'Support — Foreman',
    metaDescription: 'How to reach us and answers to common questions about Foreman.',
    kicker: 'Support',
    title: 'Need help?',
    lede: 'Questions and bug reports go through GitHub Issues. Please don’t post API keys, tokens or personal information in a public issue.',
    contact: [
      { icon: 'github-logo', h: 'Questions and bug reports', p: 'Tell us the device and OS version, what you did and what happened. A screenshot helps us look into it faster.', href: `${REPO}/issues/new`, link: 'Open a new issue' },
      { icon: 'shield-check', h: 'Report a security issue', p: 'Please report vulnerabilities privately through GitHub’s private vulnerability reporting instead of a public issue.', href: `${REPO}/security/advisories/new`, link: 'Report privately' },
    ],
    faqTitle: 'Common questions',
    faq: [
      ['What is Foreman?', ['An app for viewing, typing into and approving the sessions of coding agents (Claude Code, Codex, Gemini CLI and others) running on your Mac or Windows PC, from iPhone, iPad, Mac, Apple Watch, Android and Windows. You don’t turn on a remote feature per session; sessions you start as usual come along.']],
      ['When will it be released?', ['It’s in development and there’s no release date yet. The first version ships the iPhone, iPad, Mac, Apple Watch, Android and Windows apps together with Mac and Windows hosts. When it’s out, links to the App Store, Google Play, Microsoft Store and the Mac download will be on this site.']],
      ['Which computers can be a host?', ['A Mac or a Windows PC. A Mac mini or desktop PC that stays on is a good fit, and laptops work too. To use Foreman away from home, set the host so it doesn’t go to sleep.']],
      ['Does it really not go through a server?', [`There’s no server run by the developer. On the same network the app connects directly; away from home it connects directly over WebRTC; only when that fails does it use your cloud account as a mailbox (${R.apple} for ${R.appleDevices}, ${R.other} for ${R.otherDevices}). Asking a public STUN server for your public IP address while finding a direct route is the only other outside traffic.`]],
      ['It won’t connect when I’m away.', ['Check that the host computer is on and not asleep, that you paired it from your phone, and that the device you use is signed in to iCloud (for the Android and Windows apps, to your Google account). On networks that block direct connections, such as some office networks, the app goes through the cloud mailbox automatically; terminal output may then arrive a second or two late.']],
      ['How many agents can I connect on Free?', ['Two kinds, for example Claude Code and Codex together. Free includes one host and three sessions at a time; handoff and failover between agents are in Pro.']],
      ['Where are API keys stored?', ['Only in the secure storage of the computer where the agent runs (the keychain on a Mac). They are never sent to your phone or your cloud account.']],
    ],
  },
};
