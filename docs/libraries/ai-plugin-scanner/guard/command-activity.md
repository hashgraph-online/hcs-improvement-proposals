---
title: Command activity tracking
sidebar_position: 6
---

# Command activity tracking

Every command Guard evaluates is recorded with its decision, proof level, and outcome — queryable via CLI and dashboard. This provides tamper-evident evidence without exposing matcher internals.

## What gets recorded

Each command activity record includes:

- **Command** — the evaluated command text
- **Harness** — which AI agent submitted it (Codex, Claude, etc.)
- **Decision** — allowed, blocked, or queued for approval
- **Proof level** — how Guard verified the outcome (static proof, runtime observation, or unverified)
- **Prompted** — whether the user was prompted for approval
- **Extension ID** — which command extension handled it, if any
- **Timestamp** — when the command was evaluated

## Dashboard views

### Evidence workbench

Navigate to `/evidence?view=commands` to see all command activity across harnesses. Filter by harness, status, proof level, or extension. Cursor-paginated for performance.

### Per-harness activity

On any harness detail page (`/apps/{harness}?tab=activity&activity=commands`), three modes are available:

- **Recorded actions** — all commands Guard evaluated for this harness
- **Command protection** — commands that were blocked or queued
- **Pending reviews** — commands still awaiting your decision

### Home dashboard

When command activity exists, a summary card appears on the home dashboard showing total commands checked.

## Analytics

The command activity dashboard provides:

- **Day-by-day breakdown** — commands evaluated per day
- **Top-N commands** — most frequently evaluated commands
- **Dimension breakdown** — by harness, proof level, extension, and status
- **Extension catalog** — which extensions handled which commands

A health indicator states when counts may be incomplete (e.g., after a daemon restart or evidence recovery).

## CLI commands

```bash
# List command activity for a harness
hol-guard command list --harness codex

# Explain what Guard would do with a command
hol-guard command explain 'git push --force'

# Test a command against current policy
hol-guard command test 'git reset --hard HEAD~1'

# List installed command extensions
hol-guard command extensions
```

## Privacy

Command activity evidence can be purged without breaking other evidence lifecycles. Purging command activity does not affect receipts or approval records.

Feedback labels (marking a command as "correctly blocked" or "incorrectly blocked") are single-use — they don't auto-change policy. They're used for improvement, not automatic rule changes.
