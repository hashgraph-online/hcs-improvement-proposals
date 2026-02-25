---
title: HCS‑15 API Reference
description: Vanilla reference for HCS‑15 Petal account clients and builders.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-15
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/types.ts

## Import Paths

```ts
import {
  HCS15Client,
  HCS15BrowserClient,
  type SDKHCS15ClientConfig,
  type BrowserHCS15ClientConfig,
  buildHcs15BaseAccountCreateTx,
  buildHcs15PetalAccountCreateTx,
} from '@hashgraphonline/standards-sdk';
```

## Node Client (HCS15Client)

```ts
constructor(config: SDKHCS15ClientConfig)
getKeyType(): 'ed25519' | 'ecdsa'
close(): Promise<void>

createBaseAccount(options?: { initialBalance?: number; maxAutomaticTokenAssociations?: number; accountMemo?: string }): Promise<{
  accountId: string; privateKey: import('@hashgraph/sdk').PrivateKey; privateKeyHex: string; publicKey: import('@hashgraph/sdk').PublicKey; evmAddress: string; receipt: import('@hashgraph/sdk').TransactionReceipt;
}>

createPetalAccount(params: { basePrivateKey: string | import('@hashgraph/sdk').PrivateKey; initialBalance?: number; maxAutomaticTokenAssociations?: number; accountMemo?: string }): Promise<{ accountId: string; receipt: import('@hashgraph/sdk').TransactionReceipt }>
```

## Browser Client (HCS15BrowserClient)

Wallet‑signed counterparts for creating base and petal accounts. Returns similar shapes; accountId may be provided by wallet flows.

## Base Client

```ts
verifyPetalAccount(petalAccountId: string, baseAccountId: string): Promise<boolean> // compares mirror‑node key material
```

## Builders

```ts
function buildHcs15BaseAccountCreateTx(params: { publicKey: import('@hashgraph/sdk').PublicKey; initialBalance?: import('@hashgraph/sdk').Hbar|number; maxAutomaticTokenAssociations?: number; accountMemo?: string }): import('@hashgraph/sdk').AccountCreateTransaction;

function buildHcs15PetalAccountCreateTx(params: { publicKey: import('@hashgraph/sdk').PublicKey; initialBalance?: import('@hashgraph/sdk').Hbar|number; maxAutomaticTokenAssociations?: number; accountMemo?: string }): import('@hashgraph/sdk').AccountCreateTransaction;
```

## Errors

- `HCS-15 BASE_ACCOUNT_CREATE_FAILED`
- `HCS-15 PETAL_ACCOUNT_CREATE_FAILED`

## Example

```ts
const c = new HCS15Client({ network: 'testnet', operatorId, operatorKey });
const base = await c.createBaseAccount({ initialBalance: 10 });
await c.createPetalAccount({ basePrivateKey: base.privateKey });
```
