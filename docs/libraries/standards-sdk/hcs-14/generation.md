---
sidebar_position: 2
---

# UAID Generation

UAID has two targets that share one grammar: `uaid:{aid|did}:{id};{params}`.

- `uaid:aid:` – deterministic from canonical agent data
- `uaid:did:` – wraps an existing DID; no new hash

## Canonical Schema (AID)

Only these six fields are hashed:

```json
{
  "registry": "string",
  "name": "string",
  "version": "string",
  "protocol": "string",
  "nativeId": "string",
  "skills": [0]
}
```

Rules
- Lowercase and trim `registry`, `protocol`; trim others
- Sort `skills` numeric ascending; serialize with sorted keys
- Hash JSON with SHA‑384; Base58‑encode

## Routing Parameters

Order: `uid`, `registry`, `proto`, `nativeId`, `domain` (then optional `src`).

- `uid` (required). Hedera HCS‑10: prefer `inboundTopicId@accountId` when available; otherwise `accountId`. Use `0` if not applicable.
- `registry`. Organizational namespace (e.g., `microsoft`, `hol`).
- `proto`. Protocol (e.g., `a2a`, `hcs-10`, `mcp`).
- `nativeId`. Protocol‑native unique identifier (domains for A2A; CAIP‑10 for Hedera/EVM).
- `domain` (optional). Human domain if distinct from `nativeId`.
- `src` (uaid:did only). Multibase base58btc of the full source DID when sanitization stripped suffixes.

## API

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();

// UAID from canonical agent data (AID)
const aid = await hcs14.createUaid({
  registry: 'acme',
  name: 'Support',
  version: '1.0.0',
  protocol: 'a2a',
  nativeId: 'acme.example',
  skills: [0, 17]
}, { uid: 'support' });

// UAID from an existing DID (DID)
const didUaid = hcs14.createUaid('did:web:agent.example', {
  uid: 'bot', proto: 'a2a', nativeId: 'agent.example'
});
```

