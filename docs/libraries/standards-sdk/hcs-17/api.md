---
sidebar_position: 99
---

# HCS‑17 API Reference

Complete, literal reference for the HCS‑17 module in `@hashgraphonline/standards-sdk`. For conceptual guidance and flows, see the HCS‑17 SDK guide and standard.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-17
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/types.ts
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-17/tx.ts

## Import Paths

```ts
// Barrel export
import {
  HCS17Client,
  HCS17BrowserClient,
  HCS17TopicType,
  generateHCS17Memo,
  parseHCS17Memo,
  buildHcs17CreateTopicTx,
  buildHcs17MessageTx,
  type StateHashMessage,
  type AccountStateInput,
  type CompositeStateInput,
  type StateHashResult,
  type CompositeStateHashResult,
  type HCS17ClientConfig,
  type SDKHCS17ClientConfig,
  type BrowserHCS17ClientConfig,
} from '@hashgraphonline/standards-sdk';

// Direct path (optional)
import * as HCS17 from '@hashgraphonline/standards-sdk/hcs-17';
```

## Topic Memo

- Format: `hcs-17:<type>:<ttl>` where `<type>` is numeric and `<ttl>` is a positive integer (seconds).
- Enum: `HCS17TopicType.STATE = 0`.

Helpers:

```ts
function generateHCS17Memo(ttl: number): string;
function parseHCS17Memo(memo: string): { type: HCS17TopicType; ttl: number } | undefined;
```

## Types

```ts
type TopicState = { topicId: string; latestRunningHash: string };

interface AccountStateInput {
  accountId: string;
  publicKey: import('@hashgraph/sdk').PublicKey | string;
  topics: TopicState[];
}

interface CompositeStateInput {
  compositeAccountId: string;
  compositePublicKeyFingerprint: string; // deterministic fingerprint of threshold key
  memberStates: Array<{ accountId: string; stateHash: string }>;
  compositeTopics: TopicState[];
}

interface StateHashMessage {
  p: 'hcs-17';
  op: 'state_hash';
  state_hash: string;
  topics: string[];
  account_id: string;
  timestamp?: string; // ISO8601
  m?: string;         // optional application memo
}

interface StateHashResult {
  stateHash: string;
  accountId: string;
  timestamp: Date;
  topicCount: number;
}

interface CompositeStateHashResult extends StateHashResult {
  memberCount: number;
  compositeTopicCount: number;
}

interface HCS17ClientConfig {
  network: 'mainnet' | 'testnet';
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  silent?: boolean;
  mirrorNodeUrl?: string; // override
  logger?: any;           // custom logger (ILogger compatible)
}

interface SDKHCS17ClientConfig extends HCS17ClientConfig {
  operatorId: string;
  operatorKey: string | import('@hashgraph/sdk').PrivateKey;
  keyType?: 'ed25519' | 'ecdsa';
}

interface BrowserHCS17ClientConfig extends HCS17ClientConfig {
  hwc?: import('@hashgraphonline/hashinal-wc').HashinalsWalletConnectSDK;
  signer?: import('@hashgraph/hedera-wallet-connect').DAppSigner;
}
```

## Enum

```ts
enum HCS17TopicType {
  STATE = 0,
}
```

## Message Schema (canonical)

```json
{
  "p": "hcs-17",
  "op": "state_hash",
  "state_hash": "<hex>",
  "topics": ["0.0.123", "0.0.456"],
  "account_id": "0.0.999",
  "timestamp": "2025-09-14T10:00:00.000Z",
  "m": "optional"
}
```

## Base Client (selected)

The following methods are inherited by both Node and Browser clients.

```ts
// Constructed internally by concrete clients

// Validate an existing HCS‑17 topic by memo
validateHCS17Topic(topicId: string): Promise<{ valid: boolean; type?: HCS17TopicType; ttl?: number; error?: string }>;

// Mirror node helpers (validated parsing)
getRecentMessages(
  topicId: string,
  options?: { limit?: number; order?: 'asc' | 'desc' }
): Promise<Array<{ message: StateHashMessage; consensus_timestamp?: string; sequence_number: number; payer?: string }>>;

getLatestMessage(topicId: string): Promise<(StateHashMessage & { consensus_timestamp?: string; sequence_number: number }) | null>;

// Hashing utilities
calculateAccountStateHash(input: AccountStateInput): StateHashResult;
calculateCompositeStateHash(input: CompositeStateInput): CompositeStateHashResult;
calculateKeyFingerprint(keys: import('@hashgraph/sdk').PublicKey[], threshold: number): string;
verifyStateHash(input: AccountStateInput | CompositeStateInput, expectedHash: string): Promise<boolean>;

// Message helper
createStateHashMessage(stateHash: string, accountId: string, topicIds: string[], memo?: string): StateHashMessage;
```

Notes
- Account state hash sorts topics lexicographically by `topicId` and hashes `topicId || runningHash` values plus the public key (SHA‑384).
- Composite state hash sorts members by `accountId`, then composite topics by `topicId`, and appends the threshold key fingerprint.
- `verifyStateHash` recomputes with the same rules and compares to `expectedHash`.

## Node Client (HCS17Client)

```ts
constructor(config: SDKHCS17ClientConfig)
getKeyType(): 'ed25519' | 'ecdsa'

createStateTopic(options?: {
  ttl?: number; // default 86400
  adminKey?: boolean | string | import('@hashgraph/sdk').PublicKey | import('@hashgraph/sdk').KeyList;
  submitKey?: boolean | string | import('@hashgraph/sdk').PublicKey | import('@hashgraph/sdk').KeyList;
}): Promise<string>

submitMessage(topicId: string, message: StateHashMessage): Promise<import('@hashgraph/sdk').TransactionReceipt>

computeAndPublish(params: {
  accountId: string;
  accountPublicKey: string | import('@hashgraph/sdk').PublicKey;
  topics: string[];        // topics to include in hash
  publishTopicId: string;  // destination topic for the message
  memo?: string;
}): Promise<{ stateHash: string; receipt: import('@hashgraph/sdk').TransactionReceipt }>
```

Throws
- `Invalid HCS-17 message: …` (on `submitMessage` when schema validation fails)
- `Failed to create topic: topicId empty` (unexpected Mirror Node/SDK response)

Example

```ts
const c = new HCS17Client({ network: 'testnet', operatorId, operatorKey });
const topicId = await c.createStateTopic({ ttl: 86400 });
const { stateHash } = await c.computeAndPublish({
  accountId: '0.0.1234',
  accountPublicKey: '302a30…',
  topics: ['0.0.2001','0.0.2002'],
  publishTopicId: topicId,
});
```

## Browser Client (HCS17BrowserClient)

```ts
constructor(config: BrowserHCS17ClientConfig)

createStateTopic(options?: {
  ttl?: number; // default 86400
  adminKey?: boolean | string;  // string = hex/der of key; depends on wallet support
  submitKey?: boolean | string;
}): Promise<string>

submitMessage(topicId: string, message: StateHashMessage): Promise<{ transactionId?: string }>

computeAndPublish(params: {
  accountId: string;
  accountPublicKey: string | import('@hashgraph/sdk').PublicKey;
  topics: string[];
  publishTopicId: string;
  memo?: string;
}): Promise<{ stateHash: string }>
```

Throws
- `No active wallet connection` (no account bound)
- `No active wallet signer` (connector has no signer)
- `Invalid HCS-17 message: …` (on `submitMessage` when schema validation fails)

Example

```ts
const c = new HCS17BrowserClient({ network: 'testnet', signer });
const topicId = await c.createStateTopic({ ttl: 86400 });
const out = await c.computeAndPublish({
  accountId: '0.0.1234',
  accountPublicKey: '302a30…',
  topics: ['0.0.2001','0.0.2002'],
  publishTopicId: topicId,
});
```

## Builders (tx.ts)

```ts
function buildHcs17CreateTopicTx(params: {
  ttl: number;
  adminKey?: boolean | string | import('@hashgraph/sdk').PublicKey | import('@hashgraph/sdk').KeyList;
  submitKey?: boolean | string | import('@hashgraph/sdk').PublicKey | import('@hashgraph/sdk').KeyList;
  operatorPublicKey?: import('@hashgraph/sdk').PublicKey; // Node helper defaulting
}): import('@hashgraph/sdk').TopicCreateTransaction;

function buildHcs17MessageTx(params: {
  topicId: string;
  stateHash: string;
  accountId: string;
  topics: string[];
  memo?: string;
  transactionMemo?: string;
}): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

Notes
- The message builder includes an ISO timestamp automatically.
- Use `transactionMemo` to set the Hedera transaction memo (separate from `m`).

## Reading Messages

```ts
// Recent, validated messages (filtering non‑HCS‑17 entries)
const recent = await client.getRecentMessages('0.0.7777', { limit: 25, order: 'desc' });

// Latest only (or null)
const latest = await client.getLatestMessage('0.0.7777');
```

## Validation Rules

- `parseHCS17Memo` accepts only `hcs-17:<number>:<positive integer>`.
- Message `p` must be `hcs-17` and `op` must be `state_hash`.
- `state_hash` and `account_id` are required; `topics` must be an array of strings.

## Error Types

```ts
class StateHashError extends Error {
  readonly code: string; // implementation-defined
}
```

Note: The clients throw standard `Error` with codes in messages; `StateHashError` is available for users who prefer explicit typing in their apps.
