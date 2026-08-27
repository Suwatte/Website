---
title: The command line
description: The suwatte command builds your sources into .stt bundles and serves them on your local network for a test.
---

The `@suwatte/toolchain` package adds a `suwatte` command. It has two subcommands.

## Build

```sh
npx suwatte build
```

The build makes these files:

- One `.stt` bundle for each source, in `dist/sources`.
- One `dist/sources.json` source list.
- A source-list webpage in `dist/index.html`, with its stylesheet and script.

### Options

| Option | What it does |
| --- | --- |
| `-f, --folder <folder>` | Changes the output folder. |
| `--timings` | Prints the time that each build phase took. |

The generated webpage gives a person a link to install each source when you host the output
directory.

## Serve

```sh
npx suwatte serve
```

The `serve` subcommand builds the catalog and then hosts it on your local network.

### Options

| Option | What it does |
| --- | --- |
| `-p, --port <port>` | Sets the port. |
| `-f, --folder <folder>` | Changes the folder to serve. |
| `--timings` | Prints the time that each build phase took. |

## Test on a device

1. Run `npx suwatte serve` on your computer.
2. Note the address that the command prints.
3. Open Suwatte on a device that is on the same network.
4. Go to **Settings → Sources → Manage Sources**.
5. Add the address of your list.
6. Install your source.

Raise the `version` number in the `info` property for each build. The app compares the version
number to decide if an update exists.

## Read the logs

Your `console.log` output goes to the app. Read it in **Settings → Advanced → Logs**. This is the
main way to find a fault in a source that runs on a device.

To test without a device, use [the emulator](/developers/emulator/).

## What to read next

- [The emulator](/developers/emulator/)
- [Source lists](/developers/source-lists/)
