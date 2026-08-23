---
title: Managed Controls and Extensions
---

# Managed Controls and Extensions

HOL Guard 3.0 uses **Extensions** as the shared vocabulary between Local Guard and Guard Cloud. An Extension describes a capability Guard can protect. A permission is an independently controllable capability inside that Extension. Guard Cloud targets those stable identities through versioned **Control Sets**; it does not replace the local detector registry or upload detector matchers.

Core local protection remains available without Guard Cloud.

## Local Extensions

Local Guard owns the Extension catalog, permission metadata, detector facts, and device-local protection settings. Built-in identities are stable. Custom Extensions can be created locally, but their names and source details remain local unless the operator explicitly opts into continuity.

The local dashboard separates three views:

- **Extensions** shows capabilities and their current protection.
- **Rules & exceptions** shows contextual decisions and time-bounded exceptions.
- **Managed Controls** shows Cloud-sourced Control Sets, authority, version, and acknowledgement state.

## Authority modes

Every Control Set declares its authority instead of relying on ambiguous “managed” copy:

- **Personal shared** synchronizes a Pro user's choices across their devices. Local tightening remains allowed.
- **Workspace shared** distributes Team workspace rules under the existing contextual precedence model.
- **Managed restrictive** establishes a non-weakenable floor for supported Team and Enterprise clients. It is separately negotiated and never inferred from an ordinary shared rule.

A client that does not advertise the required schema or authority capability is excluded from that rollout. Guard does not translate a restrictive deployment into a weaker fallback.

## Effective precedence

Guard resolves two authority planes:

1. Contextual rules keep their existing specificity and recency behavior.
2. Managed restrictions contribute a separate floor that local settings cannot weaken.

The effective result is the stricter applicable outcome. A local block can tighten a Cloud permit. An ordinary workspace rule does not silently become non-overridable. A disabled Extension or permission blocks that capability regardless of which plane disabled it.

For example, a workspace-shared `Permit` can still be tightened to `Review` or `Block` locally. A managed-restrictive `Block` cannot be changed to `Permit` on the device.

## Offline and invalid-bundle behavior

Local protection continues when Guard Cloud is unreachable. Guard keeps the last authenticated, compatible managed projection and its acknowledgement evidence. For managed restrictions, 3.0 retains the last-known-good restrictive posture until a valid successor arrives or an authenticated unenrollment clears it.

Guard rejects activation when a bundle has an invalid signature, a stale revision, an unsupported schema or capability, an unknown target, or a catalog mismatch. Policy and Extension projections activate atomically; a partial apply is never published to the runtime.

## Catalog mismatch recovery

If a device reports a catalog mismatch:

1. confirm that Local Guard and its Extension catalog are current;
2. refresh the local catalog and Cloud connection;
3. verify that the target Extension and permission identities exist on the device;
4. retry only after capability negotiation reports compatibility;
5. keep the device out of the deployment if the target remains unsupported.

Do not broaden or rename a target to make a rollout pass. Custom identities require exact, consented continuity.

## Package Firewall delegation

Package-manager Extensions delegate enforcement to the Package Firewall. Control Sets targeting these Extensions compile through that enforcement path. Guard does not create a second generic matcher that could disagree with Package Firewall decisions.

## Privacy boundaries

Catalog synchronization sends stable Extension and permission identities, supported schemas and capabilities, catalog digest, and compatibility posture. It excludes raw commands, secrets, environment values, source contents, authentication material, source paths, and custom names without consent.

An operator can remove a Cloud-synced custom Extension record without deleting local files.

## Local API reference

The authenticated loopback daemon exposes these 3.0 surfaces to the Local dashboard:

| Endpoint | Purpose |
| --- | --- |
| `GET /v1/capabilities` | Supported schemas and authority capabilities |
| `GET /v1/extension-controls/catalog` | Canonical local catalog and digest |
| `GET /v1/extension-controls/effective` | Effective local and managed posture |
| `GET /v1/extension-controls/history` | Local activation and acknowledgement history |
| `POST /v1/extension-controls/preview` | Validate and preview a local change |
| `POST /v1/extension-controls/test` | Test the projected behavior |
| `POST /v1/extension-controls/apply` | Apply an authorized local change |
| `POST /v1/extension-controls/refresh` | Refresh catalog and authority state |
| `POST /v1/extension-controls/recover-authority` | Recover a degraded authority state |
| `POST /v1/extension-controls/acknowledge-degraded` | Acknowledge an operator-visible degraded state |

These are authenticated local product APIs, not unauthenticated public network endpoints. Cloud activation uses a separate trusted apply path. Compatibility names such as `GuardPolicy` and policy bundle remain in technical schemas while the product UI uses Managed Controls and Control Sets.

## Migration from existing policy

Existing contextual policy keeps its meaning and precedence. Guard maps supported Extension targets to stable identities without broadening unmapped rules. Compatibility routes and technical field names remain available during the 3.0 migration. Non-weakenable behavior requires an explicitly authored managed-restrictive Control Set.

## Plans

- **Solo:** local protection plus read-only Cloud continuity and posture where available.
- **Pro:** personal Control Sets, simulation, versions, rollout, rollback, and personal-device posture.
- **Team and Enterprise:** workspace Control Sets, reviewers, shared targets, managed restrictions, exceptions, routing, fleet drift, and audit.

Plan limits affect Cloud orchestration, not basic local safety.

## Next guides

- [Managed Controls support and recovery](./managed-controls-support-and-recovery.md)
- [Local-first and optional cloud](./local-first-vs-cloud.md)
- [Exceptions and expiring windows](./exceptions-and-expiring-windows.md)
- [Billing, credits, and plans](./billing-credits-and-plans.md)

