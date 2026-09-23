---
title: Questions and answers
description: Common questions about content, cost, sync, and what happens to your data.
---

## Does Suwatte come with content?

No. A new install has an empty library and nothing to browse. Add [sources](/docs/sources/),
connect a [server](/docs/servers/), or import [local files](/docs/local-files/).

## Where do I get sources?

From a source list address that you supply. Suwatte does not operate a directory of sources and
does not approve any list.

A Source plugin runs on your device and can use the network. Install one only from a list that you
trust.

## Does Suwatte host content?

No. No server of ours takes part. A request goes from your device to the site or the server that
you configured.

## Do I need an account?

There is no Suwatte account. A server has its own account, and some sources do too. Those
credentials stay in the operating system Keychain and can sync through iCloud Keychain.

You do need an Apple Account for the iCloud sync.

## Which devices does it run on?

An iPhone or an iPad with iOS 17 or a later version.

## Does my progress sync between devices?

Yes. Your library, your collections, your flags and your progress sync through your own iCloud
account. See [iCloud sync](/docs/sync/).

Downloads do not sync through the app database. Credentials can sync separately through iCloud
Keychain.

## Does Suwatte write my progress back to my server?

Yes, if the server supports it. Suwatte sends your position to Komga and Kavita. A durable queue
holds each update until the server accepts it.

A source can also get your progress, if the source supports progress sync.

## Are downloads in a backup?

No. A download stays on one device, and a backup with downloads is too large. Restore the backup,
then download the chapters that you want.

## Does Suwatte collect data about me?

Yes. Suwatte uses Google Analytics for Firebase to understand feature use and failures.
It collects usage events, installation and device identifiers, technical data, and approximate location.
Our product events do not include book titles, search text, file contents, Server addresses, or credentials.
Incognito Mode does not turn analytics off, and the current app has no analytics opt-out.

Apple can also provide opt-in App Store diagnostics. Apple services and the services that you connect receive data needed for their features.
The [privacy policy](/privacy/) gives the full description.

## Why did a source stop working?

Because the site that it reads changed. The author of the source maintains it, not Suwatte. Look
for a source update first. See [Correct a fault](/docs/troubleshooting/).

## Can I read webtoons?

Yes. Use the **Vertical** reading mode, which shows one continuous strip with no page breaks.
Suwatte usually selects it for manhwa and manhua on its own. See
[Reading modes](/docs/reading-modes/).

## Can I read novels?

Yes. An EPUB file and a PDF file open in a separate reader. See
[Novels and PDFs](/docs/publications/).

## Can I write my own source?

Yes. A Source plugin is implemented as a TypeScript class that the `@suwatte/toolchain` package
compiles. See the
[developer guides](/developers/introduction/).

## How do I hide mature content?

Use **Safe Mode** in **Settings → Content Settings**. It is on when you install the app. See
[Privacy controls](/docs/privacy-controls/).
