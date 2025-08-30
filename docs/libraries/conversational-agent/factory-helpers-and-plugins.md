---
title: Factory Helpers & Plugins
description: Quickly scope agent capabilities with convenient helpers and plugin filters
---

Overview
- Use static helpers to spin up an agent with a focused set of tools.
- Combine with `toolFilter` and `enabledPlugins` for precise control.

Helpers
```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

// Only HTS (token service) tools
const htsAgent = ConversationalAgent.withHTS({ /* config */ });

// Only HCS-2 (topic registry) tools
const hcs2Agent = ConversationalAgent.withHCS2({ /* config */ });

// Only HCS-10 (agent comms) tools
const hcs10Agent = ConversationalAgent.withHCS10({ /* config */ });

// Only inscription tools
const inscribeAgent = ConversationalAgent.withInscribe({ /* config */ });

// Smart contracts focused
const contractsAgent = ConversationalAgent.withSmartContract({ /* config */ });

// All standards plugins
const fullAgent = ConversationalAgent.withAllStandards({ /* config */ });

// Add MCP servers in one call
const mcpAgent = ConversationalAgent.withMCP({ /* config */ }, [/* servers */]);
```

Plugin Filters
```typescript
const agent = new ConversationalAgent({
  // ...
  enabledPlugins: ['hcs-2', 'inscribe'],
  toolFilter: (tool) => tool.name !== 'hedera-account-transfer-hbar',
});
```

Notes
- Prefer helpers for clean intent; fall back to `enabledPlugins` for advanced mixes.
- Use `toolFilter` to exclude sensitive operations in production.

