---
sidebar_position: 5
---

# WASM Execution

The HCS-12 WASM execution system in the Standards SDK handles loading and executing WebAssembly modules for HashLinks actions.

## WASM Interface

All actions must implement the `WasmInterface` with INFO, POST, and GET methods:

```typescript
interface WasmInterface {
  // Returns module metadata in deterministic JSON format
  INFO(): string;

  // Executes actions that modify state or submit transactions
  POST(
    action: string,
    params: string,
    network: 'mainnet' | 'testnet',
    hashLinkMemo: string
  ): Promise<string>;

  // Retrieves information without modifying state
  GET(
    action: string,
    params: string,
    network: 'mainnet' | 'testnet'
  ): Promise<string>;
}
```

## WASM Executor

The SDK provides a `WasmExecutor` for executing WASM modules:

```typescript
import { WasmExecutor } from '@hashgraphonline/standards-sdk';

// Create WASM executor
const wasmExecutor = new WasmExecutor(logger, 'testnet');

// Execute an action
const result = await wasmExecutor.execute(actionRegistration, {
  method: 'POST',
  params: {
    action: 'transfer',
    amount: 100,
    to: '0.0.987654'
  }
});
```

## JavaScript Wrapper Support

For wasm-bindgen generated modules, JavaScript wrappers are supported:

```typescript
// Action registration with JavaScript wrapper
const actionRegistration: ActionRegistration = {
  p: 'hcs-12',
  op: 'register',
  t_id: '0.0.123456',        // WASM module topic ID
  js_t_id: '0.0.123457',     // JavaScript wrapper topic ID
  hash: 'e3b0c442...',       // INFO method result hash
  wasm_hash: 'a1b2c3d4...',  // WASM binary hash
  js_hash: 'f5e6d7c8...',    // JavaScript wrapper hash
  interface_version: '0.2.95' // wasm-bindgen version
};

// Execute with JavaScript wrapper
const result = await wasmExecutor.execute(actionRegistration, {
  method: 'POST',
  params: {
    action: 'transfer',
    amount: 100,
    to: '0.0.987654'
  }
});
```

## Module Info Extraction

The SDK can extract module info from WASM binaries:

```typescript
import { ActionBuilder } from '@hashgraphonline/standards-sdk';

// Extract module info from WASM data
const moduleInfo = await client.wasm.extractModuleInfo(wasmData);

// Generate INFO hash
const infoHash = await new ActionBuilder(logger).generateInfoHash(moduleInfo);

// Generate WASM hash
const wasmHash = await new ActionBuilder(logger).generateWasmHash(wasmData);
```

## WASM Loading

The executor handles WASM module loading from HCS-1 topics:

```typescript
// Load WASM module from topic
const wasmResult = await hrlResolver.resolve(action.t_id, {
  network: 'testnet',
  returnRaw: true
});

// Load JavaScript wrapper from topic
const jsResult = await hrlResolver.resolve(action.js_t_id!, {
  network: 'testnet',
  returnRaw: false
});
```

## Execution Context

Actions receive execution context with network and memo information:

```typescript
interface WasmExecutionContext {
  method: 'INFO' | 'POST' | 'GET';
  params: {
    action: string;
    [key: string]: any;
  };
  network: 'mainnet' | 'testnet';
  hashLinkMemo: string;
}
```

## Result Handling

Execution results are returned in a standardized format:

```typescript
interface WasmExecutionResult {
  success: boolean;
  data?: any;
  error?: string;
  gasUsed?: number;
}

// Example successful result
const successResult: WasmExecutionResult = {
  success: true,
  data: {
    transactionId: '0.0.123456@1234567890.000000000',
    newValue: 42
  }
};

// Example error result
const errorResult: WasmExecutionResult = {
  success: false,
  error: 'Invalid parameter: amount must be positive'
};
```

## Error Handling

The WASM executor provides comprehensive error handling:

```typescript
try {
  const result = await wasmExecutor.execute(actionRegistration, context);
  
  if (result.success) {
    console.log('Execution successful:', result.data);
  } else {
    console.error('Execution failed:', result.error);
  }
} catch (error) {
  console.error('WASM execution error:', error.message);
}
```

## Memory Management

The executor handles WASM memory management:

```typescript
// Read string from WASM memory
const stringValue = wasmExecutor.readWasmString(memory, ptr);

// Memory cleanup is handled automatically
// WASM instances are cached for performance
```

## Validation

The executor validates action parameters and capabilities:

```typescript
// Validate action parameters
const isValid = wasmExecutor.validateParameters(action, params);

// Check capabilities
const hasCapability = wasmExecutor.checkCapabilities(action, requiredCapability);
```

## Performance Optimization

The executor includes performance optimizations:

```typescript
// WASM instance caching
const cachedInstance = wasmExecutor.getFromCache(topicId);

// Concurrent execution
const results = await Promise.all([
  wasmExecutor.execute(action1, context1),
  wasmExecutor.execute(action2, context2),
  wasmExecutor.execute(action3, context3)
]);

// Resource cleanup
wasmExecutor.clearCache();
```

## Security Features

The executor includes security features for safe execution:

```typescript
// Validate WASM module
const isValid = wasmExecutor.validateWasmModule(wasmData);

// Check hashes
const hashValid = wasmExecutor.verifyHashes(actionRegistration);

// Capability checking
const capabilitiesValid = wasmExecutor.validateCapabilities(actionRegistration);
```

## Browser Support

The executor works in both Node.js and browser environments:

```typescript
// Browser-specific loading
if (typeof window !== 'undefined') {
  // Use browser loading mechanism
  const moduleUrl = URL.createObjectURL(blob);
  const module = await import(moduleUrl);
}

// Node.js loading
if (typeof process !== 'undefined') {
  // Use Node.js loading mechanism
  const module = await import(localPath);
}
```

## Best Practices

1. **Deterministic Execution**: Ensure all actions are deterministic
2. **Error Handling**: Handle errors gracefully and provide meaningful error messages
3. **Resource Management**: Be mindful of resource usage and execution time
4. **Security**: Validate all inputs and sanitize outputs
5. **Performance**: Use caching for frequently executed actions
6. **Validation**: Validate parameters and capabilities before execution
7. **Memory Management**: Properly manage WASM memory and instances
8. **Testing**: Test actions with various input scenarios