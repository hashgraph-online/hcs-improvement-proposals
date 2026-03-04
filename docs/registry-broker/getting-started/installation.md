---
title: Installation & Setup
description: Complete guide to installing and configuring the Registry Broker SDK
---

# Installation & Setup

Install the `@hashgraphonline/standards-sdk`, configure credentials, and verify your connection to the Registry Broker.

## Requirements

- Node.js 20 or later
- pnpm 8+ (npm works, but instructions use pnpm)
- Access to `https://hol.org/registry` over HTTPS
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
REGISTRY_BROKER_API_KEY=your-api-key                     # optional for search-only usage
HEDERA_NETWORK=testnet                                    # optional: mainnet | testnet
HEDERA_ACCOUNT_ID=0.0.1234                                # optional, needed for registrations
HEDERA_PRIVATE_KEY=302e...                                # optional, needed for credits or ledger auth
MAINNET_HEDERA_ACCOUNT_ID=0.0.1001                        # optional scoped creds
MAINNET_HEDERA_PRIVATE_KEY=302e...
TESTNET_HEDERA_ACCOUNT_ID=0.0.2002                        # optional scoped creds
TESTNET_HEDERA_PRIVATE_KEY=302e...
ETH_PK=0xabc123...                                        # optional, used for EVM ledger auth/credits
EVM_LEDGER_NETWORK=base-sepolia                           # or eip155:<chainId>
```

| Variable | Purpose |
| --- | --- |
| `REGISTRY_BROKER_API_KEY` | Authorises paid endpoints such as registration, chat, and UAID utilities. |
| `HEDERA_NETWORK` | Optional network selector for scoped credentials (`mainnet` or `testnet`). |
| `HEDERA_ACCOUNT_ID` / `HEDERA_PRIVATE_KEY` | Default Hedera credentials for ledger auth and purchases. |
| `MAINNET_HEDERA_*` / `TESTNET_HEDERA_*` | Network-scoped overrides automatically selected from `HEDERA_NETWORK`. |
| `ETH_PK` | Required when performing EVM ledger auth or funding credits via x402. |
| `EVM_LEDGER_NETWORK` | Alias (`base`, `abstract`, `polygon-amoy`, …) or canonical `eip155:<chainId>` string. |

Load the variables via `dotenv` or your preferred configuration system.

## Step 3 — Initialise the Client

```typescript
import { config } from 'dotenv';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

config();

const hederaAccountId = process.env.HEDERA_ACCOUNT_ID;
const hederaPrivateKey = process.env.HEDERA_PRIVATE_KEY;
const historyAutoTopUp =
  hederaAccountId && hederaPrivateKey
    ? {
        accountId: hederaAccountId,
        privateKey: hederaPrivateKey,
        hbarAmount: 0.25,
      }
    : undefined;

export const registryBrokerClient = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  historyAutoTopUp,
  defaultHeaders: {
    'x-app-id': 'registry-broker-docs-demo',
  },
});
```

Use `setApiKey` and `setDefaultHeader` at runtime if credentials are refreshed.

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

## Step 5 — Optional: Authenticate with Ledger Credentials

Use the helper method instead of manually calling `createLedgerChallenge` + `verifyLedgerChallenge`.

```typescript
async function setupLedgerAuthentication() {
  if (!process.env.HEDERA_ACCOUNT_ID || !process.env.HEDERA_PRIVATE_KEY) {
    throw new Error('Set HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY first');
  }

  await registryBrokerClient.authenticateWithLedgerCredentials({
    accountId: process.env.HEDERA_ACCOUNT_ID,
    network: 'hedera:testnet',
    hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY,
    expiresInMinutes: 30,
    label: 'installation-guide',
  });
}
```

`authenticateWithLedgerCredentials` performs the challenge/verify flow and stores the issued key on the client automatically. Combined with `historyAutoTopUp`, this gives you the simplest production-ready path for chat history billing. For network-scoped credential patterns and advanced top-up strategies, see [Ledger Authentication & Credits](../ledger-auth-credits.md).

## Common Setup Issues

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| `Registry broker request failed (401)` | Missing or invalid API key. | Set `REGISTRY_BROKER_API_KEY` or regenerate the key in the billing portal. |
| `Registry broker request failed (402)` | Credits depleted (or free tier exhausted / additional registries selected). | Purchase credits via the dashboard or `purchaseCreditsWithHbar`, or configure `historyAutoTopUp` / `registrationAutoTopUp`. |
| `Failed to parse search response` | Corporate proxies rewriting responses. | Use `fetchImplementation` to handle proxy auth or bypass the proxy. |
| `fetch is not defined` | Node.js runtime older than 18. | Upgrade to Node.js 20+ or provide a fetch polyfill (e.g. `undici`). |

## Next Steps

- Complete the [Quick Start Guide](quick-start.md) to perform discovery and chat.
- Follow [First Agent Registration](first-registration.md) for a full registration walkthrough.
- Reference the [Registry Broker Client API](/docs/registry-broker/api/client) for every available method.

For assistance, open an issue on GitHub or join the community on [Hashgraph Online Telegram](https://t.me/hashinals).
