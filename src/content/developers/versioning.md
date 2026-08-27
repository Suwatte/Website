---
title: Versions
description: How the toolchain version, the app version and the source version work together.
---

Three version numbers do different work.

## The three numbers

**The toolchain version.** The version of `@suwatte/toolchain`. It sets which types and which
interfaces you can use. The current version is 5.1.0.

**`minSupportedAppVersion`.** You declare it for each source. The app does not install a source
that needs a newer app than the person has. This is your compatibility gate.

**`version`.** The version of your source, as a number. A higher number means that an update
exists.

## A source version is a number

The app decodes `version` as a number, not as a string. **`1.10` is less than `1.9`.**

Select a scheme that survives this:

- Count in whole numbers: `1`, `2`, `3`.
- Or use two digits for the second part: `1.01`, `1.02`, up to `1.10`.

Do not change your scheme later. A version that is lower than the installed version never becomes
an update.

## When to raise minSupportedAppVersion

Raise it the first time that you use something that an older app does not have:

- The `"use httpclient"` network stack.
- `useClientForImageRequests`.
- Any capability that came after the app version that you declare now.

The app compares the value as a number, so `10.0` is more than `9.9`.

A value that is too low is worse than a value that is too high. Too low, and an old app installs
your source and then fails with an error that the person cannot correct.

## A bundle with no directive

A bundle with no directive runs on JavaScriptCore with the older network stack. That path is
current, and an existing source does not need to change.

If you add `"use httpclient"`, raise `minSupportedAppVersion` in the same release.

## Remove a capability

The app finds a [capability](/developers/capabilities/) from the method. Delete the method, and
the app removes that part of the interface. It does not show an error.

This makes a partial repair safe. If your home page breaks and search still works, release a
version with no `getHomePage`. Each person keeps a source that works. Add the method again when
the site permits it.

You can get the same result without a change to your code. Return `homepageProviding: false` from
`getConfiguration()`.

## Do not change your identifier

The `id` value identifies an installed source. The app also uses it as the key of each library
entry, as `sourceID||contentID`.

A change to the `id` value separates each saved title from your source. To rename a source, change
`name`. Do not change `id`.

## Related

- [Source lists](/developers/source-lists/)
- [Directives](/developers/directives/)
