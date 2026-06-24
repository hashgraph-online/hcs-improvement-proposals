---
title: Policy presets
sidebar_position: 10
---

# Policy presets

Policy presets are bundled rule sets that cover common security scenarios. Apply a preset to quickly configure your Guard workspace without building rules from scratch.

## Available presets

| Preset | Description |
| :--- | :--- |
| Strict | Block all tools that are not on an explicit allowlist. Best for regulated environments. |
| Balanced | Allow known-safe tools, block known-malicious ones, and flag unknowns for review. |
| Permissive | Allow all tools except those on a blocklist. Best for development environments. |

## Applying a preset

1. Open [Guard policy presets](https://hol.org/guard/policies).
2. Select a preset that matches your risk tolerance.
3. Review the rules included in the preset.
4. Select **Apply preset** to activate it.

You can customize any preset after applying it. Changes do not affect the original preset definition.

## Customizing presets

After applying a preset, you can:

- Add or remove individual rules
- Adjust severity thresholds
- Add exceptions for specific tools or publishers
- Configure bypass windows for approved changes

## See it in product

- [Guard policy presets](https://hol.org/guard/policies)
- [Guard alerts](https://hol.org/guard/alerts)

## Next guides

- [Conditions](../routing/conditions.md)
- [Controls](../routing/controls.md)
