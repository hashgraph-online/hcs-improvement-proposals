---
title: Testing and validation
sidebar_position: 8
---

# Testing and validation

This guide captures the current automated coverage and the manual validation loop maintainers should run before calling a Guard release ready.

## Automated coverage

Current automated coverage includes:

- Guard CLI behavior tests for detect, scan, run, diff, receipts, install, uninstall, login, and sync
- Guard product-flow tests for `hol-guard start`, `hol-guard status`, and launcher shim creation
- SQLite persistence through real command execution in temporary homes and workspaces
- consumer-mode JSON contract generation against scanner fixtures
- local HTTP sync against a live in-process server instead of mocked transport
- scheduled self-hosted harness smoke through `.github/workflows/harness-smoke.yml`

## Manual validation loop

Run the following checks before a release or when you change Guard harness behavior:

```bash
hol-guard start
hol-guard status
hol-guard detect codex --json
hol-guard detect cursor --json
hol-guard detect gemini --json
hol-guard detect opencode --json
hol-guard install codex
hol-guard run codex --dry-run --default-action allow --json
hol-guard receipts
codex mcp list
cursor-agent mcp list
gemini --help
opencode --help
```

## First-party canaries

Useful local canaries include:

- a local `hashnet-mcp-js` checkout wired into Codex, Cursor, or Claude Code config
- a local `registry-broker-skills` checkout for scanner fixtures and trust review

Claude Code smoke tests remain conditional on the local `claude` binary being available.

## Release-bar recommendation

Nightly or release-gate coverage should include:

- Codex on a self-hosted Linux runner
- Claude Code or Cursor on a self-hosted macOS runner
- Gemini or OpenCode on a self-hosted Windows runner
- a release gate that only passes when those harness families stay green

## Next guides

- [Harness support matrix](./harness-support.md)
- [Approval center and audit trail](./approval-center-and-audit.md)
- [Scanner quick start](../plugin-scanner/quick-start.md)
