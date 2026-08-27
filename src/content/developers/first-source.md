---
title: Your first source
description: Write a delegate class that a person can search, open and read. Add one method at a time.
---

This page builds the smallest source that works. Add one method, then build and look at the
result. Each method that you add turns on one part of the app.

## 1. Make it load

Make a directory with an `index.ts` file:

```ts
import { SourceInfo, ContentRating } from "@suwatte/toolchain/types";

export default class Target {
  static info: SourceInfo = {
    id: "en.example",
    name: "Example",
    version: 1.0,
    website: "https://example.org",
    languages: ["en"],
    rating: ContentRating.EVERYONE,
  };
}
```

Run `suwatte build`. The source compiles. The app can install it, but it does nothing.

## 2. Add search

`getSearchResults` takes the request and a page number. It returns one page of items.

```ts
async getSearchResults(request: SearchRequest, page: number): Promise<PagedItemList> {
  const response = await this.client.get("/search", {
    params: { q: request.query ?? "", page },
  });
  const json = await response.json();

  return {
    items: json.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      coverImage: item.cover_url,
    })),
    isLastPage: page >= json.total_pages,
  };
}
```

An item needs an `id` and a `title`. Add `coverImage`, or the tile is empty.

The `id` comes back to you later. Make it the value that you need to get the title again.

The person can search with no text. Global search and a filter can both make a request that has no
`query` value. Your code must accept a request with no `query`.

## 3. Add the title page

```ts
async getContent(contentId: string): Promise<Content> {
  const response = await this.client.get(`/series/${contentId}`);
  const json = await response.json();

  return {
    title: json.title,
    coverImage: json.cover_url,
    summary: json.description,
    status: ContentStatus.ONGOING,
    contentType: ContentType.MANGA,
    webUrl: `https://example.org/series/${contentId}`,
    genres: json.tags.map((tag) => ({ id: tag.slug, title: tag.name })),
  };
}
```

Only `title` and `coverImage` are necessary. The other fields make the page better.

See [Content and chapters](/developers/content/) for all of the fields.

## 4. Add the chapters

Two methods make a title readable:

```ts
async getChapters(contentId: string): Promise<Chapter[]> {
  const response = await this.client.get(`/series/${contentId}/chapters`);
  const json = await response.json();

  return json.chapters.map((chapter, position) => ({
    id: String(chapter.id),
    index: position,
    number: chapter.number,
    title: chapter.title,
    language: "en",
    date: new Date(chapter.published_at),
  }));
}

async getChapterPages(contentId: string, chapterId: string): Promise<ChapterPage[]> {
  const response = await this.client.get(`/chapter/${chapterId}`);
  const json = await response.json();

  return json.pages.map((page) => ({ url: page.image_url }));
}
```

`getChapterPages` returns the array. Do not put the array in an object.

The `index` field and the `number` field are different. The `index` field is the position in your
array, and `0` is the top. The `number` field is the number of the chapter.

The app compares the `number` field to find the chapters that a person did not read. A wrong
`number` value breaks the update checks.

The source now works from end to end.

## 5. Add a home page

Write `getHomePage`, and your source shows in the Home tab:

```ts
async getHomePage(): Promise<HomePage> {
  return {
    sections: [
      {
        id: "popular",
        title: "Popular this week",
        style: PageSectionStyle.GRID,
        items: await this.fetchPopular(),
      },
    ],
    isLastPage: true,
  };
}
```

See [Home page feeds](/developers/homepage/) for the section styles.

## 6. Test it

Run the source in [the emulator](/developers/emulator/) on your computer. Then run
`suwatte serve` and install it on a device.

## What to read next

Each of these is optional:

- [Search and filters](/developers/search/) for filters and sort options.
- [Settings](/developers/settings/) for a login or a preference.
- [Networking](/developers/networking/) for headers, cookies and rate limits.
- [Progress sync](/developers/progress-sync/) to write progress back to the site.
