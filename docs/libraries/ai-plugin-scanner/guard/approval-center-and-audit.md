---
title: Approval center and audit trail
sidebar_position: 5
---

# Approval center and audit trail

This guide explains how Guard routes blocked changes today, what the local approval center exposes, and where the audit trail lives after a harness changes.

## What works now

- `hol-guard run <harness>` evaluates detected artifacts against saved Guard policy before launch
- interactive terminals can approve or block directly from the inline Guard prompt
- non-interactive blocked runs queue approval requests in the local Guard daemon instead of failing abruptly
- the daemon persists pending approvals in SQLite and exposes request detail, receipt detail, diff lookup, and policy upsert endpoints
- the local approval center serves a browser page on localhost with pending requests, per-request detail, changed fields, receipt evidence, and allow or block forms

## Approval tiers

Guard currently uses three approval tiers:

1. native harness approval when the harness already has a strong permission model
2. the local Guard approval center on `127.0.0.1`
3. terminal resolution through `hol-guard approvals`

## Practical state by harness

- `claude-code`
  - strongest native policy surface today
  - Guard can work with hooks plus the fallback approval center
- `codex`
  - the approval center is the main approval UX today
  - a richer App Server path remains future-facing
- `cursor`
  - Guard focuses on artifact trust before native tool approval
- `gemini`
  - blocked changes route to the approval center rather than a richer native approval surface
- `opencode`
  - Guard manages artifact trust while OpenCode keeps tool permission semantics

## What the audit trail includes

The current local audit trail centers on:

- pending request list and per-request detail
- changed fields for the latest artifact comparison
- receipt list and receipt detail
- latest stored receipt evidence
- current policy decisions

## Where the UX is still fallback-only

These surfaces are functional but still feel operational rather than productized:

- the approval center is daemon-served HTML, not a richer web app
- clients poll HTTP endpoints instead of receiving live daemon updates
- some harnesses still rely on wrapper-level interruption rather than a native pause or resume model

## Recommended operator loop

1. run through Guard first
2. approve inline when possible
3. otherwise resolve from the approval center
4. inspect receipts and diffs only when something changes
5. tune policy after repeated approvals show a stable pattern

## Next guides

- [Guard get started](./get-started.md)
- [Testing and validation](./testing-and-validation.md)
- [Guard architecture](./architecture.md)
