---
sidebar_position: 3
---

# Browser SDK (HCS17BrowserClient)

The browser client builds transactions and submits them via a connected wallet (`DAppSigner`). It mirrors the Node API where possible and shares core logic with the base client.

## Setup

You can pass either a `DAppSigner` directly or a `HashinalsWalletConnectSDK` instance.

```ts
import { HCS17BrowserClient } from '@hashgraphonline/standards-sdk';
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';

const hwc = new HashinalsWalletConnectSDK();
await hwc.init(/* options */);
await hwc.connect(/* options */);

const client = new HCS17BrowserClient({
  network: 'testnet',
  hwc,
  logLevel: 'info',
});
```

Or provide a signer directly if your app manages it:

```ts
const client = new HCS17BrowserClient({
  network: 'testnet',
  signer: myDAppSigner,
});
```

## Create a State Topic

Creates a topic with an HCS‑17 memo (`hcs-17:<type>:<ttl>`), signing with the connected wallet.

```ts
const topicId = await client.createStateTopic({ ttl: 86400 });
```

## Submit a Message

```ts
const msg = client.createStateHashMessage(
  'abc123…',
  '0.0.1234',
  ['0.0.2001','0.0.2002'],
  'optional browser memo',
);

await client.submitMessage(topicId, msg);
```

## Compute and Publish

Identical to Node: fetch latest running hashes, compute, publish.

```ts
const { stateHash } = await client.computeAndPublish({
  accountId: '0.0.1234',
  accountPublicKey: '302a30…',
  topics: ['0.0.2001', '0.0.2002'],
  publishTopicId: topicId,
  memo: 'browser flow',
});
```

## Read Latest Messages

```ts
const recent = await client.getRecentMessages(topicId, { limit: 10 });
const latest = await client.getLatestMessage(topicId);
```

## Notes

- Submissions use the signer (`freezeWithSigner`, `executeWithSigner`, `getReceiptWithSigner`).
- All JSON construction is centralized in `tx.ts` builders.
- No dynamic imports; the client relies on the signer passed in.

