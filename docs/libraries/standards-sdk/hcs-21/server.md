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
```

## Create an Adapter Registry Topic

```ts
const registryTopicId = await client.createRegistryTopic({
  ttl: 3600,
  indexed: 0,
  transactionMemo: 'flora adapter registry',
});
```

## Create a Version Pointer Topic (HCS-2)

Version pointer topics are HCS-2 **non-indexed** registries that always return the latest HCS-21 topic ID. They let you rotate adapter registries without rewriting the discovery list.

```ts
const versionPointerTopicId =
  process.env.HCS21_VERSION_TOPIC_ID ||
  (await client.createRegistryVersionTopic({
    ttl: 3600,
    transactionMemo: 'adapter-registry:pointer',
  }));
```

## Publish the Current Registry Topic

Publish the active HCS-21 topic into the version pointer topic, then register the pointer in the global registry-of-registries.

```ts
await client.publishRegistryVersion({
  versionTopicId: versionPointerTopicId,
  registryTopicId,
  metadata: 'hcs://1/0.0.123456', // optional registry metadata pointer
  memo: 'adapter-registry:price:v1',
});

await client.registerVersionTopic({
  registryOfRegistriesTopicId: process.env.HCS21_ROR_TOPIC_ID!,
  versionTopicId: versionPointerTopicId,
  memo: 'adapter-registry:price',
});
```

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
      account: '0.0.9876',
      threshold: '2-of-3',
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
const pointer = await client.resolveRegistryPointer(versionPointerTopicId);
// pointer.registryTopicId -> latest HCS-21 topic
```

## Stream Declarations

```ts
const latest = await client.fetchDeclarations(registryTopicId, {
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
