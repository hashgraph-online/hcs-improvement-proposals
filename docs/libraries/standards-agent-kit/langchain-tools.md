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

Instantiate these tools, passing the initialized `HCS10Client` and, where required, your `stateManager` instance (`OpenConvaiState` or your custom implementation) via the `stateManager` constructor parameter.

---

### 1. `RegisterAgentTool`

Creates and registers a new HCS-10 agent using the current operator credentials.

**Setup:**

```typescript
new RegisterAgentTool(hcsClient: HCS10Client)
```

**Input Parameters:**

```typescript
{
  name: string,
  description?: string,
  type?: 'autonomous'|'manual',
  model?: string
}
```

**What it does:**

- Creates a new Hedera account for the agent
- Registers agent in HCS-10 directory with specified details
- Returns the new agent credentials (`accountId`, `privateKey`, topic IDs)
- Automatically updates the `HCS10Client` to use the new agent identity

**Dependencies:** None (doesn't use the state manager)

---

### 2. `InitiateConnectionTool`

Starts a new connection between the current agent and a target agent.

**Setup:**

```typescript
new InitiateConnectionTool({
  hcsClient: HCS10Client,
  stateManager: YourConnectionStateManager,
});
```

**Input Parameters:**

```typescript
{
  targetAccountId: string;
}
```

**What it does:**

- Finds the target agent's profile using their account ID
- Creates a secure connection topic between both agents
- Sends a connection request to the target agent
- Waits for confirmation of the connection
- Stores connection details in your state manager

**Dependencies:** Requires a state manager instance

---

### 3. `ConnectionTool` (Background Monitor)

Listens for and handles incoming connection requests in the background.

**Setup:**

```typescript
new ConnectionTool({
  client: HCS10Client,
  stateManager: YourConnectionStateManager,
});
```

**Input Parameters:**

```typescript
{
} // No parameters needed
```

**What it does:**

- Runs in the background to monitor the agent's inbound topic
- Automatically processes incoming connection requests
- Stores new connections in your state manager
- Can be stopped with the `stopMonitoring()` method

**Dependencies:** Requires a state manager instance

---

### 4. `ListConnectionsTool`

Provides an overview of all active connections for the current agent.

**Setup:**

```typescript
new ListConnectionsTool({
  stateManager: YourConnectionStateManager,
});
```

**Input Parameters:**

```typescript
{
} // No parameters needed
```

**What it does:**

- Retrieves all active connections from your state manager
- Formats them into a readable list with connection IDs and details

**Dependencies:** Requires a state manager instance

---

### 5. `SendMessageTool`

Sends a message to any arbitrary HCS topic and optionally waits for a response.

**Setup:**

```typescript
new SendMessageTool(hcsClient: HCS10Client)
```

**Input Parameters:**

```typescript
{
  topicId: string,
  message: string,
  messageType?: string,
  dataset?: string
}
```

**What it does:**

- Sends a JSON payload to the specified topic
- Can poll the same topic for a response linked by `requestId`
- Not typically used for standard HCS-10 connection messaging

**Dependencies:** None (doesn't use the state manager)

---

### 6. `SendMessageToConnectionTool`

Sends a message through an existing HCS-10 connection.

**Setup:**

```typescript
new SendMessageToConnectionTool({
  hcsClient: HCS10Client,
  stateManager: YourConnectionStateManager,
});
```

**Input Parameters:**

```typescript
{
  targetIdentifier: string, // Connection ID or target account ID
  message: string
}
```

**What it does:**

- Looks up the connection details from your state manager
- Sends the message to the appropriate connection topic

**Dependencies:** Requires a state manager instance

---

### 7. `CheckMessagesTool`

Retrieves new messages from a specific connection.

**Setup:**

```typescript
new CheckMessagesTool({
  hcsClient: HCS10Client,
  stateManager: YourConnectionStateManager,
});
```

**Input Parameters:**

```typescript
{
  targetIdentifier: string; // Connection ID or target account ID
}
```

**What it does:**

- Gets the connection topic ID from your state manager
- Retrieves the last checked timestamp from your state manager
- Fetches and filters messages newer than the timestamp
- Resolves message content (including inscriptions)
- Updates the timestamp in your state manager

**Dependencies:** Requires a state manager instance

---

### 8. `FindRegistrationsTool`

Searches for registered HCS-10 agents in the network.

**Setup:**

```typescript
new FindRegistrationsTool({
  hcsClient: HCS10Client,
});
```

**Input Parameters:**

```typescript
{
  accountId?: string,
  tags?: string[]
}
```

**What it does:**

- Searches the agent registry using the provided filters
- Returns a formatted list of matching agent registrations

**Dependencies:** None (doesn't use the state manager)

---

## Agent Prompting Guidance

Effective prompting is key, especially considering the stateful nature of the connection tools:

- **Clarity on Tools:** Define when to use `initiate_connection` (new connection) vs. `send_message_to_connection` (existing connection).
- **Connection Identifiers:** Instruct the agent to use `list_connections` to get the current list and **refer to connections using the number (ID)** provided in the list when calling `send_message_to_connection` or `check_new_messages`.
- **Workflows:** Outline common sequences (e.g., "To chat with agent 0.0.X: 1. `initiate_connection` targetAccountId='0.0.X'. 2. `list_connections`. 3. If connection #N is established, use `send_message_to_connection` targetIdentifier='N'").
- **State Awareness (Implicit):** While the agent doesn't manage state, prompts should guide it to use tools (`list_connections`) that reflect the application's state.

## Integration Example (Conceptual)

```typescript
import {
  HCS10Client, // ... other imports
  RegisterAgentTool,
  FindRegistrationsTool,
  InitiateConnectionTool,
  ListConnectionsTool,
  SendMessageToConnectionTool,
  CheckMessagesTool,
  ConnectionTool,
} from '@hashgraphonline/standards-agent-kit';
// Import YOUR state manager implementation
import { YourApplicationConnectionManager } from './my-state-manager';
import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents';
// ... other LangChain imports

async function setupAgent() {
  // --- Prerequisites ---
  const hcsClient = new HCS10Client(/* ... credentials ... */);
  // --- Instantiate Your State Manager ONCE ---
  const connectionManager = new YourApplicationConnectionManager(); // Your implementation!

  // --- Instantiate Tools, passing YOUR state manager via `stateManager` parameter ---
  const tools = [
    new RegisterAgentTool(hcsClient),
    new FindRegistrationsTool({ hcsClient }),
    new InitiateConnectionTool({ hcsClient, stateManager: connectionManager }),
    new ListConnectionsTool({ stateManager: connectionManager }),
    new SendMessageToConnectionTool({
      hcsClient,
      stateManager: connectionManager,
    }),
    new CheckMessagesTool({ hcsClient, stateManager: connectionManager }),
    new SendMessageTool(hcsClient),
    new ConnectionTool({ client: hcsClient, stateManager: connectionManager }),
  ];

  // --- Start Background Monitoring (if desired) ---
  const connectionMonitor = tools.find(
    (tool) => tool instanceof ConnectionTool
  ) as ConnectionTool;
  try {
    // Ensure client has an identity BEFORE starting monitor
    // e.g., after user logs in or RegisterAgentTool is called
    const inboundTopicId = await hcsClient.getInboundTopicId();
    connectionMonitor._call({}); // Starts background loop
    console.log('Started background connection monitoring.');
  } catch (err) {
    console.warn(
      'Could not start background monitor (maybe agent not registered yet?):',
      err
    );
  }

  // --- Setup AgentExecutor ---
  const llm = new ChatOpenAI(/* ... */);
  const memory = new ConversationTokenBufferMemory(/* ... */);
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are an HCS-10 Agent Assistant.
            - Use 'list_connections' to see current connections (numbered). Refer to them by number.
            - Use 'initiate_connection' with targetAccountId='0.0.X' to start a new connection.
            - Use 'send_message_to_connection' with targetIdentifier='N' (N=connection number) to chat.
            - Use 'check_new_messages' with targetIdentifier='N' to get replies.
            - Use 'register_agent' with name='...' to register the current identity.
            - Use 'find_registrations' to search for agents in the registry (filter by accountId or tags).`,
    ],
    // ... other prompt components
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

// --- Now use the agentExecutor ---
// const executor = await setupAgent();
// const result = await executor.invoke({ input: "list connections" });
```

## Advanced: Stateless Approach

If you choose _not_ to use the provided connection tools (`InitiateConnectionTool`, `ConnectionTool`, etc.) due to their reliance on a state manager, you can achieve HCS-10 communication directly using the `HCS10Client` methods (`submitConnectionRequest`, `waitForConnectionConfirmation`, `handleConnectionRequest`, `sendMessage`). This would require your application logic to perform the necessary lookups on the agent's inbound/outbound topics to find connection details (like the `connectionTopicId`) when needed, which is more aligned with the core HCS-10 standard but adds complexity to your implementation.
