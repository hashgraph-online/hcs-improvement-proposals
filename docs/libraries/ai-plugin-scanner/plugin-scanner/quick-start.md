---
title: Scanner quick start
sidebar_position: 5
---

# Scanner quick start

`plugin-scanner` is the maintainer and CI-facing quality suite inside `hashgraph-online/ai-plugin-scanner`.

Use it after a plugin is scaffolded and before release, registry ingestion, or GitHub review.

## Install

```bash
pip install plugin-scanner
```

For isolated shells:

```bash
pipx install plugin-scanner
```

Optional Cisco-backed MCP analysis is available on supported Python versions:

```bash
pip install "plugin-scanner[cisco]"
```

## First pass

```bash
plugin-scanner lint .
plugin-scanner verify .
plugin-scanner scan . --format json
```

Add online probing when you want runtime endpoint validation:

```bash
plugin-scanner verify . --online
```

Use `doctor` when you want targeted diagnostics and a bundle you can attach to support or CI output:

```bash
plugin-scanner doctor . --component mcp --bundle dist/doctor.zip
```

## Supported ecosystems

```bash
plugin-scanner --list-ecosystems
```

Current built-in ecosystem adapters:

- Codex
- Claude Code
- Gemini CLI
- OpenCode

Detection surfaces:

| Ecosystem | Detection surfaces |
| :--- | :--- |
| Codex | `.codex-plugin/plugin.json`, `marketplace.json`, `.agents/plugins/marketplace.json` |
| Claude Code | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` |
| Gemini CLI | `gemini-extension.json`, `commands/**/*.toml` |
| OpenCode | `opencode.json`, `opencode.jsonc`, `.opencode/commands`, `.opencode/plugins` |

## Core commands

| Command | Purpose |
| :--- | :--- |
| `scan` | weighted repository or plugin scan with policy evaluation |
| `lint` | rule-level findings, `--list-rules`, `--explain`, and safe autofix support |
| `verify` | runtime and install-surface readiness checks, with optional `--online` probing |
| `submit` | scan + verify + policy gate that emits a plugin-quality artifact |
| `doctor` | targeted diagnostics and troubleshooting bundles |

## Repository mode

If your repository uses a Codex marketplace root like `.agents/plugins/marketplace.json`, keep `plugin_dir: "."`. The scanner will discover local `./plugins/...` entries automatically, scan each local plugin manifest, and skip remote marketplace entries instead of treating the repository root as one plugin.

## What it checks

`plugin-scanner` currently covers:

- plugin manifests and marketplace metadata
- MCP stdio and remote HTTP verification
- skills, assets, and `.app.json` surfaces
- security posture such as secrets, dangerous commands, action pinning, and lockfiles
- trust provenance for skills, MCP configuration, and top-level plugin packages

## Next guides

- [Policies, output, and trust provenance](./policies-and-output.md)
- [GitHub Action quality gate](./github-action.md)
- [Guard get started](../guard/get-started.md)
