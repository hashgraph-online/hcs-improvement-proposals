---
sidebar_position: 5
---

# Transactions (tx.ts)

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer the higher‑level `sdk.ts` (Node) or `browser.ts` (wallet) clients.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-17
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/types.ts

All transaction construction is centralized in `tx.ts`. Clients never assemble JSON payloads themselves. Builders return Hedera SDK transaction instances ready to be signed and executed.

## Create Topic — buildHcs17CreateTopicTx

Signature

```ts
buildHcs17CreateTopicTx(params: {
  ttl: number;
  adminKey?: boolean | string | PublicKey | KeyList;
  submitKey?: boolean | string | PublicKey | KeyList;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

```ts
import { buildHcs17CreateTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs17CreateTopicTx({
  ttl: 86400,
  // Optional keys: boolean | string | PublicKey | KeyList
  adminKey: true,
  submitKey: true,
  // For Node, operatorPublicKey can be passed for admin/submit defaulting
});

// Node: await tx.execute(client)
// Browser: await (await tx.freezeWithSigner(signer)).executeWithSigner(signer)
```

This builder encodes the memo as `hcs-17:<type>:<ttl>` using numeric enums (`HCS17TopicType.STATE = 0`).

## Submit Message — buildHcs17MessageTx

Signature

```ts
buildHcs17MessageTx(params: {
  topicId: string;
  stateHash: string;
  accountId: string;
  topics: string[];
  memo?: string;
  transactionMemo?: string;
}): TopicMessageSubmitTransaction
```

```ts
import { buildHcs17MessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs17MessageTx({
  topicId: '0.0.7777',
  stateHash: 'ab…',
  accountId: '0.0.1234',
  topics: ['0.0.2001','0.0.2002'],
  memo: 'optional app memo',
  transactionMemo: 'HCS-17 publish',
});
```

The builder constructs the canonical HCS‑17 payload internally:

```ts
{
  p: 'hcs-17',
  op: 'state_hash',
  state_hash: '…',
  topics: ['…'],
  account_id: '…',
  timestamp: 'ISO8601',
  m: '…?'
}
```

## Execution Patterns

- Node: `await tx.execute(client).then(r => r.getReceipt(client))`
- Browser: `await (await tx.freezeWithSigner(signer)).executeWithSigner(signer)` then `getReceiptWithSigner`
