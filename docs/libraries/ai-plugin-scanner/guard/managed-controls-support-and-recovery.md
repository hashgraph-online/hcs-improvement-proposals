---
title: Managed Controls support and recovery
---

# Managed Controls support and recovery

Use this runbook when a HOL Guard 3.0 device reports an invalid bundle, catalog mismatch, stale deployment, degraded authority, or unexpected effective protection.

## Collect safe evidence

Record the device's Guard version, Control Set ID and version, authority mode, catalog digest, negotiated capability markers, acknowledgement state, and typed error code. Do not collect raw commands, secrets, environment values, authentication material, source contents, source paths, or unconsented custom Extension names.

## Triage order

1. Confirm the device is running a version that supports the deployed schema and authority mode.
2. Confirm the Control Set targets stable Extension and permission identities present in the current local catalog.
3. Confirm signature, revision, and rollback checks succeeded.
4. Compare the effective posture with both contextual policy and the managed-restrictive floor.
5. Confirm Package Firewall targets were delegated to Package Firewall.
6. Check whether the last-known-good projection remains active.

## Invalid managed bundle

An invalid signature, stale revision, unsupported schema, unknown target, or catalog mismatch must not partially update runtime state. Keep the affected device out of rollout, preserve its last-known-good projection, and correct the source Control Set or client compatibility before retrying.

Do not clear local state merely to suppress the error. Do not weaken the Control Set or remap an unknown identity to a broader target.

## Recovery actions

- Refresh the device catalog and capability negotiation.
- Upgrade the client when the deployment requires a newer schema or authority capability.
- Correct or remove unsupported targets in a new Control Set version.
- Use authenticated authority recovery for a degraded local authority record.
- Use authenticated unenrollment only when the workspace intends to remove management from that device.

Recovery is complete only after the intended version is active, the acknowledgement is monotonic and current, and the effective posture matches the expected authority.

## Rollback

Publish or select an authenticated rollback that satisfies the deployment's monotonic revision rules. Guard applies the policy and Extension projections in one transaction and publishes runtime state only after commit. If rollback validation or publication fails, the complete last-known-good state remains active.

After rollback, verify the active Control Set version, catalog compatibility, acknowledgement, effective restrictions, and fleet drift. Keep the kill switch available during the observation window.

## Escalation packet

Escalate with:

- user-visible impact and affected fleet scope;
- Guard version and operating system;
- Control Set ID, version, and authority mode;
- catalog digest and capability markers;
- typed validation or activation error;
- last-known-good version and current acknowledgement;
- whether the device is online, offline, or reconnecting;
- whether Package Firewall delegation is involved.

Redact private custom identities unless the operator has consented to share them.

## Release 3.0 note

Managed Controls adds Extension-first Cloud targeting, capability-gated authority, atomic activation, acknowledgement, drift visibility, and deterministic last-known-good recovery. It does not make local protection dependent on Guard Cloud and does not reinterpret existing contextual policy as a managed restriction.

## Next guides

- [Managed Controls and Extensions](./managed-controls-and-extensions.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Receipts, changes, and history](./receipts-changes-and-history.md)

