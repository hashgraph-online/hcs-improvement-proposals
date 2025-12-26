---
title: ERC-8004 on Solana (Devnet)
description: Discover and publish ERC-8004 agents on Solana devnet through the Registry Broker.
---

# ERC-8004 on Solana (Devnet)

Registry Broker indexes ERC-8004 agents registered on Solana devnet and exposes them via the same `/search`, `/resolve`, `/chat`, and feedback APIs used by other registries.

## What you get

- **Discovery**: Search Solana devnet agents by `registries=['erc-8004-solana']`.
- **Registration**: Publish your agent to Solana devnet by including `erc-8004-solana:solana-devnet` in `additionalRegistries`.
- **Chat routing**: When a Solana agent advertises an A2A and/or MCP endpoint in its ERC-8004 registration file, the broker surfaces protocol-specific UAIDs you can chat with directly.
- **Related agents**: If an agent exposes multiple transports (for example A2A + MCP), the UI groups those UAIDs together as “Related Agents”.

## Discover Solana agents

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

const result = await client.search({
  registries: ['erc-8004-solana'],
  limit: 10,
  sortBy: 'most-recent',
});

result.hits.forEach(hit => {
  console.log({
    name: hit.name,
    uaid: hit.uaid,
    originalId: hit.originalId, // solana-devnet:<agentId>
    protocols: hit.protocols,   // a2a/mcp when detected
  });
});
```

### Example: Solana devnet agent 114

Agent 114 is a good reference because its ERC-8004 registration file advertises both MCP and A2A endpoints:

- Registration file (IPFS gateway): `https://ipfs.io/ipfs/bafkreihc7u3af4arrxng6ersu55oqmh6syxcxi7hhtw7iqjwkspvioonnu`
- MCP endpoint: `https://mcp-test-agent.vercel.app/api/mcp`
- A2A endpoint: `https://mcp-test-agent.vercel.app/api/a2a`

In the live registry you may see multiple UAIDs for the same `originalId` (`solana-devnet:114`), for example:

- `...;registry=erc-8004-solana;proto=erc-8004-solana;nativeId=solana-devnet:114`
- `...;registry=erc-8004-solana;proto=a2a;nativeId=solana-devnet:114`
- `...;registry=erc-8004-solana;proto=mcp;nativeId=solana-devnet:114`

The `proto=a2a` and `proto=mcp` entries are the ones you should use for chat (they map to concrete transport endpoints). The `proto=erc-8004-solana` entry is a registry-level record and exists for compatibility when a concrete transport cannot be selected.

## Register to Solana devnet via `additionalRegistries`

Solana devnet is available through the same “additional registries” workflow used by the EVM ERC-8004 registrar.

1. Discover enabled networks:

```ts
const catalog = await client.getAdditionalRegistries();
const solanaTargets =
  catalog.registries.find(entry => entry.id === 'erc-8004-solana')?.networks ?? [];

console.log(solanaTargets.map(network => network.key));
// ["erc-8004-solana:solana-devnet"]
```

2. Include the network key in your registration payload:

```ts
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk/services/registry-broker';

const payload: AgentRegistrationRequest = {
  profile,
  registry: 'hashgraph-online',
  communicationProtocol: 'a2a',
  endpoint: 'https://your-agent.example.com/a2a',
  additionalRegistries: ['erc-8004-solana:solana-devnet'],
};

const quote = await client.getRegistrationQuote(payload);
console.log('Credits required:', quote.requiredCredits);

const response = await client.registerAgent(payload);
console.log(response);
```

Solana devnet registrations are priced as a fixed credit cost (see the `estimatedCredits` field in the catalog response).

## Chat demo

The standards-sdk includes an end-to-end Solana devnet demo that discovers agent 114, opens a chat session, runs echo + ping, then submits feedback:

- `demo/registry-broker/solana-devnet-chat.ts` (standards-sdk repo)

