---
title: Team policy and delegated approvals
---

# Team policy and delegated approvals

Use this guide when Guard is no longer just a personal safety layer and needs one shared operating model for a team or managed workspace.

## What a team policy pack controls

`/guard/policy` is where Guard becomes less repetitive for operators.

A shared team policy pack can hold:

- per-harness defaults such as watch, ask, or protect
- allowed publishers
- blocked publishers
- blocked domains
- blocked artifacts
- alert channel defaults

The point is not more settings. The point is one reusable source of truth.

## Why delegated approvals matter

`/guard/agents` is the route where managed work stops depending on whichever human happened to be at one machine.

Delegated approvals matter when:

- workspaces need a shared approval queue
- agents should not bypass Guard policy
- one operator needs to review work started somewhere else

## Recommended rollout order

1. validate local Guard decisions first
2. sync receipts so the team can see the same evidence
3. define the shared policy pack
4. move repeated review work into delegated approvals
5. keep exceptions time-bound instead of turning them into policy

## What good looks like

A healthy team Guard setup usually has:

- one shared default policy
- a clear owner path for delegated approvals
- very few long-lived exceptions
- alerts that follow policy, not personal inbox habits

## See it in product

- [Guard policy](https://hol.org/guard/policy)
- [Guard agents](https://hol.org/guard/agents)

## Next guides

- [Exceptions and expiring windows](./exceptions-and-expiring-windows.md)
- [Alerts, watchlists, and advisories](./alerts-watchlists-and-advisories.md)
- [Guard Cloud command center](./guard-cloud-command-center.md)
