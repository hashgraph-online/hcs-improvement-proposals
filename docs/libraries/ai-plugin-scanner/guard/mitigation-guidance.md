---
title: Mitigation guidance
sidebar_position: 11
---

# Mitigation guidance

When Guard identifies a supply-chain risk, it provides mitigation guidance to help you resolve the issue quickly. This guide explains how to read and act on mitigation recommendations.

## How mitigation guidance works

Each advisory or warning in Guard includes a **Mitigation** section with actionable steps. The guidance is tailored to the specific risk type:

| Risk type | Typical mitigation |
| :--- | :--- |
| Known vulnerability | Upgrade to a patched version or apply a workaround |
| Suspicious publisher | Verify publisher identity and consider blocklisting |
| Policy violation | Review the policy rule and adjust or add an exception |
| Revoked tool | Remove the tool from your environment immediately |
| Unverified provenance | Require provenance attestation before allowing the tool |

## Acting on guidance

1. Open the investigation in [Guard alerts](https://hol.org/guard/alerts).
2. Review the **Mitigation** section for the specific alert.
3. Follow the recommended steps in order.
4. Mark the investigation as resolved once the mitigation is applied.

## Exceptions

If a mitigation step is not applicable to your environment, you can file an exception. Exceptions are time-limited and auditable.

1. Open the investigation.
2. Select **File exception**.
3. Provide a reason and select an expiration date.
4. Submit for review by a workspace admin.

## See it in product

- [Guard alerts](https://hol.org/guard/alerts)
- [Guard advisories](https://hol.org/guard/security/advisories)

## Next guides

- [Conditions](../routing/conditions.md)
- [Terminals](../routing/terminals.md)
