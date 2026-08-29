export const SITE = {
  name: 'Suwatte',
  tagline: 'Read your way.',
  description:
    'Suwatte is a completely ad-free reader for manga, manhwa, manhua, comics and novels on iPhone and iPad. Add your own sources, connect your own servers, and let iCloud keep your devices the same.',
  url: 'https://suwatte.mantton.com',
  github: 'https://github.com/Suwatte',
  patreon: 'https://www.patreon.com/mantton',
  minimumOS: 'iOS 17',
  supportEmail: 'help@mantton.com',
} as const;

/**
 * Values shared by the privacy policy and the terms of service so the two
 * documents cannot drift apart.
 */
export const LEGAL = {
  entity: 'Suwatte',

  /** Optional. Both documents fall back to the support email when this is null. */
  address: null as string | null,

  /** Where we are based. Used in the privacy policy. */
  country: 'Canada',

  privacyEffective: '27 August 2026',
  privacyVersion: '1.1',
  termsEffective: '27 August 2026',
  termsVersion: '1.1',
} as const;

/**
 * Anything left `null` is hidden by the components that use it rather than
 * rendered as a dead link.
 */
export const EXTERNAL_LINKS = {
  /** e.g. 'https://apps.apple.com/app/suwatte/id0000000000' */
  appStore: null as string | null,
  /** e.g. 'https://testflight.apple.com/join/xxxxxxxx' */
  testFlight: 'https://testflight.apple.com/join/8JYvZH1n',
  /** e.g. 'https://discord.gg/xxxxxxx' */
  discord: null as string | null,
} as const;

/**
 * Docs sidebar. Each entry's `slug` is the content collection id, so a page
 * exists on the site only when the matching Markdown file does — a missing
 * file surfaces as a build error rather than a dead link.
 */
export type SidebarEntry = { label: string; slug: string };
export type SidebarGroup = { label: string; entries: SidebarEntry[] };

export const USER_DOCS_SIDEBAR: SidebarGroup[] = [
  {
    label: 'Start here',
    entries: [
      { label: 'What is Suwatte?', slug: 'introduction' },
      { label: 'Install the app', slug: 'setup' },
      { label: 'Add your first source', slug: 'first-source' },
    ],
  },
  {
    label: 'Your library',
    entries: [
      { label: 'The library and collections', slug: 'library' },
      { label: 'Flags', slug: 'flags' },
      { label: 'Linked Titles', slug: 'linked-titles' },
      { label: 'Local files', slug: 'local-files' },
    ],
  },
  {
    label: 'Content',
    entries: [
      { label: 'Sources', slug: 'sources' },
      { label: 'Servers', slug: 'servers' },
      { label: 'Downloads', slug: 'downloads' },
      { label: 'Updates', slug: 'updates' },
    ],
  },
  {
    label: 'The Reader',
    entries: [
      { label: 'Reading Modes', slug: 'reading-modes' },
      { label: 'Reader Settings', slug: 'reader-settings' },
      { label: 'Novels and PDFs', slug: 'publications' },
      { label: 'Progress and History', slug: 'progress' },
    ],
  },
  {
    label: 'Your data',
    entries: [
      { label: 'iCloud sync', slug: 'sync' },
      { label: 'Backups', slug: 'backups' },
      { label: 'Insights and streaks', slug: 'insights' },
      { label: 'Privacy controls', slug: 'privacy-controls' },
    ],
  },
  {
    label: 'Help',
    entries: [
      { label: 'Correct a fault', slug: 'troubleshooting' },
      { label: 'Questions and answers', slug: 'faq' },
    ],
  },
];

export const DEV_DOCS_SIDEBAR: SidebarGroup[] = [
  {
    label: 'Start here',
    entries: [
      { label: 'How sources work', slug: 'introduction' },
      { label: 'Install the toolchain', slug: 'setup' },
      { label: 'Your first source', slug: 'first-source' },
    ],
  },
  {
    label: 'The toolchain',
    entries: [
      { label: 'The command line', slug: 'cli' },
      { label: 'The emulator', slug: 'emulator' },
      { label: 'Validation', slug: 'validation' },
    ],
  },
  {
    label: 'The runtime',
    entries: [
      { label: 'Environments', slug: 'environments' },
      { label: 'Directives', slug: 'directives' },
      { label: 'Capabilities', slug: 'capabilities' },
      { label: 'Networking', slug: 'networking' },
    ],
  },
  {
    label: 'Write a source',
    entries: [
      { label: 'Content and chapters', slug: 'content' },
      { label: 'Pages', slug: 'pages' },
      { label: 'Search and filters', slug: 'search' },
      { label: 'Home page feeds', slug: 'homepage' },
      { label: 'Settings', slug: 'settings' },
      { label: 'Progress sync', slug: 'progress-sync' },
    ],
  },
  {
    label: 'Release',
    entries: [
      { label: 'Source lists', slug: 'source-lists' },
      { label: 'Versions', slug: 'versioning' },
    ],
  },
];
