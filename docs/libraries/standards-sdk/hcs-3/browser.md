---
title: Browser — HCS‑3
description: Resolve and render HCS content in the browser.
sidebar_position: 3
---

```ts
import { HCS } from '@hashgraphonline/standards-sdk';

const hcs = new HCS();
hcs.config.network = 'testnet';

const imageElement = document.createElement('img');
imageElement.setAttribute('data-src', 'hcs://1/0.0.20001');

await hcs.loadImage(imageElement);
```
