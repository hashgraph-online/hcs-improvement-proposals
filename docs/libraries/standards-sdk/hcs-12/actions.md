---
sidebar_position: 1
---

# Actions Implementation

Actions in HCS-12 are WebAssembly modules that implement deterministic business logic. The Standards SDK provides comprehensive support for creating, registering, and executing actions.

---

## What It Does

- **Executes deterministic logic** through WebAssembly modules
- **Implements the WasmInterface** with INFO, POST, and GET methods
- **Supports parameter validation** using Zod-compatible schemas
- **Manages JavaScript wrappers** for wasm-bindgen generated modules
- **Handles execution context** with network and memo information

---

## WebAssembly Interface

All actions must implement the `WasmInterface` with three core methods:

```typescript
interface WasmInterface {
  // Returns a deterministic JSON string containing module metadata
  INFO(): string;

  // Executes actions that modify state or submit transactions
  POST(
    action: string,
    params: string,
    network: 'mainnet' | 'testnet',
    memo: string
  ): Promise<string>;

  // Retrieves information without modifying state
  GET(
    action: string,
    params: string,
    network: 'mainnet' | 'testnet'
  ): Promise<string>;
}
```

### INFO Method

The INFO method provides metadata about the module's capabilities:

```typescript
type ModuleInfo = {
  name: string;
  version: string;
  hashlinks_version: string;
  creator: string;
  purpose: string;
  actions: Array<ActionDefinition>;
  capabilities: Array<Capability>;
  plugins: Array<PluginDefinition>;
};
```

### POST Method

The POST method executes actions that modify state or submit transactions:

```typescript
// Example POST implementation
async POST(
  action: string,
  params: string,
  network: 'mainnet' | 'testnet',
  memo: string
): Promise<string> {
  const parsedParams = JSON.parse(params);
  
  switch (action) {
    case 'transfer':
      // Execute token transfer
      const result = await executeTransfer(parsedParams, network);
      return JSON.stringify(result);
      
    case 'mint':
      // Execute NFT minting
      const mintResult = await executeMint(parsedParams, network);
      return JSON.stringify(mintResult);
      
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
```

### GET Method

The GET method retrieves information without modifying state:

```typescript
// Example GET implementation
async GET(
  action: string,
  params: string,
  network: 'mainnet' | 'testnet'
): Promise<string> {
  const parsedParams = JSON.parse(params);
  
  switch (action) {
    case 'balance':
      // Get account balance
      const balance = await getBalance(parsedParams.accountId, network);
      return JSON.stringify({ balance });
      
    case 'metadata':
      // Get token metadata
      const metadata = await getTokenMetadata(parsedParams.tokenId, network);
      return JSON.stringify(metadata);
      
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}
```

---

## Action Registration

Actions are registered with metadata and verification hashes:

```typescript
interface ActionRegistration {
  p: 'hcs-12';
  op: 'register';
  t_id: string;        // WASM module topic ID
  hash: string;        // INFO method result hash
  wasm_hash: string;   // WASM binary hash
  js_t_id?: string;    // JavaScript wrapper topic ID
  js_hash?: string;    // JavaScript wrapper hash
  interface_version?: string;  // wasm-bindgen version
  info_t_id?: string;  // INFO method result topic ID
  validation_rules?: Record<string, ValidationRule>;
  m?: string;          // Memo
}
```

---

## Using ActionBuilder

The SDK provides an `ActionBuilder` for creating action registrations:

```typescript
import { ActionBuilder, Logger, HCS12Client } from '@hashgraphonline/standards-sdk';
import { readFile } from 'fs/promises';

// Initialize client and logger
const logger = new Logger({ module: 'ActionRegistration' });
const client = new HCS12Client({
  network: 'testnet',
  operatorId: process.env.HEDERA_OPERATOR_ID!,
  operatorPrivateKey: process.env.HEDERA_OPERATOR_KEY!,
  logger
});

// Create action builder
const actionBuilder = new ActionBuilder(logger);

// Load WASM module and prepare metadata
const wasmBuffer = await readFile('./token-swap.wasm');
const jsWrapper = await readFile('./token-swap.js', 'utf-8');
const moduleInfo = {
  name: 'token-swap',
  version: '1.0.0',
  hashlinks_version: '1.2.0',
  creator: '0.0.123456',
  purpose: 'Execute token swaps on Hedera DEX',
  actions: [
    {
      name: 'swap',
      description: 'Swap one token for another',
      inputs: [
        { name: 'tokenIn', type: 'string', required: true },
        { name: 'tokenOut', type: 'string', required: true },
        { name: 'amount', type: 'number', required: true }
      ],
      outputs: [
        { name: 'transactionId', type: 'string' },
        { name: 'outputAmount', type: 'number' }
      ],
      required_capabilities: ['transaction', 'network']
    }
  ],
  capabilities: [
    {
      type: 'transaction',
      value: {
        transaction_types: ['token_associate', 'crypto_transfer'],
        max_fee_hbar: 5.0
      }
    }
  ],
  plugins: []
};

// Generate hashes
const wasmHash = await actionBuilder.generateWasmHash(wasmBuffer);
const infoHash = await actionBuilder.generateInfoHash(moduleInfo);
const jsHash = await actionBuilder.calculateHash(jsWrapper);

// Inscribe WASM and JS files via HCS-1
const wasmInscription = await client.inscribeFile(
  wasmBuffer, 
  'token-swap.wasm'
);
const jsInscription = await client.inscribeFile(
  Buffer.from(jsWrapper), 
  'token-swap.js'
);

// Build complete action registration
const actionRegistration = actionBuilder
  .setTopicId(wasmInscription.topic_id)    // WASM module topic ID
  .setWasmHash(wasmHash)                   // WASM binary hash
  .setHash(infoHash)                       // INFO method result hash
  .setJsTopicId(jsInscription.topic_id)    // JavaScript wrapper topic ID
  .setJsHash(jsHash)                       // JavaScript wrapper hash
  .setInterfaceVersion('0.2.95')           // wasm-bindgen version
  .addValidationRule('swap', {             // Parameter validation
    type: 'object',
    properties: {
      tokenIn: { type: 'string', pattern: '^0\\.0\\.[1-9][0-9]*$' },
      tokenOut: { type: 'string', pattern: '^0\\.0\\.[1-9][0-9]*$' },
      amount: { type: 'number', minimum: 0, maximum: 1000000 }
    },
    required: ['tokenIn', 'tokenOut', 'amount']
  })
  .setSourceVerification({                 // Optional: for transparency
    source_t_id: '0.0.123458',            // Source code topic ID
    source_hash: 'abc123...',             // Source hash
    target: 'wasm32-unknown-unknown'
  })
  .build();

// Register the action with the network
try {
  const registeredBuilder = await client.registerAction(actionBuilder);
  const actionTopicId = registeredBuilder.getTopicId();
  
  console.log('Action registered successfully:', {
    topicId: actionTopicId,
    wasmHash,
    infoHash,
    jsHash
  });
} catch (error) {
  logger.error('Action registration failed:', error.message);
  throw error;
}
```

---

## Complete ActionBuilder API

The ActionBuilder provides a comprehensive fluent API for action creation:

```typescript
// Complete ActionBuilder method reference
const actionBuilder = new ActionBuilder(logger);

// Core registration methods
actionBuilder
  .setTopicId('0.0.123456')              // Set HCS-1 topic ID for WASM storage
  .setHash('abc123...')                   // Set INFO method result hash
  .setWasmHash('def456...')               // Set WASM binary hash
  .setInfoTopicId('0.0.123457')           // Optional: INFO result topic ID
  .setJsTopicId('0.0.123458')             // Optional: JavaScript wrapper topic
  .setJsHash('789abc...')                 // Optional: JavaScript wrapper hash
  .setInterfaceVersion('0.2.95')          // Optional: wasm-bindgen version
  .setAlias('myAction')                   // Set alias for assembly usage

// Validation and security
  .addValidationRule('swap', {
    type: 'object',
    properties: {
      tokenIn: {
        type: 'string',
        pattern: '^0\\.0\\.[1-9][0-9]*$',
        description: 'Source token ID'
      },
      tokenOut: {
        type: 'string', 
        pattern: '^0\\.0\\.[1-9][0-9]*$',
        description: 'Destination token ID'
      },
      amount: {
        type: 'number',
        minimum: 0,
        maximum: 1000000,
        description: 'Amount to swap in smallest unit'
      },
      slippage: {
        type: 'number',
        minimum: 0,
        maximum: 50,
        default: 1,
        description: 'Max slippage percentage'
      }
    },
    required: ['tokenIn', 'tokenOut', 'amount']
  })

// Source verification for transparency
  .setSourceVerification({
    source_t_id: '0.0.123459',            // Source code topic ID
    source_hash: 'source123...',          // Source code hash
    target: 'wasm32-unknown-unknown'      // Compilation target
  })

// Build and validate
  .build({ validate: true });             // Returns ActionRegistration

// Utility methods
const wasmHash = await actionBuilder.generateWasmHash(wasmData);
const infoHash = await actionBuilder.generateInfoHash(moduleInfo);
const dataHash = await actionBuilder.calculateHash(data);

// Builder state methods
actionBuilder.reset();                    // Reset to initial state
const isComplete = actionBuilder.isComplete(registration);
const topicId = actionBuilder.getTopicId();
const alias = actionBuilder.getAlias();

// Create from existing data
const registration = await actionBuilder.createFromWasmAndInfo(
  topicId,
  wasmData,
  moduleInfo
);
```

## Parameter Validation

Actions support comprehensive parameter validation using JSON Schema-compatible rules:

```typescript
// Complex validation example
actionBuilder.addValidationRule('createPool', {
  type: 'object',
  properties: {
    tokenA: {
      type: 'string',
      pattern: '^0\\.0\\.[1-9][0-9]*$',
      description: 'First token in the liquidity pool'
    },
    tokenB: {
      type: 'string', 
      pattern: '^0\\.0\\.[1-9][0-9]*$',
      description: 'Second token in the liquidity pool'
    },
    amountA: {
      type: 'number',
      minimum: 100,          // Minimum liquidity requirement
      maximum: 1000000000,   // Maximum position size
      description: 'Amount of tokenA to provide'
    },
    amountB: {
      type: 'number',
      minimum: 100,
      maximum: 1000000000,
      description: 'Amount of tokenB to provide'
    },
    feeStructure: {
      type: 'object',
      properties: {
        lpFee: { type: 'number', minimum: 0, maximum: 10000 }, // basis points
        protocolFee: { type: 'number', minimum: 0, maximum: 2000 }
      },
      required: ['lpFee'],
      default: { lpFee: 30, protocolFee: 5 }
    },
    options: {
      type: 'object',
      properties: {
        isPrivate: { type: 'boolean', default: false },
        allowedUsers: {
          type: 'array',
          items: { type: 'string', pattern: '^0\\.0\\.[1-9][0-9]*$' },
          maxItems: 100
        }
      }
    }
  },
  required: ['tokenA', 'tokenB', 'amountA', 'amountB'],
  additionalProperties: false
});

// Validation for different action types
actionBuilder
  .addValidationRule('transfer', {
    type: 'object',
    properties: {
      to: { type: 'string', pattern: '^0\\.0\\.[1-9][0-9]*$' },
      amount: { type: 'number', minimum: 1, maximum: 1000000 },
      memo: { type: 'string', maxLength: 100 }
    },
    required: ['to', 'amount']
  })
  .addValidationRule('query', {
    type: 'object',
    properties: {
      accountId: { type: 'string', pattern: '^0\\.0\\.[1-9][0-9]*$' },
      includePending: { type: 'boolean', default: false }
    },
    required: ['accountId']
  });
```

---

## Capabilities System

Actions can declare required capabilities:

```typescript
type Capability = {
  type: 'network' | 'transaction' | 'storage' | 'external_api';
  value:
    | NetworkCapability
    | TransactionCapability
    | StorageCapability
    | ExternalApiCapability;
};

// Example capability declaration
const capabilities: Capability[] = [
  {
    type: 'network',
    value: {
      networks: ['mainnet', 'testnet'],
      operations: ['query', 'submit']
    }
  },
  {
    type: 'transaction',
    value: {
      transaction_types: ['token_transfer', 'token_mint'],
      max_fee_hbar: 1.0
    }
  }
];
```

---

## JavaScript Wrapper Support

For wasm-bindgen generated modules, JavaScript wrappers are supported:

```typescript
// Register action with JavaScript wrapper
const actionRegistration = await actionBuilder
  .setTopicId('0.0.123456')      // WASM module topic ID
  .setJsTopicId('0.0.123457')    // JavaScript wrapper topic ID
  .setInterfaceVersion('0.2.95') // wasm-bindgen version
  .setWasmHash(wasmHash)
  .setJsHash(jsHash)
  .setHash(infoHash)
  .build();
```

---

## Action Execution

Actions are executed through the WASM executor:

```typescript
import { WasmExecutor } from '@hashgraphonline/standards-sdk';

const wasmExecutor = new WasmExecutor(logger, 'testnet');

// Execute an action registration
const result = await wasmExecutor.execute(actionRegistration, {
  method: 'POST',
  params: {
    operation: 'transfer',
    amount: 100,
    to: '0.0.987654',
  },
});

console.log('Action result:', result);
```

---

## WASM Module Development Guide

### Rust Implementation Example

Here's a complete example of implementing a WASM action module in Rust:

```rust
// Cargo.toml
[package]
name = "token-swap-action"
version = "1.0.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.95"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
js-sys = "0.3"
wasm-bindgen-futures = "0.4"

[dependencies.web-sys]
version = "0.3"
features = [
  "console",
  "Request",
  "RequestInit",
  "Response",
  "Window",
]

// src/lib.rs
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct ModuleInfo {
    name: String,
    version: String,
    hashlinks_version: String,
    creator: String,
    purpose: String,
    actions: Vec<ActionDefinition>,
    capabilities: Vec<Capability>,
    plugins: Vec<serde_json::Value>,
}

#[derive(Serialize, Deserialize)]
struct ActionDefinition {
    name: String,
    description: String,
    inputs: Vec<ParameterDefinition>,
    outputs: Vec<ParameterDefinition>,
    required_capabilities: Vec<String>,
}

#[derive(Serialize, Deserialize)]
struct ParameterDefinition {
    name: String,
    #[serde(rename = "type")]
    param_type: String,
    required: bool,
    description: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Capability {
    #[serde(rename = "type")]
    cap_type: String,
    value: serde_json::Value,
}

#[derive(Deserialize)]
struct SwapParams {
    token_in: String,
    token_out: String,
    amount: u64,
    slippage: Option<f64>,
}

#[derive(Serialize)]
struct SwapResult {
    transaction_id: String,
    output_amount: u64,
    exchange_rate: f64,
    fees_paid: u64,
}

#[wasm_bindgen]
pub struct TokenSwapAction {
    state: HashMap<String, serde_json::Value>,
}

#[wasm_bindgen]
impl TokenSwapAction {
    #[wasm_bindgen(constructor)]
    pub fn new() -> TokenSwapAction {
        TokenSwapAction {
            state: HashMap::new(),
        }
    }

    #[wasm_bindgen(js_name = INFO)]
    pub fn info(&self) -> String {
        let module_info = ModuleInfo {
            name: "token-swap".to_string(),
            version: "1.0.0".to_string(),
            hashlinks_version: "1.2.0".to_string(),
            creator: "0.0.123456".to_string(),
            purpose: "Execute token swaps on Hedera DEX with slippage protection".to_string(),
            actions: vec![
                ActionDefinition {
                    name: "swap".to_string(),
                    description: "Swap one token for another with price impact protection".to_string(),
                    inputs: vec![
                        ParameterDefinition {
                            name: "token_in".to_string(),
                            param_type: "string".to_string(),
                            required: true,
                            description: Some("Source token ID (0.0.xxxxx)".to_string()),
                        },
                        ParameterDefinition {
                            name: "token_out".to_string(),
                            param_type: "string".to_string(),
                            required: true,
                            description: Some("Destination token ID (0.0.xxxxx)".to_string()),
                        },
                        ParameterDefinition {
                            name: "amount".to_string(),
                            param_type: "number".to_string(),
                            required: true,
                            description: Some("Amount in smallest token unit".to_string()),
                        },
                        ParameterDefinition {
                            name: "slippage".to_string(),
                            param_type: "number".to_string(),
                            required: false,
                            description: Some("Maximum slippage percentage (default: 1%)".to_string()),
                        },
                    ],
                    outputs: vec![
                        ParameterDefinition {
                            name: "transaction_id".to_string(),
                            param_type: "string".to_string(),
                            required: true,
                            description: Some("Hedera transaction ID".to_string()),
                        },
                        ParameterDefinition {
                            name: "output_amount".to_string(),
                            param_type: "number".to_string(),
                            required: true,
                            description: Some("Amount received after swap".to_string()),
                        },
                    ],
                    required_capabilities: vec!["transaction".to_string(), "network".to_string()],
                }
            ],
            capabilities: vec![
                Capability {
                    cap_type: "transaction".to_string(),
                    value: serde_json::json!({
                        "transaction_types": ["crypto_transfer", "token_associate"],
                        "max_fee_hbar": 5.0
                    }),
                },
                Capability {
                    cap_type: "network".to_string(),
                    value: serde_json::json!({
                        "networks": ["mainnet", "testnet"],
                        "operations": ["query", "submit"]
                    }),
                }
            ],
            plugins: vec![],
        };
        
        serde_json::to_string(&module_info).unwrap()
    }

    #[wasm_bindgen(js_name = GET)]
    pub async fn get(&mut self, action: &str, params: &str, network: &str) -> Result<String, JsValue> {
        match action {
            "quote" => self.get_swap_quote(params, network).await,
            "balance" => self.get_token_balance(params, network).await,
            "pools" => self.get_available_pools(params, network).await,
            _ => Err(JsValue::from_str(&format!("Unknown GET action: {}", action))),
        }
    }

    #[wasm_bindgen(js_name = POST)]
    pub async fn post(&mut self, action: &str, params: &str, network: &str, memo: &str) -> Result<String, JsValue> {
        match action {
            "swap" => self.execute_swap(params, network, memo).await,
            "approve" => self.approve_token(params, network, memo).await,
            _ => Err(JsValue::from_str(&format!("Unknown POST action: {}", action))),
        }
    }

    async fn get_swap_quote(&self, params: &str, network: &str) -> Result<String, JsValue> {
        let swap_params: SwapParams = serde_json::from_str(params)
            .map_err(|e| JsValue::from_str(&format!("Invalid params: {}", e)))?;
        
        // Simulate getting quote from DEX
        let quote = serde_json::json!({
            "input_amount": swap_params.amount,
            "output_amount": swap_params.amount * 98 / 100,  // Simulated rate
            "exchange_rate": 0.98,
            "price_impact": 0.5,
            "fees": {
                "protocol_fee": swap_params.amount * 3 / 1000,
                "gas_fee": 50000
            },
            "route": [swap_params.token_in, swap_params.token_out]
        });
        
        Ok(quote.to_string())
    }

    async fn get_token_balance(&self, params: &str, network: &str) -> Result<String, JsValue> {
        // Implementation for balance checking
        let balance = serde_json::json!({
            "balance": 1000000,
            "decimals": 8,
            "symbol": "HBAR"
        });
        Ok(balance.to_string())
    }

    async fn get_available_pools(&self, _params: &str, _network: &str) -> Result<String, JsValue> {
        // Implementation for pool discovery
        let pools = serde_json::json!([
            {
                "pool_id": "0.0.789012",
                "token_a": "0.0.456789", 
                "token_b": "0.0.654321",
                "liquidity": 5000000,
                "fee_rate": 0.003
            }
        ]);
        Ok(pools.to_string())
    }

    async fn execute_swap(&mut self, params: &str, network: &str, memo: &str) -> Result<String, JsValue> {
        let swap_params: SwapParams = serde_json::from_str(params)
            .map_err(|e| JsValue::from_str(&format!("Invalid params: {}", e)))?;
        
        // Validate slippage
        let slippage = swap_params.slippage.unwrap_or(1.0);
        if slippage < 0.0 || slippage > 50.0 {
            return Err(JsValue::from_str("Slippage must be between 0-50%"));
        }
        
        // Simulate swap execution
        let result = SwapResult {
            transaction_id: format!("{}-{}-swap", network, chrono::Utc::now().timestamp()),
            output_amount: swap_params.amount * 98 / 100,
            exchange_rate: 0.98,
            fees_paid: swap_params.amount * 2 / 100,
        };
        
        // Store transaction in state for audit
        self.state.insert(
            result.transaction_id.clone(),
            serde_json::to_value(&result).unwrap()
        );
        
        Ok(serde_json::to_string(&result).unwrap())
    }

    async fn approve_token(&mut self, params: &str, network: &str, memo: &str) -> Result<String, JsValue> {
        // Implementation for token approval
        let approval_result = serde_json::json!({
            "transaction_id": format!("{}-{}-approve", network, chrono::Utc::now().timestamp()),
            "approved_amount": 1000000,
            "spender": "0.0.789012"
        });
        Ok(approval_result.to_string())
    }
}
```

### JavaScript Wrapper

The wasm-bindgen tool generates a JavaScript wrapper, but you can customize it:

```javascript
// token-swap.js - Custom wrapper for additional functionality
import init, { TokenSwapAction } from './token_swap_action.js';

let wasmInstance;
let actionModule;

/**
 * Initialize the WASM module
 */
export async function initialize() {
  if (!wasmInstance) {
    wasmInstance = await init();
    actionModule = new TokenSwapAction();
  }
  return wasmInstance;
}

/**
 * Get module information
 */
export function INFO() {
  if (!actionModule) {
    throw new Error('WASM module not initialized');
  }
  return actionModule.INFO();
}

/**
 * Execute GET operation with error handling
 */
export async function GET(action, params, network) {
  if (!actionModule) {
    throw new Error('WASM module not initialized');
  }
  
  try {
    const result = await actionModule.GET(action, params, network);
    return result;
  } catch (error) {
    console.error('GET operation failed:', { action, params, network, error });
    throw new Error(`GET ${action} failed: ${error.message || error}`);
  }
}

/**
 * Execute POST operation with error handling and logging
 */
export async function POST(action, params, network, memo) {
  if (!actionModule) {
    throw new Error('WASM module not initialized');
  }
  
  try {
    console.log('Executing POST:', { action, params: JSON.parse(params), network });
    
    const result = await actionModule.POST(action, params, network, memo);
    
    console.log('POST completed:', { action, result: JSON.parse(result) });
    return result;
  } catch (error) {
    console.error('POST operation failed:', { action, params, network, error });
    throw new Error(`POST ${action} failed: ${error.message || error}`);
  }
}

/**
 * Utility function for parameter validation
 */
export function validateSwapParams(params) {
  const required = ['token_in', 'token_out', 'amount'];
  const missing = required.filter(field => !params[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required parameters: ${missing.join(', ')}`);
  }
  
  if (typeof params.amount !== 'number' || params.amount <= 0) {
    throw new Error('Amount must be a positive number');
  }
  
  const accountPattern = /^0\.0\.[1-9][0-9]*$/;
  if (!accountPattern.test(params.token_in) || !accountPattern.test(params.token_out)) {
    throw new Error('Invalid token ID format');
  }
  
  return true;
}

/**
 * Clean up resources
 */
export function cleanup() {
  if (actionModule) {
    actionModule.free();
    actionModule = null;
  }
  wasmInstance = null;
}
```

## Action Execution Examples

### Basic Action Execution

```typescript
import { Logger, WasmExecutor } from '@hashgraphonline/standards-sdk';

const logger = new Logger({ module: 'ActionExecution' });
const wasmExecutor = new WasmExecutor(logger, 'testnet');

// Execute a token swap (POST)
try {
  const swapResult = await wasmExecutor.execute(actionRegistration, {
    method: 'POST',
    params: {
      operation: 'swap',
      token_in: '0.0.456789',
      token_out: '0.0.654321',
      amount: 1000000,
      slippage: 2.0,
    },
  });
  console.log('Swap executed:', swapResult);
} catch (error) {
  console.error('Swap failed:', error);
}

// Get swap quote (GET)
try {
  const quote = await wasmExecutor.execute(actionRegistration, {
    method: 'GET',
    params: {
      operation: 'quote',
      token_in: '0.0.456789',
      token_out: '0.0.654321',
      amount: 1000000,
    },
  });
  console.log('Swap quote:', quote);
} catch (error) {
  console.error('Quote failed:', error);
}
```

### Advanced Error Handling

```typescript
import { ActionRegistration, Logger, WasmExecutor } from '@hashgraphonline/standards-sdk';

type ActionExecutionConfig = {
  method: 'POST' | 'GET' | 'INFO';
  params: Record<string, unknown>;
};

// Custom error handler with retry logic
class ActionExecutor {
  constructor(
    private wasmExecutor: WasmExecutor,
    private action: ActionRegistration,
    private logger: Logger,
  ) {}
  
  async executeWithRetry(
    actionConfig: ActionExecutionConfig,
    maxRetries = 3,
    backoffMs = 1000
  ): Promise<any> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.logger.info(`Executing action (attempt ${attempt}):`, {
          method: actionConfig.method
        });
        
        const result = await this.wasmExecutor.execute(this.action, actionConfig);
        
        // Validate result structure
        if (!this.isValidResult(result)) {
          throw new Error('Invalid result structure returned by action');
        }
        
        this.logger.info('Action executed successfully', { attempt, result });
        return result;
        
      } catch (error) {
        lastError = error;
        this.logger.warn(`Action execution failed (attempt ${attempt}):`, error.message);
        
        // Wait before retry
        if (attempt < maxRetries) {
          await this.delay(backoffMs * attempt);
        }
      }
    }
    
    throw new Error(`Action failed after ${maxRetries} attempts: ${lastError.message}`);
  }
  
  private isValidResult(result: any): boolean {
    return result && typeof result.success === 'boolean';
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage
const wasmExecutor = new WasmExecutor(logger, 'testnet');
const executor = new ActionExecutor(wasmExecutor, actionRegistration, logger);

try {
  const result = await executor.executeWithRetry({
    method: 'POST',
    params: { operation: 'swap', token_in: '0.0.456', token_out: '0.0.789', amount: 1000 },
  });
  
  console.log('Swap completed with retry logic:', result);
} catch (error) {
  console.error('All retry attempts failed:', error.message);
}
```

## Common Issues and Solutions

### 1. WASM Module Loading Failures

**Problem**: WASM module fails to instantiate
```
Error: WebAssembly instantiation failed: Import resolution error
```

**Solution**: Check JavaScript wrapper compatibility
```typescript
// Ensure wasm-bindgen versions match
// In ActionBuilder:
actionBuilder.setInterfaceVersion('0.2.95'); // Must match Cargo.toml

// Verify imports in WASM module
const wasmModule = await WebAssembly.instantiateStreaming(wasmResponse);
console.log('WASM imports:', wasmModule.instance.exports);
```

### 2. Hash Mismatch During Registration

**Problem**: Generated hashes don't match actual content
```
Error: WASM hash verification failed
```

**Solution**: Ensure deterministic hash generation
```typescript
// Use consistent hash generation
const wasmHash = await actionBuilder.generateWasmHash(wasmBuffer);

// Verify hash matches
const expectedHash = createHash('sha256').update(wasmBuffer).digest('hex');
if (wasmHash !== expectedHash) {
  throw new Error('Hash generation inconsistency');
}
```

### 3. Parameter Validation Errors

**Problem**: Action parameters fail validation
```
Error: Validation failed for action 'swap': amount is required
```

**Solution**: Add comprehensive validation rules
```typescript
// Debug validation
try {
  await wasmExecutor.execute(actionRegistration, {
    method: 'POST',
    params: config,
  });
} catch (error) {
  console.log('Validation/execution error:', error);
}

// Test validation independently
const validator = new ParameterValidator(validationRules);
const isValid = validator.validate('swap', params);
if (!isValid) {
  console.log('Validation errors:', validator.errors);
}
```

### 4. Memory Allocation Issues

**Problem**: WASM module runs out of memory
```
Error: RuntimeError: memory access out of bounds
```

**Solution**: Optimize memory usage in Rust
```rust
// Use Box for large structures
struct LargeData {
    items: Box<Vec<Transaction>>,  // Heap allocation
}

// Implement Drop for cleanup
impl Drop for TokenSwapAction {
    fn drop(&mut self) {
        self.state.clear();
    }
}

// Limit data structures size
if self.state.len() > 1000 {
    self.state.retain(|_, v| v.is_recent());
}
```

### 5. Network Timeout Issues

**Problem**: Action execution times out on network operations
```
Error: Action execution timeout after 5000ms
```

**Solution**: Implement proper timeout handling
```typescript
// Handle timeouts gracefully
try {
  const result = await Promise.race([
    wasmExecutor.execute(actionRegistration, {
      method: 'POST',
      params: config,
    }),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Custom timeout')), 8000)
    )
  ]);
} catch (error) {
  if (error.message.includes('timeout')) {
    // Handle timeout specifically
    console.log('Operation timed out, retrying with different parameters');
  }
}
```

## Security Best Practices

### Input Validation
```typescript
// Always validate inputs at WASM boundary
fn validate_account_id(account_id: &str) -> Result<(), String> {
    if !account_id.starts_with("0.0.") {
        return Err("Invalid account ID format".to_string());
    }
    
    let parts: Vec<&str> = account_id.split('.').collect();
    if parts.len() != 3 {
        return Err("Account ID must have format 0.0.xxxxx".to_string());
    }
    
    match parts[2].parse::<u64>() {
        Ok(num) if num > 0 => Ok(()),
        _ => Err("Invalid account number".to_string())
    }
}
```

### Safe State Management
```typescript
// Limit state size to prevent DoS
const MAX_STATE_SIZE = 1000;
const MAX_STRING_LENGTH = 1000;

if (self.state.len() >= MAX_STATE_SIZE) {
    return Err(JsValue::from_str("State limit exceeded"));
}

if params.len() > MAX_STRING_LENGTH {
    return Err(JsValue::from_str("Parameter too long"));
}
```

### Error Information Disclosure
```rust
// Don't expose internal details
match internal_operation() {
    Ok(result) => Ok(serde_json::to_string(&result).unwrap()),
    Err(InternalError::DatabaseError(e)) => {
        // Log internally but don't expose
        web_sys::console::error_1(&format!("DB error: {}", e).into());
        Err(JsValue::from_str("Internal server error"))
    },
    Err(InternalError::ValidationError(e)) => {
        // Safe to expose validation errors
        Err(JsValue::from_str(&format!("Validation error: {}", e)))
    }
}
```
