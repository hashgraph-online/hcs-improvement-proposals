---
description: HCS-17 defines the methodology for calculating state hashes of accounts and decentralized formations on Hedera, ensuring consistent, auditable, and tamper-proof state verification for distributed AI networks.
sidebar_position: 17
---

# HCS-17 State Hash Calculation Standard

**Status:** Draft

## Table of Contents

- Authors
- Abstract
- Motivation
- Specification
- State Hash Calculation Overview
- State Hash Calculation Methodology
- Example State Hash Calculation
- Composite State Hash Calculation for Floras & Blooms
- Implementation Workflow
- Integration with Existing Standards
- Security Considerations
- Conclusion

## Authors

- Patches https://x.com/tmcc_patches

## Abstract

HCS-17 explicitly defines the methodology for calculating the state hash of accounts and accounts within decentralized formations (“Petals”, “Floras”, “Blooms”, “Meadows”) on Hedera. This standard ensures consistent, auditable, and tamper-proof state verification, facilitating reliable synchronization and consensus across distributed AI networks.

## Motivation

Accurate and consistent state hash calculation is critical for verifying states within decentralized formations of multiple accounts / accounts / AI / computers. HCS-17 provides a clear and standardized methodology to:

- Ensure transparency and verifiability of cluster states
- Facilitate rapid state reconciliation
- Support modularity and scalability of AI clusters

## Specification

## State Hash Calculation Overview

HCS-17 defines a standardized cryptographic procedure for aggregating the state of relevant HCS topics into a singular hash value, representing the state of an individual account at any given time.

## State Hash Calculation Methodology

The state hash for a account is calculated using the following methodology:

1. Retrieve the latest running hash from each relevant HCS topic the account participates in or monitors.
2. Concatenate each topic ID directly followed by its corresponding latest running hash in ascending order of the topic IDs.
3. Append the public key of the account at the end of the concatenated topic id string
4. Apply the SHA384 cryptographic hash function to the concatenated string.

Formally:

```
StateHash = SHA384(topicId_1 || latestRunningHash_1 || topicId_2 || latestRunningHash_2 || ... || topicId_n || latestRunningHash_n || account_publicKey)
```

Example State Hash Calculation

For clarity, assume a account monitors two topics:

- Topic ID: 0.0.12345 with latest running hash abcd1234
- Topic ID: 0.0.67890 with latest running hash efgh5678
- Account public key FGHKLJHDGK

Concatenate topic IDs and hashes, then add public key on the end:

```
0.0.12345abcd12340.0.67890efgh5678FGHKLJHDGK
```

Apply SHA384 hashing:

```
StateHash = SHA384("0.0.12345abcd12340.0.67890efgh5678FGHKLJHDGK")
```

## Composite State Hash Calculation for Floras & Blooms

Floras and Blooms are composite Hedera accounts whose validity derives from the coordinated behaviour of a set of underlying member accounts (their Petals for Floras, and Floras/Petals for Blooms).

To provide a single, tamper‑evident view of the composite, HCS‑26 extends the base procedure so that a Flora or Bloom publishes a CompositeStateHash that is deterministically derived from:

- **Member account state**: The latest StateHash of every direct child account (Petal, Flora, etc).
- **Composite interaction topics**: The latest running hash of every HCS topic that was created by or for the composite (e.g., escrow, governance, and inter‑composite communication topics defined in HCS‑22).
- **Composite public‑key fingerprint**:: The deterministic fingerprint of the composite’s threshold key

The procedure MUST be applied recursively: a Bloom aggregates the CompositeStateHash values of the Floras it contains; a Flora aggregates the StateHash values of its Petals.

**TODO** Determine if smart contract addresses tht were deployed by the account or composite should be includeded in the same manner as topic ids.

## Algorithm

1. Collect child hashes (utilize the state topic in Floras / Blooms for latest state postings)
   Retrieve StateHash_i for every direct child account accountId_i.
2. Collect composite topic hashes
   Retrieve the latest running hash runningHash_j for every topic topicId_j where the composite is adminKey / submitKey / where the programs state is important.
3. Sort & concatenate:

- Sort child accountId_i values lexicographically and concatenate accountId_i || StateHash_i for each.
- Sort topicId_j lexicographically and concatenate topicId_j || runningHash_j for each.
- Append the composite public‑key fingerprint from the threshold‑key procedure.

4. Hash in SHA384

```
CompositeStateHash =
    SHA384( Σ_sorted( accountId_i || StateHash_i ) ||
            Σ_sorted( topicId_j   || runningHash_j ) ||
            composite_publicKeyFingerprint )
```

Example (Flora with 2 Petals)

- Petal A – accountId 0.0.111 → StateHash 0xaaa
- Petal B – accountId 0.0.222 → StateHash 0xbbb
- Flora’s transaction topic – topicId 0.0.333 → runningHash 0xccc
- Flora’s communication topic – topicId 0.0.444 → runningHash 0xddd
- Flora public‑key fingerprint – 0xffff

Concatenate (IDs sorted):

```
0.0.1110xaaa0.0.2220xbbb0.0.3330xccc0.0.4440xddd0xffff
```

Apply SHA‑384:

```
CompositeStateHash = SHA384("0.0.1110xaaa0.0.2220xbbb0.0.3330xccc0.0.4440xddd0xffff")
```

Implementation Notes

- **Frequency** – Re‑compute immediately after detecting any child StateHash or composite topic runningHash update, or at the synchronization interval specified by HCS‑22, whichever occurs first.
- **Bridging layers** – Applications SHOULD store the most recent CompositeStateHash in a HCS-2 topic with indexed:false. The newest hash state of the composite account will always be the latest message. The Flora / Bloom, can add the topic id for this state in it's metadata so other agents can verify composite integrity offline.
- **Versioning** – Future extensions (e.g., Meadow‑level aggregation) MUST follow the same recursive pattern, guaranteeing O(log N) recalculation time when a single leaf changes.

Implementation Workflow

1. Identify all relevant topics.
2. Regularly fetch the latest running hash for each topic.
3. Append the current public key of the account
4. Compute and broadcast the state hash periodically according to HCS-22’s synchronization interval.

Integration with Existing Standards

- Complements HCS-22 by providing a precise method for state synchronization.
- Easily integrated with HCS-15 for consistent state verification across cluster members.

## Deterministic, application-level public key for Keylist + Threshold Keys (Floras, Blooms, Meadows, etc)

When calculating state for a Flora, Bloom, or any account that is comprised of a threshold of other keys for a valid signature, this method of public key fingerprint calculation should be utilized and replace public key in the state creation above.

1. Sort the N compressed ECDSA public keys lexicographoically (by their 33-byte SEC1).
   > **Note:** ED25519 keys should work as well, but they are not recomended unless neccessary.
2. Construct a Hedera ThresholdKey protobuf message with your threshold value and that sorted list
3. Serialize that message using Protobuf’s deterministic option to get a reproducible byte array

The result of these steps will give you a fingerprint of the threshold key account that functions as the public key of this account. This fingerprint is consistently calculatable and gives the unquiness of a public key for the account that can be utilized effectively for determining the state of the account.

## Security Considerations

- An auditing of state and truthfulness should be done periodically inside any coordinating group of accounts that are sharing state to ensure all accounts in the group are conveying thir state correctly.

## Conclusion

HCS-17 provides a robust, transparent, and standardized methodology for calculating state hashes within decentralized AI clusters, enhancing reliability and facilitating scalable synchronization across Hedera-based AI ecosystems.

Message format of state change to topics:

```json
{
  "p": "hcs-23",
  "op": "state_hash",
  "state_hash": "<hex-string>",
  "topics": ["0.0.topic1", "0.0.topic2"],
  "account_id": "0.0.123456",
  "m": "Change of state synchronization."
}
```

Message format of state change to topics:

```json
{
  "p": "hcs-23",
  "op": "state_hash",
  "state_hash": "<hex-string>",
  "topics": ["0.0.topic1", "0.0.topic2"],
  "account_id": "0.0.123456",
  "m": "Change of state synchronization."
}
```
