---
title: Alerts, watchlists, and advisories
---

# Alerts, watchlists, and advisories

Use this guide when you want Guard Cloud to interrupt you only when the risk is worth it.

## What Alerts is for

`/guard/alerts` is where Guard stops being a passive log and becomes an operator surface.

The route is built around three jobs:

- choose a digest posture that keeps the dashboard calm
- define watchlist items that should always break through
- connect shared artifact history to advisory or revocation-aware follow-up

## Watchlists versus general noise

Not every change deserves the same interruption level.

Use a watchlist when:

- one dependency or publisher is especially sensitive
- a risky artifact should always notify the team
- you want Guard to stay quiet everywhere else

Use digest mode when:

- the team mainly needs a daily or periodic review loop
- changed approvals are better handled from the command center than from chatty notifications

## Where advisories and revocations fit

Guard Cloud can layer curated trust data on top of synced receipts.

That matters when:

- something you trusted becomes risky later
- a previously accepted artifact should be reconsidered
- alerting needs more than “a file changed”

## Healthy alert posture

A healthy setup usually looks like:

1. quiet by default
2. one clear digest mode
3. small watchlists for truly high-risk items
4. policy doing most of the repetitive work before alerts fire

## See it in product

- [Guard alerts](https://hol.org/guard/alerts)
- [Guard dashboard](https://hol.org/guard/dashboard)

## Next guides

- [Receipts, changes, and history](./receipts-changes-and-history.md)
- [Team policy and delegated approvals](./team-policy-and-delegated-approvals.md)
- [Billing, credits, and plans](./billing-credits-and-plans.md)
