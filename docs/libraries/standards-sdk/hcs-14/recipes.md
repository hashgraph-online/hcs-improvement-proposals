---
sidebar_position: 5
---

# Recipes

## A2A / Web2 — Deterministic AID

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();

const uaid = await hcs14.createUaid(
  {
    registry: 'microsoft',
    name: 'Customer Support Assistant',
    version: '1.0.0',
    protocol: 'a2a',
    nativeId: 'microsoft.com',
    skills: [0, 17, 19],
  },
  { uid: 'customer-support-assistant' },
);
```

## did:web — Wrap an existing DID

```ts
const hcs14 = new HCS14Client();
const uaid = hcs14.createUaid('did:web:agent.example.com', {
  uid: 'support-bot',
  proto: 'a2a',
  nativeId: 'agent.example.com',
});
```

## EVM (EIP‑155) — Deterministic AID

```ts
const hcs14 = new HCS14Client();
const nativeId = hcs14.toEip155Caip10(1, '0x742d35Cc6634C0532925a3b844Bc9e7595f41Bd');
const uaid = await hcs14.createUaid({
  registry: 'virtuals',
  name: 'Commerce Bot',
  version: '1.0.0',
  protocol: 'acp-virtuals',
  nativeId,
  skills: [0, 33],
});
```

## Attach UAID to HCS‑11 Profile

If missing and Hedera credentials are configured, the SDK issues a `did:hedera` and attaches a UAID when creating an HCS‑11 profile.

```ts
pnpm run demo:hcs-11:profile
pnpm run demo:hcs-11:resolve-uaid
```

