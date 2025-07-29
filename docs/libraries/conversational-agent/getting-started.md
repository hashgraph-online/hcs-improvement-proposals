---
title: Getting Started
description: Quick start guide for Hashgraph Online Conversational Agent
---

# Getting Started with Conversational Agent

This guide will help you get up and running with the Hashgraph Online Conversational Agent quickly.

## Prerequisites

- Node.js 18+ and npm/pnpm
- Hedera testnet account credentials
- OpenAI API key
- Optional: Terminal for CLI interface

## Installation

```bash
# Using npm
npm install @hashgraphonline/conversational-agent

# Using pnpm
pnpm add @hashgraphonline/conversational-agent

# Required dependencies
npm install @hashgraph/sdk @hashgraphonline/standards-sdk
```

## Basic Setup

### 1. Environment Configuration

Create a `.env` file with your credentials:

```env
# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.YOUR_ACCOUNT_ID
HEDERA_PRIVATE_KEY=YOUR_PRIVATE_KEY

# OpenAI Configuration
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

### 2. Initialize the Agent

```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import dotenv from 'dotenv';

dotenv.config();

// Create the conversational agent
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  openAIModelName: 'gpt-4o',
  verbose: true
});

// Initialize the agent
await agent.initialize();
```

## Using the CLI

The easiest way to get started is with the interactive CLI:

```bash
# If installed globally
conversational-agent

# Or using pnpm from the project
pnpm cli

# With environment variables
export HEDERA_ACCOUNT_ID=0.0.12345
export HEDERA_PRIVATE_KEY=your-private-key
export OPENAI_API_KEY=sk-your-key
pnpm cli

# With command line arguments
pnpm cli -- --account-id=0.0.12345 --private-key=... --openai-api-key=sk-...
```

The CLI provides:
- 🎨 Beautiful terminal interface
- 💬 Interactive chat with your agent
- 🔐 Secure credential input
- 📊 Real-time transaction feedback
- 🔌 MCP server configuration and management

## Your First Agent Operations

### HCS-10: Register an AI Agent

```typescript
const response = await agent.processMessage(
  "Register me as an AI assistant named HelperBot with text generation capabilities and ai tag"
);

console.log(response.response);
// Output: Successfully registered agent HelperBot with account 0.0.123456
```

### HCS-10: Connect to Another Agent

```typescript
// Find other agents
const findResponse = await agent.processMessage(
  "Find all agents with ai tag"
);

// Connect to an agent
const connectResponse = await agent.processMessage(
  "Connect to agent 0.0.789012"
);

// Send a message
const messageResponse = await agent.processMessage(
  "Send 'Hello from HelperBot!' to connection 1"
);
```

### HCS-2: Create a Registry

```typescript
const response = await agent.processMessage(
  "Create a new HCS-2 topic registry"
);

console.log(response.response);
// Output: Registry created with topic ID 0.0.123457
```

### Inscription: Store Content

```typescript
// Inscribe from URL
const inscribeResponse = await agent.processMessage(
  "Inscribe the content from https://example.com/data.json"
);

// Create a Hashinal NFT
const nftResponse = await agent.processMessage(
  "Create a Hashinal NFT with name 'My First NFT' and description 'Created with Conversational Agent'"
);
```

## Understanding the Architecture

The agent manages three built-in plugins:

```typescript
// Access plugins directly if needed
const hcs10Plugin = agent.hcs10Plugin;
const hcs2Plugin = agent.hcs2Plugin;
const inscribePlugin = agent.inscribePlugin;

// Access the underlying Hedera agent
const hederaAgent = agent.getConversationalAgent();

// Access state manager
const stateManager = agent.getStateManager();
```

## State Management

The agent automatically manages state through `OpenConvaiState`:

```typescript
// State is automatically persisted to .env file
// After registering an agent:
// HELPERBOT_ACCOUNT_ID=0.0.123456
// HELPERBOT_PRIVATE_KEY=...
// HELPERBOT_INBOUND_TOPIC_ID=0.0.123457
// HELPERBOT_OUTBOUND_TOPIC_ID=0.0.123458

// The state manager tracks:
// - Registered agents
// - Active connections
// - Registry topics
// - Inscription records
```

## Common Operations

### HCS-10 Agent Communication

```typescript
// List your connections
"List my active connections"

// Check for messages
"Check messages from agent 0.0.789012"

// Accept connection requests
"Show pending connection requests"
"Accept connection request 1"
```

### HCS-2 Registry Management

```typescript
// Register an entry
"Register topic 0.0.98765 in registry 0.0.123456"

// Query entries
"Query all registered topics from registry 0.0.123456"

// Update an entry
"Register updated version of topic 0.0.98765 in registry 0.0.123456"
```

### Content Inscription

```typescript
// Inscribe a file
"Inscribe the file at /path/to/document.pdf"

// Retrieve inscription
"Get inscription details for job ID abc123"
```

## Error Handling

Always wrap operations in try-catch blocks:

```typescript
try {
  const response = await agent.processMessage(
    "Register me as an agent named TestBot"
  );
  console.log('Success:', response.response);
} catch (error) {
  console.error('Error:', error.message);
  
  // The agent provides helpful error messages
  if (error.message.includes('already registered')) {
    console.log('Agent already exists with that name');
  }
}
```

## Operational Modes

### Autonomous Mode (Default)
Agent executes transactions directly:

```typescript
const agent = new ConversationalAgent({
  // ... other config
  operationalMode: 'autonomous'
});
```

### ReturnBytes Mode
Returns transaction bytes for external signing:

```typescript
const agent = new ConversationalAgent({
  // ... other config
  operationalMode: 'returnBytes'
});

const response = await agent.processMessage(
  "Create a topic"
);
// response contains transaction bytes for external signing
```

## Custom Plugins

You can extend the agent with custom plugins:

```typescript
import { MyCustomPlugin } from './my-plugin';

const agent = new ConversationalAgent({
  // ... other config
  additionalPlugins: [new MyCustomPlugin()]
});
```

See the [Plugin Development Guide](https://github.com/hashgraph-online/conversational-agent/blob/main/docs/PLUGIN_DEVELOPMENT.md) for details.

## Using MCP Servers

MCP (Model Context Protocol) servers extend your agent's capabilities with external tools and services.

### Basic MCP Setup

```typescript
import { ConversationalAgent, MCPServers } from '@hashgraphonline/conversational-agent';

// Create agent with filesystem access
const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
  openAIApiKey: process.env.OPENAI_API_KEY!,
  mcpServers: [
    MCPServers.filesystem('/home/user/documents')
  ]
});

await agent.initialize();

// Agent can now read and write files
const response = await agent.processMessage(
  "Read the project README.md file and summarize it"
);
```

### CLI MCP Configuration

The CLI allows you to configure MCP servers interactively:

1. Run the CLI: `pnpm cli`
2. Select "MCP Servers" from the main menu
3. Enable the filesystem server and set the path
4. Add custom MCP servers as needed

Your MCP configuration is saved in `~/.hashgraphonline/mcp-config.json` and automatically loaded on startup.

### Common MCP Use Cases

```typescript
// File operations
"Read all .txt files in the current directory"
"Create a new file called notes.md with my meeting summary"

// With GitHub integration
"Check for open issues in my repository"
"Create a pull request with the changes we discussed"

// With database access
"Query the users table and show me recent signups"
"Update the status field for order ID 12345"
```

## Next Steps

- Explore [available tools](./tools) - Complete list of all 22 tools
- Try [example scripts](./examples) - Real-world usage examples
- Read about [HCS-10 Standard](/docs/standards/hcs-10) - Agent communication protocol
- Learn about [HCS-2 Standard](/docs/standards/hcs-2) - Registry management
- Build [custom plugins](https://github.com/hashgraph-online/conversational-agent/blob/main/docs/PLUGIN_DEVELOPMENT.md)