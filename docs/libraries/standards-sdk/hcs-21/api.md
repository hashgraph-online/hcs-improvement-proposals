---
title: API Reference
sidebar_position: 6
---

# API Reference

| Export | Type | Description |
| ------ | ---- | ----------- |
| `HCS21Client` | class | Node.js client that inscribes manifests/registry metadata, creates adapter registry topics, publishes declarations, and streams messages via mirror nodes. |
| `HCS21BrowserClient` | class | Browser/WalletConnect client that can create registry-of-registries layers, publish adapter declarations, and stream messages directly from a user-controlled wallet. |
| `HCS21BaseClient` | class | Shared base with `buildDeclaration`, `validateDeclaration`, and `fetchDeclarations`. |
| `AdapterDeclaration` | type | JSON payload that travels over HCS-21 (`p`, `op`, `adapter_id`, `entity`, `package`, `manifest`, optional `manifest_sequence`, `config`, `state_model?`, `signature?`). |
| `AdapterManifest` | type | Immutable adapter manifest schema for metadata, runtime requirements, capabilities, and consensus bindings (stored via HCS-1 topic or another hashed content store such as IPFS, Arweave, OCI, HTTPS+SRI). |
| `RegistryMetadataRecord` | type | Optional registry metadata document (HCS-1 topic or other hashed store) referenced in topic memos (`meta` slot). |
| `ManifestPointer` | type | Result from `inscribeMetadata` with `pointer`, `topicId`, `sequenceNumber`, optional `manifestSequence`, inscription `jobId`/`transactionId`, plus `totalCostHbar` and `costBreakdown` derived from the executed transaction. |
| `VersionPointerResolution` | type | Result from `resolveVersionPointer` with the latest `declarationTopicId`, metadata, and sequence number. |
| `AdapterDeclarationEnvelope` | type | Parsed message returned by `fetchDeclarations` (includes `payer`, `consensusTimestamp`, `sequenceNumber`). |
| `HCS21TopicType` | const | Topic types for memos (`ADAPTER_REGISTRY`, `REGISTRY_OF_REGISTRIES`, `ADAPTER_CATEGORY`). |
| `buildHcs21CreateRegistryTx` | function | Builds a `TopicCreateTransaction` with the HCS-21 memo format. |
| `buildHcs21MessageTx` | function | Wraps an `AdapterDeclaration` into a `TopicMessageSubmitTransaction`. |
| `createRegistryTopic` | method | Creates the HCS-21 adapter declaration topic (`hcs-21:0:<ttl>:0:<meta>`). |
| `createRegistryDiscoveryTopic` | method | Creates the HCS-2 indexed registry-of-registries topic (`hcs-21:0:<ttl>:1:<meta>`). |
| `createAdapterCategoryTopic` | method | Creates the HCS-21 adapter-category topic (`hcs-21:0:<ttl>:2:<meta>`). |
| `createAdapterVersionPointerTopic` | method | Creates the HCS-2 non-indexed pointer topic (`hcs-2:1:<ttl>`) that tracks the live declaration topic for an adapter or registry layer. |
| `publishVersionPointer` | method | Posts the active HCS-21 topic ID into a version pointer (`hcs-2` message with `t_id`). |
| `registerCategoryTopic` | method | Registers an adapter category topic inside the discovery topic. |
| `publishCategoryEntry` | method | Adds an adapter entry (`m = "adapter:<namespace>/<name>"`) pointing to its version pointer topic. |
| `resolveVersionPointer` | method | Reads the latest message from a version pointer (`hcs-2:1`) to discover the active declaration topic. |

## Typings

The module ships TypeScript typings. Example:

```ts
import type {
  AdapterDeclaration,
  AdapterManifest,
} from '@hashgraphonline/standards-sdk';
```

These types keep declarations within the 1 KB payload limit and aligned with the HCS-21 specification documented under `/docs/standards/hcs-21`.
