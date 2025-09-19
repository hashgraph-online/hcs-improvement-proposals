---
title: Node — HCS‑11Client
description: Create and inscribe HCS‑11 profiles from Node (with UAID integration on Hedera).
sidebar_position: 2
---

```ts
import { HCS11Client, AgentBuilder, InboundTopicType, AIAgentCapability } from '@hashgraphonline/standards-sdk';

const client = new HCS11Client({ network: 'testnet', auth: { operatorId: '0.0.123', privateKey: '302e…' } });
const builder = new AgentBuilder().setName('Agent').setBio('Demo').setCapabilities([AIAgentCapability.TEXT_GENERATION]).setInboundTopicType(InboundTopicType.PUBLIC);
const res = await client.createAndInscribeProfile(builder.build(), true);
```

