---
title: Conditions
sidebar_position: 4
---

# Conditions

A condition step branches the workflow. It takes the enriched alert and routes it down one of several paths based on criteria you define. Conditions are where routing stops being a straight line and starts reflecting how the team actually triages risk.

Configure conditions in the [Guard Routing Studio](https://hol.org/guard/routing).

## What a condition does

A condition evaluates the alert against one or more rules and emits the alert on the matching branch. Every condition produces at least two edges: the matched branch and a default branch.

A typical condition node:

1. reads fields from the enriched alert
2. evaluates each rule in order
3. emits the alert on the first matching branch
4. if no rule matches, emits on the default branch

## Common branching criteria

The most useful criteria map directly to fields enrichment attaches.

| Criterion | Branches on | Example |
| :--- | :--- | :--- |
| **Severity** | The severity level from vulnerability or advisory data | high versus everything else |
| **Trust score** | The Guard trust score for the artifact | below a threshold versus at or above |
| **Ecosystem** | The registry ecosystem of the artifact | npm versus Python versus native |
| **Publisher** | The artifact publisher | known publisher versus unknown |
| **Revocation state** | Whether a revocation is present | revoked versus not |
| **Custom criteria** | Any field on the alert matched by expression | artifact name pattern, license type |

## If/else branching

Every condition is an if/else construct. The configuration panel lets you define ordered rules, each with a label that becomes the branch name.

- rule 1: `severity == high` → branch `high`
- rule 2: `trust_score < 60` → branch `low-trust`
- default → branch `standard`

Rules evaluate top to bottom. The first match wins. Put the most specific rules first and the broadest last, so a high-severity alert does not accidentally match a broader rule above it.

A condition can have as many rules as needed, but two or three is usually enough. If a condition grows beyond that, consider splitting it into two condition nodes.

## Severity branching

Severity is the most common branch. A simple shape:

- `high` → pace with a control, then notify
- `medium` → record and digest
- `low` or unspecified → terminal `resolved`

Guard severity levels are `critical`, `high`, `medium`, `low`, and `info`. Branch on the levels that matter to the team and let everything else fall through to the default.

## Trust score branching

The trust score is a single number that summarizes how much Guard trusts the artifact, factoring in publisher history, provenance, and advisory state.

Common thresholds:

- below 40 — treat as untrusted; route to review or block
- 40 to 70 — treat as provisional; route to digest
- above 70 — treat as trusted; resolve quietly

Pick thresholds that match the team's appetite. There is no universally correct number.

## Fingerprint and dedup logic

A condition can also branch on whether an alert is a duplicate. Guard computes a **fingerprint** for each alert — a stable hash derived from the artifact, the change, and the event type. Alerts with the same fingerprint are considered duplicates.

A fingerprint condition has two branches:

- `new` — no prior alert with this fingerprint exists
- `duplicate` — a prior alert with this fingerprint exists within the lookback window

Use the `duplicate` branch to route repeats into a control that suppresses them, or directly into a terminal that marks them `suppressed`. Use the `new` branch to continue normal triage.

Fingerprinting is what prevents the same drift from notifying the team every time it is detected. It is usually paired with a control that defines the dedup window.

## Combining criteria

Rules can combine more than one criterion with AND logic. A rule might be:

- `severity == high AND revocation == present` → branch `high-revoked`

AND is the default. There is no OR within a single rule — express OR by adding another rule above it that matches the alternative case.

## What conditions do not do

A condition only routes. It does not:

- suppress an alert — that is a control's job
- send a notification — that is an action's job
- resolve an alert — that is a terminal's job

If a condition node seems to need side effects, the workflow is probably missing a control or terminal step on one of its branches.

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Every alert takes the default branch | Rules reference a field enrichment did not attach, or the operator is wrong |
| High-severity alerts take the wrong branch | A broader rule above the severity rule is matching first |
| Duplicates still notify | Fingerprint lookback window is too short, or the fingerprint condition is missing |
| Condition shows no branches | No rules defined; add at least one rule and a label |

Use **Test run** to see which rule matched and which branch the alert took. The test view highlights the matched rule.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)

## Next guides

- [Controls](./controls.md)
- [Actions](./actions.md)
- [Terminals](./terminals.md)
