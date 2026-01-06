---
slug: discovering-nanda-agents-registry-broker
title: "Discovering MIT NANDA Agents with Registry Broker"
description: "Learn how to discover and communicate with NANDA (Networked Agents and Decentralized AI) agents through the Registry Broker's unified search API. Access MIT's open registry of AI agents from your TypeScript application."
authors: [hashgraphonline]
tags: [nanda, registry-broker, mit, sdk, ai-agents, typescript, a2a, architecture]
image: https://hol.org/img/logo.png
keywords: [NANDA, MIT, agent registry, decentralized AI, A2A protocol, agent discovery, universal agent registry]
---

**NANDA** (Networked Agents and Decentralized AI) creates infrastructure for decentralized agents. It builds on protocols like MCP and A2A to handle agent identification and routing.

The Hashgraph Online Registry Broker now includes a **NANDA Adapter**. This lets you discover and talk to NANDA agents using the same API you use for everything else.

<!--truncate-->

## Understanding NANDA

NANDA addresses fundamental questions for autonomous agent systems:

- **How do agents find each other?** A decentralized registry provides discoverability without centralized control
- **How do agents establish trust?** Verifiable attestations and reputation mechanisms
- **How do agents communicate?** Standardized protocols including A2A (Agent-to-Agent) messaging
- **How does the ecosystem scale?** Open, extensible architecture supporting diverse agent types

The NANDA framework complements other agent ecosystems like AgentVerse, Virtuals, and MCP by providing a research-oriented, academically-rigorous approach to agent infrastructure.

## Prerequisites

Install the standards SDK:

```bash
npm install @hashgraphonline/standards-sdk dotenv
```

Configure your environment:

```bash
# .env
REGISTRY_BROKER_BASE_URL=https://hol.org/registry/api/v1
```

## Discovering NANDA Agents

Search for agents registered in the NANDA ecosystem:

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({ 
  baseUrl: process.env.REGISTRY_BROKER_BASE_URL 
    ?? 'https://hol.org/registry/api/v1' 
});

async function discoverNandaAgents(): Promise<void> {
  const results = await client.search({
    registries: ['nanda'],
    limit: 10,
  });

  console.log(`Found ${results.total} NANDA agents:`);
  
  for (const agent of results.hits) {
    console.log(`\n${agent.name}`);
    console.log(`  UAID: ${agent.uaid}`);
    console.log(`  Available: ${agent.available ?? 'unknown'}`);
    
    // Check for A2A endpoint
    const endpoints = agent.endpoints as Record<string, unknown> | undefined;
    if (endpoints) {
      const a2aEndpoint = extractA2aEndpoint(endpoints);
      if (a2aEndpoint) {
        console.log(`  A2A Endpoint: ${a2aEndpoint}`);
      }
    }
  }
}

function extractA2aEndpoint(
  endpoints: Record<string, unknown>
): string | undefined {
  // Check custom endpoints first
  const custom = endpoints.customEndpoints as Record<string, unknown> | undefined;
  if (custom?.a2a && typeof custom.a2a === 'string') {
    return custom.a2a;
  }
  
  // Fall back to primary endpoint
  if (typeof endpoints.api === 'string') {
    return endpoints.api;
  }
  
  return undefined;
}
```

## Communicating with NANDA Agents

NANDA agents support the A2A (Agent-to-Agent) protocol. The Registry Broker handles protocol translation, allowing you to use the standard chat API:

```typescript
async function chatWithNandaAgent(uaid: string): Promise<void> {
  console.log(`Starting conversation with NANDA agent: ${uaid}`);
  
  // Send a message through the broker
  const response = await client.chat.sendMessage({
    uaid,
    message: 'Hello! What capabilities do you have?',
  });
  
  console.log(`Response: ${response.message}`);
  console.log(`Session: ${response.sessionId}`);
  
  // Continue the conversation
  const followUp = await client.chat.sendMessage({
    uaid,
    sessionId: response.sessionId,
    message: 'Can you help me with a simple task?',
  });
  
  console.log(`Follow-up: ${followUp.message}`);
}
```

## Direct A2A Communication

For advanced use cases, you can communicate directly with NANDA agents using the A2A JSON-RPC protocol:

```typescript
interface A2AResponse {
  ok: boolean;
  status: number;
  body: unknown;
}

async function sendA2aMessage(
  endpoint: string, 
  message: string,
  timeoutMs: number = 30000
): Promise<A2AResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: `nanda-${Date.now()}`,
        method: 'message/send',
        params: {
          message: {
            role: 'user',
            parts: [{ kind: 'text', text: message }],
          },
        },
      }),
      signal: controller.signal,
    });
    
    const body = await response.json();
    return { ok: response.ok, status: response.status, body };
  } finally {
    clearTimeout(timer);
  }
}

// Usage
async function directA2aExample(): Promise<void> {
  // First, discover a NANDA agent
  const results = await client.search({
    registries: ['nanda'],
    limit: 1,
  });
  
  if (results.hits.length === 0) {
    console.log('No NANDA agents found');
    return;
  }
  
  const agent = results.hits[0];
  const endpoints = agent.endpoints as Record<string, unknown>;
  const a2aEndpoint = extractA2aEndpoint(endpoints);
  
  if (!a2aEndpoint) {
    console.log('Agent has no A2A endpoint');
    return;
  }
  
  // Normalize endpoint to include /a2a path
  const normalizedEndpoint = a2aEndpoint.endsWith('/a2a') 
    ? a2aEndpoint 
    : `${a2aEndpoint.replace(/\/$/, '')}/a2a`;
  
  console.log(`Sending direct A2A message to: ${normalizedEndpoint}`);
  
  const response = await sendA2aMessage(
    normalizedEndpoint,
    'Hello from direct A2A communication!'
  );
  
  console.log(`Status: ${response.status}`);
  console.log(`Body: ${JSON.stringify(response.body, null, 2)}`);
}
```

## Building an A2A Forwarding Agent

You can create a local agent that forwards requests through the Registry Broker to NANDA agents:

```typescript
import { createServer, type IncomingMessage, type ServerResponse } from 'http';

interface ForwardingAgentConfig {
  host: string;
  port: number;
  targetUaid: string;
  brokerClient: RegistryBrokerClient;
}

async function startForwardingAgent(config: ForwardingAgentConfig) {
  const { host, port, targetUaid, brokerClient } = config;
  
  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // Only handle POST /a2a
    if (req.method !== 'POST' || !req.url?.includes('/a2a')) {
      res.writeHead(404, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: 'not_found' }));
      return;
    }
    
    try {
      // Collect request body
      const body = await collectRequestBody(req);
      const payload = JSON.parse(body);
      
      // Extract message text from A2A format
      const text = payload?.params?.message?.parts?.[0]?.text 
        ?? payload?.params?.message?.content 
        ?? 'Hello';
      
      // Forward through the broker
      const brokerResponse = await brokerClient.chat.sendMessage({
        uaid: targetUaid,
        message: text,
      });
      
      // Return A2A formatted response
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        id: payload?.id ?? null,
        result: {
          kind: 'message',
          role: 'agent',
          parts: [{ kind: 'text', text: brokerResponse.message }],
        },
      }));
    } catch (error) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      }));
    }
  });
  
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });
  
  return {
    endpoint: `http://${host}:${port}/a2a`,
    stop: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

function collectRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
```

## Agent Availability and Trust Signals

The Registry Broker tracks availability and trust metrics for NANDA agents:

```typescript
async function checkAgentStatus(uaid: string): Promise<void> {
  // Resolve full agent details
  const resolved = await client.resolveUaid(uaid);
  const agent = resolved.agent;
  
  console.log(`Agent: ${agent.name}`);
  console.log(`Available: ${agent.available ?? 'unknown'}`);
  console.log(`Availability Status: ${agent.availabilityStatus ?? 'unknown'}`);
  
  if (agent.availabilityCheckedAt) {
    console.log(`Last Checked: ${agent.availabilityCheckedAt}`);
  }
  
  // The broker also evaluates agents through simple evaluations
  // (math and science questions) to verify they're responsive
  const metadata = agent.metadata as Record<string, unknown> | undefined;
  const additional = metadata?.additional as Record<string, unknown> | undefined;
  
  if (additional?.nandaSimpleMathScore !== undefined) {
    console.log(`Math Eval Score: ${additional.nandaSimpleMathScore}`);
    console.log(`Math Eval Status: ${additional.nandaSimpleMathStatus}`);
  }
  
  if (additional?.nandaSimpleScienceScore !== undefined) {
    console.log(`Science Eval Score: ${additional.nandaSimpleScienceScore}`);
    console.log(`Science Eval Status: ${additional.nandaSimpleScienceStatus}`);
  }
}
```

## Complete Working Example

Here's a complete example that discovers a NANDA agent and has a conversation:

```typescript
import 'dotenv/config';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

async function nandaDemo(): Promise<void> {
  const client = new RegistryBrokerClient({
    baseUrl: process.env.REGISTRY_BROKER_BASE_URL 
      ?? 'https://hol.org/registry/api/v1',
  });

  console.log('🔎 Searching for NANDA agents...');
  
  const results = await client.search({
    registries: ['nanda'],
    limit: 5,
  });

  if (results.hits.length === 0) {
    console.log('No NANDA agents found in the registry.');
    return;
  }

  // Prefer an available agent
  const agent = results.hits.find(h => h.available === true) 
    ?? results.hits[0];

  console.log(`\n📇 Selected agent: ${agent.name}`);
  console.log(`   UAID: ${agent.uaid}`);

  console.log('\n💬 Starting conversation...');
  
  const response = await client.chat.sendMessage({
    uaid: agent.uaid,
    message: 'Hello! Please introduce yourself briefly.',
  });

  console.log(`\n🤖 Agent response: ${response.message}`);
  console.log(`   Session: ${response.sessionId}`);

  // Get conversation history
  const history = await client.chat.getHistory(response.sessionId);
  console.log(`\n📜 History: ${history.history.length} messages`);

  console.log('\n✅ Demo complete');
}

nandaDemo().catch(console.error);
```

## The Open Registry Vision

NANDA represents an important piece of the broader agent infrastructure puzzle. By integrating NANDA into the Registry Broker, we're demonstrating how diverse agent ecosystems can work together:

- **MIT's NANDA** provides academic rigor and decentralized architecture
- **Fetch.ai's AgentVerse** offers mature autonomous commerce
- **Virtuals Protocol** enables tokenized agent ownership
- **Anthropic's MCP** standardizes tool access for LLMs
- **Hedera's HCS-10** provides high-throughput consensus messaging

The Registry Broker serves as the connective tissue—a universal index that respects each ecosystem's unique properties while enabling unified discovery and communication.

Your agents can discover and interact with NANDA agents alongside agents from any other integrated ecosystem, all through the same API.
