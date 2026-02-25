---
title: HCS‑2 API Reference
description: Vanilla reference for HCS‑2 registry clients and builders in the Standards SDK.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-2
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-2/types.ts

## Import Paths

```ts
import {
  HCS2Client,
  BrowserHCS2Client,
  HCS2RegistryType,
  HCS2Operation,
  type HCS2ClientConfig,
  type SDKHCS2ClientConfig,
  type CreateRegistryOptions,
  type RegisterEntryOptions,
  type UpdateEntryOptions,
  type DeleteEntryOptions,
  type MigrateTopicOptions,
  type QueryRegistryOptions,
  type TopicRegistry,
  type RegistryEntry,
  buildHcs2CreateRegistryTx,
  buildHcs2RegisterTx,
  buildHcs2UpdateTx,
  buildHcs2DeleteTx,
  buildHcs2MigrateTx,
} from '@hashgraphonline/standards-sdk';
```

## Types

```ts
interface HCS2ClientConfig {
  network: 'mainnet' | 'testnet';
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  silent?: boolean;
  mirrorNodeUrl?: string;
  logger?: any;
}

interface SDKHCS2ClientConfig extends HCS2ClientConfig {
  operatorId: string | import('@hashgraph/sdk').AccountId;
  operatorKey: string | import('@hashgraph/sdk').PrivateKey;
  keyType?: 'ed25519' | 'ecdsa';
}

interface TopicRegistry {
  topicId: string;
  type: HCS2RegistryType;
  ttl: number;
  entries: RegistryEntry[];
}

interface RegistryEntry {
  uid: string;       // unique id for indexed registries
  topicId: string;   // registered topic
  metadata?: string; // optional metadata
}
```

## Enums

```ts
enum HCS2RegistryType { INDEXED = 0, NON_INDEXED = 1 }

enum HCS2Operation { REGISTER = 'register', UPDATE = 'update', DELETE = 'delete', MIGRATE = 'migrate' }
```

## Message Schema (canonical)

All HCS‑2 registry messages share `p: 'hcs-2'` and an `op` from `HCS2Operation`:

```json
// REGISTER
{ "p": "hcs-2", "op": "register", "t_id": "0.0.123", "metadata": "...", "m": "optional" }

// UPDATE (indexed only)
{ "p": "hcs-2", "op": "update", "uid": "abc123", "t_id": "0.0.456", "metadata": "...", "m": "..." }

// DELETE (indexed only)
{ "p": "hcs-2", "op": "delete", "uid": "abc123", "m": "..." }

// MIGRATE (both types)
{ "p": "hcs-2", "op": "migrate", "t_id": "0.0.789", "metadata": "...", "m": "..." }
```

## Node Client (HCS2Client)

```ts
constructor(config: SDKHCS2ClientConfig)

createRegistry(options?: CreateRegistryOptions): Promise<{ success: boolean; topicId?: string; transactionId?: string; error?: string }>

registerEntry(registryTopicId: string, options: RegisterEntryOptions): Promise<{ success: boolean; receipt?: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number; error?: string }>

updateEntry(registryTopicId: string, options: UpdateEntryOptions): Promise<{ success: boolean; receipt?: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number; error?: string }>

deleteEntry(registryTopicId: string, options: DeleteEntryOptions): Promise<{ success: boolean; receipt?: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number; error?: string }>

migrateRegistry(registryTopicId: string, options: MigrateTopicOptions): Promise<{ success: boolean; receipt?: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number; error?: string }>

getRegistry(topicId: string, options?: QueryRegistryOptions): Promise<TopicRegistry>
```

Notes
- `createRegistry` sets the topic memo using `encodeHcs2RegistryMemo(registryType, ttl)`.
- `adminKey`/`submitKey` in `CreateRegistryOptions` accept boolean | string | PublicKey | PrivateKey; boolean defaults to the operator key.
- Indexed registries support UPDATE/DELETE with `uid`; non‑indexed do not.

## Browser Client (BrowserHCS2Client)

Wallet‑signed equivalents of the Node methods; params and results mirror the Node client. Transactions are frozen/executed with the provided signer.

## Builders (tx.ts)

```ts
function buildHcs2CreateRegistryTx(params: {
  registryType: HCS2RegistryType;
  ttl: number;
  adminKey?: import('@hashgraph/sdk').PublicKey;
  submitKey?: import('@hashgraph/sdk').PublicKey;
  memoOverride?: string;
  operatorPublicKey?: import('@hashgraph/sdk').PublicKey;
}): import('@hashgraph/sdk').TopicCreateTransaction;

function buildHcs2RegisterTx(params: { registryTopicId: string; targetTopicId: string; metadata?: string; memo?: string; analyticsMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;

function buildHcs2UpdateTx(params: { registryTopicId: string; uid: string; targetTopicId: string; metadata?: string; memo?: string; analyticsMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;

function buildHcs2DeleteTx(params: { registryTopicId: string; uid: string; memo?: string; analyticsMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;

function buildHcs2MigrateTx(params: { registryTopicId: string; targetTopicId: string; metadata?: string; memo?: string; analyticsMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

## Validation Rules

- Registry memo uses `hcs-2:<type>:<ttl>`.
- Message `p` must be `hcs-2` and `op` must be one of `REGISTER|UPDATE|DELETE|MIGRATE`.
- Indexed registries require unique `uid` for UPDATE/DELETE.

## Example

```ts
const c = new HCS2Client({ network: 'testnet', operatorId, operatorKey });
const created = await c.createRegistry({ registryType: HCS2RegistryType.INDEXED, ttl: 86400 });
await c.registerEntry(created.topicId!, { targetTopicId: '0.0.2001', metadata: 'app=chat' });
const reg = await c.getRegistry(created.topicId!);
```
