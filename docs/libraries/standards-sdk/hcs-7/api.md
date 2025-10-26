---
title: HCS‑7 API Reference
description: Full list of classes, helpers, and types exported by the Standards SDK HCS‑7 module.
sidebar_position: 5
---

## Import Map

```ts
import {
  HCS7Client,
  HCS7BrowserClient,
  HCS7ConfigType,
  type HCS7RegisterConfigOptions,
  type HCS7RegisterMetadataOptions,
  type HCS7CreateRegistryOptions,
  type HCS7RegistryTopic,
} from '@hashgraphonline/standards-sdk';

import {
  EVMBridge,
  MapCache,
  type EVMConfig,
} from '@hashgraphonline/standards-sdk/hcs-7/evm-bridge';

import {
  WasmBridge,
  type WASMConfig,
} from '@hashgraphonline/standards-sdk/hcs-7/wasm-bridge';

import {
  RedisCache,
  type RedisConfig,
} from '@hashgraphonline/standards-sdk/hcs-7/redis-cache';

import {
  buildHcs7CreateRegistryTx,
  buildHcs7SubmitMessageTx,
  buildHcs7EvmMessageTx,
  buildHcs7WasmMessageTx,
} from '@hashgraphonline/standards-sdk/hcs-7/tx';
```

---

## `HCS7Client`

```ts
class HCS7Client {
  constructor(config: {
    network: 'testnet' | 'mainnet';
    operatorId: string | AccountId;
    operatorKey: string | PrivateKey;
    keyType?: 'ed25519' | 'ecdsa';
    mirrorNodeUrl?: string;
    logger?: Logger;
  });

  createRegistry(options?: HCS7CreateRegistryOptions): Promise<HCS7TopicRegistrationResponse>;
  registerConfig(options: HCS7RegisterConfigOptions): Promise<HCS7RegistryOperationResponse>;
  registerMetadata(options: HCS7RegisterMetadataOptions): Promise<HCS7RegistryOperationResponse>;
  getRegistry(topicId: string, opts?: HCS7QueryRegistryOptions): Promise<HCS7RegistryTopic>;
  close(): void;
}
```

- Automatically builds the `hcs-7:indexed:{ttl}` memo.
- Validates all payloads with zod before submitting.
- Uses the Hedera SDK under the hood.

### Types

```ts
interface HCS7CreateRegistryOptions {
  ttl?: number;                // default 86_400
  submitKey?: boolean | string | PrivateKey;
  adminKey?: boolean | string | PrivateKey;
}

interface HCS7RegisterConfigOptions {
  registryTopicId: string;
  memo?: string;
  transactionMemo?: string;
  submitKey?: string | PrivateKey;
  config: HCS7RegisterConfigInput;
}

type HCS7RegisterConfigInput =
  | {
      type: HCS7ConfigType.EVM;
      contractAddress: string;
      abi: HCS7AbiDefinition;
    }
  | {
      type: HCS7ConfigType.WASM;
      wasmTopicId: string;
      inputType: { stateData: Record<string, HCS7StateValueType> };
      outputType: { type: 'string'; format: 'topic-id' };
    };

interface HCS7RegisterMetadataOptions {
  registryTopicId: string;
  metadataTopicId: string;
  memo?: string;
  weight: number;
  tags: string[];
  data?: Record<string, unknown>;
  transactionMemo?: string;
  submitKey?: string | PrivateKey;
}
```

---

## `HCS7BrowserClient`

Same API surface as `HCS7Client`, but `constructor` accepts `{ network, hwc }` where `hwc` is an instance of `HashinalsWalletConnectSDK`. Transactions are routed through WalletConnect’s `submitMessageToTopic` / `createTopic` helpers.

---

## `EVMBridge`

```ts
class EVMBridge {
  constructor(
    network?: string,
    mirrorNodeUrl?: string,
    cache?: EVMCache,
  );

  executeCommands(configs: EVMConfig[], initialState?: Record<string, any>): Promise<{
    results: Record<string, any>;
    stateData: Record<string, any>;
  }>;

  executeCommand(config: EVMConfig, stateData?: Record<string, any>): Promise<{
    result: any;
    stateData: Record<string, any>;
  }>;

  clearCache(): Promise<void>;
}

interface EVMConfig {
  c: {
    contractAddress: string;
    abi: {
      name: string;
      inputs?: HCS7AbiIO[];
      outputs?: HCS7AbiIO[];
      stateMutability: 'view' | 'pure';
      type?: 'function';
    };
  };
}

interface EVMCache {
  get(key: string): Promise<string | undefined> | string | undefined;
  set(key: string, value: string): Promise<void> | void;
  delete(key: string): Promise<void> | void;
  clear(): Promise<void> | void;
}

class MapCache implements EVMCache { /* in-memory */ }
class RedisCache implements EVMCache { constructor(config?: RedisConfig); }
```

---

## `WasmBridge`

```ts
class WasmBridge {
  initWasm(wasmBytes: BufferSource): Promise<WasmExports>;
  executeWasm(stateData: Record<string, any>, messages: BaseMessage[]): string;
  createStateData(wasmConfig: WASMConfig, state?: Record<string, any>): Record<string, any>;
  createWasmFunction(fn: (...args: any[]) => any): (...args: string[]) => string;
  getParams(): string;
}

interface WASMConfig {
  c: {
    wasmTopicId: string;
    inputType: { stateData: Record<string, HCS7StateValueType> };
    outputType: { type: 'string'; format: 'topic-id' };
  };
}
```

---

## Builders

- `buildHcs7CreateRegistryTx`
- `buildHcs7SubmitMessageTx`
- `buildHcs7EvmMessageTx`
- `buildHcs7WasmMessageTx`

See the [Transactions guide](./tx.md) for usage details.

---

## Demo Utilities

The package also ships an end-to-end CLI at [`demo/hcs-7/create-hcs-7-topic.ts`](https://github.com/hashgraph-online/standards-sdk/blob/main/demo/hcs-7/create-hcs-7-topic.ts) and a Rust/WASM toolkit in [`hcs-7-toolkit`](https://github.com/hashgraph-online/hcs-7-toolkit) to help you stand up registries quickly.
