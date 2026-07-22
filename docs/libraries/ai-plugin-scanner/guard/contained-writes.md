---
title: Contained writes
sidebar_position: 9
---

# Contained writes

Contained writes execute one exact workspace write inside a sandbox with deny-by-default containment. Guard verifies the operation targets only the specified files and blocks any attempt to access outside the sandbox.

## How it works

1. **Declare** — the operation specifies exactly which files will be read and written
2. **Sandbox** — Guard launches the operation in a restricted environment (macOS Sandbox or Linux bwrap)
3. **Enforce** — any attempt to access files outside the declared set is blocked at the kernel level
4. **Verify** — the result is checked against the expected output

## Sandbox backends

| Platform | Backend | How |
|---|---|---|
| macOS | `sandbox-exec` | Seatbelt profile with deny-by-default file access |
| Linux | `bwrap` (bubblewrap) | Mount namespace isolation with read-only root |

Both backends enforce: the sandboxed process can only read declared inputs and write declared outputs. Network access is blocked. Process spawning is restricted.

## Supported operations

### Patch check

Verify a patch file applies cleanly without actually modifying files:

```bash
hol-guard contained-write patch-check changes.patch
```

### Patch apply

Apply a patch file to declared target files:

```bash
hol-guard contained-write patch-apply changes.patch
```

### Format

Run a formatter on declared files (e.g., prettier, black):

```bash
hol-guard contained-write format src/index.ts src/utils.ts
```

### Copy generated

Copy a generated artifact to a declared destination:

```bash
hol-guard contained-write copy-generated dist/bundle.js public/bundle.js
```

## Why contained writes matter

AI agents frequently need to write files — applying patches, running formatters, copying generated output. Without containment, a "format this file" command could silently exfiltrate data or modify unintended files.

Contained writes prove that the write operation did exactly what was declared — nothing more. This lets Guard allow safe write operations without requiring per-file approval.
