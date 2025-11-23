---
title: Browser SDK
sidebar_position: 4
---

# HCS-21 Browser Client (`HCS21BrowserClient`)

`HCS21BrowserClient` wraps the Hashinals WalletConnect SDK so browser apps can publish package declarations directly from a user-controlled wallet. It reuses the base validation logic from the server client but signs transactions through WalletConnect.

## Setup

```ts
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import {
  HCS21BrowserClient,
  PackageMetadataRecord,
} from '@hashgraphonline/standards-sdk';

const hwc = new HashinalsWalletConnectSDK({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
});

const browserClient = new HCS21BrowserClient({
  network: 'testnet',
  hwc,
});
```

## Publish a Declaration

```ts
const declaration = {
  op: 'register',
  registry: 'pypi',
  t_id: '0.0.700777',
  name: 'Sample Hedera Package',
  description: 'CLI plugin published from the browser client',
  author: 'kantorcodes',
  tags: ['cli', 'demo'],
  metadata: 'hcs://1/0.0.4922770/15',
};

await browserClient.publishDeclaration({
  topicId: '0.0.600123',
  declaration,
});
```

`HCS21BrowserClient` still enforces the schema; invalid metadata pointers or registries throw before any wallet prompt appears.

## Fetch Declarations from the Wallet SDK

```ts
const latest = await browserClient.fetchDeclarations('0.0.600123');
latest.forEach(payload => {
  console.log(payload.sequenceNumber, payload.payer);
});
```

Because the browser client streams through the wallet SDK, it is ideal for dashboards that need read/write access without exposing operator keys.
