---
slug: registry-broker-alpha
title: 'Registry Broker Alpha: The Agentic Web Starts Here'
description: "Hashgraph Online's Registry Broker is live—a universal discovery layer for AI agents across Virtuals, A2A, ERC-8004, x402, and more. One API to search, resolve UAIDs, and route chats across protocols."
authors: [kantorcodes]
tags: [ai, agents, standards, hedera, hcs, registry-broker]
date: 2025-10-09
---

Hashgraph Online’s Registry Broker is live because the writing is on the wall. We are still early in the agent economy, but the signal is clear: [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004) gives Ethereum-based projects a formal registry spec, NEAR’s [Agent Interaction & Transaction Protocol (AITP)](https://aitp.dev/) is in draft to connect their agents, Google is running an [Agent-to-Agent preview inside Workspace](https://workspace.google.com/blog/ai-and-ml/introducing-agent-to-agent), Coinbase is curating AI services through [x402 Bazaar](https://www.coinbase.com/blog/x402-bazaar), and OpenAI turned its GPT ecosystem into a searchable [agent storefront](https://openai.com/blog/introducing-the-gpt-store). Even the Agent Facts community behind NANDA publishes structured profiles at [List39](https://list39.org/). Every major network is building or considering its own directory or protocol. If we wait until all of them are entrenched, the open agentic web becomes a stack of incompatible registries. We built the broker now so builders have a neutral discovery layer before fragmentation hardens.

<!--truncate-->

## The World We’re Shipping Into

We moved from “can anyone ship an agent?” to “how do we keep track of them?” Conversations with builders still feel early, but the requirement list is emerging:

- Standards like ERC-8004 introduce registry schemas that need to line up with existing identifiers.
- Protocol efforts such as NEAR’s AITP and Anthropic’s [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) aim to normalize transport, yet leave discovery up to each ecosystem.
- Commercial directories, from OpenAI’s GPT Store to Coinbase’s x402 Bazaar, expect developers to publish metadata in platform-specific formats.
- Agent Facts registries (for example, [List39](https://list39.org/)) experiment with JSON-LD fact sheets that live outside traditional chains.

The point isn’t that the ecosystem is already splintered beyond repair. It’s that the splintering is accelerating, and we have one shot to keep discovery open. Registry Broker gives us a single surface to answer the baseline questions: *Which agent is this? Where does it live? Who operates it? Can we trust the metadata enough to build on top of it?*

## What the Broker Delivers Today

- **One crawl across today’s registries.** Registry Broker already pulls from [Virtuals Protocol](https://virtuals.io/), Google A2A, ERC-8004-compatible sources, Coinbase x402 Bazaar, OpenConvAI, OpenRouter, NANDA, and the registries we operate internally. Adapters let us keep pace as new ecosystems come online.
- **A single standards-based API.** Instead of juggling divergent schemas, the broker exposes one REST and WebSocket interface anchored in HCS-2 registry entries. Query once, receive a normalized profile with trust context and similarity matches.
- **Universal Agent IDs.** We issue or map HCS-14 Universal Agent IDs so agents keep a consistent identity whether they are indexed on Hedera, Web2 catalogs, or EVM registries.
- **Auditable history where registries support it.** When a network publishes verifiable proofs such as the HCS-2 messages behind OpenConvAI, the broker surfaces the topic, sequence, and transaction IDs alongside the agent profile. For registries that are still experimental, we retain signed metadata, timestamps, and source links so operators can cross-check what they see.
- **Search that understands context.** Elasticsearch powers structured filters while EmbeddingGemma provides semantic ranking locally, no third-party key required. Builders get immediate reach into the agents that matter.

## Why the World Needs It Now

Fragmentation rewards whoever locks down distribution first. Open registries only succeed if discovery stays open alongside them. The broker makes that possible:

- **Builders** can launch once, attach a UAID, and trust partners to resolve their agent without writing bespoke integration guides.
- **Marketplaces** can ingest entire ecosystems without re-implementing every schema, keeping catalogs fresher with less overhead.
- **Auditors and compliance teams** gain verifiable trails instead of screenshots, so agent due diligence looks like the rest of enterprise procurement.
- **Ecosystems** can prove their registry interops on day one, meeting developers where they already work.

If we don’t solve discovery together, every network ends up reinventing the same indexing stack, wasting capital and inviting walled gardens. With a broker, registries become peers in a federated search layer that anyone can extend.

## How Teams Put It to Work

1. **Agent builders** can list an agent anywhere the broker crawls, or register directly through our endpoints, then surface one UAID that travels with them whatever directory they show up in.
2. **Analytics and discovery teams** subscribe to the WebSocket feed to spot new launches, analyze registry growth, and surface trends.
3. **Security and trust platforms** correlate on-chain proofs, signed metadata, and registry responses to flag duplication or suspicious changes.
4. **Enterprises** wire the broker API into procurement flows so new agents meet policy and compliance requirements before they go live.

## Where We’re Digging Next

- **A2A-native routing.** Google’s A2A preview is a clear sign that major platforms will expect agent registries to speak their dialect. We are expanding our adapters so the broker can translate between existing MCP flows and the A2A request/response model without forking integrations.
- **Agent Facts ingestion.** Communities like List39 are publishing machine-readable fact sheets. We’re prototyping ingestion pipelines that verify signatures, normalize capability taxonomies, and keep Agent Facts linked to UAIDs so third parties can trace provenance.

## Where We Go From Here

Registry Broker Alpha is the foundation. We’ll keep expanding adapter coverage, shipping SDK patterns, and dropping tutorials that make integration painless. The on-chain internet is forming quickly. If discovery stays open, builders, not gatekeepers, will define it. The broker keeps that door open by default.

Hashgraph Online’s Registry Broker is live at [https://hol.org/registry](https://hol.org/registry). Use it, pressure test it, and tell us which registry you want to see next. The sooner we connect every directory, the sooner agents can participate in a real, global marketplace.
