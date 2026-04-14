---
title: Exceptions and expiring windows
---

# Exceptions and expiring windows

Use this guide when a team needs a temporary Guard bypass without silently turning that bypass into the new normal.

## What the route is for

`/guard/exceptions` keeps three things together:

- pending exception requests
- active exception windows
- which windows are about to expire

That matters because friction reduction only stays safe when the team can still answer who asked, why it exists, and when it ends.

## What belongs in an exception

Exceptions are best for:

- short-lived unblock moments
- time-bound approvals that should not become policy
- cases where the operator already knows this is the unusual path

Exceptions are a poor substitute for:

- missing shared policy defaults
- stable allow decisions that should move into policy
- long-lived process debt no one wants to revisit

## Recommended operator loop

1. review pending requests
2. approve or reject with a clear rationale
3. watch active windows for expiry
4. remove old windows instead of letting them linger
5. promote repeated exceptions into policy if the same request keeps returning

## Relationship to team policy

Exceptions work best when a team policy pack already exists. Otherwise the queue becomes person-to-person friction instead of a controlled operating system.

## See it in product

- [Guard exceptions](https://hol.org/guard/exceptions)
- [Guard policy](https://hol.org/guard/policy)

## Next guides

- [Team policy and delegated approvals](./team-policy-and-delegated-approvals.md)
- [Receipts, changes, and history](./receipts-changes-and-history.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
