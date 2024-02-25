# HCS-5 Standard: Tokenized HCS-1 Files, **Hashinals**

### Table of Contents


## Abstract

This specification provides a standard way to "inscribe" **Hashinals** utilizing the Hedera Consensus Service, Hedera Token Service, and HCS-1.

## Motivation

Token creators and downstream consumers would like for the whole of NFT metadata to be written directly to the HashGraph, as opposed to off-chain mediums like IPFS, Arweave, etc. Metadata stored in this manner would reduce coupling to those off-chain stores, and should improve future compatibility with services like the Smart Contract Service, and Hedera Consensus Service. In this manner, the entirety of the NFT is truly "on-chain"

## Specification

**Hashinals** are created on the Hedera Token Service, but inscribed on the Hedera Consensus Service through the means of a guarded registry [HCS-2].

### Metadata
**Hashinals** are discovered through the `metadata` field on every new Serial Number minted onto tokens via the Hedera Token Service. The metadata field must use a valid HRL to reference the Topic ID in which an HCS-1 file is inscribed onto.

The format of the field is as follows:
`hcs://{hcsStandard}/{topicId}`

`hcsStandard` tells you which HCS standard to use when referencing the Topic ID. At this time, this will always be `1`
`topicId` is a valid Topic ID in which the data is written to

For example, a valid `metadata` field would be:
`hcs://1/0.0.3601682`

### Inscription Numbers
All Hashinals will receive an inscription number, starting from `1`. This number indicates the order in which the Hashinal was "inscribed". Inscription numbers are calculated by looking at the `consensus_timestamp` at the time of a TokenMintTransaction whose metadata follows the specification correctly.

#### Validation
Hashinals must:
 - Use a valid [HCS-1](hcs-1.md) file. Tokens minted with invalid HCS-1 files will be considered invalid and ignored.
 - Follow the format for metadata specified in [Metadata](#metadata)