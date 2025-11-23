---
title: API Reference
sidebar_position: 6
---

# API Reference

| Export | Type | Description |
| ------ | ---- | ----------- |
| `HCS21Client` | class | Node.js client that inscribes metadata, creates registry topics, publishes declarations, and streams messages via mirror nodes. |
| `HCS21BrowserClient` | class | Browser/WalletConnect client for submitting declarations from end-user wallets. |
| `HCS21BaseClient` | class | Shared base with `buildDeclaration`, `validateDeclaration`, and `fetchDeclarations`. |
| `PackageDeclaration` | type | JSON payload that travels over HCS-21 (`p`, `op`, `registry`, `t_id`, `n`, `d`, `a`, `tags`, `metadata`). |
| `PackageMetadataRecord` | type | Optional HCS-1 manifest for extended data (fields such as `schema`, `t_id`, `description`, `website`, `artifacts`, etc.). |
| `PackageMetadataPointer` | type | Result from `inscribeMetadata` with `pointer`, `topicId`, and `sequenceNumber`. |
| `PackageDeclarationEnvelope` | type | Parsed message returned by `fetchDeclarations` (includes `payer`, `consensusTimestamp`, `sequenceNumber`). |
| `HCS21_REGISTRY_NAMESPACES` | const | Array of supported registry namespaces (`npm`, `pypi`, `oci`, `composer`, etc.). |
| `buildHcs21CreateRegistryTx` | function | Builds a `TopicCreateTransaction` with the correct HCS-21 memo. |
| `buildHcs21MessageTx` | function | Wraps a `PackageDeclaration` into a `TopicMessageSubmitTransaction`. |

## Typings

The module ships TypeScript typings. Example:

```ts
import type {
  PackageDeclaration,
  PackageMetadataRecord,
} from '@hashgraphonline/standards-sdk';
```

These types keep declarations within the 1 KB payload limit and aligned with the HCS-21 specification documented under `/docs/standards/hcs-21`.
