---
title: Node — HCS‑16Client
description: Scenario‑driven flows to create topics and exchange Flora messages from Node.
sidebar_position: 2
---

This page walks through real HCS‑16 flows using the Node client. Each section explains the intent first, then shows a compact code snippet.

## 1) Bootstrap a Flora’s Topics

Goal: create the three topics and share them via `flora_created` on the Communication Topic.

```ts
import { HCS16Client, FloraTopicType } from '@hashgraphonline/standards-sdk';

const hcs16 = new HCS16Client({ network: 'testnet', operatorId, operatorKey });

// Choose which topic to create first; creation can be parallelized in your app
const cTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.COMMUNICATION });
const tTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.TRANSACTION });
const sTopic = await hcs16.createFloraTopic({ floraAccountId, topicType: FloraTopicType.STATE });

// Announce to members on the CTopic
await hcs16.sendFloraCreated({
  topicId: cTopic,
  operatorId,
  floraAccountId,
  topics: {
    communication: cTopic,
    transaction: tTopic,
    state: sTopic,
  },
});
```

Notes:
- Topic memos follow the HCS‑16 spec (numeric enum encoding). Indexers can discover them reliably.
- You can store the topic triplet in your app state, registry, or an HCS‑2 registry for lookup.

## 2) Propose a Transaction

Goal: publish a proposal on the Transaction Topic for members to review/sign.

```ts
await hcs16.sendTransaction({
  topicId: tTopic,
  operatorId,
  scheduleId: '0.0.1234',
  data: 'release funds for invoice #42',
});
```

Notes:
- The proposal references a scheduled transaction (or your own identifier) that your members will co‑sign.
- Keep the memo meaningful for auditors and bots consuming the topic.

## 3) Publish a State Update

Goal: emit a compact snapshot to the State Topic after meaningful changes.

```ts
await hcs16.sendStateUpdate({
  topicId: sTopic,
  operatorId,
  hash: '0x…',
  epoch: 7,
  memo: 'post‑proposal state',
});
```

Notes:
- Pairing with HCS‑17 hashes makes verification straightforward for indexers.
- Epoch is an application counter to help readers process causality.

## 4) Onboarding a New Member

Goal: run the join handshake on the Communication Topic.

```ts
await hcs16.sendFloraJoinRequest({
  topicId: cTopic,
  operatorId,
  accountId: '0.0.2468',
  connectionRequestId: 42,
  connectionTopicId: '0.0.9012',
  connectionSeq: 7,
});
await hcs16.sendFloraJoinVote({
  topicId: cTopic,
  operatorId,
  accountId: '0.0.2468',
  approve: true,
  connectionRequestId: 42,
  connectionSeq: 7,
});
await hcs16.sendFloraJoinAccepted({
  topicId: cTopic,
  operatorId,
  members: ['0.0.111', '0.0.222', '0.0.2468'],
  epoch: 8,
});
```

Notes:
- Your policy decides who can request, how many votes are required, and how acceptance is signaled.
- Keep membership lists sorted to avoid accidental hash divergence downstream.

## Reading Messages

The client exposes helpers to read and filter messages by operation when processing topics.

```ts
const recent = await hcs16.getRecentMessages(cTopic, { limit: 25, order: 'desc', opFilter: 'flora_created' });
const latest = await hcs16.getLatestMessage(cTopic, 'flora_created');
```

That’s all you need on Node: build with `tx.ts`, execute with the SDK client, and keep your flows auditable and minimal.
