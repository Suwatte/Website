---
title: Servers
description: Connect Suwatte to a Komga, a Kavita, a Suwayomi or an OPDS server that you operate.
---

If you operate a media server for your collection, Suwatte can read from it. It supports four
kinds.

| Server | Notes |
| --- | --- |
| **Komga** | A server for comics and manga. |
| **Kavita** | A server for comics, manga and books. |
| **Suwayomi** | A manga server that runs sources for you. |
| **OPDS** | An open catalogue standard. Many servers support it. |

## Add a server

1. Go to **Settings → Servers → Manage Servers**.
2. Add a server and select its kind.
3. Enter the base address and your credentials.

Suwatte keeps the credentials in the operating system **Keychain**. They are not in the app
settings or in a Suwatte JSON backup. They can sync separately through iCloud Keychain. Enter them
again if they are not available on another device.

## A server on your network

A server in your home works in the same way as one on the internet. Enter its local address.

The device must be on the same network to reach it. Download what you want to read in a different
place first.

## What you get

A connected server behaves like any other route to content:

- Browse its libraries and its collections.
- Search it.
- Save a title to your library, in your collections, with your flags.
- Download chapters to read offline.

Each server supports a different set of functions. Suwatte uses what each one reports. An OPDS
catalogue with no search does not show a search field.

## Suwayomi sources

A Suwayomi server is also a source host. Each extension that you install on the server can become a
source in Suwatte.

1. Open the server and select **Sources**.
2. Select the sources that you want. A check mark shows each source that you added.

The sources show in the Sources tab, in a section for the server. You can also open this list from
the menu of the Sources tab. Select **Manage Sources** for the server.

These sources work like all of your other sources. You can pin them, search them, save their titles
to your library, and download their chapters. The server gets each title from its website for
Suwatte.

To remove a source, select it again in the list. Your library titles stay.

Install and update the extensions on the server, in its web interface.

### Sync the library

Suwayomi keeps a library of its own. To keep it the same as your Suwatte library, open
**Settings → Servers → Manage Servers**, select the server, and turn on **Sync Library**.

- Suwatte adds the sources for the titles in the server library.
- When you add or remove a title on one side, Suwatte does the same on the other side.
- To look for new chapters, Suwatte asks the server. It does not check each website.

### Add the server again

If you add a Suwayomi server again, for example after you restore a backup, Suwatte can connect
the sources from the old connection. Keep **Reconnect Sources** on when you add the server. Your
titles in those sources then work again.

## Progress goes up to your server

Suwatte sends your position to a Komga, a Kavita or a Suwayomi server that supports progress sync.

A durable queue holds each update. If the server is not available, Suwatte sends the update again
later. The most recent position wins.

Suwatte also reads your position from the server when you open a title.

## Server downloads

A downloaded book from a server stays on that device. It is not in a backup. A chapter from a
Suwayomi source is a source download, the same as for your other sources.

To see the space that each server uses, go to
**Settings → Sources → Downloads → Server Download Storage**. Swipe a server to remove its
downloads. This does not change your progress.

## Related

- [Downloads](/docs/downloads/)
- [iCloud sync](/docs/sync/)
