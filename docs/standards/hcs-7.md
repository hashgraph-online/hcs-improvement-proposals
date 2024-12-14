# HCS-7: Smart Hashinals: A Micro-DSL for Deterministic Topic Selection.

## Status: Published

## Authors
- Kantorcodes [https://twitter.com/kantorcodes](https://twitter.com/kantorcodes)

## Abstract

This standard is a sub-standard of [HCS-6](./hcs-6.md) which introduces a way to inscribe and tokenize **Hashinals** whose `metadata` can be updated based on smart contract state by utilizing an indexed Topic ID and WASM processing module.

## Motivation

HCS-6 introduced a novel way of updating metadata of a Hashinal dynamically by registering new sequence numbers. Some use-cases require switching between metadata based on complex conditions that can be verified on-chain, such as:

- Number of minted NFTs
- Uniswap V3 pool price thresholds
- Token balance requirements
- Time-weighted average prices
- Complex mathematical calculations

These kinds of use cases, while possible with HCS-6, would require submitting many messages and maintaining off-chain state. HCS-7, through trustless, programmatic, verifiable execution solves for this by combining on-chain state with WASM processing.

## Specification

### Topic Creation and Structure

1. **Topic Requirements**
   - Memo format: `hcs-7:indexed:{ttl}`
   - TTL must be at least 3600 (1 hour)
   - No admin key (as per HCS-2)
   - Must be created after HCS-7 launch

2. **Metadata Format**
   - Follows [HCS-5](./hcs-5.md) rules with protocol number `7`
   - HRL format: `hcs://7/{topicId}`
   - `topicId` must be a valid HCS-7 Registry Topic ID

### Message Types and Fields

#### 1. EVM Configuration
```json
{
  "p": "hcs-7",
  "op": "register-config",
  "t": "evm",
  "c": {
    "contractAddress": "0x1d67aaf7f7e8d806bbeba24c4dea24808e1158b8",
    "abi": {
      "inputs": [],
      "name": "minted",
      "outputs": [
        {
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  },
  "m": "LaunchPage Test Mint"
}
```

**Field Descriptions:**
- `p`: Protocol identifier (must be "hcs-7")
- `op`: Operation type (must be "register-config")
- `t`: Configuration type (must be "evm")
- `c.contractAddress`: Ethereum contract address
- `c.abi`: Contract ABI with following fields:
  - `name`: Method name to call
  - `inputs`: Array of input parameters
  - `outputs`: Array of return types
  - `stateMutability`: Must be "view" or "pure"
  - `type`: Must be "function"

#### 2. WASM Configuration
```json
{
  "p": "hcs-7",
  "op": "register-config",
  "t": "wasm",
  "c": {
    "wasmTopicId": "0.0.5263817",
    "inputType": {
      "stateData": {
        "minted": "number"
      }
    },
    "outputType": {
      "type": "string",
      "format": "topic-id"
    }
  },
  "m": "minted-even-odd-router"
}
```

**Field Descriptions:**
- `p`: Protocol identifier (must be "hcs-7")
- `op`: Operation type (must be "register-config")
- `t`: Configuration type (must be "wasm")
- `c.wasmTopicId`: Topic ID containing WASM module
- `c.inputType`: JSON Schema for input data
  - `stateData`: Contract return value types
- `c.outputType`: Output specification
  - Must return valid topic ID

**Example WASM Code:**
```rust
#[wasm_bindgen]
pub fn process_state(state_json: &str, messages_json: &str) -> String {
    // Parse JSON inputs
    let state: Value = match serde_json::from_str(state_json) {
        Ok(data) => data,
        Err(_) => return String::new(),
    };

    let messages: Vec<Value> = match serde_json::from_str(messages_json) {
        Ok(data) => data,
        Err(_) => return String::new(),
    };

    // Get minted from state, return empty if invalid
    let minted = match parse_minted(&state) {
        Some(p) => p,
        None => return String::new()
    };

    // Process data - check if minted is even/odd
    let is_even = minted % 2u32 == BigUint::from(0u32);
    
    let topic_id = if is_even {
        // Find first matching even registration
        messages.iter()
            .find(|msg| {
                msg.get("t_id").is_some() && 
                msg.get("d")
                    .and_then(|d| d.get("tags"))
                    .and_then(|tags| tags.as_array())
                    .map(|tags| tags.iter().any(|t| t.as_str() == Some("even")))
                    .unwrap_or(false)
            })
            .and_then(|msg| msg.get("t_id").and_then(|id| id.as_str()))
            .map(|s| s.to_string())
    } else {
        // Find first matching odd registration
        messages.iter()
            .find(|msg| {
                msg.get("t_id").is_some() && 
                msg.get("d")
                    .and_then(|d| d.get("tags"))
                    .and_then(|tags| tags.as_array())
                    .map(|tags| tags.iter().any(|t| t.as_str() == Some("odd")))
                    .unwrap_or(false)
            })
            .and_then(|msg| msg.get("t_id").and_then(|id| id.as_str()))
            .map(|s| s.to_string())
    };

    // Return topic ID or empty string if none found
    topic_id.unwrap_or_default()
}
```
#### 3. Metadata Registration Messages
```json
{
  "p": "hcs-7",
  "op": "register",
  "t_id": "0.0.3717738",
  "m": "blue",
  "d": {
    "weight": 1,
    "tags": ["odd"]
  }
}
```

**Field Descriptions:**
- `p`: Protocol identifier (must be "hcs-7")
- `op`: Operation type (must be "register")
- `t_id`: HCS-1 topic ID containing metadata
- `m`: Message description
- `d`: Additional routing data
  - `weight`: Priority if multiple matches
  - `tags`: Routing identifiers

### Implementation Flow

1. **Setup Phase**
   - Create an indexed HCS-7 topic with memo format `hcs-7:indexed:{ttl}`
   - Deploy WASM module to a separate topic for processing state data
   - Submit initial EVM configuration message with contract address and ABI
   - Submit initial WASM configuration message referencing the WASM module topic
   - Create HCS-1 topics for each metadata variant (e.g., odd/even)
   - Register each HCS-1 topic with appropriate tags and weights
   - Validate all configurations are properly submitted and indexed

2. **Query Flow**
   - Read topic messages to get both EVM and WASM configurations
   - If EVM config exists, call the smart contract method specified in the EVM config to get state data
   - Collect all registered HCS-1 Topic messages with their additional data
   - Pass both the state data and message history to the WASM module
   - Use the returned Topic ID to serve the appropriate content

3. **Processing Requirements**
   - Smart contract calls must be view/pure
   - WASM execution under 50ms
   - Valid topic ID must be returned
   - Error handling required

### Error Handling

1. **Smart Contract Errors**
   - Invalid calls: Skip state update
   - Network issues: Use cached state
   - Contract not found: Fail validation

2. **WASM Processing Errors**
   - Invalid input: Return empty
   - Timeout: Fail gracefully
   - No match: Use default topic

3. **Metadata Errors**
   - Topic not found: Fail validation
   - Invalid format: Skip registration
   - Network issues: Use cache

### Limitations

1. **Smart Contract Limitations**
   - Must be public view/pure functions
   - No state mutations allowed
   - Must be verified and accessible
   - Gas costs considered

2. **WASM Limitations**
   - 50ms processing limit
   - Must handle all error cases
   - Limited to topic ID selection
   - Memory constraints

3. **Infrastructure Requirements**
   - Cache management required
   - Network reliability important
   - State consistency needed
   - Error recovery plans

## Conclusion

HCS-7 extends HCS-6 by enabling smart contract driven metadata selection through WASM processing. This creates a powerful system for dynamic NFTs while maintaining decentralization and trustlessness.
