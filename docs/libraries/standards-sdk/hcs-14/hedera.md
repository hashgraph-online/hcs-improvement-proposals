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

## Resolve DID / UAID Profiles

The Hedera resolver is registered automatically by `HCS14Client`.

```ts
const didProfile = await hcs14.resolveDidProfile('did:hedera:testnet:0.0.1234');
const uaidProfile = await hcs14.resolveUaidProfile('uaid:did:z6Mk...;uid=0;proto=hcs-10;nativeId=hedera:testnet:0.0.1234');
const didDocument = await hcs14.getResolverRegistry().resolveUaid('uaid:did:z6Mk...;uid=0;proto=hcs-10;nativeId=hedera:testnet:0.0.1234');
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
pnpm run demo:hcs-14:aid-generate
pnpm run demo:hcs-14:hiero-issue-uaid
pnpm run demo:hcs-14:issue-resolve
pnpm run demo:hcs-14:resolve-profile
```
