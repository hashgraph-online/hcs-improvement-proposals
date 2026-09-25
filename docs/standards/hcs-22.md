# HCS-22: On-Chain Event Subscription and Notification Routing

| Field | Value |
|-------|-------|
| **HCS Number** | 22 |
| **Title** | On-Chain Event Subscription and Notification Routing |
| **Author** | [Your Name] \<your@email.com\> |
| **Status** | Draft |
| **Type** | Standards Track |
| **Created** | 2026-03-12 |
| **Requires** | HCS-1, HCS-2, HCS-10, HCS-11 |
| **Version** | 1.0 |

---

## Abstract

This specification defines a standardized framework for on-chain event subscription and notification routing on the Hedera Consensus Service (HCS). HCS-22 enables applications, AI agents, and users to declaratively register interest in specific on-chain events and receive structured, verifiable notifications via HCS topics. This standard addresses the absence of a unified subscription/notification primitive in the HCS ecosystem, enabling push-based coordination patterns across appnets, agents, and wallets without reliance on centralized off-chain infrastructure.

---

## Motivation

The HCS ecosystem has matured significantly with standards covering file storage (HCS-1), topic registries (HCS-2), NFTs (HCS-5), AI agent communication (HCS-10), identity profiles (HCS-11), AppNet accounts (HCS-16), and more. However, a critical building block remains absent: a standard mechanism for entities to **subscribe to events** and **receive notifications** in a decentralized, on-chain manner.

Currently, builders who need event-driven workflows must either:
- Poll HCS topics continuously, which is inefficient and costly,
- Build bespoke off-chain notification pipelines that introduce centralization risk,
- Rely on mirror node webhooks that lack standardized message formats and verifiability.

Without a shared notification primitive, every project reinvents its own event routing layer. This leads to siloed appnets, incompatible notification schemas, and fragile off-chain dependencies.

### Use Cases

- A DeFi protocol notifies subscribers when a liquidation threshold is crossed, recorded on-chain for audit.
- An AI agent subscribes to another agent's outbound topic and receives structured alerts when new tasks are available.
- A DAO notifies members when a governance proposal enters Last Call via HCS-8/HCS-9.
- A wallet application receives real-time alerts when an account receives a token transfer.
- A Flora (HCS-16) notifies member Petals (HCS-15) of pending threshold transactions requiring signatures.

---

## Specification

### 1. Definitions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

| Term | Definition |
|------|-----------|
| **Subscription Topic** | An HCS topic created by a subscriber to receive notifications. |
| **Event Source** | An HCS topic, account, or token that the subscriber watches. |
| **Notification Broker** | An appnet participant that monitors event sources and emits notifications. |
| **Subscription Registry** | An HCS-2 topic that indexes active subscriptions. |
| **Event Filter** | A declarative JSON object describing conditions that trigger a notification. |
| **Notification Envelope** | The standardized JSON message written to a Subscription Topic upon event match. |

---

### 2. Topic Structure

#### 2.1 Subscription Registry Topic

A Subscription Registry is an HCS-2 topic that indexes subscriptions. Its topic memo MUST conform to:

```
hcs-22:registry:v1
```

The Subscription Registry stores `subscribe`, `unsubscribe`, and `update` operations.

#### 2.2 Subscription Topic

Each subscriber creates a dedicated HCS topic to receive notifications. The topic memo MUST conform to:

```
hcs-22:sub:{subscriber_account_id}:v1
```

The subscriber SHOULD set an appropriate submit key to control who may write notifications to this topic.

---

### 3. Operations

All operations are JSON messages submitted to the relevant HCS topic. Every message MUST include the following base fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `p` | string | REQUIRED | Protocol identifier. MUST be `"hcs-22"`. |
| `op` | string | REQUIRED | Operation type. One of: `subscribe`, `unsubscribe`, `update`, `notify`. |
| `m` | string | OPTIONAL | Human-readable memo. Maximum 500 characters. |

---

#### 3.1 `subscribe` Operation

Submitted to the **Subscription Registry Topic** by the subscriber.

```json
{
  "p": "hcs-22",
  "op": "subscribe",
  "subscriber_id": "0.0.123456",
  "subscription_topic_id": "0.0.789012",
  "source": {
    "type": "hcs_topic",
    "id": "0.0.345678"
  },
  "filter": {
    "op_contains": ["notify", "message"],
    "field_match": {
      "path": "$.payload.type",
      "value": "LIQUIDATION_ALERT"
    }
  },
  "ttl": 2592000,
  "m": "Subscribe to liquidation alerts from DeFi appnet"
}
```

**Field Definitions — `subscribe`:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `subscriber_id` | string | REQUIRED | Hedera account ID of the subscriber (e.g., `0.0.123456`). |
| `subscription_topic_id` | string | REQUIRED | Topic ID of the subscriber's Subscription Topic. |
| `source` | object | REQUIRED | Describes the event source. See Section 3.1.1. |
| `filter` | object | OPTIONAL | Declarative filter. If absent, all messages from the source trigger a notification. See Section 3.1.2. |
| `ttl` | integer | OPTIONAL | Time-to-live in seconds from subscription creation. After expiry, the subscription is considered inactive. |

##### 3.1.1 Source Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | REQUIRED | Source type. MUST be one of: `hcs_topic`, `hcs_account`, `hts_token`. |
| `id` | string | REQUIRED | The source identifier. For `hcs_topic`, the topic ID. For `hcs_account`, the account ID. For `hts_token`, the token ID. |

##### 3.1.2 Filter Object

The `filter` object is OPTIONAL. If provided, a Notification Broker MUST only emit a notification when all specified filter conditions match. Filters are evaluated against the raw JSON body of incoming HCS messages.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `op_contains` | array of strings | OPTIONAL | Notification is triggered only if the message's `op` field matches one of the listed values. |
| `field_match` | object | OPTIONAL | JSONPath selector and expected value. |
| `field_match.path` | string | OPTIONAL | A JSONPath expression (e.g., `$.payload.type`). |
| `field_match.value` | any | OPTIONAL | The expected value at the JSONPath. |

---

#### 3.2 `unsubscribe` Operation

Submitted to the **Subscription Registry Topic** by the original subscriber.

```json
{
  "p": "hcs-22",
  "op": "unsubscribe",
  "subscriber_id": "0.0.123456",
  "subscription_topic_id": "0.0.789012",
  "m": "Cancelling subscription"
}
```

A Notification Broker MUST cease emitting notifications to the given `subscription_topic_id` upon processing a valid `unsubscribe` operation. An `unsubscribe` is only valid if the message is signed by the account matching `subscriber_id`.

---

#### 3.3 `update` Operation

Submitted to the **Subscription Registry Topic** to modify an existing subscription's filter or TTL.

```json
{
  "p": "hcs-22",
  "op": "update",
  "subscriber_id": "0.0.123456",
  "subscription_topic_id": "0.0.789012",
  "filter": {
    "op_contains": ["notify"]
  },
  "ttl": 5184000,
  "m": "Updating subscription filter"
}
```

An `update` MUST be signed by the account matching `subscriber_id`. An `update` operation replaces the previous `filter` and `ttl` values entirely.

---

#### 3.4 `notify` Operation

Submitted by a **Notification Broker** to the subscriber's **Subscription Topic** when a matching event is detected.

```json
{
  "p": "hcs-22",
  "op": "notify",
  "broker_id": "0.0.111222",
  "source": {
    "type": "hcs_topic",
    "id": "0.0.345678",
    "sequence_number": 4201,
    "consensus_timestamp": "1740000000.000000000"
  },
  "payload": {
    "original_op": "notify",
    "data": "hcs://1/0.0.999888"
  },
  "m": "Matched event from DeFi appnet"
}
```

**Field Definitions — `notify`:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `broker_id` | string | REQUIRED | Hedera account ID of the Notification Broker emitting this notification. |
| `source` | object | REQUIRED | Identifies the original event. MUST include `type`, `id`, `sequence_number`, and `consensus_timestamp`. |
| `payload` | object | REQUIRED | Contains the event data. MAY reference an HCS-1 file via HRL if the payload exceeds 1KB. |
| `payload.original_op` | string | OPTIONAL | The `op` field from the original triggering message, if applicable. |
| `payload.data` | any | REQUIRED | The event data. If the original message exceeds 1KB, this MUST be an HCS-1 HRL (e.g., `hcs://1/0.0.999888`). |

---

### 4. Notification Broker Requirements

A Notification Broker is any appnet participant that processes subscriptions and emits notifications. Brokers are off-ledger processes but their outputs are fully on-chain and auditable.

A compliant Notification Broker:

1. MUST monitor the Subscription Registry Topic for `subscribe`, `unsubscribe`, and `update` operations.
2. MUST monitor each subscribed event source (HCS topic, account, or token) for new activity.
3. MUST evaluate the `filter` conditions (if any) against each new event.
4. MUST submit a `notify` message to the subscriber's Subscription Topic when a filter match occurs.
5. MUST NOT submit duplicate notifications for the same `source.sequence_number`.
6. SHOULD sign all `notify` messages with the broker's account key for verifiability.
7. SHOULD respect the `ttl` field and stop processing expired subscriptions.
8. MAY charge a HBAR-denominated fee for notification relay, declared in the broker's HCS-11 profile.

---

### 5. Broker Discovery

A Notification Broker SHOULD publish its capabilities via an HCS-11 profile on its Hedera account. The profile SHOULD include:

```json
{
  "type": 1,
  "display_name": "Example HCS-22 Broker",
  "bio": "Notification broker for HCS-22 event subscriptions",
  "properties": {
    "hcs22_broker": true,
    "supported_source_types": ["hcs_topic", "hcs_account", "hts_token"],
    "fee_hbar_per_notify": "0.001",
    "subscription_registry_topic_id": "0.0.XXXXXX"
  }
}
```

Multiple brokers MAY operate on the same Subscription Registry Topic, providing redundancy.

---

### 6. Validation Rules

#### 6.1 General

- All messages MUST be valid JSON.
- The `p` field MUST equal `"hcs-22"`.
- The `op` field MUST be one of `subscribe`, `unsubscribe`, `update`, or `notify`.

#### 6.2 `subscribe` Validation

- `subscriber_id` MUST match the Hedera account format: three period-delimited integers (e.g., `0.0.123456`).
- `subscription_topic_id` MUST match the Hedera account format.
- `source.type` MUST be one of `hcs_topic`, `hcs_account`, or `hts_token`.
- `source.id` MUST be a valid Hedera ID for the given type.
- If `filter.field_match` is specified, both `path` and `value` MUST be present.
- `ttl` MUST be a positive integer if present.

#### 6.3 `unsubscribe` and `update` Validation

- MUST be signed by the account matching `subscriber_id`. Messages not signed by the subscriber MUST be ignored.

#### 6.4 `notify` Validation

- `source.sequence_number` MUST be a non-negative integer.
- `source.consensus_timestamp` MUST be a valid Hedera consensus timestamp string.
- `payload.data` MUST be present and non-null.
- If `payload.data` is an HRL string, it MUST resolve to a valid HCS-1 file.

---

### 7. Interaction with Other HCS Standards

| Standard | Relationship |
|----------|-------------|
| HCS-1 | Large notification payloads MUST be stored as HCS-1 files and referenced by HRL. |
| HCS-2 | The Subscription Registry is an HCS-2 topic. Brokers MAY use HCS-2 `update` operations to maintain registry metadata. |
| HCS-10 | AI agents (HCS-10) SHOULD use HCS-22 to subscribe to peer agent outbound topics for asynchronous event-driven communication. |
| HCS-11 | Brokers SHOULD advertise capabilities and fee schedules in their HCS-11 profiles. |
| HCS-16 | Floras (HCS-16) SHOULD use HCS-22 to notify member Petals of pending threshold transactions. |
| HCS-20 | Point events from HCS-20 topics MAY be subscribed to via HCS-22 for real-time leaderboard updates. |

---

### 8. Security Considerations

#### 8.1 Spam and Denial of Service

Subscription Topics with no submit key are open to spam. Subscribers SHOULD configure a submit key on their Subscription Topic and only authorize trusted brokers to write to it.

#### 8.2 Broker Trust

Subscribers MUST NOT assume that a `notify` message originates from a trusted broker unless they verify the HCS message signer against a known broker account. Subscribers SHOULD maintain a local allowlist of trusted broker account IDs.

#### 8.3 Filter Tampering

An `update` operation changes the filter entirely. Subscribers SHOULD maintain an off-chain record of their active subscriptions to detect unauthorized updates. As noted in Section 3.3, `update` messages not signed by `subscriber_id` MUST be ignored by brokers.

#### 8.4 Replay Attacks

Brokers MUST track the `source.sequence_number` of emitted notifications to prevent duplicate delivery. Subscribers SHOULD implement idempotency on their Subscription Topic consumers.

---

### 9. Reference Implementation

A reference implementation will be provided in the [Hashgraph Online Standards SDK](https://hol.org/docs/libraries/standards-sdk/overview) as `HCS22Client`. The implementation will include:

- `HCS22Client.subscribe(options)` — Register a subscription on a Subscription Registry Topic.
- `HCS22Client.unsubscribe(subscriptionTopicId)` — Cancel a subscription.
- `HCS22Client.createBroker(registryTopicId)` — Start a Notification Broker process.
- `HCS22Client.listen(subscriptionTopicId, handler)` — Subscribe to incoming notifications.

---

### 10. Backwards Compatibility

HCS-22 introduces a new message protocol identifier (`p: "hcs-22"`) that does not conflict with any existing HCS standard. Existing topics and applications are unaffected.

---

### 11. Open Questions

1. Should the standard define a standardized fee payment mechanism for brokers, or leave this to HCS-10/HCS-20 conventions?
2. Should broker redundancy (multiple brokers on the same registry) be explicitly governed, or left as an operational concern?
3. Should filter expressions support richer logic (e.g., numeric comparisons, array membership), and if so, via JSONPath or a custom DSL?

---

## Rationale

### Why HCS-native rather than off-chain webhooks?

Notification state recorded on HCS topics provides an immutable, consensus-timestamped audit trail. Any party can independently verify that a notification was sent at a specific time, enabling trustless coordination between autonomous agents and multi-party appnets.

### Why a separate Subscription Registry rather than inline subscription messages?

Separating the registry from the Subscription Topic enables multiple brokers to share responsibility for delivering notifications, and allows third parties to audit the set of active subscriptions without access to the subscriber's private topics.

### Why JSONPath for filters?

JSONPath is a widely-supported, language-agnostic path expression standard with implementations in JavaScript, Python, Java, Go, and Rust. It aligns with the ecosystem's existing use of JSON throughout HCS message formats.

---

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

---

## References

- [HCS-1: File Data Management](https://hashgraphonline.com/docs/standards/hcs-1/)
- [HCS-2: Topic Registries](https://hashgraphonline.com/docs/standards/hcs-2/)
- [HCS-4: Standardization Process](https://hashgraphonline.com/docs/standards/hcs-4/)
- [HCS-10: OpenConvAI Agent Communication](https://hashgraphonline.com/docs/standards/hcs-10/)
- [HCS-11: Identity Profiles](https://hashgraphonline.com/docs/standards/hcs-11/)
- [HCS-16: Floras AppNet Accounts](https://hashgraphonline.com/docs/standards/hcs-16/)
- [HCS-20: Auditable Points](https://hashgraphonline.com/docs/standards/hcs-20/)
- [RFC 2119: Key Words for RFCs](https://www.rfc-editor.org/rfc/rfc2119)
- [JSONPath RFC 9535](https://www.rfc-editor.org/rfc/rfc9535)
- [Hedera Consensus Service Documentation](https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service)
