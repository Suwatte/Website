---
title: Home page feeds
description: Give your source a place in the Home tab, and add more lists than the home page holds.
---

## getHomePage()

Write this method, and your source shows in the **Home** tab. It returns the page structure from
[Pages](/developers/pages/).

```ts
async getHomePage(): Promise<HomePage> {
  return {
    sections: [
      {
        id: "featured",
        title: "Featured",
        style: PageSectionStyle.BANNER,
        items: await this.featured(),
      },
      {
        id: "trending",
        title: "Trending this week",
        style: PageSectionStyle.GRID,
      },
      {
        id: "recent",
        title: "Latest updates",
        style: PageSectionStyle.LIST,
      },
    ],
    isLastPage: true,
  };
}
```

## Sections that fill later

A section with no `items` gets a second call to `getPageSectionItems`:

```ts
async getPageSectionItems(sectionKey: string, pageKey: string): Promise<Item[]> {
  switch (sectionKey) {
    case "trending":
      return (await this.fetchTrending()).map(toItem);
    case "recent":
      return (await this.fetchRecent()).map(toItem);
    default:
      return [];
  }
}
```

Use this form when a home page needs more than one request. The page draws as soon as the app
knows the sections. Each section then fills on its own. One slow request does not hold the tab.

## Make a good home page

A home page is the first thing that a person sees from your source. It must answer two questions:
what is new, and what is good.

- Use 3 to 6 sections.
- Page section styles work the same way here as they do on other source pages. Put a visual style
  first, such as `MOSAIC`, `STORY_RAIL`, or `EDITORIAL`, then use a more compact style such as
  `THREE_STACK` or `RANKED`.
- Give "latest updates" the `LIST` style or the `READABLE` style. A person looks for one title
  there. That person does not browse it.
- Put a `destination` on a section that holds more items, so that "see all" works.

`MOSAIC` is intentionally a five-item preview on the app Home screen so that one section cannot
dominate the page. A source page can repeat more five-item Mosaic groups. The other horizontal
styles use the normal Home preview limit.

## Custom feeds

`getCustomFeeds` gives the app more lists than the home page holds:

```ts
async getCustomFeeds(): Promise<SourceFeed[]> {
  return [
    { id: "staff-picks", title: "Staff picks" },
    { id: "completed-short", title: "Complete in less than 50 chapters" },
  ];
}
```

Use a feed for a list that is good to have but does not need space on the home page.

## Related

- [Pages](/developers/pages/)
- [Search and filters](/developers/search/)
