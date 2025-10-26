---
title: Browser — Wallet Integrations
description: Manage HCS‑7 registries from dapps using `HCS7BrowserClient` and Hashinals WalletConnect.
sidebar_position: 3
---

The browser client mirrors the Node API but delegates all signing to WalletConnect, making it safe for user-facing portals.

## 1. Install Dependencies

```bash
npm install @hashgraphonline/standards-sdk @hashgraphonline/hashinal-wc
```

## 2. Connect the Wallet

```ts
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';

const hwc = new HashinalsWalletConnectSDK({ projectId: '<walletconnect>' });
await hwc.connect(); // prompts the user to pick an account
```

## 3. Instantiate `HCS7BrowserClient`

```ts
import { HCS7BrowserClient, HCS7ConfigType } from '@hashgraphonline/standards-sdk';

const hcs7 = new HCS7BrowserClient({
  network: 'testnet',
  hwc,
});
```

If no wallet session exists, `ensureConnected()` throws with `"No active wallet connection"` so you can show a reconnect button.

## 4. Create a Registry from the Browser (Optional)

```ts
const registry = await hcs7.createRegistry({ ttl: 86_400 });
if (!registry.success) {
  toast.error(registry.error);
}
```

Topic creation uses the connected account’s signing key, so the wallet will prompt for approval.

## 5. Register Configurations and Metadata

```ts
await hcs7.registerConfig({
  registryTopicId: registry.topicId!,
  memo: 'minted counter',
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

await hcs7.registerMetadata({
  registryTopicId: registry.topicId!,
  metadataTopicId: '0.0.3717746',
  memo: 'purple-phase-art',
  weight: 1,
  tags: ['even'],
});
```

Each call automatically validates the payload and sends `submitMessageToTopic` through WalletConnect. The wallet UI displays the topic memo + tx memo so users can verify what they are signing.

## 6. Reading Registries in the Browser

`HCS7BrowserClient` inherits `getRegistry()` from the base client, so you can render dashboards without server hops:

```ts
const registryView = await hcs7.getRegistry('0.0.10058300', { limit: 100 });
setState(registryView.entries);
```

## 7. Pair With Bridges When Needed

When you need live previews (e.g., show the WASM router’s current selection), you can still run the bridges client-side:

```ts
import { EVMBridge, WasmBridge } from '@hashgraphonline/standards-sdk/hcs-7';

const evm = new EVMBridge('testnet');
const wasm = new WasmBridge();
```

For security, only expose read-only operations in the browser; keep privileged writes and caching on the server side.
