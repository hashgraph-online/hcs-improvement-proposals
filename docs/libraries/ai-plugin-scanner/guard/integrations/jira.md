---
title: Jira integration
sidebar_position: 4
---

# Jira integration

Use this guide when you want Guard investigations to become trackable Jira issues in projects your team already manages.

## What the Jira integration does

Guard creates a Jira issue whenever an investigation is opened that meets your configured risk threshold. The issue includes the artifact, the matched policy, the risk score, and a direct link to the investigation in Guard.

Issues are created with a mapped issue type so they fit into your existing board and workflow. Each issue links back to Guard for full context.

## Prerequisites

- A Guard account with at least one protected harness
- Admin or project lead access to the Jira site where issues should be created
- A Jira project with at least one available issue type

## Connect Jira

### Step 1 — Start the connection

Open [Guard integrations — Jira](https://hol.org/guard/integrations/jira) and select **Connect Jira**.

### Step 2 — Authorize your site

Jira opens an OAuth consent screen. Enter your Atlassian site URL (for example, `yourteam.atlassian.net`) and approve the connection. Guard requests the scopes needed to create issues and list projects.

### Step 3 — Select a project

After authorization, choose which Jira project receives issues. Guard lists the projects your account can access. You can change this later without re-authorizing.

### Step 4 — Map issue types

Select which issue type Guard uses when creating issues. Common choices are **Task**, **Bug**, or a custom type. Guard creates issues with this type so they land in the correct column on your board.

### Step 5 — Configure alert thresholds

Choose which risk levels trigger issue creation. By default, only high-risk investigations create issues. Adjust this to include medium-risk or restrict to critical only.

### Step 6 — Send a test alert

Use **Send test alert** to confirm the connection. A test issue appears in your selected project within a few seconds.

## How issues appear

A Guard-created Jira issue includes:

- a summary describing the artifact and the matched rule
- the artifact name and version that triggered the investigation
- the policy or rule that was matched
- the risk score and contributing factors
- a description with a summary of what changed
- a link to the full investigation in Guard

Issues are created by the Guard integration user. They appear on your board and can be assigned, transitioned, and closed like any other issue.

## Configuration options

| Option | Description |
| :--- | :--- |
| Jira site | Your Atlassian site URL |
| Project | Which project receives issues |
| Issue type | The issue type applied to Guard-created issues |
| Risk threshold | Minimum risk level that triggers issue creation |
| Test alert | Create a sample issue to verify the connection |
| Delivery status | View recent delivery attempts and outcomes |

## Troubleshooting

### Site not accessible

If issues are not being created, your Jira site may have revoked the OAuth connection. Reconnect from [Guard integrations — Jira](https://hol.org/guard/integrations/jira) to re-authorize. If the site URL changed, update it in the integration settings before reconnecting.

### Project not found

If the selected project was deleted or your account lost access, Guard cannot create issues in it. Select a new project from the integration settings page. Available projects appear in the dropdown — deleted or inaccessible ones will not.

### Issue type mismatch

If the mapped issue type was removed from the project or is no longer available in the project's issue type scheme, issue creation fails. Select a valid issue type from the integration settings. Guard lists only issue types available in the selected project.

### Insufficient permissions

Your Jira account needs the **Create Issues** permission in the selected project. If a project admin removed this permission, Guard cannot create issues. Select a different project or ask the project admin to restore the permission.

### Rate limits

Guard respects Jira's API rate limits. If your workspace generates a high volume of investigations, issue creation may be temporarily delayed. Guard queues alerts and retries automatically. If rate limits persist, consider raising the risk threshold so fewer investigations trigger issue creation.

### Issues not appearing

- Confirm the integration is still active in Guard
- Check that the risk threshold includes the investigation's level
- Verify the project is still selected in integration settings
- Confirm the mapped issue type is still valid for the project
- Use **Send test alert** to isolate whether the problem is routing or permissions

## See it in product

- [Guard integrations — Jira](https://hol.org/guard/integrations/jira)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [PagerDuty](./pagerduty.md)
- [Email](./email.md)
- [Webhook](./webhook.md)
