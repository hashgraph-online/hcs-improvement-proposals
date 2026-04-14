---
title: Cursor harness
sidebar_position: 11
---

# Cursor harness

Use this guide when you want Guard to own artifact trust before Cursor launches while Cursor keeps its own built-in tool approval behavior.

## What Guard detects

The Cursor adapter reads:

- `~/.cursor/mcp.json`
- `<workspace>/.cursor/mcp.json`

Guard records one artifact per MCP server and preserves:

- project vs global scope
- `stdio` vs `http` transport
- the configured `command`, `args`, and `url`

## Approval model

Cursor uses the `native-harness` approval path:

- Cursor keeps native tool approval
- Guard focuses on artifact trust, provenance, and preflight review
- the goal is to let Guard stop changed packages before launch without replacing Cursor's own permission model

## Runtime probe

Cursor has a dedicated runtime probe that runs:

```bash
cursor-agent mcp list
```

Guard compares that runtime output with what it found on disk. If Guard detects local servers but Cursor reports none, Guard emits a warning that Cursor may be loading a different config root.

## Install and launch flow

```bash
hol-guard detect cursor --json
hol-guard install cursor
hol-guard run cursor --dry-run
hol-guard run cursor
```

Guard uses wrapper-mode management state for Cursor. It does not rewrite Cursor config to take over tool permissions.

## Recommended validation loop

```bash
hol-guard detect cursor --json
cursor-agent mcp list
hol-guard run cursor --dry-run
hol-guard receipts
hol-guard status
```

Use the receipts and warnings together:

- receipts confirm what changed
- runtime warnings confirm whether Cursor is loading the same MCP roots that Guard inspected

## Best fit

Cursor is a strong Guard fit when you want:

- separate artifact-trust enforcement
- native Cursor permission prompts to remain intact
- a runtime sanity check against `cursor-agent mcp list`

## Next guides

- [Gemini harness](./gemini-harness.md)
- [Harness support matrix](./harness-support.md)
- [Testing and validation](./testing-and-validation.md)
