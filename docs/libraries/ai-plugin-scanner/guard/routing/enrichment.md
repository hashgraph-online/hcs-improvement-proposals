---
title: Enrichment
sidebar_position: 3
---

# Enrichment

An enrichment step adds context to an investigation alert before any decision is made. The raw event that a trigger produces is thin — it tells you what changed, but not what the change means. Enrichment fills in the surrounding picture so conditions and controls can branch on real signals instead of guesses.

Configure enrichment steps in the [Guard Routing Studio](https://hol.org/guard/routing).

## Why enrich first

A `tool change detected` event on its own says only that a file differs. It does not say whether the publisher is known, whether the artifact has known vulnerabilities, or whether its provenance is verifiable. If a condition branches before enrichment, it is branching on the raw payload.

The healthy order is:

1. trigger creates the alert
2. enrichment attaches context
3. conditions branch on the enriched alert
4. controls pace the enriched alert
5. actions send the enriched alert to a destination

Enrichment is optional but recommended. A workflow with no enrichment can only branch on fields present in the raw event.

## What enrichment attaches

Guard can attach four kinds of context. Each is a configurable source in the enrichment step.

| Source | What it adds |
| :--- | :--- |
| **Registry metadata** | Publisher, version, license, and ecosystem for the artifact |
| **Vulnerability data** | Known advisories and severity ratings for the artifact version |
| **Provenance info** | Build and signing provenance when available from the registry |
| **Trust scores** | A Guard trust score and any advisory or revocation state |

Every source is optional. Enable only the sources your conditions and actions actually use, so enrichment stays fast and focused.

### Registry metadata

Pulls the canonical record for the artifact from its registry. This is what lets a condition branch on publisher or license without the trigger needing to carry that data.

### Vulnerability data

Attaches known advisories for the specific artifact version. When a condition branches on severity, it is usually branching on data that came from this source.

### Provenance info

Attaches build and signing provenance when the registry provides it. Use it when the team's policy cares about verifiable builds, not just published versions.

### Trust scores

Attaches the Guard trust score for the artifact, along with any active advisory or revocation state. This is the source that lets a condition branch on `trust score below threshold` or `revocation present`.

## Configuring enrichment sources

In the enrichment node configuration panel:

1. select which sources to enable
2. for each source, choose whether to fetch on every alert or only when the field is missing
3. set a timeout — if a source does not respond in time, enrichment continues with what it has

Enrichment is best-effort. If a source is unavailable, the alert still proceeds with whatever context was collected. A missing field is not an error; it is a field a condition can treat as empty.

## Ordering multiple enrichment steps

You can chain more than one enrichment node. This is useful when one source depends on another — for example, vulnerability data may need registry metadata resolved first.

Rules for chained enrichment:

- each node runs in order, top to bottom
- fields attached by an earlier node are visible to later nodes
- a later node can overwrite a field only if configured to do so
- if a node times out, downstream nodes still run

Keep chains short. Two or three enrichment nodes is usually enough. Longer chains add latency without adding decision quality.

## What enrichment does not do

Enrichment only attaches context. It does not:

- decide whether an alert is risky — that is a condition's job
- suppress an alert — that is a control's job
- send a notification — that is an action's job

Keeping these concerns separate is what makes workflows readable. If you find enrichment logic making decisions, move that logic into a condition node.

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Condition branches as if enrichment never ran | Enrichment source is disabled, or the condition is reading the wrong field name |
| Alerts are slow to reach an action | Enrichment timeout is set too high, or too many sources are enabled |
| Trust score is empty | The artifact is new or untracked; no score exists yet |
| Vulnerability data is missing | No advisory exists for that version, or the version is not resolvable in the registry |
| Provenance info is empty | The registry does not publish provenance for this artifact |

Use **Test run** in the studio to inspect the enriched alert payload before it reaches conditions. That view shows exactly which fields each source attached.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)

## Next guides

- [Conditions](./conditions.md)
- [Controls](./controls.md)
- [Actions](./actions.md)
