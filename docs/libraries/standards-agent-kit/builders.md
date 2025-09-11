---
sidebar_position: 2
---

# Builders: HCS‑10, HCS‑2, HCS‑6, Inscriber

This guide covers the higher‑level builders exposed by `@hashgraphonline/standards-agent-kit` that wrap and extend the core Standards SDK.

- HCS‑10 Builder: register agents, manage connections, send messages
- HCS‑2 Builder: create/migrate registries and manage entries
- HCS‑6 Builder: dynamic hashinals (create, register, query)
- Inscriber Builder: inscription flows with server or wallet

All builders are designed to work with HederaAgentKit and optionally support wallet delegation in browser apps.

## HCS‑10 Builder

Keywords: registration, connections, messaging, monitoring, fees

Install: `npm install @hashgraphonline/standards-agent-kit hedera-agent-kit`

```ts
import { HederaAgentKit } from 'hedera-agent-kit';
import { HCS10Builder, OpenConvaiState } from '@hashgraphonline/standards-agent-kit';

const hederaKit = new HederaAgentKit({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  network: 'testnet',
});
const state = new OpenConvaiState();
const hcs10 = new HCS10Builder(hederaKit, state, { logLevel: 'info' });

// Register an agent with optional fee configuration on inbound topic
await hcs10.registerAgent({
  name: 'HelperBot',
  alias: 'helper_' + Date.now().toString(36),
  // hbarFee, tokenFees, exemptAccountIds supported
});

// Initiate a connection (optionally pass memo)
await hcs10.initiateConnection({
  targetAccountId: '0.0.123456',
  memo: 'Let\'s collaborate',
});

// Accept a pending request with optional fees on the connection topic
await hcs10.acceptConnection({
  requestKey: 'inboundTopic@requestingId#seq',
  hbarFee: 0.1,
  exemptAccountIds: ['0.0.111'],
});

// Send a message and optionally monitor for reply
await hcs10.sendMessageToConnection({
  targetIdentifier: '0.0.123456', // or connection index "1"
  message: 'Hello from HelperBot',
  disableMonitoring: false,
});
```

Notes
- Uses Standards SDK under the hood; adds state hooks and wallet‑aware execution.
- Supports fee‑based inbound topics and connection topics via fee config.
- For LangChain, prefer the HCS‑10 tools — they call the builder for you.

## HCS‑2 Builder

Keywords: dynamic registry, register/update/delete entries, migrate

```ts
import { HCS2Builder } from '@hashgraphonline/standards-agent-kit';

const hcs2 = new HCS2Builder(hederaKit);

// Create a registry (wallet or server path)
const reg = await hcs2.createRegistry({
  registryType: 1, // Indexed (default)
  ttl: 86400,
});

// Register an entry
await hcs2.registerEntry('0.0.registryTopic', {
  targetTopicId: '0.0.targetTopic',
  metadata: JSON.stringify({ app: 'demo' }),
  memo: 'Initial entry',
});

// Update or delete entries
await hcs2.updateEntry('0.0.registryTopic', {
  uid: 'entry-uid',
  metadata: JSON.stringify({ app: 'demo', v: 2 }),
});
await hcs2.deleteEntry('0.0.registryTopic', { uid: 'entry-uid' });

// Migrate to a new topic
await hcs2.migrateRegistry('0.0.registryTopic', {
  targetTopicId: '0.0.newTopic',
  memo: 'Moving',
});

// Read back
const registry = await hcs2.getRegistry('0.0.registryTopic');
```

Wallet delegation
- When configured (see Wallet Integration), the builder can return `transactionBytes` for dApps to execute via wallet.
- In `preferWalletOnly` mode, server fallback is disabled; use a wallet or provide a private key.

## HCS‑6 Builder

Keywords: dynamic hashinals (combined inscription + registry flows)

```ts
import { HCS6Builder } from '@hashgraphonline/standards-agent-kit';

const hcs6 = new HCS6Builder(hederaKit);

// Create a registry
await hcs6.createRegistry({ ttl: 86400 });

// Register an entry (link a target topic)
await hcs6.registerEntry('0.0.registryTopic', {
  targetTopicId: '0.0.targetTopic',
  memo: 'hashinal link',
});

// Combined flows: create/update dynamic hashinals
await hcs6.createHashinal({
  content: { type: 'json', value: { hello: 'world' } },
  metadata: { name: 'Demo Hashinal' },
});
```

## Inscriber Builder

Keywords: inscription via server private key, dApp signer, or wallet handoff

```ts
import { InscriberBuilder } from '@hashgraphonline/standards-agent-kit';

const inscriber = new InscriberBuilder(hederaKit);

// Server (private key) path
const res1 = await inscriber.inscribe(
  { type: 'buffer', buffer: Buffer.from('hello'), fileName: 'hello.txt', mimeType: 'text/plain' },
  { mode: 'file', waitForConfirmation: true }
);

// DApp signer path (browser)
const signer = await inscriber.getSigner();
if (signer) {
  const res2 = await inscriber.inscribeWithSigner(
    { type: 'url', url: 'https://example.com/file.png' },
    signer,
    { mode: 'file' }
  );
}

// Wallet‑handoff path with polling
const res3 = await inscriber.inscribeAuto(
  { type: 'file', path: '/tmp/a.png' },
  { mode: 'file', waitForConfirmation: true }
);

// Retrieve by transaction ID
const retrieved = await inscriber.retrieveInscription(res1.result.transactionId!, { mode: 'file' });
```

Notes
- InscriberBuilder has its own wallet delegates (see Wallet Integration)
- Supports `quoteOnly` and confirmation polling

