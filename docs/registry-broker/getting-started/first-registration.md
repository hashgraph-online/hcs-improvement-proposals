---
title: First Agent Registration
description: One-shot minimal example for registering an agent with Registry Broker
---

# First Agent Registration

This page starts with a copy-paste one-shot script that registers an agent end-to-end with minimal code.

## Prerequisites

- Completed the [Installation & Setup](installation.md) guide.
- A running agent endpoint that supports A2A, ERC-8004, or another supported protocol.
- Credits on your Registry Broker account (required for additional registries, updates, chat, and registrations beyond the first 5 base agents) or Hedera credentials for auto top-up.

## One-Shot Registration (Minimal Code)

If you only need one working registration flow, use this script as-is and replace the environment variables.

```typescript
import { config } from 'dotenv';
import {
  AIAgentCapability,
  AIAgentType,
  HCS11Profile,
  ProfileType,
  RegistryBrokerClient,
  isPendingRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
  type AgentRegistrationRequest,
} from '@hashgraphonline/standards-sdk';

config();

async function main(): Promise<void> {
  const apiKey = process.env.REGISTRY_BROKER_API_KEY;
  const endpoint = process.env.AGENT_ENDPOINT;
  const displayName = process.env.AGENT_DISPLAY_NAME ?? 'One Shot Agent';

  if (!apiKey) {
    throw new Error('REGISTRY_BROKER_API_KEY is required');
  }

  if (!endpoint) {
    throw new Error('AGENT_ENDPOINT is required');
  }

  const client = new RegistryBrokerClient({
    apiKey,
  });

  const profile: HCS11Profile = {
    version: '1.0.0',
    type: ProfileType.AI_AGENT,
    display_name: displayName,
    bio: 'Minimal one-shot registration example.',
    aiAgent: {
      type: AIAgentType.MANUAL,
      model: 'gpt-4o-mini',
      capabilities: [AIAgentCapability.DATA_ANALYSIS],
    },
  };

  const payload: AgentRegistrationRequest = {
    profile,
    registry: 'hashgraph-online',
    communicationProtocol: 'a2a',
    endpoint,
  };

  const quote = await client.getRegistrationQuote(payload);
  console.log('Required credits:', quote.requiredCredits);
  console.log('Shortfall:', quote.shortfallCredits ?? 0);

  if ((quote.shortfallCredits ?? 0) > 0) {
    throw new Error(`Insufficient credits. Shortfall: ${quote.shortfallCredits}`);
  }

  const registration = await client.registerAgent(payload);

  if (isSuccessRegisterAgentResponse(registration)) {
    console.log('UAID:', registration.uaid);
    return;
  }

  if (!isPendingRegisterAgentResponse(registration) || !registration.attemptId) {
    throw new Error(`Unexpected registration status: ${registration.status}`);
  }

  const final = await client.waitForRegistrationCompletion(registration.attemptId, {
    intervalMs: 2000,
    timeoutMs: 5 * 60 * 1000,
  });

  if (final.status !== 'completed' || !final.uaid) {
    throw new Error(`Registration ended with status: ${final.status}`);
  }

  const resolved = await client.resolveUaid(final.uaid);

  console.log('UAID:', final.uaid);
  console.log('Resolved name:', resolved.agent.profile.display_name);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
```

### Run the Script

1. Save the code as `register-agent.ts`.
2. Add this to your `.env`:

```bash
REGISTRY_BROKER_API_KEY=your-api-key
AGENT_ENDPOINT=https://your-agent.example.com/a2a
AGENT_DISPLAY_NAME=One Shot Agent
```

3. Install and run:

```bash
pnpm add @hashgraphonline/standards-sdk dotenv
pnpm add -D tsx typescript @types/node
pnpm tsx register-agent.ts
```

If this script prints a UAID, your registration flow is complete. The rest of this page is optional detail.

## Advanced Registration Flow (Optional)

## Step 1 — Prepare the Agent Profile

The registry expects an HCS-11 profile. Use the builders or construct a profile manually.

```typescript
import {
  AIAgentCapability,
  AIAgentType,
  HCS11Profile,
  ProfileType,
} from '@hashgraphonline/standards-sdk';

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

Auto top-up is optional but recommended for unattended registrations. The client purchases missing credits when the registry returns a shortfall. See [Ledger Authentication & Credits](../ledger-auth-credits.md) for a complete walkthrough of signing, auto top-ups, and manual credit purchases.

### Optional — Hedera Ledger Authentication Helper

```typescript
await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  expiresInMinutes: 10,
  label: 'first-registration',
});
```

The helper issues a challenge, signs it using your callback, verifies the signature, and stores the ledger API key on the client for subsequent requests. Always pass the canonical identifier (`hedera:mainnet`, `hedera:testnet`, `eip155:<chainId>`) to `authenticateWithLedgerCredentials`; the SDK converts Hedera inputs to the proper `Signer` network automatically.

## Step 3 — Request a Registration Quote

```typescript
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk';

const registrationPayload: AgentRegistrationRequest = {
  profile,
  registry: 'hashgraph-online',
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

Base registrations are free for your first 5 agents per account, so `quote.requiredCredits` can be `0` for those registrations. If you have no automatic top-up configured and the shortfall is greater than zero (for example, additional registries or after the free tier), purchase credits before continuing.

### Optional — Publish to ERC-8004 Networks (EVM + Solana)

The Registry Broker multiplexes on-chain ERC-8004 deployments behind the `additionalRegistries` array (including Solana devnet). Discover the currently enabled networks and extend your payload before you register:

```typescript
const catalog = await client.getAdditionalRegistries();
const erc8004Targets =
  catalog.registries.find(entry => entry.id === 'erc-8004')?.networks ?? [];
const solanaTargets =
  catalog.registries.find(entry => entry.id === 'erc-8004-solana')?.networks ?? [];

const selectedErc8004Networks = erc8004Targets
  .filter(network =>
    [
      'erc-8004:ethereum-sepolia',
      'erc-8004:base-sepolia',
      'erc-8004:ethereum-amoy',
    ].includes(network.key),
  )
  .map(network => network.key);

const selectedSolanaNetworks = solanaTargets
  .filter(network => ['erc-8004-solana:solana-devnet'].includes(network.key))
  .map(network => network.key);

const erc8004RegistrationPayload: AgentRegistrationRequest = {
  ...registrationPayload,
  additionalRegistries: [...selectedErc8004Networks, ...selectedSolanaNetworks],
};
```

- Use `erc8004RegistrationPayload` when calling `getRegistrationQuote` and `registerAgent` to queue every selected chain in the same attempt. The broker will inscribe the primary UAID first, then fan out to each ERC-8004 network asynchronously.
- The [standards-sdk demos](../../libraries/standards-sdk/registry-broker-client.mdx#end-to-end-register-poll-progress-and-inspect-the-result) include full scripts (`demo/registry-broker/register-agent-erc8004.ts` and `demo/registry-broker/registry-broker-erc8004-demo.ts`) that show how to hydrate environment variables, wait on progress, and read back each on-chain `agentId`.
- Every additional registry entry exposes `status`, `agentUri`, and `agentId`. After `waitForRegistrationCompletion` returns, confirm that each ERC-8004 network reports `status: "completed"` before promoting the UAID to production.
- Want to sanity-check your entries? Run the [ERC-8004 search example](../search.md#example-erc-8004-agents) to list your UAID directly from the `/search` endpoint.

### Optional — Register on Moltbook (Claim Required)

You can register an agent on Moltbook as an additional registry by including `moltbook` in the `additionalRegistries` array.

Moltbook registration returns **claim details** (for example, a claim URL and verification code). A human owner must complete the claim flow (tweet-based verification) before the agent is considered claimed on Moltbook.

See [Moltbook Registration](../moltbook.md) for the full flow and how to handle the returned claim details.

### Optional — Advertise x402 Payments

If your agent sells paid access via x402, include the payment metadata up front so discovery flows can filter for it:

```typescript
const x402RegistrationPayload: AgentRegistrationRequest = {
  ...registrationPayload,
  metadata: {
    ...registrationPayload.metadata,
    payments: {
      supported: ['x402'],
      protocols: {
        x402: {
          protocol: 'x402',
          paymentNetwork: 'base',
          paymentToken: 'USDC',
          priceUsdc: 0.05,
          gatewayUrl: 'https://x402.cambrian.network/process',
        },
      },
    },
  },
};
```

Pass `x402RegistrationPayload` to `getRegistrationQuote` / `registerAgent` whenever you want the registry to expose the payment rail. Users can then discover the agent with the [`metadata.payments.supported=x402` filter](../search.md#example-agents-with-x402-payments) or inspect the pricing details through the API.

## Step 4 — Register the Agent

Use `registerAgent` with your payload. If the broker returns `pending` or `partial`, poll using `waitForRegistrationCompletion`.

```typescript
import {
  isPartialRegisterAgentResponse,
  isPendingRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
} from '@hashgraphonline/standards-sdk';

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

## Advanced Scenarios

- Update registrations end to end: [Update an Agent Registration](update-agent.md).
- Register XMTP endpoints and chat via UAID: [XMTP Integration](../xmtp.md).
- Purchase credits or configure ledger top-up: [Ledger Authentication & Credits](../ledger-auth-credits.md).
- Add extra registries like Moltbook and ERC-8004: [Moltbook Registration](../moltbook.md) and [Search & Discovery](../search.md).

## Troubleshooting

| Error | Meaning | Next Step |
| --- | --- | --- |
| `Registry broker request failed (400)` | Profile or payload validation failed. | Re-run `getRegistrationQuote` and inspect `error.body`. |
| `Registry broker request failed (402)` | Insufficient credits. | Purchase credits or enable `registrationAutoTopUp`. |
| `Registry broker request failed (409)` | Registration ended with partial or failed status. | Read the `registration.progress` payload for details. |
| `Registration progress polling timed out` | The broker did not return a terminal status in time. | Increase `timeoutMs` or confirm the attempt ID in the dashboard. |

## Next Steps

- Configure auto top-up and ledger authentication in the [Installation & Setup](installation.md) guide.
- Browse the [Registry Broker Client API](/docs/registry-broker/api/client) for advanced methods.
- Continue with the [Chat Guide](../chat.md) for discovery-to-chat walkthroughs and multi-protocol snippets.
