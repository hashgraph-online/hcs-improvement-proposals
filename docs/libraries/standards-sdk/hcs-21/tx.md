---
title: Transactions
sidebar_position: 5
---

# Transaction Builders

The HCS-21 module exposes low-level helpers when you need to compose transactions manually (e.g., batching, custom fee schedules, or advanced signing flows).

## `buildHcs21CreateRegistryTx`

Creates a `TopicCreateTransaction` with the correct memo format (`hcs-21:<indexed>:<ttl>:0`) and optional admin/submit keys.

```ts
import {
  buildHcs21CreateRegistryTx,
  MaybeKey,
} from '@hashgraphonline/standards-sdk';

const tx = buildHcs21CreateRegistryTx({
  ttl: 3600,
  indexed: 0,
  adminKey: myAdminKey as MaybeKey,
  submitKey: mySubmitKey as MaybeKey,
});

const response = await tx.setTransactionMemo('hcs-21 registry').execute(client);
const receipt = await response.getReceipt(client);
console.log('topicId', receipt.topicId?.toString());
```

## `buildHcs21MessageTx`

Wraps a validated `PackageDeclaration` into a `TopicMessageSubmitTransaction`.

```ts
import {
  buildHcs21MessageTx,
  PackageDeclaration,
} from '@hashgraphonline/standards-sdk';

const declaration: PackageDeclaration = {
  p: 'hcs-21',
  op: 'register',
  registry: 'oci',
  t_id: '0.0.800111',
  n: 'Registry Adapter',
  d: 'OCI container adapter for Registry Broker',
  a: 'kantorcodes',
  tags: ['oci', 'adapter'],
  metadata: 'hcs://1/0.0.600777/3',
};

const tx = buildHcs21MessageTx({
  topicId: '0.0.700999',
  declaration,
  transactionMemo: 'adapter container registration',
});

await (await tx.execute(client)).getReceipt(client);
```

Combine these builders with other Standards SDK utilities whenever you need full control over transaction signing.
