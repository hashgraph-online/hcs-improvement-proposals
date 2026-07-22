---
title: GitHub command classification
sidebar_position: 7
---

# GitHub command classification

Every `gh` (GitHub CLI) invocation is classified *before* shell pipeline formatting. Guard uses a positive allowlist: only commands whose complete remote capability is statically proven read-only are prompt-free.

## How it works

Guard inspects the `gh` command and its arguments, resolves any shell pipeline stages, and assigns a capability classification:

1. **Parse** the `gh` command and its arguments
2. **Classify** the capability (read-only, mutating, unverified)
3. **Evaluate pipeline** — output formatting doesn't downgrade the producer
4. **Decide** — allow if proven read-only, require approval otherwise

## Capability classes

| Class | Examples | Decision |
|---|---|---|
| Local metadata | `gh --version`, `gh --help`, `gh completion` | Allow |
| Proven remote read | `gh pr view`, `gh issue list`, `gh api GET /repos/...` | Allow |
| Local config write | `gh config set`, `gh auth login` | Require approval |
| Content mutation | `gh pr create`, `gh issue close`, `gh pr edit` | Require approval |
| Merge | `gh pr merge` | Require approval |
| Publication | `gh release create`, `gh repo create` | Require approval |
| Workflow dispatch | `gh workflow run` | Require approval |
| Force/delete | `gh repo delete`, `git push --force` via `gh` | Require approval |
| Secret access | `gh secret set`, `gh secret list` | Require approval |
| Unverified | extensions, aliases, dynamic mutation targets | Require approval |

## Pipeline composition

Output formatting doesn't downgrade the producer. A known mutation still requires approval even when piped through `jq`. A proven read stays prompt-free when downstream stages are reviewed formatters.

```bash
# This is allowed — proven read piped through a formatter
gh pr view 123 --json title,state | jq '.title'

# This requires approval — mutation piped through a formatter
gh pr close 123 | jq '.'
```

## Compound Git inspections

Guard recognizes deterministic `cd` + Git inspection chains as low-risk:

```bash
# Allowed — safe inspection chain
cd /project && git fetch origin && git log --oneline -5

# Requires approval — contains a mutation
cd /project && git fetch origin && git push --force
```

Safe operations in compound chains: `git fetch` (refs only), bounded `git log`, `git status`, `git branch`, `git rev-parse`, `git diff`/`git ls-files`/`git show` with limited arguments.

## Workflow authorization

GitHub Actions workflows can be authorized via signed workflow claims. This enables workflow-authorized bounded maintenance (like CI-triggered deployments) without per-approval prompts.

Workflow authorization is claimed at hook time and validated against the signed claim. The claim includes the workflow identity, repository, and permitted operation scope.
