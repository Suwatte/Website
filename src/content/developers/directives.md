---
title: Directives
description: Two pragmas at the top of a bundle select the runtime and the network stack. Suwatte reads only the first 512 bytes.
---

A directive works like `"use strict"`. It is a string at the top of the file, and it changes how
the app runs the bundle.

Suwatte knows two directives.

## "use webkit"

This directive runs the source in the WebKit environment. Without it, the source runs in
JavaScriptCore. See [Environments](/developers/environments/).

```js
"use webkit";
```

## "use httpclient"

This directive turns the version 2 network stack on. The network layer rejects an `HttpClient`
call when the directive is not there. An `HttpClient` call then fails with a clear error. It does
not go back to the older stack without a message.

```js
"use httpclient";
```

The toolchain adds this directive for you when it sees that you use `HttpClient`.

## The 512-byte rule

**Suwatte reads only the first 512 bytes of a bundle to find a directive.**

This is a security limit, not a speed improvement. If the app read the whole file, then page
content, a piece of scraped HTML, or any other string in your bundle could hold `"use webkit"`.
That string could then change how the app runs your source. The limit means that only what you put
at the top can do this.

The result is a rule for your build:

- A directive must be at the top of the file that the build emits.
- A large banner, a licence header or a source map comment above a directive can move it past 512
  bytes. The source then goes back to JavaScriptCore and the older network stack, with no message.
- Check the file that the build emits, not the file that you wrote.

Suwatte accepts a single quote and a double quote.

## The sequence

Put the directives first, before all other statements:

```js
"use webkit";
"use httpclient";

// all other code
```

## Compatibility

A bundle with no directive runs as a JavaScriptCore source on the older network stack.

A directive selects a runtime. It does not say that the installed app supports that runtime. Use
`minSupportedAppVersion` in the [source list](/developers/source-lists/) for that.

## Related

- [Environments](/developers/environments/)
- [Networking](/developers/networking/)
- [Versions](/developers/versioning/)
