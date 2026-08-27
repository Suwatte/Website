---
title: Reading Modes
description: The four ways that Suwatte arranges a chapter, how it selects one, and how to change it.
---

A reading mode sets the arrangement of the pages of a chapter. It also sets the direction that you
move through them. There are four modes.

## The modes

### Paged Manga

Separate pages, read from **right to left**. Page 1 is on the right. You move to the left. Manga
is printed in this direction, and this mode is the default for a manga title.

### Paged Comic

Separate pages, read from **left to right**. This is the western direction, and the default for a
comic.

### Paged Vertical

Separate pages. You move **down** to go to the next page. Each page is still a separate page.

### Vertical

One continuous strip with no page breaks. You scroll down. A webtoon and most manhwa are drawn for
this mode, because the art often continues across a page break.

<figure class="guide-media">
  <div class="guide-media__grid guide-media__grid--four">
    <div class="guide-media__item">
      <img src="/guides/reader/reading-mode-paged-manga.jpg" alt="A manga page in the Paged Manga reader" loading="lazy" />
      <span>Paged Manga</span>
    </div>
    <div class="guide-media__item">
      <img src="/guides/reader/reading-mode-paged-comic.jpg" alt="A comic page in the Paged Comic reader" loading="lazy" />
      <span>Paged Comic</span>
    </div>
    <div class="guide-media__item">
      <img src="/guides/reader/reading-mode-paged-vertical.jpg" alt="A comic page in the Paged Vertical reader" loading="lazy" />
      <span>Paged Vertical</span>
    </div>
    <div class="guide-media__item">
      <img src="/guides/reader/reading-mode-vertical.jpg" alt="A comic displayed as one continuous strip in the Vertical reader" loading="lazy" />
      <span>Vertical</span>
    </div>
  </div>
  <figcaption>
    Based on <a href="https://www.peppercarrot.com">Pepper &amp; Carrot</a> by David Revoy,
    licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
    Screenshots are cropped; David Revoy does not endorse Suwatte.
  </figcaption>
</figure>

## How Suwatte selects a mode

When you open a title the first time, Suwatte decides in this sequence:

1. **The source.** A source can declare a reading mode for a title. This value wins.
2. **The tags.** If the source declared no mode, Suwatte reads the genre tags and the property
   tags. A tag such as *webtoon*, *long strip*, *manhwa* or *manhua* selects **Vertical**.
3. **The content type.** Manga selects Paged Manga. Manhwa and manhua select Vertical. Comic
   selects Paged Comic.

## Change the mode

Change the mode in the settings menu of the reader. Suwatte keeps your value for that title.

<figure class="guide-media">
  <div class="guide-media__frame">
    <img src="/guides/reader/reading-mode-picker.jpg" alt="The Reading Mode menu with all four modes" loading="lazy" />
  </div>
  <figcaption>Choose a mode, then keep reading from the same page.</figcaption>
</figure>

To use one mode for all titles, set a default in **Settings → Reading → Reader Settings**. Then
turn **Prefer Default Reading Mode** on.

## Novels and PDFs

An EPUB file and a PDF file do not use these modes. They have their own reader with its own
controls. See [Novels and PDFs](/docs/publications/).

## Related

- [Reader settings](/docs/reader-settings/)
