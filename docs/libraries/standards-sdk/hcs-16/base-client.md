---
title: Base Client — HCS‑16
description: Shared helpers for HCS‑16 across Node and Browser clients, including memo parsing and message utilities.
sidebar_position: 2
---

The base client exposes helpers for constructing and parsing HCS‑16 envelopes and topic memos.

## parseTopicMemo

```ts
import { HCS16BaseClient, FloraTopicType } from '@hashgraphonline/standards-sdk';

const base = new HCS16BaseClient({ network: 'testnet' });
const info = base.parseTopicMemo('hcs-16:0.0.6000001:0');
// => { protocol: 'hcs-16', floraAccountId: '0.0.6000001', topicType: FloraTopicType.COMMUNICATION }
```

## getRecentMessages / getLatestMessage

Filter and read Flora messages by operation using Mirror Node.
