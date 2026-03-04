---
title: Skill Safety Scanning
description: Static safety scanning and script permission declarations for HCS-26 skills published via the Registry Broker.
---

# Skill Safety Scanning

HCS-26 skill packages may include scripts under `scripts/`. To reduce the risk of publishing skills that contain dangerous or deceptive behavior, the Registry Broker performs a static safety scan during publish and requires explicit script permission declarations in `skill.json`.

This feature provides:

- A **static safety scan** of `scripts/` contents during publish.
- A **declared permissions model** for each script file.
- A **safety label** and score surfaced in the skill index (`/api/v1/skills`) and in skill badges (`metric=safety`).

## Declaring script permissions

If your skill package includes any files under `scripts/`, you must declare permissions for every script path in `skill.json`.

Preferred format:

```ts
{
  "name": "demo-skill",
  "version": "1.0.0",
  "permissions": {
    "scripts": {
      "scripts/install.sh": { "network": false, "filesystem": "read-only" },
      "scripts/publish.ts": { "network": true, "filesystem": "read-write" }
    }
  }
}
```

Supported permission fields:

- `network`: `true | false`
- `filesystem`: `"read-only" | "read-write"`

Legacy compatibility:

```ts
{
  "name": "demo-skill",
  "version": "1.0.0",
  "scriptPermissions": {
    "scripts/install.sh": { "network": false, "filesystem": "read-only" }
  }
}
```

If any `scripts/` file is missing a permission declaration, the publish request fails.

## Static safety scan (publish-time)

During publish, the broker scans text-like files under `scripts/` for suspicious patterns such as:

- Download-and-execute (`curl|wget | sh|bash`)
- Obvious destructive commands (`rm -rf`, `mkfs.*`)
- Credential harvesting indicators (for example SSH key references)
- Potential environment exfiltration patterns (for example `env` / `printenv` combined with outbound HTTP)

The scan does not execute scripts. It produces:

- `safety.score` (0-100)
- `safety.label` (`safe | review | caution | unsafe`)
- `safetyFindings[]` (rule id, severity, file path, message) when `includeFiles=true` is used on the skill query endpoint

## API surface area

Skill list / detail responses include the safety summary:

- `GET /api/v1/skills` returns `items[].safety`
- `GET /api/v1/skills?includeFiles=true` may also include `items[].safetyFindings`

Skill badge endpoint supports `metric=safety`:

- `GET /api/v1/skills/badge?name=<skill-slug>&metric=safety`

## Trust adapter integration

The broker exposes safety as a trust signal. When present, it contributes to the computed trust breakdown under:

- `trustScores["safety.score"]`

If a skill does not include `safety`, the broker treats the safety trust component as `0`.
