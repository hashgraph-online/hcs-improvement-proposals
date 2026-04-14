---
title: OpenCode harness
sidebar_position: 13
---

# OpenCode harness

OpenCode is the other main `native-harness` Guard path: Guard handles artifact trust and provenance while OpenCode keeps its own permission model for tool execution.

## What Guard detects

The OpenCode adapter reads:

- `~/.config/opencode/opencode.json`
- `<workspace>/opencode.json`
- `<workspace>/opencode.jsonc`
- `<workspace>/.opencode/commands/*.md`

Inside config, Guard inspects the `mcp` block and records one artifact per declared server. For workspace commands, Guard records one artifact per Markdown command file in `.opencode/commands`.

## Approval model

OpenCode uses the `native-harness` tier:

- Guard authors artifact-level policy before launch
- OpenCode keeps its native allow or deny behavior for tool execution
- the goal is package-level trust without replacing OpenCode's built-in permission semantics

## Launch behavior

OpenCode shares one special launch rule with Claude Code: when you run it from a workspace, Guard passes the workspace path through on launch so OpenCode opens in the right directory.

Use this loop:

```bash
hol-guard detect opencode --json
hol-guard install opencode
hol-guard run opencode --dry-run
hol-guard run opencode
```

## What makes OpenCode different

OpenCode is the only current Guard harness that combines:

- JSON or JSONC config discovery
- MCP server detection from a command list
- workspace command discovery from `.opencode/commands/*.md`

That makes it a good fit when you want Guard to watch both runtime server wiring and workspace-authored command surfaces.

## Recommended validation loop

```bash
hol-guard detect opencode --json
opencode --help
hol-guard run opencode --dry-run
hol-guard receipts
hol-guard status
```

If your workspace uses `.opencode/commands`, make one small change to a command file and confirm Guard records it as a changed artifact before the next launch.

## Next guides

- [Testing and validation](./testing-and-validation.md)
- [Harness support matrix](./harness-support.md)
- [Scanner quick start](../plugin-scanner/quick-start.md)
