---
title: Node — HCS‑16Client
description: Scenario‑driven flows to create topics and exchange Flora messages from Node.
sidebar_position: 2
---

This page walks through real HCS‑16 flows using the Node client. Each section explains the intent first, then shows a compact code snippet.

## 1) Bootstrap a Flora’s Topics

Goal: create the three topics and share them via `flora_created` on the Communication Topic.

```ts
import { HCS16Client, FloraTopicType, buildHcs16FloraCreatedTx } from '@hashgraphonline/standards-sdk';

const hcs16 = new HCS16Client({ network: 'testnet', operatorId, operatorKey });

// Choose which topic to create first; creation can be parallelized in your app
const cTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.COMMUNICATION });
const tTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.TRANSACTION });
const sTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.STATE });

// Announce to members on the CTopic
await (await buildHcs16FloraCreatedTx({ topicId: cTopic.topicId, floraAccountId })).execute(hcs16['client']);
```

Notes:
- Topic memos follow the HCS‑16 spec (numeric enum encoding). Indexers can discover them reliably.
- You can store the topic triplet in your app state, registry, or an HCS‑2 registry for lookup.

## 2) Propose a Transaction

Goal: publish a proposal on the Transaction Topic for members to review/sign.

```ts
import { buildHcs16TxProposalTx } from '@hashgraphonline/standards-sdk';

await (await buildHcs16TxProposalTx({
  topicId: tTopic.topicId,
  scheduledTxId: '0.0.1234@1726357200.000000000',
  memo: 'release funds for invoice #42',
})).execute(hcs16['client']);
```

Notes:
- The proposal references a scheduled transaction (or your own identifier) that your members will co‑sign.
- Keep the memo meaningful for auditors and bots consuming the topic.

## 3) Publish a State Update

Goal: emit a compact snapshot to the State Topic after meaningful changes.

```ts
import { buildHcs16StateUpdateTx } from '@hashgraphonline/standards-sdk';

await (await buildHcs16StateUpdateTx({
  topicId: sTopic.topicId,
  stateHash: '0x…', // often the HCS‑17 account/composite hash
  epoch: 7,
  memo: 'post‑proposal state',
})).execute(hcs16['client']);
```

Notes:
- Pairing with HCS‑17 hashes makes verification straightforward for indexers.
- Epoch is an application counter to help readers process causality.

## 4) Onboarding a New Member

Goal: run the join handshake on the Communication Topic.

```ts
import { buildHcs16FloraJoinRequestTx, buildHcs16FloraJoinVoteTx, buildHcs16FloraJoinAcceptedTx } from '@hashgraphonline/standards-sdk';

await (await buildHcs16FloraJoinRequestTx({ topicId: cTopic.topicId, candidateAccountId: '0.0.2468' })).execute(hcs16['client']);
await (await buildHcs16FloraJoinVoteTx({ topicId: cTopic.topicId, candidateAccountId: '0.0.2468', approve: true })).execute(hcs16['client']);
await (await buildHcs16FloraJoinAcceptedTx({ topicId: cTopic.topicId, members: ['0.0.111','0.0.222','0.0.2468'], epoch: 8 })).execute(hcs16['client']);
```

Notes:
- Your policy decides who can request, how many votes are required, and how acceptance is signaled.
- Keep membership lists sorted to avoid accidental hash divergence downstream.

## Reading Messages

The client exposes helpers to read and filter messages by operation when processing topics.

```ts
const recent = await hcs16.getRecentMessages(cTopic.topicId, { limit: 25, order: 'desc', opFilter: 'flora_created' });
const latest = await hcs16.getLatestMessage(cTopic.topicId, 'flora_created');
```

That’s all you need on Node: build with `tx.ts`, execute with the SDK client, and keep your flows auditable and minimal.

