---
title: Search & Discovery
description: Learn how to query the registry, filter results, and explore catalog data with the RegistryBrokerClient.
---

# Search & Discovery

Use the `RegistryBrokerClient` to find agents, inspect registry metadata, and explore catalog information. This guide highlights the core search workflows and the supporting catalog endpoints.

## Keyword Search

```typescript
const result = await client.search({
  q: 'customer support',
  registry: 'hashgraph-online',
  capabilities: ['messaging'],
  minTrust: 70,
  page: 1,
  limit: 25,
});

console.log(result.total);
result.hits.forEach(hit => {
  console.log(hit.profile.display_name, hit.uaid);
});
```

### Common Filters

- `registry` / `registries`: limit results to one or more registries.
- `capabilities`, `protocols`, `adapters`: filter by agent capabilities or supported adapters.
- `metadata`: target specific metadata keys (for example `metadata.industry=finance`).
- `verified`, `online`: restrict results to verified or currently online agents.
- `sortBy`, `sortOrder`: reorder results by trust, latency, or other supported fields.

## Vector Search

```typescript
const vectorResult = await client.vectorSearch({
  query: 'tax advisory assistant for small businesses',
  limit: 10,
  filter: {
    registry: 'hashgraph-online',
    capabilities: ['financial-services'],
  },
});

vectorResult.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score);
});
```

Vector search uses embeddings to surface semantically relevant agents and accepts an optional `filter` block to narrow by registry, capability, metadata, and other attributes.

## Namespace Search

```typescript
const namespace = await client.registrySearchByNamespace('hashgraph-online');
namespace.hits.forEach(hit => {
  console.log(`${hit.registry}: ${hit.name}`);
});
```

Use namespace search when you want to query a specific registry namespace (for example Holown’s agent catalog).

## Catalog Data

```typescript
const registries = await client.registries();
const additional = await client.getAdditionalRegistries();
const facets = await client.facets();
const adapters = await client.adaptersDetailed();
const popular = await client.popularSearches();
```

- `registries()` lists primary registries available through the broker.
- `getAdditionalRegistries()` returns optional registries and network descriptors.
- `facets()` surfaces available metadata facets per adapter.
- `adaptersDetailed()` provides adapter capabilities and chat support information.
- `popularSearches()` returns trending queries across the broker.

## UAID Resolution

```typescript
const resolved = await client.resolveUaid('uaid:aid:a2a:hashgraph-online:agent123');
console.log(resolved.agent.profile.display_name);

const validation = await client.validateUaid(resolved.agent.uaid);
console.log(validation.valid);
```

Resolve an agent’s UAID to retrieve profile information or validate the UAID format before using it in downstream workflows.

## Best Practices

- Cache popular search results to reduce calls against the public endpoints.
- Combine keyword search for precise filters with vector search for broader discovery.
- Use metadata facets (`facets()`) to drive UI filters so users see relevant options.
- Resolve UAIDs before initiating chat sessions to ensure the identifier remains valid.

Continue to the [Registry Broker Client API](api/client.md) for full method definitions and type information.
