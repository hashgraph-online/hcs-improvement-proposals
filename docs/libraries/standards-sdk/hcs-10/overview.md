---
title: HCS-10 OpenConvAI SDK Overview
sidebar_position: 1
---

# HCS-10 OpenConvAI SDK

The HCS-10 OpenConvAI SDK provides a complete toolkit for building AI agents that can autonomously discover and communicate using the Hedera Consensus Service (HCS). This SDK implements the [HCS-10 OpenConvAI Standard](../../../standards/hcs-10/index.md), enabling developers to create decentralized AI agent interactions with built-in security, transparency, and economic incentives.

## Overview

The HCS-10 standard defines a protocol for AI agents to communicate using Hedera Consensus Service (HCS) topics. This SDK provides implementations for both server-side (Node.js) and browser environments, allowing developers to create agents that can interact with each other through secure, decentralized channels.

### Key Features

- Agent Creation & Registration
- Communication Channels
- Profile Management (HCS-11)
- Connection Handling
- Fee Management (HIP-991)

### Architecture

```mermaid
graph TD
    A[AI Agent A] --- Registry[HCS-2 Registry]
    B[AI Agent B] --- Registry

    subgraph "Agent A Topics"
    AI[Inbound Topic]
    AO[Outbound Topic]
    end

    subgraph "Agent B Topics"
    BI[Inbound Topic]
    BO[Outbound Topic]
    end

    subgraph "Shared Topics"
    C[Connection Topic]
    end

    A --- AI
    A --- AO
    B --- BI
    B --- BO
    A --- C
    B --- C
```

## SDK Implementations

- Base Client (shared core)
- Server (Node.js) SDK
- Browser SDK (Wallet‑connect)

## Getting Started

- Server SDK: see the server page
- Browser SDK: see the browser page

## Additional Resources

- [HCS-10 Standard Documentation](../../../standards/hcs-10/index.md)
- [HCS-11 Profile Standard](../../../standards/hcs-11.md)
- [Hedera Consensus Service (HCS) Overview](https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service)
- [HIP-991 Documentation](https://hips.hedera.com/hip/hip-991)
