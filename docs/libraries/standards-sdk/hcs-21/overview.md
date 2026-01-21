---
title: HCS-21 Adapter Registry SDK Overview
sidebar_position: 2
---

# HCS-21: Adapter Registry

The HCS-21 module in the Standards SDK publishes **adapter declarations** for appnets (including Floras). Each declaration links an adapter ID to its HCS-1 manifest, package fingerprint, appnet context (ctopic/ttopic/stopic), and state model identifier so every participant executes the same deterministic adapter code.

## What’s Included

- **`HCS21Client`** (Node.js) — creates registry topics, inscribes manifests or registry metadata (HCS-1), publishes adapter declarations, and streams them back via mirror nodes.
- **Version pointer helpers** — manage the HCS-2 non-indexed topics that keep track of the latest adapter or registry topic (`createAdapterVersionPointerTopic`, `publishVersionPointer`, `publishCategoryEntry`, `resolveVersionPointer`).
- **`HCS21BrowserClient`** (WalletConnect) — mirrors the server SDK from a browser wallet: create discovery/category/version-pointer topics, publish adapter declarations, and stream them without exposing operator keys.
- **Transaction helpers** — `buildHcs21CreateRegistryTx` and `buildHcs21MessageTx` generate compliant memos and message payloads for custom pipelines.
- **Typed schemas** — `AdapterDeclaration`, `AdapterManifest`, `RegistryMetadataRecord`, and validation helpers keep payloads inside the 1 KB limit and aligned with the updated HCS-21 standard.

```mermaid
flowchart LR
    subgraph Off-chain
        Publisher[Adapter Publisher]
        SDK[Standards SDK HCS-21]
        Browser[HCS21BrowserClient]
    end
    subgraph Hedera
    Manifest[HCS-1 Manifest Topic]
        VersionTopic[HCS-2 Version Pointer Topic]
        RegistryTopic[HCS-21 Adapter Registry Topic]
        RegistryList[HCS-2 Registry-of-Registries]
    end
    subgraph Floras
        Flora[HCS-16 Flora]
    end

    Publisher --> SDK
    Browser --> SDK
    SDK --> Manifest
    SDK --> RegistryTopic
    RegistryTopic --> Flora
    SDK --> VersionTopic
    VersionTopic --> RegistryList
    RegistryList --> Flora
    VersionTopic --> RegistryTopic
    Manifest --> Flora
```

## Key Capabilities

- Adapter declarations include `adapter_id`, `entity`, `package` integrity, manifest pointer (`hcs://1/<topic>` or another immutable URI such as `ipfs://`, `ar://`, `oci://`), optional `manifest_sequence` to pin a specific message, appnet/Flora thresholds/topics via `config`, and `state_model`.
- Manifest and registry metadata helpers accept HCS-1 pointers as well as other hashed content-addressable stores (IPFS, Arweave, OCI, HTTPS+SRI) so long as they fit inside topic memos.
- Memo builder supports adapter registries and registry-of-registries topics (`hcs-21:<indexed>:<ttl>:<type>:<meta>`), plus version pointer topics (`hcs-2:1:<ttl>`).
- Pointer utilities keep the registry-of-registries entries stable: publish new HCS-21 topics to the pointer, register the pointer once, and resolve it before streaming.
- Mirror-node streaming filters only `hcs-21` payloads while preserving payer, sequence, and consensus timestamp.

## Where to Next

- [Server SDK](./server.md) — instantiate `HCS21Client`, inscribe manifests, and publish declarations from Node.js services.
- [Browser SDK](./browser.md) — wire HCS-21 into wallet-connected front-ends.
- [Transaction Helpers](./tx.md) — build custom workflows using low-level builders.
- [API Reference](./api.md) — quick lookup for available types and classes.
