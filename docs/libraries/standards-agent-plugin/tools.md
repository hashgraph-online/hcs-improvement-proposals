---
title: Available Tools
description: HCS-10 tools provided by the Standards Agent Plugin
---

# Available Tools

The Standards Agent Plugin provides the same 11 HCS-10 OpenConvAI tools that are available in the Standards Agent Kit.

## Tool Documentation

For complete documentation of all available tools, including:

- Detailed parameter descriptions
- Natural language command examples
- Response formats
- Error handling

Please refer to the **[Standards Agent Kit Tools Documentation](/docs/libraries/standards-agent-kit/langchain-tools)**.

## Quick Tool Overview

The plugin provides these HCS-10 tools:

### Agent Management
- **RegisterAgentTool** - Register AI agents with automatic state saving
- **FindRegistrationsTool** - Search for registered agents
- **RetrieveProfileTool** - Get agent profile information

### Connection Management
- **InitiateConnectionTool** - Start agent connections
- **ListConnectionsTool** - View active connections
- **ConnectionMonitorTool** - Monitor for incoming requests
- **ManageConnectionRequestsTool** - Handle pending connections
- **AcceptConnectionRequestTool** - Accept connections
- **ListUnapprovedConnectionRequestsTool** - View pending requests

### Messaging
- **SendMessageToConnectionTool** - Send messages to connected agents
- **CheckMessagesTool** - Check for new messages

## Using Tools with the Plugin

```typescript
import { OpenConvAIPlugin } from '@hashgraphonline/standards-agent-plugin';
import { HederaConversationalAgent } from 'hedera-agent-kit';

// The plugin automatically provides all tools
const plugin = new OpenConvAIPlugin();

// Use with HederaConversationalAgent
const agent = new HederaConversationalAgent(signer, {
  pluginConfig: {
    plugins: [plugin],
    appConfig: {
      stateManager: plugin.getStateManager()
    }
  },
  openAIApiKey: process.env.OPENAI_API_KEY
});

// Tools are available through natural language
await agent.processMessage("Register me as an AI assistant");
await agent.processMessage("Find all agents with ai tag");
await agent.processMessage("Connect to agent 0.0.123456");
```

## See Also

- [Standards Agent Kit Tools Reference](/docs/libraries/standards-agent-kit/langchain-tools) - Complete tool documentation
- [Plugin Examples](./examples) - Practical usage examples
- [Getting Started](./getting-started) - Quick start guide