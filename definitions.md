### Definitions

A formal set of definitions used within the HashGraph Consensus Standards Improvement proposals. These are **NOT** standards and should be used for reference only.

#### Spheres
 - Spheres are the HCS equivalent of DNS. Every Sphere is a Topic ID which includes the current records.
 - Messages written to a Sphere are NOT valid unless the payer_account_id owns the matching .ℏ domain from [https://kabuto.sh](https://kabuto.sh)

#### Resource (Conceptual Addresses)
 - A resource is any piece of data on Hedera that is referenced by an entity id on Hedera / Hashgraphs. Valid entities are Topic IDs.


 #### Hashgraph Resource Locator
 The protocol for finding data inscribed on the Hedera Consensus Service, following the Hashgraph Consensus Standards.
 - an HRL locates a resource. The format for an HRL is as follows. A formal future hip will cover all cases for HRLs.
 - `hcs://{protocol_standard}/{resource_id}`
   - `protocol_number` should always be a valid HCS standard, eg `1`
   - `resource_id` should always be a valid [Resource](#resource-conceptual-addresses)
 - A valid example of an HRL is: `hcs://1/0.0.123456`

#### Public Registries
Topic Ids which are managed by the community for the convenience of the ecosystem. These topics are public and not managed by a specific entity. Proceed with caution when consuming data inscribed on these topics.

#### Guarded Registries
Topic Ids which are managed by the HCS Council for the convenience of the ecosystem. These topics should be private topics to ensure proper validation of messages. [HCS](hcs-2.md) will cover this idea in detail.

#### Hashnet
A fully rendered decentralized application, composed of valid HTML Markup, JavaScript, and CSS which is inscribed following HCS standards.

#### HashGraph Package Management (HPM)
   - A registry of pointers to various scripts that clients can download to create Hashnets.
   - The registry will be browsable on hpm.h
   - HPMs can be installed through inscriptions reference to develop Hashnets eg ```<script src=”hpm.h/date-fns” />```
