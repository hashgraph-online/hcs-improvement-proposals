---
title: HCS‑7 API Reference
description: Vanilla reference for EVM/WASM bridge helpers and message builders.
sidebar_position: 5
---

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-7
- evm-bridge.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/evm-bridge.ts
- wasm-bridge.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/wasm-bridge.ts
- redis-cache.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/redis-cache.ts
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/tx.ts

## Import Paths

```ts
import { EVMBridge, MapCache } from '@hashgraphonline/standards-sdk/hcs-7/evm-bridge';
import { WasmBridge, type EVMConfig, type WASMConfig, type WasmExports } from '@hashgraphonline/standards-sdk/hcs-7/wasm-bridge';
import { RedisCache, type RedisConfig } from '@hashgraphonline/standards-sdk/hcs-7/redis-cache';
import { buildHcs7SubmitMessageTx, buildHcs7EvmMessageTx, buildHcs7WasmMessageTx } from '@hashgraphonline/standards-sdk/hcs-7/tx';
```

## EVMBridge

```ts
class EVMBridge {
  constructor(network?: string, mirrorNodeUrl?: string, cache?: EVMCache)
  executeCommands(evmConfigs: EVMConfig[], initialState?: Record<string,string>): Promise<{ results: Record<string, any>; stateData: Record<string, any> }>
  executeCommand(evmConfig: EVMConfig, stateData?: Record<string,string>): Promise<{ result: any; stateData: Record<string, any> }>
  readFromMirrorNode(command: string, from: import('@hashgraph/sdk').AccountId, to: import('@hashgraph/sdk').ContractId): Promise<any>
}

interface EVMCache { get(key: string): Promise<string|undefined>|string|undefined; set(key: string, value: string): Promise<void>|void; delete(key: string): Promise<void>|void; clear(): Promise<void>|void }
class MapCache implements EVMCache { /* in‑memory */ }
class RedisCache implements EVMCache { constructor(config: RedisConfig) /* external cache */ }
```

Notes
- Encodes ABI calls and reads using Mirror Node contract call endpoint, decoding via `ethers.Interface`.
- Caches results by `contractAddress` + `abi.name` to reduce calls.

Source
- https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/evm-bridge.ts

## WasmBridge

```ts
class WasmBridge {
  constructor();
  loadWasm(config: WASMConfig): Promise<WasmExports>;
  execute(configs: Array<WASMConfig|EVMConfig>, initialState?: Record<string, any>): Promise<{ state: Record<string, any>; results: any[] }>;
}

interface EVMConfig { c: { contractAddress: string; abi: { name: string; type?: string; inputs?: any[]; outputs?: any[] } } }
interface WASMConfig { w: { url: string; functionName: string; args?: any[] } }
```

## Builders (tx.ts)

```ts
function buildHcs7SubmitMessageTx(params: { topicId: string; message: string; transactionMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs7EvmMessageTx(params: { topicId: string; contractAddress: string; abi: any; transactionMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
function buildHcs7WasmMessageTx(params: { topicId: string; url: string; functionName: string; args?: any[]; transactionMemo?: string }): import('@hashgraph/sdk').TopicMessageSubmitTransaction;
```

## Example

```ts
const bridge = new EVMBridge('testnet');
const { result } = await bridge.executeCommand({ c: { contractAddress: '0x…', abi: { name: 'totalSupply', outputs: [{ type: 'uint256', name: 'supply' }] } } });
```
