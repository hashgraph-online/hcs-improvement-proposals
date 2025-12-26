import type { Tutorial } from '../types';

export const hcs11ProfilesTutorial: Tutorial = {
  id: "hcs-11-profiles",
  title: "HCS-11 Profiles",
  subtitle: "Account Memos + Metadata",
  videoId: "placeholder_hcs11",
  duration: "Video",
  difficulty: "Intermediate",
  prerequisites: ["HCS-1", "HCS-2", "Standards SDK"],
  description:
    "HCS-11 standardizes profile metadata for accounts, agents, and MCP servers by anchoring immutable profile documents in HCS-1 (or other URIs) and referencing them from account memos. In this lab you will build agent and MCP server profiles, inscribe them with the SDK, update account memos, and resolve profiles back from the network.",
  learningPoints: [
    "Create HCS-11 agent profiles with standardized fields",
    "Inscribe profiles to HCS-1 and update account memos",
    "Publish MCP server profiles with capabilities",
    "Fetch profiles by account ID and read routing metadata",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'create-agent-profile.ts',
      content: `import 'dotenv/config';
import {
  HCS11Client,
  AIAgentType,
  AIAgentCapability,
  Logger
} from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-11' });

const hcs11 = new HCS11Client({
  network,
  auth: { operatorId, privateKey }
});

const profile = hcs11.createAIAgentProfile(
  'Registry Analyst',
  AIAgentType.AUTONOMOUS,
  [
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.KNOWLEDGE_RETRIEVAL,
    AIAgentCapability.API_INTEGRATION
  ],
  'gpt-4.1-mini',
  {
    alias: 'registry-analyst',
    bio: 'Profiles and scores registry entries for HCS-21 adapters.',
    properties: { tags: ['hcs-11', 'registry'] }
  }
);

const result = await hcs11.createAndInscribeProfile(profile, true);

if (!result.success) {
  throw new Error(result.error || 'Profile inscription failed');
}

logger.info('Profile inscribed', {
  profileTopicId: result.profileTopicId,
  transactionId: result.transactionId
});`,
    },
    {
      language: 'typescript',
      filename: 'create-mcp-profile.ts',
      content: `import 'dotenv/config';
import {
  HCS11Client,
  MCPServerCapability,
  VerificationType,
  Logger
} from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-11' });

const hcs11 = new HCS11Client({
  network,
  auth: { operatorId, privateKey }
});

const profile = hcs11.createMCPServerProfile(
  'Hashgraph MCP Gateway',
  {
    version: '2024.10',
    connectionInfo: { url: 'https://mcp.hashgraphonline.com', transport: 'sse' },
    services: [
      MCPServerCapability.RESOURCE_PROVIDER,
      MCPServerCapability.TOOL_PROVIDER,
      MCPServerCapability.API_INTEGRATION
    ],
    description: 'MCP gateway for Hashgraph Online registry and discovery tools.',
    verification: {
      type: VerificationType.DNS,
      value: 'mcp.hashgraphonline.com'
    }
  },
  {
    alias: 'hashgraph-mcp',
    bio: 'Expose registry broker tools to MCP hosts.',
    properties: { tags: ['mcp', 'hcs-11'] }
  }
);

const result = await hcs11.createAndInscribeProfile(profile, true);

if (!result.success) {
  throw new Error(result.error || 'MCP profile inscription failed');
}

logger.info('MCP profile inscribed', {
  profileTopicId: result.profileTopicId,
  transactionId: result.transactionId
});`,
    },
    {
      language: 'typescript',
      filename: 'fetch-profile.ts',
      content: `import 'dotenv/config';
import { HCS11Client, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);
const targetAccountId = required('TARGET_ACCOUNT_ID', process.env.TARGET_ACCOUNT_ID);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-11' });

const hcs11 = new HCS11Client({
  network,
  auth: { operatorId, privateKey }
});

const result = await hcs11.fetchProfileByAccountId(targetAccountId, network);

if (!result.success || !result.profile) {
  throw new Error(result.error || 'Profile not found');
}

logger.info('Fetched profile', {
  uaid: result.profile.uaid,
  inboundTopicId: result.profile.inboundTopicId,
  outboundTopicId: result.profile.outboundTopicId
});`,
    },
  ],
  resources: [
    { label: "HCS-11 Spec", url: "/docs/standards/hcs-11" },
    { label: "HCS-11 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-11/overview" },
    { label: "HCS-11 SDK API", url: "/docs/libraries/standards-sdk/hcs-11/api" },
    { label: "HCS-11 Server Guide", url: "/docs/libraries/standards-sdk/hcs-11/server" },
    { label: "HCS-1 Spec", url: "/docs/standards/hcs-1" },
  ],
};
