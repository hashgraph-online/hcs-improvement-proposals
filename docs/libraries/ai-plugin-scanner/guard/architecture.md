---
title: Guard architecture
sidebar_position: 6
---

# Guard architecture

HOL Guard lives inside `hashgraph-online/ai-plugin-scanner` and uses the scanner's evidence pipeline as the trust core. The product loop starts with local harness installs and launch interception rather than CI.

## Runtime layers

The runtime is split into:

- `guard/adapters` for harness discovery across Codex, Claude Code, Cursor, Gemini, and OpenCode
- `guard/shims` for launcher overlays that route harness launches through Guard
- `guard/consumer` for detection, policy evaluation, and local output
- `guard/policy` for action resolution
- `guard/receipts` for first-use and changed-artifact evidence
- `guard/runtime` for wrapper-mode launch orchestration and optional sync
- `guard/store` for SQLite persistence of snapshots, diffs, receipts, installs, and sync state

## Artifact evaluation order

Guard evaluates local artifacts in this order:

1. discover harness config and managed artifacts
2. normalize each artifact into a stable snapshot
3. compare against the last stored snapshot
4. resolve the effective policy action
5. record a receipt and optional diff
6. launch the harness only if the action is not `block`

## Product loop

The current local loop is:

1. `hol-guard bootstrap` detects supported harnesses
2. `hol-guard install <harness>` creates the local launcher shim
3. `hol-guard run <harness>` evaluates changes before launch
4. `hol-guard receipts` and `hol-guard status` expose local evidence and current state
5. `hol-guard login` and `hol-guard sync` stay optional

## What config mutation is limited to

Wrapper mode is still the core execution strategy in this phase. Config mutation is intentionally limited. Claude Code is the notable exception, where Guard can add and remove its own hook entry in workspace-local settings.

## Why this matters for docs

The architectural split explains why the user-facing docs are also split:

- Guard docs focus on harness installs, approvals, receipts, and local policy
- scanner docs focus on maintainer and CI quality gates
- GitHub Action docs focus on workflow wiring and outputs

## Next guides

- [Local-first runtime and approvals](./local-first-and-approvals.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Harness support matrix](./harness-support.md)
