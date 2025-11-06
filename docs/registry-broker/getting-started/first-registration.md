---
title: First Agent Registration
description: Learn how to register your first agent with the Registry Broker
---

# First Agent Registration

Publish your first agent to the Hashgraph Online Registry Broker. This tutorial covers profile preparation, credit management, registration, updates, and validation.

## Prerequisites

- Completed the [Installation & Setup](installation.md) guide.
- A running agent endpoint that supports A2A, ERC-8004, or another supported protocol.
- Credits on your Registry Broker account (or Hedera credentials for auto top-up).

## Step 1 — Prepare the Agent Profile

The registry expects an HCS-11 profile. Use the builders or construct a profile manually.

```typescript
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
  bio: 'Automated treasury monitoring assistant.',
  aiAgent: {
    type: AIAgentType.MANUAL,
    model: 'gpt-4o-mini',
    capabilities: [
      AIAgentCapability.SECURITY_MONITORING,
      AIAgentCapability.COMPLIANCE_ANALYSIS,
    ],
  },
  socials: [
    { platform: 'github', handle: 'ledger-labs' },
  ],
};
```

## Step 2 — Configure the Client

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
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

Auto top-up is optional but recommended for unattended registrations. The client purchases missing credits when the registry returns a shortfall.

## Step 3 — Request a Registration Quote

```typescript
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk/services/registry-broker';

const registrationPayload: AgentRegistrationRequest = {
  profile,
  registry: 'hol',
  communicationProtocol: 'a2a',
  endpoint: 'https://ledger-guard.example.com/a2a',
  additionalRegistries: ['erc-8004:ethereum-sepolia'],
  metadata: {
    provider: 'ledger-labs',
    trustScore: 90,
    uptime: 99.9,
  },
};

const quote = await client.getRegistrationQuote(registrationPayload);
console.log('Credits required:', quote.requiredCredits);
console.log('Credits shortfall:', quote.shortfallCredits ?? 0);
```

If you have no automatic top-up configured and the shortfall is greater than zero, purchase credits before continuing.

## Step 4 — Register the Agent

```typescript
import {
  isPartialRegisterAgentResponse,
  isPendingRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
} from '@hashgraphonline/standards-sdk/services/registry-broker';

const registration = await client.registerAgent(registrationPayload);
console.log('Status:', registration.status);
```

The response may be immediate (`success`) or asynchronous (`pending` or `partial`). Capture the attempt ID for tracking.

```typescript
let registeredUaid = isSuccessRegisterAgentResponse(registration)
  ? registration.uaid
  : undefined;

if (!registeredUaid && registration.attemptId) {
  const final = await client.waitForRegistrationCompletion(registration.attemptId, {
    intervalMs: 2000,
    timeoutMs: 5 * 60 * 1000,
    onProgress: progress => {
      console.log(progress.status, progress.additional);
    },
  });

  if (final.status === 'completed') {
    registeredUaid = final.uaid ?? registeredUaid;
  } else {
    throw new Error(`Registration ended with status ${final.status}`);
  }
}

if (!registeredUaid) {
  throw new Error('Registration did not produce a UAID');
}

console.log('UAID:', registeredUaid);
```

## Step 5 — Update the Registration

Use `updateAgent` to change metadata, endpoints, or additional registries.

```typescript
const updated = await client.updateAgent(registeredUaid, {
  ...registrationPayload,
  metadata: {
    ...registrationPayload.metadata,
    uptime: 99.95,
  },
});

console.log('Update status:', updated.status);

if (isPendingRegisterAgentResponse(updated) && updated.attemptId) {
  await client.waitForRegistrationCompletion(updated.attemptId, {
    throwOnFailure: false,
  });
}

if (isPartialRegisterAgentResponse(updated)) {
  console.log('Partial update message:', updated.message);
}

if (isSuccessRegisterAgentResponse(updated)) {
  console.log('Updated UAID:', updated.uaid);
}
```

`updateAgent` shares the same asynchronous behaviour as `registerAgent`. Reuse `waitForRegistrationCompletion` if `updated.attemptId` is present and handle partial results with the helper guards.

## Step 6 — Verify the Agent

### Resolve the UAID

```typescript
const resolved = await client.resolveUaid(registeredUaid);
console.log(resolved.agent.profile.display_name);
```

### Confirm Search Visibility

```typescript
const searchResults = await client.search({
  q: 'ledger guard',
  registry: 'hol',
  limit: 5,
});

const match = searchResults.hits.find(hit => hit.uaid === registeredUaid);
if (!match) {
  console.log('Search index may take a few minutes to refresh.');
}
```

## Step 7 — Test Chat Relay

```typescript
const session = await client.chat.createSession({
  uaid: registeredUaid,
  historyTtlSeconds: 900,
});

const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello! Confirm you can reach the Ledger Guard endpoint.',
});

console.log(response.content);

await client.chat.endSession(session.sessionId);
```

## Step 8 — Manage Credits

Purchase credits programmatically when needed.

```typescript
const purchase = await client.purchaseCreditsWithHbar({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  privateKey: process.env.HEDERA_PRIVATE_KEY,
  hbarAmount: 0.5,
  memo: 'ledger-guard-registration',
  metadata: {
    reason: 'initial-registration',
  },
});

console.log('Credits purchased:', purchase.purchasedCredits);
```

## Troubleshooting

| Error | Meaning | Next Step |
| --- | --- | --- |
| `Registry broker request failed (400)` | Profile or payload validation failed. | Re-run `getRegistrationQuote` and inspect `error.body`. |
| `Registry broker request failed (402)` | Insufficient credits. | Purchase credits or enable `registrationAutoTopUp`. |
| `Registry broker request failed (409)` | Registration ended with partial or failed status. | Read the `registration.progress` payload for details. |
| `Registration progress polling timed out` | The broker did not return a terminal status in time. | Increase `timeoutMs` or confirm the attempt ID in the dashboard. |

## Next Steps

- Configure auto top-up and ledger authentication in the [Installation & Setup](installation.md) guide.
- Browse the [Registry Broker Client API](../api/client.md) for advanced methods.
- Explore [examples](../examples/chat-demo.md) for more complete scripts.
