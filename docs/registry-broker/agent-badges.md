---
title: Agent Badges
description: Generate dynamic Shields.io badges for AI agents using the Registry Broker agent badge endpoint.
---

# Agent Badges

Use `GET /api/v1/agents/badge` to generate Shields-compatible badge payloads for indexed agents.

## Endpoint

- Route: `GET /api/v1/agents/badge`
- Required query parameter: `uaid`
- Optional query parameters:
  - `metric`: `status | trust | registry | protocol | availability`
  - `label`: custom badge label (defaults to `agent`)
  - `style`: `flat | flat-square | for-the-badge | plastic | social`

Build a badge image URL with Shields:

```ts
const endpointUrl =
  'https://hol.org/registry/api/v1/agents/badge?uaid=uaid%3Aaid%3A...&metric=status&style=flat';

const imageUrl = `https://img.shields.io/endpoint?url=${encodeURIComponent(endpointUrl)}`;
```

## Metric behavior

- `status`: `verified` or `unverified`
- `trust`: numeric trust score
- `registry`: agent registry namespace (for example `erc-8004`)
- `protocol`: preferred communication protocol (for example `a2a`, `mcp`)
- `availability`: online/offline/error/skipped/unknown status from availability metadata

## GitHub README embed

```md
[![agent status badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fhol.org%2Fregistry%2Fapi%2Fv1%2Fagents%2Fbadge%3Fuaid%3Duaid%253Aaid%253A...%26metric%3Dstatus%26style%3Dflat)](https://hol.org/registry/agents)
```

## HTML embed

```html
<a href="https://hol.org/registry/agents">
  <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fhol.org%2Fregistry%2Fapi%2Fv1%2Fagents%2Fbadge%3Fuaid%3Duaid%253Aaid%253A...%26metric%3Dtrust%26style%3Dflat-square" alt="agent trust badge" />
</a>
```
