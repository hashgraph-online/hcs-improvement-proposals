---
title: skill-publish (NPX + GitHub Action)
description: Use the skill-publish CLI locally and the GitHub Action in CI to publish HCS-26 skill releases.
---

# skill-publish (NPX + GitHub Action)

`skill-publish` is the fastest path to publish reproducible HCS-26 skill releases through Registry Broker.

It supports:
- local developer workflows through `npx skill-publish`
- CI workflows through `hashgraph-online/skill-publish@v1`

If you need low-level control over files and payload construction, use the SDK methods in [Skills Upload & Discovery](skills-upload-discovery.md). For most teams, `skill-publish` is the preferred DX path.

## Local CLI workflow (`npx skill-publish`)

Run interactive onboarding:

```bash
npx skill-publish
```

Recommended command sequence:

```bash
# 1) Create API key via ledger challenge and optionally top up credits
npx skill-publish setup \
  --account-id 0.0.12345 \
  --network hedera:testnet \
  --hedera-private-key <private-key> \
  --hbar 5

# 2) Scaffold package files
npx skill-publish init ./skills/my-skill

# 3) Check readiness (broker connectivity, credentials, package files)
npx skill-publish doctor ./skills/my-skill

# 4) Validate and quote
npx skill-publish validate ./skills/my-skill
npx skill-publish quote ./skills/my-skill

# 5) Publish
npx skill-publish publish ./skills/my-skill
```

### Main CLI commands

```bash
npx skill-publish help
npx skill-publish help publish
npx skill-publish help setup
npx skill-publish help doctor
```

Command groups:
- `start`: interactive quick-start menu
- `setup`: ledger auth + API key + optional HBAR credit purchase
- `doctor`: environment and package diagnostics
- `init`: scaffold `SKILL.md` and `skill.json`
- `validate`: local package validation only
- `quote`: remote quote without creating a publish job
- `publish`: quote + publish + job completion flow

## GitHub Action workflow (`hashgraph-online/skill-publish@v1`)

Use release-triggered CI publishing:

```yaml
name: Publish Skill

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
      - name: Publish skill package
        uses: hashgraph-online/skill-publish@v1
        with:
          api-key: ${{ secrets.RB_API_KEY }}
          skill-dir: skills/my-skill
          annotate: "true"
          github-token: ${{ github.token }}
```

### Action inputs and behavior

Common inputs:
- `api-key` (required)
- `skill-dir` (required)
- `api-base-url` (optional; defaults to `https://hol.org/registry/api/v1`)
- `name`, `version` (optional overrides)
- `poll-timeout-ms`, `poll-interval-ms` (optional job polling tuning)

Idempotency:
- if `name@version` already exists, publish is skipped and returns `published=false` with `skip-reason=version-exists`

## Local vs CI guidance

Use local CLI when:
- developing and validating package content quickly
- bootstrapping API keys with ledger auth
- diagnosing environment issues via `doctor`

Use GitHub Action when:
- publishing tagged/released versions in CI
- annotating release notes and PR context automatically
- standardizing publish jobs across contributors

## Related docs

- [Skills Upload & Discovery](skills-upload-discovery.md)
- [Ledger Authentication & Credits](ledger-auth-credits.md)
- [Registry Broker Client API](/docs/registry-broker/api/client#skill-registry)
