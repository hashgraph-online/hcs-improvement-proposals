---
title: Server SDK
sidebar_position: 3
---

# HCS-21 Server Client (`HCS21Client`)

Use `HCS21Client` inside Node.js services (bots, registries, CI/CD pipelines) to create package registry topics, inscribe metadata, and publish or stream declarations.

## Initialization

```ts
import {
  HCS21Client,
  PackageMetadataRecord,
} from '@hashgraphonline/standards-sdk';

const client = new HCS21Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_OPERATOR_ID!,
  operatorKey: process.env.HEDERA_OPERATOR_KEY!,
  logLevel: 'info',
});
```

## Inscribe Metadata via HCS-1

```ts
const metadata: PackageMetadataRecord = {
  schema: 'hcs-21/metadata@1.0',
  t_id: '0.0.1234567',
  website: 'https://hashgraph.online',
  docs: 'https://hashgraph.online/docs/libraries/standards-sdk/',
  source: 'https://github.com/hashgraph-online/standards-sdk',
  tags: ['sdk', 'registry'],
  capabilities: ['registry-broker', 'cli'],
};

const pointer = await client.inscribeMetadata({ metadata });
// pointer.pointer === 'hcs://1/0.0.1234567/42'
```

## Create a Registry Topic

```ts
const topicId = await client.createRegistryTopic({
  ttl: 3600,
  indexed: 0,
  transactionMemo: 'hcs-21 registry demo',
});
```

## Publish & Update Declarations

```ts
const packageTopicId = '0.0.1234567'; // HCS-2 topic that stores package versions

await client.publishDeclaration({
  topicId,
  declaration: {
    op: 'register',
    registry: 'npm',
    t_id: packageTopicId,
    name: 'Standards SDK',
    description: 'Typed helpers for Hedera standards',
    author: 'Kantorcodes',
    tags: ['sdk', 'registry'],
    metadata: pointer.pointer,
  },
});

await client.publishDeclaration({
  topicId,
  declaration: {
    op: 'update',
    registry: 'npm',
    t_id: packageTopicId,
    name: 'Standards SDK',
    description: 'Rotated metadata pointer',
    author: 'Kantorcodes',
    metadata: pointer.pointer,
  },
  transactionMemo: 'rotate metadata pointer',
});
```

## Stream Declarations

```ts
const latest = await client.fetchDeclarations(topicId, {
  limit: 10,
  order: 'desc',
});

latest.forEach(envelope => {
  console.log(envelope.sequenceNumber, envelope.payer);
  console.log(envelope.declaration.registry, envelope.declaration.n);
});
```

The `HCS21Client` automatically filters out non-`hcs-21` payloads and validates each declaration against the schema from the standard.
