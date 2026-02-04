---
slug: hcs-14-profiles-and-agent-aid-resolution
title: "HCS-14 Profiles and .agent's AID Resolution"
description: "Toward a modular framework for agent identity and discovery using HCS-14 Universal Agent IDs, profiles, and the AID Resolution standard for Web and DNS."
authors: [kantorcodes]
tags: [hcs-14, agents, identity, discovery, aid, dns, standards]
image: https://hol.org/img/logo.png
keywords: [HCS-14, Universal Agent ID, UAID, Agent Identity, AID Resolution, DNS Discovery, Agent Community]
---

# Toward a Modular Framework for Agent Identity and Discovery

## The Agent Community and the AID Standard

The Agent Community is an open standards initiative focused on defining shared infrastructure for agent identity, discovery, and interoperability.

At the center of its work is the **Agent Identity & Discovery (AID) standard**, a simple, open mechanism that uses DNS to enable agents to be discovered and optionally verified.

This work intersects with the Hashgraph Online standards stack, where HCS-14 defines the **Universal Agent ID (UAID)**.

<!--truncate-->

## Introduction

HCS-14 defines a **Universal Agent ID (UAID)**: a deterministic, protocol-neutral identifier intended to represent agents across heterogeneous systems.

The latest update introduces **Profiles** and the **AID Resolution Profile for Web and DNS**.

## From Identity to Resolution: Why Profiles Were Introduced

Profiles are integration-specific mechanisms that define how discovery and verification are performed.

- Profiles are **optional**.
- Implementations may support **zero or more** profiles.
- Claiming support for a profile requires implementing its **normative requirements**.

## The AID Resolution Profile: Web and DNS Discovery

The AID Resolution Profile defines how deterministic UAIDs can be resolved to agent endpoints using DNS TXT records and web-based discovery.

Resolvers query a DNS TXT record at:

```
_agent.<nativeId>
```

The TXT record may include:

- Version identifier
- Protocol identifier
- Endpoint URI
- Optional cryptographic keys

## Architectural Evolution in HCS-14

The specification now includes a **Profiles section**, a **Profile Registry**, and a core resolver contract defining expected inputs and outputs.

## Developer Deep Dive: Resolution Mechanics in HCS-14

HCS-14 defines a canonical resolver function:

```typescript
resolveUAID(uaid: string, options?: ResolveOptions): Promise<ResolutionResult>
```

The `ResolutionResult` object may contain:

- `uaid`
- `document`
- `services`
- `verification`
- `profile`
- `errors`

## Conclusion

This update formalizes a modular philosophy for agent identity and discovery. By introducing profiles and the AID Resolution mechanism, HCS-14 enables agents to be discoverable across diverse systems while maintaining a clean separation between identity and resolution strategies.
