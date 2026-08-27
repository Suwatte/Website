---
title: Install the toolchain
description: Install @suwatte/toolchain, make a project directory, and learn what the compiler needs from your files.
---

The `@suwatte/toolchain` package holds the types, the runtime, the emulator, the compiler and the
command line tool. You install one package.

## Install

You need Node.js version 22 or a later version.

```sh
npm install --save-dev @suwatte/toolchain
```

The package adds a `suwatte` command to your project.

## The exports

| Export | What it gives you |
| --- | --- |
| `@suwatte/toolchain` | The main entry point. |
| `@suwatte/toolchain/types` | The types for the delegate, the content and the chapters. |
| `@suwatte/toolchain/runtime` | The runtime helpers. |
| `@suwatte/toolchain/emulator` | Shims to run a source outside of the app. |
| `@suwatte/toolchain/validate` | Zod schemas to check what your delegate returns. |

The package has one optional peer dependency. Install `sharp` if you need to process images at
build time.

## The project layout

Put each source in its own directory. Each directory must have an `index.ts` file:

```
my-catalog/
├── package.json
├── tsconfig.json
└── src/
    └── sources/
        ├── example-en/
        │   └── index.ts
        └── example-jp/
            └── index.ts
```

The build makes these files:

```
dist/
├── sources/
│   ├── example-en.stt
│   └── example-jp.stt
├── sources.json
├── index.html
├── main.css
└── catalog.js
```

The `.stt` files are the bundles. The `sources.json` file is the source list that a person adds in
the app.

## What the compiler needs

Each source directory must have an `index.ts` file with a default export. The default export must
be a delegate class with a static `info` property.

The `info` property must have these fields:

- `id`
- `name`
- `version`
- `website`
- `languages`
- `rating`

The `rating` field takes a numeric `ContentRating` value. Import it from
`@suwatte/toolchain/types`.

## The identifier convention

Use these patterns for the `id` field:

| Pattern | Use it for |
| --- | --- |
| `LANG.DOMAIN` | A language variant. Example: `en.example`. |
| `LANG.DOMAIN.VARIANT` | A variant that is not a language. Example: `en.example.beta`. |

Write the `LANG` part in lower case with hyphens. Keep the canonical BCP 47 letter case in the
`languages` field of the metadata.

## Variants

One class can make more than one bundle. Add optional static variant properties to the class. The
toolchain writes a separate bootstrap wrapper for each bundle that it emits.

## What to read next

- [Your first source](/developers/first-source/)
- [The command line](/developers/cli/)
