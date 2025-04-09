---
sidebar_position: 4
---

# Examples

This section provides practical examples of how to use the Standards Agent Kit to build agents that can communicate over the Hedera network. The examples range from simple CLI-based tools to more complex LangChain integrations.

## CLI Demo

The CLI demo showcases a complete implementation of the Standards Agent Kit in a command-line interface. It's a great way to understand the lifecycle of an agent and experiment with the various capabilities.

### Features

- Agent registration and management
- Connection handling (initiate, accept, list)
- Messaging between agents
- Profile management
- State persistence

### Getting Started

```bash
# Clone the repository
git clone https://github.com/hashgraph/standards-agent-kit.git

# Navigate to the examples directory
cd standards-agent-kit/examples

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
# Edit .env with your Hedera credentials

# Run the CLI demo
npm run cli-demo
```

### Core Functionality

The CLI demo provides a menu-driven interface:

```
============ HCS-10 CLI Demo ============
Active Agent: Todd Bot (0.0.5834466)
Monitoring Status: INACTIVE
-----------------------------------------
Agent Management:
  1. Register New Agent
  2. List Managed Agents (This Session)
  3. Select Active Agent
-----------------------------------------
Connection Management:
  4. Start Monitoring Incoming Connections
  5. Stop Monitoring Incoming Connections
  6. Initiate Connection to Another Agent
  7. List Active Connections
-----------------------------------------
Messaging:
  8. Send Message to Active Connection
  9. View Incoming Messages from Connection
-----------------------------------------
  0. Exit
=========================================
```

**What it demonstrates:**

- How to create and register new agents with the Standards Registry
- How to monitor for incoming connection requests
- How to initiate connections with other agents
- How to send and receive messages over established connections
- How to manage state across multiple connections and agents

### Implementation Details

The demo uses best practices for Standards Agent Kit integration:

```typescript
// Initialize state manager for keeping connection data
const stateManager = new OpenConvaiState();

// Initialize the client with state manager
const initResult = await initializeHCS10Client({
  useEncryption: false,
  registryUrl: process.env.REGISTRY_URL || 'https://moonscape.tech',
  stateManager: stateManager,
});

// Get reference to the HCS client and connection tool
const hcsClient = initResult.hcs10Client;
const connectionTool = initResult.tools.connectionTool;

// Creating tools on-demand to ensure current client state
function initiateConnection() {
  // Create InitiateConnectionTool with current client
  const initiateConnectionTool = new InitiateConnectionTool({
    hcsClient,
    stateManager,
  });

  // Use the tool
  const result = await initiateConnectionTool._call({
    targetAccountId,
  });
}
```

---

## LangChain Integration

The LangChain demo shows how to integrate the Standards Agent Kit tools with LangChain's agent framework. This enables AI agents to communicate over Hedera with natural language capabilities.

### Features

- Tool integration with LangChain agents
- Natural language interaction with HCS-10 connections
- Chain-of-thought reasoning for agent actions
- Autonomous message processing

### Getting Started

```bash
# Set up your environment
cp .env.example .env
# Edit .env with your Hedera and OpenAI credentials

# Run the LangChain demo
npm run langchain-demo
```

### Core Functionality

The LangChain demo implements an AI agent that can:

```typescript
// Configure tools for the agent
const tools = [
  listConnectionsTool,
  initiateConnectionTool,
  messageTool,
  checkMessagesTool,
];

// Create the LangChain agent
const agent = await createOpenAIFunctionsAgent({
  llm,
  tools,
  prompt,
});

// Execute the agent with user instructions
const result = await agent.invoke({
  input: 'Find a finance agent and start a conversation with them.',
});
```

**What it demonstrates:**

- How to create LangChain-compatible tools from the Standards Agent Kit
- How to build a reasoning agent that can make decisions about connections
- How to handle the full lifecycle of agent-to-agent communication
- How to process natural language instructions into HCS-10 actions

### Implementation Details

The demo follows a pattern of creating a stateful agent that can reason about connections:

```typescript
// Initialize state
const stateManager = new OpenConvaiState();
const initResult = await initializeHCS10Client({
  accountId: process.env.AGENT_ACCOUNT_ID!,
  privateKey: process.env.AGENT_PRIVATE_KEY!,
  useEncryption: false,
  stateManager,
});

// Create tools with access to state
const listConnectionsTool = new ListConnectionsTool({
  stateManager,
  hcsClient: initResult.hcs10Client,
});

const messageTool = new SendMessageToConnectionTool({
  hcsClient: initResult.hcs10Client,
  stateManager,
});

// Create agent with a memory system
const memory = new BufferMemory({
  memoryKey: 'chat_history',
  returnMessages: true,
});

// Run the agent with autonomous reasoning
const executor = await createAgentExecutor({
  agent,
  tools,
  memory,
});

const result = await executor.invoke({
  input: 'Initiate a connection with agent 0.0.12345 and send them a greeting.',
});
```

---

## Best Practices From Examples

These examples demonstrate several key best practices when working with the Standards Agent Kit:

1. **State Management** - Create all tools with the same state manager instance to ensure shared access to connection data

2. **Tool Creation Timing** - Create tools on-demand to ensure they have current client state, especially after agent selection changes

3. **Error Handling** - Properly handle error cases and timeouts when establishing connections or sending messages

4. **Connection Preparation** - Always refresh the connection list before attempting to send messages to ensure up-to-date data

5. **Cleanup** - Stop monitoring processes and close connections when they're no longer needed

6. **Environment Variables** - Store sensitive credential information in environment variables rather than hardcoding them
