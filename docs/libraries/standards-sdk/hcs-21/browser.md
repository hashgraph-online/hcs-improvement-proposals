---
title: Browser SDK
sidebar_position: 4
---

# HCS-21 Browser Client (`HCS21BrowserClient`)

`HCS21BrowserClient` wraps the Hashinals WalletConnect SDK so browser apps can publish adapter declarations directly from a user-controlled wallet. It reuses the same validation logic as the server client but signs transactions through WalletConnect.

## Setup

```ts
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';
import {
  HCS21BrowserClient,
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

## Publish an Adapter Declaration

```ts
await browserClient.publishDeclaration({
  topicId: '0.0.600123',
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
    manifest: 'hcs://1/0.0.4922770',
    manifestSequence: 15, // optional: pin a specific manifest message
    config: {
      account: '0.0.700001',
      threshold: '2/3', // express as t/n to mirror Flora key lists
      ctopic: '0.0.700101',
      ttopic: '0.0.700102',
      stopic: '0.0.700103',
    },
    stateModel: 'hcs-21.dataset-consensus@1',
  },
});
```

`HCS21BrowserClient` enforces the schema and 1 KB cap before the wallet prompts the user to sign.

## Fetch Declarations from the Wallet SDK

```ts
const latest = await browserClient.fetchDeclarations('0.0.600123');
latest.forEach(payload => {
  logger.info('hcs-21 declaration', {
    sequence: payload.sequenceNumber,
    payer: payload.payer,
    adapter: payload.declaration.adapter_id,
  });
});
```

Streaming through the wallet SDK keeps dashboards read/write without exposing operator keys.
