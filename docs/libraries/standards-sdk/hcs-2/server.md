---
title: Node — HCS‑2Client
description: Create registries, register/update/delete entries, and query HCS‑2 topics from Node.
sidebar_position: 2
---

```ts
import 'dotenv/config';
import { HCS2Client, HCS2RegistryType } from '@hashgraphonline/standards-sdk';

const client = new HCS2Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});

const reg = await client.createRegistry({ registryType: HCS2RegistryType.INDEXED, ttl: 86400 });
await client.registerEntry(reg.topicId!, {
  targetTopicId: '0.0.700123',
  metadata: 'https://example.com/meta.json',
});
```
