---
sidebar_position: 1
---

# Codex Plugin Scanner

The Codex Plugin Scanner (`codex-plugin-scanner`) is the default CI quality gate for Codex plugins. It lints locally, verifies in CI, and produces publish-ready bundles for manifests, skills, MCP configurations, and marketplace metadata.

Use this after [`$plugin-creator`](https://developers.openai.com/codex/plugins) and before publishing, review, or distribution.

Canonical docs URL: [https://hol.org/docs/libraries/codex-plugin-scanner/](https://hol.org/docs/libraries/codex-plugin-scanner/)

## Installation

```bash
pip install codex-plugin-scanner
```

For Cisco skill scanning support:

```bash
pip install "codex-plugin-scanner[cisco]"
```

Or run without installation:

```bash
pipx run codex-plugin-scanner ./my-plugin
```

## Quick Start

```bash
# Local preflight after $plugin-creator
pipx run codex-plugin-scanner lint .
pipx run codex-plugin-scanner verify .

# Full scan with score
codex-plugin-scanner scan .
```

## CLI Commands

| Command | Purpose |
| :--- | :--- |
| `scan` | Full-surface security and publishability analysis |
| `lint` | Rule-oriented authoring feedback with optional fixes |
| `verify` | Runtime and install-surface readiness checks |
| `submit` | Artifact-backed submission gating |
| `doctor` | Targeted diagnostics and troubleshooting bundles |

## GitHub Action

Add to your workflow for CI quality gating:

```yaml
- name: Codex plugin quality gate
  uses: hashgraph-online/hol-codex-plugin-scanner-action@v1
  with:
    plugin_dir: "."
    fail_on_severity: high
    min_score: 80
```

### Action Inputs

| Input | Default | Description |
| :--- | :--- | :--- |
| `mode` | `scan` | Execution mode: scan, lint, verify, submit |
| `plugin_dir` | `.` | Path to plugin directory or marketplace root |
| `format` | `text` | Output format: text, json, markdown, sarif |
| `profile` | `default` | Policy profile: default, public-marketplace, strict-security |
| `min_score` | `0` | Fail if score is below threshold (0-100) |
| `fail_on_severity` | `none` | Fail if findings meet/exceed severity (none, critical, high, medium, low, info) |
| `upload_sarif` | `false` | Upload SARIF to GitHub code scanning |
| `cisco_skill_scan` | `auto` | Cisco skill-scanner mode: auto, on, off |
| `submission_enabled` | `false` | Open submission issues when threshold is met |

### Action Outputs

| Output | Description |
| :--- | :--- |
| `score` | Numeric score (0-100) |
| `grade` | Letter grade (A-F) |
| `grade_label` | Human-readable grade label |
| `max_severity` | Most severe finding, or none |
| `findings_total` | Total number of findings |
| `policy_pass` | Whether selected policy profile passed |
| `verify_pass` | Whether runtime verification passed |
| `submission_eligible` | Whether plugin met submission threshold |
| `submission_issue_urls` | URLs of created/reused submission issues |

### Submission Workflow

The action can automatically submit passing plugins to the HOL registry:

```yaml
- name: Scan and submit if eligible
  uses: hashgraph-online/hol-codex-plugin-scanner-action@v1
  with:
    plugin_dir: "."
    min_score: 80
    fail_on_severity: high
    submission_enabled: true
    submission_score_threshold: 80
    submission_token: ${{ secrets.AWESOME_CODEX_PLUGINS_TOKEN }}
```

## Quality Categories

| Category | Max Points | Coverage |
| :--- | :--- | :--- |
| Manifest Validation | 31 | plugin.json, required fields, semver, kebab-case, metadata, interface links |
| Security | 24 | SECURITY.md, LICENSE, hardcoded secrets, dangerous MCP commands, transport hardening |
| Operational Security | 20 | SHA-pinned actions, write-all permissions, privileged checkout, Dependabot, lockfiles |
| Best Practices | 15 | README.md, skills directory, SKILL.md frontmatter, .env, .codexignore |
| Marketplace | 15 | marketplace.json validity, policy fields, safe source paths |
| Skill Security | 15 | Cisco integration status, elevated findings, analyzability |
| Code Quality | 10 | eval, new Function, shell-injection patterns |

## Example Output

```text
🔗 Codex Plugin Scanner v1.4.0
Scanning: ./my-plugin

── Manifest Validation (31/31) ──
  ✅ plugin.json exists                           +4
  ✅ Valid JSON                                   +4
  ✅ Required fields present                      +5

── Security (16/16) ──
  ✅ SECURITY.md found                            +3
  ✅ LICENSE found                                +3
  ✅ No hardcoded secrets                         +7

Findings: critical:0, high:0, medium:0, low:0, info:0

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Score: 100/100 (A - Excellent)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Trust Score Provenance

The scanner emits explicit trust provenance alongside quality grades:

- Bundled skills use published HCS-28 baseline adapter IDs, weights, and denominator rules
- MCP configuration trust uses HCS-style adapter and contribution-mode patterns
- Top-level Codex plugin trust follows the same pattern locally

Local specs:

- [Skill Trust Local Draft](docs/trust/skill-trust-local.md)
- [MCP Trust Draft](docs/trust/mcp-trust-draft.md)
- [Plugin Trust Draft](docs/trust/plugin-trust-draft.md)

## Config File

```toml
# .codex-plugin-scanner.toml
[scanner]
profile = "public-marketplace"
baseline_file = "baseline.txt"
ignore_paths = ["tests/*", "fixtures/*"]

[rules]
disabled = ["README_MISSING"]
severity_overrides = { CODEXIGNORE_MISSING = "low" }
```

## Container Usage

```bash
docker run --rm \
  -v "$PWD:/workspace" \
  ghcr.io/hashgraph-online/codex-plugin-scanner:<version> \
  scan /workspace --format text
```

## Resources

- [PyPI Package](https://pypi.org/project/codex-plugin-scanner/)
- [HOL Plugin Registry](https://hol.org/registry/plugins)
- [GitHub Repository](https://github.com/hashgraph-online/codex-plugin-scanner)

## Project Basics

| Aspect | Status |
| :--- | :--- |
| License | Apache-2.0 |
| Latest Release | See [PyPI](https://pypi.org/project/codex-plugin-scanner/) |
| Supported Versions | 1.x (current stable) |
| Security Policy | [SECURITY.md](./SECURITY.md) |

## Security

The scanner itself follows security best practices:

- **SECURITY.md** - Vulnerability reporting process with 48h acknowledgment, 7-day resolution target
- **No hardcoded secrets** - Scanned and detected in plugins
- **Dependency scanning** - Checks for dependency vulnerabilities via Dependabot
- **PyPI Attestations** - Published packages include provenance verification

## CI/CD

- **Matrix CI** - Tests across Python 3.10, 3.11, 3.12, 3.13
- **OpenSSF Scorecard** - Automated security posture assessment
- **Published Action** - GitHub Action for plugin CI gating
- **SARIF Export** - Integration with GitHub code scanning

## Code Quality

- **Ruff** - Fast Python linter with auto-fixes
- **Type stubs** - Full type annotations
- **pytest** - Test suite with coverage
- **pre-commit hooks** - Enforced code standards