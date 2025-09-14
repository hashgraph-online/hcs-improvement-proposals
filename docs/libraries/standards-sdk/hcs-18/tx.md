---
sidebar_position: 5
---

# Transactions (tx.ts)

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer the higher‑level `sdk.ts` (Node) or `browser.ts` (wallet) clients.

All HCS‑18 transactions and payloads are constructed via builders in `tx.ts`. Clients do not hand‑assemble JSON.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-18
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-18/types.ts

## Topic Memo

```ts
import { buildHcs18DiscoveryMemo } from '@hashgraphonline/standards-sdk';

buildHcs18DiscoveryMemo();          // 'hcs-18:0'
buildHcs18DiscoveryMemo(300);       // 'hcs-18:0:300'
buildHcs18DiscoveryMemo(undefined, 'custom'); // 'custom'
```

Parameters
- `ttlSeconds?` number: Optional freshness hint encoded in the topic memo.
- `memoOverride?` string: Use a custom memo string (bypasses the standard memo format). Prefer for legacy topics or migrations.

## Create Discovery Topic

```ts
import { buildHcs18CreateDiscoveryTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs18CreateDiscoveryTopicTx({
  ttlSeconds: 300,
  adminKey,         // optional, boolean | Key
  submitKey,        // optional, boolean | Key
  operatorPublicKey // optional, used for defaults
});
```

Parameters
- `ttlSeconds?` number: Encoded into the memo as `hcs-18:0:<ttl>`.
- `adminKey?` MaybeKey: Allows setting topic admin; if `true`, uses operator key; or pass a specific key.
- `submitKey?` MaybeKey: Restricts submissions; if `true`, uses operator key; or pass a specific key.
- `operatorPublicKey?` PublicKey: Helpful for defaulting admin/submit when passing boolean flags.
- `memoOverride?` string: Full memo override.

Returns
- `TopicCreateTransaction` ready to sign and execute.

Usage
- Node: `await tx.execute(client).then(r => r.getReceipt(client))`
- Browser: `await (await tx.freezeWithSigner(signer)).executeWithSigner(signer)` then `getReceiptWithSigner` (advanced).

## Submit Message

```ts
import { buildHcs18SubmitDiscoveryMessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs18SubmitDiscoveryMessageTx({
  topicId: '0.0.x',
  message: { p: 'hcs-18', op: 'announce', data: { account: '0.0.123', petal: { name: 'A', priority: 700 }, capabilities: { protocols: ['hcs-16','hcs-18'] } } },
  transactionMemo: 'optional',
});
```

Parameters
- `topicId` string: Discovery topic ID.
- `message` DiscoveryMessage: One of the typed HCS‑18 envelopes (see below).
- `transactionMemo?` string: Optional Hedera transaction memo.

Returns
- `TopicMessageSubmitTransaction` ready to sign and execute.

## Announce — buildHcs18AnnounceMessage

Signature

```ts
buildHcs18AnnounceMessage(data: AnnounceData): DiscoveryMessage
```

Example

```ts
import { buildHcs18AnnounceMessage } from '@hashgraphonline/standards-sdk';

const msg = buildHcs18AnnounceMessage({
  account: '0.0.123',
  petal: { name: 'A', priority: 700 },
  capabilities: { protocols: ['hcs-16','hcs-18'] },
  valid_for: 300,
});
```

### AnnounceData
```ts
type AnnounceData = {
  account: string; // Hedera account ID of the Petal
  petal: { name: string; priority: number };
  capabilities: {
    protocols: string[];
    resources?: { compute?: 'high'|'medium'|'low'; storage?: 'high'|'medium'|'low'; bandwidth?: 'high'|'medium'|'low' };
    group_preferences?: { sizes?: number[]; threshold_ratios?: number[] };
  };
  valid_for?: number; // Optional time window hint for availability
};
```

## Propose — buildHcs18ProposeMessage

Signature

```ts
buildHcs18ProposeMessage(data: ProposeData): DiscoveryMessage
```

Example

```ts
import { buildHcs18ProposeMessage } from '@hashgraphonline/standards-sdk';

const msg = buildHcs18ProposeMessage({
  proposer: '0.0.1',
  members: [{ account: '0.0.2', priority: 500 }],
  config: { name: 'Demo Flora', threshold: 2 },
});
```

### ProposeData
```ts
type ProposeData = {
  proposer: string; // Hedera account of proposer
  members: Array<{ account: string; announce_seq?: number; priority: number }>;
  config: { name: string; threshold: number; purpose?: string; reason?: string };
  existing_flora?: string; // For replacement flows
};
```

## Respond — buildHcs18RespondMessage

Signature

```ts
buildHcs18RespondMessage(data: RespondData): DiscoveryMessage
```

Example

```ts
import { buildHcs18RespondMessage } from '@hashgraphonline/standards-sdk';

const msg = buildHcs18RespondMessage({
  responder: '0.0.2',
  proposal_seq: 10,
  decision: 'accept',
});
```

### RespondData
```ts
type RespondData = {
  responder: string; // Hedera account of the responding Petal
  proposal_seq: number; // Sequence number of the proposal message
  decision: 'accept' | 'reject';
  reason?: string;
  accepted_seq?: number;
};
```

## Complete — buildHcs18CompleteMessage

Signature

```ts
buildHcs18CompleteMessage(data: CompleteData): DiscoveryMessage
```

Example

```ts
import { buildHcs18CompleteMessage } from '@hashgraphonline/standards-sdk';

const msg = buildHcs18CompleteMessage({
  proposer: '0.0.1',
  proposal_seq: 10,
  flora_account: '0.0.500',
  topics: { communication: '0.0.600', transaction: '0.0.601', state: '0.0.602' },
});
```

### CompleteData
```ts
type CompleteData = {
  proposer: string;
  proposal_seq: number;
  flora_account: string;
  topics: { communication: string; transaction: string; state: string };
};
```

## Withdraw — buildHcs18WithdrawMessage

Signature

```ts
buildHcs18WithdrawMessage(data: WithdrawData): DiscoveryMessage
```

Example

```ts
import { buildHcs18WithdrawMessage } from '@hashgraphonline/standards-sdk';

const msg = buildHcs18WithdrawMessage({
  account: '0.0.2',
  announce_seq: 42,
  reason: 'going offline',
});
```

### WithdrawData
```ts
type WithdrawData = {
  account: string;
  announce_seq: number;
  reason?: string;
};
```

Notes
- Use the builders to ensure the `p: 'hcs-18'` and `op` fields are correct.
- Builders return plain JSON; pair with `buildHcs18SubmitDiscoveryMessageTx` to create a signed transaction.
