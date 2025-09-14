---
title: Transactions — HCS‑15 Builders
description: Build raw Hedera transactions for HCS‑15 base and Petal account creation.
sidebar_position: 4
---

Note
- These builders are for direct transaction construction (e.g., Standards Agent Kit, custom pipelines).
- For most apps, prefer the higher‑level Node or Browser clients which wrap these builders.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-15
- tx.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/tx.ts
- types.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-15/types.ts

## Base Account — buildHcs15BaseAccountCreateTx

Creates a base account with ECDSA key and EVM alias suitable for HCS‑15 usage.

Signature

```ts
buildHcs15BaseAccountCreateTx(params: {
  publicKey: PublicKey;
  initialBalance?: Hbar | number;
  maxAutomaticTokenAssociations?: number;
  accountMemo?: string;
}): AccountCreateTransaction
```

Node example

```ts
import { Client, PrivateKey, Hbar } from '@hashgraph/sdk';
import { buildHcs15BaseAccountCreateTx } from '@hashgraphonline/standards-sdk';

const client = Client.forTestnet().setOperator(process.env.HEDERA_ACCOUNT_ID!, process.env.HEDERA_PRIVATE_KEY!);
const key = PrivateKey.generateECDSA();
const tx = buildHcs15BaseAccountCreateTx({ publicKey: key.publicKey, initialBalance: new Hbar(1), accountMemo: 'HCS‑15 Base' });
const receipt = await (await tx.execute(client)).getReceipt(client);
```

Notes
- Uses the SDK’s “ECDSA + alias” setter so an immutable EVM alias is assigned on creation.
- Set `maxAutomaticTokenAssociations` if you expect many token airdrops.

## Petal Account — buildHcs15PetalAccountCreateTx

Creates a Petal (shadow) account that reuses the base account’s public key and does not set an alias.

Signature

```ts
buildHcs15PetalAccountCreateTx(params: {
  publicKey: PublicKey;                    // shared ECDSA key from base
  initialBalance?: Hbar | number;
  maxAutomaticTokenAssociations?: number;
  accountMemo?: string;
}): AccountCreateTransaction
```

Node example

```ts
import { Client, PrivateKey } from '@hashgraph/sdk';
import { buildHcs15PetalAccountCreateTx } from '@hashgraphonline/standards-sdk';

const client = Client.forTestnet().setOperator(process.env.HEDERA_ACCOUNT_ID!, process.env.HEDERA_PRIVATE_KEY!);
const baseKey = PrivateKey.generateECDSA();
const tx = buildHcs15PetalAccountCreateTx({ publicKey: baseKey.publicKey, initialBalance: 0.5, accountMemo: 'HCS‑15 Petal' });
const receipt = await (await tx.execute(client)).getReceipt(client);
```

Browser example

```ts
import type { DAppSigner } from '@hashgraph/hedera-wallet-connect';
import { PrivateKey } from '@hashgraph/sdk';
import { buildHcs15PetalAccountCreateTx } from '@hashgraphonline/standards-sdk';

async function createPetal(signer: DAppSigner) {
  const baseKey = PrivateKey.generateECDSA();
  const tx = buildHcs15PetalAccountCreateTx({ publicKey: baseKey.publicKey, initialBalance: 0.5 });
  const frozen = await tx.freezeWithSigner(signer);
  const res = await frozen.executeWithSigner(signer);
  const receipt = await res.getReceiptWithSigner(signer);
  return receipt.accountId?.toString();
}
```

Notes
- Petal accounts are meant to be controlled by the same private key as the base—do not set an alias.
- Combine with HCS‑11 to inscribe per‑Petal profiles and HCS‑10 to create per‑Petal communication topics.
