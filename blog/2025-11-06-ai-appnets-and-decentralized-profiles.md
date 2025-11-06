---
slug: ai-appnets-decentralized-profiles
title: 'AI AppNets and Decentralized Profiles arrive on Hedera / Hiero'
authors: [patches]
tags: [ai, standards, hcs, hedera, identity]
date: 2025-11-06
---

Hashgraph Online is preparing the publication of three new draft standards that bring identity, coordination, and verifiable state into one cohesive stack for Hedera and Hiero builders: **HCS-15 Petals**, **HCS-16 Floras**, and **HCS-17 State Hash**.

<!--truncate-->

> “Petals make identity practical by letting one key manage many purpose-specific accounts. Floras make group coordination predictable by standardizing how members propose, approve, and attest to actions. Together they give builders a simple path from identity to verifiable coordination.”
>
> — Michael Kantor, President, Hashgraph Online DAO

All three specifications are published as **Status: Draft, Version 1.0** and are open for feedback ahead of Discussion and Last Call.

## Customized Profiles: Petal Accounts (HCS-15 / HCS-11)

Web3 profiles should be as flexible as their Web2 counterparts. Petal accounts deliver that flexibility by letting a base account derive multiple profile accounts — each with its own assets, memos, and metadata — without creating new keys.

- Petals share the same private key as the base account but have unique account IDs and memo fields.
- HCS-11 profiles attach descriptive metadata and require every Petal to reference its `base_account`.
- The recommended pattern provisions the base account with an ECDSA key plus EVM alias, then creates Petals with the same public key.
- Petals can reference a dedicated state topic (defined in HCS-17) for internal state snapshots.

**Key takeaways**

- Multiple accounts orchestrated by one key.
- Profile memos use the `hcs-11:<resource>` format, binding Petals back to the base account.
- Petals publish to an HCS-17 state topic when attestations or proofs of state are needed.

<img
  src="/img/blog/petal.png"
  alt="Petal account diagram showing base account orchestrating multiple Petals"
  style={{ width: '100%', maxWidth: '920px', margin: '1.5rem auto' }}
/>

## AppNets for AI and More (HCS-16)

Floras are threshold-controlled coordination accounts designed for decentralized AppNets. Built from member Petals into a T-of-M multisig, a Flora is described by an HCS-11 profile and relies on three mandatory HCS topics:

1. **Communication Topic** – member messaging, proposals, and coordination.
2. **Transaction Topic** – scheduled transaction proposals and voting.
3. **State Topic** – commitments, membership changes, and state proofs.

The specification defines canonical envelopes and operation codes (`flora_created`, `transaction`, `state_update`) and shows how to publish hashes using HCS-17.

**Key takeaways**

- Threshold multisig derived from Petal members with a configurable T-of-M policy.
- Three-topic architecture keeps communication, execution, and state commitments separated and auditable.
- Standardized message operations ensure interoperable tooling and provide an optional `state_hash` publication path.

<img
  src="/img/blog/flora.png"
  alt="Flora AppNet diagram showing threshold key members and topics"
  style={{ width: '100%', maxWidth: '920px', margin: '1.5rem auto' }}
/>

## Decentralized State Management (HCS-17)

AppNets and Petals need a consistent way to prove state across distributed data sets. HCS-17 defines the message structure, hashing strategy, and referencing rules required to publish verifiable state hashes.

- Petal state: publish a hash representing the Petal’s current state to its state topic.
- Flora state: publish composite hashes that can include member Petal state plus running hashes from Flora topics.
- Consumers recompute and verify the hashes using the referenced account IDs, topic IDs, and component hashes.

**Key takeaways**

- Provides a standard envelope for `state_hash` messages.
- Supports aggregation of multiple sources of truth.
- Enables deterministic verification of Flora and Petal state.

## Putting the Standards Together

With HCS-11, HCS-15, HCS-16, and HCS-17 working in tandem, Hiero networks gain a complete toolkit:

- **Identity & metadata** via HCS-11 profiles.
- **Account isolation** through Petals that separate assets and personas while sharing a single signing key.
- **Coordinated AppNets** through Floras that manage proposals, votes, and attestations across three standardized topics.
- **Verifiable state** through HCS-17 hashes published by Petals and Floras.

Petals compute or confirm state hashes, while Floras publish composite state that aggregates member contributions and topic running hashes.

## Drafts Are Live — Start Building

You can prepare implementations today against the draft specifications:

- **Adopt HCS-11 profiles.** Use `hcs-11:<resource>` memos; set `base_account` for Petals; include members, threshold, and topic IDs for Floras.
- **Create Petals correctly.** Provision the base account with ECDSA + EVM alias, then derive Petals with the same public key and attach the HCS-11 profile.
- **Stand up a Flora.** Assemble the threshold key from Petal members, create the three topics, and use the HCS-16 envelopes for `flora_created`, `transaction`, and `state_update`.
- **Publish state when needed.** Use HCS-17 `state_hash` messages on Flora state topics or Petal state topics whenever provenance is required.

## Example Use Cases

- Partition assets and permissions for different business units, programs, or personas under one key.
- Coordinate multi-party treasury approvals, milestone-based releases, supplier and invoice workflows, or shared data rooms.
- Manage cross-company projects, vendor oversight, and grants with sub-budgets while optionally publishing verifiable state proofs.

## Security Considerations

- **Key reuse risk:** One compromised key affects all Petals derived from it. Plan rotation policies and emergency procedures.
- **Threshold design:** Choose T-of-M values carefully and follow the lifecycle flows in HCS-16 for safe membership changes.

## Publication Path

Per the HCS-4 Standards Process, the drafts now enter the feedback period and will proceed through Discussion and Last Call. We welcome community input as we finalize these specifications.

Stay tuned for further updates, and start building with Petals, Floras, and verifiable state today.
