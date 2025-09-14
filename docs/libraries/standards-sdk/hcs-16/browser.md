---
title: Browser — HCS‑16BrowserClient
description: Scenario‑driven flows to create topics and exchange Flora messages using a wallet.
sidebar_position: 3
---

This guide mirrors the Node flows but shows the wallet‑signed path. Transactions are built once (in `tx.ts`) and executed via a `DAppSigner` or compatible wallet connector.

## 1) Create Topics and Announce

```ts
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';
import { HCS16BrowserClient, FloraTopicType } from '@hashgraphonline/standards-sdk';

const client = new HCS16BrowserClient({ network: 'testnet', signer });
const cTopic = await client.createFloraTopic({ floraAccountId, topicType: FloraTopicType.COMMUNICATION });
const tTopic = await client.createFloraTopic({ floraAccountId, topicType: FloraTopicType.TRANSACTION });
const sTopic = await client.createFloraTopic({ floraAccountId, topicType: FloraTopicType.STATE });

await client.sendFloraCreated({ topicId: cTopic.topicId, floraAccountId });
```

Notes:
- Under the hood, `createFloraTopic` freezes and executes with the signer.
- You can pass admin/submit keys based on your policy; omit for public topics.

## 2) Propose a Transaction

```ts
await client.sendTxProposal({
  topicId: tTopic.topicId,
  scheduledTxId: '0.0.1234@1726357200.000000000',
  memo: 'release funds for invoice #42',
});
```

## 3) Publish a State Update

```ts
await client.sendStateUpdate({
  topicId: sTopic.topicId,
  stateHash: '0x…',
  epoch: 7,
  memo: 'post‑proposal state',
});
```

## Reading Messages

```ts
const recent = await client.getRecentMessages(cTopic.topicId, { limit: 10, order: 'desc', opFilter: 'flora_created' });
const latest = await client.getLatestMessage(cTopic.topicId, 'flora_created');
```

Use the browser client when you need on‑device signing and user consent flows; keep logic identical to Node by relying on the same builders and message shapes.

