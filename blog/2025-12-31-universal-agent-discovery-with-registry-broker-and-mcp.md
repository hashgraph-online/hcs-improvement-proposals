---
slug: universal-agent-discovery-mcp
title: "How to Make Your MCP Server Discoverable with Registry Broker"
description: "Register your Model Context Protocol (MCP) server with Hashgraph Online's Registry Broker to make it discoverable by other agents. Includes TypeScript examples for profile creation, registration, and search."
authors: [hashgraphonline]
tags: [mcp, registry-broker, hcs-10, sdk, ai-agents, typescript]
image: https://hol.org/img/logo.png
keywords: [MCP server, Model Context Protocol, agent discovery, registry broker, Anthropic MCP, AI tools]
---

Model Context Protocol (MCP) standardizes how LLMs access external data. Locally, it's simple: run a server, connect your LLM, and use the tools.

Sharing those tools is the hard part. If you build a useful MCP server, how do others find it?

The Registry Broker indexes MCP servers, making them discoverable to any agent via a standard API.

<!--truncate-->

## Understanding MCP Architecture

MCP serves **tools**, **resources**, and **prompts** via JSON-RPC. Clients (like Claude) connect to use them.

The protocol has two transports:

1. **stdio**: For local servers running as subprocesses
2. **SSE (Server-Sent Events)**: For remote servers accessible over HTTP

For registry purposes, we focus on SSE-based servers since these are the ones that can be discovered and accessed by other clients.

## The Discovery Challenge

You've built an MCP server that queries your PostgreSQL database, generates reports, and provides analytics insights. Currently:

- Only your local Claude Desktop configuration knows about it
- Your team members need to manually copy configuration files
- There's no way for AI agents to dynamically discover your capability
- Metadata about your server's capabilities lives only in your config file

To solve this, you need:

1. **A stable identity**: A Universal Agent ID (UAID) via HCS-14
2. **Capability metadata**: A searchable profile describing what your server does
3. **Discovery indexing**: Your server listed in a global search infrastructure
4. **Endpoint routing**: A way for clients to find and connect to your server

## Prerequisites

Install the standards SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

Set up environment variables for authentication (if registering requires credits):

```bash
# .env
REGISTRY_BROKER_BASE_URL=https://hol.org/registry/api/v1
HEDERA_ACCOUNT_ID=0.0.12345
HEDERA_PRIVATE_KEY=302e...
```

## Step 1: Defining Your MCP Server Profile

The first step is creating a profile that accurately describes your MCP server's capabilities. HCS-11 provides a dedicated `MCP_SERVER` profile type with specific fields for MCP metadata:

```typescript
import { 
  RegistryBrokerClient, 
  ProfileType,
  MCPServerCapability,
  type AgentRegistrationRequest 
} from '@hashgraphonline/standards-sdk';

// Define the profile for your MCP server
const mcpProfile = {
  version: '1.0',
  type: ProfileType.MCP_SERVER,
  display_name: 'Postgres Analytics Server',
  alias: 'pg-analytics',
  bio: 'Provides read-only analytics queries and dashboards over PostgreSQL databases. Supports complex aggregations, time-series analysis, and report generation.',
  properties: {
    tags: ['database', 'analytics', 'postgresql', 'reporting'],
  },
  socials: [
    { platform: 'github', handle: 'myorg/pg-analytics-mcp' },
  ],
  mcpServer: {
    version: '2024.10',
    description: 'PostgreSQL analytics and reporting MCP server',
    connectionInfo: {
      url: 'https://mcp.my-org.com/pg-analytics/sse',
      transport: 'sse' as const,
    },
    services: [
      MCPServerCapability.TOOL_PROVIDER,
      MCPServerCapability.RESOURCE_PROVIDER,
      MCPServerCapability.DATABASE_INTEGRATION,
    ],
    maintainer: 'Data Engineering Team',
    repository: 'https://github.com/myorg/pg-analytics-mcp',
    docs: 'https://docs.my-org.com/mcp/pg-analytics',
    tools: [
      { name: 'run_query', description: 'Execute a read-only SQL query' },
      { name: 'get_schema', description: 'Retrieve table schema information' },
      { name: 'generate_report', description: 'Create an analytics report' },
    ],
    resources: [
      { name: 'tables', description: 'List of available database tables' },
      { name: 'recent_queries', description: 'History of recent queries' },
    ],
  },
};
```

The `mcpServer` object is crucial—it contains MCP-specific metadata including:

- **connectionInfo**: The URL and transport method for connecting
- **services**: Capability flags indicating what your server provides
- **tools**: The tools your server exposes (matches your MCP manifest)
- **resources**: Resources available through your server

This structured data enables semantic search and filtering. Clients looking for database tools can filter by `MCPServerCapability.DATABASE_INTEGRATION`.

## Step 2: Registering with the Registry Broker

With your profile defined, register it with the global registry:

```typescript
const client = new RegistryBrokerClient({ 
  baseUrl: process.env.REGISTRY_BROKER_BASE_URL 
    ?? 'https://hol.org/registry/api/v1' 
});

const registrationPayload: AgentRegistrationRequest = {
  profile: mcpProfile,
  communicationProtocol: 'mcp',
  registry: 'hashgraph-online',
  metadata: {
    provider: 'aws-fargate',
    region: 'us-east-1',
    version: '1.2.0',
  },
};

async function registerMcpServer(): Promise<string> {
  console.log('Registering MCP server with Registry Broker...');
  
  const response = await client.registerAgent(registrationPayload);
  
  console.log('Registration successful!');
  console.log(`  UAID: ${response.uaid}`);
  console.log(`  Status: ${response.status}`);
  
  // If registration is asynchronous, wait for completion
  if (response.attemptId) {
    const progress = await client.waitForRegistrationCompletion(
      response.attemptId,
      { intervalMs: 2000, timeoutMs: 60000 }
    );
    console.log(`  Final status: ${progress.status}`);
  }
  
  return response.uaid!;
}

const myServerUaid = await registerMcpServer();
console.log(`Your MCP server is now discoverable at: ${myServerUaid}`);
```

After registration, your server receives a Universal Agent ID (UAID) that uniquely identifies it across all registries. This UAID can be shared, bookmarked, and used to reference your server in configurations.

## Step 3: Making Your Server Discoverable

Once registered, your MCP server appears in the global search index. Other agents and developers can find it:

```typescript
async function discoverMcpServers(): Promise<void> {
  // Search for MCP servers with database capabilities
  const results = await client.search({
    type: 'mcp-servers',
    q: 'database analytics postgresql',
    protocols: ['mcp'],
    limit: 10,
  });

  console.log(`Found ${results.total} MCP servers matching criteria:`);
  
  for (const server of results.hits) {
    console.log(`\n${server.name}`);
    console.log(`  UAID: ${server.uaid}`);
    console.log(`  Bio: ${server.profile?.bio ?? 'No description'}`);
    
    // Access MCP-specific metadata
    const mcpInfo = server.profile?.mcpServer;
    if (mcpInfo) {
      console.log(`  Transport: ${mcpInfo.connectionInfo?.transport}`);
      console.log(`  URL: ${mcpInfo.connectionInfo?.url}`);
      console.log(`  Tools: ${mcpInfo.tools?.map(t => t.name).join(', ')}`);
    }
  }
}
```

## Step 4: Advanced Search with Filtering

The search API supports sophisticated filtering to find exactly the right MCP server:

```typescript
// Find verified MCP servers with specific capabilities
const databaseServers = await client.search({
  type: 'mcp-servers',
  capabilities: ['DATABASE_INTEGRATION', 'TOOL_PROVIDER'],
  verified: true,
  sortBy: 'relevance',
  limit: 20,
});

// Search within a specific registry namespace
const namespaceResults = await client.registrySearchByNamespace(
  'hashgraph-online',
  'analytics'
);

// Get available search facets to understand what's indexed
const facets = await client.facets();
console.log('Available protocols:', facets.protocols);
console.log('Available registries:', facets.registries);
```

## Step 5: Dynamic MCP Client Configuration

With discovery working, you can build systems that dynamically configure MCP clients:

```typescript
interface MCPClientConfig {
  name: string;
  url: string;
  transport: 'sse' | 'stdio';
}

async function buildDynamicMcpConfig(
  query: string
): Promise<MCPClientConfig[]> {
  const servers = await client.search({
    type: 'mcp-servers',
    q: query,
    limit: 5,
  });

  return servers.hits
    .filter(s => s.profile?.mcpServer?.connectionInfo?.transport === 'sse')
    .map(server => ({
      name: server.profile?.alias ?? server.name,
      url: server.profile?.mcpServer?.connectionInfo?.url ?? '',
      transport: 'sse' as const,
    }))
    .filter(config => config.url.length > 0);
}

// Usage: Dynamically build MCP config for an AI assistant
const analyticsTools = await buildDynamicMcpConfig('analytics reporting');
console.log('Discovered MCP servers:', analyticsTools);
```

## Security Considerations

When publishing MCP servers for public discovery:

1. **Authentication**: Consider requiring authentication for sensitive operations
2. **Rate limiting**: Protect your server from abuse
3. **Read-only by default**: The example server provides read-only database access
4. **Audit logging**: Log all queries for compliance and debugging
5. **Endpoint security**: Use HTTPS and consider adding authentication headers

## Updating Your Registration

Server capabilities change over time. Update your registration when you:

- Add new tools or resources
- Change the endpoint URL
- Update capability descriptions

```typescript
async function updateMcpServer(uaid: string): Promise<void> {
  // Fetch current registration
  const current = await client.resolveUaid(uaid);
  
  // Modify the profile
  const updatedProfile = {
    ...current.agent.profile,
    bio: 'Updated: Now supports time-series analysis and forecasting',
    mcpServer: {
      ...current.agent.profile?.mcpServer,
      tools: [
        ...(current.agent.profile?.mcpServer?.tools ?? []),
        { name: 'forecast', description: 'Generate time-series forecasts' },
      ],
    },
  };

  await client.updateAgent(uaid, {
    ...registrationPayload,
    profile: updatedProfile,
  });
  
  console.log('MCP server registration updated');
}
```

## From Local to Global

Registry Broker transforms MCP from a local configuration into a discoverable network resource. By separating identity (UAID) from location (endpoint URL), we enable:

- **Dynamic tool discovery**: Agents find capabilities at runtime
- **Team sharing**: Publish internal tools for your organization
- **Public contribution**: Make your MCP servers available to the wider ecosystem
- **Failover**: Update endpoints without breaking references

Your MCP server becomes a discoverable node that any agent can find and use.
