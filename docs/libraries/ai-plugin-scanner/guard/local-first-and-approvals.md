---
title: Local-first runtime and approvals
sidebar_position: 3
---

# Local-first runtime and approvals

HOL Guard is designed so the core safety loop works on one machine first, then grows into shared history and team policy only when that adds real value.

## What works locally before sign-in

Local Guard features available without sign-in:

- harness discovery
- artifact snapshots
- local diffs
- local policy decisions
- wrapper-mode launch enforcement
- local receipts and explain output
- local policy overrides from home or workspace config

Guard does not meter local safety features. You can detect harnesses, install launchers, diff changes, prompt for approval, and inspect receipts without signing in.

## What cloud features add later

Optional cloud features:

- receipt sync to an optional Guard endpoint
- trust enrichment and advisories
- revocation feeds
- billing and entitlements
- shared team policy

The local runtime does not require a hosted service. `hol-guard login` and `hol-guard sync` layer on shared memory later. They do not unlock the core safety workflow.

## How the runtime is structured

Guard lives inside `ai-plugin-scanner` and uses the existing scan engine as the evidence and trust core.

Runtime layers:

- `guard/adapters` for harness discovery
- `guard/shims` for launcher overlays
- `guard/consumer` for detection, policy evaluation, and local output
- `guard/policy` for action resolution
- `guard/receipts` for first-use and changed-artifact evidence
- `guard/runtime` for wrapper-mode launch orchestration and optional sync
- `guard/store` for SQLite persistence of snapshots, diffs, receipts, installs, and sync state

Guard evaluates local artifacts in this order:

1. discover harness config and managed artifacts
2. normalize each artifact into a stable snapshot
3. compare against the last stored snapshot
4. resolve the effective policy action
5. record a receipt and optional diff
6. launch the harness only if the action is not `block`

## What the approval center handles today

The current approval surface is scanner-owned and local:

- `hol-guard run <harness>` evaluates detected artifacts against saved Guard policy before launch
- interactive terminals can approve or block directly from the inline Guard prompt
- non-interactive blocked runs queue approval requests in the local Guard daemon instead of failing abruptly
- the daemon persists pending approvals in SQLite and exposes request detail, receipt detail, diff lookup, and policy upsert endpoints
- the local approval center serves a browser page on localhost with pending requests, per-request detail, changed fields, receipt evidence, and allow or block forms

## Current fallback-only behavior

These surfaces still rely on the approval center rather than a richer in-client product surface:

- Codex uses the approval center instead of a deeper App Server approval model
- Gemini routes blocked changes to the approval center rather than a native approval UX
- terminal approval remains the only native path when Guard is launched from a plain interactive shell

## Practical recommendation

The current everyday loop is:

1. install Guard locally
2. run through Guard
3. approve inline when possible
4. otherwise resolve from the local approval center
5. review receipts and diffs only when something changes

## Next guides

- [Guard get started](./get-started.md)
- [Harness support matrix](./harness-support.md)
- [Policies, output, and trust provenance](../plugin-scanner/policies-and-output.md)
