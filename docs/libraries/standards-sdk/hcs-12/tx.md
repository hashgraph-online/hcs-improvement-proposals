---
title: Transactions — HCS‑12
description: Builders for HashLinks registries and assemblies; create topics and submit canonical messages.
sidebar_position: 3
---

Note
- Prefer high‑level clients where possible; use builders for custom flows and agent‑kit integrations.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-12
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-12/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-12/types.ts

## Create Registry — buildHcs12CreateRegistryTopicTx

Registry types: `action` | `assembly` | `hashlinks`.

Signature

```ts
buildHcs12CreateRegistryTopicTx(params: {
  registry: 'action' | 'assembly' | 'hashlinks';
  ttl: number;
  adminKey?: boolean | string | Key;   // MaybeKey
  submitKey?: boolean | string | Key;  // MaybeKey
  memoOverride?: string;
  operatorPublicKey?: PublicKey;
}): TopicCreateTransaction
```

Example

```ts
import { buildHcs12CreateRegistryTopicTx } from '@hashgraphonline/standards-sdk';

const tx = buildHcs12CreateRegistryTopicTx({ registry: 'assembly', ttl: 3600, adminKey: true, submitKey: true });
await (await tx.execute(client)).getReceipt(client);
```

Memo
- Defaults to `hcs-12:1:<ttl>:<typeEnum>`; type map is action=0, assembly=2, hashlinks=3.

## Submit Message — buildHcs12SubmitMessageTx

Generic message submit helper when you already constructed a valid payload.

```ts
buildHcs12SubmitMessageTx({ topicId, payload, transactionMemo? }): TopicMessageSubmitTransaction
```

## Assembly Operations

Register Assembly — buildHcs12RegisterAssemblyTx

```ts
buildHcs12RegisterAssemblyTx({
  assemblyTopicId: string;
  registration: AssemblyRegistration; // see types
}): TopicMessageSubmitTransaction
```

Add Block — buildHcs12AddBlockToAssemblyTx

```ts
buildHcs12AddBlockToAssemblyTx({
  assemblyTopicId: string;
  operation: AssemblyAddBlock;
}): TopicMessageSubmitTransaction
```

Add Action — buildHcs12AddActionToAssemblyTx

```ts
buildHcs12AddActionToAssemblyTx({
  assemblyTopicId: string;
  operation: AssemblyAddAction;
}): TopicMessageSubmitTransaction
```

Update Assembly — buildHcs12UpdateAssemblyTx

```ts
buildHcs12UpdateAssemblyTx({
  assemblyTopicId: string;
  operation: AssemblyUpdate;
}): TopicMessageSubmitTransaction
```

Examples

```ts
import {
  buildHcs12RegisterAssemblyTx,
  buildHcs12AddBlockToAssemblyTx,
} from '@hashgraphonline/standards-sdk';

const reg = buildHcs12RegisterAssemblyTx({ assemblyTopicId: '0.0.500', registration: { p: 'hcs-12', op: 'assembly_register', name: 'Demo', blocks: [] } });
await (await reg.execute(client)).getReceipt(client);

const addBlock = buildHcs12AddBlockToAssemblyTx({ assemblyTopicId: '0.0.500', operation: { p: 'hcs-12', op: 'assembly_add_block', block: { type: 'text', props: { text: 'Hello' } } } });
await (await addBlock.execute(client)).getReceipt(client);
```
