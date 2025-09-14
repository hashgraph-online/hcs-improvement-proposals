---
title: Transactions — HCS‑10
description: Build raw Hedera transactions for agent topics, connection flows, messaging, and registry operations.
sidebar_position: 5
---

Note
- Prefer the high‑level Node/Browser clients for typical apps; use these builders for custom flows or agent‑kit integrations.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-10/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-10/types.ts

## Create Topics

Inbound — buildHcs10CreateInboundTopicTx

```ts
buildHcs10CreateInboundTopicTx(params: {
  accountId: string;                 // account this inbound topic belongs to
  ttl: number;                       // memo freshness hint
  adminKey?: boolean | string | Key; // MaybeKey
  submitKey?: boolean | string | Key;// MaybeKey
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Outbound — buildHcs10CreateOutboundTopicTx

```ts
buildHcs10CreateOutboundTopicTx(params: {
  ttl: number;
  submitKey?: MaybeKey;
  adminKey?: MaybeKey;
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Connection — buildHcs10CreateConnectionTopicTx

```ts
buildHcs10CreateConnectionTopicTx(params: {
  ttl: number;
  inboundTopicId: string;          // partner’s inbound topic
  connectionId: number | string;   // correlates request/confirm
  adminKey?: MaybeKey;
  submitKey?: MaybeKey;
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Registry — buildHcs10CreateRegistryTopicTx

```ts
buildHcs10CreateRegistryTopicTx(params: {
  ttl: number;
  metadataTopicId?: string;        // optional HCS‑1 profile topic
  adminKey?: MaybeKey;
  submitKey?: MaybeKey;
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

## Connection Flow Messages

Submit Request — buildHcs10SubmitConnectionRequestTx

```ts
buildHcs10SubmitConnectionRequestTx(params: {
  inboundTopicId: string;          // target’s inbound topic
  operatorId: string;              // inboundTopicId@accountId or accountId
  memo?: string;
}): TopicMessageSubmitTransaction
```

Confirm — buildHcs10ConfirmConnectionTx

```ts
buildHcs10ConfirmConnectionTx(params: {
  inboundTopicId: string;          // confirmer’s inbound topic
  connectionTopicId: string;       // the created connection topic
  connectedAccountId: string;      // requestor’s account
  operatorId: string;              // confirmer inboundTopicId@accountId
  connectionId: number;            // matches request
  memo?: string;
}): TopicMessageSubmitTransaction
```

Outbound Audit Records

```ts
buildHcs10OutboundConnectionRequestRecordTx({
  outboundTopicId, operatorId, connectionRequestId, memo?
})
buildHcs10OutboundConnectionCreatedRecordTx({
  outboundTopicId, requestorOutboundTopicId, connectionTopicId,
  confirmedRequestId, connectionRequestId, operatorId, memo?
})
```

## Messaging

Send Message — buildHcs10SendMessageTx

```ts
buildHcs10SendMessageTx(params: {
  connectionTopicId: string;
  operatorId: string;  // sender’s inboundTopicId@accountId
  data: string;        // app payload (e.g., JSON)
  memo?: string;
}): TopicMessageSubmitTransaction
```

## Registry Messages

```ts
buildHcs10RegistryRegisterTx({ registryTopicId, accountId, memo? })
buildHcs10RegistryDeleteTx({ registryTopicId, uid, memo? })
buildHcs10RegistryMigrateTx({ registryTopicId, targetTopicId, memo? })
```

Examples

```ts
import {
  buildHcs10CreateInboundTopicTx,
  buildHcs10SubmitConnectionRequestTx,
} from '@hashgraphonline/standards-sdk';

// Create inbound topic
const createInbound = buildHcs10CreateInboundTopicTx({ accountId: '0.0.123', ttl: 60, submitKey: false });
await (await createInbound.execute(client)).getReceipt(client);

// Send connection request to a partner’s inbound topic
const req = buildHcs10SubmitConnectionRequestTx({ inboundTopicId: '0.0.789', operatorId: '0.0.123', memo: 'hi' });
await (await req.execute(client)).getReceipt(client);
```
