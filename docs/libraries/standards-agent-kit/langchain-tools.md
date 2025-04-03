---
sidebar_position: 3
---

# LangChain Tools for HCS-10

The `@hashgraphonline/standards-agent-kit` provides LangChain `StructuredTool` classes to enable AI agents to interact with the Hedera Consensus Service (HCS) according to the [HCS-10 OpenConvAI Standard](/docs/standards/hcs-10).

**Source Code:** The core tools implementation can be found on GitHub: [standards-agent-kit/src/tools/](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/) (Note: Link is illustrative, verify the actual path).

## Setup & Initialization

1.  **Install:**
    ```bash
    npm install @hashgraphonline/standards-agent-kit @langchain/openai langchain
    ```
2.  **Environment:** Configure Hedera credentials and network in your `.env` file (see `index.md` or `langchain-demo.ts`).
3.  **Core Components Initialization:** You need an `HCS10Client` and, crucially, a **single shared instance** of `DemoState` for tools managing connection lifecycles.

    ```typescript
    import {
      HCS10Client,
      DemoState,
      StandardNetworkType,
    } from '@hashgraphonline/standards-agent-kit'; // Adjust paths
    import * as dotenv from 'dotenv';

    dotenv.config();

    const operatorId = process.env.OPERATOR_ID!;
    const operatorKey = process.env.OPERATOR_PRIVATE_KEY!;
    const network = (process.env.HEDERA_NETWORK ||
      'testnet') as StandardNetworkType;

    // Initialize the HCS client
    const hcsClient = new HCS10Client(operatorId, operatorKey, network, {
      useEncryption: false, // Optional config
      // registryUrl: '...' // Optional config
    });

    // --- CRITICAL: Instantiate DemoState ONCE ---
    const demoState = new DemoState();
    ```

## Core Concepts

### `HCS10Client`

- Handles direct communication with Hedera (submitting transactions, querying topics).
- Manages the operator's account details and network configuration.
- Provides lower-level HCS-10 methods used by the tools.

### `DemoState`

- **Purpose:** An essential in-memory data store responsible for tracking the state of HCS-10 connections initiated or monitored by the agent. It maps an internal connection ID (typically an index, returned by `ListConnectionsTool`) to connection details like the target agent ID, the connection-specific HCS topic ID, and the connection status (`pending`, `established`, `error`).
- **Singleton Pattern:** It's **vital** to create only **one** `DemoState` instance and pass that _same instance_ to the constructors of all tools that require it (`InitiateConnectionTool`, `ConnectionTool`, `ListConnectionsTool`, `SendMessageToConnectionTool`, `CheckMessagesTool`). This ensures consistent state tracking across tool uses.

## LangChain Tool Reference

These tools are designed for use with LangChain agents (e.g., via `createOpenAIToolsAgent` and `AgentExecutor`).

---

### 1. `RegisterAgentTool`

- **Source:** [`RegisterAgentTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/RegisterAgentTool.ts) (Illustrative Path)
- **Constructor:** `new RegisterAgentTool(hcsClient: HCS10Client)`
- **Purpose:** Registers the agent (identified by `hcsClient`'s operator ID) on the HCS-10 registry topic, making it discoverable.
- **Agent Input Schema:** `{ name: string, description?: string, capabilities?: string[] }`
- **Output/Effect:** Returns a string confirming registration success or failure. Publishes agent details to the registry topic.

---

### 2. `InitiateConnectionTool`

- **Source:** [`InitiateConnectionTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/InitiateConnectionTool.ts) (Illustrative Path)
- **Constructor:** `new InitiateConnectionTool({ hcsClient: HCS10Client, demoState: DemoState })`
- **Purpose:** Starts the HCS-10 connection handshake _to_ a target agent. Creates necessary topics and sends the initial request.
- **Agent Input Schema:** `{ targetAgentId: string }` (e.g., `0.0.12345`)
- **Output/Effect:** Returns a string indicating the connection attempt has started (e.g., "Initiating connection to 0.0.12345..."). Updates the shared `DemoState` by adding a new connection entry with status `pending`. Submits HCS transactions to create topics and send the request.

---

### 3. `ConnectionTool` (Background Monitor)

- **Source:** [`ConnectionTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/ConnectionTool.ts) (Illustrative Path)
- **Constructor:** `new ConnectionTool({ client: HCS10Client, demoState: DemoState })`
- **Purpose:** Designed for **background execution** to monitor the agent's inbound topic for _incoming_ connection requests from other agents and manage the handshake. **Not typically invoked directly by the agent during conversation.**
- **Initialization (Application Level):** Started once via its internal `_call` method, usually during application setup (see `langchain-demo.ts` or example below). Requires fetching the agent's `inboundTopicId` first.
  ```typescript
  // In your application setup code:
  const monitor = new ConnectionTool({ client: hcsClient, demoState });
  try {
    const topicId = await hcsClient.getInboundTopicId();
    monitor
      ._call({ inboundTopicId: topicId })
      .then(/* handle success */)
      .catch(/* handle error */);
  } catch (e) {
    /* handle getInboundTopicId error */
  }
  ```
- **Agent Input Schema:** N/A (Not intended for direct agent invocation). The agent prompt might refer to "monitoring" conceptually.
- **Output/Effect:** Runs a background listener. When an incoming request is received, it performs the handshake, submits HCS transactions, and updates the shared `DemoState` with the new connection details (status `pending`, then `established` or `error`). Returns status messages via internal logging/promises. Also provides a `stopMonitoring()` method.

---

### 4. `ListConnectionsTool`

- **Source:** [`ListConnectionsTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/ListConnectionsTool.ts) (Illustrative Path)
- **Constructor:** `new ListConnectionsTool({ demoState: DemoState })`
- **Purpose:** Retrieves the list of current connections tracked by `DemoState`.
- **Agent Input Schema:** `{}` (No arguments)
- **Output/Effect:** Returns a formatted string listing connections with their index (used as `connectionId` by other tools), target agent ID, and status (e.g., `1: 0.0.12345 (established)
2: 0.0.67890 (pending)`). Reads from `DemoState`.

---

### 5. `SendMessageTool`

- **Source:** [`SendMessageTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/SendMessageTool.ts) (Illustrative Path)
- **Constructor:** `new SendMessageTool(hcsClient: HCS10Client)`
- **Purpose:** Sends a message directly to another agent's _inbound_ topic, bypassing the HCS-10 connection handshake.
- **Agent Input Schema:** `{ targetAgentId: string, message: string }`
- **Output/Effect:** Returns a string confirming message submission or failure. Submits an HCS message transaction to the target agent's known inbound topic.

---

### 6. `SendMessageToConnectionTool`

- **Source:** [`SendMessageToConnectionTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/SendMessageToConnectionTool.ts) (Illustrative Path)
- **Constructor:** `new SendMessageToConnectionTool({ hcsClient: HCS10Client, demoState: DemoState })`
- **Purpose:** Sends a message over an _established_ HCS-10 connection using its dedicated connection topic.
- **Agent Input Schema:** `{ connectionId: number | string, message: string }` (The `connectionId` should match an index from `ListConnectionsTool` for an established connection).
- **Output/Effect:** Returns a string confirming message submission or failure. Retrieves the connection's topic ID from `DemoState` using `connectionId` and submits an HCS message transaction to that specific topic. Fails if the `connectionId` is invalid or the connection is not established.

---

### 7. `CheckMessagesTool`

- **Source:** [`CheckMessagesTool.ts`](https://github.com/hashgraph/hedera-improvement-proposals/blob/main/standards-agent-kit/src/tools/CheckMessagesTool.ts) (Illustrative Path)
- **Constructor:** `new CheckMessagesTool({ hcsClient: HCS10Client, demoState: DemoState })`
- **Purpose:** Checks for new messages on all _established_ connection topics tracked in `DemoState`.
- **Agent Input Schema:** `{}` (No arguments)
- **Output/Effect:** Returns a string containing any new messages received, formatted per connection (e.g., "Messages received on connection 1: [Hello there!]"). Queries the HCS mirror node for messages on relevant topics stored in `DemoState`. Updates internal state within `DemoState` regarding seen messages (implementation detail).

---

## Integration Example (Conceptual Flow)

This example illustrates initializing components and a possible agent interaction flow.

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { ConversationTokenBufferMemory } from 'langchain/memory';
import {
  HCS10Client,
  DemoState,
  StandardNetworkType,
  RegisterAgentTool,
  InitiateConnectionTool,
  ListConnectionsTool,
  SendMessageToConnectionTool,
  CheckMessagesTool,
  SendMessageTool,
  ConnectionTool,
} from '@hashgraphonline/standards-agent-kit'; // Adjust path if necessary
import * as dotenv from 'dotenv';

dotenv.config();

async function initializeAndRunAgent() {
  // --- Initialization (as shown in Setup section) ---
  const operatorId = process.env.OPERATOR_ID!;
  const operatorKey = process.env.OPERATOR_PRIVATE_KEY!;
  const network = (process.env.HEDERA_NETWORK ||
    'testnet') as StandardNetworkType;
  const hcsClient = new HCS10Client(operatorId, operatorKey, network);
  const demoState = new DemoState(); // Single instance

  // --- Instantiate Tools with shared demoState ---
  const tools = [
    new RegisterAgentTool(hcsClient),
    new InitiateConnectionTool({ hcsClient, demoState }),
    new ListConnectionsTool({ demoState }),
    new SendMessageToConnectionTool({ hcsClient, demoState }),
    new CheckMessagesTool({ hcsClient, demoState }),
    new SendMessageTool(hcsClient),
    new ConnectionTool({ client: hcsClient, demoState }), // For background monitoring
  ];

  // --- Start Background Connection Monitoring (Application Level) ---
  const connectionMonitor = tools.find(
    (tool) => tool instanceof ConnectionTool
  ) as ConnectionTool;
  try {
    const inboundTopicId = await hcsClient.getInboundTopicId();
    console.log(`Starting background monitor for topic: ${inboundTopicId}`);
    connectionMonitor
      ._call({ inboundTopicId }) // Don't await, run in background
      .then((result) => console.log(`Background monitor ended: ${result}`)) // Logs if/when it stops
      .catch((error) => console.error('Background monitor error:', error));
  } catch (err) {
    console.error('Failed to get inbound topic or start monitor:', err);
    // Decide how to handle this - agent might not be reachable for incoming connections
  }

  // --- Setup LangChain Agent ---
  const llm = new ChatOpenAI({ modelName: 'gpt-4o', temperature: 0 });
  // Ensure memory uses the SAME llm instance if calculating tokens
  const memory = new ConversationTokenBufferMemory({
    llm: llm,
    memoryKey: 'chat_history',
    returnMessages: true,
    maxTokenLimit: 2000,
  });

  // IMPORTANT: A detailed system prompt is crucial for correct tool usage.
  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are an HCS-10 Agent Assistant.
        - **Goal:** Manage Hedera HCS-10 connections and messages.
        - **Dependencies:** You use tools that rely on a shared 'DemoState' to track connections.
        - **Key Tools & Usage:**
            - 'register_agent': Call when asked to register. Needs name. Ex: "Register as 'MyAgent'".
            - 'initiate_connection': Call ONLY to START a NEW connection TO a targetAgentId. Ex: "Connect to 0.0.12345". Updates DemoState.
            - 'list_connections': Call to see current connection status. Returns a numbered list. Ex: "Show connections". Reads DemoState.
            - 'send_message_to_connection': Call to send a message on an ESTABLISHED connection. Needs connectionId (from list_connections) and message. Ex: "Send 'hello' on connection 1". Uses DemoState.
            - 'check_messages': Call to poll for new messages on established connections. Ex: "Check for messages". Uses DemoState.
            - 'send_message': Call for direct messages WITHOUT a connection. Needs targetAgentId and message. Ex: "Send direct message 'ping' to 0.0.67890".
        - **Background Monitoring:** Monitoring for INCOMING connections is handled automatically in the background by ConnectionTool and updates DemoState. You don't call a tool to start monitoring during conversation.
        - **State:** Refer to connections using the number provided by 'list_connections'. Ensure a connection is 'established' before using 'send_message_to_connection'. Respond clearly based on tool output.`,
    ],
    new MessagesPlaceholder('chat_history'),
    ['human', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'),
  ]);

  const agent = await createOpenAIToolsAgent({ llm, tools, prompt });
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    memory,
    verbose: true,
  }); // verbose: true helps debugging

  console.log(
    "Agent Initialized. Enter commands (e.g., 'Register as MyDemoAgent', 'Connect to 0.0.xyz', 'List connections', 'Send message X on connection Y', 'Check messages', 'exit')"
  );

  // --- Example Interaction Loop (Conceptual - adapt for actual use) ---
  // Replace with your actual chat loop logic (e.g., using readline)
  async function runChat() {
    const input1 = 'Connect to 0.0.98765'; // User initiates connection
    console.log(`
> You: ${input1}`);
    const result1 = await agentExecutor.invoke({ input: input1 });
    console.log(`> Agent: ${result1.output}`); // Agent confirms initiation

    // ... time passes, connection might establish ...

    const input2 = 'List connections';
    console.log(`
> You: ${input2}`);
    const result2 = await agentExecutor.invoke({ input: input2 });
    console.log(`> Agent: ${result2.output}`); // Agent lists: "1: 0.0.98765 (established)" (hopefully)

    if (result2.output.includes('established')) {
      const input3 = "Send 'Hello from agent!' on connection 1";
      console.log(`
> You: ${input3}`);
      const result3 = await agentExecutor.invoke({ input: input3 });
      console.log(`> Agent: ${result3.output}`); // Agent confirms sending

      const input4 = 'Check messages';
      console.log(`
> You: ${input4}`);
      const result4 = await agentExecutor.invoke({ input: input4 });
      console.log(`> Agent: ${result4.output}`); // Agent reports any received messages
    }
    // Add cleanup for connectionMonitor.stopMonitoring() on exit
  }

  await runChat();
}

initializeAndRunAgent().catch(console.error);
```
