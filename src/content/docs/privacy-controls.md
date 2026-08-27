---
title: Privacy controls
description: Safe Mode, Incognito Mode, where Suwatte keeps your credentials, and what leaves your device.
---

## Safe Mode

**Settings → Content Settings → Safe Mode** is on when you install the app. It does two things:

- It hides the library entries with a **Mature** rating.
- It marks a cover that Suwatte cannot classify as **Potentially Sensitive**.

The rating comes from the source. The accuracy of Safe Mode depends on the care of each source
author. Use it as a filter, not as a guarantee.

## Incognito Mode

**Settings → Content Settings → Incognito Mode** stops Suwatte from writing reading progress. All
of the other functions continue. You can browse, read and download.

Your history, your streaks and your goals come from your progress. Reading in Incognito Mode does
not go into any of them, and nothing syncs.

## Where your credentials are

Suwatte keeps Server and metadata-provider credentials in the operating system **Keychain**. A
Source can also put values in secure Keychain storage. These values are not in the app settings or
in a [Suwatte backup](/docs/backups/) file.

Keychain items can sync through iCloud Keychain to devices that use the same Apple Account. If a
credential is not available on a device, enter it again there.

## What leaves your device

Suwatte has no account and no server of its own. A request for content goes from your device to
the source or the server that you configured.

Data can leave the device in these cases.

**Your library, through iCloud.** The app database syncs to your private iCloud database. It goes
to Apple, not to us. See [iCloud sync](/docs/sync/).

**Your progress, to your servers and sources.** Suwatte sends your position to a Komga or a Kavita
server that supports progress sync. A source that supports progress sync gets it too.

**Your credentials, through iCloud Keychain.** The operating system can sync credentials and secure
Source values between your devices.

**Metadata searches, to providers that you connect.** If you connect Comic Vine or Metron, Suwatte
can send title, year, publisher, series, or issue details to find a match.

Suwatte has no developer-operated analytics or crash-reporting SDK. Apple can provide opt-in App
Store diagnostics under your device's analytics setting. Read the [privacy policy](/privacy/) for
the full description.

Also remember that a Source is a plugin with network access that runs on your device. A Source
can make a request that you did not start. Install a source only from a list that you trust.

## Network controls

Open **Settings → Advanced → Network & Caches**:

- **User-Agent** changes the identifier that goes with a source request. Leave it empty to use the
  default of the web view.
- **Clear Network Cache** removes the cookies, the website data and the cached responses of your
  sources. Use it to clear a Cloudflare challenge that repeats.
- **Clear Thumbnail Cache** removes the cached covers. The app reports the source thumbnails and
  the local thumbnails separately.

## Related

- [iCloud sync](/docs/sync/)
- [Privacy policy](/privacy/)
- [Progress and history](/docs/progress/)
