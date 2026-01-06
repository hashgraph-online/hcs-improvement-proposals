---
slug: end-to-end-encrypted-agent-communication
title: "Building End-to-End Encrypted Agent Conversations with Registry Broker"
description: "Learn how to implement secure, encrypted communication between AI agents using the Registry Broker's E2EE capabilities. Complete TypeScript tutorial covering key registration, encrypted sessions, and message decryption."
authors: [hashgraphonline]
tags: [encryption, security, registry-broker, hcs-10, sdk, privacy, typescript]
image: https://hol.org/img/logo.png
keywords: [agent encryption, E2EE, end-to-end encryption, secure AI agents, encrypted chat, agent privacy]
---

Agents handle secrets: API keys, medical records, financial data. TLS protects these in transit, but it leaves them exposed on the server.

**End-to-end encryption (E2EE)** fixes this. Messages are encrypted at the source and decrypted only at the destination. The Registry Broker stores the message, but it can't read it.

Only the sender and recipient hold the keys.

<!--truncate-->

## Understanding E2EE in the Agent Context

Standard client-server encryption places trust in the server. For agents, this is a vulnerability:

1.  **Data exposure**: Intermediaries log everything.
2.  **Compliance**: GDPR and HIPAA often require you to remove the platform from the trust boundary.
3.  **Audit trails**: Even if the message body is private, metadata leaks intent.

E2EE removes the platform from the equation. The Registry Broker becomes a dumb pipe for encrypted envelopes.

## The Encryption Architecture

The Registry Broker's E2EE implementation uses:

1. **Long-term identity keys**: Each agent registers a persistent public key
2. **Ephemeral session keys**: Fresh keys generated for each conversation
3. **X3DH-style handshake**: A key agreement protocol that establishes shared secrets
4. **AES-GCM encryption**: Industry-standard symmetric encryption for messages

The flow works as follows:

```
Agent A                    Registry Broker                    Agent B
   |                            |                                |
   |---- Register Public Key -->|<--- Register Public Key ------|
   |                            |                                |
   |---- Start Session -------->|                                |
   |<--- Handshake Record ------|                                |
   |                            |---- Notify Session ----------->|
   |                            |<--- Complete Handshake -------|
   |                            |                                |
   |---- Encrypted Message ---->|---- Forward Ciphertext ------>|
   |                            |                                |
```

## Prerequisites

Install the required packages:

```bash
npm install @hashgraphonline/standards-sdk dotenv
```

Configure your environment:

```bash
# .env
REGISTRY_BROKER_BASE_URL=https://hol.org/registry/api/v1
HEDERA_ACCOUNT_ID=0.0.12345
HEDERA_PRIVATE_KEY=302e...
```

## Step 1: Initializing Agents with Encryption Keys

The first step is to initialize each agent with encryption capabilities. The `RegistryBrokerClient.initializeAgent` static method handles key generation and registration:

```typescript
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const brokerUrl = process.env.REGISTRY_BROKER_BASE_URL 
  ?? 'https://hol.org/registry/api/v1';

// First, create an admin client for registration
const adminClient = new RegistryBrokerClient({ baseUrl: brokerUrl });

// Authenticate if needed (for credit-based operations)
await adminClient.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: `hedera:${process.env.HEDERA_NETWORK ?? 'testnet'}`,
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  expiresInMinutes: 60,
  label: 'e2ee-demo',
});

// Get shared headers for child clients
const sharedHeaders = adminClient.getDefaultHeaders();

// Initialize Agent A with encryption
const agentASetup = await RegistryBrokerClient.initializeAgent({
  baseUrl: brokerUrl,
  defaultHeaders: sharedHeaders,
  uaid: agentAUaid,
  encryption: { 
    autoDecryptHistory: true 
  },
  ensureEncryptionKey: {
    uaid: agentAUaid,
    generateIfMissing: true,
    label: 'agent-a-encryption-key',
  },
});

console.log(`Agent A initialized with encryption key`);
const agentAClient = agentASetup.client;

// Initialize Agent B similarly
const agentBSetup = await RegistryBrokerClient.initializeAgent({
  baseUrl: brokerUrl,
  defaultHeaders: sharedHeaders,
  uaid: agentBUaid,
  encryption: { 
    autoDecryptHistory: true 
  },
  ensureEncryptionKey: {
    uaid: agentBUaid,
    generateIfMissing: true,
    label: 'agent-b-encryption-key',
  },
});

console.log(`Agent B initialized with encryption key`);
const agentBClient = agentBSetup.client;
```

The `ensureEncryptionKey` option tells the SDK to:
1. Check if a long-term encryption key already exists for this UAID
2. If not, generate a new key pair
3. Register the public key with the Registry Broker
4. Store the private key securely in the client instance

## Step 2: Starting an Encrypted Conversation

Agent A (the requester) initiates the conversation using `startConversation` with encryption preferences:

```typescript
// Agent A starts the conversation with encryption required
let sessionId: string | undefined;

const agentAConversation = await agentAClient.chat.startConversation({
  uaid: agentBUaid,
  senderUaid: agentAUaid,
  encryption: { 
    preference: 'required' // Options: 'required', 'preferred', 'disabled'
  },
  onSessionCreated: (id) => {
    sessionId = id;
    console.log(`Session created: ${id}`);
  },
});

console.log(`Conversation mode: ${agentAConversation.mode}`);
console.log(`Encryption algorithm: ${agentAConversation.summary?.algorithm ?? 'none'}`);
```

The `preference` option controls encryption behavior:
- **`required`**: Fail if encryption cannot be established
- **`preferred`**: Use encryption if available, fall back to plaintext
- **`disabled`**: Always use plaintext (transport encryption only)

## Step 3: Accepting the Encrypted Session

Agent B (the responder) must accept the conversation and complete the handshake:

```typescript
// Agent B accepts the encrypted conversation
// In production, you'd receive the sessionId via a notification mechanism
const agentBConversation = await agentBClient.chat.acceptConversation({
  sessionId: sessionId!,
  responderUaid: agentBUaid,
  encryption: { 
    preference: 'required' 
  },
});

console.log(`Agent B joined session with mode: ${agentBConversation.mode}`);
```

Once both agents have completed the handshake, they share a symmetric key that only they know. The Registry Broker has the encrypted handshake records but cannot derive the shared secret.

## Step 4: Sending Encrypted Messages

Sending encrypted messages uses the conversation handle's `send` method. The SDK handles all encryption transparently:

```typescript
// Agent A sends an encrypted message
await agentAConversation.send({
  plaintext: 'Hello from Agent A! This message is encrypted end-to-end.',
});

console.log('Agent A sent encrypted message');

// Agent B sends a reply
await agentBConversation.send({
  plaintext: 'Agent B received your message. Replying with sensitive data: SSN-123-45-6789',
});

console.log('Agent B sent encrypted reply');
```

Behind the scenes, the SDK:
1. Encrypts the plaintext using AES-GCM with the shared session key
2. Packages the ciphertext into an envelope with metadata
3. Sends the envelope to the Registry Broker's `/chat/message` endpoint
4. The broker stores only the encrypted envelope

## Step 5: Retrieving and Decrypting History

Both agents can retrieve and decrypt the conversation history:

```typescript
// Agent A retrieves history
const agentAHistory = await agentAClient.chat.getHistory(
  agentAConversation.sessionId,
  { decrypt: true }
);

console.log(`\nAgent A's decrypted view:`);
for (const entry of agentAHistory.decryptedHistory ?? []) {
  console.log(`  [${entry.role}] ${entry.plaintext}`);
}

// Agent B retrieves the same history
const agentBHistory = await agentBClient.chat.getHistory(
  agentBConversation.sessionId,
  { decrypt: true }
);

console.log(`\nAgent B's decrypted view:`);
for (const entry of agentBHistory.decryptedHistory ?? []) {
  console.log(`  [${entry.role}] ${entry.plaintext}`);
}
```

The `{ decrypt: true }` option tells the SDK to use the stored session keys to decrypt each message. Both agents see the same plaintext because they share the same session key.

## Step 6: Complete Working Example

Here's a complete example bringing it all together:

```typescript
import 'dotenv/config';
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

async function runEncryptedChatDemo(): Promise<void> {
  const brokerUrl = process.env.REGISTRY_BROKER_BASE_URL 
    ?? 'https://hol.org/registry/api/v1';

  // Assume we have two registered agents with these UAIDs
  const agentAUaid = process.env.AGENT_A_UAID!;
  const agentBUaid = process.env.AGENT_B_UAID!;

  // Create admin client for authentication
  const adminClient = new RegistryBrokerClient({ baseUrl: brokerUrl });
  
  // Authenticate with Hedera credentials
  await adminClient.authenticateWithLedgerCredentials({
    accountId: process.env.HEDERA_ACCOUNT_ID!,
    network: `hedera:testnet`,
    hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
    expiresInMinutes: 60,
    label: 'e2ee-complete-demo',
  });

  const headers = adminClient.getDefaultHeaders();

  // Initialize both agents with encryption
  console.log('🔐 Initializing agents with encryption...');
  
  const [agentASetup, agentBSetup] = await Promise.all([
    RegistryBrokerClient.initializeAgent({
      baseUrl: brokerUrl,
      defaultHeaders: headers,
      uaid: agentAUaid,
      encryption: { autoDecryptHistory: true },
      ensureEncryptionKey: {
        uaid: agentAUaid,
        generateIfMissing: true,
        label: 'demo-agent-a',
      },
    }),
    RegistryBrokerClient.initializeAgent({
      baseUrl: brokerUrl,
      defaultHeaders: headers,
      uaid: agentBUaid,
      encryption: { autoDecryptHistory: true },
      ensureEncryptionKey: {
        uaid: agentBUaid,
        generateIfMissing: true,
        label: 'demo-agent-b',
      },
    }),
  ]);

  const agentAClient = agentASetup.client;
  const agentBClient = agentBSetup.client;

  // Coordinate the conversation start
  let resolveSessionId: (id: string) => void;
  const sessionIdReady = new Promise<string>(r => { resolveSessionId = r; });

  console.log('🤝 Establishing encrypted session...');

  // Agent A starts, Agent B waits for session ID
  const [conversationA, conversationB] = await Promise.all([
    agentAClient.chat.startConversation({
      uaid: agentBUaid,
      senderUaid: agentAUaid,
      encryption: { preference: 'required' },
      onSessionCreated: id => {
        console.log(`  📬 Session: ${id}`);
        resolveSessionId!(id);
      },
    }),
    sessionIdReady.then(sessionId =>
      agentBClient.chat.acceptConversation({
        sessionId,
        responderUaid: agentBUaid,
        encryption: { preference: 'required' },
      })
    ),
  ]);

  console.log(`✅ Encrypted session established (${conversationA.summary?.algorithm})`);

  // Exchange messages
  console.log('\n📨 Exchanging encrypted messages...');
  
  await conversationA.send({ 
    plaintext: 'Confidential: Q4 revenue projections attached.' 
  });
  console.log('  Agent A: sent encrypted message');

  await conversationB.send({ 
    plaintext: 'Received. Forwarding to CFO with encryption intact.' 
  });
  console.log('  Agent B: sent encrypted reply');

  // Verify both can decrypt
  console.log('\n🔓 Verifying decryption...');
  
  const historyA = await agentAClient.chat.getHistory(
    conversationA.sessionId, 
    { decrypt: true }
  );
  
  console.log('Agent A sees:');
  for (const msg of historyA.decryptedHistory ?? []) {
    console.log(`  [${msg.role}]: ${msg.plaintext}`);
  }

  console.log('\n✅ E2EE demo complete');
}

runEncryptedChatDemo().catch(console.error);
```

## Security Best Practices

When implementing E2EE agent communication:

1. **Protect private keys**: Store encryption keys securely, never in logs or configs
2. **Rotate keys periodically**: Generate new long-term keys on a schedule
3. **Verify identities**: Confirm UAIDs before establishing encrypted sessions
4. **Handle failures gracefully**: Have fallback behavior when encryption fails
5. **Audit metadata**: Even with E2EE, connection patterns are visible

## When to Use E2EE

Use end-to-end encryption when:

- Handling personally identifiable information (PII)
- Processing financial or healthcare data
- Complying with privacy regulations
- Communicating across organizational boundaries
- The communication content is more sensitive than the metadata

For less sensitive use cases, the transport-layer encryption (TLS) provided by default may be sufficient.

## Conclusion

End-to-end encryption turns the Registry Broker into a zero-knowledge relay. It handles the connection and stores the encrypted data, but it never sees the content.

This is the only way to build compliant AI systems that handle sensitive user data.
