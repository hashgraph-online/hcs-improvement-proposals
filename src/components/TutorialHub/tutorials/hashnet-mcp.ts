import type { Tutorial } from '../types';

export const hashnetMcpTutorial: Tutorial = {
  id: "hashnet-mcp",
  title: "Hashnet MCP Server",
  subtitle: "AI Model Context Protocol",
  videoId: "placeholder_mcp",
  duration: "10:00",
  difficulty: "Advanced",
  prerequisites: ["Registry Broker", "HCS-11 Profiles"],
  description:
    "Hashnet MCP Servers expose Hashgraph Online discovery and chat tools to MCP-compatible IDEs. You will build an HCS-11 MCP profile with the Standards SDK, register it in the Registry Broker, and query MCP servers using typed search filters.",
  learningPoints: [
    "Create an MCP server profile with HCS-11 helpers",
    "Register MCP servers through the Registry Broker client",
    "Search MCP servers using Registry Broker filters",
    "Document MCP capabilities, resources, and tools",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'mcp-profile.ts',
      content: `import 'dotenv/config';
import {
  HCS11Client,
  MCPServerCapability
} from '@hashgraphonline/standards-sdk';

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

export const profile = hcs11.createMCPServerProfile(
  'Hashnet MCP',
  {
    version: '2024.10',
    description: 'Hashgraph Online MCP gateway',
    connectionInfo: {
      url: 'https://mcp.hashgraphonline.com',
      transport: 'sse'
    },
    services: [
      MCPServerCapability.RESOURCE_PROVIDER,
      MCPServerCapability.TOOL_PROVIDER,
      MCPServerCapability.API_INTEGRATION
    ],
    docs: 'https://hol.org/registry'
  },
  {
    alias: 'hashnet-mcp',
    bio: 'Expose registry broker tools to MCP hosts.',
    properties: { tags: ['mcp', 'hashnet'] }
  }
);`,
    },
    {
      language: 'typescript',
      filename: 'register-mcp.ts',
      content: `import 'dotenv/config';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import { profile } from './mcp-profile';

const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
  apiKey: process.env.REGISTRY_BROKER_API_KEY
});

const response = await client.registerAgent({
  profile,
  communicationProtocol: 'mcp',
  registry: 'hashgraph-online',
  metadata: { provider: 'hashnet-mcp' }
});

console.log(response.uaid);`,
    },
    {
      language: 'typescript',
      filename: 'search-mcp.ts',
      content: `import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1'
});

const results = await client.search({
  q: 'hashnet',
  type: 'mcp-servers',
  protocols: ['mcp'],
  limit: 5
});

console.log(results.hits.map(hit => hit.uaid));`,
    },
  ],
  resources: [
    { label: "Registry Broker MCP Server", url: "/docs/registry-broker/mcp-server" },
    { label: "HCS-11 SDK API", url: "/docs/libraries/standards-sdk/hcs-11/api" },
    { label: "Registry Broker Client", url: "/docs/libraries/standards-sdk/registry-broker-client" },
    { label: "Registry Broker Search", url: "/docs/registry-broker/search" },
    { label: "Official MCP Site", url: "https://modelcontextprotocol.io" },
  ],
};
