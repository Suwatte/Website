---
title: Correct a fault
description: What to check when a source stops, a download stops, a server does not connect, or a page does not load.
---

## Read the logs first

**Settings → Advanced → Logs** shows what happened. It holds the errors that your sources report.

Read it before you do anything else. Include the relevant part when you report a problem.

## A source stopped working

A source breaks when the site that it reads changes. This is normal. The author of the source
corrects it, not the app.

1. **Look for a source update** in **Settings → Sources → Manage Sources**. Most faults are already
   corrected.
2. **Read the logs** to find the error.
3. **Open the site in a browser.** If the site is down or its layout changed, the source needs an
   update.

If a source needs a newer app than you have, update Suwatte first.

## A Cloudflare challenge repeats

1. Answer the challenge when the app shows it. Suwatte then uses the cookies.
2. If it repeats, go to **Settings → Advanced → Network & Caches → Clear Network Cache**. Answer
   the challenge one more time.
3. Some sites challenge more often for some networks. A different network can give a different
   result.

## A page does not load

- If only the images fail, the site can need a `Referer` value that the source does not send. It
  can also block the request. Read the logs and tell the author of the source.
- Use **Clear Network Cache**.
- Set a **User-Agent** value in **Network & Caches**. An empty value uses the default of the web
  view, which is usually correct.

## A download does not progress

- Check **Only Download on Wi-Fi** in **Settings → Sources → Downloads**. With this option on, a
  download waits for Wi-Fi.
- Check **Background Downloads**. Without it, a download progresses only while the app is open.
- **Max Concurrent Chapters** and **Max Concurrent Transfers** limit the transfers. A low value
  makes a download slow, not broken.
- iOS stops background work in low power mode.

## A server does not connect

- Check the base address, with the scheme and any path.
- If the server is on your local network, the device must be on that network.
- Check the credentials. They are not in a Suwatte backup, but iCloud Keychain can make them
  available on another device. Enter them again if needed.
- Open the server in a browser on the same device.

## iCloud does not sync

1. Make sure that each device uses the same Apple Account.
2. Make sure that iCloud Drive is on in the iOS settings.
3. Make sure that the device has a network connection.
4. Open the app and wait some minutes. iOS decides when a sync happens.

See [iCloud sync](/docs/sync/).

## A background check does not run

A background check is a request to iOS, not a guarantee. iOS decides from the battery, the network
and how you use the app. A short interval does not force a check.

Pull down in the Updates tab to check now.

## The library is wrong after a restore

- A backup holds no downloads and no server credentials. See [Backups](/docs/backups/).
- **Merge** keeps the entries of both sides. **Replace** makes the backup the only source.

## Report a problem

Include the app version from **Settings → About**, what you did, what happened, and the relevant
part of the logs. See [Help](/help/).
