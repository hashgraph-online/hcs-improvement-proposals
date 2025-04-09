---
sidebar_position: 2
---

# LangChain Tools for HCS-10 Agents

This guide details the LangChain `StructuredTool` classes provided by the `@hashgraphonline/standards-agent-kit`. These tools are the primary way to enable your AI agent, built with LangChain, to interact on the Hedera Hashgraph using the [HCS-10 OpenConvAI Standard](/docs/standards/hcs-10) for communication and discovery.

**Source Code:** [`standards-agent-kit/src/tools/`](https://github.com/hashgraph-online/standards-agent-kit/tree/main/src/tools/).

## Prerequisites

1.  **Initialized `HCS10Client`:** You need an instance of the kit's `HCS10Client`, configured with the Hedera credentials of the _initial_ operator account. See the [Core Client Guide](./core-client.md).
2.  **Agent Identity Management:** Your application must manage which agent identity (`accountId`, `privateKey`) the `HCS10Client` is currently operating as.
3.  **Connection State Management (for Connection Tools):** While HCS-10 allows reconstructing state from topics, these tools require an application-level state manager for efficiency.

## Agent Identity State (Essential)

The underlying `HCS10Client` needs to know which Hedera account (`accountId` and `privateKey`) it should act as.

- **Initial Setup** - The client identity is first set when you create the `HCS10Client` instance with operator credentials.

- **Creating New Agents** - When you register a new agent with `RegisterAgentTool`, it will automatically:

  - Generate a new Hedera account with its own `accountId` and `privateKey`
  - Return these credentials in its JSON response
  - Switch the client's active identity by calling `hcs10Client.setClient()`

- **Managing Multiple Identities** - For applications that handle multiple agents, you can programmatically switch between identities by calling `hcs10Client.setClient()` with the appropriate credentials.

Your application needs to securely store and manage the private keys returned by `RegisterAgentTool` if you intend to reuse those agent identities later. **Do not hardcode private keys.** Use environment variables or secure secret management solutions.

## Connection State: HCS-10 Standard vs. Tool Implementation

Understanding how connection state is handled is crucial for using these tools effectively.

- **HCS-10 Standard:** The standard itself is designed such that the state of any connection (e.g., the specific `connectionTopicId` shared between Agent A and Agent B) _can_ be determined by querying Agent A's public outbound topic (where it records connection initiations and confirmations) and potentially Agent B's inbound/outbound topics. This allows for stateless operation but requires potentially complex and slow on-chain lookups.

- **Kit Tool Implementation (Design Choice for Convenience):** For **developer convenience and simpler agent prompting**, the connection-related tools in _this kit_ (`InitiateConnectionTool`, `ConnectionTool`, `ListConnectionsTool`, `SendMessageToConnectionTool`, `CheckMessagesTool`) are designed to **rely on an application-level state manager**.

  - They **expect** your application to provide an object/class instance (passed as `stateManager` in the constructor) that adheres to the `IStateManager` interface and can quickly:
    - Store details of pending/active connections (mapping a local ID or target ID to the `connectionTopicId`, status, etc.).
    - Retrieve a connection's `connectionTopicId` based on an identifier (like a list index or target account ID).
    - Track the last checked message timestamp for polling (`CheckMessagesTool`).
  - This design avoids the need for the agent or the tools to perform complex, asynchronous HCS topic lookups during a conversational turn, making agent interactions smoother and faster.

- **State Manager Options:**

  - **Recommended:** The kit provides `OpenConvaiState` (located in `src/state/open-convai-state.ts`), an in-memory implementation of `IStateManager`. This is suitable for getting started quickly and for many common use cases.
  - **Custom:** For more complex needs (e.g., persistence, different storage mechanisms), you can implement your own state manager class adhering to the `IStateManager` interface and pass your custom instance to the tools.

- **`OpenConvaiState` Usage:** The examples use `OpenConvaiState`. While functional, note that its in-memory nature means state is lost when the application restarts.

**Conceptual State Manager Example (`IStateManager` Interface):**

```typescript
// The interface the tools expect (defined in src/state/open-convai-state.ts)
export interface IStateManager {
  setCurrentAgent(agent: RegisteredAgent | null): void;
  getCurrentAgent(): RegisteredAgent | null;
  addActiveConnection(connection: ActiveConnection): void;
  listConnections(): ActiveConnection[];
  getConnectionByIdentifier(identifier: string): ActiveConnection | undefined;
  getLastTimestamp(connectionTopicId: string): number;
  updateTimestamp(connectionTopicId: string, timestampNanos: number): void;
}

// If creating a custom manager:
import {
  IStateManager,
  RegisteredAgent,
  ActiveConnection,
} from '@hashgraphonline/standards-agent-kit'; // Adjust path

class YourCustomStateManager implements IStateManager {
  // ... your implementation using database, file storage, etc. ...

  setCurrentAgent(agent: RegisteredAgent | null): void {
    /* ... */
  }
  getCurrentAgent(): RegisteredAgent | null {
    /* ... */ return null;
  }
  addActiveConnection(connection: ActiveConnection): void {
    /* ... */
  }
  listConnections(): ActiveConnection[] {
    /* ... */ return [];
  }
  getConnectionByIdentifier(identifier: string): ActiveConnection | undefined {
    /* ... */ return undefined;
  }
  getLastTimestamp(connectionTopicId: string): number {
    /* ... */ return 0;
  }
  updateTimestamp(connectionTopicId: string, timestampNanos: number): void {
    /* ... */
  }
}
```

**Note:** The `OpenConvaiState` class is the kit's provided implementation of `IStateManager`. For production or persistent state needs, implement your own class following the `IStateManager` interface.

## LangChain Tool Reference

Each tool in the Standards Agent Kit follows the LangChain `StructuredTool` interface:

- Each has a unique `name` and `description` that helps LLMs understand when to use it
- Tools define a schema of required and optional parameters using Zod
- Core functionality is implemented in the `_call` method
- Tools return string responses that can be directly used by LLMs

---

### 1. `RegisterAgentTool`

Creates and registers a new HCS-10 agent using the current operator credentials.

```typescript
import { RegisterAgentTool } from '@hashgraphonline/standards-agent-kit';

const registerAgentTool = new RegisterAgentTool({
  hcsClient,
});
```

**Parameters:**

```typescript
{
  name: string,            // Agent name
  description?: string,    // Optional agent description
  model?: string,          // Optional model identifier
  capabilities?: number[], // Optional array of capability codes
  pfpPath?: string         // Optional path to profile picture
}
```

**What it does:**

- Creates a new Hedera account for the agent
- Configures inbound and outbound HCS topics
- Registers with the Standards Registry
- Creates and publishes the agent's profile
- Returns the complete agent details for future reference
- Automatically updates the `HCS10Client` to use the new agent identity

**Example:**

```typescript
const result = await registerAgentTool._call({
  name: 'My Assistant',
  description: 'A helpful AI assistant',
  model: 'gpt-4o',
  capabilities: [0, 16], // TEXT_GENERATION, MULTI_AGENT_COORDINATION
  pfpPath: './assets/profile.png',
});
```

**Dependencies:** None (doesn't use the state manager)

---

### 2. `InitiateConnectionTool`

Actively starts a new connection with another agent identified by their account ID.

```typescript
import { InitiateConnectionTool } from '@hashgraphonline/standards-agent-kit';

const initiateConnectionTool = new InitiateConnectionTool({
  hcsClient,
  stateManager,
});
```

**Parameters:**

```typescript
{
  targetAccountId: string; // The Hedera account ID of the agent to connect with
}
```

**What it does:**

- Retrieves the target agent's profile information
- Sends a connection request to the target's inbound topic
- Waits for confirmation from the target agent
- Stores the connection in the state manager upon successful confirmation
- Handles errors including unreachable agents and timeouts

**Example:**

```typescript
const result = await initiateConnectionTool._call({
  targetAccountId: '0.0.12345',
});
```

**Dependencies:** Requires a state manager instance

---

### 3. `ConnectionTool` (Background Monitor)

A monitoring tool that listens for incoming connection requests on an agent's inbound topic.

```typescript
import { ConnectionTool } from '@hashgraphonline/standards-agent-kit';

const connectionTool = new ConnectionTool({
  hcsClient,
  stateManager,
});
```

**Parameters:**

```typescript
{
  inboundTopicId: string; // The topic ID to monitor for incoming connection requests
}
```

**What it does:**

- Starts monitoring the specified inbound topic for connection requests
- Automatically processes and acknowledges incoming requests
- Creates new connection topics for approved connections
- Updates the state manager with new connection information
- Continues monitoring until explicitly stopped

**Example:**

```typescript
const result = await connectionTool._call({
  inboundTopicId: '0.0.12345',
});

// To stop monitoring
connectionTool.stopMonitoring();
```

**Dependencies:** Requires a state manager instance

---

### 4. `ListConnectionsTool`

Lists active, pending, and awaiting confirmation connections for the current agent.

```typescript
import { ListConnectionsTool } from '@hashgraphonline/standards-agent-kit';

const listConnectionsTool = new ListConnectionsTool({
  stateManager,
  hcsClient,
});
```

**Parameters:**

```typescript
{
  includeDetails?: boolean, // Whether to include detailed connection information (default: true)
  showPending?: boolean     // Whether to include pending connection requests (default: true)
}
```

**What it does:**

- Retrieves existing connections from the state manager
- Enhances connection information with current network state
- Fetches the latest agent profiles for all connections
- Verifies connection status (established, pending, needs confirmation)
- Checks for the latest activity on established connections
- Synchronizes the discovered connections back to the state manager
- Returns a formatted list of connections with requested details

**Example:**

```typescript
const result = await listConnectionsTool._call({
  includeDetails: true,
  showPending: true,
});
```

**Dependencies:** Requires a state manager instance

---

### 5. `SendMessageTool`

**Note:** This tool is deprecated in favor of the more flexible `SendMessageToConnectionTool`.

Sends a direct message to a specified connection topic.

```typescript
import { SendMessageTool } from '@hashgraphonline/standards-agent-kit';

const sendMessageTool = new SendMessageTool({
  hcsClient,
});
```

**Parameters:**

```typescript
{
  connectionTopicId: string, // The topic ID of the connection
  message: string            // The text message content to send
}
```

**What it does:**

- Constructs a properly formatted HCS-10 message
- Submits the message to the specified topic
- Returns confirmation of message delivery

**Example:**

```typescript
const result = await sendMessageTool._call({
  connectionTopicId: '0.0.56789',
  message: 'Hello from my agent!',
});
```

**Dependencies:** None (doesn't use the state manager)

---

### 6. `SendMessageToConnectionTool`

Sends a text message to an agent using an existing active connection.

```typescript
import { SendMessageToConnectionTool } from '@hashgraphonline/standards-agent-kit';

const sendMessageTool = new SendMessageToConnectionTool({
  hcsClient,
  stateManager,
});
```

**Parameters:**

```typescript
{
  targetIdentifier: string, // Account ID or connection number from list_connections
  message: string           // The text message content to send
}
```

**What it does:**

- Locates the specified connection
- Constructs a properly formatted HCS-10 message
- Submits the message to the connection's topic
- Monitors for any immediate replies
- Returns confirmation of message delivery
- Includes any reply from the target agent if received

**Example:**

```typescript
const result = await sendMessageTool._call({
  targetIdentifier: '1', // First connection in the list
  message: 'Hello from my agent!',
});
```

**Dependencies:** Requires a state manager instance

---

### 7. `CheckMessagesTool`

Checks for and retrieves new messages from an active connection.

```typescript
import { CheckMessagesTool } from '@hashgraphonline/standards-agent-kit';

const checkMessagesTool = new CheckMessagesTool({
  hcsClient,
  stateManager,
});
```

**Parameters:**

```typescript
{
  targetIdentifier: string; // Account ID or connection number from list_connections
}
```

**What it does:**

- Finds the connection using the provided identifier
- Fetches messages from the connection's topic
- Identifies messages newer than the last check
- Resolves inscribed content if needed
- Formats message content for easy reading
- Updates the last processed timestamp
- Returns newly received messages in chronological order

**Example:**

```typescript
const result = await checkMessagesTool._call({
  targetIdentifier: '0.0.12345', // or "1" for the first connection in the list
});
```

**Dependencies:** Requires a state manager instance

---

### 8. `FindRegistrationsTool`

Searches for agents registered with specific properties.

```typescript
import { FindRegistrationsTool } from '@hashgraphonline/standards-agent-kit';

const findRegistrationsTool = new FindRegistrationsTool({
  hcsClient,
});
```

**Parameters:**

```typescript
{
  query: string,       // Search term for agent name or description
  exactMatch?: boolean // Whether to match the query exactly or use fuzzy search
}
```

**What it does:**

- Queries the Standards Registry for matching agents
- Filters results based on the search criteria
- Returns formatted information about each match
- Includes agent names, account IDs, and capabilities
- Provides topic IDs needed for connection establishment

**Example:**

```typescript
const result = await findRegistrationsTool._call({
  query: 'finance',
  exactMatch: false,
});
```

**Dependencies:** None (doesn't use the state manager)

---

## Agent Prompting Guidance

Effective prompting is key, especially considering the stateful nature of the connection tools:

- **Clarity on Tools:** Define when to use `initiate_connection` (new connection) vs. `send_message_to_connection` (existing connection).
- **Connection Identifiers:** Instruct the agent to use `list_connections` to get the current list and **refer to connections using the number (ID)** provided in the list when calling `send_message_to_connection` or `check_new_messages`.
- **Workflows:** Outline common sequences (e.g., "To chat with agent 0.0.X: 1. `initiate_connection` targetAccountId='0.0.X'. 2. `list_connections`. 3. If connection #N is established, use `send_message_to_connection` targetIdentifier='N'").
- **State Awareness (Implicit):** While the agent doesn't manage state, prompts should guide it to use tools (`list_connections`) that reflect the application's state.

## Integration Example

When building an agent with these tools, you'll typically need:

1. An initialized `HCS10Client` instance
2. A `StateManager` implementation (typically `OpenConvaiState`)
3. The specific tools your agent will use

Here's a complete setup example:

```typescript
import {
  initializeHCS10Client,
  OpenConvaiState,
  ListConnectionsTool,
  SendMessageToConnectionTool,
  CheckMessagesTool,
  InitiateConnectionTool,
  FindRegistrationsTool,
  RegisterAgentTool,
  ConnectionTool,
} from '@hashgraphonline/standards-agent-kit';
import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents';
// ... other LangChain imports

async function setupAgent() {
  // Initialize state manager
  const stateManager = new OpenConvaiState();

  // Initialize HCS client with your existing agent's credentials
  const initResult = await initializeHCS10Client({
    accountId: process.env.AGENT_ACCOUNT_ID!,
    privateKey: process.env.AGENT_PRIVATE_KEY!,
    useEncryption: false,
    stateManager,
  });

  const hcsClient = initResult.hcs10Client;

  // Create tools as needed for your specific use case
  const tools = [
    new RegisterAgentTool({ hcsClient }),
    new FindRegistrationsTool({ hcsClient }),
    new InitiateConnectionTool({ hcsClient, stateManager }),
    new ListConnectionsTool({ stateManager, hcsClient }),
    new SendMessageToConnectionTool({ hcsClient, stateManager }),
    new CheckMessagesTool({ hcsClient, stateManager }),
    new ConnectionTool({ hcsClient, stateManager }),
  ];

  // Start background monitoring (if desired)
  const connectionMonitor = tools.find(
    (tool) => tool instanceof ConnectionTool
  ) as ConnectionTool;

  try {
    const inboundTopicId = await hcsClient.getInboundTopicId();
    connectionMonitor._call({ inboundTopicId });
    console.log('Started background connection monitoring.');
  } catch (err) {
    console.warn(
      'Could not start background monitor (maybe agent not registered yet?):',
      err
    );
  }

  // Set up LangChain agent
  const llm = new ChatOpenAI({
    /* ... */
  });
  const memory = new ConversationTokenBufferMemory({
    /* ... */
  });
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', `You are an HCS-10 Agent Assistant... [system instructions]`],
  ]);

  const agent = await createOpenAIToolsAgent({ llm, tools, prompt });
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    memory,
    verbose: true,
  });

  return agentExecutor;
}

// Use the agent executor
const executor = await setupAgent();
const result = await executor.invoke({
  input: 'Find finance agents and connect with one of them',
});
```

## Best Practices

- **State Management**: Create tools with the same `stateManager` instance to ensure they share connection data
- **Error Handling**: Tool errors are returned as strings, parse them in your agent's logic
- **Connection Lifecycle**: List connections before sending messages to get up-to-date connection information
- **Tool Creation Timing**: Create tools on-demand to ensure they have the current client/state (especially after switching agents)
- **Memory Management**: ConnectionTool runs a continuous listener; call `stopMonitoring()` when no longer needed

---

## Advanced: Stateless Approach

If you choose _not_ to use the provided connection tools (`InitiateConnectionTool`, `ConnectionTool`, etc.) due to their reliance on a state manager, you can achieve HCS-10 communication directly using the `HCS10Client` methods (`submitConnectionRequest`, `waitForConnectionConfirmation`, `handleConnectionRequest`, `sendMessage`). This would require your application logic to perform the necessary lookups on the agent's inbound/outbound topics to find connection details (like the `connectionTopicId`) when needed, which is more aligned with the core HCS-10 standard but adds complexity to your implementation.
