---
title: Overview — HCS‑16 Flora Coordination
description: What HCS‑16 does, how Flora topics/messages fit together, and how to use the SDK in real flows.
sidebar_position: 1
---

HCS‑16 defines coordination primitives for Flora accounts: multi‑member accounts built out of HCS‑15 Petals. Each Flora runs on three dedicated topics and exchanges a small set of standardized messages to initialize membership, coordinate transactions, and publish state.

This page explains the “why” and “how” before you touch code.

## What HCS‑16 Solves

- Creates a predictable skeleton for multi‑member accounts on Hedera
- Separates concerns across three topics so readers/indexers stay simple
- Uses explicit, typed operations so flows are auditable and replayable

## The Three Topics

- Communication Topic (CTopic): human/agent coordination and lifecycle messages
- Transaction Topic (TTopic): transaction intents and proposals
- State Topic (STopic): compact state updates (often paired with HCS‑17 hashes)

All topics use numeric‑enum memos per spec for consistent discovery by indexers.

## Core Operations

- flora_create_request → flora_create_accepted → flora_created
- tx_proposal (proposal for a scheduled tx or batched actions)
- state_update (compact state change; often includes/aligns with HCS‑17)
- flora_join_request → flora_join_vote → flora_join_accepted

## Typical Lifecycle

```mermaid
sequenceDiagram
  participant M as Member
  participant C as CTopic
  participant T as TTopic
  participant S as STopic

  M->>C: flora_create_request (members, threshold)
  M->>C: flora_create_accepted (acks sufficient)
  M->>C: flora_created (announce topics)
  M->>T: tx_proposal (hash/id)
  M->>S: state_update (epoch, hash, memo)
```

## SDK Design

- Environment‑specific clients (Node/Browser) wrap the same base logic
- All transactions are assembled in `tx.ts` (no JSON assembly in clients)
- Browser flows use wallet signing (`freezeWithSigner`/`executeWithSigner`)

Continue with the Node or Browser guides for step‑by‑step flows.

