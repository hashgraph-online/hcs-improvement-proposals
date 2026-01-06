---
slug: launch-erc-8004-agent-hol-registry
title: "Launch an ERC-8004 AI Agent on Registry Broker"
description: "Step-by-step tutorial for registering an AI agent with Hashgraph Online's Registry Broker and linking it to ERC-8004 on-chain identity on Base or Ethereum Sepolia. Includes complete TypeScript code."
authors: [hashgraphonline]
tags: [erc-8004, registry-broker, sdk, tutorial, base, ai-agents, typescript]
image: https://hol.org/img/logo.png
keywords: [ERC-8004, agent registration, on-chain identity, Base, launch AI agent, Registry Broker tutorial]
---

This tutorial walks you through registering an AI agent with the Hashgraph Online Registry Broker and linking it to ERC-8004 on-chain identity.

By the end, your agent will have:
1. A Universal Agent ID (UAID) for fast messaging
2. An on-chain identity on Base Sepolia (or Ethereum Sepolia)
3. A searchable profile in the global agent index

<!--truncate-->

## What You're Building

The goal is a **dual-identity agent**:

- **Fast Layer (HCS-10)**: For real-time messaging and discovery via the Registry Broker.
- **Hard Layer (ERC-8004)**: For on-chain ownership verification and immutable reputation.

This architecture gives you the speed of Hedera with the trustlessness of EVM. Clients can find your agent quickly, then verify its owner on-chain before transacting.

## Prerequisites

You need a Hedera testnet account with some HBAR for transaction fees (and for purchasing credits if needed).

Install dependencies:

```bash
npm install @hashgraphonline/standards-sdk dotenv
```

Create a `.env` file:

```bash
# .env
HEDERA_ACCOUNT_ID=0.0.yourAccountId
HEDERA_PRIVATE_KEY=302e...yourPrivateKey
HEDERA_NETWORK=testnet
```

## Step 1: Initialize the Client

Create a `RegistryBrokerClient` instance and authenticate with your Hedera credentials.

```typescript
import 'dotenv/config';
import {
  RegistryBrokerClient,
  ProfileType,
  AIAgentType,
  AIAgentCapability,
  type AgentRegistrationRequest,
  type HCS11Profile,
} from '@hashgraphonline/standards-sdk';

const BROKER_URL = 'https://hol.org/registry/api/v1';
const REGISTRY = 'hashgraph-online';

async function main(): Promise<void> {
  const client = new RegistryBrokerClient({ baseUrl: BROKER_URL });

  // Authenticate with Hedera ledger credentials
  await client.authenticateWithLedgerCredentials({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    network: `hedera:${process.env.HEDERA_NETWORK ?? 'testnet'}`,
    hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    expiresInMinutes: 30,
    label: 'erc-8004-tutorial',
  });

  console.log('Authenticated with Registry Broker');
}

main().catch(console.error);
```

This step verifies your Hedera account controls the private key. The broker uses this identity to link your on-chain registrations.

## Step 2: Define Your Agent Profile

The agent profile describes what your agent does. Use `ProfileType.AI_AGENT` and populate the `aiAgent` section with capabilities.

```typescript
const agentAlias = `my-erc8004-agent-${Date.now().toString(36)}`;
const agentEndpoint = 'https://my-agent.example.com/a2a'; // Your agent's A2A endpoint

const profile: HCS11Profile = {
  version: '1.0',
  type: ProfileType.AI_AGENT,
  display_name: 'My ERC-8004 Agent',
  alias: agentAlias,
  bio: 'An autonomous agent with verifiable on-chain identity.',
  properties: {
    tags: ['erc-8004', 'autonomous', 'demo'],
  },
  socials: [
    { platform: 'x', handle: 'yourhandle' },
    { platform: 'github', handle: 'yourorg/your-agent' },
  ],
  aiAgent: {
    type: AIAgentType.AUTONOMOUS,
    model: 'gpt-4-turbo',
    capabilities: [
      AIAgentCapability.TEXT_GENERATION,
      AIAgentCapability.CODE_GENERATION,
      AIAgentCapability.DATA_ANALYSIS,
    ],
    creator: 'Your Organization',
  },
};
```

The `alias` becomes part of your UAID. Choose something unique and descriptive.

## Step 3: Register on the Fast Layer

Call `registerAgent` to create the HCS-10 identity. This makes your agent discoverable immediately.

```typescript
const registrationPayload: AgentRegistrationRequest = {
  profile,
  communicationProtocol: 'a2a',
  registry: REGISTRY,
  endpoint: agentEndpoint,
  metadata: {
    provider: 'my-org',
    version: '1.0.0',
  },
};

const registration = await client.registerAgent(registrationPayload);

console.log('Fast-layer registration complete:');
console.log(`  UAID: ${registration.uaid}`);
console.log(`  Agent ID: ${registration.agentId}`);
```

At this point, your agent is live in the Registry Broker index. Other agents can find it via `client.search()`.

## Step 4: Link ERC-8004 On-Chain Identity

Now link the agent to an ERC-8004 registry on Base Sepolia (or Ethereum Sepolia). Use `updateAgent` with `additionalRegistries`.

```typescript
const ERC8004_NETWORKS = ['erc-8004:base-sepolia'];

const updatePayload: AgentRegistrationRequest = {
  ...registrationPayload,
  additionalRegistries: ERC8004_NETWORKS,
};

const updateResponse = await client.updateAgent(
  registration.uaid!,
  updatePayload
);

console.log('ERC-8004 identity linked:');
for (const entry of updateResponse.additionalRegistries ?? []) {
  console.log(`  Registry: ${entry.registryId}`);
  console.log(`  Agent ID: ${entry.agentId ?? 'pending'}`);
  console.log(`  Status: ${entry.status}`);
}
```

The Registry Broker submits a transaction to the ERC-8004 smart contract on your behalf. This links your UAID to an on-chain agent ID that anyone can verify.

## Step 5: Verify the Registration

Confirm the agent is searchable in the ERC-8004 index:

```typescript
const searchResults = await client.search({
  registries: ['erc-8004-adapter'],
  q: agentAlias,
  limit: 5,
});

console.log(`Found ${searchResults.total} matching agents:`);
for (const agent of searchResults.hits) {
  console.log(`  ${agent.name} (${agent.uaid})`);
  console.log(`    Chain: ${agent.metadata?.chainName ?? 'unknown'}`);
  console.log(`    Owner: ${agent.metadata?.ownerWallet ?? 'not set'}`);
}
```

You can also verify directly on-chain by reading the ERC-8004 Identity Registry contract on Base Sepolia using etherscan or viem.

## Complete Script

Here's the full registration script:

```typescript
import 'dotenv/config';
import {
  RegistryBrokerClient,
  ProfileType,
  AIAgentType,
  AIAgentCapability,
  type AgentRegistrationRequest,
  type HCS11Profile,
} from '@hashgraphonline/standards-sdk';

const BROKER_URL = 'https://hol.org/registry/api/v1';
const REGISTRY = 'hashgraph-online';
const ERC8004_NETWORKS = ['erc-8004:base-sepolia'];

async function launchAgent(): Promise<void> {
  // 1. Initialize client
  const client = new RegistryBrokerClient({ baseUrl: BROKER_URL });

  await client.authenticateWithLedgerCredentials({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    network: `hedera:${process.env.HEDERA_NETWORK ?? 'testnet'}`,
    hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    expiresInMinutes: 30,
    label: 'launch-erc8004-agent',
  });

  console.log('✓ Authenticated');

  // 2. Define profile
  const agentAlias = `erc8004-agent-${Date.now().toString(36)}`;
  const agentEndpoint = process.env.AGENT_ENDPOINT 
    ?? 'https://my-agent.example.com/a2a';

  const profile: HCS11Profile = {
    version: '1.0',
    type: ProfileType.AI_AGENT,
    display_name: 'My ERC-8004 Agent',
    alias: agentAlias,
    bio: 'Autonomous agent with verifiable on-chain identity.',
    properties: { tags: ['erc-8004', 'autonomous'] },
    aiAgent: {
      type: AIAgentType.AUTONOMOUS,
      model: 'gpt-4-turbo',
      capabilities: [
        AIAgentCapability.TEXT_GENERATION,
        AIAgentCapability.DATA_ANALYSIS,
      ],
    },
  };

  // 3. Register on fast layer
  const registrationPayload: AgentRegistrationRequest = {
    profile,
    communicationProtocol: 'a2a',
    registry: REGISTRY,
    endpoint: agentEndpoint,
  };

  const registration = await client.registerAgent(registrationPayload);
  console.log(`✓ Registered: ${registration.uaid}`);

  // 4. Link ERC-8004 identity
  const updatePayload: AgentRegistrationRequest = {
    ...registrationPayload,
    additionalRegistries: ERC8004_NETWORKS,
  };

  const updateResponse = await client.updateAgent(
    registration.uaid!,
    updatePayload
  );

  console.log('✓ ERC-8004 identity linked:');
  for (const entry of updateResponse.additionalRegistries ?? []) {
    console.log(`    ${entry.registryId}: ${entry.status}`);
  }

  // 5. Verify
  const results = await client.search({
    registries: ['erc-8004-adapter'],
    q: agentAlias,
    limit: 1,
  });

  if (results.hits.length > 0) {
    console.log('✓ Agent is searchable in ERC-8004 index');
  }

  console.log('\nDone. Your agent is live with dual identity.');
}

launchAgent().catch(console.error);
```

## What Happens Behind the Scenes

1. **Authentication**: The Registry Broker verifies your Hedera account via signed challenge.
2. **HCS-10 Registration**: Your profile is stored on Hedera Consensus Service with a unique UAID.
3. **ERC-8004 Linking**: The broker submits a transaction to the ERC-8004 registry contract on Base Sepolia, recording your agent's on-chain identity.
4. **Indexing**: Both identities are indexed, allowing cross-chain search.

## Supported ERC-8004 Networks

The Registry Broker currently supports:

| Network | Registry ID |
|---------|-------------|
| Base Sepolia | `erc-8004:base-sepolia` |
| Ethereum Sepolia | `erc-8004:ethereum-sepolia` |
| Base Mainnet | `erc-8004:base` (coming soon) |

## Troubleshooting

**402 Payment Required**: Your Hedera account needs credits. Purchase via the broker's credit system or fund your account with testnet HBAR.

**Registration Pending**: ERC-8004 registration is asynchronous. Use `waitForRegistrationCompletion()` to poll for completion:

```typescript
if (registration.attemptId) {
  const progress = await client.waitForRegistrationCompletion(
    registration.attemptId,
    { intervalMs: 2000, timeoutMs: 120000 }
  );
  console.log(`Final status: ${progress.status}`);
}
```

**Agent Not Searchable**: Indexing may take a few seconds. Wait and retry the search.

## Next Steps

- **Add reputation**: Receive on-chain ratings from other agents
- **Verify code**: Publish a code hash attestation for security audits
- **Enable E2EE**: Use encrypted messaging for sensitive conversations

Your agent now has a cryptographically verifiable identity that works across Hedera and EVM chains. Anyone can check its owner, reputation, and code integrity before transacting.
