---
sidebar_position: 4
---

# Base Client (HCS17BaseClient)

The base client provides the shared core for both Node and browser implementations: message creation/validation, memo helpers, mirror‑node reads, and state hash/fingerprint calculations.

## Responsibilities

- Create and validate HCS‑17 message payloads
- Parse and generate HCS‑17 memo format (`hcs-17:<type>:<ttl>`, numeric enums)
- Query mirror‑node for topic info and messages
- Compute account and composite state hashes
- Calculate deterministic key fingerprints for threshold keys
- Verify state hashes by recomputing input

## Key Methods

```ts
import { HCS17BaseClient } from '@hashgraphonline/standards-sdk';

// Constructed indirectly via Node/Browser clients

// Memo helpers
protected generateTopicMemo(ttl: number): string;
async validateHCS17Topic(topicId: string): Promise<{ valid: boolean; type?: HCS17TopicType; ttl?: number; error?: string }>;

// Mirror‑node queries
async getRecentMessages(topicId: string, opts?: { limit?: number; order?: 'asc' | 'desc' }): Promise<Array<{ message: StateHashMessage; consensus_timestamp?: string; sequence_number: number; payer?: string }>>;
async getLatestMessage(topicId: string): Promise<(StateHashMessage & { consensus_timestamp?: string; sequence_number: number }) | null>;

// Message helpers
public createStateHashMessage(stateHash: string, accountId: string, topicIds: string[], memo?: string): StateHashMessage;
protected validateMessage(message: unknown): { valid: boolean; errors: string[] };

// Hashing
public calculateAccountStateHash(input: AccountStateInput): StateHashResult;
public calculateCompositeStateHash(input: CompositeStateInput): CompositeStateHashResult;
public calculateKeyFingerprint(keys: PublicKey[], threshold: number): string;
public verifyStateHash(input: AccountStateInput | CompositeStateInput, expectedHash: string): Promise<boolean>;
```

## Message Schema

The schema is enforced with zod and validated before submission.

```ts
type StateHashMessage = {
  p: 'hcs-17';
  op: 'state_hash';
  state_hash: string;
  topics: string[];
  account_id: string;
  timestamp?: string;
  m?: string;
};
```

Invalid messages are rejected with detailed errors in `validateMessage`.

