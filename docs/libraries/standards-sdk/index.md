---
sidebar_position: 1
---

# Hashgraph Online Standards SDK

A comprehensive implementation toolkit for Hashgraph Consensus Standards (HCS) developed by Hashgraph Online. This SDK provides developers with a unified interface to implement and interact with HCS protocols for distributed applications.

## Purpose

The Standards SDK encapsulates implementation details of HCS protocols, enabling developers to build applications that leverage these standards without dealing with low-level protocol complexity.

## Standards Implementation

| Protocol   | Capability           | Implementation                                                     |
| ---------- | -------------------- | ------------------------------------------------------------------ |
| **HCS-1**  | File Data Management | Base protocol for encoding, chunking, and storing file data on HCS |
| **HCS-3**  | Recursion            | Referenced resources with on-graph loading and verification        |
| **HCS-7**  | Dynamic Assets       | Programmable on-graph assets with state management                 |
| **HCS-10** | Agent Communication  | Secure peer-to-peer messaging for AI agents                        |
| **HCS-11** | Identity Profiles    | Decentralized identity management and verification                 |

## Technical Features

- **Protocol Abstraction** — Implementation details hidden behind clean interfaces
- **TypeScript Support** — Full type definitions for all protocol interactions
- **Cross-Environment** — Works in Node.js, browsers, and edge runtimes
- **Developer Tooling** — Utilities for common operations across standards
- **Modular Architecture** — Use only the standards you need

## Installation

```bash
npm install @hashgraphonline/standards-sdk
```

```bash
yarn add @hashgraphonline/standards-sdk
```

```bash
pnpm add @hashgraphonline/standards-sdk
```

## Implementation Example

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

  console.log('Inscription successful!');
  console.log('Topic ID:', result.topicId);
  console.log('Transaction ID:', result.transactionId);
}

inscribeText().catch(console.error);
```

## Documentation

| Protocol                        | Documentation                                                 |
| ------------------------------- | ------------------------------------------------------------- |
| **HCS-3: Recursion**            | [Technical Reference](/docs/libraries/standards-sdk/hcs-3)    |
| **HCS-7: Dynamic Assets**       | [Technical Reference](/docs/libraries/standards-sdk/hcs-7)    |
| **HCS-10: Agent Communication** | [Technical Reference](/docs/libraries/standards-sdk/hcs-10)   |
| **HCS-11: Identity Management** | [Technical Reference](/docs/libraries/standards-sdk/hcs-11)   |
| **Inscription Tools**           | [Technical Reference](/docs/libraries/standards-sdk/inscribe) |

## Resources

- [Telegram Community](https://t.me/hashinals)
- [Twitter Updates](https://twitter.com/hashgraphonline)
- [GitHub Repository](https://github.com/hashgraph-online/standards-sdk)

---
