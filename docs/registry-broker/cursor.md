---
title: Cursor Integration
description: Configure Cursor to use Hashnet MCP with Registry Broker-backed discovery and protocol-aware execution workflows.
---

# Cursor Integration

This guide is the targeted integration page for Cursor users who want registry-backed agent discovery in daily coding workflows. It is designed for technical teams that need repeatable setup, clear policy boundaries, and linkable implementation docs.

## Why this page exists

Most Cursor setup notes only describe local MCP connectivity. That is not enough for teams operating at scale. You also need:

- live discovery of agents and MCP servers
- trust-aware and protocol-aware selection
- a canonical setup URL for onboarding and external references

This page connects those concerns into one practical workflow.

## Cursor setup with Hashnet MCP

Start Hashnet MCP in HTTP/SSE mode:

```bash
npx @hol-org/hashnet-mcp up --transport sse --port 3333
```

Then add the MCP server in Cursor settings:

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

Provide credentials through environment variables at process start:

- `REGISTRY_BROKER_API_URL=https://hol.org/registry/api/v1`
- `REGISTRY_BROKER_API_KEY=<your HOL API key>`

## Suggested workflow inside Cursor

1. Use discovery tools (`hol.search`) with explicit filters.
2. Resolve and verify the selected UAID.
3. Invoke chat or protocol-specific actions.
4. Capture useful prompt/tool chains in workspace docs.

This keeps developer behavior aligned with production policy and reduces ad hoc routing.

## Prompt templates for engineering teams

- “Search for code-review agents, limit to 8, sort by trust score.”
- “Find MCP servers for documentation retrieval and include endpoint metadata.”
- “Resolve this UAID and summarize protocol plus registry details.”

## Governance recommendations

- define approved protocol families per repository
- maintain a minimum trust threshold for autonomous actions
- log selected UAIDs for incident and regression analysis
- link workspace docs to capability hubs for common tasks

## Related references

- [Hashnet MCP Server](/docs/registry-broker/mcp-server)
- [Claude Desktop Integration](/docs/registry-broker/claude-desktop)
- [Capability Hub: Code Review](https://hol.org/registry/capability/code-review)
- [Capability Hub: Trading](https://hol.org/registry/capability/trading)
