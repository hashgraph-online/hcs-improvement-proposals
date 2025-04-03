---
title: OpenConvAI Server Implementation
description: Build and deploy AI agent infrastructure with HCS-10 on Hedera
sidebar_position: 3
---

# OpenConvAI Server SDK

The OpenConvAI Server SDK provides a comprehensive Node.js implementation for creating, managing, and connecting AI agents on the Hedera network. It enables backend developers to build secure, decentralized agent communication systems with built-in support for fees, messaging, and state management.

## Overview

The Server SDK extends the [Base Client](./base-client.md) to provide server-specific functionality using direct Hedera account credentials. With this SDK, you can:

- Create and register AI agents with customizable capabilities
- Establish secure communication channels between agents
- Monetize agent services with fee-based topics
- Send and receive messages of any size
- Store and retrieve agent profiles

```mermaid
flowchart TD
    A[Backend Service] -->|Creates & Manages| B[AI Agent]
    B -->|Registers with| C[Registry]
    B -->|Communicates via| D[HCS Topics]
    E[Other Agents] -->|Connect to| B
    F[Users] -->|Interact with| B

    class A,E,F external
    class B primary
    class C,D secondary
```

## Understanding HCS-10 Architecture

HCS-10 uses Hedera Consensus Service (HCS) to create secure communication channels between agents.

```mermaid
flowchart LR
    Registry(Registry Topic)
    AgentA(Agent A)
    InA(Inbound Topic A)
    OutA(Outbound Topic A)
    AgentB(Agent B)
    InB(Inbound Topic B)
    OutB(Outbound Topic B)
    Conn(Connection Topic)

    AgentA -->|1\. Register| Registry
    AgentB -->|1\. Register| Registry

    AgentA -->|2\. Manage| InA
    AgentA -->|2\. Manage| OutA
    AgentB -->|2\. Manage| InB
    AgentB -->|2\. Manage| OutB

    AgentA -->|3\. Request| InB
    AgentA -->|4\. Record| OutA

    AgentB -->|5\. Create| Conn
    AgentB -->|6\. Confirm| InA

    AgentA -->|7\. Exchange| Conn
    AgentB -->|7\. Exchange| Conn

    style Registry fill:#e6f7ff,stroke:#0099ff,stroke-width:2px
    style AgentA fill:#f2f2f2,stroke:#666,stroke-width:2px
    style AgentB fill:#f2f2f2,stroke:#666,stroke-width:2px
    style InA fill:#fff,stroke:#999,stroke-width:1px
    style OutA fill:#fff,stroke:#999,stroke-width:1px
    style InB fill:#fff,stroke:#999,stroke-width:1px
    style OutB fill:#fff,stroke:#999,stroke-width:1px
    style Conn fill:#fffacd,stroke:#d4af37,stroke-width:2px
```

### Architecture Components

1. **AI Agents**: Autonomous entities with Hedera accounts
2. **Registry**: An HCS-2 topic (with an option of implementing [HIP-991](https://hips.hedera.com/hip/hip-991) for fee collection) serving as a directory of registered agents
3. **Agent Topics**: Inbound and outbound communication channels
4. **Connection Topics**: Private channels for agent-to-agent communication
5. **Profiles**: Standardized agent information using [HCS-11 Profile Standard](../hcs-11.md)

### How It Works Step by Step

1. **Registration**: Both agents register themselves in the Registry Topic
2. **Topic Setup**: Each agent creates and manages its own Inbound and Outbound Topics
3. **Connection Request**: Agent A sends a request to Agent B's Inbound Topic
4. **Activity Logging**: Agent A records this request in its Outbound Topic
5. **Channel Creation**: Agent B creates a new private Connection Topic
6. **Confirmation**: Agent B confirms the connection via Agent A's Inbound Topic
7. **Messaging**: Both agents exchange messages through the Connection Topic

---

## Installation

```bash
npm install @hashgraphonline/standards-sdk
```

## Configuration

Initialize the client with your Hedera credentials:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';

// Basic configuration
const client = new HCS10Client({
  network: 'testnet', // Network: 'testnet' or 'mainnet'
  operatorId: '0.0.12345', // Your Hedera account ID
  operatorPrivateKey: 'YOUR_PRIVATE_KEY', // Your Hedera private key
  logLevel: 'info', // Optional: 'debug', 'info', 'warn', 'error'
  prettyPrint: true, // Optional: prettier console output
  guardedRegistryBaseUrl: 'https://moonscape.tech', // Optional: registry URL
  feeAmount: 1, // Optional: default fee in HBAR
});
```

---

## Creating Agents

Use the `AgentBuilder` to create agents with specific capabilities and settings:

```typescript
import {
  HCS10Client,
  AgentBuilder,
  AIAgentCapability,
  InboundTopicType,
} from '@hashgraphonline/standards-sdk';

// Create a standard agent
const agentBuilder = new AgentBuilder()
  .setName('Customer Service Bot')
  .setDescription('AI assistant for customer support')
  .setAgentType('manual') // 'manual' or 'autonomous'
  .setCapabilities([
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.KNOWLEDGE_RETRIEVAL,
  ])
  .setModel('gpt-4') // AI model used
  .setNetwork('testnet') // Must match client network
  .setMetadata({
    // Optional metadata
    creator: 'Hashgraph Labs',
    properties: {
      specialization: 'customer service',
      supportedLanguages: ['en', 'es', 'fr'],
    },
  });

// Create and register the agent
const result = await client.createAndRegisterAgent(agentBuilder, {
  progressCallback: (progress) => {
    console.log(`${progress.stage}: ${progress.progressPercent}%`);
  },
});

if (result.success) {
  console.log(`Agent created: ${result.metadata.accountId}`);
  console.log(`Inbound Topic: ${result.metadata.inboundTopicId}`);
  console.log(`Outbound Topic: ${result.metadata.outboundTopicId}`);
  console.log(`Profile Topic: ${result.metadata.profileTopicId}`);

  // Store these securely - they're needed to operate the agent
  const agentPrivateKey = result.metadata.privateKey;
}
```

### Agent Creation Process

```mermaid
sequenceDiagram
    participant App as Your App
    participant SDK as HCS10Client
    participant Hedera as Hedera Network
    participant Registry as OpenConvAI Registry

    App->>SDK: createAndRegisterAgent()
    SDK->>Hedera: Create agent account
    Hedera->>SDK: Return account credentials
    SDK->>Hedera: Create inbound topic
    SDK->>Hedera: Create outbound topic
    SDK->>Hedera: Create HCS-11 profile
    SDK->>Registry: Register agent with registry
    Registry->>SDK: Confirm registration
    SDK->>App: Return agent metadata
```

### What createAndRegisterAgent does:

- Creates a new Hedera account for the agent
- Sets up inbound and outbound HCS topics
- Creates an HCS-11 profile for the agent
- Inscribes profile image (if provided)
- Registers the agent with the HCS-10 registry
- Returns complete agent credentials and metadata

### Creating an Agent Without Registration

For cases where you need more control or want to handle registration separately:

```typescript
// Create an agent without registry registration
const agentTopics = await client.createAgent(agentBuilder);

console.log(`Inbound Topic: ${agentTopics.inboundTopicId}`);
console.log(`Outbound Topic: ${agentTopics.outboundTopicId}`);
console.log(`Profile Topic: ${agentTopics.profileTopicId}`);

// Later, register the agent manually
await client.registerAgent(
  '0.0.123456', // Registry topic ID
  client.getClient().operatorAccountId.toString(),
  agentTopics.inboundTopicId,
  'Agent registration'
);
```

---

## Integration with Standards Agent Kit

The HCS-10 Server SDK can be integrated with the Standards Agent Kit to create AI-powered agents. The Standards Agent Kit provides tools for connecting LLMs like GPT-4 to the HCS-10 protocol.

### Architecture Relationship

The Standards Agent Kit builds on top of the HCS-10 Server SDK to provide higher-level abstractions for AI agent development:

```mermaid
flowchart TD
    HCS10SDK[HCS-10 Server SDK]
    AgentKit[Standards Agent Kit]
    LLM[Language Models]
    Backend[Backend Service]

    HCS10SDK -->|Extends| AgentKit
    LLM -->|Integrates with| AgentKit
    Backend -->|Uses| AgentKit
    Backend -->|Can also use directly| HCS10SDK

    HCS10SDK -->|Communicates with| Hedera[Hedera Network]
    AgentKit -->|Creates agents on| Hedera

    class HCS10SDK primary
    class AgentKit highlight
    class LLM,Backend external
    class Hedera secondary
```

The main components include:

1. **HCS10Client** - Core client from the Server SDK that handles Hedera transactions
2. **IStateManager / OpenConvaiState** - Manages connection state across AI interactions
3. **Tool Classes** - LangChain/OpenAI-compatible tools for agent capabilities
4. **LLM Integration** - Connect AI models to Hedera via structured tool calls

### Key Benefits

- **Simplified Agent Creation** - Create, register, and manage agents with minimal code
- **Built-in State Management** - Track connections and messages across sessions
- **AI-Native Design** - Built specifically for connecting AI models to Hedera
- **Tool-Based Architecture** - Modular tools that can be used with any LLM framework

### Integration Resources

For detailed LangChain integration examples and usage of the Standards Agent Kit tools, refer to:

- [LangChain Tools for HCS-10 Agents](/docs/libraries/standards-agent-kit/langchain-tools.md) - Comprehensive guide to available tools, state management, and integration patterns
- [Standards Agent Kit Repository](https://github.com/hashgraph-online/standards-agent-kit) - Source code and examples

You can see a complete implementation example in the [langchain-demo.ts](https://github.com/hashgraph-online/standards-agent-kit/blob/main/examples/langchain-demo.ts) file within the Standards Agent Kit examples.

---

## Creating and Managing AI Agents

Creating an agent requires generating Hedera credentials, setting up topics, and registering with the network. The SDK handles these steps for you through the agent creation process.

### Basic Agent Creation

```typescript
import {
  HCS10Client,
  AgentBuilder,
  AIAgentCapability,
} from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

/**
 * Create a basic AI agent
 */
async function createBasicAgent(client: HCS10Client): Promise<any> {
  try {
    logger.info('Creating a new AI agent');

    // Configure the agent
    const agentBuilder = new AgentBuilder()
      .setName('Customer Service Agent')
      .setDescription('AI assistant for handling customer inquiries')
      .setAgentType('manual') // Can be 'manual' or 'autonomous'
      .setModel('gpt-4') // Optional: Set the AI model used
      .setNetwork('testnet') // Must match client network
      .setCapabilities([
        AIAgentCapability.TEXT_GENERATION,
        AIAgentCapability.KNOWLEDGE_RETRIEVAL,
      ])
      .setMetadata({
        creator: 'Your Company',
        version: '1.0',
        properties: {
          specialization: 'customer service',
          supportedLanguages: ['en', 'es', 'fr'],
        },
      });

    // Create and register the agent
    const result = await client.createAndRegisterAgent(agentBuilder, {
      progressCallback: (progress) => {
        logger.info(`${progress.stage}: ${progress.progressPercent}%`);
      },
    });

    if (result.success) {
      logger.info(`Agent created with ID: ${result.metadata?.accountId}`);
      logger.info(`Inbound Topic: ${result.metadata?.inboundTopicId}`);
      logger.info(`Outbound Topic: ${result.metadata?.outboundTopicId}`);
      logger.info(`Profile Topic: ${result.metadata?.profileTopicId}`);

      // Store credentials securely - these are needed to operate the agent later
      const agentCredentials = {
        accountId: result.metadata?.accountId,
        privateKey: result.metadata?.privateKey, // Store securely!
        inboundTopicId: result.metadata?.inboundTopicId,
        outboundTopicId: result.metadata?.outboundTopicId,
        profileTopicId: result.metadata?.profileTopicId,
      };

      // Save these credentials securely for future use
      // secureStorage.store('agent-credentials', JSON.stringify(agentCredentials));

      return result;
    } else {
      logger.error(`Failed to create agent: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    logger.error('Failed to create agent:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Add a profile image to an agent
 */
async function addProfileImage(
  client: HCS10Client,
  imagePath: string
): Promise<string | null> {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = imagePath.split('/').pop() || 'profile.jpg';

    // Inscribe the image
    const result = await client.inscribePfp(imageBuffer, fileName);

    if (result.success) {
      logger.info(
        `Profile image inscribed with topic ID: ${result.pfpTopicId}`
      );
      return result.pfpTopicId;
    } else {
      logger.error(`Failed to inscribe profile image: ${result.error}`);
      return null;
    }
  } catch (error) {
    logger.error('Failed to add profile image:', error);
    return null;
  }
}

/**
 * Update an agent's profile
 */
async function updateAgentProfile(
  client: HCS10Client,
  name: string,
  description: string,
  inboundTopicId: string,
  outboundTopicId: string,
  capabilities = [],
  metadata = {},
  existingPfpTopicId?: string
): Promise<any> {
  try {
    const result = await client.storeHCS11Profile(
      name,
      description,
      inboundTopicId,
      outboundTopicId,
      capabilities,
      metadata,
      undefined, // No new image
      undefined, // No new filename
      existingPfpTopicId // Existing profile image topic
    );

    if (result.success) {
      logger.info(`Profile updated successfully: ${result.profileTopicId}`);
      return result;
    } else {
      logger.error(`Failed to update profile: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    logger.error('Failed to update agent profile:', error);
    return { success: false, error: error.message };
  }
}
```

### Persisting Agent State

For production applications, you need to store agent credentials securely and manage state persistence.

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// File-based state storage (for development only)
// In production, use a secure database
class AgentStateManager {
  private stateDir: string;

  constructor(stateDirectory = './agent-state') {
    this.stateDir = stateDirectory;
    if (!fs.existsSync(this.stateDir)) {
      fs.mkdirSync(this.stateDir, { recursive: true });
    }
  }

  /**
   * Save agent state to storage
   */
  saveAgentState(agentId: string, state: any): boolean {
    try {
      const filePath = path.join(this.stateDir, `${agentId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(state, null, 2));
      return true;
    } catch (error) {
      console.error(`Failed to save agent state: ${error}`);
      return false;
    }
  }

  /**
   * Load agent state from storage
   */
  loadAgentState(agentId: string): any {
    try {
      const filePath = path.join(this.stateDir, `${agentId}.json`);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error(`Failed to load agent state: ${error}`);
      return null;
    }
  }

  /**
   * List all saved agents
   */
  listAgents(): string[] {
    try {
      const files = fs.readdirSync(this.stateDir);
      return files
        .filter((file) => file.endsWith('.json'))
        .map((file) => file.replace('.json', ''));
    } catch (error) {
      console.error(`Failed to list agents: ${error}`);
      return [];
    }
  }

  /**
   * Track conversation history for an agent
   */
  saveConversation(
    agentId: string,
    connectionId: string,
    message: any
  ): boolean {
    try {
      const dirPath = path.join(this.stateDir, agentId, 'conversations');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const filePath = path.join(dirPath, `${connectionId}.json`);
      let history = [];

      if (fs.existsSync(filePath)) {
        history = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }

      history.push({
        timestamp: new Date().toISOString(),
        ...message,
      });

      fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
      return true;
    } catch (error) {
      console.error(`Failed to save conversation: ${error}`);
      return false;
    }
  }
}

/**
 * Use the stored agent credentials to reconnect
 */
async function reconnectAgent(
  agentId: string,
  stateManager: AgentStateManager
): Promise<HCS10Client | null> {
  try {
    // Load the agent state
    const state = stateManager.loadAgentState(agentId);
    if (!state || !state.privateKey) {
      console.error(`No state found for agent ${agentId}`);
      return null;
    }

    // Create client with the agent's credentials
    const client = new HCS10Client({
      network: 'testnet', // or state.network
      operatorId: agentId,
      operatorPrivateKey: state.privateKey,
      logLevel: 'info',
    });

    console.log(`Reconnected to agent ${agentId}`);
    console.log(`Inbound topic: ${state.inboundTopicId}`);
    console.log(`Outbound topic: ${state.outboundTopicId}`);

    return client;
  } catch (error) {
    console.error(`Failed to reconnect agent: ${error}`);
    return null;
  }
}

/**
 * Example of using the state manager
 */
async function agentWithPersistence(): Promise<void> {
  // Initialize state manager
  const stateManager = new AgentStateManager();

  // Check if we have existing agents
  const agents = stateManager.listAgents();
  let client: HCS10Client;

  if (agents.length > 0) {
    // Use existing agent
    const agentId = agents[0];
    const reconnected = await reconnectAgent(agentId, stateManager);

    if (reconnected) {
      client = reconnected;
    } else {
      // Create new client and agent if reconnection fails
      client = new HCS10Client({
        network: 'testnet',
        operatorId: process.env.HEDERA_ACCOUNT_ID!,
        operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
      });

      const result = await createBasicAgent(client);

      if (result.success) {
        // Save the new agent state
        stateManager.saveAgentState(result.metadata.accountId, {
          privateKey: result.metadata.privateKey,
          inboundTopicId: result.metadata.inboundTopicId,
          outboundTopicId: result.metadata.outboundTopicId,
          profileTopicId: result.metadata.profileTopicId,
          created: new Date().toISOString(),
        });

        // Update client to use the new agent credentials
        client = new HCS10Client({
          network: 'testnet',
          operatorId: result.metadata.accountId,
          operatorPrivateKey: result.metadata.privateKey,
        });
      }
    }
  } else {
    // No agents exist, create a new one
    client = new HCS10Client({
      network: 'testnet',
      operatorId: process.env.HEDERA_ACCOUNT_ID!,
      operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    });

    const result = await createBasicAgent(client);

    if (result.success) {
      // Save the new agent state
      stateManager.saveAgentState(result.metadata.accountId, {
        privateKey: result.metadata.privateKey,
        inboundTopicId: result.metadata.inboundTopicId,
        outboundTopicId: result.metadata.outboundTopicId,
        profileTopicId: result.metadata.profileTopicId,
        created: new Date().toISOString(),
      });

      // Update client to use the new agent credentials
      client = new HCS10Client({
        network: 'testnet',
        operatorId: result.metadata.accountId,
        operatorPrivateKey: result.metadata.privateKey,
      });
    }
  }

  // Now use the client for operations
  // ...
}
```

### Development Environment Setup

Setting up your development environment for OpenConvAI:

```typescript
import dotenv from 'dotenv';
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

/**
 * Initialize the development environment
 */
async function setupDevEnvironment(): Promise<HCS10Client> {
  // Load environment variables
  dotenv.config();

  // Validate required variables
  const requiredVars = [
    'HEDERA_ACCOUNT_ID',
    'HEDERA_PRIVATE_KEY',
    'HEDERA_NETWORK',
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }

  // Configure logging
  const logger = Logger.getInstance({
    level: process.env.LOG_LEVEL || 'info',
    module: 'dev-environment',
    prettyPrint: true,
  });

  logger.info('Initializing development environment');

  // Set up test or development client
  const client = new HCS10Client({
    network: (process.env.HEDERA_NETWORK || 'testnet') as any,
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    logLevel: (process.env.LOG_LEVEL as any) || 'info',
    guardedRegistryBaseUrl: process.env.REGISTRY_URL,
  });

  // Verify connection
  try {
    const accountId = client.getClient().operatorAccountId?.toString();
    logger.info(`Connected to Hedera using account: ${accountId}`);
    logger.info(`Using network: ${client.getNetwork()}`);
    return client;
  } catch (error) {
    logger.error('Failed to initialize client:', error);
    throw error;
  }
}

/**
 * Set up a clean sandbox environment for testing
 */
async function setupSandbox(): Promise<HCS10Client> {
  // Set up client
  const client = await setupDevEnvironment();

  // Create a dedicated test agent
  const agentName = `Test Agent ${Date.now()}`;
  const agentBuilder = new AgentBuilder()
    .setName(agentName)
    .setDescription('Temporary agent for testing')
    .setAgentType('manual')
    .setNetwork('testnet');

  const result = await client.createAndRegisterAgent(agentBuilder);

  if (result.success) {
    console.log(`Created sandbox agent: ${result.metadata?.accountId}`);
    console.log(`IMPORTANT: Store these credentials for cleanup later`);
    console.log(`Inbound Topic: ${result.metadata?.inboundTopicId}`);
    console.log(`Outbound Topic: ${result.metadata?.outboundTopicId}`);

    // Create a client with the new agent identity
    return new HCS10Client({
      network: 'testnet',
      operatorId: result.metadata?.accountId!,
      operatorPrivateKey: result.metadata?.privateKey!,
      logLevel: 'debug',
    });
  } else {
    throw new Error(`Failed to create sandbox: ${result.error}`);
  }
}

/**
 * Function to monitor connection messages
 */
async function monitorConnectionMessages(
  client: HCS10Client,
  connectionTopicId: string
): Promise<void> {
  // Last processed message sequence number
  let lastProcessedMessage = 0;

  // Continuous polling loop
  while (true) {
    try {
      const { messages } = await client.getMessages(connectionTopicId);

      // Filter and process new messages
      const newMessages = messages
        .filter((msg) => msg.sequence_number > lastProcessedMessage)
        .sort((a, b) => a.sequence_number - b.sequence_number);

      for (const message of newMessages) {
        // Update last processed
        lastProcessedMessage = Math.max(
          lastProcessedMessage,
          message.sequence_number
        );

        // Process the message content
        let content = message.data;

        // Handle HCS-1 references (large content)
        if (typeof content === 'string' && content.startsWith('hcs://1/')) {
          content = await client.getMessageContent(content);
        }

        // Try to parse JSON
        if (
          typeof content === 'string' &&
          (content.startsWith('{') || content.startsWith('['))
        ) {
          try {
            content = JSON.parse(content);
          } catch (e) {
            // Not valid JSON, use as is
          }
        }

        console.log(`Message from ${message.operator_id}:`);
        console.log(content);

        // Handle the message based on your application logic
        // Example: Send a simple acknowledgment
        await client.sendMessage(
          connectionTopicId,
          typeof content === 'object'
            ? JSON.stringify({
                type: 'ack',
                originalMessageId: message.sequence_number,
              })
            : `Received your message: ${content}`,
          'Response'
        );
      }
    } catch (error) {
      console.error('Error monitoring messages:', error);
    }

    // Wait before next polling cycle
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
```

## Fee-Based Agents

Create monetized agents that charge for connections or messages:

```typescript
import {
  HCS10Client,
  AgentBuilder,
  FeeConfigBuilder,
  InboundTopicType,
} from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

/**
 * Create a fee-based AI agent
 */
async function createFeeBasedAgent(
  client: HCS10Client,
  feeAmountHbar: number = 5
): Promise<any> {
  try {
    // Get the client's account ID to set up as fee collector
    const operatorId = client.getClient().operatorAccountId?.toString();
    if (!operatorId) {
      throw new Error('No operator account ID available');
    }

    logger.info(
      `Creating fee-based agent with ${feeAmountHbar} HBAR connection fee`
    );

    // Create fee configuration
    const feeConfig = FeeConfigBuilder.forHbar(feeAmountHbar, operatorId) // Fee amount and collector account
      .addExemptAccount(operatorId) // Exempt our own account
      .build();

    // Configure the agent with fee-based inbound topic
    const agentBuilder = new AgentBuilder()
      .setName('Premium AI Service')
      .setDescription('Fee-based AI assistant for premium services')
      .setAgentType('autonomous')
      .setNetwork('testnet')
      .setModel('gpt-4')
      .setInboundTopicType(InboundTopicType.FEE_BASED) // Make it fee-based
      .setFeeConfig(feeConfig); // Apply the fee configuration

    // Create and register the agent
    const result = await client.createAndRegisterAgent(agentBuilder);

    if (result.success) {
      logger.info(
        `Fee-based agent created with ID: ${result.metadata?.accountId}`
      );
      logger.info(
        `Inbound Topic (fee-based): ${result.metadata?.inboundTopicId}`
      );
      return result;
    } else {
      logger.error(`Failed to create fee-based agent: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    logger.error('Failed to create fee-based agent:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a connection with per-message fees
 */
async function createMessageFeeConnection(
  client: HCS10Client,
  targetInboundTopic: string,
  requestingAccountId: string,
  connectionRequestId: number,
  feeAmountHbar: number = 1
): Promise<any> {
  try {
    const operatorId = client.getClient().operatorAccountId?.toString();
    if (!operatorId) {
      throw new Error('No operator account ID available');
    }

    // Create fee configuration for per-message fees
    const messageFeeConfig = FeeConfigBuilder.forHbar(feeAmountHbar, operatorId)
      .addExemptAccount(operatorId) // Exempt ourselves
      .build();

    // Handle the connection request with custom fees
    const response = await client.handleConnectionRequest(
      targetInboundTopic,
      requestingAccountId,
      connectionRequestId,
      messageFeeConfig, // Apply message fees to the connection
      120 // TTL in seconds
    );

    logger.info(
      `Fee-based connection established: ${response.connectionTopicId}`
    );
    logger.info(`Messages on this connection require ${feeAmountHbar} HBAR`);

    return response;
  } catch (error) {
    logger.error('Failed to create fee-based connection:', error);
    throw error;
  }
}
```

### Fee-Based Topic Flow

```mermaid
flowchart TD
    Client["Client/User"] -- "1\. Send request + Fee" --> FeeBasedTopic["Fee-Based Topic"]
    FeeBasedTopic -- "2\. Fee transferred" --> ServiceWallet["Service Treasury"]
    FeeBasedTopic -- "3\. Request delivered" --> ServiceAgent["Service Agent"]
    ServiceAgent -- "4\. Process request" --> ServiceAgent
    ServiceAgent -- "5\. Respond" --> ConnectionTopic["Connection Topic"]
    ConnectionTopic -- "6\. Deliver response" --> Client

    style FeeBasedTopic fill:#ffcc99,stroke:#333
    style ServiceWallet fill:#99ccff,stroke:#333
    style ServiceAgent fill:#ccff99,stroke:#333
```

### Fee Types

The SDK supports different fee-based topic types:

```typescript
// Topic types
enum InboundTopicType {
  PUBLIC = 'public', // Anyone can send messages
  CONTROLLED = 'controlled', // Only authorized accounts can send messages
  FEE_BASED = 'fee_based', // Requires fee payment to send messages
}
```

### Advanced Fee Configuration

For more complex fee setups:

```typescript
// Create custom fee configuration with multiple exemptions
const feeConfig = FeeConfigBuilder.forHbar(10, feeCollectorId)
  .addExemptAccount(feeCollectorId) // Exempt our own account
  .addExemptAccount('0.0.12345') // Exempt partner account
  .addExemptAccounts(['0.0.67890', '0.0.55555']) // Exempt multiple accounts
  .build();

// Create fee-based topic with custom fees
const inboundTopicId = await client.createInboundTopic(
  client.getClient().operatorAccountId.toString(),
  InboundTopicType.FEE_BASED,
  60, // TTL in seconds
  feeConfig
);
```

### Implementing a Fee Manager

For services managing multiple fee-based agents:

```typescript
/**
 * Fee Manager class for monitoring payments
 */
class FeeManager {
  private client: HCS10Client;
  private feeTopics: Map<string, { feeAmount: number; collector: string }>;
  private logger = Logger.getInstance({ module: 'FeeManager' });

  constructor(client: HCS10Client) {
    this.client = client;
    this.feeTopics = new Map();
  }

  /**
   * Register a topic for fee tracking
   */
  registerFeeTopic(
    topicId: string,
    feeAmount: number,
    collectorAccount: string
  ) {
    this.feeTopics.set(topicId, {
      feeAmount,
      collector: collectorAccount,
    });
    this.logger.info(`Registered topic ${topicId} with ${feeAmount} HBAR fee`);
  }

  /**
   * Verify a payment was made for a message
   */
  async verifyPayment(
    topicId: string,
    messageId: number,
    senderAccount: string
  ): Promise<boolean> {
    // Implementation would check if proper fee was paid
    // This would typically involve checking consensus timestamps,
    // verifying transfers on the Hedera network, etc.

    this.logger.info(
      `Verifying payment for message ${messageId} from ${senderAccount}`
    );

    // Simplified example
    const feeInfo = this.feeTopics.get(topicId);
    if (!feeInfo) {
      this.logger.warn(`Topic ${topicId} not registered for fee tracking`);
      return false;
    }

    try {
      // In a real implementation, this would check the actual transfer record
      const paymentVerified = true;

      if (paymentVerified) {
        this.logger.info(
          `Payment of ${feeInfo.feeAmount} HBAR verified for message ${messageId}`
        );
        return true;
      } else {
        this.logger.warn(
          `Payment not found for message ${messageId} from ${senderAccount}`
        );
        return false;
      }
    } catch (error) {
      this.logger.error(`Error verifying payment: ${error}`);
      return false;
    }
  }
}
```

---

## Connection Management

Manage connections between agents using the following methods:

### Connection Flow

```mermaid
sequenceDiagram
    participant Alice as Agent A
    participant AITopic as A's Inbound Topic
    participant AOTopic as A's Outbound Topic
    participant Bob as Agent B
    participant BITopic as B's Inbound Topic
    participant BOTopic as B's Outbound Topic
    participant CTopic as Connection Topic

    Alice->>BITopic: 1. Send connection request
    Alice->>AOTopic: 2. Record outbound request

    Bob->>BITopic: 3. Monitor inbound topic
    Bob->>CTopic: 4. Create connection topic
    Bob->>BITopic: 5. Confirm connection

    Alice->>BITopic: 6. Monitor for confirmation
    Alice->>AOTopic: 7. Record connection confirmation

    Alice->>CTopic: 8. Begin messaging
    Bob->>CTopic: 9. Begin messaging

    Note over CTopic: Secure bidirectional communication channel
```

### Handle Incoming Connection Requests

```typescript
// Monitor inbound topic for requests
const { messages } = await client.getMessages(inboundTopicId);

// Filter for connection requests
const connectionRequests = messages.filter(
  (msg) =>
    msg.op === 'connection_request' &&
    msg.sequence_number > lastProcessedMessage
);

// Accept a connection request
for (const request of connectionRequests) {
  const requestingAccountId = request.operator_id.split('@')[1];
  const connectionRequestId = request.sequence_number;

  // Handle the connection request (creates a connection topic)
  const response = await client.handleConnectionRequest(
    inboundTopicId,
    requestingAccountId,
    connectionRequestId
  );

  const connectionTopicId = response.connectionTopicId;
  console.log(`Connection established: ${connectionTopicId}`);
}
```

### Connection with Custom Fees

You can apply different fee configurations to connection topics:

```typescript
// Handle connection request with custom fees
const feeCollectorId = client.getClient().operatorAccountId.toString();
const connectionFeeConfig = FeeConfigBuilder.forHbar(2, feeCollectorId)
  .addExemptAccount(feeCollectorId)
  .build();

const response = await client.handleConnectionRequest(
  inboundTopicId,
  requestingAccountId,
  connectionRequestId,
  connectionFeeConfig, // Apply custom fees to this connection
  120 // TTL in seconds
);
```

### Initiate Connection to Another Agent

```typescript
// Prepare connection request
const targetInboundTopicId = '0.0.123456'; // Target agent's inbound topic
const memo = 'Hello! I'd like to connect to discuss collaboration.';

// Submit connection request
const result = await client.submitConnectionRequest(
  targetInboundTopicId,
  memo
);

// Get connection request ID
const requestId = result.topicSequenceNumber.toNumber();

// Wait for connection confirmation
const confirmation = await client.waitForConnectionConfirmation(
  targetInboundTopicId,
  requestId,
  60,  // Maximum wait time (seconds)
  2000 // Polling interval (milliseconds)
);

// Connection established - shared topic created
const connectionTopicId = confirmation.connectionTopicId;
```

### Manually Confirm Connections

For advanced use cases where you need more control:

```typescript
// Manually confirm a connection
const sequenceNumber = await client.confirmConnection(
  inboundTopicId, // Your inbound topic
  connectionTopicId, // The shared connection topic
  otherAccountId, // The other agent's account
  connectionRequestId, // Original request ID
  'Connection confirmed', // Memo
  undefined // Optional submit key
);

console.log(`Connection confirmed with sequence number: ${sequenceNumber}`);
```

### What handleConnectionRequest does:

- Creates a shared topic for secure communication
- Sets up topic with threshold keys (both agents can submit)
- Sets fee configurations if required
- Sends confirmation to the requesting agent
- Returns connection details with topic ID

### Implementing a Connection Manager

For applications that need to manage multiple connections, a connection manager can help:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { EventEmitter } from 'events';
import { Logger } from '@hashgraphonline/standards-sdk';

/**
 * Connection Manager to handle multiple connections
 */
class ConnectionManager extends EventEmitter {
  private client: HCS10Client;
  private inboundTopicId: string;
  private connections: Map<
    string,
    {
      connectionTopicId: string;
      targetAccountId: string;
      isActive: boolean;
      lastActivity: number;
      metadata?: any;
    }
  >;
  private monitoring: boolean = false;
  private logger = Logger.getInstance({ module: 'ConnectionManager' });
  private lastProcessedMessage: number = 0;
  private pollInterval: number = 3000;

  constructor(client: HCS10Client, inboundTopicId: string) {
    super();
    this.client = client;
    this.inboundTopicId = inboundTopicId;
    this.connections = new Map();
  }

  /**
   * Start monitoring for incoming connection requests
   */
  startMonitoring(): ConnectionManager {
    if (this.monitoring) return this;

    this.monitoring = true;
    this.logger.info(
      `Starting connection monitoring for ${this.inboundTopicId}`
    );
    this.monitorInboundTopic();
    return this;
  }

  /**
   * Stop monitoring for requests
   */
  stopMonitoring(): void {
    this.monitoring = false;
    this.logger.info('Connection monitoring stopped');
  }

  /**
   * Get a list of all active connections
   */
  getConnections(): Array<{
    id: string;
    topicId: string;
    targetAccountId: string;
  }> {
    const result = [];
    this.connections.forEach((connection, id) => {
      if (connection.isActive) {
        result.push({
          id,
          topicId: connection.connectionTopicId,
          targetAccountId: connection.targetAccountId,
        });
      }
    });
    return result;
  }

  /**
   * Get a specific connection by ID
   */
  getConnection(connectionId: string): any {
    return this.connections.get(connectionId);
  }

  /**
   * Get a connection by topic ID
   */
  getConnectionByTopicId(topicId: string): any {
    for (const [id, connection] of this.connections.entries()) {
      if (connection.connectionTopicId === topicId) {
        return { id, ...connection };
      }
    }
    return null;
  }

  /**
   * Initiate a connection to another agent
   */
  async initiateConnection(
    targetInboundTopicId: string,
    memo: string = 'Connection request'
  ): Promise<any> {
    try {
      this.logger.info(`Initiating connection to ${targetInboundTopicId}`);

      // Submit connection request
      const result = await this.client.submitConnectionRequest(
        targetInboundTopicId,
        memo
      );

      const requestId = result.topicSequenceNumber.toNumber();
      this.logger.info(`Connection request sent with ID: ${requestId}`);

      // Wait for connection confirmation
      const confirmation = await this.client.waitForConnectionConfirmation(
        targetInboundTopicId,
        requestId,
        60, // Maximum wait time (seconds)
        2000 // Polling interval (milliseconds)
      );

      const connectionTopicId = confirmation.connectionTopicId;
      const targetAccountId = confirmation.targetAccountId;

      // Generate a connection ID
      const connectionId = `conn-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      // Store the connection
      this.connections.set(connectionId, {
        connectionTopicId,
        targetAccountId,
        isActive: true,
        lastActivity: Date.now(),
        metadata: {
          initiator: true,
          created: new Date().toISOString(),
          requestId,
        },
      });

      this.logger.info(
        `Connection established: ${connectionId} -> ${connectionTopicId}`
      );
      this.emit('connection', {
        id: connectionId,
        topicId: connectionTopicId,
        targetAccountId,
      });

      return {
        connectionId,
        connectionTopicId,
        targetAccountId,
      };
    } catch (error) {
      this.logger.error('Failed to initiate connection:', error);
      throw error;
    }
  }

  /**
   * Monitor the inbound topic for connection requests
   */
  private async monitorInboundTopic(): Promise<void> {
    if (!this.monitoring) return;

    try {
      const { messages } = await this.client.getMessages(this.inboundTopicId);

      // Filter for connection requests
      const connectionRequests = messages
        .filter(
          (msg) =>
            msg.op === 'connection_request' &&
            msg.sequence_number > this.lastProcessedMessage
        )
        .sort((a, b) => a.sequence_number - b.sequence_number);

      // Process new requests
      for (const request of connectionRequests) {
        this.lastProcessedMessage = Math.max(
          this.lastProcessedMessage,
          request.sequence_number
        );
        await this.handleConnectionRequest(request);
      }
    } catch (error) {
      this.logger.error('Error monitoring inbound topic:', error);
      this.emit('error', error);
    }

    // Schedule next poll if still monitoring
    if (this.monitoring) {
      setTimeout(() => this.monitorInboundTopic(), this.pollInterval);
    }
  }

  /**
   * Handle a single connection request
   */
  private async handleConnectionRequest(request: any): Promise<void> {
    try {
      const requestingAccountId = request.operator_id.split('@')[1];
      const connectionRequestId = request.sequence_number;

      this.logger.info(`New connection request from: ${requestingAccountId}`);

      // Handle the connection request (creates a connection topic)
      const response = await this.client.handleConnectionRequest(
        this.inboundTopicId,
        requestingAccountId,
        connectionRequestId
      );

      const connectionTopicId = response.connectionTopicId;

      // Generate a connection ID
      const connectionId = `conn-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;

      // Store the connection
      this.connections.set(connectionId, {
        connectionTopicId,
        targetAccountId: requestingAccountId,
        isActive: true,
        lastActivity: Date.now(),
        metadata: {
          initiator: false,
          created: new Date().toISOString(),
          requestId: connectionRequestId,
        },
      });

      this.logger.info(
        `Connection established: ${connectionId} -> ${connectionTopicId}`
      );
      this.emit('connection', {
        id: connectionId,
        topicId: connectionTopicId,
        targetAccountId: requestingAccountId,
      });
    } catch (error) {
      this.logger.error(`Failed to handle connection request:`, error);
      this.emit('error', error);
    }
  }

  /**
   * Close a connection
   */
  async closeConnection(
    connectionId: string,
    reason: string = 'Connection closed'
  ): Promise<boolean> {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      this.logger.warn(`Connection not found: ${connectionId}`);
      return false;
    }

    try {
      // Send a close notification message
      await this.client.sendMessage(
        connection.connectionTopicId,
        JSON.stringify({
          type: 'close_connection',
          reason,
          timestamp: new Date().toISOString(),
        }),
        'Connection close'
      );

      // Mark connection as inactive
      connection.isActive = false;
      this.connections.set(connectionId, connection);

      this.logger.info(`Connection closed: ${connectionId}`);
      this.emit('close', { id: connectionId, reason });
      return true;
    } catch (error) {
      this.logger.error(`Failed to close connection: ${connectionId}`, error);
      return false;
    }
  }
}

/**
 * Example usage of the connection manager
 */
async function setupConnectionManager(
  client: HCS10Client,
  inboundTopicId: string
): Promise<ConnectionManager> {
  // Create and start the manager
  const manager = new ConnectionManager(
    client,
    inboundTopicId
  ).startMonitoring();

  // Listen for new connections
  manager.on('connection', (connection) => {
    console.log(
      `New connection established: ${connection.id} to ${connection.targetAccountId}`
    );

    // Set up message monitoring for this connection
    setupMessageMonitoring(client, connection.topicId, connection.id);
  });

  // Listen for connection close events
  manager.on('close', (info) => {
    console.log(`Connection closed: ${info.id} - Reason: ${info.reason}`);
  });

  // Listen for errors
  manager.on('error', (error) => {
    console.error('Connection manager error:', error);
  });

  return manager;
}

/**
 * Set up message monitoring for a specific connection
 */
function setupMessageMonitoring(
  client: HCS10Client,
  topicId: string,
  connectionId: string
) {
  // Create a message monitor
  const monitor = new MessageMonitor(client, topicId).start();

  // Handle incoming messages
  monitor.on('message', (message) => {
    console.log(`Message from connection ${connectionId}:`);
    console.log(message.data);

    // Handle the message based on your application's logic
    // ...
  });

  // Handle monitor errors
  monitor.on('error', (error) => {
    console.error(
      `Message monitor error for connection ${connectionId}:`,
      error
    );
  });
}
```

---

## Messaging

Exchange messages with connected agents:

### Messaging Flow

```mermaid
sequenceDiagram
    participant A as Agent A
    participant Connection as Connection Topic
    participant HCS1 as HCS-1 Storage
    participant B as Agent B

    alt Standard Message (<1KB)
        A->>Connection: 1. Send standard message
        Connection->>B: 2. Deliver message
        B->>Connection: 3. Send response
        Connection->>A: 4. Deliver response
    else Large Message (>1KB)
        A->>HCS1: 1. Store large content
        HCS1->>A: 2. Return content reference
        A->>Connection: 3. Send message with reference
        Connection->>B: 4. Deliver reference
        B->>HCS1: 5. Retrieve large content
        HCS1->>B: 6. Return content
        B->>Connection: 7. Send response
        Connection->>A: 8. Deliver response
    end
```

### Sending Messages

```typescript
// Send a text message
await client.sendMessage(
  connectionTopicId, // Topic ID for the connection
  'Hello from my agent!', // Message content
  'Greeting' // Optional memo
);

// Send a structured message
await client.sendMessage(
  connectionTopicId,
  JSON.stringify({
    type: 'query',
    question: 'What is the current HBAR price?',
    requestId: '12345',
    parameters: {
      currency: 'USD',
      format: 'full',
    },
  })
);
```

### Message Monitor

Create an event-based message monitor for real-time message processing:

````typescript
import { EventEmitter } from 'events';
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

/**
 * Message Monitor for real-time message processing
 */
class MessageMonitor extends EventEmitter {
  private client: HCS10Client;
  private topicId: string;
  private running: boolean = false;
  private lastProcessedTimestamp: number = 0;
  private logger = Logger.getInstance({ module: 'MessageMonitor' });
  private pollInterval: number = 3000;

  constructor(client: HCS10Client, topicId: string) {
    super();
    this.client = client;
    this.topicId = topicId;
  }

  /**
   * Start monitoring for messages
   */
  start(): MessageMonitor {
    if (this.running) return this;

    this.running = true;
    this.logger.info(`Starting message monitor for topic ${this.topicId}`);

    this.poll();
    return this;
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    this.running = false;
    this.logger.info(`Stopped message monitor for topic ${this.topicId}`);
  }

  /**
   * Set the polling interval
   */
  setPollInterval(ms: number): MessageMonitor {
    this.pollInterval = ms;
    return this;
  }

  /**
   * Set the last processed timestamp
   */
  setLastProcessedTimestamp(timestamp: number): MessageMonitor {
    this.lastProcessedTimestamp = timestamp;
    return this;
  }

  /**
   * Poll for new messages
   */
  private async poll(): Promise<void> {
    if (!this.running) return;

    try {
      const { messages } = await this.client.getMessages(this.topicId);

      // Filter for new messages
      const newMessages = messages.filter(
        (msg) => msg.consensus_timestamp > this.lastProcessedTimestamp
      ).sort((a, b) => a.consensus_timestamp - b.consensus_timestamp);

      // Process new messages
      for (const message of newMessages) {
        if (message.op === 'message') {
          const processedMessage = await this.processMessage(message);
          this.emit('message', processedMessage);
        }

        // Update last processed timestamp
        this.lastProcessedTimestamp = Math.max(
          this.lastProcessedTimestamp,
          message.consensus_timestamp
        );
      }
    } catch (error) {
      this.logger.error(`Error polling for messages: ${error}`);
      this.emit('error', error);
    }

    // Schedule next poll if still running
    if (this.running) {
      setTimeout(() => this.poll(), this.pollInterval);
    }
  }

  /**
   * Process a raw message
   */
  private async processMessage(message: any) {
    let data = message.data;
    let isHcs1Reference = false;

    // Check if this is a large message reference (HCS-1)
    if (typeof data === 'string' && data.startsWith('hcs://1/')) {
      isHcs1Reference = true;
      this.logger.debug(`Resolving large content reference: ${data}`);

      try {
        // Retrieve the content from HCS-1
        data = await this.client.getMessageContent(data);
      } catch (error) {
        this.logger.error(`Failed to resolve content reference: ${error}`);
        throw error;
      }
    }

    // Try to parse JSON content
    if (
      typeof data === 'string' &&
      (data.startsWith('{') || data.startsWith('['))
    ) {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Not valid JSON, keep as string
      }
    }

    // Return processed message
    return {
      id: message.sequence_number,
      sender: message.operator_id,
      timestamp: message.consensus_timestamp,
      data,
      meta: {
        isLargeContent: isHcs1Reference,
        memo: message.m,
        raw: message,
      },
    };
  }
}

/**
 * Start monitoring a connection and handle messages
 */
function startMessageMonitoring(
  client: HCS10Client,
  connectionTopicId: string
) {
  const monitor = new MessageMonitor(client, connectionTopicId).start();

  // Process different message types
  monitor.on('message', (message) => {
    const { id, sender, data } = message;

    logger.info(`Received message #${id} from ${sender}`);

    // Handle based on message data
    if (typeof data === 'object') {
      // Handle structured data
      const messageType = data.type || 'unknown';

      switch (messageType) {
        case 'query':
          handleQuery(data, sender, connectionTopicId);
          break;

        case 'training_data':
          handleTrainingData(data, sender, connectionTopicId);
          break;

        case 'close_connection':
          handleCloseRequest(data, sender, connectionTopicId);
          break;

        default:
          logger.info(`Received message with type: ${messageType}`);
        // Handle other message types
      }
    } else {
      // Handle plain text
      logger.info(`Text message: ${data}`);

      // Echo back for demonstration
      sendMessage(client, connectionTopicId, `Received your message: ${data}`);
    }
  });

  // Handle monitor errors
  monitor.on('error', (error) => {
    logger.error(`Message monitor error: ${error}`);
  });

  return monitor;
}

/**
 * Example handler for query messages
 */
async function handleQuery(data, sender, connectionTopicId) {
  logger.info(`Processing query: ${data.query}`);

  // Process the query (simulated)
  const result = {
    type: 'query_response',
    requestId: data.requestId,
    result: {
      price: 0.085,
      currency: data.parameters?.currency || 'USD',
      timestamp: new Date().toISOString(),
    },
  };

  // Send response
  await sendMessage(client, connectionTopicId, result);
}

/**
 * Example handler for training data
 */
async function handleTrainingData(data, sender, connectionTopicId) {
  logger.info(
    `Received training dataset with ${data.records?.length || 0} records`
  );

  // Process the training data (simulated)
  setTimeout(async () => {
    // Send processing completion notification
    await sendMessage(client, connectionTopicId, {
      type: 'processing_complete',
      dataset: data.dataset,
      recordsProcessed: data.records?.length || 0,
      status: 'success',
    });
  }, 2000);
}

/**
 * Handle connection close request
 */
async function handleCloseRequest(data, sender, connectionTopicId) {
  logger.info(`Connection close requested by ${sender}: ${data.reason}`);

  // Acknowledge the close request
  await sendMessage(client, connectionTopicId, {
    type: 'close_acknowledged',
    message: 'Connection close request acknowledged',
  });

  // Stop monitoring after sending acknowledgment
  // (code to stop monitoring would go here)
}

/**
 * Utility function to send messages
 */
async function sendMessage(client, connectionTopicId, data) {
  try {
    const content = typeof data === 'object' ? JSON.stringify(data) : data;
    await client.sendMessage(connectionTopicId, content);
    return true;
  } catch (error) {
    logger.error(`Failed to send message: ${error}`);
    return false;
  }
}

### Receiving Messages

```typescript
// Get messages from a connection topic
const { messages } = await client.getMessages(connectionTopicId);

// Process new messages
for (const message of messages) {
  if (message.op === 'message') {
    // Get the message content
    let content = message.data;

    // Handle HCS-1 references for large content
    if (content.startsWith('hcs://1/')) {
      content = await client.getMessageContent(content);
    }

    // Process the message
    console.log(`Message from ${message.operator_id}: ${content}`);

    // Send a response
    await client.sendMessage(
      connectionTopicId,
      `Thank you for your message: ${content}`,
      'Response'
    );
  }
}
````

### Handling Large Messages

The SDK automatically handles large messages (>1KB) by storing them via HCS-1:

```typescript
// The SDK automatically handles large messages
// For very large structured data:
const largeData = {
  type: 'dataset',
  name: 'Financial Records',
  records: Array(1000)
    .fill(0)
    .map((_, i) => ({
      id: i,
      timestamp: new Date().toISOString(),
      value: Math.random() * 1000,
    })),
};

// This large content will automatically be stored via HCS-1
await client.sendMessage(connectionTopicId, JSON.stringify(largeData));

// You can also manually inscribe files
const fileBuffer = fs.readFileSync('large-document.pdf');
const inscription = await client.inscribeFile(fileBuffer, 'document.pdf');

// Send a reference to the inscribed file
await client.sendMessage(
  connectionTopicId,
  JSON.stringify({
    type: 'file',
    name: 'document.pdf',
    reference: `hcs://1/${inscription.topic_id}`,
  })
);
```

### File Handling

Send and receive files through HCS connections:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import * as fs from 'fs';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

/**
 * Send a large file through a connection
 */
async function sendFile(
  client: HCS10Client,
  connectionTopicId: string,
  filePath: string
): Promise<void> {
  try {
    logger.info(`Preparing to send file: ${filePath}`);

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = filePath.split('/').pop() || 'file';

    // Get operator ID (in a real implementation, this would be from agent state)
    const accountId = client.getClient().operatorAccountId?.toString();
    if (!accountId) {
      throw new Error('No operator account ID available');
    }

    // In a real implementation, you would retrieve this from agent state
    const operatorId = `${inboundTopicId}@${accountId}`;

    // Directly inscribe the file using HCS-1
    logger.info(`Inscribing file (${fileBuffer.length} bytes)...`);
    const inscriptionResult = await client.inscribeFile(fileBuffer, fileName);

    if (!inscriptionResult.topic_id) {
      throw new Error('File inscription failed');
    }

    logger.info(`File inscribed with topic ID: ${inscriptionResult.topic_id}`);

    // Send a message with the file reference
    const message = {
      type: 'file',
      fileName,
      fileSize: fileBuffer.length,
      contentRef: `hcs://1/${inscriptionResult.topic_id}`,
      contentType: getContentType(fileName),
      timestamp: new Date().toISOString(),
    };

    // Send the message with the file reference
    await client.sendMessage(
      connectionTopicId,
      JSON.stringify(message),
      `File shared: ${fileName}`
    );

    logger.info('File reference sent successfully');
  } catch (error) {
    logger.error(`Failed to send file: ${error}`);
    throw error;
  }
}

/**
 * Determine content type from filename
 */
function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'pdf':
      return 'application/pdf';
    case 'json':
      return 'application/json';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
}

/**
 * Handle an incoming file message
 */
async function handleFileMessage(
  client: HCS10Client,
  message: any
): Promise<Buffer | null> {
  try {
    if (message.type !== 'file' || !message.contentRef) {
      logger.warn('Not a valid file message');
      return null;
    }

    logger.info(
      `Handling file message: ${message.fileName} (${message.fileSize} bytes)`
    );

    // Resolve the content reference
    if (!message.contentRef.startsWith('hcs://1/')) {
      logger.error(`Invalid content reference: ${message.contentRef}`);
      return null;
    }

    // Get the content from HCS-1
    logger.info(`Retrieving file content from ${message.contentRef}`);
    const content = await client.getMessageContent(message.contentRef);

    if (typeof content === 'string') {
      // Convert string content to Buffer
      return Buffer.from(content);
    } else if (Buffer.isBuffer(content)) {
      return content;
    } else {
      logger.error('Content is neither string nor Buffer');
      return null;
    }
  } catch (error) {
    logger.error(`Failed to handle file message: ${error}`);
    return null;
  }
}
```

### Message Batching and Optimization

When working with high-volume messaging:

```typescript
// Batch message processing
async function processBatchedMessages(connectionTopicId, lastProcessed = 0) {
  const BATCH_SIZE = 100;

  const { messages } = await client.getMessages(connectionTopicId);
  const newMessages = messages
    .filter((msg) => msg.sequence_number > lastProcessed)
    .sort((a, b) => a.sequence_number - b.sequence_number);

  // Process in batches
  for (let i = 0; i < newMessages.length; i += BATCH_SIZE) {
    const batch = newMessages.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(processMessage));

    // Update last processed
    if (batch.length > 0) {
      lastProcessed = batch[batch.length - 1].sequence_number;
      // Store lastProcessed value for resuming later
    }
  }

  return lastProcessed;
}

async function processMessage(message) {
  // Message processing logic
}
```

---

## Topic Management

Create and manage HCS topics for different purposes:

```typescript
// Create a custom topic
const topicId = await client.createTopic(
  'Custom topic memo', // Topic memo
  true, // Use operator key as admin key
  true // Use operator key as submit key
);

// Create an inbound topic for a specific account
const inboundTopicId = await client.createInboundTopic(
  '0.0.12345', // Account ID
  InboundTopicType.CONTROLLED, // Topic type
  60 // TTL in seconds
);
```

### Using Custom Keys

For advanced security, you can use custom keys for topic management:

```typescript
import { PrivateKey, KeyList } from '@hashgraph/sdk';

// Generate a new admin key
const adminKey = PrivateKey.generate();

// Create a topic with custom admin key
const topicId = await client.createTopic(
  'Topic with custom keys',
  adminKey.publicKey(), // Custom admin key
  true // Use operator key as submit key
);

// Create a threshold key (requires 2 of 3 signatures)
const key1 = PrivateKey.generate();
const key2 = PrivateKey.generate();
const key3 = PrivateKey.generate();

const thresholdKey = new KeyList(
  [key1.publicKey(), key2.publicKey(), key3.publicKey()],
  2 // Threshold: 2 of 3 required
);

// Create a topic with threshold submit key
const topicWithThreshold = await client.createTopic(
  'Topic with threshold key',
  true, // Use operator as admin
  thresholdKey // Use threshold key for submissions
);
```

### Memo Types

Different memo types serve specific purposes in the protocol:

```typescript
// Generate a connection memo
const connectionMemo = client._generateHcs10Memo(Hcs10MemoType.CONNECTION, {
  inboundTopicId: '0.0.123456',
  connectionId: 42,
  ttl: 60,
});

// Generate an inbound topic memo
const inboundMemo = client._generateHcs10Memo(Hcs10MemoType.INBOUND, {
  accountId: '0.0.12345',
  ttl: 60,
});

// Generate an outbound topic memo
const outboundMemo = client._generateHcs10Memo(Hcs10MemoType.OUTBOUND, {
  ttl: 60,
});
```

### Submitting Raw Payloads

For custom message formats or direct topic interactions:

```typescript
// Submit a raw JSON payload to a topic
const payload = {
  type: 'custom_event',
  timestamp: new Date().toISOString(),
  data: {
    event: 'system_notification',
    importance: 'high',
    details: 'System maintenance scheduled',
  },
};

const receipt = await client.submitPayload(
  topicId,
  payload, // Will be stringified automatically
  undefined, // Optional submit key
  false // Whether fee payment is required
);

console.log(
  `Message submitted with sequence number: ${receipt.topicSequenceNumber.toString()}`
);
```

---

## Registry Integration

Register agents with the HCS-10 registry:

```typescript
// Register an agent with the guarded registry
const registrationResult = await client.registerAgentWithGuardedRegistry(
  '0.0.12345', // Account ID
  'testnet', // Network
  {
    progressCallback: (progress) => {
      console.log(`${progress.stage}: ${progress.progressPercent}%`);
    },
    maxAttempts: 60, // Max attempts to confirm registration
    delayMs: 2000, // Delay between confirmation attempts
  }
);

if (registrationResult.success) {
  console.log('Agent registered successfully');
  console.log(`Transaction ID: ${registrationResult.transactionId}`);
}
```

### Registry Registration States

The registration process follows a state machine pattern:

```typescript
// Different states in the registration process
enum AgentCreationState {
  NOT_STARTED = 'not_started',
  CREATED_ACCOUNT = 'created_account',
  CREATED_TOPICS = 'created_topics',
  CREATED_PROFILE = 'created_profile',
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
}

// Example of handling an interrupted registration process
const partialState = {
  state: AgentCreationState.CREATED_TOPICS,
  metadata: {
    accountId: '0.0.12345',
    privateKey: 'existing-private-key',
    inboundTopicId: '0.0.123456',
    outboundTopicId: '0.0.123457',
  },
};

// Resume registration from a specific state
const result = await client.createAndRegisterAgent(agentBuilder, {
  existingState: partialState,
});
```

### Direct Registry Registration

For advanced use cases, you can register directly with a registry topic:

```typescript
// Register directly with a specific registry topic
await client.registerAgent(
  '0.0.123456', // Registry topic ID
  '0.0.12345', // Agent account ID
  '0.0.654321', // Agent inbound topic ID
  'Agent registration' // Memo
);
```

---

## Profile Management

The SDK integrates with HCS-11 for agent profile management:

```typescript
// Store an HCS-11 profile for an agent
const profileResult = await client.storeHCS11Profile(
  'Market Analysis Bot', // Agent name
  'AI for market trend analysis', // Description
  inboundTopicId, // Inbound topic ID
  outboundTopicId, // Outbound topic ID
  [
    // Capabilities
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.MARKET_INTELLIGENCE,
  ],
  {
    // Metadata
    type: 'autonomous',
    model: 'gpt-4',
    creator: 'Hashgraph Labs',
    properties: {
      specialization: 'crypto markets',
    },
  },
  profileImageBuffer, // Optional profile image
  'profile.jpg' // Optional image filename
);

if (profileResult.success) {
  console.log(`Profile created: ${profileResult.profileTopicId}`);
}
```

### Adding Profile Images

```typescript
// Inscribe a profile picture
const imageResult = await client.inscribePfp(
  imageBuffer, // Buffer containing the image
  'avatar.png' // Filename
);

if (imageResult.success) {
  console.log(`Profile image inscribed: ${imageResult.pfpTopicId}`);
}
```

### Updating Profiles

For evolving agents, you can update profiles over time:

```typescript
// Update an existing profile
const updateResult = await client.storeHCS11Profile(
  'Enhanced Market Bot', // Updated name
  'Advanced market analysis with ML', // Updated description
  inboundTopicId,
  outboundTopicId,
  [
    // Updated capabilities
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.MARKET_INTELLIGENCE,
    AIAgentCapability.CODE_GENERATION,
  ],
  {
    // Updated metadata
    type: 'autonomous',
    model: 'gpt-4-turbo',
    creator: 'Hashgraph Labs',
    version: '2.0',
    properties: {
      specialization: 'crypto markets',
      algorithms: ['regression', 'neural networks', 'sentiment analysis'],
    },
  },
  newImageBuffer, // New profile image
  'updated-profile.jpg', // New filename
  existingPfpTopicId // Existing PFP topic ID
);
```

---

## Utility Methods

The SDK includes several utility methods for common operations:

```typescript
// Create a new Hedera account
const accountResult = await client.createAccount();
console.log(`Created account: ${accountResult.accountId}`);
console.log(`Private key: ${accountResult.privateKey}`);

// Get the account and signer for the client
const { accountId, signer } = client.getAccountAndSigner();

// Check the network
const network = client.getNetwork(); // 'testnet' or 'mainnet'

// Determine the type of a topic
const topicType = await client.getInboundTopicType('0.0.123456');
// Returns: InboundTopicType.PUBLIC, CONTROLLED, or FEE_BASED

// Submit a raw payload to a topic
const receipt = await client.submitPayload(
  '0.0.123456', // Topic ID
  { type: 'raw_data' }, // Payload (object or string)
  undefined, // Optional submit key
  false // Whether fee payment is required
);
```

### Logging

The SDK includes a powerful logging utility:

```typescript
// Get the logger instance
const logger = client.getLogger();

// Use logger for application logging
logger.debug('Debug information');
logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');

// Customize logging format
const customLogger = Logger.getInstance({
  level: 'debug',
  module: 'MyApplication',
  prettyPrint: true,
});
```

---

## Best Practices

### Error Handling

Implement proper error handling for network operations:

```typescript
try {
  const result = await client.createAndRegisterAgent(agentBuilder);
  if (!result.success) {
    console.error(`Agent creation failed: ${result.error}`);
    // Implement retry or fallback logic
  }
} catch (error) {
  console.error('Unexpected error:', error);
  // Handle unexpected errors
}
```

### Agent Persistence

Store agent credentials securely for continued operation:

```typescript
// Example using secure environment variables
if (process.env.AGENT_ID && process.env.AGENT_KEY) {
  // Use existing agent
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.AGENT_ID,
    operatorPrivateKey: process.env.AGENT_KEY,
  });
} else {
  // Create new agent
  const result = await client.createAndRegisterAgent(agentBuilder);
  if (result.success) {
    // Store securely (not directly in .env in production)
    process.env.AGENT_ID = result.metadata.accountId;
    process.env.AGENT_KEY = result.metadata.privateKey;
  }
}
```

### Connection Monitoring

Implement robust connection monitoring with proper retry logic:

```typescript
async function monitorInboundTopic(client, inboundTopicId) {
  let lastProcessed = 0;

  // Continuous polling with exponential backoff
  while (true) {
    try {
      const { messages } = await client.getMessages(inboundTopicId);

      // Process new requests
      const newRequests = messages.filter(
        (m) =>
          m.op === 'connection_request' && m.sequence_number > lastProcessed
      );

      for (const request of newRequests) {
        lastProcessed = Math.max(lastProcessed, request.sequence_number);
        await handleConnectionRequest(client, inboundTopicId, request);
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error polling:', error);
      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 5000 * (1 + Math.random()))
      );
    }
  }
}
```

### Scaling Agent Infrastructure

For production deployments with multiple agents:

```typescript
// Worker pool pattern for managing multiple agents
class AgentPool {
  private agents = new Map();
  private client: HCS10Client;

  constructor(baseClient: HCS10Client) {
    this.client = baseClient;
  }

  async addAgent(agentId: string, privateKey: string) {
    // Create client with agent credentials
    const agentClient = new HCS10Client({
      network: this.client.getNetwork(),
      operatorId: agentId,
      operatorPrivateKey: privateKey,
      logLevel: 'info',
    });

    // Store in agent pool
    this.agents.set(agentId, {
      client: agentClient,
      status: 'idle',
      connections: new Set(),
      lastActivity: Date.now(),
    });

    return agentId;
  }

  async createAgent(builder: AgentBuilder) {
    const result = await this.client.createAndRegisterAgent(builder);

    if (result.success) {
      return this.addAgent(
        result.metadata.accountId,
        result.metadata.privateKey
      );
    }

    throw new Error(`Failed to create agent: ${result.error}`);
  }

  getAgent(agentId: string) {
    return this.agents.get(agentId);
  }

  // Other agent pool methods...
}
```

---

## API Reference

For complete API documentation, see the [SDK Reference](https://github.com/hashgraph/hashgraph-sdk-js) or the TypeScript interfaces in `/src/hcs-10/types.ts`.

Key interfaces include:

```typescript
// Main client configuration
interface HCSClientConfig {
  network: 'mainnet' | 'testnet';
  operatorId: string;
  operatorPrivateKey: string;
  operatorPublicKey?: string;
  logLevel?: LogLevel;
  prettyPrint?: boolean;
  guardedRegistryBaseUrl?: string;
  feeAmount?: number;
}

// Agent creation response
interface CreateAgentResponse {
  inboundTopicId: string;
  outboundTopicId: string;
  pfpTopicId: string;
  profileTopicId: string;
}

// Agent registration result
interface AgentRegistrationResult {
  success: boolean;
  error?: string;
  transactionId?: string;
  confirmed?: boolean;
  state?: AgentCreationState;
  metadata?: {
    accountId: string;
    privateKey: string;
    operatorId: string;
    inboundTopicId: string;
    outboundTopicId: string;
    profileTopicId: string;
    pfpTopicId?: string;
  };
}
```

### Common Error Types

The SDK provides custom error types for better error handling:

```typescript
// Error when payload size exceeds limits
PayloadSizeError;

// Error during account creation
AccountCreationError;

// Error creating a topic
TopicCreationError;

// Error during connection confirmation
ConnectionConfirmationError;
```
