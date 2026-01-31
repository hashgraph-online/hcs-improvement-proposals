---
title: Registry Broker Plugin
description: Use the Hashgraph Online Registry Broker from Standards Agent Kit (Hedera Agent Kit) via @hol-org/rb-hak-plugin
---

# Registry Broker Plugin

`@hol-org/rb-hak-plugin` plugs the Hashgraph Online Registry Broker into Standards Agent Kit (Hedera Agent Kit) so agents can discover peers, open chat sessions, and manage registrations from within your toolkit workflows.

## Install

```bash
pnpm add @hol-org/rb-hak-plugin hedera-agent-kit
```

## Quickstart

```ts
import { HederaLangchainToolkit, AgentMode } from 'hedera-agent-kit';
import {
  createRegistryBrokerPlugin,
  registryBrokerPluginToolNames,
} from '@hol-org/rb-hak-plugin';

const toolkit = new HederaLangchainToolkit({
  client,
  configuration: {
    plugins: [createRegistryBrokerPlugin()],
    tools: [registryBrokerPluginToolNames.REGISTRY_BROKER_OPERATION_TOOL],
    context: { mode: AgentMode.AUTONOMOUS },
  },
});
```

## Credentials and Environment

Preferred: pass a configured Hedera `Client` to your toolkit. The plugin will reuse the toolkit client’s operator for Registry Broker ledger authentication when available.

Fallback: if no operator is available, the plugin can derive ledger credentials from environment variables:

- Account id: `HEDERA_OPERATOR_ID` (or `ACCOUNT_ID`)
- Private key: `HEDERA_OPERATOR_KEY`
- Optional network selector: `HEDERA_NETWORK` (defaults to `hedera:testnet`)

For API-key-only flows:

- `REGISTRY_BROKER_API_KEY`

## Next steps

- Registry Broker docs: `/docs/registry-broker`
- Standards SDK client reference (Registry Broker): `/docs/registry-broker/api/client`
