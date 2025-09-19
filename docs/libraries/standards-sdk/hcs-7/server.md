---
title: Node — HCS‑7 Bridges
description: Use the EVM and WASM bridges from Node to build programmable on‑graph assets.
sidebar_position: 2
---

```ts
import { HCS7 } from '@hashgraphonline/standards-sdk';

const evm = new HCS7.EVMBridge('mainnet-public');
const wasm = new HCS7.WasmBridge();
```

