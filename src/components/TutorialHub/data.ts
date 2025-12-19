
import React from 'react';
import { FaCode } from 'react-icons/fa';

export interface Tutorial {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoId: string;
  prerequisites: string[];
  description: string;
  code: {
    language: string;
    filename: string;
    content: string;
  }[]; // Changed to array to support multiple snippets if needed, though waterfall usually shows one main lab
  resources: {
    label: string;
    url: string;
  }[];
  learningPoints: string[];
}

export const tutorials: Tutorial[] = [
  {
    id: "registry-broker",
    title: "The Registry Broker",
    subtitle: "Universal Agent Discovery",
    videoId: "eOX0cVvUDhQ",
    duration: "12:15",
    difficulty: "Intermediate",
    prerequisites: ["Standards SDK"],
    description: "The Registry Broker is the central nervous system of the Agentic Internet. It allows agents to discover each other, verify identities, and establish secure communication channels across different protocols (Virtuals, NANDA, MCP). In this tutorial, we'll build a search client and initiate a handshake.",
    learningPoints: [
      "Initialize the RegistryBrokerClient with your API Key",
      "Perform semantic search to find 'audit' or 'defi' agents",
      "Resolve Universal Agent IDs (UAIDs) to endpoints",
      "Initiate a multi-protocol handshake"
    ],
    code: [
      {
        language: 'bash',
        filename: 'installation',
        content: `npm install @hashgraphonline/standards-sdk
# added 1 package in 2s`
      },
      {
        language: 'typescript',
        filename: 'find-agents.ts',
        content: `import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

// 1. Initialize the client
const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY
});

// 2. Search for agents (Semantic Search)
const results = await client.search({
  q: 'smart contract audit',
  minTrust: 80, // Minimum trust score
  limit: 5
});

console.log(\`Found \${results.total} agents matching query\`);

// 3. Resolve an agent specific details
const agent = results.agents[0];
console.log(\`Connecting to: \${agent.name} (\${agent.uaid})\`);`
      }
    ],
    resources: [
      { label: "Client SDK Reference", url: "/docs/libraries/standards-sdk/registry-broker-client" },
      { label: "Search API", url: "/docs/registry-broker/search" },
      { label: "Multi-Protocol Chat", url: "/docs/registry-broker/multi-protocol-chat" }
    ]
  },
  {
    id: "hcs-20-points",
    title: "HCS-20 Points",
    subtitle: "DeFi Loyalty Programs",
    videoId: "placeholder_id_1",
    duration: "Coming Soon",
    difficulty: "Advanced",
    prerequisites: [],
    description: "Learn how to implement HCS-20 for on-chain loyalty points. This standard enables auditable, high-throughput points systems that can be used for DeFi rewards, gaming loyalty, and more.",
    learningPoints: [],
    code: [], // Coming soon
    resources: []
  },
  {
    id: "openconvai",
    title: "OpenConvAI",
    subtitle: "Standardized Agent Comms",
    videoId: "placeholder_id_2",
    duration: "Coming Soon",
    difficulty: "Advanced",
    prerequisites: [],
    description: "Bridge distinct agent frameworks using the OpenConvAI standard. Learn how to standardize context, memory, and tool execution across different AI agent architectures.",
    learningPoints: [],
    code: [], // Coming soon
    resources: []
  }
];
