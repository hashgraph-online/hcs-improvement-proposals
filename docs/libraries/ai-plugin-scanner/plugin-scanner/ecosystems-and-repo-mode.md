---
title: Ecosystems and repository mode
sidebar_position: 6
---

# Ecosystems and repository mode

`plugin-scanner` can work against one plugin package or auto-detect multiple supported ecosystems inside a repository root.

## Supported ecosystems

| Ecosystem | Detection surfaces |
| :--- | :--- |
| Codex | `.codex-plugin/plugin.json`, `marketplace.json`, `.agents/plugins/marketplace.json` |
| Claude Code | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` |
| Gemini CLI | `gemini-extension.json`, `commands/**/*.toml` |
| OpenCode | `opencode.json`, `opencode.jsonc`, `.opencode/commands`, `.opencode/plugins` |

Use `--ecosystem auto` to scan all detected packages in a repository, or select a single ecosystem explicitly when you only want one family.

## Repository mode

Repository mode matters most for marketplace roots:

```bash
plugin-scanner scan . --format json
plugin-scanner lint . --format json
plugin-scanner verify . --format json
plugin-scanner doctor . --component mcp --bundle dist/doctor.zip
```

If your repository uses a Codex marketplace root like `.agents/plugins/marketplace.json`, keep `plugin_dir: "."`. The scanner will discover local `./plugins/...` entries automatically, scan each local plugin manifest, and skip remote marketplace entries instead of treating the repository root as one plugin.

## Codex packaging alignment

The scanner follows the current Codex packaging conventions more closely:

- local manifest paths should use `./` prefixes
- `.agents/plugins/marketplace.json` is the preferred marketplace manifest location
- root `marketplace.json` is still supported in compatibility mode
- `interface` metadata no longer requires an undocumented `type` field
- `verify` performs an MCP initialize handshake before probing declared capabilities

`submit` remains intentionally single-plugin so the emitted artifact always points at one concrete plugin package.

## Useful discovery commands

```bash
plugin-scanner --list-ecosystems
plugin-scanner . --ecosystem auto
plugin-scanner . --ecosystem claude
```

## Next guides

- [Scanner quick start](./quick-start.md)
- [Quality suite commands](./quality-suite-commands.md)
- [GitHub Action quality gate](./github-action.md)
