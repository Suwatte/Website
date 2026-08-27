---
title: iCloud sync
description: What Suwatte syncs through your iCloud account and what it sends to services that you choose.
---

Suwatte syncs your library through your own iCloud account. There is no Suwatte account and no
Suwatte server.

Your data goes to your private iCloud database. It does not go to us.

## What iCloud syncs

The app keeps its database in a private CloudKit database. These items can sync between your
devices:

- Your catalogue, library, collections, flags, and Read Later items.
- Title and publication metadata.
- Reading progress, history, sessions, insights, bookmarks, notes, and reminders.
- Source lists, installed Source plugins and settings, and Server configurations.
- Feed settings and related identifiers.

Some small app preferences use Apple's iCloud key-value storage instead.

Sign in to the same Apple Account on an iPhone and an iPad. Both devices then show the same
library.

## Files and downloads

Downloaded chapters and Server publications do not sync through the app database. Download them
again on another device.

Physical files are separate from database sync. A file in Suwatte's iCloud library or another
iCloud Drive folder follows the rules for that folder. A file in a local folder does not become an
iCloud file because its catalogue entry syncs.

## Credentials

Server and metadata-provider credentials, and secure values saved by a Source, use the operating
system Keychain. They can sync separately through iCloud Keychain. They are not part of Suwatte's
CloudKit database or its JSON backups.

## Progress goes up to your servers

Suwatte sends your position back to a Komga or a Kavita server that supports progress sync.

A durable queue holds each update. If the server is not available, the update stays in the queue.
Suwatte sends it again later. The most recent position wins.

Suwatte also reads progress from the server when you open a title. This gives the server a short
opportunity to set your first position in the reader.

## Progress goes up to your sources

A source can support progress sync. If it does, Suwatte writes your position to the account that
you hold on the site that the source reads.

The source decides what it sends. A source that does not support progress sync keeps your progress
on your devices only.

## Trackers

Suwatte has no tracker of its own. A source declares the trackers that it knows, and Suwatte
matches your titles against them.

The same identifiers help Suwatte suggest [Linked Titles](/docs/linked-titles/) in your library. Two
entries that share a tracker identifier are likely to be the same series.

## Sync and Incognito Mode

[Incognito Mode](/docs/privacy-controls/) stops Suwatte from writing progress. Nothing is written,
so nothing syncs and nothing goes up to a server or a source.

## If a device does not sync

1. Make sure that both devices use the same Apple Account.
2. Make sure that iCloud is available to Suwatte in the iOS settings.
3. Make sure that the device has a network connection.
4. Open the app and leave it open for some minutes. iCloud decides when it syncs.

Sync is not immediate. iOS controls the schedule.

## Related

- [Backups](/docs/backups/)
- [Privacy controls](/docs/privacy-controls/)
- [Progress and history](/docs/progress/)
