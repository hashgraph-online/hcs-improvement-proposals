---
title: Transactions — HCS‑7
description: Low-level transaction builders for registries, configs, and WASM routers.
sidebar_position: 4
---

These helpers produce signed-ready Hedera `TopicMessageSubmitTransaction` objects. They are useful when you need to integrate HCS‑7 messages into other toolchains (agent schedulers, custom wallets, etc.) without instantiating `HCS7Client`.

Sources:

- [`src/hcs-7/tx.ts`](https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-7/tx.ts)
- [`src/common/tx/tx-utils.ts`](https://github.com/hashgraph-online/standards-sdk/blob/main/src/common/tx/tx-utils.ts)

Import:

```ts
import {
  buildHcs7CreateRegistryTx,
  buildHcs7SubmitMessageTx,
  buildHcs7EvmMessageTx,
  buildHcs7WasmMessageTx,
} from '@hashgraphonline/standards-sdk';
```

---

## `buildHcs7CreateRegistryTx`

```ts
const tx = buildHcs7CreateRegistryTx({
  ttl: 86_400,
  submitKey: operatorPublicKey,
  adminKey: operatorPublicKey,
  operatorPublicKey,
});
```

- Memo is auto-set to `hcs-7:indexed:{ttl}`.
- Pass `submitKey: true` / `adminKey: true` to reuse the operator key.
- Returns a `TopicCreateTransaction` you can sign with the Hedera SDK.

---

## `buildHcs7SubmitMessageTx`

```ts
const tx = buildHcs7SubmitMessageTx({
  topicId: '0.0.10058300',
  message: {
    op: 'register-config',
    t: 'evm',
    c: { /* ... */ },
  },
  transactionMemo: 'hcs7-config',
});
```

Wraps an arbitrary HCS‑7 payload with `p: 'hcs-7'` before serializing and attaching it to the topic message.

---

## `buildHcs7EvmMessageTx`

```ts
const tx = buildHcs7EvmMessageTx({
  topicId: '0.0.10058300',
  config: {
    contractAddress: '0x1d67aaf7f7e8d806bbeba24c4dea24808e1158b8',
    abi: {
      name: 'minted',
      inputs: [],
      outputs: [{ name: '', type: 'uint64' }],
      stateMutability: 'view',
      type: 'function',
    },
    m: 'LaunchPage minted',
  },
  transactionMemo: 'hcs7-evm',
});
```

Produces the canonical `register-config` payload for EVM readers:

```json
{
  "p": "hcs-7",
  "op": "register-config",
  "t": "evm",
  "c": { "contractAddress": "…", "abi": { … } },
  "m": "LaunchPage minted"
}
```

---

## `buildHcs7WasmMessageTx`

```ts
const tx = buildHcs7WasmMessageTx({
  topicId: '0.0.10058300',
  config: {
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
    m: 'mint router',
  },
  transactionMemo: 'hcs7-wasm',
});
```

Emits the `register-config` payload required for WASM routers.

---

## Signing + Sending

Each builder returns a Hedera SDK transaction object. Use the standard pattern to sign and submit:

```ts
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
await tx.freezeWith(client);
await tx.sign(operatorKey);
const receipt = await tx.execute(client).then(res => res.getReceipt(client));
```

For multi-sig workflows, sign with multiple keys before calling `.execute()`.
