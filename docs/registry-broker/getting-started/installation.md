---
title: Installation & Setup
description: Complete guide to installing and configuring the Registry Broker SDK
---

# Installation & Setup

Install the `@hashgraphonline/standards-sdk`, configure credentials, and verify your connection to the Registry Broker.

## Requirements

- Node.js 20 or later
- pnpm 8+ (npm works, but instructions use pnpm)
- Access to `https://registry.hashgraphonline.com` over HTTPS
- Registry Broker API key for paid features (search works without it)

## Step 1 — Install Dependencies

```bash
pnpm add @hashgraphonline/standards-sdk
pnpm add -D dotenv typescript @types/node
```

The SDK ships with TypeScript definitions—no additional typings are required.

## Step 2 — Create Environment Configuration

Create `.env` in your project root:

```bash
REGISTRY_BROKER_API_URL=https://registry.hashgraphonline.com/api/v1
REGISTRY_BROKER_API_KEY=your-api-key                     # optional for search-only usage
REGISTRY_BROKER_LEDGER_KEY=                               # populated after ledger verification
HEDERA_ACCOUNT_ID=0.0.1234                                # optional, needed for registrations
HEDERA_PRIVATE_KEY=302e...                                # optional, needed for credits or ledger auth
```

| Variable | Purpose |
| --- | --- |
| `REGISTRY_BROKER_API_URL` | Overrides the base URL (defaults to production). |
| `REGISTRY_BROKER_API_KEY` | Authorises paid endpoints such as registration, chat, and UAID utilities. |
| `REGISTRY_BROKER_LEDGER_KEY` | Populated after completing ledger verification; see [Ledger Authentication & Credits](../ledger-auth-credits.md). |
| `HEDERA_ACCOUNT_ID` / `HEDERA_PRIVATE_KEY` | Required for credit purchases and ledger-backed registrations. |

Load the variables via `dotenv` or your preferred configuration system.

## Step 3 — Initialise the Client

```typescript
import { config } from 'dotenv';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

config();

export const registryBrokerClient = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_API_URL,
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  defaultHeaders: {
    'x-app-id': 'registry-broker-docs-demo',
  },
});
```

Use `setApiKey`, `setLedgerApiKey`, and `setDefaultHeader` at runtime if credentials are refreshed.

## Step 4 — Validate Connectivity

```typescript
async function verifyConnection() {
  const stats = await registryBrokerClient.stats();
  console.log('Agents indexed:', stats.totalAgents);
}

verifyConnection().catch(error => {
  console.error('Registry Broker connectivity failed');
  console.error(error);
  process.exitCode = 1;
});
```

If the call succeeds you can proceed with discovery, chat, and registration tutorials.

## Step 5 — Optional: Prepare Ledger Credentials

Ledger verification upgrades the client with a short-lived ledger API key. Complete this step when you intend to perform credit purchases or ledger-gated registrations.

```typescript
import { PrivateKey } from '@hashgraph/sdk';

async function setupLedgerAuthentication() {
  const challenge = await registryBrokerClient.createLedgerChallenge({
    accountId: process.env.HEDERA_ACCOUNT_ID,
    network: 'testnet',
  });

  const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY ?? '');
  const signature = Buffer.from(
    operatorKey.sign(Buffer.from(challenge.message, 'utf8')),
  ).toString('base64');

  const verification = await registryBrokerClient.verifyLedgerChallenge({
    challengeId: challenge.challengeId,
    accountId: process.env.HEDERA_ACCOUNT_ID,
    network: 'testnet',
    signature,
    publicKey: operatorKey.publicKey.toString(),
  });

  registryBrokerClient.setLedgerApiKey(verification.key);
}
```

Store `verification.key` securely if you need to reuse it across processes.

## Common Setup Issues

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| `Registry broker request failed (401)` | Missing or invalid API key. | Set `REGISTRY_BROKER_API_KEY` or regenerate the key in the billing portal. |
| `Registry broker request failed (402)` | Credits depleted. | Purchase credits via the dashboard or `purchaseCreditsWithHbar`. |
| `Failed to parse search response` | Corporate proxies rewriting responses. | Use `fetchImplementation` to handle proxy auth or bypass the proxy. |
| `fetch is not defined` | Node.js runtime older than 18. | Upgrade to Node.js 20+ or provide a fetch polyfill (e.g. `undici`). |

## Next Steps

- Complete the [Quick Start Guide](quick-start.md) to perform discovery and chat.
- Follow [First Agent Registration](first-registration.md) for a full registration walkthrough.
- Reference the [Registry Broker Client API](../api/client.md) for every available method.

For assistance, open an issue on GitHub or join the community on [Hashgraph Online Telegram](https://t.me/hashinals).
