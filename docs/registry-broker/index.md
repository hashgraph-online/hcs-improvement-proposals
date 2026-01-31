---
title: Registry Broker Documentation
description: Comprehensive documentation for the Hashgraph Online Registry Broker
---

# Registry Broker Documentation

Everything you need to discover agents, publish registrations, and integrate with the Hashgraph Online Registry Broker using the `@hashgraphonline/standards-sdk`.

### Libraries
- Standards SDK client: [`@hashgraphonline/standards-sdk`](/docs/libraries/standards-sdk/registry-broker-client)
- Hedera Agent Kit plugin: [`@hol-org/rb-hak-plugin`](/docs/libraries/standards-agent-kit/registry-broker-plugin)


### Getting Started
- [Quick Start Guide](getting-started/quick-start.md): install the SDK, perform keyword and vector searches, and start your first chat.
- [Installation & Setup](getting-started/installation.md): configure environment variables, ledger authentication, and connectivity checks.
- [First Agent Registration](getting-started/first-registration.md): step-by-step workflow for quoting, registering, updating, and verifying an agent.

### Search & Discovery
- [Search & Discovery Guide](search.md): keyword search, vector search, namespace queries, and catalog data.
- [ERC-8004 on Solana (Devnet)](erc-8004-solana.md): discover and publish Solana devnet ERC-8004 agents, including chat-ready UAIDs.
- [Virtuals Protocol (ACP)](virtuals-protocol.md): discover Virtuals agents and run ACP jobs with payment approval.


### API Reference
- [Registry Broker Client](/docs/registry-broker/api/client): exhaustive reference covering discovery, chat, registration, credits, metrics, and helper types.

### Operations
- [Ledger Authentication & Credits](ledger-auth-credits.md): challenge flow, auto top-ups, and manual purchases.
- [Content Inscription](content-inscription.md): inscribe files and data on HCS using registry credits.

### MCP Servers
- [Hashnet MCP Server](mcp-server.md): configure transports (stdio, HTTP/SSE), tooling, and workflows to bridge Registry Broker from any MCP-compatible IDE or agent runtime.

### Chat & Tutorials
- [Chat Guide](chat.md): consolidated discovery, UAID targeting, and chat relay instructions (replaces the legacy chat demo).
- [Multi-Protocol Chat](multi-protocol-chat.md): adapter-specific snippets for ERC-8004, Agentverse, AgentID, and more.
- [Agent Feedback (ERC-8004)](feedback.md): submit and read on-chain feedback via the broker after a chat session.
- [XMTP Integration](xmtp.md): register XMTP agents, relay chat through the broker, and combine with encrypted chat history.
- [Encrypted Chat](encrypted-chat.md): configure server-blind conversations, register keys, and decrypt history via the SDK.

## Quick Links

- Standards SDK on npm: [`@hashgraphonline/standards-sdk`](https://www.npmjs.com/package/@hashgraphonline/standards-sdk)
- Live registry: [https://hol.org/registry](https://hol.org/registry)
- Billing portal: [https://hol.org/registry/billing](https://hol.org/registry/billing)
- Standards SDK demos: [registry-broker scripts](https://github.com/hashgraph-online/standards-sdk/tree/main/demo/registry-broker)

## Capabilities Overview

- **Agent discovery**: keyword and vector search, metadata filtering, adapter catalogues, namespace search.
- **Registration lifecycle**: quotes, registration, updates, progress polling, type-safe helpers.
- **Chat relay**: session creation, streaming messages, history snapshots, compaction, session teardown.
- **UAID & protocol utilities**: UAID validation, connection status, protocol detection, adapter introspection.
- **Credits & ledger**: HBAR purchases, automatic top-ups, ledger challenge/verification.
- **Observability**: registry stats, dashboard metrics, and popular queries.

Documentation is maintained by the Hashgraph Online team—open a discussion or pull request if you spot gaps or have suggestions.
