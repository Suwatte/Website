---
title: Environments
description: A source runs in JavaScriptCore by default, or in a WebKit web view when it needs a DOM.
---

A source runs in one of two environments. JavaScriptCore is the default. WebKit is optional, and
you select it with the `"use webkit"` [directive](/developers/directives/).

## JavaScriptCore

JavaScriptCore is a JavaScript engine with no DOM, no `window` object and no page lifecycle.

Suwatte installs these objects before it evaluates your bundle:

- **`console`**, which writes to **Settings → Advanced → Logs** in the app.
- **A store**, which holds key and value pairs for your source only.
- **The network stack**. See [Networking](/developers/networking/).
- **Timers**, such as `setTimeout`.
- **A web view handle**, to open a web view for a Cloudflare challenge.
- **Crypto helpers and image helpers.**

Each source gets its own context and its own serial queue. One source cannot see or change
another source.

**Use JavaScriptCore unless you have a reason not to.** It starts more quickly, it uses less
memory, and the rest of the interface is made for it.

## WebKit

WebKit gives you a real web view. You get a DOM, a `window` object and all that a page context
holds.

Use it when you cannot get the behaviour of the site without a browser. An example is a site that
draws its pages with a large amount of client code.

WebKit has two costs:

- It uses much more memory, and it starts more slowly.
- **`useClientForImageRequests` does not work.** That option needs JavaScriptCore. The bootstrap
  throws an error if you declare it in a WebKit source.

## The differences

| | JavaScriptCore | WebKit |
| --- | --- | --- |
| DOM | No | Yes |
| `console` to the app logs | Yes | Yes |
| Store | Yes | Yes |
| Network | Yes | Yes |
| `useClientForImageRequests` | Yes | **No** |

## Find the environment

The WebKit environment sets `IS_WEBKIT_ENVIRONMENT`. JavaScriptCore does not set it. Test for it
with care:

```ts
const isWebKit =
  typeof IS_WEBKIT_ENVIRONMENT !== "undefined" && IS_WEBKIT_ENVIRONMENT;
```

## Related

- [Directives](/developers/directives/)
- [Networking](/developers/networking/)
