---
title: Harness support matrix
sidebar_position: 4
---

# Harness support matrix

Current Guard support in `ai-plugin-scanner` focuses on reversible overlay behavior and artifact trust before launch.

## Supported harnesses

### Codex

- detects global and project `config.toml`
- parses configured MCP servers
- supports wrapper-mode `hol-guard run codex`
- uses the local approval center for blocked artifact changes today

### Claude Code

- detects global and project settings, hooks, `.mcp.json`, and workspace agents
- supports local hook install and uninstall in `.claude/settings.local.json`
- is the strongest current harness for graceful approval deferral

### Cursor

- detects global and project `mcp.json`
- supports wrapper-mode management state
- leaves Cursor's native tool approval in place and focuses Guard on artifact trust

### Gemini

- detects local extension manifests and embedded MCP server declarations
- supports wrapper-mode management state
- falls back to the local approval center when Guard blocks a launch

### OpenCode

- detects global and project config plus workspace commands
- supports wrapper-mode management state
- respects OpenCode permission rules and uses Guard for package-level policy

## Approval tiers

Guard uses these approval tiers:

1. native harness approval when the harness already has strong permission controls
2. local Guard approval center on `127.0.0.1`
3. terminal approval resolution through `hol-guard approvals`

## Design principles

Harness adapters are built to prefer:

- discovery before mutation
- reversible overlays instead of invasive rewrites
- local evidence and receipts before shared state
- graceful pause or queue behavior instead of abrupt launch failure

## Suggested first-party canaries

Use these repos to validate Guard against real first-party surfaces:

- `hashnet-mcp-js` for a real MCP server target
- `registry-broker-skills` for a real skills registry fixture during scan and trust checks

## Next guides

- [Codex harness](./codex-harness.md)
- [Claude Code harness](./claude-code-harness.md)
- [Cursor harness](./cursor-harness.md)
- [Gemini harness](./gemini-harness.md)
- [OpenCode harness](./opencode-harness.md)
- [Testing and validation](./testing-and-validation.md)
