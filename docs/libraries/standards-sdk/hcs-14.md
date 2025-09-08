---
sidebar_position: 9
---

# HCS-14: Universal Agent Identifier (UAID)

HCS-14 provides SDK helpers and a small client facade to create and use agent identifiers:

- AID target (`uaid:aid:`) – deterministic identifier derived from canonical agent data
- DID target (`uaid:did:`) – wraps an existing W3C DID (e.g., `did:hedera:`), adding routing parameters

## What HCS-14 Does

- Provides strict canonicalization for AID hashing inputs
- Generates AID/UAID in Node and browser environments
- Includes CAIP helpers (Hedera CAIP‑10, EVM CAIP‑10)
- Integrates optional `did:hedera` resolution via Hiero (dynamic dependency)

## Getting Started

### Installation

```bash
pnpm add @hashgraphonline/standards-sdk

# Optional: only if you need did:hedera resolution or want to issue a did:hedera in demos
pnpm add -D @hiero-did-sdk/resolver @hiero-did-sdk/registrar
```

### Basic Setup (Node.js)

The HCS14Client exposes a conventional SDK entry similar to other standards (e.g., HCS‑12):

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';
// or: import { HCS14Client } from '@hashgraphonline/standards-sdk/hcs-14';

const hcs14 = new HCS14Client();

// AID target (uaid:aid) from canonical agent data
const aid = await hcs14.generateAidDid({
  registry: 'hol',
  name: 'Support Agent',
  version: '1.0.0',
  protocol: 'hcs-10',
  nativeId: 'hedera:testnet:0.0.123456', // CAIP‑10 example
  skills: [0, 17],
});

// DID target (uaid:did) wrapping an existing DID
const uaid = hcs14.generateUaidDid('did:hedera:testnet:zK3Y_0.0.12345', {
  uid: '0',
  proto: 'hcs-10',
  nativeId: 'hedera:testnet:0.0.12345',
});

// Parse either form
const parsed = hcs14.parseHcs14Did(uaid);

// CAIP helpers via client (also exported as functions)
const canonical = hcs14.toHederaCaip10('testnet', '0.0.123456');
```

### Basic Setup (Browser)

Generation works in modern browsers via the SDK’s crypto abstraction (Node Crypto, WebCrypto, or SSR‑safe fallback). The same client API is usable in browser contexts, or import functional helpers from `@hashgraphonline/standards-sdk/hcs-14/browser` if you prefer tree‑shaking.

Notes:
- UAID id equals the base DID’s sanitized method‑specific identifier; no new hash is computed.
- When sanitization removes method‑specific parameters/query/fragment from the base DID, implementations may add a `src` parameter containing the full original DID encoded in multibase base58btc (`z…`).

### Resolving UAID to a DID (Hedera example)

Resolving `uaid:did` is optional and requires the Hiero resolver package. The HCS14Client integrates it via the resolver registry; if the dependency is absent, resolution returns `null` and the SDK Logger emits an error (module: `hcs-14:hiero-resolver`).

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();
hcs14.registerHederaResolver();

const doc = await hcs14.getResolverRegistry().resolveUaid(
  'uaid:did:zK3Y_0.0.12345;uid=0;proto=hcs-10;nativeId=hedera:testnet:0.0.12345',
);
// doc is { id: 'did:hedera:testnet:...' } or null
```

## Demos

From the `standards-sdk` package folder:

Environment (`.env`):

```
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxxx
HEDERA_PRIVATE_KEY=302e0201003005...
```

Commands:

```
pnpm run demo:hcs-14:issue-resolve          # issue did:hedera and resolve wrapped UAID
pnpm exec tsx demo/hcs-14/aid-generate.ts   # local AID generation (no network)
pnpm exec tsx demo/hcs-14/resolve-did.ts    # resolve an existing DID (set HCS14_DID)
```

If `@hiero-did-sdk/resolver` is not installed, the UAID resolver returns `null` and logs an error via the SDK Logger. AID/UAID generation remains fully functional in both Node and browser.
