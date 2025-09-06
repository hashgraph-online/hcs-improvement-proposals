---
title: Entity Memory & Smart Memory
description: Persist entities (topics, tokens, accounts) and keep searchable history the agent can use for follow‑ups
---

What this provides
- A token‑bounded active window for the conversation, plus a searchable long‑term store for pruned messages.
- Automatic entity capture: when tools create on‑chain entities (e.g., InscribeHashinalTool returns a topicId/HRL), the agent stores an association so users can refer to “that last topic” or “my token”.
- Optional LLM extraction: the agent can run an extraction tool over responses to detect entities that weren’t explicitly emitted by the tool.

Enable and configure
- Enabled by default. Control with `entityMemoryEnabled` and `entityMemoryConfig`.

```ts
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  openAIApiKey: process.env.OPENAI_API_KEY!,
  llmProvider: 'openai',                // 'anthropic' | 'openrouter' also supported
  openAIModelName: 'gpt-4o',
  entityMemoryEnabled: true,
  entityMemoryConfig: {
    maxTokens: 6000,
    reserveTokens: 1000,
    storageLimit: 500,
  },
  // Optional: specialize the extraction provider/model
  entityMemoryProvider: 'openai',       // or 'anthropic' | 'openrouter'
  entityMemoryModelName: 'gpt-4o-mini', // defaults are sensible per provider
});
await agent.initialize();
```

Reading memory programmatically
- Use the wrapper’s public `memoryManager` to inspect entities, search history, and view stats.

```ts
// 1) Entity associations (optionally filter by type)
const entities = agent.memoryManager?.getEntityAssociations();
const topics   = agent.memoryManager?.getEntityAssociations('topicId');
const tokens   = agent.memoryManager?.getEntityAssociations('tokenId');
const accounts = agent.memoryManager?.getEntityAssociations('accountId');

// 2) Search long‑term history (outside the active window)
const hits = agent.memoryManager?.searchHistory('hcs://1/', { limit: 50 });

// 3) Inspect active window stats
const stats = agent.memoryManager?.getMemoryStats();
```

What gets stored
- EntityAssociation
  - `entityId`: Hedera ID (e.g., `0.0.12345`)
  - `entityName`: human‑friendly label
  - `entityType`: canonicalized (e.g., `topicId`, `tokenId`, `accountId`)
  - `createdAt`: timestamp; `transactionId?` when available
  - Enrichment: `usage` hints (e.g., “Use as tokenId for HTS operations”), and for topics an `hrl` such as `hcs://1/<topicId>`

Controlling behavior
```ts
// Disable entirely
const agent = new ConversationalAgent({
  /* ... */
  entityMemoryEnabled: false,
});

// Exclude LLM extraction (still keeps explicit tool-emitted entities)
const agent2 = new ConversationalAgent({
  /* ... */
  toolFilter: (tool) => tool.name !== 'extract_entities',
});
```

How InscribeHashinalTool contributes
- On successful inscription, the tool emits the topicId and HRL. The agent stores an association such as `{ entityType: 'topicId', entityId: '0.0.x', hrl: 'hcs://1/0.0.x' }`. This lets users later say “use the Hashinal topic you just created” without re‑pasting IDs.

Best practices
- Respect privacy: Avoid persisting secrets/PII in prompts.
- Tune `maxTokens`/`reserveTokens` for your model size and response lengths.
- Prefer referring to prior artifacts via their names/IDs—the association store makes resolution reliable and cheap.
