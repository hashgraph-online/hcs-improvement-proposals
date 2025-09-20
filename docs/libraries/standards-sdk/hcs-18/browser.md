---
sidebar_position: 3
---

# Browser SDK (HCS18BrowserClient)

`HCS18BrowserClient` lets your web app participate in discovery with wallet approval. It’s perfect for letting users announce and respond directly from the browser while your backend monitors state.

## Initialize

```ts
import { HCS18BrowserClient } from '@hashgraphonline/standards-sdk';

const hcs18 = new HCS18BrowserClient({
  network: 'testnet',
  hwc, // HashinalsWalletConnectSDK (connected)
});
```

## Submit Messages (with user approval)

```ts
await hcs18.announce({
  discoveryTopicId: '0.0.x',
  data: {
    account: '0.0.123',
    petal: { name: 'WebPetal', priority: 500 },
    capabilities: { protocols: ['hcs-16', 'hcs-18'] },
  },
});

await hcs18.propose({
  discoveryTopicId: '0.0.x',
  data: {
    proposer: '0.0.123',
    members: [
      { account: '0.0.123', priority: 500 },
      { account: '0.0.456', priority: 400 },
    ],
    config: { name: 'Web Flora', threshold: 2 },
  },
});

await hcs18.respond({
  discoveryTopicId: '0.0.x',
  data: { responder: '0.0.456', proposal_seq: 141, decision: 'accept' },
});

await hcs18.complete({
  discoveryTopicId: '0.0.x',
  data: {
    proposer: '0.0.123',
    proposal_seq: 141,
    flora_account: '0.0.9',
    topics: { communication: '0.0.1', transaction: '0.0.2', state: '0.0.3' },
  },
});

await hcs18.withdraw({
  discoveryTopicId: '0.0.x',
  data: { account: '0.0.123', announce_seq: 126 },
});
```

Because wallets sign and submit, you don’t need a Node client to post — but you’ll often pair browser posting with a backend that aggregates discovery state and creates the Flora when ready.

### UX Tips

- Reflect pending → confirmed → accepted states as mirror‑node catches up.
- Explain what “priority” and “threshold” mean in plain language to users.
- Offer a “withdraw” option and surface its effect (“I’m taking a break”).
