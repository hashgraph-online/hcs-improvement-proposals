---
title: Node — HCS‑6Client
description: Manage dynamic hashinals (latest‑state registries) from Node.
sidebar_position: 2
---

```ts
import 'dotenv/config';
import { HCS6Client } from '@hashgraphonline/standards-sdk';

const client = new HCS6Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});

const reg = await client.createDynamicRegistry({ ttl: 86400 });
await client.upsert(reg.topicId, { key: 'latest', value: { version: 1 } });
```

