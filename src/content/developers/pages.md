---
title: Pages
description: The paged item list that search and the feeds return, and the section styles that build a page.
---

Most lists in Suwatte return the same structure. Learn it one time, and it covers search, the item
lists and the feeds.

## PagedItemList

```ts
{
  items: [ /* Item */ ],
  isLastPage: false,
  total: 1250,          // optional
}
```

The `isLastPage` field stops the endless scroll. A wrong value makes the app ask for pages that do
not exist.

## Item

An item is the tile in each grid and each list.

| Field | Necessary | Notes |
| --- | --- | --- |
| `id` | Yes | The app sends it to `getContent`. |
| `title` | Yes | |
| `coverImage` | No | Without it, the tile is empty. |
| `subtitle` | No | |
| `bannerImage` | No | |
| `webUrl` | No | |
| `statistics` | No | Holds `rating`, `favorites`, `bookmarks` and `views`. |
| `rating` | No | The content rating. |
| `badge` | No | A small mark on the corner. |
| `trackStatus` | No | |
| `destination` | No | Sends a touch to a different place. |

## Item pages

`getItemPage(key, page)` and `getPageSectionItems(sectionKey, pageKey)` build a page of sections:

```ts
{
  sections: [
    {
      id: "trending",
      title: "Trending",
      subtitle: "Updated each hour",
      style: PageSectionStyle.GRID,
      items: [ /* Item */ ],
    },
  ],
  isLastPage: true,
}
```

A section can hold its `items`. It can also leave them out. The app then calls
`getPageSectionItems` to fill that section.

Use the second form when a section is slow. The page draws immediately, and each section fills
when its data arrives. One slow request does not hold the whole page.

## The section styles

The `style` field is a number:

| Value | Style | Shape |
| --- | --- | --- |
| `0` | `DEFAULT` | A normal row of covers. |
| `1` | `DETAILED_VERTICAL` | A cover with data below it. |
| `2` | `DETAILED_HORIZONTAL` | A cover with data next to it. |
| `3` | `GALLERY` | Large, and you swipe it. |
| `4` | `LIST` | Compact rows. |
| `5` | `GRID` | A grid of covers. |
| `6` | `TAG_GRID` | For tags, not for titles. |
| `7` | `TAG_LIST` | For tags, not for titles. |
| `8` | `BANNER` | Full width art. |
| `9` | `HIGHLIGHT` | One entry with emphasis. |
| `10` | `READABLE` | For a "continue" row. |
| `11` | `MOSAIC` | One lead story with four supporting landscape tiles. |
| `12` | `RANKED` | A horizontal rail that numbers items in source order. |
| `13` | `STORY_RAIL` | A horizontal rail of landscape cards with text overlays. |
| `14` | `EDITORIAL` | A landscape image with title and context below it. |
| `15` | `THREE_STACK` | Three compact rows in each horizontal group. |
| `16` | `WINDOWPANE` | Four equal-weight landscape tiles in a 2-by-2 group. |
| `17` | `SIDECAR` | One portrait feature paired with two compact rows. |
| `18` | `DUET` | Two portrait feature cards in each horizontal group. |
| `19` | `TAPESTRY` | Two portrait and two landscape tiles in a mixed group. |

Select the style that matches the data. A `TAG_GRID` section full of titles looks like a fault, not
a decision.

The patterned styles keep their normal geometry when the final group is incomplete. For example,
five `THREE_STACK` items produce one complete group and a second group with two rows. Items stay in
source order and the unused tail of the group remains empty.

### Artwork for the new styles

Portrait slots in `RANKED`, `THREE_STACK`, `SIDECAR`, `DUET` and `TAPESTRY` prefer `coverImage`.
Landscape slots in `MOSAIC`, `STORY_RAIL`, `EDITORIAL`, `WINDOWPANE` and `TAPESTRY` prefer
`bannerImage`. The app falls back to the other image when the preferred one is missing and crops it
with aspect fill.

For the most intentional results, provide both a 2:3 cover and a 3:2 or wider banner. Useful item
counts are multiples of each pattern: five for `MOSAIC`, three for `THREE_STACK` and `SIDECAR`, four
for `WINDOWPANE` and `TAPESTRY`, and two for `DUET`. `RANKED`, `STORY_RAIL`, and `EDITORIAL` accept
any number of items.

## Destinations

The `destination` field on an item or a section sends a touch to a different place. Use it for a
"see all" row, or for a tag that opens a browse page.

## Related

- [Search and filters](/developers/search/)
- [Home page feeds](/developers/homepage/)
