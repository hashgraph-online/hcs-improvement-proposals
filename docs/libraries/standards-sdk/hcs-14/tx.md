---
title: Transactions — HCS‑14
description: UAID generation is offline and network‑agnostic; there are no dedicated HCS‑14 transaction builders.
sidebar_position: 5
---

Note
- HCS‑14 (UAID) does not define on‑chain transactions. UAIDs are derived from canonical data or existing DIDs and can be generated entirely offline.
- On Hedera, you may optionally issue/resolve `did:hedera` via the SDK’s resolvers/issuers, but HCS‑14 itself provides no tx.ts builders.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-14
- sdk.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-14/sdk.ts

## When do I use transactions?

- UAID (AID or DID flavor): no transactions required.
- If you want a Hedera DID (`did:hedera`): use the HCS‑14 issuers/resolvers with your Hedera environment; see the Hedera page.
- For profile inscription or discovery/messaging around UAIDs: use HCS‑11 (profiles) and HCS‑10 (OpenConvAI) which have dedicated tx builders.

## See also

- Hedera integration: [/docs/libraries/standards-sdk/hcs-14/hedera](/docs/libraries/standards-sdk/hcs-14/hedera)
- API: [/docs/libraries/standards-sdk/hcs-14/api](/docs/libraries/standards-sdk/hcs-14/api)
