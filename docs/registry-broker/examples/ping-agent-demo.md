---
title: Ping Agent Demo
description: Register a local requester agent, then exercise encrypted chat against the zero-credit Registry Ping Agent.
---

# Registry Ping Agent Demo

The `pnpm demo:registry-broker-ping` script in `standards-sdk` wires up an end-to-end encrypted conversation with the built-in `registry-ping-agent`. It bootstraps a temporary local A2A requester, registers it via Hedera ledger auth, generates the encryption key material automatically, and then sends an encrypted `PING` so you can verify ciphertext storage and decrypted history.

## Prerequisites

- `pnpm install` completed in `standards-sdk`
- `.env` populated with Hedera credentials (`HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, `HEDERA_NETWORK`) so ledger auth can issue an API token for registration
- Optional: `REGISTRY_BROKER_API_KEY` if you already have a production key (ledger auth still runs to register the local agent)
- Node.js >= 20
- Ability to expose a local HTTP server (Cloudflare tunnel/localtunnel are auto-detected by the shared demo helpers)

## Running the demo

```bash
cd standards-sdk
pnpm demo:registry-broker-ping
```

What happens:

1. The script locates the ping agent via discovery (override with `PING_AGENT_UAID` if you need to target a different UAID).
2. A lightweight local A2A agent spins up on `http://0.0.0.0:7200`.
3. The demo automatically provisions a Cloudflare tunnel (or falls back to localtunnel) so the requester exposes `.well-known/agent.json` and `/a2a` on a public URL unless you predefine `REGISTRY_BROKER_DEMO_A2A_PUBLIC_URL`.
4. The requester is registered in the `hashgraph-online` registry via Hedera ledger auth, and `RegistryBrokerClient.initializeAgent` auto-generates + registers a long-term encryption key (no extra env vars required).
5. `client.chat.createEncryptedSession` is invoked with the requester UAID, the ping agent auto-responds, and the decrypted history is printed so you can confirm the encrypted entries stored by the broker.

By default the requester agent is destroyed when the script exits, so repeated runs always prove the full provisioning flow (tunnel, registration, encryption, encrypted chat).

### Credit top-up behavior

The first 5 base registrations per account are free. After the free tier is exhausted, the registry will charge standard registration credits for the temporary requester. If the account linked to your API key is empty and a shortfall occurs, the demo automatically buys just enough credits (defaults to `1ℏ` and can be overridden via `DEMO_CREDIT_TOP_UP_HBAR`). Set `REGISTRY_BROKER_DEMO_AUTO_TOP_UP=false` to disable this convenience and handle credits manually.

### Cloudflare tunnel verification

The demo now watches the local `cloudflared` metrics endpoint (`/ready`) and double-checks DNS propagation via Cloudflare’s DNS-over-HTTPS API before registration proceeds—no extra environment variables are required, even on locked-down corporate networks. Enable `REGISTRY_BROKER_DEMO_DEBUG_TUNNEL=1` if you need verbose logs while the readiness probe runs or if you are troubleshooting a tunnel that never reports ready.
