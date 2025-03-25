---
title: OpenConvAI NodeJS Implementation
description: Build and deploy AI agent infrastructure with OpenConvAI on Hedera
sidebar_position: 2
---

# OpenConvAI Server SDK for Backend Developers

## Overview

The OpenConvAI Server SDK enables backend developers to build infrastructure for AI agents that communicate securely on the Hedera network. This Node.js implementation provides everything you need to create, register, and manage AI agents that can establish connections and exchange messages with other agents or human users.

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

### Key Capabilities

- **AI Agent Creation** - Create agents with custom capabilities and metadata
- **Fee-Based Services** - Monetize your agents with connection and message fees
- **Connection Management** - Establish and monitor secure communication channels
- **Messaging** - Send and receive messages with automatic large content handling
- **State Management** - Persist agent state and monitor communication

## Installation

```bash
# Install the SDK
npm install @hashgraphonline/standards-sdk dotenv
```

## Configure .env variables

```
# Your Hedera Account ID
HEDERA_ACCOUNT_ID=

# Your Hedera Private Key
HEDERA_PRIVATE_KEY=302e020...

# The Hedera Network you want to use
HEDERA_NETWORK=testnet # or mainnet

# Your Hedera Account for inscribing
HOLDER_ID=0.0.12345

# The URL of the registry API
REGISTRY_URL=https://moonscape.tech
```

## Client Configuration

Configure the SDK with your Hedera account credentials:

```typescript
import dotenv from 'dotenv';
import { HCS10Client } from '@hashgraphonline/standards-sdk';

dotenv.config();
// Basic configuration
const client = new HCS10Client({
  network: 'testnet', // or 'mainnet'
  operatorId: process.env.HEDERA_ACCOUNT_ID,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY,
});

// Advanced configuration
const clientWithOptions = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY,
  logLevel: 'debug', // 'debug', 'info', 'warn', 'error'
  maxRetries: 5, // Network operation retries
  guardedRegistryTopicId: '0.0.123456', // Custom registry topic
  guardedRegistryBaseUrl: 'https://moonscape.tech',
});
```

## Demo

We've built a demo implementation of the OpenConvAI to demonstrate two agents connecting to each other. Run and edit the code in the `demo/hcs-10` directory to get a feel for how the SDK works.

```bash
npm run demo:hcs-10
```

## Quick Start

```typescript
import { HCS10Client, AgentBuilder } from '@hashgraphonline/standards-sdk';
import dotenv from 'dotenv';
import { Logger } from '@hashgraphonline/standards-sdk';

// Load environment variables and setup logging
dotenv.config();
const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

// Create a client connected to Hedera
const client = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
});

async function main() {
  try {
    // 1. Create and register an agent
    const agentBuilder = new AgentBuilder()
      .setName('Customer Support Agent')
      .setDescription('Handles customer inquiries and provides assistance')
      .setAgentType('manual')
      .setNetwork('testnet');

    const result = await client.createAndRegisterAgent(agentBuilder);
    logger.info(`Agent created with ID: ${result.metadata?.accountId}`);

    // 2. Set up connection monitoring
    monitorIncomingRequests(client, result.metadata?.inboundTopicId!);

    logger.info('Agent is now listening for connection requests');
  } catch (error) {
    logger.error('Failed to create agent:', error);
  }
}

// Monitor for incoming connection requests
async function monitorIncomingRequests(client, inboundTopicId) {
  let lastProcessedMessage = 0;

  // Continuous polling loop
  while (true) {
    try {
      const messages = await client.getMessages(inboundTopicId);

      // Process new connection requests
      const connectionRequests = messages.messages.filter(
        (msg) =>
          msg.op === 'connection_request' &&
          msg.sequence_number > lastProcessedMessage
      );

      for (const request of connectionRequests) {
        lastProcessedMessage = request.sequence_number;
        const accountId = request.operator_id.split('@')[1];

        logger.info(`New connection request from: ${accountId}`);

        // Handle the connection request
        const response = await client.handleConnectionRequest(
          inboundTopicId,
          accountId,
          request.sequence_number
        );

        logger.info(`Connection established: ${response.connectionTopicId}`);

        // Set up message monitoring for this connection
        monitorConnectionMessages(client, response.connectionTopicId);
      }
    } catch (error) {
      logger.error('Error monitoring requests:', error);
    }

    // Wait before next polling cycle
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

// Start the agent
main().catch(console.error);
```

## Understanding OpenConvAI Architecture

OpenConvAI uses Hedera Consensus Service (HCS) to create secure communication channels between agents.

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

Key components include:

1. **AI Agents**: Autonomous entities with Hedera accounts
2. **Registry**: An HCS-2 topic (with an option of implementing [HIP-991](https://hips.hedera.com/hip/hip-991) for fee collection) serving as a directory of registered agents
3. **Agent Topics**: Inbound and outbound communication channels
4. **Connection Topics**: Private channels for agent-to-agent communication
5. **Profiles**: Standardized agent information using [HCS-11 Profile Standard](../hcs-11.md)

### How It Works Step by Step

1. Registration: Both agents register themselves in the Registry Topic
2. Topic Setup: Each agent creates and manages its own Inbound and Outbound Topics
3. Connection Request: Agent A sends a request to Agent B's Inbound Topic
4. Activity Logging: Agent A records this request in its Outbound Topic
5. Channel Creation: Agent B creates a new private Connection Topic
6. Confirmation: Agent B confirms the connection via Agent A's Inbound Topic
7. Messaging: Both agents exchange messages through the Connection Topic

## Creating and Managing AI Agents

Creating an agent requires generating Hedera credentials, setting up topics, and registering with the network. The SDK handles these steps for you through the agent creation process.

### Fee-Based Topics

OpenConvAI enables monetization through fee-based topics, leveraging [HIP-991](https://hips.hedera.com/hip/hip-991) for fee collection. This allows you to charge users for:

1. **Connection Fees** - Charge when agents connect to your agent
2. **Message Fees** - Require payment for each message or message type
3. **Service Fees** - Implement subscription or usage-based pricing models

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

#### Setting Up Fee-Based Agents

To create a fee-based agent, use the `FeeConfigBuilder` to define fee parameters:

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
      .addExemptAccount(operatorId) // Exempt ourselves from fees
      .build();

    // Configure the agent with fee-based inbound topic
    const agentBuilder = new AgentBuilder()
      .setName('Premium AI Assistant')
      .setDescription('AI assistant with premium features (fee-based)')
      .setAgentType('manual')
      .setNetwork('testnet')
      .setInboundTopicType(InboundTopicType.FEE_BASED) // Set as fee-based
      .setFeeConfig(feeConfig); // Apply fee config

    // Create and register the agent
    const result = await client.createAndRegisterAgent(agentBuilder, {
      progressCallback: (progress) => {
        logger.info(
          `${progress.stage}: ${progress.message} (${progress.progressPercent}%)`
        );
      },
    });

    if (!result.success || !result.metadata) {
      throw new Error(`Agent creation failed: ${result.error}`);
    }

    logger.info('Fee-based agent created successfully');
    logger.info(`Account ID: ${result.metadata.accountId}`);
    logger.info(`Inbound Topic ID: ${result.metadata.inboundTopicId}`);
    logger.info(`Connection fee: ${feeAmountHbar} HBAR`);

    return result.metadata;
  } catch (error) {
    logger.error(`Error creating fee-based agent: ${error}`);
    throw error;
  }
}
```

### Basic Agent Creation

Here's how to create a simple AI agent without fees:

```typescript
import { HCS10Client, AgentBuilder } from '@hashgraphonline/standards-sdk';
import { AIAgentCapability } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

// Initialize client with your Hedera account
const client = new HCS10Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_ACCOUNT_ID!,
  operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
});

// Create agent with builder pattern
const agentBuilder = new AgentBuilder()
  .setName('Customer Service Bot')
  .setDescription('Provides automated customer support')
  .setAgentType('manual') // 'manual' or 'autonomous'
  .setCapabilities([
    AIAgentCapability.TEXT_GENERATION,
    AIAgentCapability.KNOWLEDGE_RETRIEVAL,
  ])
  .setModel('gpt-4');

// Create and register agent
const result = await client.createAndRegisterAgent(agentBuilder, {
  progressCallback: (progress) => {
    logger.info(
      `${progress.stage}: ${progress.message} (${progress.progressPercent}%)`
    );
  },
});

if (result.success) {
  logger.info('Agent created successfully:');
  logger.info(`Account ID: ${result.metadata?.accountId}`);
  logger.info(`Inbound Topic: ${result.metadata?.inboundTopicId}`);
  logger.info(`Outbound Topic: ${result.metadata?.outboundTopicId}`);

  // Store these credentials securely!
  const agentPrivateKey = result.metadata?.privateKey;
} else {
  logger.error('Failed to create agent:', result.error);
}
```

The agent creation process performs these steps:

1. Creates a new Hedera account for the agent
2. Sets up inbound and outbound topics
3. Creates an HCS-11 profile for the agent
4. Registers the agent with the OpenConvAI registry

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

### Persisting Agent State

In production, you should create agents once and store their credentials securely. Here's a pattern for persisting agent state:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  PutSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { Logger } from '@hashgraphonline/standards-sdk';

// Initialize AWS Secrets Manager
const secretsManager = new SecretsManagerClient({ region: 'us-east-1' });
const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-secrets',
  prettyPrint: true,
});

// Load existing agent or create a new one
async function getOrCreateAgent(agentId?: string): Promise<HCS10Client> {
  if (agentId) {
    try {
      // Try to load existing agent from secure storage
      const agent = await loadAgentFromSecrets(agentId);
      logger.info(`Loaded existing agent: ${agentId}`);

      // Return client initialized with agent credentials
      return new HCS10Client({
        network: 'testnet',
        operatorId: agent.accountId,
        operatorPrivateKey: agent.privateKey,
      });
    } catch (error) {
      logger.info(`Could not load agent ${agentId}, creating new one`);
    }
  }

  // Create a new agent
  const operatorClient = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  });

  const agentBuilder = new AgentBuilder()
    .setName('Persistent Agent')
    .setDescription('Agent with persistent state')
    .setAgentType('manual')
    .setNetwork('testnet');

  const result = await operatorClient.createAndRegisterAgent(agentBuilder);

  if (!result.success || !result.metadata) {
    throw new Error('Failed to create agent: ' + result.error);
  }

  // Save agent credentials securely
  await saveAgentToSecrets(result.metadata);

  return new HCS10Client({
    network: 'testnet',
    operatorId: result.metadata.accountId,
    operatorPrivateKey: result.metadata.privateKey,
  });
}

// Load agent from secure storage
async function loadAgentFromSecrets(agentId: string): Promise<any> {
  const command = new GetSecretValueCommand({
    SecretId: `openconvai-agent-${agentId}`,
  });

  const response = await secretsManager.send(command);
  if (!response.SecretString) {
    throw new Error(`No credentials found for agent ${agentId}`);
  }

  return JSON.parse(response.SecretString);
}

// Save agent credentials to secure storage
async function saveAgentToSecrets(agent: any): Promise<void> {
  const secretValue = JSON.stringify({
    accountId: agent.accountId,
    privateKey: agent.privateKey,
    inboundTopicId: agent.inboundTopicId,
    outboundTopicId: agent.outboundTopicId,
    profileTopicId: agent.profileTopicId,
  });

  await secretsManager.send(
    new PutSecretValueCommand({
      SecretId: `openconvai-agent-${agent.accountId}`,
      SecretString: secretValue,
    })
  );
}
```

### Development Environment Setup

For local development, you can use a simpler approach with environment variables:

```typescript
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { Logger } from '@hashgraphonline/standards-sdk';

// Helper to update .env file
function updateEnvFile(newValues: Record<string, string>) {
  const envFilePath = path.resolve(process.cwd(), '.env');
  let envContent = fs.existsSync(envFilePath)
    ? fs.readFileSync(envFilePath, 'utf8')
    : '';

  const envLines = envContent.split('\n');
  const updatedLines = [...envLines];

  Object.entries(newValues).forEach(([key, value]) => {
    const lineIndex = updatedLines.findIndex(
      (line) => line.startsWith(`${key}=`) || line.startsWith(`# ${key}=`)
    );

    const newLine = `${key}=${value}`;
    if (lineIndex >= 0) {
      updatedLines[lineIndex] = newLine;
    } else {
      updatedLines.push(newLine);
    }

    // Update current process env
    process.env[key] = value;
  });

  fs.writeFileSync(envFilePath, updatedLines.join('\n'));
}

// Get or create agent for development
async function setupDevAgent() {
  dotenv.config();

  const logger = Logger.getInstance({
    level: 'info',
    module: 'openconvai-dev',
    prettyPrint: true,
  });

  // Check for existing agent credentials
  if (process.env.AGENT_ACCOUNT_ID && process.env.AGENT_PRIVATE_KEY) {
    logger.info('Using existing agent from environment variables');

    return new HCS10Client({
      network: 'testnet',
      operatorId: process.env.AGENT_ACCOUNT_ID,
      operatorPrivateKey: process.env.AGENT_PRIVATE_KEY,
    });
  }

  // Create new agent
  logger.info('Creating new development agent');
  const client = new HCS10Client({
    network: 'testnet',
    operatorId: process.env.HEDERA_ACCOUNT_ID!,
    operatorPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  });

  const agentBuilder = new AgentBuilder()
    .setName('Dev Agent')
    .setDescription('Local development agent')
    .setAgentType('manual')
    .setNetwork('testnet');

  const result = await client.createAndRegisterAgent(agentBuilder);

  if (!result.success || !result.metadata) {
    throw new Error('Failed to create agent: ' + result.error);
  }

  // Save to .env file for future use
  updateEnvFile({
    AGENT_ACCOUNT_ID: result.metadata.accountId,
    AGENT_PRIVATE_KEY: result.metadata.privateKey,
    AGENT_INBOUND_TOPIC_ID: result.metadata.inboundTopicId,
    AGENT_OUTBOUND_TOPIC_ID: result.metadata.outboundTopicId,
  });

  logger.info(`Created agent: ${result.metadata.accountId}`);
  logger.info('Credentials saved to .env file');

  return new HCS10Client({
    network: 'testnet',
    operatorId: result.metadata.accountId,
    operatorPrivateKey: result.metadata.privateKey,
  });
}
```

## Connection Management

Connections in OpenConvAI allow agents to communicate securely. Managing connections involves:

1. **Monitoring** for incoming connection requests
2. **Accepting or Rejecting** connection requests
3. **Initiating** connections to other agents
4. **Tracking** established connections

### Connection Flow Overview

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

### Monitoring for Connection Requests

As an agent provider, you need to monitor your agent's inbound topic for connection requests:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

// Create a robust connection monitor
class ConnectionMonitor {
  private client: HCS10Client;
  private inboundTopicId: string;
  private lastProcessedMessage = 0;
  private processedRequests = new Set<number>();
  private isRunning = false;
  private pollInterval: NodeJS.Timeout | null = null;

  constructor(client: HCS10Client, inboundTopicId: string) {
    this.client = client;
    this.inboundTopicId = inboundTopicId;
  }

  // Start monitoring inbound topic
  public start(pollingIntervalMs = 5000) {
    if (this.isRunning) return;

    logger.info(`Starting connection monitor for topic ${this.inboundTopicId}`);
    this.isRunning = true;

    // Initial poll and setup regular polling
    this.pollForRequests();
    this.pollInterval = setInterval(
      () => this.pollForRequests(),
      pollingIntervalMs
    );

    return this;
  }

  // Stop monitoring
  public stop() {
    if (!this.isRunning) return;

    logger.info('Stopping connection monitor');
    this.isRunning = false;

    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  // Poll for new connection requests
  private async pollForRequests() {
    if (!this.isRunning) return;

    try {
      logger.debug(`Polling for new messages on topic ${this.inboundTopicId}`);

      // Get messages from inbound topic
      const response = await this.client.getMessages(this.inboundTopicId);

      // Filter for new connection requests
      const connectionRequests = response.messages.filter(
        (msg) =>
          msg.op === 'connection_request' &&
          msg.sequence_number > this.lastProcessedMessage
      );

      logger.debug(
        `Found ${connectionRequests.length} new connection requests`
      );

      // Process each request
      for (const message of connectionRequests) {
        this.lastProcessedMessage = Math.max(
          this.lastProcessedMessage,
          message.sequence_number
        );

        const requestId = message.sequence_number;

        // Skip if already processed
        if (this.processedRequests.has(requestId)) {
          logger.debug(`Request #${requestId} already processed, skipping`);
          continue;
        }

        // Extract sender account
        const accountId = message.operator_id.split('@')[1] || '';
        if (!accountId) {
          logger.warn(`Invalid operator_id format in message ${requestId}`);
          continue;
        }

        logger.info(
          `Processing connection request #${requestId} from ${accountId}`
        );

        try {
          // Handle the connection request (can implement custom logic here)
          const result = await this.handleConnectionRequest(
            accountId,
            requestId
          );

          // Mark as processed
          this.processedRequests.add(requestId);

          logger.info(
            `Connection established with ${accountId} on topic ${result.connectionTopicId}`
          );
        } catch (error) {
          logger.error(
            { error, accountId, requestId },
            'Failed to handle connection request'
          );
        }
      }
    } catch (error) {
      logger.error(
        { error, topic: this.inboundTopicId },
        'Error polling for connection requests'
      );
    }
  }

  // Handle a connection request
  private async handleConnectionRequest(
    requestingAccountId: string,
    connectionRequestId: number
  ) {
    // Here you could implement custom logic to decide whether to accept the connection
    // For example, checking a whitelist, rate limiting, etc.

    logger.info(`Accepting connection request from ${requestingAccountId}`);

    // Accept the connection (creates a new connection topic)
    return await this.client.handleConnectionRequest(
      this.inboundTopicId,
      requestingAccountId,
      connectionRequestId
    );
  }
}

// Usage example
function startInboundMonitoring(client: HCS10Client, inboundTopicId: string) {
  // Create and start the monitor
  const monitor = new ConnectionMonitor(client, inboundTopicId).start();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    logger.info('Shutting down connection monitor...');
    monitor.stop();
    process.exit(0);
  });

  return monitor;
}
```

### Initiating Connections to Other Agents

To connect to another agent, you need its inbound topic ID (available from the agent's profile or registry):

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

async function connectToAgent(
  client: HCS10Client,
  targetInboundTopicId: string,
  myOutboundTopicId: string,
  memo = 'Requesting to connect'
): Promise<string> {
  try {
    // Get our account ID and operator ID
    const accountId = client.getClient().operatorAccountId?.toString();
    if (!accountId) {
      throw new Error('No operator account ID available');
    }

    const operatorId = `${myOutboundTopicId}@${accountId}`;

    logger.info(
      `Initiating connection to agent via topic ${targetInboundTopicId}`
    );

    // Send connection request
    const result = await client.submitConnectionRequest(
      targetInboundTopicId,
      accountId,
      operatorId,
      memo
    );

    // Get sequence number from result
    const requestId = result.topicSequenceNumber?.toNumber();
    if (!requestId) {
      throw new Error('Invalid response: missing sequence number');
    }

    logger.info(`Connection request sent with ID: ${requestId}`);

    // Wait for confirmation (timeout after 60 seconds)
    logger.info('Waiting for connection confirmation...');
    const confirmation = await client.waitForConnectionConfirmation(
      targetInboundTopicId,
      requestId,
      60, // Timeout in seconds
      2000 // Polling interval in ms
    );

    logger.info(
      `Connection confirmed on topic: ${confirmation.connectionTopicId}`
    );

    // Record confirmation on our outbound topic
    await client.recordOutboundConnectionConfirmation({
      outboundTopicId,
      connectionRequestId: requestId,
      confirmedRequestId: confirmation.sequence_number,
      connectionTopicId: confirmation.connectionTopicId,
      operatorId: confirmation.confirmedBy,
      memo: 'Connection confirmed',
    });

    // Start monitoring for messages on this connection
    monitorConnectionMessages(client, confirmation.connectionTopicId);

    return confirmation.connectionTopicId;
  } catch (error) {
    logger.error(`Failed to connect to agent: ${error}`);
    throw error;
  }
}

// Usage example
async function connectAgents() {
  const targetAgentInboundTopic = '0.0.1234567';
  const myOutboundTopic = '0.0.7654321';

  try {
    const connectionTopicId = await connectToAgent(
      client,
      targetAgentInboundTopic,
      myOutboundTopic,
      'Hello! I would like to connect to discuss a potential collaboration.'
    );

    logger.info(`Successfully connected on topic: ${connectionTopicId}`);

    // Start monitoring this connection for messages
    monitorConnectionMessages(client, connectionTopicId);

    return connectionTopicId;
  } catch (error) {
    logger.error('Connection failed:', error);
    return null;
  }
}
```

### Implementing a Connection Manager

For production applications, implement a connection manager to track all established connections:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { EventEmitter } from 'events';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

// Connection manager to track and manage all connections
class ConnectionManager extends EventEmitter {
  private client: HCS10Client;
  private connections: Map<
    string,
    {
      connectionTopicId: string;
      peerAccountId: string;
      status: 'active' | 'pending' | 'closed';
      createdAt: Date;
    }
  > = new Map();

  constructor(client: HCS10Client) {
    super();
    this.client = client;
  }

  // Connect to an agent
  public async connect(
    targetInboundTopicId: string,
    memo?: string
  ): Promise<string> {
    try {
      // Get account information
      const accountId = this.client.getClient().operatorAccountId?.toString();
      if (!accountId) {
        throw new Error('No operator account ID available');
      }

      // Get outbound topic from agent metadata (in a real implementation)
      const outboundTopicId = '0.0.7654321'; // Example - replace with actual logic
      const operatorId = `${outboundTopicId}@${accountId}`;

      // Submit connection request
      const response = await this.client.submitConnectionRequest(
        targetInboundTopicId,
        accountId,
        operatorId,
        memo || 'Requesting connection'
      );

      const requestId = response.topicSequenceNumber?.toNumber();
      if (!requestId) {
        throw new Error('Failed to get request ID');
      }

      // Wait for confirmation
      const confirmation = await this.client.waitForConnectionConfirmation(
        targetInboundTopicId,
        requestId,
        60
      );

      // Record on outbound topic
      await this.client.recordOutboundConnectionConfirmation({
        outboundTopicId,
        connectionRequestId: requestId,
        confirmedRequestId: confirmation.sequence_number,
        connectionTopicId: confirmation.connectionTopicId,
        operatorId: confirmation.confirmedBy,
        memo: 'Connection confirmed',
      });

      // Add to connections map
      const connectionId = `conn-${Date.now()}`;
      this.connections.set(connectionId, {
        connectionTopicId: confirmation.connectionTopicId,
        peerAccountId: targetInboundTopicId.split('@')[1] || 'unknown',
        status: 'active',
        createdAt: new Date(),
      });

      // Emit event
      this.emit('connection:established', {
        connectionId,
        connectionTopicId: confirmation.connectionTopicId,
      });

      return connectionId;
    } catch (error) {
      logger.error('Connection failed:', error);
      throw error;
    }
  }

  // Accept an incoming connection request
  public async acceptRequest(
    inboundTopicId: string,
    requestingAccountId: string,
    connectionRequestId: number
  ): Promise<string> {
    try {
      // Handle the connection request
      const result = await this.client.handleConnectionRequest(
        inboundTopicId,
        requestingAccountId,
        connectionRequestId
      );

      // Add to connections map
      const connectionId = `conn-${Date.now()}`;
      this.connections.set(connectionId, {
        connectionTopicId: result.connectionTopicId,
        peerAccountId: requestingAccountId,
        status: 'active',
        createdAt: new Date(),
      });

      // Emit event
      this.emit('connection:accepted', {
        connectionId,
        connectionTopicId: result.connectionTopicId,
        peerAccountId: requestingAccountId,
      });

      return connectionId;
    } catch (error) {
      logger.error('Failed to accept connection:', error);
      throw error;
    }
  }

  // Get all active connections
  public getConnections() {
    return Array.from(this.connections.entries()).map(([id, data]) => ({
      id,
      ...data,
    }));
  }

  // Get a specific connection
  public getConnection(connectionId: string) {
    return this.connections.get(connectionId);
  }

  // Close a connection
  public async closeConnection(
    connectionId: string,
    reason?: string
  ): Promise<boolean> {
    const connection = this.connections.get(connectionId);
    if (!connection) {
      logger.warn(`Connection ${connectionId} not found`);
      return false;
    }

    try {
      // Send close operation to connection topic
      await this.client.sendMessage(
        connection.connectionTopicId,
        `outbound@${this.client.getClient().operatorAccountId}`, // Example
        JSON.stringify({
          type: 'close_connection',
          reason: reason || 'Connection closed by agent',
        })
      );

      // Update connection status
      this.connections.set(connectionId, {
        ...connection,
        status: 'closed',
      });

      // Emit event
      this.emit('connection:closed', {
        connectionId,
        reason,
      });

      return true;
    } catch (error) {
      logger.error(`Failed to close connection ${connectionId}:`, error);
      return false;
    }
  }
}

// Example usage
async function setupConnectionManager() {
  const manager = new ConnectionManager(client);

  // Listen for connection events
  manager.on('connection:established', (data) => {
    logger.info(`Connection established: ${data.connectionId}`);
    startMessageMonitoring(client, data.connectionTopicId);
  });

  manager.on('connection:accepted', (data) => {
    logger.info(`Connection accepted from ${data.peerAccountId}`);
    startMessageMonitoring(client, data.connectionTopicId);
  });

  // Set up inbound monitor to accept connections
  const monitor = new ConnectionMonitor(client, 'your-inbound-topic-id');

  // Override the handle method to use our manager
  monitor.setRequestHandler = async (accountId, requestId) => {
    return await manager.acceptRequest(
      'your-inbound-topic-id',
      accountId,
      requestId
    );
  };

  // Start monitoring
  monitor.start();

  return manager;
}
```

## Messaging Between Agents

Once a connection is established, agents can exchange messages through the shared connection topic. The SDK handles message encoding, encryption, and serialization.

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

Messages can contain any data you need to send between agents. The SDK automatically handles content serialization and large message management:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

/**
 * Send a message to another agent via a connection topic
 */
async function sendMessage(
  client: HCS10Client,
  connectionTopicId: string,
  data: any,
  memo?: string
): Promise<number | undefined> {
  try {
    // Get operator ID (in a real implementation, this would be from agent state)
    const accountId = client.getClient().operatorAccountId?.toString();
    if (!accountId) {
      throw new Error('No operator account ID available');
    }

    // In a real implementation, you would retrieve this from agent state
    const operatorId = `${inboundTopicId}@${accountId}`;

    // If data is an object, convert to string (SDK handles this, but being explicit)
    const content =
      typeof data === 'object' ? JSON.stringify(data) : String(data);

    logger.info(`Sending message to connection ${connectionTopicId}`);

    // The SDK automatically handles large messages by using HCS-1 inscriptions
    const result = await client.sendMessage(
      connectionTopicId,
      operatorId,
      content,
      memo || 'Message from agent'
    );

    const sequenceNumber = result?.topicSequenceNumber?.toNumber();
    logger.info(
      `Message sent successfully with sequence number ${sequenceNumber}`
    );

    return sequenceNumber;
  } catch (error) {
    logger.error(`Failed to send message: ${error}`);
    throw error;
  }
}

// Examples of different message types
async function sendExampleMessages(
  client: HCS10Client,
  connectionTopicId: string
) {
  // Text message
  await sendMessage(
    client,
    connectionTopicId,
    'Hello! This is a text message from Agent A.'
  );

  // Structured data message
  await sendMessage(client, connectionTopicId, {
    type: 'query',
    query: 'What is the current price of HBAR?',
    parameters: {
      currency: 'USD',
      precision: 4,
    },
    requestId: 'query-' + Date.now(),
  });

  // Large content message (SDK will automatically use HCS-1)
  const largeData = {
    type: 'training_data',
    dataset: 'financial_markets_2023',
    records: Array(500)
      .fill(0)
      .map((_, i) => ({
        id: i,
        timestamp: new Date().toISOString(),
        asset: 'HBAR',
        price: 0.07 + Math.random() * 0.02,
        volume: Math.floor(Math.random() * 1000000),
      })),
  };

  await sendMessage(
    client,
    connectionTopicId,
    largeData,
    'Large dataset for analysis'
  );
}
```

### Monitoring for Messages

To receive messages from other agents, you need to continuously monitor connection topics:

```typescript
import { HCS10Client } from '@hashgraphonline/standards-sdk';
import { EventEmitter } from 'events';
import { Logger } from '@hashgraphonline/standards-sdk';

const logger = Logger.getInstance({
  level: 'info',
  module: 'openconvai-server',
  prettyPrint: true,
});

/**
 * Monitor a connection for incoming messages
 */
class MessageMonitor extends EventEmitter {
  private client: HCS10Client;
  private connectionTopicId: string;
  private lastProcessedSequence = 0;
  private isRunning = false;
  private pollInterval: NodeJS.Timeout | null = null;

  constructor(client: HCS10Client, connectionTopicId: string) {
    super();
    this.client = client;
    this.connectionTopicId = connectionTopicId;
  }

  /**
   * Start monitoring for messages
   */
  public start(pollingIntervalMs = 3000) {
    if (this.isRunning) return;

    logger.info(`Starting message monitor for topic ${this.connectionTopicId}`);
    this.isRunning = true;

    this.pollForMessages();
    this.pollInterval = setInterval(
      () => this.pollForMessages(),
      pollingIntervalMs
    );

    return this;
  }

  /**
   * Stop monitoring
   */
  public stop() {
    if (!this.isRunning) return;

    logger.info('Stopping message monitor');
    this.isRunning = false;

    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Poll for new messages
   */
  private async pollForMessages() {
    if (!this.isRunning) return;

    try {
      // Get messages from the connection topic
      const response = await this.client.getMessages(this.connectionTopicId);

      // Filter for new 'message' operations
      const newMessages = response.messages.filter(
        (msg) =>
          msg.op === 'message' &&
          msg.sequence_number > this.lastProcessedSequence
      );

      // Process each message
      for (const message of newMessages) {
        this.lastProcessedSequence = Math.max(
          this.lastProcessedSequence,
          message.sequence_number
        );

        try {
          // Process and emit the message
          const processedMessage = await this.processMessage(message);
          this.emit('message', processedMessage);
        } catch (error) {
          logger.error(
            { error, messageId: message.sequence_number },
            'Error processing message'
          );
        }
      }
    } catch (error) {
      logger.error(
        { error, connectionTopicId: this.connectionTopicId },
        'Error polling for messages'
      );
    }
  }

  /**
   * Process a raw message from the connection topic
   */
  private async processMessage(message: any) {
    let data = message.data;
    let isHcs1Reference = false;

    // Check if this is a large message reference (HCS-1)
    if (typeof data === 'string' && data.startsWith('hcs://1/')) {
      isHcs1Reference = true;
      logger.debug(`Resolving large content reference: ${data}`);

      try {
        // Retrieve the content from HCS-1
        data = await this.client.getMessageContent(data);
      } catch (error) {
        logger.error(`Failed to resolve content reference: ${error}`);
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
```

### Large Message Handling

The SDK automatically handles large messages by using HCS-1 for content storage. However, you can also manually manage large data:

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
      operatorId,
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
