---
title: Chat Demo
description: Simple example demonstrating chat functionality with the Registry Broker
---

# Basic Chat Demo

Simple example demonstrating chat functionality with the Registry Broker.

## Overview

This demo shows how to:
1. Search for agents
2. Create a chat session
3. Exchange messages
4. Handle authentication (when required by non-broker adapters)
5. Clean up resources

## Prerequisites

- Node.js 18+
- Registry Broker API key
- Optional: `OPENROUTER_MODEL_ID` (defaults to `anthropic/claude-3.5-sonnet`)
- Optional: `OPENROUTER_REGISTRY` (defaults to `openrouter`)

## Setup

```bash
# Install dependencies
npm install @hashgraphonline/standards-sdk dotenv

# Create .env file
cat > .env << EOF
REGISTRY_BROKER_API_URL=https://registry.hashgraphonline.com/api/v1
REGISTRY_BROKER_API_KEY=your-api-key-here
EOF
```

## Basic Chat Example

```typescript
// chat-demo.ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Initialize client
  const client = new RegistryBrokerClient({
    baseUrl: process.env.REGISTRY_BROKER_API_URL!,
    apiKey: process.env.REGISTRY_BROKER_API_KEY!,
  });

  try {
    console.log('Searching for available agents...');
    
    // Search for agents
    const searchResults = await client.search({
      q: 'customer support',
      limit: 5,
    });

    let selectedAgent = searchResults.hits.at(0) ?? null;

    if (!selectedAgent) {
      console.log('No agents found. Trying general search...');
      const generalResults = await client.search({
        q: 'ai assistant',
        limit: 5,
      });
      
      if (generalResults.hits.length === 0) {
        console.log('No agents available');
        return;
      }
      
      console.log(`Found ${generalResults.hits.length} agents:`);
      generalResults.hits.forEach((agent, index) => {
        console.log(`${index + 1}. ${agent.name} - ${agent.description}`);
      });
      
      selectedAgent = generalResults.hits[0] ?? null;
    } else {
      console.log(`Found ${searchResults.hits.length} customer support agents:`);
      searchResults.hits.forEach((agent, index) => {
        console.log(`${index + 1}. ${agent.name} - ${agent.description}`);
      });
    }

    if (!selectedAgent) {
      console.log('No agents available');
      return;
    }

    console.log(`\n${selectedAgent.name}`);
    console.log(`UAID: ${selectedAgent.uaid}`);

    // Create chat session
    const session = await client.chat.createSession({
      uaid: selectedAgent.uaid,
      historyTtlSeconds: 900,
    });

    console.log(`Session created: ${session.sessionId}`);
    console.log(`Session expires: ${new Date(Date.now() + session.historyTtlSeconds * 1000).toLocaleTimeString()}`);

    // Send first message
    const message1 = 'Hello! Can you introduce yourself and tell me about your capabilities?';
    console.log(`\nUser: ${message1}`);
    
    const response1 = await client.chat.sendMessage({
      sessionId: session.sessionId,
      message: message1,
    });

    console.log(`Agent: ${response1.content}`);

    // Send follow-up message
    const message2 = 'That\'s interesting! Can you help me with a technical problem?';
    console.log(`\nUser: ${message2}`);
    
    const response2 = await client.chat.sendMessage({
      sessionId: session.sessionId,
      message: message2,
    });

    console.log(`Agent: ${response2.content}`);

    // Show chat history
    console.log('\nChat History:');
    const history = await client.chat.getHistory(session.sessionId);
    history.forEach((entry, index) => {
      const role = entry.role === 'user' ? 'User' : 'Agent';
      console.log(`${index + 1}. ${role}: ${entry.content}`);
    });

    // Clean up
    await client.chat.endSession(session.sessionId);
    console.log('\nSession ended successfully');

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
  }
}

main();
```
## OpenRouter Chat Example

```typescript
// openrouter-demo.ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const client = new RegistryBrokerClient({
    baseUrl: process.env.REGISTRY_BROKER_API_URL!,
    apiKey: process.env.REGISTRY_BROKER_API_KEY!,
  });

  try {
    console.log('Starting OpenRouter chat demo...');

    const modelId =
      process.env.OPENROUTER_MODEL_ID?.trim() || 'anthropic/claude-3.5-sonnet';
    const registry = process.env.OPENROUTER_REGISTRY?.trim() || 'openrouter';

    const searchResult = await client.search({
      q: modelId,
      registries: [registry],
      limit: 1,
    });

    if (searchResult.hits.length === 0) {
      throw new Error(
        `Unable to locate model "${modelId}" in registry "${registry}"`,
      );
    }

    const { uaid } = searchResult.hits[0];

    const session = await client.chat.createSession({
      uaid,
      historyTtlSeconds: 900,
    });

    console.log('Session created with OpenRouter model');

    const response = await client.chat.sendMessage({
      sessionId: session.sessionId,
      message: 'Explain quantum computing in one paragraph',
    });

    console.log(`Claude: ${response.content}`);

    // Clean up
    await client.chat.endSession(session.sessionId);
    console.log('Session ended');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```
## Error Handling Example

```typescript
// error-handling-demo.ts
import { 
  RegistryBrokerClient, 
  RegistryBrokerError,
  RegistryBrokerParseError 
} from '@hashgraphonline/standards-sdk';

async function main() {
  const client = new RegistryBrokerClient({
    apiKey: 'invalid-key',
  });

  try {
    // This will fail due to invalid API key
    await client.search({ q: 'test' });
    
  } catch (error) {
    if (error instanceof RegistryBrokerError) {
      const message =
        typeof error.body === 'string'
          ? error.body
          : typeof error.body === 'object' && error.body !== null
          ? (error.body as { message?: string; error?: string }).message ??
            (error.body as { message?: string; error?: string }).error ??
            JSON.stringify(error.body)
          : 'Unknown registry error';

      console.log(`HTTP Error ${error.status}: ${message}`);
      
      // Handle specific error codes
      switch (error.status) {
        case 401:
          console.log('Authentication failed - check your API key');
          break;
        case 402:
          console.log('Payment required - add credits to your account');
          break;
        case 429:
          console.log('Rate limited - wait before making more requests');
          break;
        case 500:
          console.log('Server error - try again later');
          break;
        default:
          console.log('❓ Unknown error occurred');
      }
      
    } else if (error instanceof RegistryBrokerParseError) {
      const detail =
        error.cause instanceof Error
          ? error.cause.message
          : typeof error.cause === 'string'
          ? error.cause
          : JSON.stringify(error.cause);
      console.log(`Parse error: ${detail}`);
      
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
}

main();
```
## Multi-Agent Chat Example

```typescript
// multi-agent-demo.ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

async function main() {
  const client = new RegistryBrokerClient({
    apiKey: process.env.REGISTRY_BROKER_API_KEY!,
  });

  // Find multiple agents
  const agents = await client.search({
    q: 'assistant',
    limit: 3,
  });

  console.log(`Found ${agents.hits.length} agents`);

  // Create sessions with multiple agents
  const sessions = await Promise.all(
    agents.hits.map(async agent => {
      const session = await client.chat.createSession({
        uaid: agent.uaid,
        historyTtlSeconds: 600,
      });
      
      console.log(`Created session with ${agent.name}`);
      return { agent, session };
    })
  );

  // Send the same message to all agents
  const message = 'What can you help me with today?';

  const responses = await Promise.all(
    sessions.map(async ({ agent, session }) => {
      const response = await client.chat.sendMessage({
        sessionId: session.sessionId,
        message,
      });
      
      return { agent, response };
    })
  );

  // Display responses
  responses.forEach(({ agent, response }) => {
    console.log(`\n${agent.name}:`);
    console.log(response.content);
  });

  // Clean up all sessions
  await Promise.all(
    sessions.map(({ session }) => 
      client.chat.endSession(session.sessionId)
    )
  );

  console.log('\nAll sessions ended');
}

main();
```
## Running the Demos

```bash
# Basic chat demo
npx tsx chat-demo.ts

# OpenRouter demo
npx tsx openrouter-demo.ts

# Error handling demo
npx tsx error-handling-demo.ts

# Multi-agent demo
npx tsx multi-agent-demo.ts
```

## Expected Output

```
Searching for available agents...
Found 2 customer support agents:
1. Customer Support Bot - AI-powered customer service
2. Technical Assistant - Help with technical issues

Starting chat with: Customer Support Bot
UAID: uaid:aid:a2a:hashgraph-online:customer-support-001
Session created: session_abc123
Session expires: 2:30:00 PM

User: Hello! Can you introduce yourself and tell me about your capabilities?
Agent: Hello! I'm an AI-powered customer support agent. I can help you with...
```

## Key Concepts Demonstrated

1. **Client Initialization**: Setting up the Registry Broker client
2. **Agent Discovery**: Searching for available agents
3. **Session Management**: Creating and managing chat sessions
4. **Message Exchange**: Sending and receiving messages
5. **Authentication**: Handling different auth schemes
6. **Error Handling**: Proper error management
7. **Resource Cleanup**: Ending sessions properly

## Next Steps


- [Advanced Chat Features](/docs/registry-broker/api/client#chat-and-history) - Explore chat API features

## Support

- [API Reference](/docs/registry-broker/api/client) - Complete API documentation
- [Examples Repository](https://github.com/hashgraphonline/hashgraph-online/tree/main/standards-sdk/demo)
- [Hashinals Telegram](https://t.me/hashinals)
