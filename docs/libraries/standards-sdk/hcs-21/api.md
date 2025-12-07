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
| `AdapterDeclaration` | type | JSON payload that travels over HCS-21 (`p`, `op`, `adapter_id`, `entity`, `package`, `manifest`, optional `manifest_sequence`, `config`, `state_model?`, `signature?`). |
| `AdapterManifest` | type | Immutable adapter manifest schema for metadata, runtime requirements, capabilities, and consensus bindings (stored via HCS-1 topic or another hashed content store such as IPFS, Arweave, OCI, HTTPS+SRI). |
| `RegistryMetadataRecord` | type | Optional registry metadata document (HCS-1 topic or other hashed store) referenced in topic memos (`meta` slot). |
| `ManifestPointer` | type | Result from `inscribeMetadata` with `pointer`, `topicId`, and `sequenceNumber`. |
| `RegistryPointerResolution` | type | Result from `resolveRegistryPointer` with the latest `registryTopicId`, metadata, and sequence number. |
| `AdapterDeclarationEnvelope` | type | Parsed message returned by `fetchDeclarations` (includes `payer`, `consensusTimestamp`, `sequenceNumber`). |
| `HCS21TopicType` | const | Topic types for memos (`ADAPTER_REGISTRY`, `REGISTRY_OF_REGISTRIES`). |
| `buildHcs21CreateRegistryTx` | function | Builds a `TopicCreateTransaction` with the HCS-21 memo format. |
| `buildHcs21MessageTx` | function | Wraps an `AdapterDeclaration` into a `TopicMessageSubmitTransaction`. |
| `createRegistryVersionTopic` | method | Creates the HCS-2 non-indexed pointer topic that keeps track of the latest adapter registry topic. |
| `publishRegistryVersion` | method | Posts the active HCS-21 topic ID into a version pointer topic (`hcs-2` message). |
| `registerVersionTopic` | method | Registers the version pointer topic inside the registry-of-registries topic. |
| `resolveRegistryPointer` | method | Reads the latest `hcs-2` message from a version pointer topic to discover the active HCS-21 topic ID. |

## Typings

The module ships TypeScript typings. Example:

```ts
import type {
  AdapterDeclaration,
  AdapterManifest,
} from '@hashgraphonline/standards-sdk';
```

These types keep declarations within the 1 KB payload limit and aligned with the HCS-21 specification documented under `/docs/standards/hcs-21`.
