---
title: Operational Modes & Transactions
description: Direct execution vs returning bytes, and scheduling options
---

Overview
- The agent runs in two modes:
  - `autonomous` (default): executes transactions directly with the configured signer.
  - `returnBytes`: prepares transactions and returns `transactionBytes` so your app can sign/submit.

Configuration
```typescript
import { ConversationalAgent } from '@hashgraphonline/conversational-agent';

const agent = new ConversationalAgent({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  privateKey: process.env.HEDERA_PRIVATE_KEY!,
  openAIApiKey: process.env.OPENAI_API_KEY!,
  operationalMode: 'returnBytes',
  // Optional: also schedule automatically while in bytes mode
  scheduleUserTransactionsInBytesMode: true,
});
await agent.initialize();
```

Inspecting Responses
```typescript
const r = await agent.processMessage('Create an HCS topic for release announcements');

if (r.transactionBytes) {
  // returnBytes mode: sign & submit manually using Hedera SDK
  // const tx = Transaction.fromBytes(Buffer.from(r.transactionBytes, 'base64'))
  // tx.sign(yourKey); await tx.execute(client);
}

if (r.transactionId || r.receipt) {
  // autonomous mode or scheduled result
}
```

Best Practices
- Use `returnBytes` where you must control user signatures or custodial policy.
- Use `autonomous` for faster prototyping and internal automation.
- Provide `userAccountId` when the operation context depends on a specific user.

