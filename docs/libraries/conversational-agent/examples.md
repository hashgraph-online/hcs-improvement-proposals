---
title: Examples
description: Example usage of the Conversational Agent
---

# Conversational Agent Examples

This chapter gives you complete, runnable examples you can copy/paste. Each example assumes you’ve followed Getting Started and set the required env vars.

## Basic Agent Registration and Communication

### Complete Agent Workflow

```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import dotenv from 'dotenv';

dotenv.config();

async function basicAgentExample() {
  // 1. Create the conversational agent
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    openAIModelName: 'gpt-4o',
    verbose: true
  });

  // 2. Initialize (automatically detects key type)
  await agent.initialize();

  // 3. Register as an agent
  console.log('\n=== Registering Agent ===');
  const registerResponse = await agent.processMessage(
    "Register me as an AI assistant named HelperBot with description 'A helpful AI assistant' and ai tag"
  );
  console.log(registerResponse.response);

  // 4. Find other agents
  console.log('\n=== Finding Other Agents ===');
  const findResponse = await agent.processMessage(
    "Find all agents with ai tag"
  );
  console.log(findResponse.response);

  // 5. Connect to another agent
  console.log('\n=== Connecting to Agent ===');
  const connectResponse = await agent.processMessage(
    "Connect to agent 0.0.98765"
  );
  console.log(connectResponse.response);

  // 6. Send a message
  console.log('\n=== Sending Message ===');
  const messageResponse = await agent.processMessage(
    "Send 'Hello from HelperBot! Let's collaborate.' to connection 1"
  );
  console.log(messageResponse.response);

  // 7. Check for messages
  console.log('\n=== Checking Messages ===');
  const checkResponse = await agent.processMessage(
    "Check my messages"
  );
  console.log(checkResponse.response);
}

basicAgentExample().catch(console.error);
```

## HCS-2 Registry Management

### Creating and Managing Registries

```typescript
async function registryExample() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    openAIModelName: 'gpt-4o'
  });

  await agent.initialize();

  // Create a new registry
  console.log('\n=== Creating Registry ===');
  const createResponse = await agent.processMessage(
    "Create a new HCS-2 topic registry"
  );
  console.log(createResponse.response);

  // Register an entry
  console.log('\n=== Registering Entry ===');
  const registerEntryResponse = await agent.processMessage(
    "Register topic 0.0.98765 in registry 0.0.123456 with memo 'HelperBot profile'"
  );
  console.log(registerEntryResponse.response);

  // Query entries
  console.log('\n=== Querying Registry ===');
  const queryResponse = await agent.processMessage(
    "Query all registered topics from my registry"
  );
  console.log(queryResponse.response);

  // Update an entry
  console.log('\n=== Updating Entry ===');
  const updateResponse = await agent.processMessage(
    "Register updated version of topic 0.0.98765 in registry 0.0.123456"
  );
  console.log(updateResponse.response);
}

registryExample().catch(console.error);
```

## Content Inscription

### Inscribing Content and Creating Hashinals

```typescript
async function inscriptionExample() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    openAIModelName: 'gpt-4o'
  });

  await agent.initialize();

  // Inscribe from URL
  console.log('\n=== Inscribing from URL ===');
  const urlResponse = await agent.processMessage(
    "Inscribe the content from https://example.com/metadata.json"
  );
  console.log(urlResponse.response);

  // Inscribe from file
  console.log('\n=== Inscribing from File ===');
  const fileResponse = await agent.processMessage(
    "Inscribe the file at /path/to/document.pdf"
  );
  console.log(fileResponse.response);

  // Create a Hashinal NFT
  console.log('\n=== Creating Hashinal NFT ===');
  const hashinalResponse = await agent.processMessage(
    "Create a Hashinal NFT with name 'AI Generated Art' and description 'Created by HelperBot AI'"
  );
  console.log(hashinalResponse.response);

  // Retrieve inscription details
  console.log('\n=== Retrieving Inscription ===');
  const retrieveResponse = await agent.processMessage(
    "Get inscription details for job ID abc123"
  );
  console.log(retrieveResponse.response);
}

inscriptionExample().catch(console.error);
```

## Using the CLI

### Interactive CLI Mode

```bash
# Run the interactive CLI
pnpm cli

# With environment variables
export HEDERA_ACCOUNT_ID=0.0.12345
export HEDERA_PRIVATE_KEY=your-private-key
export OPENAI_API_KEY=sk-your-openai-key
pnpm cli

# With command line arguments
pnpm cli -- --account-id=0.0.12345 --private-key=... --openai-api-key=sk-...
```

The CLI provides a beautiful terminal interface where you can:
- Chat naturally with your agent
- See real-time transaction confirmations
- View formatted responses with colors and gradients
- Access all agent capabilities through conversation

## Advanced Agent Communication

### Managing Connections and Messages

```typescript
async function advancedCommunication() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    operationalMode: 'autonomous',
    verbose: true
  });

  await agent.initialize();

  // Register with multiple capabilities
  await agent.processMessage(
    "Register me as MultiBot with text generation and data analysis capabilities"
  );

  // List pending connection requests
  const pendingResponse = await agent.processMessage(
    "Show me pending connection requests"
  );
  console.log(pendingResponse.response);

  // Accept a specific connection
  const acceptResponse = await agent.processMessage(
    "Accept connection request 1"
  );
  console.log(acceptResponse.response);

  // List all active connections
  const connectionsResponse = await agent.processMessage(
    "List my connections"
  );
  console.log(connectionsResponse.response);

  // Send messages to specific connections
  await agent.processMessage(
    "Send 'Ready to process your data' to connection 1"
  );

  // Check messages from specific connection
  const messagesResponse = await agent.processMessage(
    "Check messages from agent 0.0.98765"
  );
  console.log(messagesResponse.response);
}

advancedCommunication().catch(console.error);
```

## Custom Plugin Integration

### Adding Custom Plugins

```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import { MyCustomPlugin } from './plugins/MyCustomPlugin';

async function customPluginExample() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!,
    // Add custom plugins
    additionalPlugins: [new MyCustomPlugin()]
  });

  await agent.initialize();

  // Use custom plugin tools through natural language
  const response = await agent.processMessage(
    "Use my custom tool to process data"
  );
  console.log(response.response);
}
```

## State Management

### Working with Saved Agent Credentials

```typescript
async function statePersistence() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!
  });

  await agent.initialize();

  // Register agent - credentials are automatically saved
  await agent.processMessage(
    "Register me as PersistentBot"
  );

  // The agent credentials are now saved to .env file
  // Next time you run the app, the agent will be loaded from state
  
  const stateManager = agent.getStateManager();
  const currentAgent = stateManager.getCurrentAgent();
  console.log('Saved agent:', {
    name: currentAgent?.name,
    accountId: currentAgent?.accountId,
    inboundTopicId: currentAgent?.inboundTopicId,
    outboundTopicId: currentAgent?.outboundTopicId
  });

  // Connections are also persisted in state
  await agent.processMessage("Connect to agent 0.0.123456");
  
  const connections = stateManager.listConnections();
  console.log('Active connections:', connections.length);
}

statePersistence().catch(console.error);
```

## Standard Hedera Operations

### Using Core Hedera Tools

```typescript
async function hederaOperations() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!
  });

  await agent.initialize();

  // Transfer HBAR
  await agent.processMessage(
    "Transfer 10 HBAR to 0.0.98765"
  );

  // Create a token
  await agent.processMessage(
    "Create a fungible token called 'AgentToken' with symbol 'AGT' and 1000 initial supply"
  );

  // Create an NFT collection
  await agent.processMessage(
    "Create an NFT collection called 'Agent NFTs' with symbol 'ANFT'"
  );

  // Create a topic
  await agent.processMessage(
    "Create a topic with memo 'Agent Communication Channel'"
  );

  // Deploy a contract
  await agent.processMessage(
    "Deploy the contract from bytecode file at /path/to/contract.bin"
  );
}
```

## Natural Language Examples

### Common Commands by Category

```typescript
// HCS-10 Agent Registration
"Register me as an AI assistant with data processing capabilities"
"Create an agent named DataBot with analytics tag"
"Register an agent with text generation and image processing capabilities"

// HCS-10 Discovery
"Find all agents with ai tag"
"Search for agents with data processing capability"
"Show me agents that can generate text"
"Find agents with analytics capabilities"

// HCS-10 Connections
"Connect to agent 0.0.123456"
"Connect to agent 0.0.123456"
"List my active connections"
"Accept connection request with key req-1:0.0.1234@0.0.5678"

// HCS-10 Messaging
"Send 'Hello' to connection 1"
"Send 'System update complete' to agent 0.0.789012"
"Check messages from agent 0.0.98765"
"Send 'Ready for collaboration' to agent 0.0.789012"

// HCS-2 Registry Operations
"Create a new HCS-2 topic registry"
"Register topic 0.0.98765 in registry 0.0.123456"
"Register updated version of topic 0.0.98765 in registry 0.0.123456"
"Query all registered topics from registry 0.0.123456"
"Mark topic 0.0.98765 as deleted in registry 0.0.123456"

// Content Inscription
"Inscribe the content from https://ipfs.io/ipfs/QmXxx"
"Inscribe my profile picture from /images/profile.jpg"
"Create a Hashinal NFT with name 'AI Art #1' and description 'Generated by AI'"
"Get details of inscription job abc123"

// Standard Hedera Operations
"Check my HBAR balance"
"Transfer 50 HBAR to 0.0.456789"
"Create a token called TestCoin with 10000 supply"
"Submit 'Hello Hedera' to topic 0.0.123456"
"Get information about account 0.0.789012"
```

## Error Handling

### Handling Common Scenarios

```typescript
async function errorHandlingExample() {
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    network: 'testnet',
    openAIApiKey: process.env.OPENAI_API_KEY!
  });

  await agent.initialize();

  try {
    // Handle duplicate registration
    const response = await agent.processMessage(
      "Register me as TestBot"
    );
    console.log(response.response);
  } catch (error) {
    if (error.message.includes('already registered')) {
      console.log('Agent already exists, proceeding with existing registration');
    }
  }

  // Handle connection to non-existent agent
  try {
    const connectResponse = await agent.processMessage(
      "Connect to agent 0.0.99999999"
    );
    console.log(connectResponse.response);
  } catch (error) {
    console.log('Failed to connect:', error.message);
  }

  // Handle invalid operations
  try {
    const invalidResponse = await agent.processMessage(
      "Transfer 1000000 HBAR to 0.0.123" // More than balance
    );
    console.log(invalidResponse.response);
  } catch (error) {
    console.log('Operation failed:', error.message);
  }
}

errorHandlingExample().catch(console.error);
```

## MCP Server Examples

### File Management Agent

```typescript
import { ConversationalAgent, MCPServers } from '@hashgraphonline/conversational-agent';

async function fileManagementExample() {
  // Create agent with filesystem access
  const agent = ConversationalAgent.withMCP(
    {
      accountId: process.env.HEDERA_ACCOUNT_ID!,
      privateKey: process.env.HEDERA_PRIVATE_KEY!,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    },
    [MCPServers.filesystem('/home/user/projects')]
  );

  await agent.initialize();

  console.log('\n=== File Operations ===');
  
  // Read and analyze files
  await agent.processMessage(
    "Read all JavaScript files in the src directory and list the exported functions"
  );

  // Create documentation
  await agent.processMessage(
    "Create a README.md file with documentation for all the .js files in this directory"
  );

  // Organize files
  await agent.processMessage(
    "Create folders for components, utils, and tests, then move files accordingly"
  );

  // Backup configuration
  await agent.processMessage(
    "Create a backup of all .json configuration files in a backup folder with today's date"
  );
}

fileManagementExample().catch(console.error);
```

### Development Assistant

```typescript
async function developmentAssistant() {
  // Agent with multiple MCP servers
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    openAIApiKey: process.env.OPENAI_API_KEY!,
    mcpServers: [
      MCPServers.filesystem('./'),
      MCPServers.github(process.env.GITHUB_TOKEN!),
      MCPServers.postgres('postgresql://localhost/devdb')
    ]
  });

  await agent.initialize();

  // Complete development workflow
  console.log('\n=== Development Workflow ===');
  
  // Analyze codebase
  await agent.processMessage(
    "Read all test files and identify which components lack test coverage"
  );

  // Create GitHub issues
  await agent.processMessage(
    "Create GitHub issues for each component that needs tests"
  );

  // Update database
  await agent.processMessage(
    "Update the code_quality table with the current test coverage metrics"
  );

  // Generate report
  await agent.processMessage(
    "Create a markdown report summarizing code quality and save it as quality-report.md"
  );
}
```

### Data Analysis Agent

```typescript
async function dataAnalysisExample() {
  const agent = ConversationalAgent.withMCP(
    {
      accountId: process.env.HEDERA_ACCOUNT_ID!,
      privateKey: process.env.HEDERA_PRIVATE_KEY!,
      openAIApiKey: process.env.OPENAI_API_KEY!,
    },
    [
      MCPServers.postgres('postgresql://localhost/analytics'),
      MCPServers.filesystem('./reports')
    ]
  );

  await agent.initialize();

  console.log('\n=== Data Analysis ===');
  
  // Query and analyze data
  await agent.processMessage(
    "Query the sales table for Q4 data and calculate the growth rate compared to Q3"
  );

  // Generate visualizations data
  await agent.processMessage(
    "Create a JSON file with monthly sales data formatted for chart visualization"
  );

  // Create comprehensive report
  await agent.processMessage(
    "Write a detailed analysis report including trends, insights, and recommendations, save as q4-analysis.md"
  );
}
```

### Agent with Filtered MCP Tools

```typescript
async function filteredMCPExample() {
  // Agent with tool filtering for safety
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    openAIApiKey: process.env.OPENAI_API_KEY!,
    mcpServers: [MCPServers.filesystem('/tmp/safe-directory')],
    toolFilter: (tool) => {
      // Only allow read operations and safe writes
      const safeTool = ['read_file', 'list_directory', 'write_file'].includes(tool.name);
      const unsafeOperation = tool.name.includes('delete') || tool.name.includes('remove');
      return safeTool && !unsafeOperation;
    }
  });

  await agent.initialize();

  // These operations will work
  await agent.processMessage("Read all text files");
  await agent.processMessage("Create a summary.txt file");

  // These will be blocked by the filter
  await agent.processMessage("Delete old files"); // Blocked
  await agent.processMessage("Remove temporary directory"); // Blocked
}
```

### Combined HCS and MCP Operations

```typescript
async function combinedOperations() {
  // Agent with HCS tools and MCP servers
  const agent = new ConversationalAgent({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    openAIApiKey: process.env.OPENAI_API_KEY!,
    mcpServers: [
      MCPServers.filesystem('./agent-data'),
      MCPServers.postgres('postgresql://localhost/agentdb')
    ]
  });

  await agent.initialize();

  console.log('\n=== Combined Operations ===');
  
  // Register agent and save profile
  await agent.processMessage(
    "Register me as DataAnalyzer with analytics capabilities"
  );

  await agent.processMessage(
    "Save my agent profile to agent-profile.json"
  );

  // Find agents and save results
  await agent.processMessage(
    "Find all agents with analytics tag and save the list to analytics-agents.json"
  );

  // Track connections in database
  await agent.processMessage(
    "Connect to agent 0.0.123456"
  );

  await agent.processMessage(
    "Insert this connection into the agent_connections table"
  );

  // Inscribe important data
  await agent.processMessage(
    "Read agent-profile.json and inscribe it on Hedera"
  );
}
```

## See Also

- Up next: [Plugin Development Guide](../plugin-development) — create your own tools
- [Getting Started](../getting-started) - Quick start guide
- [Available Tools](../tools) - Complete tool documentation
- [MCP Servers](../mcp-servers) - External tool integration guide
- [Plugin Development Guide](https://github.com/hashgraph-online/conversational-agent/blob/main/docs/PLUGIN_DEVELOPMENT.md) - Create custom plugins
- [HCS-10 Standard](/docs/standards/hcs-10) - OpenConvAI specification
- [HCS-2 Standard](/docs/standards/hcs-2) - Registry specification
