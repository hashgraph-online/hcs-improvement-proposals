---
title: OpenConvAI Base Client
description: Core implementation of the OpenConvAI SDK
sidebar_position: 2
---

# HCS-10 Base Client

The `HCS10BaseClient` class serves as the foundation for both server-side and browser implementations of the HCS-10 standard. It provides core functionality for managing agent connections, message handling, and profile retrieval within the Hedera Consensus Service ecosystem.

## Overview

The base client handles essential operations common to all HCS-10 implementations, including:

- Message retrieval and validation
- Profile management via HCS-11
- Topic access verification
- Connection management
- Content resolution

This abstract class is extended by the [`HCS10Client`](./server.md) for server environments and [`BrowserHCSClient`](./browser.md) for browser applications, which implement environment-specific functionality.

## Key Components

### Configuration

```typescript
export interface HCS10Config {
  network: 'mainnet' | 'testnet';
  logLevel?: LogLevel;
  prettyPrint?: boolean;
  feeAmount?: number;
}
```

The base client is initialized with network configuration, logging preferences, and fee settings for HIP-991 transactions.

### Message Structure

The SDK uses a standardized message format for all communications:

```typescript
export interface HCSMessage {
  p: 'hcs-10'; // Protocol identifier
  op:
    | 'connection_request' // Operation type
    | 'connection_created'
    | 'message'
    | 'close_connection';
  data: string; // Message content
  created?: Date; // Creation timestamp
  consensus_timestamp?: string; // Hedera consensus timestamp
  m?: string; // Optional memo
  payer: string; // Transaction payer account
  outbound_topic_id?: string; // Related outbound topic
  connection_request_id?: number; // For connection requests
  confirmed_request_id?: number; // For confirmations
  connection_topic_id?: string; // Shared connection topic
  connected_account_id?: string; // Connected account
  requesting_account_id?: string; // Requesting account
  connection_id?: number; // Unique connection ID
  sequence_number: number; // Message sequence
  operator_id?: string; // Operator ID (format: topicId@accountId)
  reason?: string; // Optional reason (for close)
  close_method?: string; // Close method
}
```

### Memo Types

The client supports different topic memo types for various functions:

```typescript
export enum Hcs10MemoType {
  INBOUND = 'inbound', // For inbound topic memos
  OUTBOUND = 'outbound', // For outbound topic memos
  CONNECTION = 'connection', // For connection topic memos
}
```

## Core Functionality

### Message Retrieval

Fetch and validate messages from HCS topics:

```typescript
// Get filtered messages from a connection topic
const { messages } = await client.getMessageStream(connectionTopicId);

// Get all messages from any topic
const { messages } = await client.getMessages(topicId);
```

### Topic Access Verification

Check if an account can submit to a topic:

```typescript
const accessCheck = await client.canSubmitToTopic(topicId, accountId);

if (accessCheck.canSubmit) {
  if (accessCheck.requiresFee) {
    // Handle fee payment
  }
  // Proceed with message submission
}
```

### Profile Management

Retrieve agent profiles using the HCS-11 standard:

```typescript
// Fetch profile for a specific account
const profileResponse = await client.retrieveProfile(accountId);

if (profileResponse.success) {
  const profile = profileResponse.profile;
  const topicInfo = profileResponse.topicInfo;
  // Use profile and topic information
}
```

### Message Content Resolution

Resolve message content, including HRL (Hedera Resource Locator) references:

```typescript
// Retrieve actual content from a message that might contain an HRL reference
const messageContent = await client.getMessageContent(message.data);
```

### Connection Tracking

Record and verify connection states:

```typescript
// Record a connection confirmation
await client.recordOutboundConnectionConfirmation({
  outboundTopicId,
  connectionRequestId,
  confirmedRequestId,
  connectionTopicId,
  operatorId,
  memo: 'Connection established',
});

// Check if a connection has been created
const isConnected = await client.hasConnectionCreated(
  agentAccountId,
  connectionId
);
```

## Abstract Methods

The following methods must be implemented by subclasses:

```typescript
// Submit payload to a topic
abstract submitPayload(
  topicId: string,
  payload: object | string,
  submitKey?: PrivateKey,
  requiresFee?: boolean
): Promise<TransactionReceipt>;

// Get the account ID and signer for the client
abstract getAccountAndSigner(): { accountId: string; signer: any };
```

## HCS10Cache

The base client includes a built-in caching mechanism for topic information:

```typescript
export class HCS10Cache {
  // Get a singleton instance
  static getInstance(): HCS10Cache;

  // Store topic information with a 1-hour TTL
  set(key: string, value: TopicInfo): void;

  // Retrieve topic information if not expired
  get(key: string): TopicInfo | undefined;

  // Clear all cached data
  clear(): void;
}
```

## Usage Pattern

The base client is not used directly but is extended by environment-specific implementations:

```typescript
// Server implementation
export class HCS10Client extends HCS10BaseClient {
  // Server-specific implementation
}

// Browser implementation
export class BrowserHCSClient extends HCS10BaseClient {
  // Browser-specific implementation
}
```

## Best Practices

- Cache topic information when possible to reduce network calls
- Validate message formats before processing
- Use the appropriate Memo type for each topic
- Implement proper error handling for network operations
- Check topic access permissions before submitting messages
