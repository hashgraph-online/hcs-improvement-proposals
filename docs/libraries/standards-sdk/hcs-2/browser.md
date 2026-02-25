---
title: Browser — BrowserHCS2Client
description: Use a connected wallet to manage HCS‑2 registries in the browser.
sidebar_position: 3
---

```ts
import { BrowserHCS2Client, HCS2RegistryType } from '@hashgraphonline/standards-sdk';
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';

async function run() {
  const hwc = new HashinalsWalletConnectSDK();
  await hwc.init();
  await hwc.connect();

  const client = new BrowserHCS2Client({ network: 'testnet', hwc });
  const reg = await client.createRegistry({ registryType: HCS2RegistryType.NON_INDEXED, ttl: 86400 });
  await client.registerEntry(reg.topicId, { targetTopicId: '0.0.700123', memo: 'demo entry' });
}
```
