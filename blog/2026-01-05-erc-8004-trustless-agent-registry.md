---
slug: erc-8004-trustless-agent-registry
title: "ERC-8004: Building Trustless AI Agent Identity on the Blockchain"
description: "Learn how ERC-8004 provides trustless identity, on-chain reputation, and code integrity verification for AI agents. Includes TypeScript examples for dual-identity registration combining HCS-10 speed with EVM immutability."
authors: [hashgraphonline]
tags: [erc-8004, base, registry-broker, sdk, architecture, web3, reputation, identity]
image: https://hol.org/img/logo.png
keywords: [ERC-8004, agent identity, on-chain reputation, trustless agents, Base, AI verification, agent registry]
---

On the internet, nobody knows you're a dog. In the agent economy, nobody knows if you're a scammer.

When agents start moving real money—managing portfolios, buying APIs, signing contracts—**trust** is the bottleneck. You need answers: Who owns this thing? What's its track record? Is it running the code it claims?

**ERC-8004** proposes a standard for **Trustless Agent Identity**. It moves reputation out of centralized databases and onto immutable EVM ledgers.

The Registry Broker supports this standard today. It lets agents carry verifiable "on-chain business cards" alongside their fast HCS-10 comms channels.

<!--truncate-->

## Why On-Chain Identity Matters

As AI agents take on more responsibility, developers need stronger guarantees about identity and trust:

### Cryptographic Provenance
Traditional agent profiles are valuable for discovery, but on-chain registration adds cryptographic proof. You can mathematically verify who controls an agent.

### Immutable Reputation
On-chain reputation systems create permanent, auditable records. Historical performance data can be verified by anyone and cannot be retroactively modified.

### Code Integrity Verification
For high-stakes applications, knowing that an agent runs audited, unmodified code is essential. On-chain attestations provide this assurance.

## The ERC-8004 Solution

ERC-8004 addresses these problems through three on-chain registries:

### 1. Identity Registry (The Owner)

A smart contract maps agent IDs to wallet addresses. To register, you sign a message.

This gives you:
- **Provenance**: Mathematical proof of creation
- **Recoverability**: Standard key rotation patterns
- **Corporate Control**: Multi-sig wallets can own agents

### 2. Reputation Registry (Are You Good?)

The Reputation Registry stores on-chain feedback and ratings. Key properties:
- **Reviews cost gas**: Submitting feedback requires a transaction fee, reducing spam
- **Reviews are signed**: Every rating is linked to a real wallet with history
- **Reviews are immutable**: Historical reputation cannot be edited or deleted
- **Aggregation is transparent**: Anyone can verify the reputation calculation

### 3. Validation Registry (Is Your Code Safe?)

The Validation Registry stores attestations about agent code integrity:
- **Code hashes**: Cryptographic fingerprints of audited agent code
- **TEE attestations**: Proofs that the agent runs in a Trusted Execution Environment
- **Audit records**: Links to security audits and their findings
- **Version tracking**: History of code changes and their attestations

## The Dual-Identity Architecture

Blockchains provide immutability, while protocols like HCS-10 provide speed. The **dual-identity architecture** combines both:

| Layer | Technology | Purpose | Speed |
|-------|-----------|---------|-------|
| Fast Layer | HCS-10 (Hedera) | Messaging, real-time chat | Milliseconds |
| Hard Layer | ERC-8004 (Base) | Identity, reputation | Block time |

Agents maintain identity on both layers:
- **HCS-10 UAID**: For discovering, addressing, and messaging the agent
- **ERC-8004 Registration**: For verifying ownership and checking reputation

The Registry Broker links these identities, allowing clients to verify on-chain credentials before initiating fast-layer communication.

## Implementation: Registering a Dual-Identity Agent

Here's how to register an agent with both HCS-10 and ERC-8004 identity:

### Step 1: Register on the Fast Layer

```typescript
import { 
  RegistryBrokerClient,
  ProfileType,
  AIAgentType,
  AIAgentCapability,
} from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({ 
  baseUrl: 'https://hol.org/registry/api/v1' 
});

// Authenticate with Hedera credentials
await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  expiresInMinutes: 60,
  label: 'dual-identity-demo',
});

// Register the agent with HCS-10 identity
const registration = await client.registerAgent({
  profile: {
    type: ProfileType.AI_AGENT,
    version: '1.0',
    display_name: 'Trustless DeFi Advisor',
    alias: 'defi-advisor-alpha',
    bio: 'Autonomous DeFi portfolio management with on-chain verified identity and audited decision logic.',
    aiAgent: {
      type: AIAgentType.AUTONOMOUS,
      model: 'gpt-4-turbo',
      capabilities: [
        AIAgentCapability.TEXT_GENERATION,
        AIAgentCapability.DATA_ANALYSIS,
      ],
    },
  },
  communicationProtocol: 'a2a',
  registry: 'hashgraph-online',
});

console.log(`Fast-layer identity established: ${registration.uaid}`);
```

### Step 2: Link the Hard Layer Identity

After registering, link the ERC-8004 on-chain identity:

```typescript
// Update registration to include ERC-8004 anchor
await client.updateAgent(registration.uaid!, {
  profile: registration.profile,
  communicationProtocol: 'a2a',
  registry: 'hashgraph-online',
  // Add the on-chain identity anchor
  additionalRegistries: ['erc-8004:base-sepolia'],
  metadata: {
    // Link to the controlling wallet
    ownerWallet: '0x1234...abcd',
    // Reference to code audit
    auditUrl: 'https://audits.myorg.com/defi-advisor-v1.pdf',
    // TEE attestation (if running in secure enclave)
    teeAttestation: 'attestation-hash-here',
  },
});

console.log('Hard-layer identity linked');
```

The broker validates ownership of the linked wallet before accepting the update, preventing unauthorized identity claims.

## Discovering Verified Agents

Clients can search specifically for agents with on-chain verification:

```typescript
async function findVerifiedAgents(query: string): Promise<void> {
  const results = await client.search({
    registries: ['erc-8004-adapter'],
    q: query,
    limit: 20,
  });

  console.log(`Found ${results.total} ERC-8004 verified agents:`);

  for (const agent of results.hits) {
    console.log(`\n${agent.name}`);
    console.log(`  UAID: ${agent.uaid}`);
    
    // Access ERC-8004 specific metadata
    const metadata = agent.metadata;
    if (metadata) {
      console.log(`  Chain: ${metadata.chainName ?? 'unknown'}`);
      console.log(`  Owner: ${metadata.ownerWallet ?? 'not disclosed'}`);
      console.log(`  Verified: ${metadata.verified ?? false}`);
      
      // Reputation data from on-chain registry
      if (metadata.reputation) {
        const rep = metadata.reputation as Record<string, unknown>;
        console.log(`  Rating: ${rep.averageScore ?? 'N/A'}/5`);
        console.log(`  Reviews: ${rep.totalReviews ?? 0}`);
      }
    }
  }
}

// Find verified trading advisors
await findVerifiedAgents('trading advisor');
```

### Filtering by Chain and Verification Status

```typescript
// Search for agents verified on specific chains
const baseAgents = await client.search({
  registries: ['erc-8004-adapter'],
  q: 'portfolio management',
  metadata: {
    'chainName': ['Base Sepolia', 'Base'],
  },
  verified: true,
});

console.log(`Found ${baseAgents.hits.length} verified agents on Base`);
```

## Verifying Agent Identity On-Chain

For high-stakes interactions, clients should verify identity directly on-chain:

```typescript
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

// The ERC-8004 Identity Registry contract
const IDENTITY_REGISTRY = '0x...'; // Contract address

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

async function verifyAgentOwnership(
  agentId: string,
  expectedOwner: string
): Promise<boolean> {
  const owner = await publicClient.readContract({
    address: IDENTITY_REGISTRY as `0x${string}`,
    abi: identityRegistryAbi,
    functionName: 'ownerOf',
    args: [agentId],
  });

  return owner.toLowerCase() === expectedOwner.toLowerCase();
}

async function getAgentReputation(agentId: string): Promise<{
  score: number;
  reviewCount: number;
}> {
  const reputation = await publicClient.readContract({
    address: IDENTITY_REGISTRY as `0x${string}`,
    abi: reputationRegistryAbi,
    functionName: 'getReputation',
    args: [agentId],
  });

  return {
    score: Number(reputation.averageScore) / 100, // Stored as integer
    reviewCount: Number(reputation.totalReviews),
  };
}
```

## Use Cases for ERC-8004

### Autonomous Fund Management
DeFi protocols can verify that an agent managing user funds has:
- A known, auditable owner
- Positive historical reputation
- Code running in a verified TEE

### Agent-to-Agent Commerce
When one agent hires another for a task:
- Verify the service provider's identity on-chain
- Check reputation before sending payment
- Maintain an immutable record of the transaction

### Regulated Industries
For agents operating in regulated spaces (finance, healthcare):
- Link agent identity to licensed entities
- Maintain auditable reputation history
- Provide regulators with verifiable chain of custody

### Insurance and Liability
Agent insurance providers can:
- Assess risk based on on-chain reputation
- Verify code integrity before issuing coverage
- Track claims against specific agents immutably

## Building Trust

ERC-8004 changes the trust model. We're moving from "trust the platform" to "verify the chain."

Combining Hedera's speed with EVM immutability creates a robust infrastructure for autonomous commerce.

You can send funds to an agent knowing exactly who controls it. You can verify its reputation score without asking a central API. This is what's required for the autonomous economy.
