---
title: Progress sync
description: Report a reading position back to the site, sync the library, and use the correct shape for progress data.
---

Suwatte has no tracker of its own. A source gives it one. A source that reads a site with accounts
can keep the list on that site current.

Four capabilities do this work. Write any of them, or none.

## getContentProgress(id)

This method tells the app the position that the **site** holds. It returns
`ContentProgressData` or `null`.

```ts
async getContentProgress(id: string): Promise<ContentProgressData | null> {
  const entry = await this.fetchListEntry(id);
  if (!entry) return null;

  return {
    readChapters: entry.readChapters,
    status: TrackStatus.READING,
    lastReadDate: entry.updatedAt,
  };
}
```

### The fields

| Field | Use it when |
| --- | --- |
| `readChapters` | The read chapters are not in one continuous block. Give a `number[]` or a `Set<number>`. |
| `progress` | The person read each chapter up to one number. Give that number. |
| `status` | The list status of the title. |
| `lastReadDate` | The date of the last read. |

### The order of precedence

The app decides in this sequence:

1. If `readChapters` is there and is not empty, the app uses it. It wins.
2. If not, and `progress` is there, the app marks each chapter with a `number` value that is less
   than or equal to `progress`.

**The sync only adds.** The app does not use this data to mark a chapter as unread. A person who
read a chapter keeps that state.

Two examples:

```ts
// The history has gaps.
return { readChapters: [1, 2, 5, 8], status: TrackStatus.READING };

// The person read each chapter up to 42.
return { progress: 42, status: TrackStatus.READING };
```

## The progress events

Write any of these methods, and the app tells your source as a person reads:

| Method | When the app calls it |
| --- | --- |
| `onChaptersMarked` | A person marks chapters as read or unread. |
| `onChapterProgress` | The position in a chapter changes. |
| `onPageRead` | A person reads a page. |

`onPageRead` happens often. Collect the events and send them together. Do not make one request for
each page.

Use these methods to send the position up:

```ts
async onChaptersMarked(contentId, chapterIds, completed) {
  if (!completed) return;
  await this.client.post("/list/progress", {
    id: contentId,
    chapter: Math.max(...chapterIds.map(this.chapterNumber)),
  });
}
```

## The tracker form

`getTrackEntryPage(id)` returns a [form](/developers/settings/). A person uses it to change the
list entry: the status, the score and the progress.

```ts
async getTrackEntryPage(id: string): Promise<UIForm> {
  const entry = await this.fetchListEntry(id);
  return {
    sections: [
      {
        header: "Tracking",
        views: [
          {
            type: "picker",
            id: "status",
            title: "Status",
            currentValue: entry.status,
            options: [
              { id: "reading", title: "Reading" },
              { id: "completed", title: "Completed" },
              { id: "planning", title: "Planning" },
            ],
          },
          {
            type: "stepper",
            id: "progress",
            title: "Chapters read",
            currentValue: entry.progress,
            lowerBound: 0,
            step: 1,
          },
        ],
      },
    ],
  };
}
```

The app sends the result to `onFormSubmitted`.

## Library sync

`synchronizeLibrary(since, added, removed)` reconciles the whole library with the site.

```ts
async synchronizeLibrary(since, added, removed): Promise<LibrarySyncResponse> {
  await this.pushChanges(added, removed);
  const remote = await this.fetchListSince(since);
  return { full: remote.map(toItem) };
}
```

The app calls it on the interval in
**Settings → Sources → Source Updates → Library Sync Interval**. Use `since` to get only what
changed.

Three events tell you about the library as it changes:

- `onContentsAddedToLibrary(ids)`
- `onContentsRemovedFromLibrary(ids)`
- `onContentsReadingFlagChanged(ids, flag)`

## Declare your trackers

Declare the trackers that you know:

```ts
getConfiguration(): SourceConfiguration {
  return { endpoint: ["mal", "anilist"] };
}
```

The app matches these names against the `endpoints` map from
[`getContent`](/developers/content/). The same values find
[Linked Titles](/docs/linked-titles/) in a library. This is the most useful thing that you can do for a
person who reads from more than one source.

## Incognito Mode

With Incognito Mode on, the app does not record progress. Do not try to go around it.

## Related

- [Capabilities](/developers/capabilities/)
- [Settings](/developers/settings/)
