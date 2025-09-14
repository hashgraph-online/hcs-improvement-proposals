---
title: HCS‑6 API Reference
description: Vanilla reference for HCS‑6 dynamic registry clients and builders in the Standards SDK.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-6
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/types.ts

## Import Paths

```ts
import {
  HCS6Client,
  HCS6BrowserClient,
  HCS6Operation,
  HCS6RegistryType,
  type HCS6ClientConfig,
  type SDKHCS6ClientConfig,
  type HCS6CreateRegistryOptions,
  type HCS6RegisterEntryOptions,
  type HCS6QueryRegistryOptions,
  type HCS6TopicRegistry,
  type HCS6RegisterOptions,
  type HCS6CreateHashinalOptions,
  type HCS6CreateHashinalResponse,
  type HCS6MintOptions,
  type HCS6InscribeAndMintOptions,
  type HCS6MintResponse,
  buildHcs6CreateRegistryTx,
  buildHcs6RegisterEntryTx,
} from '@hashgraphonline/standards-sdk/hcs-6';
```

## Types

See https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/types.ts for all message and option interfaces, including `HCS6Message`, `HCS6RegisterMessage`, and registry/query option shapes.

## Enums

```ts
enum HCS6Operation { REGISTER = 0 }
enum HCS6RegistryType { INDEXED = 0, NON_INDEXED = 1 }
```

## Node Client (HCS6Client)

```ts
constructor(config: SDKHCS6ClientConfig)

getKeyType(): 'ed25519' | 'ecdsa'
close(): void

// Messages
submitMessage(topicId: string, payload: HCS6Message): Promise<import('@hashgraph/sdk').TransactionReceipt>
submitMessageWithKey(topicId: string, payload: HCS6Message, submitKey?: string | import('@hashgraph/sdk').PrivateKey): Promise<import('@hashgraph/sdk').TransactionReceipt>

// Registry
createRegistry(options?: { ttl?: number; submitKey?: string | boolean | import('@hashgraph/sdk').PrivateKey }): Promise<{ success: boolean; topicId?: string; transactionId?: string; error?: string }>
registerEntryWithKey(registryTopicId: string, options: HCS6RegisterEntryOptions, submitKey?: string | import('@hashgraph/sdk').PrivateKey): Promise<{ success: boolean; receipt?: import('@hashgraph/sdk').TransactionReceipt; sequenceNumber?: number; error?: string }>

// Hashinal helpers
createHashinal(options: HCS6CreateHashinalOptions): Promise<HCS6CreateHashinalResponse>
mint(options: HCS6MintOptions): Promise<HCS6MintResponse>
inscribeAndMint(options: HCS6InscribeAndMintOptions): Promise<HCS6MintResponse>
```

## Browser Client (HCS6BrowserClient)

Wallet‑signed counterpart supporting the same flows.

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-6/browser.ts

## Builders (tx.ts)

```ts
function buildHcs6CreateRegistryTx(params: { ttl: number; adminKey?: any; submitKey?: any; memoOverride?: string; operatorPublicKey?: import('@hashgraph/sdk').PublicKey }): import('@hashgraph/sdk').TopicCreateTransaction;
function buildHcs6RegisterEntryTx(params: { registryTopicId: string; targetTopicId: string; memo?: string; analyticsMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

## Notes

- Registry memo uses `hcs-6:<type>:<ttl>` (helpers provided in `types.ts`).
- The client can resolve `supplyKey` and enforce correct curve for signing.

## Example

```ts
const c = new HCS6Client({ network: 'testnet', operatorId, operatorKey });
const reg = await c.createRegistry({ ttl: 86400 });
await c.registerEntryWithKey(reg.topicId!, { targetTopicId: '0.0.1234' });
```
