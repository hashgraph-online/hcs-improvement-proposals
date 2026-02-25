---
sidebar_position: 3
---

# Assembly Implementation

Assemblies in HCS-12 provide the composition layer that combines actions and blocks into complete experiences. The Standards SDK implements assemblies using an incremental approach with HCS-2 topic registries.

---

## What It Does

- **Manages assembly state** through incremental operations stored in HCS-2 topics
- **Supports four operation types**: register, add-action, add-block, update
- **Handles action aliasing** for local referencing within assemblies
- **Resolves block and action references** from topic IDs
- **Validates assembly composition** for error-free experiences

---

## Assembly Structure

Assemblies maintain their state through incremental operations stored in HCS-2 topics:

```typescript
interface AssemblyState {
  topicId: string;
  name: string;
  version: string;
  description?: string;
  tags?: string[];
  author?: string;
  actions: AssemblyAction[];
  blocks: AssemblyBlock[];
  created: string;
  updated: string;
}
```

---

## Assembly Operations

Assemblies support four types of operations:

1. **register**: Create a new assembly
2. **add-action**: Add an action to the assembly
3. **add-block**: Add a block to the assembly
4. **update**: Update assembly metadata

```typescript
type AssemblyOperation = 'register' | 'add-action' | 'add-block' | 'update';
```

---

## Using AssemblyBuilder

The SDK provides an `AssemblyBuilder` for creating assemblies:

```typescript
import { AssemblyBuilder } from '@hashgraphonline/standards-sdk';

// Create assembly builder
const assemblyBuilder = new AssemblyBuilder(logger);

// Set basic properties
const assemblyRegistration = assemblyBuilder
  .setName('demo-app')
  .setVersion('1.0.0')
  .setDescription('Demo application showcasing HashLinks')
  .setTags(['demo', 'counter', 'interactive'])
  .setAuthor('0.0.123456')
  .build();

client.initializeRegistries();
await client.createAssemblyTopic();

// Register the assembly
const assemblyResult = await client.registerAssembly(assemblyRegistration);
console.log('Assembly registered:', assemblyResult.id);
```

---

## Adding Actions to Assemblies

Actions are added to assemblies with aliases for local referencing:

```typescript
// Using ActionBuilder to create and add actions
const actionBuilder = new ActionBuilder(logger)
  .setTopicId('0.0.123456')
  .setAlias('counter-actions')
  .setWasmHash(wasmHash)
  .setHash(infoHash);

// Add action to assembly
assemblyBuilder.addAction(actionBuilder);

// To add another action, create another ActionBuilder and pass it
const transferActionBuilder = new ActionBuilder(logger)
  .setTopicId('0.0.123456')
  .setAlias('transfer-action')
  .setWasmHash(wasmHash)
  .setHash(infoHash);
assemblyBuilder.addAction(transferActionBuilder);
```

---

## Adding Blocks to Assemblies

Blocks are added to assemblies with action mappings and attributes:

```typescript
const counterBlockBuilder = new BlockBuilder()
  .setName('hashlink/counter')
  .setTitle('Counter')
  .setCategory('interactive')
  .setTemplateTopicId('0.0.234567')
  .addAttribute('count', 'number', 0)
  .addAttribute('step', 'number', 1)
  .addAttribute('label', 'string', 'Demo Counter')
  .addAction('increment', '0.0.123456')
  .addAction('decrement', '0.0.123456')
  .addAction('reset', '0.0.123456')
  .setTopicId('0.0.234567');

assemblyBuilder.addBlock(counterBlockBuilder);
```

---

## Assembly Registration Process

The complete process for creating an assembly:

```typescript
client.initializeRegistries();

const actionRegistryTopicId = await client.createRegistryTopic(
  RegistryType.ACTION
);
const assemblyTopicId = await client.createAssemblyTopic();

// Step 2: Register assembly metadata
const assemblyRegistration = new AssemblyBuilder(logger)
  .setName('my-assembly')
  .setVersion('1.0.0')
  .setDescription('My first HashLinks assembly')
  .setTags(['demo', 'example'])
  .build();

await client.registerAssemblyDirect(assemblyTopicId, assemblyRegistration);

// Step 3: Add actions
const actionBuilder = new ActionBuilder(logger)
  .setTopicId('0.0.123456')
  .setAlias('my-actions')
  .setWasmHash(wasmHash)
  .setHash(infoHash);

await client.registerAction(actionBuilder);
const actionId = actionBuilder.getTopicId();

// Step 4: Add blocks
const blockBuilder = new BlockBuilder()
  .setName('hashlink/main')
  .setTitle('Main Block')
  .setCategory('widgets')
  .setTemplate(Buffer.from(template))
  .addAction('submit', actionId);
await client.registerBlock(blockBuilder);
const blockTopicId = blockBuilder.getTopicId();

// Step 5: Compose the assembly
await client.addActionToAssembly(assemblyTopicId, {
  p: 'hcs-12',
  op: 'add-action',
  t_id: actionId,
  alias: 'main-actions',
});

await client.addBlockToAssembly(assemblyTopicId, {
  p: 'hcs-12',
  op: 'add-block',
  block_t_id: blockTopicId,
  actions: {
    submit: actionId,
  },
  attributes: {
    title: 'My Block',
  },
});
```

---

## Loading and Resolving Assemblies

Assemblies are loaded and resolved from their topic IDs:

```typescript
client.initializeRegistries({
  action: '0.0.1234501',
  assembly: '0.0.1234502',
});

// Load assembly state
const assembly = await client.loadAssembly('0.0.987654');

console.log('Assembly name:', assembly.state.name);
console.log('Actions count:', assembly.actions.length);
console.log('Blocks count:', assembly.blocks.length);

// Check for resolution errors
assembly.actions.forEach(action => {
  if (action.error) {
    console.error(`Action resolution error: ${action.error}`);
  }
});

assembly.blocks.forEach(block => {
  if (block.error) {
    console.error(`Block resolution error: ${block.error}`);
  }
});
```

---

## Assembly Validation

The SDK provides validation for assembly composition:

```typescript
import { assemblyMessageSchema, safeValidate } from '@hashgraphonline/standards-sdk';

// Validate assembly operation payload
const validation = safeValidate(assemblyMessageSchema, {
  p: 'hcs-12',
  op: 'register',
  name: 'counter-app',
  version: '1.0.0',
});

if (!validation.success) {
  console.error('Assembly validation failed:', validation.errors);
} else {
  console.log('Assembly is valid and can be composed');
}
```

---

## Updating Assembly Metadata

Assembly metadata can be updated after creation:

```typescript
// Update assembly description and tags
await client.updateAssembly(assemblyTopicId, {
  p: 'hcs-12',
  op: 'update',
  description: 'Updated description',
  tags: ['demo', 'updated', 'interactive'],
});
```

---

## Assembly State Management

The SDK manages assembly state incrementally:

```typescript
client.initializeRegistries({
  assembly: '0.0.1234502',
});

// Get current assembly state
const currentState = await client.getAssemblyState('0.0.1234502');
```

---

## Assembly Engine

The assembly engine handles complex assembly operations:

```typescript
import { assemblyMessageSchema, safeValidate } from '@hashgraphonline/standards-sdk';

client.initializeRegistries({
  action: '0.0.1234501',
  assembly: '0.0.1234502',
});

// Load and resolve assembly in one operation
const assembly = await client.loadAssembly('0.0.987654');

// Validate an assembly message payload before submission
const candidate = { p: 'hcs-12', op: 'update', description: 'Next release' };
const validation = safeValidate(assemblyMessageSchema, candidate);
console.log(validation.success);
```

---

## Error Handling

The SDK provides comprehensive error handling for assemblies:

```typescript
client.initializeRegistries({
  action: '0.0.1234501',
  assembly: '0.0.1234502',
});

try {
  const assembly = await client.loadAssembly('0.0.987654');
  const actionErrors = assembly.actions.filter(a => !!a.error);
  const blockErrors = assembly.blocks.filter(b => !!b.error);
  if (actionErrors.length > 0 || blockErrors.length > 0) {
    console.warn('Assembly has resolution errors', { actionErrors, blockErrors });
  }
} catch (error) {
  console.error('Failed to load assembly:', error.message);
}
```

---

## Best Practices

- **Incremental Design**: Use the incremental approach for flexible assembly evolution
- **Clear Aliases**: Use descriptive aliases for actions to improve readability
- **Validation**: Always validate assemblies before deployment
- **Error Handling**: Handle resolution errors gracefully
- **Caching**: Use caching for frequently accessed assemblies
- **Versioning**: Follow semantic versioning for assemblies
- **Documentation**: Provide clear descriptions and tags for discovery
- **Security**: Validate all action and block references
