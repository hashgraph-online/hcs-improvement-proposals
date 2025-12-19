import type { Tutorial } from '../types';

export const hcs5HashinalsTutorial: Tutorial = {
  id: "hcs-5-hashinals",
  title: "HCS-5 Hashinals",
  subtitle: "NFTs Backed by HCS-1",
  videoId: "placeholder_hcs5",
  duration: "Video",
  difficulty: "Intermediate",
  prerequisites: ["HCS-1", "Hedera HTS"],
  description:
    "HCS-5 ties HTS NFTs to immutable HCS-1 metadata. In this lab you will inscribe Hashinal metadata, mint with HCS5Client in a single flow, and mint additional serials by reusing existing HCS-1 topics.",
  learningPoints: [
    "Initialize HCS5Client with operator credentials and network",
    "Supply required Hashinal metadata when inscribing",
    "Mint a Hashinal in a single createHashinal call",
    "Mint additional serials from an existing HCS-1 topic",
    "Capture serial numbers and metadata pointers from responses",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'create-hashinal.ts',
      content: `import 'dotenv/config';
import { HCS5Client, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const tokenId = required('HTS_TOKEN_ID', process.env.HTS_TOKEN_ID);
const filePath = required('HASHINAL_FILE_PATH', process.env.HASHINAL_FILE_PATH);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-5' });

const hcs5 = new HCS5Client({
  network,
  operatorId,
  operatorKey
});

const result = await hcs5.createHashinal({
  tokenId,
  inscriptionInput: {
    type: 'file',
    path: filePath
  },
  inscriptionOptions: {
    tags: ['hashinal', 'hcs-5'],
    metadata: {
      name: 'Hashinal #1',
      creator: operatorId,
      description: 'HCS-5 tutorial hashinal',
      type: 'hashinal',
      attributes: [{ trait_type: 'series', value: 'tutorial' }]
    }
  },
  memo: 'hcs-5 tutorial mint'
});

logger.info('Minted hashinal', result);`,
    },
    {
      language: 'typescript',
      filename: 'inscribe-and-mint.ts',
      content: `import 'dotenv/config';
import { Buffer } from 'buffer';
import { HCS5Client, inscribe, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const tokenId = required('HTS_TOKEN_ID', process.env.HTS_TOKEN_ID);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-5' });

const hcs5 = new HCS5Client({
  network,
  operatorId,
  operatorKey
});

const metadata = {
  name: 'Hashinal #2',
  description: 'Minted from a standalone HCS-1 inscription',
  image: 'ipfs://bafybeigdyr...',
  attributes: [{ trait_type: 'rarity', value: 'legendary' }]
};

const inscription = await inscribe(
  {
    type: 'buffer',
    buffer: Buffer.from(JSON.stringify(metadata, null, 2)),
    fileName: 'hashinal-metadata.json',
    mimeType: 'application/json'
  },
  { accountId: operatorId, privateKey: operatorKey, network },
  {
    mode: 'file',
    waitForConfirmation: true,
    tags: ['hcs-1', 'hashinal']
  }
);

const metadataTopicId =
  inscription.inscription?.jsonTopicId ||
  inscription.inscription?.topicId ||
  inscription.inscription?.topic_id;

if (!metadataTopicId) {
  throw new Error('Missing HCS-1 topic ID for metadata');
}

const result = await hcs5.mint({
  tokenId,
  metadataTopicId,
  memo: 'mint from HCS-1 metadata'
});

logger.info('Minted from HCS-1 metadata', result);`,
    },
    {
      language: 'typescript',
      filename: 'mint-existing.ts',
      content: `import 'dotenv/config';
import { HCS5Client, Logger } from '@hashgraphonline/standards-sdk';

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
const tokenId = required('HTS_TOKEN_ID', process.env.HTS_TOKEN_ID);
const metadataTopicId = required('HCS1_TOPIC_ID', process.env.HCS1_TOPIC_ID);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-5' });

const hcs5 = new HCS5Client({
  network,
  operatorId,
  operatorKey
});

const result = await hcs5.mint({
  tokenId,
  metadataTopicId,
  supplyKey: process.env.HTS_SUPPLY_KEY
});

logger.info('Minted from existing metadata topic', result);`,
    },
  ],
  resources: [
    { label: "HCS-5 Spec", url: "/docs/standards/hcs-5" },
    { label: "HCS-5 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-5/overview" },
    { label: "HCS-5 SDK API", url: "/docs/libraries/standards-sdk/hcs-5/api" },
    { label: "HCS-5 Transactions", url: "/docs/libraries/standards-sdk/hcs-5/tx" },
    { label: "Inscribe SDK Guide", url: "/docs/libraries/standards-sdk/inscribe" },
    { label: "HCS-1 Spec", url: "/docs/standards/hcs-1" },
  ],
};
