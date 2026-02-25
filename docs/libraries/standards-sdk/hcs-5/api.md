---
title: HCS‑5 API Reference
description: Vanilla reference for HCS‑5 minting and inscription helpers in the Standards SDK.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-5
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/browser.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-5/types.ts

## Import Paths

```ts
import {
  HCS5Client,
  HCS5BrowserClient,
  type HCS5ClientConfig,
  type HCS5MintOptions,
  type HCS5CreateHashinalOptions,
  type HCS5MintResponse,
  buildHcs1Hrl,
} from '@hashgraphonline/standards-sdk';
```

## Types

```ts
interface HCS5ClientConfig {
  network: 'mainnet' | 'testnet';
  operatorId: string;                       // Node only
  operatorKey: string | import('@hashgraph/sdk').PrivateKey; // Node only
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  silent?: boolean;
  mirrorNodeUrl?: string;
  logger?: any;
}

interface HCS5MintOptions {
  tokenId: string;
  metadataTopicId: string; // HCS‑1/12 content topic
  supplyKey?: string | import('@hashgraph/sdk').PrivateKey;
  memo?: string;
}

interface HCS5CreateHashinalOptions {
  tokenId: string;
  inscriptionInput: import('../inscribe/inscriber').InscriptionInput; // file/buffer/url/topic
  inscriptionOptions?: import('../inscribe/inscriber').InscriptionOptions;
  supplyKey?: string | import('@hashgraph/sdk').PrivateKey;
  memo?: string;
}

interface HCS5MintResponse {
  success: boolean;
  serialNumber?: number;
  transactionId?: string;
  metadata?: string; // HRL used as NFT metadata
  error?: string;
}
```

## Node Client (HCS5Client)

```ts
constructor(config: HCS5ClientConfig)

mint(options: HCS5MintOptions): Promise<HCS5MintResponse>

createHashinal(options: HCS5CreateHashinalOptions): Promise<HCS5MintResponse>
```

Notes
- `createHashinal` inscribes content first (waits for confirmation) and reuses the resulting topic as metadata for minting.
- If a raw `supplyKey` is a string, it may be resolved via Mirror Node to the correct curve using NodeOperatorResolver.

## Browser Client (HCS5BrowserClient)

Mirrors Node flows but uses wallet signing for inscription and mint. Returns similar responses.

## Helper

```ts
function buildHcs1Hrl(topicId: string): string; // e.g., hcs://1/<topicId>
```

## Builders (tx.ts)

```ts
function buildHcs5MintTx(params: { tokenId: string; metadata: string; transactionMemo?: string }): import('@hashgraph/sdk').TokenMintTransaction;

function buildHcs5MintWithHrlTx(params: { tokenId: string; metadataTopicId: string; transactionMemo?: string }): import('@hashgraph/sdk').TokenMintTransaction;
```

## Throws / Errors

- `Failed to mint HCS-5 Hashinal: …`
- `Failed to inscribe and mint HCS-5 Hashinal: …`

## Example

```ts
const c = new HCS5Client({ network: 'testnet', operatorId, operatorKey });
const hr = await c.createHashinal({ tokenId, inscriptionInput: { type: 'url', url: 'https://…' } });
```
