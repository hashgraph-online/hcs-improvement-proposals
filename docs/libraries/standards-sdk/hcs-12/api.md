---
title: API — HCS‑12
description: Main classes and modules for HashLinks in the Standards SDK with source links.
sidebar_position: 9
---

HCS‑12 provides a full framework for HashLinks, assemblies, block rendering, and WASM‑powered interactions.

## Node Client — HCS12Client

- Purpose: High‑level operations around registries, assemblies, and rendering contexts.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/sdk.ts

Highlights
- Registry helpers (create/list/register)
- Assembly helpers (register/update/add block/add action)
- Render context orchestration for frontends

## Base Client — HCS12BaseClient

- Purpose: Shared logic (memos, mirror queries, validation hooks).
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/base-client.ts

## Browser Client — HCS12BrowserClient

- Purpose: Wallet‑based flows using a DApp signer; mirrors Node client capabilities for the browser.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/browser.ts

## Transactions (Builders)

- Purpose: Canonical Hedera transactions for registries and assembly operations.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/tx.ts

Includes
- `buildHcs12CreateRegistryTopicTx`
- `buildHcs12SubmitMessageTx`
- `buildHcs12RegisterAssemblyTx`
- `buildHcs12AddBlockToAssemblyTx`
- `buildHcs12AddActionToAssemblyTx`
- `buildHcs12UpdateAssemblyTx`

## Assemblies, Rendering, Validation, WASM

- Assemblies: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/assembly
- Rendering: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/rendering
- Validation: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/validation
- WASM: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/wasm

## Types and Constants

- Types: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/types.ts
- Constants: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12/constants.ts

