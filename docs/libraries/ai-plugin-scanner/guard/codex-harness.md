---
title: Codex harness
sidebar_position: 9
---

# Codex harness

Use this guide when Codex is your main local harness and you want Guard to stop changed MCP servers before the Codex CLI launches.

## What Guard detects

The Codex adapter reads:

- `~/.codex/config.toml`
- `<workspace>/.codex/config.toml`

From those files Guard inspects `mcp_servers` entries, records one artifact per server, and keeps the scope clear:

- `global` when the config comes from your home directory
- `project` when the config lives inside the current workspace

Guard preserves the configured transport:

- `stdio` when the server declares a `command`
- `http` when the server declares a `url`

## Approval model

Codex currently uses the Guard approval center as its main approval surface.

- approval tier: `approval-center`
- current summary: Guard owns artifact approval today and can hand blocked changes to the local approval center
- fallback path: use the local approval center now, then move longer-term approval UX onto Codex App Server when that path is available

## Install and launch flow

Use the standard Guard wrapper flow:

```bash
hol-guard detect codex --json
hol-guard install codex
hol-guard run codex --dry-run
hol-guard run codex
hol-guard approvals
```

`hol-guard install codex` creates a local Guard shim and keeps Codex launch interception outside your repository config. Guard does not rewrite the Codex config itself.

## What a blocked change looks like

When Codex config changes introduce a new or changed MCP server:

1. Guard snapshots the configured server
2. compares it against the last stored state
3. resolves the effective policy action
4. records a receipt and optional diff
5. pauses launch and routes approval through the local approval center when policy blocks

## Recommended validation loop

For a real local canary:

```bash
hol-guard detect codex --json
hol-guard install codex
hol-guard status
hol-guard run codex --dry-run
hol-guard receipts
hol-guard diff codex
```

If you want a stronger first-party canary, point Codex at a local `hashnet-mcp-js` checkout from `~/.codex/config.toml` or `<workspace>/.codex/config.toml`, then repeat the Guard loop above.

## Best fit

Codex is a good Guard fit when you want:

- clean config discovery from TOML
- explicit project-vs-global MCP server scope
- local receipt-backed approval before Codex starts

## Next guides

- [Claude Code harness](./claude-code-harness.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Testing and validation](./testing-and-validation.md)
