---
title: Browser SDK
sidebar_position: 4
---

# HCS-21 Browser Client (`HCS21BrowserClient`)

`HCS21BrowserClient` wraps the Hashinals WalletConnect SDK so browser apps can build the entire HCS-21 stack—registry-of-registries topics, adapter category indexes, version pointers, and declarations—without exposing operator keys. Every helper mirrors the Node.js `HCS21Client`, but each transaction is signed through the connected wallet.

## Setup

```ts
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import {
  HCS21BrowserClient,
  HCS21TopicType,
  Logger,
} from '@hashgraphonline/standards-sdk';

const hwc = new HashinalsWalletConnectSDK({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
});

const browserClient = new HCS21BrowserClient({
  network: 'testnet',
  hwc,
});

const logger = new Logger({ module: 'hcs-21-browser', level: 'info' });
```

## Create layered registry topics

Assume you've already inscribed registry metadata via `client.inscribeMetadata` and stored the resulting pointer; the browser client can reuse it:

```ts
const registryTopicId = await browserClient.createRegistryTopic({
  ttl: 3600,
  indexed: 0,
  type: HCS21TopicType.ADAPTER_REGISTRY,
  metaTopicId: registryMetadata.pointer, // optional HCS-1 registry manifest
});

const discoveryTopicId = await browserClient.createRegistryDiscoveryTopic({
  ttl: 86400,
  memoOverride: 'hcs-21:0:86400:1', // optional explicit memo
});

const categoryTopicId = await browserClient.createAdapterCategoryTopic({
  ttl: 86400,
  metaTopicId: registryMetadata.pointer,
});

const versionPointerTopicId =
  await browserClient.createAdapterVersionPointerTopic({
    ttl: 3600,
    memoOverride: 'hcs-2:1:3600',
  });
```

`createRegistryTopic` and `createAdapterCategoryTopic` emit standard `hcs-21:<indexed>:<ttl>:<type>:<meta>` memos. The browser client automatically freezes/signs the topic creation transactions with the wallet account.

## Register discovery and category entries

```ts
await browserClient.registerCategoryTopic({
  discoveryTopicId,
  categoryTopicId,
  metadata: registryMetadata.pointer,
  memo: 'adapter-registry:price-feeds',
});

await browserClient.publishCategoryEntry({
  categoryTopicId,
  adapterId: 'npm/@hol-org/adapter-binance', // slug only; version lives in the pointer topic
  versionTopicId: versionPointerTopicId,
});

await browserClient.publishVersionPointer({
  versionTopicId,
  declarationTopicId: registryTopicId,
  memo: 'adapter:npm/@hol-org/adapter-binance',
});
```

The helper methods emit `hcs-2` `register` messages with the correct memo format. Use `publishVersionPointer` whenever you rotate an adapter declaration topic; the discovery entry remains stable.

## Publish an Adapter Declaration

```ts
const publishResult = await browserClient.publishDeclaration({
  topicId: registryTopicId,
  declaration: {
    op: 'register',
    adapterId: 'pypi/community/pga-tour-adapter@0.4.0',
    entity: 'dataset',
    adapterPackage: {
      registry: 'pypi',
      name: 'pga-tour-adapter',
      version: '0.4.0',
      integrity: 'sha384-demo-digest',
    },
    manifest: 'ipfs://bafy...adapter-manifest',
    manifestSequence: 15, // optional when HCS-1
    config: {
      type: 'flora',
      account: '0.0.700001',
      threshold: '2/3',
      ctopic: '0.0.700101',
      ttopic: '0.0.700102',
      stopic: '0.0.700103',
    },
    stateModel: 'hcs-21.dataset-consensus@1',
  },
});

console.log('Submitted declaration', publishResult.transactionId);
```

`publishDeclaration` returns the Hedera transaction ID plus the sequence number assigned to the message, making it easy to reconcile with mirror-node logs.

## Resolve pointers & fetch declarations

```ts
const { declarationTopicId } = await browserClient.resolveVersionPointer(
  versionPointerTopicId,
);

const latest = await browserClient.fetchDeclarations(declarationTopicId, {
  limit: 10,
  order: 'desc',
});

latest.forEach(payload => {
  logger.info('hcs-21 declaration', {
    sequence: payload.sequenceNumber,
    payer: payload.payer,
    adapter: payload.declaration.adapter_id,
  });
});
```

`fetchDeclarations` uses the wallet’s Hedera Mirror endpoint, filters out non–`hcs-21` payloads, and returns the same envelope structure as the server SDK. You can now run the entire layered registry workflow—from topic creation through declaration streaming—directly in a wallet-connected front‑end.
