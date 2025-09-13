---
sidebar_position: 7
---

# Troubleshooting

- Invalid Hedera CAIP‑10
  - Ensure `hedera:<network>:<shard.realm.num[-alias]>` format; use `toHederaCaip10()`.

- Invalid DID format
  - UAID wrapping requires a valid `did:*` or `uaid:aid:*` input.

- nativeId required
  - AID hashing requires `nativeId` in canonical inputs; for Hedera/EVM, build via CAIP helpers.

- Empty resolution
  - Register a resolver and provide enough context (`proto`, `nativeId`, and/or `src`).

# Security Notes

- Do not include secrets in canonical data.
- Store Hedera private keys in environment variables.
- UAIDs are stable identifiers; use profiles (HCS‑11, A2A) for mutable metadata.

