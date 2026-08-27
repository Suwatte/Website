---
title: Networking
description: The HttpClient interface, its interceptors, its rate limiter, and the rules for page images.
---

Suwatte has two network stacks. `HttpClient` is the current one. Turn it on with the
`"use httpclient"` [directive](/developers/directives/).

## HttpClient

```ts
export default class Target {
  client = new HttpClient({
    baseURL: "https://example.org",
    headers: { "User-Agent": "..." },
    rateLimit: { permits: 3, period: 1 },
  });

  async getContent(contentId: string) {
    const response = await this.client.get(`/series/${contentId}`);
    return this.parseContent(await response.json());
  }
}
```

### The methods

Use `get(url, config)`, `head(url, config)` and `delete(url, config)` for a request with no body.

Use `post(url, body, config)`, `put(url, body, config)` and `patch(url, body, config)` for a
request with a body. The body is the second argument.

Each method returns an `HttpResponse`.

### The response

| Member | Notes |
| --- | --- |
| `status` | The numeric status code. |
| `ok` | True for 200 to 299. |
| `headers` | The headers. Use `get(name)` to read one. |
| `await text()` | The body as a string. |
| `await json()` | The body as parsed JSON. |
| `await bytes()` and `await arrayBuffer()` | The body as data. |

**A status code that is not 2xx is not an error.** The request completes. Read `ok` yourself, and
throw if you want the request to fail.

### Interceptors

```ts
client.interceptors.request.use(async (request) => {
  request.headers.set("Authorization", `Bearer ${await this.token()}`);
  return request;
});

client.interceptors.response.use(async (response) => {
  return response;
});
```

A request interceptor **must return the `HttpRequest` that it got**. If it returns something
different, the client throws a `TypeError`. This stops an interceptor from a quiet exchange of one
request for another.

### The rate limiter

Set `rateLimit: { permits, period }`. This gives you `permits` requests for each `period` in
seconds. A request waits in a queue when there are no permits. It does not fail.

The limiter also slows down on its own when the site returns a throttle status code or a throttle
header. A site that starts to return 429 makes the client wait, and you write no code for it.

## The errors

`HttpClient` throws before it sends a request in two conditions:

- **You are in WebKit.** `HttpClient` needs JavaScriptCore. The message tells you to remove
  `"use webkit"` or to use the older `NetworkClient`.
- **The directive is missing.** The runtime rejects the call. If you are sure that the directive is
  in your file, look at the file that the build emitted. A banner can move the directive past 512
  bytes.

A network failure throws a `NetworkError`. It holds the request, and the response if one exists.

## Page images

The image loader of the app gets page images. It uses the `imageReferer` value from your
[configuration](/developers/capabilities/).

Set `useClientForImageRequests: true` when that is not enough. An example is a signed address, a
session cookie, or a header that the loader does not send. Suwatte then gets each page image with
your `client`.

The bootstrap checks three rules for this option:

1. The JavaScriptCore environment.
2. The `"use httpclient"` directive.
3. A `client` property that is an `HttpClient` instance.

Two other methods give you control without the whole transport:

- **`willRequestImage(url)`** changes a request before it goes out.
- **`redrawImage(...)`** changes an image after the app gets it. Use it for a source that sends
  pages in pieces.

## Cloudflare

Set `cloudflareResolutionURL` in your configuration. The app opens that page when a challenge
appears. Suwatte then uses the cookies for the requests of your source.

## The older stack

A source with no `"use httpclient"` directive uses `NetworkClient`. It supports
`transformRequest` and `transformResponse`.

`NetworkClient` still works, and an existing source does not need to change. Use `HttpClient` for
a new source.

## Related

- [Directives](/developers/directives/)
- [Capabilities](/developers/capabilities/)
