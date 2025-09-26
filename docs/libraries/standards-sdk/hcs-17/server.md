---
sidebar_position: 2
---

# Node SDK (HCS17Client)

The Node client publishes and verifies HCS‑17 state hashes using an operator account. It centralizes topic creation and message submission while delegating all transaction construction to `tx.ts`.

## Setup

```ts
import { HCS17Client } from '@hashgraphonline/standards-sdk';

const client = new HCS17Client({
  network: 'testnet',
  operatorId: process.env.ACCOUNT_ID!,
  operatorKey: process.env.PRIVATE_KEY!, // string or PrivateKey
  keyType: 'ed25519', // or 'ecdsa' if needed
  logLevel: 'info',
});
```

## Create a State Topic

Topics for HCS‑17 messages must use the numeric memo format `hcs-17:<type>:<ttl>`.

```ts
const topicId = await client.createStateTopic({
  ttl: 86400,
  // adminKey/submitKey can be boolean | string | PublicKey | KeyList
});
```

The client validates memo structure via `parseHCS17Memo` and exposes `validateHCS17Topic(topicId)` if you need to verify existing topics.

## Submit a Message

If you already have a computed state hash and topic list, build a valid payload and submit:

```ts
import { StateHashMessage } from '@hashgraphonline/standards-sdk';

const message: StateHashMessage = client.createStateHashMessage(
  'abc123…',              // stateHash
  '0.0.1234',             // accountId
  ['0.0.2001','0.0.2002'],// topics
  'optional memo',        // m
);

await client.submitMessage(topicId, message);
```

## Compute and Publish

The high‑level helper fetches latest running hashes from Mirror Node, computes the HCS‑17 account state hash, and publishes it to a target topic.

```ts
const { stateHash, receipt } = await client.computeAndPublish({
  accountId: '0.0.1234',
  accountPublicKey: '302a30…', // or PublicKey
  topics: ['0.0.2001', '0.0.2002'],
  publishTopicId: topicId,
  memo: 'app context',
});

console.log('Published state hash:', stateHash);
```

## Read Latest Messages

Mirror‑node helpers return parsed, schema‑validated HCS‑17 envelopes:

```ts
const recent = await client.getRecentMessages(topicId, { limit: 25, order: 'desc' });
const latest = await client.getLatestMessage(topicId);
```

## Notes

- No dynamic imports are used; signing occurs with the configured operator.
- All transaction JSON is constructed in `tx.ts` builders (`buildHcs17CreateTopicTx`, `buildHcs17MessageTx`).
- Memos use numeric enums (`HCS17TopicType.STATE = 0`).

