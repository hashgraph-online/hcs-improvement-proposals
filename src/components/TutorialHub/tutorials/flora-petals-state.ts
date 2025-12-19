import type { Tutorial } from '../types';

export const floraPetalsStateTutorial: Tutorial = {
  id: "flora-petals-state",
  title: "Floras, Petals, and State Hashes",
  subtitle: "Collective Agents on Hedera",
  videoId: "HTS6d4AKdTE",
  duration: "Video",
  difficulty: "Advanced",
  prerequisites: ["HCS-15", "HCS-16", "HCS-18"],
  description:
    "Floras are multi-member agents that coordinate consensus-driven actions on Hedera. Petals are individual members (HCS-15) that combine into a Flora account (HCS-16), while state hashes provide a verifiable snapshot of shared context. This lab walks through creating Petal accounts, forming a Flora with communication/transaction/state topics, and publishing a state hash update that can be audited by the network.",
  learningPoints: [
    "Create Petal accounts with shared ECDSA keys",
    "Create a Flora account with threshold keys",
    "Provision communication, transaction, and state topics",
    "Publish flora_created and state_update messages",
    "Read state hashes back from Mirror Node",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'petals.ts',
      content: `import 'dotenv/config';
import { HCS15Client } from '@hashgraphonline/standards-sdk';

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

const hcs15 = new HCS15Client({
  network: 'testnet',
  operatorId,
  operatorKey
});

const base = await hcs15.createBaseAccount({
  initialBalance: 5,
  accountMemo: 'Flora Base'
});

const petal = await hcs15.createPetalAccount({
  basePrivateKey: base.privateKey,
  initialBalance: 1,
  accountMemo: 'Flora Petal'
});

console.log({
  baseAccountId: base.accountId,
  petalAccountId: petal.accountId
});`,
    },
    {
      language: 'typescript',
      filename: 'flora-topics.ts',
      content: `import 'dotenv/config';
import { KeyList, PrivateKey } from '@hashgraph/sdk';
import { HCS16Client, FloraTopicType } from '@hashgraphonline/standards-sdk';

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

const hcs16 = new HCS16Client({
  network: 'testnet',
  operatorId,
  operatorKey
});

const keys = [
  PrivateKey.generateECDSA(),
  PrivateKey.generateECDSA(),
  PrivateKey.generateECDSA()
];
const keyList = new KeyList(keys.map(key => key.publicKey), 2);

const { accountId: floraAccountId } = await hcs16.createFloraAccount({
  keyList,
  initialBalanceHbar: 2
});

const communication = await hcs16.createFloraTopic({
  floraAccountId,
  topicType: FloraTopicType.COMMUNICATION
});
const transaction = await hcs16.createFloraTopic({
  floraAccountId,
  topicType: FloraTopicType.TRANSACTION
});
const state = await hcs16.createFloraTopic({
  floraAccountId,
  topicType: FloraTopicType.STATE
});

console.log({ floraAccountId, communication, transaction, state });`,
    },
    {
      language: 'typescript',
      filename: 'state-hash.ts',
      content: `import 'dotenv/config';
import { createHash } from 'crypto';
import {
  HCS16Client,
  HCS16BaseClient
} from '@hashgraphonline/standards-sdk';

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
const floraAccountId = required('FLORA_ACCOUNT_ID', process.env.FLORA_ACCOUNT_ID);
const commTopicId = required(
  'FLORA_COMM_TOPIC_ID',
  process.env.FLORA_COMM_TOPIC_ID
);
const txTopicId = required('FLORA_TX_TOPIC_ID', process.env.FLORA_TX_TOPIC_ID);
const stateTopicId = required(
  'FLORA_STATE_TOPIC_ID',
  process.env.FLORA_STATE_TOPIC_ID
);

const hcs16 = new HCS16Client({
  network: 'testnet',
  operatorId,
  operatorKey
});

await hcs16.sendFloraCreated({
  topicId: commTopicId,
  operatorId: \`\${operatorId}@\${floraAccountId}\`,
  floraAccountId,
  topics: {
    communication: commTopicId,
    transaction: txTopicId,
    state: stateTopicId
  }
});

const payload = { members: ['petal-a', 'petal-b'], epoch: Date.now() };
const hash = createHash('sha256')
  .update(JSON.stringify(payload))
  .digest('hex');

await hcs16.sendStateUpdate({
  topicId: stateTopicId,
  operatorId: \`\${operatorId}@\${floraAccountId}\`,
  hash: \`0x\${hash}\`
});

const base = new HCS16BaseClient({ network: 'testnet' });
const latest = await base.getRecentMessages(stateTopicId, {
  limit: 1,
  order: 'desc'
});

console.log(latest[0]?.message);`,
    },
  ],
  resources: [
    { label: "HCS-15 Spec", url: "/docs/standards/hcs-15" },
    { label: "HCS-16 Spec", url: "/docs/standards/hcs-16" },
    { label: "HCS-18 Spec", url: "/docs/standards/hcs-18" },
    { label: "HCS-15 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-15/overview" },
    { label: "HCS-16 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-16/overview" },
  ],
};
