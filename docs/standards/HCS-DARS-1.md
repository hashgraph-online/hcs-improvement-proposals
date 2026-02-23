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
