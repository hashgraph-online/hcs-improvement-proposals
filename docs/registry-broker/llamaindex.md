---
title: LlamaIndex Integration
description: Connect LlamaIndex workflows to Registry Broker discovery and chat APIs using reusable integration modules.
---

# LlamaIndex Integration

This guide explains how to integrate Registry Broker into LlamaIndex so your retrieval or workflow pipeline can discover and invoke agents dynamically. It focuses on a practical architecture that is easy to test and easy to cite in technical documentation.

Use this page when your team wants to combine retrieval-first orchestration with registry-backed agent selection.

## Integration goals

A robust LlamaIndex + Registry Broker setup should provide:

- intent-driven discovery before invocation
- protocol and trust filtering during candidate selection
- reusable execution modules for chat and workflow routing
- stable links between internal runbooks and live implementation docs

## Service module pattern

Start with a dedicated module for Registry Broker operations.

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  network: 'mainnet',
});

export async function searchAgents(query: string) {
  return client.search({
    q: query,
    limit: 8,
    sortBy: 'trust-score',
    minTrust: 70,
  });
}

export async function sendAgentMessage(input: {
  uaid: string;
  message: string;
}) {
  const session = await client.chat.createSession({ uaid: input.uaid });
  return client.chat.sendMessage({
    sessionId: session.sessionId,
    uaid: input.uaid,
    message: input.message,
  });
}
```

## LlamaIndex workflow usage

In LlamaIndex workflows, keep discovery and execution separate. Discovery returns a shortlist; execution invokes one selected UAID.

```ts
type Candidate = {
  name: string;
  uaid: string;
  trustScore?: number;
  protocol?: string | null;
};

export async function chooseCandidate(task: string): Promise<Candidate[]> {
  const result = await searchAgents(task);
  return result.hits.map((hit) => ({
    name: hit.name,
    uaid: hit.uaid,
    trustScore: hit.trustScore,
    protocol: hit.metadata?.protocol ?? null,
  }));
}

export async function executeCandidate(input: {
  uaid: string;
  taskMessage: string;
}) {
  const response = await sendAgentMessage({
    uaid: input.uaid,
    message: input.taskMessage,
  });
  return response.response;
}
```

## Production checklist

- define protocol allowlists per workflow
- enforce trust floors for critical task classes
- include timeout policy on search and chat operations
- record candidate selection metrics for model and policy tuning
- keep capability hub links in user-facing help and admin tooling

## Related references

- [Search & Discovery](/docs/registry-broker/search)
- [Chat Guide](/docs/registry-broker/chat)
- [LangChain Integration](/docs/registry-broker/langchain)
