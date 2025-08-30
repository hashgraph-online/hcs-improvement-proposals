---
title: Entity Memory & Smart Memory
description: Persistent entity associations and searchable conversation memory for the Conversational Agent
---

Overview
- Purpose: persist important entities created during a session (topics, tokens, accounts) and keep a searchable conversation history that the agent can leverage for follow‑ups.
- Components: LLM‑based entity extraction, entity associations store, memory window with token budgeting, and content storage with search.

How It Works
- Extraction: after a successful `processMessage`, the agent runs an internal tool `extract_entities` to parse newly created Hedera entities from the response.
- Association: results are normalized and stored with helpful metadata (usage hints, HRL for topics) and a flag `"isEntityAssociation": true` for fast lookup.
- Memory window: a token‑bounded rolling window keeps the most relevant messages available to the LLM while the full content store remains searchable.

Enable/Configure
- Default: `entityMemoryEnabled` is enabled by default.
- Configure limits via `entityMemoryConfig`:
  - `maxTokens`: token cap for the active memory window
  - `reserveTokens`: tokens reserved for response generation
  - `modelName`: model used for token counting
  - `storageLimit`: max messages to persist

```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  openAIApiKey: process.env.OPENAI_API_KEY!,
  // Provider and model
  llmProvider: 'openai', // or 'anthropic'
  openAIModelName: 'gpt-4o',
  // Entity memory
  entityMemoryEnabled: true,
  entityMemoryConfig: { maxTokens: 6000, reserveTokens: 1000, storageLimit: 500 },
});
```

Reading Memory Programmatically
- Access the underlying agent to query memory.

```typescript
// After initialize()
const core = agent.getConversationalAgent(); // LangChainAgent under the hood

// 1) List stored entity associations (optionally filter by type)
const allEntities = core.smartMemory.getEntityAssociations();
const topics = core.smartMemory.getEntityAssociations('topicid');
const tokens = core.smartMemory.getEntityAssociations('tokenid');
const accounts = core.smartMemory.getEntityAssociations('accountid');

// 2) Search conversation/content history
const hits = core.smartMemory.searchHistory('hcs://1/', { limit: 50 });

// 3) Inspect memory stats (token usage, capacity)
const stats = core.smartMemory.getMemoryStats();
```

What Gets Stored
- EntityAssociation fields:
  - `entityId`: Hedera ID (e.g., `0.0.12345`)
  - `entityName`: human‑friendly name
  - `entityType`: e.g., `topicid`, `tokenid`, `accountid`
  - `transactionId?`: transaction that created it
  - `createdAt`: timestamp
- Enrichment:
  - `usage`: quick hint on how to use the entity (e.g., “Use as tokenId for HTS operations”)
  - `hrl`: for topics, an `hcs://1/<topicId>` link is included

Controlling Behavior
- Disable entity memory completely:
```typescript
const agent = new ConversationalAgent({
  // ...
  entityMemoryEnabled: false,
});
```
- Exclude the extraction tool via `toolFilter` if you want custom control:
```typescript
const agent = new ConversationalAgent({
  // ...
  toolFilter: (tool) => tool.name !== 'extract_entities',
});
```

Notes & Best Practices
- Model/provider: configure via `entityMemoryProvider: 'openai' | 'anthropic' | 'openrouter'` and `entityMemoryModelName`. Defaults follow `llmProvider` and choose a sensible model per provider (OpenAI: `gpt-4o-mini`, Anthropic: `claude-3-7-sonnet-latest`, OpenRouter: `openai/gpt-4o-mini`). API key sources: `openRouterApiKey` for OpenRouter (falls back to `openAIApiKey`), `openAIApiKey` for OpenAI/Anthropic.
- Privacy: memory stores conversation content and entity associations. Avoid placing secrets or PII in prompts; sanitize content before persisting.
- Performance: tune `maxTokens` and `reserveTokens` to balance context quality vs. generation space.
- Robustness: only Hedera‑looking IDs are stored as associations; non‑IDs are ignored to reduce noise.
