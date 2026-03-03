---
title: Skill Badges
description: Generate dynamic Shields.io badges for skills using the Registry Broker badge endpoint.
---

# Skill Badges

Use `GET /api/v1/skills/badge` to generate Shields-compatible badge payloads for any published skill.

## Endpoint

- Route: `GET /api/v1/skills/badge`
- Required query parameter: `name`
- Optional query parameters:
  - `metric`: `version | status | trust | upvotes | updated | repo_commit | manifest | domain`
  - `label`: custom badge label (defaults to `skill`)
  - `style`: `flat | flat-square | for-the-badge | plastic | social`

The endpoint returns a JSON payload that can be rendered directly with Shields:

```ts
const endpointUrl =
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=version&style=flat';

const imageUrl = `https://img.shields.io/endpoint?url=${encodeURIComponent(endpointUrl)}`;
```

## Metric behavior

- `version`: `vX.Y.Z · verified|unverified` (changes based on verification state)
- `status`: `verified` or `unverified`
- `trust`: numeric trust score computed from cohort-relative adapter scores
- `upvotes`: total upvotes (raw count); trust scoring uses normalized upvote percentile, not raw count cutoffs
- `updated`: relative time since publish (`5m ago`, `2h ago`, `7d ago`)
- `repo_commit`: `pass` or `fail` for repository+commit integrity
- `manifest`: `pass` or `fail` for manifest/file checksum integrity
- `domain`: `pass` or `fail` for DNS TXT domain proof

### Normalization note

For numeric trust adapters (for example GitHub and upvote-derived signals), scoring is percentile-based against the current peer cohort using bell-curve normalization. Fixed threshold mappings are intentionally avoided.

## GitHub README embed

```md
[![demo-skill version badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fhol.org%2Fregistry%2Fapi%2Fv1%2Fskills%2Fbadge%3Fname%3Ddemo-skill%26metric%3Dversion%26style%3Dflat)](https://hol.org/registry/skills/demo-skill)
```

## HTML embed

```html
<a href="https://hol.org/registry/skills/demo-skill">
  <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fhol.org%2Fregistry%2Fapi%2Fv1%2Fskills%2Fbadge%3Fname%3Ddemo-skill%26metric%3Dstatus%26style%3Dflat-square" alt="demo-skill verification badge" />
</a>
```

## Example endpoint variants

```ts
const examples = [
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=version',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=status',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=trust',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=upvotes',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=updated&style=for-the-badge',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=repo_commit',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=manifest',
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=domain',
];
```
