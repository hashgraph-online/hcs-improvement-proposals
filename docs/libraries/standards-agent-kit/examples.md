---
sidebar_position: 4
---

# Usage Examples

This section provides practical examples demonstrating how to leverage the Standards Agent Kit in different scenarios.

## Example 1: Basic LangChain Agent Setup

This example builds a simple LangChain agent equipped with all HCS-10 tools, capable of registering itself and potentially interacting with other agents based on user prompts.

```typescript
import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { SystemMessage } from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { initializeHCS10Client } from '@hashgraphonline/standards-agent-kit';
import dotenv from 'dotenv';

dotenv.config();

async function createHCS10AgentExecutor() {
  // 1. Initialize LLM
  const llm = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-4-turbo', // Ensure API key is in .env
  });

  // 2. Initialize HCS-10 Tools
  const { tools } = await initializeHCS10Client(); // Uses .env for config
  const hcs10Tools = Object.values(tools);

  // 3. Define Agent Prompt
  const systemPrompt = `You are 'HederaAgent', an AI assistant that can interact with the Hedera network using the HCS-10 standard.
  You have tools to register yourself, manage connections, and send messages to other agents on Hedera.
  When asked to perform an action like registering or connecting, use your tools.
  Think step-by-step. Clearly state the outcome of your actions.`;

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    ['human', '{input}'],
    new MessagesPlaceholder('agent_scratchpad'), // Essential for agent reasoning
  ]);

  // 4. Create the Agent
  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools: hcs10Tools,
    prompt,
  });

  // 5. Create the Agent Executor
  const executor = new AgentExecutor({
    agent,
    tools: hcs10Tools,
    verbose: true, // Set to true for detailed logging
  });

  console.log('Agent Executor created with HCS-10 tools.');
  return executor;
}

// --- Run the Agent ---
async function runAgent() {
  try {
    const agentExecutor = await createHCS10AgentExecutor();

    // Example Interaction 1: Registration
    console.log('\n--- Asking agent to register ---');
    const registrationInput =
      "Register me as a new agent named 'InfoBot' capable of providing information.";
    const registrationResult = await agentExecutor.invoke({
      input: registrationInput,
    });
    console.log('\nRegistration - Final Answer:', registrationResult.output);

    // Example Interaction 2: Attempt Connection (Requires knowing target info)
    // Note: This will likely fail unless the agent can discover the target agent's info
    // or it's provided in the prompt/knowledge base.
    console.log('\n--- Asking agent to connect (discovery needed) ---');
    const connectionInput = 'Try to connect to an agent with ID 0.0.98765.'; // Agent needs inbound topic ID!
    const connectionResult = await agentExecutor.invoke({
      input: connectionInput,
    });
    console.log('\nConnection - Final Answer:', connectionResult.output);
  } catch (error) {
    console.error('\nAgent execution error:', error);
  }
}

runAgent();
```

**Explanation:**

1.  **Initialization:** Sets up the LLM and HCS-10 tools.
2.  **Prompting:** The system prompt clearly defines the agent's identity and HCS-10 capabilities.
3.  **Agent Creation:** Uses `createOpenAIFunctionsAgent` which is suitable for function-calling models like OpenAI's `gpt-4-turbo`.
4.  **Execution:** The `AgentExecutor` runs the agent logic. `verbose: true` is highly recommended for debugging tool usage.
5.  **Interaction:** The examples show how user input triggers the agent to potentially use the `RegisterAgentTool` or `ConnectionTool`.

## Example 2: Direct Client & Tool Usage for Agent-to-Agent Communication

This example uses a mix of direct `HCS10Client` calls (for registration, messaging) and the `ConnectionTool` (for monitoring, listing connections) to simulate two agents connecting.

```typescript
import {
  initializeHCS10Client,
  HCS10Client,
  ConnectionTool,
  RegisterAgentTool,
} from '@hashgraphonline/standards-agent-kit';
import dotenv from 'dotenv';

dotenv.config();

// Helper to initialize client and tools for an agent
// WARNING: Uses the SAME operator credentials from .env for simplicity.
// Real agents MUST have their own unique accounts and credentials.
async function setupAgentInfrastructure(
  agentName: string
): Promise<{
  client: HCS10Client;
  tools: { connectionTool: ConnectionTool; registerTool: RegisterAgentTool };
}> {
  const { hcs10Client, tools } = await initializeHCS10Client();
  console.log(`Infrastructure initialized for ${agentName}`);
  // We only need specific tools for this example
  const relevantTools = {
    connectionTool: tools.connectionTool,
    registerTool: tools.registerAgentTool,
  };
  return { client: hcs10Client, tools: relevantTools };
}

async function simulateAgentChat() {
  console.log('--- Simulating Agent Communication ---');

  // 1. Initialize Infrastructure for Alice and Bob
  const aliceInfra = await setupAgentInfrastructure('Alice');
  const bobInfra = await setupAgentInfrastructure('Bob');

  let aliceAgentId: string | null = null;
  let aliceInboundTopicId: string | null = null;
  let bobAgentId: string | null = null;
  let bobInboundTopicId: string | null = null;

  try {
    // 2. Register Alice using her RegisterTool
    console.log('Registering Alice...');
    const aliceRegResultStr = await aliceInfra.tools.registerTool.call({
      name: 'AliceAgent',
      description: 'Alice for simulation',
      capabilities: ['chat'],
    });
    const aliceRegResult = JSON.parse(aliceRegResultStr); // Tool returns JSON string
    aliceAgentId = aliceRegResult.agentId;
    aliceInboundTopicId = aliceRegResult.inboundTopicId;
    console.log(
      `Alice Registered: ID ${aliceAgentId}, Inbound ${aliceInboundTopicId}`
    );

    // 3. Register Bob using his RegisterTool
    console.log('Registering Bob...');
    const bobRegResultStr = await bobInfra.tools.registerTool.call({
      name: 'BobAgent',
      description: 'Bob for simulation',
      capabilities: ['chat'],
    });
    const bobRegResult = JSON.parse(bobRegResultStr); // Tool returns JSON string
    bobAgentId = bobRegResult.agentId;
    bobInboundTopicId = bobRegResult.inboundTopicId;
    console.log(
      `Bob Registered: ID ${bobAgentId}, Inbound ${bobInboundTopicId}`
    );

    // 4. Alice starts listening for connections using her ConnectionTool
    console.log(
      `Alice starting connection handling on ${aliceInboundTopicId}...`
    );
    // Note: startMonitoring runs in the background, no direct await needed here
    // unless you want to catch immediate errors, but the process continues.
    aliceInfra.tools.connectionTool.call({
      action: 'startMonitoring',
      agentId: aliceAgentId!,
      inboundTopicId: aliceInboundTopicId!,
      // In a real app, the onConnectionRequest logic might be more complex
      // and potentially interact with Alice's core logic or state.
      // Here, we assume the tool handles acceptance internally based on HCS10Client setup.
    });
    console.log('Alice monitoring started (runs in background).');

    // 5. Bob initiates connection to Alice using his HCS10Client
    console.log(
      `Bob initiating connection to Alice (${aliceAgentId}) on topic ${aliceInboundTopicId}...`
    );
    const { connectionRequestId } = await bobInfra.client.initiateConnection({
      targetAgentId: aliceAgentId!, // Use Alice's Account ID
      targetInboundTopic: aliceInboundTopicId!, // Alice's inbound topic
      connectionMessage: 'Hi Alice, Bob here!',
    });
    console.log(`Bob sent connection request (ID: ${connectionRequestId})`);

    // 6. Wait for connection to establish (Alice's handler needs time to process)
    console.log(
      'Waiting for connection to establish (may take ~10-15 seconds)...'
    );
    await new Promise((resolve) => setTimeout(resolve, 15000)); // Wait 15s

    // 7. Check for active connections using Bob's ConnectionTool
    const bobConnectionsStr = await bobInfra.tools.connectionTool.call({
      action: 'listConnections',
    });
    const bobConnections = JSON.parse(bobConnectionsStr); // Tool returns JSON string
    console.log(`Bob's active connections:`, bobConnections);

    const connectionWithAlice = bobConnections.find(
      (c: any) => c.targetAgentId === aliceAgentId
    );

    if (!connectionWithAlice) {
      console.error(
        "Connection with Alice not found in Bob's active connections."
      );
      // Ensure Alice's monitoring had enough time. Increase wait if needed.
      // Stop Alice's handler before exiting
      aliceInfra.client.stopConnectionHandling();
      return;
    }

    const connectionTopicId = connectionWithAlice.connectionTopicId;
    console.log(
      `Connection established! Shared Topic ID: ${connectionTopicId}`
    );

    // 8. Bob sends a message to Alice using his HCS10Client
    console.log('Bob sending message to Alice...');
    await bobInfra.client.sendMessage({
      topicId: connectionTopicId,
      message: 'Hello from Bob!',
    });
    console.log('Bob sent message.');

    // 9. Alice retrieves messages using her HCS10Client
    console.log('Alice checking for messages...');
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for message propagation
    const aliceMessages = await aliceInfra.client.getMessages({
      topicId: connectionTopicId,
      limit: 5,
    });

    if (aliceMessages.length > 0) {
      for (const msg of aliceMessages) {
        // Resolve content (handles potential HCS-1 links)
        const content = await aliceInfra.client.getMessageContent({
          topicId: msg.topicId,
          sequenceNumber: msg.sequenceNumber,
        });
        console.log(
          `ALICE received message (Seq: ${msg.sequenceNumber}):`,
          content
        );
      }
    } else {
      console.log('Alice found no new messages.');
    }
  } catch (error) {
    console.error('\nSimulation error:', error);
  } finally {
    // 10. Cleanup (Important!)
    console.log("Stopping Alice's connection handler...");
    // Use the client directly to stop, as the tool doesn't expose a stop action.
    aliceInfra.client.stopConnectionHandling();
    console.log('Simulation finished.');
  }
}

simulateAgentChat();
```

**Explanation:**

1.  **Infrastructure Setup:** Initializes clients and required tools for both agents.
2.  **Registration:** Agents use their respective `RegisterAgentTool` to register.
3.  **Listening:** Alice uses her `ConnectionTool`'s `startMonitoring` action. This starts a background process within the tool/client.
4.  **Initiation:** Bob uses his _client's_ `initiateConnection` method.
5.  **Connection Established:** After waiting, Bob uses his `ConnectionTool`'s `listConnections` action to find the established connection topic ID.
6.  **Messaging:** Agents use their _client's_ `sendMessage`, `getMessages`, and `getMessageContent` methods for communication on the shared topic.
7.  **Cleanup:** Crucially, Alice's _client's_ `stopConnectionHandling` method is called directly in the `finally` block to ensure the background monitoring stops.

## Example 3: Web Application Integration (Conceptual)

Integrating into a web frontend requires careful state management and handling the asynchronous nature of HCS.

```typescript
// --- Conceptual Frontend Service (e.g., using React hooks/context) ---

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  HCS10Client,
  ActiveConnection,
  ConnectionTool,
  RegisterAgentTool,
  SendMessageTool,
} from '@hashgraphonline/standards-agent-kit';

// Assume user provides credentials securely
interface AuthContextType {
  accountId: string | null;
  privateKey: string | null;
  setCredentials: (id: string, key: string) => void;
}
const AuthContext = createContext<AuthContextType>(null!);

interface AgentContextType {
  client: HCS10Client | null;
  tools: {
    registerTool: RegisterAgentTool | null;
    sendMessageTool: SendMessageTool | null;
    connectionTool: ConnectionTool | null;
  };
  isRegistered: boolean;
  agentInfo: {
    agentId: string;
    inboundTopicId: string;
    outboundTopicId: string;
  } | null;
  connections: ActiveConnection[];
  messages: Record<string, any[]>; // Store messages per connection topic ID
  register: (name: string, desc: string) => Promise<void>;
  connect: (targetId: string, targetInbound: string) => Promise<void>;
  sendMessage: (topicId: string, message: string) => Promise<void>;
  refreshConnections: () => Promise<void>;
  fetchMessages: (topicId: string) => Promise<void>;
}
const AgentContext = createContext<AgentContextType>(null!);

export const AgentProvider = ({ children }) => {
  const { accountId, privateKey } = useContext(AuthContext);
  const [client, setClient] = useState<HCS10Client | null>(null);
  const [tools, setTools] = useState<AgentContextType['tools']>({
    registerTool: null,
    sendMessageTool: null,
    connectionTool: null,
  });
  const [agentInfo, setAgentInfo] = useState<any>(null);
  const [connections, setConnections] = useState<ActiveConnection[]>([]);
  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [connectionPoller, setConnectionPoller] =
    useState<NodeJS.Timeout | null>(null);
  const [messagePollers, setMessagePollers] = useState<
    Record<string, NodeJS.Timeout>
  >({});

  // Initialize Client and Tools when credentials change
  useEffect(() => {
    let isActive = true;
    if (accountId && privateKey) {
      console.log('Initializing client and tools for webapp...');
      // Use initializeHCS10Client to get both client and tools easily
      initializeHCS10Client(/* pass options if needed */)
        .then(({ hcs10Client, tools: initializedTools }) => {
          if (isActive) {
            setClient(hcs10Client);
            setTools({
              registerTool: initializedTools.registerAgentTool,
              sendMessageTool: initializedTools.sendMessageTool,
              connectionTool: initializedTools.connectionTool,
            });
            console.log('Client and tools initialized.');
            // Potentially load existing agent info if stored locally
          }
        })
        .catch((error) =>
          console.error('Failed to initialize agent infrastructure:', error)
        );
    } else {
      setClient(null);
      setTools({
        registerTool: null,
        sendMessageTool: null,
        connectionTool: null,
      });
      setAgentInfo(null);
      setConnections([]);
      setMessages({});
      // Clear any existing pollers if user logs out
      if (connectionPoller) clearInterval(connectionPoller);
      Object.values(messagePollers).forEach(clearInterval);
      setMessagePollers({});
    }

    // Cleanup function
    return () => {
      isActive = false;
      console.log('Cleaning up agent client and pollers...');
      client?.stopConnectionHandling(); // Stop monitoring if client exists
      if (connectionPoller) clearInterval(connectionPoller);
      Object.values(messagePollers).forEach(clearInterval);
    };
  }, [accountId, privateKey]); // Rerun effect if credentials change

  // Registration Function (uses the tool)
  const register = useCallback(
    async (name: string, desc: string) => {
      if (!tools.registerTool || !tools.connectionTool || !client)
        throw new Error('Client or tools not initialized');

      console.log('Calling register tool...');
      const regResultStr = await tools.registerTool.call({
        name,
        description: desc,
        capabilities: ['webapp'],
      });
      const info = JSON.parse(regResultStr);
      setAgentInfo(info);
      console.log('Registration successful:', info);

      // Start monitoring using the ConnectionTool
      console.log(
        `Calling connection tool to start monitoring ${info.inboundTopicId}...`
      );
      await tools.connectionTool.call({
        action: 'startMonitoring',
        agentId: info.agentId,
        inboundTopicId: info.inboundTopicId,
        // Note: The ConnectionTool internally calls client.startConnectionHandling
        // It needs the onConnectionRequest logic. For a webapp, this might just log
        // or trigger a UI notification, as the tool handles acceptance.
      });
      console.log('Monitoring started via tool.');

      // Start polling for connections
      if (connectionPoller) clearInterval(connectionPoller); // Clear previous poller if any
      const pollerId = setInterval(async () => {
        console.log('Polling for active connections...');
        try {
          const activeConsStr = await tools.connectionTool!.call({
            action: 'listConnections',
          });
          const activeCons = JSON.parse(activeConsStr);
          setConnections(activeCons);
        } catch (error) {
          console.error('Error polling connections:', error);
        }
      }, 15000); // Poll every 15s
      setConnectionPoller(pollerId);
    },
    [client, tools.registerTool, tools.connectionTool, connectionPoller]
  );

  // Connection Function (uses the client directly for initiate)
  const connect = useCallback(
    async (targetId: string, targetInbound: string) => {
      if (!client) throw new Error('Client not initialized');
      console.log(`Initiating connection to ${targetId}...`);
      await client.initiateConnection({
        targetAgentId: targetId,
        targetInboundTopic: targetInbound,
      });
      console.log('Connection request sent.');
      // Optionally trigger a connection refresh after a delay
      setTimeout(refreshConnections, 5000);
    },
    [client]
  );

  // Send Message (uses the tool)
  const sendMessage = useCallback(
    async (topicId: string, message: string) => {
      if (!tools.sendMessageTool)
        throw new Error('SendMessageTool not initialized');
      console.log(`Sending message to ${topicId}...`);
      await tools.sendMessageTool.call({ topicId, message });
      console.log('Message sent via tool.');
      // Trigger message refresh for this topic
      fetchMessages(topicId);
    },
    [tools.sendMessageTool]
  );

  // Refresh Connections (uses the tool)
  const refreshConnections = useCallback(async () => {
    if (!tools.connectionTool) return;
    console.log('Refreshing connections list...');
    try {
      const activeConsStr = await tools.connectionTool.call({
        action: 'listConnections',
      });
      const activeCons = JSON.parse(activeConsStr);
      setConnections(activeCons);
    } catch (error) {
      console.error('Error refreshing connections:', error);
    }
  }, [tools.connectionTool]);

  // Fetch Messages for a Topic (uses client)
  const fetchMessages = useCallback(
    async (topicId: string) => {
      if (!client) return;
      console.log(`Fetching messages for topic ${topicId}...`);
      try {
        const newMessages = await client.getMessages({ topicId, limit: 20 }); // Fetch last 20
        // Resolve content for display
        const resolvedMessages = await Promise.all(
          newMessages.map(async (msg) => ({
            ...msg,
            resolvedContent: await client.getMessageContent({
              topicId: msg.topicId,
              sequenceNumber: msg.sequenceNumber,
            }),
          }))
        );
        setMessages((prev) => ({ ...prev, [topicId]: resolvedMessages }));
      } catch (error) {
        console.error(`Error fetching messages for ${topicId}:`, error);
      }
    },
    [client]
  );

  // --- Polling for Messages in Active Connections ---
  useEffect(() => {
    const activeTopicIds = connections.map((c) => c.connectionTopicId);
    const currentPollers = { ...messagePollers };
    let pollersChanged = false;

    // Start new pollers for new connections
    activeTopicIds.forEach((topicId) => {
      if (!currentPollers[topicId]) {
        console.log(`Starting message poller for ${topicId}`);
        currentPollers[topicId] = setInterval(
          () => fetchMessages(topicId),
          20000
        ); // Poll every 20s
        pollersChanged = true;
      }
    });

    // Stop pollers for disconnected topics
    Object.keys(currentPollers).forEach((topicId) => {
      if (!activeTopicIds.includes(topicId)) {
        console.log(`Stopping message poller for ${topicId}`);
        clearInterval(currentPollers[topicId]);
        delete currentPollers[topicId];
        pollersChanged = true;
        // Optionally remove messages for this topic from state
        setMessages((prev) => {
          const updated = { ...prev };
          delete updated[topicId];
          return updated;
        });
      }
    });

    if (pollersChanged) {
      setMessagePollers(currentPollers);
    }

    // Cleanup pollers when component unmounts or connections change
    return () => {
      Object.values(currentPollers).forEach(clearInterval);
    };
  }, [connections, fetchMessages]); // Rerun when connections array changes

  // --- Provide Context Value ---
  const value = {
    client,
    tools,
    isRegistered: !!agentInfo,
    agentInfo,
    connections,
    messages,
    register,
    connect,
    sendMessage,
    refreshConnections,
    fetchMessages,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};

export const useAgent = () => useContext(AgentContext);

// --- Example Component Usage ---

const MyAgentDashboard = () => {
  const {
    isRegistered,
    agentInfo,
    connections,
    messages,
    register,
    connect,
    sendMessage,
    refreshConnections,
    fetchMessages,
  } = useAgent();

  // Local state for inputs
  const [regName, setRegName] = useState('');
  const [targetId, setTargetId] = useState('');
  const [targetInbound, setTargetInbound] = useState('');
  const [msgText, setMsgText] = useState<Record<string, string>>({}); // Message text per connection

  // Initial fetch of connections on load if registered
  useEffect(() => {
    if (isRegistered) {
      refreshConnections();
    }
  }, [isRegistered, refreshConnections]);

  const handleSendMessage = (topicId: string) => {
    sendMessage(topicId, msgText[topicId] || '');
    setMsgText((prev) => ({ ...prev, [topicId]: '' })); // Clear input after send
  };

  const handleMsgInputChange = (topicId: string, value: string) => {
    setMsgText((prev) => ({ ...prev, [topicId]: value }));
  };

  if (!agentInfo?.agentId) {
    // Check based on agentInfo existence
    return (
      <div>
        <h2>Register Agent</h2>
        <input
          type='text'
          placeholder='Agent Name'
          value={regName}
          onChange={(e) => setRegName(e.target.value)}
        />
        <button
          onClick={() => register(regName, `Web Agent ${regName}`)}
          disabled={!regName}
        >
          Register
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Agent: {agentInfo.agentId}</h2>
      <p>Inbound Topic: {agentInfo.inboundTopicId}</p>

      <div>
        <h3>Connect to Agent</h3>
        <input
          type='text'
          placeholder='Target Agent ID (e.g., 0.0.123)'
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        />
        <input
          type='text'
          placeholder='Target Inbound Topic (e.g., 0.0.456)'
          value={targetInbound}
          onChange={(e) => setTargetInbound(e.target.value)}
        />
        <button
          onClick={() => connect(targetId, targetInbound)}
          disabled={!targetId || !targetInbound}
        >
          Connect
        </button>
      </div>

      <div>
        <h3>
          Active Connections ({connections.length}){' '}
          <button onClick={refreshConnections}>Refresh</button>
        </h3>
        {connections.length === 0 && <p>No active connections.</p>}
        {connections.map((conn) => (
          <div
            key={conn.connectionTopicId}
            style={{
              border: '1px solid grey',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h4>Connection with: {conn.targetAgentId}</h4>
            <p>Shared Topic: {conn.connectionTopicId}</p>
            <div>
              <textarea
                placeholder='Send message...'
                value={msgText[conn.connectionTopicId] || ''}
                onChange={(e) =>
                  handleMsgInputChange(conn.connectionTopicId, e.target.value)
                }
                rows={3}
                style={{ width: '90%' }}
              />
              <button
                onClick={() => handleSendMessage(conn.connectionTopicId)}
                disabled={!msgText[conn.connectionTopicId]}
              >
                Send
              </button>
            </div>
            <div>
              <h5>
                Messages{' '}
                <button onClick={() => fetchMessages(conn.connectionTopicId)}>
                  Refresh Msgs
                </button>
              </h5>
              {(messages[conn.connectionTopicId] || []).length === 0 && (
                <p>No messages yet.</p>
              )}
              <ul
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid lightgrey',
                }}
              >
                {(messages[conn.connectionTopicId] || []).map((msg) => (
                  <li key={msg.sequenceNumber}>
                    <strong>Seq {msg.sequenceNumber}:</strong>{' '}
                    {JSON.stringify(msg.resolvedContent)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

**Key Considerations for Frontend Integration:**

1.  **Credentials Management:** Securely obtain and store the user's Hedera `accountId` and `privateKey`. **Never** embed private keys directly in frontend code.
2.  **Client Initialization:** Create the `HCS10Client` and tools (using `initializeHCS10Client` is easiest) only after obtaining credentials.
3.  **State Management:** Use React state, context, or a state management library (Redux, Zustand) to hold the client instance, tools, agent registration status, active connections, and messages.
4.  **Asynchronicity:** All interactions with the kit are asynchronous. Use `async/await` and manage loading/error states in the UI.
5.  **Polling:** To display updated connections or new messages, implement polling mechanisms (`setInterval`) to call the `ConnectionTool` (`listConnections` action) and `HCS10Client` (`getMessages`/`getMessageContent`) periodically. Manage poller intervals and cleanup carefully.
6.  **Background Handling:** The `ConnectionTool`'s `startMonitoring` action involves background polling within the client. Ensure this runs correctly and use the client's `stopConnectionHandling` method for cleanup (e.g., on component unmount or user logout).
7.  **Error Handling:** Provide user feedback for failed operations (registration errors, connection timeouts, message sending failures).
