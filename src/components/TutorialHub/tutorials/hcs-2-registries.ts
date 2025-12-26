import type { Tutorial } from '../types';

export const hcs2RegistriesTutorial: Tutorial = {
  id: "hcs-2-registries",
  title: "HCS-2 Topic Registries",
  subtitle: "Indexed Registry Graphs",
  videoId: "placeholder_hcs2",
  duration: "Video",
  difficulty: "Intermediate",
  prerequisites: ["HCS-1", "Standards SDK"],
  description:
    "HCS-2 defines registry topics that index other HCS topics with structured operations. In this lab you will create indexed and non-indexed registries, register entries with metadata pointers, update or delete entries, and read back registry state from the mirror node.",
  learningPoints: [
    "Create indexed and non-indexed HCS-2 registries",
    "Register entries with topic IDs and HCS-1 metadata pointers",
    "Update and delete registry entries using UIDs",
    "Query registry state and inspect latest entries",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'create-registry.ts',
      content: `import 'dotenv/config';
import { HCS2Client, HCS2RegistryType, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-2' });

const hcs2 = new HCS2Client({
  network,
  operatorId,
  operatorKey
});

const result = await hcs2.createRegistry({
  registryType: HCS2RegistryType.INDEXED,
  ttl: 86400
});

if (!result.success || !result.topicId) {
  throw new Error(result.error || 'Failed to create registry');
}

logger.info('Registry created', result);`,
    },
    {
      language: 'typescript',
      filename: 'register-entry.ts',
      content: `import 'dotenv/config';
import { HCS2Client, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const registryTopicId = required('HCS2_REGISTRY_TOPIC_ID', process.env.HCS2_REGISTRY_TOPIC_ID);
const targetTopicId = required('TARGET_TOPIC_ID', process.env.TARGET_TOPIC_ID);
const metadata = required('HCS1_METADATA_POINTER', process.env.HCS1_METADATA_POINTER);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-2' });

const hcs2 = new HCS2Client({
  network,
  operatorId,
  operatorKey
});

const response = await hcs2.registerEntry(registryTopicId, {
  targetTopicId,
  metadata,
  memo: 'register entry'
});

if (!response.success) {
  throw new Error(response.error || 'Registry entry failed');
}

logger.info('Entry registered', { sequenceNumber: response.sequenceNumber });`,
    },
    {
      language: 'typescript',
      filename: 'update-delete.ts',
      content: `import 'dotenv/config';
import { HCS2Client, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const registryTopicId = required('HCS2_REGISTRY_TOPIC_ID', process.env.HCS2_REGISTRY_TOPIC_ID);
const entryUid = required('HCS2_ENTRY_UID', process.env.HCS2_ENTRY_UID);
const nextTopicId = required('NEXT_TOPIC_ID', process.env.NEXT_TOPIC_ID);
const metadata = required('UPDATED_METADATA_POINTER', process.env.UPDATED_METADATA_POINTER);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-2' });

const hcs2 = new HCS2Client({
  network,
  operatorId,
  operatorKey
});

const update = await hcs2.updateEntry(registryTopicId, {
  uid: entryUid,
  targetTopicId: nextTopicId,
  metadata,
  memo: 'update entry'
});

if (!update.success) {
  throw new Error(update.error || 'Update failed');
}

const deletion = await hcs2.deleteEntry(registryTopicId, {
  uid: entryUid,
  memo: 'delete entry'
});

if (!deletion.success) {
  throw new Error(deletion.error || 'Delete failed');
}

logger.info('Updated then deleted entry', {
  updateSequence: update.sequenceNumber,
  deleteSequence: deletion.sequenceNumber
});`,
    },
    {
      language: 'typescript',
      filename: 'read-registry.ts',
      content: `import 'dotenv/config';
import { HCS2Client, Logger } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const operatorId = required('HEDERA_OPERATOR_ID', process.env.HEDERA_OPERATOR_ID);
const operatorKey = required('HEDERA_OPERATOR_KEY', process.env.HEDERA_OPERATOR_KEY);
const registryTopicId = required('HCS2_REGISTRY_TOPIC_ID', process.env.HCS2_REGISTRY_TOPIC_ID);
const network = process.env.HEDERA_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
const logger = Logger.getInstance({ module: 'HCS-2' });

const hcs2 = new HCS2Client({
  network,
  operatorId,
  operatorKey
});

const registry = await hcs2.getRegistry(registryTopicId, {
  limit: 25,
  order: 'desc'
});

logger.info('Registry summary', {
  entries: registry.entries.length,
  latest: registry.latestEntry?.message
});`,
    },
  ],
  resources: [
    { label: "HCS-2 Spec", url: "/docs/standards/hcs-2" },
    { label: "HCS-2 SDK Overview", url: "/docs/libraries/standards-sdk/hcs-2/overview" },
    { label: "HCS-2 SDK API", url: "/docs/libraries/standards-sdk/hcs-2/api" },
    { label: "HCS-2 Transactions", url: "/docs/libraries/standards-sdk/hcs-2/tx" },
    { label: "HCS-1 Spec", url: "/docs/standards/hcs-1" },
  ],
};
