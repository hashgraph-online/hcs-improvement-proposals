---
title: Content Inscription
description: Inscribe content on HCS using registry credits instead of direct HBAR transactions.
---

# Content Inscription

Use the content inscription API to store files and data on the Hedera Consensus Service (HCS) using registry credits. This service handles all the complexity of chunking, topic creation, and transaction submission.

## When to Use Content Inscription

- **File storage**: Store documents, images, JSON data, or any content on HCS.
- **Hashinals**: Create NFT metadata and media inscriptions.
- **Credit-based billing**: Pay with registry credits instead of managing HBAR transactions directly.
- **Simplified workflow**: Get quotes, create jobs, and poll for completion without SDK setup.

## Prerequisites

- Ledger authentication (Hedera or EVM wallet)
- Registry credits in your account

### Getting Credits

You can purchase credits using your preferred wallet:

| Method | Wallet Type | Description |
| --- | --- | --- |
| **HBAR** | Hedera | Direct HBAR transfer to broker treasury |
| **x402** | EVM (Base, Abstract, etc.) | Pay with USDC via Coinbase x402 protocol |

See [Ledger Authentication & Credits](ledger-auth-credits.md) for detailed purchase instructions.

## Authentication

Content inscription requires ledger authentication. You can authenticate using either:

1. **Hedera credentials**: Sign challenges with your Hedera private key
2. **EVM credentials**: Sign challenges with your EVM private key (Base, Abstract, Polygon, etc.)

### Hedera Authentication

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
});

// Authenticate with Hedera credentials
await client.authenticateWithLedgerCredentials({
  accountId: '0.0.123456',
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY,
  expiresInMinutes: 30,
});
```

### EVM Authentication

```typescript
// Authenticate with EVM credentials (e.g., Base Sepolia)
await client.authenticateWithLedgerCredentials({
  accountId: '0x1234...abcd', // Your EVM address
  network: 'eip155:84532',    // Base Sepolia
  evmPrivateKey: process.env.ETH_PK,
  expiresInMinutes: 30,
});

// The returned ledgerApiKey works for content inscription
const ledgerApiKey = client.getLedgerApiKey();
```

After authentication, use the `x-ledger-api-key` header for all inscription requests.

## Purchasing Credits with EVM Wallet

If you're using an EVM wallet and need to purchase credits before inscribing:

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
});

// First authenticate with EVM credentials
await client.authenticateWithLedgerCredentials({
  accountId: evmAddress,
  network: 'eip155:84532',
  evmPrivateKey: process.env.ETH_PK,
});

// Create wallet client for x402 payment
const account = privateKeyToAccount(process.env.ETH_PK as `0x${string}`);
const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http('https://sepolia.base.org'),
});

// Purchase credits with USDC via x402
await client.purchaseCreditsWithX402({
  accountId: evmAddress,
  credits: 100, // Purchase 100 credits
  walletClient,
  network: 'eip155:84532',
});

// Now you can inscribe content using your credits
```

Supported x402 networks include Base, Abstract, Avalanche, Polygon, and their testnets. See [Ledger Auth & Credits](ledger-auth-credits.md#manual-credit-purchases-x402) for the full list.

## Inscription Modes

| Mode | Description |
| --- | --- |
| `file` | Standard file inscription using HCS-5 |
| `upload` | Optimized for larger uploads with progress tracking |
| `hashinal` | Create Hashinal NFT inscriptions |
| `hashinal-collection` | Create Hashinal collection inscriptions |

## API Workflow

### 1. Get Service Configuration

Check if the service is enabled and review limits:

```bash
curl https://hol.org/registry/api/v1/inscribe/content/config
```

```json
{
  "enabled": true,
  "maxSizeBytes": 10485760,
  "allowedMimeTypes": null
}
```

### 2. Get a Quote

Calculate the credit cost before inscribing:

```typescript
const quote = await fetch('https://hol.org/registry/api/v1/inscribe/content/quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-ledger-api-key': ledgerApiKey,
  },
  body: JSON.stringify({
    inputType: 'base64',
    base64: Buffer.from('Hello, HCS!').toString('base64'),
    fileName: 'hello.txt',
    mimeType: 'text/plain',
    mode: 'file',
  }),
});

const { quoteId, credits, totalCostHbar, expiresAt } = await quote.json();
console.log(`Cost: ${credits} credits (~${totalCostHbar} HBAR)`);
```

### 3. Create an Inscription Job

Submit content for inscription:

```typescript
const job = await fetch('https://hol.org/registry/api/v1/inscribe/content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-ledger-api-key': ledgerApiKey,
  },
  body: JSON.stringify({
    inputType: 'base64',
    base64: Buffer.from('Hello, HCS!').toString('base64'),
    fileName: 'hello.txt',
    mimeType: 'text/plain',
    mode: 'file',
    quoteId, // Optional: lock in quoted price
  }),
});

const { jobId, status } = await job.json();
console.log(`Job ${jobId} created with status: ${status}`);
```

### 4. Poll for Completion

Check job status until complete:

```typescript
async function pollJob(jobId: string): Promise<string> {
  while (true) {
    const response = await fetch(
      `https://hol.org/registry/api/v1/inscribe/content/${jobId}`,
      {
        headers: { 'x-ledger-api-key': ledgerApiKey },
      }
    );
    const job = await response.json();

    if (job.status === 'completed') {
      return job.hrl;
    }
    if (job.status === 'failed') {
      throw new Error(job.failureReason);
    }

    await new Promise((r) => setTimeout(r, 2000));
  }
}

const hrl = await pollJob(jobId);
console.log(`Content inscribed at: ${hrl}`);
// Output: hcs://1/0.0.7626857
```

## SDK Helper Functions

The `@hashgraphonline/standards-sdk` provides convenience functions that wrap the API:

```typescript
import {
  inscribeViaRegistryBroker,
  getRegistryBrokerQuote,
} from '@hashgraphonline/standards-sdk';

// Get a quote first
const quote = await getRegistryBrokerQuote(
  { type: 'buffer', buffer: myData, fileName: 'data.json' },
  {
    ledgerApiKey: 'rbk_...',
    mode: 'file',
    baseUrl: 'https://hol.org/registry/api/v1',
  }
);

console.log(`Estimated cost: ${quote.credits} credits`);

// Inscribe content
const result = await inscribeViaRegistryBroker(
  { type: 'buffer', buffer: myData, fileName: 'data.json' },
  {
    ledgerApiKey: 'rbk_...',
    mode: 'file',
    baseUrl: 'https://hol.org/registry/api/v1',
  }
);

console.log(`Inscribed at: ${result.hrl}`);
console.log(`Topic ID: ${result.topicId}`);
console.log(`Credits charged: ${result.creditsCharged}`);
```

### Input Types

The SDK helper supports multiple input types:

```typescript
// From a file path
await inscribeViaRegistryBroker(
  { type: 'file', path: './document.pdf' },
  options
);

// From a buffer
await inscribeViaRegistryBroker(
  { type: 'buffer', buffer: Buffer.from(data), fileName: 'data.bin' },
  options
);

// From a URL
await inscribeViaRegistryBroker(
  { type: 'url', url: 'https://example.com/image.png' },
  options
);
```

## List Your Inscriptions

Retrieve all inscriptions for your account:

```typescript
const response = await fetch(
  'https://hol.org/registry/api/v1/inscribe/content?limit=10',
  {
    headers: { 'x-ledger-api-key': ledgerApiKey },
  }
);

const { inscriptions, total } = await response.json();
for (const inscription of inscriptions) {
  console.log(`${inscription.fileName}: ${inscription.hrl} (${inscription.status})`);
}
```

## Credit Costs

Content inscription costs depend on:

- **Content size**: Larger files require more HCS messages
- **Inscription mode**: Different modes have different overhead
- **Network conditions**: HBAR price affects credit conversion

Use the quote endpoint to get accurate pricing before inscription.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `402 Insufficient credits` | Account balance too low | Purchase credits with HBAR or x402 (EVM wallet) |
| `400 File too large` | Content exceeds `maxSizeBytes` | Check config endpoint for limits; split content if needed |
| `400 Unsupported MIME type` | MIME type not in allowlist | Check config endpoint for allowed types |
| `Quote expired` | Quote ID used after expiration | Request a new quote before creating the job |
| `Job stuck in pending` | Worker processing backlog | Wait and poll; jobs are processed in order |
| `Unsupported EVM network` | Network not in x402 allowlist | Use a supported network (Base, Abstract, Polygon, etc.) |
| x402 purchase fails with 402 | Wallet rejected or below minimum | Ensure wallet is funded; check `client.getX402Minimums()` |

## Related Resources

- [Ledger Authentication & Credits](ledger-auth-credits.md): Authenticate and purchase credits
- [Standards SDK on npm](https://www.npmjs.com/package/@hashgraphonline/standards-sdk): Full SDK documentation
- [HCS-5 File Standard](/docs/libraries/standards-sdk/hcs-5): How files are stored on HCS
