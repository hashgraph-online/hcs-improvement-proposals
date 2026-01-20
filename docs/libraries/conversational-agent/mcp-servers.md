---
title: MCP Servers
description: Extend your Conversational Agent with Model Context Protocol servers
---

# MCP (Model Context Protocol) Servers

MCP servers enable your Conversational Agent to interact with external tools, services, and data sources. This guide covers everything you need to know about using MCP with your agent.

Overview
- Understand what MCP adds on top of Hedera tools
- Add filesystem/GitHub/database servers quickly
- Control where CLI saves MCP config

## What is MCP?

Model Context Protocol (MCP) is a standardized protocol for connecting AI models to various services and APIs. It allows your agent to:

- Access local file systems
- Interact with databases
- Connect to third-party APIs
- Integrate with development tools
- Extend capabilities without modifying core agent code

## Quick Start

Diagram
```mermaid
flowchart LR
  A[ConversationalAgent] -- connects --> B[(MCP Server: filesystem)]
  A -- connects --> C[(MCP Server: github)]
  A -- connects --> D[(MCP Server: database)]
  subgraph Tools exposed
    T1[read_file/write_file]
    T2[create_issue/list_issues]
    T3[execute_query/list_tables]
  end
  B --> T1
  C --> T2
  D --> T3
```

### Using Pre-configured Servers

```typescript
import { ConversationalAgent, MCPServers } from '@hashgraphonline/conversational-agent';

// Create an agent with multiple MCP servers
const agent = ConversationalAgent.withMCP(
  {
    accountId: '0.0.123456',
    privateKey: 'your-private-key',
    openAIApiKey: 'your-openai-key',
  },
  [
    MCPServers.filesystem('/home/user/documents'),
    MCPServers.github('your-github-token'),
    MCPServers.postgres('postgresql://localhost/mydb')
  ]
);

await agent.initialize();
```

### Manual Configuration

```typescript
const agent = new ConversationalAgent({
  accountId: '0.0.123456',
  privateKey: 'your-private-key',
  openAIApiKey: 'your-openai-key',
  mcpServers: [
    {
      name: 'filesystem',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/tmp'],
      transport: 'stdio',
      autoConnect: true,
      // Optional metadata for better tool selection
      additionalContext: 'Use for reading/writing local project files',
      toolDescriptions: {
        'read_file': 'Read UTF-8 text files from the specified directory',
      },
    }
  ],
});
```

## Available MCP Servers

### Filesystem Server

Access and manage files on your local system:

```typescript
MCPServers.filesystem('/path/to/directory')
```

**Capabilities:**
- Read file contents
- Write and update files
- Create directories
- List directory contents
- Delete files and directories

**Example Commands:**
```typescript
"Read the config.json file"
"Create a new file called notes.txt with the meeting summary"
"List all JavaScript files in the src directory"
"Delete old backup files from the temp folder"
```

### GitHub Server

Interact with GitHub repositories:

```typescript
MCPServers.github('your-github-token')
```

**Capabilities:**
- Create and manage issues
- Create pull requests
- Read repository information
- Manage branches
- Access commit history

**Example Commands:**
```typescript
"Create an issue about the bug we discussed"
"List all open pull requests"
"Create a new branch called feature/new-dashboard"
"Get the latest commits from the main branch"
```

### Database Servers

#### PostgreSQL
```typescript
MCPServers.postgres('postgresql://user:password@host:5432/database')
```

#### SQLite
```typescript
MCPServers.sqlite('/path/to/database.db')
```

**Capabilities:**
- Execute queries
- View table schemas
- Insert, update, delete data
- Create and modify tables

**Example Commands:**
```typescript
"Query the users table for accounts created this week"
"Update the status to 'completed' for order ID 12345"
"Show me the schema for the products table"
"Create a new table for storing customer feedback"
```

### Slack Server

Send messages to Slack:

```typescript
MCPServers.slack('xoxb-your-slack-token')
```

**Capabilities:**
- Send messages to channels
- Send direct messages
- Create threads
- Upload files

**Example Commands:**
```typescript
"Send a message to #general about the deployment"
"DM John about the meeting tomorrow"
"Post the error log to #dev-alerts"
```

### Google Drive Server

Access Google Drive documents:

```typescript
MCPServers.googleDrive('{"client_id":"...","client_secret":"..."}')
```

**Capabilities:**
- Read document contents
- Create new documents
- Update existing documents
- Search for files

**Example Commands:**
```typescript
"Read the Q4 Planning document"
"Create a new spreadsheet for expense tracking"
"Update the project timeline document"
```

## CLI Configuration

The Conversational Agent CLI provides an interactive interface for configuring MCP servers.

### Initial Setup

1. Run the CLI:
   ```bash
   pnpm cli
   ```

2. From the main menu, select "MCP Servers"

3. Configure servers:
   - **Filesystem**: Toggle on/off and set the directory path
   - **Custom Servers**: Add any MCP-compatible server

### Configuration Storage

- Set `CONVERSATIONAL_AGENT_ROOT` to control where the CLI writes `mcp-config.json`.
- If not set, the CLI computes a project root relative to the CLI package; to avoid surprises, export `CONVERSATIONAL_AGENT_ROOT` to your repo path. Example from this repo root:
  ```bash
  export CONVERSATIONAL_AGENT_ROOT="$(pwd)/conversational-agent"
  ```
  The file will then be written to `conversational-agent/mcp-config.json`.

Example configuration (supports `stdio`, `http`, or `websocket` transports, plus optional `additionalContext` and `toolDescriptions`):
```json
{
  "servers": [
    {
      "name": "filesystem",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/docs"],
      "transport": "stdio",
      "autoConnect": true,
      "additionalContext": "Use for reading and writing local docs",
      "toolDescriptions": {
        "read_file": "Read UTF-8 text files from the documents directory"
      }
    },
    {
      "name": "github",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      },
      "transport": "stdio",
      "autoConnect": true
    }
  ]
}
```

## Advanced Configuration

### Custom MCP Server

Create a custom server configuration:

```typescript
const customServer: MCPServerConfig = {
  name: 'my-api-server',
  command: '/usr/local/bin/my-mcp-server',
  args: ['--port', '3000', '--config', '/etc/server.conf'],
  env: {
    API_KEY: process.env.MY_API_KEY,
    DEBUG: 'true',
  },
  transport: 'http',
  autoConnect: true,
  additionalContext: 'Use for retrieving product data and posting updates',
  toolDescriptions: {
    'get_product': 'Fetch product details by SKU',
    'update_price': 'Update product price with proper currency handling'
  }
};

const agent = new ConversationalAgent({
  // ... other config
  mcpServers: [customServer]
});
```

### Transport Types

MCP supports different transport mechanisms:

- **stdio**: Standard input/output (default)
- **http**: HTTP-based communication
- **websocket**: WebSocket connections

### Environment Variables

Pass environment variables to MCP servers:

```typescript
{
  name: 'api-server',
  command: 'api-mcp-server',
  env: {
    API_KEY: process.env.API_KEY,
    API_URL: 'https://api.example.com',
    RATE_LIMIT: '100'
  }
}
```

### Selective Connection

Control which servers connect automatically:

```typescript
const agent = new ConversationalAgent({
  // ... other config
  mcpServers: [
    {
      ...MCPServers.filesystem('/tmp'),
      autoConnect: false, // Don't connect on initialization
    },
    MCPServers.github(token), // This will auto-connect
  ],
});
```

## Security Considerations

### File System Access

- Limit filesystem access to specific directories
- Avoid granting access to sensitive system directories
- Use read-only access when write permissions aren't needed

### API Tokens

- Store tokens in environment variables
- Never hardcode tokens in source code
- Use tokens with minimal required permissions
- Rotate tokens regularly

### Database Access

- Use read-only database users when possible
- Limit access to specific tables/schemas
- Avoid using admin credentials
- Enable query logging for audit trails

## Tool Filtering

Filter MCP tools for safety:

```typescript
const agent = new ConversationalAgent({
  // ... other config
  mcpServers: [MCPServers.filesystem('/tmp')],
  toolFilter: (tool) => {
    // Block destructive operations
    if (tool.name.includes('delete') || tool.name.includes('remove')) {
      return false;
    }
    // Allow only specific tools
    return ['read_file', 'write_file', 'list_directory'].includes(tool.name);
  },
});
```

## Troubleshooting

### Common Issues

**Server fails to start:**
- Check that the server command is installed
- Verify environment variables are set
- Check file/directory permissions
- Review server logs for errors

**Tools not available:**
- Ensure server is connected (`autoConnect: true`)
- Check that the agent has initialized
- Verify MCP server is returning tools correctly

**Permission denied errors:**
- Verify file system permissions
- Check database user permissions
- Ensure API tokens have required scopes

### Debug Mode

Enable verbose logging to troubleshoot:

```typescript
const agent = new ConversationalAgent({
  // ... other config
  verbose: true,
  mcpServers: [/* your servers */]
});
```

## Creating Custom MCP Servers

To create your own MCP server:

1. Implement the MCP protocol specification
2. Define available tools and their schemas
3. Handle tool execution requests
4. Package as an executable or npm package

See the [MCP specification](https://github.com/anthropics/model-context-protocol) for implementation details.

## Best Practices

1. **Principle of Least Privilege**: Grant only necessary permissions
2. **Audit Logging**: Enable logging for sensitive operations
3. **Error Handling**: Implement graceful error handling
4. **Resource Limits**: Set appropriate timeouts and resource limits
5. **Regular Updates**: Keep MCP servers updated for security patches

## Examples

### File Management Agent

```typescript
const fileAgent = ConversationalAgent.withMCP(
  baseOptions,
  [MCPServers.filesystem('/home/user/projects')]
);

// Organize project files
await fileAgent.processMessage(
  "Create a src directory and move all .js files into it"
);

// Generate documentation
await fileAgent.processMessage(
  "Read all markdown files and create a table of contents"
);
```

### Development Assistant

```typescript
const devAgent = ConversationalAgent.withMCP(
  baseOptions,
  [
    MCPServers.filesystem('./'),
    MCPServers.github(process.env.GITHUB_TOKEN),
    MCPServers.postgres('postgresql://localhost/dev')
  ]
);

// Full development workflow
await devAgent.processMessage(
  "Check for failing tests, create a GitHub issue for each one, and update the test_results table"
);
```

### Data Analysis Agent

```typescript
const dataAgent = ConversationalAgent.withMCP(
  baseOptions,
  [
    MCPServers.postgres('postgresql://localhost/analytics'),
    MCPServers.filesystem('./reports')
  ]
);

// Generate reports
await dataAgent.processMessage(
  "Query sales data for Q4, analyze trends, and save a report to reports/q4-analysis.md"
);
```

## Next Steps

- Up next: [Examples](../examples) — end‑to‑end flows to copy/paste
- Explore [available tools](../tools) including MCP-provided tools
- See [practical examples](../examples) using MCP servers
- Read the [MCP Integration Guide](https://github.com/hashgraph-online/conversational-agent/blob/main/docs/MCP_INTEGRATION.md)
- Learn about [plugin development](../plugin-development) to extend functionality
