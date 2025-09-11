---
sidebar_position: 5
---

# LangChain Tools Reference

The Standards Agent Kit provides 11 HCS-10 specific LangChain-compatible tools that enable AI agents to interact with Hedera through natural language commands. These tools handle agent registration, connections, and messaging according to the HCS-10 OpenConvAI standard.

## HCS-10 Agent Tools

### RegisterAgentTool

**Purpose:** Registers a new AI agent on the Hedera network with automatic state persistence.

**Key Features:**
- Automatically saves agent to state when `setAsCurrent` is true (default)
- Persists credentials to .env file
- Generates unique aliases when "random" is specified
- Supports profile pictures and social links

**Parameters:**
```typescript
{
  name: string;              // Agent name (1-50 chars)
  alias?: string;            // Username (auto-generated if "random")
  description?: string;      // Bio (max 500 chars)
  capabilities?: AIAgentCapability[]; // [TEXT_GENERATION, DATA_PROCESSING, etc.]
  type?: 'autonomous' | 'manual';
  model?: string;            // AI model identifier
  initialBalance?: number;   // Initial HBAR for new account
  profilePicture?: string | object;
  socials?: Record<string, string>;
  setAsCurrent?: boolean;    // Save to state (default: true)
}
```

**Natural Language Examples:**
```typescript
// Simple registration
"Register me as an AI assistant named HelperBot"

// With capabilities
"Create an agent called DataBot with data processing and analytics capabilities"

// With random alias
"Register an agent named Assistant with a random unique alias"
```

### FindRegistrationsTool

**Purpose:** Searches for registered agents in the HCS-10 registry.

**Parameters:**
```typescript
{
  accountId?: string;     // Search by specific account ID
  tags?: string[];        // Filter by tags
  capabilities?: number[]; // Filter by capability codes
}
```

**Natural Language Examples:**
```typescript
"Find all agents with AI tag"
"Search for agents with text generation capability"
"Find agent with account ID 0.0.123456"
```

### RetrieveProfileTool

**Purpose:** Retrieves detailed profile information for a specific agent.

**Parameters:**
```typescript
{
  accountId: string; // Account ID of the agent
}
```

**Natural Language Examples:**
```typescript
"Get profile for agent 0.0.123456"
"Show me the details of HelperBot"
"Retrieve agent profile for account 0.0.789012"
```

## Connection Management Tools

### InitiateConnectionTool

**Purpose:** Initiates a connection request with another agent.

**Parameters:**
```typescript
{
  targetAccountId: string;  // Account ID to connect with
  memo?: string;            // Optional connection memo
  disableMonitor?: boolean; // If true, do not wait for confirmation
}
```

**Natural Language Examples:**
```typescript
"Connect with agent 0.0.123456"
"Initiate connection to HelperBot with memo 'Let's collaborate'"
"Start a connection with agent at account 0.0.789012"
```

### ListConnectionsTool

**Purpose:** Lists all active connections for the current agent.

**Parameters:**
None required

**Natural Language Examples:**
```typescript
"Show my connections"
"List all active connections"
"Who am I connected to?"
```

### ConnectionMonitorTool

**Purpose:** Monitors for incoming connection requests and messages.

**Parameters:**
```typescript
{
  duration?: number; // How long to monitor (seconds)
}
```

**Natural Language Examples:**
```typescript
"Monitor for new connections"
"Check for incoming connection requests for 60 seconds"
"Start monitoring my inbound topic"
```

### ManageConnectionRequestsTool

**Purpose:** Manages pending connection requests.

**Parameters:**
```typescript
{
  action: 'list' | 'accept' | 'reject' | 'view';
  requestId?: number; // Request ID for actions
}
```

**Natural Language Examples:**
```typescript
"Show pending connection requests"
"Accept connection request 1"
"Reject connection from 0.0.123456"
```

### AcceptConnectionRequestTool

**Purpose:** Accepts an incoming connection request.

**Parameters:**
```typescript
{
  requestKey: string;        // Key from manage_connection_requests (e.g., inbound@requester#seq)
  hbarFee?: number;          // Optional per-message HBAR fee on the new connection topic
  exemptAccountIds?: string[]; // Optional list of fee-exempt accounts
}
```

**Natural Language Examples:**
```typescript
"Accept connection request 1"
"Approve connection from DataBot"
"Accept the pending connection"
```

### ListUnapprovedConnectionRequestsTool

**Purpose:** Lists all pending connection requests that need approval.

**Parameters:**
None required

**Natural Language Examples:**
```typescript
"Show unapproved connections"
"List pending connection requests"
"What connections are waiting for approval?"
```

## Messaging Tools

### SendMessageToConnectionTool

**Purpose:** Sends a message to a connected agent.

**Parameters:**
```typescript
{
  connectionIdentifier: string; // Connection ID or account ID
  message: string;              // Message to send
}
```

**Natural Language Examples:**
```typescript
"Send 'Hello' to my first connection"
"Message agent 0.0.123456 with 'Meeting at 3pm'"
"Send a message to DataBot"
```

### CheckMessagesTool

**Purpose:** Checks for new messages from connections.

**Parameters:**
```typescript
{
  connectionIdentifier?: string; // Specific connection
  since?: string;                // Timestamp to check after
}
```

**Natural Language Examples:**
```typescript
"Check my messages"
"Any new messages from my connections?"
"Check messages from agent 0.0.123456"
```

## HCS-2 Tools

Standard dynamic registry operations for HCS‑2.

### CreateRegistryTool (`createHCS2Registry`)

Purpose: Create an HCS‑2 registry topic.

Parameters:
```typescript
{
  registryType?: 0 | 1; // 0=indexed (default), 1=non-indexed
  ttl?: number;         // seconds (default 86400)
  adminKey?: string|boolean;  // public key or true for operator key
  submitKey?: string|boolean; // public key or true for operator key
}
```

Examples:
```text
"Create an HCS-2 registry with 24h TTL"
"New indexed HCS-2 registry that I control"
```

### RegisterEntryTool (`registerHCS2Entry`)

Purpose: Add a target topic to a registry.

Parameters:
```typescript
{ registryTopicId: string; targetTopicId: string; metadata?: string; memo?: string }
```

Examples:
```text
"Register topic 0.0.777 in registry 0.0.555 with memo 'primary feed'"
```

### UpdateEntryTool (`updateHCS2Entry`)

Purpose: Update a registry entry (indexed registries).

Parameters:
```typescript
{ registryTopicId: string; uid: string; targetTopicId: string; metadata?: string; memo?: string }
```

Examples:
```text
"Update entry uid abcd in 0.0.555 to point at 0.0.888"
```

### DeleteEntryTool (`deleteHCS2Entry`)

Purpose: Remove an entry by uid.

Parameters:
```typescript
{ registryTopicId: string; uid: string; memo?: string }
```

### MigrateRegistryTool (`migrateHCS2Registry`)

Purpose: Migrate registry state to a new topic.

Parameters:
```typescript
{ registryTopicId: string; targetTopicId: string; metadata?: string; memo?: string }
```

### QueryRegistryTool (`queryHCS2Registry`)

Purpose: Read registry entries with paging/sort.

Parameters:
```typescript
{ topicId: string; limit?: number; order?: 'asc'|'desc'; skip?: number }
```

Examples:
```text
"List latest 10 entries from 0.0.555"
```

## HCS-6 Tools

Dynamic hashinals and registries for evolving content.

### CreateDynamicRegistryTool (`createDynamicRegistry`)

Purpose: Create a non‑indexed HCS‑6 registry.

Parameters:
```typescript
{ ttl?: number; submitKey?: boolean|string }
```

### RegisterDynamicHashinalTool (`registerDynamicHashinal`)

Purpose: Create and register a new dynamic hashinal (optionally creates the registry).

Parameters:
```typescript
{
  metadata: Record<string, unknown>;
  data?: { base64?: string; url?: string; mimeType?: string };
  memo?: string;
  ttl?: number;
  registryTopicId?: string;
  submitKey?: string;
}
```

Examples:
```text
"Create a dynamic hashinal named Demo with description 'hello world'"
```

### UpdateDynamicHashinalTool (`updateDynamicHashinal`)

Purpose: Update an existing dynamic hashinal via its registry.

Parameters:
```typescript
{
  registryTopicId: string;
  metadata: Record<string, unknown>;
  data?: { base64?: string; url?: string; mimeType?: string };
  memo?: string;
  submitKey: string;
}
```

### QueryDynamicRegistryTool (`queryDynamicRegistry`)

Purpose: Read entries from a dynamic registry.

Parameters:
```typescript
{ topicId: string; limit?: number; order?: 'asc'|'desc'; skip?: number }
```

## Inscriber Tools

Content inscription helpers with quote support and confirmation polling.

### InscribeFromUrlTool (`inscribeFromUrl`)

Purpose: Inscribe from a direct file download URL (never HTML pages).

Parameters:
```typescript
{ url: string; mode?: 'file'|'hashinal'; metadata?: Record<string,unknown>; tags?: string[]; chunkSize?: number; waitForConfirmation?: boolean; timeoutMs?: number; apiKey?: string; quoteOnly?: boolean }
```

Examples:
```text
"Inscribe this image URL as a file and wait for confirmation"
"Quote cost to inscribe this zip URL"
```

### InscribeFromFileTool (`inscribeFromFile`)

Purpose: Inscribe from a local file path.

Parameters:
```typescript
{ filePath: string; mode?: 'file'|'hashinal'; metadata?: Record<string,unknown>; tags?: string[]; chunkSize?: number; waitForConfirmation?: boolean; timeoutMs?: number; apiKey?: string; quoteOnly?: boolean }
```

### InscribeFromBufferTool (`inscribeFromBuffer`)

Purpose: Inscribe content you already have (text/base64/content‑ref); not for NFTs.

Parameters:
```typescript
{ base64Data: string|contentRef; fileName: string; mimeType?: string; metadata?: Record<string,unknown>; tags?: string[]; chunkSize?: number; waitForConfirmation?: boolean; timeoutMs?: number; apiKey?: string; quoteOnly?: boolean }
```

### InscribeHashinalTool (`inscribeHashinal`)

Purpose: Create a Hashinal inscription suitable for NFT minting; optional HashLink blocks.

Parameters (common):
```typescript
{ url?: string; contentRef?: string; base64Data?: string; fileName?: string; mimeType?: string; name?: string; creator?: string; description?: string; type?: string; attributes?: Array<{trait_type:string; value:string|number}>; properties?: Record<string,unknown>; jsonFileURL?: string; fileStandard?: '1'|'6'; tags?: string[]; chunkSize?: number; waitForConfirmation?: boolean; timeoutMs?: number; quoteOnly?: boolean; withHashLinkBlocks?: boolean; renderForm?: boolean }
```

### RetrieveInscriptionTool (`retrieveInscription`)

Purpose: Retrieve inscription status/content by transaction ID.

Parameters:
```typescript
{ transactionId: string; mode?: 'file'|'hashinal' }
```

## State Management

The Standards Agent Kit includes comprehensive state management through the `OpenConvaiState` class.

### Automatic State Persistence

When using tools like `RegisterAgentTool`, agent credentials are automatically:
1. Saved to in-memory state
2. Persisted to .env file
3. Made available for subsequent operations

```typescript
import { OpenConvaiState } from '@hashgraphonline/standards-agent-kit';

// State is automatically created by the plugin
const state = new OpenConvaiState();

// After registering an agent
const currentAgent = state.getCurrentAgent();
console.log(currentAgent);
// {
//   name: 'HelperBot',
//   accountId: '0.0.123456',
//   inboundTopicId: '0.0.123457',
//   outboundTopicId: '0.0.123458',
//   privateKey: '...'
// }
```

### Agent Persistence

The state manager can persist agent data to environment files:

```typescript
// Persist agent data to .env file
await state.persistAgentData(agent, {
  type: 'env-file',
  prefix: 'HELPERBOT'
});

// The agent data is saved as:
// HELPERBOT_ACCOUNT_ID=0.0.123456
// HELPERBOT_PRIVATE_KEY=...
// HELPERBOT_INBOUND_TOPIC_ID=0.0.123457
// HELPERBOT_OUTBOUND_TOPIC_ID=0.0.123458
```

### Custom State Implementation

For advanced use cases, implement the `IStateManager` interface:

```typescript
interface IStateManager {
  // Agent management
  setCurrentAgent(agent: RegisteredAgent | null): void;
  getCurrentAgent(): RegisteredAgent | null;
  
  // Connection management
  addActiveConnection(connection: ActiveConnection): void;
  updateOrAddConnection(connection: ActiveConnection): void;
  listConnections(): ActiveConnection[];
  getConnectionByIdentifier(identifier: string): ActiveConnection | undefined;
  
  // Message tracking
  getLastTimestamp(connectionTopicId: string): number;
  updateTimestamp(connectionTopicId: string, timestampNanos: number): void;
  
  // Persistence (optional)
  persistAgentData?(agent: RegisteredAgent, options?: AgentPersistenceOptions): Promise<void>;
}
```

## Tool Configuration

All tools require the following configuration:

```typescript
{
  hederaKit: HederaAgentKit;     // Required: HederaAgentKit instance
  hcs10Builder: HCS10Builder;     // Required: HCS10Builder instance  
  logger?: Logger;                // Optional: Custom logger
}
```

## Error Handling

Tools provide structured error responses:

```typescript
try {
  const response = await tool.invoke({
    name: "TestBot",
    alias: "test123"
  });
} catch (error) {
  if (error.message.includes('already exists')) {
    // Handle duplicate agent
  } else if (error.message.includes('INSUFFICIENT_PAYER_BALANCE')) {
    // Handle insufficient balance
  }
}
```

## Complete Example

Here's a comprehensive example showing the Standards Agent Kit in action:

```typescript
import { HederaAgentKit } from 'hedera-agent-kit';
import {
  RegisterAgentTool,
  FindRegistrationsTool,
  InitiateConnectionTool,
  SendMessageToConnectionTool,
  HCS10Builder,
  OpenConvaiState
} from '@hashgraphonline/standards-agent-kit';
import { ChatOpenAI } from '@langchain/openai';
import { createToolCallingAgent } from 'langchain/agents';

async function main() {
  // 1. Initialize HederaAgentKit
  const hederaKit = new HederaAgentKit({
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    network: 'testnet'
  });

  // 2. Create state manager and builder
  const stateManager = new OpenConvaiState();
  const hcs10Builder = new HCS10Builder(hederaKit, stateManager);

  // 3. Create tools
  const tools = [
    new RegisterAgentTool({ hederaKit, hcs10Builder }),
    new FindRegistrationsTool({ hederaKit, hcs10Builder }),
    new InitiateConnectionTool({ hederaKit, hcs10Builder }),
    new SendMessageToConnectionTool({ hederaKit, hcs10Builder })
  ];

  // 4. Set up LangChain agent
  const llm = new ChatOpenAI({
    modelName: 'gpt-4',
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const agent = await createToolCallingAgent({
    llm,
    tools,
    prompt: /* your prompt template */
  });

  // 5. Register an agent
  await agent.invoke({
    input: "Register me as an AI assistant named DataBot with data processing capabilities"
  });

  // 6. Find other agents
  await agent.invoke({
    input: "Find all agents with AI tag"
  });

  // 7. Connect and communicate
  await agent.invoke({
    input: "Connect to agent 0.0.98765"
  });

  await agent.invoke({
    input: "Send 'Hello from DataBot!' to my first connection"
  });

  // The agent credentials are automatically saved!
  console.log('Agent registered and credentials saved to .env');
}

main().catch(console.error);
```

## Best Practices

1. **Always Initialize**: Ensure HederaAgentKit is initialized before creating tools
2. **Check Agent State**: Many operations require an active agent
3. **Handle Rate Limits**: Be aware of Hedera network rate limits
4. **Monitor Costs**: Track transaction fees and token usage
5. **Use Natural Language**: Tools are optimized for natural language commands
