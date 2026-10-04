/**
 * Theme builder for suwatte.app.
 *
 * The token list, the presets, the `.stt_theme` document and the text colour
 * on the accent mirror the app (`Shared/Theming/AppThemeModels.swift` and
 * `Shared/Utilities/AppTheme.swift`). Keep them in step when the app changes.
 */

export const TOKENS = [
  'background',
  'groupedBackground',
  'surface',
  'text',
  'secondaryText',
  'separator',
  'accent',
] as const;

export type Token = (typeof TOKENS)[number];
export type Palette = Record<Token, string>;

type Preset = { id: string; name: string; family: 'Suwatte' | 'Catppuccin'; light: Palette; dark?: Palette };

function palette(values: string[]): Palette {
  return Object.fromEntries(TOKENS.map((token, index) => [token, values[index]])) as Palette;
}

const latte = palette(['#EFF1F5', '#DCE0E8', '#E6E9EF', '#4C4F69', '#5C5F77', '#CCD0DA', '#8839EF']);
const mocha = palette(['#1E1E2E', '#11111B', '#313244', '#CDD6F4', '#BAC2DE', '#45475A', '#CBA6F7']);

export const PRESETS: Preset[] = [
  { id: 'lavender', name: 'Lavender', family: 'Suwatte', light: palette(['#1B1A28', '#16151F', '#26243A', '#EDE9F7', '#A6A0BD', '#3B3854', '#C4A6F2']) },
  { id: 'midnight', name: 'Midnight', family: 'Suwatte', light: palette(['#000000', '#000000', '#0F1016', '#E8EAF0', '#8A8FA0', '#23252E', '#7AA2F7']) },
  { id: 'nord', name: 'Nord', family: 'Suwatte', light: palette(['#2E3440', '#2A2F3A', '#3B4252', '#ECEFF4', '#B3BCCB', '#4C566A', '#88C0D0']) },
  { id: 'sakura', name: 'Sakura', family: 'Suwatte', light: palette(['#1F1519', '#1A1115', '#2C1F25', '#F6E9EE', '#BFA3AE', '#46323B', '#F2A7BD']) },
  { id: 'matcha', name: 'Matcha', family: 'Suwatte', light: palette(['#151A15', '#111511', '#1F261F', '#E7EFE4', '#A3B3A0', '#34403A', '#A7D38F']) },
  { id: 'sepia', name: 'Sepia', family: 'Suwatte', light: palette(['#F6EFE1', '#EFE6D3', '#FBF7EE', '#2B2217', '#6E5E48', '#DCCDB2', '#9A6331']) },
  { id: 'catppuccin-latte-mocha', name: 'Latte & Mocha', family: 'Catppuccin', light: latte, dark: mocha },
  { id: 'catppuccin-latte', name: 'Latte', family: 'Catppuccin', light: latte },
  { id: 'catppuccin-frappe', name: 'Frappé', family: 'Catppuccin', light: palette(['#303446', '#232634', '#414559', '#C6D0F5', '#B5BFE2', '#51576D', '#CA9EE6']) },
  { id: 'catppuccin-macchiato', name: 'Macchiato', family: 'Catppuccin', light: palette(['#24273A', '#181926', '#363A4F', '#CAD3F5', '#B8C0E0', '#494D64', '#C6A0F6']) },
  { id: 'catppuccin-mocha', name: 'Mocha', family: 'Catppuccin', light: mocha },
];

// MARK: - Colour maths (sRGB, same formulas as the app)

type RGB = [number, number, number];

export function normalizeHex(value: string): string | null {
  const match = value.trim().replace(/^#/, '').match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  const raw = match[1].length === 3 ? [...match[1]].map((c) => c + c).join('') : match[1];
  return `#${raw.toUpperCase()}`;
}

function rgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function toHex([r, g, b]: RGB): string {
  return `#${[r, g, b].map((v) => Math.round(Math.min(Math.max(v, 0), 1) * 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

function luminance([r, g, b]: RGB): number {
  const linear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrastRGB(a: RGB, b: RGB): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function contrast(a: string, b: string): number {
  return contrastRGB(rgb(a), rgb(b));
}

function mix(a: RGB, b: RGB, amount: number): RGB {
  return [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * amount) as RGB;
}

export function isDark(p: Palette): boolean {
  const bg = rgb(p.background);
  return contrastRGB(bg, [1, 1, 1]) > contrastRGB(bg, [0, 0, 0]);
}

/** `AppTheme.contrastingTextColor`: keep the accent's hue when 7:1 is reachable. */
export function textOnAccent(accent: string): string {
  const base = rgb(accent);
  const extreme: RGB = contrastRGB(base, [0, 0, 0]) >= contrastRGB(base, [1, 1, 1]) ? [0, 0, 0] : [1, 1, 1];
  const saturation = Math.max(...base) - Math.min(...base);
  if (saturation <= 0.1 || contrastRGB(base, extreme) <= 7) return toHex(extreme);
  let low = 0;
  let high = 1;
  for (let i = 0; i < 12; i++) {
    const mid = (low + high) / 2;
    if (contrastRGB(mix(base, extreme, mid), base) >= 7) high = mid;
    else low = mid;
  }
  return toHex(mix(base, extreme, high));
}

// MARK: - .stt_theme

export type Theme = { name: string; light: Palette; dark: Palette | null };

/** Matches `AppThemeFile.encode`: sorted keys, version 2 only for dynamic themes. */
export function encodeTheme(theme: Theme): string {
  const sortPalette = (p: Palette) => Object.fromEntries([...TOKENS].sort().map((t) => [t, p[t]]));
  const doc: Record<string, unknown> = {
    colors: sortPalette(theme.light),
    ...(theme.dark ? { darkColors: sortPalette(theme.dark) } : {}),
    format: 'suwatte.theme',
    name: theme.name.trim() || 'My Theme',
    version: theme.dark ? 2 : 1,
  };
  return JSON.stringify(doc, null, 2);
}

export function decodeTheme(text: string): Theme {
  const doc = JSON.parse(text);
  if (doc?.format !== 'suwatte.theme') throw new Error('This file is not a Suwatte theme.');
  if (typeof doc.version !== 'number' || doc.version > 2) throw new Error('This theme uses a newer format.');
  const read = (raw: unknown, label: string): Palette => {
    const out = {} as Palette;
    for (const token of TOKENS) {
      const hex = normalizeHex(String((raw as Record<string, unknown>)?.[token] ?? ''));
      if (!hex) throw new Error(`The theme has no ${label}${token} color.`);
      out[token] = hex;
    }
    return out;
  };
  return {
    name: String(doc.name ?? '').trim() || 'Imported Theme',
    light: read(doc.colors, ''),
    dark: doc.darkColors ? read(doc.darkColors, 'dark ') : null,
  };
}

export function fileName(name: string): string {
  const base = name.replace(/[^\p{L}\p{N} _-]/gu, '').trim();
  return `${base || 'Theme'}.stt_theme`;
}

// MARK: - Share links (#theme=<base64url JSON>)

export function themeToHash(theme: Theme): string {
  const bytes = new TextEncoder().encode(encodeTheme(theme));
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function themeFromHash(hash: string): Theme | null {
  const match = hash.match(/theme=([A-Za-z0-9_-]+)/);
  if (!match) return null;
  try {
    const b64 = match[1].replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return decodeTheme(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}
