---
title: Email integration
sidebar_position: 6
---

# Email integration

Use this guide when you want Guard investigation alerts delivered to owner inboxes without relying on a chat tool or issue tracker.

## What the email integration does

Guard sends an email whenever an investigation is opened that meets your configured risk threshold. The email includes the artifact, the matched policy, the risk score, and a direct link to the investigation in Guard.

Email is the simplest integration to set up — it does not require a third-party workspace, repository, or project. It routes alerts to the inbox of the account owner by default.

## Prerequisites

- A Guard account with at least one protected harness
- A verified email address on your Guard account

## Connect email

### Step 1 — Open the integration

Open [Guard integrations — Email](https://hol.org/guard/integrations/email) and select **Enable email alerts**.

### Step 2 — Verify your address

Guard sends alerts to the email address on your account. If your address is not verified, Guard prompts you to verify it before enabling the integration. Check your inbox for the verification link.

### Step 3 — Choose a delivery mode

Select how you want to receive alerts:

| Mode | Behavior |
| :--- | :--- |
| Immediate | Each investigation triggers a separate email as soon as it is opened |
| Digest | Investigations are collected and sent in a single summary email on a schedule |
| Both | Immediate emails for critical investigations, plus a digest covering all levels |

Immediate mode is best when you need to see every alert in real time. Digest mode is best when you want a periodic review without inbox noise. Both mode gives you the safety of immediate paging for critical issues with the convenience of a digest for everything else.

### Step 4 — Choose a redaction mode

Select how sensitive details appear in email:

| Mode | Behavior |
| :--- | :--- |
| Standard | Includes artifact names, policy names, and risk scores — suitable for internal team inboxes |
| Strict | Redacts artifact identifiers and detailed policy context — suitable when emails may be forwarded or archived broadly |

Standard mode is the default. Use strict mode if alerts may be forwarded outside your team or stored in shared archives where full context is not needed.

### Step 5 — Configure alert thresholds

Choose which risk levels trigger emails. By default, high-risk and critical investigations are sent. Adjust this to include medium-risk or restrict to critical only.

### Step 6 — Send a test alert

Use **Send test alert** to confirm delivery. A test email appears in your inbox within a minute.

## How alerts appear

A Guard email alert includes:

- a subject line summarizing the artifact and risk level
- the artifact name and version that triggered the investigation
- the policy or rule that was matched
- the risk score and contributing factors
- a summary of what changed (subject to redaction mode)
- a button linking to the full investigation in Guard

Digest emails group multiple investigations into a single message with a summary table and individual links.

## Configuration options

| Option | Description |
| :--- | :--- |
| Recipient | The inbox that receives alerts (account owner by default) |
| Delivery mode | Immediate, digest, or both |
| Redaction mode | Standard or strict |
| Risk threshold | Minimum risk level that triggers an email |
| Digest schedule | How often digest emails are sent |
| Test alert | Send a sample email to verify delivery |
| Delivery status | View recent delivery attempts and outcomes |

## Troubleshooting

### Email not received

- Confirm the integration is still active in Guard
- Check that the risk threshold includes the investigation's level
- Verify your email address is confirmed on your account
- Use **Send test alert** to confirm Guard can reach your inbox
- Check spam or junk folders (see below)

### Spam folder

Guard emails may be filtered by spam rules. To prevent this:

- Add the Guard sender address to your contacts
- Create a filter rule that marks Guard emails as important
- Ask your IT team to allowlist the Guard sender domain

If emails were previously marked as spam, future delivery may continue to be filtered until you explicitly allowlist the sender.

### Wrong recipient

Email alerts route to the account owner's verified address. If you need alerts sent to a shared team inbox or a different recipient, update the recipient field in integration settings. The new address must be verified before alerts are delivered there.

### Digest not arriving

- Confirm the delivery mode includes digest or both
- Check that at least one investigation met the threshold since the last digest
- Verify the digest schedule — digests only send when there is content to include

### Redaction too aggressive

If strict redaction mode is hiding context you need, switch to standard mode in integration settings. The change applies to the next alert — previously sent emails are not affected.

## See it in product

- [Guard integrations — Email](https://hol.org/guard/integrations/email)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Webhook](./webhook.md)
- [Slack](./slack.md)
- [Integrations overview](./index.md)
