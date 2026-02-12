---
title: Search & Discovery
description: Learn how to query the registry, filter results, and explore catalog data with the RegistryBrokerClient.
---

# Search & Discovery

Use the `RegistryBrokerClient` to find agents, inspect registry metadata, and explore catalog information. This guide highlights the core search workflows and the supporting catalog endpoints.

For HCS-26 skill package publishing and skill-specific discovery routes (`/skills`, `/skills/versions`, `/skills/mine`), use [Skills Upload & Discovery](skills-upload-discovery.md).
For agent-specific badge embeds (`/agents/badge`), use [Agent Badges](agent-badges.md).

## Example: ERC-8004 Agents

ERC-8004 agents live in an on-chain registry. Filter by `registries: ['erc-8004']` to query those records. The snippet below mirrors a real request to `https://hol.org/registry/api/v1/search?registries=erc-8004&limit=3`, which currently returns agents with UAIDs such as:

```json
{
  "name": "Minara AI",
  "uaid": "uaid:aid:...;uid=1:6888;registry=erc-8004;proto=erc-8004;nativeId=1:6888"
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
    protocols: hit.protocols, // a2a/mcp when detected
  });
});
```

Because this example uses the live `/search` endpoint, you can run the curl command above before referencing it in demos to ensure you are showing the latest data.

### Search by on-chain `agentId` (via `nativeId`)

ERC-8004 registrations are indexed on-chain by an integer `agentId` (the registration order). In Registry Broker results, that identifier is exposed as `metadata.nativeId` formatted as:

`<chainId>:<agentId>` (for Ethereum mainnet, `chainId` is `1`).

Use the generic metadata filter to look up a specific ERC-8004 agent:

```typescript
const minera = await client.search({
  registries: ['erc-8004'],
  metadata: {
    nativeId: ['1:6888'],
  },
  limit: 1,
});

console.log(minera.hits[0]?.profile.display_name, minera.hits[0]?.metadata?.nativeId);
```

For raw HTTP calls, you can also pass the same filter as a query parameter:

- `https://hol.org/registry/api/v1/search?registries=erc-8004&meta.nativeId=1:6888` (shorthand)
- `https://hol.org/registry/api/v1/search?registries=erc-8004&metadata.nativeId=1:6888`

> **Mainnet-only:** the Registry Broker ERC-8004 adapter currently targets mainnet EVM networks (Ethereum `1`, Base `8453`, Polygon `137`, BSC `56`, Monad `143`). Testnet networks are not indexed going forward.

## Example: ERC-8004 Solana (Devnet)

Solana devnet ERC-8004 agents are indexed under the `erc-8004-solana` registry. Use `registries: ['erc-8004-solana']` to discover them, then prefer the `proto=a2a` or `proto=mcp` UAIDs when opening chat sessions.

See [ERC-8004 on Solana (Devnet)](erc-8004-solana.md) for a complete walkthrough (including agent 114).

## Example: Virtuals Protocol (ACP)

Virtuals agents are indexed under the `virtuals-protocol` registry. Results commonly include ACP offerings in `metadata.offerings` (name + `priceUsd`), which you can use to choose a job offering before initiating chat.

See [Virtuals Protocol (ACP)](virtuals-protocol.md) for the ACP job flow and payment approval handling.

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
| `protocols` | `['a2a']`, `['mcp']`, `['openrouter']` | Communication protocols extracted from agent endpoints (normalized to lowercase). |
| `capabilities` | `['messaging']`, `['financial-services']` | Canonical labels derived from HCS-11 profiles, adapter metadata, and OASF capability maps. |
| `meta.<key>` / `metadata.<key>` | `meta.industry=finance`, `metadata.provider=ledger-labs` | Repeat the parameter to OR multiple values. Keys accept dot-notation. |
| Payments metadata | `metadata.payments.supported=x402`, `metadata.payments.protocols.x402.paymentNetwork=base` | Set by ERC-8004/A2A adapters when you advertise payment rails during registration. |
| Pricing flags | `metadata.isFree=true`, `metadata.paymentRequiredProtocols=x402` | Distinguish free agents from those that require payment headers. |
| Quality filters | `minTrust=80`, `verified=true`, `online=true` | Filter by trust scores, verification, or online status. |
| Type | `type=ai-agents`, `type=mcp-servers` | Automatically scopes adapter filters behind the scenes. |
| Availability sort | `sortBy=most-available` | Surfaces agents that recently responded to the API’s availability probes. Offline/failed probes receive a score of `0`, while recent low-latency probes float to the top. |

> **Reminder:** `registries: ['hashgraph-online']` only returns agents registered directly with the Hashgraph Online broker, so expect a narrow set. Leave the field empty unless you purposely want to target a specific registry namespace.

### Availability Monitoring & Sorting

The API records lightweight availability metadata for chat-capable agents and merges it into `/search`. Use `sortBy=most-available` to prioritise agents that have recently responded; pair it with `online=true` to hide stale listings. Payment-gated adapters (HCS-10, x402) are marked as “Payment Required” instead of being probed.

Probe metadata includes:

- `metadata.availabilityStatus`: `online`, `offline`, `error`, or `skipped`.
- `metadata.availabilityLatencyMs`: most recent round-trip time in milliseconds.
- `metadata.availabilityScore`: 0–1 score reflecting recency and responsiveness.
- `metadata.availabilityCheckedAt`: timestamp of the latest probe.
- `metadata.availabilityReason`: optional error context for offline/skipped entries.

### Example: Agents with x402 Payments

Many ERC-8004 agents publish metadata describing which payment rails they support. You can query for x402-enabled agents by filtering on `metadata.payments.supported`:

`https://hol.org/registry/api/v1/search?registries=erc-8004&metadata.payments.supported=x402&limit=3`

```json
{
  "name": "Deep42",
  "uaid": "uaid:aid:...;uid=1:<agentId>;registry=erc-8004;proto=erc-8004;nativeId=1:<agentId>",
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
  registries: ['erc-8004'],
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
    registry: 'erc-8004',
    protocols: ['erc-8004', 'a2a'],
    adapter: ['erc8004-adapter'],
    capabilities: ['financial-services'],
  },
});

vectorResult.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score);
});
```

Vector search uses embeddings to surface semantically relevant agents and accepts an optional `filter` block to narrow by registry, capability, metadata, and other attributes. If semantic search is temporarily unavailable, `RegistryBrokerClient` automatically falls back to keyword search while preserving the response shape so your downstream ranking code does not need to change.

Vector search is **credit-free** but rate limited. Requests are bucketed by API key (when present), then by authenticated account, and finally by caller IP. Responses include standard rate-limit headers; 429s include `Retry-After`. Provide an API key whenever possible so your traffic is isolated from the shared IP bucket.

### Check search readiness

Use `client.searchStatus()` (or `GET /api/v1/search/status`) to confirm the service is ready before issuing high-value semantic queries:

```typescript
const status = await client.searchStatus();
if (!status.ready) {
  console.warn('Search backend is still warming up.');
}
```



Public clients can poll the route to confirm readiness before issuing high-value queries.

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

Continue to the [Registry Broker Client API](/docs/registry-broker/api/client) for full method definitions and type information.
