---
title: Ledger Authentication & Credits
description: Authenticate with the Registry Broker using Hedera ledger credentials, manage auto top-ups, and purchase credits safely.
---

# Ledger Authentication & Credits

Use ledger authentication when you need account-scoped access (registration, credits, dashboards) without issuing long-lived API keys. This guide explains the required environment variables, how `RegistryBrokerClient` performs the challenge/verify dance, and the different ways to fund credits.

> Canonical ledger identifiers follow the CAIP-2 format. Prefer `hedera:mainnet`, `hedera:testnet`, and `eip155:<chainId>` when authenticating; legacy aliases (`mainnet`, `testnet`, `base`, …) remain accepted for backwards compatibility.

## When to Use Ledger Auth

- **Registrations & updates**: the broker charges credits per inscription, so call `authenticateWithLedgerCredentials` before `registerAgent` / `updateAgent`.
- **Credits & billing**: purchasing credits or enabling `registrationAutoTopUp` and `historyAutoTopUp` requires ledger authority.
- **Dashboard APIs**: account-level stats endpoints (e.g., `/dashboard/stats`) are scoped to the authenticated account.

Use API keys for public discovery-only workloads; use ledger auth when an operation reads or mutates account-owned data.

## Required Environment Variables

Set `REGISTRY_BROKER_LEDGER_MODE=hedera` (default) or `REGISTRY_BROKER_LEDGER_MODE=evm` based on which signer you plan to use. You can keep both sets of credentials in `.env` and flip the mode per environment.

### Hedera credentials

| Variable | Description |
| --- | --- |
| `HEDERA_NETWORK` | `mainnet` or `testnet`. Controls which scoped credentials the SDK selects. |
| `HEDERA_ACCOUNT_ID` / `HEDERA_PRIVATE_KEY` | Default ledger credentials used when the scoped variables are missing. |
| `MAINNET_HEDERA_ACCOUNT_ID` / `MAINNET_HEDERA_PRIVATE_KEY` | Optional overrides consumed when `HEDERA_NETWORK=mainnet`. |
| `TESTNET_HEDERA_ACCOUNT_ID` / `TESTNET_HEDERA_PRIVATE_KEY` | Optional overrides consumed when `HEDERA_NETWORK=testnet`. |

### EVM credentials

| Variable | Description |
| --- | --- |
| `ETH_PK` | EVM private key used to sign ledger challenges and x402 transactions. Accepts hex with or without the `0x` prefix. |
| `EVM_LEDGER_NETWORK` | Alias (`base`, `base-sepolia`, `abstract`, etc.) or canonical `eip155:<chainId>` string. Defaults to `base-sepolia`. |
| `CREDITS_ETH_NETWORK`, `CREDITS_ETH_RPC_URL` | Optional overrides used by demo scripts when buying credits through x402. |

When you pass an alias, the broker still records the canonical identifier (`hedera:mainnet`, `eip155:84532`, …). Existing dashboards continue to work with the alias (`ledgerNetwork`) while new clients can inspect `ledgerNetworkCanonical` / `networkCanonical` for the CAIP-2 value.

## Authenticating with the SDK

### Hedera example

```typescript
const client = new RegistryBrokerClient({
  baseUrl:
    process.env.REGISTRY_BROKER_BASE_URL ?? 'https://hol.org/registry/api/v1',
});

const hederaNetwork = (process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet') as
  | 'mainnet'
  | 'testnet';
const ledgerAccountId =
  process.env[`${hederaNetwork.toUpperCase()}_HEDERA_ACCOUNT_ID`] ??
  process.env.HEDERA_ACCOUNT_ID;
const ledgerPrivateKey =
  process.env[`${hederaNetwork.toUpperCase()}_HEDERA_PRIVATE_KEY`] ??
  process.env.HEDERA_PRIVATE_KEY;

if (!ledgerAccountId || !ledgerPrivateKey) {
  throw new Error(`Set ${hederaNetwork.toUpperCase()}_HEDERA_ACCOUNT_ID and PRIVATE_KEY first`);
}

await client.authenticateWithLedgerCredentials({
  accountId: ledgerAccountId,
  network: `hedera:${hederaNetwork}`,
  hederaPrivateKey: ledgerPrivateKey,
  expiresInMinutes: 30,
  label: 'docs example',
});
```

Any object from `@hashgraph/sdk` that implements the [`Signer`](https://docs.hedera.com/hedera/sdks-and-apis/sdks/signature-provider/signer) interface can act as the signer. When you're starting from a raw Hedera private key, you can either pass the `Signer` or let `authenticateWithLedgerCredentials` build one from `hederaPrivateKey`. Passing `hedera:mainnet` / `hedera:testnet` is recommended, but the broker still accepts the legacy `mainnet`/`testnet` strings for backwards compatibility.

### EVM example

```typescript
const rawPrivateKey = process.env.ETH_PK ?? '';
const evmPrivateKey = rawPrivateKey.startsWith('0x')
  ? rawPrivateKey
  : `0x${rawPrivateKey}`;

await client.authenticateWithLedgerCredentials({
  accountId: process.env.EVM_LEDGER_ACCOUNT ?? process.env.EVM_ACCOUNT_ID ?? '',
  network: process.env.EVM_LEDGER_NETWORK ?? 'eip155:84532',
  evmPrivateKey,
  expiresInMinutes: 30,
  label: 'openrouter credits',
});
```

`authenticateWithLedgerCredentials` wraps `createLedgerChallenge` + `verifyLedgerChallenge`, validates the canonical identifier, and stores the issued `x-ledger-api-key` on the client. Subsequent requests automatically include the ledger key, and `networkCanonical` / `ledgerNetworkCanonical` are populated so downstream services can see the exact CAIP-2 identifier regardless of the alias you supplied.

### Supported x402 EVM networks

Coinbase’s `x402@0.7.1` SDK exposes the following EVM networks for credit purchases today:

- **Mainnet rails**: Base, Abstract, Avalanche (C-Chain), IoTeX, Polygon PoS, Sei V2, and peaq.
- **Test rails** (dev/staging builds only): Base Sepolia, Abstract Testnet, Avalanche Fuji, Polygon Amoy, and Sei Testnet.

The SDK rejects any `eip155` identifiers outside this allowlist. When Coinbase adds additional networks (for example Ethereum mainnet), extend `EVM_LEDGER_NETWORK` and the wallet selector will surface them automatically.

## Automatic Credit Top-Ups

Enable auto top-ups when you want the SDK to keep registrations and chat history running without manual intervention.

```typescript
const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
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
- Auto top-up relies on Hedera HBAR payments today; set `REGISTRY_BROKER_LEDGER_MODE=hedera` when you want unattended refills.

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

const rawPrivateKey = process.env.ETH_PK ?? '';
const evmPrivateKey = rawPrivateKey.startsWith('0x')
  ? rawPrivateKey
  : `0x${rawPrivateKey}`;
const account = privateKeyToAccount(evmPrivateKey as `0x${string}`);
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.EVM_RPC_URL ?? 'https://sepolia.base.org'),
});

const purchase = await client.purchaseCreditsWithX402({
  accountId: ledgerAccountId,
  credits: 500,
  description: 'registry-broker-demo',
  metadata: { reason: 'chat-history' },
  walletClient,
  network: 'eip155:84532', // base-sepolia
});

console.log('x402 payment hash:', purchase.paymentResponse?.transactionHash);
```

Or use the built-in helper when you just need to pass an EVM key:

```typescript
await client.buyCreditsWithX402({
  accountId: ledgerAccountId,
  credits: 500,
  network: 'eip155:84532', // base-sepolia
  evmPrivateKey,
});

Want to target only agents that accept x402 before you trigger a payment? Use the [search filter example](../search.md#example-agents-with-x402-payments) to list agents advertising `metadata.payments.supported = ['x402']` and surface their pricing before redirecting users to the wallet checkout.
```

## Monitoring Credit Usage

- `client.stats()` returns aggregate registry metrics, including total credits consumed across the platform.
- `client.dashboardStats()` and `client.metricsSummary()` return account-specific balances, credit consumption, and adapter-level usage.
- The billing portal at [https://hol.org/registry/billing](https://hol.org/registry/billing) displays the same information in a UI after ledger auth.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Registry broker request failed (401) Invalid API key provided` | A stale `x-api-key` header is set alongside the new ledger key. | Remove `REGISTRY_BROKER_API_KEY` from your environment or call `client.setApiKey(undefined)` after ledger auth. |
| `PAYER_ACCOUNT_NOT_FOUND` during `purchaseCreditsWithHbar` | Using mainnet credentials against a testnet broker (or vice versa). | Confirm `HEDERA_NETWORK` and the scoped `MAINNET_`/`TESTNET_` variables point to the same network as the broker. |
| x402 purchase fails with 402 | The wallet client rejected payment or the requested credits are below the minimum. | Call `client.getX402Minimums()` first and ensure your wallet is funded for gas/credits. |
| Credit purchases hang | Ledger challenge never completes (no signer). | Ensure the signer returns `signature`, `signatureKind`, and `publicKey`; double-check the private key format (`PrivateKey.fromString`). |
| Auto top-up didn’t run | Registration consumed cached credits without dipping below the threshold. | Lower `minCredits` or inspect `registration.progress` to confirm whether a shortfall occurred. |
| `Unsupported EVM network` during ledger auth | The broker only enables a subset of EVM networks. | Use one of the documented aliases (`base`, `base-sepolia`, `abstract`, …) or a supported `eip155:<chainId>` value. |

Next: follow the [First Agent Registration](getting-started/first-registration.md) tutorial using ledger auth, then keep credits healthy with the workflows above.
