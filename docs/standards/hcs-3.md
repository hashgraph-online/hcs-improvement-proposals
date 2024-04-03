# HCS-3 Standard: Recursion and Cross-Chain References with Hedera Consensus Service **

### Status: Published

### Table of Contents

- [Status: Published](#status-published)
- [Table of Contents](#table-of-contents)
- [Authors](#authors)
- [Abstract](#abstract)
- [Motivation](#motivation)
- [Specification](#specification)
  - [Protocol Overview](#protocol-overview)
  - [Recursion in HCS](#recursion-in-hcs)
  - [Cross-Chain Recursion](#cross-chain-recursion)
  - [Implementation Guidelines](#implementation-guidelines)
  - [Security Considerations](#security-considerations)
  - [Future Work](#future-work)
  - [Conclusion](#conclusion)

## Primary Author
- Patches [https://twitter.com/TMCC_Patches]()

## Secondary Authors
- Kantorcodes [https://twitter.com/kantorcodes]()

## Abstract
This document introduces HCS-3, a protocol extension for the Hedera Consensus Service, enabling recursive referencing of inscriptions and cross-chain data access. It expands Hedera's capabilities to interact with other blockchain platforms, facilitating a more interconnected and versatile DLT ecosystem.

## Motivation
The aim of HCS-3 is to leverage Hedera's high-throughput, low-latency consensus mechanism for broader blockchain interoperability. This includes enabling complex data structures and references to cross-chain assets and data on traditional blockchains like Bitcoin. The protocol seeks to foster a new level of integration for decentralized applications.

## Specification
### Protocol Overview
HCS-3 extends the existing `hcs://{protocol number}/{topic_id}` URL structure for referencing within and across blockchain networks, supporting complex data structures and cross-chain interactions.

## Recursion in HCS
Describes how inscriptions within the Hedera network can reference other inscriptions, including the technical syntax and formatting guidelines necessary for creating these references.

### Syntax and Format
The specific syntax for creating recursive references within HCS includes using the structure `hcs://{protocol number}/{topic id}`. This system includes built-in error checking and resolution mechanisms to ensure the integrity of references.

### Examples
Examples of recursive referencing within HCS highlight the practical applications of this feature. For instance, referencing another inscription within the network could be formatted as `hcs://1/0.0.1234567`.

## Cross-Chain Recursion
Explores the techniques and protocols for referencing data on other blockchain platforms, ensuring interoperability through various addressing schemes.

### Mechanisms for Referencing Off-Chain Files
Outlines the methods used to reference data across different blockchain platforms, enhancing the Hedera network's interoperability with other chains.

### Supported Chains and Protocols
- **Hashinals (Hedera):** Using `hcs://{protocol number}/{topic id}`, e.g., `hcs://2/0.0.1234567`.
- **Ordinals (Bitcoin):** Using `ord://{inscription id}`, e.g., `ord://2dadf42c853ecd21347bd84a921703cdece93d0a579be16bceb382e14a7d304bi0`.

### CDN Formats
For accessing referenced data, the following CDN formats are used:
- Ordinals.com provides previews of Bitcoin Ordinals inscriptions, accessible via URLs like `https://ordinals.com/preview/{inscription id}`, e.g., `https://ordinals.com/preview/779b53221183cdee5168671b696cf99f60b6be0ce596777ec5f066bf9be44fbfi0`.


### Implementation Guidelines
Defines how to retrieve and digest data from files stored in valid hcs-1 format, focusing on handling references to other chain inscriptions.
- **Procedure**: When processing data from hcs-1 files, search for “src”, “href”, “link” tags for references to other networks, and utilize CDNs for accessing the necessary files and data.
- **CDN Format Examples**: For accessing Ordinals data, use `https://ordinals.com/preview/{inscription id}`.

## Future Work
The roadmap for HCS-3 includes adding support for more chains through community PRs, with planned updates for Ethereum (Ethscriptions) and Dogecoin (Doginals) references.

### Conclusion
HCS-3 will bring dynamic loading of applications being inscribed onto the hashgraph. The ability to standardize references to data in hashscriptions allow an interweiving of hcs-1 files stored on hedera and files stored on chain on bitcoin to create seamless expereinces of on chain data.