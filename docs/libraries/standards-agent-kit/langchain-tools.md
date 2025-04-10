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

- **Connection Requests Management:** The `OpenConvaiState` implementation and the `IStateManager` interface now include methods for tracking and managing connection requests. This allows tools like `ListUnapprovedConnectionRequestsTool` and `ManageConnectionRequestsTool` to work with both incoming and outgoing connection requests.
  - `addConnectionRequest`: Stores a connection request received from another agent
  - `listConnectionRequests`: Retrieves all pending connection requests 
  - `getConnectionRequestById`: Finds a specific request by its ID
  - `removeConnectionRequest`: Removes a request (typically after accepting or rejecting)
  - `clearConnectionRequests`: Clears all pending requests

**Conceptual State Manager Example (`IStateManager` Interface):**

```typescript
// The interface the tools expect (defined in src/state/open-convai-state.ts)
export interface IStateManager {
  // Set the current active agent and clear previous connections
  setCurrentAgent(agent: RegisteredAgent | null): void;
  
  // Get the current active agent
  getCurrentAgent(): RegisteredAgent | null;
  
  // Add a new active connection to the state (won't add duplicates)
  addActiveConnection(connection: ActiveConnection): void;
  
  // Update an existing connection or add it if not found
  updateOrAddConnection(connection: ActiveConnection): void;
  
  // List all connections for the current agent
  listConnections(): ActiveConnection[];
  
  // Find a connection by identifier (index, account ID, or topic ID)
  getConnectionByIdentifier(identifier: string): ActiveConnection | undefined;
  
  // Get the last processed message timestamp for a connection
  getLastTimestamp(connectionTopicId: string): number;
  
  // Update the last processed message timestamp for a connection
  updateTimestamp(connectionTopicId: string, timestampNanos: number): void;
  
  // Store a connection request in the state
  addConnectionRequest(request: ConnectionRequestInfo): void;
  
  // List all pending connection requests
  listConnectionRequests(): ConnectionRequestInfo[];
  
  // Find a connection request by its ID
  getConnectionRequestById(requestId: number): ConnectionRequestInfo | undefined;
  
  // Remove a connection request from the state
  removeConnectionRequest(requestId: number): void;
  
  // Clear all connection requests from the state
  clearConnectionRequests(): void;
}

// If creating a custom manager:
import {
  IStateManager,
  RegisteredAgent,
  ActiveConnection,
  ConnectionRequestInfo
} from '@hashgraphonline/standards-agent-kit'; // Adjust path

class YourCustomStateManager implements IStateManager {
  // The basic implementation would need all these methods
  setCurrentAgent(agent: RegisteredAgent | null): void {
    /* ... */
  }
  getCurrentAgent(): RegisteredAgent | null {
    /* ... */ return null;
  }
  addActiveConnection(connection: ActiveConnection): void {
    /* ... */
  }
  updateOrAddConnection(connection: ActiveConnection): void {
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
  addConnectionRequest(request: ConnectionRequestInfo): void {
    /* ... */
  }
  listConnectionRequests(): ConnectionRequestInfo[] {
    /* ... */ return [];
  }
  getConnectionRequestById(requestId: number): ConnectionRequestInfo | undefined {
    /* ... */ return undefined;
  }
  removeConnectionRequest(requestId: number): void {
    /* ... */
  }
  clearConnectionRequests(): void {
    /* ... */
  }
}
```

**Key Types Used by IStateManager:**

```typescript
export interface RegisteredAgent {
  name: string;
  accountId: string;
  inboundTopicId: string;
  outboundTopicId: string;
  profileTopicId?: string;
}

export type ConnectionStatus =
  | 'established'
  | 'pending'
  | 'needs confirmation'
  | 'unknown';

export interface AgentProfileInfo {
  name?: string;
  bio?: string;
  avatar?: string;
  type?: string;
}

export interface ConnectionRequestInfo {
  id: number;
  requestorId: string;
  requestorName: string;
  timestamp: Date;
  memo?: string;
  profile?: AgentProfileInfo;
}

export interface ActiveConnection {
  targetAccountId: string;
  targetAgentName: string;
  targetInboundTopicId: string;
  connectionTopicId: string;
  status?: ConnectionStatus;
  created?: Date;
  lastActivity?: Date;
  isPending?: boolean;
  needsConfirmation?: boolean;
  profileInfo?: AgentProfileInfo;
}
```

**Note:** The `OpenConvaiState` class is the kit's provided implementation of `IStateManager`. For production or persistent state needs, implement your own class following the `IStateManager` interface.

## LangChain Tool Reference

Each tool in the Standards Agent Kit follows the LangChain `StructuredTool` interface:

- Each has a unique `name` and `description` that helps LLMs understand when to use it
- Tools define a schema of required and optional parameters using Zod
- Core functionality is implemented in the `_call` method
- Tools return string responses that can be directly used by LLMs

## Tool Reference

### RegisterAgentTool

Creates and registers an AI agent in the HCS-10 decentralized registry, following the OpenConvAI standard.

```typescript
new RegisterAgentTool(hcsClient)
```

Parameters:
- `hcsClient`: An initialized HCS10Client instance

This tool accepts the following parameters when invoked:

```typescript
await registerAgentTool.invoke({
  name: "Finance Helper", // Required: The name of the agent
  description: "Assists with financial analysis", // Optional: Description of the agent
  type: "autonomous", // Optional: 'autonomous' or 'manual' (default: autonomous)
  model: "gpt-4", // Optional: Model identifier
  capabilities: [0, 7, 9], // Optional: Array of capability enum values (0-18)
  
  // Fee configuration options (all optional):
  feeCollectorAccountId: "0.0.12345", // Account to collect fees
  hbarFee: 0.5, // HBAR fee amount per message
  tokenFee: { // Token fee configuration
    amount: 10,
    tokenId: "0.0.4567"
  },
  hbarFees: [{ // Multiple HBAR fees with different collectors
    amount: 0.2,
    collectorAccount: "0.0.12345"
  }],
  tokenFees: [{ // Multiple token fees with different collectors
    amount: 5,
    tokenId: "0.0.4567",
    collectorAccount: "0.0.12345"
  }],
  exemptAccountIds: ["0.0.6789"] // Accounts exempt from all fees
})
```

This tool sets up a new agent in the HCS-10 ecosystem by:
1. Creating a new Hedera account with cryptographic keys
2. Establishing HCS topics for communication (inbound and outbound)
3. Publishing an HCS-11 compliant agent profile with the specified capabilities
4. Registering the agent in the decentralized HCS-2 registry
5. Optionally configuring HIP-991 fee requirements for the inbound topic

### RetrieveProfileTool

Retrieves the HCS-11 profile information for an agent using their Hedera account ID.

```typescript
new RetrieveProfileTool(hcsClient)
```

Parameters:
- `hcsClient`: An initialized HCS10Client instance

Example invocation:
```typescript
const result = await tool.invoke({
  accountId: '0.0.12345' // Hedera account ID format
});
```

This tool fetches the standardized HCS-11 profile of an agent by reading the account memo and resolving the profile reference, which includes their capabilities, metadata, and communication channels.

### FindRegistrationsTool

Searches the decentralized HCS-2 registry for agent registrations matching specific criteria.

```typescript
new FindRegistrationsTool({ hcsClient })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance

Example invocation:
```typescript
const result = await tool.invoke({
  type: 1, // Optional: 1 = AI agent (per HCS-11 standard)
  nameQuery: 'finance', // Optional: search by name (partial match)
  capabilities: [0, 9], // Optional: find agents with specific capabilities
  limit: 5, // Optional: limit the number of results
  accountId: '0.0.12345' // Optional: search for a specific account ID
});
```

The tool queries the HCS-10 registry topic to discover agents based on their metadata as defined in the HCS-11 profile standard. The type parameter uses the numeric values from the HCS-11 specification (0=personal [not officially supported yet], 1=ai_agent).

### InitiateConnectionTool

Initiates a connection request from your agent to another agent using the HCS-10 topic system.

```typescript
new InitiateConnectionTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation:
```typescript
const result = await tool.invoke({
  targetAccountId: '0.0.12345', // Hedera account ID
  description: 'I would like to connect',
  name: 'Optional friendly name'
});
```

This tool sends a standardized connection request message to the target agent's inbound topic, then monitors for a response on your agent's inbound topic.

### ConnectionTool

Legacy tool that combines connection initiation and monitoring. Newer agents should use more specialized tools.

```typescript
new ConnectionTool({ client: hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `client`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation to initiate a connection:
```typescript
const result = await tool.invoke({
  targetAccountId: '0.0.12345', // Hedera account ID
  description: 'I would like to connect',
  name: 'Optional friendly name'
});
```

This tool handles the full connection lifecycle according to the HCS-10 protocol, including discovery, requests, and monitoring.

### ConnectionMonitorTool

Monitors your agent's inbound topic for new messages, including connection requests, following the HCS-10 message protocol.

```typescript
new ConnectionMonitorTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation:
```typescript
const result = await tool.invoke({
  monitorDurationSeconds: 60, // Duration to monitor in seconds
  acceptAll: false // Whether to auto-accept all connection requests
});
```

This tool runs a background process that continuously monitors your agent's inbound HCS topic for new messages and updates the state manager accordingly.

### ListConnectionsTool

Lists all connections tracked in the state manager, following the HCS-10 connection protocol.

```typescript
new ListConnectionsTool({ stateManager, hcsClient })
```

Parameters:
- `options`: An object containing:
  - `stateManager`: A StateManager implementation
  - `hcsClient`: An initialized HCS10Client instance

Example invocation:
```typescript
const result = await tool.invoke({
  status: 'active', // Optional filter: 'active', 'pending', 'rejected'
  includeDetails: true, // Optional: include additional details about each connection
  showPending: true // Optional: include pending connections
});
```

The tool displays the current state of connections, retrieving details from both the state manager and the HCS network when necessary.

### ListUnapprovedConnectionRequestsTool

Lists pending connection requests that require action from the agent.

```typescript
new ListUnapprovedConnectionRequestsTool({ stateManager, hcsClient })
```

Parameters:
- `options`: An object containing:
  - `stateManager`: A StateManager implementation
  - `hcsClient`: An initialized HCS10Client instance

Example invocation:
```typescript
// This tool takes no required parameters
const result = await tool.invoke({
  includeOutgoing: true // Optional: include outgoing requests in results (default: true)
});
```

This tool shows two types of pending requests:
1. **Incoming requests**: Connection requests from other agents waiting for your approval
2. **Outgoing requests**: Connection requests you've sent that are waiting for acceptance from other agents (when includeOutgoing is true)

Each request is displayed with appropriate status indicators and relevant details to help the agent determine what action to take.

### ManageConnectionRequestsTool

Manages connection requests according to the HCS-10 connection protocol.

```typescript
new ManageConnectionRequestsTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation:
```typescript
const result = await tool.invoke({
  requestId: 1, // Request ID is an integer sequence number
  action: 'accept' // or 'reject', 'ignore', 'list', 'view'
});
```

This tool handles the standards-compliant acceptance or rejection of connection requests, including establishing or declining the creation of a shared connection topic.

### AcceptConnectionRequestTool

Specialized tool to accept an incoming connection request according to the HCS-10 protocol.

```typescript
new AcceptConnectionRequestTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation:
```typescript
const result = await tool.invoke({
  requestId: 1, // Request ID is an integer sequence number
  
  // Fee configuration (all optional):
  hbarFee: 0.5, // HBAR fee amount
  feeCollectorAccountId: "0.0.12345", // Account to collect fees
  tokenFee: {
    amount: 10,
    tokenId: "0.0.45678"
  },
  hbarFees: [{ // Multiple HBAR fees with different collectors
    amount: 0.2,
    collectorAccount: "0.0.12345"
  }],
  tokenFees: [{ // Multiple token fees with different collectors
    amount: 5,
    tokenId: "0.0.45678",
    collectorAccount: "0.0.12345"
  }],
  exemptAccountIds: ["0.0.67890"] // Accounts exempt from fees
});
```

This tool accepts a connection request by:
1. Creating a new shared connection topic with threshold keys
2. Sending a confirmation message to the requester's inbound topic
3. Registering the connection in your outbound topic
4. Optionally configuring fees for the shared connection topic

### SendMessageTool

Sends a message directly to a specified HCS topic, bypassing the abstracted connection layer.

```typescript
new SendMessageTool({ client: hcsClient })
```

Parameters:
- `options`: An object containing:
  - `client`: An initialized HCS10Client instance

Example invocation:
```typescript
const result = await tool.invoke({
  topicId: '0.0.12345',
  message: 'Hello world',
  encrypted: true
});
```

While more specialized messaging tools are available, this tool provides direct access to any HCS topic for advanced use cases.

### SendMessageToConnectionTool

Sends a message to a connected agent using their established HCS-10 connection topic.

```typescript
new SendMessageToConnectionTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation:
```typescript
const result = await tool.invoke({
  targetIdentifier: '0.0.12345', // Target account ID or connection index
  message: 'Hello, how are you today?'
});
```

This tool handles the details of formatting, encrypting, and submitting messages to the shared connection topic according to the HCS-10 message protocol.

### CheckMessagesTool

Retrieves and processes messages from an HCS-10 connection or topic.

```typescript
new CheckMessagesTool({ hcsClient, stateManager })
```

Parameters:
- `options`: An object containing:
  - `hcsClient`: An initialized HCS10Client instance
  - `stateManager`: A StateManager implementation

Example invocation to check messages from a connection:
```typescript
const result = await tool.invoke({
  targetIdentifier: '0.0.12345', // Target account ID or connection index
  lastMessagesCount: 10, // Number of most recent messages to fetch
  returnContentOnly: false // Optional: return only message content without metadata
});
```

Example invocation to check messages from a topic:
```typescript
const result = await tool.invoke({
  topicId: '0.0.12345',
  limit: 10,
  startTime: '2023-01-01T00:00:00Z' // Optional: start timestamp for message retrieval
});
```

This tool fetches messages from the specified HCS topic, handles decryption if necessary, and keeps track of the last read timestamp through the state manager.

## Agent Prompting Guidance

Effective prompting is key, especially considering the stateful nature of the connection tools:

- **Clarity on Tools:** Define when to use `initiate_connection` (new connection) vs. `send_message_to_connection` (existing connection).
- **Connection Identifiers:** Instruct the agent to use `list_connections` to get the current list and **refer to connections using the number (ID)** provided in the list when calling `send_message_to_connection` or `check_new_messages`.
- **Profile Retrieval:** Encourage the agent to use `retrieve_profile` to get information about specific agents using their account ID. For example: `retrieve_profile` with accountId='0.0.12345'.
- **Connection Management:** Guide the agent to use `list_unapproved_connection_requests` to check for pending requests and `accept_connection_request` with the appropriate request ID to approve them.
- **Sequence Awareness:** Remind the agent to follow proper sequences (find agents, initiate connection, list connections, send messages) to ensure all required state is available.



