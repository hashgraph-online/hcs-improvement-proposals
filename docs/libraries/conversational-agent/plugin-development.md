---
title: Plugin Development Guide
description: Create custom plugins for the Hashgraph Online Conversational Agent
keywords: [plugin, development, hedera, agent, tools, custom, extension]
---

# Plugin Development Guide

This guide explains how to create custom plugins for the Hashgraph Online Conversational Agent.

## Table of Contents

1. [Plugin Architecture](#plugin-architecture)
2. [Creating a Basic Plugin](#creating-a-basic-plugin)
3. [Tool Development](#tool-development)
4. [State Management](#state-management)
5. [Testing Your Plugin](#testing-your-plugin)
6. [Real-World Examples](#real-world-examples)
7. [Best Practices](#best-practices)

## Plugin Architecture

Plugins in the conversational agent extend the `BasePlugin` class from `hedera-agent-kit`. Each plugin:

- Has a unique name and description
- Provides a set of tools that the AI agent can use
- Can maintain its own state
- Integrates seamlessly with the conversational agent

### Plugin Lifecycle

1. **Construction**: Plugin is instantiated
2. **Registration**: Plugin is added to the agent's plugin list
3. **Initialization**: `initialize()` is called when the agent starts
4. **Tool Discovery**: Agent calls `getTools()` to discover available tools
5. **Execution**: Tools are executed as needed during conversations

## Creating a Basic Plugin

Here's a step-by-step guide to creating your first plugin:

### Step 1: Set Up Your Project Structure

```
my-plugin/
├── src/
│   ├── MyPlugin.ts
│   ├── tools/
│   │   ├── Tool1.ts
│   │   └── Tool2.ts
│   └── index.ts
├── package.json
└── tsconfig.json
```

### Step 2: Create the Plugin Class

```typescript
// src/MyPlugin.ts
import {
  GenericPluginContext,
  HederaTool,
  BasePlugin,
  HederaAgentKit,
} from 'hedera-agent-kit';
import { MyFirstTool } from './tools/MyFirstTool';
import { MySecondTool } from './tools/MySecondTool';
import { MyBuilder } from './builders/MyBuilder';

export class MyPlugin extends BasePlugin {
  id = 'my-plugin';
  name = 'My Plugin';
  description = 'A custom plugin that does amazing things';
  version = '1.0.0';
  author = 'Your Name';
  namespace = 'myplugin';

  private tools: HederaTool[] = [];

  override async initialize(context: GenericPluginContext): Promise<void> {
    await super.initialize(context);

    const hederaKit = context.config.hederaKit as HederaAgentKit;
    if (!hederaKit) {
      this.context.logger.warn(
        'HederaKit not found in context. Plugin tools will not be available.'
      );
      return;
    }

    try {
      this.initializeTools();
      
      this.context.logger.info(
        `${this.name} initialized successfully`
      );
    } catch (error) {
      this.context.logger.error(
        `Failed to initialize ${this.name}:`,
        error
      );
    }
  }

  private initializeTools(): void {
    const hederaKit = this.context.config.hederaKit as HederaAgentKit;
    if (!hederaKit) {
      throw new Error('HederaKit not found in context config');
    }

    // Create your builder if needed
    const myBuilder = new MyBuilder(hederaKit);

    this.tools = [
      new MyFirstTool({
        hederaKit: hederaKit,
        myBuilder: myBuilder,
        logger: this.context.logger,
      }),
      new MySecondTool({
        hederaKit: hederaKit,
        myBuilder: myBuilder,
        logger: this.context.logger,
      }),
    ];
  }

  getTools(): HederaTool[] {
    return this.tools;
  }

  override async cleanup(): Promise<void> {
    this.tools = [];
    if (this.context?.logger) {
      this.context.logger.info(`${this.name} cleaned up`);
    }
  }
}
```

### Step 3: Export Your Plugin

```typescript
// src/index.ts
export { MyPlugin } from './MyPlugin';
export * from './tools';
```

## Tool Development

Tools in the Hashgraph Online Conversational Agent follow a specific pattern that integrates with hedera-agent-kit. Each tool should:

- Extend either `BaseHederaTransactionTool` (for write operations) or `BaseHederaQueryTool` (for read operations)
- Have a clear, descriptive name
- Define its input schema using Zod
- Implement the required methods

### Transaction Tool Structure

For tools that perform Hedera transactions (write operations), extend `BaseHederaTransactionTool`. The base class automatically adds transaction metadata options like memo, scheduling, and node selection to your schema:

```typescript
// src/tools/MyTransactionTool.ts
import { z } from 'zod';
import {
  BaseHederaTransactionTool,
  BaseHederaTransactionToolParams,
} from 'hedera-agent-kit';
import { BaseServiceBuilder } from 'hedera-agent-kit';

const MyToolSchema = z.object({
  tokenId: z.string().describe('The token ID (e.g., "0.0.xxxx")'),
  amount: z.number().describe('Amount to transfer'),
  recipientId: z.string().describe('Recipient account ID'),
});

export class MyTransactionTool extends BaseHederaTransactionTool<
  typeof MyToolSchema
> {
  name = 'my-transfer-tool';
  description = 'Transfers tokens between accounts';
  specificInputSchema = MyToolSchema;
  namespace = 'custom';
  
  // Optional: Set to true if tool requires multiple transactions
  requiresMultipleTransactions = false;
  
  // Optional: Set to true to prevent scheduling
  neverScheduleThisTool = false;

  constructor(params: BaseHederaTransactionToolParams) {
    super(params);
  }

  protected getServiceBuilder(): BaseServiceBuilder {
    // Return the appropriate service builder
    // Options: hts(), hcs(), accounts(), fs(), scs()
    return this.hederaKit.hts();
  }

  protected async callBuilderMethod(
    builder: BaseServiceBuilder,
    specificArgs: z.infer<typeof MyToolSchema>
  ): Promise<void> {
    // Implement the actual transaction logic
    // The builder handles transaction signing and execution
    await (builder as any).transferTokens({
      transfers: [{
        tokenId: specificArgs.tokenId,
        accountId: specificArgs.recipientId,
        amount: specificArgs.amount
      }]
    });
  }
}
```

### Query Tool Structure

For tools that read data from Hedera (no transactions), extend `BaseHederaQueryTool`:

```typescript
// src/tools/MyQueryTool.ts
import { z } from 'zod';
import {
  BaseHederaQueryTool,
  BaseHederaQueryToolParams,
} from 'hedera-agent-kit';

const MyQuerySchema = z.object({
  accountId: z.string().describe('Account ID to query (e.g., "0.0.xxxx")'),
  includeTokens: z.boolean().optional().describe('Include token balances'),
});

export class MyQueryTool extends BaseHederaQueryTool<
  typeof MyQuerySchema,
  any // Return type
> {
  name = 'my-account-query';
  description = 'Queries account information from Hedera';
  specificInputSchema = MyQuerySchema;
  namespace = 'custom';

  constructor(params: BaseHederaQueryToolParams) {
    super(params);
  }

  protected async executeQuery(
    args: z.infer<typeof MyQuerySchema>
  ): Promise<any> {
    // Implement the query logic
    const accountInfo = await this.hederaKit.query().getAccountInfo(
      args.accountId
    );

    if (args.includeTokens) {
      // Additional logic for token balances
      const tokens = await this.hederaKit.query().getAccountTokens(
        args.accountId
      );
      
      return {
        ...accountInfo,
        tokens,
      };
    }

    return accountInfo;
  }
}
```

### Service Builders

The hedera-agent-kit provides several service builders for different Hedera services:

- `hts()` - Hedera Token Service (tokens, NFTs)
- `hcs()` - Hedera Consensus Service (topics, messages)
- `accounts()` - Account management operations
- `fs()` - File Service operations
- `scs()` - Smart Contract Service operations
- `query()` - Read-only query operations

Example using different builders:

```typescript
// HTS Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.hts();
}

// HCS Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.hcs();
}

// Account Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.accounts();
}
```

### Adding Dynamic Forms (FormValidatable)

Tools can request a UI form when required fields are missing by implementing the `FormValidatable` interface. The Conversational Agent detects this and wraps your tool with a form generator automatically (focused Zod schemas supported).

```ts
import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from 'hedera-agent-kit';
import type { FormValidatable } from '@hashgraphonline/standards-agent-kit';

const MetadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  creator: z.string().min(1),
  attributes: z.array(z.object({ trait_type: z.string(), value: z.union([z.string(), z.number()]) })).optional(),
});

export class CollectMetadataTool
  extends BaseHederaQueryTool<typeof MetadataSchema, string>
  implements FormValidatable
{
  name = 'collect-metadata';
  description = 'Collects NFT-style metadata from the user.';
  specificInputSchema = MetadataSchema;

  constructor(params: BaseHederaQueryToolParams) { super(params); }

  shouldGenerateForm(input: unknown): boolean {
    const v = (input || {}) as Record<string, unknown>;
    const nonEmpty = (s: unknown) => typeof s === 'string' && s.trim().length > 0;
    const complete = nonEmpty(v.name) && nonEmpty(v.description) && nonEmpty(v.creator);
    return !complete && v['renderForm'] !== false; // allow bypass with renderForm=false
  }

  getFormSchema(): z.ZodSchema { return MetadataSchema; }
  getEssentialFields(): string[] { return ['name', 'description', 'creator']; }
  isFieldEmpty(_field: string, value: unknown): boolean {
    if (Array.isArray(value)) return value.length === 0;
    return !(typeof value === 'string' && value.trim().length > 0);
  }

  protected async executeQuery(args: z.infer<typeof MetadataSchema>): Promise<string> {
    return JSON.stringify({ success: true, metadata: args });
  }
}
```

### Accepting Content References in Tools

Use `contentRef` to accept large payloads by reference and resolve bytes via the shared resolver.

```ts
import { z } from 'zod';
import { BaseHederaQueryTool, BaseHederaQueryToolParams } from 'hedera-agent-kit';
import { ContentResolverRegistry } from '@hashgraphonline/standards-sdk';

const SummarizeContentSchema = z.object({
  url: z.string().url().optional(),
  contentRef: z.string().optional(),
  base64Data: z.string().optional(),
});

export class SummarizeContentTool extends BaseHederaQueryTool<
  typeof SummarizeContentSchema,
  string
> {
  name = 'summarize-content';
  description = 'Fetches/resolves content (url/contentRef/base64) and summarizes it.';
  specificInputSchema = SummarizeContentSchema;

  constructor(params: BaseHederaQueryToolParams) { super(params); }

  protected async executeQuery(args: z.infer<typeof SummarizeContentSchema>): Promise<string> {
    let buffer: Buffer | null = null;
    let mimeType: string | undefined;

    if (args.contentRef) {
      const resolver = ContentResolverRegistry.getResolver();
      if (!resolver) throw new Error('No content resolver registered');
      const res = await resolver.resolveReference(args.contentRef);
      buffer = res.content;
      mimeType = res.metadata?.mimeType;
    } else if (args.base64Data) {
      buffer = Buffer.from(args.base64Data, 'base64');
    } else if (args.url) {
      const r = await fetch(args.url);
      buffer = Buffer.from(new Uint8Array(await r.arrayBuffer()));
      mimeType = r.headers.get('content-type') || undefined;
    } else {
      throw new Error('Provide url, contentRef, or base64Data');
    }

    return JSON.stringify({ success: true, bytes: buffer!.length, mimeType });
  }
}
```

### Returning HashLink Blocks in Tool Output

If your tool produces an artifact that should render as a HashLink block (HCS‑12), include a `hashLinkBlock` in the JSON string you return. The agent will surface it via `response.metadata.hashLinkBlock`.

```ts
function makeHashLinkBlock(blockId: string, attributes: Record<string, unknown>) {
  return { blockId, hashLink: `hcs://12/${blockId}`, template: blockId, attributes };
}

// Example inside your tool
const payload = {
  success: true,
  result: { /* domain data */ },
  hashLinkBlock: makeHashLinkBlock('0.0.6617393', {
    name: 'Sunset #42',
    creator: '0.0.123456',
    topicId: '0.0.999999',
    hrl: 'hcs://1/0.0.999999',
    network: 'testnet',
  }),
};
return JSON.stringify(payload);
```

### Cooperating with Smart Memory

Emit canonical IDs/HRLs so the agent can store entity associations. With hedera-agent-kit base tools, you can also call the optional callback when you create entities:

```ts
this.onEntityCreated?.({
  entityId: '0.0.999999',
  entityName: args.name || 'Unnamed',
  entityType: 'topicId',
  transactionId: result.txId,
});

// Or return JSON with IDs/HRLs so the agent’s extractor can persist them:
return JSON.stringify({ success: true, topicId: '0.0.999999', hrl: 'hcs://1/0.0.999999', name: 'My Topic' });
```

## State Management

If your plugin needs to maintain state across tool executions, you can use the state manager:

### Using the Built-in State Manager

```typescript
// src/StatefulPlugin.ts
import { BasePlugin, ToolBase } from 'hedera-agent-kit';
import { IStateManager } from '@hashgraphonline/standards-agent-kit';

export class StatefulPlugin extends BasePlugin {
  name = 'StatefulPlugin';
  description = 'A plugin that maintains state';
  private stateManager: IStateManager;

  constructor(stateManager: IStateManager) {
    super();
    this.stateManager = stateManager;
  }

  getTools(): ToolBase[] {
    return [
      new StatefulTool(this.stateManager),
    ];
  }
}

class StatefulTool extends ToolBase {
  name = 'statefulOperation';
  description = 'Performs operations while maintaining state';
  private stateManager: IStateManager;

  constructor(stateManager: IStateManager) {
    super();
    this.stateManager = stateManager;
  }

  inputSchema = z.object({
    key: z.string().describe('State key'),
    value: z.string().optional().describe('Value to store'),
  });

  async _run(input: z.infer<typeof this.inputSchema>): Promise<string> {
    const { key, value } = input;

    if (value !== undefined) {
      // Store value
      await this.stateManager.set(key, value);
      return `Stored value '${value}' with key '${key}'`;
    } else {
      // Retrieve value
      const storedValue = await this.stateManager.get(key);
      return storedValue 
        ? `Retrieved value: ${storedValue}`
        : `No value found for key '${key}'`;
    }
  }
}
```


## Real-World Examples

### Example 1: Topic Message Plugin

```typescript
// src/TopicMessagePlugin.ts
import {
  GenericPluginContext,
  HederaTool,
  BasePlugin,
  HederaAgentKit,
} from 'hedera-agent-kit';
import { SendTopicMessageTool } from './tools/SendTopicMessageTool';
import { QueryTopicMessagesTool } from './tools/QueryTopicMessagesTool';

export class TopicMessagePlugin extends BasePlugin {
  id = 'topic-message';
  name = 'Topic Message Plugin';
  description = 'Send and query messages from HCS topics';
  version = '1.0.0';
  author = 'Your Name';
  namespace = 'topic';

  private tools: HederaTool[] = [];

  override async initialize(context: GenericPluginContext): Promise<void> {
    await super.initialize(context);

    const hederaKit = context.config.hederaKit as HederaAgentKit;
    if (!hederaKit) {
      this.context.logger.warn('HederaKit not found in context.');
      return;
    }

    try {
      this.initializeTools();
      this.context.logger.info(`${this.name} initialized successfully`);
    } catch (error) {
      this.context.logger.error(`Failed to initialize ${this.name}:`, error);
    }
  }

  private initializeTools(): void {
    const hederaKit = this.context.config.hederaKit as HederaAgentKit;
    if (!hederaKit) {
      throw new Error('HederaKit not found in context config');
    }

    this.tools = [
      new SendTopicMessageTool({ hederaKit }),
      new QueryTopicMessagesTool({ hederaKit }),
    ];
  }

  getTools(): HederaTool[] {
    return this.tools;
  }

  override async cleanup(): Promise<void> {
    this.tools = [];
    if (this.context?.logger) {
      this.context.logger.info(`${this.name} cleaned up`);
    }
  }
}

// src/tools/SendTopicMessageTool.ts
import { z } from 'zod';
import {
  BaseHederaTransactionTool,
  BaseHederaTransactionToolParams,
  BaseServiceBuilder,
} from 'hedera-agent-kit';

const SendTopicMessageSchema = z.object({
  topicId: z.string().describe('Topic ID (e.g., "0.0.xxxx")'),
  message: z.string().describe('Message to send to the topic'),
});

export class SendTopicMessageTool extends BaseHederaTransactionTool<
  typeof SendTopicMessageSchema
> {
  name = 'send-topic-message';
  description = 'Send a message to an HCS topic';
  specificInputSchema = SendTopicMessageSchema;
  namespace = 'topic';

  constructor(params: BaseHederaTransactionToolParams) {
    super(params);
  }

  protected getServiceBuilder(): BaseServiceBuilder {
    return this.hederaKit.hcs();
  }

  protected async callBuilderMethod(
    builder: BaseServiceBuilder,
    specificArgs: z.infer<typeof SendTopicMessageSchema>
  ): Promise<void> {
    await (builder as any).submitMessageToTopic({
      topicId: specificArgs.topicId,
      message: specificArgs.message,
    });
  }
}
```

### Example 2: NFT Collection Plugin

```typescript
// src/NFTCollectionPlugin.ts
import {
  GenericPluginContext,
  HederaTool,
  BasePlugin,
  HederaAgentKit,
} from 'hedera-agent-kit';
import { CreateNFTCollectionTool } from './tools/CreateNFTCollectionTool';
import { MintNFTTool } from './tools/MintNFTTool';
import { QueryNFTTool } from './tools/QueryNFTTool';

export class NFTCollectionPlugin extends BasePlugin {
  id = 'nft-collection';
  name = 'NFT Collection Plugin';
  description = 'Create and manage NFT collections on Hedera';
  version = '1.0.0';
  author = 'Your Name';
  namespace = 'nft';

  private tools: HederaTool[] = [];

  // ... initialize method similar to previous example ...

  private initializeTools(): void {
    const hederaKit = this.context.config.hederaKit as HederaAgentKit;
    if (!hederaKit) {
      throw new Error('HederaKit not found in context config');
    }

    this.tools = [
      new CreateNFTCollectionTool({ hederaKit }),
      new MintNFTTool({ hederaKit }),
      new QueryNFTTool({ hederaKit }),
    ];
  }

  getTools(): HederaTool[] {
    return this.tools;
  }
}

// src/tools/MintNFTTool.ts
import { z } from 'zod';
import {
  BaseHederaTransactionTool,
  BaseHederaTransactionToolParams,
  BaseServiceBuilder,
} from 'hedera-agent-kit';

const MintNFTSchema = z.object({
  tokenId: z.string().describe('The NFT collection token ID (e.g., "0.0.xxxx")'),
  metadata: z.array(z.string()).describe(
    'Array of metadata for each NFT (strings or base64 encoded)'
  ),
  batchSize: z.number().optional().describe(
    'Max NFTs per transaction (default: 10)'
  ),
});

export class MintNFTTool extends BaseHederaTransactionTool<
  typeof MintNFTSchema
> {
  name = 'mint-nft';
  description = 'Mint new NFTs in an existing collection';
  specificInputSchema = MintNFTSchema;
  namespace = 'nft';

  constructor(params: BaseHederaTransactionToolParams) {
    super(params);
  }

  protected getServiceBuilder(): BaseServiceBuilder {
    return this.hederaKit.hts();
  }

  protected async callBuilderMethod(
    builder: BaseServiceBuilder,
    specificArgs: z.infer<typeof MintNFTSchema>
  ): Promise<void> {
    await (builder as any).mintNonFungibleToken({
      tokenId: specificArgs.tokenId,
      metadata: specificArgs.metadata,
      batchSize: specificArgs.batchSize || 10,
    });
  }
}

// src/tools/QueryNFTTool.ts
import { z } from 'zod';
import {
  BaseHederaQueryTool,
  BaseHederaQueryToolParams,
} from 'hedera-agent-kit';

const QueryNFTSchema = z.object({
  tokenId: z.string().describe('The NFT collection token ID'),
  serialNumber: z.number().optional().describe('Specific NFT serial number'),
});

export class QueryNFTTool extends BaseHederaQueryTool<
  typeof QueryNFTSchema,
  any
> {
  name = 'query-nft';
  description = 'Query NFT information';
  specificInputSchema = QueryNFTSchema;
  namespace = 'nft';

  constructor(params: BaseHederaQueryToolParams) {
    super(params);
  }

  protected async executeQuery(
    args: z.infer<typeof QueryNFTSchema>
  ): Promise<any> {
    if (args.serialNumber) {
      // Query specific NFT
      return await this.hederaKit.query().getNftInfo(
        args.tokenId,
        args.serialNumber
      );
    } else {
      // Query collection info
      return await this.hederaKit.query().getTokenInfo(
        args.tokenId
      );
    }
  }
}
```

