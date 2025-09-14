---
title: Transactions — HCS‑2 Builders
description: Build registry creation transactions and message submissions for HCS‑2.
sidebar_position: 4
---

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer the higher‑level `sdk.ts` (Node) or `browser.ts` (wallet) clients.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-2
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/types.ts

## Create Registry — buildHcs2CreateRegistryTx

Signature

```ts
buildHcs2CreateRegistryTx(params: {
  registryType: 0 | 1;    // HCS2RegistryType
  ttl: number;
  adminKey?: boolean | string | Key;   // MaybeKey
  submitKey?: boolean | string | Key;  // MaybeKey
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Example

```ts
import { buildHcs2CreateRegistryTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs2CreateRegistryTx({ registryType: 0, ttl: 86400, adminKey: true, submitKey: true });
await (await tx.execute(client)).getReceipt(client);
```

Memo
- Defaults to `hcs-2:<type>:<ttl>` unless `memoOverride` is provided.

## Register Entry — buildHcs2RegisterTx

Signature

```ts
buildHcs2RegisterTx(params: {
  registryTopicId: string;
  targetTopicId: string;
  metadata?: string;
  memo?: string;            // payload memo field
  analyticsMemo?: string;   // Hedera tx memo
}): TopicMessageSubmitTransaction
```

Example

```ts
import { buildHcs2RegisterTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs2RegisterTx({
  registryTopicId: '0.0.111',
  targetTopicId: '0.0.222',
  metadata: 'https://example.com/metadata.json',
  memo: 'register',
});
await (await tx.execute(client)).getReceipt(client);
```

## Update Entry — buildHcs2UpdateTx

Signature

```ts
buildHcs2UpdateTx(params: {
  registryTopicId: string;
  uid: string;              // sequence number to update
  targetTopicId: string;
  metadata?: string;
  memo?: string;
  analyticsMemo?: string;
}): TopicMessageSubmitTransaction
```

## Delete Entry — buildHcs2DeleteTx

Signature

```ts
buildHcs2DeleteTx(params: {
  registryTopicId: string;
  uid: string;              // sequence number to delete
  memo?: string;
  analyticsMemo?: string;
}): TopicMessageSubmitTransaction
```

## Migrate Registry — buildHcs2MigrateTx

Signature

```ts
buildHcs2MigrateTx(params: {
  registryTopicId: string;
  targetTopicId: string;    // new registry topic id
  metadata?: string;        // optional rationale
  memo?: string;
  analyticsMemo?: string;
}): TopicMessageSubmitTransaction
```

Source
- https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-2/tx.ts
