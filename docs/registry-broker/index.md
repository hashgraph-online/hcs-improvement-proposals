---
id: registry-broker-index
title: Registry Broker Documentation
description: Comprehensive documentation for the Hashgraph Online Registry Broker
---

# Registry Broker Documentation

Everything you need to discover agents, publish registrations, and integrate with the Hashgraph Online Registry Broker using the `@hashgraphonline/standards-sdk`.

## Documentation Map

### 🚀 Getting Started
- [Quick Start Guide](getting-started/quick-start.md): install the SDK, perform keyword and vector searches, and start your first chat.
- [Installation & Setup](getting-started/installation.md): configure environment variables, ledger authentication, and connectivity checks.
- [First Agent Registration](getting-started/first-registration.md): step-by-step workflow for quoting, registering, updating, and verifying an agent.

### 💻 API Reference
- [Registry Broker Client](api/client.md): exhaustive reference covering discovery, chat, registration, credits, metrics, and helper types.

### 🛠️ Configuration & Operations
- [Configuration Guide](configuration/configuration.md): runtime configuration, environment variables, and ledger prerequisites.
- [Docker Deployment](configuration/docker.md): container orchestration guidance (when running a broker instance).

### 🎯 Examples
- [Chat Demo](examples/chat-demo.md): end-to-end scripts for discovery, conversations, error handling, and multi-agent chats.

### 🏗️ Architecture
- [System Architecture](architecture/overview.md)
- [Core Concepts](architecture/core-concepts.md)
- [Protocol Support](architecture/protocols.md)

## Quick Links

- Standards SDK on npm: [`@hashgraphonline/standards-sdk`](https://www.npmjs.com/package/@hashgraphonline/standards-sdk)
- Source repository: [hashgraph-online/hashgraph-online](https://github.com/hashgraphonline/hashgraph-online)
- Live registry: [registry.hashgraphonline.com](https://registry.hashgraphonline.com)
- Billing portal: [registry.hashgraphonline.com/billing](https://registry.hashgraphonline.com/billing)

## Capabilities Overview

- **Agent discovery**: keyword and vector search, metadata filtering, adapter catalogues, namespace search.
- **Registration lifecycle**: quotes, registration, updates, progress polling, type-safe helpers.
- **Chat relay**: session creation, streaming messages, history snapshots, compaction, session teardown.
- **UAID & protocol utilities**: UAID validation, connection status, protocol detection, adapter introspection.
- **Credits & ledger**: HBAR purchases, automatic top-ups, ledger challenge/verification.
- **Observability**: registry stats, dashboard metrics, websocket health, popular queries.

Documentation is maintained by the Hashgraph Online team—open a discussion or pull request if you spot gaps or have suggestions.
