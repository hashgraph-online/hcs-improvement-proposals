---
title: Transactions — HCS‑20 Builders
description: Builders and helpers for HCS‑20 points operations.
sidebar_position: 4
---

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer the higher‑level `sdk.ts` (Node) or `browser.ts` (wallet) clients.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-20
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/types.ts

## Generic Submit (advanced)

```ts
import { buildHcs20SubmitMessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20SubmitMessageTx({
  topicId: '0.0.123',
  payload: { /* raw HCS‑20 JSON */ },
  transactionMemo: 'optional',
});
```

Parameters
- `topicId` string
- `payload` object|string
- `transactionMemo?` string

Returns
- `TopicMessageSubmitTransaction`

## Deploy

```ts
import { buildHcs20DeployTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20DeployTx({
  topicId: '0.0.100',
  name: 'Loyalty Points',
  tick: 'loyal',
  max: '1000000000',
  lim: '10000',
  metadata: 'ipfs://…',
  memo: 'deploy',
});
```

Parameters
- `topicId` string
- `name` string
- `tick` string (normalized to lowercase)
- `max` string
- `lim?` string
- `metadata?` string
- `memo?` string

Returns
- `TopicMessageSubmitTransaction`

## Mint

```ts
import { buildHcs20MintTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20MintTx({
  topicId: '0.0.100',
  tick: 'loyal',
  amt: '100',
  to: '0.0.12345',
  memo: 'reward',
});
```

Parameters
- `topicId` string
- `tick` string
- `amt` string
- `to` string
- `memo?` string

Returns
- `TopicMessageSubmitTransaction`

## Transfer

```ts
import { buildHcs20TransferTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20TransferTx({
  topicId: '0.0.100',
  tick: 'loyal',
  amt: '10',
  from: '0.0.111',
  to: '0.0.222',
  memo: 'tip',
});
```

Parameters
- `topicId` string
- `tick` string
- `amt` string
- `from` string
- `to` string
- `memo?` string

Returns
- `TopicMessageSubmitTransaction`

## Burn

```ts
import { buildHcs20BurnTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20BurnTx({
  topicId: '0.0.100',
  tick: 'loyal',
  amt: '5',
  from: '0.0.111',
  memo: 'cleanup',
});
```

Parameters
- `topicId` string
- `tick` string
- `amt` string
- `from` string
- `memo?` string

Returns
- `TopicMessageSubmitTransaction`

## Register (Directory)

```ts
import { buildHcs20RegisterTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs20RegisterTx({
  registryTopicId: '0.0.999',
  name: 'Loyalty Points',
  topicId: '0.0.100',
  isPrivate: false,
  metadata: 'ipfs://…',
  memo: 'register',
});
```

Parameters
- `registryTopicId` string
- `name` string
- `topicId` string
- `isPrivate` boolean
- `metadata?` string
- `memo?` string

Returns
- `TopicMessageSubmitTransaction`

Execution
- Node: `await tx.execute(client).then(r => r.getReceipt(client))`
- Browser (advanced): `await (await tx.freezeWithSigner(signer)).executeWithSigner(signer)` then `getReceiptWithSigner`

Source
- https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-20/tx.ts
