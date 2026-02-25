---
title: HCS‑16 API Reference
description: Vanilla reference for HCS‑16 Flora coordination clients and builders.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-16
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/types.ts

## Import Paths

```ts
import {
  HCS16Client,
  HCS16BrowserClient,
  FloraTopicType,
  FloraOperation,
  buildHcs16CreateFloraTopicTx,
  buildHcs16FloraCreatedTx,
  buildHcs16TransactionTx,
  buildHcs16StateUpdateTx,
  buildHcs16FloraJoinRequestTx,
  buildHcs16FloraJoinVoteTx,
  buildHcs16FloraJoinAcceptedTx,
} from '@hashgraphonline/standards-sdk';
```

## Enums

```ts
enum FloraTopicType { COMMUNICATION=0, TRANSACTION=1, STATE=2 }
enum FloraOperation { FLORA_CREATE_REQUEST, FLORA_CREATE_ACCEPTED, FLORA_CREATED, TRANSACTION, STATE_UPDATE, FLORA_JOIN_REQUEST, FLORA_JOIN_VOTE, FLORA_JOIN_ACCEPTED }
```

## Message Schema (canonical)

All messages share `p: 'hcs-16'` and an `op` from `FloraOperation` with op‑specific fields in `data`.

```json
{ "p":"hcs-16", "op":"flora_created", "data": { "flora_account":"0.0.x" }, "timestamp":"…", "m":"optional" }
```

## Node Client (HCS16Client)

```ts
constructor(config: { network: 'mainnet'|'testnet'; operatorId: string; operatorKey: string|import('@hashgraph/sdk').PrivateKey; keyType?: 'ed25519'|'ecdsa' })

createFloraTopic(params: { floraAccountId: string; topicType: FloraTopicType; adminKey?: boolean|string|import('@hashgraph/sdk').PublicKey|import('@hashgraph/sdk').KeyList; submitKey?: boolean|string|import('@hashgraph/sdk').PublicKey|import('@hashgraph/sdk').KeyList }): Promise<{ topicId: string }>

getRecentMessages(topicId: string, options?: { limit?: number; order?: 'asc'|'desc'; opFilter?: FloraOperation|string }): Promise<Array<{ message: any; consensus_timestamp?: string; sequence_number: number }>>
getLatestMessage(topicId: string, opFilter?: FloraOperation|string): Promise<(any & { consensus_timestamp?: string; sequence_number: number }) | null>
```

## Browser Client (HCS16BrowserClient)

Wallet‑signed equivalents for creating topics and sending messages:

```ts
sendFloraCreated({ topicId, floraAccountId }): Promise<void>
sendTransaction({ topicId, scheduleId, data? }): Promise<void>
sendStateUpdate({ topicId, stateHash, epoch, memo? }): Promise<void>
```

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-16/browser.ts

## Builders (tx.ts)

```ts
function buildHcs16CreateFloraTopicTx(params: { floraAccountId: string; topicType: FloraTopicType; adminKey?: any; submitKey?: any; operatorPublicKey?: import('@hashgraph/sdk').PublicKey }): import('@hashgraph/sdk').TopicCreateTransaction;
function buildHcs16FloraCreatedTx(params: { topicId: string; operatorId: string; floraAccountId: string; topics: { communication: string; transaction: string; state: string } }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs16TransactionTx(params: { topicId: string; operatorId: string; scheduleId: string; data?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs16StateUpdateTx(params: { topicId: string; operatorId: string; hash: string; epoch?: number; accountId?: string; topics?: string[]; memo?: string; transactionMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs16FloraJoinRequestTx(params: { topicId: string; operatorId: string; accountId: string; connectionRequestId: number; connectionTopicId: string; connectionSeq: number }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs16FloraJoinVoteTx(params: { topicId: string; operatorId: string; accountId: string; approve: boolean; connectionRequestId: number; connectionSeq: number }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs16FloraJoinAcceptedTx(params: { topicId: string; operatorId: string; members: string[]; epoch?: number }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

## Validation

- Topic memos use numeric enum encoding: `hcs-16:<floraId>:<type>` or equivalent per spec section.
- Messages validate `p` and `op` and include op‑specific `data` payloads.

## Example

```ts
const c = new HCS16Client({ network: 'testnet', operatorId, operatorKey });
const cTopic = await c.createFloraTopic({ floraAccountId: '0.0.600', topicType: FloraTopicType.COMMUNICATION });
await c.sendFloraCreated({
  topicId: cTopic.topicId,
  operatorId,
  floraAccountId: '0.0.600',
  topics: { communication: cTopic.topicId, transaction: '0.0.700', state: '0.0.701' },
});
```
