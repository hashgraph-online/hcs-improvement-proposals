---
title: Content References & HashLinks
description: Efficient content storage, references, and HashLink block metadata
---

Overview
- Large content is stored once and referenced thereafter to keep messages lean and consistent.
- HashLink blocks provide verifiable metadata payloads for rendering and auditing.

Content Store Basics
- A `ContentStoreManager` registers a shared content storage adapter.
- The agent stores content as references when it exceeds configured thresholds and resolves them when needed.

Reference Handling
- The agent intercepts messages containing `content-ref:<id>` and routes through inscription tools.
- If a form is required, the response sets `requiresForm: true` with a `formMessage` so you can collect missing fields.

Usage
```typescript
const r = await agent.processMessage('content-ref:abc123');
if (r.requiresForm && r.formMessage) {
  // Render & submit form, then call agent.processFormSubmission()
}
```

HashLink Blocks
- Certain tool responses attach `metadata.hashLinkBlock` with:
  - `blockId`: unique id of the block
  - `hashLink`: reference (e.g., to content or template)
  - `template`: renderer/template key
  - `attributes`: structured attributes for the renderer

Example Handling
```typescript
const res = await agent.processMessage('Generate a hashlink summary of the last release');
const block = res.metadata?.hashLinkBlock as
  | { blockId: string; hashLink: string; template: string; attributes: Record<string, unknown> }
  | undefined;
if (block) {
  // Render or persist block
}
```

Tuning
- Adjust content storage thresholds via `ContentStoreManager.updateConfig()` if needed.
- Use references to keep token usage predictable for long chats.

