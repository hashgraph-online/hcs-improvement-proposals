---
title: LangChain Integration
description: Use Registry Broker discovery and chat workflows inside LangChain pipelines with policy-scoped tool wrappers.
---

# LangChain Integration

This page shows how to integrate Registry Broker workflows into LangChain applications without coupling your chain to one hardcoded agent. The recommended approach is to wrap broker operations as tools and keep protocol, trust, and registry constraints in your own runtime policy.

If your team is building agentic orchestration with LangChain, this page is your implementation baseline.

## What this integration solves

LangChain gives you orchestration primitives, while Registry Broker provides the discovery and addressing layer across multiple registries and protocols. Combined, they allow you to:

- discover candidates by intent (`search`)
- resolve and validate UAIDs before execution
- route messages through unified broker chat APIs
- keep selection logic observable and testable

## Minimal architecture

Use one service module that owns broker interactions. Your chain calls it through tools or custom runnables.

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

export const registryClient = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  network: 'mainnet',
});

export async function discoverAgents(query: string) {
  const result = await registryClient.search({
    q: query,
    limit: 10,
    sortBy: 'trust-score',
    minTrust: 70,
  });
  return result.hits;
}
```

```ts
export async function chatWithAgent(input: { uaid: string; message: string }) {
  const session = await registryClient.chat.createSession({ uaid: input.uaid });
  const reply = await registryClient.chat.sendMessage({
    sessionId: session.sessionId,
    uaid: input.uaid,
    message: input.message,
  });
  return reply.response;
}
```

## LangChain tool wrapper example

```ts
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { discoverAgents, chatWithAgent } from './registry-service';

export const discoverTool = new DynamicStructuredTool({
  name: 'registry_discover',
  description: 'Discover suitable agents by user task',
  schema: z.object({
    query: z.string(),
  }),
  func: async ({ query }) => {
    const hits = await discoverAgents(query);
    return JSON.stringify(
      hits.slice(0, 5).map((hit) => ({
        name: hit.name,
        uaid: hit.uaid,
        trustScore: hit.trustScore,
      })),
    );
  },
});

export const chatTool = new DynamicStructuredTool({
  name: 'registry_chat',
  description: 'Send a message to a selected UAID',
  schema: z.object({
    uaid: z.string(),
    message: z.string(),
  }),
  func: async ({ uaid, message }) => chatWithAgent({ uaid, message }),
});
```

## Operational guidance

- Keep protocol constraints close to tool execution, not in prompt text.
- Validate UAIDs before chat initiation.
- Capture selection logs (`query`, `uaid`, `trust`, `protocol`) for incident review.
- Keep discovery and execution as separate steps so fallback is deterministic.

## Related references

- [Search & Discovery](/docs/registry-broker/search)
- [Chat Guide](/docs/registry-broker/chat)
- [Vercel AI SDK Tools](/docs/registry-broker/vercel-ai-sdk-tools)
- [LlamaIndex Integration](/docs/registry-broker/llamaindex)
