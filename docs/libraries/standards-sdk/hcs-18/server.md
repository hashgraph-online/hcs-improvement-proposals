---
sidebar_position: 2
---

# Node SDK (HCS18Client)

`HCS18Client` is your orchestrator for discovery and formation. It signs with your operator credentials, reads from mirror‑node, and exposes ergonomic helpers for each HCS‑18 operation.

Use it when:

- Your service coordinates multiple petals (e.g., proposing, tracking responses, creating the Flora)
- You need to poll and build local discovery state reliably
- You want to trigger HCS‑16 creation once you have a quorum

## Initialize

```ts
import { HCS18Client, NetworkType } from '@hashgraphonline/standards-sdk';

const client = new HCS18Client({
  network: 'testnet' as NetworkType,
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});
```

## Create Discovery Topic (when you’re bootstrapping)

```ts
const { topicId } = await client.createDiscoveryTopic({ ttlSeconds: 300 });
```

## Announce (show up on the airwaves)

```ts
await client.announce({
  discoveryTopicId: topicId,
  data: {
    account: process.env.HEDERA_ACCOUNT_ID!,
    petal: { name: 'Petal-A', priority: 700 },
    capabilities: { protocols: ['hcs-16', 'hcs-18'] },
    valid_for: 10000,
  },
  memo: 'ready', // transaction memo (optional)
});
```

## Propose / Respond (build consent)

```ts
const { sequenceNumber: proposalSeq } = await client.propose({
  discoveryTopicId: topicId,
  data: {
    proposer: '0.0.123',
    members: [
      { account: '0.0.123', priority: 700 },
      { account: '0.0.456', priority: 600, announce_seq: 101 },
    ],
    config: { name: 'Demo Flora', threshold: 2, purpose: 'testing' },
  },
});

await client.respond({
  discoveryTopicId: topicId,
  data: { responder: '0.0.456', proposal_seq: proposalSeq, decision: 'accept' },
});
```

## Completion (hand‑off to HCS‑16)

```ts
import { FloraAccountManager } from '@hashgraphonline/standards-sdk';

// After enough acceptances, create the Flora and emit `complete`
const floraMgr = new FloraAccountManager(hederaClient, 'testnet');
const flora = await floraMgr.createFlora({
  displayName: 'Demo Flora',
  members: [
    { accountId: '0.0.123', publicKey: pubA, privateKey: privA },
    { accountId: '0.0.456', publicKey: pubB },
  ],
  threshold: 2,
  initialBalance: 10,
});

await client.complete({
  discoveryTopicId: topicId,
  data: {
    proposer: '0.0.123',
    proposal_seq: proposalSeq,
    flora_account: flora.floraAccountId.toString(),
    topics: {
      communication: flora.topics.communication.toString(),
      transaction: flora.topics.transaction.toString(),
      state: flora.topics.state.toString(),
    },
  },
});
```

## Reading Discovery State (keep it tidy)

```ts
const messages = await client.getDiscoveryMessages(topicId, { sequenceNumber: 'gt:0', order: 'asc' });
// Filter by op and track announcements/proposals locally
```

## Helper: Acceptance (a sensible default)

```ts
// proposal: { data: { members: [...] }, responses: Map<string, RespondData> }
const ready = client.isProposalReady(proposal);
```
## Operational Tips

- Persist last seen sequence number per discovery topic.
- Tolerate mirror‑node lag: retry reads with small backoff windows.
- Log proposals and responses with timestamps for audits.
- Avoid hammering mirror‑node: batch reads and limit pages.

