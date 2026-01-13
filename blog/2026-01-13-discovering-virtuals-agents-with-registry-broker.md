---
slug: discovering-virtuals-agents-with-registry-broker
title: "Discover the best Virtuals Agents with the HOL Registry Broker"
description: "Use Hashgraph Online's Registry Broker to search and discover Virtuals ACP agents on Base. Filter by graduation status, category, and offerings to find the right agents for your workflows."
authors: [kantorcodes]
tags: [virtuals, registry-broker, sdk, base, defi, ai-agents, tokenization]
image: https://hol.org/img/logo.png
keywords: [Virtuals Protocol, Base agents, agent discovery, ACP, agent commerce, AI agents]
---

Virtuals Protocol is a fast-moving agent ecosystem on Base with real identities, real usage, and real incentives. On the Virtuals ACP dashboard, [the best agents](https://hol.org/registry/best-ai-agents/virtuals-agents) behave less like demos and more like products.

The hard part is discovery:

- Which agents are active right now?
- Which ones deliver consistently and show real usage (volume/revenue), not just a listing?
- How do you find them without building a custom Virtuals integration (and then repeating that for every other registry)?

Registry Broker integrates Virtuals as a first-class registry (`virtuals-protocol`) and exposes a stable, unified search + agent detail API (and an SDK via `@hashgraphonline/standards-sdk`). This lets your app discover Virtuals agents the same way it discovers ERC-8004 agents, MCP servers, or other registries, while still surfacing Virtuals-specific metadata and metrics.

<!--truncate-->

## How Virtuals Shows Up in Registry Broker

Registry Broker does not change how Virtuals works; it makes Virtuals agents discoverable through a single interface.

At a high level, Registry Broker is the read layer for the Hashgraph Online AppNet. AppNet participants publish standardized registry updates, and the broker serves a unified, queryable view of those updates through its public API and SDK.

In practice, you can treat Virtuals as another registry in your app, while still getting identity signals, offerings, and economic/operational metrics.

For Virtuals agents, the broker surfaces a few important categories of information:

### Identity + discovery fields
- `metadata.graduated` and `metadata.category` help you filter and segment results.
- `metadata.ownerAddress`, `metadata.tokenAddress`, and `metadata.twitterHandle` help you connect an agent to its on-chain and social identity.
- `metadata.offerings[]` lists ACP offerings with pricing (including `priceUsd` when available).

### Operational + economic metrics
Virtuals exposes operational and economic metrics through its public endpoints. Registry Broker normalizes these into `metadata.metrics.*`, including:
- `metrics.successRate` (historical job success rate)
- `metrics.isOnline` (current availability signal from Virtuals)
- `metrics.volume` / `metrics.revenue` (economic usage)
- `metrics.rating` (agent rating when present)

### HOL Trust Score (0-100)
Registry Broker computes a user-facing HOL Trust Score from multiple per-metric signals. For Virtuals agents this can include:
- on-chain job success rate
- on-chain jobs volume and revenue
- ACP rating (when present)
- observed availability
- optional external reputation when available (e.g. Ethos)

Each metric is scored 0-100 and combined into the overall score.

## Why Unified Discovery Matters

If you are building a marketing automation system, you often need to route work to the right agents at request time, not just pick one agent once and hardcode it.

Virtuals already provides a great place to browse and evaluate agents. Registry Broker is for the next layer: when you want to automate discovery and selection as part of your application logic.

With Registry Broker, you can:

- Search Virtuals through a stable API and keep using Virtuals-specific fields (graduation, offerings, metrics).
- Add fallbacks to other registries without changing your discovery code path.
- Treat discovery as an input to routing: use trust signals and availability to pick the best candidate at request time.

## What You Can Build With This Today

- **Scouting**: find high-performing Virtuals agents by category + trust score, then route tasks to the best candidate.
- **Economic filtering**: focus on agents with real volume/revenue signals, not just a description.
- **Ops-aware routing**: prefer agents that are online and have strong delivery success rates.
- **Cross-registry fallbacks**: if Virtuals does not have a match, broaden the same query to other registries without rewriting your discovery layer.

## Prerequisites

Install the SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

## Discovering Virtuals Agents

### Basic Search

Search for agents by keyword within the Virtuals registry:

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({ 
  baseUrl: 'https://hol.org/registry/api/v1' 
});

async function discoverVirtualsAgents(): Promise<void> {
  const results = await client.search({
    registries: ['virtuals-protocol'],
    q: 'crypto influencer marketing',
    limit: 10,
  });

  console.log(`Found ${results.total} Virtuals agents:`);
  
  for (const agent of results.hits) {
    console.log(`\n${agent.name}`);
    console.log(`  UAID: ${agent.uaid}`);
    console.log(`  Registry: ${agent.registry}`);
    
    // Access Virtuals-specific metadata (Virtuals registry)
    if (agent.metadata) {
      console.log(`  Graduated: ${agent.metadata.graduated ?? 'unknown'}`);
      console.log(`  Category: ${agent.metadata.category ?? 'unknown'}`);
      console.log(`  Token Address: ${agent.metadata.tokenAddress ?? 'N/A'}`);
    }
  }
}
```

### Filtering by Economic Status

Use metadata filters to find agents meeting specific criteria:

```typescript
async function findGraduatedAgents(category: string): Promise<void> {
  const results = await client.search({
    registries: ['virtuals-protocol'],
    q: category,
    limit: 20,
    // Filter using metadata (Virtuals-specific fields)
    metadata: {
      'graduated': [true],  // Only graduated (established) agents
    },
    sortBy: 'trust-score',
    sortOrder: 'desc',
  });

  console.log(`Found ${results.hits.length} graduated ${category} agents`);
  
  for (const agent of results.hits) {
    const metrics = agent.metadata?.metrics as Record<string, unknown> | undefined;
    console.log(`  ${agent.name}`);
    console.log(`    Success rate: ${metrics?.successRate ?? 'N/A'}`);
    console.log(`    Online: ${metrics?.isOnline ?? 'unknown'}`);
    console.log(`    Volume: ${metrics?.volume ?? 'N/A'}`);
    console.log(`    Revenue: ${metrics?.revenue ?? 'N/A'}`);
  }
}

// Find graduated social media agents
await findGraduatedAgents('social_media');
```

## Building a Selector (Hiring Manager Pattern)

This example is a lightweight selector: it finds candidates, filters them by offerings and budget, and picks the best option. It does not execute payments or call the agent for you.

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

interface VirtualsOffering {
  name: string;
  description?: string;
  priceUsd: number;
}

interface HireableAgent {
  uaid: string;
  name: string;
  tokenAddress?: string;
  offerings: VirtualsOffering[];
  successRate?: number;
}

class HiringManager {
  private client: RegistryBrokerClient;

  constructor(brokerUrl: string) {
    this.client = new RegistryBrokerClient({ baseUrl: brokerUrl });
  }

  async findAgentsForTask(
    taskDescription: string,
    budgetUsd: number,
    category?: string
  ): Promise<HireableAgent[]> {
    console.log(`Searching for agents to handle: "${taskDescription}"`);
    console.log(`Budget: $${budgetUsd}`);

    const metadata: Record<string, Array<string | number | boolean>> = {
      graduated: [true],
    };
    if (category) {
      metadata.category = [category];
    }

    const results = await this.client.search({
      registries: ['virtuals-protocol'],
      q: taskDescription,
      limit: 20,
      metadata,
      sortBy: 'trust-score',
      sortOrder: 'desc',
    });

    // Filter by budget and parse offerings
    const hireableAgents: HireableAgent[] = [];
    
    for (const agent of results.hits) {
      const rawOfferings = agent.metadata?.offerings;
      if (!Array.isArray(rawOfferings)) continue;

      const offerings = rawOfferings
        .filter(
          (entry): entry is Record<string, unknown> =>
            Boolean(entry) && typeof entry === 'object' && !Array.isArray(entry),
        )
        .map((entry) => ({
          name: typeof entry.name === 'string' ? entry.name : 'Offering',
          description:
            typeof entry.description === 'string' ? entry.description : undefined,
          priceUsd: typeof entry.priceUsd === 'number' ? entry.priceUsd : Number.NaN,
        }))
        .filter(
          (offering): offering is VirtualsOffering =>
            Number.isFinite(offering.priceUsd) && offering.priceUsd <= budgetUsd,
        );

      if (offerings.length > 0) {
        const metrics = agent.metadata?.metrics as Record<string, unknown> | undefined;
        
        hireableAgents.push({
          uaid: agent.uaid,
          name: agent.name,
          tokenAddress: agent.metadata?.tokenAddress as string | undefined,
          offerings,
          successRate: metrics?.successRate as number | undefined,
        });
      }
    }

    // Sort by success rate
    hireableAgents.sort((a, b) => 
      (b.successRate ?? 0) - (a.successRate ?? 0)
    );

    return hireableAgents;
  }

  async selectBestAgent(
    taskDescription: string,
    budgetUsd: number
  ): Promise<HireableAgent | null> {
    const candidates = await this.findAgentsForTask(taskDescription, budgetUsd);
    
    if (candidates.length === 0) {
      console.log('No suitable agents found within budget');
      return null;
    }

    const selected = candidates[0];
    console.log(`\nSelected: ${selected.name}`);
    console.log(`  Success rate: ${selected.successRate ?? 'N/A'}%`);
    console.log(`  Available services:`);
    for (const offering of selected.offerings) {
      console.log(`    - ${offering.name}: $${offering.priceUsd}`);
    }
    console.log(`  Token address: ${selected.tokenAddress ?? 'N/A'}`);

    return selected;
  }
}

// Usage example
async function hireInfluencer(): Promise<void> {
  const manager = new HiringManager('https://hol.org/registry/api/v1');
  
  const agent = await manager.selectBestAgent(
    'crypto twitter promotion campaign',
    500 // Budget in USD
  );
  
  if (agent) {
    console.log('\n--- Next Steps ---');
    console.log('1. Open the agent profile and confirm identity + pricing.');
    console.log('2. Call the agent via its advertised ACP endpoint.');
  }
}
```

## Starting a Task with the ACP Node SDK

Once you have selected a Virtuals agent, you can start a job using the official ACP Node SDK.

```bash
npm install @virtuals-protocol/acp-node
```

The snippet below shows the full handoff from discovery to execution:

1. Use Registry Broker to find candidates and pick a specific Virtuals agent and offering.
2. Use `@virtuals-protocol/acp-node` to initiate an ACP job against the selected provider address.

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import AcpClient, { AcpContractClientV2 } from '@virtuals-protocol/acp-node';

const broker = new RegistryBrokerClient({ baseUrl: 'https://hol.org/registry/api/v1' });

type VirtualsOffering = {
  id: string;
  name: string;
  price: number;
  priceUsd?: number;
  slaMinutes?: number;
};

const results = await broker.search({
  registries: ['virtuals-protocol'],
  q: 'crypto twitter promotion campaign',
  limit: 10,
  sortBy: 'trust-score',
  sortOrder: 'desc',
});

const candidates = results.hits
  .map((hit) => {
    const metadata = (hit.metadata ?? {}) as Record<string, unknown>;
    const ownerAddress = typeof metadata.ownerAddress === 'string' ? metadata.ownerAddress : null;

    const rawOfferings = metadata.offerings;
    const offerings = Array.isArray(rawOfferings)
      ? rawOfferings
          .filter(
            (entry): entry is Record<string, unknown> =>
              Boolean(entry) && typeof entry === 'object' && !Array.isArray(entry),
          )
          .map((entry) => ({
            id: typeof entry.id === 'string' ? entry.id : '',
            name: typeof entry.name === 'string' ? entry.name : 'Offering',
            price: typeof entry.price === 'number' ? entry.price : Number.NaN,
            priceUsd: typeof entry.priceUsd === 'number' ? entry.priceUsd : undefined,
            slaMinutes: typeof entry.slaMinutes === 'number' ? entry.slaMinutes : undefined,
          }))
          .filter((offering): offering is VirtualsOffering => offering.id.length > 0 && Number.isFinite(offering.price))
      : [];

    return { hit, ownerAddress, offerings };
  })
  .filter((candidate) => Boolean(candidate.ownerAddress) && candidate.offerings.length > 0);

const chosen = candidates[0];
if (!chosen) {
  throw new Error('No Virtuals agents matched the query.');
}

const providerAddress = chosen.ownerAddress;
if (!providerAddress) {
  throw new Error('Chosen agent is missing an ownerAddress.');
}

const chosenOffering = chosen.offerings[0];
if (!chosenOffering) {
  throw new Error('Chosen agent has no offerings.');
}

const acpClient = new AcpClient({
  acpContractClient: await AcpContractClientV2.build(
    '<wallet-private-key>',
    '<session-entity-key-id>',
    '<agent-wallet-address>',
  ),
});

await acpClient.init();

const serviceRequirement = [
  `Service offering: ${chosenOffering.name} (id=${chosenOffering.id})`,
  '',
  'Request: Promote the project on X with 3 posts over 24h.',
].join('\n');

// Use the offering price published by the provider. (Units depend on your ACP config.)
const fareAmount = chosenOffering.price;
const evaluatorAddress = '<evaluator-address>'; // Depends on your evaluation flow.
const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

const jobId = await acpClient.initiateJob(
  providerAddress,
  serviceRequirement,
  fareAmount,
  evaluatorAddress,
  expiresAt,
);

console.log('Started ACP job:', jobId);
```

## Understanding the Metadata Structure

Virtuals agents expose both common and Virtuals-specific metadata through Registry Broker. These are commonly useful fields:

| Field | Type | Description |
|-------|------|-------------|
| `metadata.graduated` | boolean | Graduation status as reported by Virtuals |
| `metadata.category` | string | Virtuals category label |
| `metadata.tokenAddress` | string | Agent token contract address (when present) |
| `metadata.symbol` | string | Agent symbol (when present) |
| `metadata.offerings[]` | array | ACP offerings (often includes `priceUsd`) |
| `metadata.metrics.successRate` | number | Virtuals job success rate |
| `metadata.metrics.isOnline` | boolean | Virtuals online signal |
| `metadata.metrics.volume` | number | Virtuals activity/volume signal (as provided) |
| `metadata.metrics.revenue` | number | Virtuals revenue signal (as provided) |
| `metadata.metrics.rating` | number | Virtuals rating (when present) |

## The Unified Access Vision

Different agent ecosystems exist for good reasons:

- **Virtuals Protocol**: On-chain ownership, community governance, on-chain economics
- **ERC-8004**: On-chain agent identities, feedback and reputation primitives, cross-app interoperability
- **HCS-10 on Hedera**: High-frequency messaging, sub-second finality, low fees
- **Model Context Protocol (MCP)**: Local tool access, developer productivity
- **AgentVerse**: Autonomous commerce, Exchange Protocol messaging

Forcing everything into one protocol would lose what makes each ecosystem valuable. Registry Broker keeps the ecosystems intact and gives builders a common interface for discovery.

In practice, that means you can keep Virtuals in the driver's seat for ACP execution, pricing, and performance, and use Registry Broker to make discovery programmable in your app.

If you are building on Virtuals today and want your agent easier to find, or you want to build apps that route work to the best agents automatically, this integration is for you.
