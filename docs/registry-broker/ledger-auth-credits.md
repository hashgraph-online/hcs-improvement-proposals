---
title: Ledger Authentication & Credits
description: Authenticate with the Registry Broker using Hedera ledger credentials, manage auto top-ups, and purchase credits safely.
---

# Ledger Authentication & Credits

Use ledger authentication when you need account-scoped access (registration, credits, dashboards) without issuing long-lived API keys. This guide explains the required environment variables, how `RegistryBrokerClient` performs the challenge/verify dance, and the different ways to fund credits.

## When to Use Ledger Auth

- **Registrations & updates**: the broker charges credits per inscription, so call `authenticateWithLedger` before `registerAgent` / `updateAgent`.
- **Credits & billing**: purchasing credits or enabling `registrationAutoTopUp` and `historyAutoTopUp` requires ledger authority.
- **Dashboard APIs**: account-level stats endpoints (e.g., `/dashboard/stats`) are scoped to the authenticated account.

Use API keys for public discovery-only workloads; use ledger auth when an operation reads or mutates account-owned data.

## Required Environment Variables

| Variable | Description |
| --- | --- |
| `HEDERA_NETWORK` | `mainnet` or `testnet`. Controls which ledger credentials the SDK selects. |
| `HEDERA_ACCOUNT_ID` / `HEDERA_PRIVATE_KEY` | Default ledger credentials. |
| `MAINNET_HEDERA_ACCOUNT_ID` / `MAINNET_HEDERA_PRIVATE_KEY` | Optional overrides when `HEDERA_NETWORK=mainnet`. |
| `TESTNET_HEDERA_ACCOUNT_ID` / `TESTNET_HEDERA_PRIVATE_KEY` | Optional overrides when `HEDERA_NETWORK=testnet`. |

Set the scoped variables when you routinely switch between networks; the SDK automatically picks the correct pair.

## Authenticating with the SDK

```typescript
import { RegistryBrokerClient, createPrivateKeySigner } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl:
    process.env.REGISTRY_BROKER_BASE_URL ?? 'https://registry.hashgraphonline.com/api/v1',
});

const ledgerNetwork = (process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet') as
  | 'mainnet'
  | 'testnet';
const ledgerAccountId =
  process.env[`${ledgerNetwork.toUpperCase()}_HEDERA_ACCOUNT_ID`] ??
  process.env.HEDERA_ACCOUNT_ID;
const ledgerPrivateKey =
  process.env[`${ledgerNetwork.toUpperCase()}_HEDERA_PRIVATE_KEY`] ??
  process.env.HEDERA_PRIVATE_KEY;

if (!ledgerAccountId || !ledgerPrivateKey) {
  throw new Error(`Set ${ledgerNetwork.toUpperCase()}_HEDERA_ACCOUNT_ID and PRIVATE_KEY first`);
}

const signer = createPrivateKeySigner({
  accountId: ledgerAccountId,
  privateKey: ledgerPrivateKey,
  network: ledgerNetwork,
});

await client.authenticateWithLedger({
  accountId: ledgerAccountId,
  network: ledgerNetwork,
  expiresInMinutes: 30,
  signer,
});
```

Any object from `@hashgraph/sdk` that implements the [`Signer`](https://docs.hedera.com/hedera/sdks-and-apis/sdks/signature-provider/signer) interface can act as the signer. When you're starting from a raw Hedera private key, call `createPrivateKeySigner` (exported by the Standards SDK) to wrap it in a compliant signer. The client automatically extracts the public key when it is available.

`authenticateWithLedger` wraps `createLedgerChallenge` + `verifyLedgerChallenge` and stores the issued `x-ledger-api-key` on the client. Subsequent requests automatically include the ledger key.

## Automatic Credit Top-Ups

Enable auto top-ups when you want the SDK to keep registrations and chat history running without manual intervention.

```typescript
const client = new RegistryBrokerClient({
  baseUrl: 'https://registry.hashgraphonline.com/api/v1',
  registrationAutoTopUp: {
    accountId: ledgerAccountId,
    privateKey: ledgerPrivateKey,
    memo: 'registry-broker-auto-topup',
    minCredits: 5, // optional floor before topping up
  },
  historyAutoTopUp: {
    accountId: ledgerAccountId,
    privateKey: ledgerPrivateKey,
    hbarAmount: 0.25,
  },
});
```

- `registrationAutoTopUp` purchases registry credits when `registerAgent` or `updateAgent` reports a shortfall.
- `historyAutoTopUp` funds chat history compaction/storage whenever `historyTtlSeconds` increases beyond the prepaid quota.
- Both helpers reuse the ledger signer you pass and log the transaction memo to help reconcile billing later.

## Manual Credit Purchases (HBAR)

```typescript
const purchase = await client.purchaseCreditsWithHbar({
  accountId: ledgerAccountId,
  privateKey: ledgerPrivateKey,
  hbarAmount: 0.75,
  memo: 'demo-registration',
  metadata: {
    reason: 'erc-8004-registration',
  },
});

console.log(`Purchased credits: ${purchase.purchasedCredits}`);
```

Manual purchases are useful when:

- You are preparing a big batch of registrations and want guaranteed headroom.
- Auto top-up is disabled in production, but you periodically refill via CI or a billing job.
- You need to attach metadata (cost centers, campaign IDs, etc.) for downstream reconciliation.

## Manual Credit Purchases (x402)

Use Coinbase’s x402 payment rail when you want to charge a supported EVM wallet instead of funding an HBAR transaction. Pass a viem wallet client (via `buyCreditsWithX402`) or your own `walletClient`.

```typescript
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const evmPrivateKey = process.env.X402_DEMO_PRIVATE_KEY!;
const account = privateKeyToAccount(evmPrivateKey.startsWith('0x') ? evmPrivateKey : `0x${evmPrivateKey}`);
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.X402_DEMO_RPC_URL ?? 'https://sepolia.base.org'),
});

const purchase = await client.purchaseCreditsWithX402({
  accountId: ledgerAccountId,
  credits: 500,
  description: 'registry-broker-demo',
  metadata: { reason: 'chat-history' },
  walletClient,
});

console.log('x402 payment hash:', purchase.paymentResponse?.transactionHash);
```

Or use the built-in helper when you just need to pass an EVM key:

```typescript
await client.buyCreditsWithX402({
  accountId: ledgerAccountId,
  credits: 500,
  network: 'base-sepolia', // or 'base'
  evmPrivateKey: evmPrivateKey.startsWith('0x') ? evmPrivateKey : `0x${evmPrivateKey}`,
});
```

## Monitoring Credit Usage

- `client.stats()` returns aggregate registry metrics, including total credits consumed across the platform.
- `client.dashboardStats()` and `client.metricsSummary()` return account-specific balances, credit consumption, and adapter-level usage.
- The billing portal at [registry.hashgraphonline.com/billing](https://registry.hashgraphonline.com/billing) displays the same information in a UI after ledger auth.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Registry broker request failed (401) Invalid API key provided` | A stale `x-api-key` header is set alongside the new ledger key. | Remove `REGISTRY_BROKER_API_KEY` from your environment or call `client.setApiKey(undefined)` after ledger auth. |
| `PAYER_ACCOUNT_NOT_FOUND` during `purchaseCreditsWithHbar` | Using mainnet credentials against a testnet broker (or vice versa). | Confirm `HEDERA_NETWORK` and the scoped `MAINNET_`/`TESTNET_` variables point to the same network as the broker. |
| x402 purchase fails with 402 | The wallet client rejected payment or the requested credits are below the minimum. | Call `client.getX402Minimums()` first and ensure your wallet is funded for gas/credits. |
| Credit purchases hang | Ledger challenge never completes (no signer). | Ensure the signer returns `signature`, `signatureKind`, and `publicKey`; double-check the private key format (`PrivateKey.fromString`). |
| Auto top-up didn’t run | Registration consumed cached credits without dipping below the threshold. | Lower `minCredits` or inspect `registration.progress` to confirm whether a shortfall occurred. |

Next: follow the [First Agent Registration](getting-started/first-registration.md) tutorial using ledger auth, then keep credits healthy with the workflows above.
