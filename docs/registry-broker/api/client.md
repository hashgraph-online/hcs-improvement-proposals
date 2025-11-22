---
title: Registry Broker Client
description: Complete API reference for the Registry Broker client in @hashgraphonline/standards-sdk
---

# Registry Broker Client

The `RegistryBrokerClient` in `@hashgraphonline/standards-sdk` provides a typed gateway to the `/registry-broker` API. The client wraps discovery, registration, chat relay, UAID utilities, and analytics with strict Zod validation so application code receives predictable data and meaningful errors.

## Installation

```bash
pnpm add @hashgraphonline/standards-sdk
# npm install @hashgraphonline/standards-sdk
```

## Creating a Client Instance

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_API_URL,
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  registrationAutoTopUp: process.env.HEDERA_ACCOUNT_ID
    ? {
        accountId: process.env.HEDERA_ACCOUNT_ID,
        privateKey: process.env.HEDERA_PRIVATE_KEY,
        memo: 'registry-broker-auto-topup',
      }
    : undefined,
});
```

### Constructor Options

```typescript
interface RegistryBrokerClientOptions {
  baseUrl?: string;
  fetchImplementation?: typeof fetch;
  defaultHeaders?: Record<string, string>;
  apiKey?: string;
  ledgerApiKey?: string;
  registrationAutoTopUp?: {
    accountId: string;
    privateKey: string;
    memo?: string;
  };
  historyAutoTopUp?: {
    accountId: string;
    privateKey: string;
    memo?: string;
    hbarAmount?: number;
  };
}
```

Options without a value fall back to sensible defaults:

- `baseUrl` defaults to `https://hol.org/registry/api/v1`.
- `fetchImplementation` defaults to `globalThis.fetch`.
- `defaultHeaders` are normalised to lowercase.
- Auto top-up settings enable the client to purchase credits automatically when registration or history operations fail with a credit shortfall.

### Runtime Configuration Helpers

```typescript
client.setApiKey(process.env.REGISTRY_BROKER_API_KEY);
client.setLedgerApiKey(process.env.REGISTRY_BROKER_LEDGER_KEY);
client.setDefaultHeader('x-trace-id', crypto.randomUUID());
const headers = client.getDefaultHeaders();
```

## Search and Discovery

### Keyword Search

```typescript
const result = await client.search({
  q: 'customer support',
  limit: 10,
  capabilities: ['messaging'],
  minTrust: 70,
  sortBy: 'trust',
  sortOrder: 'desc',
});

result.hits.forEach(hit => {
  console.log(hit.profile.display_name, hit.uaid);
});
```

Key parameters:

- `q`: Free-text query. Optional; pass nothing to list popular agents.
- `registry` or `registries`: Filter by one or more registries.
- `capabilities`, `protocols`, `adapters`: Array filters.
- `minTrust`, `verified`, `online`: Quality and availability filters.
- `metadata`: Record of arrays to match metadata tags (e.g. `{ tier: ['enterprise'] }`).
- `sortBy` and `sortOrder`: Sort results (`trust`, `latency`, etc.).

| Filter | Syntax | Example values / notes |
| --- | --- | --- |
| Registry | `registries=erc-8004` | Leave empty for broad discovery. Use `erc-8004`, `coinbase-x402-bazaar`, etc. when targeting specific partners. |
| Protocol | `protocols=a2a,erc-8004` | Matches adapter-reported protocol identifiers. |
| Capabilities | `capabilities=messaging,financial-services` | Uses canonical capability labels derived from HCS-11 profiles and adapter metadata. |
| Metadata | `metadata.provider=ledger-labs`, `metadata.payments.supported=x402`, `metadata.paymentRequiredProtocols=x402` | Any `metadata.<key>=value` pair is accepted. Repeat the parameter to OR multiple values. |
| Pricing/auth | `metadata.isFree=true`, `metadata.payments.protocols=x402`, `metadata.payments.protocols.x402.paymentNetwork=base` | Inspect whether an agent is free, which payment protocol it exposes, or which network/token it expects. |
| Quality | `minTrust=80`, `verified=true`, `online=true` | Filter by trust scores and availability. |
| Type | `type=ai-agents`, `type=mcp-servers` | Automatically scopes adapter lists based on agent category. |

The server accepts repeated `metadata.<key>=value` parameters and automatically normalizes protocol names (`erc-8004`, `openrouter`, etc.). Use the [Search & Discovery guide](../search.md) for live curl examples covering ERC-8004 and x402 discovery filters.

#### Filter for ERC-8004 agents

```typescript
const erc8004Agents = await client.search({
  registries: ['erc-8004'],
  limit: 5,
  sortBy: 'most-recent',
});
```

#### Filter for x402-enabled agents

```typescript
const x402Agents = await client.search({
  metadata: {
    'payments.supported': ['x402'],
  },
  limit: 5,
});
```

Both filters mirror the live `/search` examples documented in [Search & Discovery](../search.md#example-erc-8004-agents).

### Vector Search

```typescript
const vector = await client.vectorSearch({
  query: 'tax advisor for small businesses',
  limit: 5,
  filter: {
    protocols: ['a2a'],
    capabilities: ['financial-services'],
  },
});

vector.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score);
});
```

### Namespace Search

```typescript
const namespace = await client.registrySearchByNamespace('hashgraph-online');
```

### Catalog Data

```typescript
const registries = await client.registries();
const additional = await client.getAdditionalRegistries();
const facets = await client.facets('a2a');
const adapters = await client.adapters();
const detailed = await client.adaptersDetailed();
const popular = await client.popularSearches();
```

### UAID Resolution

```typescript
const resolved = await client.resolveUaid('uaid:aid:a2a:hashgraph-online:agent123');
const validation = await client.validateUaid(resolved.agent.uaid);
const status = await client.getUaidConnectionStatus(resolved.agent.uaid);
if (!status.connected) {
  await client.closeUaidConnection(resolved.agent.uaid);
}
```

## Registration Lifecycle

### Quote and Registration

```typescript
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk/services/registry-broker';
import {
  AIAgentCapability,
  AIAgentType,
  HCS11Profile,
  ProfileType,
} from '@hashgraphonline/standards-sdk/hcs-11';

const profile: HCS11Profile = {
  version: '1.0.0',
  type: ProfileType.AI_AGENT,
  display_name: 'Ledger Guard',
  bio: 'Monitoring transactions for anomalies.',
  aiAgent: {
    type: AIAgentType.MANUAL,
    model: 'gpt-4o-mini',
    capabilities: [
      AIAgentCapability.SECURITY_MONITORING,
      AIAgentCapability.COMPLIANCE_ANALYSIS,
    ],
  },
};

const registrationPayload: AgentRegistrationRequest = {
  profile,
  registry: 'hashgraph-online',
  communicationProtocol: 'a2a',
  endpoint: 'https://agent.example.com/a2a',
  additionalRegistries: ['erc-8004:ethereum-sepolia'],
  metadata: {
    provider: 'example-labs',
    trustScore: 92,
  },
};

// Advertise optional x402 pricing
const withX402 = {
  ...registrationPayload,
  metadata: {
    ...registrationPayload.metadata,
    payments: {
      supported: ['x402'],
      protocols: {
        x402: {
          paymentNetwork: 'base',
          paymentToken: 'USDC',
          priceUsdc: 0.05,
          gatewayUrl: 'https://x402.cambrian.network/process',
        },
      },
    },
  },
};

const quote = await client.getRegistrationQuote(registrationPayload);
console.log(quote.requiredCredits, quote.shortfallCredits);

const registration = await client.registerAgent(registrationPayload);
```

### Handling Asynchronous Completion

```typescript
import {
  isPendingRegisterAgentResponse,
  isPartialRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
} from '@hashgraphonline/standards-sdk/services/registry-broker';

let registeredUaid = isSuccessRegisterAgentResponse(registration)
  ? registration.uaid
  : undefined;

if (!registeredUaid && isPendingRegisterAgentResponse(registration) && registration.attemptId) {
  const final = await client.waitForRegistrationCompletion(registration.attemptId, {
    intervalMs: 2000,
    timeoutMs: 5 * 60 * 1000,
    onProgress: progress => {
      console.log(progress.status, progress.additional);
    },
  });

  if (final.status === 'completed') {
    registeredUaid = final.uaid ?? registeredUaid;
  }
}

```

### Updating a Registration

```typescript
if (!registeredUaid) {
  throw new Error('Registration did not yield a UAID');
}

const updatePayload: AgentRegistrationRequest = {
  ...registrationPayload,
  endpoint: 'https://agent.example.com/v2',
  metadata: {
    ...registrationPayload.metadata,
    uptime: 99.95,
  },
};

const updated = await client.updateAgent(registeredUaid, updatePayload);

if (isPendingRegisterAgentResponse(updated) && updated.attemptId) {
  await client.waitForRegistrationCompletion(updated.attemptId, {
    throwOnFailure: false,
    onProgress: progress => console.log(progress.status),
  });
}

if (isPartialRegisterAgentResponse(updated)) {
  console.log(updated.message);
}

if (isSuccessRegisterAgentResponse(updated)) {
  console.log('Update completed');
}
```

### Registration Progress Polling

```typescript
if (registration.attemptId) {
  const progress = await client.getRegistrationProgress(registration.attemptId);
  console.log(progress?.status);
}
```

## Credits and Ledger Authentication

### Manual Credit Purchase (HBAR)

```typescript
const credits = await client.purchaseCreditsWithHbar({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  privateKey: process.env.HEDERA_PRIVATE_KEY,
  hbarAmount: 0.5,
  memo: 'registry-broker-manual-topup',
  metadata: {
    reason: 'registration-priority',
  },
});

console.log(credits.balance, credits.purchasedCredits);
```

### Stripe (Credit Card) Purchases

The normal path for card payments is the hosted [billing portal](https://hol.org/registry/billing). Only use the API flow below if you are embedding purchases inside a custom dashboard or CI job and already have Stripe attestation in place.

When Stripe payments are enabled you can use Stripe PaymentIntents to add credits programmatically. The sequence mirrors the [credit purchase guide](https://github.com/hashgraph-online/standards-sdk/blob/main/registry-broker/docs/credit-purchase.md#stripe-credit-purchases):

1. `GET /api/v1/credits/providers` – confirm that `stripe` is listed and capture the `publishableKey`.
2. `POST /api/v1/credits/payments/intent` – create a PaymentIntent for the desired USD amount (1 credit = $0.01). The response includes `intentId`, computed credits, and the `clientSecret`.
3. Confirm the PaymentIntent client-side via Stripe.js or the Payment Element using the publishable key from step 1.
4. Stripe sends `payment_intent.succeeded` to `/api/v1/credits/webhooks/stripe`; the broker credits the account automatically.

Example intent creation:

```typescript
const intent = await fetch(`${baseUrl}/credits/payments/intent`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-ledger-api-key': ledgerApiKey,
  },
  body: JSON.stringify({
    accountId: '0.0.123456',
    usdAmount: 5.00,
    description: 'Top up via card',
    metadata: { reason: 'demo' },
  }),
}).then(res => res.json());

console.log(intent.intentId, intent.credits, intent.clientSecret);
```

The client secret drives the Stripe confirmation step; credits land once the webhook confirms success.

### x402 (EVM) Purchases

Use the built-in helper when you want to settle credit purchases with WETH/USDC over Base/Mainnet or Base Sepolia. The SDK handles the 402 retry and payment header generation via `x402-axios`.

```typescript
const client = new RegistryBrokerClient({ baseUrl: 'https://hol.org/registry/api/v1' });
await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:mainnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  label: 'x402 top-up',
});

const result = await client.buyCreditsWithX402({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  credits: 25,
  description: 'x402 demo top-up',
  metadata: { reason: 'demo' },
  evmPrivateKey: process.env.ETH_PK!,
  network: 'base', // or 'base-sepolia'
  rpcUrl: 'https://mainnet.base.org', // optional override
});

console.log(result.balance, result.payment?.settlement?.transaction);
```

Notes:
- One credit = $0.01 USD. The broker quotes live ETH/USD and settles in WETH (`0x4200…0006`) on Base or Base Sepolia.
- Keep the payer wallet funded with WETH on the selected Base network.
- Ledger authentication is required so the API can debit and reconcile credits for the correct Hedera account.

### Ledger Authentication Flow

```typescript
import { PrivateKey } from '@hashgraph/sdk';

const challenge = await client.createLedgerChallenge({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  network: 'hedera:testnet',
});

const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY ?? '');
const signature = Buffer.from(
  operatorKey.sign(Buffer.from(challenge.message, 'utf8')),
).toString('base64');

await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  signer: {
    // reuse the custom signing logic when you already have an operator key
    sign: async messages => [
      {
        signature: operatorKey.sign(messages[0]!),
        accountId: operatorKey.publicKey.toString(),
      } as any,
    ],
  },
});
```

The registry automatically uses the ledger API key for privileged operations after verification.

### Ledger Authentication Helper

```typescript
const verification = await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  expiresInMinutes: 10,
  label: 'docs example',
});
console.log(verification.key);
```

`authenticateWithLedgerCredentials` issues the challenge, signs it using the inferred signer (Hedera private key, custom `Signer`, or EVM wallet), verifies the signature, and sets the ledger API key on the client. When you pass an alias (`base`, `base-sepolia`, `mainnet`, …) the response includes both `network` (alias) and `networkCanonical` (e.g., `eip155:84532`, `hedera:mainnet`) so downstream services can migrate without breaking older tooling.

```typescript
// EVM private key example
const evmPrivateKey = process.env.ETH_PK?.startsWith('0x')
  ? process.env.ETH_PK
  : `0x${process.env.ETH_PK}`;
await client.authenticateWithLedgerCredentials({
  accountId: process.env.REGISTRY_BROKER_EVM_ACCOUNT ?? '',
  network: process.env.EVM_LEDGER_NETWORK ?? 'eip155:84532',
  evmPrivateKey,
  expiresInMinutes: 10,
});
```

## Chat and History

```typescript
const session = await client.chat.createSession({
  uaid: 'uaid:aid:a2a:hashgraph-online:agent123',
  historyTtlSeconds: 1800,
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello, what services do you offer?',
});

const history = await client.chat.getHistory(session.sessionId);

await client.chat.compactHistory({
  sessionId: session.sessionId,
  preserveEntries: 4,
});

await client.chat.endSession(session.sessionId);
```

When `historyAutoTopUp` is configured, the client retries `createSession` automatically if chat history retention fails due to insufficient credits.

## Protocol and Adapter Utilities

```typescript
const protocols = await client.listProtocols();
const detection = await client.detectProtocol({
  headers: {
    'content-type': 'application/json',
  },
  body: '{"ping":"pong"}',
});
console.log(detection.protocol);
```

## Observability

```typescript
const stats = await client.stats();
const dashboard = await client.dashboardStats();
const metrics = await client.metricsSummary();

console.log(stats.totalAgents, metrics.search.queriesTotal);
```

## Error Handling

```typescript
import {
  RegistryBrokerError,
  RegistryBrokerParseError,
} from '@hashgraphonline/standards-sdk/services/registry-broker';

try {
  await client.search({ registry: 'unknown' });
} catch (error) {
  if (error instanceof RegistryBrokerError) {
    console.error('Request failed', error.status, error.body);
  } else if (error instanceof RegistryBrokerParseError) {
    console.error('Response parsing failed', error.cause);
  } else {
    throw error;
  }
}
```

`RegistryBrokerError` exposes `status`, `statusText`, and `body`. `RegistryBrokerParseError` wraps Zod validation failures so issues with unexpected payloads are easy to diagnose.

## Exported Types

Useful types live in `@hashgraphonline/standards-sdk/services/registry-broker`:

- `SearchParams`, `SearchResult`, `AgentSearchHit`
- `VectorSearchRequest`, `VectorSearchResponse`
- `AgentRegistrationRequest`, `RegisterAgentResponse`, `RegisterAgentQuoteResponse`
- `RegistrationProgressRecord`, `RegistrationProgressResponse`
- `CreateSessionResponse`, `SendMessageResponse`, `ChatHistorySnapshotResponse`
- `AdaptersResponse`, `AdapterDetailsResponse`
- `RegistryStatsResponse`, `MetricsSummaryResponse`, `DashboardStatsResponse`, `WebsocketStatsResponse`
- `UaidValidationResponse`, `UaidConnectionStatus`

## Next Steps

- Follow the step-by-step tutorials in [Getting Started](../getting-started/quick-start.md).
- Dive into the consolidated [Chat Guide](../chat.md) for discovery, session, and multi-protocol walkthroughs.
