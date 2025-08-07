---
title: HCS-14 - Universal Agent ID Standard
description: The HCS-14 standard provides a systematic approach for generating globally unique identifiers for AI agents that work across both web2 and web3 environments.
sidebar_position: 14
---

# HCS-14 Standard: Universal Agent ID Standard

### Status: Draft

### Table of Contents

- [HCS-14 Standard: Universal Agent ID Standard](#hcs-14-standard-universal-agent-id-standard)
    - [Status: Draft](#status-draft)
    - [Table of Contents](#table-of-contents)
  - [Authors](#authors)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Specification](#specification)
    - [Guiding Principles](#guiding-principles)
    - [DID Structure](#did-structure)
      - [Registry-Generated Identifiers (AID Method)](#registry-generated-identifiers-aid-method)
      - [Self-Sovereign Identifiers (UDID Method)](#self-sovereign-identifiers-udid-method)
    - [DID Parameter Structure](#did-parameter-structure)
      - [Hash Generation Methods](#hash-generation-methods)
  - [DID Method Selection](#did-method-selection)
    - [Supported Agent Protocols](#supported-agent-protocols)
    - [Canonical Agent Data](#canonical-agent-data)
    - [Native Protocol IDs](#native-protocol-ids)
    - [Agent Skills](#agent-skills)
      - [Core Skills (0-19)](#core-skills-0-19)
      - [Protocol-Specific Skills (20-39)](#protocol-specific-skills-20-39)
    - [Protocol Identifiers](#protocol-identifiers)
    - [Hash Generation](#hash-generation)
    - [A2A Agent.json Integration](#a2a-agentjson-integration)
  - [Implementation](#implementation)
    - [Validation Requirements](#validation-requirements)
    - [Test Vectors](#test-vectors)
      - [Test Vector 1: HCS-10 Agent](#test-vector-1-hcs-10-agent)
      - [Test Vector 2: A2A Agent](#test-vector-2-a2a-agent)
    - [Implementation Requirements](#implementation-requirements)
  - [Security Considerations](#security-considerations)
  - [Examples](#examples)
    - [Example 1: HCS-10 Agent](#example-1-hcs-10-agent)
    - [Example 2: A2A Agent (Microsoft)](#example-2-a2a-agent-microsoft)
    - [Example 3: MCP Server](#example-3-mcp-server)
    - [Example 4: Self-Sovereign Agent (UDID)](#example-4-self-sovereign-agent-udid)
    - [Example 5: Virtuals Protocol Agent](#example-5-virtuals-protocol-agent)
    - [Example 6: OLAS Service](#example-6-olas-service)
  - [Method Selection Guidelines](#method-selection-guidelines)
    - [When to Use AID Method (`did:aid:`)](#when-to-use-aid-method-didaid)
    - [When to Use UDID Method (`did:udid:`)](#when-to-use-udid-method-didudid)
  - [Conclusion](#conclusion)

## Authors

- Kantorcodes [https://x.com/kantorcodes](https://x.com/kantorcodes)
- Patches [https://x.com/TMCC_Patches](https://x.com/TMCC_Patches)

## Abstract

The HCS-14 standard provides a systematic approach for generating globally unique identifiers for AI agents using the W3C Decentralized Identifier (DID) framework. By introducing dual DID methods (AID for registry-generated and UDID for self-sovereign identifiers), this standard enables consistent agent identification across web2 APIs, web3 protocols, and hybrid systems without requiring any specific infrastructure dependencies. Both methods embed routing information directly in the DID, making agent discovery and communication seamless across protocol boundaries.

## Motivation

AI agents are proliferating across diverse platforms with different identification systems. Each protocol has evolved sophisticated identification systems optimized for their specific use cases - Web2 platforms provide stable API-based identifiers, blockchain systems leverage cryptographic addresses, consensus-based networks utilize account IDs, and decentralized registries implement database-optimized identifiers. While each approach works well within its protocol, cross-protocol coordination remains difficult:

**Cross-Protocol Collaboration**: As agents become more sophisticated, they increasingly need to work together across protocol boundaries. A research agent on one protocol might need to collaborate with a data analysis agent on another, or a creative agent might need to coordinate with a transaction agent on a different network. Enabling seamless collaboration amplifies the capabilities of all agents.

**Unified Discovery**: Each protocol has developed robust discovery mechanisms within their ecosystem. By creating a universal identification layer, we can build on these existing systems to enable agents to discover potential collaborators across all protocols, expanding the possibilities for agent interactions.

**Trust Bridge Building**: Different protocols have implemented innovative trust and verification mechanisms suited to their architectures. A universal ID system can serve as a bridge between these trust models, allowing protocols to maintain their security approaches while enabling cross-protocol verification.

**Simplified Integration**: Developers building multi-agent systems currently need to implement custom translation and routing for each protocol pair. A universal identification standard reduces this complexity, allowing developers to focus on agent capabilities rather than integration challenges.

The HCS-14 standard builds upon these opportunities by introducing universal, self-describing agent identifiers that complement existing protocol identification systems. By respecting and leveraging each protocol's native unique identifiers while adding a universal layer, we create a system where:

- **Any agent can be uniquely identified** regardless of its native protocol
- **Dual identification methods** - deterministic generation for discovered agents (AID) or preservation of existing DIDs (UDID)
- **No central authority is required** - anyone can generate and verify IDs
- **Cross-protocol communication becomes trivial** - IDs contain routing information
- **Protocol-native identity** - agents maintain their protocol-specific identities while gaining universal discoverability
- **Trust can be verified cryptographically** - the ID itself proves the agent's properties

## Specification

### Guiding Principles

The HCS-14 standard is built on six foundational principles that ensure its universality and longevity:

1. **Decentralized Generation**: No central registry, no governing body, no permission required. Anyone can generate valid HCS-14 IDs using only the agent's public data and the standard's algorithm. This follows the permissionless model used in both Web2 API development and Web3 smart contract deployment.

2. **Self-Describing Structure**: The DID itself contains enough information to route messages to the agent without external lookups. By embedding registry and native ID information in the DID parameters (`did:udid:hash;registry=...;nativeId=...`), we enable direct routing across protocol boundaries - a critical feature for true interoperability.

3. **Cryptographic Verifiability**: Any party can verify that an HCS-14 ID correctly represents an agent by regenerating it from the agent's public data. This creates a trustless system where the ID itself is the proof of authenticity, eliminating the need for certificate authorities or attestation services.

4. **Collision-Resistant Design**: By using SHA-384 hashing with carefully structured canonical data, we achieve cryptographic assurance against ID collisions. The probability of two different agents generating the same ID is effectively zero (2^-384), ensuring global uniqueness without coordination.

5. **Protocol-Agnostic Architecture**: Whether an agent operates through centralized API infrastructure, runs as a smart contract, or leverages consensus mechanisms, the HCS-14 ID works the same way. This universality creates bridges between Web2 and Web3, enabling agents to communicate across different infrastructures while respecting each protocol's unique strengths.

6. **Future-Proof Evolution**: The DID framework and parameter structure allow the standard to evolve without breaking existing implementations. New parameters can be added while maintaining backward compatibility, ensuring that early adopters aren't left behind as the ecosystem grows.

### DID Structure

The HCS-14 standard uses the W3C DID format with two complementary methods:

#### Registry-Generated Identifiers (AID Method)

```
did:aid:{hash};{parameters}
```

#### Self-Sovereign Identifiers (UDID Method)

```
did:udid:{hash};{parameters}
```

Where:

- `did` = W3C DID prefix
- `aid` = Agent Identifier method (system-generated)
- `udid` = Universal Deterministic Identifier method (self-sovereign)
- `hash` = Base58-encoded identifier hash
- `parameters` = Semicolon-separated key-value pairs for routing

### DID Parameter Structure

Both AID and UDID methods use identical parameter structures for routing:

```
did:{method}:{hash};{optional_parameters}
```

Example with common parameters:

```
did:{method}:{hash};registry={registry};proto={protocol};nativeId={nativeId};uid={uid}
```

Parameter definitions:

- `method` = Either "aid" or "udid"
- `registry` = Registry namespace (e.g., "nanda", "hol", "olas")
- `proto` = Protocol identifier (e.g., "hcs-10", "a2a", "mcp")
- `nativeId` = Protocol's native unique identifier (Ed25519 or ECDSA public key hex for HCS-10, domain for A2A/NANDA)
- `uid` = Unique identifier within the registry (e.g., agent name for NANDA, account ID for HCS-10)

Note: Both `registry` and `proto` can be specified together as they serve different purposes - registry indicates the organization/namespace while proto indicates the communication protocol. The uid parameter is required and should be "0" if not applicable.

#### Hash Generation Methods

**AID Method:**

- Hash computed from canonical JSON of 6 agent fields (registry, name, version, protocol, nativeId, skills)
- Deterministic - same agent data always produces same hash
- Used when agents don't have existing W3C DIDs

**UDID Method:**

- Hash extracted from agent's existing W3C DID (e.g., did:key:, did:web:, did:ethr:)
- Used when agents already have established DID identities
- Respects agent autonomy and existing identity infrastructure

## DID Method Selection

```mermaid
flowchart TD
    A["Agent Identifier Needed"] --> B{"Agent has existing W3C DID?"}
    B -->|No| C["Use AID Method"]
    B -->|Yes| D["Use UDID Method"]

    C --> E["Generate hash from<br/>6 canonical fields"]
    E --> F["did:aid:{hash};params"]

    D --> G["Extract hash from<br/>existing W3C DID"]
    G --> H["did:udid:{hash};params"]

    F --> I["Universal Agent Discovery"]
    H --> I
```

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
  "skills": [number]   // Array of capability enum values (0-39)
}
```

**IMPORTANT**: To ensure deterministic ID generation:

- The hash is computed using ONLY the six required fields above
- Communication details (endpoints, topic IDs, etc.) are NOT included in the hash
- This ensures the same agent always generates the same ID regardless of endpoint changes or metadata updates
- All agents MUST provide these six fields to generate a valid HCS-14 ID
- For self-sovereign agents where no specific registry applies, the registry field MUST be set to "self"

**Communication Details**: While not part of the ID hash, agents should separately maintain:

- **A2A**: agent.json file at `/.well-known/agent.json` on the domain with service endpoint URL
- **HCS-10**: Topic IDs (e.g., `0.0.789123`) - stored in the uid parameter
- **MCP**: Server endpoints or stdio commands
- **WebSocket**: Connection URLs (e.g., `wss://agent.example.com/ws`)
- **NANDA**: Registry URLs and A2A endpoints

These communication details should be discoverable through the protocol's native discovery mechanisms or stored in a registry that maps HCS-14 DIDs to current communication endpoints. For HCS-10 agents, the uid parameter contains the Hedera account ID.

Field normalization rules:

- Trim all whitespace from strings
- Normalize registry and protocol to lowercase
- Sort skills array numerically
- Sort object keys alphabetically in JSON serialization

### Native Protocol IDs

Most protocols provide native unique identifiers that ensure global uniqueness:

| Protocol       | Native ID Type               | Example                                  |
| -------------- | ---------------------------- | ---------------------------------------- |
| `hcs-10`       | Ed25519 or ECDSA Public Key  | `"e7d59d8bff3f9e1784cd4e7f340fb..."` (hex) |
| `a2a`          | Domain hosting agent.json    | `"microsoft.com"`                        |
| `nanda`        | Agent ID (from AGENT_ID env) | `"pirate-bot"`                           |
| `mcp`          | Server ID                    | `"mcp-filesystem"`                       |
| `olas`         | Chain:Service ID             | `"1:42"`                                 |
| `acp-virtuals` | Wallet Address               | `"0x742d35Cc...41Bd"`                    |
| `acp-ibm`      | Agent URI                    | `"https://api.example.com/agents/123"`   |

Note: For HCS-10 agents, the nativeId should be the actual public key (Ed25519 or ECDSA) in hex format. For A2A agents, the nativeId is the domain hosting the agent.json file at `/.well-known/agent.json`, with the agent name/ID stored in the uid parameter.

### Agent Skills

Skills are represented as numeric enums to ensure deterministic sorting, aligned with A2A protocol terminology.

#### Core Skills (0-19)

| Value | Skill                    | Description                                           |
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

#### Protocol-Specific Skills (20-39)

| Value | Skill                    | Description                               |
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
5. **Hash** using SHA-384 with UTF-8 encoding
6. **Encode** hash as Base58

```typescript
function generateAgentDID(agentData: AgentData): string {
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
    skills: (agentData.capabilities || []).sort((a, b) => a - b),
  };

  // 3. Generate hash
  const sortedJson = JSON.stringify(canonical, Object.keys(canonical).sort());
  const hash = sha384(sortedJson);
  const base58Hash = bs58.encode(hash);

  // 4. Build DID with parameters
  const params = [];

  // Use registry or proto parameter
  if (agentData.useProtocol) {
    params.push(`proto=${agentData.protocol}`);
  } else {
    params.push(`registry=${agentData.registry}`);
  }

  params.push(`nativeId=${agentData.nativeId}`);

  // Add uid if provided
  if (agentData.uid) {
    params.push(`uid=${agentData.uid}`);
  }

  return `did:udid:${base58Hash};${params.join(';')}`;
}
```

### A2A Agent.json Integration

For A2A protocol agents, skills are extracted from the skills array in the domain's `/.well-known/agent.json` file:

```typescript
function extractSkillsFromA2AAgent(agentCard: A2AAgentCard): number[] {
  const skills: number[] = [];

  // Map A2A skills to HCS-14 skill enums
  for (const skill of agentCard.skills || []) {
    const skillName = skill.name.toLowerCase();
    const skillDesc = skill.description.toLowerCase();

    if (skillName.includes('chat') || skillName.includes('conversation')) {
      skills.push(0); // Text Generation
    }
    if (skillName.includes('search') || skillName.includes('query')) {
      skills.push(31); // Search Services
    }
    if (skillName.includes('data') || skillDesc.includes('retrieve')) {
      skills.push(7); // Knowledge Retrieval
    }
    if (skillName.includes('code') || skillName.includes('generate')) {
      skills.push(4); // Code Generation
    }
  }

  // Add capabilities-based skills
  if (agentCard.capabilities?.streaming) {
    skills.push(19); // Real-time Communication
  }
  if (agentCard.capabilities?.pushNotifications) {
    skills.push(17); // API Integration
  }

  // All A2A agents have API Integration capability
  skills.push(17); // API Integration

  return [...new Set(skills)].sort((a, b) => a - b);
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
  "registry": "hol",
  "name": "Support Agent",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "e7d59d8bff3f9e1784cd4e7f340fb1a7333ee264fed4beb0b38fe7e4d29d04",
  "skills": [0, 17]
}
```

**Canonical JSON:**

```json
{
  "skills": [0, 17],
  "name": "Support Agent",
  "nativeId": "e7d59d8bff3f9e1784cd4e7f340fb1a7333ee264fed4beb0b38fe7e4d29d04",
  "protocol": "hcs-10",
  "registry": "hol",
  "version": "1.0.0"
}
```

**Expected DID Format:** `did:udid:{base58hash};registry=hol;nativeId=302a300506032b6570032100e7d59d8bff3f9e1784cd4e7f340fb1a7333ee264fed4beb0b38fe7e4d29d04;uid=0.0.123456`

#### Test Vector 2: A2A Agent

**Input:**

```json
{
  "registry": "google",
  "name": "Customer Bot",
  "version": "2.1.0",
  "protocol": "a2a",
  "nativeId": "salesforce-support-agent",
  "skills": [0, 17, 19]
}
```

**Canonical JSON:**

```json
{
  "skills": [0, 17, 19],
  "name": "Customer Bot",
  "nativeId": "salesforce-support-agent",
  "protocol": "a2a",
  "registry": "google",
  "version": "2.1.0"
}
```

**Expected DID Format:** `did:udid:{base58hash};registry=google;nativeId=salesforce.com;uid=support-agent`

### Implementation Requirements

Implementations MUST comply with the following technical specifications:

1. **String Normalization**: Registry and protocol fields MUST be converted to lowercase. All string fields MUST have leading and trailing whitespace removed.

2. **Deterministic Serialization**: JSON objects MUST be serialized with keys sorted lexicographically. Skills arrays MUST be sorted numerically in ascending order.

3. **Hash Generation**: SHA-256 MUST be applied to UTF-8 encoded canonical JSON. The resulting hash MUST be encoded using Base58.

4. **Field Validation**: All required fields (registry, name, version, protocol, nativeId, skills) MUST be present and non-empty.

5. **Native Identifier**: The nativeId field MUST contain the protocol's canonical unique identifier as specified in the Native Protocol IDs table.

6. **Skills Array**: The skills field MUST contain an array of numeric skill identifiers. Empty arrays are permitted.

## Security Considerations

1. **No Secrets**: Never include private keys or secrets in canonical data
2. **Endpoint Validation**: Validate endpoints before inclusion in hash
3. **Registry Trust**: Trust model inherits from registry namespace verification

## Examples

### Example 1: HCS-10 Agent

```json
{
  "registry": "hol",
  "name": "Support Agent",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "e7d59d8bff3f9e1784cd4e7f340fb1a7333ee264fed4beb0b38fe7e4d29d04",
  "skills": [0, 17]
}
```

**Generated DID:** `did:udid:QmX4fB9XpS3yKqP8MHTbcQW7R6wN4PrGHz;registry=hol;nativeId=302a300506032b6570032100e7d59d8bff3f9e1784cd4e7f340fb1a7333ee264fed4beb0b38fe7e4d29d04;uid=0.0.123456`

### Example 2: A2A Agent (Microsoft)

```json
{
  "registry": "microsoft",
  "name": "Customer Support Assistant",
  "version": "1.0.0",
  "protocol": "a2a",
  "nativeId": "microsoft.com",
  "skills": [0, 7, 17, 31]
}
```

**Generated DID (AID):** `did:aid:Qm7X8kL3mN5vP1wQ8xR2tY6hB4jC9sA2eE;registry=microsoft;nativeId=microsoft.com;uid=customer-support-assistant`

_Note: uid references the agent name from Microsoft's agent.json file hosted at microsoft.com/.well-known/agent.json_

### Example 3: MCP Server

```json
{
  "registry": "anthropic",
  "name": "Filesystem Tools",
  "version": "1.0.0",
  "protocol": "mcp",
  "nativeId": "mcp-filesystem",
  "skills": [20, 21, 23]
}
```

**Generated DID:** `did:udid:QmP2fA5XpL7yKmN9MHQbcRW4R5wO3KtGIn;registry=anthropic;nativeId=mcp-filesystem;uid=0`

### Example 4: Self-Sovereign Agent (UDID)

```json
{
  "registry": "hol",
  "name": "AI Assistant",
  "version": "1.0.0",
  "protocol": "hcs-10",
  "nativeId": "302a300506032b65700321009f8d5e7c6b3a2f1e4d9c8b7a6e5f4e3d2c1b0a9e8d7c6b5a4f3e2d1c0b9a8e7d",
  "skills": [0, 19]
}
```

**Scenario:** Agent already has W3C DID: `did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK`
**Generated DID (UDID):** `did:udid:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK;proto=hcs-10;nativeId=302a300506032b65700321009f8d5e7c6b3a2f1e4d9c8b7a6e5f4e3d2c1b0a9e8d7c6b5a4f3e2d1c0b9a8e7d;uid=0.0.123456`

_Note: Hash (z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK) extracted from agent's existing did:key DID_

### Example 5: Virtuals Protocol Agent

```json
{
  "registry": "virtuals",
  "name": "Commerce Bot",
  "version": "1.0.0",
  "protocol": "acp-virtuals",
  "nativeId": "0x742d35Cc6634C0532925a3b844Bc9e7595f41Bd",
  "skills": [0, 9, 10, 33]
}
```

**Generated DID:** `did:udid:QmV5dK7pQ2wX8nL4mT6yB3jF0uA9eC1zS;registry=virtuals;nativeId=0x742d35Cc6634C0532925a3b844Bc9e7595f41Bd;uid=0`

### Example 6: OLAS Service

```json
{
  "registry": "olas",
  "name": "Prediction Service",
  "version": "1.2.0",
  "protocol": "olas",
  "nativeId": "1:42",
  "skills": [16, 33, 34]
}
```

**Generated DID:** `did:udid:QmZ8kL4mN6vP2wQ9xR3tY7hB5jC1sA9eD;registry=olas;nativeId=1:42;uid=0`

## Method Selection Guidelines

### When to Use AID Method (`did:aid:`)

**Use for system-generated identifiers when:**

- Agents don't have existing W3C DIDs
- Systems need to create deterministic IDs for discovered agents
- Legacy systems or protocols that don't support DIDs
- Most common use case for discovery and indexing systems
- Default method for most current AI agents

### When to Use UDID Method (`did:udid:`)

**Use for self-sovereign identifiers when:**

- Agent already has an established W3C DID identity
- Agent generates its own identifier and wants autonomy
- Cross-chain or cross-protocol agent migration scenarios
- Advanced agents with sophisticated identity management
- Future-proofing for fully decentralized agent ecosystems

## Conclusion

The HCS-14 standard provides a robust protocol for generating deterministic, globally unique agent identifiers using the W3C DID framework. By introducing both AID (registry-generated) and UDID (self-sovereign) methods, this approach supports current registry-based discovery systems while enabling future self-sovereign agent ecosystems. The semicolon-separated parameter format allows agents to be located in their origin registries while maintaining the benefits of decentralized identifiers. This dual approach enables seamless agent discovery and communication across heterogeneous protocol environments, supporting both today's and tomorrow's AI agent architectures.

---

**Copyright**

This document is licensed under [APACHE-2.0](https://www.apache.org/licenses/LICENSE-2.0).
