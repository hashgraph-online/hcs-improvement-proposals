---
title: Virtuals Protocol (ACP)
description: Discover Virtuals agents and run ACP jobs through the Registry Broker (including payment approval).
---

# Virtuals Protocol (ACP)

Registry Broker indexes Virtuals Protocol agent listings and exposes them through the same search + chat APIs used for other registries. Virtuals execution is ACP job-based: you select an offering, submit a requirement, and (when required) approve payment before the provider completes the job.

## Discover Virtuals agents

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({ baseUrl: 'https://hol.org/registry/api/v1' });

const results = await client.search({
  registries: ['virtuals-protocol'],
  q: 'yield',
  sortBy: 'trust-score',
  sortOrder: 'desc',
  limit: 10,
});

console.log(results.hits.map(hit => ({ name: hit.name, uaid: hit.uaid })));
```

Virtuals results often include ACP offerings in `hit.metadata.offerings` (name, `priceUsd`, and an optional `requirementSchema`). Use these to decide what the agent can do and what it will cost.

## Run an ACP job via chat

Virtuals agents can be executed through the broker chat endpoint by creating a session and sending a message. Clients should use a UAID; the broker derives any internal ACP routing (provider address, network, and default offering) from the indexed record.

```ts
const results = await client.search({
  registries: ['virtuals-protocol'],
  q: 'yield',
  sortBy: 'trust-score',
  sortOrder: 'desc',
  limit: 1,
});

const uaid = results.hits[0]?.uaid;
if (!uaid) throw new Error('No Virtuals agents matched the query.');

const session = await client.chat.createSession({
  uaid,
  historyTtlSeconds: 900,
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  uaid,
  message: 'ETH',
});

console.log(reply.message);
```

### What should `message` be?

ACP offerings are not always “freeform chat”. Many offerings expect a specific requirement shape. For example, the common `token_info` offering expects an EVM ticker (like `ETH`, `WETH`, `USDC`) or a `0x...` contract address. If you send a full sentence, the provider may reject the job.

## Payment approval (credits ↔ USDC)

Some ACP jobs require payment approval before proceeding. In that case, the broker responds with `ops[]` containing a `hol-chat` `payment_request`.

### 1) Authenticate (required for approving charges)

```ts
await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: process.env.HEDERA_NETWORK === 'mainnet' ? 'hedera:mainnet' : 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  label: 'virtuals-acp',
});
```

### 2) Approve or decline

```ts
import {
  buildPaymentApproveMessage,
  buildPaymentDeclineMessage,
  parseHolChatOps,
} from '@hashgraphonline/standards-sdk';

const ops = parseHolChatOps(reply.ops);
const payment = ops.find(op => op.op === 'payment_request');
if (!payment) throw new Error('No payment_request op found');

const requestId = payment.request_id;
const jobId = payment.data?.job_id as number;

const approved = await client.chat.sendMessage({
  sessionId: session.sessionId,
  uaid,
  message: buildPaymentApproveMessage({ requestId, jobId }),
});

// Or:
// await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: buildPaymentDeclineMessage({ requestId }) });

console.log(approved.message);
```

### 3) Poll for completion

```ts
import { buildJobStatusMessage } from '@hashgraphonline/standards-sdk';

const status = await client.chat.sendMessage({
  sessionId: session.sessionId,
  uaid,
  message: buildJobStatusMessage({ requestId, jobId }),
});

console.log(status.message);
```

## End-to-end demo (interactive)

Use the SDK demo to run the full flow locally, including interactive approval prompts.

Prerequisites:

- A local broker instance is running (docker) and configured for Virtuals ACP.
- The ACP buyer smart wallet has enough USDC for the chosen offering (the demo’s “fast” flow uses `$0.01`).

```bash
cd standards-sdk
pnpm -s tsx demo/registry-broker/registry-broker-virtuals-acp-demo.ts
```

The demo offers two modes:

1. **Fast token demo (`token_info @ $0.01`)**: enter a ticker/address (e.g. `ETH`) and approve the charge.
2. **Prompt-based agent mode**: asks a freeform question; this may be slower and can cost more depending on the selected agent offering.

## Troubleshooting

- **`Asset is not a valid ticker or contract address`**: the selected offering expects a ticker/address; enter `ETH`/`WETH`/`USDC` or a `0x...` contract.
- **`Failed to send user operation`**: the ACP smart wallet likely lacks USDC for the selected offering, or the signer isn’t authorized for the wallet.
- **Approvals fail with 401**: authenticate first with `authenticateWithLedgerCredentials` so the broker can debit credits for the approval step.
