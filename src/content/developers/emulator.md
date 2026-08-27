---
title: The emulator
description: Run a source on your computer, without a device, with shims for the stores and the network client.
---

The emulator runs your delegate outside of the app. Use it to test a source quickly, and to write
automatic tests.

This is the best way to test a source on your computer.

## Import it

```ts
import { emulate } from "@suwatte/toolchain/emulator";
import Target from "./src/example-en";

const source = emulate(Target);

const results = await source.getSearchResults({ query: "example" }, 1);
console.log(results.items.length);
```

## What it gives you

| Export | What it does |
| --- | --- |
| `emulate(...)` | The default entry point. It wraps a delegate class. |
| `emulateSourceEntry(...)` | Wraps one source entry. |
| `installEmulatorGlobals()` | Puts the runtime globals in scope. |
| `resetEmulatorStores()` | Empties the stores between tests. |
| `resetEmulatorRuntime()` | Puts the runtime back to its first state. |

## The shims

The emulator has built-in shims for these runtime objects:

- `ObjectStore`
- `SecureStore`
- `NetworkClient`
- `NetworkError`
- `CloudflareError`

The shims let your source run on Node.js. Your delegate does not know that the app is not there.

## Write a test

Call `resetEmulatorStores()` between tests. A store that keeps data from an earlier test can make
a test pass for the wrong reason.

```ts
import { emulate, resetEmulatorStores } from "@suwatte/toolchain/emulator";
import Target from "./src/example-en";

beforeEach(() => {
  resetEmulatorStores();
});

test("the search finds a title", async () => {
  const source = emulate(Target);
  const page = await source.getSearchResults({ query: "example" }, 1);
  expect(page.items.length).toBeGreaterThan(0);
});
```

## What the emulator does not do

The emulator does not show your source in a reader. It does not draw a home page. Test the layout
of a page on a device with [the command line](/developers/cli/).

## What to read next

- [Validation](/developers/validation/)
- [The command line](/developers/cli/)
