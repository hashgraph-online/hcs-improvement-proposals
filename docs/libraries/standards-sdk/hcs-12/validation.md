---
title: Validation & Schemas
description: Validate HCS-12 registrations/messages and verify WASM module interfaces
---

# HCS-12 Validation & Schemas

The Standards SDK exposes runtime validation for HashLinks components and messages, plus a WASM validator to enforce the module interface contract.

## Zod Schemas & Helpers

```ts
import {
  validateActionRegistration,
  validateBlockRegistration,
  validateAssemblyMessage,
  validateAssemblyRegistration,
  validateHashLinksRegistration,
  actionRegistrationSchema,
  safeValidate,
  validateWithSchema,
} from '@hashgraphonline/standards-sdk';

// Validate a block definition before registering
try {
  validateBlockRegistration(blockDefinition);
} catch (error) {
  console.error(error);
}

// Safer variant that never throws
const ok = safeValidate(actionRegistrationSchema, actionReg);
```

- `validateActionRegistration` – ensures action registration (WASM mapping + metadata) is well-formed
- `validateBlockRegistration` – validates block definition (attributes, actions, template link)
- `validateAssemblyMessage` – validates assembly ops/messages
- `validateAssemblyRegistration` – validates assembly composition payloads
- `validateHashLinksRegistration` – high-level registry entry validation
- `safeValidate` – wraps a validation call and returns a consistent result shape
- `validateWithSchema` – pass a custom Zod schema to validate arbitrary data

## WASM Module Contract

HashLinks requires WASM modules to expose a minimal interface so SDKs can interact with them consistently:

- `INFO()` → string (JSON) describing module metadata: name, version, declared actions and types
- `POST(...)` → state-changing entrypoint for operations
- `GET(...)` → read-only entrypoint for queries

```ts
import { Logger, WasmValidator } from '@hashgraphonline/standards-sdk';

const logger = new Logger({ module: 'WasmValidation' });
const validator = new WasmValidator(logger);
const result = await validator.validate(wasmBuffer);

if (!result.isValid) {
  console.error(result.errors);
}

console.log(result.exports);          // e.g., ['INFO', 'POST', 'GET']
console.log(result.exportSignatures);  // parsed function signatures if available
```

The validator inspects exports/imports, basic signatures, and can report missing functions (`INFO`, `POST`, `GET`). It does not execute untrusted code: it parses the module structure to verify the contract.

## Recommended Flow

1. Build your WASM module and run `WasmValidator.validate()` locally.
2. Validate registrations (`validate*`) before broadcasting to HCS.
3. In CI: fail fast on invalid blocks/actions/assemblies.
4. At runtime: use `safeValidate` for graceful error handling.

## Common Errors

- Missing `INFO`/`POST`/`GET` export → add required functions to the module.
- Invalid attribute types in a block → ensure types align with UI/renderer expectations.
- Assembly references unresolved → register actions/blocks first, then bind in assemblies.
