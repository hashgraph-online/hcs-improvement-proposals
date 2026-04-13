---
title: Local-first and optional cloud
sidebar_position: 4
---

# Local-first and optional cloud

HOL Guard is designed so the core safety loop works on one machine first. Cloud features layer on later only when shared memory, trust enrichment, or team policy actually helps.

## What works before sign-in

Local Guard features available without sign-in:

- harness discovery
- artifact snapshots
- local diffs
- local policy decisions
- wrapper-mode launch enforcement
- local receipts and explain output
- local policy overrides from home or workspace config

Guard does not meter local safety features. You can detect harnesses, install launchers, diff changes, prompt for approval, and inspect receipts without signing in anywhere.

## What cloud adds later

Optional cloud features include:

- receipt sync to an optional Guard endpoint
- trust enrichment and curated advisories
- revocation feeds
- billing and entitlements
- shared team policy

`hol-guard login` and `hol-guard sync` extend the local runtime. They do not unlock the core safety workflow.

## Recommended rollout order

For one developer machine:

1. `hol-guard bootstrap`
2. `hol-guard install <harness>`
3. `hol-guard run <harness> --dry-run`
4. `hol-guard run <harness>`
5. `hol-guard receipts`

For a team:

1. validate the local workflow first
2. turn on sign-in for receipt sync and advisory feeds
3. add shared team policy only after the local allow or warn decisions feel stable

## When to stay local only

Local-only Guard is enough when you want:

- per-machine protection for developer harnesses
- receipts and diffs without any hosted dependency
- policy overrides that stay tied to one workspace or home config

## When cloud adds clear value

Cloud features start to matter when you need:

- shared history across multiple machines
- central policy defaults for a team
- enriched revocation or advisory data
- billing or entitlement controls for premium Guard surfaces

## Next guides

- [Local-first runtime and approvals](./local-first-and-approvals.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Guard get started](./get-started.md)
