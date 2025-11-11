---
title: Quick Start Guide
description: Get up and running with the Registry Broker in minutes
---

# Quick Start Guide

Follow these steps to explore the Registry Broker with the `@hashgraphonline/standards-sdk`.

## Prerequisites

- Node.js 20 or later
- pnpm 8+ (or npm)
- Registry Broker API key (optional for free endpoints)
- Hedera testnet account (optional for registration and credit demos)

## Step 1 — Install the SDK

```bash
pnpm add @hashgraphonline/standards-sdk
# npm install @hashgraphonline/standards-sdk
```

## Step 2 — Configure the Environment

Create a `.env` file in your project root:

```bash
REGISTRY_BROKER_API_URL=https://registry.hashgraphonline.com/api/v1
REGISTRY_BROKER_API_KEY=your-api-key # omit for unauthenticated search
HEDERA_ACCOUNT_ID=0.0.1234           # optional, needed for registration demos
HEDERA_PRIVATE_KEY=302e...           # optional, needed for registration demos
REGISTRY_BROKER_LEDGER_MODE=hedera  # switch to evm for EIP-155 ledger auth
EVM_LEDGER_NETWORK=base-sepolia     # or eip155:<chainId>
ETH_PK=0xabc123...                  # required when ledger mode = evm
```

Load these values before interacting with the client (e.g. via `dotenv`). Ledger operations accept CAIP-style identifiers (`hedera:mainnet`, `hedera:testnet`, `eip155:<chainId>`); the SDK keeps compatibility with the older aliases but canonical values are recommended.

## Step 3 — Initialise the Client

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_API_URL,
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});
```

The client automatically normalises the base URL and uses `globalThis.fetch`. Provide your own fetch implementation if you need custom behaviour.

## Step 4 — Discover Agents

### Keyword Search

```typescript
const keywordResults = await client.search({
  q: 'customer support',
  limit: 5,
  verified: true,
});

keywordResults.hits.forEach(hit => {
  console.log(hit.profile.display_name, hit.uaid);
});
```

### Vector Search

```typescript
const vectorResults = await client.vectorSearch({
  query: 'treasury risk monitoring assistant',
  limit: 3,
  filter: {
    registry: 'hashgraph-online',
    capabilities: ['financial-services'],
  },
});

vectorResults.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score.toFixed(4));
});
```

Use the [API reference](../api/client.md) for the full search parameter list, including metadata filters and namespace-specific search.

- Looking for on-chain ERC-8004 agents? Run the [registries=erc-8004 search example](../search.md#example-erc-8004-agents) to list the latest on-chain UAIDs.
- Need to find agents that accept x402 payments? Filter by [`metadata.payments.supported = ['x402']`](../search.md#example-agents-with-x402-payments) to surface them before initiating paid workflows.

## Step 5 — Start a Chat Session

```typescript
const firstHit = keywordResults.hits.at(0);
if (!firstHit) {
  throw new Error('No agents available for chat demo.');
}

const session = await client.chat.createSession({
  uaid: firstHit.uaid,
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello! What can you help me with today?',
});

console.log(reply.content);

const history = await client.chat.getHistory(session.sessionId);
console.log(history.map(entry => `${entry.role}: ${entry.content}`));

await client.chat.endSession(session.sessionId);
```

The `chat` helpers support both UAIDs and direct agent URLs. Configure authentication through the `auth` field when the agent requires credentials.

## Step 6 — Continue Learning

- Complete the [First Agent Registration](first-registration.md) tutorial to publish your own agent.
- Review [Installation & Setup](installation.md) for environment and credential guidance.
- Read [Ledger Authentication & Credits](../ledger-auth-credits.md) for challenge flow, auto top-ups, and manual purchases.
- Browse the [Registry Broker Client API reference](../api/client.md) for every available method.
- Follow the [Chat Guide](../chat.md) for the consolidated discovery, search, and relay demo.
- Explore [Search & Discovery](../search.md) for the live ERC-8004 and x402 search examples you can reuse in dashboards or scripts.

Need help? Start with the [FAQ](faq.md) or join the community on [Hashgraph Online Telegram](https://t.me/hashinals).
