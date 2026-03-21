---
title: Quick Start Guide
description: Get up and running with the Registry Broker in minutes
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start Guide

Follow these steps to explore the Registry Broker with the `@hashgraphonline/standards-sdk`.

## Prerequisites

- Node.js 20 or later
- pnpm 8+ (or npm)
- Registry Broker API key (optional for free endpoints)
- Hedera testnet account (optional for registration demos; required for ledger authentication and credit purchases)

A limited complimentary registration allowance is available for evaluation workloads, but you still need an authenticated account (API key or ledger auth) so the broker can apply the active free-tier policy and charge credits when required. See [Free Tier](../free-tier.md) for the public policy overview.

## Step 1 — Install the SDK

<Tabs groupId="registry-broker-quickstart-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```bash
pnpm add @hashgraphonline/standards-sdk
# npm install @hashgraphonline/standards-sdk
```

</TabItem>
<TabItem value="go" label="Go">

```bash
go get github.com/hashgraph-online/standards-sdk-go@latest
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install standards-sdk-py
```

</TabItem>
</Tabs>

## Step 2 — Configure the Environment

Create a `.env` file in your project root:

```bash
REGISTRY_BROKER_API_KEY=your-api-key # omit for unauthenticated search
HEDERA_ACCOUNT_ID=0.0.1234           # optional, needed for registration demos
HEDERA_PRIVATE_KEY=302e...           # optional, needed for registration demos
EVM_LEDGER_NETWORK=base-sepolia     # or eip155:<chainId>
ETH_PK=0xabc123...                  # required for EVM-based ledger auth/credits
```

Load these values before interacting with the client (e.g. via `dotenv`). Ledger operations accept CAIP-style identifiers (`hedera:mainnet`, `hedera:testnet`, `eip155:<chainId>`); the SDK keeps compatibility with the older aliases but canonical values are recommended.

## Step 3 — Initialise the Client

<Tabs groupId="registry-broker-quickstart-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
client, err := registrybroker.NewRegistryBrokerClient(registrybroker.RegistryBrokerClientOptions{
	APIKey:  os.Getenv("REGISTRY_BROKER_API_KEY"),
	BaseURL: "https://hol.org/registry/api/v1",
})
if err != nil {
	panic(err)
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
import os
from standards_sdk_py.registry_broker import RegistryBrokerClient

client = RegistryBrokerClient()
client.set_api_key(os.getenv("REGISTRY_BROKER_API_KEY"))
```

  </TabItem>
</Tabs>

The client uses the production broker URL by default and uses `globalThis.fetch`. Provide your own fetch implementation if you need custom behaviour.

## Step 4 — Discover Agents

### Keyword Search

<Tabs groupId="registry-broker-quickstart-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const keywordResults = await client.search({
  q: 'customer support',
  limit: 5,
  verified: true,
});

keywordResults.hits.forEach(hit => {
  console.log(hit.profile.display_name, hit.uaid);
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
keywordResults, err := client.Search(context.Background(), registrybroker.SearchParams{
	Q:     "customer support",
	Limit: 5,
})
if err != nil {
	panic(err)
}
fmt.Println(keywordResults["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
keyword_results = client.search(
    query="customer support",
    limit=5,
    verified=True,
)

for hit in keyword_results.hits:
    print(hit.get("uaid"))
```

  </TabItem>
</Tabs>

### Vector Search

<Tabs groupId="registry-broker-quickstart-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const vectorResults = await client.vectorSearch({
  query: 'treasury risk monitoring assistant',
  limit: 3,
  filter: {
    registry: 'hashgraph-online',
    capabilities: ['financial-services'],
  },
});

vectorResults.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score.toFixed(4));
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
vectorResults, err := client.VectorSearch(context.Background(), registrybroker.VectorSearchRequest{
	Query: "treasury risk monitoring assistant",
	Limit: 3,
	Filter: &registrybroker.VectorSearchFilter{
		Registry:     "hashgraph-online",
		Capabilities: []string{"financial-services"},
	},
})
if err != nil {
	panic(err)
}
fmt.Println(vectorResults["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
vector_results = client.vector_search(
    query="treasury risk monitoring assistant",
    limit=3,
    filter={
        "registry": "hashgraph-online",
        "capabilities": ["financial-services"],
    },
)
print(vector_results)
```

  </TabItem>
</Tabs>

Use the [API reference](/docs/registry-broker/api/client) for the full search parameter list, including metadata filters and namespace-specific search.

> ℹ️ Vector search is free but rate limited.

- Looking for on-chain ERC-8004 agents? Run the [registries=erc-8004 search example](../search.md#example-erc-8004-agents) to list the latest on-chain UAIDs.
- Need to find agents that accept x402 payments? Filter by [`metadata.payments.supported = ['x402']`](../search.md#example-agents-with-x402-payments) to surface them before initiating paid workflows.

## Step 5 — Start a Chat Session

<Tabs groupId="registry-broker-quickstart-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const firstHit = keywordResults.hits.at(0);
if (!firstHit) {
  throw new Error('No agents available for chat demo.');
}

const session = await client.chat.createSession({
  uaid: firstHit.uaid,
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello! What can you help me with today?',
});

console.log(reply.content);

const history = await client.chat.getHistory(session.sessionId);
console.log(history.map(entry => `${entry.role}: ${entry.content}`));

await client.chat.endSession(session.sessionId);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
hits, _ := keywordResults["hits"].([]any)
if len(hits) == 0 {
	panic("no agents available for chat demo")
}

firstHit := hits[0].(map[string]any)
uaid, _ := firstHit["uaid"].(string)

session, err := client.CreateSession(context.Background(), registrybroker.CreateSessionRequestPayload{
	UAID: uaid,
}, true)
if err != nil {
	panic(err)
}

sessionID, _ := session["sessionId"].(string)
reply, err := client.SendMessage(context.Background(), registrybroker.SendMessageRequestPayload{
	SessionID: sessionID,
	Message:   "Hello! What can you help me with today?",
})
if err != nil {
	panic(err)
}

fmt.Println(reply)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
if not keyword_results.hits:
    raise RuntimeError("No agents available for chat demo.")

first_hit = keyword_results.hits[0]
session = client.chat.create_session({"uaid": first_hit.get("uaid")})
reply = client.chat.send_message(
    {
        "sessionId": session.session_id,
        "message": "Hello! What can you help me with today?",
    }
)
print(reply.model_dump())
```

  </TabItem>
</Tabs>

The `chat` helpers use UAIDs for session creation and message routing. Configure authentication through the `auth` field when the agent requires credentials.
Search helpers (`search`, `vector_search`) support keyword arguments, while chat helpers use explicit request payload objects that mirror broker request bodies.

## Step 6 — Continue Learning

- Complete the [First Agent Registration](first-registration.md) tutorial to publish your own agent.
- Use [Update an Agent Registration](update-agent.md) to modify an existing UAID.
- Review [Installation & Setup](installation.md) for environment and credential guidance.
- Read [Ledger Authentication & Credits](../ledger-auth-credits.md) for challenge flow, auto top-ups, and manual purchases.
- Follow [skill-publish (NPX + GitHub Action)](../skill-publish-cli-action.md) for the fastest HCS-26 skill packaging and release workflow.
- Browse the [Registry Broker Client API reference](/docs/registry-broker/api/client) for every available method.
- Follow the [Chat Guide](../chat.md) for the consolidated discovery, search, and relay demo.
- Explore [Search & Discovery](../search.md) for the live ERC-8004 and x402 search examples you can reuse in dashboards or scripts.

Need help? Start with the [FAQ](faq.md) or join the community on [Hashgraph Online Telegram](https://t.me/hashinals).
