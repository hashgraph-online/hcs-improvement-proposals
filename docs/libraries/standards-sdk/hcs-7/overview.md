---
title: Overview
sidebar_position: 1
---

# HCS‑7 Smart Hashinals in the Standards SDK

The HCS‑7 module in `@hashgraphonline/standards-sdk` lets you register, orchestrate, and consume programmable hashinals that react to EVM smart contracts and WASM routing logic exactly as defined in the [HCS‑7 standard](/docs/standards/hcs-7). This page explains the moving parts exposed by the SDK and how to wire them together.

---

## Architecture at a Glance

| Layer | SDK Component | Role |
| --- | --- | --- |
| Registry management | `HCS7Client` (Node) / `HCS7BrowserClient` (WalletConnect) | Creates the `hcs-7:indexed:{ttl}` registry topic, registers EVM + WASM configs, and links metadata topics |
| Contract state | `EVMBridge` + optional `RedisCache` | Calls Hedera EVM contracts through the Mirror Node, decodes ABI responses, and caches results |
| WASM routing | `WasmBridge` | Loads the router module (e.g., topic `0.0.5269810`), builds the required JSON input, and executes `process_state` / `get_params` |
| Transaction helpers | `buildHcs7*` builders | Low‑level builders for custom HRL pipelines and agent/tool integrations |

You can use the high-level clients for most flows and drop down to the bridges/builders when composing bespoke workflows or integrating with other standards (HCS‑6/10/11/etc.).

---

## Installation

```bash
npm install @hashgraphonline/standards-sdk
```

---

## Quick Start (Node / Server)

```ts
import { HCS7Client, HCS7ConfigType } from '@hashgraphonline/standards-sdk';

const client = new HCS7Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});

const registry = await client.createRegistry({ ttl: 86_400, submitKey: true });
if (!registry.success || !registry.topicId) throw new Error(registry.error);

await client.registerConfig({
  registryTopicId: registry.topicId,
  memo: 'LaunchPage minted',
  config: {
    type: HCS7ConfigType.EVM,
    contractAddress: '0x1d67aaf7f7e8d806bbeba24c4dea24808e1158b8',
    abi: {
      name: 'minted',
      inputs: [],
      outputs: [{ name: '', type: 'uint64' }],
      stateMutability: 'view',
      type: 'function',
    },
  },
});

await client.registerMetadata({
  registryTopicId: registry.topicId,
  metadataTopicId: '0.0.3717738',
  memo: 'odd-phase-art',
  weight: 1,
  tags: ['odd'],
});

client.close();
```

---

## Quick Start (Browser / WalletConnect)

```ts
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import { HCS7BrowserClient } from '@hashgraphonline/standards-sdk';

const hwc = new HashinalsWalletConnectSDK({ projectId: '<walletconnect>' });
await hwc.connect(); // prompts the user

const client = new HCS7BrowserClient({ network: 'testnet', hwc });

await client.registerMetadata({
  registryTopicId: '0.0.10058300',
  metadataTopicId: '0.0.3717746',
  memo: 'purple-phase-art',
  weight: 1,
  tags: ['even'],
});
```

The browser client mirrors the Node API but pushes all signing through WalletConnect, making it safe for dapps and dashboards.

---

## When to Drop Down to the Bridges

- **Custom schedulers / agents**: Use `EVMBridge` + `WasmBridge` directly to assemble bespoke evaluation pipelines before writing to the registry.
- **Indexing / analytics**: Read registry messages with `HCS7BaseClient.getRegistry` and feed the payloads into your own storage or workflows.
- **Advanced caching**: Swap the default in-memory cache for `RedisCache` when calling the same contract functions across many routers.
- **Transaction-only stacks**: Use the `buildHcs7*` helpers to emit submit transactions from other standards (e.g., HCS‑10 agents) without instantiating the SDK clients.

---

## Demo + Toolkit

- `pnpm run demo:hcs-7:create` — creates a registry, registers the default LaunchPage EVM configs, WASM router (`0.0.5269810`), and odd/even metadata topics. Uses the credentials from `.env`.
- [`hcs-7-toolkit`](https://github.com/hashgraph-online/hcs-7-toolkit) — publishes the WASM binary and constants used by the demo. Swap the contract/WASM topic IDs there to stand up your own DSL.

The demo proves the full loop: registry creation → `register-config` messages → metadata routing via WASM → repeatable HRL lookups.

---

Continue with:

- [Node guide](./server.md) for end-to-end registry + bridge flows
- [Browser guide](./browser.md) for WalletConnect integrations
- [Transactions](./tx.md) for low-level builders
- [API reference](./api.md) for all exported types and classes
