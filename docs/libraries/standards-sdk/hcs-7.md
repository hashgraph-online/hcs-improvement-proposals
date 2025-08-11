---
sidebar_position: 5
---

# HCS-7: Dynamic and Programmable On-graph Assets

The HCS-7 module enables the creation and management of dynamic, programmable, 100% on-graph assets. It bridges the gap between EVM-based smart contracts and WebAssembly (WASM) execution environments, enabling sophisticated state processing and transformations.

## Key Concepts

HCS-7 introduces several key components:

- **EVM Bridge**: Connects to EVM-compatible smart contracts for state reading and interaction
- **WASM Bridge**: Enables WebAssembly-based processing and transformation of on-chain data
- **Redis Cache**: Optional caching layer for optimizing frequent state requests

## Getting Started

### Installation

The HCS-7 module is included in the Standards SDK:

```bash
npm install @hashgraphonline/standards-sdk
```

### Basic Usage

Import the HCS7 module and create instances:

```typescript
import { HCS7 } from '@hashgraphonline/standards-sdk';

// Initialize EVM Bridge
const evmBridge = new HCS7.EVMBridge('mainnet-public');

// Initialize WASM Bridge
const wasmBridge = new HCS7.WasmBridge();
```

## EVM Bridge

The EVM Bridge provides a connection to EVM-compatible smart contracts on Hedera.

### Reading Smart Contract State

```typescript
// Read state from a smart contract
const contractState = await evmBridge.executeCommand({
  p: 'evm', // Protocol (evm)
  op: 'read', // Operation (read)
  m: 'balanceOf', // Method to call
  c: {
    // Command parameters
    contractAddress: '0x1234567890123456789012345678901234567890',
    abi: {
      name: 'balanceOf',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: 'balance', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    args: ['0xabcdef1234567890abcdef1234567890abcdef12'],
  },
});
```

### Writing to Smart Contracts

```typescript
// Execute a write operation
const txResult = await evmBridge.executeCommand({
  p: 'evm',
  op: 'write',
  m: 'transfer',
  c: {
    contractAddress: '0x1234567890123456789012345678901234567890',
    abi: {
      name: 'transfer',
      inputs: [
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [{ name: 'success', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    args: [
      '0xabcdef1234567890abcdef1234567890abcdef12',
      '1000000000000000000', // 1 token with 18 decimals
    ],
    privateKey: '0x1234...', // Private key for transaction signing
    gasLimit: 100000, // Optional gas limit
    gasPrice: '100000000', // Optional gas price (in wei)
  },
});
```

### Listening for Events

```typescript
// Listen for contract events
const eventListener = await evmBridge.listenForEvents({
  p: 'evm',
  op: 'listen',
  m: 'Transfer',
  c: {
    contractAddress: '0x1234567890123456789012345678901234567890',
    eventSignature: 'Transfer(address,address,uint256)',
    fromBlock: 'latest',
    // Optional filters
    filter: {
      from: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  },
});

// Handle events
eventListener.on('event', (event) => {
  console.log('Transfer event:', event);

  // Process event data
  const { from, to, value } = event.returnValues;
  console.log(`Transfer from ${from} to ${to} of ${value} tokens`);
});

// Stop listening when done
// eventListener.stopListening();
```

## WASM Bridge

The WASM Bridge enables WebAssembly-based processing of blockchain state.

### Initializing WASM

```typescript
// Load WASM bytes (e.g., from an inscription or fetch)
const wasmBytes = await fetch('/path/to/processor.wasm').then((r) =>
  r.arrayBuffer()
);

// Initialize the WASM engine
await wasmBridge.initWasm(wasmBytes);
```

### Processing State

```typescript
// Process state using WASM
const result = await wasmBridge.executeCommand({
  p: 'wasm',
  op: 'process',
  m: 'process_state',
  c: {
    wasmTopicId: '0.0.123456', // Optional: Topic ID of the WASM inscription
    inputType: {
      // Input configuration
      stateData: contractState, // Data to process (from EVM Bridge)
    },
    outputType: {
      // Output configuration
      type: 'json',
      format: 'string',
    },
    params: {
      // Optional custom parameters
      threshold: 100,
      factor: 1.5,
    },
  },
});

console.log('Processed result:', result);
```

### Complete Workflow Example

```typescript
import { HCS7 } from '@hashgraphonline/standards-sdk';

async function stateProcessingPipeline() {
  // Initialize bridges
  const evmBridge = new HCS7.EVMBridge('mainnet-public');
  const wasmBridge = new HCS7.WasmBridge();

  try {
    // 1. Fetch data from smart contract
    const priceData = await evmBridge.executeCommand({
      p: 'evm',
      op: 'read',
      m: 'latestRoundData',
      c: {
        contractAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD Price Feed
        abi: {
          name: 'latestRoundData',
          inputs: [],
          outputs: [
            { name: 'roundId', type: 'uint80' },
            { name: 'answer', type: 'int256' },
            { name: 'startedAt', type: 'uint256' },
            { name: 'updatedAt', type: 'uint256' },
            { name: 'answeredInRound', type: 'uint80' },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      },
    });

    // 2. Initialize WASM processor
    const wasmBytes = await fetch(
      'https://example.com/price-processor.wasm'
    ).then((r) => r.arrayBuffer());
    await wasmBridge.initWasm(wasmBytes);

    // 3. Process state with WASM
    const processedResult = await wasmBridge.executeCommand({
      p: 'wasm',
      op: 'process',
      m: 'calculate_moving_average',
      c: {
        inputType: {
          priceData: priceData,
          window: 24, // 24-hour moving average
        },
        outputType: {
          type: 'json',
          format: 'string',
        },
      },
    });

    // 4. Use processed result
    const movingAverage = JSON.parse(processedResult);
    console.log('ETH/USD 24h Moving Average:', movingAverage.average);

    return movingAverage;
  } catch (error) {
    console.error('Pipeline error:', error);
    throw error;
  }
}

stateProcessingPipeline().catch(console.error);
```

## Redis Cache

The Redis Cache provides an optional caching layer for optimizing state access.

### Setting Up Redis Cache

```typescript
import { HCS7 } from '@hashgraphonline/standards-sdk';

// Initialize Redis Cache
const redisCache = new HCS7.RedisCache({
  host: 'localhost',
  port: 6379,
  keyPrefix: 'hcs7:state:',
  ttl: 300, // Cache TTL in seconds
});

// Initialize EVM Bridge with cache
const evmBridge = new HCS7.EVMBridge('mainnet-public', redisCache);
```

### Cache Configuration Options

```typescript
const cacheOptions = {
  host: 'redis-server.example.com', // Redis server host
  port: 6379, // Redis server port
  password: 'your-redis-password', // Optional Redis password
  db: 0, // Redis database number
  keyPrefix: 'app:cache:', // Prefix for cache keys
  ttl: 600, // Default TTL in seconds
  maxItems: 1000, // Maximum items in cache
  compressionThreshold: 1024, // Compress values larger than this (bytes)
};

const redisCache = new HCS7.RedisCache(cacheOptions);
```

## API Reference

### EVMBridge Class

```typescript
class EVMBridge {
  constructor(
    network: 'mainnet-public' | 'testnet-public' | string,
    cache?: RedisCache
  );

  executeCommand(command: EVMCommand): Promise<any>;
  listenForEvents(command: EVMEventCommand): EventEmitter;
  getProvider(): EthersProvider;
}
```

### WasmBridge Class

```typescript
class WasmBridge {
  constructor();

  initWasm(wasmBytes: ArrayBuffer): Promise<void>;
  executeCommand(command: WasmCommand): Promise<any>;
  getExports(): Record<string, Function>;
}
```

### RedisCache Class

```typescript
class RedisCache {
  constructor(options: RedisCacheOptions);

  get(key: string): Promise<any>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  flush(): Promise<void>;
  close(): Promise<void>;
}
```

## Advanced Topics

### Custom Network Configuration

```typescript
// Custom network configuration
const customEvmBridge = new HCS7.EVMBridge({
  url: 'https://your-custom-rpc-endpoint.com',
  chainId: 295,
  name: 'Custom Hedera Network',
});
```

### Handling Large State Data

```typescript
// Configure WASM memory limits for large state processing
const wasmBridge = new HCS7.WasmBridge({
  initialMemory: 10, // Initial memory in pages (64KB per page)
  maximumMemory: 100, // Maximum memory in pages
  tableSize: 1, // Size of function table
  debug: true, // Enable debug mode
});
```

### Bulk State Processing

```typescript
// Process multiple state items efficiently
async function bulkProcess(stateItems) {
  const wasmBridge = new HCS7.WasmBridge();
  await wasmBridge.initWasm(wasmBytes);

  // Process items in batches
  const batchSize = 10;
  const results = [];

  for (let i = 0; i < stateItems.length; i += batchSize) {
    const batch = stateItems.slice(i, i + batchSize);

    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map((item) =>
        wasmBridge.executeCommand({
          p: 'wasm',
          op: 'process',
          m: 'process_item',
          c: { inputType: { item } },
        })
      )
    );

    results.push(...batchResults);
  }

  return results;
}
```

## Browser Compatibility

HCS-7 WASM Bridge is compatible with all modern browsers that support WebAssembly:

- Chrome (version 57+)
- Firefox (version 52+)
- Safari (version 11+)
- Edge (version 16+)
