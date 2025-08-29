---
slug: hcs-19-ai-agent-privacy-compliance
title: "HCS-19: A New Privacy Standard for AI Agents"
authors: [michelle-baez]
tags: [standards, privacy, ai, compliance, hcs-19, privacycheq]
date: 2025-08-29
---

## TL;DR

Hashgraph Online has published a draft standard called HCS-19: AI Agent Privacy Compliance, designed to help AI agents prove they handle user data responsibly. The standard defines how to log consent, privacy notices, data processing, rights requests, and audits on Hedera Consensus Service (HCS), making compliance transparent, verifiable, and interoperable.

Leading the effort is PrivacyCheq's aiCheq, an API that allows AI agents to collect, manage, and record consent in real time, supported by Hedera-based auditing. Together, HCS-19 and aiCheq establish the foundation for trustworthy, privacy-aware AI.

<!--truncate-->

## Why Privacy Matters for AI Agents

AI agents are rapidly becoming part of our daily lives, helping us make decisions, automate workflows, and interact with data. With this comes a major challenge: privacy.

Users want to know:
- What data is being collected
- Why it is being used
- Who has access to it
- How they can revoke consent

HCS-19 addresses these concerns by providing a transparent, auditable framework for managing privacy and compliance in agent-driven interactions.

## What Is HCS-19?

HCS-19 is a draft Hashgraph Online standard for AI Agent Privacy Compliance. It is designed to bring clarity, accountability, and interoperability to consent and data-handling practices.

### Key Features

#### 1. Consent and Privacy Logging

HCS-19 defines four dedicated HCS topics for tracking:
- **Consent Management**
- **Data-Processing Registry**
- **Privacy-Rights Registry**
- **Compliance Audit Logs**

Every interaction, from when a user grants consent to when their data is processed, can be securely recorded on Hedera for verification.

#### 2. ISO-Aligned and Legally Grounded

The standard aligns with ISO/IEC TS 27560:2023, which governs consent record portability. It also supports global regulations like GDPR and CCPA, making compliance simpler across jurisdictions.

#### 3. Discoverable and Interoperable

By integrating with HCS-11 profiles, agents can publish compliance metadata and topic IDs, allowing users, partners, and regulators to confirm an agent's privacy practices easily.

#### 4. Auditable from Day One

HCS-19 standardizes events like `consent_granted`, `processing_started`, `rights_request`, and `audit_completed`. This ensures you can prove exactly what happened and when, strengthening trust and enabling regulatory readiness.

## Spotlight on PrivacyCheq's aiCheq

Alongside the HCS-19 draft, PrivacyCheq has developed aiCheq, a powerful API designed to help AI agents manage real-time privacy consent.

### What aiCheq Does
- **Context-aware consent** that requests permissions only when needed, explained in plain language
- **Dynamic policy explanations** that help users understand what is happening before they agree
- **Automatic preference updates** so users can revoke or modify consent at any time
- **Hedera-backed auditing** where every consent decision is hashed and recorded on-chain for verification

aiCheq comes with a REST API, TypeScript SDK, and Agent Kit, making it simple for developers to integrate privacy-first practices into their AI systems.

## How aiCheq and HCS-19 Work Together

| Capability | HCS-19 Provides | aiCheq Implements |
|------------|-----------------|-------------------|
| Consent Management | Standardized JSON schemas and topic IDs | Real-time consent requests and hashing |
| Processing Records | `processing_started` and `processing_completed` logging | Auto-generated processing events |
| Privacy Rights | `rights_request` and `rights_fulfilled` operations | Interfaces for exercising user rights |
| Auditing | `audit_initiated` and `audit_completed` logs | On-chain verifiable audit trails |
| Discoverability | Integration with HCS-11 profiles | Automatic publishing of compliance metadata |

By combining aiCheq's real-time capabilities with HCS-19's structured framework, developers can achieve end-to-end compliance more easily and reliably.

## How to Get Started

1. **Read the HCS-19 Draft** → [View the Standard](/docs/standards/hcs-19)
2. **Explore aiCheq** → [PrivacyCheq's aiCheq Overview](https://www.privacycheq.com/solutions/ai-agent)
3. **Integrate consent flows** into your AI agents using aiCheq's SDKs
4. **Use Hedera Consensus Service** to log, verify, and audit compliance events

## Final Thoughts

AI agents are becoming essential tools, but user trust depends on how responsibly they handle personal data. HCS-19 and aiCheq offer a forward-looking solution for building transparent, verifiable privacy compliance into AI systems.

Hashgraph Online is proud to support this work and invites developers, enterprises, and regulators to review the draft, provide feedback, and begin testing implementations. Developers can explore our [Standards SDK](/docs/libraries/standards-sdk/) to get started with implementing HCS-11 and other Hashgraph Online standards. HCS-19 implementation will be coming to the SDK soon.