---
title: Content References & HashLinks
description: Store big content once, pass lightweight references, and render rich HashLink blocks in responses
---

Why content references
- Long text, files, and images quickly bloat context windows. The agent can store large payloads once and refer to them by ID, keeping prompts and chat history compact and deterministic.

Reference format recognized by tools
- The agent and Standards SDK recognize the string pattern `content-ref:<id>` inside messages.
- Many inscription tools also accept a first‑class parameter (e.g., `contentRef`) so you don’t need to inline the reference in free‑text.

Creating references (attachments → references)
- If you pass file attachments through our UI (or a compatible integration), they are persisted via ContentStoreManager and the message is augmented with lines like:
  - `[Image File: sunset.png] (content-ref:abc123)`
  - `[File: report.pdf] (content-ref:def456)`
- You can also persist content yourself and inject `content-ref:<id>` into the user message before calling `agent.processMessage(...)`.

Handling references in chat
```ts
// 1) Reference in natural language
const r1 = await agent.processMessage('Please inscribe content-ref:abc123');
if (r1.requiresForm && r1.formMessage) {
  // Show the form (e.g., to collect name/description) and submit
}

// 2) Explicit parameter for tools that support it (preferred where available)
// Example: when the tool gets invoked via conversation, it passes contentRef internally
// If you’re driving an explicit tool call flow, include { contentRef: 'abc123' } in parameters.
```

Notes
- The reference ID is opaque. Tools resolve it through the ContentResolverRegistry to obtain the original bytes and any associated metadata (e.g., mimeType, filename).
- The same pattern works for base64 data: tools may accept `base64Data` as an alternative to `contentRef`/`url`.

HashLinks: rich blocks for UI rendering
- Some tools can return a structured HashLink block in the response metadata, suitable for rich rendering.
- InscribeHashinalTool supports `withHashLinkBlocks: true` to include a block alongside a successful inscription.

HashLink block shape
```ts
type HashLinkBlock = {
  blockId: string;               // Hedera account id of the HCS-12 block definition
  hashLink: string;              // hcs://12/<blockId>
  template: string;              // Template key (often equals blockId)
  attributes: Record<string, unknown>;  // Renderer inputs (name, creator, topicId, hrl, network, ...)
};
```

End-to-end example with InscribeHashinalTool
```ts
// Ask the agent to inscribe content by reference and include a HashLink block
const ask = 'Create a Hashinal from content-ref:abc123, include a HashLink block.';
const r1 = await agent.processMessage(ask);

if (r1.requiresForm && r1.formMessage) {
  const submission = {
    formId: r1.formMessage.id,
    toolName: r1.formMessage.toolName, // likely 'inscribeHashinal'
    parameters: {
      name: 'Sunset #42',
      description: 'Golden-hour skyline, edition of 1',
      creator: '0.0.123456',
      withHashLinkBlocks: true,
      renderForm: false,
    },
    timestamp: Date.now(),
  };
  const r2 = await agent.processFormSubmission(submission);

  const block = r2.metadata?.hashLinkBlock as
    | { blockId: string; hashLink: string; template: string; attributes: Record<string, unknown> }
    | undefined;
  if (block) {
    // Your renderer can look up the HCS-12 block (hcs://12/<blockId>)
    // and pass `attributes` to the appropriate client-side template.
  }
}
```

Tuning and thresholds
- The ContentStoreManager is initialized for you by the Conversational Agent. Large content is stored automatically based on size thresholds.
- If you manage storage yourself, you can adjust thresholds and cleanup policies on your storage adapter. Within apps that embed the agent, you can call `contentStoreManager.updateConfig(...)`.

Practical guidance
- Prefer `contentRef` parameters over embedding long content in free‑text.
- Keep the human message succinct; let the reference carry the payload.
- Ask tools that support it (e.g., InscribeHashinalTool) to include `withHashLinkBlocks: true` when you want richer UI metadata.
