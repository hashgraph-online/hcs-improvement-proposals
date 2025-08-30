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

// Register the assembly
const assemblyTopicId = await client.registerAssembly(assemblyRegistration);
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

// Or add action directly
assemblyBuilder.addAction({
  t_id: '0.0.123456',
  alias: 'transfer-action',
  config: {
    defaultFee: 0.1
  }
});
```

---

## Adding Blocks to Assemblies

Blocks are added to assemblies with action mappings and attributes:

```typescript
// Add a block with action mappings
assemblyBuilder.addBlock(
  '0.0.234567',  // Block topic ID
  {
    increment: '0.0.123456',  // Map increment action
    decrement: '0.0.123456',  // Map decrement action
    reset: '0.0.123456'       // Map reset action
  },
  {
    count: 0,
    step: 1,
    label: 'Demo Counter'
  }
);

// Add a block without actions
assemblyBuilder.addBlock(
  '0.0.234568',  // Block topic ID
  {},            // No action mappings
  {
    title: 'Statistics Display',
    values: [
      { label: 'Total Blocks', value: 2 },
      { label: 'Actions', value: 3 }
    ]
  }
);
```

---

## Assembly Registration Process

The complete process for creating an assembly:

```typescript
// Step 1: Create assembly topic
const assemblyTopicId = await client.createRegistryTopic(
  RegistryType.ASSEMBLY
);

// Step 2: Register assembly metadata
const assemblyRegistration = new AssemblyBuilder(logger)
  .setName('my-assembly')
  .setVersion('1.0.0')
  .setDescription('My first HashLinks assembly')
  .setTags(['demo', 'example'])
  .build();

const registrationId = await client.registerAssembly(assemblyRegistration);

// Step 3: Add actions
const actionRegistration = await new ActionBuilder(logger)
  .setTopicId('0.0.123456')
  .setAlias('my-actions')
  .setWasmHash(wasmHash)
  .setHash(infoHash)
  .build();

const actionId = await client.registerAction(actionRegistration);

// Step 4: Add blocks
const blockTopicId = await client.registerBlock(blockDefinition, template);

// Step 5: Compose the assembly
await client.addAssemblyAction(assemblyTopicId, {
  t_id: actionId,
  alias: 'main-actions'
});

await client.addAssemblyBlock(assemblyTopicId, {
  block_t_id: blockTopicId,
  actions: {
    submit: actionId
  },
  attributes: {
    title: 'My Block'
  }
});
```

---

## Loading and Resolving Assemblies

Assemblies are loaded and resolved from their topic IDs:

```typescript
// Load assembly state
const assembly = await client.loadAssembly('0.0.987654');

console.log('Assembly name:', assembly.state.name);
console.log('Actions count:', assembly.actions.length);
console.log('Blocks count:', assembly.blocks.length);

// Resolve all references
const resolvedAssembly = await client.resolveAssemblyReferences(assembly);

// Check for resolution errors
resolvedAssembly.actions.forEach(action => {
  if (action.error) {
    console.error(`Action resolution error: ${action.error}`);
  }
});

resolvedAssembly.blocks.forEach(block => {
  if (block.error) {
    console.error(`Block resolution error: ${block.error}`);
  }
});
```

---

## Assembly Validation

The SDK provides validation for assembly composition:

```typescript
// Validate assembly composition
const validation = client.validateAssemblyComposition(assembly);

if (!validation.valid) {
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
  description: 'Updated description',
  tags: ['demo', 'updated', 'interactive']
});
```

---

## Assembly State Management

The SDK manages assembly state incrementally:

```typescript
// Get current assembly state
const currentState = await client.getAssemblyState(assemblyTopicId);

// Build complete state from operations
const completeState = await client.buildAssemblyState(assemblyTopicId);

// Cache assembly state for performance
client.assemblyEngine.cacheAssembly(assemblyTopicId, completeState);
```

---

## Assembly Engine

The assembly engine handles complex assembly operations:

```typescript
// Load and resolve assembly in one operation
const assembly = await client.assemblyEngine.loadAndResolveAssembly('0.0.987654');

// Resolve references for an assembly state
const resolved = await client.assemblyEngine.resolveReferences(assemblyState);

// Validate assembly composition
const validation = client.assemblyEngine.validateComposition(assembly);
```

---

## Error Handling

The SDK provides comprehensive error handling for assemblies:

```typescript
try {
  const assembly = await client.loadAssembly('0.0.987654');
  const resolved = await client.resolveAssemblyReferences(assembly);
  
  if (resolved.errors.length > 0) {
    console.warn('Assembly has resolution errors:', resolved.errors);
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