---
title: Browser — HCS‑3
description: Resolve and render HCS content in the browser.
sidebar_position: 3
---

```ts
import { HCS3 } from '@hashgraphonline/standards-sdk';

const hcs = new HCS3.HCS({ cdnUrl: 'https://kiloscribe.com/api/inscription-cdn/', network: 'testnet' });
const img = await hcs.loadImage('hcs://1/0.0.20001');
```

