---
title: Gemini harness
sidebar_position: 12
---

# Gemini harness

Use this guide when Gemini CLI is loading local extensions or embedded MCP server declarations and you want Guard to block changed extension surfaces before launch.

## What Guard detects

The Gemini adapter looks in:

- `~/.gemini/extensions/*/gemini-extension.json`
- `<workspace>/.gemini/extensions/*/gemini-extension.json`
- fallback global `~/.gemini/*/mcp_config.json`

For each extension manifest Guard records:

- the extension name
- the publisher when present
- the optional `contextFileName`
- embedded MCP server definitions under `mcpServers`

## Approval model

Gemini currently uses the Guard approval center:

- approval tier: `approval-center`
- Guard scans Gemini extensions before launch
- blocked changes go to the local approval center until Gemini exposes a richer native approval model

## What Guard treats as an artifact

Guard treats both of these as relevant launch inputs:

- the extension manifest itself
- any embedded MCP server declarations inside that manifest

That matters because a Gemini extension can change publisher metadata, context wiring, and runtime server commands in the same file.

## Install and launch flow

```bash
hol-guard detect gemini --json
hol-guard install gemini
hol-guard run gemini --dry-run
hol-guard run gemini
hol-guard approvals
```

## Recommended validation loop

Use a workspace or home directory with a real Gemini extension installed, then confirm:

1. Guard detects the extension manifest
2. embedded MCP server entries are listed in the detection output
3. the first dry run records a receipt
4. changed extension metadata routes to the approval center when policy blocks

## Best fit

Gemini is a good Guard fit when you want:

- extension-level trust before launch
- publisher and context metadata recorded alongside MCP server definitions
- a local approval-center path while Gemini-native approvals are still limited

## Next guides

- [OpenCode harness](./opencode-harness.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Testing and validation](./testing-and-validation.md)
