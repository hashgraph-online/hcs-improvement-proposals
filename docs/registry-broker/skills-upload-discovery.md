---
title: Skills Upload & Discovery
description: Publish HCS-26 skills with the Registry Broker and discover versions through skill registry endpoints.
---

# Skills Upload & Discovery

Use the Registry Broker skill endpoints to publish `SKILL.md` + `skill.json` packages, then discover releases by name, version, and ownership.

Prefer [`npx skill-publish`](skill-publish-cli-action.md) for day-to-day publishing DX and use the raw SDK flow below when you need direct control over payload construction.

## Publish a skill package

The SDK exposes a quote → publish → job-status flow:

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: 'http://127.0.0.1:4000',
  apiKey: process.env.REGISTRY_BROKER_API_KEY,
});

const files = [
  {
    name: 'SKILL.md',
    mimeType: 'text/markdown',
    base64: Buffer.from('# Demo Skill\n').toString('base64'),
  },
  {
    name: 'skill.json',
    mimeType: 'application/json',
    base64: Buffer.from(
      JSON.stringify({
        name: 'demo-skill',
        version: '1.0.0',
        description: 'Demo publish flow',
      }),
    ).toString('base64'),
  },
];

const quote = await client.quoteSkillPublish({
  accountId: '0.0.1234',
  files,
});

const publish = await client.publishSkill({
  accountId: '0.0.1234',
  quoteId: quote.quoteId,
  files,
});

const job = await client.getSkillPublishJob(publish.jobId, {
  accountId: '0.0.1234',
});

console.log(job.status);
```

Required files:
- `SKILL.md`
- `skill.json`

Optional files can be included in the same `files` array and are inscribed as package artifacts.

## Simplified local demo script

`standards-sdk` includes a single-skill publish demo for local or remote brokers:

```bash
pnpm -C standards-sdk exec tsx demo/registry-broker/skill-registry-publish-demo.ts \
  --base-url=http://127.0.0.1:4000 \
  --ledger-network=testnet \
  --skill-dir=/path/to/skill-package \
  --name=my-skill \
  --version=1.0.0
```

Flags:
- `--base-url`: broker origin (`http://127.0.0.1:4000`, `https://registry-staging.hol.org/registry`, etc.)
- `--ledger-network`: ledger network for demo auth (`testnet` or `mainnet`)
- `--skill-dir`: directory containing `SKILL.md` and `skill.json`
- `--name`, `--version`: optional overrides applied to `skill.json` at runtime
- `--quote-only`: only request a quote
- `--fast`: skip HCS-26 post-publish verification

## Discover published skills

Use `listSkills` for browsing and detail pages:

```ts
const list = await client.listSkills({
  name: 'demo-skill',
  version: '1.0.0',
  includeFiles: true,
  limit: 10,
});
```

List all versions for a skill name:

```ts
const versions = await client.listSkillVersions({ name: 'demo-skill' });
```

List skills owned by the authenticated account:

```ts
const mine = await client.listMySkills({ limit: 25 });
```

List account-curated “My Skills List” entries:

```ts
const myList = await client.getMySkillsList({ limit: 25 });
```

## Generate skill badges

Use the badge endpoint with Shields to display live skill metadata in README files and docs:

```ts
const endpointUrl =
  'https://hol.org/registry/api/v1/skills/badge?name=demo-skill&metric=version&style=flat';

const imageUrl = `https://img.shields.io/endpoint?url=${encodeURIComponent(endpointUrl)}`;
```

Supported metrics: `version`, `status`, `trust`, `upvotes`, `updated`, `repo_commit`, `manifest`, `domain`.

For complete examples and embed snippets, see [Skill Badges](skill-badges.md).

## Trust metric normalization specification

Numeric trust signals for skills MUST be scored relative to peer skills in the same evaluation cohort (same broker environment and skill dataset), not by fixed absolute thresholds.

Required normalization behavior:
- Numeric raw values MUST be transformed to cohort-relative percentiles using a bell-curve model.
- Heavy-tailed counts (for example stars, watchers, upvotes) SHOULD use `log1p` before normalization.
- Implementations MUST compute `z = (x - mean) / stddev` and convert to percentile via standard normal CDF.
- Percentiles MUST be mapped to score range `0..100`.
- For inverse metrics where lower is better (for example recency-in-days, issue ratio), implementations MUST invert the percentile (`1 - CDF(z)`).
- When cohort size is too small for stable statistics, implementations MUST return a neutral score (recommended: `50`) instead of applying hardcoded thresholds.

Non-compliant pattern:
- Mapping fixed raw cutoffs directly to scores (for example `1000+ stars => 100`).

## Domain proof (DNS TXT)

Skill verification supports DNS TXT domain proof per skill version.

```ts
const challenge = await client.createSkillDomainProofChallenge({
  name: 'demo-skill',
  version: '1.0.0',
  domain: 'example.com', // optional; homepage domain is used when omitted
});

console.log(challenge.txtRecordName, challenge.txtRecordValue);
// Publish challenge.txtRecordValue at challenge.txtRecordName.

const challengeToken = challenge.txtRecordValue.replace(/^hol-skill-verification=/, '');

const verify = await client.verifySkillDomainProof({
  name: 'demo-skill',
  version: '1.0.0',
  domain: 'example.com',
  challengeToken,
});

console.log(verify.signal.ok);
```

## HTTP routes

The client methods map to:
- `GET /api/v1/skills/config`
- `GET /api/v1/skills`
- `GET /api/v1/skills/badge`
- `GET /api/v1/skills/versions`
- `GET /api/v1/skills/mine`
- `GET /api/v1/skills/my-list`
- `GET /api/v1/skills/ownership`
- `GET /api/v1/skills/vote`
- `POST /api/v1/skills/quote`
- `POST /api/v1/skills/publish`
- `GET /api/v1/skills/jobs/:jobId`
- `POST /api/v1/skills/vote`
- `POST /api/v1/skills/verification/request`
- `GET /api/v1/skills/verification/status`
- `POST /api/v1/skills/verification/domain/challenge`
- `POST /api/v1/skills/verification/domain/verify`

For schema details, response types, and complete skill method coverage (`quoteSkillPublish`, `publishSkill`, `getSkillPublishJob`, discovery, ownership, voting, and verification), see the [Registry Broker Client API: Skill Registry](/docs/registry-broker/api/client#skill-registry).
