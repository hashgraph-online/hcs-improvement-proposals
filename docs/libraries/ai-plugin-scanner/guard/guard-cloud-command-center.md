---
title: Guard Cloud command center
---

# Guard Cloud command center

Use this guide when local Guard is already protecting a harness and you want the signed-in product to feel like one operating system instead of a set of unrelated routes.

## What this part of Guard is for

Guard Cloud takes the local runtime evidence you already trust and turns it into shared memory:

- synced receipts across devices
- changed-after-approval review queues
- watchlists, advisories, and revocation-aware alerts
- shared policy defaults for teams
- delegated approvals for managed workspaces
- billing and plan pressure that explains what cloud value is actually unlocked

## Command center routes

| Route | What it answers |
| :--- | :--- |
| `/guard/dashboard` | What needs attention right now, what Guard already handled, and what to do next |
| `/guard/devices` | Which devices and harnesses are protected, connected, and syncing |
| `/guard/changes` | Which approved artifacts drifted and now need review |
| `/guard/history` | Long-term timeline and drift patterns for artifacts |
| `/guard/alerts` | Which risky changes should interrupt you and which can stay in digest form |
| `/guard/artifacts` | What lives in shared inventory and how artifact trust looks right now |
| `/guard/abom` | The artifact bill of materials view for the broader trust estate |
| `/guard/receipts` | What the latest synced receipts say before you open long-term history |
| `/guard/policy` | Which shared defaults should apply across the team |
| `/guard/exceptions` | Which temporary bypass windows are still active or expiring |
| `/guard/agents` | How delegated approvals and managed workspaces flow through Guard |
| `/guard/billing` | Which plan, credits, and cloud limits are shaping the operator experience |

## Dashboard modes and next actions

The signed-in dashboard is easier to understand if you treat it as a state-aware command center:

1. **Onboarding** — signed in, but no protected runtime has shown up yet
2. **Solo local-only** — Guard is protecting one machine, but trust history still stops there
3. **Solo synced** — receipts are syncing, so the dashboard can highlight changed artifacts instead of setup chores
4. **Team admin** — the shared queue matters more than one laptop, so policy and exceptions move to the center
5. **Workspace operator** — delegated approvals and managed agents become the primary operating surface

Each mode should answer the same questions:

- what changed?
- what needs a decision?
- what has Guard already handled?
- what should I do next?
- which route should I open next?

## How local Guard hands off to cloud Guard

The cleanest rollout is:

1. protect one harness locally
2. record real receipts and diffs
3. turn on sign-in and sync
4. let the dashboard summarize what changed instead of replaying local setup
5. add shared policy only when repeated approvals show a stable operating pattern

That handoff matters because Guard Cloud should explain the local runtime, not replace it.

## See it in product

- [Guard dashboard](https://hol.org/guard/dashboard)
- [Guard devices](https://hol.org/guard/devices)
- [Guard policy](https://hol.org/guard/policy)

## Next guides

- [Devices and shared trust memory](./devices-and-shared-trust.md)
- [Receipts, changes, and history](./receipts-changes-and-history.md)
- [Team policy and delegated approvals](./team-policy-and-delegated-approvals.md)
