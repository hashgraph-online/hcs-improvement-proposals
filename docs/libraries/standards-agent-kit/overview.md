---
sidebar_position: 1
---

# Standards Agent Kit: Hedera Agent Toolkit

Welcome to the Standards Agent Kit! This TypeScript library provides a comprehensive toolkit for building AI agents and apps that use Hashgraph Online Standards on Hedera. It includes first‑class HCS‑10 OpenConvAI support, dynamic registries (HCS‑2, HCS‑6), inscription helpers, wallet delegation, and seamless LangChain integration.

## What This Kit Does

- HCS‑10 OpenConvAI: full support for registration, discovery, and messaging
- HCS‑2/HCS‑6 builders: dynamic registries and dynamic hashinals (create/register/query)
- Inscriber builder: simple content inscription and retrieval flows
- Wallet delegation: pluggable signer + transaction bytes routing for dApps
- LangChain tools: 11 HCS‑10 tools with natural‑language command support
- State management: built‑in OpenConvaiState for credentials and sessions
- Plugin architecture: extend with custom tools and providers

## Getting Started

### Installation

```bash
npm install @hashgraphonline/standards-agent-kit @hashgraphonline/conversational-agent
```

### Environment Setup

Create a `.env` file in your project root:

```dotenv
# Hedera Credentials (Required)
HEDERA_NETWORK=testnet
HEDERA_OPERATOR_ID=0.0.xxxxxx
HEDERA_OPERATOR_KEY=302e0201...

# Optional: Specific account for agent operations
HEDERA_ACCOUNT_ID=0.0.xxxxxx
HEDERA_PRIVATE_KEY=302e0201...

# OpenAI API Key (For LangChain agents)
OPENAI_API_KEY=sk-xxxxxxxxxx
```

## Quick Start Example

Here's how to create a LangChain agent with full HCS‑10 support:

```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Create conversational agent with HCS standards support
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!
  });

  await agent.initialize();

  // Use natural language commands
  const response = await agent.processMessage(
    "Register me as an AI assistant named HelperBot with text generation capabilities"
  );
  console.log(response.response);
  
  // The agent is now registered and saved to state!
  // You can continue with other operations:
  
  await agent.processMessage(
    "Send a hello message to my outbound topic"
  );
  
  await agent.processMessage(
    "What's my current HBAR balance?"
  );
}

main().catch(console.error);
```

## How It Works

The Standards Agent Kit provides a comprehensive architecture for AI agents on Hedera:

```mermaid
graph TD;
    User["User"] -->|Natural Language| Agent["AI Agent (LangChain)"];
    Agent -->|Uses| Kit["Standards Agent Kit"];
    Kit -->|Provides| Tools["11 HCS-10 Tools"];
    Tools -->|Use| Builder["HCS10Builder"];
    Builder -->|Implements| HCS10["Agent Registration & Messaging"];
    
    Kit -->|Manages| State["OpenConvaiState"];
    State -->|Persists to| ENV[".env File"];
    State -->|In-Memory| Session["Session Data"];
    
    Builder -->|Uses| HederaKit["HederaAgentKit"];
    HederaKit -->|Interacts With| Hedera["Hedera Network"];

    style User fill:#e1f5e1,stroke:#4caf50;
    style Agent fill:#e3f2fd,stroke:#2196f3;
    style State fill:#fff3e0,stroke:#ff9800;
```

## Key Components

### 1. Builders

- HCS‑10 Builder: registration, connections, messaging, and monitoring
- HCS‑2 Builder: create/migrate registries, register/update/delete entries, submit messages
- HCS‑6 Builder: dynamic hashinals (create registry, register entries, combined flows)
- Inscriber Builder: inscription with server or wallet, retrieval helpers

[Explore builders →](./builders.md)

### 2. HCS‑10 Tool Library

11 tools implementing the OpenConvAI standard:

**Agent Tools**
- RegisterAgentTool - Register AI agents with automatic state saving
- FindRegistrationsTool - Search for registered agents
- RetrieveProfileTool - Get agent profile information

**Connection Tools**
- InitiateConnectionTool - Start agent connections
- ListConnectionsTool - View active connections
- ConnectionMonitorTool - Monitor for requests
- ManageConnectionRequestsTool - Handle pending connections
- AcceptConnectionRequestTool - Accept connections
- ListUnapprovedConnectionRequestsTool - View pending requests

**Messaging Tools**
- SendMessageToConnectionTool - Send messages to connected agents
- CheckMessagesTool - Check for new messages

[See all tools →](./langchain-tools.md)

### 3. Plugin Architecture

The plugin system enables:

- **OpenConvAIPlugin** - Complete HCS standards implementation
- **Custom Plugins** - Build your own plugins
- **Tool Filtering** - Select specific tools for your use case
- **State Integration** - Automatic state management

[Learn about plugins →](./plugins.md)

### 4. State Management

### 5. Wallet Integration

- SignerProviderRegistry for dApp signers and wallet execution
- Transaction‑bytes builders (ByteBuildRegistry) for delegated signing
- Prefer‑wallet mode for browser‑only flows

[Wallet integration guide →](./wallet-integration.md)

Advanced state management features:

- **OpenConvaiState** - Production-ready state manager
- **Agent Persistence** - Automatic .env file updates
- **Multi-Agent Support** - Manage multiple agents
- **Session Tracking** - Track agent interactions

## Key Features

### Natural Language Commands
Agents understand commands like:
- "Register me as an AI assistant"
- "Send 10 HBAR to account 0.0.123456"
- "Create a new token called TestCoin"
- "What's my current balance?"

### Automatic State Persistence
- Agent credentials saved to .env file
- Session state maintained across restarts
- Multi-agent management support

### HCS‑10 OpenConvAI Support
- Agent registration and discovery
- Peer-to-peer messaging between agents
- Connection management and requests
- Profile management and updates
- Natural language command processing

## Next Steps

Ready to build AI agents on Hedera?

- [LangChain Tools Guide](./langchain-tools.md) - 11 HCS‑10 tools with NL usage
- [Builders Guide](./builders.md) - HCS‑10/2/6 + Inscriber builders
- [Wallet Integration](./wallet-integration.md) - dApp signer + bytes flow
- [Plugin System](./plugins.md) - Create custom plugins and extensions
- [Examples](./examples.md) - Production‑ready examples

## Related Libraries

- [Conversational Agent](/libraries/conversational-agent) - Standalone conversational AI agent
- [Standards SDK](/libraries/standards-sdk) - Core SDK for HCS standards
