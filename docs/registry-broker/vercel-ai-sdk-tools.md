---
title: Vercel AI SDK Tools
description: Integrate Registry Broker discovery and chat workflows into Vercel AI SDK tools for production agent runtimes.
---

# Vercel AI SDK Tools

This guide shows how to expose Registry Broker capabilities as Vercel AI SDK tools so your application can discover, select, and invoke agents during a model run. The goal is practical integration: a user asks for an outcome, your model calls a tool, and the tool executes against the Registry Broker with policy controls.

Use this page when you need an implementation reference that is specific enough to copy into your stack and broad enough to support multiple agent protocols.

## Why this integration matters

Vercel AI SDK is often the fastest path from prototype to production for tool-calling applications. Pairing it with Registry Broker tools gives you:

- protocol-aware discovery (`search`, `resolve`) instead of static hardcoded agent IDs
- deterministic policy checks (trust score, registry, protocol) before invocation
- one shared implementation pattern for chat, discovery, and registration flows
- a linkable integration page you can reference from architecture docs and onboarding runbooks

## Prerequisites

- `@hashgraphonline/standards-sdk` configured with your broker API key
- a server runtime where your Vercel AI SDK route handlers execute
- a policy object defining allowed registries/protocols and trust thresholds

Related docs:

- [Search & Discovery](/docs/registry-broker/search)
- [Chat Guide](/docs/registry-broker/chat)
- [Multi-Protocol Chat](/docs/registry-broker/multi-protocol-chat)

## Integration pattern

The simplest production pattern is a two-tool flow:

1. `discoverAgents` tool performs a constrained search.
2. `chatAgent` tool sends a message to a selected UAID.

The model never gets direct infrastructure access. It gets typed tools with bounded inputs.

```ts
import { tool } from 'ai';
import { z } from 'zod';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  network: 'mainnet',
});

const discoverAgents = tool({
  description: 'Find agents for a user task with policy filters',
  parameters: z.object({
    query: z.string().min(2),
    protocol: z.enum(['mcp', 'a2a', 'x402']).optional(),
  }),
  execute: async ({ query, protocol }) => {
    const result = await client.search({
      q: query,
      protocols: protocol ? [protocol] : undefined,
      minTrust: 70,
      limit: 8,
      sortBy: 'trust-score',
    });

    return result.hits.map((hit) => ({
      name: hit.name,
      uaid: hit.uaid,
      trustScore: hit.trustScore,
      registry: hit.registry,
      protocol: hit.metadata?.protocol ?? null,
    }));
  },
});
```

```ts
const chatAgent = tool({
  description: 'Send a message to a selected UAID',
  parameters: z.object({
    uaid: z.string(),
    message: z.string().min(1),
  }),
  execute: async ({ uaid, message }) => {
    const session = await client.chat.createSession({ uaid });
    const reply = await client.chat.sendMessage({
      sessionId: session.sessionId,
      uaid,
      message,
    });

    return {
      sessionId: session.sessionId,
      response: reply.response,
    };
  },
});
```

## Production hardening checklist

- enforce protocol allowlists per route
- gate tool outputs with minimum trust requirements
- persist UAID + decision metadata for auditability
- apply timeout and retry policy around chat operations
- log token and request costs separately from model usage
