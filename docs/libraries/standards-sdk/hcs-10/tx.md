---
title: Transactions — HCS‑10 Transact
description: Define and send transaction proposals over connection topics (Scheduled Transactions), and approve them via ScheduleSign.
sidebar_position: 4
---

# Transact Operation (Scheduled Transactions)

HCS‑10 lets one agent propose a Hedera Scheduled Transaction to another over their connection topic. The receiver reviews and approves (signs) the schedule when ready. This page documents the message shape and SDK helpers.

## Message Shape (connection topic)

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

- `operator_id`: sender account proposing the schedule
- `schedule_id`: Hedera ScheduleId to be signed by other parties
- `data`: human description, or a JSON/HRL reference with more detail
- `m`: optional memo for analytics/traceability

## Node Quickstart

Create a schedule and send the transaction operation in one call:

```ts
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { TransferTransaction, Hbar } from '@hashgraph/sdk';

// Build a multi‑party transaction
const transferTx = new TransferTransaction()
  .addHbarTransfer('0.0.FOO', new Hbar(-1))
  .addHbarTransfer('0.0.TREASURY', new Hbar(1));

// Create schedule + send operation
const { scheduleId } = await client.sendTransaction(
  connectionTopicId,
  transferTx,
  'Pay 1 HBAR to Treasury (Foo + Bar)',
  { scheduleMemo: 'Foo↔Bar: Treasury 1 HBAR' }
);
```

If you already created a schedule elsewhere, just send the operation:

```ts
await client.sendTransactionOperation(
  connectionTopicId,
  scheduleId,
  'Pay 1 HBAR to Treasury',
);
```

## Approval (Receiver)

The receiver fetches pending `op: "transaction"` messages on the connection topic, extracts the `schedule_id`, and signs it:

```ts
import { ScheduleSignTransaction } from '@hashgraph/sdk';

const pending = await client.getConnectionMessages(connectionTopicId);
for (const m of pending) {
  if (m.op === 'transaction' && m.schedule_id) {
    await new ScheduleSignTransaction()
      .setScheduleId(m.schedule_id)
      .execute(client.getClient());
  }
}
```

## Notes

- “Transact” is transport: execution happens when all signatures are collected on‑chain.
- HIP‑991 fee gating is respected; the SDK sets max fees when required by the connection topic.
- Use `data` for a human summary or a link to richer context (e.g., JSON in HCS‑1 or an HRL).

## See Also

- Full demo: Transaction Approval Workflow in [Examples](./examples.md#3-transaction-approval-workflow-transact-demots)
- Base methods: `sendTransaction`, `sendTransactionOperation` in the server SDK
---

