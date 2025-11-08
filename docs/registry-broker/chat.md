---
title: Chat Guide
description: Learn how to create chat sessions, send messages, and manage history with the Registry Broker client.
---

# Chat Guide

Use the `RegistryBrokerClient` to open chat sessions by UAID or adapter URL, send authenticated prompts, and manage history snapshots.

## Creating a Session by UAID

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

## Creating a Session by `agentUrl`

```typescript
const session = await client.chat.createSession({
  agentUrl: 'openrouter://anthropic/claude-3.5-sonnet',
  auth: { type: 'bearer', token: process.env.OPENROUTER_API_KEY! },
  historyTtlSeconds: 900,
});
```

Use this form when you need to target a protocol bridge directly (for example, OpenRouter). The broker records the resulting UAID and returns it in the session payload.

## Sending Messages

```typescript
const response = await client.chat.sendMessage({
  sessionId: session.sessionId,
  auth: {
    type: 'bearer',
    token: process.env.OPENROUTER_API_KEY!,
  },
  message: 'Summarize your capabilities in two sentences.',
});

console.log(response.message);
```

You can also start a chat by sending a message directly with a UAID:

```typescript
const direct = await client.chat.sendMessage({
  uaid: 'uaid:aid:a2a:hol:agent123',
  message: 'Hello from the SDK!',
});
```

## Managing History

```typescript
const history = await client.chat.getHistory(session.sessionId);
console.log('Entries:', history.length);

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
- Combine chat flows with `client.authenticateWithLedger` or `historyAutoTopUp` to keep sessions available even when the account runs low on credits.
- See the [registry-broker demos](https://github.com/hashgraphonline/hashgraph-online/tree/main/standards-sdk/demo/registry-broker) for complete scripts covering OpenRouter, history management, and async flows.

### x402-Paid Chats

Some registries include Coinbase x402 Bazaar providers. These adapters expect a valid payment header for each `/chat/message`, and the broker debits credits after the facilitator settles the charge. To call them from the SDK:

1. **Locate the UAID** – discover an x402 provider via `client.search`, `client.registrySearchByNamespace({ registry: 'coinbase-x402-bazaar', ... })`, or by resolving a UAID that the provider shared with you.
2. **Authenticate with ledger** – `await client.authenticateWithLedger({ accountId, network, signer })` so the API can attribute paid messages to your Hedera account.
3. **Ensure credits + wallets** – top up with `await client.buyCreditsWithX402({ accountId, credits, evmPrivateKey: process.env.ETH_PK!, network: 'base' | 'base-sepolia' })`. The helper wires up the `viem` wallet, generates the `X-PAYMENT` header, and retries automatically.
4. **Use the standard chat APIs** – create a session and send messages with the UAID you retrieved:

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

The payment metadata is returned in `rawResponse.headers['x-payment-*']`. After the facilitator confirms settlement, the broker records the receipt, debits credits (including the 20 % markup), and continues relaying messages to the upstream x402 service.

Make sure the payer wallet (`ETH_PK`) has enough WETH on the chosen Base network to satisfy the quoted USD amount; otherwise the facilitator will reject the payment request.

For a complete reference flow that exercises `/chat` against an x402 provider, inspect `standards-sdk/demo/registry-broker/registry-broker-x402-demo.ts`.

## Resources

- [Standards SDK demos](https://github.com/hashgraphonline/hashgraph-online/tree/main/standards-sdk/demo/registry-broker): Reference implementations for OpenRouter, history management, ledger auth, and async flows.
