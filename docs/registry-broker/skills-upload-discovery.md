---
title: Skills Upload & Discovery
description: Publish HCS-26 skills with the Registry Broker and discover versions through skill registry endpoints.
---

# Skills Upload & Discovery

Use the Registry Broker skill endpoints to publish `SKILL.md` + `skill.json` packages, then discover releases by name, version, and ownership.

## Publish a skill package

The SDK exposes a quote → publish → job-status flow:

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: 'http://localhost:4000',
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
  --base-url=http://localhost:4000 \
  --ledger-network=testnet \
  --skill-dir=/path/to/skill-package \
  --name=my-skill \
  --version=1.0.0
```

Flags:
- `--base-url`: broker origin (`http://localhost:4000`, `https://registry-staging.hol.org/registry`, etc.)
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

## HTTP routes

The client methods map to:
- `GET /api/v1/skills`
- `GET /api/v1/skills/versions`
- `GET /api/v1/skills/mine`
- `GET /api/v1/skills/my-list`
- `POST /api/v1/skills/quote`
- `POST /api/v1/skills/publish`
- `GET /api/v1/skills/jobs/:jobId`

For schema details and response types, see the [Registry Broker Client API](/docs/registry-broker/api/client).
