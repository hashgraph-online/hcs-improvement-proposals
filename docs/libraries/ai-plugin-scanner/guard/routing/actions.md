---
title: Actions
sidebar_position: 6
---

# Actions

An action step delivers an alert to a destination, or creates and updates a record as a result of the alert. Actions are the last active step before a terminal — once an action runs, the alert moves to resolution.

Configure actions in the [Guard Routing Studio](https://hol.org/guard/routing).

## What an action does

An action takes the enriched, controlled alert and performs a side effect. That side effect is usually one of:

- send a notification to a channel
- create or update a record in a tracking system
- route the alert to a specific provider based on its content

After the action completes, the alert proceeds to a terminal that records the outcome.

## Notification actions

Notification actions send the alert to a communication channel. Each destination is a configured target.

| Action | Destination |
| :--- | :--- |
| **Send to Slack** | A Slack channel message with the alert summary |
| **Create GitHub issue** | A new issue in a linked repository |
| **Page PagerDuty** | An incident or alert routed to an on-call schedule |
| **Send email** | A formatted alert to one or more recipients |

### Send to Slack

Posts a message to a Slack channel. The message includes the artifact, the change, the severity, and a link back to the Guard dashboard. Configure the channel and the message template. Keep templates short — a Slack message that is mostly context is more likely to be read than one that is mostly raw payload.

### Create GitHub issue

Opens an issue in a linked repository. The issue title summarizes the alert and the body carries the enriched detail. Use this action when the team's triage loop lives in the issue tracker. Configure the repository and the label set applied to new issues.

### Page PagerDuty

Routes the alert to a PagerDuty service and on-call schedule. Reserve this action for high-severity branches that have already passed a control. Paging on every alert defeats the purpose of on-call. Configure the service ID and the severity mapping between Guard and PagerDuty.

### Send email

Sends a formatted alert to one or more recipients. Use email for digest-style summaries or for teams that do not live in a chat tool. Configure recipients, subject template, and body template.

## Create and update actions

Some actions do not notify a person. Instead they create or update a record so the alert is tracked somewhere durable.

| Action | What it does |
| :--- | :--- |
| **Create record** | Creates a tracking record from the alert |
| **Update record** | Updates an existing record, for example to attach new enrichment |

Use create actions when the team wants a persistent trail beyond the Guard audit log. Use update actions when a later alert should attach to an earlier record instead of creating a duplicate — pair these with the fingerprint condition so repeats update instead of multiply.

## Configuring action targets

Every action needs a target — the specific destination it sends to or the record it writes. Targets are configured once and reused across workflows.

To configure a target:

1. open the action node configuration panel
2. select an existing target or create a new one
3. map alert fields into the destination's expected format
4. save and use **Test run** to verify the mapping

Field mapping is what turns a Guard alert into a well-formed Slack message or GitHub issue. Map the fields the destination actually needs — artifact name, severity, change summary, and a dashboard link are usually enough. Avoid dumping the entire payload.

## Multi-provider routing

A single alert can route to more than one provider. There are two ways to do this:

- **parallel actions** — place multiple action nodes on the same branch; the alert reaches all of them
- **conditional provider routing** — use a condition to choose the provider based on the alert, then send to one action

Parallel actions are simpler and good when every high-severity alert should both page and post. Conditional provider routing is good when severity or ecosystem should determine the channel — for example, npm alerts go to one channel and native harness alerts go to another.

## Choosing actions per branch

Match the action to the branch's intent:

- high severity → page PagerDuty, and optionally post to Slack
- medium severity → create a GitHub issue for triage
- low severity → send to a digest or email summary
- duplicate or suppressed → no action; go straight to a terminal

An action on every branch is not required. A branch whose only job is to record can skip the action and go directly to a terminal.

## What actions do not do

Actions do not decide whether an alert should be sent — that is a control's job. They do not resolve the alert — that is a terminal's job. If an action seems to need to suppress or resolve, add the appropriate control or terminal after it.

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Slack message is empty or malformed | Field mapping is missing or references a field enrichment did not attach |
| GitHub issue not created | Repository target is misconfigured or the link is missing |
| PagerDuty does not page | Severity mapping is too low, or the service ID is wrong |
| Email not received | Recipient list is empty or the address is wrong |
| Duplicate issues created | No fingerprint condition or update action; every alert creates a new record |

Use **Test run** to see the rendered message or record before it is sent. That view shows exactly what the destination will receive.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)

## Next guides

- [Terminals](./terminals.md)
- [Routing overview](./index.md)
