---
sidebar_position: 8
---

# Resolvers

HCS-14 has two resolver layers:

- DID resolvers map a DID to a DID document.
- Profile resolvers enrich DID or UAID resolution with profile metadata, verification details, and service hints.

## Resolve with HCS14Client

```ts
import {
  HCS14Client,
  UAID_DNS_WEB_PROFILE_ID,
  AID_DNS_WEB_PROFILE_ID,
  UAID_DID_RESOLUTION_PROFILE_ID,
  isUaidProfileResolverAdapter,
} from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();
const uaid = 'uaid:aid:Qm...;uid=support;proto=a2a;nativeId=agent.example.com';

const didResolverIds = hcs14
  .filterAdapters({ capability: 'did-resolver' })
  .map(record => record.adapter.meta?.id || 'unknown');

const uaidProfileResolverIds = hcs14
  .filterAdapters({ capability: 'uaid-profile-resolver' })
  .map(record => record.adapter)
  .filter(isUaidProfileResolverAdapter)
  .map(adapter => adapter.profile);

const didProfile = await hcs14.resolveDidProfile('did:hedera:testnet:0.0.1234');

const autoProfile = await hcs14.resolveUaidProfile(uaid);

const dnsBindingProfile = await hcs14.resolveUaidProfile(uaid, {
  profileId: UAID_DNS_WEB_PROFILE_ID,
});

const aidDnsProfile = await hcs14.resolveUaidProfile(uaid, {
  profileId: AID_DNS_WEB_PROFILE_ID,
});

const didResolutionProfile = await hcs14.resolveUaidProfile(
  'uaid:did:z6Mk...;uid=0;proto=hcs-10;nativeId=hedera:testnet:0.0.1234',
  { profileId: UAID_DID_RESOLUTION_PROFILE_ID },
);
```

## Built-in DID Resolvers

| Adapter id | Scope | Summary |
|---|---|---|
| `hedera/hiero-resolver` | DID | Resolves `did:hedera` DID documents. |

## Built-in Profile Resolvers

| Adapter id | Profile id | Scope | Summary |
|---|---|---|---|
| `hedera/hcs11-profile-resolver` | n/a | DID profile | Adds `profiles.hcs11` and HCS-10 topic service info for `did:hedera`. |
| `hcs-14/uaid-dns-web` | `hcs-14.profile.uaid-dns-web` | UAID profile | Validates `_uaid.<nativeId>` TXT bindings and can chain follow-up profile resolution. |
| `hcs-14/aid-dns-web` | `hcs-14.profile.aid-dns-web` | UAID profile | Resolves `_agent.<nativeId>` TXT endpoint hints for `uaid:aid:*`. |
| `hcs-14/uaid-did-resolution` | `hcs-14.profile.uaid-did-resolution` | UAID profile | Resolves `uaid:did:*` into base DID-compatible output with metadata. |

Current built-ins do not include an ANS-specific HCS-14 profile resolver.

## Resolution Semantics

- Each `HCS14Client` instance creates its own resolver registry by default.
- Default UAID profile resolver registration order:
  - `hcs-14.profile.uaid-dns-web`
  - `hcs-14.profile.aid-dns-web`
  - `hcs-14.profile.uaid-did-resolution`
- `resolveUaidProfile(uaid)` without `profileId` continues to later matching resolvers when an earlier resolver returns a non-definitive error profile.
- `resolveUaidProfile(uaid, { profileId })` returns the selected profile result directly, including explicit error payloads.
- `filterAdapters({ profileId })` requires `capability: 'uaid-profile-resolver'`.
- `uaid-dns-web` follow-up targets:
  - `uaid:aid:*` -> `hcs-14.profile.aid-dns-web`
  - `uaid:did:*` -> `hcs-14.profile.uaid-did-resolution`

## Custom Resolver Registration (Adapter API)

```ts
import type { DidResolver, UaidProfileResolver } from '@hashgraphonline/standards-sdk';

const hcs14 = new HCS14Client();

const customDidResolver: DidResolver = {
  meta: { id: 'did/custom', didMethods: ['web'] },
  supports(did: string) {
    return did.startsWith('did:web:');
  },
  async resolve(did: string) {
    return { id: did };
  },
};

hcs14.registerAdapter(customDidResolver);

const customProfileResolver: UaidProfileResolver = {
  profile: 'hcs-14.profile.custom',
  supports(_uaid, _parsed) {
    return true;
  },
  async resolveProfile(uaid: string, _context) {
    return {
      id: uaid,
      metadata: {
        profile: 'hcs-14.profile.custom',
        resolved: true,
      },
    };
  },
};

hcs14.registerAdapter(customProfileResolver);
```

Deprecated compatibility methods (`registerProfileResolver`, `registerUaidProfileResolver`, legacy list/filter methods) still exist, but new integrations should use `registerAdapter` and `filterAdapters`.
