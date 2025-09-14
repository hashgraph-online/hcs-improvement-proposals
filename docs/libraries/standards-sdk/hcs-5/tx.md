---
title: Transactions — HCS‑5
description: HCS‑5 piggybacks on HTS mint transactions; metadata is set to an HCS‑1 HRL.
sidebar_position: 4
---

Note
- These flows are typically orchestrated via higher‑level SDK helpers.
- Direct transaction construction is common only when integrating with custom minting pipelines.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-5
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/types.ts

## Mint Hashinal — HTS TokenMint

HCS‑5 uses HTS mint and sets serial metadata to an HCS‑1 HRL.

Signature

```ts
new TokenMintTransaction()
  .setTokenId(TokenId.fromString(tokenId))
  .setMetadata([Buffer.from(buildHcs1Hrl(topicId))])
```

Example

```ts
import { TokenMintTransaction, TokenId } from '@hashgraph/sdk';
import { buildHcs1Hrl } from '@hashgraphonline/standards-sdk';

const metadata = buildHcs1Hrl('0.0.700001');
const tx = new TokenMintTransaction()
  .setTokenId(TokenId.fromString('0.0.123456'))
  .setMetadata([Buffer.from(metadata)]);
await (await tx.execute(client)).getReceipt(client);
```
