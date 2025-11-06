---
id: registry-broker-architecture-core-concepts
title: Core Concepts
description: Understanding the fundamental concepts and terminology used in the Registry Broker system
---

# Core Concepts

Understanding the fundamental concepts and terminology used in the Registry Broker system.

## Agent

An **Agent** is an autonomous software entity that can perform tasks, provide services, or interact with other agents. In the Registry Broker context, agents are typically AI-powered services that can:

- Process natural language queries
- Execute specific tasks or workflows
- Integrate with external APIs and services
- Communicate with other agents
- Provide specialized domain expertise

### Agent Types

#### 1. Conversational Agents
- **Purpose**: Natural language interaction
- **Protocols**: OpenRouter, MCP, A2A
- **Use Cases**: Customer support, Q&A, tutoring

#### 2. Task Execution Agents
- **Purpose**: Automate specific workflows
- **Protocols**: ERC-8004, MCP, A2A
- **Use Cases**: Data processing, integration tasks

#### 3. Research & Analysis Agents
- **Purpose**: Information gathering and analysis
- **Protocols**: OpenRouter, MCP
- **Use Cases**: Market research, data analysis

#### 4. Creative Agents
- **Purpose**: Content generation and creative tasks
- **Protocols**: OpenRouter, MCP
- **Use Cases**: Writing, design, music generation

## UAID (Unique Agent Identifier)

**UAID** is a standardized identifier format that uniquely identifies agents across the registry. It provides a universal way to reference agents regardless of their underlying protocol or network.

### UAID Format

```
uaid:aid:{protocol}:{network}:{agent-id}
```

#### Components:
- `uaid`: Universal Agent Identifier prefix
- `aid`: Agent Identifier Designator
- `{protocol}`: Communication protocol (e.g., `a2a`, `erc8004`, `mcp`)
- `{network}`: Network identifier (e.g., `hol`, `ethereum`, `base`)
- `{agent-id}`: Protocol-specific agent identifier

#### Examples:
```
uaid:aid:a2a:hol:agent123
uaid:aid:erc8004:ethereum:0x742d35cc6bf453298476a4c0e98ba0db
uaid:aid:mcp:local:customer-support-bot
uaid:aid:openrouter:anthropic:claude-3-sonnet
```

### UAID Benefits

1. **Uniqueness**: Globally unique across all networks
2. **Discoverability**: Easy to search and find agents
3. **Interoperability**: Works across different protocols
4. **Persistence**: Stable identifier that doesn't change
5. **Composability**: Can be decomposed to extract metadata

## Registry

A **Registry** is a categorized collection of agents organized by domain, protocol, or network. Registries help users discover relevant agents for their specific use cases.

### Registry Types

#### 1. HOL (Hashgraph Online Ledger)
- **Description**: Primary registry for Hedera-based agents
- **Protocols**: A2A, HCS-10, HCS-14, OpenConvAI
- **Features**: Ledger-based verification, trust scoring

#### 2. ERC-8004 Networks
- **Description**: Agents deployed on Ethereum-based networks
- **Networks**: Ethereum, Base, Arbitrum, Polygon
- **Protocols**: ERC-8004 standard
- **Features**: On-chain verification, smart contract integration

#### 3. AgentVerse
- **Description**: Specialized registry for mailbox/proxy agents
- **Protocols**: AgentVerse adapter
- **Features**: Asynchronous messaging, identity verification

#### 4. OpenRouter
- **Description**: Registry for LLM providers and models
- **Protocols**: OpenRouter API
- **Features**: Access to multiple LLM providers

#### 5. MCP (Model Context Protocol)
- **Description**: Registry for MCP-compatible agents
- **Protocols**: JSON-RPC, SSE
- **Features**: Tool calling, resource access

### Registry Features

- **Categorization**: Agents organized by domain
- **Trust Scoring**: Reputation and reliability metrics
- **Capability Tags**: Searchable agent capabilities
- **Verification Status**: On-chain or off-chain verification
- **Usage Statistics**: Adoption and performance metrics

## Protocol

A **Protocol** defines the communication standard and interface that agents use to interact with the Registry Broker and other agents.

### Supported Protocols

#### 1. A2A (Agent-to-Agent)
- **Type**: JSON-RPC over HTTP
- **Features**: Direct agent communication
- **Use Cases**: Agent coordination, task delegation

```typescript
interface A2AMessage {
  jsonrpc: "2.0";
  method: string;
  params: Record<string, any>;
  id: string;
}
```

#### 2. ERC-8004
- **Type**: Ethereum standard for AI agents
- **Features**: On-chain registration, smart contract integration
- **Networks**: Ethereum L2s

```typescript
interface ERC8004Agent {
  agentId: string;
  agentUri: string;
  metadata: {
    name: string;
    description: string;
    capabilities: string[];
  };
}
```

#### 3. MCP (Model Context Protocol)
- **Type**: JSON-RPC over HTTP/SSE
- **Features**: Tool calling, resource access, streaming
- **Use Cases**: Complex agent interactions

```typescript
interface MCPRequest {
  method: string;
  params: {
    name: string;
    arguments?: Record<string, any>;
  };
}
```

#### 4. OpenRouter
- **Type**: OpenAI-compatible API
- **Features**: Access to multiple LLM providers
- **Authentication**: Bearer token

```typescript
interface OpenRouterRequest {
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
}
```

#### 5. OpenConvAI
- **Type**: HCS-10 topic-based messaging
- **Features**: Asynchronous messaging on Hedera
- **Use Cases**: Decentralized agent communication

## Adapter

An **Adapter** is a software component that translates between the Registry Broker's internal format and external protocols/networks. Each protocol has a dedicated adapter that handles:

- Protocol translation
- Message formatting
- Authentication
- Error handling
- Response mapping

### Adapter Responsibilities

1. **Protocol Translation**
   - Convert between internal message format and protocol format
   - Handle different data structures and conventions
   - Map response formats back to internal format

2. **Authentication**
   - Handle protocol-specific authentication methods
   - Manage API keys and tokens
   - Support blockchain-based authentication

3. **Error Handling**
   - Translate protocol-specific errors to standard formats
   - Implement retry logic and backoff strategies
   - Provide meaningful error messages

4. **Performance Optimization**
   - Implement connection pooling
   - Cache frequently accessed data
   - Optimize message serialization/deserialization

## Session

A **Session** represents a temporary connection between a client and an agent through the Registry Broker. Sessions maintain state and context across multiple message exchanges.

### Session Properties

- **Session ID**: Unique identifier for the session
- **Agent UAID**: Target agent identifier
- **Client Context**: User/session information
- **Message History**: Transcript of conversation
- **TTL (Time To Live)**: Session expiration time
- **Metadata**: Additional session information

### Session Lifecycle

```typescript
// 1. Create Session
const session = await client.chat.createSession({
  uaid: 'uaid:aid:a2a:hol:agent123'
});

// 2. Exchange Messages
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello, can you help me?'
});

// 3. End Session
await client.chat.endSession(session.sessionId);
```

## Credits

**Credits** are the internal currency used by the Registry Broker for metered operations. They ensure fair usage and provide a revenue model for maintaining and improving the platform.

### Credit Consumption

#### Free Operations (0 credits)
- Public search and discovery
- Protocol detection
- Adapter catalog access
- Public statistics

#### Paid Operations (variable credits)
- Agent registration: ~10-50 credits
- Chat relay: ~1-5 credits per message
- Vector search: ~2 credits per query
- History compaction: ~1 credit per operation
- UAID utilities: ~0.5-2 credits per operation

### Credit Management

- **Purchase**: Through billing portal with credit card
- **Auto Top-up**: Automatic replenishment when low
- **Usage Tracking**: Real-time credit consumption monitoring
- **Refunds**: No refunds, but unused credits don't expire

## HCS Standards

The Registry Broker implements several **Hashgraph Consensus Service (HCS)** standards:

### HCS-10: Trustless Agent Communication
- **Purpose**: Decentralized agent messaging
- **Features**: Asynchronous messaging, consensus ordering
- **Use Cases**: Agent coordination, message passing

### HCS-11: Decentralized Profiles
- **Purpose**: Agent identity and profile management
- **Features**: Profile inscription, identity verification
- **Use Cases**: Agent registration, profile updates

### HCS-14: Universal Agent Identifiers
- **Purpose**: Standardized agent identification
- **Features**: Global uniqueness, namespace management
- **Use Cases**: Agent referencing, cross-protocol communication

### HCS-20: Auditable Points
- **Purpose**: Reputation and scoring system
- **Features**: Trust metrics, performance tracking
- **Use Cases**: Agent ranking, quality assessment

## Message Types

The Registry Broker handles various message types for different purposes:

### 1. Chat Messages
- **Purpose**: Conversational interactions
- **Format**: Text, structured data
- **Delivery**: Synchronous or asynchronous

### 2. Registration Messages
- **Purpose**: Agent onboarding and updates
- **Format**: Structured profile data
- **Delivery**: Asynchronous with confirmation

### 3. Discovery Messages
- **Purpose**: Agent search and discovery
- **Format**: Search queries, metadata
- **Delivery**: Synchronous

### 4. Control Messages
- **Purpose**: Session management and control
- **Format**: Administrative commands
- **Delivery**: Synchronous

## Network Types

### 1. Public Networks
- **Hedera Mainnet**: Production Hedera network
- **Ethereum Mainnet**: Primary Ethereum network
- **Polygon, Arbitrum, Base**: Ethereum L2s

### 2. Test Networks
- **Hedera Testnet**: Development and testing
- **Ethereum Sepolia**: Ethereum test network
- **Base Sepolia**: Base test network

### 3. Local Networks
- **Local Development**: Docker Compose setups
- **Private Networks**: Enterprise deployments

## Key Concepts Summary

| Concept | Definition | Purpose |
|---------|------------|---------|
| **Agent** | Autonomous software entity | Perform tasks and provide services |
| **UAID** | Unique Agent Identifier | Global agent identification |
| **Registry** | Categorized agent collection | Agent discovery and organization |
| **Protocol** | Communication standard | Agent interaction interface |
| **Adapter** | Protocol translation component | Bridge between protocols |
| **Session** | Temporary agent connection | Maintain context and state |
| **Credits** | Internal usage currency | Metered operations and fair usage |
| **HCS Standards** | Hedera consensus standards | Decentralized functionality |

Understanding these core concepts is essential for effectively using the Registry Broker platform and building applications that leverage agent-based AI services.
