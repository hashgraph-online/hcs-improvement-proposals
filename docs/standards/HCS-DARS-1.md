---
hcs: <to be assigned>
title: Decentralized Activity Reputation Standard (DARS)
author: CZ SHIHAB 
status: Draft
type: Standards Track
category: Core
created: 2026-02-23
requires: HCS-4
---

## Abstract

This specification defines a standardized method for recording, verifying, and querying user activity reputation events using Hedera Consensus Service (HCS). The standard enables decentralized applications to publish verifiable activity proofs that can be consumed across ecosystems without reliance on centralized scoring systems.

## Motivation

Many ecosystems rely on centralized reputation scoring mechanisms. These systems lack transparency, interoperability, and verifiability.

There is currently no standardized way to:
- Record cross-platform user activity
- Publish verifiable participation proofs
- Build interoperable reputation layers

This specification introduces a structured, topic-based message schema for decentralized reputation events.

## Specification

### 1. Overview

Applications implementing this standard MUST publish activity events to a dedicated HCS topic.

Each message MUST follow the JSON schema defined below.

### 2. Message Schema

All DARS messages MUST be UTF-8 encoded JSON objects.

Required fields:
{ "standard": "HCS-DARS-1", "version": "1.0.0", "event_id": "string (UUID)", "timestamp": "ISO-8601 string", "account_id": "string (Hedera Account ID)", "activity_type": "string", "activity_weight": "integer", "metadata": { "source": "string", "reference_id": "string", "signature": "string (optional)" } }### 3. Field Requirements

- `standard` MUST equal "HCS-DARS-1"
- `version` MUST follow semantic versioning
- `event_id` MUST be globally unique
- `timestamp` MUST reflect client submission time
- `account_id` MUST be a valid Hedera account
- `activity_weight` MUST be a non-negative integer

### 4. Topic Requirements

- Each implementation MUST use a dedicated HCS topic
- Topic memo SHOULD include "DARS"
- Applications MAY create multiple topics for segmentation

### 5. Reputation Aggregation

Reputation Score calculation:Implementations MAY apply decay functions.

### 6. Security Considerations

- Messages SHOULD include digital signatures
- Consumers MUST verify message integrity
- Replay attacks SHOULD be mitigated using unique `event_id`

### 7. Backwards Compatibility

Future versions MUST increment semantic versioning.
Breaking changes MUST update the `standard` identifier.

## Governance

This standard becomes active upon governance approval and merge.
