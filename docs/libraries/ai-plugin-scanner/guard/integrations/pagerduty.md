---
title: PagerDuty integration
sidebar_position: 5
---

# PagerDuty integration

Use this guide when you want critical Guard investigations to page an on-call responder through PagerDuty.

## What the PagerDuty integration does

Guard creates a PagerDuty incident whenever a critical investigation is opened. The incident includes the artifact, the matched policy, the risk score, and a direct link to the investigation in Guard.

Incidents are created on a selected service and respect your PagerDuty escalation policy, on-call schedule, and urgency rules. Resolving the incident in PagerDuty does not resolve the investigation in Guard — both sides stay independent until you act on each.

## Prerequisites

- A Guard account with at least one protected harness
- Admin or manager access to the PagerDuty account where incidents should be created
- A PagerDuty service with an escalation policy and on-call schedule configured

## Connect PagerDuty

### Step 1 — Start the connection

Open [Guard integrations — PagerDuty](https://hol.org/guard/integrations/pagerduty) and select **Connect PagerDuty**.

### Step 2 — Authorize the connection

PagerDuty opens an OAuth consent screen. Approve the connection to allow Guard to create incidents on your behalf. Guard requests the minimum access needed to list services and create incidents.

### Step 3 — Select a service

After authorization, choose which PagerDuty service receives incidents. Guard lists the services your account can access. You can change this later without re-authorizing.

### Step 4 — Configure urgency

Choose the urgency level for Guard-created incidents:

| Urgency | When to use |
| :--- | :--- |
| High | Pages immediately — use for critical investigations that need an immediate response |
| Low | Notifies without paging — use when you want visibility without interrupting the on-call responder |

By default, Guard creates high-urgency incidents. Only investigations classified as critical trigger PagerDuty incidents.

### Step 5 — Send a test alert

Use **Send test alert** to confirm the connection. A test incident appears in your selected service within a few seconds.

## How incidents appear

A Guard-created PagerDuty incident includes:

- a title summarizing the artifact and the matched rule
- the artifact name and version that triggered the investigation
- the policy or rule that was matched
- the risk score and contributing factors
- a description with a summary of what changed
- a link to the full investigation in Guard

Incidents are created by the Guard integration. They appear in the selected service's incident list and trigger the configured escalation policy and on-call schedule.

## Configuration options

| Option | Description |
| :--- | :--- |
| Service | Which PagerDuty service receives incidents |
| Urgency | High or low — controls paging behavior |
| Risk threshold | Minimum risk level that triggers an incident (critical by default) |
| Test alert | Create a sample incident to verify the connection |
| Delivery status | View recent delivery attempts and outcomes |

## Troubleshooting

### Service not found

If incidents are not being created, the selected service may have been deleted or your account lost access. Select a new service from the integration settings page. Available services appear in the dropdown — deleted or inaccessible ones will not.

### API token expired

If the OAuth connection has expired or was revoked, Guard cannot create incidents. Reconnect from [Guard integrations — PagerDuty](https://hol.org/guard/integrations/pagerduty) to re-authorize. PagerDuty connections may expire periodically depending on your account settings.

### Incident already resolved

If an investigation updates after the initial incident was resolved in PagerDuty, Guard does not reopen the resolved incident. A new incident is created if the updated investigation still meets the critical threshold. Resolve investigations in Guard separately from PagerDuty incidents.

### Incidents not appearing

- Confirm the integration is still active in Guard
- Check that the investigation's risk level meets the critical threshold
- Verify the service is still selected in integration settings
- Confirm the escalation policy has an active on-call responder
- Use **Send test alert** to isolate whether the problem is routing or permissions

### Wrong responder paged

The on-call responder is determined by your PagerDuty escalation policy, not by Guard. If the wrong person is being paged, review the escalation policy and on-call schedule for the selected service in PagerDuty.

## See it in product

- [Guard integrations — PagerDuty](https://hol.org/guard/integrations/pagerduty)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Email](./email.md)
- [Webhook](./webhook.md)
- [Integrations overview](./index.md)
