---
title: Node — HCS‑15Client
description: Use HCS15Client to create a base account (ECDSA + EVM alias), create Petal accounts with shared keys, verify linkage, and close resources.
sidebar_position: 2
---

```ts
import 'dotenv/config';
import { HCS15Client, HCS10Client, AgentBuilder, InboundTopicType, AIAgentCapability } from '@hashgraphonline/standards-sdk';

async function main() {
  const network = (process.env.HEDERA_NETWORK as 'testnet' | 'mainnet') || 'testnet';
  const operatorId = process.env.HEDERA_OPERATOR_ID || process.env.HEDERA_ACCOUNT_ID!;
  const operatorKey = process.env.HEDERA_OPERATOR_KEY || process.env.HEDERA_PRIVATE_KEY!;

  const client = new HCS15Client({ network, operatorId, operatorKey });

  const base = await client.createBaseAccount({ initialBalance: 1, accountMemo: 'HCS-15 Base' });
  const petal = await client.createPetalAccount({ basePrivateKey: base.privateKey, initialBalance: 0.5, accountMemo: 'HCS-15 Petal' });
  const linked = await client.verifyPetalAccount(petal.accountId, base.accountId);

  const hcs10 = new HCS10Client({ network, operatorId: base.accountId, operatorPrivateKey: base.privateKey.toString(), keyType: 'ecdsa' });
  const builder = new AgentBuilder()
    .setName('Demo Petal')
    .setBio('Per‑experience identity')
    .setCapabilities([AIAgentCapability.TEXT_GENERATION])
    .setInboundTopicType(InboundTopicType.PUBLIC)
    .setBaseAccount(base.accountId)
    .setNetwork(network);
  const profile = await hcs10.createAgent(builder, 60);

  await client.close();
}

main().catch(console.error);
```

Key methods:

- `createBaseAccount({ initialBalance?, maxAutomaticTokenAssociations?, accountMemo? })`
- `createPetalAccount({ basePrivateKey, initialBalance?, maxAutomaticTokenAssociations?, accountMemo? })`
- `verifyPetalAccount(petalAccountId, baseAccountId)`
- `close()`

