---
title: Node — HCS‑3
description: Resolve inscribed resources and compose recursive content from Node.
sidebar_position: 2
---

```ts
import { HCS3 } from '@hashgraphonline/standards-sdk';

const client = new HCS3.HCS({ cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/', network: 'testnet' });
const html = await client.loadText('hcs://1/0.0.12345');
```

