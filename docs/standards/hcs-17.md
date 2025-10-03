---
description: HCS-17 defines the methodology for calculating state hashes of accounts and decentralized formations on Hedera, ensuring consistent, auditable, and tamper-proof state verification for distributed AI networks.
sidebar_position: 17
---

# HCS-17 Standard: State Hash Calculation

## Status: **Draft**

## Version: **1.0**

---

## Table of Contents

1. [Authors](#authors)
2. [Abstract](#abstract)
3. [Motivation](#motivation)
4. [Terminology](#terminology)
5. [Specification](#specification)
   5.1. [State Hash Overview](#state-hash-overview)
   5.2. [Individual Account State Hash](#individual-account-state-hash)
   5.3. [Composite State Hash (Floras & Blooms)](#composite-state-hash-floras--blooms)
   5.4. [Threshold Key Fingerprint Calculation](#threshold-key-fingerprint-calculation)
   5.5. [Topic Memo Format](#topic-memo-format)
   5.6. [Message Protocol](#message-protocol)
6. [Implementation Workflow](#implementation-workflow)
7. [Integration with Existing Standards](#integration-with-existing-standards)
8. [Security Considerations](#security-considerations)
9. [References](#references)
10. [Change Log](#change-log)

---

## Authors

- **Patches** https://x.com/tmcc_patches

---

## Abstract

**HCS-17** defines a standardized methodology for calculating cryptographic state hashes of Hiero accounts and multi-party formations ([HCS-16](/docs/standards/hcs-16) Floras). State hashes provide a tamper-evident, deterministic fingerprint of an account's current state by aggregating:

- HCS topic running hashes
- Account public keys
- Composite member states (for Floras/Blooms)

### Key Features

1. **Deterministic Calculation** – Same inputs always produce the same hash
2. **Quantum-Resistant** – Uses SHA-384 for future-proof security
3. **Recursive Composition** – Floras aggregate Petal states, Blooms aggregate Flora states
4. **Efficient Verification** – O(log N) recalculation when single member changes state

### What This Standard Defines

- State hash calculation methodology for individual accounts
- Composite state hash algorithm for Floras and Blooms
- Threshold key fingerprint generation for multisig accounts
- Topic memo format and message protocol for state publications
- Integration patterns with HCS-15, HCS-16, and other standards

---

## Motivation

### The Challenge

Decentralized formations of AI agents, autonomous accounts, and multi-party coordination require **verifiable state synchronization**:

- **Trust Verification** – Members need to verify others are reporting accurate state
- **Rapid Reconciliation** – Detecting state divergence quickly prevents coordination failures
- **Audit Trails** – Tamper-evident state history enables forensic analysis
- **Scalability** – Efficient state aggregation supports large formations (100+ members)

**Current Limitations**:
- No standardized method for calculating account state across Hiero ecosystem
- Ad-hoc state verification approaches lack interoperability
- Difficult to audit state changes across complex multi-party structures

### The HCS-17 Solution

HCS-17 solves these challenges through:

#### 1. Standardized State Calculation
Defines explicit algorithm for aggregating:
- HCS topic running hashes (tamper-proof consensus state)
- Account public keys (identity binding)
- Member account states (hierarchical composition)

#### 2. Quantum-Resistant Cryptography
Uses SHA-384 instead of SHA-256 for enhanced security against future quantum attacks.

#### 3. Hierarchical Composition
Enables efficient state aggregation across multi-level structures:
- **Petals** (individual accounts) compute base state
- **Floras** (multi-party groups) aggregate Petal states
- **Blooms** (federations) aggregate Flora states
- **Meadows** (future) aggregate Bloom states

#### 4. Efficient Verification
O(log N) recalculation time when single member changes state enables:
- Real-time state monitoring for large formations
- Minimal computational overhead
- Rapid detection of state divergence

---

## Terminology

| Term                        | Definition                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| **State Hash**              | Cryptographic fingerprint representing the complete state of an account at a specific point in time     |
| **Running Hash**            | Hiero's built-in topic hash that updates with each message, providing tamper-evident message history    |
| **Composite State Hash**    | State hash for multi-party accounts (Floras/Blooms) that aggregates member states                      |
| **Threshold Key Fingerprint** | Deterministic hash of a multisig key structure used as "public key" for composite accounts            |
| **Petal**                   | Individual [HCS-15](/docs/standards/hcs-15) account that can participate in Floras                     |
| **Flora**                   | Multi-party [HCS-16](/docs/standards/hcs-16) account controlled by threshold key of Petal members      |
| **Bloom**                   | Federation of Floras (future standard)                                                                  |
| **Meadow**                  | Network of Blooms (future standard)                                                                     |
| **State Topic**             | HCS topic dedicated to publishing state hash updates                                                    |
| **Epoch**                   | Monotonically increasing counter marking state transitions                                              |

---

## Specification

### State Hash Overview

HCS-17 defines a **deterministic cryptographic procedure** for computing a single hash value that represents the complete state of a Hiero account. This hash aggregates:

1. **Topic State** – Latest running hash from relevant HCS topics
2. **Identity** – Account ID and public key
3. **Member State** (Floras/Blooms) – State hashes of child accounts

**Core Principle**: Any two implementations observing the same on-chain data **MUST** compute identical state hashes.

**Hash Function**: SHA-384 (48 bytes output) for quantum resistance

---

### Individual Account State Hash

For individual accounts (Petals), the state hash aggregates the account's monitored HCS topics and identity.

#### Algorithm

**Step 1: Gather Topic Data**

Retrieve the latest running hash from each relevant HCS topic the account:
- Participates in (e.g., HCS-10 communication topics)
- Monitors (e.g., registry topics)
- Created (e.g., profile topics, outbound action logs)

**Step 2: Sort Topics**

Sort topic IDs numerically in **ascending order** (e.g., `0.0.123`, `0.0.456`, `0.0.789`)

**Step 3: Construct Concatenation String**

Build string with format:
```
topicId1_runningHash1|topicId2_runningHash2|...|accountId_publicKey
```

**Delimiters**:
- `_` (underscore) between topic ID and its running hash
- `|` (pipe) between each topic pair
- `|` (pipe) before account ID and public key

**Step 4: Apply SHA-384 Hash**

```
StateHash = SHA384(concatenatedString)
```

#### Formal Definition

```
StateHash = SHA384(
  topicId₁_runningHash₁|
  topicId₂_runningHash₂|
  ...|
  topicIdₙ_runningHashₙ|
  accountId_publicKey
)
```

Where:
- `topicId₁ < topicId₂ < ... < topicIdₙ` (numerically sorted)
- `runningHashᵢ` is the hex-encoded latest running hash for `topicIdᵢ`
- `publicKey` is the hex-encoded public key of the account

#### Example Calculation

**Given**:
- Topic ID: `0.0.12345` with running hash `abcd1234`
- Topic ID: `0.0.67890` with running hash `efgh5678`
- Account ID: `0.0.9988`
- Public Key: `FGHKLJHDGK`

**Step 1**: Sort topics → `0.0.12345`, `0.0.67890` (already sorted)

**Step 2**: Construct string:
```
0.0.12345_abcd1234|0.0.67890_efgh5678|0.0.9988_FGHKLJHDGK
```

**Step 3**: Apply SHA-384:
```javascript
StateHash = SHA384("0.0.12345_abcd1234|0.0.67890_efgh5678|0.0.9988_FGHKLJHDGK")
// Result: a3f5b8c2d1e7... (96 hex characters for 48 bytes)
```

#### When to Recalculate

You can choose to recalculate state hash when:
- ✅ Any monitored topic receives a new message (running hash changes) / or time interval 
- ✅ Account adds/removes topics from monitoring list
- ✅ Account updates its public key (rare, but possible via key rotation)
- ❌ **NOT** when account balance changes (balance is not included in state)
- ❌ **NOT** when off-chain state changes (only on-chain HCS state matters)

---

## Composite State Hash Calculation for Floras & Blooms

Floras and Blooms are composite Hedera accounts whose validity derives from the coordinated behaviour of a set of underlying member accounts (their Petals for Floras, and Floras/Petals for Blooms).

To provide a single, tamper‑evident view of the composite, HCS‑17 extends the base procedure so that a Flora or Bloom publishes a CompositeStateHash that is deterministically derived from:

- **Member account state**: The latest StateHash of every direct child account (Petal, Flora, etc).
- **Composite interaction topics**: The latest running hash of every HCS topic that was created by or for the composite (e.g., escrow, governance, and inter‑composite communication topics defined in HCS‑16).
- **Composite public‑key fingerprint**:: The deterministic fingerprint of the composite’s threshold key

The procedure MUST be applied recursively: a Bloom aggregates the CompositeStateHash values of the Floras it contains; a Flora aggregates the StateHash values of its Petals.

<!-- **TODO** Determine if smart contract addresses that were deployed by the account or composite should be includeded in the same manner as topic ids. -->

## Algorithm

1. Collect child hashes (utilize the state topic in Floras / Blooms for latest state postings)
   Retrieve StateHash_i for every direct child account accountId_i.
2. Collect composite topic hashes
   Retrieve the latest running hash runningHash_j for every topic topicId_j where the composite is adminKey / submitKey / where the programs state is important.
3. Sort & concatenate:

- Sort child accountId values lexicographically and concatenate accountId _ StateHash for each.
- Sort topicId lexicographically and concatenate topicId _ runningHash for each.
- Append the composite public‑key fingerprint from the threshold‑key procedure.

4. Hash in SHA384

```
CompositeStateHash =
    SHA384( Σ_sorted( accountId_StateHash) |
            Σ_sorted( topicId_runningHash_j ) |
            composite_publicKeyFingerprint )
```

Example (Flora with 2 Petals)

- Petal A – accountId 0.0.111 → StateHash 0xaaa
- Petal B – accountId 0.0.222 → StateHash 0xbbb
- Flora’s transaction topic – topicId 0.0.333 → runningHash 0xccc
- Flora’s communication topic – topicId 0.0.444 → runningHash 0xddd
- Flora account id – 0.0.777
- Flora public‑key fingerprint – 0xffff

Concatenate (IDs sorted):

```
0.0.111_0xaaa|0.0.222_0xbbb|0.0.333_0xccc|0.0.444_0xddd|0.0.777_0xffff
```

Apply SHA‑384:

```
CompositeStateHash = SHA384("0.0.111_0xaaa|0.0.222_0xbbb|0.0.333_0xccc|0.0.444_0xddd|0.0.777_0xffff")
```

Implementation Notes

- **Frequency** – Re‑compute after detecting any child StateHash or composite topic runningHash update, or at the synchronization interval specified by HCS‑16.
- **Bridging layers** – Applications SHOULD store the most recent CompositeStateHash in a HCS-2 topic with indexed:false. The newest hash state of the composite account will always be the latest message. The Flora / Bloom, can add the topic id for this state in it's metadata so other agents can verify composite integrity offline.
- **Versioning** – Future extensions (e.g., Meadow‑level aggregation) MUST follow the same recursive pattern, guaranteeing O(log N) recalculation time when a single leaf changes.

Implementation Workflow

1. Identify all relevant topics.
2. Regularly fetch the latest running hash for each topic.
3. Append the current public key of the account
4. Compute and broadcast the state hash periodically according to HCS-16’s synchronization interval.


## Deterministic, application-level public key for Keylist + Threshold Keys (Floras, Blooms, etc)

When calculating state for a Flora, Bloom, or any account that is comprised of a threshold of other keys for a valid signature, this method of public key fingerprint calculation should be utilized and replace public key in the state creation above.

1. Sort the N compressed ECDSA public keys lexicographoically (by their 33-byte SEC1).
   > **Note:** ED25519 keys should work as well, but they are not recomended unless neccessary.
2. Construct a Hedera ThresholdKey protobuf message with your threshold value and that sorted list
3. Serialize that message using Protobuf’s deterministic option to get a reproducible byte array

The result of these steps will give you a fingerprint of the threshold key account that functions as the public key of this account. This fingerprint is consistently calculatable and gives the unquiness of a public key for the account that can be utilized effectively for determining the state of the account.

## Security Considerations

- An auditing of state and truthfulness should be done periodically inside any coordinating group of accounts that are sharing state to ensure all accounts in the group are conveying their state correctly.

## Conclusion

HCS-17 provides a robust, transparent, and standardized methodology for calculating state hashes within decentralized AppNet clusters, enhancing reliability and facilitating scalable synchronization across Hedera-based AI ecosystems.

Topic memo format (numeric, no strings):

- HCS-17 topics MUST encode memo as `hcs-17:<type>:<ttl>`
- `<type>` is a numeric enum; currently defined values:
  - `0` → State Hash Topic (non-indexed)
- `<ttl>` is the time-to-live in seconds for retention guidance (e.g., `86400`)

Examples:

- `hcs-17:0:86400` → State hash topic with 24h TTL

Message format of state change to topics:

```json
{
  "p": "hcs-17",
  "op": "state_hash",
  "state_hash": "<hex-string>",
  "topics": ["0.0.topic1", "0.0.topic2"],
  "account_id": "0.0.123456",
  "m": "Change of state synchronization."
}
```

## References

- [HCS‑15](/docs/standards/hcs-11): Profile standard with inbound topics for post-discovery communication
- [HCS‑16](/docs/standards/hcs-16): Formation and governance of Floras
