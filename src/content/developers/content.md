---
title: Content and chapters
description: The shape of a title, the shape of a chapter, and the rule that decides which chapter method the app calls.
---

## Identifiers

You select the identifier of a title in your source. The app joins it with your source identifier
as `sourceID||contentID`. **Your identifier must not hold `||`.**

## getContent(contentId)

This method returns one title. Only `title` and `coverImage` are necessary.

```ts
async getContent(contentId: string): Promise<Content> {
  return {
    title: "Series Name",
    coverImage: "https://example.org/cover.jpg",
    bannerImage: "https://example.org/banner.jpg",
    summary: "...",
    status: ContentStatus.ONGOING,
    contentType: ContentType.MANGA,
    readingMode: ReadingMode.VERTICAL,
    webUrl: `https://example.org/series/${contentId}`,
    additionalTitles: ["Alternate name"],
    genres: [{ id: "action", title: "Action" }],
    credits: [{ name: "Author Name", role: "Story" }],
    endpoints: { anilist: "12345", mal: "678" },
  };
}
```

The app also reads `artworks`, `statistics`, `additionalDetails`, `properties`, `collections`,
`links`, `characters` and `chapters`. The last one lets you return the chapter list here, and not
in a separate method.

### status

| Value | Meaning |
| --- | --- |
| `0` | Unknown |
| `1` | Ongoing |
| `2` | Completed |
| `3` | Cancelled |
| `4` | Hiatus |

### contentType

| Value | Meaning |
| --- | --- |
| `0` | Manga |
| `1` | Manhua |
| `2` | Manhwa |
| `3` | Comic |
| `4` | Novel |

### readingMode

| Value | Meaning |
| --- | --- |
| `0` | Paged Manga, right to left |
| `1` | Paged Comic, left to right |
| `2` | Paged Vertical |
| `3` | Vertical, one continuous strip |

The `readingMode` value is the strongest signal. It wins over the tags and over the default of the
content type. Set it when you know the correct mode. Leave it out when you do not, and let the app
decide.

### endpoints

This field maps a tracker name to the identifier of this title on that tracker. Two functions use
it:

1. The link between the title and an external tracker.
2. [Linked Titles](/docs/linked-titles/). Two entries with the same value are the same series.

The keys must match the values in the `endpoint` array of your
[configuration](/developers/capabilities/).

## The rule for novels

**A title with `contentType: ContentType.NOVEL` declares that its chapters come from
`getChapterText`.** The app does not go back to `getChapterPages` for that title.

A source with novels and image titles together writes both methods. The `contentType` of each
title selects the method.

## getChapters(contentId)

This method returns an array of chapters, with the newest first.

```ts
async getChapters(contentId: string): Promise<Chapter[]> {
  return chapters.map((chapter, position) => ({
    id: chapter.id,
    index: position,
    number: chapter.number,
    volume: chapter.volume ?? undefined,
    title: chapter.title,
    language: "en",
    date: new Date(chapter.published_at),
    webUrl: `https://example.org/chapter/${chapter.id}`,
  }));
}
```

| Field | Necessary | Notes |
| --- | --- | --- |
| `id` | Yes | The app sends it to `getChapterPages`. |
| `index` | Yes | The position in the array. `0` is the top. |
| `number` | Yes | The number of the chapter. |
| `volume` | No | Leave it out if you do not know it. |
| `isSpecial` | No | For an extra chapter or a special chapter. |
| `language` | No | |
| `title` | No | |
| `date` | No | |
| `webUrl` | No | |
| `coverImage` | No | |
| `isLocked` | No | The chapter exists but a person cannot read it. |
| `providers` | No | The credit for a translation group. |

The `index` field and the `number` field do different work. The `index` field sets the order. The
`number` field is the identity of the chapter.

The app compares the `number` field to find the chapters that a person did not read. If your
source gives a chapter a different number between two calls, the app shows unread chapters that
the person already read.

## getChapterPages(contentId, chapterId)

This method returns the array itself. Do not put the array in an object.

```ts
async getChapterPages(contentId: string, chapterId: string): Promise<ChapterPage[]> {
  return pages.map((page) => ({ url: page.url }));
}
```

Each page gives one source of image data:

| Field | Use |
| --- | --- |
| `url` | Get the image from this address. This is the normal case. |
| `b64` | Base64 image data, for a page that your code builds. |
| `raw` | Raw data. |
| `context` | Data that the app sends back to `willRequestImage` and `redrawImage`. |

## getChapterText(contentId, chapterId)

This method returns text, not images. Use it for a novel.

```ts
return {
  format: "html",
  body: "...",
  resources: [
    { href: "images/1.png", url: "https://example.org/1.png", mediaType: "image/png" },
  ],
};
```

The `format` field takes `html` or `plainText`. The app treats HTML as **not trusted** and cleans
it before it draws it. The app takes plain text as it is.

The `resources` array maps a reference in `body` to an address. The `href` value is the stable
reference in your text. The `url` value is request data only.

## Related

- [Pages](/developers/pages/)
- [Capabilities](/developers/capabilities/)
