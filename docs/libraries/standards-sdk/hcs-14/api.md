---
sidebar_position: 6
---

# API Summary

## HCS14Client

| Method | Parameters (summary) | Returns | Notes |
|---|---|---|---|
| `createUaid(data, params?, opts?)` | `data: CanonicalAgentData`, `params: DidRoutingParams`, `opts: { includeParams?: boolean }` | `Promise<string>` | Generates `uaid:aid:...`. Canonicalizes 6 fields, hashes (SHA‑384 → Base58). When `includeParams === false`, omits routing params. |
| `createUaid(did, params?)` | `did: string`, `params: DidRoutingParams` | `string` | Generates `uaid:did:...`. Sanitizes method‑specific id (strips `; ? #`). Adds `src` (multibase b58btc) if sanitization removed a suffix. |
| `parseHcs14Did(value)` | `value: string` | Parsed UAID object (method, id, params) | Parses UAID into method, id, and params. |
| `createDid({ method, ... })` | DidIssueRequest | `Promise<string>` | Issues a DID via registered issuers (e.g., method `hedera`). Hedera requires a configured `Client`. |
| `createDidWithUaid({ issue, proto?, uid?, nativeId? })` | `issue: DidIssueRequest`, optional `proto`, `uid`, `nativeId` | Object with did, uaid, parsed | Issues a DID, then generates UAID. For Hedera + proto `hcs-10`, derives `uid` (inboundTopicId@accountId when available) and `nativeId` (Hedera CAIP‑10) when not provided. |
| `getIssuerRegistry()` / `getResolverRegistry()` | — | registries | Access registries to register/list/filter adapters. |
| `listIssuers()` / `listResolvers()` | — | arrays | Introspection of registered adapters (includes `meta`). |
| `filterIssuersByMethod(method)` / `filterResolversByMethod(method)` | `method: string` | arrays | Find adapters that support a DID method. |

## CAIP Helpers

| Helper | Signature | Returns | Notes |
|---|---|---|---|
| `toHederaCaip10` | `(network: HederaNetwork, accountId: string)` | `string` | Builds `hedera:<network>:<accountId>`. Validates input. |
| `parseHederaCaip10` | `(value: string)` | Object with `network` and `accountId` | Parses and validates a Hedera CAIP‑10 string. |
| `isHederaNetwork` | `(value: string)` | `boolean` | Type guard for Hedera networks. |
| `isHederaCaip10` | `(value: string)` | `boolean` | Validates Hedera CAIP‑10 format. |
| `toEip155Caip10` | `(chainId: number or string, address: string)` | `string` | Builds `eip155:<chainId>:<0xAddress>`. Validates input. |
| `isEip155Caip10` | `(value: string)` | `boolean` | Validates EIP‑155 CAIP‑10 format. |

`HederaNetwork` values: `mainnet`, `testnet`, `previewnet`, `devnet`.

## UAID Grammar

- `uaid:aid:{base58hash};uid={uid};registry={registry};proto={protocol};nativeId={nativeId};domain={domain}`
- `uaid:did:{methodSpecificId};uid={uid};proto={protocol};nativeId={nativeId};domain={domain};src=z…`
