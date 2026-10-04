export const SITE = {
  name: 'Suwatte',
  tagline: 'Read your way.',
  description:
    'Suwatte is an ad-free reader for manga, manhwa, manhua, comics and novels on iPhone and iPad. Add your own sources, connect your own servers, and let iCloud keep your devices the same.',
  url: 'https://suwatte.app',
  github: 'https://github.com/Suwatte',
  patreon: 'https://www.patreon.com/mantton',
  appStoreID: '6448855813',
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

  privacyEffective: '21 September 2026',
  privacyVersion: '1.2',
  termsEffective: '27 August 2026',
  termsVersion: '1.1',
} as const;

/**
 * Anything left `null` is hidden by the components that use it rather than
 * rendered as a dead link.
 */
export const EXTERNAL_LINKS = {
  /** e.g. 'https://apps.apple.com/app/suwatte/id0000000000' */
  appStore: 'https://apps.apple.com/app/suwatte/id6448855813',
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
      { label: 'Library Labels', slug: 'labels' },
      { label: 'Flags', slug: 'flags' },
      { label: 'Linked Titles', slug: 'linked-titles' },
      { label: 'Local files', slug: 'local-files' },
      { label: 'Image-Folder Books', slug: 'image-folders' },
      { label: 'Local Library Metadata', slug: 'local-metadata' },
    ],
  },
  {
    label: 'Content',
    entries: [
      { label: 'Sources', slug: 'sources' },
      { label: 'Servers', slug: 'servers' },
      { label: 'Search Filters', slug: 'search' },
      { label: 'Sharing Source Links', slug: 'sharing' },
      { label: 'Downloads', slug: 'downloads' },
      { label: 'Automatic Chapter Downloads', slug: 'smart-downloads' },
      { label: 'Updates', slug: 'updates' },
      { label: 'Smart Updates and Upcoming', slug: 'smart-updates' },
    ],
  },
  {
    label: 'The Reader',
    entries: [
      { label: 'Reading Modes', slug: 'reading-modes' },
      { label: 'Reader Settings', slug: 'reader-settings' },
      { label: 'Reader Presets', slug: 'reader-presets' },
      { label: 'Page and Tap Controls', slug: 'image-reader-controls' },
      { label: 'Chapter Filters', slug: 'chapter-filters' },
      { label: 'Novels and PDFs', slug: 'publications' },
      { label: 'Book Fonts', slug: 'book-fonts' },
      { label: 'Progress and History', slug: 'progress' },
    ],
  },
  {
    label: 'Appearance and Widgets',
    entries: [
      { label: 'Themes and Appearance', slug: 'appearance' },
      { label: 'Widgets and Daily Goals', slug: 'widgets' },
    ],
  },
  {
    label: 'Your data',
    entries: [
      { label: 'iCloud sync', slug: 'sync' },
      { label: 'A Device-Only Library', slug: 'device-library' },
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
