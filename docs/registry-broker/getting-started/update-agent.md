---
title: Update an Agent Registration
description: One-shot minimal example for updating an existing agent registration with Registry Broker
---

# Update an Agent Registration

This page gives you a minimal end-to-end `updateAgent` flow using an existing UAID.

## Prerequisites

- Completed the [Installation & Setup](installation.md) guide.
- An existing UAID for the agent you want to update.
- Credits available for update operations.

## One-Shot Update (Minimal Code)

Use this script to update a registered agent profile and wait for completion when the broker responds asynchronously.

```typescript
import { config } from 'dotenv';
import {
  AIAgentCapability,
  AIAgentType,
  HCS11Profile,
  ProfileType,
  RegistryBrokerClient,
  isPartialRegisterAgentResponse,
  isPendingRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
  type AgentRegistrationRequest,
} from '@hashgraphonline/standards-sdk';

config();

async function main(): Promise<void> {
  const apiKey = process.env.REGISTRY_BROKER_API_KEY;
  const uaid = process.env.AGENT_UAID;
  const endpoint = process.env.AGENT_ENDPOINT;

  if (!apiKey) {
    throw new Error('REGISTRY_BROKER_API_KEY is required');
  }
  if (!uaid) {
    throw new Error('AGENT_UAID is required');
  }
  if (!endpoint) {
    throw new Error('AGENT_ENDPOINT is required');
  }

  const client = new RegistryBrokerClient({ apiKey });

  const updatedProfile: HCS11Profile = {
    version: '1.0.0',
    type: ProfileType.AI_AGENT,
    display_name: process.env.AGENT_DISPLAY_NAME ?? 'Updated Agent',
    bio: 'Updated registration example.',
    aiAgent: {
      type: AIAgentType.MANUAL,
      model: 'gpt-4o-mini',
      capabilities: [
        AIAgentCapability.DATA_ANALYSIS,
        AIAgentCapability.COMPLIANCE_ANALYSIS,
      ],
    },
  };

  const updatePayload: AgentRegistrationRequest = {
    profile: updatedProfile,
    registry: 'hashgraph-online',
    communicationProtocol: 'a2a',
    endpoint,
    metadata: {
      provider: 'docs-example',
      trustScore: 90,
      uptime: 99.9,
    },
  };

  const quote = await client.getRegistrationQuote(updatePayload);
  console.log('Required credits:', quote.requiredCredits);
  console.log('Shortfall:', quote.shortfallCredits ?? 0);

  const updated = await client.updateAgent(uaid, updatePayload);
  console.log('Update status:', updated.status);

  if (isSuccessRegisterAgentResponse(updated)) {
    console.log('Updated UAID:', updated.uaid);
    return;
  }

  if (isPendingRegisterAgentResponse(updated) && updated.attemptId) {
    const final = await client.waitForRegistrationCompletion(updated.attemptId, {
      intervalMs: 2000,
      timeoutMs: 5 * 60 * 1000,
    });

    if (final.status === 'completed' && final.uaid) {
      console.log('Updated UAID:', final.uaid);
      return;
    }

    throw new Error(`Update ended with status: ${final.status}`);
  }

  if (isPartialRegisterAgentResponse(updated)) {
    throw new Error(`Update completed with partial status: ${updated.message}`);
  }

  throw new Error(`Unexpected update status: ${updated.status}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
```

### Run the Script

1. Save the code as `update-agent.ts`.
2. Add this to your `.env`:

```bash
REGISTRY_BROKER_API_KEY=your-api-key
AGENT_UAID=uaid:aid:...
AGENT_ENDPOINT=https://your-agent.example.com/a2a
AGENT_DISPLAY_NAME=Updated Agent
```

3. Install and run:

```bash
pnpm add @hashgraphonline/standards-sdk dotenv
pnpm add -D tsx typescript @types/node
pnpm tsx update-agent.ts
```

## What You Can Update

- Profile metadata (`display_name`, `bio`, capabilities, socials).
- Endpoint and protocol fields.
- Additional registries and metadata payload.

For full payload shape and advanced options, see [Registry Broker Client API](/docs/registry-broker/api/client#updateagent).
