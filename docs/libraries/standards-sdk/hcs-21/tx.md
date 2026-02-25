---
title: Transactions
sidebar_position: 5
---

# Transaction Builders

The HCS-21 module exposes low-level helpers for composing adapter registry transactions (custom batching, fee schedules, or advanced signing flows).

## `buildHcs21CreateRegistryTx`

Creates a `TopicCreateTransaction` with the correct memo format (`hcs-21:<indexed>:<ttl>:<type>:<meta>`) and optional admin/submit keys.

```ts
import {
  buildHcs21CreateRegistryTx,
  HCS21TopicType,
  Logger,
} from '@hashgraphonline/standards-sdk';
import { PublicKey } from '@hashgraph/sdk';

const logger = new Logger({ module: 'hcs-21-tx', level: 'info' });

const tx = buildHcs21CreateRegistryTx({
  ttl: 3600,
  indexed: 0,
  type: HCS21TopicType.ADAPTER_REGISTRY,
  adminKey: PublicKey.fromString(myAdminKey),
  submitKey: PublicKey.fromString(mySubmitKey),
});

const response = await tx.setTransactionMemo('flora adapter registry').execute(client);
const receipt = await response.getReceipt(client);
logger.info('topic ready', { topicId: receipt.topicId?.toString() });
```

## `buildHcs21MessageTx`

Wraps a validated `AdapterDeclaration` into a `TopicMessageSubmitTransaction`.

```ts
import {
  AdapterDeclaration,
  buildHcs21MessageTx,
} from '@hashgraphonline/standards-sdk';

const declaration: AdapterDeclaration = {
  p: 'hcs-21',
  op: 'register',
  adapter_id: 'oci/@hashgraphonline/x402-bazaar-adapter@1.3.2',
  entity: 'agent',
  package: {
    registry: 'oci',
    name: '@hashgraphonline/x402-bazaar-adapter',
    version: '1.3.2',
    integrity: 'sha384-demo-digest',
  },
  manifest: 'hcs://1/0.0.600777',
  manifest_sequence: 3, // optional pin
  config: {
    account: '0.0.9001',
    threshold: '2-of-3',
    ctopic: '0.0.9101',
    ttopic: '0.0.9102',
    stopic: '0.0.9103',
  },
  state_model: 'hcs-21.entity-consensus@1',
};

const tx = buildHcs21MessageTx({
  topicId: '0.0.700999',
  declaration,
  transactionMemo: 'adapter declaration',
});

await (await tx.execute(client)).getReceipt(client);
```

Combine these builders with other Standards SDK utilities whenever you need full control over transaction signing.
