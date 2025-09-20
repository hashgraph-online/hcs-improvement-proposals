---
title: Transactions — HCS‑10 Transact
description: Build Hedera topic create and message transactions for inbound, outbound, connection, registry, and scheduled operations.
sidebar_position: 4
---

Note
- High-level HCS‑10 clients orchestrate these builders; use them directly for custom pipelines, migration tooling, or multi-sig workflows.
- TTL values flow into topic memos for lifecycle tracking; override memos only when interoperating with pre-existing topics.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-10/tx.ts
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-10/base-client.ts

## Create Inbound Topic — TopicCreateTransaction

Signature

```ts
buildHcs10CreateInboundTopicTx({
  accountId,
  ttl,
  adminKey,
  submitKey,
  memoOverride,
  operatorPublicKey,
});
```

Example

```ts
import { buildHcs10CreateInboundTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10CreateInboundTopicTx({
  accountId: '0.0.1204',
  ttl: 90,
});

await (await tx.execute(client)).getReceipt(client);
```

## Create Outbound Topic — TopicCreateTransaction

Signature

```ts
buildHcs10CreateOutboundTopicTx({
  ttl,
  adminKey,
  submitKey,
  memoOverride,
  operatorPublicKey,
});
```

Example

```ts
import { buildHcs10CreateOutboundTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10CreateOutboundTopicTx({
  ttl: 90,
});

await (await tx.execute(client)).getReceipt(client);
```

## Create Connection Topic — TopicCreateTransaction

Signature

```ts
buildHcs10CreateConnectionTopicTx({
  ttl,
  inboundTopicId,
  connectionId,
  adminKey,
  submitKey,
  memoOverride,
  operatorPublicKey,
});
```

Example

```ts
import { buildHcs10CreateConnectionTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10CreateConnectionTopicTx({
  ttl: 30,
  inboundTopicId: '0.0.5001',
  connectionId: 42,
});

await (await tx.execute(client)).getReceipt(client);
```

## Create Registry Topic — TopicCreateTransaction

Signature

```ts
buildHcs10CreateRegistryTopicTx({
  ttl,
  metadataTopicId,
  adminKey,
  submitKey,
  memoOverride,
  operatorPublicKey,
});
```

Example

```ts
import { buildHcs10CreateRegistryTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10CreateRegistryTopicTx({
  ttl: 365,
  metadataTopicId: '0.0.6001',
});

await (await tx.execute(client)).getReceipt(client);
```

## Submit Connection Request — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10SubmitConnectionRequestTx({
  inboundTopicId,
  operatorId,
  memo,
});
```

Example

```ts
import { buildHcs10SubmitConnectionRequestTx } from '@hashgraphonline/standards-sdk';

const inboundTopicId = '0.0.5001';
const accountId = '0.0.1204';

const tx = buildHcs10SubmitConnectionRequestTx({
  inboundTopicId,
  operatorId: `${inboundTopicId}@${accountId}`,
  memo: 'Request outbound agent link',
});

await (await tx.execute(client)).getReceipt(client);
```

## Confirm Connection — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10ConfirmConnectionTx({
  inboundTopicId,
  connectionTopicId,
  connectedAccountId,
  operatorId,
  connectionId,
  memo,
});
```

Example

```ts
import { buildHcs10ConfirmConnectionTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10ConfirmConnectionTx({
  inboundTopicId: '0.0.5001',
  connectionTopicId: '0.0.7001',
  connectedAccountId: '0.0.8123',
  operatorId: '0.0.5001@0.0.1204',
  connectionId: 42,
});

await (await tx.execute(client)).getReceipt(client);
```

## Record Outbound Connection Request — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10OutboundConnectionRequestRecordTx({
  outboundTopicId,
  operatorId,
  connectionRequestId,
  memo,
});
```

Example

```ts
import { buildHcs10OutboundConnectionRequestRecordTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10OutboundConnectionRequestRecordTx({
  outboundTopicId: '0.0.9101',
  operatorId: '0.0.5001@0.0.1204',
  connectionRequestId: 7,
});

await (await tx.execute(client)).getReceipt(client);
```

## Record Outbound Connection Created — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10OutboundConnectionCreatedRecordTx({
  outboundTopicId,
  requestorOutboundTopicId,
  connectionTopicId,
  confirmedRequestId,
  connectionRequestId,
  operatorId,
  memo,
});
```

Example

```ts
import { buildHcs10OutboundConnectionCreatedRecordTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10OutboundConnectionCreatedRecordTx({
  outboundTopicId: '0.0.9101',
  requestorOutboundTopicId: '0.0.9102',
  connectionTopicId: '0.0.7001',
  confirmedRequestId: 7,
  connectionRequestId: 7,
  operatorId: '0.0.5001@0.0.1204',
});

await (await tx.execute(client)).getReceipt(client);
```

## Send Connection Message — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10SendMessageTx({
  connectionTopicId,
  operatorId,
  data,
  memo,
});
```

Example

```ts
import { buildHcs10SendMessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10SendMessageTx({
  connectionTopicId: '0.0.7001',
  operatorId: '0.0.5001@0.0.1204',
  data: JSON.stringify({ subject: 'hello', body: 'invite' }),
});

await (await tx.execute(client)).getReceipt(client);
```

## Register Account — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10RegistryRegisterTx({
  registryTopicId,
  accountId,
  memo,
});
```

Example

```ts
import { buildHcs10RegistryRegisterTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10RegistryRegisterTx({
  registryTopicId: '0.0.9601',
  accountId: '0.0.1204',
});

await (await tx.execute(client)).getReceipt(client);
```

## Delete Registry Entry — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10RegistryDeleteTx({
  registryTopicId,
  uid,
  memo,
});
```

Example

```ts
import { buildHcs10RegistryDeleteTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10RegistryDeleteTx({
  registryTopicId: '0.0.9601',
  uid: 'connection:42',
});

await (await tx.execute(client)).getReceipt(client);
```

## Migrate Registry — TopicMessageSubmitTransaction

Signature

```ts
buildHcs10RegistryMigrateTx({
  registryTopicId,
  targetTopicId,
  memo,
});
```

Example

```ts
import { buildHcs10RegistryMigrateTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs10RegistryMigrateTx({
  registryTopicId: '0.0.9601',
  targetTopicId: '0.0.9701',
});

await (await tx.execute(client)).getReceipt(client);
```

## Transaction Operation (Scheduled Transactions)

HCS‑10 lets one agent propose a Hedera Scheduled Transaction to a peer over the connection topic. The receiving agent signs the schedule once it has gathered local approvals.

Message Payload

```json
{
  "p": "hcs-10",
  "op": "transaction",
  "operator_id": "0.0.123",
  "schedule_id": "0.0.370@1726357…",
  "data": "Transfer 2 HBAR to Treasury",
  "m": "optional memo"
}
```

Example

```ts
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { TransferTransaction, Hbar } from '@hashgraph/sdk';

const transferTx = new TransferTransaction()
  .addHbarTransfer('0.0.1204', new Hbar(-1))
  .addHbarTransfer('0.0.8000', new Hbar(1));

const { scheduleId } = await client.sendTransaction(
  connectionTopicId,
  transferTx,
  'Pay 1 HBAR to Treasury',
  { scheduleMemo: 'Treasury payment' }
);

await client.sendTransactionOperation(
  connectionTopicId,
  scheduleId,
  'Pay 1 HBAR to Treasury'
);
```

Approval Flow
- Fetch pending messages with `op: "transaction"` from the connection topic.
- Sign each schedule with `ScheduleSignTransaction` until the network executes it.

## See also

- Examples: [/docs/libraries/standards-sdk/hcs-10/examples](/docs/libraries/standards-sdk/hcs-10/examples)
- Server SDK: [/docs/libraries/standards-sdk/hcs-10/server](/docs/libraries/standards-sdk/hcs-10/server)
- Base client: [/docs/libraries/standards-sdk/hcs-10/base-client](/docs/libraries/standards-sdk/hcs-10/base-client)
