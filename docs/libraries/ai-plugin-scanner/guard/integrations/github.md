---
title: GitHub integration
sidebar_position: 3
---

# GitHub integration

Use this guide when you want Guard investigations to become trackable GitHub issues in repositories your team already works from.

## What the GitHub integration does

Guard creates a GitHub issue whenever an investigation is opened that meets your configured risk threshold. The issue includes the artifact, the matched policy, the risk score, and a direct link to the investigation in Guard.

Issues are labeled automatically so your team can filter and triage them. Each issue links back to Guard for full context.

## Prerequisites

- A Guard account with at least one protected harness
- Admin or owner access to the GitHub organization or repository where issues should be created
- Permission to install GitHub Apps on the target repositories

## Connect GitHub

### Step 1 — Start the connection

Open [Guard integrations — GitHub](https://hol.org/guard/integrations/github) and select **Connect GitHub**.

### Step 2 — Install the GitHub App

GitHub redirects to the app installation flow. Choose the organization or account where you want Guard to create issues. You can install on all repositories or select specific ones.

### Step 3 — Select repositories

After installation, choose which repositories will receive issues. Guard only creates issues in repositories you explicitly select. You can change the selection later without reinstalling the app.

### Step 4 — Configure alert thresholds

Choose which risk levels trigger issue creation. By default, only high-risk investigations create issues. Adjust this to include medium-risk or restrict to critical only.

### Step 5 — Send a test alert

Use **Send test alert** to confirm the connection. A test issue appears in your selected repository within a few seconds.

## How issues appear

A Guard-created GitHub issue includes:

- a title summarizing the artifact and the matched rule
- the artifact name and version that triggered the investigation
- the policy or rule that was matched
- the risk score and contributing factors
- a summary of what changed
- a label identifying it as a Guard investigation
- a link to the full investigation in Guard

Issues are created by the Guard GitHub App. They appear in the repository's issue list and can be assigned, labeled, and closed like any other issue.

## Configuration options

| Option | Description |
| :--- | :--- |
| Repositories | Which repositories can receive issues |
| Default repository | Where issues are created when multiple are selected |
| Risk threshold | Minimum risk level that triggers issue creation |
| Issue label | Label applied to Guard-created issues |
| Test alert | Create a sample issue to verify the connection |
| Delivery status | View recent delivery attempts and outcomes |

## Troubleshooting

### App not installed on repository

If issues are not being created, the GitHub App may not be installed on the target repository. Open the repository settings in GitHub, navigate to **Settings → Integrations → Applications**, and confirm the Guard app is installed. If not, reinstall from [Guard integrations — GitHub](https://hol.org/guard/integrations/github).

### Insufficient permissions

The Guard app needs the `issues:write` permission to create issues. If a repository admin restricted app permissions, Guard cannot create issues. Reinstall the app on the repository with the required scope, or select a different repository that grants full access.

### Rate limits

Guard respects GitHub's API rate limits. If your workspace generates a high volume of investigations, issue creation may be temporarily delayed. Guard queues alerts and retries automatically. If rate limits persist, consider raising the risk threshold so fewer investigations trigger issue creation.

### Issues not appearing

- Confirm the integration is still active in Guard
- Check that the risk threshold includes the investigation's level
- Verify the repository is still selected in integration settings
- Confirm the GitHub App is still installed on the repository
- Use **Send test alert** to isolate whether the problem is routing or permissions

### Wrong repository receiving issues

Open the integration settings and select the correct default repository. The change takes effect immediately.

## See it in product

- [Guard integrations — GitHub](https://hol.org/guard/integrations/github)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Jira](./jira.md)
- [PagerDuty](./pagerduty.md)
- [Webhook](./webhook.md)
