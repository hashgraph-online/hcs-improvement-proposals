---
title: Transactions — HCS‑11
description: Profile inscription and memo updates are performed via high‑level helpers; no dedicated tx builders required.
sidebar_position: 4
---

Note
- These flows are typically driven via `HCS11Client` high‑level methods in sdk.ts or browser.ts.
- Direct transaction building is possible for agent‑kit/custom pipelines but not required.

Use `HCS11Client` high‑level methods (`createAndInscribeProfile`, `inscribeProfile`, memo updates) which internally construct and submit the necessary transactions.

Sources
- Module folder: https://github.com/hashgraph-online/standards-sdk/tree/main/src/hcs-11
- client.ts: https://github.com/hashgraph-online/standards-sdk/blob/main/src/hcs-11/client.ts
