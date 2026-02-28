---
title: "Go SDK: HCS-20 Auditable Points"
sidebar_position: 2
---

# Go SDK: HCS-20 Auditable Points

Use `pkg/hcs20` to deploy points registries and submit auditable `deploy`, `mint`, `transfer`, and `burn` operations.

## Install

```bash
go get github.com/hashgraph-online/standards-sdk-go@latest
```

## Deploy and Mint

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/hashgraph-online/standards-sdk-go/pkg/hcs20"
)

func main() {
	client, err := hcs20.NewClient(hcs20.ClientConfig{
		OperatorAccountID:  "0.0.123456",
		OperatorPrivateKey: "<private-key>",
		Network:            "testnet",
	})
	if err != nil {
		log.Fatal(err)
	}

	pointsInfo, err := client.DeployPoints(context.Background(), hcs20.DeployPointsOptions{
		Name:         "Loyalty Points",
		Tick:         "LOYAL",
		Max:          "1000000",
		LimitPerMint: "1000",
		Metadata:     "https://example.com/points/loyal",
	})
	if err != nil {
		log.Fatal(err)
	}

	mintResult, err := client.MintPoints(context.Background(), hcs20.MintPointsOptions{
		Tick:   "LOYAL",
		Amount: "250",
		To:     "0.0.98765",
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Points topic: %s\n", pointsInfo.TopicID)
	fmt.Printf("Mint tx: %s\n", mintResult.TransactionID)
}
```

## Related Docs

- [HCS-20 SDK Overview](/docs/libraries/standards-sdk/hcs-20/overview)
- [HCS-20 Standard](/docs/standards/hcs-20)
