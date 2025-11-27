---
title: FAQ
description: Common questions about the Registry Broker system
---

# Frequently Asked Questions

Answers to the most common questions about the Registry Broker and the `@hashgraphonline/standards-sdk`.

## General Questions

### What is the Registry Broker?

The Registry Broker is a hosted discovery and relay service that indexes AI agents across multiple protocols and networks. It exposes a unified REST API and a typed TypeScript client (`RegistryBrokerClient`) for discovery, registration, chat relay, analytics, and billing workflows.

### Which features require credits?

Free endpoints: keyword search, **vector search**, metadata facets, registry listings, adapter catalogues, protocol detection, and public stats. Vector search is rate limited; supply an API key—even for anonymous discovery—to receive a dedicated bucket keyed to your key/account rather than the shared IP bucket.  
Credit-gated endpoints: agent registration and updates, chat relay (including history operations), UAID utilities, and metrics snapshots.

### Which protocols are supported?

The broker normalises agents registered via A2A, MCP, ERC-8004 networks (multiple L1/L2 chains), OpenRouter-compatible sources, and Hedera-backed UAIDs. See the [API reference](/docs/registry-broker/api/client#protocol-and-adapter-utilities) for the latest protocol utilities.

## Technical Questions

### How do I get started quickly?

Follow the [Quick Start Guide](quick-start.md) to install the SDK, load environment variables, run keyword and vector searches, and open a chat session.

### How do I register or update an agent?

Use the [First Agent Registration](first-registration.md) tutorial. It walks through HCS-11 profile preparation, requesting quotes, calling `registerAgent`, handling asynchronous completions, and running updates with `updateAgent`.

### What is a UAID?

UAID (Unique Agent Identifier) is the canonical identifier for registered agents. It follows the pattern `uaid:aid:{protocol}:{network}:{agent-id}` and is returned by `registerAgent`, `resolveUaid`, search results, and registration progress APIs.

See the [HCS-14 UAID specification](../../standards/hcs-14.md) for the normative definition and reserved segments.

### How does chat relay work?

1. Create a session: `client.chat.createSession({ uaid })` (or, for unregistered local agents only, supply an `agentUrl`).  
2. Send messages (optionally streaming): `client.chat.sendMessage({ sessionId, message })`.  
3. Read history: `client.chat.getHistory(sessionId)`.  
4. Compact history if needed: `client.chat.compactHistory({ sessionId, preserveEntries })`.  
5. End the session: `client.chat.endSession(sessionId)`.

## Billing & Credits

### How do I add credits?

Purchase credits through the [billing portal](https://hol.org/registry/billing) or call `client.purchaseCreditsWithHbar` with Hedera credentials. Credits become available instantly once the ledger transaction reaches consensus.

### What happens if I run out of credits?

Paid endpoints respond with HTTP 402 (Payment Required). The SDK surfaces this as `RegistryBrokerError`—inspect `error.status === 402` and top up credits manually or configure `registrationAutoTopUp` / `historyAutoTopUp`.

### Can I move credits between projects?

Contact support via the billing portal or the community channel listed below. Credits do not expire and can be reassigned by the operations team.

## Development Questions

### Which languages are supported?

The official SDK targets TypeScript/JavaScript. Any language can integrate by calling the REST API directly. Community-maintained SDKs exist for select runtimes—check GitHub discussions for links.

### Do I need a Hedera account?

Search and discovery work without Hedera credentials. You need a Hedera account and private key to auto-purchase credits, verify ledger challenges, or run registrations that rely on ledger authentication.

### How should I handle errors?

```typescript
import {
  RegistryBrokerClient,
  RegistryBrokerError,
  RegistryBrokerParseError,
} from '@hashgraphonline/standards-sdk/services/registry-broker';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

try {
  await client.search({ q: 'agent' });
} catch (error) {
  if (error instanceof RegistryBrokerError) {
    console.error('HTTP error', error.status, error.body);
  } else if (error instanceof RegistryBrokerParseError) {
    console.error('Payload validation failed', error.cause);
  } else {
    throw error;
  }
}
```

The client only throws two bespoke error classes; all other failures bubble up as the original exception.

## Operations Questions

### How do I monitor my agents?

- `client.stats()` returns global registry aggregates such as total agents and registries (`/stats` endpoint).
- `client.dashboardStats()` surfaces account-level adapter and registry totals (`/dashboard/stats` endpoint).
- `client.metricsSummary()` provides HTTP/search/registration latency and counts directly from the `/metrics` endpoint.
- For individual agent status, poll `client.getRegistrationProgress(attemptId)` or `client.waitForRegistrationCompletion(attemptId)` during registrations.

### How do I update or remove an agent?

Use `client.updateAgent(uaid, payload)` for updates, then follow progress polling if the response is pending. For removals, open a support ticket with ownership proof; self-service deregistration is currently handled through support.

### How do I check registration progress?

Call `client.getRegistrationProgress(attemptId)` or `client.waitForRegistrationCompletion(attemptId)` after receiving a pending response. Progress data includes per-network statuses and error messages.

## Troubleshooting

### My agent is not appearing in search results.

- Verify the registration attempt completed successfully in the dashboard.
- Call `client.getRegistrationProgress(attemptId)` for detailed status.
- Ensure your query matches the agent metadata (name, capabilities, tags).
- Allow a few minutes for the search index to refresh after completion.

### Chat sessions are failing.

- Confirm the agent endpoint is reachable and implements the declared protocol.
- Check account credits (HTTP 402 indicates a shortfall).
- For UAID sessions, confirm `client.getUaidConnectionStatus(uaid).connected` returns true.

### I am hitting rate limits.

- Respect the 429 response with exponential backoff.
- Cache discovery responses when possible.
- Avoid overly aggressive polling; space out registration progress checks.

## Support & Community

- Documentation & tutorials: this directory.
- Community chat: [Hashgraph Online Telegram](https://t.me/hashinals).
- Issue tracking: [GitHub Issues](https://github.com/hashgraph-online/standards-sdk/issues).
- Feature requests and roadmap updates: [GitHub Discussions](https://github.com/hashgraph-online/standards-sdk/discussions).
