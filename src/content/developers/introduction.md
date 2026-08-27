---
title: How sources work
description: A Source plugin is implemented as a TypeScript class. The toolchain compiles it, and the app decides what it can do from the methods that you write.
---

A Source plugin tells Suwatte how to read one website. You write it as a TypeScript class. The
`@suwatte/toolchain` package compiles the class into a bundle. The app loads the bundle on the
device and calls into it.

There is no server part. All of the work happens on the device of the person who reads.

## The three parts

| Part | What it is |
| --- | --- |
| Your source | A directory with an `index.ts` file. It exports one delegate class. |
| The toolchain | The `@suwatte/toolchain` package. It compiles, serves and tests your source. |
| The app | Suwatte. It loads the compiled bundle and calls the delegate. |

## The delegate class

Your `index.ts` file must have a default export. The default export is a class with a static
`info` property:

```ts
import { SourceInfo, ContentRating } from "@suwatte/toolchain/types";

export default class Target {
  static info: SourceInfo = {
    id: "en.example",
    name: "Example",
    version: 1.0,
    website: "https://example.org",
    languages: ["en"],
    rating: ContentRating.EVERYONE,
  };

  async getSearchResults(request, page) { /* ... */ }
  async getItemList(request, page) { /* ... */ }
  async getContent(contentId) { /* ... */ }
}
```

Three methods are necessary: `getSearchResults`, `getItemList` and `getContent`. All of the other
methods are optional.

## The toolchain writes the wrapper

The app looks for a global `SourcePackage` object with a `bootstrap()` method. You do not write
this object. The toolchain makes it for each bundle that it emits.

You write the delegate class. The toolchain does the other work.

## The app finds the capabilities

Suwatte does not ask a source what it supports. After `bootstrap()` returns, the app looks at your
object and finds the methods. A method that exists turns its capability on.

If you write `getHomePage`, your source gets a home page. If you delete `getHomePage`, the home
page goes away. No list of capabilities exists to keep current.

This makes a partial repair safe. If your home page breaks and search still works, release a
version without `getHomePage`. Your users keep a source that works.

See [Capabilities](/developers/capabilities/) for the full table.

## Two runtimes

A source runs in one of two runtimes. JavaScriptCore is the default. WebKit gives you a web view,
and you select it with a directive.

Suwatte reads only the first 512 bytes of a bundle to find the directives. See
[Directives](/developers/directives/).

## What to read next

1. [Install the toolchain](/developers/setup/) to make a project.
2. [Your first source](/developers/first-source/) to write one that works.
3. [The command line](/developers/cli/) to build and serve it.
