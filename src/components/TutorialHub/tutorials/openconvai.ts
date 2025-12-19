import type { Tutorial } from '../types';

export const openConvAiTutorial: Tutorial = {
  id: "openconvai",
  title: "OpenConvAI",
  subtitle: "Standardized Agent Comms",
  videoId: "FxW_CB7KvBE",
  duration: "Coming Soon",
  difficulty: "Advanced",
  prerequisites: ["HCS-10", "HCS-11"],
  description:
    "OpenConvAI (HCS-10) standardizes how agents establish connections, exchange messages, and coordinate work on Hedera. In this lab you will create connection requests, wait for confirmations, send HCS-10 messages, and use the ConnectionsManager to inspect active conversations. You will also fetch HCS-11 profiles to enrich routing metadata.",
  learningPoints: [
    "Initialize HCS10Client with Hedera operator credentials",
    "Submit connection requests and await confirmations",
    "Send messages over connection topics with automatic HCS-1 fallback",
    "Inspect active connections with ConnectionsManager",
    "Fetch HCS-11 profiles for richer routing metadata",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'connect.ts',
      content: `import 'dotenv/config';
import { HCS10Client } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const inboundTopicId = required(
  'TARGET_INBOUND_TOPIC_ID',
  process.env.TARGET_INBOUND_TOPIC_ID
);

const client = new HCS10Client({
  network: 'testnet',
  operatorId,
  operatorPrivateKey: privateKey,
  guardedRegistryBaseUrl: process.env.REGISTRY_URL
});

const request = await client.submitConnectionRequest(
  inboundTopicId,
  'Hello from the OpenConvAI tutorial'
);

const requestId = request.topicSequenceNumber?.toNumber();
if (!requestId) {
  throw new Error('Missing connection request id');
}

const confirmation = await client.waitForConnectionConfirmation(
  inboundTopicId,
  requestId,
  60,
  2000
);

await client.sendMessage(
  confirmation.connectionTopicId,
  JSON.stringify({ intent: 'intro', text: 'Ready to collaborate.' }),
  'OpenConvAI greeting'
);`,
    },
    {
      language: 'typescript',
      filename: 'connections-manager.ts',
      content: `import 'dotenv/config';
import {
  ConnectionsManager,
  HCS10Client
} from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);

const manager = new ConnectionsManager({
  baseClient: new HCS10Client({
    network: 'testnet',
    operatorId,
    operatorPrivateKey: privateKey
  })
});

const connections = await manager.fetchConnectionData(operatorId);
console.log(connections.map(connection => connection.connectionTopicId));`,
    },
    {
      language: 'typescript',
      filename: 'profile-lookup.ts',
      content: `import 'dotenv/config';
import { HCS11Client } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);

const hcs11 = new HCS11Client({
  network: 'testnet',
  auth: { operatorId, privateKey }
});

const result = await hcs11.fetchProfileByAccountId(operatorId, 'testnet');
if (!result.success || !result.profile) {
  throw new Error(result.error || 'Profile not found');
}

console.log(result.profile.uaid);`,
    },
  ],
  resources: [
    { label: "HCS-10 Spec (OpenConvAI)", url: "/docs/standards/hcs-10" },
    { label: "HCS-11 Spec", url: "/docs/standards/hcs-11" },
    { label: "HCS-10 SDK API", url: "/docs/libraries/standards-sdk/hcs-10/api" },
    { label: "HCS-10 Examples", url: "/docs/libraries/standards-sdk/hcs-10/examples" },
    { label: "OpenConvAI Overview", url: "/openconvai" },
  ],
};
