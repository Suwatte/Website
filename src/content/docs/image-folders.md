---
title: Image-Folder Books
description: Read a folder of page images without creating a comic archive.
---

Suwatte can read a folder of page images as one book.
You do not need to pack the pages into a CBZ or CBR file.

## Prepare the Folder

Put the page images directly in one folder.
Keep subfolders and other book files outside it.
Supported images include JPEG, PNG, GIF, WebP, HEIC, HEIF, BMP, TIFF, and AVIF.

For example, this folder becomes one book.

```text
My Library/
  Chapter 1/
    1.jpg
    2.jpg
    10.jpg
    ComicInfo.xml
```

Pages follow filename order, with numbers sorted naturally.
In this example, `2.jpg` comes before `10.jpg`.
Use page numbers in filenames to keep the reading order clear.
An accompanying `ComicInfo.xml` file can supply book details.

## Add It to Suwatte

1. Open **Settings → Local Libraries**.
2. Select the plus button.
3. Choose the parent folder that contains your image-book folders.
4. Let Suwatte scan the library, then open the book.

The images stay in their folder.
Suwatte indexes and reads them there.

## If It Appears as a Folder

A folder with subfolders or a CBZ, CBR, ZIP, RAR, PDF, or EPUB file remains a library folder.
Move those items out of the page-image folder if you want it to become one book.
A folder with no supported images does not become a book.

An iCloud folder must be downloaded before Suwatte can recognize its page images.
Download it in Files, then scan the library again.

## Related

- [Local Library Metadata](/docs/local-metadata/)
- [Local Files](/docs/local-files/)
