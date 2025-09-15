---
title: Browser — HCS‑6BrowserClient
description: Update latest‑state hashinals with a connected wallet.
sidebar_position: 3
---

```ts
import { HCS6BrowserClient } from '@hashgraphonline/standards-sdk';
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';

async function run(signer: DAppSigner) {
  const client = new HCS6BrowserClient({ network: 'testnet', signer });
  const reg = await client.createDynamicRegistry({ ttl: 86400 });
  await client.upsert(reg.topicId, { key: 'status', value: { ok: true } });
}
```

