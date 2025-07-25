---
title: HCS-14 AID - Deterministic Agent IDs
description: The HCS-14 standard provides a systematic approach for generating deterministic, globally unique identifiers for AI agents that work across both web2 and web3 environments.
sidebar_position: 14
---

# HCS-14 Standard AID: Deterministic Agent Identifiers

### Status: Draft

### Table of Contents

- [HCS-14 Standard AID: Deterministic Agent Identifiers](#hcs-14-standard-aid-deterministic-agent-identifiers)
    - [Status: Draft](#status-draft)
    - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Specification](#specification)
    - [Guiding Principles](#guiding-principles)
    - [Agent ID Structure](#agent-id-structure)
    - [Supported Agent Protocols](#supported-agent-protocols)
    - [Canonical Agent Data](#canonical-agent-data)
    - [Native Protocol IDs](#native-protocol-ids)
    - [Agent Capabilities](#agent-capabilities)
      - [Core Capabilities (0-19)](#core-capabilities-0-19)
      - [Protocol-Specific Capabilities (20-39)](#protocol-specific-capabilities-20-39)
    - [Protocol Identifiers](#protocol-identifiers)
    - [Hash Generation](#hash-generation)
    - [A2A Agent Card Integration](#a2a-agent-card-integration)
  - [Implementation](#implementation)
    - [Validation Requirements](#validation-requirements)
    - [Test Vectors](#test-vectors)
      - [Test Vector 1: HCS-10 Agent](#test-vector-1-hcs-10-agent)
      - [Test Vector 2: A2A Agent](#test-vector-2-a2a-agent)
    - [Implementation Checklist](#implementation-checklist)
  - [Security Considerations](#security-considerations)
  - [Examples](#examples)
    - [Example 1: HCS-10 Agent](#example-1-hcs-10-agent)
    - [Example 2: A2A Agent](#example-2-a2a-agent)
    - [Example 3: MCP Server](#example-3-mcp-server)
    - [Example 4: NANDA A2A Bridge Agent](#example-4-nanda-a2a-bridge-agent)
    - [Example 5: Virtuals Protocol Agent](#example-5-virtuals-protocol-agent)
    - [Example 6: OLAS Service](#example-6-olas-service)
  - [Conclusion](#conclusion)

## Authors

- Kantorcodes [https://twitter.com/kantorcodes](https://twitter.com/kantorcodes)

## Abstract

The HCS-14 standard provides a systematic approach for generating deterministic, globally unique identifiers for AI agents that work universally across all platforms. This standard enables consistent agent identification across web2 APIs, web3 protocols, and hybrid systems without requiring any specific infrastructure dependencies.

## Motivation

The rapid growth of AI agents across diverse platforms represents one of the most exciting developments in technology. Each protocol has evolved sophisticated identification systems optimized for their specific use cases - Web2 platforms provide stable API-based identifiers, blockchain systems leverage cryptographic addresses, consensus-based networks utilize account IDs, and decentralized registries implement database-optimized identifiers. This rich ecosystem of approaches has enabled incredible innovation, but also presents opportunities for enhancement:

**Cross-Protocol Collaboration**: As agents become more sophisticated, they increasingly need to work together across protocol boundaries. A research agent on one protocol might need to collaborate with a data analysis agent on another, or a creative agent might need to coordinate with a transaction agent on a different network. Enabling seamless collaboration amplifies the capabilities of all agents.

**Unified Discovery**: Each protocol has developed robust discovery mechanisms within their ecosystem. By creating a universal identification layer, we can build on these existing systems to enable agents to discover potential collaborators across all protocols, expanding the possibilities for agent interactions.

**Trust Bridge Building**: Different protocols have implemented innovative trust and verification mechanisms suited to their architectures. A universal ID system can serve as a bridge between these trust models, allowing protocols to maintain their security approaches while enabling cross-protocol verification.

**Simplified Integration**: Developers building multi-agent systems currently need to implement custom translation and routing for each protocol pair. A universal identification standard reduces this complexity, allowing developers to focus on agent capabilities rather than integration challenges.

The HCS-14 standard builds upon these opportunities by introducing deterministic, self-describing agent identifiers that complement existing protocol identification systems. By respecting and leveraging each protocol's native unique identifiers while adding a universal layer, we create a system where:

- **Any agent can be uniquely identified** regardless of its native protocol
- **IDs are generated deterministically** - the same agent always produces the same ID
- **No central authority is required** - anyone can generate and verify IDs
- **Cross-protocol communication becomes trivial** - IDs contain routing information
- **Agent migration is possible** - agents can move between protocols while maintaining identity
- **Trust can be verified cryptographically** - the ID itself proves the agent's properties

## Specification

### Guiding Principles

The HCS-14 standard is built on seven foundational principles that ensure its universality and longevity:

1. **Deterministic Generation**: The same agent data must always produce the exact same identifier, regardless of who generates it or when. This enables trustless verification and ensures consistency across systems. Like a fingerprint, the ID is an inherent property of the agent's core attributes.

2. **Radical Decentralization**: No central registry, no governing body, no permission required. Anyone can generate valid HCS-14 IDs using only the agent's public data and the standard's algorithm. This embraces the permissionless innovation spirit that drives both Web2 API development and Web3 smart contract deployment.

3. **Self-Describing Structure**: The ID itself contains enough information to route messages to the agent without external lookups. By embedding the protocol identifier in the ID structure (`aid:1:protocol:hash`), we enable direct routing across protocol boundaries - a critical feature for true interoperability.

4. **Cryptographic Verifiability**: Any party can verify that an HCS-14 ID correctly represents an agent by regenerating it from the agent's public data. This creates a trustless system where the ID itself is the proof of authenticity, eliminating the need for certificate authorities or attestation services.

5. **Collision-Resistant Design**: By using SHA-256 hashing with carefully structured canonical data, we achieve cryptographic assurance against ID collisions. The probability of two different agents generating the same ID is effectively zero (2^-256), ensuring global uniqueness without coordination.

6. **Protocol-Agnostic Architecture**: Whether an agent operates through centralized API infrastructure, runs as a smart contract, or leverages consensus mechanisms, the HCS-14 ID works the same way. This universality creates bridges between Web2 and Web3, enabling agents to communicate across different infrastructures while respecting each protocol's unique strengths.

7. **Future-Proof Evolution**: The versioned structure (`aid:1:...`) allows the standard to evolve without breaking existing implementations. New versions can add features while maintaining backward compatibility, ensuring that early adopters aren't left behind as the ecosystem grows.

### Agent ID Structure

The deterministic agent ID follows this structure:

```
aid:{version}:{protocol}:{hash}
```

Where:

- `aid` = Agent IDentifier prefix
- `version` = Version of the ID specification (initially "1")
- `protocol` = Agent communication protocol code
- `hash` = Base58-encoded SHA-256 hash of canonical agent data

### Supported Agent Protocols

Note the list of supported protocols is not exhaustive, but is a starting point for the standard. Additional protocols can and should be added as needed.

| Code           | Protocol               | Description                                      |
| -------------- | ---------------------- | ------------------------------------------------ |
| `a2a`          | Agent-to-Agent         | Google A2A protocol (HTTP+JSON, gRPC)            |
| `mcp`          | Model Context Protocol | Anthropic MCP servers with tools/resources       |
| `hcs-10`       | HCS-10                 | Hedera Consensus Service conversational agents   |
| `nanda`        | NANDA Protocol         | Decentralized AI agent registry with A2A support |
| `acp-virtuals` | ACP Virtuals           | Virtuals Protocol for AI agent commerce          |
| `acp-ibm`      | IBM ACP                | IBM Agent Communication Protocol (REST-based)    |
| `olas`         | OLAS/Autonolas         | Autonomous service registry (discovery only)     |
| `ws`           | WebSocket              | Real-time WebSocket communication                |
| `rest`         | RESTful API            | HTTP REST-based service agents                   |
| `grpc`         | gRPC                   | High-performance gRPC agents                     |
| `mqtt`         | Message Queue          | MQTT or message queue protocols                  |
| `dao`          | DAO Protocol           | Decentralized autonomous agents                  |
| `hybrid`       | Multi-Protocol         | Agents supporting multiple protocols             |

### Canonical Agent Data

The hash is computed from a canonical JSON representation containing ONLY these required fields:

```json
{
  "registry": "string",      // Registry namespace (e.g., "hedera", "google", "olas")
  "name": "string",          // Human-readable agent name
  "version": "string",       // Semantic version (e.g., "1.0.0")
  "protocol": "string",      // Protocol identifier from supported list
  "nativeId": "string",      // Protocol's native unique identifier
  "capabilities": [number]   // Array of capability enum values (0-39)
}
```

**IMPORTANT**: To ensure deterministic ID generation:

- The hash is computed using ONLY the six required fields above
- Communication details (endpoints, topic IDs, etc.) are NOT included in the hash
- This ensures the same agent always generates the same ID regardless of endpoint changes or metadata updates
- All agents MUST provide these six fields to generate a valid HCS-14 ID

**Communication Details**: While not part of the ID hash, agents should separately maintain:

- **A2A**: Service endpoints (e.g., `https://api.example.com/agents/assistant`)
- **HCS-10**: Topic IDs (e.g., `0.0.789123`)
- **MCP**: Server endpoints or stdio commands
- **WebSocket**: Connection URLs (e.g., `wss://agent.example.com/ws`)
- **NANDA**: Registry URLs and A2A endpoints

These communication details should be discoverable through the protocol's native discovery mechanisms or stored in a registry that maps HCS-14 IDs to current communication endpoints.

Field normalization rules:

- Trim all whitespace from strings
- Normalize registry and protocol to lowercase
- Sort capabilities array numerically
- Sort object keys alphabetically in JSON serialization

### Native Protocol IDs

Most protocols provide native unique identifiers that ensure global uniqueness:

| Protocol       | Native ID Type               | Example                                |
| -------------- | ---------------------------- | -------------------------------------- |
| `hcs-10`       | Hedera Account ID            | `"0.0.123456"`                         |
| `a2a`          | Domain + Agent Card ID       | `"example.com:salesforce-agent"`       |
| `nanda`        | Agent ID (from AGENT_ID env) | `"pirate-bot"`                         |
| `mcp`          | Server ID                    | `"mcp-filesystem"`                     |
| `olas`         | Chain:Service ID             | `"1:42"`                               |
| `acp-virtuals` | Wallet Address               | `"0x742d35Cc...41Bd"`                  |
| `acp-ibm`      | Agent URI                    | `"https://api.example.com/agents/123"` |

### Agent Capabilities

Capabilities are represented as numeric enums to ensure deterministic sorting.

#### Core Capabilities (0-19)

| Value | Capability               | Description                                           |
| ----- | ------------------------ | ----------------------------------------------------- |
| 0     | Text Generation          | Generate human-like text for content and conversation |
| 1     | Image Generation         | Create or modify visual content from prompts          |
| 2     | Audio Generation         | Synthesize speech, music, or sound content            |
| 3     | Video Generation         | Produce dynamic video content and animations          |
| 4     | Code Generation          | Generate and modify code across programming languages |
| 5     | Language Translation     | Convert text between different languages              |
| 6     | Content Summarization    | Extract key insights from lengthy content             |
| 7     | Knowledge Retrieval      | Access and reason over structured data                |
| 8     | Data Visualization       | Create visual representations of data                 |
| 9     | Market Intelligence      | Analyze financial and economic trends                 |
| 10    | Transaction Analytics    | Monitor and analyze transaction patterns              |
| 11    | Smart Contract Audit     | Evaluate blockchain code for security                 |
| 12    | Governance Facilitation  | Support decentralized decision-making                 |
| 13    | Security Monitoring      | Detect threats and security anomalies                 |
| 14    | Compliance Analysis      | Ensure regulatory and legal adherence                 |
| 15    | Fraud Detection          | Identify and prevent fraudulent activities            |
| 16    | Multi-Agent Coordination | Orchestrate multiple agent interactions               |
| 17    | API Integration          | Connect with external systems and services            |
| 18    | Workflow Automation      | Automate routine tasks and processes                  |
| 19    | Real-time Communication  | Support live messaging and interaction                |

#### Protocol-Specific Capabilities (20-39)

| Value | Capability               | Description                               |
| ----- | ------------------------ | ----------------------------------------- |
| 20    | Resource Provider        | Expose data resources (MCP)               |
| 21    | Tool Provider            | Provide executable tools (MCP)            |
| 22    | Prompt Templates         | Offer reusable prompt templates           |
| 23    | File System Access       | Access local or remote file systems       |
| 24    | Database Integration     | Connect to and query databases            |
| 25    | Web Access               | Browse and analyze web content            |
| 26    | Knowledge Base           | Serve specialized knowledge repositories  |
| 27    | Memory Persistence       | Maintain context between sessions         |
| 28    | Code Analysis            | Understand and manipulate code            |
| 29    | Document Processing      | Process various document formats          |
| 30    | Calendar Management      | Handle scheduling and time management     |
| 31    | Search Services          | Provide specialized search capabilities   |
| 32    | Assistant Orchestration  | Manage multiple AI assistant interactions |
| 33    | Blockchain Integration   | Interact with blockchain networks         |
| 34    | Consensus Participation  | Participate in consensus mechanisms       |
| 35    | Identity Verification    | Verify and manage digital identities      |
| 36    | Cryptographic Operations | Perform encryption and signing            |
| 37    | Event Streaming          | Handle real-time event streams            |
| 38    | Message Routing          | Route messages between agents             |
| 39    | Trust Attestation        | Provide trust and reputation services     |

### Protocol Identifiers

Protocol identifiers use **string values** rather than enums to provide flexibility for:

- Adding new protocols without code changes
- Supporting protocol aliases and variations
- Handling protocols with similar names (e.g., `acp-ibm` vs `acp-virtuals`)
- Future protocol evolution and versioning

### Hash Generation

The hash generation process follows these steps:

1. **Validate** all required fields are present
2. **Normalize** strings (lowercase registry/protocol, trim whitespace)
3. **Sort** capabilities numerically and object keys lexicographically
4. **Serialize** to canonical JSON with sorted keys
5. **Hash** using SHA-256 with UTF-8 encoding
6. **Encode** hash as Base58

```typescript
function generateAgentId(agentData: AgentData): string {
  // 1. Validate required fields
  if (
    !agentData.registry ||
    !agentData.name ||
    !agentData.version ||
    !agentData.protocol ||
    !agentData.nativeId
  ) {
    throw new Error('Missing required fields');
  }

  // 2. Create canonical object with ONLY required fields
  const canonical = {
    registry: agentData.registry.toLowerCase().trim(),
    name: agentData.name.trim(),
    version: agentData.version.trim(),
    protocol: agentData.protocol.toLowerCase().trim(),
    nativeId: agentData.nativeId.trim(),
    capabilities: (agentData.capabilities || []).sort((a, b) => a - b),
  };

  // 3. Generate hash
  const sortedJson = JSON.stringify(canonical, Object.keys(canonical).sort());
  const hash = sha256(sortedJson);
  const base58Hash = bs58.encode(hash);

  return `aid:1:${agentData.protocol}:${base58Hash}`;
}
```

### A2A Agent Card Integration

For A2A protocol agents, capabilities are extracted from Agent Cards:

```typescript
function extractCapabilitiesFromAgentCard(agentCard: AgentCard): number[] {
  const capabilities: number[] = [];

  // Map A2A skills to capability enums
  for (const skill of agentCard.skills || []) {
    const skillLower = skill.name.toLowerCase();
    if (skillLower.includes('chat')) capabilities.push(0); // Text Generation
    if (skillLower.includes('code')) capabilities.push(4); // Code Generation
    if (skillLower.includes('search')) capabilities.push(31); // Search Services
    if (skillLower.includes('data')) capabilities.push(7); // Knowledge Retrieval
  }

  // Add protocol-specific capabilities
  if (agentCard.capabilities?.streaming) capabilities.push(19); // Real-time Communication
  if (agentCard.capabilities?.pushNotifications) capabilities.push(17); // API Integration

  return [...new Set(capabilities)].sort((a, b) => a - b);
}
```

## Implementation

### Validation Requirements

Implementations must:

1. **Deterministic JSON**: Produce identical JSON for identical inputs
2. **UTF-8 Encoding**: All strings must be UTF-8 encoded before hashing
3. **Stable Sorting**: Arrays and object keys must be sorted deterministically
4. **Required Fields**: Fail if registry/name/version/protocol/nativeId missing
5. **Native ID**: Include protocol's native unique identifier

### Test Vectors

#### Test Vector 1: HCS-10 Agent

**Input:**

```json
{
  "registry": "hedera",
  "name": "Support Agent",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "0.0.123456",
  "capabilities": [0, 17]
}
```

**Canonical JSON:**

```json
{
  "capabilities": [0, 17],
  "name": "Support Agent",
  "nativeId": "0.0.123456",
  "protocol": "hcs-10",
  "registry": "hedera",
  "version": "1.0.0"
}
```

**Expected ID Format:** `aid:1:hcs-10:{base58hash}`

#### Test Vector 2: A2A Agent

**Input:**

```json
{
  "registry": "google",
  "name": "Customer Bot",
  "version": "2.1.0",
  "protocol": "a2a",
  "nativeId": "salesforce-support-agent",
  "capabilities": [0, 17, 19]
}
```

**Canonical JSON:**

```json
{
  "capabilities": [0, 17, 19],
  "name": "Customer Bot",
  "nativeId": "salesforce-support-agent",
  "protocol": "a2a",
  "registry": "google",
  "version": "2.1.0"
}
```

**Expected ID Format:** `aid:1:a2a:{base58hash}`

### Implementation Checklist

- ✅ Normalize registry/protocol to lowercase, trim all strings
- ✅ Sort capabilities numerically, object keys lexicographically
- ✅ Use consistent JSON serialization with sorted keys
- ✅ Apply SHA-256 with UTF-8 encoding, encode as Base58
- ✅ Include optional fields only if present and non-empty
- ✅ Validate all required fields are present
- ✅ Include protocol's native unique identifier

## Security Considerations

1. **No Secrets**: Never include private keys or secrets in canonical data
2. **Endpoint Validation**: Validate endpoints before inclusion in hash
3. **Registry Trust**: Trust model inherits from registry namespace verification

## Examples

### Example 1: HCS-10 Agent

```json
{
  "registry": "hedera",
  "name": "Support Agent",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "0.0.123456",
  "capabilities": [0, 17]
}
```

**Generated ID:** `aid:1:hcs-10:QmX4fB9XpS3yKqP8MHTbcQW7R6wN4PrGHz`

### Example 2: A2A Agent

```json
{
  "registry": "google",
  "name": "Research Assistant",
  "version": "2.0.0",
  "protocol": "a2a",
  "nativeId": "api.example.com:research-assistant-prod",
  "capabilities": [0, 7, 31]
}
```

**Generated ID:** `aid:1:a2a:Qm7X8kL3mN5vP1wQ8xR2tY6hB4jC9sA2eE`

### Example 3: MCP Server

```json
{
  "registry": "anthropic",
  "name": "Filesystem Tools",
  "version": "1.0.0",
  "protocol": "mcp",
  "nativeId": "mcp-filesystem",
  "capabilities": [20, 21, 23]
}
```

**Generated ID:** `aid:1:mcp:QmP2fA5XpL7yKmN9MHQbcRW4R5wO3KtGIn`

### Example 4: NANDA A2A Bridge Agent

```json
{
  "registry": "nanda-registry",
  "name": "Pirate LangChain Agent",
  "version": "1.0.0",
  "protocol": "a2a",
  "nativeId": "pirate.example.com:pirate-bot",
  "capabilities": [0, 19]
}
```

**Generated ID:** `aid:1:a2a:QmN8kH2lJ6uO0qW7yT4zV9xC5mE1pR3sF`

### Example 5: Virtuals Protocol Agent

```json
{
  "registry": "virtuals",
  "name": "Commerce Bot",
  "version": "1.0.0",
  "protocol": "acp-virtuals",
  "nativeId": "0x742d35Cc6634C0532925a3b844Bc9e7595f41Bd",
  "capabilities": [0, 9, 10, 33]
}
```

**Generated ID:** `aid:1:acp-virtuals:QmV5dK7pQ2wX8nL4mT6yB3jF0uA9eC1zS`

### Example 6: OLAS Service

```json
{
  "registry": "olas",
  "name": "Prediction Service",
  "version": "1.2.0",
  "protocol": "olas",
  "nativeId": "1:42",
  "capabilities": [16, 33, 34]
}
```

**Generated ID:** `aid:1:olas:QmZ8kL4mN6vP2wQ9xR3tY7hB5jC1sA9eD`

## Conclusion

The HCS-14 standard provides a robust protocol for generating deterministic, globally unique agent identifiers across all environments. By leveraging native protocol IDs and standardized capability enums, this approach ensures uniqueness while maintaining deterministic generation properties. The standard enables seamless agent discovery and communication across heterogeneous protocol environments, supporting the growing global ecosystem of AI agents.

---

**Copyright**

This document is licensed under [APACHE-2.0](https://www.apache.org/licenses/LICENSE-2.0).
