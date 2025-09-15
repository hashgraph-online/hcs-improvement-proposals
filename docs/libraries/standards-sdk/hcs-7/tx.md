---
title: Transactions — HCS‑7
description: Transaction helpers for HCS‑7 bridges.
sidebar_position: 4
---

Note
- These builders are for direct transaction construction (e.g., with the Standards Agent Kit or custom pipelines).
- For most applications, prefer higher‑level bridge/helpers in `wasm-bridge.ts` and `evm-bridge.ts`.

HCS‑7 defines message builders around two bridge modes: EVM and WASM. All payloads include `p: 'hcs-7'` and a matching `op`.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-7
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/tx.ts
- evm-bridge.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/evm-bridge.ts
- wasm-bridge.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/wasm-bridge.ts

## Generic Submit — buildHcs7SubmitMessageTx

Signature

```ts
buildHcs7SubmitMessageTx(params: {
  topicId: string;
  message: BaseMessage;   // see wasm-bridge.ts
  transactionMemo?: string;
}): TopicMessageSubmitTransaction
```

Example

```ts
const tx = buildHcs7SubmitMessageTx({
  topicId: '0.0.123',
  message: { op: 'evm', abi: 'transfer(address,uint256)', to: '0x...', data: '0x...', m: 'demo' },
  transactionMemo: 'hcs-7 evm',
});
```

## EVM Bridge — buildHcs7EvmMessageTx

Signature

```ts
buildHcs7EvmMessageTx(params: {
  topicId: string;
  config: Omit<EVMConfig, 'p' | 'op'> & { m?: string };
  transactionMemo?: string;
}): TopicMessageSubmitTransaction
```

Example

```ts
import { buildHcs7EvmMessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs7EvmMessageTx({
  topicId: '0.0.123',
  config: {
    abi: 'transfer(address,uint256)',
    to: '0xabc...',
    data: '0x...',
    m: 'evm op',
  },
});
```

## WASM Bridge — buildHcs7WasmMessageTx

Signature

```ts
buildHcs7WasmMessageTx(params: {
  topicId: string;
  config: Omit<WASMConfig, 'p' | 'op'> & { m?: string };
  transactionMemo?: string;
}): TopicMessageSubmitTransaction
```

Example

```ts
import { buildHcs7WasmMessageTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs7WasmMessageTx({
  topicId: '0.0.123',
  config: {
    module: 'hcs://1/0.0.777',
    func: 'process',
    input: { x: 1, y: 2 },
    m: 'wasm op',
  },
  transactionMemo: 'hcs-7 wasm',
});
```

Source
- https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-7/tx.ts
