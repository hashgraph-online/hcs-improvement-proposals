FOR IMMEDIATE RELEASE

Hashgraph Online Announces HCS-14: Universal Agent IDs for Web2 and Web3

San Francisco, CA, September 9, 2025: Hashgraph Online today announced HCS-14, the Universal Agent Identifier (UAID). HCS-14 gives AI agents a single, portable identity that works consistently across web2 APIs, web3 networks, and hybrid systems. It preserves self-sovereign identity where it exists and provides deterministic IDs where it does not, enabling reliable discovery, routing, and interoperability across protocols.

"Identity fragmentation has been the biggest barrier to cross-protocol agent ecosystems," said Michael Kantor, President of Hashgraph Online. "HCS-14 delivers a simple, durable way to identify agents everywhere, from REST and gRPC to Hedera and EVM, without compromising sovereignty or operational practicality. It is the missing layer for a truly interoperable agent economy."

Draft status and community review

HCS-14 is published as a Draft and is open for public feedback. Join the discussion at https://github.com/hashgraph-online/hcs-improvement-proposals/discussions/135.

What HCS-14 is

HCS-14 is a universal way to identify AI agents across networks and protocols. It works in two complementary ways:
- Creates a deterministic identifier for agents that do not yet have a decentralized identifier (DID).
- Wraps existing DIDs with a small set of routing details so agents can be reliably found across protocols.

Why it matters

- One identity that works across web2 and web3
- Stable and deterministic; endpoint changes do not break IDs
- Works with existing DIDs; no changes needed to sovereign identities
- Built-in routing across protocols for reliable discovery
- Aligned with established standards including W3C Decentralized Identifiers (DID) and CAIP-10 for chain-qualified account identifiers
- Privacy by design; excludes mutable endpoints and purpose semantics from the identifier

Who it is for

- Developers building agents that must work across multiple protocols
- Teams standardizing identity and routing for fleets of agents
- Enterprises seeking vendor-neutral interoperability
- Open-source communities converging on shared primitives for agent discovery

Where it works

HCS-14 supports agents across Hedera HCS-10, Google Agent-to-Agent (A2A), Anthropic Model Context Protocol (MCP), NANDA, ACP Virtuals and IBM ACP, OLAS/Autonolas discovery, and common transports such as REST, gRPC, WebSocket, and MQTT. Hedera DID issuance and resolution are integrated via Hiero.

Common use cases

- Customer support and IT assistants that span internal systems and external APIs
- Agent marketplaces and registries that need portable, conflict-free identifiers
- Enterprise agent fleets operating across cloud, on-prem, and blockchain networks
- Multi-agent coordination with clear, stable identities and routing

Standards alignment

HCS-14 builds on W3C DID principles and uses chain-qualified native account identifiers (CAIP-10) where applicable. It provides a clear path for compatibility with EVM agent registries and Trust over IP profiles (informative) while keeping identifiers simple and durable.

Status and availability

- Status: Draft (open for community feedback)
- Specification (Draft): https://github.com/hashgraph-online/hcs-improvement-proposals/blob/main/docs/standards/hcs-14.md
- Standards SDK (reference implementation and docs): https://hol.org/docs/libraries/standards-sdk/
- Discussion and feedback: https://github.com/hashgraph-online/hcs-improvement-proposals/discussions/135

Developers can begin using HCS-14 today in Node and browser environments. Deterministic IDs are generated locally without network calls. When wrapping existing DIDs, the SDK integrates with Hedera via Hiero when needed.

About Hashgraph Online

Hashgraph Online is a consortium focused on building the autonomous, on-graph internet with Hashgraph Consensus Standards (HCS) on the Hedera network. We collaborate across companies, open source maintainers, and product teams to create interoperable protocols, robust SDKs, and production-grade tools. Learn more at https://hol.org.

Media contact: help@hol.org
