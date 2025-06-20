---
sidebar_position: 2
---

# HCS-2: Decentralized Topic Registry

The HCS-2 module provides a decentralized registry for Hedera Consensus Service (HCS) topics. It allows for the discovery and management of topics in a standardized way, supporting both indexed and non-indexed registries.

## What HCS-2 Does

- **Creates Registries** - Establishes new HCS topics to act as registries.
- **Manages Entries** - Supports registering, updating, deleting, and migrating topic entries.
- **Standardized Memos** - Uses a specific memo format for identifying HCS-2 registries.
- **Flexible Queries** - Allows for fetching and parsing registry entries.

## Getting Started

### Installation

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Setup (Node.js)

For server-side applications, use `HCS2Client`.

```typescript
import { HCS2Client } from '@hashgraphonline/standards-sdk/dist/hcs-2';
import { HCS2RegistryType } from '@hashgraphonline/standards-sdk/dist/hcs-2/types';

// Initialize the HCS-2 client
const client = new HCS2Client({
  network: 'testnet',
  operatorId: 'your-operator-id',
  operatorKey: 'your-operator-private-key',
  logLevel: 'info',
});
```

### Basic Setup (Browser)

For client-side applications, use `BrowserHCS2Client` with a wallet connection.

```typescript
import { BrowserHCS2Client } from '@hashgraphonline/standards-sdk/dist/hcs-2';
import { HCS2RegistryType } from '@hashgraphonline/standards-sdk/dist/hcs-2/types';
import { HashinalsWalletConnectSDK } from '@hashgraphonline/hashinal-wc';

// Initialize Hashinals WalletConnect
const hwc = new HashinalsWalletConnectSDK();
await hwc.init(/** wallet connect options */);
await hwc.connect(/** connection options */);

// Initialize the HCS-2 browser client
const browserClient = new BrowserHCS2Client({
  network: 'testnet',
  hwc: hwc,
  logLevel: 'info',
});
```

## Creating a Registry

Create a new topic that will serve as a registry.

```typescript
// Create an indexed registry
const response = await client.createRegistry({
  registryType: HCS2RegistryType.INDEXED,
  ttl: 3600, // Time-to-live in seconds
  memo: 'My Indexed Registry',
  adminKey: true, // Use operator key as admin key
});

if (response.success) {
  console.log(`Registry created with topic ID: ${response.topicId}`);
} else {
  console.error(`Error: ${response.error}`);
}
```

## Managing Registry Entries

### Registering an Entry

Add a new topic to your registry.

```typescript
const registryTopicId = '0.0.12345'; // Your registry topic ID

const registerResponse = await client.registerEntry(registryTopicId, {
  targetTopicId: '0.0.67890', // The topic to register
  metadata: 'https://example.com/metadata.json',
  memo: 'Initial registration',
});

if (registerResponse.success) {
  console.log(`Entry registered. Sequence number: ${registerResponse.sequenceNumber}`);
} else {
  console.error(`Error: ${registerResponse.error}`);
}
```

### Updating an Entry

Update an existing entry in an indexed registry. You need the unique ID (`uid`) of the message, which is typically the `sequence_number` of the registration message.

```typescript
const updateResponse = await client.updateEntry(registryTopicId, {
  uid: '1', // The sequence number of the message to update
  targetTopicId: '0.0.98765', // New target topic
  metadata: 'https://example.com/new-metadata.json',
  memo: 'Updated registration',
});

if (updateResponse.success) {
  console.log(`Entry updated. New sequence number: ${updateResponse.sequenceNumber}`);
} else {
  console.error(`Error: ${updateResponse.error}`);
}
```

### Deleting an Entry

Delete an entry from an indexed registry using its `uid`.

```typescript
const deleteResponse = await client.deleteEntry(registryTopicId, {
  uid: '1', // The sequence number of the message to delete
  memo: 'Entry deleted',
});

if (deleteResponse.success) {
  console.log(`Entry deleted. Sequence number: ${deleteResponse.sequenceNumber}`);
} else {
  console.error(`Error: ${deleteResponse.error}`);
}
```

### Migrating a Registry

Point an entire registry to a new topic. This is useful for versioning or upgrades.

```typescript
const migrateResponse = await client.migrateRegistry(registryTopicId, {
  targetTopicId: '0.0.54321', // The new registry topic
  memo: 'Migrating to new registry',
});

if (migrateResponse.success) {
  console.log(`Registry migrated. Sequence number: ${migrateResponse.sequenceNumber}`);
} else {
  console.error(`Error: ${migrateResponse.error}`);
}
```

## Querying a Registry

Fetch all entries from a registry.

```typescript
const registryData = await client.getRegistry(registryTopicId, {
  limit: 100,
  order: 'asc',
});

console.log(`Registry Type: ${registryData.registryType}`);
console.log(`TTL: ${registryData.ttl}`);

for (const entry of registryData.entries) {
  console.log(`- Sequence: ${entry.sequence}`);
  console.log(`  Timestamp: ${entry.timestamp}`);
  console.log(`  Payer: ${entry.payer}`);
  console.log(`  Message:`, entry.message);
}

if (registryData.latestEntry) {
    console.log(`Latest entry: `, registryData.latestEntry.message);
}
```

## API Reference

### HCS2Client / BrowserHCS2Client

The API is consistent between the Node.js and Browser clients.

#### `createRegistry(options: CreateRegistryOptions): Promise<TopicRegistrationResponse>`
Creates a new HCS-2 registry topic.

#### `registerEntry(registryTopicId: string, options: RegisterEntryOptions): Promise<RegistryOperationResponse>`
Registers a new topic in the registry.

#### `updateEntry(registryTopicId: string, options: UpdateEntryOptions): Promise<RegistryOperationResponse>`
Updates an existing entry in an indexed registry.

#### `deleteEntry(registryTopicId: string, options: DeleteEntryOptions): Promise<RegistryOperationResponse>`
Deletes an entry from an indexed registry.

#### `migrateRegistry(registryTopicId: string, options: MigrateTopicOptions): Promise<RegistryOperationResponse>`
Submits a migration message to a registry topic.

#### `getRegistry(topicId: string, options?: QueryRegistryOptions): Promise<TopicRegistry>`
Retrieves and parses all entries from a registry topic.

### Types

```typescript
enum HCS2RegistryType {
  INDEXED = 0,
  NON_INDEXED = 1
}

interface CreateRegistryOptions {
  memo?: string;
  ttl?: number;
  adminKey?: boolean | string | PrivateKey;
  submitKey?: boolean | string | PrivateKey;
  registryType?: HCS2RegistryType;
}

interface RegisterEntryOptions {
  targetTopicId: string;
  metadata?: string;
  memo?: string;
}

interface UpdateEntryOptions {
  targetTopicId: string;
  uid: string;
  metadata?: string;
  memo?: string;
}

interface DeleteEntryOptions {
  uid: string;
  memo?: string;
}

interface MigrateTopicOptions {
  targetTopicId: string;
  metadata?: string;
  memo?: string;
}

interface QueryRegistryOptions {
  limit?: number;
  order?: 'asc' | 'desc';
  skip?: number;
}
```

