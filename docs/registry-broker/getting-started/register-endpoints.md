---
title: Register Endpoints (HCS-21)
description: Publish adapter and endpoint declarations to the HCS-21 adapter registry with Registry Broker and the Standards SDK clients.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Register Endpoints (HCS-21)

Use this flow when you want to publish an adapter or endpoint declaration to the broker's HCS-21 adapter registry. This is separate from agent UAID registration with `registerAgent(...)`.

## Choose the right registration flow

| Goal | API surface | SDK methods |
| --- | --- | --- |
| Publish a discoverable agent UAID | `/register`, `/register/quote`, `/register/progress/{attemptId}` | `registerAgent`, `getRegistrationQuote`, `waitForRegistrationCompletion` |
| Publish an adapter or endpoint declaration | `/adapters/registry/categories`, `/adapters/registry/adapters`, `/adapters/registry/submissions/{submissionId}` | `adapterRegistryCategories`, `createAdapterRegistryCategory`, `submitAdapterRegistryAdapter`, `adapterRegistrySubmissionStatus` |

## What the broker expects

The OpenAPI request schema for `POST /api/v1/adapters/registry/adapters` requires:

- `adapterId`
- `adapterName`
- `entity`
- `package`
- `config`
- `manifest`

Optional fields include `stateModel`, `signature`, `manifestPointer`, `manifestSequence`, `keywords`, `categorySlug`, and `newCategory`.

The broker accepts the submission asynchronously and returns `202 Accepted` with a `submissionId`. Poll the submission status endpoint until the broker reports `completed` or `failed`.

## Step 1 - Inspect categories and existing entries

Use the read endpoints first so you can reuse an existing category slug when one already fits your adapter.

<Tabs groupId="registry-broker-endpoint-registration-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const categories = await client.adapterRegistryCategories();
const existing = await client.adapterRegistryAdapters({
  query: 'customer support',
  limit: 5,
});

console.log(categories.categories.map(category => category.slug));
console.log(existing.adapters.map(adapter => adapter.adapterId));
```

</TabItem>
<TabItem value="go" label="Go">

```go
limit := 5

categories, err := client.AdapterRegistryCategories(context.Background())
if err != nil {
	panic(err)
}

existing, err := client.AdapterRegistryAdapters(
	context.Background(),
	registrybroker.AdapterRegistryFilters{
		Query: "customer support",
		Limit: &limit,
	},
)
if err != nil {
	panic(err)
}

fmt.Println(categories["categories"])
fmt.Println(existing["adapters"])
```

</TabItem>
<TabItem value="python" label="Python">

```python
categories = client.adapter_registry_categories()
existing = client.adapter_registry_adapters(
    query="customer support",
    limit=5,
)

print(categories.get("categories", []))
print(existing.get("adapters", []))
```

</TabItem>
</Tabs>

## Step 2 - Create a category when needed

If no existing category fits, create one explicitly or pass the same payload as `newCategory` during submission.

<Tabs groupId="registry-broker-endpoint-registration-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
const category = await client.createAdapterRegistryCategory({
  name: 'Customer Support',
  slug: 'customer-support',
  description: 'Adapters that expose customer support endpoints and routing metadata.',
  type: 'custom',
  metadata: {
    version: '1.0.0',
    operator: {
      account: '0.0.12345',
      name: 'Example Labs',
      contact: 'hello@example.com',
    },
    entityTypes: ['agent-endpoint'],
    tags: ['support', 'a2a'],
  },
});

console.log(category.slug, category.topicId);
```

</TabItem>
<TabItem value="go" label="Go">

```go
category, err := client.CreateAdapterRegistryCategory(
	context.Background(),
	registrybroker.CreateAdapterRegistryCategoryRequest{
		"name":        "Customer Support",
		"slug":        "customer-support",
		"description": "Adapters that expose customer support endpoints and routing metadata.",
		"type":        "custom",
		"metadata": map[string]any{
			"version": "1.0.0",
			"operator": map[string]any{
				"account": "0.0.12345",
				"name":    "Example Labs",
				"contact": "hello@example.com",
			},
			"entityTypes": []string{"agent-endpoint"},
			"tags":        []string{"support", "a2a"},
		},
	},
)
if err != nil {
	panic(err)
}

fmt.Println(category["category"])
```

</TabItem>
<TabItem value="python" label="Python">

```python
category = client.create_adapter_registry_category(
    {
        "name": "Customer Support",
        "slug": "customer-support",
        "description": "Adapters that expose customer support endpoints and routing metadata.",
        "type": "custom",
        "metadata": {
            "version": "1.0.0",
            "operator": {
                "account": "0.0.12345",
                "name": "Example Labs",
                "contact": "hello@example.com",
            },
            "entityTypes": ["agent-endpoint"],
            "tags": ["support", "a2a"],
        },
    }
)

print(category.get("category"))
```

</TabItem>
</Tabs>

## Step 3 - Submit the endpoint declaration

The HCS-21 manifest describes the adapter package, runtime, and capabilities. The submission payload wraps that manifest together with the broker-facing `config` block and category selection.

<Tabs groupId="registry-broker-endpoint-registration-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
import type {
  AdapterManifest,
  SubmitAdapterRegistryAdapterRequest,
} from '@hashgraphonline/standards-sdk';

const manifest: AdapterManifest = {
  meta: {
    spec_version: '1.0.0',
    adapter_version: '1.0.0',
    generated: new Date().toISOString(),
  },
  adapter: {
    name: 'Customer Support HTTP Adapter',
    id: 'customer-support-http',
    maintainers: [{ name: 'Example Labs', contact: 'hello@example.com' }],
    license: 'Apache-2.0',
  },
  package: {
    registry: 'npm',
    artifacts: [
      {
        url: 'https://registry.npmjs.org/@example/customer-support-http/-/customer-support-http-1.0.0.tgz',
        digest: 'sha384-REPLACE_WITH_REAL_DIGEST',
      },
    ],
  },
  runtime: {
    platforms: ['nodejs'],
    primary: 'nodejs',
    entry: 'dist/index.js',
  },
  capabilities: {
    discovery: true,
    communication: true,
    protocols: ['a2a'],
    discovery_tags: ['support', 'routing'],
    communication_channels: ['https'],
  },
  consensus: {
    required_fields: ['adapter.id', 'runtime.entry'],
    hashing: 'sha384',
  },
};

const payload: SubmitAdapterRegistryAdapterRequest = {
  adapterId: 'customer-support-http',
  adapterName: 'Customer Support HTTP Adapter',
  entity: 'agent-endpoint',
  package: {
    registry: 'npm',
    name: '@example/customer-support-http',
    version: '1.0.0',
    integrity: 'sha512-REPLACE_WITH_REAL_INTEGRITY',
  },
  config: {
    type: 'http',
    endpoint: 'https://agent.example.com/a2a',
    account: '0.0.12345',
  },
  manifest,
  keywords: ['support', 'a2a', 'customer-service'],
  categorySlug: 'customer-support',
};

const submission = await client.submitAdapterRegistryAdapter(payload);
console.log(submission.submissionId, submission.status);
```

</TabItem>
<TabItem value="go" label="Go">

```go
payload := registrybroker.SubmitAdapterRegistryAdapterRequest{
	"adapterId":   "customer-support-http",
	"adapterName": "Customer Support HTTP Adapter",
	"entity":      "agent-endpoint",
	"package": map[string]any{
		"registry":  "npm",
		"name":      "@example/customer-support-http",
		"version":   "1.0.0",
		"integrity": "sha512-REPLACE_WITH_REAL_INTEGRITY",
	},
	"config": map[string]any{
		"type":     "http",
		"endpoint": "https://agent.example.com/a2a",
		"account":  "0.0.12345",
	},
	"manifest": map[string]any{
		"meta": map[string]any{
			"spec_version":    "1.0.0",
			"adapter_version": "1.0.0",
			"generated":       time.Now().UTC().Format(time.RFC3339),
		},
		"adapter": map[string]any{
			"name": "Customer Support HTTP Adapter",
			"id":   "customer-support-http",
			"maintainers": []map[string]any{
				{"name": "Example Labs", "contact": "hello@example.com"},
			},
			"license": "Apache-2.0",
		},
		"package": map[string]any{
			"registry": "npm",
			"artifacts": []map[string]any{
				{
					"url":    "https://registry.npmjs.org/@example/customer-support-http/-/customer-support-http-1.0.0.tgz",
					"digest": "sha384-REPLACE_WITH_REAL_DIGEST",
				},
			},
		},
		"runtime": map[string]any{
			"platforms": []string{"nodejs"},
			"primary":   "nodejs",
			"entry":     "dist/index.js",
		},
		"capabilities": map[string]any{
			"discovery":              true,
			"communication":          true,
			"protocols":              []string{"a2a"},
			"discovery_tags":         []string{"support", "routing"},
			"communication_channels": []string{"https"},
		},
		"consensus": map[string]any{
			"required_fields": []string{"adapter.id", "runtime.entry"},
			"hashing":         "sha384",
		},
	},
	"keywords":     []string{"support", "a2a", "customer-service"},
	"categorySlug": "customer-support",
}

submission, err := client.SubmitAdapterRegistryAdapter(context.Background(), payload)
if err != nil {
	panic(err)
}

fmt.Println(submission["submissionId"], submission["status"])
```

</TabItem>
<TabItem value="python" label="Python">

```python
payload = {
    "adapterId": "customer-support-http",
    "adapterName": "Customer Support HTTP Adapter",
    "entity": "agent-endpoint",
    "package": {
        "registry": "npm",
        "name": "@example/customer-support-http",
        "version": "1.0.0",
        "integrity": "sha512-REPLACE_WITH_REAL_INTEGRITY",
    },
    "config": {
        "type": "http",
        "endpoint": "https://agent.example.com/a2a",
        "account": "0.0.12345",
    },
    "manifest": {
        "meta": {
            "spec_version": "1.0.0",
            "adapter_version": "1.0.0",
            "generated": "2026-01-01T00:00:00Z",
        },
        "adapter": {
            "name": "Customer Support HTTP Adapter",
            "id": "customer-support-http",
            "maintainers": [
                {"name": "Example Labs", "contact": "hello@example.com"},
            ],
            "license": "Apache-2.0",
        },
        "package": {
            "registry": "npm",
            "artifacts": [
                {
                    "url": "https://registry.npmjs.org/@example/customer-support-http/-/customer-support-http-1.0.0.tgz",
                    "digest": "sha384-REPLACE_WITH_REAL_DIGEST",
                }
            ],
        },
        "runtime": {
            "platforms": ["nodejs"],
            "primary": "nodejs",
            "entry": "dist/index.js",
        },
        "capabilities": {
            "discovery": True,
            "communication": True,
            "protocols": ["a2a"],
            "discovery_tags": ["support", "routing"],
            "communication_channels": ["https"],
        },
        "consensus": {
            "required_fields": ["adapter.id", "runtime.entry"],
            "hashing": "sha384",
        },
    },
    "keywords": ["support", "a2a", "customer-service"],
    "categorySlug": "customer-support",
}

submission = client.submit_adapter_registry_adapter(payload)
print(submission["submissionId"], submission["status"])
```

</TabItem>
</Tabs>

## Step 4 - Poll submission status

The submission status response wraps the current record in a `submission` object. Watch the `status` field until it leaves `pending` or `running`.

<Tabs groupId="registry-broker-endpoint-registration-language" defaultValue="typescript">
<TabItem value="typescript" label="TypeScript">

```ts
let current = await client.adapterRegistrySubmissionStatus(submission.submissionId);

while (
  current.submission.status === 'pending' ||
  current.submission.status === 'running'
) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  current = await client.adapterRegistrySubmissionStatus(submission.submissionId);
}

if (current.submission.status !== 'completed') {
  throw new Error(current.submission.error ?? 'Endpoint registration failed');
}

console.log(current.submission.resultPayload);
```

</TabItem>
<TabItem value="go" label="Go">

```go
submissionID, ok := submission["submissionId"].(string)
if !ok {
	panic("submissionId not found or not a string")
}

for {
	status, err := client.AdapterRegistrySubmissionStatus(context.Background(), submissionID)
	if err != nil {
		panic(err)
	}

	record, ok := status["submission"].(map[string]any)
	if !ok {
		panic("submission record not found or invalid type")
	}

	state, ok := record["status"].(string)
	if !ok {
		panic("submission status not found or not a string")
	}

	if state != "pending" && state != "running" {
		if state != "completed" {
			panic(record["error"])
		}
		fmt.Println(record["resultPayload"])
		break
	}

	time.Sleep(2 * time.Second)
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
submission_id = submission["submissionId"]

while True:
    status = client.adapter_registry_submission_status(submission_id)
    record = status.get("submission")
    if not isinstance(record, dict):
        raise RuntimeError("submission record not found")

    state = record.get("status")
    if not isinstance(state, str):
        raise RuntimeError("submission status not found")

    if state not in {"pending", "running"}:
        if state != "completed":
            raise RuntimeError(record.get("error") or "Endpoint registration failed")
        print(record.get("resultPayload"))
        break
    time.sleep(2)
```

</TabItem>
</Tabs>

## Next steps

- Use `adapterRegistryAdapters(...)` to confirm the published entry can be queried by `category`, `entity`, `keywords`, or free-text `query`.
- Keep `communicationProtocol` and agent UAID registration separate from this HCS-21 flow. If you also need a discoverable agent UAID, continue with [First Agent Registration](first-registration.md).
- For the method-by-method reference, see [Registry Broker Client API](../api/client.md#endpoint-registration-hcs-21-adapter-registry).
