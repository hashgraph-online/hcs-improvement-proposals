---
title: Bulk Inscriptions (bulk-files)
description: Inscribe many independent files in a single job using the bulk-files mode.
---

# Bulk Inscriptions (bulk-files)

`bulk-files` is an inscription mode designed for multi-file packages where each file should be inscribed as its own standalone HCS-1 topic (as opposed to Hashinals, where media + JSON metadata are paired).

This is the mode used by Registry Broker skill publishing to inscribe a whole skill package (often 20+ files) efficiently.

## When to use bulk-files

- HCS-26 skill packages that contain multiple artifacts (docs, schemas, code samples, etc.)
- Any workflow where you want one job submission, but you need one topic per file
- A two-step flow where you first inscribe the files, then inscribe a manifest that references them (for example `skill.json`)

## How it works

1. Create a ZIP that contains the files you want to inscribe.
2. Call `inscribe(...)` with `mode: 'bulk-files'` and `mimeType: 'application/zip'`.
3. The inscription service unpacks the ZIP and inscribes each file separately.
4. The completed job includes a per-file result list in `inscription.files.bulkUploads`.

Each `bulkUploads[]` entry typically includes:
- `name`: file path in the ZIP
- `topicId`: topic created for that file's inscription
- `uri`: HRL-like identifier (often `hcs://1/<topicId>`)
- `mimeType`, `hash`, and message counters when available

## Standards SDK example

```ts
import fs from 'node:fs';
import { inscribe } from '@hashgraphonline/standards-sdk';

const zipBuffer = fs.readFileSync('./my-skill-package.zip');

const res = await inscribe(
  {
    type: 'buffer',
    buffer: zipBuffer,
    fileName: 'my-skill-package.zip',
    mimeType: 'application/zip',
  },
  {
    accountId: '0.0.1234',
    privateKey: process.env.HEDERA_PRIVATE_KEY as string,
    network: 'testnet',
  },
  {
    mode: 'bulk-files',
    waitForConfirmation: true,
    metadata: {
      type: 'my-bulk-package',
      fileCount: 20,
    },
  },
);

const bulkUploads = res.inscription?.files?.bulkUploads ?? [];
for (const upload of bulkUploads) {
  console.log(upload?.name, upload?.topicId, upload?.uri);
}
```

## Registry Broker skill publishing

If you publish skills through the Registry Broker, you do not call `inscribe(...)` directly from your frontend. The client posts a publish job to the broker and the broker performs the bulk inscription server-side.

```ts
import { RegistryBrokerClient } from '@hashgraphonline/standards-sdk';

const client = new RegistryBrokerClient({
  baseUrl: 'https://hol.org/registry/api/v1',
});

await client.authenticateWithLedgerCredentials({
  accountId: '0.0.1234',
  network: 'hedera:testnet',
  hederaPrivateKey: process.env.HEDERA_PRIVATE_KEY,
});

const files = [
  {
    name: 'SKILL.md',
    mimeType: 'text/markdown',
    base64: Buffer.from('# My Awesome Skill\n\nThis skill does awesome things.').toString('base64'),
  },
  {
    name: 'skill.json',
    mimeType: 'application/json',
    base64: Buffer.from(JSON.stringify({ name: 'my-awesome-skill', version: '1.0.0' })).toString('base64'),
  },
  // ... and other files
];

const quote = await client.quoteSkillPublish({ accountId: '0.0.1234', files });
const publish = await client.publishSkill({
  accountId: '0.0.1234',
  quoteId: quote.quoteId,
  files,
});

const job = await client.getSkillPublishJob(publish.jobId, { accountId: '0.0.1234' });
console.log(job.status);
```

Internally, the broker:
- Inscribes the full file set as one ZIP using `mode: 'bulk-files'`, producing one topic per file.
- Builds the HCS-26 manifest (`skill.json` + file HRLs) and inscribes that separately so the manifest can reference the file topics.

For more context on skill publishing, see [Skills Upload & Discovery](skills-upload-discovery.md).

