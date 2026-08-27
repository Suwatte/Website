---
title: Settings
description: Build a settings page with the form views, accept what a person enters, and manage a login.
---

Write `getSettingsPage`, and your source gets a settings page in
**Settings → Sources → Manage Sources**.

## The form

A form holds sections. A section holds views.

```ts
async getSettingsPage(): Promise<UIForm> {
  return {
    sections: [
      {
        header: "Account",
        footer: "Sign in to sync your list.",
        views: [
          {
            type: "textfield",
            id: "username",
            title: "Username",
            currentValue: await this.store.get("username"),
          },
          { type: "oauth", id: "login", title: "Sign in" },
        ],
      },
      {
        header: "Content",
        views: [
          {
            type: "picker",
            id: "language",
            title: "Language",
            currentValue: (await this.store.get("language")) ?? "en",
            defaultValue: "en",
            options: [
              { id: "en", title: "English" },
              { id: "ja", title: "Japanese" },
            ],
          },
          {
            type: "toggle",
            id: "data_saver",
            title: "Data saver",
            currentValue: false,
            defaultValue: false,
          },
        ],
      },
    ],
  };
}
```

## The view types

| Type | Value | Notes |
| --- | --- | --- |
| `toggle` | boolean | |
| `textfield` | string | |
| `picker` | one option identifier | One choice from `options`. |
| `select` | `{ include, exclude }` | Many choices. Set `exclude: true` for three states. |
| `stepper` | number | Takes `lowerBound`, `upperBound`, `step` and `allowDecimal`. |
| `datepicker` | date | |
| `webview` | none | Opens a web view. |
| `oauth` | none | Starts an OAuth flow. |

Each view needs an `id` and a `title`. The `currentValue` field shows the value now. The
`defaultValue` field is the value that a reset returns to.

## Accept a change

```ts
async onFormSubmitted(id: string, data: PopulatedForm): Promise<void> {
  await this.store.set(id, data[id]);
}
```

The `id` argument names the form. The `data` argument holds the values.

Write to the store of your source. It is yours only, so no other source can read it.

## A login

Two methods complete an OAuth flow:

```ts
async handleOAuthCallback(response: string): Promise<void> {
  const token = parseToken(response);
  await this.store.set("token", token);
}

async clearAuthentication(): Promise<void> {
  await this.store.remove("token");
}
```

The app calls `clearAuthentication` when a person signs out. Remove all that comes from the
session, not the token only.

Keep a credential in the store of your source. Do not put it in the `currentValue` field of a
`textfield` view, because that view shows it on the screen.

## Act on a change

A setting often changes how you make a request. If a change makes your cached data wrong, correct
it in `onFormSubmitted`. Do not wait for the next request to fail.

## Related

- [Search and filters](/developers/search/), which uses the same views.
- [Capabilities](/developers/capabilities/)
