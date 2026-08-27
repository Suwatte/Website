import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const root = process.cwd();
const phoneRawDirectory = path.join(root, 'marketing/app-store/raw/iphone-17-pro');
const phoneOutputDirectory = path.join(root, 'marketing/app-store/iphone-6.9');
const tabletRawDirectory = path.join(root, 'marketing/app-store/raw/ipad-pro-13');
const tabletOutputDirectory = path.join(root, 'marketing/app-store/ipad-13-landscape');
const logoPath = path.join(root, 'src/assets/logo.png');

const phoneCanvas = { width: 1320, height: 2868 };
const phoneScreen = {
  width: 988,
  height: 2148,
  x: 166,
  y: 600,
  radius: 88,
};

const phoneAssets = [
  {
    output: '01-every-format-one-library.png',
    input: 'local-library.png',
    lines: ['Every format.', 'One library.'],
    colors: ['#0c0a1a', '#251b55', '#6a5acd', '#e8a33d'],
  },
  {
    output: '02-books-that-fit-your-screen.png',
    input: 'epub-reader.png',
    lines: ['Books that fit', 'your screen.'],
    colors: ['#090b1c', '#171e4f', '#6657cd', '#d29d5c'],
  },
  {
    output: '03-make-the-page-yours.png',
    input: 'epub-appearance.png',
    lines: ['Make the page', 'yours.'],
    colors: ['#100919', '#351a4a', '#8b5fc7', '#d4787f'],
  },
  {
    output: '04-pdfs-exactly-as-designed.png',
    input: 'pdf-reader.png',
    lines: ['PDFs, exactly', 'as designed.'],
    colors: ['#080e1b', '#152c4e', '#426d9e', '#b98755'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '05-cbr-and-cbz-ready-to-read.png',
    input: 'cbr-reader.png',
    lines: ['CBR and CBZ.', 'Ready to read.'],
    colors: ['#0b1117', '#1b3533', '#4b7862', '#c98662'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '06-every-page-your-way.png',
    input: 'cbz-reader.png',
    lines: ['Every page.', 'Your way.'],
    colors: ['#081516', '#133836', '#3f7567', '#d7a04d'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '07-your-reading-in-one-place.png',
    input: 'history.png',
    lines: ['Your reading.', 'In one place.'],
    colors: ['#0b0a18', '#252041', '#6a5acd', '#b47a55'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '08-see-how-you-read.png',
    input: 'insights.png',
    lines: ['See how you', 'read.'],
    colors: ['#080b17', '#202444', '#7768da', '#8f678f'],
  },
];

const tabletCanvas = { width: 2752, height: 2064 };
const tabletScreen = {
  width: 2352,
  height: 1764,
  x: 200,
  y: 230,
  radius: 54,
};

const tabletAssets = [
  {
    output: '01-books-made-for-the-big-screen.png',
    input: 'epub-reader.png',
    title: 'Books made for the big screen.',
    colors: ['#090b1c', '#171e4f', '#6657cd', '#d29d5c'],
  },
  {
    output: '02-your-library-at-a-glance.png',
    input: 'local-library.png',
    title: 'Your library, at a glance.',
    colors: ['#0c0a1a', '#251b55', '#6a5acd', '#e8a33d'],
    extract: { left: 0, top: 0, width: 2400, height: 1800 },
  },
  {
    output: '03-tune-every-detail.png',
    input: 'epub-appearance.png',
    title: 'Tune every detail.',
    colors: ['#100919', '#351a4a', '#8b5fc7', '#d4787f'],
  },
  {
    output: '04-pdfs-on-the-big-screen.png',
    input: 'pdf-reader.png',
    title: 'PDFs on the big screen.',
    colors: ['#080e1b', '#152c4e', '#426d9e', '#b98755'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '05-cbr-and-cbz-beautifully-rendered.png',
    input: 'cbr-reader.png',
    title: 'CBR and CBZ, beautifully rendered.',
    colors: ['#0b1117', '#1b3533', '#4b7862', '#c98662'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '06-every-page-your-way.png',
    input: 'cbz-reader.png',
    title: 'Every page, your way.',
    colors: ['#081516', '#133836', '#3f7567', '#d7a04d'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '07-your-reading-in-one-place.png',
    input: 'history.png',
    title: 'Your reading, in one place.',
    colors: ['#0b0a18', '#252041', '#6a5acd', '#b47a55'],
    credit: 'Pepper & Carrot by David Revoy · CC BY 4.0 · Cropped',
  },
  {
    output: '08-see-how-you-read.png',
    input: 'insights.png',
    title: 'See how you read.',
    colors: ['#080b17', '#202444', '#7768da', '#8f678f'],
  },
];

await Promise.all([
  fs.rm(phoneOutputDirectory, { recursive: true, force: true }),
  fs.rm(tabletOutputDirectory, { recursive: true, force: true }),
]);

await Promise.all([
  fs.mkdir(phoneOutputDirectory, { recursive: true }),
  fs.mkdir(tabletOutputDirectory, { recursive: true }),
]);

const logo = await sharp(logoPath)
  .resize(82, 82)
  .png()
  .toBuffer();

for (const asset of phoneAssets) {
  const [background, backgroundLift, iris, amber] = asset.colors;
  const headline = asset.lines
    .map((line, index) => `
      <text
        x="96"
        y="${350 + index * 112}"
        fill="#ffffff"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="104"
        font-weight="700"
        letter-spacing="-4"
      >${escapeXML(line)}</text>`)
    .join('');
  const credit = asset.credit
    ? `<text
        x="660"
        y="2822"
        fill="#ffffff"
        fill-opacity="0.68"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="24"
        font-weight="500"
        text-anchor="middle"
      >${escapeXML(asset.credit)}</text>`
    : '';

  const backdrop = Buffer.from(`
    <svg width="${phoneCanvas.width}" height="${phoneCanvas.height}" viewBox="0 0 ${phoneCanvas.width} ${phoneCanvas.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${background}" />
          <stop offset="1" stop-color="${backgroundLift}" />
        </linearGradient>
        <radialGradient id="iris" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${iris}" stop-opacity="0.58" />
          <stop offset="1" stop-color="${iris}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="amber" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${amber}" stop-opacity="0.34" />
          <stop offset="1" stop-color="${amber}" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
      </defs>
      <rect width="1320" height="2868" fill="url(#background)" />
      <ellipse cx="1080" cy="250" rx="510" ry="430" fill="url(#iris)" />
      <ellipse cx="110" cy="1670" rx="440" ry="640" fill="url(#amber)" />
      <rect
        x="${phoneScreen.x}"
        y="${phoneScreen.y + 24}"
        width="${phoneScreen.width}"
        height="${phoneScreen.height}"
        rx="${phoneScreen.radius}"
        fill="#000000"
        fill-opacity="0.56"
        filter="url(#shadow)"
      />
      <text
        x="198"
        y="142"
        fill="#ffffff"
        fill-opacity="0.82"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="48"
        font-weight="600"
        letter-spacing="-1"
      >Suwatte</text>
      ${headline}
      ${credit}
    </svg>
  `);

  const mask = Buffer.from(`
    <svg width="${phoneScreen.width}" height="${phoneScreen.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${phoneScreen.radius}" fill="#ffffff" />
    </svg>
  `);

  const screenshot = await sharp(path.join(phoneRawDirectory, asset.input))
    .resize(phoneScreen.width, phoneScreen.height, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const border = Buffer.from(`
    <svg width="${phoneCanvas.width}" height="${phoneCanvas.height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="${phoneScreen.x + 1.5}"
        y="${phoneScreen.y + 1.5}"
        width="${phoneScreen.width - 3}"
        height="${phoneScreen.height - 3}"
        rx="${phoneScreen.radius - 1.5}"
        fill="none"
        stroke="#ffffff"
        stroke-opacity="0.2"
        stroke-width="3"
      />
    </svg>
  `);

  await sharp(backdrop)
    .composite([
      { input: logo, left: 96, top: 82 },
      { input: screenshot, left: phoneScreen.x, top: phoneScreen.y },
      { input: border, left: 0, top: 0 },
    ])
    .flatten({ background })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(path.join(phoneOutputDirectory, asset.output));
}

const tabletLogo = await sharp(logoPath)
  .resize(72, 72)
  .png()
  .toBuffer();

for (const asset of tabletAssets) {
  const [background, backgroundLift, iris, amber] = asset.colors;
  const credit = asset.credit
    ? `<text
        x="1376"
        y="2040"
        fill="#ffffff"
        fill-opacity="0.68"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="22"
        font-weight="500"
        text-anchor="middle"
      >${escapeXML(asset.credit)}</text>`
    : '';

  const backdrop = Buffer.from(`
    <svg width="${tabletCanvas.width}" height="${tabletCanvas.height}" viewBox="0 0 ${tabletCanvas.width} ${tabletCanvas.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${background}" />
          <stop offset="1" stop-color="${backgroundLift}" />
        </linearGradient>
        <radialGradient id="iris" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${iris}" stop-opacity="0.58" />
          <stop offset="1" stop-color="${iris}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="amber" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="${amber}" stop-opacity="0.3" />
          <stop offset="1" stop-color="${amber}" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <rect width="${tabletCanvas.width}" height="${tabletCanvas.height}" fill="url(#background)" />
      <ellipse cx="2350" cy="120" rx="620" ry="390" fill="url(#iris)" />
      <ellipse cx="180" cy="1510" rx="520" ry="620" fill="url(#amber)" />
      <rect
        x="${tabletScreen.x}"
        y="${tabletScreen.y + 18}"
        width="${tabletScreen.width}"
        height="${tabletScreen.height}"
        rx="${tabletScreen.radius}"
        fill="#000000"
        fill-opacity="0.56"
        filter="url(#shadow)"
      />
      <text
        x="162"
        y="143"
        fill="#ffffff"
        fill-opacity="0.82"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="42"
        font-weight="600"
        letter-spacing="-1"
      >Suwatte</text>
      <text
        x="1376"
        y="154"
        fill="#ffffff"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="78"
        font-weight="700"
        letter-spacing="-3"
        text-anchor="middle"
      >${escapeXML(asset.title)}</text>
      ${credit}
    </svg>
  `);

  const mask = Buffer.from(`
    <svg width="${tabletScreen.width}" height="${tabletScreen.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${tabletScreen.radius}" fill="#ffffff" />
    </svg>
  `);

  const source = sharp(path.join(tabletRawDirectory, asset.input));
  if (asset.extract) {
    source.extract(asset.extract);
  }

  const screenshot = await source
    .resize(tabletScreen.width, tabletScreen.height, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const border = Buffer.from(`
    <svg width="${tabletCanvas.width}" height="${tabletCanvas.height}" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="${tabletScreen.x + 1.5}"
        y="${tabletScreen.y + 1.5}"
        width="${tabletScreen.width - 3}"
        height="${tabletScreen.height - 3}"
        rx="${tabletScreen.radius - 1.5}"
        fill="none"
        stroke="#ffffff"
        stroke-opacity="0.2"
        stroke-width="3"
      />
    </svg>
  `);

  await sharp(backdrop)
    .composite([
      { input: tabletLogo, left: 72, top: 77 },
      { input: screenshot, left: tabletScreen.x, top: tabletScreen.y },
      { input: border, left: 0, top: 0 },
    ])
    .flatten({ background })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(path.join(tabletOutputDirectory, asset.output));
}

console.log(
  `Rendered ${phoneAssets.length} iPhone and ${tabletAssets.length} iPad App Store assets`,
);

function escapeXML(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
