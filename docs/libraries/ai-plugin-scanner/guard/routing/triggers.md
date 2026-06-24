---
title: Triggers
sidebar_position: 2
---

# Triggers

A trigger is the first step of every routing workflow. It is the event that starts the pipeline. Without a trigger, a workflow sits idle. When a matching event occurs, Guard creates an investigation alert and sends it down the connected path.

Configure triggers in the [Guard Routing Studio](https://hol.org/guard/routing).

## What a trigger does

A trigger listens for a specific kind of event and decides whether that event should start a workflow. When the event matches, the trigger:

1. creates an investigation alert
2. attaches the raw event payload
3. passes the alert to the next connected step

Every workflow must have exactly one trigger as its entry node. You cannot start a workflow from any other step type.

## Event types

Guard recognizes four trigger event types. Each one corresponds to a real signal from the Guard runtime.

| Event type | When it fires |
| :--- | :--- |
| **Tool change detected** | A monitored harness artifact changed compared to its last stored snapshot |
| **New tool registered** | A previously unseen tool or managed artifact appeared in a protected harness |
| **Policy violation** | A detected artifact failed evaluation against the effective Guard policy |
| **Advisory published** | Guard Cloud published a new advisory or revocation that affects a tracked artifact |

### Tool change detected

This is the most common trigger. It fires when a diff between the current snapshot and the stored snapshot is non-empty. Use it when the team cares about drift in artifacts they already trust.

### New tool registered

Fires when a harness reports a tool or managed artifact that Guard has not seen before. Use it to catch unreviewed additions before they become trusted by default.

### Policy violation

Fires when policy resolution returns `block` or `review` for a detected artifact. This trigger carries the policy decision and the matched rule, so downstream steps can branch on the specific violation.

### Advisory published

Fires when an advisory or revocation feed publishes a notice that touches a tracked artifact. Use it when trust can change after the fact — for example, a previously accepted artifact becomes risky.

## Configuring trigger criteria

A bare event type matches every occurrence. To narrow the match, add criteria in the trigger configuration panel.

Common criteria fields:

- **ecosystem** — match only events from a specific ecosystem, such as npm, Python, or a native harness
- **harness** — match only events from a named harness
- **publisher** — match only events whose artifact publisher matches a value
- **severity floor** — match only events at or above a severity level
- **artifact pattern** — match only events whose artifact name matches a glob pattern

Criteria combine with AND logic. An event must match every set criterion to start the workflow. Leave a field blank to leave it unconstrained.

## Event matching patterns

For text fields such as artifact name or publisher, Guard supports glob-style patterns:

- `*` matches any sequence of characters
- `?` matches a single character
- a literal string matches exactly

Examples:

- `@hashgraphonline/*` matches every artifact published under that scope
- `*-rc-*` matches release-candidate versions
- `node-fetch` matches only that exact name

Patterns are case-insensitive. Use them to keep triggers broad enough to catch the family of events you care about, without matching the entire stream.

## Choosing the right trigger

A few rules of thumb:

- start with `tool change detected` when the team's main concern is drift
- add `new tool registered` when unreviewed additions are the higher risk
- use `policy violation` when routing should react to the policy decision, not the raw change
- reserve `advisory published` for workflows that handle trust changes after approval

Most teams run more than one workflow, each with a different trigger, instead of one large workflow that tries to handle every event.

## Healthy trigger posture

- one trigger per workflow — do not overload a single workflow with mixed event types
- narrow with criteria before you branch later — it is cheaper to filter at the source
- avoid overlapping triggers across workflows unless the downstream actions are genuinely different

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Workflow never starts | Trigger criteria are too narrow, or the event type does not match what is occurring |
| Workflow starts too often | Criteria are too broad; add an ecosystem or severity floor |
| Two workflows fire for the same event | Overlapping triggers — review criteria and split the concern |
| Advisory trigger is silent | No tracked artifact is affected by the published advisory |

Use the **Test run** button in the studio to send a synthetic event through the trigger and confirm it matches.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)

## Next guides

- [Enrichment](./enrichment.md)
- [Conditions](./conditions.md)
- [Controls](./controls.md)
