---
id: registry-broker-architecture-protocols
title: Protocol Support
description: Comprehensive overview of supported protocols and their capabilities in the Registry Broker system
---

# Protocol Support

Comprehensive overview of supported protocols and their capabilities in the Registry Broker system.

## Overview

The Registry Broker supports multiple protocols to enable seamless communication between clients and agents across different networks and standards. Each protocol is implemented through a dedicated adapter that handles translation, authentication, and message routing.

## Protocol Matrix

| Protocol | Chat Support | Registration | Discovery | Streaming | Auth Required | Networks |
|----------|-------------|--------------|-----------|-----------|---------------|----------|
| **A2A** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ❌ Optional | Hedera, HTTP |
| **ERC-8004** | ❌ No | ✅ Yes | ✅ Yes | ❌ No | ❌ Optional | Ethereum L2s |
| **MCP** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | HTTP, SSE |
| **OpenRouter** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes | HTTP |
| **OpenConvAI** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes | Hedera |
| **AgentVerse** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No | ✅ Optional | HTTP |

## Detailed Protocol Specifications

### 1. A2A (Agent-to-Agent Protocol)

**Purpose**: Direct peer-to-peer agent communication using JSON-RPC over HTTP.

#### Features
- **Communication**: JSON-RPC 2.0 over HTTP/HTTPS
- **Authentication**: Optional API keys or Hedera signatures
- **Message Format**: Structured JSON with method/params pattern
- **Discovery**: Registry-based agent discovery
- **Registration**: HCS-11 profile inscription on Hedera

#### Message Format

**Request**:
```json
{
  "jsonrpc": "2.0",
  "method": "agent.chat",
  "params": {
    "message": "Hello, how can you help me?",
    "session_id": "session_123",
    "context": {
      "user_id": "user_456",
      "timestamp": "2025-01-15T10:30:00Z"
    }
  },
  "id": "req_789"
}
```

**Response**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "message": "Hello! I can help you with various tasks...",
    "session_id": "session_123",
    "agent_id": "agent_abc",
    "timestamp": "2025-01-15T10:30:01Z",
    "metadata": {
      "model": "gpt-4o-mini",
      "tokens_used": 150
    }
  },
  "id": "req_789"
}
```

#### Implementation Example

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

// Create session with A2A agent
const session = await client.chat.createSession({
  uaid: 'uaid:aid:a2a:hol:customer-support-001',
  metadata: {
    client_version: '1.0.0',
    preferred_language: 'en'
  }
});

// Send message
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'I need help with my account',
  metadata: {
    priority: 'normal',
    category: 'support'
  }
});

console.log(response.content);
```

#### Supported Networks
- **Hedera**: Primary network with HCS-10 messaging
- **HTTP/HTTPS**: Direct HTTP communication
- **WebSocket**: Real-time bidirectional communication

---

### 2. ERC-8004 (Ethereum AI Agent Standard)

**Purpose**: Ethereum-based standard for AI agent registration and discovery.

#### Features
- **Registration**: On-chain agent registration via smart contracts
- **Discovery**: Contract-based agent discovery
- **Metadata**: IPFS-hosted agent metadata
- **Verification**: On-chain verification and trust scoring
- **Standards**: ERC-8004 compliance

#### Smart Contract Interface

```solidity
pragma solidity ^0.8.0;

interface ERC8004 {
    struct Agent {
        string agentId;
        string agentUri;
        string metadataURI;
        address owner;
        uint256 created;
        uint256 updated;
        bool active;
    }
    
    function registerAgent(
        string memory agentId,
        string memory agentUri,
        string memory metadataURI
    ) external returns (bool);
    
    function updateAgent(
        string memory agentId,
        string memory agentUri,
        string memory metadataURI
    ) external returns (bool);
    
    function getAgent(string memory agentId) 
        external view returns (Agent memory);
        
    function getAgentsByOwner(address owner) 
        external view returns (string[] memory);
}
```

#### Agent Metadata Format (IPFS)

```json
{
  "name": "Customer Support Agent",
  "description": "AI-powered customer support for technical issues",
  "version": "1.0.0",
  "agentId": "customer-support-v1",
  "communicationEndpoints": {
    "primary": "https://api.example.com/chat",
    "secondary": "https://backup.example.com/chat"
  },
  "capabilities": [
    "natural-language-understanding",
    "ticket-management",
    "knowledge-base-search"
  ],
  "aiModel": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "temperature": 0.7
  },
  "configuration": {
    "maxTokens": 2000,
    "timeout": 30,
    "supportedLanguages": ["en", "es", "fr"]
  }
}
```

#### Implementation Example

```typescript
// Registration with ERC-8004
const registration = await client.registerAgent({
  profile: {
    version: "1.0.0",
    type: 1,
    display_name: "Customer Support Agent",
    bio: "AI-powered customer support system",
    aiAgent: {
      type: 0,
      model: "gpt-4o-mini",
      capabilities: [0, 4, 18]
    }
  },
  registry: 'erc-8004',
  communicationProtocol: 'erc8004',
  endpoint: 'https://api.example.com/chat',
  additionalRegistries: [
    'erc-8004:ethereum-sepolia',
    'erc-8004:base-sepolia'
  ]
});

console.log('Registered on networks:', registration.additionalRegistries);
```

#### Supported Networks
- **Ethereum Mainnet**: Primary ERC-8004 network
- **Base**: Base L2 network
- **Arbitrum**: Arbitrum One
- **Polygon**: Polygon PoS
- **Sepolia**: Ethereum testnet

---

### 3. MCP (Model Context Protocol)

**Purpose**: Standardized protocol for AI agent tool calling and resource access.

#### Features
- **Tool Calling**: Dynamic tool invocation
- **Resource Access**: File system and API access
- **Streaming**: Server-Sent Events (SSE) support
- **JSON-RPC**: Standard JSON-RPC 2.0 communication
- **Progressive Enhancement**: Fallback to polling

#### Message Format

**Initialize**:
```json
{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "roots": {
        "listChanged": true
      },
      "sampling": {}
    },
    "clientInfo": {
      "name": "registry-broker-client",
      "version": "1.0.0"
    }
  },
  "id": 1
}
```

**Tool Call**:
```json
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {
      "location": "San Francisco",
      "unit": "celsius"
    }
  },
  "id": 2
}
```

**Response with Streaming**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "The weather in San Francisco is"
      },
      {
        "type": "text", 
        "text": " currently 18°C with clear skies."
      }
    ]
  },
  "id": 2
}
```

#### Implementation Example

```typescript
// Create session with MCP agent
const session = await client.chat.createSession({
  uaid: 'uaid:aid:mcp:local:data-analyst',
  metadata: {
    protocol: 'mcp',
    streaming: true
  }
});

// Enable streaming for real-time responses
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Analyze the sales data from last quarter',
  streaming: true,
  metadata: {
    tools: ['data_import', 'statistical_analysis', 'chart_generation']
  }
});

// Handle streaming response
if (response.streaming) {
  for await (const chunk of response.chunks) {
    console.log('Received chunk:', chunk.content);
  }
}
```

#### Transport Options
- **HTTP/JSON-RPC**: Standard request/response
- **SSE (Server-Sent Events)**: Real-time streaming
- **WebSocket**: Bidirectional communication (future)

---

### 4. OpenRouter

**Purpose**: Access to multiple LLM providers through a unified OpenAI-compatible API.

#### Features
- **Multi-Provider**: Access to various LLM models
- **OpenAI Compatible**: Drop-in replacement for OpenAI API
- **Bearer Token Auth**: Simple authentication
- **Model Selection**: Dynamic model switching
- **Usage Tracking**: Per-model usage analytics

#### Message Format

**Request**:
```json
{
  "model": "anthropic/claude-3.5-sonnet",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant."
    },
    {
      "role": "user", 
      "content": "Explain quantum computing in simple terms."
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.7
}
```

**Response**:
```json
{
  "id": "or_1234567890",
  "object": "chat.completion",
  "created": 1640995200,
  "model": "anthropic/claude-3.5-sonnet",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing is like..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}
```

#### Implementation Example

```typescript
// Chat with OpenRouter model
const session = await client.chat.createSession({
  agentUrl: 'openrouter://anthropic/claude-3.5-sonnet',
  auth: {
    type: 'bearer',
    token: process.env.OPENROUTER_API_KEY!
  }
});

const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Write a Python function to calculate fibonacci numbers',
  auth: {
    type: 'bearer', 
    token: process.env.OPENROUTER_API_KEY!
  },
  metadata: {
    max_tokens: 500,
    temperature: 0.7
  }
});

console.log(response.content);
```

#### Supported Models
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Haiku
- **OpenAI**: GPT-4, GPT-3.5-turbo
- **Google**: Gemini Pro, PaLM 2
- **Meta**: Llama 2, Llama 3
- **Mistral**: Mistral 7B, Mixtral 8x7B

---

### 5. OpenConvAI

**Purpose**: HCS-10 based asynchronous messaging on Hedera for decentralized agent communication.

#### Features
- **Asynchronous**: Non-blocking message delivery
- **Consensus Ordered**: Messages ordered by Hedera consensus
- **Topic-Based**: Communication via HCS-10 topics
- **Operator Keys**: Hedera operator key authentication
- **Tamper Evident**: Immutable message history

#### Message Format

**Registration Message**:
```json
{
  "type": "agent_registration",
  "version": "1.0",
  "agent": {
    "uaid": "uaid:aid:openconvai:hol:agent123",
    "name": "AI Research Assistant",
    "description": "Specialized in scientific research",
    "capabilities": ["research", "analysis", "writing"]
  },
  "topics": {
    "inbound": "0.0.12345",
    "outbound": "0.0.12346"
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**Chat Message**:
```json
{
  "type": "chat_message",
  "version": "1.0",
  "session_id": "session_456",
  "from": {
    "type": "client",
    "id": "user_789"
  },
  "to": {
    "type": "agent",
    "uaid": "uaid:aid:openconvai:hol:agent123"
  },
  "message": {
    "content": "What are the latest developments in quantum computing?",
    "metadata": {
      "urgency": "normal",
      "context": "research"
    }
  },
  "timestamp": "2025-01-15T10:30:01Z"
}
```

#### Implementation Example

```typescript
// Create session with OpenConvAI agent
const session = await client.chat.createSession({
  uaid: 'uaid:aid:openconvai:hol:research-assistant',
  metadata: {
    network: 'testnet',
    operator_id: process.env.HEDERA_OPERATOR_ID
  }
});

// Send message (async response)
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Summarize the latest AI research papers'
});

// Poll for response (OpenConvAI is asynchronous)
let attempts = 0;
while (attempts < 10) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const history = await client.chat.getHistory(session.sessionId);
  const lastMessage = history[history.length - 1];
  
  if (lastMessage.role === 'agent' && lastMessage.content) {
    console.log('Agent response:', lastMessage.content);
    break;
  }
  
  attempts++;
}
```

#### Topic Management
- **Inbound Topic**: Messages TO the agent
- **Outbound Topic**: Messages FROM the agent
- **Consensus Ordering**: Messages ordered by Hedera consensus
- **Retention**: Configurable topic retention periods

---

### 6. AgentVerse

**Purpose**: Specialized protocol for mailbox and proxy agent communication with identity verification.

#### Features
- **Mailbox Pattern**: Asynchronous message delivery
- **Identity Verification**: Agent identity verification
- **Proxy Support**: Agent proxying and delegation
- **Signed Envelopes**: Cryptographic message signing
- **Polling Interface**: Efficient message polling

#### Message Format

**Envelope**:
```json
{
  "version": "1.0",
  "type": "agent_message",
  "envelope_id": "env_1234567890",
  "from": {
    "type": "agent",
    "uaid": "uaid:aid:agentverse:hol:client123",
    "signature": "0x123...abc"
  },
  "to": {
    "type": "agent", 
    "uaid": "uaid:aid:agentverse:hol:agent456"
  },
  "message": {
    "content": "Please process this document",
    "attachments": [
      {
        "type": "file",
        "name": "document.pdf",
        "url": "ipfs://Qm...",
        "size": 1024000
      }
    ]
  },
  "timestamp": "2025-01-15T10:30:00Z",
  "expires_at": "2025-01-15T11:30:00Z",
  "signature": "0x456...def"
}
```

#### Implementation Example

```typescript
// Create session with AgentVerse agent
const session = await client.chat.createSession({
  uaid: 'uaid:aid:agentverse:hol:document-processor',
  metadata: {
    signing_key: process.env.AGENT_SIGNING_KEY,
    polling_interval: 2000
  }
});

// Send message with file attachment
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Process this document for key information',
  metadata: {
    attachments: [
      {
        type: 'file',
        name: 'contract.pdf',
        url: 'https://storage.example.com/contract.pdf'
      }
    ],
    priority: 'normal'
  }
});

// Poll for response
setTimeout(async () => {
  const history = await client.chat.getHistory(session.sessionId);
  const response = history.find(msg => msg.role === 'agent');
  if (response) {
    console.log('Processing result:', response.content);
  }
}, 3000);
```

#### Identity System
- **Agent Verification**: On-chain or off-chain identity verification
- **Signature Verification**: Cryptographic signature validation
- **Trust Scoring**: Reputation-based trust system
- **Revocation**: Agent revocation and blacklisting

## Protocol Selection Guide

### Choose A2A When:
- You need direct peer-to-peer communication
- Working primarily with Hedera ecosystem
- Require simple JSON-RPC interface
- Want built-in registry integration

### Choose ERC-8004 When:
- Deploying on Ethereum-based networks
- Need on-chain verification and trust
- Require smart contract integration
- Want standard ERC compliance

### Choose MCP When:
- Need tool calling capabilities
- Want streaming support
- Require resource access patterns
- Building complex agent workflows

### Choose OpenRouter When:
- Accessing multiple LLM providers
- Need OpenAI-compatible interface
- Want provider flexibility
- Require model switching capability

### Choose OpenConvAI When:
- Building decentralized applications
- Need immutable message history
- Require consensus-ordered messages
- Working with Hedera ecosystem

### Choose AgentVerse When:
- Building mailbox/proxy systems
- Need identity verification
- Require signed message delivery
- Want polling-based communication

## Migration Between Protocols

### Bridge Support
The Registry Broker provides protocol bridging capabilities:

```typescript
// Example: Bridge OpenRouter to A2A
const session = await client.chat.createSession({
  agentUrl: 'openrouter://anthropic/claude-3.5-sonnet',
  auth: { type: 'bearer', token: process.env.OPENROUTER_KEY }
});

// Convert to A2A format
const a2aMessage = await client.protocolBridge.toA2A({
  sessionId: session.sessionId,
  message: 'Your message here'
});
```

### Protocol Translation
Automatic translation between supported protocols:
- A2A ↔ OpenRouter
- ERC-8004 ↔ A2A
- MCP ↔ A2A
- OpenConvAI ↔ A2A

## Future Protocol Support

### Planned Additions
- **GraphQL**: For flexible query interfaces
- **WebRTC**: For peer-to-peer communication
- **gRPC**: For high-performance communication
- **WebSocket**: For real-time bidirectional communication

### Community Protocols
We welcome community contributions for new protocol adapters. See our [Contributing Guide](https://github.com/hashgraphonline/hashgraph-online/blob/main/CONTRIBUTING.md) for details.
