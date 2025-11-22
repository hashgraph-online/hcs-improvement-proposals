---
title: Chat Guide
description: Learn how to create chat sessions, send messages, and manage history with the Registry Broker client.
---

# Chat Guide

Use the `RegistryBrokerClient` to open chat sessions by UAID, send prompts, and manage history snapshots. For all registered agents—including OpenRouter, ERC‑8004 listings, Agentverse mailbox agents, and the local A2A helpers used in the SDK demos—you only need a UAID plus Registry Broker credits. Endpoint selection and downstream provider keys are handled inside the broker.

## Creating a Session by UAID

### Quick-start conversation helper

```typescript
const conversation = await client.chat.start({
  uaid: openRouterDemoUaid,
  encryption: { preference: 'preferred' },
});

await conversation.send({ plaintext: 'Summarize your capabilities.' });
const history = await client.chat.getHistory(conversation.sessionId, {
  decrypt: true,
});
```

`chat.start` creates the session, negotiates encryption when possible, and returns a `ChatConversationHandle` with the same `send` / `decryptHistoryEntry` helpers used by the encrypted chat demo.

```typescript
const openRouterDemoUaid =
  'uaid:aid:2bnewJwP95isoCUkT5mee5gm212WS76tphHwBQvbWoquRa9kt89UanrBqHXpaSh4AN;uid=anthropic/claude-3.5-sonnet;registry=openrouter;proto=openrouter;nativeId=anthropic/claude-3.5-sonnet';

const session = await client.chat.createSession({
  uaid: openRouterDemoUaid,
  historyTtlSeconds: 1800,
});

console.log('Session:', session.sessionId);
console.log('History entries:', session.history.length);
```

UAIDs keep your integration adapter-agnostic. Store the UAID you receive when registering an agent or fetch one dynamically with `client.search`, `client.resolveUaid`, or `client.registrySearchByNamespace`. The value above is the public OpenRouter demo UAID used throughout the Standards SDK samples—you can copy it directly to follow along or substitute the UAID of your own agent.

## Creating a Session by `agentUrl` (advanced)

```typescript
const session = await client.chat.createSession({
  agentUrl: 'http://localhost:3000/.well-known/agent-card.json',
  historyTtlSeconds: 900,
});

const conversation = await client.chat.start({
  agentUrl: 'http://localhost:3000/.well-known/agent-card.json',
});
```

Use this form only when you need to talk to a local or unregistered endpoint that does not yet have a UAID (for example, an ephemeral dev server you have not registered). For hosted adapters such as OpenRouter and ERC‑8004—and for the local A2A helpers used in the demos—prefer UAIDs so the broker can manage protocol details, credits, and any downstream provider keys on your behalf.

## Sending Messages

```typescript
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Summarize your capabilities in two sentences.',
});

console.log(response.message);
```

You can also start a chat by sending a message directly with a UAID:

```typescript
const direct = await client.chat.sendMessage({
  uaid: 'uaid:aid:a2a:hashgraph-online:agent123',
  message: 'Hello from the SDK!',
});
```

## Managing History

```typescript
const history = await client.chat.getHistory(session.sessionId);
console.log('Entries:', history.history.length);

const compacted = await client.chat.compactHistory({
  sessionId: session.sessionId,
  preserveEntries: 4,
});

console.log('Summary:', compacted.summaryEntry.content);
```

Compact history to reduce storage usage or prepare summaries before closing a session.

## Ending a Session

```typescript
await client.chat.endSession(session.sessionId);
console.log('Session closed');
```

## Tips

- Store the UAID returned in `session.uaid` for downstream workflows (registration updates, directory listings, etc.).
- Use `historyTtlSeconds` to balance cost and retention; the broker auto-expires chat history after the configured TTL.
- Combine chat flows with `client.authenticateWithLedgerCredentials` or `historyAutoTopUp` to keep sessions available even when the account runs low on credits.
- See the [registry-broker demos](https://github.com/hashgraph-online/standards-sdk/tree/main/demo/registry-broker) for complete scripts covering OpenRouter, history management, and async flows.
- Pass `{ decrypt: true }` to `client.chat.getHistory(sessionId, options)` to have the SDK return a `decryptedHistory` array when the client knows the shared secret (for example, when created via `RegistryBrokerClient.initializeAgent`).
- Prefer the high-level `client.chat.startConversation` / `acceptConversation` helpers for encrypted sessions—they handle handshakes, shared secrets, and ciphertext payloads automatically.

### x402-Paid Chats

Some registries surface Coinbase x402 Bazaar providers or ERC-8004 listings that require x402 payments. These adapters expect a valid payment header for every `/chat/message`, and the broker debits credits (including the 20 % markup) once the facilitator confirms settlement.

#### Prerequisites

1. **Discover the UAID** – search by registry (`coinbase-x402-bazaar`, `erc-8004`, etc.) or resolve a UAID that a provider shared with you.
2. **Ledger authentication** – `await client.authenticateWithLedgerCredentials({ accountId, network, hederaPrivateKey })` so paid chats are tied to your Hedera account.
3. **Fund credits via x402** – keep your payer wallet (`ETH_PK`) stocked with WETH on the desired Base network, then call `client.buyCreditsWithX402`:

```typescript
await client.buyCreditsWithX402({
  accountId: process.env.DEMO_ACCOUNT_ID!,
  credits: 50, // 1 credit = $0.01 before the 20% markup
  description: 'Top-up for paid chats',
  evmPrivateKey: process.env.ETH_PK!,
  network: 'base-sepolia', // or 'base'
});
```

The helper provisions a `viem` wallet client, injects the `X-PAYMENT` header, retries after the initial 402, and returns the decoded payment receipt (`paymentResponse`).

#### Sending a Paid Message

Call the standard chat APIs—no bespoke REST plumbing is required:

```typescript
const session = await client.chat.createSession({ uaid: x402Uaid });
const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Request a paid signal from the x402 provider.',
});

console.log('Provider response:', reply.message);
console.log('Payment status:', reply.rawResponse?.headers?.['x-payment-status']);
console.log(
  'Payment requirement:',
  reply.rawResponse?.headers?.['x-payment-requirement'],
);
```

The broker exposes the facilitator output in `rawResponse.headers['x-payment-*']`. Once the facilitator marks the requirement `SETTLED`, credits are debited automatically and subsequent messages in the same session remain billable.

#### End-to-End Reference Demos

- `standards-sdk/demo/registry-broker/registry-broker-x402-demo.ts` shows a single client chatting with a Coinbase x402 Bazaar provider and printing the payment headers.
- `standards-sdk/demo/registry-broker/registry-broker-erc8004-x402-demo.ts` registers:
  1. A local A2A initiator under the `hashgraph-online` registry.
  2. A paid ERC-8004 agent whose metadata advertises an x402 capability.
  3. A Cloudflare-backed facilitator endpoint.

  The script authenticates via ledger, auto-purchases credits with `buyCreditsWithX402`, creates a session against the ERC-8004 UAID, and prints the paid response plus the credit delta. Use it as a blueprint for wiring your own UAIDs that expect x402 settlements.

Make sure the payer wallet (`ETH_PK`) has enough WETH on the chosen Base network to satisfy the quoted USD amount; otherwise the facilitator will reject the payment request.

### Encrypted Sessions

- Enable `encryptionRequested` when calling `chat.createSession`, or use the conversation helpers mentioned above.
- `client.chat.getHistory(sessionId, { decrypt: true })` returns both the raw broker entries and a `decryptedHistory` array for convenience.
- See the [Encrypted Chat guide](encrypted-chat.md) for server configuration, key registration, and a full demo.

## Resources

- [Standards SDK demos](https://github.com/hashgraph-online/standards-sdk/tree/main/demo/registry-broker): Reference implementations for OpenRouter, history management, ledger auth, and async flows.
