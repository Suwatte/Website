---
title: Search and filters
description: Write search, give the app sort options, and build the filter controls that show in the search screen.
---

## getSearchResults(request, page)

```ts
async getSearchResults(request: SearchRequest, page: number): Promise<PagedItemList> {
  const response = await this.client.get("/search", {
    params: {
      q: request.query ?? "",
      page,
      sort: request.sort?.key,
      order: request.sort?.ascending ? "asc" : "desc",
      ...this.mapFilters(request.filters),
    },
  });

  const json = await response.json();

  return {
    items: json.results.map(toItem),
    isLastPage: page >= json.total_pages,
  };
}
```

The `page` value starts at 1. The app sends it separately from the request.

The request holds:

| Field | Type | When it is there |
| --- | --- | --- |
| `query` | `string?` | A person typed text. |
| `sort` | `{ key, ascending? }?` | You wrote `getSortOptions`. |
| `filters` | `object?` | You wrote `getSearchFilters`. |

**Your code must accept a request with no `query` value.** Global search and a browse with filters
only can both make one.

## Sort options

Write `getSortOptions`, and the search screen gets a sort control.

```ts
async getSortOptions(): Promise<SortOptions> {
  return {
    options: [
      { id: "relevance", title: "Relevance" },
      { id: "updated", title: "Recently updated" },
      { id: "rating", title: "Rating" },
    ],
    canChangeOrder: true,
    default: { key: "relevance", ascending: false },
  };
}
```

The value that a person selects comes back as `request.sort.key`.

## Search filters

Write `getSearchFilters`, and the search screen gets filter controls. A filter uses the same view
system as a [settings page](/developers/settings/).

```ts
async getSearchFilters(): Promise<SearchFilter[]> {
  return [
    {
      id: "genres",
      title: "Genres",
      type: "select",
      options: [
        { id: "action", title: "Action" },
        { id: "romance", title: "Romance" },
      ],
      exclude: true,
    },
    {
      id: "status",
      title: "Status",
      type: "picker",
      options: [
        { id: "ongoing", title: "Ongoing" },
        { id: "completed", title: "Completed" },
      ],
    },
  ];
}
```

### Include and exclude

A `select` filter with `exclude: true` gives a person three states for each option: include it,
exclude it, or ignore it. The value arrives in this shape:

```ts
{ include: ["action"], exclude: ["romance"] }
```

This is important for genres, because "all except romance" is a normal need.

If the site cannot express an exclusion, do not set `exclude`. Do not accept the input and then
ignore it.

## Map the filters to the site

The `request.filters` object uses the `id` values that you declared. Change them to what the site
needs:

```ts
mapFilters(filters: Record<string, any> = {}) {
  const genres = filters.genres ?? { include: [], exclude: [] };
  return {
    included_tags: genres.include.join(","),
    excluded_tags: genres.exclude.join(","),
    status: filters.status,
  };
}
```

## Related

- [Pages](/developers/pages/)
- [Settings](/developers/settings/)
