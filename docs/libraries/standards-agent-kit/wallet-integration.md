---
sidebar_position: 4
---

# Wallet Integration

The Standards Agent Kit supports browser/dApp flows where transactions are built as bytes and executed by a wallet. Two mechanisms are used:

- SignerProviderRegistry: central config for HCS‑10/HCS‑2/HCS‑6 flows
- ByteBuildRegistry: builds transaction bytes for many operations

The InscriberBuilder uses a parallel delegate configuration for inscription flows.

## SignerProviderRegistry

```ts
import { SignerProviderRegistry } from '@hashgraphonline/standards-agent-kit';

// 1) Provide a DApp signer (optional)
SignerProviderRegistry.setSignerProvider(async () => {
  // Return a signer object exposing getAccountId()
  return walletSdk.getSigner();
});

// 2) Provide wallet info (account + network)
SignerProviderRegistry.setWalletInfoResolver(async () => ({
  accountId: walletSdk.getAccountId(),
  network: walletSdk.getNetwork(), // 'mainnet' | 'testnet'
}));

// 3) Provide a function to execute base64 transaction bytes
SignerProviderRegistry.setWalletExecutor(async (base64, network) => {
  const txId = await walletSdk.executeTransaction(base64, network);
  return { transactionId: txId };
});

// 4) Optional: provide a delegate to build bytes via backend or SDK
SignerProviderRegistry.setStartHCSDelegate(async (op, request, network) => {
  // op examples: 'submitConnectionRequest', 'hcs2.registerEntry', 'hcs6.createRegistry'
  // request is a plain object; return { transactionBytes: string }
  const { transactionBytes } = await api.buildTx({ op, request, network });
  return { transactionBytes };
});

// 5) Optional: prefer wallet only (disable server fallback)
SignerProviderRegistry.setPreferWalletOnly(true);
```

How it works
- Builders consult ByteBuildRegistry to construct bytes locally when possible.
- If not available, `startHCSDelegate` can provide bytes (e.g., from a backend).
- If a `walletExecutor` is configured, builders return `transactionBytes` for you to submit.
- In server contexts (with private key), builders can submit directly via Standards SDK.

## ByteBuildRegistry

The kit includes a registry of byte builders for common HCS operations. You generally don’t call it directly — builders do — but you can extend it.

```ts
import { ByteBuildRegistry } from '@hashgraphonline/standards-agent-kit';

// Check if an operation is supported
ByteBuildRegistry.has('hcs2.registerEntry'); // true/false

// Register your own handler if needed
ByteBuildRegistry.register('custom.op', async ({ hederaKit, request }) => {
  // build and freeze a transaction using @hashgraph/sdk
  const base64 = /* Buffer.from(tx.toBytes()).toString('base64') */ '';
  return { transactionBytes: base64 };
});
```

Supported operations include:
- HCS‑10: `submitConnectionRequest`, `sendMessage`
- HCS‑2: `hcs2.createRegistry`, `hcs2.registerEntry`, `hcs2.updateEntry`, `hcs2.deleteEntry`, `hcs2.migrateRegistry`, `hcs2.submitMessage`
- HCS‑6: `hcs6.createRegistry`, `hcs6.registerEntry`, `hcs6.submitMessage`
- Plus HCS‑7/HCS‑12/HCS‑20 helpers used by dependent builders/libraries

## InscriberBuilder delegates

InscriberBuilder has a separate delegate API because inscriptions can involve different lifecycles:

```ts
import { InscriberBuilder } from '@hashgraphonline/standards-agent-kit';

// Provide a DApp signer (optional)
InscriberBuilder.setSignerProvider(() => walletSdk.getSigner());

// Provide wallet info and executor
InscriberBuilder.setWalletInfoResolver(() => ({ accountId: '0.0.x', network: 'testnet' }));
InscriberBuilder.setWalletExecutor(async (base64, network) => ({ transactionId: await walletSdk.executeTransaction(base64, network) }));

// Provide a delegate that returns inscription transaction bytes (+ optional job/topic hints)
InscriberBuilder.setStartInscriptionDelegate(async (request, network) => {
  // request contains file/url/buffer and options; return tx bytes
  return { transactionBytes: await api.buildInscription(request, network) };
});

// Optional: enforce wallet path
InscriberBuilder.setPreferWalletOnly(true);
```

## Tips
- In browser apps, set `preferWalletOnly` and rely on a wallet for all submits.
- On servers, do not set `preferWalletOnly`; provide operator private key via HederaAgentKit.
- Builders return helpful errors with code strings like `wallet_unavailable` or `wallet_submit_failed` when delegation is required.
