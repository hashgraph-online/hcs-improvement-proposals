---
sidebar_position: 1
---

# Hashgraph Online Go SDK

The Go SDK (`standards-sdk-go`) provides a native Go implementation of the Hiero Consensus Specifications (HCS) and Registry Broker utilities, offering the same capabilities as the TypeScript SDK for Go developers.

[![Go Reference](https://pkg.go.dev/badge/github.com/hashgraph-online/standards-sdk-go.svg)](https://pkg.go.dev/github.com/hashgraph-online/standards-sdk-go)
[![Go Report Card](https://goreportcard.com/badge/github.com/hashgraph-online/standards-sdk-go)](https://goreportcard.com/report/github.com/hashgraph-online/standards-sdk-go)

## What This SDK Does

- **Implements HCS Protocols** — Full Go implementations of HCS-2, HCS-5, HCS-11, HCS-14, HCS-15, HCS-16, HCS-17, HCS-20, and HCS-27
- **Inscriber Utilities** — Kiloscribe auth, websocket-based inscription, quote generation, bulk-files, and skill inscription helpers
- **Registry Broker Client** — Full-featured client for search, agents, credits, verification, ledger auth, chat/encryption, feedback, and skills
- **Idiomatic Go Patterns** — Context-aware APIs, structured error handling, and familiar Go conventions

## Installation

```bash
go get github.com/hashgraph-online/standards-sdk-go@latest
```

## Quick Start

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/hashgraph-online/standards-sdk-go/pkg/hcs2"
)

func main() {
	client, err := hcs2.NewClient(hcs2.ClientConfig{
		OperatorAccountID:  "0.0.1234",
		OperatorPrivateKey: "<private-key>",
		Network:            "testnet",
	})
	if err != nil {
		log.Fatal(err)
	}

	result, err := client.CreateRegistry(context.Background(), hcs2.CreateRegistryOptions{
		RegistryType:        hcs2.RegistryTypeIndexed,
		TTL:                 86400,
		UseOperatorAsAdmin:  true,
		UseOperatorAsSubmit: true,
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Registry created: %s\n", result.TopicID)
}
```

## Supported Packages

| Package | Standard | Description |
|---------|----------|-------------|
| `pkg/hcs2` | HCS-2 | Registry topic creation, tx builders, indexed entry operations, memo helpers, mirror reads |
| `pkg/hcs5` | HCS-5 | Hashinal minting helpers and end-to-end inscribe+mint workflow |
| `pkg/hcs11` | HCS-11 | Profile models/builders, validation, inscription, account memo updates, profile resolution |
| `pkg/hcs14` | HCS-14 | UAID generation/parsing plus profile resolution (`_uaid`, `_agent`, ANS `_ans`, `uaid:did` base) |
| `pkg/hcs15` | HCS-15 | Base/petal account creation, tx builders, petal/base key verification helpers |
| `pkg/hcs16` | HCS-16 | Flora account + topic management, message builders/senders, threshold-member key assembly |
| `pkg/hcs17` | HCS-17 | State-hash topic/message support, deterministic state hash calculators, verification |
| `pkg/hcs20` | HCS-20 | Auditable points deployment, mint/transfer/burn flows, tx builders, and state indexing |
| `pkg/hcs27` | HCS-27 | Checkpoint topic creation, publish/retrieval, validation, Merkle/proof helpers |
| `pkg/inscriber` | — | Kiloscribe auth flow, websocket inscription, quote generation, bulk-files, skill inscription |
| `pkg/registrybroker` | — | Full Registry Broker client (search, adapters, agents, credits, verification, chat, skills) |
| `pkg/mirror` | — | Mirror node client used by HCS and inscriber packages |
| `pkg/shared` | — | Network normalization, operator env loading, Hedera client/key parsing helpers |

## Environment Variables

The SDK auto-loads `.env` from the current working directory or ancestor directories before resolving credentials.

### Common

| Variable | Description |
|----------|-------------|
| `HEDERA_ACCOUNT_ID` | Hedera operator account ID |
| `HEDERA_PRIVATE_KEY` | Hedera operator private key |
| `HEDERA_NETWORK` | Target network (`testnet` or `mainnet`) |

Aliases are also supported: `HEDERA_OPERATOR_ID`/`HEDERA_OPERATOR_KEY`, `OPERATOR_ID`/`OPERATOR_KEY`, `ACCOUNT_ID`/`PRIVATE_KEY`.

### Network-scoped Overrides

| Variable | Description |
|----------|-------------|
| `TESTNET_HEDERA_ACCOUNT_ID` | Testnet operator account ID |
| `TESTNET_HEDERA_PRIVATE_KEY` | Testnet operator private key |
| `MAINNET_HEDERA_ACCOUNT_ID` | Mainnet operator account ID |
| `MAINNET_HEDERA_PRIVATE_KEY` | Mainnet operator private key |

## Running Tests

```bash
# All packages
go test ./...

# Live HCS + Inscriber integration (no mocks)
RUN_INTEGRATION=1 \
RUN_INSCRIBER_INTEGRATION=1 \
go test -v ./pkg/hcs2 ./pkg/hcs27 ./pkg/inscriber
```

## TypeScript SDK Comparison

The Go SDK mirrors the TypeScript SDK's structure and capabilities. See the [Standards SDK (TypeScript)](../standards-sdk/overview.mdx) documentation for the TypeScript equivalents. Throughout the per-standard documentation pages, you can switch between TypeScript and Go code snippets using the language tabs.

## Community and Support

- [Join our Telegram](https://t.me/hashinals) for community discussion
- [Follow us on Twitter](https://twitter.com/hashgraphonline) for updates
- [View the source code](https://github.com/hashgraph-online/standards-sdk-go) on GitHub
- [Go Reference (pkg.go.dev)](https://pkg.go.dev/github.com/hashgraph-online/standards-sdk-go)
