---
title: Base Client — HCS‑15
description: Shared helpers for HCS‑15 across Node and Browser clients.
sidebar_position: 2
---

The base client provides utilities shared by both Node and Browser implementations.

## verifyPetalAccount

```ts
import { HCS15BaseClient } from '@hashgraphonline/standards-sdk';

const base = new HCS15BaseClient({ network: 'testnet' });
const ok = await base.verifyPetalAccount('0.0.PETAL', '0.0.BASE');
```

Verifies that both accounts share the same public key by querying Mirror Node.

