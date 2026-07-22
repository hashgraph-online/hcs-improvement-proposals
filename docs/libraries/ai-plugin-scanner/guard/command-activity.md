---
title: Command activity tracking
sidebar_position: 6
---

# Command activity tracking

Guard records every command it evaluates — the decision, the reason, and the proof level — as tamper-evident evidence. This evidence is viewable in the dashboard and via CLI inspection commands.

## What gets recorded

Each command evaluation includes:

- **Command** — the evaluated command text
- **Harness** — which AI agent submitted it (Codex, Claude, etc.)
- **Decision** — allowed, blocked, or queued for approval
- **Reason** — the policy rule that triggered the decision
- **Timestamp** — when the command was evaluated

## Dashboard views

### Evidence workbench

The dashboard's evidence views show command activity across harnesses. Filter by harness, status, or risk category.

### Analytics

The evidence insights surface provides:

- **Day-by-day breakdown** — commands evaluated per day
- **Top apps by activity count** — most active harnesses
- **Activity heatmap** — visual command volume over time

A health indicator states when counts may be incomplete (e.g., after a daemon restart or evidence recovery).

## CLI inspection commands

### Test a command against current policy

```bash
hol-guard command test 'git push --force'
```

Shows what Guard would do with the command — allow, block, or queue for approval — without executing it.

### Explain a command's classification

```bash
hol-guard command explain 'grep "rm -rf" README.md'
```

Explains how Guard classifies the command and which rules apply.

### List installed command extensions

```bash
hol-guard command extensions
```

Shows built-in command safety extensions that Guard uses to classify commands.

### Detect command ecosystems

```bash
hol-guard command setup --detect --workspace .
```

Detects command ecosystems in the current workspace and previews recommended protection coverage.

## Compound command pipelines

Guard evaluates compound shell commands (chained with `&&`, `|`, or `;`) by splitting them into segments and evaluating each independently:

- **Pipeline segments** — each segment gets a `pipeline_index` so Guard can track producer-to-consumer data flow
- **PipelineMatcher** — detects when a pipeline sends sensitive data (like secrets) from a producer to a network consumer
- **Per-segment decisions** — safe segments (like `git log`) are allowed; risky segments (like `git push --force`) require approval

If any segment is unresolved (Guard can't statically prove safety), the entire compound command is queued for review.
