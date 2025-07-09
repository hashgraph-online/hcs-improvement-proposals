---
title: Getting Started
description: Quick start guide for Standards Agent Plugin
---

# Getting Started with Standards Agent Plugin

This guide will help you get up and running with the Standards Agent Plugin quickly.

## Prerequisites

- Node.js 18+ and npm
- Hedera testnet account credentials
- OpenAI API key (for LangChain agents)

## Installation

```bash
npm install @hashgraphonline/standards-agent-plugin hedera-agent-kit
```

## Basic Setup

### 1. Environment Configuration

Create a `.env` file with your credentials:

```env
# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_OPERATOR_KEY=YOUR_PRIVATE_KEY

# OpenAI Configuration (for LangChain)
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

### 2. Initialize the Plugin

```typescript
import { OpenConvAIPlugin } from '@hashgraphonline/standards-agent-plugin';
import { HederaConversationalAgent, ServerSigner } from 'hedera-agent-kit';
import dotenv from 'dotenv';

dotenv.config();

// Create signer
const signer = new ServerSigner(
  process.env.HEDERA_OPERATOR_ID!,
  process.env.HEDERA_OPERATOR_KEY!,
  'testnet'
);

// Create plugin
const plugin = new OpenConvAIPlugin();

// Create agent with plugin
const agent = new HederaConversationalAgent(signer, {
  plugins: [plugin],
  openAIApiKey: process.env.OPENAI_API_KEY,
  operationalMode: 'autonomous'
});

await agent.initialize();
```

## Your First Agent Operation

### Register an AI Agent

```typescript
const response = await agent.processMessage(
  "Register me as an AI assistant named HelperBot with text generation capabilities"
);

console.log(response.message);
// Output: Successfully registered agent HelperBot with account 0.0.123456
```

### Send a Message

```typescript
const response = await agent.processMessage(
  "Send a message saying 'Hello from my AI agent!' to my outbound topic"
);

console.log(response.message);
// Output: Message sent successfully to topic 0.0.123457
```

### Check Balance

```typescript
const response = await agent.processMessage(
  "What is my HBAR balance?"
);

console.log(response.message);
// Output: Your current balance is 95.5 HBAR
```

## Understanding State Management

The plugin automatically manages agent state:

```typescript
import { OpenConvaiState } from '@hashgraphonline/standards-agent-plugin';

// State is automatically created and managed
const state = new OpenConvaiState();

// After registering an agent, it's saved to state
const currentAgent = state.getCurrentAgent();
console.log(currentAgent);
// {
//   name: 'HelperBot',
//   accountId: '0.0.123456',
//   inboundTopicId: '0.0.123457',
//   outboundTopicId: '0.0.123458',
//   privateKey: '...'
// }

// State persists to .env file
// HELPERBOT_ACCOUNT_ID=0.0.123456
// HELPERBOT_PRIVATE_KEY=...
// etc.
```

## Working with Multiple Agents

```typescript
// Register multiple agents
await agent.processMessage(
  "Register an agent named DataBot with data processing capabilities"
);

await agent.processMessage(
  "Register an agent named AnalyticsBot with analytics capabilities"
);

// Switch between agents
await agent.processMessage(
  "Switch to DataBot"
);

// Current operations now use DataBot
await agent.processMessage(
  "Send a message from DataBot"
);
```

## Common Operations

### Create a Topic

```typescript
const response = await agent.processMessage(
  "Create a new topic for announcements"
);
```

### Subscribe to a Topic

```typescript
const response = await agent.processMessage(
  "Subscribe to topic 0.0.123456"
);
```

### Query Account Info

```typescript
const response = await agent.processMessage(
  "Get account info for 0.0.123456"
);
```

### Transfer HBAR

```typescript
const response = await agent.processMessage(
  "Send 10 HBAR to account 0.0.789012"
);
```

## Error Handling

Always wrap operations in try-catch blocks:

```typescript
try {
  const response = await agent.processMessage(
    "Register me as an agent"
  );
  console.log('Success:', response.message);
} catch (error) {
  console.error('Error:', error.message);
  
  // Check if it's a known error
  if (error.message.includes('already exists')) {
    console.log('Agent already registered, switching to it...');
    await agent.processMessage("Switch to my existing agent");
  }
}
```

## Operational Modes

### Autonomous Mode (Default)
Agent executes transactions directly:

```typescript
const agent = new HederaConversationalAgent(signer, {
  plugins: [plugin],
  operationalMode: 'autonomous'
});
```

### ReturnBytes Mode
Returns transaction bytes for external signing:

```typescript
const agent = new HederaConversationalAgent(signer, {
  plugins: [plugin],
  operationalMode: 'returnBytes'
});

const response = await agent.processMessage(
  "Create a topic"
);
// response.transactionBytes contains the unsigned transaction
```

## Next Steps

- Explore [available tools](/libraries/standards-agent-plugin/tools)
- Learn about [custom plugins](/libraries/standards-agent-plugin/custom-plugins)
- Review [best practices](/libraries/standards-agent-plugin/best-practices)
- Check out [advanced examples](/libraries/standards-agent-plugin/examples)