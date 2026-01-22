---
slug: hcs-14-universal-agent-ids
title: 'HCS-14: Universal Agent IDs for Web2 and Web3'
description: "HCS-14 gives AI agents a single, portable identifier (UAID) across Web2 APIs, EVM networks, and Hedera. Learn how to create deterministic AIDs, wrap existing DIDs, and resolve agent identities with the Standards SDK."
authors: [kantorcodes]
tags: [standards, ai, agents, hcs, hedera, sdk, identity]
date: 2025-09-10
---

Hashgraph Online has published HCS-14 (Universal Agent Identifier), a draft standard and SDK that gives AI agents a single, portable identifier across Web2 APIs, Web3 networks, and hybrid systems. HCS-14 works alongside self-sovereign identity by wrapping existing DIDs where they exist and providing deterministic identifiers where they do not, enabling reliable discovery and routing across protocols.

Status: Draft. We welcome feedback from the community in the [HCS‑14 discussion](https://github.com/hashgraph-online/hcs-improvement-proposals/discussions/135).

HCS‑14 is network‑agnostic. It works across Web2 (A2A/REST), EVM/ETH, and more. Hedera support is optional. We start with Web2 and EVM, then cover Hedera.

## TL;DR

- A single, portable identifier (UAID) for agents across Web2 and Web3
- Two modes: deterministic AID or wrap your existing DID
- Minimal routing hints for discovery; identity details stay in DID docs/profiles

<!--truncate-->

## Why Agent Identification Needs to Be Universal

Agents live across different stacks and transports. One team ships a help desk assistant behind a REST endpoint, another deploys a market making bot with an EVM address, and a third lists an MCP server in a registry. You end up juggling three naming schemes for one concept. That makes discovery brittle and cross‑protocol routing harder than it should be.

HCS‑14 cuts through the noise with a compact identifier that stays stable as endpoints change and plays well with existing standards. Fewer glue scripts. Fewer mismatched IDs. Easier interop.

## What HCS-14 Is

HCS-14 defines a universal agent identifier (UAID) with two complementary targets:

1. Deterministic AID (for agents without an existing DID)

- Derived from a canonical JSON of six stable fields: registry, name, version, protocol, nativeId, skills (sorted)
- Produces the same ID for the same agent definition even if endpoints change

2. UAID wrapping a DID (for agents that already have a DID)

- Reuses the method‑specific identifier of the base DID (sanitized)
- Adds routing parameters so the same agent can be discovered across protocols

Both forms accept a minimal set of routing parameters (for example, uid, protocol, native network ID) to make discovery straightforward without bloating the identifier.

<!-- Examples appear later in Quick Examples -->

## HCS‑11 Primer: Profiles on Hedera

HCS‑11 defines a profile document for agents and MCP servers. Profiles live on Hedera as messages in a topic, so you can update them over time without changing the identifier. A Hedera account memo holds a compact pointer to the profile topic.

How it fits together

- Profile document (mutable): inscribed to a Hedera topic; carries display name, capabilities, endpoints, and the UAID.
- Account memo (pointer): stores a short reference like `hcs-11:hcs://1/0.0.123456` so wallets and tools can find the profile quickly.
- UAID (identifier): stable handle that links to DID Documents and profiles without embedding keys or endpoints.

Minimal examples

```
Account memo → hcs-11:hcs://1/0.0.123456
```

```json
{
  "version": "1.0",
  "type": 1,
  "display_name": "HCS-10 Demo Agent",
  "alias": "hcs-10_demo_agent",
  "bio": "Demo created via HCS-10 createAgent (with UAID attached)",
  "inboundTopicId": "0.0.6809294",
  "outboundTopicId": "0.0.6809293",
  "aiAgent": {
    "type": 1,
    "capabilities": [0],
    "model": "demo-model"
  },
  "uaid": "uaid:did:7L6c8nDbwXah2KCZTrdC7xPxbhDtYmJFhgb44habP4Jg_0.0.6809295;uid=0.0.6809294@0.0.2659396;proto=hcs-10;nativeId=hedera:testnet:0.0.2659396"
}
```

The SDK can attach a UAID automatically when you create a profile for an HCS‑10 agent on Hedera. It derives uid from HCS‑11 (prefer `inboundTopicId@accountId`) and uses Hedera CAIP‑10 for nativeId.

### Resolve UAID from a profile and fetch DID

```ts
const fetched = await hcs11.fetchProfileByAccountId(accountId, 'testnet');
const uaid = fetched.profile?.uaid;
const doc = uaid ? await hcs14.getResolverRegistry().resolveUaid(uaid) : null;
```

Demos

- Create profile with UAID: `pnpm run demo:hcs-11:profile`
- Resolve UAID from profile: `pnpm run demo:hcs-11:resolve-uaid`

## Design Notes

- Routing parameters are minimal and ordered to keep the identifier readable.
- Purpose and mutable endpoints are intentionally excluded from identifiers.
- Deterministic hashing uses canonical JSON of six fields for stability.
- UAID reuses existing DIDs to preserve linkage to sovereign identity while adding cross‑protocol routing.

## Identifier vs. Identity

HCS‑14 intentionally standardizes an identifier, not the full concept of “identity.” That distinction matters:

- Identifier: a stable, portable handle you can use to refer to and route to an agent across protocols. This is UAID’s scope.
- Identity: a broader bundle that can include controller information, public keys, verification methods, authentication and assertion capabilities, service endpoints, and attestations (e.g., verifiable credentials).

What belongs in “identity” for agents is an open question that we want the community to help shape. Some questions we’re exploring together:

- Should identity embed public keys or only reference them via a DID Document?
- Should SSL/TLS certificates or fingerprints be part of agent identity or attached as proofs separate from the identifier?
- How should identity relate to verifiable credentials, trust frameworks (e.g., ToIP), and reputation systems?

Current stance (separation of concerns):

- UAID (HCS‑14) stays compact and excludes mutable or sensitive data (keys, endpoints, purpose).
- DID Documents carry keys and verification methods; profiles (HCS‑11) and agent.json (A2A) carry descriptive metadata and endpoints.
- Trust and provenance should be expressed with credentials and proofs layered on top of identifiers, not baked into them.

We invite feedback on these questions in the [HCS‑14 discussion](https://github.com/hashgraph-online/hcs-improvement-proposals/discussions/135).

## Who Should Use This Now

- Product teams shipping agents across Web2 and Web3 who want one stable handle to wire up discovery and routing without reworking identity.
- Registries, marketplaces, and directories that need portable, conflict‑free identifiers to index agents from many ecosystems.
- Enterprises running mixed stacks (cloud, on‑prem, EVM/Hedera) and looking for predictable cross‑protocol routing.
- Open‑source frameworks (A2A, MCP, agent toolkits) that want a small, standards‑aligned identifier to link profiles, services, and credentials.
- Security and trust projects building on DIDs and VCs that need a clean separation between identification and attestations.

## Adapters and Environment Support

HCS‑14 uses adapters so the same code works across environments and DID methods:

- Crypto adapters (automatic): The SDK chooses Node, Web, or SSR‑safe crypto behind the scenes.
- Resolvers: Built‑in Hiero for `did:hedera`; add your own if you need another DID method.
- Issuers: Built‑in Hiero registrar for `did:hedera`; contribute issuers for other methods.

### Issuers (DID adapters)

HCS‑14 includes a DID issuance adapter registry with a built‑in Hedera issuer. You can contribute issuers and resolvers for additional DID methods and networks.

We welcome contributions across DID methods and CAIP namespaces.

How to contribute an Issuer (quick path)

- Fork the Standards SDK and add a file under `standards-sdk/src/hcs-14/issuers/` (for example, `foo.ts`).
  - GitHub: [HCS‑14 issuers](https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-14/issuers)
- Implement `DidIssuer` with two methods and minimal metadata:
  - `supports(method: string): boolean`
  - `issue(request: DidIssueRequest): Promise<string>` returning a `did:<method>:...`
  - `meta` with `id` and `didMethods` so tools can list your adapter
- Export it from `standards-sdk/src/hcs-14/index.ts` so apps can import it.
  - GitHub: [HCS‑14 entrypoint](https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-14/index.ts)
- Add small tests to prove `supports` and `issue` work and handle basic errors.
- Open a PR linking to any public spec or docs for your method.

Reference: adapter guide in the SDK docs

- /docs/libraries/standards-sdk/hcs-14/adapters

For Resolver adapters, see:

- GitHub: [HCS‑14 resolvers](https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-14/resolvers)

## Get Involved

- Read the HCS-14 Draft: [docs/standards/hcs-14](/docs/standards/hcs-14)
- SDK Guide: [docs/libraries/standards-sdk/hcs-14](/docs/libraries/standards-sdk/hcs-14)
- Join the Discussion: [HCS‑14 discussion](https://github.com/hashgraph-online/hcs-improvement-proposals/discussions/135)

We invite developers, operators, and standards practitioners to review the draft, try the SDK, and share feedback.

## Quick Examples (at a glance)

Install

```bash
pnpm add @hashgraphonline/standards-sdk
```

Create a UAID (Web2)

```ts
import { HCS14Client } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();
const aid = await hcs14.createUaid(
  {
    registry: 'acme',
    name: 'Support',
    version: '1.0.0',
    protocol: 'a2a',
    nativeId: 'acme.example',
    skills: [0, 17],
  },
  { uid: 'support' }
);
```

Wrap an existing DID (did:web)

```ts
const uaid = hcs14.createUaid('did:web:agent.example', {
  uid: 'bot',
  proto: 'a2a',
  nativeId: 'agent.example',
});
```

Hedera (optional): issue did:hedera and generate UAID

```ts
const { did, uaid: hederaUaid } = await hcs14.createDidWithUaid({
  issue: { method: 'hedera', client: hederaClient },
  proto: 'hcs-10',
});
```

Resolve a UAID (Hedera)

```ts
const doc = await hcs14.getResolverRegistry().resolveUaid(hederaUaid);
```

Demos

- Create profile with UAID: `pnpm run demo:hcs-11:profile`
- Resolve UAID from profile: `pnpm run demo:hcs-11:resolve-uaid`

## Conclusion

Agents deserve a single handle that travels with them, no matter the protocol. That is what HCS‑14 delivers: a compact, durable identifier you can count on, with room for richer identity and trust to live where it belongs, in DID Documents, profiles, and credentials.

HCS‑14 is network‑agnostic by design. Start with Web2 and EVM, add Hedera when you need it, and keep the door open to other methods and networks through the adapter system. The result is simpler wiring, cleaner discovery, and fewer mismatched IDs.

Huge thanks to the HCS‑14 authors whose ideas, feedback, and solutions shaped the current draft: [Michael Kantor (Kantorcodes)](https://x.com/kantorcodes), [Patches (TMCC_Patches)](https://x.com/TMCC_Patches), [Ahmer Inam](https://www.linkedin.com/in/ahmer/), [Jake Hall](https://www.linkedin.com/in/jake-hall-62b6b7176/), and [Sam Nanthans](https://github.com/miseenplace).

Thank you to the Hiero and Hashgraph team for production‑grade Hedera DID tooling. Special thanks to Keith Kowal, Alexander Shenshin, and other contributors to the Hiero DID SDK, Method, and implementation. The Standards SDK integrates the Hiero DID SDK by default for issuing and resolving `did:hedera` (repo: https://github.com/hiero-ledger/hiero-did-sdk-js; packages: `@hiero-did-sdk/registrar`, `@hiero-did-sdk/resolver`). We’re excited to hear how you use UAIDs in the wild. Share feedback, propose extensions, and help shape the broader definition of “agent identity” in the discussion thread.
