---
title: HCS‑18 API Reference
description: Vanilla reference for HCS‑18 discovery clients and builders.
sidebar_position: 6
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-18
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/types.ts

## Import Paths

```ts
import {
  HCS18Client,
  HCS18BrowserClient,
  DiscoveryOperation,
  type SDKHCS18ClientConfig,
  type BrowserHCS18ClientConfig,
  type DiscoveryMessage,
  type AnnounceData,
  type ProposeData,
  type RespondData,
  type CompleteData,
  type WithdrawData,
  buildHcs18DiscoveryMemo,
  buildHcs18CreateDiscoveryTopicTx,
  buildHcs18SubmitDiscoveryMessageTx,
  buildHcs18AnnounceMessage,
  buildHcs18ProposeMessage,
  buildHcs18RespondMessage,
  buildHcs18CompleteMessage,
  buildHcs18WithdrawMessage,
} from '@hashgraphonline/standards-sdk/hcs-18';
```

## Enums

```ts
enum DiscoveryOperation { ANNOUNCE=0, PROPOSE=1, RESPOND=2, COMPLETE=3, WITHDRAW=4 }
```

## Message Schema (canonical)

```json
{ "p":"hcs-18", "op":0, "data": { /* per op */ }, "m":"optional" }
```

## Node Client (HCS18Client)

```ts
constructor(config: SDKHCS18ClientConfig)

createDiscoveryTopic(options?: { ttlSeconds?: number; adminKey?: any; submitKey?: any; memoOverride?: string }): Promise<{ topicId: string }>

announce(params: { discoveryTopicId: string; data: AnnounceData; memo?: string }): Promise<{ receipt: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number }>
propose(params: { discoveryTopicId: string; data: ProposeData; memo?: string }): Promise<{ receipt: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number }>
respond(params: { discoveryTopicId: string; data: RespondData; memo?: string }): Promise<import('@hashgraph/sdk').TransactionReceipt>
complete(params: { discoveryTopicId: string; data: CompleteData; memo?: string }): Promise<import('@hashgraph/sdk').TransactionReceipt>
withdraw(params: { discoveryTopicId: string; data: WithdrawData; memo?: string }): Promise<import('@hashgraph/sdk').TransactionReceipt>

getDiscoveryMessages(topicId: string, options?: { limit?: number; order?: 'asc'|'desc' }): Promise<DiscoveryMessage[]>
isProposalReady(proposal: ProposeData): boolean
```

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/sdk.ts

## Browser Client (HCS18BrowserClient)

Wallet‑signed equivalents for `announce`, `propose`, `respond`, `complete`, and `withdraw`.

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/browser.ts

## Builders (tx.ts)

```ts
function buildHcs18DiscoveryMemo(ttlSeconds?: number, memoOverride?: string): string;
function buildHcs18CreateDiscoveryTopicTx(params: { ttlSeconds?: number; adminKey?: any; submitKey?: any; operatorPublicKey?: import('@hashgraph/sdk').PublicKey; memoOverride?: string }): import('@hashgraph/sdk').TopicCreateTransaction;
function buildHcs18SubmitDiscoveryMessageTx(params: { topicId: string; message: DiscoveryMessage; transactionMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs18AnnounceMessage(data: AnnounceData): DiscoveryMessage;
function buildHcs18ProposeMessage(data: ProposeData): DiscoveryMessage;
function buildHcs18RespondMessage(data: RespondData): DiscoveryMessage;
function buildHcs18CompleteMessage(data: CompleteData): DiscoveryMessage;
function buildHcs18WithdrawMessage(data: WithdrawData): DiscoveryMessage;
```

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/tx.ts

## Example

```ts
const c = new HCS18Client({ network: 'testnet', operatorId, operatorKey });
const topicId = await c.createDiscoveryTopic({ ttlSeconds: 300 }).then(r => r.topicId);
await c.announce({ discoveryTopicId: topicId!, data: { account: '0.0.111', petal: { name: 'A', priority: 700 }, capabilities: { protocols: ['hcs-16','hcs-18'] } } });
```
