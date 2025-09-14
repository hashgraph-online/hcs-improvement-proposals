---
title: Transactions — HCS‑6
description: HCS‑6 uses non‑indexed registries; messages record only the latest state.
sidebar_position: 4
---

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer the higher‑level `sdk.ts` (Node) or `browser.ts` (wallet) clients.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-6
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/types.ts

HCS‑6 uses a non‑indexed registry memo (`hcs-6:1:<ttl>`) and defines two builders for creating the registry and registering entries.

## Create Registry — buildHcs6CreateRegistryTx

Signature

```ts
buildHcs6CreateRegistryTx(params: {
  ttl: number;
  submitKey?: boolean | string | Key; // MaybeKey
  adminKey?: boolean | string | Key;  // MaybeKey
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Example

```ts
import { buildHcs6CreateRegistryTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs6CreateRegistryTx({ ttl: 3600, adminKey: true, submitKey: true });
// Node
const receipt = await (await tx.execute(client)).getReceipt(client);
```

Notes
- Defaults memo to `hcs-6:1:<ttl>` unless `memoOverride` is provided.
- `adminKey`/`submitKey` accept boolean (use operator), raw string, or Key.

## Register Entry — buildHcs6RegisterEntryTx

Signature

```ts
buildHcs6RegisterEntryTx(params: {
  registryTopicId: string;
  targetTopicId: string;
  memo?: string;          // payload memo field
  analyticsMemo?: string; // Hedera tx memo
}): TopicMessageSubmitTransaction
```

Example

```ts
import { buildHcs6RegisterEntryTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs6RegisterEntryTx({
  registryTopicId: '0.0.111',
  targetTopicId: '0.0.222',
  memo: 'register my dynamic inscription',
  analyticsMemo: 'hcs-6 register',
});
// Node
await (await tx.execute(client)).getReceipt(client);
```

Payload

```json
{ "p": "hcs-6", "op": 0, "t_id": "0.0.222", "m": "register my dynamic inscription" }
```

Source
- https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-6/tx.ts
