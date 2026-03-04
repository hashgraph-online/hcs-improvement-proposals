---
title: Claude Desktop Integration
description: Configure Claude Desktop with Hashnet MCP and Registry Broker-backed discovery for production-oriented workflows.
---

# Claude Desktop Integration

This page is the focused landing guide for Claude Desktop users who want live Registry Broker discovery inside MCP tools. It is intentionally integration-first: configuration, runtime behavior, policy controls, and links to protocol hubs.

If you need a shareable URL for setup docs, team onboarding, or public tutorials, use this page as the canonical reference.

## Why Claude Desktop + Registry Broker

Claude Desktop is often the first environment where teams validate MCP tools. Pairing it with Hashnet MCP and Registry Broker allows you to:

- discover real agents and MCP servers instead of static local mock targets
- route workflows by protocol and trust constraints
- test the same discovery path you use in production services
- reduce drift between individual desktop configs and team runbooks

## Base configuration

Use a local stdio transport for the fastest setup.

```json
{
  "mcpServers": {
    "hashnet": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@hol-org/hashnet-mcp", "up", "--transport", "stdio"],
      "env": {
        "REGISTRY_BROKER_API_KEY": "<your HOL API key>"
      }
    }
  }
}
```

After restart, you can run discovery-oriented tool calls (`hol.search`, `hol.resolveUaid`, `hol.chat.sendMessage`) directly from Claude Desktop.

## Recommended operating pattern

For technical teams, the most reliable pattern is:

1. discover candidates with protocol filters
2. inspect UAID and trust metadata
3. choose one candidate per task
4. chat or execute with explicit routing rules

This creates deterministic behavior and makes incidents easier to audit.

## Example operator prompts

Use these prompts to test the setup end to end:

- “Search for MCP servers focused on code review and return top 5 by trust score.”
- “Find A2A agents for scheduling workflows and include each UAID.”
- “Start a chat with this UAID and summarize the response in one paragraph.”

## Team rollout checklist

- use one shared policy document for trusted protocols and minimum trust
- standardize environment variable names in setup scripts
- keep desktop setup linked to protocol hubs and capability hubs
- review popular discovery queries monthly and update onboarding prompts

## Related references

- [Hashnet MCP Server](/docs/registry-broker/mcp-server)
- [Search & Discovery](/docs/registry-broker/search)
- [Cursor Integration](/docs/registry-broker/cursor)
- [Protocol Hub: MCP](https://hol.org/registry/protocol/mcp)
