import type { Tutorial } from '../types';

export const hcs1InscriptionsTutorial: Tutorial = {
  id: "hcs-1-inscriptions",
  title: "HCS-1 Inscriptions",
  subtitle: "Immutable Content Pointers",
  videoId: "placeholder_hcs1",
  duration: "Video",
  difficulty: "Intermediate",
  prerequisites: ["Standards SDK"],
  description:
    "HCS-1 turns Hedera Consensus Service topics into immutable content pointers. In this lab you will inscribe JSON manifests and files, quote an inscription before you pay, and resolve the resulting hcs://1 pointer so downstream standards (HCS-5, HCS-21) can reuse the metadata safely.",
  learningPoints: [
    "Inscribe JSON or file payloads with tags and metadata",
    "Capture the correct HCS-1 topic ID from inscription results",
    "Generate immutable hcs://1 pointers for other standards",
    "Resolve pointers back to content with the HRL resolver",
    "Quote inscription costs before submitting a transaction",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'inscribe-json.ts',
      content: `import 'dotenv/config';
import { Buffer } from 'buffer';
import { inscribe, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const accountId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-1' });

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
  }
};

const response = await inscribe(
  {
    type: 'buffer',
    buffer: Buffer.from(JSON.stringify(manifest, null, 2)),
    fileName: 'adapter-manifest.json',
    mimeType: 'application/json'
  },
  {
    accountId,
    privateKey,
    network
  },
  {
    mode: 'file',
    waitForConfirmation: true,
    tags: ['hcs-1', 'manifest', 'adapter'],
    metadata: {
      name: manifest.adapter.name,
      entity: 'flora',
      version: manifest.meta.adapter_version
    }
  }
);

const topicId =
  response.inscription?.jsonTopicId ||
  response.inscription?.topicId ||
  response.inscription?.topic_id;

if (!topicId) {
  throw new Error('Inscription did not return a topic ID');
}

const pointer = \`hcs://1/\${topicId}\`;
logger.info('Manifest pointer ready', { pointer });`,
    },
    {
      language: 'typescript',
      filename: 'inscribe-file.ts',
      content: `import 'dotenv/config';
import { inscribe, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const accountId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const filePath = required('FILE_PATH', process.env.FILE_PATH);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-1' });

const response = await inscribe(
  { type: 'file', path: filePath },
  { accountId, privateKey, network },
  {
    mode: 'file',
    waitForConfirmation: true,
    tags: ['hcs-1', 'asset']
  }
);

const topicId =
  response.inscription?.topicId ||
  response.inscription?.topic_id ||
  response.inscription?.jsonTopicId;

if (!topicId) {
  throw new Error('No topic ID returned from inscription');
}

logger.info('File pointer', {
  pointer: \`hcs://1/\${topicId}\`,
  totalCostHbar: response.costSummary?.totalCostHbar
});`,
    },
    {
      language: 'typescript',
      filename: 'resolve-hrl.ts',
      content: `import 'dotenv/config';
import { HRLResolver, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const pointer = required('HCS1_POINTER', process.env.HCS1_POINTER);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-1' });

const resolver = new HRLResolver();
const resolved = await resolver.resolve(pointer, { network });

logger.info('Resolved pointer', {
  topicId: resolved.topicId,
  contentType: resolved.contentType,
  isBinary: resolved.isBinary
});`,
    },
    {
      language: 'typescript',
      filename: 'quote.ts',
      content: `import 'dotenv/config';
import { inscribe, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const accountId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-1' });

const response = await inscribe(
  { type: 'url', url: 'https://example.com/adapter.json' },
  { accountId, privateKey, network },
  {
    mode: 'file',
    quoteOnly: true
  }
);

logger.info('Quote details', response.result);`,
    },
  ],
  resources: [
    { label: "HCS-1 Spec", url: "/docs/standards/hcs-1" },
    { label: "Inscribe SDK Guide", url: "/docs/libraries/standards-sdk/inscribe" },
    { label: "Standards SDK Overview", url: "/docs/libraries/standards-sdk/overview" },
    { label: "Utilities & Services", url: "/docs/libraries/standards-sdk/utils-services" },
  ],
};
