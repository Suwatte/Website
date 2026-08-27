---
title: Backups
description: What a backup file holds, what it does not hold, and how to restore one.
---

A backup is a file that you export and keep. Your library also syncs through
[iCloud](/docs/sync/), but a backup does a different job.

Use iCloud to keep your devices the same. Use a backup to keep a copy that you control.

## Why to make a backup

- To move to a device that uses a different Apple Account.
- To go back to an earlier state after a mistake.
- To keep a copy if you sign out of iCloud.

Open **Settings → Advanced → Backups** to make one.

## What a backup holds

| Item | Detail |
| --- | --- |
| Source lists | The list addresses that you added. |
| Sources | Installed-Source records and settings. The app downloads the plugin again. |
| Titles | The data of each title in your library. |
| Library entries | The entries and their flags. |
| Collections | Your collections and their members. |
| Progress | The chapter and the page position of each title. |
| Content links | The links between entries for one series from different sources. |
| Saved For Later | The read-later shelf. |

Each backup also records the app version and the date.

## What a backup does not hold

- **Files and downloads.** The backup does not contain publication files, downloaded chapter pages,
  or Server downloads.
- **Credentials.** Server and metadata-provider credentials and secure Source values stay in the
  operating system Keychain.
- **Source plugins and thumbnails.** The app downloads or makes them again when needed.

Credentials are not in the JSON backup, but the operating system can sync them separately through
iCloud Keychain.

## Automatic backups

Suwatte can make a backup on a schedule. The options are **Off**, **Daily**, **Weekly** and
**Monthly**.

An automatic backup is a file on your device. Copy it to a different place if you want it to
survive the loss of the device.

## Restore a backup

Select one of two modes.

**Replace** removes what is in the app now. It then installs the contents of the backup. Use it on
a new install, or when the backup must win.

**Merge** keeps what you have. It adds the items from the backup that you do not have. Use it when
you read on two devices and you want both sets.

Export a backup of the current state before you restore. A replace operation is permanent.

## After a restore

1. Install the sources again, if the app did not install them.
2. Check each connection. iCloud Keychain can make credentials available; enter any that are
   missing.
3. Download the chapters that you want to read offline.

## Related

- [iCloud sync](/docs/sync/)
- [Downloads](/docs/downloads/)
