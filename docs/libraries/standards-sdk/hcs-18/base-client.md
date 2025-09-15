---
sidebar_position: 4
---

# Base Client (HCS18BaseClient)

Think of this as the "radio scanner" and "rules of thumb" package: it filters the discovery stream to valid HCS‑18 messages and offers a simple way to tell if a proposal is ready.

## Responsibilities

- Filter mirror‑node messages to valid HCS‑18 ops (announce, propose, respond, complete, withdraw)
- Provide a simple acceptance helper for proposals
- Centralize logging/network/mirror‑node wiring (shared by Node/Browser clients)

## Methods

```ts
// Filter to HCS‑18 announce/propose/respond/complete/withdraw
public async getDiscoveryMessages(
  topicId: string,
  options?: { sequenceNumber?: string | number; limit?: number; order?: 'asc' | 'desc' }
): Promise<HCSMessageWithCommonFields[]>;

// Returns true when enough acceptances exist (members.length - 1)
public isProposalReady(
  proposal: { data: { members: any[] }, responses: Map<string, { decision: 'accept' | 'reject' }> }
): boolean;
```

### Polling Strategy

- Always resume from `lastSeq + 1` and store that persistently.
- Prefer ascending order for stream‑processing UIs; consider descending with limits for dashboards.
- Debounce UI updates to avoid flicker as pages arrive.

### Freshness Windows

- Use the discovery memo’s TTL as a hint to mark announcements “stale”.
- Some apps filter out stale entries automatically; others grey them out.

These helpers keep your application logic focused on policy decisions rather than plumbing.
