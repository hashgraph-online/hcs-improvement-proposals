---
title: Node — HCS‑5Client
description: Inscribe content and mint Hashinals (HTS NFTs) pointing to HCS‑1 HRLs.
sidebar_position: 2
---

```ts
import 'dotenv/config';
import { HCS5Client } from '@hashgraphonline/standards-sdk';

const hcs5 = new HCS5Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});

const res = await hcs5.createHashinal({
  tokenId: '0.0.123456',
  inscriptionInput: { type: 'buffer', buffer: Buffer.from('hello'), fileName: 'note.txt', mimeType: 'text/plain' },
});
```

