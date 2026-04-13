---
title: Submission and registry payloads
sidebar_position: 11
---

# Submission and registry payloads

The GitHub Action can do more than fail a pull request. It can also open or reuse ecosystem submission issues and emit a registry payload file for downstream automation.

## Submission flow

The intended path is:

1. add the scanner action to plugin CI
2. require `min_score: 80` and a severity gate such as `fail_on_severity: high`
3. enable submission mode with a token that has `issues:write` on `hashgraph-online/awesome-codex-plugins`
4. when the plugin clears the threshold, the action opens or reuses a submission issue
5. the issue body includes machine-readable registry payload data so the same event can drive ecosystem automation

Example:

```yaml
permissions:
  contents: read

jobs:
  scan-plugin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Scan and submit if eligible
        id: scan
        uses: hashgraph-online/ai-plugin-scanner-action@v1
        with:
          plugin_dir: "."
          min_score: 80
          fail_on_severity: high
          submission_enabled: true
          submission_score_threshold: 80
          submission_token: ${{ secrets.AWESOME_CODEX_PLUGINS_TOKEN }}
```

`submission_token` is required when `submission_enabled: true`. The flow is idempotent: if the plugin repository was already submitted, the action reuses the existing open issue instead of opening duplicates.

## Action outputs

High-value outputs include:

- `score`
- `grade`
- `grade_label`
- `max_severity`
- `findings_total`
- `submission_performed`
- `submission_issue_urls`

## Registry payload export

If you want to feed the same scan into a registry, badge pipeline, or another plugin ecosystem automation step, request a registry payload file directly from the action:

```yaml
permissions:
  contents: read

jobs:
  scan-plugin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Scan plugin
        id: scan
        uses: hashgraph-online/ai-plugin-scanner-action@v1
        with:
          plugin_dir: "."
          format: sarif
          output: ai-plugin-scanner.sarif
          registry_payload_output: ai-plugin-registry-payload.json

      - name: Upload registry payload
        uses: actions/upload-artifact@v6
        with:
          name: ai-plugin-registry-payload
          path: ${{ steps.scan.outputs.registry_payload_path }}
```

The registry payload mirrors the submission data used by HOL ecosystem automation, so one scan can drive code scanning, review summaries, awesome-list intake, and registry trust ingestion.

## Next guides

- [GitHub Action quality gate](./github-action.md)
- [Report formats and CI automation](./report-formats-and-ci.md)
- [Policies, output, and trust provenance](./policies-and-output.md)
