---
title: Policies, output, and trust provenance
sidebar_position: 6
---

# Policies, output, and trust provenance

`plugin-scanner` separates quality scoring from trust provenance so maintainers can see both readiness and evidence.

## Policy profiles

The scanner ships with policy profiles such as:

- `default`
- `public-marketplace`
- `strict-security`

It also supports baseline suppressions and repository-level configuration through `.plugin-scanner.toml`.

Example config:

```toml
[scanner]
profile = "public-marketplace"
baseline_file = "baseline.txt"
ignore_paths = ["tests/*", "fixtures/*"]

[rules]
disabled = ["README_MISSING"]
severity_overrides = { CODEXIGNORE_MISSING = "low" }

[verification]
online = false

[submission]
repos = ["hashgraph-online/awesome-codex-plugins"]
labels = ["plugin-submission"]
```

## Output formats

Common output modes:

- text for local terminal review
- JSON for CI and downstream automation
- Markdown for reviewer-facing summaries
- SARIF for GitHub code scanning

Examples:

```bash
plugin-scanner scan . --format text
plugin-scanner scan . --format json
plugin-scanner scan . --format markdown
plugin-scanner scan . --format sarif --output plugin-scanner.sarif
```

You can also fail CI on severity thresholds:

```bash
plugin-scanner scan . --fail-on-severity high
```

## Submission and verification signals

The scanner can emit policy outputs such as:

- `score`
- `grade`
- `policy_pass`
- `verify_pass`
- `max_severity`

That makes it easy to gate review, registry ingestion, or release workflows on one predictable artifact.

## Trust provenance

The scanner emits explicit trust provenance alongside quality grades:

- bundled skills use published HCS-28 baseline adapter IDs, weights, and denominator rules
- MCP configuration trust uses HCS-style adapter and contribution-mode patterns
- top-level plugin trust follows the same pattern locally

Start with the local trust guide:

- [Trust provenance guide](./trust-provenance.md)

## Container usage

Container-first environments can use the published image:

```bash
docker run --rm \
  -v "$PWD:/workspace" \
  ghcr.io/hashgraph-online/ai-plugin-scanner:<version> \
  scan /workspace --format text
```

## Next guides

- [Scanner quick start](./quick-start.md)
- [Trust provenance guide](./trust-provenance.md)
- [GitHub Action quality gate](./github-action.md)
- [Local-first runtime and approvals](../guard/local-first-and-approvals.md)
