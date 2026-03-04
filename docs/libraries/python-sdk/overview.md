---
sidebar_position: 1
---

# Hashgraph Online Python SDK

The Python SDK (`standards-sdk-py`) provides Python-native clients for HCS standards modules, Registry Broker workflows, mirror-node access, and inscriber operations.

Scope note: parity targets the TypeScript SDK surface in `standards-sdk` excluding CLI commands.

Repository path in this monorepo: `standards-sdk-py`.

Canonical SDK docs URL: [https://hol.org/docs/libraries/standards-sdk/](https://hol.org/docs/libraries/standards-sdk/)

## Multi-Language SDK Links

| Language | Package | Source | Documentation |
| :--- | :--- | :--- | :--- |
| TypeScript | `@hol-org/standards-sdk` | [hashgraph-online/standards-sdk](https://github.com/hashgraph-online/standards-sdk) | [https://hol.org/docs/libraries/standards-sdk/](https://hol.org/docs/libraries/standards-sdk/) |
| Go | `github.com/hashgraph-online/standards-sdk-go` | [hashgraph-online/standards-sdk-go](https://github.com/hashgraph-online/standards-sdk-go) | [/docs/libraries/go-sdk/overview](/docs/libraries/go-sdk/overview) |
| Python | `standards-sdk-py` | [hashgraph-online/standards-sdk-py](https://github.com/hashgraph-online/standards-sdk-py) | [/docs/libraries/python-sdk/overview](/docs/libraries/python-sdk/overview) |

## Installation

```bash
cd standards-sdk-py
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

## Quick Start

```python
from standards_sdk_py.registry_broker import RegistryBrokerClient

client = RegistryBrokerClient()
result = client.search(query="hcs")
print(result.total)
client.close()
```

## Package Surface

- `standards_sdk_py.registry_broker`: sync + async Registry Broker clients
- `standards_sdk_py.mirror`: sync + async mirror-node clients
- `standards_sdk_py.inscriber`: sync + async inscriber flows, quote/create/poll helpers
- `standards_sdk_py.hcs2` ... `standards_sdk_py.hcs27`: per-standard client modules
- `standards_sdk_py.shared`: config, transport, typed JSON primitives, shared helpers
- `standards_sdk_py.parity`: parity manifest + inventory/check tooling

## Parity + Verification Workflow

Run all quality gates:

```bash
cd standards-sdk-py
.venv/bin/black --check .
.venv/bin/ruff check .
.venv/bin/mypy src
.venv/bin/pytest
.venv/bin/standards-sdk-py-check-parity
.venv/bin/standards-sdk-py-generate-inventory --repo-root ..
.venv/bin/standards-sdk-py-check-parity --strict-ts-inventory
.venv/bin/python -m build
```

## Live Inscriber End-to-End Check

Copy environment from the TypeScript SDK and load valid shell-style variables:

```bash
cd standards-sdk-py
cp ../standards-sdk/.env ./.env
set -a
source <(grep -E '^[A-Za-z_][A-Za-z0-9_]*=' ./.env)
set +a
```

Run integration:

```bash
export RUN_INTEGRATION=1
export RUN_INSCRIBER_INTEGRATION=1
export REGISTRY_BROKER_BASE_URL="https://hol.org/registry/api/v1"
export INSCRIBER_WAIT_TIMEOUT_MS=600000
.venv/bin/pytest -m integration -k inscriber_registry_broker_end_to_end_testnet -vv -rs
```

Notes:

- `HEDERA_NETWORK` and `INSCRIBER_HEDERA_NETWORK` are both supported (`testnet` or `mainnet`).
- If API keys are not preset, inscriber integration can derive a broker key from `*_HEDERA_ACCOUNT_ID` + `*_HEDERA_PRIVATE_KEY` credentials.
- Live broker endpoints can return intermittent `502/503/504`; the inscriber client includes transient retry handling for job creation and polling.

## Relationship to TypeScript and Go SDKs

- TypeScript SDK docs: `/docs/libraries/standards-sdk/overview`
- Go SDK docs: `/docs/libraries/go-sdk/overview`

Use the Python SDK when you want equivalent broker/inscriber/mirror workflows in Python runtimes while keeping the same operational patterns used in the TypeScript and Go implementations.
