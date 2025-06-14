---
sidebar_position: 1
---

# Hashgraph Online Standards SDK

The Hashgraph Online Standards SDK provides a complete implementation of the Hashgraph Consensus Standards (HCS) protocols, giving developers all the tools needed to build applications on Hedera.

## What This SDK Does

- **Implements HCS Protocols** - Provides full implementations of standards at Hashgraph Online
- **Simplifies Complex Interactions** - Handles protocol details through clean interfaces and developer-friendly APIs
- **Enables Cross-Platform Development** - Works across Node.js, browsers, and edge runtimes

## Getting Started

### Installation

```bash
# Using npm
npm install @hashgraphonline/standards-sdk

# Using yarn
yarn add @hashgraphonline/standards-sdk

# Using pnpm
pnpm add @hashgraphonline/standards-sdk
```

### Quick Example

Here's how to inscribe text data on Hedera using the SDK:

```typescript
import { inscribe } from '@hashgraphonline/standards-sdk';

async function inscribeText() {
  const result = await inscribe(
    {
      type: 'text',
      content: 'Hello, Hedera!',
      fileName: 'greeting.txt',
    },
    {
      network: 'testnet',
      accountId: '0.0.123456',
      privateKey: 'your-private-key',
    }
  );

  console.log(`Inscription successful on topic ${result.topicId}`);
  console.log(`Transaction ID: ${result.transactionId}`);
}

inscribeText().catch(console.error);
```

## Key Capabilities

### HCS-1: File Data Management

The foundation for storing and retrieving file data on Hedera:

- Split large files into manageable chunks
- Store content on Hedera with metadata
- Retrieve and reconstruct files from the network

[Learn about inscription tools →](./inscribe.md)

### HCS-3: Recursion

Reference and load resources across the graph:

- Create references to other on-chain resources
- Securely verify resource integrity
- Compose complex data structures

[Explore HCS-3 features →](./hcs-3.md)

### HCS-7: Dynamic Assets

Build programmable on-graph assets:

- Create assets with state and behaviors
- Execute state transitions securely
- Manage asset ownership and transfers

[Discover dynamic assets →](./hcs-7.md)

### HCS-10: Agent Communication

Enable secure AI agent communication:

- Register agents on the Hedera Hashgraph
- Establish secure communication channels
- Exchange messages between agents

[View agent communication →](./hcs-10)

### HCS-11: Identity Profiles

Implement decentralized identity management:

- Create and manage identity profiles
- Verify identities securely
- Link profiles to Hedera accounts

[Learn about identity management →](./hcs-11.md)

## Technical Benefits

- **Type Safety** - Full TypeScript support with comprehensive type definitions
- **Modular Architecture** - Import only the components you need
- **Consistent Interfaces** - Common patterns across all standards
- **Developer Utilities** - Helper functions for common operations
- **Clean Abstractions** - Implementation details hidden behind intuitive APIs
- **Custom Mirror Node Support** - Integration with third-party mirror node providers

## Community and Support

- [Join our Telegram](https://t.me/hashinals) for community discussion
- [Follow us on Twitter](https://twitter.com/hashgraphonline) for updates
- [View the source code](https://github.com/hashgraph-online/standards-sdk) on GitHub

---
