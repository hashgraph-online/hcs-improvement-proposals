---
title: Guard get started
sidebar_position: 2
---

# Guard get started

Install `hol-guard` when you want local harness protection before Codex, Claude Code, Cursor, Gemini, or OpenCode launch new or changed tools.

Guard is local-first. The core safety loop works before sign-in, before sync, and before any team policy is involved.

## Install

```bash
pip install hol-guard
```

If you prefer isolated shell tools:

```bash
pipx install hol-guard
```

## The everyday flow

1. Detect the harnesses Guard can manage on this machine.

   ```bash
   hol-guard bootstrap
   ```

2. Install Guard in front of the harness you use most.

   ```bash
   hol-guard install codex
   ```

3. Record a baseline once before you trust the current artifact set.

   ```bash
   hol-guard run codex --dry-run
   ```

4. Launch through Guard after that.

   ```bash
   hol-guard run codex
   ```

5. If Guard cannot pause inline, resolve the queued request in the local approval center.

   ```bash
   hol-guard approvals
   ```

6. Inspect receipts, diffs, and current managed state.

   ```bash
   hol-guard receipts
   hol-guard status
   hol-guard diff codex
   ```

## Fine-tune local policy

Guard resolves decisions in this order:

1. saved decisions from `hol-guard approvals`
2. workspace override file
3. home config
4. Guard's built-in recommendation

Home config example:

```toml
mode = "prompt"
default_action = "warn"
changed_hash_action = "require-reapproval"

[harnesses.codex]
default_action = "allow"

[publishers.hashgraph-online]
default_action = "allow"

[artifacts."codex:project:workspace_tools"]
default_action = "sandbox-required"
```

Workspace override example:

```toml
# .ai-plugin-scanner-guard.toml
[artifacts."codex:project:workspace_tools"]
default_action = "block"
```

Supported actions:

- `allow`
- `warn`
- `block`
- `sandbox-required`
- `require-reapproval`

## What `install` changes

`hol-guard install <harness>` creates a local launcher shim under Guard's home directory:

- macOS and Linux: `~/.config/.ai-plugin-scanner-guard/bin/guard-<harness>`
- Windows: `~/.config/.ai-plugin-scanner-guard/bin/guard-<harness>.cmd`

The hidden `.ai-plugin-scanner-guard` directory name is intentional; Guard uses that home directory under `.config` today.

Claude Code also gets Guard hook entries in `.claude/settings.local.json` when you install from a workspace.

## Approval paths

Guard uses three approval tiers:

1. native harness approval when the harness already has a strong permission model
2. the local Guard approval center on `127.0.0.1`
3. terminal resolution through `hol-guard approvals`

Current strategy:

- `claude-code` prefers Claude hooks and can defer blocked work cleanly
- `codex` uses the Guard approval center today
- `cursor` keeps Cursor's native tool approval and lets Guard own artifact trust
- `opencode` keeps OpenCode's permission model and lets Guard manage package policy
- `gemini` scans extension manifests and routes blocked changes to the approval center

## Useful validation loop

```bash
hol-guard detect codex --json
hol-guard install codex
hol-guard status
hol-guard run codex --dry-run
hol-guard receipts
```

## Next guides

- [Local-first runtime and approvals](./local-first-and-approvals.md)
- [Harness support matrix](./harness-support.md)
- [Codex harness](./codex-harness.md)
- [Claude Code harness](./claude-code-harness.md)
- [Cursor harness](./cursor-harness.md)
- [Gemini harness](./gemini-harness.md)
- [OpenCode harness](./opencode-harness.md)
- [Scanner quick start](../plugin-scanner/quick-start.md)
