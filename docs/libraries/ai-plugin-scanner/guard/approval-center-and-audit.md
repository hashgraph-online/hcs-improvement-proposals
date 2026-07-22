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

## Action-aware approval scopes

Approval scopes now understand *which action* triggered the review — `PreToolUse`, `PostToolUse`, or other hook events. The approval center only shows scopes that are actionable for the current request type. PreToolUse scopes appear when a tool is about to execute; PostToolUse scopes appear after execution for result inspection. Irrelevant scopes are hidden, reducing cognitive load.

## Browser MCP approvals

Browser MCP interactions (Playwright, Puppeteer) have bounded, granular approval. Each browser action target is individually labeled — you approve "navigate to `https://example.com`" and "click element `.submit-button`" separately, not the entire browser session. This reduces blanket-approval risk while keeping the approval flow fast for repeated navigation.

## Compound command handling

When an AI agent runs a compound shell command (multiple commands chained with `&&`, `|`, or `;`), Guard evaluates each segment independently:

- **Safe segments** (e.g., `git fetch origin`, `git log --oneline -5`) are allowed without approval
- **Risky segments** (e.g., `git push --force`, `rm -rf`) require approval
- **Compound Git inspections** — deterministic `cd` + safe Git operations — are recognized as low-risk chains and allowed without approval noise

If any segment is unresolved (Guard can't statically prove safety), the entire compound command is queued for review with a clear explanation of which part needs attention.

## Next guides

- [Receipts, changes, and history](./receipts-changes-and-history.md)
- [Inventory, ABOM, and artifact detail](./inventory-abom-and-artifact-detail.md)
- [Exceptions and expiring windows](./exceptions-and-expiring-windows.md)
- [Command activity tracking](./command-activity.md)
