---
title: HCS‑20 API Reference
description: "1:1 mapping of @hashgraphonline/standards-sdk exports"
sidebar_position: 99
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-20
- base-client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/base-client.ts
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/sdk.ts
- browser.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/browser.ts
- points-indexer.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/points-indexer.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/types.ts
- errors.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/errors.ts

## Import

```ts
import * as HCS20 from '@hashgraphonline/standards-sdk';
```

## Barrel Exports

- types (all canonical types)
- errors
  - `HCS20Error`, `HCS20ErrorCodes`
- base-client
  - `HCS20BaseClient`
- browser
  - `BrowserHCS20Client`
- sdk
  - `HCS20Client`
- points-indexer
  - `HCS20PointsIndexer` (helper to compute balances from topic messages)
- tx
  - All HCS‑20 deploy/mint/transfer/burn builders

## Clients

```ts
class HCS20BaseClient { /* shared config/mirror/logger */ }
class HCS20Client extends HCS20BaseClient { /* Node: deploy, mint, transfer, burn */ }
class BrowserHCS20Client { /* Wallet-signed equivalents */ }
```

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/sdk.ts

## Indexer

```ts
class HCS20PointsIndexer {
  constructor(network: import('@hashgraphonline/standards-sdk').NetworkType, logger?: import('@hashgraphonline/standards-sdk').Logger, mirrorNodeUrl?: string)
  startIndexing(options?: { publicTopicId?: string; registryTopicId?: string; includePublicTopic?: boolean; includeRegistryTopic?: boolean; privateTopics?: string[]; pollInterval?: number }): Promise<void>
  indexOnce(options?: { publicTopicId?: string; registryTopicId?: string; includePublicTopic?: boolean; includeRegistryTopic?: boolean; privateTopics?: string[] }): Promise<void>
  getState(): import('@hashgraphonline/standards-sdk').PointsState
  getPointsInfo(tick: string): import('@hashgraphonline/standards-sdk').PointsInfo | undefined
  getBalance(tick: string, accountId: string): string
  stopIndexing(): void
}
```

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-20/points-indexer.ts

## Builders (tx)

```ts
// Example signature pattern
function buildHcs20DeployTx(params: { topicId: string; name: string; tick: string; max: string; lim?: string; metadata?: string; memo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs20MintTx(params: { topicId: string; tick: string; amt: string; to: string; memo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

Notes
- See the source for exact builder names and types under `src/hcs-20/tx.ts`.
- The indexer is optional; you can compute balances ad‑hoc if preferred.
