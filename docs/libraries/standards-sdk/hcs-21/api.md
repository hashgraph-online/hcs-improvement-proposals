---
title: API Reference
sidebar_position: 6
---

# API Reference

| Export | Type | Description |
| ------ | ---- | ----------- |
| `HCS21Client` | class | Node.js client that inscribes manifests/registry metadata, creates adapter registry topics, publishes declarations, and streams messages via mirror nodes. |
| `HCS21BrowserClient` | class | Browser/WalletConnect client for submitting adapter declarations from end-user wallets. |
| `HCS21BaseClient` | class | Shared base with `buildDeclaration`, `validateDeclaration`, and `fetchDeclarations`. |
| `AdapterDeclaration` | type | JSON payload that travels over HCS-21 (`p`, `op`, `adapter_id`, `entity`, `package`, `manifest`, optional `manifest_sequence`, `flora`, `state_model?`, `signature?`). |
| `AdapterManifest` | type | HCS-1 manifest schema for adapter metadata, runtime requirements, capabilities, and consensus bindings. |
| `RegistryMetadataRecord` | type | Optional HCS-1 registry metadata document referenced in topic memos (`meta` slot). |
| `ManifestPointer` | type | Result from `inscribeMetadata` with `pointer`, `topicId`, and `sequenceNumber`. |
| `AdapterDeclarationEnvelope` | type | Parsed message returned by `fetchDeclarations` (includes `payer`, `consensusTimestamp`, `sequenceNumber`). |
| `HCS21TopicType` | const | Topic types for memos (`ADAPTER_REGISTRY`, `REGISTRY_OF_REGISTRIES`). |
| `buildHcs21CreateRegistryTx` | function | Builds a `TopicCreateTransaction` with the HCS-21 memo format. |
| `buildHcs21MessageTx` | function | Wraps an `AdapterDeclaration` into a `TopicMessageSubmitTransaction`. |

## Typings

The module ships TypeScript typings. Example:

```ts
import type {
  AdapterDeclaration,
  AdapterManifest,
} from '@hashgraphonline/standards-sdk';
```

These types keep declarations within the 1 KB payload limit and aligned with the HCS-21 specification documented under `/docs/standards/hcs-21`.
