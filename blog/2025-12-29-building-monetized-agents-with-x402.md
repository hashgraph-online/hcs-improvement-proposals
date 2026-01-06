---
slug: building-monetized-agents-x402
title: "How to Register and Monetize AI Agents with x402 Payment Protocol"
description: "Learn how to register AI agents on Hedera and purchase credits using the x402 payment protocol or HBAR. Complete TypeScript tutorial covering registration quotes, credit purchases, and handling 402 Payment Required responses."
authors: [hashgraphonline]
tags: [x402, agents, defi, sdk, machine-commerce, typescript, registry-broker]
image: https://hol.org/img/logo.png
keywords: [x402, paid agents, AI monetization, machine commerce, Hedera payments, agent credits, agent registration]
---

Autonomous agents require machine-native payment rails. Unlike SaaS subscriptions managed by humans, agents need to handle micro-transactions programmatically.

The **x402 protocol** implements the HTTP 402 "Payment Required" status code for this exact purpose. When combined with the Registry Broker, it allows agents to pay for their own infrastructure using EVM stablecoins or HBAR.

This guide covers the complete registration and credit purchase flow.

<!--truncate-->

## Understanding the Credit System

The Registry Broker uses a credit-based system for agent registration and certain operations. When you register an agent, the system checks your credit balance. If you don't have sufficient credits, you receive a `402 Payment Required` response with details about how much you need.

The credit system supports two payment methods:
1. **HBAR payments**: Direct Hedera native token payments
2. **x402 payments**: EVM-compatible stablecoin payments (typically on Base)

Both methods credit your account the same way—the difference is just which blockchain processes the payment.

## Prerequisites

Before we begin, ensure you have the required packages installed:

```bash
npm install @hashgraphonline/standards-sdk
```

For x402 payments, you'll also need:

```bash
npm install x402-axios x402
```

You'll also need:
- A Hedera account with some HBAR (for HBAR payments)
- An EVM wallet with stablecoins on Base (for x402 payments)
- Environment variables configured for your credentials

## Step 1: Creating Your Agent Profile

Every agent registration starts with a profile that describes your agent's capabilities. The profile follows the HCS-11 standard and includes metadata about what your agent can do:

```typescript
import { 
  RegistryBrokerClient,
  ProfileType,
  AIAgentType,
  AIAgentCapability,
  type AgentRegistrationRequest 
} from '@hashgraphonline/standards-sdk';

// Initialize the client
const client = new RegistryBrokerClient({ 
  baseUrl: 'https://hol.org/registry/api/v1' 
});

// Build the registration payload
const registrationPayload: AgentRegistrationRequest = {
  profile: {
    version: '1.0',
    type: ProfileType.AI_AGENT,
    display_name: 'My DeFi Analysis Agent',
    alias: 'defi-analyst',
    bio: 'An autonomous agent specializing in DeFi protocol analysis and yield optimization',
    properties: {
      tags: ['defi', 'analytics', 'yield'],
    },
    socials: [
      { platform: 'x', handle: 'hashgraphonline' },
    ],
    aiAgent: {
      type: AIAgentType.AUTONOMOUS,
      model: 'gpt-4-turbo',
      capabilities: [
        AIAgentCapability.TEXT_GENERATION,
        AIAgentCapability.MARKET_INTELLIGENCE,
        AIAgentCapability.TRANSACTION_ANALYTICS,
      ],
      creator: 'My Organization',
    }
  },
  communicationProtocol: 'a2a',
  registry: 'hashgraph-online',
  endpoint: 'https://my-agent.example.com/.well-known/agent.json',
  metadata: {
    provider: 'my-infrastructure',
    source: 'production-deployment',
  },
};
```

The profile structure is critical because it determines how other agents and users discover your agent. The `capabilities` array tells the registry what your agent can do, enabling semantic search and matching.

## Step 2: Checking Registration Credit Requirements

Before attempting registration, check whether you have sufficient credits using `getRegistrationQuote`. This method takes your complete registration payload and returns pricing information:

```typescript
async function checkRegistrationCosts(
  payload: AgentRegistrationRequest
): Promise<{ canRegister: boolean; shortfall: number; creditsPerHbar: number }> {
  const quote = await client.getRegistrationQuote(payload);
  
  console.log('Registration Quote:');
  console.log(`  Required credits: ${quote.requiredCredits}`);
  console.log(`  Current balance: ${quote.currentCredits ?? 'unknown'}`);
  console.log(`  Shortfall: ${quote.shortfallCredits ?? 0}`);
  console.log(`  Credits per HBAR: ${quote.creditsPerHbar}`);
  
  const shortfall = quote.shortfallCredits ?? 0;
  
  return {
    canRegister: shortfall <= 0,
    shortfall,
    creditsPerHbar: quote.creditsPerHbar,
  };
}
```

The quote response includes:
- `requiredCredits`: Total credits needed for this registration
- `currentCredits`: Your current credit balance (if authenticated)
- `shortfallCredits`: How many additional credits you need (0 if sufficient)
- `creditsPerHbar`: Current exchange rate for HBAR purchases

## Step 3: Purchasing Credits with HBAR

The simplest way to add credits is with native HBAR. The `purchaseCreditsWithHbar` method handles the complete flow, including signing the Hedera transaction:

```typescript
async function purchaseCreditsHbar(
  shortfall: number, 
  creditsPerHbar: number
): Promise<void> {
  // Calculate HBAR needed (with small buffer)
  const creditsTourchase = Math.max(shortfall + 10, 100); // Minimum 100 credits
  const hbarAmount = Math.ceil((creditsTourchase / creditsPerHbar) * 1e8) / 1e8;
  
  console.log(`Purchasing ${creditsTourchase} credits for ${hbarAmount} HBAR...`);
  
  const receipt = await client.purchaseCreditsWithHbar({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    hbarAmount: hbarAmount,
    memo: 'Agent registration credits',
    metadata: {
      purpose: 'agent-registration',
      requestedCredits: creditsTourchase,
    },
  });
  
  console.log('Credit purchase successful!');
  console.log(`  Transaction ID: ${receipt.transactionId}`);
  console.log(`  Credits added: ${receipt.creditsAdded}`);
  console.log(`  New balance: ${receipt.newBalance}`);
}
```

## Step 4: Purchasing Credits with x402

For organizations that prefer stablecoin payments or want to leverage EVM wallets, x402 provides an alternative payment method. This uses the x402 library to create a signer and process the payment:

```typescript
import { createSigner } from 'x402/types';

async function purchaseCreditsX402(shortfall: number): Promise<void> {
  // Get minimum purchase requirements
  const minimums = await client.getX402Minimums();
  const creditsTourchase = Math.max(
    shortfall,
    minimums.baseCredits ?? 100
  );
  
  console.log(`Purchasing ${creditsTourchase} credits via x402...`);
  console.log(`  Minimum purchase: ${minimums.baseCredits} credits`);
  console.log(`  USD amount: $${minimums.usdAmount ?? 'varies'}`);
  
  // Create the x402 signer from your EVM private key
  const privateKey = process.env.EVM_PRIVATE_KEY as `0x${string}`;
  const walletClient = await createSigner('base-sepolia', privateKey);
  
  const receipt = await client.purchaseCreditsWithX402({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    credits: creditsTourchase,
    description: 'Agent registration via x402',
    metadata: {
      source: 'my-app',
      environment: 'production',
    },
    walletClient,
  });
  
  console.log('x402 payment successful!');
  console.log(`  Credits added: ${receipt.creditsAdded}`);
  console.log(`  USD charged: $${receipt.usdCharged ?? 'see transaction'}`);
}
```

The x402 flow is particularly powerful because it integrates with the broader EVM DeFi ecosystem. Your agent could, for example, hold stablecoins on Base and autonomously purchase Registry Broker credits when needed.

## Step 5: Completing the Registration

With sufficient credits, you can now register your agent:

```typescript
async function registerAgentWithCredits(
  payload: AgentRegistrationRequest
): Promise<string> {
  // Check if we need credits
  const { canRegister, shortfall, creditsPerHbar } = 
    await checkRegistrationCosts(payload);
  
  if (!canRegister) {
    console.log(`Need ${shortfall} more credits. Purchasing...`);
    await purchaseCreditsHbar(shortfall, creditsPerHbar);
  }
  
  // Perform the registration
  const response = await client.registerAgent(payload);
  
  console.log('Agent registered successfully!');
  console.log(`  UAID: ${response.uaid}`);
  console.log(`  Status: ${response.status}`);
  
  // If registration is async, wait for completion
  if (response.attemptId) {
    console.log('Waiting for registration to complete...');
    const progress = await client.waitForRegistrationCompletion(
      response.attemptId,
      {
        intervalMs: 2000,
        timeoutMs: 60000,
        onProgress: (status) => {
          console.log(`  Progress: ${status.status}`);
        },
      }
    );
    console.log(`Final status: ${progress.status}`);
  }
  
  return response.uaid!;
}
```

## Handling 402 Errors Gracefully

Even with pre-checking, you may encounter 402 errors during operations. The SDK provides utilities to handle these gracefully:

```typescript
import { RegistryBrokerError } from '@hashgraphonline/standards-sdk';

async function registerWithAutoRetry(
  payload: AgentRegistrationRequest
): Promise<string> {
  try {
    const response = await client.registerAgent(payload);
    return response.uaid!;
  } catch (error) {
    if (error instanceof RegistryBrokerError && error.status === 402) {
      // Extract shortfall information from error body
      const body = error.body as Record<string, unknown>;
      const shortfall = Number(body.shortfallCredits ?? 0);
      const creditsPerHbar = Number(body.creditsPerHbar ?? 0);
      
      if (shortfall > 0 && creditsPerHbar > 0) {
        console.log(`Registration requires ${shortfall} more credits`);
        await purchaseCreditsHbar(shortfall, creditsPerHbar);
        
        // Retry the registration
        const retryResponse = await client.registerAgent(payload);
        return retryResponse.uaid!;
      }
    }
    throw error;
  }
}
```

## Automatic Credit Management

For production deployments, the SDK supports automatic credit top-ups. Configure this when creating your client:

```typescript
const productionClient = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
  registrationAutoTopUp: {
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    privateKey: process.env.HEDERA_PRIVATE_KEY!,
    memo: 'auto-topup',
  },
});

// Now registerAgent will automatically purchase credits if needed
const response = await productionClient.registerAgent(payload);
```

This is the recommended approach for autonomous agents that need to manage their own infrastructure without human intervention.

## Security Considerations

When implementing x402 payments:

1. **Protect private keys**: Use environment variables or secret managers
2. **Set spending limits**: Consider implementing application-level limits
3. **Monitor transactions**: Log all credit purchases for auditing
4. **Use testnets first**: Validate your flow on Hedera testnet and Base Sepolia

## The Future of Machine Commerce

Standardizing on the 402 status code allows agents to handle payments regardless of the underlying blockchain. Whether using HBAR or stablecoins, the mechanism remains consistent for the developer.

Your next step: register your first agent with credits, then explore how to build services that accept x402 payments from other agents.
