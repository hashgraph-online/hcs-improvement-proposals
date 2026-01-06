---
slug: bridging-agentverse-communication
title: "How to Connect AgentVerse Agents to Your Application Using HCS-10"
description: "Learn how to use the Registry Broker and HCS-14 Universal Agent IDs to communicate with Fetch.ai AgentVerse agents from any TypeScript application. Step-by-step tutorial with working code examples."
authors: [hashgraphonline]
tags: [agents, registry-broker, hcs-14, sdk, ai-agents, typescript, fetch-ai]
image: https://hol.org/img/logo.png
keywords: [agentverse, fetch.ai, agent communication, HCS-10, registry broker, AI agents, typescript sdk, uagents]
---

Fetch.ai's AgentVerse offers a mature platform for autonomous commerce, while Hedera's HCS-10 provides high-throughput consensus. When you need these ecosystems to work together, you need a common addressing layer.

The **Registry Broker** solves this with **HCS-14 Universal Agent IDs (UAIDs)**, allowing you to treat an AgentVerse agent like any other endpoint in your application.

<!--truncate-->

## Understanding the AgentVerse Ecosystem

Before integrating, it helps to understand the components:

**AgentVerse** is Fetch.ai's hosted platform for deploying and discovering uAgents. The underlying **uAgents framework** is an open-source Python library (available on [GitHub](https://github.com/fetchai/uAgents)) that enables developers to build autonomous AI agents. These agents communicate using the **Exchange Protocol**—a standardized, JSON-based message format that uses "envelopes" to encapsulate messages and metadata.

The Exchange Protocol defines a common structure for agent-to-agent communication, including fields for sender, target, protocol, payload, and cryptographic signature. This standardization enables interoperability within the Fetch.ai ecosystem but creates a barrier for agents built on other platforms.

## The Universal Agent ID Solution

HCS-14 Universal Agent IDs (UAIDs) solve the cross-protocol addressing problem by providing a single identifier format that can reference agents across any registry:

```
uaid:aid:agentverse-adapter;uid=flight-tracker;registry=agentverse;proto=agentverse;nativeId=agent1qvlttvjcz...
```

A UAID encodes:
- **The registry**: Which platform hosts the agent (AgentVerse, OpenRouter, local, etc.)
- **The protocol**: How to communicate with the agent (Exchange Protocol, A2A, MCP, etc.)
- **The native ID**: The agent's identifier within its home ecosystem
- **Optional parameters**: Additional routing or identification information

The Registry Broker consumes these UAIDs and handles all the protocol translation internally, so your application code remains simple.

## Prerequisites

Install the required packages:

```bash
npm install @hashgraphonline/standards-sdk dotenv
```

Set up your environment variables:

```bash
# .env
REGISTRY_BROKER_BASE_URL=https://hol.org/registry/api/v1

# Optional: For ledger-authenticated operations
HEDERA_ACCOUNT_ID=0.0.12345
HEDERA_PRIVATE_KEY=302e...
```

## Step 1: Initialize the Registry Broker Client

The `RegistryBrokerClient` is your gateway to the entire agent ecosystem:

```typescript
import 'dotenv/config';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_BASE_URL 
    ?? 'https://hol.org/registry/api/v1',
});

console.log('Registry Broker client initialized');
```

## Step 2: Discover AgentVerse Agents

You can search for AgentVerse agents using the Registry Broker's search API:

```typescript
async function discoverAgentVerseAgents(): Promise<void> {
  // Search specifically within the AgentVerse registry
  const results = await client.search({
    registries: ['agentverse'],
    q: 'flight tracking',
    limit: 5,
  });

  console.log(`Found ${results.hits.length} AgentVerse agents:`);
  
  for (const hit of results.hits) {
    console.log(`  Name: ${hit.name}`);
    console.log(`  UAID: ${hit.uaid}`);
    console.log(`  Registry: ${hit.registry}`);
    console.log('---');
  }
}
```

The search API returns agents from all indexed registries by default, but you can filter to specific ecosystems using the `registries` parameter.

## Step 3: Resolve and Validate Agent Information

Before communicating with an agent, you can resolve its UAID to get full details:

```typescript
async function resolveAgentDetails(uaid: string): Promise<void> {
  const resolved = await client.resolveUaid(uaid);
  
  console.log('Agent resolved successfully:');
  console.log(`  Display Name: ${resolved.agent.profile?.display_name}`);
  console.log(`  Bio: ${resolved.agent.profile?.bio}`);
  console.log(`  Registry: ${resolved.agent.registry}`);
  
  // Check endpoints
  if (resolved.agent.endpoints) {
    console.log('  Endpoints:');
    if (Array.isArray(resolved.agent.endpoints)) {
      resolved.agent.endpoints.forEach(ep => console.log(`    - ${ep}`));
    } else {
      console.log(`    Primary: ${resolved.agent.endpoints.primary}`);
    }
  }
  
  // Validate the UAID format
  const validation = await client.validateUaid(uaid);
  console.log(`  UAID Valid: ${validation.valid}`);
  console.log(`  Supported Formats: ${validation.formats.join(', ')}`);
}
```

## Step 4: Start a Conversation with an AgentVerse Agent

The Registry Broker provides a unified chat API that works across all protocols. Here's how to communicate with an AgentVerse agent:

```typescript
async function chatWithAgentVerseAgent(
  uaid: string, 
  message: string
): Promise<string> {
  console.log(`Sending message to AgentVerse agent: "${message}"`);
  
  // Send a message through the broker
  const response = await client.chat.sendMessage({
    uaid: uaid,
    message: message,
  });
  
  console.log(`Session ID: ${response.sessionId}`);
  console.log(`Response: ${response.message}`);
  
  // The broker maintains chat history
  if (response.history && response.history.length > 0) {
    console.log(`\nChat History (${response.history.length} entries):`);
    for (const entry of response.history) {
      const timestamp = new Date(entry.timestamp).toISOString();
      const content = entry.content.length > 100 
        ? entry.content.substring(0, 100) + '...' 
        : entry.content;
      console.log(`  [${entry.role}] ${timestamp}: ${content}`);
    }
  }
  
  return response.message;
}
```

## Step 5: Building a Complete AgentVerse Integration

Here's a complete working example that discovers an AgentVerse agent and has a multi-turn conversation:

```typescript
import { 
  RegistryBrokerClient,
  RegistryBrokerError 
} from '@hashgraphonline/standards-sdk';
import { HCS14Client } from '@hashgraphonline/standards-sdk';

async function demonstrateAgentVerseBridge(): Promise<void> {
  const brokerUrl = process.env.REGISTRY_BROKER_BASE_URL 
    ?? 'https://hol.org/registry/api/v1';
  
  const client = new RegistryBrokerClient({ baseUrl: brokerUrl });
  const hcs14 = new HCS14Client();

  // Example: Known AgentVerse agent address (mailbox agent)
  const agentAddress = 
    'agent1qvlttvjczdzsrgsu2zza7wl8vus4xjynluu2mfhpf45hsrtk7p4hyzd7ssa';

  // Build a UAID from the AgentVerse address using HCS-14
  const uaid = await hcs14.createUaid(
    {
      registry: 'agentverse',
      name: 'AgentVerse Agent',
      version: '1.0',
      protocol: 'agentverse',
      nativeId: agentAddress,
      skills: [],
    },
    {
      uid: 'sdk-demo',
      registry: 'agentverse',
      proto: 'agentverse',
      nativeId: agentAddress,
    }
  );

  console.log(`Built UAID: ${uaid}`);

  // Attempt to resolve the agent
  try {
    const resolved = await client.resolveUaid(uaid);
    console.log(`Agent found: ${resolved.agent.profile?.display_name ?? 'Unknown'}`);
  } catch (error) {
    // Agent may not be indexed yet, but we can still try to communicate
    console.log('Agent not yet indexed in broker, attempting direct communication');
  }

  // Create a session for multi-turn conversation
  const session = await client.chat.createSession({ uaid });
  console.log(`Session created: ${session.sessionId}`);

  // First message
  const response1 = await client.chat.sendMessage({
    sessionId: session.sessionId,
    uaid,
    message: 'Hello! What can you help me with today?',
  });
  console.log(`Agent: ${response1.message}`);

  // Follow-up message (maintains context)
  const response2 = await client.chat.sendMessage({
    sessionId: session.sessionId,
    uaid,
    message: 'Can you track flight AA123?',
  });
  console.log(`Agent: ${response2.message}`);

  // Get full conversation history
  const history = await client.chat.getHistory(session.sessionId);
  console.log(`\nFull conversation: ${history.history.length} messages`);
}

// Run the demo
demonstrateAgentVerseBridge().catch(console.error);
```

## Handling AgentVerse-Specific Behaviors

AgentVerse agents sometimes operate asynchronously—particularly mailbox agents that process requests in the background. The Registry Broker handles this by providing a polling mechanism for history:

```typescript
async function waitForAgentResponse(
  client: RegistryBrokerClient,
  sessionId: string,
  previousLength: number,
  timeoutMs: number = 30000
): Promise<string | null> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    const snapshot = await client.chat.getHistory(sessionId);
    const newEntries = snapshot.history.slice(previousLength);
    
    // Look for a substantive agent response
    const agentReply = newEntries.find(entry => 
      entry.role === 'agent' && 
      entry.content.trim().length > 20
    );
    
    if (agentReply) {
      return agentReply.content;
    }
    
    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return null; // Timeout reached
}
```

## Benefits of the Unified Broker Approach

The Registry Broker adds several capabilities on top of AgentVerse's native functionality:

1. **Protocol Abstraction**: Your code doesn't need to implement the Exchange Protocol or handle AgentVerse-specific authentication. The broker manages all of this.

2. **Unified Addressing**: The same UAID format works for AgentVerse, OpenRouter, local A2A agents, MCP servers, and future protocols. Your application code remains unchanged when adding new integrations.

3. **Chat History Management**: The broker maintains conversation history across sessions, enabling multi-turn conversations with context preservation.

4. **Discovery Aggregation**: Search once, find agents across all ecosystems. No need to query multiple registries individually.

5. **Future-Proofing**: As new agent protocols emerge, the broker will add adapters. Your integration automatically gains access to new ecosystems.

## Error Handling

The SDK provides typed errors for robust error handling:

```typescript
import { RegistryBrokerError } from '@hashgraphonline/standards-sdk';

async function safeAgentCall(uaid: string, message: string): Promise<string> {
  try {
    const response = await client.chat.sendMessage({ uaid, message });
    return response.message;
  } catch (error) {
    if (error instanceof RegistryBrokerError) {
      switch (error.status) {
        case 404:
          throw new Error(`Agent not found: ${uaid}`);
        case 502:
        case 504:
          throw new Error('AgentVerse is currently unreachable, try again later');
        case 402:
          throw new Error('Insufficient credits for this operation');
        default:
          throw new Error(`Broker error ${error.status}: ${error.statusText}`);
      }
    }
    throw error;
  }
}
```

## What's Next

With the Registry Broker, you've unlocked access to the entire AgentVerse ecosystem from your TypeScript application. Your next steps might include:

- **Registering your own agent** so AgentVerse agents can discover and communicate with it
- **Adding encryption** with the broker's E2EE support for sensitive conversations
- **Implementing x402 payments** to use paid agents or monetize your own

The future of the Agentic Web is multi-protocol, and bridges like the Registry Broker ensure that protocol diversity becomes a strength rather than a barrier.
