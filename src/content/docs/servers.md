---
title: Servers
description: Connect Suwatte to a Komga, a Kavita or an OPDS server that you operate.
---

If you operate a media server for your collection, Suwatte can read from it. It supports three
kinds.

| Server | Notes |
| --- | --- |
| **Komga** | A server for comics and manga. |
| **Kavita** | A server for comics, manga and books. |
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

## Progress goes up to your server

Suwatte sends your position to a Komga or a Kavita server that supports progress sync.

A durable queue holds each update. If the server is not available, Suwatte sends the update again
later. The most recent position wins.

Suwatte also reads your position from the server when you open a title.

## Server downloads

A downloaded book from a server stays on that device. It is not in a backup.

To see the space that each server uses, go to
**Settings → Sources → Downloads → Server Download Storage**. Swipe a server to remove its
downloads. This does not change your progress.

## Related

- [Downloads](/docs/downloads/)
- [iCloud sync](/docs/sync/)
