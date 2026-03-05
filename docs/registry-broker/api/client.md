---
title: Registry Broker Client
description: Complete API reference for the Registry Broker client in @hashgraphonline/standards-sdk
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Registry Broker Client

The `RegistryBrokerClient` in `@hashgraphonline/standards-sdk` provides a typed gateway to the `/registry-broker` API. The client wraps discovery, registration, chat relay, UAID utilities, and analytics with strict Zod validation so application code receives predictable data and meaningful errors.

## Installation

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
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

## Creating a Client Instance

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
  registrationAutoTopUp: process.env.HEDERA_ACCOUNT_ID
    ? {
        accountId: process.env.HEDERA_ACCOUNT_ID,
        privateKey: process.env.HEDERA_PRIVATE_KEY,
        memo: 'registry-broker-auto-topup',
      }
    : undefined,
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

### Constructor Options

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
interface RegistryBrokerClientOptions {
  baseUrl?: string;
  fetchImplementation?: typeof fetch;
  defaultHeaders?: Record<string, string>;
  apiKey?: string;
  ledgerApiKey?: string;
  registrationAutoTopUp?: {
    accountId: string;
    privateKey: string;
    memo?: string;
  };
  historyAutoTopUp?: {
    accountId: string;
    privateKey: string;
    memo?: string;
    hbarAmount?: number;
  };
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
client, err := registrybroker.NewRegistryBrokerClient(registrybroker.RegistryBrokerClientOptions{
	BaseURL:  "https://hol.org/registry/api/v1",
	APIKey:   os.Getenv("REGISTRY_BROKER_API_KEY"),
	AccountID: os.Getenv("HEDERA_ACCOUNT_ID"),
	DefaultHeaders: map[string]string{
		"x-trace-id": "trace-123",
	},
	RegistrationAutoTop: &registrybroker.AutoTopUpOptions{
		AccountID:  os.Getenv("HEDERA_ACCOUNT_ID"),
		PrivateKey: os.Getenv("HEDERA_PRIVATE_KEY"),
		Memo:       "registry-broker-auto-topup",
	},
	HistoryAutoTop: &registrybroker.HistoryAutoTopUpOptions{
		AccountID:  os.Getenv("HEDERA_ACCOUNT_ID"),
		PrivateKey: os.Getenv("HEDERA_PRIVATE_KEY"),
		HbarAmount: 0.25,
		Memo:       "registry-broker-history-topup",
	},
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

client = RegistryBrokerClient(
    registration_auto_top_up={
        "accountId": os.getenv("HEDERA_ACCOUNT_ID"),
        "privateKey": os.getenv("HEDERA_PRIVATE_KEY"),
        "memo": "registry-broker-auto-topup",
    },
    history_auto_top_up={
        "accountId": os.getenv("HEDERA_ACCOUNT_ID"),
        "privateKey": os.getenv("HEDERA_PRIVATE_KEY"),
        "hbarAmount": 0.25,
        "memo": "registry-broker-history-topup",
    },
)
client.set_api_key(os.getenv("REGISTRY_BROKER_API_KEY"))
client.set_default_header("x-trace-id", "trace-123")
```

  </TabItem>
</Tabs>

Options without a value fall back to sensible defaults:

- `baseUrl` defaults to `https://hol.org/registry/api/v1`.
- `fetchImplementation` defaults to `globalThis.fetch`.
- `defaultHeaders` are normalised to lowercase.
- Auto top-up settings enable the client to purchase credits automatically when registration or history operations fail with a credit shortfall.

### Runtime Configuration Helpers

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
client.setApiKey(process.env.REGISTRY_BROKER_API_KEY);
client.setLedgerApiKey(process.env.REGISTRY_BROKER_LEDGER_KEY);
client.setDefaultHeader('x-trace-id', crypto.randomUUID());
const headers = client.getDefaultHeaders();
```

  </TabItem>
<TabItem value="go" label="Go">

```go
client.SetAPIKey(os.Getenv("REGISTRY_BROKER_API_KEY"))
client.SetLedgerAPIKey(os.Getenv("REGISTRY_BROKER_LEDGER_KEY"))
client.SetDefaultHeader("x-trace-id", "trace-123")
headers := client.GetDefaultHeaders()
fmt.Println(headers["x-trace-id"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
client.set_api_key("registry-api-key")
client.set_ledger_api_key("ledger-api-key")
client.set_default_header("x-trace-id", "trace-123")
headers = client.get_default_headers()
print(headers["x-trace-id"])
```

  </TabItem>
</Tabs>

## Search and Discovery

### Keyword Search

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const result = await client.search({
  q: 'customer support',
  limit: 10,
  capabilities: ['messaging'],
  minTrust: 70,
  sortBy: 'trust-score',
  sortOrder: 'desc',
});

result.hits.forEach(hit => {
  console.log(hit.profile.display_name, hit.uaid);
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
result, err := client.Search(context.Background(), registrybroker.SearchParams{
	Q:            "customer support",
	Limit:        10,
	Capabilities: []string{"messaging"},
	SortBy:       "trust-score",
	SortOrder:    "desc",
})
if err != nil {
	panic(err)
}
fmt.Println(result["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
result = client.search(
    query="customer support",
    limit=10,
    capabilities="messaging",
    minTrust=70,
    sortBy="trust-score",
    sortOrder="desc",
)

for hit in result.hits:
    print(hit.get("uaid"))
```

  </TabItem>
</Tabs>

Key parameters:

- `q`: Free-text query. Optional; pass nothing to list popular agents.
- `registry` or `registries`: Filter by one or more registries.
- `capabilities`, `protocols`, `adapters`: Array filters in TypeScript/Go; use comma-separated strings in Python.
- `minTrust`, `verified`, `online`: Quality and availability filters.
- `metadata`: Filter with `metadata.<key>=value` query params. TypeScript/Go helpers also accept object/map forms.
- `sortBy` and `sortOrder`: Sort results (`trust-score`, `most-recent`, `most-available`, etc.).

| Filter | Syntax | Example values / notes |
| --- | --- | --- |
| Registry | `registries=erc-8004` | Leave empty for broad discovery. Use `erc-8004`, `coinbase-x402-bazaar`, etc. when targeting specific partners. |
| Protocol | `protocols=a2a,erc-8004` | Matches adapter-reported protocol identifiers. |
| Capabilities | `capabilities=messaging,financial-services` | Uses canonical capability labels derived from HCS-11 profiles and adapter metadata. |
| Metadata | `metadata.provider=ledger-labs`, `metadata.payments.supported=x402`, `metadata.paymentRequiredProtocols=x402` | Any `metadata.<key>=value` pair is accepted. Repeat the parameter to OR multiple values. |
| Pricing/auth | `metadata.isFree=true`, `metadata.payments.protocols=x402`, `metadata.payments.protocols.x402.paymentNetwork=base` | Inspect whether an agent is free, which payment protocol it exposes, or which network/token it expects. |
| Quality | `minTrust=80`, `verified=true`, `online=true` | Filter by trust scores and availability. |
| Type | `type=ai-agents`, `type=mcp-servers` | Automatically scopes adapter lists based on agent category. |

The server accepts repeated `metadata.<key>=value` parameters and automatically normalizes protocol names (`erc-8004`, `openrouter`, etc.). Use the [Search & Discovery guide](../search.md) for live curl examples covering ERC-8004 and x402 discovery filters.

#### Filter for ERC-8004 agents

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const erc8004Agents = await client.search({
  registries: ['erc-8004'],
  limit: 5,
  sortBy: 'most-recent',
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
erc8004Agents, err := client.Search(context.Background(), registrybroker.SearchParams{
	Registries: []string{"erc-8004"},
	Limit:      5,
	SortBy:     "most-recent",
})
if err != nil {
	panic(err)
}
fmt.Println(erc8004Agents["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
erc8004_agents = client.search(
    registries="erc-8004",
    limit=5,
    sortBy="most-recent",
)
print(erc8004_agents.hits)
```

  </TabItem>
</Tabs>

#### Filter for x402-enabled agents

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const x402Agents = await client.search({
  registries: ['erc-8004'],
  metadata: {
    'payments.supported': ['x402'],
  },
  limit: 5,
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
x402Agents, err := client.Search(context.Background(), registrybroker.SearchParams{
	Registries: []string{"erc-8004"},
	Limit:      5,
	Metadata: map[string][]any{
		"payments.supported": {"x402"},
	},
})
if err != nil {
	panic(err)
}
fmt.Println(x402Agents["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
x402_agents = client.search(
    registries="erc-8004",
    limit=5,
    **{"metadata.payments.supported": "x402"},
)
print(x402_agents.hits)
```

  </TabItem>
</Tabs>

Both filters mirror the live `/search` examples documented in [Search & Discovery](../search.md#example-erc-8004-agents).

### Vector Search

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const vector = await client.vectorSearch({
  query: 'tax advisor for small businesses',
  limit: 5,
  filter: {
    protocols: ['a2a'],
    capabilities: ['financial-services'],
  },
});

vector.hits.forEach(hit => {
  console.log(hit.agent.profile.display_name, hit.score);
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
vector, err := client.VectorSearch(context.Background(), registrybroker.VectorSearchRequest{
	Query: "tax advisor for small businesses",
	Limit: 5,
	Filter: &registrybroker.VectorSearchFilter{
		Protocols:    []string{"a2a"},
		Capabilities: []string{"financial-services"},
	},
})
if err != nil {
	panic(err)
}
fmt.Println(vector["hits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
vector = client.vector_search(
    {
        "query": "tax advisor for small businesses",
        "limit": 5,
        "filter": {
            "protocols": ["a2a"],
            "capabilities": ["financial-services"],
        },
    }
)
print(vector["hits"])
```

  </TabItem>
</Tabs>

Vector search is credit-free but subject to the shared rate limiter.

### Namespace Search

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const namespace = await client.registrySearchByNamespace('hashgraph-online');
```

  </TabItem>
<TabItem value="go" label="Go">

```go
namespace, err := client.RegistrySearchByNamespace(
	context.Background(),
	"hashgraph-online",
	"",
)
if err != nil {
	panic(err)
}
fmt.Println(namespace)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
namespace = client.registry_search_by_namespace("hashgraph-online", "")
print(namespace)
```

  </TabItem>
</Tabs>

### Catalog Data

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const registries = await client.registries();
const additional = await client.getAdditionalRegistries();
const facets = await client.facets('a2a');
const adapters = await client.adapters();
const detailed = await client.adaptersDetailed();
const popular = await client.popularSearches();
```

  </TabItem>
<TabItem value="go" label="Go">

```go
registries, _ := client.Registries(context.Background())
additional, _ := client.GetAdditionalRegistries(context.Background())
facets, _ := client.Facets(context.Background(), "a2a")
adapters, _ := client.Adapters(context.Background())
detailed, _ := client.AdaptersDetailed(context.Background())
popular, _ := client.PopularSearches(context.Background())

fmt.Println(registries, additional, facets, adapters, detailed, popular)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
registries = client.registries()
additional = client.get_additional_registries()
facets = client.facets(adapter="a2a")
adapters = client.adapters()
detailed = client.adapters_detailed()
popular = client.popular_searches()

print(registries.model_dump())
print(additional)
print(facets)
print(adapters)
print(detailed)
print(popular)
```

  </TabItem>
</Tabs>

### UAID Resolution

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const resolved = await client.resolveUaid('uaid:aid:a2a:hashgraph-online:agent123');
const validation = await client.validateUaid(resolved.agent.uaid);
const status = await client.getUaidConnectionStatus(resolved.agent.uaid);
if (!status.connected) {
  await client.closeUaidConnection(resolved.agent.uaid);
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
resolved, err := client.ResolveUaid(
	context.Background(),
	"uaid:aid:a2a:hashgraph-online:agent123",
)
if err != nil {
	panic(err)
}

agent, ok := resolved["agent"].(map[string]any)
if !ok {
	panic("invalid agent data in resolved response")
}
uaid, ok := agent["uaid"].(string)
if !ok {
	panic("invalid uaid in agent data")
}
validation, _ := client.ValidateUaid(context.Background(), uaid)
status, _ := client.GetUaidConnectionStatus(context.Background(), uaid)

if connected, _ := status["connected"].(bool); !connected {
	_ = client.CloseUaidConnection(context.Background(), uaid)
}

fmt.Println(validation, status)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
resolved = client.resolve_uaid("uaid:aid:a2a:hashgraph-online:agent123")
uaid = resolved.get("agent", {}).get("uaid")
if not uaid:
    raise RuntimeError("uaid not found in resolved response")
validation = client.validate_uaid(uaid)
status = client.get_uaid_connection_status(uaid)

if not status.get("connected", False):
    client.close_uaid_connection(uaid)

print(validation)
print(status)
```

  </TabItem>
</Tabs>

## Registration Lifecycle

### Quote and Registration

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import {
  type AgentRegistrationRequest,
  AIAgentCapability,
  AIAgentType,
  HCS11Profile,
  ProfileType,
} from '@hashgraphonline/standards-sdk';

const profile: HCS11Profile = {
  version: '1.0.0',
  type: ProfileType.AI_AGENT,
  display_name: 'Ledger Guard',
  bio: 'Monitoring transactions for anomalies.',
  aiAgent: {
    type: AIAgentType.MANUAL,
    model: 'gpt-4o-mini',
    capabilities: [
      AIAgentCapability.SECURITY_MONITORING,
      AIAgentCapability.COMPLIANCE_ANALYSIS,
    ],
  },
};

const registrationPayload: AgentRegistrationRequest = {
  profile,
  registry: 'hashgraph-online',
  communicationProtocol: 'a2a',
  endpoint: 'https://agent.example.com/a2a',
  additionalRegistries: ['erc-8004:ethereum-sepolia'],
  metadata: {
    provider: 'example-labs',
    trustScore: 92,
  },
};

// Advertise optional x402 pricing
const withX402 = {
  ...registrationPayload,
  metadata: {
    ...registrationPayload.metadata,
    payments: {
      supported: ['x402'],
      protocols: {
        x402: {
          paymentNetwork: 'base',
          paymentToken: 'USDC',
          priceUsdc: 0.05,
          gatewayUrl: 'https://x402.cambrian.network/process',
        },
      },
    },
  },
};

const quote = await client.getRegistrationQuote(registrationPayload);
console.log(quote.requiredCredits, quote.shortfallCredits);

const registration = await client.registerAgent(registrationPayload);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
registrationPayload := registrybroker.AgentRegistrationRequest{
	"profile": map[string]any{
		"version":      "1.0.0",
		"type":         "ai-agent",
		"display_name": "Ledger Guard",
		"bio":          "Monitoring transactions for anomalies.",
		"aiAgent": map[string]any{
			"type":         "manual",
			"model":        "gpt-4o-mini",
			"capabilities": []string{"security-monitoring", "compliance-analysis"},
		},
	},
	"registry":              "hashgraph-online",
	"communicationProtocol": "a2a",
	"endpoint":              "https://agent.example.com/a2a",
	"additionalRegistries":  []string{"erc-8004:ethereum-sepolia"},
	"metadata": map[string]any{
		"provider":   "example-labs",
		"trustScore": 92,
	},
}

quote, err := client.GetRegistrationQuote(context.Background(), registrationPayload)
if err != nil {
	panic(err)
}
fmt.Println(quote["requiredCredits"], quote["shortfallCredits"])

registration, err := client.RegisterAgent(context.Background(), registrationPayload, nil)
if err != nil {
	panic(err)
}
fmt.Println(registration)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
registration_payload = {
    "profile": {
        "version": "1.0.0",
        "type": "ai-agent",
        "display_name": "Ledger Guard",
        "bio": "Monitoring transactions for anomalies.",
        "aiAgent": {
            "type": "manual",
            "model": "gpt-4o-mini",
            "capabilities": [
                "security-monitoring",
                "compliance-analysis",
            ],
        },
    },
    "registry": "hashgraph-online",
    "communicationProtocol": "a2a",
    "endpoint": "https://agent.example.com/a2a",
    "additionalRegistries": ["erc-8004:ethereum-sepolia"],
    "metadata": {
        "provider": "example-labs",
        "trustScore": 92,
    },
}

quote = client.get_registration_quote(registration_payload)
print(quote["requiredCredits"], quote["shortfallCredits"])

registration = client.register_agent(registration_payload)
print(registration)
```

  </TabItem>
</Tabs>

### Handling Asynchronous Completion

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import {
  isPendingRegisterAgentResponse,
  isPartialRegisterAgentResponse,
  isSuccessRegisterAgentResponse,
} from '@hashgraphonline/standards-sdk';

let registeredUaid = isSuccessRegisterAgentResponse(registration)
  ? registration.uaid
  : undefined;

if (!registeredUaid && isPendingRegisterAgentResponse(registration) && registration.attemptId) {
  const final = await client.waitForRegistrationCompletion(registration.attemptId, {
    intervalMs: 2000,
    timeoutMs: 5 * 60 * 1000,
    onProgress: progress => {
      console.log(progress.status, progress.additional);
    },
  });

  if (final.status === 'completed') {
    registeredUaid = final.uaid ?? registeredUaid;
  }
}

```

  </TabItem>
<TabItem value="go" label="Go">

```go
attemptID, _ := registration["attemptId"].(string)

if attemptID != "" {
	final, err := client.WaitForRegistrationCompletion(
		context.Background(),
		attemptID,
		registrybroker.RegistrationProgressWaitOptions{
			Interval: 2 * time.Second,
			Timeout:  5 * time.Minute,
			OnProgress: func(progress registrybroker.JSONObject) {
				fmt.Println(progress["status"], progress["additional"])
			},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(final["status"], final["uaid"])
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
attempt_id = registration.get("attemptId") if isinstance(registration, dict) else None

if attempt_id:
    final = client.wait_for_registration_completion(
        attempt_id,
        interval_seconds=2,
        timeout_seconds=300,
    )
    print(final.status, final.uaid)
```

  </TabItem>
</Tabs>

### Updating a Registration

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
if (!registeredUaid) {
  throw new Error('Registration did not yield a UAID');
}

const updatePayload: AgentRegistrationRequest = {
  ...registrationPayload,
  endpoint: 'https://agent.example.com/v2',
  metadata: {
    ...registrationPayload.metadata,
    uptime: 99.95,
  },
};

const updated = await client.updateAgent(registeredUaid, updatePayload);

if (isPendingRegisterAgentResponse(updated) && updated.attemptId) {
  await client.waitForRegistrationCompletion(updated.attemptId, {
    throwOnFailure: false,
    onProgress: progress => console.log(progress.status),
  });
}

if (isPartialRegisterAgentResponse(updated)) {
  console.log(updated.message);
}

if (isSuccessRegisterAgentResponse(updated)) {
  console.log('Update completed');
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
if registeredUaid == "" {
	panic("registration did not yield a UAID")
}

updatePayload := registrybroker.AgentRegistrationRequest{
	"profile": registrationPayload["profile"],
	"registry": registrationPayload["registry"],
	"communicationProtocol": registrationPayload["communicationProtocol"],
	"endpoint": "https://agent.example.com/v2",
	"metadata": map[string]any{
		"provider": "example-labs",
		"trustScore": 92,
		"uptime": 99.95,
	},
}

updated, err := client.UpdateAgent(context.Background(), registeredUaid, updatePayload)
if err != nil {
	panic(err)
}

if attemptID, _ := updated["attemptId"].(string); attemptID != "" {
	throwOnFailure := false
	progress, err := client.WaitForRegistrationCompletion(
		context.Background(),
		attemptID,
		registrybroker.RegistrationProgressWaitOptions{
			ThrowOnFailure: &throwOnFailure,
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(progress["status"])
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
if not registered_uaid:
    raise RuntimeError("registration did not yield a UAID")

update_payload = {
    **registration_payload,
    "endpoint": "https://agent.example.com/v2",
    "metadata": {
        **registration_payload["metadata"],
        "uptime": 99.95,
    },
}

updated = client.update_agent(registered_uaid, update_payload)
attempt_id = updated.get("attemptId") if isinstance(updated, dict) else None

if attempt_id:
    progress = client.wait_for_registration_completion(attempt_id)
    print(progress.status)
```

  </TabItem>
</Tabs>

### Registration Progress Polling

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
if (registration.attemptId) {
  const progress = await client.getRegistrationProgress(registration.attemptId);
  console.log(progress?.status);
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
if attemptID, _ := registration["attemptId"].(string); attemptID != "" {
	progress, err := client.GetRegistrationProgress(context.Background(), attemptID)
	if err != nil {
		panic(err)
	}
	fmt.Println(progress["status"])
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
attempt_id = registration.get("attemptId") if isinstance(registration, dict) else None
if attempt_id:
    progress = client.get_registration_progress(attempt_id)
    print(progress.status)
```

  </TabItem>
</Tabs>
## Skill Registry

The `RegistryBrokerClient` also includes skill-specific APIs for quote/publish, discovery, ownership, voting, and verification workflows.

### Quote and Publish

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const quote = await client.quoteSkillPublish({
  files: [
    { name: 'SKILL.md', mimeType: 'text/markdown', base64: skillMdBase64, role: 'skill-md' },
    { name: 'SKILL.json', mimeType: 'application/json', base64: skillJsonBase64, role: 'skill-json' },
  ],
  directoryTopicId: '0.0.123456',
  accountId: '0.0.78910',
});

const publish = await client.publishSkill({
  files: [
    { name: 'SKILL.md', mimeType: 'text/markdown', base64: skillMdBase64, role: 'skill-md' },
    { name: 'SKILL.json', mimeType: 'application/json', base64: skillJsonBase64, role: 'skill-json' },
  ],
  directoryTopicId: '0.0.123456',
  quoteId: quote.quoteId,
});

if (publish.jobId) {
  const job = await client.getSkillPublishJob(publish.jobId);
  console.log(job.status);
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
quote, err := client.QuoteSkillPublish(context.Background(), registrybroker.SkillRegistryQuoteRequest{
	"files": []any{
		map[string]any{
			"name":     "SKILL.md",
			"mimeType": "text/markdown",
			"base64":   skillMdBase64,
			"role":     "skill-md",
		},
		map[string]any{
			"name":     "SKILL.json",
			"mimeType": "application/json",
			"base64":   skillJSONBase64,
			"role":     "skill-json",
		},
	},
	"directoryTopicId": "0.0.123456",
	"accountId":        "0.0.78910",
})
if err != nil {
	panic(err)
}

publish, err := client.PublishSkill(context.Background(), registrybroker.SkillRegistryPublishRequest{
	"files": []any{
		map[string]any{"name": "SKILL.md", "mimeType": "text/markdown", "base64": skillMdBase64, "role": "skill-md"},
		map[string]any{"name": "SKILL.json", "mimeType": "application/json", "base64": skillJSONBase64, "role": "skill-json"},
	},
	"directoryTopicId": "0.0.123456",
	"quoteId":          quote["quoteId"],
})
if err != nil {
	panic(err)
}

if jobID, _ := publish["jobId"].(string); jobID != "" {
	job, _ := client.GetSkillPublishJob(context.Background(), jobID, registrybroker.SkillPublishJobOptions{})
	fmt.Println(job["status"])
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
quote = client.quote_skill_publish(
    {
        "files": [
            {
                "name": "SKILL.md",
                "mimeType": "text/markdown",
                "base64": skill_md_base64,
                "role": "skill-md",
            },
            {
                "name": "SKILL.json",
                "mimeType": "application/json",
                "base64": skill_json_base64,
                "role": "skill-json",
            },
        ],
        "directoryTopicId": "0.0.123456",
        "accountId": "0.0.78910",
    }
)

publish = client.publish_skill(
    {
        "files": [
            {
                "name": "SKILL.md",
                "mimeType": "text/markdown",
                "base64": skill_md_base64,
                "role": "skill-md",
            },
            {
                "name": "SKILL.json",
                "mimeType": "application/json",
                "base64": skill_json_base64,
                "role": "skill-json",
            },
        ],
        "directoryTopicId": "0.0.123456",
        "quoteId": quote["quoteId"],
    }
)

if publish.job_id:
    job = client.get_skill_publish_job(publish.job_id)
    print(job["status"])
```

  </TabItem>
</Tabs>

### Discovery and Ownership

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const skills = await client.listSkills({ limit: 25, includeFiles: false });
const versions = await client.listSkillVersions({ name: 'demo-skill' });
const mine = await client.listMySkills({ limit: 25 });
const myList = await client.getMySkillsList({ limit: 25 });
const ownership = await client.getSkillOwnership({ name: 'demo-skill' });
```

  </TabItem>
<TabItem value="go" label="Go">

```go
limit := 25
includeFiles := false

skills, _ := client.ListSkills(context.Background(), registrybroker.ListSkillsOptions{
	Limit:        &limit,
	IncludeFiles: &includeFiles,
})
versions, _ := client.ListSkillVersions(context.Background(), "demo-skill")
mine, _ := client.ListMySkills(context.Background(), registrybroker.ListMySkillsOptions{
	Limit: &limit,
})
myList, _ := client.GetMySkillsList(context.Background(), registrybroker.MySkillsListOptions{
	Limit: &limit,
})
ownership, _ := client.GetSkillOwnership(context.Background(), "demo-skill", "")

fmt.Println(skills, versions, mine, myList, ownership)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
skills = client.list_skills({"limit": 25, "includeFiles": False})
versions = client.list_skill_versions({"name": "demo-skill"})
mine = client.list_my_skills({"limit": 25})
my_list = client.get_my_skills_list({"limit": 25})
ownership = client.get_skill_ownership({"name": "demo-skill"})

print(skills)
print(versions)
print(mine)
print(my_list)
print(ownership)
```

  </TabItem>
</Tabs>

### Voting and Verification

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const vote = await client.setSkillVote({
  name: 'demo-skill',
  upvoted: true,
});

const voteStatus = await client.getSkillVoteStatus({ name: 'demo-skill' });
const verification = await client.getSkillVerificationStatus({
  name: 'demo-skill',
  version: '1.0.0',
});

await client.requestSkillVerification({
  name: 'demo-skill',
  version: '1.0.0',
  tier: 'basic', // or 'express'
});

const challenge = await client.createSkillDomainProofChallenge({
  name: 'demo-skill',
  version: '1.0.0',
  domain: 'example.com',
});

const challengeToken = challenge.txtRecordValue.replace(/^hol-skill-verification=/, '');

const domainProof = await client.verifySkillDomainProof({
  name: 'demo-skill',
  version: '1.0.0',
  domain: 'example.com',
  challengeToken,
});

console.log(domainProof.signal.ok);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
import "strings"

vote, _ := client.SetSkillVote(context.Background(), registrybroker.SkillRegistryVoteRequest{
	"name":    "demo-skill",
	"upvoted": true,
})
voteStatus, _ := client.GetSkillVoteStatus(context.Background(), "demo-skill")
verification, _ := client.GetSkillVerificationStatusWithOptions(
	context.Background(),
	"demo-skill",
	registrybroker.SkillVerificationStatusOptions{Version: "1.0.0"},
)

_, _ = client.RequestSkillVerification(context.Background(), registrybroker.SkillVerificationRequestCreateRequest{
	"name":    "demo-skill",
	"version": "1.0.0",
	"tier":    "basic",
})

challenge, _ := client.CreateSkillDomainProofChallenge(
	context.Background(),
	registrybroker.SkillVerificationDomainProofChallengeRequest{
		Name:    "demo-skill",
		Version: "1.0.0",
		Domain:  "example.com",
	},
)

txtRecordValue, ok := challenge["txtRecordValue"].(string)
if !ok {
	panic("txtRecordValue not found or not a string in challenge response")
}
challengeToken := strings.TrimPrefix(txtRecordValue, "hol-skill-verification=")
domainProof, _ := client.VerifySkillDomainProof(
	context.Background(),
	registrybroker.SkillVerificationDomainProofVerifyRequest{
		Name:           "demo-skill",
		Version:        "1.0.0",
		Domain:         "example.com",
		ChallengeToken: challengeToken,
	},
)

fmt.Println(vote, voteStatus, verification, domainProof["signal"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
vote = client.set_skill_vote({"name": "demo-skill", "upvoted": True})
vote_status = client.get_skill_vote_status({"name": "demo-skill"})
verification = client.get_skill_verification_status(
    {"name": "demo-skill", "version": "1.0.0"}
)

client.request_skill_verification(
    {"name": "demo-skill", "version": "1.0.0", "tier": "basic"}
)

challenge = client.create_skill_domain_proof_challenge(
    {"name": "demo-skill", "version": "1.0.0", "domain": "example.com"}
)
challenge_token = challenge["txtRecordValue"].removeprefix(
    "hol-skill-verification="
)

domain_proof = client.verify_skill_domain_proof(
    {
        "name": "demo-skill",
        "version": "1.0.0",
        "domain": "example.com",
        "challengeToken": challenge_token,
    }
)

print(vote, vote_status, verification, domain_proof["signal"]["ok"])
```

  </TabItem>
</Tabs>

### Skill Routes

Client methods above map to:

- `GET /api/v1/skills/config`
- `GET /api/v1/skills`
- `GET /api/v1/skills/versions`
- `GET /api/v1/skills/mine`
- `GET /api/v1/skills/my-list`
- `POST /api/v1/skills/quote`
- `POST /api/v1/skills/publish`
- `GET /api/v1/skills/jobs/:jobId`
- `GET /api/v1/skills/ownership`
- `GET /api/v1/skills/vote`
- `POST /api/v1/skills/vote`
- `POST /api/v1/skills/verification/request`
- `GET /api/v1/skills/verification/status`
- `POST /api/v1/skills/verification/domain/challenge`
- `POST /api/v1/skills/verification/domain/verify`

### UAID DNS Verification Routes

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const uaid =
  'uaid:aid:3AUoqGTHnMXv1PB8ATCtkB86Xw2uEEJuqMRNCirGQehhNhnQ1vHuwJfAh5K5Dp6RFE;uid=registry-ping-agent;registry=a2a-registry;proto=a2a-registry;nativeId=hol.org';

const verify = await client.verifyUaidDnsTxt({
  uaid,
  persist: true,
});

const status = await client.getVerificationDnsStatus(uaid, {
  refresh: true,
  persist: true,
});

console.log(verify.verified, status.dnsName);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
persist := true
refresh := true
uaid := "uaid:aid:3AUoqGTHnMXv1PB8ATCtkB86Xw2uEEJuqMRNCirGQehhNhnQ1vHuwJfAh5K5Dp6RFE;uid=registry-ping-agent;registry=a2a-registry;proto=a2a-registry;nativeId=hol.org"

verify, err := client.VerifyUaidDNSTXT(context.Background(), registrybroker.VerificationDNSVerifyRequest{
	UAID:    uaid,
	Persist: &persist,
})
if err != nil {
	panic(err)
}

status, err := client.GetVerificationDNSStatus(
	context.Background(),
	uaid,
	registrybroker.VerificationDNSStatusQuery{
		Refresh: &refresh,
		Persist: &persist,
	},
)
if err != nil {
	panic(err)
}

fmt.Println(verify["verified"], status["dnsName"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
uaid = (
    "uaid:aid:3AUoqGTHnMXv1PB8ATCtkB86Xw2uEEJuqMRNCirGQehhNhnQ1vHuwJfAh5K5Dp6RFE;"
    "uid=registry-ping-agent;registry=a2a-registry;proto=a2a-registry;nativeId=hol.org"
)

verify = client.verify_uaid_dns_txt({"uaid": uaid, "persist": True})
status = client.get_verification_dns_status(
    uaid,
    {"refresh": True, "persist": True},
)

print(verify["verified"], status["dnsName"])
```

  </TabItem>
</Tabs>

Client methods map to:

- `POST /api/v1/verification/dns/verify`
- `GET /api/v1/verification/dns/status/:uaid`

## Credits and Ledger Authentication

### Manual Credit Purchase (HBAR)

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const credits = await client.purchaseCreditsWithHbar({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  privateKey: process.env.HEDERA_PRIVATE_KEY,
  hbarAmount: 0.5,
  memo: 'registry-broker-manual-topup',
  metadata: {
    reason: 'registration-priority',
  },
});

console.log(credits.balance, credits.purchasedCredits);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
credits, err := client.PurchaseCreditsWithHbar(
	context.Background(),
	registrybroker.PurchaseCreditsWithHbarParams{
		AccountID:  os.Getenv("HEDERA_ACCOUNT_ID"),
		PrivateKey: os.Getenv("HEDERA_PRIVATE_KEY"),
		HbarAmount: 0.5,
		Memo:       "registry-broker-manual-topup",
		Metadata: registrybroker.JSONObject{
			"reason": "registration-priority",
		},
	},
)
if err != nil {
	panic(err)
}

fmt.Println(credits["balance"], credits["purchasedCredits"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
credits = client.purchase_credits_with_hbar(
    {
        "accountId": "0.0.123456",
        "privateKey": "302e0201003005...",
        "hbarAmount": 0.5,
        "memo": "registry-broker-manual-topup",
        "metadata": {"reason": "registration-priority"},
    }
)

print(credits["balance"], credits["purchasedCredits"])
```

  </TabItem>
</Tabs>
### Stripe (Credit Card) Purchases

The normal path for card payments is the hosted [billing portal](https://hol.org/registry/billing). Only use the API flow below if you are embedding purchases inside a custom dashboard or CI job and already have Stripe attestation in place.

When Stripe payments are enabled you can use Stripe PaymentIntents to add credits programmatically. The sequence mirrors the [credit purchase guide](https://github.com/hashgraph-online/standards-sdk/blob/main/registry-broker/docs/credit-purchase.md#stripe-credit-purchases):

1. `GET /api/v1/credits/providers` – confirm that `stripe` is listed and capture the `publishableKey`.
2. `POST /api/v1/credits/payments/intent` – create a PaymentIntent for the desired USD amount (1 credit = $0.01). The response includes `intentId`, computed credits, and the `clientSecret`.
3. Confirm the PaymentIntent client-side via Stripe.js or the Payment Element using the publishable key from step 1.
4. Stripe sends `payment_intent.succeeded` to `/api/v1/credits/webhooks/stripe`; the broker credits the account automatically.

Example intent creation:

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const intent = await fetch(`${baseUrl}/credits/payments/intent`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-api-key': ledgerApiKey,
  },
  body: JSON.stringify({
    accountId: '0.0.123456',
    usdAmount: 5.00,
    description: 'Top up via card',
    metadata: { reason: 'demo' },
  }),
}).then(res => res.json());

console.log(intent.intentId, intent.credits, intent.clientSecret);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
import (
	"bytes"
	"encoding/json"
	"net/http"
)

payload := map[string]any{
	"accountId":   "0.0.123456",
	"usdAmount":   5.00,
	"description": "Top up via card",
	"metadata": map[string]any{
		"reason": "demo",
	},
}
body, _ := json.Marshal(payload)
req, _ := http.NewRequest(
	http.MethodPost,
	baseURL+"/credits/payments/intent",
	bytes.NewReader(body),
)
req.Header.Set("content-type", "application/json")
req.Header.Set("x-api-key", ledgerAPIKey)

res, err := http.DefaultClient.Do(req)
if err != nil {
	panic(err)
}
defer res.Body.Close()

var intent map[string]any
if err := json.NewDecoder(res.Body).Decode(&intent); err != nil {
	panic(err)
}

fmt.Println(intent["intentId"], intent["credits"], intent["clientSecret"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
import httpx

intent = httpx.post(
    f"{base_url}/credits/payments/intent",
    headers={
        "content-type": "application/json",
        "x-api-key": ledger_api_key,
    },
    json={
        "accountId": "0.0.123456",
        "usdAmount": 5.00,
        "description": "Top up via card",
        "metadata": {"reason": "demo"},
    },
).json()

print(intent["intentId"], intent["credits"], intent["clientSecret"])
```

  </TabItem>
</Tabs>

The client secret drives the Stripe confirmation step; credits land once the webhook confirms success.

### x402 (EVM) Purchases

Use the built-in helper when you want to settle credit purchases with WETH/USDC over Base/Mainnet or Base Sepolia. The SDK handles the 402 retry and payment header generation via `x402-axios`.

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const client = new RegistryBrokerClient({ baseUrl: 'https://hol.org/registry/api/v1' });
await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:mainnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  label: 'x402 top-up',
});

const result = await client.buyCreditsWithX402({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  credits: 25,
  description: 'x402 demo top-up',
  metadata: { reason: 'demo' },
  evmPrivateKey: process.env.ETH_PK!,
  network: 'base', // or 'base-sepolia'
  rpcUrl: 'https://mainnet.base.org', // optional override
});

console.log(result.balance, result.payment?.settlement?.transaction);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
result, err := client.BuyCreditsWithX402(
	context.Background(),
	registrybroker.BuyCreditsWithX402Params{
		AccountID:     os.Getenv("HEDERA_ACCOUNT_ID"),
		Credits:       25,
		Description:   "x402 demo top-up",
		Metadata:      registrybroker.JSONObject{"reason": "demo"},
		EVMPrivateKey: os.Getenv("ETH_PK"),
		Network:       "base",
		RPCURL:        "https://mainnet.base.org",
	},
)
if err != nil {
	panic(err)
}

fmt.Println(result["balance"], result["payment"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
result = client.buy_credits_with_x402(
    {
        "accountId": "0.0.123456",
        "credits": 25,
        "description": "x402 demo top-up",
        "metadata": {"reason": "demo"},
        "evmPrivateKey": "0xabc123...",
        "network": "base",
        "rpcUrl": "https://mainnet.base.org",
    }
)

print(result["balance"], result["payment"])
```

  </TabItem>
</Tabs>

Notes:
- One credit = $0.01 USD. The broker quotes live ETH/USD and settles in WETH (`0x4200…0006`) on Base or Base Sepolia.
- Keep the payer wallet funded with WETH on the selected Base network.
- Ledger authentication is required so the API can debit and reconcile credits for the correct Hedera account.

### Ledger Authentication Flow

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import { PrivateKey } from '@hashgraph/sdk';

const challenge = await client.createLedgerChallenge({
  accountId: process.env.HEDERA_ACCOUNT_ID,
  network: 'hedera:testnet',
});

const operatorKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY ?? '');
const signature = Buffer.from(
  operatorKey.sign(Buffer.from(challenge.message, 'utf8')),
).toString('base64');

await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  signer: {
    // reuse the custom signing logic when you already have an operator key
    sign: async messages => [
      {
        signature: operatorKey.sign(messages[0]!),
        accountId: operatorKey.publicKey.toString(),
      } as any,
    ],
  },
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
import "encoding/hex"

operatorKey, err := hedera.PrivateKeyFromString(os.Getenv("HEDERA_PRIVATE_KEY"))
if err != nil {
	panic(err)
}

challenge, err := client.CreateLedgerChallenge(context.Background(), registrybroker.LedgerChallengeRequest{
	AccountID: os.Getenv("HEDERA_ACCOUNT_ID"),
	Network:   "hedera:testnet",
})
if err != nil {
	panic(err)
}

message, ok := challenge["message"].(string)
if !ok {
	panic("message not found in challenge response")
}
challengeID, ok := challenge["challengeId"].(string)
if !ok {
	panic("challengeId not found in challenge response")
}
signature := hex.EncodeToString(operatorKey.Sign([]byte(message)))

_, err = client.VerifyLedgerChallenge(context.Background(), registrybroker.LedgerVerifyRequest{
	ChallengeID:   challengeID,
	AccountID:     os.Getenv("HEDERA_ACCOUNT_ID"),
	Network:       "hedera:testnet",
	Signature:     signature,
	SignatureKind: "raw",
})
if err != nil {
	panic(err)
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
def sign(message: str) -> dict[str, str]:
    signature = sign_message_with_operator_key(message)
    return {
        "signature": signature,
        "signatureKind": "raw",
    }


client.authenticate_with_ledger(
    {
        "accountId": "0.0.123456",
        "network": "hedera:testnet",
        "sign": sign,
    }
)
```

  </TabItem>
</Tabs>

The registry automatically uses the ledger API key for privileged operations after verification.

### Ledger Authentication Helper

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const verification = await client.authenticateWithLedgerCredentials({
  accountId: process.env.HEDERA_ACCOUNT_ID!,
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY!,
  expiresInMinutes: 10,
  label: 'docs example',
});
console.log(verification.key);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
import "encoding/hex"

verification, err := client.AuthenticateWithLedger(
	context.Background(),
	registrybroker.LedgerAuthenticationOptions{
		AccountID: os.Getenv("HEDERA_ACCOUNT_ID"),
		Network:   "hedera:testnet",
		Sign: func(message string) (registrybroker.LedgerAuthenticationSignerResult, error) {
			signature := hex.EncodeToString(operatorKey.Sign([]byte(message)))
			return registrybroker.LedgerAuthenticationSignerResult{
				Signature:     signature,
				SignatureKind: "raw",
			}, nil
		},
	},
)
if err != nil {
	panic(err)
}

fmt.Println(verification["key"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
verification = client.authenticate_with_ledger_credentials(
    {
        "accountId": "0.0.123456",
        "network": "hedera:testnet",
        "privateKey": "302e0201003005...",
        "expiresInMinutes": 10,
        "setAccountHeader": True,
    }
)
print(verification["key"])
```

  </TabItem>
</Tabs>

`authenticateWithLedgerCredentials` issues the challenge, signs it using the inferred signer (Hedera private key, custom `Signer`, or EVM wallet), verifies the signature, and sets the ledger API key on the client. When you pass an alias (`base`, `base-sepolia`, `mainnet`, …) the response includes both `network` (alias) and `networkCanonical` (e.g., `eip155:84532`, `hedera:mainnet`) so downstream services can migrate without breaking older tooling.

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
// EVM private key example
const evmPrivateKey = process.env.ETH_PK?.startsWith('0x')
  ? process.env.ETH_PK
  : `0x${process.env.ETH_PK}`;
await client.authenticateWithLedgerCredentials({
  accountId: process.env.REGISTRY_BROKER_EVM_ACCOUNT ?? '',
  network: process.env.EVM_LEDGER_NETWORK ?? 'eip155:84532',
  evmPrivateKey,
  expiresInMinutes: 10,
});
```

  </TabItem>
<TabItem value="go" label="Go">

```go
verification, err := client.AuthenticateWithLedgerCredentials(
	context.Background(),
	registrybroker.LedgerCredentialAuthOptions{
		AccountID: os.Getenv("REGISTRY_BROKER_EVM_ACCOUNT"),
		Network:   "eip155:84532",
		Signature: os.Getenv("LEDGER_SIGNATURE"),
	},
)
if err != nil {
	panic(err)
}

fmt.Println(verification["networkCanonical"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
verification = client.authenticate_with_ledger_credentials(
    {
        "accountId": "0xabc123...",
        "network": "eip155:84532",
        "signature": "signed-ledger-challenge",
        "expiresInMinutes": 10,
    }
)
print(verification["networkCanonical"])
```

  </TabItem>
</Tabs>

## Chat and History

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const session = await client.chat.createSession({
  uaid: 'uaid:aid:a2a:hashgraph-online:agent123',
  historyTtlSeconds: 1800,
});

const reply = await client.chat.sendMessage({
  sessionId: session.sessionId,
  message: 'Hello, what services do you offer?',
});

const history = await client.chat.getHistory(session.sessionId);

await client.chat.compactHistory({
  sessionId: session.sessionId,
  preserveEntries: 4,
});

await client.chat.endSession(session.sessionId);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
ttl := 1800
session, err := client.CreateSession(context.Background(), registrybroker.CreateSessionRequestPayload{
	UAID:              "uaid:aid:a2a:hashgraph-online:agent123",
	HistoryTTLSeconds: &ttl,
}, true)
if err != nil {
	panic(err)
}

sessionID, ok := session["sessionId"].(string)
if !ok {
	panic("sessionId not found in session response")
}

reply, _ := client.SendMessage(context.Background(), registrybroker.SendMessageRequestPayload{
	SessionID: sessionID,
	Message:   "Hello, what services do you offer?",
})
history, _ := client.FetchHistorySnapshot(context.Background(), sessionID, registrybroker.ChatHistoryFetchOptions{})

preserveEntries := 4
_, _ = client.CompactHistory(context.Background(), registrybroker.CompactHistoryRequestPayload{
	SessionID:       sessionID,
	PreserveEntries: &preserveEntries,
})

_ = client.EndSession(context.Background(), sessionID)
fmt.Println(reply, history)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
session = client.chat.create_session(
    {
        "uaid": "uaid:aid:a2a:hashgraph-online:agent123",
        "historyTtlSeconds": 1800,
    }
)

reply = client.chat.send_message(
    {
        "sessionId": session.session_id,
        "message": "Hello, what services do you offer?",
    }
)
history = client.chat.get_history(session.session_id)

client.chat.compact_history(
    {"sessionId": session.session_id, "preserveEntries": 4}
)
client.chat.end_session(session.session_id)

print(reply.model_dump())
print(history)
```

  </TabItem>
</Tabs>

When `historyAutoTopUp` is configured, the client retries `createSession` automatically if chat history retention fails due to insufficient credits.

## Agent Feedback (ERC-8004)

Registry Broker supports submitting and reading **on-chain feedback** for ERC-8004 agents (EVM + Solana). Feedback is intended to be submitted after a real chat session; the broker uses the session to enforce eligibility rules.

Related docs:

- [Agent Feedback (ERC-8004)](../feedback.md)
- Demo: `standards-sdk/demo/registry-broker/feedback-demo.ts`

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const uaid = 'uaid:...';

const session = await client.chat.createSession({
  uaid,
  historyTtlSeconds: 900,
});

await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: '1/3' });
await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: '2/3' });
await client.chat.sendMessage({ sessionId: session.sessionId, uaid, message: '3/3' });

const eligibility = await client.checkAgentFeedbackEligibility(uaid, {
  sessionId: session.sessionId,
});

if (!eligibility.eligible) {
  await client.chat.endSession(session.sessionId);
  throw new Error(`Not eligible: ${eligibility.reason ?? 'unknown_reason'}`);
}

const submission = await client.submitAgentFeedback(uaid, {
  sessionId: session.sessionId,
  score: 92,
  tag1: 'quality',
  tag2: 'accuracy',
});

const feedback = await client.getAgentFeedback(uaid);
const index = await client.listAgentFeedbackIndex({
  page: 1,
  limit: 50,
  registries: ['erc-8004', 'erc-8004-solana'],
});

console.log(submission.transactionHash, feedback.summary, index.total);
await client.chat.endSession(session.sessionId);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
uaid := "uaid:..."
ttl := 900

session, err := client.CreateSession(context.Background(), registrybroker.CreateSessionRequestPayload{
	UAID:              uaid,
	HistoryTTLSeconds: &ttl,
}, true)
if err != nil {
	panic(err)
}

sessionID, ok := session["sessionId"].(string)
if !ok {
	panic("sessionId not found in session response")
}
_, _ = client.SendMessage(context.Background(), registrybroker.SendMessageRequestPayload{
	SessionID: sessionID,
	UAID:      uaid,
	Message:   "1/3",
})
_, _ = client.SendMessage(context.Background(), registrybroker.SendMessageRequestPayload{
	SessionID: sessionID,
	UAID:      uaid,
	Message:   "2/3",
})
_, _ = client.SendMessage(context.Background(), registrybroker.SendMessageRequestPayload{
	SessionID: sessionID,
	UAID:      uaid,
	Message:   "3/3",
})

eligibility, err := client.CheckAgentFeedbackEligibility(
	context.Background(),
	uaid,
	registrybroker.AgentFeedbackEligibilityRequest{
		"sessionId": sessionID,
	},
)
if err != nil {
	panic(err)
}

eligible, ok := eligibility["eligible"].(bool)
if !ok {
	_ = client.EndSession(context.Background(), sessionID)
	panic("eligibility response missing eligible flag")
}
if !eligible {
	_ = client.EndSession(context.Background(), sessionID)
	panic("feedback submission not eligible")
}

submission, _ := client.SubmitAgentFeedback(
	context.Background(),
	uaid,
	registrybroker.AgentFeedbackSubmissionRequest{
		"sessionId": sessionID,
		"score":     92,
		"tag1":      "quality",
		"tag2":      "accuracy",
	},
)
feedback, _ := client.GetAgentFeedback(
	context.Background(),
	uaid,
	registrybroker.AgentFeedbackQuery{},
)

page := 1
limit := 50
index, _ := client.ListAgentFeedbackIndex(
	context.Background(),
	registrybroker.AgentFeedbackIndexOptions{
		Page:       &page,
		Limit:      &limit,
		Registries: []string{"erc-8004", "erc-8004-solana"},
	},
)

fmt.Println(submission["transactionHash"], feedback["summary"], index["total"])
_ = client.EndSession(context.Background(), sessionID)
```

  </TabItem>
<TabItem value="python" label="Python">

```python
uaid = "uaid:..."

session = client.chat.create_session(
    {
        "uaid": uaid,
        "historyTtlSeconds": 900,
    }
)

client.chat.send_message(
    {"sessionId": session.session_id, "uaid": uaid, "message": "1/3"}
)
client.chat.send_message(
    {"sessionId": session.session_id, "uaid": uaid, "message": "2/3"}
)
client.chat.send_message(
    {"sessionId": session.session_id, "uaid": uaid, "message": "3/3"}
)

eligibility = client.check_agent_feedback_eligibility(
    uaid,
    {"sessionId": session.session_id},
)

if not eligibility["eligible"]:
    client.chat.end_session(session.session_id)
    raise RuntimeError(
        f"Not eligible: {eligibility.get('reason', 'unknown_reason')}"
    )

submission = client.submit_agent_feedback(
    uaid,
    {
        "sessionId": session.session_id,
        "score": 92,
        "tag1": "quality",
        "tag2": "accuracy",
    },
)
feedback = client.get_agent_feedback(uaid)
index = client.list_agent_feedback_index(
    {"page": 1, "limit": 50, "registry": "erc-8004,erc-8004-solana"}
)

print(submission["transactionHash"], feedback["summary"], index["total"])
client.chat.end_session(session.session_id)
```

  </TabItem>
</Tabs>

## Protocol and Adapter Utilities

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const protocols = await client.listProtocols();
const detection = await client.detectProtocol({
  headers: {
    'content-type': 'application/json',
  },
  body: '{"ping":"pong"}',
});
const adapters = await client.adapters();
const detailed = await client.adaptersDetailed();
const facets = await client.facets({ adapter: 'openconvai' });

console.log(protocols.protocols.length, detection.protocol, adapters.items, detailed.items, facets.facets);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
protocols, _ := client.ListProtocols(context.Background())
detection, _ := client.DetectProtocol(
	context.Background(),
	registrybroker.JSONObject{
		"headers": registrybroker.JSONObject{
			"content-type": "application/json",
		},
		"body": "{\"ping\":\"pong\"}",
	},
)
adapters, _ := client.Adapters(context.Background())
detailed, _ := client.AdaptersDetailed(context.Background())
facets, _ := client.Facets(context.Background(), "openconvai")

fmt.Println(protocols["protocols"], detection["protocol"], adapters["items"], detailed["items"], facets["facets"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
protocols = client.list_protocols()
detection = client.detect_protocol('{"ping":"pong"}')
adapters = client.adapters()
detailed = client.adapters_detailed()
facets = client.facets(adapter="openconvai")

print(protocols.protocols, detection, adapters, detailed, facets)
```

  </TabItem>
</Tabs>

## Observability

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const stats = await client.stats();
const dashboard = await client.dashboardStats();
const metrics = await client.metricsSummary();
const websocket = await client.websocketStats();

console.log(stats.totalAgents, dashboard.search, metrics.search.queriesTotal, websocket.connections);
```

  </TabItem>
<TabItem value="go" label="Go">

```go
stats, _ := client.Stats(context.Background())
dashboard, _ := client.DashboardStats(context.Background())
metrics, _ := client.MetricsSummary(context.Background())
websocket, _ := client.WebsocketStats(context.Background())

fmt.Println(stats["totalAgents"], dashboard["search"], metrics["search"], websocket["connections"])
```

  </TabItem>
<TabItem value="python" label="Python">

```python
stats = client.stats()
dashboard = client.dashboard_stats()
metrics = client.metrics_summary()
websocket = client.websocket_stats()

print(stats.total_agents, dashboard, metrics, websocket)
```

  </TabItem>
</Tabs>

## Error Handling

<Tabs groupId="registry-broker-client-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import {
  RegistryBrokerError,
  RegistryBrokerParseError,
} from '@hashgraphonline/standards-sdk';

try {
  await client.search({ registry: 'unknown' });
} catch (error) {
  if (error instanceof RegistryBrokerError) {
    console.error('Request failed', error.status, error.body);
  } else if (error instanceof RegistryBrokerParseError) {
    console.error('Response parsing failed', error.cause);
  } else {
    throw error;
  }
}
```

  </TabItem>
<TabItem value="go" label="Go">

```go
var brokerErr *registrybroker.RegistryBrokerError
var parseErr *registrybroker.RegistryBrokerParseError

_, err := client.Search(context.Background(), registrybroker.SearchParams{
	Registry: "unknown",
})
if err != nil {
	if errors.As(err, &brokerErr) {
		fmt.Println("request failed", brokerErr.Status, brokerErr.Body)
	} else if errors.As(err, &parseErr) {
		fmt.Println("response parsing failed", parseErr.Cause)
	} else {
		panic(err)
	}
}
```

  </TabItem>
<TabItem value="python" label="Python">

```python
from standards_sdk_py import ApiError, ParseError

try:
    client.search(registry="unknown")
except ApiError as error:
    print(
        "request failed",
        error.context.status_code,
        error.context.body,
    )
except ParseError as error:
    print("response parsing failed", error.context.details)
```

  </TabItem>
</Tabs>

`RegistryBrokerError` exposes `status`, `statusText`, and `body`. `RegistryBrokerParseError` wraps Zod validation failures so issues with unexpected payloads are easy to diagnose.

## Exported Types

Useful types live in `@hashgraphonline/standards-sdk`:

- `SearchParams`, `SearchResult`, `AgentSearchHit`
- `VectorSearchRequest`, `VectorSearchResponse`
- `AgentRegistrationRequest`, `RegisterAgentResponse`, `RegisterAgentQuoteResponse`
- `RegistrationProgressRecord`, `RegistrationProgressResponse`
- `CreateSessionResponse`, `SendMessageResponse`, `ChatHistorySnapshotResponse`
- `AdaptersResponse`, `AdapterDetailsResponse`
- `RegistryStatsResponse`, `MetricsSummaryResponse`, `DashboardStatsResponse`, `WebsocketStatsResponse`
- `UaidValidationResponse`, `UaidConnectionStatus`

## Next Steps

- Follow the step-by-step tutorials in [Getting Started](../getting-started/quick-start.md).
- Dive into the consolidated [Chat Guide](../chat.md) for discovery, session, and multi-protocol walkthroughs.
