---
title: Capabilities
description: The full table of capabilities, the method that turns each one on, and the configuration that you can set yourself.
---

Suwatte does not ask a source what it supports. After the bootstrap returns your delegate, the app
looks at the object and finds the methods. A method that exists turns its capability on.

Write a method to turn a capability on. Delete the method to turn the capability and its part of
the interface off.

## The capability table

| Capability | The method that turns it on | Result |
| --- | --- | --- |
| `homepageProviding` | `getHomePage` | The source shows in the Home tab. |
| `settingsProviding` | `getSettingsPage` | The source gets a settings page. |
| `customFeedsProviding` | `getCustomFeeds` | More lists than the home page holds. |
| `progressSyncProviding` | `getTrackEntryPage` | A tracker form for a title. |
| `contentProgressProviding` | `getContentProgress` | The source reports its own progress. |
| `librarySyncProviding` | `synchronizeLibrary` | The library syncs with the site. |
| `progressEventsProviding` | `onChaptersMarked`, `onPageRead` or `onChapterProgress` | The app tells the source as a person reads. |
| `chaptersProviding` | `getChapters`, or `getChapter` with `getChapterData` | A title gets a chapter list. |
| `sortOptionsProviding` | `getSortOptions` | A sort control in the search screen. |
| `searchFiltersProviding` | `getSearchFilters` | Filter controls in the search screen. |
| `groupedUpdatesProviding` | `getGroupedUpdates` | Grouped update results. |
| `willRequestImageProviding` | `willRequestImage` | The source changes a page image request. |
| `redrawImageProviding` | `redrawImage` | The source changes a page image after the app gets it. |

Three of these are runtime values only: `sortOptionsProviding`, `searchFiltersProviding` and
`groupedUpdatesProviding`. The app finds them each time that it loads the source. A change takes
effect on the next load, with no reinstall.

`useClientForImageRequests` is different. No method implies it, so you must set it yourself.

## The methods that the app calls

| Method | Arguments |
| --- | --- |
| `getContent` | `(contentId)` |
| `getChapters` | `(contentId)` |
| `getChapterPages` | `(contentId, chapterId)` |
| `getChapterText` | `(contentId, chapterId)` |
| `getSearchResults` | `(request, page)` |
| `getItemList` | `(request, page)` |
| `getItemPage` | `(key, page)` |
| `getPageSectionItems` | `(sectionKey, pageKey)` |
| `getHomePage` | `()` |
| `getCustomFeeds` | `()` |
| `getSortOptions` | `()` |
| `getSearchFilters` | `()` |
| `getSettingsPage` | `()` |
| `getTrackEntryPage` | `(id)` |
| `getContentProgress` | `(id)` |
| `getGroupedUpdates` | `(ids, since)` |
| `synchronizeLibrary` | `(since, added, removed)` |
| `onFormSubmitted` | `(id, data)` |
| `handleOAuthCallback` | `(response)` |
| `clearAuthentication` | `()` |
| `onContentsAddedToLibrary` | `(ids)` |
| `onContentsRemovedFromLibrary` | `(ids)` |
| `onContentsReadingFlagChanged` | `(ids, flag)` |
| `willRequestImage` | `(url)` |

`getSearchResults`, `getItemList` and `getContent` are necessary. All of the others are optional.

`getChapterPages` gets the pages. The name `getChapterData` is only part of the capability check,
with the older `getChapter` method.

## Set the configuration yourself

The app merges the result of `getConfiguration()` over the values that it found. Your value wins.

```ts
getConfiguration(): SourceConfiguration {
  return {
    endpoint: ["mal", "anilist"],
    imageReferer: "https://example.org/",
    cloudflareResolutionURL: "https://example.org/",
    useClientForImageRequests: false,
  };
}
```

| Field | Type | What it does |
| --- | --- | --- |
| `endpoint` | `string[]` | The trackers that this source knows. It also drives duplicate detection. |
| `imageReferer` | `string` | The `Referer` header for a page image request. |
| `cloudflareResolutionURL` | `string` | The page to open for a challenge. |
| `useClientForImageRequests` | `boolean` | Gets page images with your own `HttpClient`. |

You can also turn a capability off here. Return `homepageProviding: false`, and the home page goes
away while `getHomePage` stays in your code.

## The rules for useClientForImageRequests

The bootstrap checks these three rules and **throws** if one fails:

1. The source must run in **JavaScriptCore**. WebKit is rejected.
2. The `"use httpclient"` [directive](/developers/directives/) must be there.
3. `client` on your delegate must be an `HttpClient` instance.

If a rule fails, the source does not load. The app reports an `ImageClient` error.

## Related

- [Networking](/developers/networking/)
- [Progress sync](/developers/progress-sync/)
