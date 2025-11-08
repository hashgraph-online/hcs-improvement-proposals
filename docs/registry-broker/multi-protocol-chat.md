---
title: Multi-Protocol Chat Examples
description: Learn how to reach different agent adapters (ERC-8004, Agentverse, OpenRouter) through Registry Broker.
---

import SupportedProtocols from '@site/src/components/SupportedProtocols';

# Multi-Protocol Chat Examples

Use the Registry Broker to reach agents across protocol adapters. The SDK demos (`demo/registry-broker`) showcase each workflow in detail; this guide summarizes the entry points.

## Talk to an ERC-8004 Agent

1. Run [`demo/registry-broker/registry-broker-erc8004-demo.ts`](https://github.com/hashgraphonline/hashgraph-online/blob/main/standards-sdk/demo/registry-broker/registry-broker-erc8004-demo.ts) to register an ERC-8004 agent and record its UAID.
2. Use `client.chat.createSession({ uaid })` with the recorded UAID.
3. Send messages via `client.chat.sendMessage(...)` as shown in the demo to move intent through the ERC-8004 adapter.

## Talk to an OpenRouter Agent

1. Run [`demo/registry-broker/openrouter-chat.ts`](https://github.com/hashgraphonline/hashgraph-online/blob/main/standards-sdk/demo/registry-broker/openrouter-chat.ts) to discover the OpenRouter UAID (same UAID is used in this doc).
2. Set `OPENROUTER_API_KEY` and call `client.chat.createSession({ uaid, auth: { type: 'bearer', token: process.env.OPENROUTER_API_KEY! } })`.
3. Push prompts with `client.chat.sendMessage(...)` and watch the broker mediate the OpenRouter response.

## Talk to an Agentverse Agent

1. The multi-agent demo [`demo/registry-broker/registry-broker-agentverse-demo.ts`](https://github.com/hashgraphonline/hashgraph-online/blob/main/standards-sdk/demo/registry-broker/registry-broker-agentverse-demo.ts) registers two Agentverse agents via the registry.
2. Use the UAIDs returned by that demo and create a session per UAID.
3. The demo already contains the message loop; reuse it to observe multi-agent conversation flow.

## Agentverse + ERC-8004 in One Shot

[`demo/registry-broker/registry-broker-demo.ts`](https://github.com/hashgraphonline/hashgraph-online/blob/main/standards-sdk/demo/registry-broker/registry-broker-demo.ts) orchestrates ERC-8004, Agentverse, OpenRouter, and history flows from a single run. Use it as a reference for stitching together multiple adapters.

## Resources

- [Standards SDK registry broker demos](https://github.com/hashgraphonline/hashgraph-online/tree/main/standards-sdk/demo/registry-broker) (ERC-8004, OpenRouter, Agentverse, history, ledger auth).
- [Chat Guide](chat.md) for session/messaging/history examples in code snippets.

<SupportedProtocols />
