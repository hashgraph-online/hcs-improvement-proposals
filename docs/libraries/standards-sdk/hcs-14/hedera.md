---
sidebar_position: 4
---

# Hedera (Optional)

Hedera support is optional. Use it when you want to issue `did:hedera` and resolve Hedera DIDs from UAIDs.

## Issue `did:hedera`

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
});

const did = await hcs14.createDid({ method: 'hedera', client /* configured Hedera Client */ });
```

## Issue and generate UAID together

For HCS‑10 on Hedera, `uid` derives to `inboundTopicId@accountId` when available (falls back to `accountId`). `nativeId` uses Hedera CAIP‑10.

```ts
const { did, uaid, parsed } = await hcs14.createDidWithUaid({
  issue: { method: 'hedera', client },
  proto: 'hcs-10',
});
```

## Resolve UAID → DID

The Hedera resolver is registered automatically by `HCS14Client`.

```ts
const doc = await hcs14.getResolverRegistry().resolveUaid('uaid:did:...');
```

## Demos

Environment (`.env`):

```
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxxx
HEDERA_PRIVATE_KEY=302e0201003005...
```

Commands:

```
pnpm run demo:hcs-14:issue-resolve
pnpm exec tsx demo/hcs-14/resolve-did.ts
```
