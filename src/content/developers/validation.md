---
title: Validation
description: Check what your delegate returns against the toolchain schemas, before a fault reaches a device.
---

The `@suwatte/toolchain/validate` export gives you Zod schemas for the public toolchain types. Use
them in your tests to find a bad shape early.

Validation is for developers. It does not change how a `.stt` bundle behaves in the app.

## Check one payload

```ts
import { ContentSchema } from "@suwatte/toolchain/validate";

const content = await source.getContent("123");
ContentSchema.parse(content);
```

The `parse` method throws if the shape is wrong. The message tells you which field failed.

## Check a whole delegate

```ts
import { wrapDelegateWithValidation } from "@suwatte/toolchain/validate";

const validatedDelegate = wrapDelegateWithValidation(delegate, "MySource");
```

The wrapper checks the return value of each method that it knows. Use it in tests and while you
write a source.

## Why to use it

A source can return a shape that looks correct in JavaScript but is wrong for the app. The app
then fails to decode it, and you see a fault on a device instead of on your computer.

Common faults that validation finds:

- A number field that holds a string. The `version` and `number` fields are numbers.
- A missing `id` on an item or a chapter.
- A `getChapterPages` result that is an object, not an array.
- A numeric enumeration value that is out of range.

## Strict developer validation

Version 5.1.0 of the toolchain added strict developer validation. It finds more faults at build
time than the earlier versions did.

If a build starts to fail after you update the toolchain, read the message. The build usually
found a real fault that the earlier version did not report.

## What to read next

- [The emulator](/developers/emulator/)
- [Content and chapters](/developers/content/)
