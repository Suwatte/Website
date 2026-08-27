---
title: Source lists
description: The catalogue that the toolchain emits, where the metadata of a source comes from, and how to host it.
---

A person does not install a source file. That person adds a **source list**, then installs a
source from it.

The `suwatte build` command makes the list for you. It reads the static `info` property of each
delegate class.

## What the build emits

```
stt/
├── sources/
│   ├── en.example.stt
│   └── ja.example.stt
└── sources.json
```

The `.stt` files are the bundles. The `sources.json` file is the list.

Add `--webpage` to also get `index.html`, `main.css` and `catalog.js`. Use the page when you host
the list for other persons. It gives them a link to install each source.

## The list format

```json
{
  "name": "Example Source List",
  "sources": [
    {
      "id": "en.example",
      "name": "Example",
      "version": 1.4,
      "website": "https://example.org",
      "thumbnail": "example.png",
      "minSupportedAppVersion": "7.0.0",
      "supportedLanguages": ["en"],
      "contentRating": 0,
      "path": "en.example"
    }
  ]
}
```

## The fields

| Field | Necessary | Notes |
| --- | --- | --- |
| `id` | Yes | Stable and unique. A change makes a different source. |
| `name` | Yes | The name in the app. |
| `version` | Yes | A **number**, not a string. The app compares it to find an update. |
| `website` | Yes | The site that the source reads. |
| `thumbnail` | No | A file name below the `assets` folder. |
| `minSupportedAppVersion` | No | The app compares it as a number, so `10.0` is more than `9.9`. |
| `supportedLanguages` | No | The app also accepts the name `languages`. |
| `contentRating` | No | The app also accepts the name `rating`. |
| `path` | No | Where the bundle is, next to the list. |
| `environment` | No | `jsc` or `webkit`. |

The app accepts `supportedLanguages` and `languages`, and `contentRating` and `rating`. An older
list therefore continues to work.

## Where the assets go

The app reads a thumbnail from `<list address>/assets/<thumbnail>`. Use this layout:

```
/sources.json
/assets/example.png
/sources/en.example.stt
```

## Two gates before an install

1. **`version`** decides if an installed source is old. It is a number, so `1.10` is less than
   `1.9`. Select a scheme that this does not break.
2. **`minSupportedAppVersion`** decides if the app is new enough. The app shows a source that needs
   a newer app but does not install it.

Set `minSupportedAppVersion` when you start to use an interface that an older app does not have.
Without it, an old app installs your source and then fails while a person uses it.

## Host the list

A list is a static file. Any host that serves JSON over HTTPS works. GitHub Pages is a common
choice.

Serve the list and its bundles from the same origin, so that the `path` value and the `assets`
folder resolve correctly.

To test on your own network, use `suwatte serve`. See [The command line](/developers/cli/).

## Updates

**Settings → Sources → Source Updates → Update Sources Automatically** checks each installed source
one time each day.

To release a repair, raise the `version` value and build again. Each person gets it without any
action. This is the quickest way to correct a source for everybody.

## Related

- [Versions](/developers/versioning/)
- [The command line](/developers/cli/)
