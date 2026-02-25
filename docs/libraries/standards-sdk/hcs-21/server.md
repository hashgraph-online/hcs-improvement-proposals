---
title: Server SDK
sidebar_position: 3
---

# HCS-21 Server Client (`HCS21Client`)

Use `HCS21Client` inside Node.js services (registries, CI/CD, Petal orchestration) to create adapter registry topics, inscribe manifests or registry metadata via HCS-1, and publish or stream adapter declarations.

## Initialization

```ts
import {
  AdapterManifest,
  HCS21Client,
  Logger,
} from '@hashgraphonline/standards-sdk';

const logger = new Logger({ module: 'hcs-21-server', level: 'info' });

const client = new HCS21Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_OPERATOR_ID!,
  operatorKey: process.env.HEDERA_OPERATOR_KEY!,
  logLevel: 'info',
});
```

## Inscribe an Adapter Manifest (HCS-1)

```ts
const manifest: AdapterManifest = {
  meta: {
    spec_version: '1.0',
    adapter_version: '1.3.2',
    generated: new Date().toISOString(),
  },
  adapter: {
    id: 'npm/@hashgraphonline/x402-bazaar-adapter@1.3.2',
    name: 'X402 Bazaar Agent Adapter',
    maintainers: [{ name: 'Hashgraph Online', contact: 'ops@hashgraph.online' }],
    license: 'Apache-2.0',
  },
  package: {
    registry: 'npm',
    dist_tag: 'stable',
    artifacts: [
      {
        url: 'npm://@hashgraphonline/x402-bazaar-adapter@1.3.2',
        digest: 'sha384-demo-digest',
        signature: 'demo-signature',
      },
    ],
  },
  runtime: {
    platforms: ['node>=20.10.0'],
    primary: 'node',
    entry: 'dist/index.js',
    dependencies: ['@hashgraphonline/standards-sdk@^1.8.0'],
    env: ['X402_API_KEY'],
  },
  capabilities: {
    discovery: true,
    communication: true,
    protocols: ['x402', 'uaid'],
  },
  consensus: {
    entity_schema: 'hcs-21.entity-consensus@1',
    required_fields: ['entity_id', 'registry', 'state_hash', 'epoch'],
    hashing: 'sha384',
  },
};

const manifestPointer = await client.inscribeMetadata({ document: manifest });
// manifestPointer.pointer -> "hcs://1/<topic>"
// manifestPointer.manifestSequence -> sequence number for this manifest
// manifestPointer.totalCostHbar -> network fee paid for the inscription
```

## Create an Adapter Registry Topic

```ts
const registryTopicId = await client.createRegistryTopic({
  ttl: 3600,
  indexed: 0,
  transactionMemo: 'flora adapter registry',
});
```

## Create an Adapter Category Topic (HCS-21 indexed)

Adapter categories organize adapters inside a discovery list. Each entry uses the slug `adapter:<namespace>/<name>` and points to a version pointer topic.

```ts
const categoryTopicId =
  process.env.HCS21_CATEGORY_TOPIC_ID ||
  (await client.createAdapterCategoryTopic({
    ttl: 86400,
    metaTopicId: process.env.HCS21_REGISTRY_METADATA_POINTER, // optional HCS-1 registry manifest
    transactionMemo: 'adapter-registry:price:category',
  }));

await client.registerCategoryTopic({
  discoveryTopicId: process.env.HCS21_DISCOVERY_TOPIC_ID!,
  categoryTopicId,
  metadata: process.env.HCS21_REGISTRY_METADATA_POINTER,
  memo: 'adapter-registry:price',
});
```

## Create a Version Pointer Topic (HCS-2 Non-Indexed)

Version pointers are `hcs-2:1:<ttl>` topics. Only the latest message matters; it references the live HCS-21 declaration topic for that adapter or registry.

```ts
const versionPointerTopicId =
  process.env.HCS21_VERSION_TOPIC_ID ||
  (await client.createAdapterVersionPointerTopic({
    ttl: 3600,
    memoOverride: 'hcs-2:1:3600',
    transactionMemo: 'adapter-registry:pointer',
  }));
```

## Publish the Current Registry Topic

Publish the active HCS-21 topic into the version pointer, then list that pointer inside the category topic.

```ts
await client.publishVersionPointer({
  versionTopicId: versionPointerTopicId,
  declarationTopicId: registryTopicId,
  memo: 'adapter:npm/@hashgraphonline/x402-bazaar-adapter',
});

await client.publishCategoryEntry({
  categoryTopicId,
  adapterId: 'npm/@hashgraphonline/x402-bazaar-adapter',
  versionTopicId: versionPointerTopicId,
  metadata: process.env.HCS21_REGISTRY_METADATA_POINTER,
});
```

- Rotating to a new registry topic only requires another `publishVersionPointer` call with the new `declarationTopicId`.
- Category entries stay fixed; consumers always resolve the slug (`adapter:npm/...`) to discover the active pointer before streaming declarations.

## Publish Adapter Declarations

```ts
await client.publishDeclaration({
  topicId: registryTopicId,
  declaration: {
    op: 'register',
    adapterId: manifest.adapter.id,
    entity: 'agent',
    adapterPackage: {
      registry: 'npm',
      name: '@hashgraphonline/x402-bazaar-adapter',
      version: '1.3.2',
      integrity: 'sha384-demo-digest',
    },
    manifest: manifestPointer.pointer,
    manifestSequence: manifestPointer.manifestSequence,
    config: {
      type: 'flora',
      account: '0.0.9876',
      threshold: '2/3',
      ctopic: '0.0.700111',
      ttopic: '0.0.700112',
      stopic: '0.0.700113',
    },
    stateModel: 'hcs-21.entity-consensus@1',
  },
});
```

## Resolve the Active Registry Topic

Consumers (and automated publishers) should resolve the version pointer topic before streaming or publishing. The helper returns the active HCS-21 topic ID plus metadata.

```ts
const pointer = await client.resolveVersionPointer(versionPointerTopicId);
const activeRegistryTopicId =
  process.env.HCS21_REGISTRY_TOPIC_ID || pointer.declarationTopicId;
```

## Stream Declarations

```ts
const latest = await client.fetchDeclarations(activeRegistryTopicId, {
  limit: 10,
  order: 'desc',
});

latest.forEach(envelope => {
  logger.info('hcs-21 declaration', {
    sequence: envelope.sequenceNumber,
    payer: envelope.payer,
    adapter: envelope.declaration.adapter_id,
    stateModel: envelope.declaration.state_model,
  });
});
```

The `HCS21Client` filters non-`hcs-21` payloads, enforces the 1 KB limit, and validates every declaration against the updated schema.
