---
slug: august-monthly-recap
title: "August Recap: Desktop Preview & New Standards"
authors: [michelle-baez]
tags: [updates, monthly-recap, hol-desktop, hcs-19, hcs-14, agent-id]
date: 2025-09-01
---

## TL;DR

August was a big month for Hashgraph Online.
1. We launched the [Developer Preview of HOL Desktop](#1-hol-desktop-developer-preview-is-live), giving builders a first look at our agent-based desktop environment.
2. We released the draft of [HCS-19, a new standard for AI Agent Privacy Compliance](#2-hcs-19-draft-ai-agent-privacy-compliance).
3. We announced [HCS-14, an upcoming Agent ID Standard](#3-hcs-14-agent-id-standard-coming-soon) that enables globally verifiable agent identities using the W3C DID framework.

<!--truncate-->

## 1. HOL Desktop Developer Preview Is Live

The biggest news this month is the release of the Developer Preview of HOL Desktop.

HOL Desktop is an agent-based desktop environment designed to simplify how developers and builders interact with the Hashgraph ecosystem. The preview allows you to:
- **Create, deploy, and manage AI agents**
- **Experiment with interoperability** across emerging standards like HCS-11, HCS-14, and HCS-19
- **Test early workflows** for identity, messaging, and compliance

This initial release is intended as a sandbox for developers to explore and provide feedback. It sets the foundation for a future where agent-to-agent and agent-to-user interactions are secure, auditable, and discoverable.

## 2. HCS-19 Draft: AI Agent Privacy Compliance

We also released the draft of HCS-19, a proposed standard for AI Agent Privacy Compliance using the Hedera Consensus Service (HCS).

HCS-19 defines how AI agents can log consent, privacy notices, data processing events, rights requests, and audits on-chain, enabling verifiable, transparent privacy compliance.

### Highlights of HCS-19:
- **Defines four dedicated HCS topics**: Consent Management, Data-Processing Registry, Privacy-Rights Registry, and Compliance Audit Logs
- **Aligns with ISO/IEC TS 27560:2023** for consent portability
- **Integrates with HCS-11 profiles** for discoverable compliance metadata
- **Supports legal frameworks** including GDPR and CCPA

Read the full draft here: [HCS-19 Standard](/docs/standards/hcs-19)

## 3. HCS-14: Agent ID Standard Coming Soon

One of the most anticipated developments is HCS-14, the Agent ID Standard that introduces a framework for creating verifiable, interoperable agent identities using the W3C DID (Decentralized Identifier) model.

HCS-14 provides two supported identifier types:

### AID Method (did:aid:) - For System-Generated IDs

Best suited for agents without existing DIDs or in systems where discovery and indexing require standardized identifiers.
- Ideal for early-stage agents and cross-system discovery
- Compatible with legacy systems that do not support DIDs
- The default method for most current AI agents

### UDID Method (did:udid:) - For Self-Sovereign Agents

Designed for agents that already have a W3C DID and require full control over their identity.
- Enables agents to generate their own IDs and maintain autonomy
- Ideal for advanced cross-protocol and cross-chain agent interactions
- Supports decentralized ecosystems and future-proofs identity management

### Examples from the HCS-14 Draft

HCS-14 provides detailed JSON examples for registering agents across different ecosystems, including:
- Microsoft Customer Support Assistants
- MCP servers
- Virtuals Protocol commerce bots
- OLAS prediction services
- Fully self-sovereign AI assistants

This standard is designed to ensure agents can be identified, trusted, and verified globally across applications, protocols, and networks.

Read the full proposal here: [HCS-14 Standard](/docs/standards/hcs-14)

## Looking Ahead

With the launch of the HOL Desktop Developer Preview, the release of the HCS-19 draft, and the upcoming HCS-14 Agent ID Standard, August has been a transformative month for Hashgraph Online.

We are building the foundation for a trust-first agent ecosystem where interoperability, privacy, and verifiable identity work together seamlessly. September will bring deeper integration of these standards, more HOL Desktop updates, and opportunities for developers to get hands-on with the next generation of open agents.