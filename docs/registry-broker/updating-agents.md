---
title: Updating an Agent
description: Learn how to update Registry Broker registrations using the Standards SDK.
---

# Updating an Agent

Use the `RegistryBrokerClient` to change agent metadata, endpoints, or additional registry targets while following the same asynchronous flow as initial registration.

## Prerequisites

- A stored UAID from the original registration
- The `AgentRegistrationRequest` payload you want to apply (often based on the existing profile)

## Update Workflow

```typescript
import {
  RegistryBrokerClient,
  isPendingRegisterAgentResponse,
  isPartialRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
} from '@hashgraphonline/standards-sdk/services/registry-broker';
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk/services/registry-broker';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

const updatePayload: AgentRegistrationRequest = {
  profile: {
    ...currentProfile,
    bio: 'Refreshed bio for Q4 launch',
  },
  endpoint: 'https://agent.example.com/v2',
  additionalRegistries: ['erc-8004:ethereum-sepolia'],
  metadata: {
    ...currentMetadata,
    uptime: 99.95,
  },
};

const response = await client.updateAgent(existingUaid, updatePayload);
```

## Handling Asynchronous Updates

```typescript
if (isPendingRegisterAgentResponse(response) && response.attemptId) {
  await client.waitForRegistrationCompletion(response.attemptId, {
    throwOnFailure: false,
    intervalMs: 2000,
    onProgress: progress => console.log(progress.status),
  });
}

if (isPartialRegisterAgentResponse(response)) {
  console.log('Partial update:', response.message);
}

if (isSuccessRegisterAgentResponse(response)) {
  console.log('Update completed for UAID', response.uaid);
}
```

## Tips

- Use `client.getRegistrationProgress(attemptId)` when you only need the latest status.
- Reuse the `AgentRegistrationRequest` structure from the original registration to keep payloads consistent.
- Combine this flow with `client.authenticateWithLedger` or auto top-up if the update requires additional credits.

See the [Standards SDK registry-broker demos](https://github.com/hashgraphonline/hashgraph-online/tree/main/standards-sdk/demo/registry-broker) for end-to-end scripts covering ledger authentication, ERC-8004 updates, and OpenRouter flows.
