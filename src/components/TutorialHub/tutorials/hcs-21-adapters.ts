import type { Tutorial } from '../types';

export const hcs21AdaptersTutorial: Tutorial = {
  id: "hcs-21-adapters",
  title: "HCS-21 Adapter Registry",
  subtitle: "Adapter Declarations and Manifests",
  videoId: "qy7prdzrsGA",
  duration: "Video",
  difficulty: "Advanced",
  prerequisites: ["HCS-16", "HCS-17", "Standards SDK"],
  description:
    "HCS-21 defines how Floras and other appnets discover deterministic adapters. In this lab you will inscribe an adapter manifest, publish an adapter declaration, and wire up version pointers and category discovery so Petals can resolve the active adapter release.",
  learningPoints: [
    "Create adapter registry topics with HCS-21 memos",
    "Inscribe adapter manifests and get immutable pointers",
    "Publish adapter declarations for register/update/delete flows",
    "Create version pointer topics and resolve active declarations",
    "Index adapters under category and discovery topics",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'client.ts',
      content: `import 'dotenv/config';
import { HCS21Client } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required(
  'HEDERA_OPERATOR_ID or HEDERA_ACCOUNT_ID',
  process.env.HEDERA_OPERATOR_ID || process.env.HEDERA_ACCOUNT_ID
);
const operatorKey = required(
  'HEDERA_OPERATOR_KEY or HEDERA_PRIVATE_KEY',
  process.env.HEDERA_OPERATOR_KEY || process.env.HEDERA_PRIVATE_KEY
);

export const hcs21 = new HCS21Client({
  network: 'testnet',
  operatorId,
  operatorKey
});`,
    },
    {
      language: 'typescript',
      filename: 'inscribe-manifest.ts',
      content: `import { hcs21 } from './client';

const manifest = {
  meta: {
    spec_version: '2.0',
    adapter_version: '1.0.0',
    generated: new Date().toISOString()
  },
  adapter: {
    name: 'Flora Registry Adapter',
    id: 'npm/hol-flora-registry@1.0.0',
    maintainers: [{ name: 'Hashgraph Online', contact: 'hello@hashgraphonline.com' }],
    license: 'Apache-2.0'
  },
  package: {
    registry: 'npm',
    dist_tag: 'latest',
    artifacts: [
      {
        url: 'https://registry.npmjs.org/@hol-org/hol-flora-registry/-/hol-flora-registry-1.0.0.tgz',
        digest: 'sha384-REPLACE_WITH_REAL_DIGEST'
      }
    ]
  },
  runtime: {
    platforms: ['node@20'],
    primary: 'node',
    entry: 'dist/index.js'
  },
  capabilities: {
    discovery: true,
    communication: true,
    protocols: ['hcs-16', 'hcs-17', 'hcs-21'],
    discovery_tags: ['flora', 'registry']
  },
  consensus: {
    state_model: 'hcs-21.adapter@1',
    required_fields: ['adapter_id', 'package', 'manifest'],
    hashing: 'sha384'
  }
};

const pointer = await hcs21.inscribeMetadata({ document: manifest });
console.log(pointer.pointer);`,
    },
    {
      language: 'typescript',
      filename: 'publish-declaration.ts',
      content: `import { HCS21TopicType } from '@hashgraphonline/standards-sdk';
import { hcs21 } from './client';

const registryTopicId = await hcs21.createRegistryTopic({
  ttl: 7776000,
  indexed: 1,
  type: HCS21TopicType.ADAPTER_REGISTRY
});

const declaration = {
  op: 'register',
  adapterId: 'npm/hol-flora-registry@1.0.0',
  entity: 'flora-registry',
  adapterPackage: {
    registry: 'npm',
    name: '@hol-org/hol-flora-registry',
    version: '1.0.0',
    integrity: 'sha384-REPLACE_WITH_REAL_DIGEST'
  },
  manifest: 'hcs://1/0.0.123456',
  config: {
    type: 'flora',
    account: '0.0.800',
    threshold: '2/3',
    ctopic: '0.0.111',
    ttopic: '0.0.222',
    stopic: '0.0.333'
  },
  stateModel: 'hcs-21.adapter@1'
};

const result = await hcs21.publishDeclaration({
  topicId: registryTopicId,
  declaration
});

console.log(result.transactionId);`,
    },
    {
      language: 'typescript',
      filename: 'version-pointer.ts',
      content: `import { hcs21 } from './client';

const versionTopicId = await hcs21.createAdapterVersionPointerTopic({
  ttl: 7776000
});

await hcs21.publishVersionPointer({
  versionTopicId,
  declarationTopicId: '0.0.999999',
  memo: 'adapter:npm/hol-flora-registry'
});

const active = await hcs21.resolveVersionPointer(versionTopicId);
console.log(active.declarationTopicId);`,
    },
    {
      language: 'typescript',
      filename: 'category-index.ts',
      content: `import { hcs21 } from './client';

const discoveryTopicId = await hcs21.createRegistryDiscoveryTopic({
  ttl: 7776000
});

const categoryTopicId = await hcs21.createAdapterCategoryTopic({
  ttl: 7776000,
  indexed: 1
});

await hcs21.registerCategoryTopic({
  discoveryTopicId,
  categoryTopicId,
  metadata: 'hcs://1/0.0.444444'
});

await hcs21.publishCategoryEntry({
  categoryTopicId,
  adapterId: 'npm/hol-flora-registry@1.0.0',
  versionTopicId: '0.0.555555'
});`,
    },
  ],
  resources: [
    { label: "HCS-21 Spec", url: "/docs/standards/hcs-21" },
    { label: "HCS-21 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-21/overview" },
    { label: "HCS-21 SDK API", url: "/docs/libraries/standards-sdk/hcs-21/api" },
    { label: "HCS-21 Transactions", url: "/docs/libraries/standards-sdk/hcs-21/tx" },
    { label: "HCS-16 Floras", url: "/docs/standards/hcs-16/" },
  ],
};
