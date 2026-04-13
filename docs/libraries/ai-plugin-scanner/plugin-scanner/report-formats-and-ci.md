---
title: Report formats and CI automation
sidebar_position: 9
---

# Report formats and CI automation

`plugin-scanner` can emit human-readable summaries, machine-readable artifacts, and GitHub-friendly security reports from the same scan.

## Report formats

| Format | Best use |
| :--- | :--- |
| `text` | local terminal review with category totals and findings |
| `json` | structured integrations and dashboards |
| `markdown` | pull request or issue-ready summaries |
| `sarif` | GitHub code scanning uploads and security automation |

Examples:

```bash
plugin-scanner scan . --format text
plugin-scanner scan . --format json
plugin-scanner scan . --format markdown
plugin-scanner scan . --format sarif --output plugin-scanner.sarif
```

## Common gating flags

Fail CI when a finding crosses your severity floor:

```bash
plugin-scanner scan . --fail-on-severity high
```

Require stronger optional integrations when needed:

```bash
plugin-scanner ./my-plugin --cisco-skill-scan on --cisco-policy strict
plugin-scanner ./my-plugin --cisco-mcp-scan on
```

## Signals emitted by the suite

The scanner can emit stable machine signals such as:

- `score`
- `grade`
- `grade_label`
- `policy_pass`
- `verify_pass`
- `max_severity`
- `findings_total`

That makes it easy to gate review, registry ingestion, or release workflows on one predictable artifact.

## CLI-first CI pattern

Use the CLI directly when you want the repository to control install, caching, and report upload:

```yaml
permissions:
  contents: read
  security-events: write

jobs:
  scan-plugin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - name: Install scanner
        run: pip install plugin-scanner
      - name: Scan plugin
        run: plugin-scanner scan . --format sarif --output plugin-scanner.sarif --fail-on-severity high
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: plugin-scanner.sarif
```

## Local pre-commit pattern

```yaml
repos:
  - repo: local
    hooks:
      - id: plugin-scanner
        name: Plugin Scanner
        entry: plugin-scanner
        language: system
        types: [directory]
        pass_filenames: false
        args: ["./"]
```

## Next guides

- [Policies, output, and trust provenance](./policies-and-output.md)
- [GitHub Action quality gate](./github-action.md)
- [Submission and registry payloads](./submission-and-registry-payloads.md)
