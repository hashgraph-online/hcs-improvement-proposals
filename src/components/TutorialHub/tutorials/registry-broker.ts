import type { Tutorial } from '../types';

export const registryBrokerTutorial: Tutorial = {
  id: "registry-broker",
  title: "The Registry Broker",
  subtitle: "Universal Agent Discovery",
  videoId: "eOX0cVvUDhQ",
  duration: "12:15",
  difficulty: "Intermediate",
  prerequisites: ["Standards SDK", "HCS-11 Profiles"],
  description:
    "The Registry Broker is the discovery and routing layer of the Agentic Internet. In this lab you will wire up RegistryBrokerClient from the Standards SDK, run semantic search, resolve UAIDs, and open multi-protocol chat sessions. You will also authenticate with ledger credentials and register a new HCS-11 agent profile that becomes discoverable across registries.",
  learningPoints: [
    "Configure RegistryBrokerClient with base URL, headers, and API keys",
    "Search the registry with filters and inspect search hits",
    "Resolve UAIDs to routing metadata and endpoints",
    "Create chat sessions and send messages through the broker",
    "Authenticate with ledger credentials for registrations and credits",
    "Register and monitor a new HCS-11 agent profile",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'client.ts',
      content: `import 'dotenv/config';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

export const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
  apiKey: process.env.REGISTRY_BROKER_API_KEY
});`,
    },
    {
      language: 'typescript',
      filename: 'search.ts',
      content: `import { client } from './client';

const results = await client.search({
  q: 'smart contract audit',
  registry: 'hashgraph-online',
  protocols: ['a2a', 'mcp'],
  minTrust: 80,
  limit: 5
});

const [target] = results.hits;
if (!target) {
  throw new Error('No agents found for this query.');
}

console.log(\`Target: \${target.name} (\${target.uaid})\`);`,
    },
    {
      language: 'typescript',
      filename: 'resolve-chat.ts',
      content: `import { client } from './client';

const targetUaid = process.env.TARGET_UAID;
if (!targetUaid) {
  throw new Error('TARGET_UAID is required.');
}

const { agent } = await client.resolveUaid(targetUaid);
const session = await client.chat.createSession({
  uaid: agent.uaid,
  historyTtlSeconds: 3600
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Summarize the latest HCS-14 changes for my team.'
});

console.log(reply.message);`,
    },
    {
      language: 'typescript',
      filename: 'register-agent.ts',
      content: `import { client } from './client';
import {
  AIAgentCapability,
  AIAgentType,
  ProfileType,
  type HCS11Profile
} from '@hashgraphonline/standards-sdk';

const profile: HCS11Profile = {
  version: '1.0',
  type: ProfileType.AI_AGENT,
  display_name: 'Audit Agent',
  alias: 'audit-agent',
  bio: 'Smart contract audit agent registered via the Registry Broker.',
  properties: { tags: ['audit', 'registry-broker', 'hcs-11'] },
  socials: [{ platform: 'github', handle: 'hashgraphonline' }],
  aiAgent: {
    type: AIAgentType.MANUAL,
    model: 'gpt-4o-mini',
    capabilities: [
      AIAgentCapability.SMART_CONTRACT_AUDIT,
      AIAgentCapability.TEXT_GENERATION
    ],
    creator: 'Hashgraph Online'
  }
};

const registration = await client.registerAgent({
  profile,
  communicationProtocol: 'a2a',
  registry: 'hashgraph-online',
  endpoint: 'https://example.com/.well-known/agent.json',
  metadata: { adapter: 'a2a', source: 'tutorial' }
});

if (registration.attemptId) {
  await client.waitForRegistrationCompletion(registration.attemptId, {
    intervalMs: 1000,
    timeoutMs: 60000,
    throwOnFailure: false
  });
}`,
    },
  ],
  resources: [
    {
      label: "Registry Broker Client SDK",
      url: "/docs/libraries/standards-sdk/registry-broker-client",
    },
    { label: "Search API", url: "/docs/registry-broker/search" },
    {
      label: "Multi-Protocol Chat",
      url: "/docs/registry-broker/multi-protocol-chat",
    },
    {
      label: "First Registration Guide",
      url: "/docs/registry-broker/getting-started/first-registration",
    },
    { label: "Ledger Auth & Credits", url: "/docs/registry-broker/ledger-auth-credits" },
  ],
};
