---
title: Node — HCS‑3
description: Resolve inscribed resources and compose recursive content from Node.
sidebar_position: 2
---

```ts
import { HCS } from '@hashgraphonline/standards-sdk';

const client = new HCS();
client.config.network = 'testnet';

const blob = await client.retrieveHCS1Data('0.0.12345');
const html = await blob.text();
```
