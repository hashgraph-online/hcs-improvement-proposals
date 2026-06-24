---
title: Webhook integration
sidebar_position: 7
---

# Webhook integration

Use this guide when you want Guard investigation alerts delivered to a custom URL for routing to a destination Guard does not support directly.

## What the webhook integration does

Guard sends an HTTP POST request to a URL you provide whenever an investigation is opened that meets your configured risk threshold. The request body is a JSON payload containing the investigation details.

Webhooks are the most flexible integration — you control the receiving endpoint and can transform, forward, or act on the payload however you need.

## Prerequisites

- A Guard account with at least one protected harness
- A publicly reachable HTTPS endpoint capable of receiving POST requests
- Ability to verify HMAC signatures on the receiving side (recommended)

## Connect a webhook

### Step 1 — Start the connection

Open [Guard integrations — Webhook](https://hol.org/guard/integrations/webhook) and select **Add webhook**.

### Step 2 — Enter your endpoint URL

Provide the full HTTPS URL of your receiving endpoint. Guard sends POST requests to this URL. The URL must be publicly reachable and respond with a `2xx` status code to confirm receipt.

### Step 3 — Copy your signing secret

Guard generates a signing secret for each webhook. Copy and store this secret securely — you will use it to verify that incoming requests are genuinely from Guard.

### Step 4 — Configure alert thresholds

Choose which risk levels trigger a webhook delivery. By default, only high-risk investigations are sent. Adjust this to include medium-risk or restrict to critical only.

### Step 5 — Send a test alert

Use **Send test alert** to confirm delivery. Guard sends a sample payload to your endpoint and reports whether the response was `2xx`.

## Payload format

Guard sends a JSON payload with the following structure:

```json
{
  "event": "investigation.opened",
  "timestamp": "2026-06-24T12:00:00Z",
  "investigation": {
    "id": "inv_abc123",
    "url": "https://hol.org/guard/investigations/inv_abc123",
    "risk_level": "high",
    "risk_score": 87,
    "artifact": {
      "name": "example-package",
      "version": "1.2.3"
    },
    "policy": {
      "rule": "changed-after-approval",
      "description": "Artifact changed after it was approved"
    },
    "factors": [
      "approval receipt exists for previous version",
      "content hash differs from approved snapshot"
    ]
  }
}
```

The `event` field identifies what happened. The `investigation` object contains all details needed to take action or forward the alert.

## Signature verification

Every webhook request includes an `X-Guard-Signature` header containing an HMAC-SHA256 signature of the request body, computed using your signing secret.

To verify a request:

1. Read the raw request body
2. Compute `HMAC-SHA256` using your signing secret as the key
3. Compare the result to the value in the `X-Guard-Signature` header
4. Reject the request if the signatures do not match

Verification prevents forged requests from triggering actions on your endpoint. It is strongly recommended for any webhook handling real investigations.

## Retry policy

Guard retries failed deliveries automatically:

| Attempt | Timing |
| :--- | :--- |
| Initial | Immediately on investigation open |
| Retry 1 | 1 minute after failure |
| Retry 2 | 5 minutes after failure |
| Retry 3 | 30 minutes after failure |
| Retry 4 | 2 hours after failure |

A delivery is considered failed when your endpoint returns a non-`2xx` status code, times out, or is unreachable. After all retries are exhausted, the delivery is marked as failed in the delivery status log.

Guard does not retry successful deliveries. If your endpoint returns `2xx`, the payload is not sent again for that investigation.

## Configuration options

| Option | Description |
| :--- | :--- |
| Endpoint URL | The HTTPS URL that receives POST requests |
| Signing secret | Used to verify request authenticity |
| Risk threshold | Minimum risk level that triggers delivery |
| Test alert | Send a sample payload to verify connectivity |
| Delivery status | View recent delivery attempts, response codes, and retry state |

## Troubleshooting

### Timeout

If your endpoint does not respond within 10 seconds, Guard treats the delivery as failed and retries per the schedule. Accept the request quickly and process the payload asynchronously. Guard also treats any non-`2xx` response as a failure — return `2xx` promptly even if background processing is still running.

### Signature mismatch

If your verification logic rejects valid Guard requests, confirm that:

- you are using the correct signing secret for this webhook
- you are computing HMAC-SHA256 over the raw request body (not a parsed or re-serialized version)
- you are comparing the full hex digest, not a truncated value

Regenerate the signing secret from integration settings if the secret was compromised or lost. The new secret applies to the next delivery.

### Payload format unexpected

Guard always sends the JSON structure shown above. If your endpoint receives a different format, another service may be in the path — confirm the endpoint URL points directly to your handler.

### Endpoint unreachable

If your endpoint is behind a firewall, VPN, or internal network, Guard cannot reach it — the URL must be publicly accessible over HTTPS. Use a reverse proxy or API gateway if your handler is not directly exposed.

### Duplicate deliveries

Under rare network conditions Guard may deliver the same payload more than once. Design your endpoint to be idempotent — use the `investigation.id` field to deduplicate so processing the same ID twice causes no side effects.

## See it in product

- [Guard integrations — Webhook](https://hol.org/guard/integrations/webhook)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Integrations overview](./index.md)
- [Slack](./slack.md)
