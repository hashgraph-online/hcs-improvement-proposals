---
title: Node — Registry + Bridges
description: Use `HCS7Client`, `EVMBridge`, and `WasmBridge` from server environments.
sidebar_position: 2
---

## 1. Instantiate the Node Client

```ts
import { HCS7Client, HCS7ConfigType } from '@hashgraphonline/standards-sdk';

const hcs7 = new HCS7Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorKey: process.env.HEDERA_PRIVATE_KEY!,
});
```

The client wraps all topic/transaction plumbing: memo generation (`hcs-7:indexed:{ttl}`), signing, and receipt handling. Call `hcs7.close()` when you finish.

## 2. Create a Registry Topic

```ts
const registry = await hcs7.createRegistry({ ttl: 86_400, submitKey: true });
if (!registry.success || !registry.topicId) throw new Error(registry.error);

console.log('Registry Topic:', registry.topicId);
```

- `ttl` must be ≥ 3600 seconds.
- `submitKey: true` reuses the operator key as the topic submit key. Pass a `PrivateKey` or `string` to use a dedicated key.

## 3. Register EVM + WASM Configs

```ts
await hcs7.registerConfig({
  registryTopicId: registry.topicId,
  memo: 'LaunchPage minted',
  config: {
    type: HCS7ConfigType.EVM,
    contractAddress: '0x1d67aaf7f7e8d806bbeba24c4dea24808e1158b8',
    abi: {
      name: 'minted',
      inputs: [],
      outputs: [{ name: '', type: 'uint64' }],
      stateMutability: 'view',
      type: 'function',
    },
  },
});

await hcs7.registerConfig({
  registryTopicId: registry.topicId,
  memo: 'mint router',
  config: {
    type: HCS7ConfigType.WASM,
    wasmTopicId: '0.0.5269810',
    inputType: {
      stateData: {
        minted: 'number',
        tokensRemaining: 'number',
      },
    },
    outputType: {
      type: 'string',
      format: 'topic-id',
    },
  },
});
```

Each registration writes a `register-config` message into the same HCS‑7 topic the toolkit polls.

## 4. Register Metadata Targets

```ts
await hcs7.registerMetadata({
  registryTopicId: registry.topicId,
  metadataTopicId: '0.0.3717738',
  weight: 1,
  tags: ['odd'],
  memo: 'odd artwork',
});

await hcs7.registerMetadata({
  registryTopicId: registry.topicId,
  metadataTopicId: '0.0.3717746',
  weight: 1,
  tags: ['even'],
  memo: 'even artwork',
});
```

## 5. Query the Registry

```ts
const topic = await hcs7.getRegistry(registry.topicId, { limit: 50 });
topic.entries.forEach(entry => {
  console.log(entry.sequenceNumber, entry.message.op, entry.message.m);
});
```

`getRegistry` reads the Mirror Node, validates each message against the HCS‑7 schema, and returns typed entries.

## 6. Use the Bridges for State + Routing

### EVMBridge

```ts
import { EVMBridge } from '@hashgraphonline/standards-sdk';

const evm = new EVMBridge('testnet');
const { result } = await evm.executeCommand({
  c: {
    contractAddress: '0x1d67aaf7f7e8d806bbeba24c4dea24808e1158b8',
    abi: {
      name: 'minted',
      inputs: [],
      outputs: [{ name: '', type: 'uint64' }],
      stateMutability: 'view',
      type: 'function',
    },
  },
});

console.log('Minted so far:', result.values?.[0]);
```

Swap in `RedisCache` if you need a shared cache across processes:

```ts
import { RedisCache } from '@hashgraphonline/standards-sdk';
const evm = new EVMBridge('testnet', undefined, new RedisCache({ host: '127.0.0.1' }));
```

### WasmBridge

```ts
import { WasmBridge } from '@hashgraphonline/standards-sdk';

const wasm = new WasmBridge();
const wasmBytes = await fetch('https://kiloscribe.com/api/inscription-cdn/0.0.5269810?network=testnet').then(r => r.arrayBuffer());
await wasm.initWasm(wasmBytes);

const messages = await hcs7.getRegistry(registry.topicId, { limit: 100 });
const stateData = {
  minted: '42',
  tokensRemaining: '58',
};

const topicId = wasm.executeWasm(stateData, messages.entries.map(e => e.message));
console.log('Selected metadata topic:', topicId);
```

## 7. Low-Level Transactions

When you need to integrate with other toolchains (e.g., schedule a submit in HCS‑10 or build transactions inside the Agent Kit), use the helpers in [`src/hcs-7/tx.ts`](./tx.md).

- `buildHcs7CreateRegistryTx`
- `buildHcs7SubmitMessageTx`
- `buildHcs7EvmMessageTx`
- `buildHcs7WasmMessageTx`

Each helper serializes the payload (`p: 'hcs-7'`, `op`, etc.) so you only need to sign/send it with the Hedera SDK or another orchestration tool.

---

## 8. Fetching Metadata / WASM from KiloScribe

Any topic you inscribe with the Standards SDK (metadata or WASM) is mirrored to the CDN. Use it when rendering hashinals or downloading routers server-side:

```ts
const topicId = '0.0.3717746';
const res = await fetch(
  `https://kiloscribe.com/api/inscription-cdn/${topicId}?network=testnet`,
  { headers: { Accept: 'application/json' } },
);
const metadata = await res.json();
```

For WASM binaries:

```ts
const wasmTopicId = '0.0.5269810';
const wasmBytes = await fetch(
  `https://kiloscribe.com/api/inscription-cdn/${wasmTopicId}?network=testnet`,
  { headers: { Accept: 'application/wasm' } },
).then(r => r.arrayBuffer());
```

You can still pull messages directly from HCS topics if you prefer, but the CDN saves repeated decoding.
