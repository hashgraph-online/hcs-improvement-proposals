---
title: Quality suite commands
sidebar_position: 7
---

# Quality suite commands

`plugin-scanner` ships five main maintainer and CI commands. Each one answers a different release question.

## `scan`

Use `scan` when you want the weighted summary view:

```bash
plugin-scanner scan ./my-plugin --format json --profile public-marketplace
plugin-scanner scan . --format json
```

`scan` evaluates only the surfaces a plugin actually exposes, then normalizes the final score across applicable checks.

## `lint`

Use `lint` when you want rule-oriented authoring feedback:

```bash
plugin-scanner lint ./my-plugin --list-rules
plugin-scanner lint ./my-plugin --explain README_MISSING
plugin-scanner lint ./my-plugin --fix --profile strict-security
```

## `verify`

Use `verify` when you want runtime or install-surface readiness checks:

```bash
plugin-scanner verify ./my-plugin --format json
plugin-scanner verify . --format json
plugin-scanner verify ./my-plugin --online --format text
```

## `submit`

Use `submit` when you want one artifact-backed gate before release or ecosystem intake:

```bash
plugin-scanner submit ./my-plugin --profile public-marketplace --attest dist/plugin-quality.json
```

`submit` stays single-plugin on purpose so the emitted quality artifact points at one concrete package.

## `doctor`

Use `doctor` when you want targeted diagnostics or a troubleshooting bundle:

```bash
plugin-scanner doctor ./my-plugin --component mcp --bundle dist/doctor.zip
```

## When to use which command

| Command | Best use |
| :--- | :--- |
| `scan` | weighted release summary and policy evaluation |
| `lint` | authoring feedback and safe mechanical fixes |
| `verify` | runtime readiness and install-surface checks |
| `submit` | artifact-backed release or submission gate |
| `doctor` | targeted diagnostics and support bundles |

## Next guides

- [Ecosystems and repository mode](./ecosystems-and-repo-mode.md)
- [Policies, output, and trust provenance](./policies-and-output.md)
- [Submission and registry payloads](./submission-and-registry-payloads.md)
