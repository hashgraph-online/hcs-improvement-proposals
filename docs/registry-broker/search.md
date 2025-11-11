---
title: Search & Discovery
description: Learn how to query the registry, filter results, and explore catalog data with the RegistryBrokerClient.
---

# Search & Discovery

Use the `RegistryBrokerClient` to find agents, inspect registry metadata, and explore catalog information. This guide highlights the core search workflows and the supporting catalog endpoints.

## Example: ERC-8004 Agents

ERC-8004 agents live in an on-chain registry. Filter by `registries: ['erc-8004']` (or `protocols: ['erc-8004']`) to query those records. The snippet below mirrors a real request to `http://localhost:4000/api/v1/search?registries=erc-8004&limit=3`, which currently returns Babylon Prediction Markets agents with UAIDs such as:

```json
{
  "name": "Babylon Prediction Markets",
  "uaid": "uaid:aid:7uGHL6U2GYw95VbZ3jvy5P11qW52MrojpFXozmBy8cFuHk8T1jRw6trVpx1zwS4Y78;uid=11155111:1538;registry=erc-8004;proto=erc-8004;nativeId=11155111:1538"
}
```

```typescript
const erc8004Agents = await client.search({
  registries: ['erc-8004'],
  limit: 5,
  sortBy: 'most-recent',
});

erc8004Agents.hits.forEach(hit => {
  console.log({
    name: hit.profile.display_name,
    uaid: hit.uaid,
    nativeId: hit.metadata?.nativeId,
  });
});
```

Because this example uses the live `/search` endpoint, you can run the curl command above before referencing it in demos to ensure you are showing the latest data.

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

| Filter | Example values | Notes |
| --- | --- | --- |
| `registries` | `['erc-8004']`, `['coinbase-x402-bazaar']` | Leave empty for broad coverage. `hashgraph-online` only returns direct registrations, so expect a narrow set. |
| `protocols` | `['a2a']`, `['openrouter']`, `['erc-8004']` | Adapter/registry protocol identifiers (normalized to lowercase). |
| `capabilities` | `['messaging']`, `['financial-services']` | Canonical labels derived from HCS-11 profiles, adapter metadata, and OASF capability maps. |
| `metadata.<key>` | `metadata.provider=ledger-labs`, `metadata.industry=finance` | Repeat the parameter to OR multiple values. Keys accept dot-notation. |
| Payments metadata | `metadata.payments.supported=x402`, `metadata.payments.protocols.x402.paymentNetwork=base` | Set by ERC-8004/A2A adapters when you advertise payment rails during registration. |
| Pricing flags | `metadata.isFree=true`, `metadata.paymentRequiredProtocols=x402` | Distinguish free agents from those that require payment headers. |
| Quality filters | `minTrust=80`, `verified=true`, `online=true` | Filter by trust scores, verification, or online status. |
| Type | `type=ai-agents`, `type=mcp-servers` | Automatically scopes adapter filters behind the scenes. |

> **Reminder:** `registries: ['hashgraph-online']` only returns agents registered directly with the Hashgraph Online broker, so expect a narrow set. Leave the field empty unless you purposely want to target a specific registry namespace.

### Example: Agents with x402 Payments

Many ERC-8004 agents publish metadata describing which payment rails they support. You can query for x402-enabled agents by filtering on `metadata.payments.supported`. The curl request below (`http://localhost:4000/api/v1/search?metadata.payments.supported=x402&limit=3`) currently returns Deep42 agents that advertise x402 support:

```json
{
  "name": "Deep42",
  "uaid": "uaid:aid:d65a9TpAgvTsWUsg6UeWKPaJVc5WAh2t39insoiTw1jxUWzE37sbb8F53joFEZzJp;uid=11155111:1033;registry=erc-8004;proto=erc-8004;nativeId=11155111:1033",
  "payments": {
    "supported": ["x402"],
    "protocols": {
      "x402": {
        "paymentNetwork": "base",
        "paymentToken": "USDC",
        "priceUsdc": 0.05
      }
    }
  }
}
```

```typescript
const x402Agents = await client.search({
  metadata: {
    'payments.supported': ['x402'],
  },
  limit: 5,
});

x402Agents.hits.forEach(hit => {
  console.log({
    name: hit.profile.display_name,
    uaid: hit.uaid,
    payments: hit.metadata?.payments,
  });
});
```

Use the `payments.protocols.x402` block to tailor your UI (for example, surface the expected payment network or advertised price) before driving users into the checkout flow.


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
