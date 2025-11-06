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

- `baseUrl` defaults to `https://registry.hashgraphonline.com/api/v1`.
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
  registry: 'hol',
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

### Vector Search

```typescript
const vector = await client.vectorSearch({
  query: 'tax advisor for small businesses',
  limit: 5,
  filter: {
    registry: 'hol',
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
const namespace = await client.registrySearchByNamespace('hol', 'fraud');
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
const resolved = await client.resolveUaid('uaid:aid:a2a:hol:agent123');
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
  registry: 'hol',
  communicationProtocol: 'a2a',
  endpoint: 'https://agent.example.com/a2a',
  additionalRegistries: ['erc-8004:ethereum-sepolia'],
  metadata: {
    provider: 'example-labs',
    trustScore: 92,
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

if (registeredUaid) {
  const updated = await client.updateAgent(registeredUaid, {
    ...registrationPayload,
    metadata: {
      provider: 'example-labs',
      uptime: 99.95,
    },
  });

  if (isPartialRegisterAgentResponse(updated)) {
    console.log(updated.message);
  }

  if (isSuccessRegisterAgentResponse(updated)) {
    console.log(updated.uaid);
  }
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

### Manual Credit Purchase

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

### Ledger Authentication Flow

```typescript
import { PrivateKey } from '@hashgraph/sdk';

const challenge = await client.createLedgerChallenge({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  network: 'testnet',
});

const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY ?? '');
const signature = Buffer.from(
  operatorKey.sign(Buffer.from(challenge.message, 'utf8')),
).toString('base64');

const verification = await client.verifyLedgerChallenge({
  challengeId: challenge.challengeId,
  accountId: process.env.HEDERA_ACCOUNT_ID,
  network: 'testnet',
  signature,
  publicKey: operatorKey.publicKey.toString(),
});

client.setLedgerApiKey(verification.key);
```

The registry automatically uses the ledger API key for privileged operations after verification.

## Chat and History

```typescript
const session = await client.chat.createSession({
  uaid: 'uaid:aid:a2a:hol:agent123',
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
- Explore end-to-end samples in [Examples](../examples/chat-demo.md).
