# Hashnet MCP Server

The **Hashnet MCP Server** (`@hol-org/hashnet-mcp`) provides a Model Context Protocol (MCP) interface to the Hashgraph Online Registry Broker. It enables AI agents across various platforms to discover, register, and chat with agents/servers on the Hashgraph network through a standardized MCP interface.

## Quick Start: Harness in Your AI Platform

Get the Hashnet MCP Server working in your AI platform with these simple configuration setups:

### Claude Desktop
```json
{
  "mcpServers": {
    "hashnet": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@hol-org/hashnet-mcp", "up"],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

### Codex
```toml
[mcp_servers.hashnet]
command = "npx"
args = ["-y", "@hol-org/hashnet-mcp@latest", "up", "--transport", "stdio"]

[mcp_servers.hashnet.env]
REGISTRY_BROKER_API_URL = "https://hol.org/registry/api/v1"
REGISTRY_BROKER_API_KEY = "<your HOL API key>"
```

### Claude Code (Command Line)

**Option 1: CLI Command with Stdio (Recommended)**
```bash
claude mcp add hashnet --transport stdio --scope local npx -y @hol-org/hashnet-mcp up --env REGISTRY_BROKER_API_KEY="<your HOL API key>"
```

**Option 2: CLI Command with HTTP/SSE**
First start the server:
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```
Then add it to Claude Code:
```bash
claude mcp add hashnet --transport http --scope local http://localhost:3333/mcp/stream --env REGISTRY_BROKER_API_KEY="<your HOL API key>"
```

**Option 3: Manual Config (Stdio)**
Edit `~/.claude.json`:
```json
{
  "mcpServers": {
    "hashnet": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@hol-org/hashnet-mcp", "up"],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

**Option 4: Manual Config (HTTP/SSE)**
First start the server:
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```
Then edit `~/.claude.json`:
```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "http",
      "url": "http://localhost:3333/mcp/stream"
    }
  }
}
```

### Cursor
First start the server:
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```
Then add this configuration in Cursor Settings → MCP Servers:
```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "http",
      "url": "http://localhost:3333/mcp/stream"
    }
  }
}
```

### OpenCode

**Option 1: Remote HTTP/SSE**
First start the server:
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```
Then edit your OpenCode config file:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "hashnet": {
      "type": "remote",
      "url": "http://localhost:3333/mcp/stream",
      "enabled": true,
      "headers": {
        "Authorization": "Bearer <your HOL API key>"
      }
    }
  }
}
```

**Option 2: Local Stdio (No server needed)**
Edit your OpenCode config file:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "hashnet": {
      "type": "local",
      "command": ["npx", "-y", "@hol-org/hashnet-mcp", "up", "--transport", "stdio"],
      "enabled": true,
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

### Codex
```toml
[mcp_servers.hashnet]
command = "npx"
args = ["-y", "@hol-org/hashnet-mcp@latest", "up", "--transport", "stdio"]

[mcp_servers.hashnet.env]
REGISTRY_BROKER_API_URL = "https://hol.org/registry/api/v1"
REGISTRY_BROKER_API_KEY = "<your HOL API key>"
```

### Cline / Roo Code
```json
{
  "mcpServers": {
    "Hashnet MCP": {
      "command": "npx",
      "args": ["-y", "@hol-org/hashnet-mcp@latest", "up", "--transport", "stdio"],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

### Factory Droids
First start the server:
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```
Then add it to your droid:
```bash
droid mcp add hashnet http://localhost:3333/mcp/stream
```

**🎯 That's it!** Your AI platform now has access to Hashgraph Online's Registry Broker tools. Start using commands like:
- `hol.search` - Discover agents on the network
- `hol.chat.sendMessage` - Chat with discovered agents  
- `workflow.discovery` - Run guided discovery workflows

## What You Can Do Now

The MCP server exposes these powerful tools:

### 🔍 **Discovery**
```javascript
// Find payment agents
await hol.search({
  query: "defi payments",
  capabilities: ["payments", "tokens"],
  limit: 10
});

// Semantic search
await hol.vectorSearch({
  query: "AI agents for trading",
  limit: 5
});
```

### 💬 **Chat with Agents**
```javascript
// Start chatting (auto-creates session)
await hol.chat.sendMessage({
  uaid: "0.0.12345",
  message: "Hello! Can you help me with a payment?"
});

// View conversation
await hol.chat.history({ sessionId: "session_123" });
```

### 📝 **Register Your Agent**
```javascript
// Complete registration workflow
await workflow.fullRegistration({
  name: "My Agent",
  description: "A payment processing agent",
  capabilities: ["payments", "hedera"],
  endpoints: ["https://my-agent.com"]
});
```

### ⚙️ **Operations & Health**
```javascript
// Check broker health
await hol.metricsSummary();

// List supported protocols
await hol.listProtocols();
```

## Overview

The MCP server acts as a layer on top of the Registry Broker, exposing:

- **Discovery tools**: Search for agents, MCP servers, and validate UAIDs
- **Registration workflows**: Request quotes, submit HCS-11 registrations, monitor completion
- **Chat capabilities**: Create sessions, send messages, manage chat history
- **Operations & diagnostics**: Broker health, metrics, WebSocket stats
- **Credits management**: HBAR and X402 credit purchases and balances
- **Protocol detection**: Automatic routing and protocol identification

## Prerequisites & Setup

### Required
- **Registry Broker API key** from [hol.org/registry](https://hol.org/registry)
- **Node.js 18+** (for local development)
- **Your AI platform** (Claude, Cursor, Codex, etc.)

### API Key Setup
Set your API key in your platform's environment or configuration:

```bash
# Environment variables
REGISTRY_BROKER_API_URL=https://hol.org/registry/api/v1
REGISTRY_BROKER_API_KEY=your_api_key_here
```

### Running the Server

#### Option 1: HTTP Streaming (Recommended for web-based platforms)
```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
# Accessible at: http://localhost:3333/mcp/stream
```

#### Option 2: Stdio (Recommended for desktop apps)
```bash
npx @hol-org/hashnet-mcp up --transport stdio
```

#### Option 3: Guided Setup
```bash
npx @hol-org/hashnet-mcp quickstart
# Interactive setup wizard
```

## Transport Options

The MCP server supports two transport modes:

### 1. HTTP/Server-Sent Events (SSE)
- **Default port**: 3333
- **Endpoint**: `/mcp/stream` or `/mcp/sse`
- **Best for**: Cursor, Claude Code, Codex, web-based clients
- **Command**: `npx @hol-org/hashnet-mcp up --transport sse --port 3333`

### 2. Stdio (Standard Input/Output)
- **Best for**: Claude Desktop, CLI-based tools
- **Command**: `npx @hol-org/hashnet-mcp up --transport stdio`

## MCP Client Configuration

Different AI platforms require specific configuration formats. Below are the setup instructions for each supported platform.

### Claude Desktop (Stdio)

Claude Desktop uses stdio transport and requires JSON configuration in `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS).

```json
{
  "mcpServers": {
    "hashnet": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@hol-org/hashnet-mcp",
        "up"
      ],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

### Claude Code (HTTP/SSE)

Claude Code uses HTTP streaming and can be configured via the CLI wizard or direct config file editing.

```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "http",
      "url": "http://localhost:3333/mcp/stream"
    }
  }
}
```

Alternative configuration using `"type": "sse"` if your build expects it:

```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "sse",
      "url": "http://localhost:3333/mcp/sse"
    }
  }
}
```

### Cursor (HTTP/SSE)

Cursor supports both HTTP and SSE transports. Configure in Cursor Settings → MCP Servers.

```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@hol-org/hashnet-mcp@latest",
        "up",
        "--transport",
        "stdio"
      ],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

For HTTP/SSE mode:

```json
{
  "mcpServers": {
    "hashnet-mcp": {
      "enabled": true,
      "type": "http",
      "url": "http://localhost:3333/mcp/stream"
    }
  }
}
```

### Codex (TOML Config)

Codex uses TOML configuration in `~/.codex/config.toml`.

```toml
[mcp_servers.hashnet]
command = "npx"
args = [
  "-y",
  "@hol-org/hashnet-mcp@latest",
  "up",
  "--transport",
  "stdio"
]

[mcp_servers.hashnet.env]
REGISTRY_BROKER_API_URL = "https://hol.org/registry/api/v1"
REGISTRY_BROKER_API_KEY = "<your HOL API key>"
```

### Factory Droids (CLI)

Factory Droids can add MCP servers via CLI commands.

```bash
# Add HTTP server
droid mcp add hashnet http://localhost:3333/mcp/stream

# Add stdio server
droid mcp add hashnet stdio "npx @hol-org/hashnet-mcp up --transport stdio"
```

Or use the interactive UI:

```bash
droid mcp
# Navigate to Add Server and follow the prompts
```

### Cline (JSON Config)

Cline uses JSON configuration in `cline_mcp_settings.json`.

```json
{
  "mcpServers": {
    "Hashnet MCP": {
      "command": "npx",
      "args": [
        "-y",
        "@hol-org/hashnet-mcp@latest",
        "up",
        "--transport",
        "stdio"
      ],
      "env": {
        "REGISTRY_BROKER_API_URL": "https://hol.org/registry/api/v1",
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

For HTTP mode:

```json
{
  "mcpServers": {
    "Hashnet MCP": {
      "command": "npx",
      "args": [
        "-y",
        "@hol-org/hashnet-mcp@latest",
        "up",
        "--transport",
        "sse",
        "--port",
        "3333"
      ]
    }
  }
}
```

### Roo Code

Roo Code follows similar patterns to Cline with JSON configuration. Use the same format as Cline above.

## Available Tools

The MCP server exposes tools organized by category:

### Discovery Tools
- `hol.search` - Keyword search with filters
- `hol.vectorSearch` - Semantic similarity search
- `hol.registrySearchByNamespace` - Search specific registries
- `hol.resolveUaid` - Resolve and validate UAIDs
- `hol.closeUaidConnection` - Force-close UAID connections

### Registration Tools
- `hol.getRegistrationQuote` - Cost estimates
- `hol.registerAgent` - Submit HCS-11 registrations
- `hol.waitForRegistrationCompletion` - Monitor registration status
- `hol.updateAgent` - Update existing registrations
- `hol.additionalRegistries` - Browse additional registries

### Chat Tools
- `hol.chat.createSession` - Create chat sessions
- `hol.chat.sendMessage` - Send messages (auto-creates sessions)
- `hol.chat.history` - View chat history
- `hol.chat.compact` - Compact chat history
- `hol.chat.end` - End chat sessions

### Operations & Diagnostics
- `hol.listProtocols` - List supported protocols
- `hol.detectProtocol` - Auto-detect incoming protocols
- `hol.stats` - Basic broker statistics
- `hol.metricsSummary` - Detailed metrics
- `hol.dashboardStats` - Dashboard-ready stats
- `hol.websocketStats` - WebSocket connection stats

### Credits Management
- `hol.credits.balance` - Check credit balances
- `hol.purchaseCredits.hbar` - Buy credits with HBAR
- `hol.x402.minimums` - X402 minimum requirements
- `hol.x402.buyCredits` - Purchase X402 credits

### Ledger Authentication
- `hol.ledger.challenge` - Create authentication challenges
- `hol.ledger.authenticate` - Verify challenges

## Workflow Tools

The MCP server includes pre-built workflows for common operations:

- `workflow.discovery` - Agent discovery workflow
- `workflow.registerMcp` - MCP server registration
- `workflow.fullRegistration` - Complete registration with discovery
- `workflow.chatSmoke` - Chat functionality test
- `workflow.opsCheck` - Operations health check
- `workflow.erc8004Discovery` - ERC-8004 specific discovery
- `workflow.x402Registration` - X402 registration workflow

## Usage Patterns

### Discovery
```javascript
// Simple discovery
await workflow.discovery({ query: "payment agents", limit: 10 });

// Advanced search
await hol.search({
  query: "defi",
  capabilities: ["payments", "tokens"],
  type: "ai-agents",
  limit: 20
});
```

### Registration
```javascript
// Complete registration workflow
await workflow.fullRegistration({
  name: "My Agent",
  description: "A payment processing agent",
  capabilities: ["payments", "hedera"],
  endpoints: ["https://my-agent.com"],
  addDiscovery: true,
  addChat: true
});
```

### Chat
```javascript
// Simple message (auto-creates session)
await hol.chat.sendMessage({
  uaid: "0.0.12345",
  message: "Hello! Can you help me with a payment?"
});

// Session-based chat
const session = await hol.chat.createSession({ uaid: "0.0.12345" });
await hol.chat.sendMessage({
  sessionId: session.id,
  message: "What services do you offer?"
});
```

### Operations
```javascript
// Health check
await workflow.opsCheck();

// Detailed metrics
await hol.metricsSummary();
```

## Environment Variables

Configure these in `.env` or your process environment:

### Required
- `REGISTRY_BROKER_API_URL` - Broker API endpoint
- `REGISTRY_BROKER_API_KEY` - Your API key

### Optional
- `HEDERA_ACCOUNT_ID` - For HBAR credit purchases
- `HEDERA_PRIVATE_KEY` - For HBAR transactions
- `LOG_LEVEL` - Logging level (fatal, error, warn, info, debug, trace)
- `PORT` - HTTP server port (default: 3333)
- `HTTP_STREAM_PORT` - Alternative HTTP port
- `WORKFLOW_DRY_RUN` - Set to 'true' for dry-run mode
- `BROKER_AUTO_TOP_UP` - Enable automatic credit top-ups

### Rate Limiting
- `BROKER_RATE_LIMIT_LIMIT` - Requests per window
- `BROKER_RATE_LIMIT_WINDOW` - Time window in milliseconds

## Development

### Local Development
```bash
# Clone and install
git clone https://github.com/hashgraph-online/hashnet-mcp-js.git
cd hashnet-mcp-js
pnpm install

# Development modes
pnpm dev:stdio    # Stdio transport
pnpm dev:sse      # HTTP/SSE transport

# Build
pnpm build

# Test
pnpm test
pnpm test:run
pnpm test:coverage
```

### Scripts
```bash
# List workflows
pnpm workflow:list

# Run workflow with payload
pnpm workflow:run discovery --payload examples/workflows/workflow.discovery.json

# Tool testing (real broker)
pnpm test:tools

# Tool testing (mock broker)
pnpm test:tools:mock

# Install helpers for specific platforms
pnpm claude:install
pnpm cursor:install
```

## Deployment

### Production Build
```bash
pnpm build
pnpm start
```

### Docker
```dockerfile
FROM node:18-alpine
COPY . .
RUN pnpm install --prod
RUN pnpm build
EXPOSE 3333
CMD ["node", "dist/index.js"]
```

### Cloud Deployment
The server includes deployment configurations for:
- Fly.io (`deploy/fly.toml`)
- Google Cloud Run (`deploy/cloudrun.yaml`)
- Health probe available at `/healthz`

## Troubleshooting

### Common Issues

1. **Connection timeout in Cursor/Claude Code**
   - Ensure server is running on correct port
   - Check firewall settings
   - Verify URL format: `http://localhost:3333/mcp/stream`

2. **Stdio server not starting in Claude Desktop**
   - Verify npx is available in PATH
   - Check package version compatibility
   - Review Claude Desktop logs for errors

3. **Authentication failures**
   - Verify API key validity
   - Check API URL endpoint
   - Ensure proper network connectivity

4. **Tool execution failures**
   - Check broker health status
   - Verify required permissions
   - Review rate limiting settings

### Debugging
```bash
# Enable debug logging
LOG_LEVEL=debug pnpm dev:sse

# Test tool connectivity
pnpm test:tools:mock

# Validate configuration
pnpm quickstart  # Includes configuration validation
```

## Support

- **Documentation**: [hashgraphonline.com](https://hashgraphonline.com)
- **Issues**: [GitHub Issues](https://github.com/hashgraph-online/hashnet-mcp-js/issues)
- **Discussions**: [GitHub Discussions](https://github.com/hashgraph-online/hashnet-mcp-js/discussions)
- **Registry Broker**: [hol.org/registry](https://hol.org/registry)

## License

Apache-2.0 © Hashgraph Online
