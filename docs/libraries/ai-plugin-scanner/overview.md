---
sidebar_position: 1
---

# AI Plugin Scanner

The [`hashgraph-online/ai-plugin-scanner`](https://github.com/hashgraph-online/ai-plugin-scanner) repository now ships two related products:

- `hol-guard` for local harness protection before Codex, Claude Code, Cursor, Gemini, or OpenCode launch new or changed tools
- `plugin-scanner` for repository and CI quality gates across Codex, Claude Code, Gemini CLI, and OpenCode plugin ecosystems

Use the scanner after a plugin is scaffolded and before publishing, registry ingestion, or GitHub review. Use Guard on developer machines where you want artifact trust and approval flows in front of local harness launches.

Canonical docs URL: [https://hol.org/docs/libraries/ai-plugin-scanner/](https://hol.org/docs/libraries/ai-plugin-scanner/)

## Package Map

```bash
pip install hol-guard
pip install plugin-scanner
```

The repository name is `ai-plugin-scanner`, but the published scanner CLI remains `plugin-scanner`. Older automation can still invoke compatibility aliases such as `codex-plugin-scanner`, but new docs and workflows should point at `plugin-scanner` and `hashgraph-online/ai-plugin-scanner`.

## HOL Guard

`hol-guard` protects local harness launches. It detects supported harnesses, installs Guard in front of them, records receipts for changed artifacts, and routes blocked changes into either inline approvals or the local approval center.

Primary commands:

```bash
hol-guard bootstrap
hol-guard install codex
hol-guard run codex --dry-run
hol-guard run codex
hol-guard approvals
hol-guard receipts
hol-guard status
hol-guard detect codex --json
```

Supported harnesses today:

- `codex`
- `claude-code`
- `cursor`
- `gemini`
- `opencode`

Start with these Guard guides:

- [Guard get started](./guard/get-started.md)
- [Local-first runtime and approvals](./guard/local-first-and-approvals.md)
- [Local-first and optional cloud](./guard/local-first-vs-cloud.md)
- [Approval center and audit trail](./guard/approval-center-and-audit.md)
- [Guard architecture](./guard/architecture.md)
- [Harness support matrix](./guard/harness-support.md)
- [Codex harness](./guard/codex-harness.md)
- [Claude Code harness](./guard/claude-code-harness.md)
- [Cursor harness](./guard/cursor-harness.md)
- [Gemini harness](./guard/gemini-harness.md)
- [OpenCode harness](./guard/opencode-harness.md)
- [Testing and validation](./guard/testing-and-validation.md)

When local Guard is already working and you want the signed-in operating model:

- [Guard Cloud command center](./guard/guard-cloud-command-center.md)
- [Devices and shared trust memory](./guard/devices-and-shared-trust.md)
- [Inventory, ABOM, and artifact detail](./guard/inventory-abom-and-artifact-detail.md)
- [Receipts, changes, and history](./guard/receipts-changes-and-history.md)
- [Alerts, watchlists, and advisories](./guard/alerts-watchlists-and-advisories.md)
- [Team policy and delegated approvals](./guard/team-policy-and-delegated-approvals.md)
- [Exceptions and expiring windows](./guard/exceptions-and-expiring-windows.md)
- [Billing, credits, and plans](./guard/billing-credits-and-plans.md)

## plugin-scanner

`plugin-scanner` is the CI and maintainer-facing quality suite. It scans plugin manifests, marketplace metadata, skills, MCP configuration, apps, assets, and repository security posture. It can work against a single plugin or auto-detect supported plugin ecosystems inside a repository root.

### Ecosystems

```bash
plugin-scanner --list-ecosystems
```

Current built-in ecosystem adapters:

- Codex
- Claude Code
- Gemini CLI
- OpenCode

### Scanner quick start

```bash
pip install plugin-scanner
plugin-scanner lint .
plugin-scanner verify .
plugin-scanner scan . --format json
plugin-scanner verify . --online
plugin-scanner doctor . --component mcp --bundle dist/doctor.zip
```

### Command surface

| Command | Purpose |
| :--- | :--- |
| `scan` | Weighted repository or plugin scan with policy evaluation |
| `lint` | Rule-level findings, `--list-rules`, `--explain`, and safe autofix support |
| `verify` | Runtime and install-surface readiness checks, with optional `--online` probing |
| `submit` | Scan + verify + policy gate that emits a plugin-quality artifact |
| `doctor` | Component diagnostics and zipped troubleshooting bundles |

### What it checks

`plugin-scanner` currently covers:

- plugin manifests and marketplace metadata
- MCP stdio and remote HTTP verification
- skills, assets, and `.app.json` surfaces
- security posture such as secrets, dangerous commands, action pinning, and lockfiles
- trust provenance for skills, MCP configuration, and top-level plugin packages

It supports policy profiles (`default`, `public-marketplace`, `strict-security`), baseline suppressions, config files like `.plugin-scanner.toml`, JSON/Markdown/SARIF output, and repository-mode scanning for marketplace roots that enumerate local plugins under `./plugins/...`.

Start with these scanner guides:

- [Scanner quick start](./plugin-scanner/quick-start.md)
- [Ecosystems and repository mode](./plugin-scanner/ecosystems-and-repo-mode.md)
- [Quality suite commands](./plugin-scanner/quality-suite-commands.md)
- [Policies, output, and trust provenance](./plugin-scanner/policies-and-output.md)
- [Trust provenance guide](./plugin-scanner/trust-provenance.md)
- [Report formats and CI automation](./plugin-scanner/report-formats-and-ci.md)

## GitHub Action

The Marketplace wrapper lives in the dedicated [`hashgraph-online/ai-plugin-scanner-action`](https://github.com/hashgraph-online/ai-plugin-scanner-action) repository. Use it when you want scanner checks in pull requests, release workflows, submission intake, or code-scanning automation without installing the CLI yourself.

Start with these action guides:

- [GitHub Action quality gate](./plugin-scanner/github-action.md)
- [Submission and registry payloads](./plugin-scanner/submission-and-registry-payloads.md)

## Trust Score Provenance

The scanner emits explicit trust provenance alongside quality grades:

- bundled skills use published HCS-28 baseline adapter IDs, weights, and denominator rules
- MCP configuration trust uses HCS-style adapter and contribution-mode patterns
- top-level plugin trust follows the same pattern locally

Start with the local trust guide:

- [Trust provenance guide](./plugin-scanner/trust-provenance.md)

## Config File

```toml
# .plugin-scanner.toml
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

## Container Usage

```bash
docker run --rm \
  -v "$PWD:/workspace" \
  ghcr.io/hashgraph-online/ai-plugin-scanner:<version> \
  scan /workspace --format text
```

## Resources

- [hol-guard on PyPI](https://pypi.org/project/hol-guard/)
- [plugin-scanner on PyPI](https://pypi.org/project/plugin-scanner/)
- [HOL Plugin Registry](https://hol.org/registry/plugins)
- [GitHub Repository](https://github.com/hashgraph-online/ai-plugin-scanner)
- [AI Plugin Scanner Action](https://github.com/hashgraph-online/ai-plugin-scanner-action)

## Project Basics

| Aspect | Status |
| :--- | :--- |
| License | Apache-2.0 |
| Latest Release | See the [GitHub releases](https://github.com/hashgraph-online/ai-plugin-scanner/releases) and linked package distributions |
| Supported Products | `hol-guard`, `plugin-scanner`, and the `ai-plugin-scanner-action` GitHub Action |
| Security Policy | [SECURITY.md](https://github.com/hashgraph-online/ai-plugin-scanner/blob/main/SECURITY.md) |
