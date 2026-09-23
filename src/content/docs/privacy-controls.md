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
of the other functions continue. You can browse, read and download. It does not turn off Firebase Analytics.

Your history, your streaks and your goals come from your progress. Reading in Incognito Mode does
not go into any of them. Other app data can still sync through iCloud.

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

**App analytics, to Google.** Suwatte uses Google Analytics for Firebase to help us understand feature use and failures.
Events can include Source identifiers, counts, duration, content format, and action results.
Firebase also collects installation and device identifiers, technical data, and approximate location.
Our product events do not send book titles, search text, file contents, Server addresses, or credentials.

The current app has no analytics opt-out. Incognito Mode does not turn analytics off.
Apple's device setting for sharing diagnostics with developers does not control Firebase Analytics.
Suwatte does not include Firebase Crashlytics. Read the [privacy policy](/privacy/) for the full description.

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
