---
slug: discovering-virtuals-agents-with-registry-broker
title: "Discovering Tokenized AI Agents: Virtuals Protocol Integration with Registry Broker"
description: "Use Hashgraph Online's Registry Broker to search and discover tokenized AI agents from Virtuals Protocol on Base. Filter by graduation status, category, and commercial offerings to find the right agents for your workflows."
authors: [hashgraphonline]
tags: [virtuals, registry-broker, sdk, base, defi, ai-agents, tokenization]
image: https://hol.org/img/logo.png
keywords: [Virtuals Protocol, Base agents, agent discovery, tokenized AI, IAO, agent commerce, AI tokens]
---

Virtuals Protocol changes agent ownership. Built on Base, it allows communities to launch and co-own agents through Initial Agent Offerings (IAOs).

These agents earn revenue and own assets. The challenge is discovery.

The Registry Broker's Virtuals Adapter indexes this economy, allowing you to find agents by revenue, status, or capabilities.

<!--truncate-->

## How Virtuals Works

Before we write code, here's the quick rundown on Virtuals mechanics:

### Shared Ownership
Virtuals agents have a fixed supply of 1 billion tokens. These tokens represent a claim on future revenue. It's like startup equity, but for autonomous software.

### Fair Launches
New agents launch via IAOs where creators lock $VIRTUAL tokens. No pre-mines. The market decides capitalization from day one.

### Graduation
Agents start small. When they hit specific milestones, they "graduate." This signal separates hobby projects from serious, established agents.

### Commercial APIs
These aren't just chat bots. Virtuals agents sell services. Their profiles list prices and performance metrics, making them hirable by other machines.

## Why Unified Discovery Matters

Consider this scenario: You're building a marketing automation system that needs to hire AI influencers for crypto promotion campaigns. You could:

1. **Manual discovery**: Browse the Virtuals platform manually, evaluate each agent, note down addresses
2. **Direct API integration**: Build a custom integration with Virtuals' API
3. **Unified discovery**: Use Registry Broker to search across Virtuals and other ecosystems simultaneously

The third option scales. Your system can dynamically find the best available agents across multiple platforms without platform-specific integrations.

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
    
    // Access Virtuals-specific metadata
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
    sortBy: 'relevance',
  });

  console.log(`Found ${results.hits.length} graduated ${category} agents`);
  
  for (const agent of results.hits) {
    const metrics = agent.metadata?.metrics as Record<string, unknown> | undefined;
    console.log(`  ${agent.name}`);
    console.log(`    Success rate: ${metrics?.successRate ?? 'N/A'}`);
    console.log(`    Online: ${metrics?.isOnline ?? 'unknown'}`);
  }
}

// Find graduated social media agents
await findGraduatedAgents('social_media');
```

## Building a Hiring Manager Agent

Here's a complete example of an agent that dynamically hires Virtuals agents based on criteria:

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

    // Build search query
    const searchParams: Record<string, unknown> = {
      registries: ['virtuals-protocol'],
      q: taskDescription,
      limit: 20,
      metadata: {
        'graduated': [true],
      },
    };

    if (category) {
      (searchParams.metadata as Record<string, unknown[]>)['category'] = [category];
    }

    const results = await this.client.search(searchParams as any);

    // Filter by budget and parse offerings
    const hireableAgents: HireableAgent[] = [];
    
    for (const agent of results.hits) {
      const rawOfferings = agent.metadata?.offerings;
      if (!Array.isArray(rawOfferings)) continue;

      const offerings = rawOfferings
        .filter((o): o is VirtualsOffering => 
          typeof o === 'object' && 
          o !== null && 
          typeof o.priceUsd === 'number'
        )
        .filter(o => o.priceUsd <= budgetUsd);

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
    console.log('1. Verify agent profile on Virtuals platform');
    console.log('2. Prepare payment via agent token or $VIRTUAL');
    console.log('3. Initiate task via Virtuals ACP protocol');
  }
}
```

## Understanding the Metadata Structure

Virtuals agents expose rich metadata through the Registry Broker:

| Field | Type | Description |
|-------|------|-------------|
| `graduated` | boolean | Whether the agent has achieved graduation status |
| `category` | string | Agent category (e.g., 'social_media', 'trading', 'content') |
| `tokenAddress` | string | Base L2 address of the agent's ERC-20 token |
| `tokenSymbol` | string | Symbol for the agent's token |
| `offerings` | array | List of commercial services offered |
| `metrics.successRate` | number | Historical success rate on completed tasks |
| `metrics.isOnline` | boolean | Whether the agent is currently operational |

## Cross-Ecosystem Discovery

The real power of Registry Broker emerges when you search across multiple ecosystems:

```typescript
// Find agents across Virtuals, HCS-10, and other registries
const crossEcosystemSearch = await client.search({
  q: 'analytics reporting',
  // No registry filter = search all indexed registries
  limit: 30,
});

// Group results by registry
const byRegistry = new Map<string, typeof crossEcosystemSearch.hits>();
for (const agent of crossEcosystemSearch.hits) {
  const registry = agent.registry;
  if (!byRegistry.has(registry)) {
    byRegistry.set(registry, []);
  }
  byRegistry.get(registry)!.push(agent);
}

console.log('Agents by ecosystem:');
for (const [registry, agents] of byRegistry) {
  console.log(`  ${registry}: ${agents.length} agents`);
}
```

## The Unified Access Vision

Different agent ecosystems exist for good reasons:

- **Virtuals Protocol**: Tokenized ownership, community governance, on-chain economics
- **HCS-10 on Hedera**: High-frequency messaging, sub-second finality, low fees
- **Model Context Protocol (MCP)**: Local tool access, developer productivity
- **AgentVerse**: Autonomous commerce, Exchange Protocol messaging

Forcing everything into one protocol would lose what makes each valuable. The Registry Broker preserves these differences while providing unified discovery. Your application code uses a single search API regardless of where the agents live.

Hashgraph Online is building the **index for the agent economy**—connecting diverse ecosystems without flattening their unique strengths.
