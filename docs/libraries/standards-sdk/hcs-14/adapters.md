---
sidebar_position: 3
---

# Adapters (Issuers & Resolvers)

Adapters let you add DID methods without forking the SDK.

## Issuers

Register issuers to create new DIDs. The SDK ships with a Hedera issuer.

```ts
import { HCS14Client, HederaHieroIssuer } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();

// Register Hedera issuer (built‑in)
hcs14.getIssuerRegistry().register(new HederaHieroIssuer());

// Issue a did:hedera (requires configured Hedera Client)
const did = await hcs14.createDid({ method: 'hedera', client });

// Discover available issuers
const issuers = hcs14.listIssuers();
```

Custom issuers implement `DidIssuer` and validate their own inputs.

```ts
import type { DidIssuer, DidIssueRequest } from '@hashgraphonline/standards-sdk';

class WebDidIssuer implements DidIssuer {
  readonly meta = { id: 'web/custom', didMethods: ['web'] };
  supports(m: string) { return m === 'web'; }
  async issue(_req: DidIssueRequest) { return 'did:web:agent.example'; }
}

hcs14.getIssuerRegistry().register(new WebDidIssuer());
```

## Resolvers

Resolvers map DIDs to DID Documents. The SDK includes a Hedera resolver.

```ts
import { HCS14Client, HieroDidResolver } from '@hashgraphonline/standards-sdk';
const hcs14 = new HCS14Client();

hcs14.getResolverRegistry().register(new HieroDidResolver());
const doc = await hcs14.getResolverRegistry().resolveUaid('uaid:did:...');
```

## Built‑in Adapters

- Issuer: Hedera (Hiero Registrar)
  - id: `hedera/hiero`
  - didMethods: `['hedera']`
  - caip2Networks: `['hedera:mainnet','hedera:testnet','hedera:previewnet','hedera:devnet']`
- Resolver: Hedera (Hiero Resolver)
  - id: `hedera/hiero-resolver`
  - didMethods: `['hedera']`
  - caip2Networks: `['hedera:mainnet','hedera:testnet','hedera:previewnet','hedera:devnet']`

## Contribute New Adapters

We welcome PRs that add issuers and resolvers for additional DID methods.

- Minimal requirements
  - Implement `DidIssuer` or `DidResolver` with meaningful `meta` (id, didMethods, optional caip2Networks/caip10Namespaces).
  - Add unit tests that exercise `supports`, `issue`/`resolve`, and basic error paths.
  - Export from `src/hcs-14/issuers/<name>.ts` or `src/hcs-14/resolvers/<name>.ts` and wire into `src/hcs-14/index.ts`.
  - Update these docs with a short usage snippet.

- Standards & style
  - No inline comments; use JSDoc.
  - No `any`/casts to force types; keep adapters precisely typed.
  - Follow existing naming/structure; keep diffs minimal and focused.

Open a PR with a clear description, links to any method specs, and basic validation steps. We’ll help review and ship it.

### Quick Path (with GitHub links)

- Issuers folder (add your file):
  - https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-14/issuers
- Resolvers folder (add your file):
  - https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-14/resolvers
- Export from the HCS‑14 index:
  - https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-14/index.ts

Add small tests, then open a PR linking to your DID method’s spec or documentation.
