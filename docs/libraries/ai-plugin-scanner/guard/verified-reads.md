---
title: Verified reads
sidebar_position: 8
---

# Verified reads

Guard can independently verify that certain reads are safe — public GitHub pull requests and local files — without asking the harness for approval. This works when Guard can statically prove the read accesses only public, non-sensitive data.

## How it works

When a harness requests to read a public GitHub PR or a local file, Guard intercepts the request and evaluates it independently:

1. **Intercept** — the harness's read request is caught by Guard's hook
2. **Evaluate** — Guard checks if the target is provably public/safe
3. **Verify** — if safe, Guard reads the content itself and returns it to the harness
4. **Bypass** — the harness never sees an approval prompt for verified reads

This means agents can read public PRs and safe local files without interruption, while sensitive reads (`.env`, private repos, config with secrets) still require approval.

## GitHub PR reads

```bash
hol-guard verified-read github-pr \
  --owner hashgraph-online \
  --repository hol-guard \
  --number 1836 \
  --field title state body
```

Guard fetches the PR data directly from the GitHub API, verifies it's a public repository, and returns only the requested fields. If the repository is private or the PR doesn't exist, the read is not verified and falls through to normal approval.

## Local file reads

```bash
hol-guard verified-read local cat README.md
```

Guard checks the file path against its allowlist — public directories, non-sensitive file types — and reads the content directly. Files matching secret patterns (`.env`, `.pem`, `.key`, credentials) are never verified.

## What gets verified

| Target | Verified when |
|---|---|
| Public GitHub PR | Repository is public, PR exists, requested fields are non-sensitive |
| Local file | File is in an allowed directory, extension isn't sensitive, content doesn't match secret patterns |
| Private GitHub PR | Never verified — requires approval |
| Secrets/keys | Never verified — requires approval |

## Command activity integration

Every verified read is recorded in command activity with proof level `static_proof` — showing that Guard verified the read without harness intervention. This provides audit trail evidence that the read was safe without exposing matcher internals.
