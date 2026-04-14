---
title: Inventory, ABOM, and artifact detail
---

# Inventory, ABOM, and artifact detail

Use this guide when you want to understand the difference between `/guard/artifacts`, `/guard/inventory`, `/guard/abom`, and an individual artifact detail page.

## The three layers

Guard Cloud keeps these views separate on purpose:

1. **Inventory** — the current shared list of tracked artifacts and their latest known state
2. **ABOM** — the artifact bill of materials view for the broader trust estate
3. **Artifact detail** — one artifact timeline, evidence set, and current decision surface

Keeping those layers separate makes it easier to answer whether something is merely present, recently changed, or worth deeper inspection.

## Which route to open first

| Route | Best first question |
| :--- | :--- |
| `/guard/artifacts` or `/guard/inventory` | What is in shared trust memory right now? |
| `/guard/abom` | What does the broader artifact estate look like at a system level? |
| `/guard/artifacts/<id>` | What happened to this one artifact over time? |

## What belongs in inventory

Inventory is the everyday operator view:

- latest decision
- latest changed state
- known devices and harnesses
- whether something drifted after approval

Open inventory first when the dashboard says something changed and you want the shortest route to context.

## What ABOM is for

ABOM is the estate-level answer. It is useful when you want:

- a wider map of the trust surface
- artifact-level visibility that is less queue-shaped than Changes
- a clearer summary of what Guard is tracking across the organization

## When to open artifact detail

Artifact detail is where you slow down:

- inspect the latest evidence
- compare current and prior receipt state
- understand why Guard now wants another decision
- see the timeline without flattening it into a queue badge

## See it in product

- [Guard inventory](https://hol.org/guard/inventory)
- [Guard artifacts](https://hol.org/guard/artifacts)
- [Guard ABOM](https://hol.org/guard/abom)

## Next guides

- [Receipts, changes, and history](./receipts-changes-and-history.md)
- [Alerts, watchlists, and advisories](./alerts-watchlists-and-advisories.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
