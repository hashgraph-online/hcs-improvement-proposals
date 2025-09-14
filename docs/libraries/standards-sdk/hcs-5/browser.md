---
title: Browser — HCS‑5BrowserClient
description: Mint Hashinals with a connected wallet.
sidebar_position: 3
---

```ts
import { HCS5BrowserClient } from '@hashgraphonline/standards-sdk';
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';

async function run(signer: DAppSigner) {
  const client = new HCS5BrowserClient({ network: 'testnet', signer });
  const res = await client.createHashinal({
    tokenId: '0.0.123456',
    inscriptionInput: { type: 'buffer', buffer: new Uint8Array([1,2,3]), fileName: 'bytes.bin', mimeType: 'application/octet-stream' },
  });
}
```

