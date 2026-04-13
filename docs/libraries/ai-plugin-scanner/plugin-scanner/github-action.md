---
title: GitHub Action quality gate
sidebar_position: 7
---

# GitHub Action quality gate

Use the Marketplace wrapper when you want `plugin-scanner` in pull requests, release checks, or registry submission workflows.

The action lives in its own repository:

- [hashgraph-online/ai-plugin-scanner-action](https://github.com/hashgraph-online/ai-plugin-scanner-action)

## Minimal quality gate

```yaml
- name: AI plugin quality gate
  uses: hashgraph-online/ai-plugin-scanner-action@v1
  with:
    plugin_dir: "."
    mode: scan
    fail_on_severity: high
    min_score: 80
```

## Common modes

- `scan` for weighted quality scoring
- `lint` for authoring feedback and rule-level findings
- `verify` for runtime and install-surface checks
- `submit` for artifact-backed submission gating

## What the action can emit

High-value outputs include:

- `score`
- `grade`
- `policy_pass`
- `verify_pass`
- `max_severity`

SARIF upload is supported for GitHub code scanning workflows, and the action can also export submission payloads for downstream registry or review automation.

## Typical pull request flow

1. install dependencies for the plugin or marketplace repo
2. run the action on pull requests with `mode: scan` or `mode: verify`
3. upload SARIF when you want code scanning annotations
4. fail the workflow on severity or minimum-score thresholds
5. switch to `submit` only when the repository is ready to emit release or registry artifacts

## Example with SARIF

```yaml
- name: Scan plugin
  id: plugin_scan
  uses: hashgraph-online/ai-plugin-scanner-action@v1
  with:
    plugin_dir: "."
    mode: scan
    output_format: sarif
    sarif_output: plugin-scanner.sarif

- name: Upload SARIF
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: plugin-scanner.sarif
```

## Action and CLI together

The common split is:

- `hol-guard` on developer machines for local harness protection
- `plugin-scanner` in CI for maintainer and release gates
- `ai-plugin-scanner-action` when you want the scanner wrapped for GitHub Actions consumers

## Next guides

- [Scanner quick start](./quick-start.md)
- [Policies, output, and trust provenance](./policies-and-output.md)
- [Guard get started](../guard/get-started.md)
