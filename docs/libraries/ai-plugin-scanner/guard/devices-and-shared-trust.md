---
title: Devices and shared trust memory
---

# Devices and shared trust memory

Use this guide when you want to understand what `/guard/devices` tells you after Guard starts protecting more than one harness or machine.

## What the route tracks

The Devices route is the quickest answer to:

- which devices Guard has seen recently
- which harnesses are actually protected on each device
- which machines are only local and which are syncing
- whether trust memory is spreading cleanly across the estate

This route matters because Guard is much easier to trust when you can see that protection is consistent instead of silently drifting by laptop.

## Why shared trust memory matters

Local Guard is enough for one machine. Shared trust memory starts to matter when:

- you switch between workstations
- you want the same artifact decision to survive a new laptop
- a team needs one cross-device history instead of one-person receipts
- alerts should reflect the estate, not only one terminal session

## Healthy state

A healthy Devices view looks like:

1. expected machines show up
2. each machine reports the harnesses you meant to protect
3. last-seen timestamps stay fresh
4. synced devices are not rebuilding the same trust decisions over and over

## When the route is telling you something is off

Treat Devices as an operator signal when:

- a harness is missing from a machine that should be protected
- last-seen timestamps go stale
- new devices never start syncing receipts
- the dashboard keeps feeling empty because no shared memory is landing

## See it in product

- [Guard devices](https://hol.org/guard/devices)
- [Guard install](https://hol.org/guard/install)

## Next guides

- [Guard Cloud command center](./guard-cloud-command-center.md)
- [Inventory, ABOM, and artifact detail](./inventory-abom-and-artifact-detail.md)
- [Billing, credits, and plans](./billing-credits-and-plans.md)
