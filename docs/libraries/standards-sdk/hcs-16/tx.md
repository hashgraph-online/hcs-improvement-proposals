---
title: Transactions — HCS‑16 Builders
description: Canonical builders for Flora topics, accounts, and messages. One section per builder with signatures and examples.
sidebar_position: 4
---

HCS‑16 centralizes all transaction construction in `tx.ts` to keep payloads canonical across Node and browser.

Execution
- Node: `await (await tx.execute(client)).getReceipt(client)`
- Browser: `await (await tx.freezeWithSigner(signer)).executeWithSigner(signer)` then `getReceiptWithSigner`

## Create Flora Topic — buildHcs16CreateFloraTopicTx

Signature

```ts
buildHcs16CreateFloraTopicTx(params: {
  floraAccountId: string;
  topicType: FloraTopicType;        // 0=communication,1=transaction,2=state
  adminKey?: MaybeKey;
  submitKey?: MaybeKey;
  operatorPublicKey?: PublicKey;
  autoRenewAccountId?: string;
}): TopicCreateTransaction
```

Example

```ts
import { buildHcs16CreateFloraTopicTx } from '@hashgraphonline/standards-sdk';
const tx = buildHcs16CreateFloraTopicTx({ floraAccountId: '0.0.500', topicType: 0, adminKey: true, submitKey: true });
```

## Create Transaction Topic (HIP‑991) — buildHcs16CreateTransactionTopicTx

Signature

```ts
buildHcs16CreateTransactionTopicTx(params: {
  memo: string;
  adminKey?: KeyList | PublicKey;
  submitKey?: KeyList | PublicKey;
  feeScheduleKey?: KeyList | PublicKey;
  customFees?: Array<{ amount: number; feeCollectorAccountId: string; denominatingTokenId?: string }>;
  feeExemptKeys?: PublicKey[];
}): TopicCreateTransaction
```

Example

```ts
const tx = buildHcs16CreateTransactionTopicTx({ memo: 'hcs-16:tx', adminKey, submitKey, customFees: [{ amount: 1, feeCollectorAccountId: '0.0.500' }] });
```

## Create Flora Account — buildHcs16CreateAccountTx

Signature

```ts
buildHcs16CreateAccountTx(params: {
  keyList: KeyList;
  initialBalanceHbar?: number;
  maxAutomaticTokenAssociations?: number;
}): AccountCreateTransaction
```

Example

```ts
const tx = buildHcs16CreateAccountTx({ keyList, initialBalanceHbar: 5, maxAutomaticTokenAssociations: -1 });
```

## Generic Message — buildHcs16MessageTx

Signature

```ts
buildHcs16MessageTx(params: {
  topicId: string;
  operatorId: string;
  op: FloraOperation;
  body?: Record<string, unknown>;
  transactionMemo?: string;
}): TopicMessageSubmitTransaction
```

Example

```ts
import { FloraOperation, buildHcs16MessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs16MessageTx({
  topicId: '0.0.600',
  operatorId: '0.0.123',
  op: FloraOperation.TRANSACTION,
  body: { schedule_id: '0.0.12345' },
});
```

## Flora Created — buildHcs16FloraCreatedTx

```ts
buildHcs16FloraCreatedTx({ topicId, operatorId, floraAccountId, topics }): TopicMessageSubmitTransaction
```

## Transaction — buildHcs16TransactionTx (preferred)

```ts
buildHcs16TransactionTx({ topicId, operatorId, scheduleId, data? }): TopicMessageSubmitTransaction
```

Notes
- `scheduleId` is the ScheduleId entity (e.g., `0.0.12345`).

## State Update — buildHcs16StateUpdateTx

```ts
buildHcs16StateUpdateTx({ topicId, operatorId, hash, epoch?, accountId?, topics?, memo?, transactionMemo? }): TopicMessageSubmitTransaction
```

## Join Request — buildHcs16FloraJoinRequestTx

```ts
buildHcs16FloraJoinRequestTx({ topicId, operatorId, accountId, connectionRequestId, connectionTopicId, connectionSeq }): TopicMessageSubmitTransaction
```

## Join Vote — buildHcs16FloraJoinVoteTx

```ts
buildHcs16FloraJoinVoteTx({ topicId, operatorId, accountId, approve, connectionRequestId, connectionSeq }): TopicMessageSubmitTransaction
```

## Join Accepted — buildHcs16FloraJoinAcceptedTx

```ts
buildHcs16FloraJoinAcceptedTx({ topicId, operatorId, members, epoch? }): TopicMessageSubmitTransaction
```

Source
- https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-16/tx.ts
