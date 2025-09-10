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
- Integrates `did:hedera` issuance/resolution via Hiero (built-in dependency)

## Getting Started

### Installation

```bash
pnpm add @hashgraphonline/standards-sdk
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
// For HCS-10 on Hedera, set uid to the operator_id (inboundTopicId@accountId) when available
const uaid = hcs14.generateUaidDid('did:hedera:testnet:zK3Y_0.0.12345', {
  uid: '0.0.12345',
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

Resolving `uaid:did` uses the integrated Hiero resolver; register it on the client’s resolver registry when you need resolution.

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();
hcs14.registerHederaResolver();

const doc = await hcs14.getResolverRegistry().resolveUaid(
  'uaid:did:zK3Y_0.0.12345;uid=0.0.12345;proto=hcs-10;nativeId=hedera:testnet:0.0.12345',
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

Resolution uses the built-in Hiero resolver; AID/UAID generation remains fully functional in both Node and browser.

## Other Networks and Web2 Agents

HCS‑14 is protocol‑agnostic. Below are examples for EVM (EIP‑155 CAIP‑10) and Web2 A2A/REST agents.

### EVM (EIP‑155 CAIP‑10) — AID target

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();

// Build an EIP‑155 CAIP‑10 nativeId (e.g., chainId=1 for Ethereum mainnet)
const nativeId = hcs14.toEip155Caip10(1, '0x742d35Cc6634C0532925a3b844Bc9e7595f41Bd');

// Create a deterministic AID UAID for an EVM agent (e.g., Virtuals/OLAS)
const uaidAid = await hcs14.generateAidDid({
  registry: 'virtuals',
  name: 'Commerce Bot',
  version: '1.0.0',
  protocol: 'acp-virtuals',
  nativeId, // eip155:1:0x...
  skills: [0, 33],
});
// uaid:aid:...;uid=0;registry=virtuals;nativeId=eip155:1:0x...
```

### Web2 A2A — AID target (domain + agent name)

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();

// A2A agents use a domain as nativeId and the agent's name as uid
const a2aUaid = await hcs14.generateAidDid(
  {
    registry: 'microsoft',
    name: 'Customer Support Assistant',
    version: '1.0.0',
    protocol: 'a2a',
    nativeId: 'microsoft.com',
    skills: [0, 17, 19],
  },
  { uid: 'customer-support-assistant' }
);
// uaid:aid:...;uid=customer-support-assistant;registry=microsoft;nativeId=microsoft.com
```

### did:web — DID target (wrap an existing Web2 DID)

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();

// If your Web2 agent already has a DID (did:web), wrap it as a UAID with routing
const webDid = 'did:web:agent.example.com';
const uaidDid = hcs14.generateUaidDid(webDid, {
  uid: 'support-bot', // Web2 agent identifier
  proto: 'a2a',
  nativeId: 'agent.example.com',
});
// uaid:did:agent.example.com;uid=support-bot;proto=a2a;nativeId=agent.example.com
```

These examples show consistent UAID generation for non‑Hedera networks and Web2 agents:
- Use CAIP‑10 for account‑based networks (e.g., EVM via EIP‑155).
- Use domains for Web2/A2A/REST agents in nativeId, and carry the agent name in uid.

### Hedera uid derivation (proto=hcs-10)

For HCS‑10 on Hedera, `uid` should be the operator_id when available, defined as `inboundTopicId@accountId`. The SDK derives this automatically when you issue a DID and wrap it as a UAID.

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client({
  network: 'testnet',
  operatorId: '0.0.12345',
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
});

const { did, uaid, parsed } = await hcs14.createDidAndUaid({ proto: 'hcs-10' });
// If your account already has an HCS‑11 profile with inbound topic, uid becomes inboundTopicId@accountId.
// Otherwise, uid temporarily falls back to the accountId.
```
