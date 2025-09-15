---
title: API — HCS‑10
description: Classes and exports for OpenConvAI (HCS‑10) in the Standards SDK, with links to source.
sidebar_position: 7
---

This page summarizes the primary HCS‑10 SDK APIs. See the linked source files for complete method signatures and inline docs.

## Node Client — HCS10Client

- Purpose: End‑to‑end creation of agents (inbound/outbound topics), connection handling, profile inscription, and messaging.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/sdk.ts

Key methods
- `createAccount(initialBalance?)`
- `createInboundTopic(accountId, topicType, ttl?, feeConfigBuilder?)`
- `createOutboundTopic(ttl?)`
- `handleConnectionRequest(inboundTopicId, requestingAccountId, connectionRequestId)`
- `waitForConnectionConfirmation(inboundTopicId, connectionRequestId, timeoutMs?)`
- `sendMessage(connectionTopicId, data, memo?)`
- Profile helpers: `storeHCS11Profile`, `createAgent`, `createMCPServer`, etc.

## Base Client — HCS10BaseClient

- Purpose: Shared memo generation, mirror‑node queries, parsing utilities.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/base-client.ts

Highlights
- `getTopicTypeFromMemo`, `getOperatorFromMemo`, `getTopicIdFromMemo`
- Memo helpers: inbound/outbound/connection/registry
- Mirror read helpers for messages and confirmations

## Browser Client — HCS10BrowserClient

- Purpose: Wallet‑based flows using a DApp signer (WalletConnect). Mirrors the Node client with signer execution.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/browser.ts

Highlights
- `createInboundTopic`, `createOutboundTopic`
- `requestConnection`, `confirmConnection`, `sendMessage`
- Signer‑first transaction handling (`freezeWithSigner`, `executeWithSigner`)

## ConnectionsManager

- Purpose: Stream/process connection lifecycle across inbound/outbound topics; track confirmations and messages.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/connections-manager.ts

Highlights
- Stream utilities: subscribe to inbound/outbound/connection topics
- Message normalization and filtering
- Callbacks for request/confirm/message events

## Transactions (Builders)

- Purpose: Canonical construction of topic create + message submit transactions for all HCS‑10 operations.
- Source: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/tx.ts

Includes
- Topic builders: `buildHcs10CreateInboundTopicTx`, `buildHcs10CreateOutboundTopicTx`, `buildHcs10CreateConnectionTopicTx`, `buildHcs10CreateRegistryTopicTx`
- Connection messages: `buildHcs10SubmitConnectionRequestTx`, `buildHcs10ConfirmConnectionTx`, outbound audit records
- Messaging: `buildHcs10SendMessageTx`
- Registry: `buildHcs10RegistryRegisterTx`, `buildHcs10RegistryDeleteTx`, `buildHcs10RegistryMigrateTx`

## Types and Errors

- Types: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/types.ts
- Errors: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-10/errors.ts

