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

For tools that perform Hedera transactions (write operations), extend `BaseHederaTransactionTool`:

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

  constructor(params: BaseHederaTransactionToolParams) {
    super(params);
  }

  protected getServiceBuilder(): BaseServiceBuilder {
    // Return the appropriate service builder
    // Options: hts(), consensus(), account(), file(), contract()
    return this.hederaKit.hts();
  }

  protected async callBuilderMethod(
    builder: BaseServiceBuilder,
    specificArgs: z.infer<typeof MyToolSchema>
  ): Promise<void> {
    // Implement the actual transaction logic
    // The builder handles transaction signing and execution
    await (builder as any).transferToken({
      tokenId: specificArgs.tokenId,
      amount: specificArgs.amount,
      recipientId: specificArgs.recipientId,
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

  protected async performQuery(
    args: z.infer<typeof MyQuerySchema>
  ): Promise<any> {
    // Implement the query logic
    const accountInfo = await this.hederaKit.account().getAccountInfo({
      accountId: args.accountId,
    });

    if (args.includeTokens) {
      // Additional logic for token balances
      const tokens = await this.hederaKit.account().getTokenBalances({
        accountId: args.accountId,
      });
      
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
- `consensus()` - Hedera Consensus Service (topics, messages)
- `account()` - Account management
- `file()` - File Service operations
- `contract()` - Smart Contract operations

Example using different builders:

```typescript
// HTS Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.hts();
}

// Consensus Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.consensus();
}

// Account Builder example
protected getServiceBuilder(): BaseServiceBuilder {
  return this.hederaKit.account();
}
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

## Testing Your Plugin

Here's how to test your plugin both in isolation and with the conversational agent:

### Unit Testing Tools

```typescript
// tests/MyFirstTool.test.ts
import { describe, it, expect } from 'vitest';
import { MyFirstTool } from '../src/tools/MyFirstTool';

describe('MyFirstTool', () => {
  it('should process message correctly', async () => {
    const tool = new MyFirstTool();
    
    const result = await tool._run({
      message: 'Hello',
      count: 3,
    });
    
    expect(result).toContain('Successfully processed');
    expect(result).toContain('Hello (1)');
    expect(result).toContain('Hello (2)');
    expect(result).toContain('Hello (3)');
  });

  it('should handle errors gracefully', async () => {
    const tool = new MyFirstTool();
    
    // Force an error by passing invalid input
    const result = await tool._run({
      message: null as any,
      count: 1,
    });
    
    expect(result).toContain('Error:');
  });
});
```

### Integration Testing with Conversational Agent

```typescript
// tests/integration.test.ts
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import { MyPlugin } from '../src/MyPlugin';
import { config } from 'dotenv';

config(); // Load environment variables

describe('MyPlugin Integration', () => {
  let agent: ConversationalAgent;

  beforeAll(async () => {
    agent = new ConversationalAgent({
      accountId: process.env.HEDERA_ACCOUNT_ID!,
      privateKey: process.env.HEDERA_PRIVATE_KEY!,
      network: 'testnet',
      openAIApiKey: process.env.OPENAI_API_KEY!,
      additionalPlugins: [new MyPlugin()],
    });

    await agent.initialize();
  });

  it('should use custom tool through conversation', async () => {
    const response = await agent.processMessage(
      'Use myFirstTool with message "Test" and count 2'
    );

    expect(response.response).toContain('Successfully processed');
    expect(response.response).toContain('Test');
  });
});
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
    return this.hederaKit.consensus();
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

  protected async performQuery(
    args: z.infer<typeof QueryNFTSchema>
  ): Promise<any> {
    if (args.serialNumber) {
      // Query specific NFT
      return await this.hederaKit.hts().getNftInfo({
        tokenId: args.tokenId,
        serialNumber: args.serialNumber,
      });
    } else {
      // Query collection info
      return await this.hederaKit.hts().getTokenInfo({
        tokenId: args.tokenId,
      });
    }
  }
}
```

## Best Practices

### 1. Clear Tool Naming

Choose descriptive, action-oriented names for your tools:

```typescript
// Good
'createInvoice'
'searchCustomers'
'calculateTax'

// Avoid
'invoice'
'customer'
'tax'
```

### 2. Comprehensive Input Validation

Always validate inputs thoroughly:

```typescript
inputSchema = z.object({
  email: z.string().email().describe('Valid email address'),
  age: z.number().min(0).max(150).describe('Age in years'),
  url: z.string().url().optional().describe('Optional website URL'),
});
```

### 3. Error Handling

Always return meaningful error messages:

```typescript
async _run(input: z.infer<typeof this.inputSchema>): Promise<string> {
  try {
    // Tool logic
  } catch (error) {
    // Provide context-specific error messages
    if (error.code === 'ENOENT') {
      return 'Error: File not found';
    } else if (error.code === 'EACCES') {
      return 'Error: Permission denied';
    } else {
      return `Unexpected error: ${error.message}`;
    }
  }
}
```

### 4. Async Operations

Handle async operations properly:

```typescript
async _run(input: z.infer<typeof this.inputSchema>): Promise<string> {
  try {
    // Use Promise.all for parallel operations
    const [result1, result2] = await Promise.all([
      this.operation1(input),
      this.operation2(input),
    ]);
    
    // Use proper timeout handling
    const resultWithTimeout = await Promise.race([
      this.longOperation(input),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), 30000)
      ),
    ]);
    
    return 'Success';
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
```

### 5. Documentation

Document your tools thoroughly:

```typescript
export class ComplexTool extends ToolBase {
  name = 'performComplexOperation';
  description = `Performs a complex operation that:
    - Validates input data against business rules
    - Processes the data through multiple stages
    - Returns a formatted result
    
    Use this tool when you need to process structured data
    with specific business logic requirements.`;

  inputSchema = z.object({
    data: z.object({
      id: z.string().describe('Unique identifier for the data'),
      type: z.enum(['A', 'B', 'C']).describe('Type of operation to perform'),
      metadata: z.record(z.any()).optional().describe('Additional metadata'),
    }).describe('The data object to process'),
    options: z.object({
      validate: z.boolean().default(true).describe('Whether to validate data'),
      format: z.enum(['json', 'xml', 'csv']).default('json').describe('Output format'),
    }).optional().describe('Processing options'),
  });
}
```

### 6. Testing Considerations

- Test edge cases and error scenarios
- Mock external dependencies
- Test with the actual conversational agent
- Verify tool descriptions are clear to the AI

### 7. Performance Optimization

- Cache expensive operations when appropriate
- Implement proper connection pooling for databases
- Use streaming for large data operations
- Set reasonable timeouts

## Publishing Your Plugin

Once your plugin is ready, you can publish it for others to use:

1. **Package.json Configuration**:
```json
{
  "name": "@yourorg/conversational-agent-plugin-weather",
  "version": "1.0.0",
  "description": "Weather plugin for Hashgraph Online Conversational Agent",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "hedera-agent-kit": "^2.0.3",
    "@hashgraphonline/conversational-agent": "^0.0.5"
  }
}
```

2. **Build and Publish**:
```bash
npm run build
npm publish --access public
```

3. **Usage Documentation**:
```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';
import { WeatherPlugin } from '@yourorg/conversational-agent-plugin-weather';

const agent = new ConversationalAgent({
  // ... config
  additionalPlugins: [
    new WeatherPlugin(process.env.WEATHER_API_KEY!)
  ]
});
```

## Conclusion

Creating plugins for the Hashgraph Online Conversational Agent allows you to extend its capabilities in powerful ways. By following these guidelines and best practices, you can create robust, reusable plugins that enhance the agent's functionality.

For more examples and the latest updates, visit the [GitHub repository](https://github.com/hashgraph-online/conversational-agent).