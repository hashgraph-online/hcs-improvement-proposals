# HCS-20 Standard: Auditable Points Standard on Hedera

- [HCS-20 Standard: Auditable Points Standard on Hedera](#hcs-20-standard-auditable-points-standard-on-hedera)
  - [Solving the Auditable Points Challenge](#solving-the-auditable-points-challenge)
  - [The Role of Hedera](#the-role-of-hedera)
    - [Hedera's Main Features:](#hederas-main-features)
  - [Harnessing HCS-20 with the Turtle Moon HCS App](#harnessing-hcs-20-with-the-turtle-moon-hcs-app)
  - [Two Operational Modes](#two-operational-modes)
    - [Main public topic Id for inscriptions:](#main-public-topic-id-for-inscriptions)
  - [Operations and State Calculation](#operations-and-state-calculation)
    - [Key Operations](#key-operations)
    - [Validity of Transactions](#validity-of-transactions)
  - [Conclusion](#conclusion)

**HCS-20** is a new proposed standard (created by @TurtelMoonCC & @HGraphPunks) that defines how points can be managed and audited on the Hedera network. It is inspired by the BRC-20 protocol on Ordinals and has extended the functionality to auditable points in addition to introducing inscriptions on Hedera / Hashinals.

## Solving the Auditable Points Challenge

The HCS-20 standard emerges as a solution to a pressing problem in the web2 and web3 world: the need for a transparent, auditable, and versatile control system for points. Its primary benefits include:

- **Public Audit-ability**: Creates audit log for transparency in point transactions.
- **No LP or Value Expectation Issues**: Streamlines operations without liquidity, compliance, or value complications. Great for loyalty points, gaming points, etc.
- **Control Flexibility**: If in private mode, it offers the creator the power to oversee all point movements.

> **WARNING**
> THIS IS IN ALPHA
> The Indexer will be updated periodically and the way transactions are calculated may change as the standard matures.
> No points are intended to have any value.

## The Role of Hedera

Hedera stands out as a superb platform for documenting point movements due to its inherent benefits, such as high efficiency, robust security, cheap consistent costs, and a user-friendly ecosystem.

### Hedera's Main Features:

- ABFT Security
- 3.5 seconds to finality
- $0.0001 per inscription on HCS (pegged to USD)
- Low energy usage
- 10,000 tps

## Harnessing HCS-20 with the Turtle Moon HCS App

The Turtle Moon App simplifies the creation and management of HCS-20 points. Here's how you can leverage its features:

- **Download and Install**: Available for Mac, Windows, and Linux. [Install here](#).
- **Create and Interact**: Easily initiate a new topic, add wallet and topic ID details, and create JSON for HCS-20 points.
- **Submit and Read**: Deploy your points and track point balances through topic ID indexing.

This codebase is in ALPHA, meaning there are a lot of bugs that are still needing to be fixed and enhancements to be integrated. USE AT YOUR OWN RISK. This software is provided as is and Turtle Moon is not responsible for any issues using the software.

## Two Operational Modes

- **Private Mode with Submit Key**: This mode offers control over data posted to a topic, ideal for most use cases where authorized parties require exclusive write access.
- **Public Mode without Submit Key**: Allows open, public transactions, suitable for decentralized applications where transparency is key, and open mints are wanted.

### Main public topic Id for inscriptions:

- `0.0.4350190`

## Operations and State Calculation

HCS-20 standardizes operations like deploying, minting, burning, and transferring points. The state of these points is determined by aggregating these operations on the HCS topic IDs.

### Key Operations

- **Deploy Point Contract**: Initialize a new asset.
- **Mint Point**: Generate and assign new points.
- **Burn Point**: Remove points from circulation.
- **Transfer Point**: Facilitate point movement between accounts.

### Validity of Transactions

Transactions are valid based on several criteria, including the balance availability at the time of inscription and the consensus timestamp order. For public mode operations, the payer account ID must match the account from which points are removed.

## Conclusion

The HCS-20 standard, complemented by the Turtle Moon App, offers a robust framework for creating an auditable point systems on Hedera Consensus Service Topic IDs.