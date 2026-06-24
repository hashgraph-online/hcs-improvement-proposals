---
title: Terminals
sidebar_position: 7
---

# Terminals

A terminal step ends a workflow. Every path through a routing workflow must reach a terminal. The terminal records the final state of the alert and closes the investigation. Without a terminal, an alert stays open and appears as unresolved in the Guard dashboard.

Configure terminals in the [Guard Routing Studio](https://hol.org/guard/routing).

## What a terminal does

A terminal does three things:

1. assigns a final state to the alert
2. records the outcome and the path taken
3. closes the investigation so it no longer appears as pending

After a terminal runs, the alert is complete. No further steps execute. The audit trail for that alert is sealed.

## Terminal states

Guard recognizes three terminal states.

| State | Meaning |
| :--- | :--- |
| **Resolved** | The alert was handled and requires no further action |
| **Suppressed** | The alert was intentionally not acted on, such as a duplicate |
| **Escalated** | The alert was sent to a human or external system for action |

### Resolved

Use `resolved` when the alert reached an action and was handled, or when it was low enough severity that no action was needed. A resolved alert is closed successfully. It remains in history but no longer demands attention.

### Suppressed

Use `suppressed` when a control or condition determined the alert should not produce a notification or record. The most common case is a duplicate fingerprint that a dedup control caught. A suppressed alert is closed intentionally — it is not a failure, and it is not lost. The audit trail still shows that the alert occurred and why it was suppressed.

### Escalated

Use `escalated` when the alert was sent to a destination that requires a human response — typically a PagerDuty page or a high-severity GitHub issue. An escalated alert is closed from the workflow's perspective, but the underlying investigation is now owned by the responder. The terminal records where it was escalated and when.

## Choosing the right state

The state should reflect what actually happened to the alert, not what the team hopes happened.

- an alert that paged on-call → `escalated`
- an alert that created a triage issue and was then handled → `resolved`
- an alert that was a duplicate and was dropped → `suppressed`
- an alert that was below severity and reached no action → `resolved`

A branch can end in any of the three states. The choice depends on the branch's purpose, not on a single default.

## Multiple terminals per workflow

A workflow usually has more than one terminal. Each branch ends in its own terminal, and each terminal can assign a different state.

A common shape:

- high-severity branch → action pages on-call → terminal `escalated`
- medium-severity branch → action creates an issue → terminal `resolved`
- duplicate branch → no action → terminal `suppressed`
- default branch → no action → terminal `resolved`

This is healthy. A workflow with a single terminal is usually a workflow that has not yet distinguished its branches.

## Terminal state tracking

Every terminal writes a final record that includes:

- the alert fingerprint
- the terminal state assigned
- the path the alert took through the workflow
- the timestamp at which the terminal ran

This record is what the Guard dashboard uses to show whether an alert is open, resolved, suppressed, or escalated. It is also what makes the history view reliable — an alert without a terminal record appears as open because no final state was ever written.

## Audit trail of workflow execution

The terminal is the last entry in the audit trail, but the trail itself spans the whole workflow. For each alert, the trail records:

- the trigger that started the workflow and the raw event
- each enrichment source that ran and the fields it attached
- each condition that evaluated and the branch it selected
- each control that ran and whether it allowed or blocked the alert
- each action that executed and the destination it reached
- the terminal state and timestamp

This trail is visible per alert in the Guard dashboard. It is the answer to the question "why did this alert page me?" or "why did this alert not page me?" — both are answerable from the same record.

The trail is sealed when the terminal runs. No step can modify an alert after its terminal has executed.

## Designing for clean terminals

A few principles keep terminals meaningful:

- every branch ends in a terminal — the studio enforces this, but verify before publishing
- match the state to the branch's intent — do not default everything to `resolved`
- suppressed is a valid outcome — a workflow that never suppresses is probably not deduplicating enough
- escalated means ownership moved — follow up in the destination system, not in the workflow

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Alert shows as open in the dashboard | The branch it took has no terminal; add one |
| Alert shows as suppressed but the team expected a page | The alert took the duplicate branch; check the fingerprint condition and dedup window |
| Alert shows as escalated but no one was paged | The action before the terminal failed; check the action target and field mapping |
| Audit trail is incomplete | An enrichment or control step errored before the terminal; the trail records the error |
| Two terminals ran for one alert | Branches converged incorrectly; each alert should reach exactly one terminal |

Use **Test run** to confirm which terminal a sample alert reaches. The test view highlights the terminal node and shows the state it would assign.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)
- [Guard dashboard](https://hol.org/guard/dashboard)

## Next guides

- [Routing overview](./index.md)
- [Triggers](./triggers.md)
