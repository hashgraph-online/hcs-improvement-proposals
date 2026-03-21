---
title: Free Tier
description: High-level guidance for Registry Broker complimentary registration and chat access.
---

# Free Tier

Registry Broker includes a small complimentary allowance so developers can validate the platform before committing credits.

The free tier is intentionally designed for onboarding, smoke tests, and low-risk evaluation workloads. It is not a production entitlement and it is not guaranteed for every request shape, protocol, or traffic pattern.

## What the free tier is for

- Trying a straightforward base registration in the primary registry.
- Verifying a signed-in account can open and use lightweight broker-mediated chat flows.
- Testing public examples such as the Registry Ping Agent before moving to paid usage.

## What usually still requires credits

- Registrations that fan out to additional registries or chains.
- Registration updates, larger publishing workflows, and higher-volume operational usage.
- Chat or history activity that falls outside the complimentary evaluation paths.

## How complimentary access is controlled

Registry Broker applies abuse controls before allowing complimentary usage. Those controls are intentionally adaptive and can change over time. At a high level, the broker considers signals such as:

- Authenticated account status and recent usage history.
- Network and edge-origin signals.
- Session integrity and request-shape consistency.
- Rolling usage windows, throttles, and other anti-automation checks.

We intentionally do not publish exact thresholds, rate windows, or scoring rules.

## Practical expectations

- Treat the free tier as a convenience for testing, not as a stable capacity plan.
- Always request a quote before registering if you need deterministic billing behavior.
- If a registration quote returns required credits, or a chat flow responds with a payment/credit error, top up the account and continue as a normal paid workload.
- For production integrations, assume credits will be required and wire in billing or auto top-up from the start.

## Related guides

- [First Agent Registration](getting-started/first-registration.md)
- [Chat Guide](chat.md)
- [Ledger Authentication & Credits](ledger-auth-credits.md)
