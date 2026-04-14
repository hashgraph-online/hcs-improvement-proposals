---
title: Receipts, changes, and history
---

# Receipts, changes, and history

Use this guide when you need the shortest explanation of what belongs in `/guard/receipts`, `/guard/changes`, and `/guard/history`.

## Start with receipts

Receipts are the latest proof objects Guard synced. Open `/guard/receipts` first when you want to know:

- what Guard saw most recently
- which decisions just landed
- whether sync is actually producing evidence

Receipts answer “what happened now?”

## Open changes when something drifted

The Changes route exists for approved artifacts that no longer match the last trusted state.

Open `/guard/changes` when you need to answer:

- what changed after approval
- which artifact now needs another decision
- which item should be reviewed before someone retries it elsewhere

Changes answer “what needs a decision now?”

## Use history for longer-term context

History is where you go after the immediate queue is understood.

Open `/guard/history` when you need:

- a longer timeline for one artifact or trust pattern
- older receipt evidence
- proof that the same drift pattern keeps repeating

History answers “has this happened before?”

## Recommended operator loop

1. check Receipts for the latest evidence
2. open Changes when a current decision is needed
3. move to History only when the short queue needs longer context
4. update policy or alerts after a repeated pattern becomes obvious

## See it in product

- [Guard receipts](https://hol.org/guard/receipts)
- [Guard changes](https://hol.org/guard/changes)
- [Guard history](https://hol.org/guard/history)

## Next guides

- [Inventory, ABOM, and artifact detail](./inventory-abom-and-artifact-detail.md)
- [Alerts, watchlists, and advisories](./alerts-watchlists-and-advisories.md)
- [Exceptions and expiring windows](./exceptions-and-expiring-windows.md)
