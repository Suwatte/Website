#!/usr/bin/env node
/**
 * ASD-STE100 lint.
 *
 * Checks the parts of the rules that a machine can check: the "Do not use"
 * word lists, sentence length, em dashes and slashes. It cannot check meaning
 * or technical accuracy.
 *
 * Run it with `npm run ste`.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BANNED = [
  // verbs
  'accomplish', 'execute', 'perform', 'acquire', 'obtain', 'procure', 'adhere to',
  'comply with', 'ascertain', 'determine', 'assist', 'attempt', 'cease', 'terminate',
  'discontinue', 'commence', 'initiate', 'desire', 'endeavor', 'ensure', 'examine',
  'inspect', 'facilitate', 'illuminate', 'indicate', 'locate', 'modify', 'observe',
  'permit', 'purchase', 'rectify', 'remedy', 'replenish', 'require', 'retain',
  'transmit', 'utilize', 'verify',
  // nouns
  'aperture', 'assistance', 'commencement', 'illumination', 'malfunction', 'personnel',
  'portion', 'remainder', 'requirement', 'termination', 'utilization', 'vicinity',
  // adjectives and adverbs
  'adequate', 'sufficient', 'adjacent', 'approximately', 'additional', 'initial',
  'numerous', 'multiple', 'optimum', 'previous', 'principal', 'rapidly', 'subsequent',
  // phrases
  'a number of', 'at this time', 'due to the fact', 'for the purpose of',
  'in accordance with', 'in conjunction with', 'in order to', 'in the event that',
  'in the vicinity of', 'is capable of', 'it is necessary to', 'prior to',
  'subsequent to', 'with regard to',
];

const MAX_SENTENCE_WORDS = 25;

const COLLECTIONS = ['src/content/docs', 'src/content/developers'];
/**
 * The legal pages are deliberately absent.
 *
 * Privacy and terms are exempt from STE. Legal terms of art ("terminate",
 * "retention", "warranty", "indemnify", "comply with") have settled meanings
 * that plain substitutes change, and Apple's minimum EULA terms prescribe some
 * of that wording. STE rule 7.3 says to keep accuracy when a rule conflicts
 * with it. They are still checked for inline spacing below.
 */
const PAGES = [
  'src/pages/index.astro',
  'src/pages/help.astro',
  'src/pages/404.astro',
  'src/components/SiteFooter.astro',
];

/** Checked for the JSX spacing trap, but not for STE. */
const SPACING_ONLY_PAGES = ['src/pages/privacy.astro', 'src/pages/terms.astro'];

let issues = 0;

function report(kind, file, detail) {
  console.log(`${kind.padEnd(8)} ${file}: ${detail}`);
  issues += 1;
}

/** Sentences split on a full stop, a colon, a question mark or an exclamation. */
function sentences(text) {
  return text
    .split(/(?<=[.:!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function checkText(file, text) {
  for (const word of BANNED) {
    const hits = text.match(new RegExp(`\\b${word}\\b`, 'gi'));
    if (hits) report('BANNED', file, `"${word}" x${hits.length}`);
  }

  if (text.includes('—')) report('EMDASH', file, 'em dash found');

  // "and/or" is the one permitted slash.
  const slashes = text.replace(/and\/or/gi, '').match(/\w\/\w/g);
  if (slashes) report('SLASH', file, slashes.slice(0, 3).join(', '));

  for (const sentence of sentences(text)) {
    const words = sentence.split(/\s+/).filter(Boolean).length;
    if (words > MAX_SENTENCE_WORDS) {
      report('LONG', file, `${words} words: ${sentence.slice(0, 80)}...`);
    }
  }
}

/** Markdown, without frontmatter, code, tables or link targets. */
function markdownProse(raw) {
  const body = raw
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\|.*$/gm, '')
    // Inline code holds technical names, which the rules exempt.
    .replace(/`[^`]*`/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    // Raw HTML can hold guide media. Check its visible labels, not its tags or paths.
    .replace(/<[^>]+>/g, ' ')
    // Emphasis markers otherwise hide the full stop that ends a sentence.
    .replace(/\*\*/g, '')
    .replace(/(?<=\w)\*(?=\W)|(?<=\W)\*(?=\w)/g, '');

  // Headings and list markers start their own block, so they never join the
  // sentence after them.
  return body
    .split('\n')
    .filter((line) => line && !/^\s*[#>]/.test(line))
    .join(' ');
}

/** Astro markup, without the frontmatter, the styles and the scripts. */
function astroProse(raw) {
  return raw
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<style>[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    // Code holds technical names, which the rules exempt.
    .replace(/<code>[\s\S]*?<\/code>/g, ' ')
    .replace(/<\/(h[1-6]|p|li|td|th)>/g, '. ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Astro trims the newline between text and an element that follows it, exactly
 * as JSX does. "See\n<a>Downloads</a>" renders as "SeeDownloads". A line that
 * ends in a word and is followed by an inline tag needs an explicit {" "}.
 */
function checkInlineSpacing(file, raw) {
  const lines = raw.split('\n');
  for (let i = 0; i < lines.length - 1; i += 1) {
    const current = lines[i];
    const next = lines[i + 1].trimStart();
    const endsInWord = /[A-Za-z0-9,.:]$/.test(current.trimEnd());
    const nextIsInline = /^<(a|em|code|strong|b|i)[\s>]/.test(next);
    if (endsInWord && nextIsInline) {
      report('GLUE', file, `line ${i + 1} needs {" "}: ...${current.trimEnd().slice(-40)}`);
    }
  }
}

for (const file of [...PAGES, ...SPACING_ONLY_PAGES]) {
  if (!existsSync(file)) continue;
  checkInlineSpacing(file, readFileSync(file, 'utf8'));
}

for (const dir of COLLECTIONS) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    checkText(join(dir, name), markdownProse(readFileSync(join(dir, name), 'utf8')));
  }
}

for (const file of PAGES) {
  if (!existsSync(file)) continue;
  checkText(file, astroProse(readFileSync(file, 'utf8')));
}

if (issues === 0) {
  console.log('STE check passed. No issues found.');
} else {
  console.log(`\n${issues} issue(s).`);
  process.exitCode = 1;
}
