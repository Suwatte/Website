---
title: Updates
description: How Suwatte looks for new chapters, and how to limit the checks so that the results stay useful.
---

The **Updates** tab lists the new chapters of the titles in your library.

## When a check happens

A check runs in the background on a schedule, and when you refresh the tab yourself.

Open **Settings → Sources → Source Updates**:

- **Check for Updates in Background** turns the schedule on.
- **Time Interval** sets how often a check runs.
- **Update Local Indexes in Background** refreshes the index of your local files.

iOS decides when the app can run in the background. A short interval is a request. It is not a
guarantee.

## Limit what the app checks

A check of each title is slow, and it fills the Updates tab with rows that you do not want. Three
controls limit it.

**In Collections** checks only the titles in the collections that you select. Leave it empty to
check all of them.

**Selected Filters** checks only the titles with the publication statuses and the
[flags](/docs/flags/) that you select. One status and one flag must stay selected. Use **Select
All** to include each value.

**Skip Conditions** removes titles from a check:

- **Has Unread Chapters** skips a title that you did not read to the end.
- **Not Started Yet** skips a title that you never opened.

## Grouped updates

A source can group its updates. A release of 15 chapters then arrives as one row, not as 15 rows.
A source without this function reports each chapter separately.

## Library sync

Some sources can sync your library with an account on the site. Where a source supports it,
**Library Sync in Background** runs on the interval that you select.

## Related

- [Flags](/docs/flags/)
- [Sources](/docs/sources/)
