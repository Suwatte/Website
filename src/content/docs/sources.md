---
title: Sources
description: Manage the sources that you installed, search all of them, and control their settings.
---

A source lets Suwatte read one website. Manage all of them in
**Settings → Sources → Manage Sources**.

## Source lists

You do not install a source file. You add a **source list**, which is an address that publishes a
set of sources together. Add the list one time, and you can install each source in it.

Each source in a list declares:

- Its name and its version.
- The website that it reads.
- The languages that it supports.
- Its content rating.
- The minimum app version. Update Suwatte if the source needs a newer app.

Suwatte does not operate a directory of sources. You decide which list to trust. A source has the
same network access as the app.

## Global search

A search asks all of your sources at the same time. The results group by source, so you can see
which source holds a series.

A source can give the app filters and sort options. The search screen shows them. A source without
them does not show them.

## The settings of one source

A source can have its own settings page. It can hold a login, a language, or an image quality
value. Find it below the source in **Manage Sources**.

## Home pages and feeds

A source can give the app:

- A **home page**, which shows in the Home tab.
- **Custom feeds**, which are more lists than the home page holds.

Both are optional. A source with no home page does not show in the Home tab.

## Keep your sources current

**Settings → Sources → Source Updates → Update Sources Automatically** checks your sources one
time each day.

A source breaks when the site that it reads changes. Keep this option on.

## Cloudflare

If a site uses a Cloudflare challenge, Suwatte opens a web view. Answer the challenge there.
Suwatte then uses the cookies for the requests of that source.

If the challenge repeats, go to
**Settings → Advanced → Network & Caches → Clear Network Cache**. Then answer the challenge again.

## Content ratings and Safe Mode

A source declares a content rating, and each title has one too.

**Safe Mode** in **Settings → Content Settings** hides the library entries with a Mature rating. It
also marks a cover that Suwatte cannot classify. Safe Mode is on when you install the app.

## Related

- [Add your first source](/docs/first-source/)
- [Updates](/docs/updates/)
- [Privacy controls](/docs/privacy-controls/)
- [Write a source](/developers/introduction/)
