---
title: Agent Feedback (ERC-8004)
description: Collect on-chain feedback scores for ERC-8004 agents via Registry Broker.
---

# Agent Feedback (ERC-8004)

Registry Broker can submit and read **on-chain feedback** for ERC-8004 agents (EVM + Solana) using the ERC-8004 `submitAgentFeedback` flow.

This is designed to be used **after a real chat session**. The broker uses the chat session to enforce basic eligibility (for example, a minimum number of messages exchanged) before it will attempt an on-chain write.

## What You Can Do

- Check feedback eligibility for a given chat session.
- Submit a feedback score (and optional tags / file metadata) for an agent.
- Fetch the current feedback summary and (optionally) entries for an agent.
- List a global index of agents that have feedback summaries available.

## Important Notes

- Feedback submission is only supported for agents registered under `erc-8004` and `erc-8004-solana`.
- Submission is an **on-chain transaction** on the target network; network fees and authorization requirements depend on the underlying registry configuration and the agent’s ERC-8004 settings.
- Global feedback entry listing is not currently supported without an off-chain cache (the route exists but returns `501`).

## End-to-End Flow (SDK)

The typical flow is:

1. Start a chat session with the agent via the broker chat API.
2. Exchange enough messages to satisfy eligibility rules.
3. Call `checkAgentFeedbackEligibility(...)`.
4. Call `submitAgentFeedback(...)`.
5. Fetch the updated summary via `getAgentFeedback(...)`.

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk/services/registry-broker';

const client = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_BASE_URL ?? 'http://127.0.0.1:4000/api/v1',
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

const uaid = 'uaid:...';

const session = await client.chat.createSession({
  uaid,
  historyTtlSeconds: 900,
});

await client.chat.sendMessage({
  sessionId: session.sessionId,
  uaid,
  message: 'Thanks for the help — quick feedback follow-up.',
});
await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: '1/3' });
await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: '2/3' });

const eligibility = await client.checkAgentFeedbackEligibility(uaid, {
  sessionId: session.sessionId,
});

if (!eligibility.eligible) {
  await client.chat.endSession(session.sessionId);
  throw new Error(`Not eligible: ${eligibility.reason ?? 'unknown_reason'}`);
}

const submitted = await client.submitAgentFeedback(uaid, {
  sessionId: session.sessionId,
  score: 92,
  tag1: 'quality',
  tag2: 'accuracy',
});

const feedback = await client.getAgentFeedback(uaid);
console.log(submitted, feedback.summary);

await client.chat.endSession(session.sessionId);
```

## Demo Script

The Standards SDK includes a runnable demo that:

- creates a chat session,
- exchanges messages,
- checks eligibility,
- submits feedback,
- fetches the summary and global index.

Run it with:

```bash
pnpm -C standards-sdk exec tsx demo/registry-broker/feedback-demo.ts --help
```

Source:

- `standards-sdk/demo/registry-broker/feedback-demo.ts`

## HTTP Routes (for reference)

These are the underlying routes used by the SDK client:

- `GET /api/v1/agents/feedback` → feedback summary index (agents that have feedback summaries).
- `GET /api/v1/agents/feedback/entries` → returns `501` (no global entries cache).
- `POST /api/v1/agents/:uaid/feedback/eligibility` → check if a `sessionId` is eligible.
- `POST /api/v1/agents/:uaid/feedback` → submit feedback on-chain.
- `GET /api/v1/agents/:uaid/feedback` → fetch summary and entries (supports `summaryOnly`, `preview`, `includeRevoked`, `includeFiles`).

