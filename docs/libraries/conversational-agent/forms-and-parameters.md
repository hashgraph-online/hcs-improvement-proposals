---
title: Forms & Parameter Collection
description: Collecting structured parameters with forms and validating tool inputs
---

Overview
- The agent can pause to collect missing parameters using dynamic forms, then resume the tool call once supplied.
- Works with the internal Form Engine, pending forms management, and preprocessing hooks for parameter sanitation.

Flow
1. User asks for an operation that requires inputs (e.g., transfer).
2. Agent detects missing parameters and returns `requiresForm: true` and a `formMessage` payload.
3. UI renders a form based on `formMessage` and collects values.
4. Submit via `agent.processFormSubmission(submission)` to resume execution.

Example: Handling a form
```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({ /* config */ });
await agent.initialize();

const r1 = await agent.processMessage('Please inscribe this content');
if (r1.requiresForm && r1.formMessage) {
  // Render form from r1.formMessage
  const submission = {
    formId: (r1.formMessage as any).id,
    toolName: 'inscribe',
    parameters: {
      content: 'hello world',
      encoding: 'utf8',
    },
  };
  const r2 = await agent.processFormSubmission(submission);
  console.log(r2.output);
}
```

Preprocessing & Validation
- The agent supports a parameter preprocessing hook to massage inputs before execution.
- Add guards (normalization, min/max checks, enum mapping) before passing to the tool.

Tips
- Preserve `formMessage.id` for resubmission.
- Use concise labels and helper text in UI.
- Pre-fill from prior context or Smart Memory where applicable.

