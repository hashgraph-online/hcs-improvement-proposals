---
description: A formal set of definitions used within the Hashgraph Consensus Standards Improvement proposals. These are NOT standards and should be used for reference only.
---

# Definitions

A formal set of definitions used within the Hashgraph Consensus Standards Improvement proposals. These are **NOT** standards and should be used for reference only.

#### Spheres

- Spheres are the HCS equivalent of DNS. Every Sphere is a Topic ID which includes the current records.
- Messages written to a Sphere are NOT valid unless the payer_account_id owns the matching .ℏ domain from [https://kabuto.sh](https://kabuto.sh)

#### Resource (Conceptual Addresses)

- A resource is any piece of data on Hedera that is referenced by an entity id on Hedera / Hashgraphs. Valid entities are Topic IDs.

#### Hashgraph Resource Locator

The protocol for finding data inscribed on the Hedera Consensus Service, following the Hashgraph Consensus Standards.

- an HRL locates a resource. The format for an HRL is as follows. A formal future HCS will cover all cases for HRLs.
- `hcs://{protocol_standard}/{resource_id}`
  - `protocol_number` should always be a valid HCS standard, eg `1`
  - `resource_id` should always be a valid [Resource](#resource-conceptual-addresses)
- A valid example of an HRL is: `hcs://1/0.0.123456`

#### Public Registries

Topic Ids which are managed by the community for the convenience of the ecosystem. These topics are public and not managed by a specific entity. Proceed with caution when consuming data inscribed on these topics.

#### Guarded Registries

Topic Ids which are managed by the Hashgraph Online Council for the convenience of the ecosystem. These topics should be private topics to ensure proper validation of messages. [HCS](./standards/hcs-2.md) will cover this idea in detail.

#### Hashsite

A fully rendered decentralized application, composed of valid HTML Markup, JavaScript, and CSS which is inscribed following HCS standards.

#### Hashgraph Package Management (HPM)

- A registry of pointers to various scripts that clients can download to create Hashsites.
- The registry will be browsable on hpm.h
- HPMs can be installed through inscriptions reference to develop Hashsites eg `<script src="hpm.h/date-fns" />`

#### Topic Memos

Topic memos are structured strings attached to Hedera Consensus Service (HCS) topics that define the topic's purpose, configuration, and behavior. They serve as metadata that applications can use to understand how to interact with the topic.

- **Standard Format**: `hcs-{standard_number}:{parameter1}:{parameter2}:...`

  - `standard_number`: The HCS standard that defines the topic's behavior (e.g., 2, 6, 10, 13)
  - Parameters vary by standard but follow consistent patterns

- **Common Parameters**:

  - **Indexed Flag**: Boolean value (0/1) indicating if all messages need to be processed (0) or only the latest message matters (1)

    - Example: `hcs-2:0:86400` (indexed) vs `hcs-6:non-indexed:86400` (non-indexed)

  - **TTL (Time-to-Live)**: Duration in seconds that clients should cache topic data

    - Example: `hcs-2:0:86400` (cache for 24 hours)

  - **References**: Some standards include references to other topics
    - Example: `hcs-13:0:86400:0.0.123456` (references schema topic 0.0.123456)

- **Standard-Specific Examples**:

  - **HCS-2 (Registry)**: `hcs-2:0:86400` (indexed registry with 24-hour cache)
  - **HCS-6 (Dynamic Hashinals)**: `hcs-6:non-indexed:86400` (non-indexed with 24-hour cache)
  - **HCS-10 (AI Agent Communication)**: `hcs-10:inbound:0.0.123456` (inbound topic for agent 0.0.123456)

- **Purpose**: Topic memos enable:
  - Self-documentation of topics
  - Automatic discovery of topic functionality
  - Consistent interpretation across different applications
  - Configuration of caching and processing behavior

Applications should validate topic memos against the relevant HCS standard before processing topic messages to ensure correct interpretation and handling.
