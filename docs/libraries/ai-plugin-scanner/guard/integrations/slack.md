---
title: Slack integration
sidebar_position: 2
---

# Slack integration

Use this guide when you want Guard investigation alerts to appear in a Slack channel so your team can see and discuss them in real time.

## What the Slack integration does

Guard posts a message to a Slack channel whenever an investigation is opened that meets your configured risk threshold. The message includes the artifact, the matched policy, the risk score, and a direct link to the investigation in Guard.

Messages are interactive — team members can acknowledge, view full context, or open the investigation directly from Slack.

## Prerequisites

- A Guard account with at least one protected harness
- Admin or owner access to the Slack workspace where you want alerts posted
- A Slack channel dedicated to or willing to receive Guard alerts

## Connect Slack

### Step 1 — Start the connection

Open [Guard integrations — Slack](https://hol.org/guard/integrations/slack) and select **Connect Slack**.

### Step 2 — Authorize in Slack

Slack opens an OAuth consent screen listing the permissions Guard requests. Review the scopes and approve the installation for your workspace.

### Scopes requested

Guard requests the minimum scopes needed to post alerts:

| Scope | Purpose |
| :--- | :--- |
| `incoming-webhook` | Post messages to a specific channel |
| `channels:read` | List channels so you can pick a destination |
| `chat:write` | Send alert messages to the selected channel |

Guard does not read message history, access direct messages, or modify existing messages beyond its own alerts.

### Step 3 — Select a channel

After authorization, choose which Slack channel receives alerts. You can change this later without re-authorizing.

### Step 4 — Configure alert thresholds

Choose which risk levels trigger a Slack message. By default, only high-risk investigations are sent. You can adjust this to include medium-risk investigations or restrict to critical only.

### Step 5 — Send a test alert

Use **Send test alert** to confirm the connection works. A test message appears in your selected channel within a few seconds.

## How alerts appear

A Guard alert in Slack includes:

- the artifact name and version that triggered the investigation
- the policy or rule that was matched
- the risk score and key contributing factors
- a summary of what changed
- a button linking to the full investigation in Guard

Messages are posted by the Guard app. They appear inline with normal channel traffic.

## Configuration options

| Option | Description |
| :--- | :--- |
| Alert channel | The Slack channel that receives messages |
| Risk threshold | Minimum risk level that triggers an alert |
| Test alert | Send a sample message to verify delivery |
| Delivery status | View recent delivery attempts and outcomes |

## Troubleshooting

### App not installed

If alerts stop arriving, the Slack app may have been removed from the workspace. Reconnect from [Guard integrations — Slack](https://hol.org/guard/integrations/slack) to reinstall and re-authorize.

### Channel not found

If the selected channel was deleted or renamed, Guard cannot post to it. Select a new channel from the integration settings page. Existing channels appear in the dropdown — deleted ones will not.

### Permissions changed

If a Slack admin revoked one of the requested scopes after installation, Guard loses the ability to post. Reconnect to restore the full scope set. The scopes listed above are all required for the integration to function.

### Messages not appearing

- Confirm the integration is still active in Guard
- Check that the risk threshold includes the investigation's level
- Verify the channel still exists and the Guard app is still a member
- Use **Send test alert** to isolate whether the problem is routing or the app itself

### Wrong channel receiving alerts

Open the integration settings and select the correct channel. The change takes effect immediately — the next alert routes to the newly selected channel.

## See it in product

- [Guard integrations — Slack](https://hol.org/guard/integrations/slack)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [GitHub](./github.md)
- [Jira](./jira.md)
- [Email](./email.md)
