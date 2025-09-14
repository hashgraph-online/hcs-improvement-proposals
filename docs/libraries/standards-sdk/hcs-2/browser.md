---
title: Browser — HCS‑2BrowserClient
description: Use a connected wallet to manage HCS‑2 registries in the browser.
sidebar_position: 3
---

```ts
import { HCS2BrowserClient, HCS2RegistryType } from '@hashgraphonline/standards-sdk';
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';

async function run(signer: DAppSigner) {
  const client = new HCS2BrowserClient({ network: 'testnet', signer });
  const reg = await client.createRegistry({ registryType: HCS2RegistryType.NON_INDEXED, ttl: 86400 });
  await client.registerEntry(reg.topicId, { key: 'k', value: { data: 1 } });
}
```

