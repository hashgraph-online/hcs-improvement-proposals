---
title: Claude Code harness
sidebar_position: 10
---

# Claude Code harness

Claude Code is the strongest current Guard harness when you want deferred approvals without giving up a native-feeling local workflow.

## What Guard detects

The Claude Code adapter reads:

- `~/.claude/settings.json`
- `<workspace>/.claude/settings.json`
- `<workspace>/.claude/settings.local.json`
- `<workspace>/.mcp.json`
- `<workspace>/.claude/agents/*.md`

Guard records artifacts for:

- MCP servers from `mcpServers`
- Claude hook commands from `PreToolUse` and `PostToolUse`
- workspace agents from `.claude/agents`

## Approval model

Claude Code uses the mixed `native-or-center` path:

- Guard uses Claude hooks first when the shell can pause cleanly
- blocked work can fall back to the local approval center when inline prompting is not enough
- Claude is the best current harness for deferred Guard approvals

## What `install` changes

The base install still creates a Guard shim, but Claude Code adds one extra step when you install from a workspace:

- Guard writes its own hook entry into `<workspace>/.claude/settings.local.json`
- it adds that hook under both `PreToolUse` and `PostToolUse`
- uninstall removes only the Guard hook entry again

That makes Claude Code the one harness where Guard intentionally performs a small, reversible workspace-local config mutation today.

## Launch behavior

When Guard launches Claude Code from a workspace, it passes the workspace path so Claude still opens in the right project while Guard sits in front of the launch.

Use this loop:

```bash
hol-guard detect claude-code --json
hol-guard install claude-code
hol-guard run claude-code --dry-run
hol-guard run claude-code
hol-guard approvals
```

## Why teams like Claude Code first

Claude Code works especially well for Guard pilots because it combines:

- MCP discovery
- hook surfaces
- workspace agents
- cleaner deferred approval behavior than the other current harnesses

## Recommended validation loop

Use a workspace that already has `.claude` config or agents, then confirm:

1. Guard finds the right settings files
2. the Guard hook entries land in `.claude/settings.local.json`
3. `hol-guard run claude-code --dry-run` records receipts
4. blocked changes can still move into the approval center cleanly

## Next guides

- [Cursor harness](./cursor-harness.md)
- [Local-first runtime and approvals](./local-first-and-approvals.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
