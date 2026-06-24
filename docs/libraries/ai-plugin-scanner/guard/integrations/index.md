---
title: Integrations overview
sidebar_position: 1
---

# Integrations overview

Use this guide when you want Guard investigation alerts to reach the right destination automatically instead of requiring a dashboard check.

## What integrations are for

Guard routes investigation alerts to external destinations so your team can respond without watching the dashboard. When Guard scores an artifact, flags a change, or opens an investigation, an integration makes sure that signal lands where your team already works.

Each integration connects to a single provider and can be configured independently. You can enable one, several, or all of them. They operate in parallel — an alert that meets the threshold reaches every active integration.

## Available integrations

| Integration | What it does |
| :--- | :--- |
| [Slack](./slack.md) | Posts investigation alerts to selected Slack channels with context and direct links |
| [GitHub](./github.md) | Creates GitHub issues on selected repositories for investigations that need tracking |
| [Jira](./jira.md) | Creates Jira issues in selected projects with mapped issue types |
| [PagerDuty](./pagerduty.md) | Opens PagerDuty incidents for critical investigations that need paging |
| [Email](./email.md) | Delivers alerts to owner inboxes in immediate or digest mode |
| [Webhook](./webhook.md) | Sends signed JSON payloads to a URL you control for custom routing |

## How routing works

Guard evaluates artifacts and changes using your configured policies. When an investigation is opened, Guard checks which integrations are active and delivers the alert to each one.

The alert payload includes:

- the artifact that triggered the investigation
- the policy or rule that was matched
- the risk score and contributing factors
- a direct link to the investigation in Guard

Each integration formats this payload for its destination. Slack shows a rich message with buttons. GitHub and Jira open structured issues. PagerDuty creates an incident. Email renders an HTML summary. Webhooks deliver a raw JSON body you can process programmatically.

## Choosing integrations

Pick destinations that match how your team already operates:

- **Slack** for real-time visibility in a team channel
- **GitHub** when investigations should become trackable issues alongside code
- **Jira** when your team manages work in Jira projects
- **PagerDuty** when critical investigations need to page someone on call
- **Email** for lightweight notification without a chat tool
- **Webhook** when you need custom routing or a destination Guard does not support directly

## Managing integrations

Each integration has its own settings page at `hol.org/guard/integrations/{provider}`. From there you can connect, configure, test, and disconnect.

Common actions available on every integration:

- connect and authorize
- select which investigations trigger alerts (by risk level)
- send a test alert to verify the connection
- view recent delivery status
- disconnect and revoke access

## Prerequisites

Before setting up integrations:

1. You have a Guard account and at least one protected harness reporting receipts
2. You have access to the target provider (admin or owner permissions for the workspace, repo, project, or service)
3. Your Guard plan supports the integration you want to enable

## See it in product

- [Guard integrations](https://hol.org/guard/integrations)
- [Guard dashboard](https://hol.org/guard/dashboard)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Slack](./slack.md)
- [GitHub](./github.md)
- [Jira](./jira.md)
- [PagerDuty](./pagerduty.md)
- [Email](./email.md)
- [Webhook](./webhook.md)
