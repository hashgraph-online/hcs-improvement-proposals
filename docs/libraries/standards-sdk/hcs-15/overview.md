---
title: Overview — HCS‑15 Petal Accounts
description: What Petal accounts are, how they work, and how to use the Standards SDK to create and manage them.
sidebar_position: 1
---

HCS‑15 introduces Petal accounts: lightweight sub‑accounts that share the same private key as a user’s base account. Petals let you isolate identity, balances, and app state per experience while keeping a single signing key.

## What HCS‑15 Enables

- Multiple on‑chain personas under one key (e.g., per‑app profiles)
- Isolated balances and escrows per Petal
- Consistent signing and authorization via a single private key

## Who Is This For?

- Apps that want separate “personas” (gaming, finance, social) under one wallet
- Teams that need clean accounting per experience without multiple seed phrases
- Users who want isolation without additional key management

## Architecture

```mermaid
graph TD
  subgraph Core
    B[HCS15BaseClient]
    T[tx.ts builders]
  end

  subgraph Node
    S[HCS15Client]
  end

  subgraph Browser
    W[HCS15BrowserClient]
  end

  B --> S
  B --> W
  T --> S
  T --> W
```

- Base client exposes verification and shared utilities.
- Environment‑specific clients handle signing and submission:
  - `HCS15Client` (Node) uses operator credentials
  - `HCS15BrowserClient` (Browser) uses a connected wallet (`DAppSigner`)
- All transactions are assembled by `tx.ts` builders (no JSON assembly in clients).

## When To Use (and Not Use)

- Use when you need separate account ids for isolation or quotas under one owner
- Don’t use if each persona needs a different signing key (use fully separate accounts instead)

## Costs and Limits

- Creating accounts costs HBAR (initial balance + fees)
- Petals reuse the base key, so no extra key custody required

## Quickstart (Copy/Paste)

```ts
import { HCS15Client } from '@hashgraphonline/standards-sdk';
const c = new HCS15Client({ network: 'testnet', operatorId, operatorKey });
const base = await c.createBaseAccount({ initialBalance: 10 });
await c.createPetalAccount({ basePrivateKey: base.privateKey });
```

## FAQ

- Is a Petal truly independent? It has its own account id and balance but shares the same signing key.
- Can I revoke a Petal? Move funds out and stop using it; key custody is shared, so revocation is social/operational.

## Where to Next

1. Node SDK: [/docs/libraries/standards-sdk/hcs-15/server](/docs/libraries/standards-sdk/hcs-15/server)
2. Browser SDK: [/docs/libraries/standards-sdk/hcs-15/browser](/docs/libraries/standards-sdk/hcs-15/browser)
3. Transactions: [/docs/libraries/standards-sdk/hcs-15/tx](/docs/libraries/standards-sdk/hcs-15/tx)
4. API Reference: [/docs/libraries/standards-sdk/hcs-15/api](/docs/libraries/standards-sdk/hcs-15/api)
