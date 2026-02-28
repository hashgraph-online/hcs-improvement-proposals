---
title: "Go SDK: HCS-27 Checkpoints"
sidebar_position: 3
---

# Go SDK: HCS-27 Checkpoints

Use `pkg/hcs27` to create checkpoint topics and publish checkpoint root commitments aligned with HCS-27.

## Install

```bash
go get github.com/hashgraph-online/standards-sdk-go@latest
```

## Create Topic and Publish Checkpoint

```go
package main

import (
	"context"
	"log"

	"github.com/hashgraph-online/standards-sdk-go/pkg/hcs27"
)

func main() {
	client, err := hcs27.NewClient(hcs27.ClientConfig{
		OperatorAccountID:  "0.0.123456",
		OperatorPrivateKey: "<private-key>",
		Network:            "testnet",
	})
	if err != nil {
		log.Fatal(err)
	}

	topicID, _, err := client.CreateCheckpointTopic(context.Background(), hcs27.CreateTopicOptions{
		TTLSeconds:          300,
		UseOperatorAsAdmin:  true,
		UseOperatorAsSubmit: true,
	})
	if err != nil {
		log.Fatal(err)
	}

	metadata := hcs27.CheckpointMetadata{
		Type:   "ans-checkpoint-v1",
		Stream: hcs27.StreamID{Registry: "ans", LogID: "default"},
		Root: hcs27.RootCommitment{
			TreeSize:    671,
			RootHashB64: "8zVIY3QJBOdTYR8dnLOzedEfym4Jl7f1xy8pciLEMew",
		},
		BatchRange: hcs27.BatchRange{Start: 661, End: 671},
	}

	_, err = client.PublishCheckpoint(
		context.Background(),
		topicID,
		metadata,
		"go-sdk checkpoint publish",
		"",
	)
	if err != nil {
		log.Fatal(err)
	}
}
```

## Related Docs

- [HCS-27 Standard](/docs/standards/hcs-27)
- [HCS-27 Merkle Profile](/docs/standards/hcs-27/merkle-tree-profile)
