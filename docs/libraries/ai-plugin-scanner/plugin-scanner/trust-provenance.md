---
title: Trust provenance guide
sidebar_position: 7
---

# Trust provenance guide

`plugin-scanner` emits explicit trust provenance alongside quality grades so maintainers can see why a package is trusted, not just whether it passed.

## Why provenance is separate from the quality grade

The scanner treats quality and trust as different signals:

- quality summarizes lint, verify, scan, and policy readiness
- trust provenance summarizes the evidence model behind skills, MCP config, and top-level plugin packages

That split keeps a package from looking "safe" just because its metadata is tidy, and it keeps trust evidence explainable in CI output.

## Bundled skills

Bundled skills use the published HCS-28 baseline adapter catalog directly.

The scanner follows the HCS-28 model for:

- adapter IDs
- weights
- contribution modes
- denominator rules

The local bundled-skill mode keeps the HCS-28 aggregation shape while substituting local evidence for external refresh-only signals where possible.

## MCP configuration trust

MCP configuration trust uses the same HCS-style adapter and contribution-mode pattern locally.

That keeps MCP trust aligned with the broader provenance model instead of inventing a separate scoring language just for local config.

## Top-level plugin trust

Top-level plugin trust follows the same explicit structure:

- named adapters
- explicit weights
- deterministic denominator rules
- conditional adapters only when a surface is actually present

This is why security disclosure, action pinning, manifest integrity, and provenance all remain visible as separate contributors instead of disappearing into one opaque total.

## Local draft sources

The detailed local drafts still live in the upstream `ai-plugin-scanner` repository:

- [Skill Trust Local Draft](https://github.com/hashgraph-online/ai-plugin-scanner/blob/main/docs/trust/skill-trust-local.md)
- [MCP Trust Draft](https://github.com/hashgraph-online/ai-plugin-scanner/blob/main/docs/trust/mcp-trust-draft.md)
- [Plugin Trust Draft](https://github.com/hashgraph-online/ai-plugin-scanner/blob/main/docs/trust/plugin-trust-draft.md)

Use those when you need the exact adapter tables or local draft wording. Use this guide when you want the documentation-site explanation of how the scanner surfaces provenance.
