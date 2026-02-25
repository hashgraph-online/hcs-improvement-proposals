---
title: XMTP Integration
description: Register XMTP agents with the Registry Broker and relay chat (including encrypted history) through the broker chat API.
---

# XMTP Integration

XMTP is a wallet-based, end-to-end encrypted messaging network (MLS). The Registry Broker can relay chat to XMTP agents when the agent is registered with `communicationProtocol: "xmtp"` and an XMTP endpoint (an Ethereum address).

This page covers:

- Registering an XMTP agent (UAID `proto=xmtp`)
- Sending messages through the broker chat endpoint (no client-side XMTP key required)
- Using Registry Broker encrypted chat history over XMTP transport
- Publishing an XMTP agent endpoint to ERC-8004 networks

## Key model (who needs an XMTP private key?)

- **Agent / broker-side transport:** XMTP requires a signer to create an XMTP client. The broker’s XMTP adapter uses `XMTP_PRIVATE_KEY` (or an ephemeral key if not set).
- **Credits-only callers:** clients calling `POST /api/v1/chat/message` via `RegistryBrokerClient` do **not** need an XMTP private key. They authenticate to the broker (ledger auth or API key) and the broker relays to XMTP on their behalf.

If you need *end users* to message agents directly on XMTP without the broker, they will need a wallet/signer.

## Register an XMTP agent

XMTP endpoints are Ethereum addresses. Use one of these forms:

- `xmtp://0xabc...`
- `xmtp:0xabc...`
- `0xabc...` (treated as an address)

Register an agent with the broker:

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';
import type { AgentRegistrationRequest } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: process.env.REGISTRY_BROKER_BASE_URL!,
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

const registrationPayload: AgentRegistrationRequest = {
  name: 'xmtp-demo-agent',
  description: 'XMTP-backed agent reachable through the broker.',
  registry: 'hashgraph-online',
  agentType: 'ai',
  communicationProtocol: 'xmtp',
  endpoint: 'xmtp://0x1234567890abcdef1234567890abcdef12345678',
  profile: {
    version: '1.0.0',
    type: 'AI_AGENT',
    display_name: 'XMTP demo agent',
  },
};

const registration = await client.registerAgent(registrationPayload);
console.log('status:', registration.status);
console.log('uaid:', 'uaid' in registration ? registration.uaid : undefined);
```

Once registered, the returned UAID will contain `proto=xmtp`. That UAID is the stable routing target for chat.

## Chat an XMTP agent through the broker

The broker chat endpoint is `POST /api/v1/chat/message` and is exposed through the SDK as `client.chat.sendMessage(...)`.

```ts
const session = await client.chat.createSession({ uaid: xmtpAgentUaid });
const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello over XMTP via the broker.',
});

console.log('reply:', reply.content ?? reply.message);
```

This is broker-mediated chat: the caller uses broker auth/credits, and the broker relays the transport message to the XMTP address registered for the UAID.

## Encrypted chat history over XMTP transport

XMTP provides transport encryption, but Registry Broker encrypted chat is about **server-blind history storage** (cipher envelopes + handshake) and can be used over any transport, including XMTP.

Use the encrypted chat helpers:

```ts
const conversation = await client.chat.start({
  uaid: xmtpAgentUaid,
  encryption: { preference: 'required' },
});

await conversation.send({ plaintext: 'Store this as encrypted history.' });
const history = await client.chat.getHistory(conversation.sessionId, {
  decrypt: true,
});

console.log(history.decryptedHistory?.map((entry) => entry.plaintext));
```

For key registration and server configuration, see the [Encrypted Chat](encrypted-chat.md) guide.

## Demos (Standards SDK)

Run the XMTP demos from the `standards-sdk` package:

```bash
cd standards-sdk
pnpm exec tsx demo/registry-broker/registry-broker-xmpt-demo.ts
pnpm exec tsx demo/registry-broker/register-agent-erc8004-xmpt.ts
```

The demos:

- Register XMTP agents with the broker (`communicationProtocol: "xmtp"`)
- Chat via the broker chat endpoint (direct + relay)
- Exercise Registry Broker encrypted chat history
- Publish an XMTP communication endpoint to ERC-8004 networks and verify it
