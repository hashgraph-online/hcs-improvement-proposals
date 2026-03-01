---
title: Building a Decentralized Registry in Go with HCS-2 on Hedera
authors: [kantorcodes]
tags: [go, golang, hedera, blockchain, hcs-2, tutorial, decentralized-registry]
description: Learn how to build and operate a decentralized topic registry using the new Hashgraph Online Standards SDK for Go.
image: /img/social-cards/go-sdk-hcs2.jpg
keywords:
  - golang hedera
  - go blockchain sdk
  - decentralized registry go
  - hedera consensus service
  - hcs-2 go
canonical_url: https://hol.org/blog/building-decentralized-registry-go-hedara
---

With the explosive growth of AI agents, distributed systems, and decentralized applications (dApps), there's an increasing need for immutable, decentralized data sharing. When multiple actors—whether human or machine—need to coordinate without relying on a centralized database, how do you verify who published what, and in what order?

Enter the **Hedera Consensus Service (HCS)**.

HCS provides high-throughput, natively ordered, and cryptographic consensus on message streams without the overhead of smart contracts. However, to build structured applications on top of raw message streams, you need standards.

That's why we recently published the Official [**Hashgraph Online Standards SDK for Go**](https://github.com/hashgraph-online/standards-sdk-go), a complete reference implementation for the [Hiero Consensus Specifications (HCS)](https://hol.org/docs/standards).

In this tutorial, we will explore **HCS-2: Topic Registries** and show you how to build a decentralized registry in Go from scratch.

<!--truncate-->

## Why Go?

Go (Golang) is uniquely positioned for decentralized systems. Its native concurrency model (goroutines), fast compilation, and strongly typed ecosystem make it the language of choice for building robust infrastructure like the Hedera Mirror Node, Hyperledger Fabric, and countless Web3 indexers.

By releasing a dedicated Go SDK for HCS, we are providing Go developers with a first-class, typed, and idiomatic path to interacting with decentralized standards on the Hedera public ledger.

## What is an HCS-2 Topic Registry?

The [**HCS-2 Specification**](https://hol.org/docs/standards/hcs-2) defines a standard for creating append-only, verifiable data registries on Hedera.

At its core, a registry is a Hedera topic where messages conform to a specific JSON schema. HCS-2 supports two types of registries:

1. **Append-Only**: A continuous stream of events or records.
2. **Indexed**: A key-value store where later entries can "overwrite" or update the state of previous keys using deterministic indexing.

This is perfect for use cases like:

- AI Agent identity directories
- Decentralized package managers
- Supply chain provenance logs
- Certificate revocation lists

Let's write some code to see this in action.

## Prerequisites

Before we begin, you'll need:

1. Go 1.22 or higher installed.
2. A Hedera Testnet account (Account ID and Private Key). You can get one from the [Hedera Developer Portal](https://portal.hedera.com).

Create a new directory for your project and initialize a Go module:

```bash
mkdir go-registry-demo
cd go-registry-demo
go mod init go-registry-demo
```

Next, install the Standards SDK for Go:

```bash
go get github.com/hashgraph-online/standards-sdk-go@latest
```

Set your environment variables (or place them in a `.env` file):

```bash
export HEDERA_ACCOUNT_ID="0.0.xxxxx"
export HEDERA_PRIVATE_KEY="302..."
export HEDERA_NETWORK="testnet"
```

## Step 1: Initialize the HCS-2 Client

First, let's create our main Go file and initialize the `hcs2` client. The SDK provides a clean configuration pattern for setting up the client.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/hashgraph-online/standards-sdk-go/pkg/hcs2"
)

func main() {
	ctx := context.Background()

	// Initialize the HCS-2 Client
	// Notice we can pull configuration directly from the environment
	client, err := hcs2.NewClient(hcs2.ClientConfig{
		OperatorAccountID:  os.Getenv("HEDERA_ACCOUNT_ID"),
		OperatorPrivateKey: os.Getenv("HEDERA_PRIVATE_KEY"),
		Network:            "testnet", // Explicitly use testnet
	})
	if err != nil {
		log.Fatalf("Failed to initialize HCS-2 client: %v", err)
	}

	fmt.Println("Successfully initialized HCS-2 Client!")
}
```

## Step 2: Creating an Indexed Registry

Now, let's create a new decentralized registry. We will create an **Indexed** registry, which functions like a global, immutable key-value store.

When you create a registry using the SDK, it communicates directly with the Hedera network to allocate a new cryptographic Consensus Topic and formats the topic memo according to the HCS-2 specification.

Append this to your `main.go`:

```go
	// ... previous code ...

	fmt.Println("Creating a new HCS-2 Indexed Registry...")

	// Create the registry
	result, err := client.CreateRegistry(ctx, hcs2.CreateRegistryOptions{
		RegistryType:        hcs2.RegistryTypeIndexed,
		UseOperatorAsAdmin:  true, // We retain administrative control
		UseOperatorAsSubmit: true, // We must sign future entries
	})
	if err != nil {
		log.Fatalf("Failed to create registry: %v", err)
	}

	topicID := result.TopicID.String()
	fmt.Printf("✅ Registry created successfully!\nTopic ID: %s\n", topicID)
```

## Step 3: Writing Data to the Registry

With our topic ID in hand, we can now publish structured entries to the registry.

In an Indexed registry, updating the state of a specific item is as simple as publishing a new message with the same `Index` (key). The SDK automatically constructs the correct JSON payload and signs it.

```go
	// ... previous code ...

	// Let's define the data we want to register
	// We'll register two physical IoT devices
	entries := []struct {
		Index string
		Data  map[string]any
	}{
		{
			Index: "device-001",
			Data:  map[string]any{"type": "sensor", "status": "active"},
		},
		{
			Index: "device-002",
			Data:  map[string]any{"type": "actuator", "status": "offline"},
		},
	}

	for _, entry := range entries {
		fmt.Printf("Registering %s...\n", entry.Index)

		publishResult, err := client.PublishIndexedEntry(ctx, hcs2.PublishIndexedEntryOptions{
			TopicID: topicID,
			Index:   entry.Index,
			Data:    entry.Data,
		})
		if err != nil {
			log.Fatalf("Failed to publish entry: %v", err)
		}

		fmt.Printf("Published entry securely at Sequence #%d\n", publishResult.SequenceNumber)
	}
```

## Step 4: Reading the Decentralized State

Writing is only half the battle. How do we retrieve the state of our registry?

Because HCS topics are public, anyone (not just you) can read the state of this registry using a Hedera Mirror Node. The SDK provides built-in methods to query the mirror node, parse the messages, and reconstruct the final "state" of the key-value store.

```go
	// ... previous code ...

	fmt.Println("Fetching current registry state from Hedera Mirror Node...")

	// Fetch all valid entries for our topic
	state, err := client.GetIndexedRegistryState(ctx, topicID)
	if err != nil {
		log.Fatalf("Failed to fetch state: %v", err)
	}

	fmt.Println("\n--- Current Registry State ---")
	for key, value := range state {
		fmt.Printf("Key [%s]: %v\n", key, value)
	}
}
```

If you ever published a new message for `device-001` saying `"status": "maintenance"`, the `GetIndexedRegistryState` function would automatically resolve the history and return the most recent valid state for that key.

## Under the Hood

When you use the `standards-sdk-go`, you are interacting with the Hedera network through strongly typed, validated interfaces.

But what's actually happening?

1. **Deterministic Memos**: The `CreateRegistry` call automatically formats the `memo` of the Hedera topic to `hcs-2;indexed`, signaling to the rest of the ecosystem how to interpret the messages.
2. **Schema Enforcement**: The SDK ensures that messages submitted to the topic strictly adhere to the HCS-2 JSON schema.
3. **Consensus Targeting**: Messages are delivered instantly across the globe with fair-ordering consensus applied by the Hedera validators.

## Next Steps

We've barely scratched the surface of what the Standards SDK can do. From this foundation, you can dive into more advanced protocols:

- [**HCS-14 (Universal Agent IDs)**](https://hol.org/docs/standards/hcs-14): Resolve AI identities.
- **Registry Broker**: Use the `pkg/registrybroker` to interact directly with the global [Hashgraph Online Registry Broker](https://hol.org).

Ready to start building?

👉 **[Dive into the SDK Documentation](https://hol.org/docs/libraries/standards-sdk/)** or star the **[standards-sdk-go repository on GitHub](https://github.com/hashgraph-online/standards-sdk-go)** to stay updated on the latest Go ecosystem releases!
