---
title: Browser — HCS‑15BrowserClient
description: Use HCS15BrowserClient with a DAppSigner to create base and Petal accounts from the browser.
sidebar_position: 3
---

```ts
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';
import { HCS15BrowserClient } from '@hashgraphonline/standards-sdk';

async function run(signer: DAppSigner) {
  const client = new HCS15BrowserClient({ network: 'testnet', signer });
  const base = await client.createBaseAccount({ initialBalance: 1 });
  const petal = await client.createPetalAccount({ basePrivateKey: base.privateKey, initialBalance: 0.5 });
  console.log('Base:', base.accountId, 'Petal:', petal.accountId);
}
```

Notes:

- The browser client reuses the same tx builders as Node and signs via the connected wallet.
- `verifyPetalAccount` is available through the base client facilities.

