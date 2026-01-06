---
slug: ai-appnets-decentralized-profiles
title: 'AI AppNets and Decentralized Profiles arrive on Hedera / Hiero'
description: "Introducing HCS-15 Petals (profile accounts), HCS-16 Floras (multi-signature AppNets), and HCS-17 State Hash for verifiable coordination. Learn how to partition assets, coordinate multi-party actions, and publish state proofs on Hedera."
authors: [patches]
tags: [ai, standards, hcs, hedera, identity, hcs-15, hcs-16, hcs-17]
date: 2025-11-06
---

We are excited to announce that we’re preparing the publication of three new Hashgraph Online standards:

- **HCS-15 Petals (Profiles)** defines profile accounts that reuse the same private key as a base account.
- **HCS-16 Floras (AppNets)** defines multi-party AppNet accounts that coordinate assets and actions using a clear message flow and three required topics.
- **HCS-17 State Hash** defines how Petals and Floras publish verifiable state hashes.

All three documents are Status: Draft, Version 1.0.

<!--truncate-->

> “Petals make identity practical by letting one key manage many purpose-specific accounts. Floras make group coordination predictable by standardizing how members propose, approve, and attest to actions. Together they give builders a simple path from identity to verifiable coordination.”
>
> — Michael Kantor, President, Hashgraph Online DAO

## Customized Profiles: Petal Accounts (HCS-15 / HCS-11)

We are used to browsing different websites and creating different profiles and information for each separate experience. The same should be true for web3. The ability to hold only certain assets in an isolated account, to have a specific identity associated with an account, should be easy. With petal accounts, there is now an easy solution.

Profile accounts or “Petals” are accounts that share the same private key as a base account, or main account/wallet. Each Petal has its own account ID and assets, and memo field. HCS-11 allows users to customize profile information for that account, giving the flexibility of separating assets and profile identities or uses without needing to generate a new key.

The spec recommends creating the base account with an ECDSA key and EVM alias, then creating Petals with the same public key. The spec also requires Petals to include an HCS-11 profile memo and reference its `base_account`. A Petal may include a state topic for internal state and hashing, that’s defined in HCS-17.

**Key points**

- Multiple accounts with one key. The base account can orchestrate transactions for its Petals.
- Profile memos use the `hcs-11:<resource>` format and the `base_account` field links Petals to the base account.
- When you need attestations of Petal state, publish to a state topic using HCS-17.

<img
  src="/img/blog/petal.png"
  alt="Petal account diagram showing base account orchestrating multiple Petals"
  style={{ width: '100%', maxWidth: '920px', margin: '1.5rem auto' }}
/>

## AppNets for AI and more (HCS-16)

Floras are threshold-controlled coordination accounts for decentralized AppNets. A Flora is formed from member Petals into a T-of-M multisig and is described by an HCS-11 profile. Every Flora uses three required HCS topics: Communication, Transaction, and State. The standard defines canonical message envelopes and operations for creation, transactions, and state updates, and shows how to publish hashes using HCS-17.

**Key points**

- Threshold account built from Petal members with a threshold/members or T-of-M key. The threshold is decided by the Petals as they decide to create the Flora.
- Three topics per Flora: Communication topic for coordination inside the Flora, Transaction topic for scheduled transaction proposals, State topic for commitments and membership changes.
- Standard message operations: `flora_created`, `transaction`, and `state_update`, with an option to publish an HCS-17 `state_hash`.

<img
  src="/img/blog/flora.png"
  alt="Flora AppNet diagram showing threshold key members and topics"
  style={{ width: '100%', maxWidth: '920px', margin: '1.5rem auto' }}
/>

## Decentralized State Management (HCS-17)

With AppNets, one of the biggest needs is a method of coming to consensus on disperse data sets from different sources. HCS-17 defines a consistent way to compute and publish state hashes for Petals and Floras to solve this problem.

It covers message structure for `state_hash`, how to reference account and topic IDs, and how to aggregate component hashes when a Flora tracks multiple sources of truth.

**Key points**

- Petal state: publish a hash that represents the Petal’s current state to its state topic.
- Flora state: publish a composite hash that can include member Petal state and running hashes from the Flora’s topics.
- Consumers verify state by recomputing the hash from referenced components.

## Putting all of these standards together

Hiero networks now have an ability to isolate assets, profile information, AppNet membership, with the ease of only needing one key to facilitate any signing required.

This system of standards are primitive building blocks to create a diverse method of decentralized consensus between any accounts, that all decide and create consensus and execute transactions with signatures of those members, effectively and efficiently.

Identity and metadata come from HCS-11 profiles. Coordination happens inside Floras through the communication and transaction topics. Members communicate on the Communication Topic, move proposals on the Transaction Topic, and commit results on the State Topic. Verifiable state uses HCS-17 for a standardized way to create state hashes on a network. Petals then compute/confirm the state hashes. Floras can then publish composite state that aggregates member state and Flora topic running hashes.

## Drafts are live, you can use them today!

You can prepare implementations now against the drafts.

- **Adopt HCS-11 profiles.** Use `hcs-11:<resource>` memos. For Petals, set `base_account`. For Floras, include members, threshold, and topic IDs.
- **Create Petals correctly.** Provision the base account with ECDSA plus EVM alias. Create Petals with the same public key. Attach the HCS-11 profile and reference the base account.
- **Stand up a Flora.** Assemble the threshold key from Petal members. Create the three topics. Use the HCS-16 envelopes and operation codes for `flora_created`, `transaction`, and `state_update`.
- **Publish state when you need provenance.** Use HCS-17 for `state_hash` on the Flora State Topic or a Petal state topic.

## Example use cases

Petals help partition assets and permissions under one key for lines of business, programs, or personas. Floras coordinate multi-party actions such as treasury approvals, milestone releases, supplier and invoice workflows, and shared data rooms. Together they support cross-company projects, vendor and client oversight, and grants with sub-budgets, with optional state proofs when needed.

## Security notes

- **Key reuse risk.** Using one key across multiple Petals increases blast radius if the key is compromised. Plan rotation order and policy.
- **Threshold design and membership change.** Choose thresholds carefully and follow the lifecycle flows and security considerations in HCS-16.

## Publication path

All three documents are Draft today. Per HCS-4 Standards Process, they will enter Discussion and Last Call for feedback soon. Stay tuned for more information.
