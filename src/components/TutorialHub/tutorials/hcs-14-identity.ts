import type { Tutorial } from '../types';

export const hcs14IdentityTutorial: Tutorial = {
  id: "hcs-14-identity",
  title: "HCS-14 Identity",
  subtitle: "Universal Agent IDs",
  videoId: "VgGeSgJWHAM",
  duration: "15:00",
  difficulty: "Intermediate",
  prerequisites: ["Standards SDK", "HCS-11 Profiles"],
  description:
    "HCS-14 defines UAIDs that unify AID and DID forms into a single routing identifier for agents. You will generate deterministic AIDs from canonical agent data, parse routing parameters, issue Hedera-backed DIDs, and resolve UAIDs through the built-in resolver registry.",
  learningPoints: [
    "Understand HCS-14 DID structure (uaid:aid vs uaid:did)",
    "Generate deterministic AIDs from canonical agent data",
    "Issue Hedera-backed DIDs and wrap them as UAIDs",
    "Parse UAID routing parameters for protocol selection",
    "Resolve UAIDs to DID documents through resolvers",
  ],
  code: [
    {
      language: 'typescript',
      filename: 'aid-generate.ts',
      content: `import { createUaid } from '@hashgraphonline/standards-sdk';

const input = {
  registry: 'hashgraph-online',
  name: 'DeFi Analyst',
  version: '1.0.0',
  protocol: 'hcs-10',
  nativeId: 'hedera:testnet:0.0.123456',
  skills: [0, 10]
};

const main = async () => {
  const uaid = await createUaid(input);
  console.log(uaid);
};

void main();`,
    },
    {
      language: 'typescript',
      filename: 'issue-and-uaid.ts',
      content: `import 'dotenv/config';
import { Client } from '@hashgraph/sdk';
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const network =
  (process.env.HEDERA_NETWORK || 'testnet') === 'mainnet'
    ? 'mainnet'
    : 'testnet';
const operatorId = required('HEDERA_ACCOUNT_ID', process.env.HEDERA_ACCOUNT_ID);
const privateKey = required('HEDERA_PRIVATE_KEY', process.env.HEDERA_PRIVATE_KEY);

const hcs14 = new HCS14Client({
  network,
  operatorId,
  privateKey
});

const hederaClient = Client.forName(network);
hederaClient.setOperator(operatorId, privateKey);

const { did, uaid, parsed } = await hcs14.createDidWithUaid({
  issue: { method: 'hedera', client: hederaClient },
  proto: 'hcs-10'
});

console.log({ did, uaid, parsed });`,
    },
    {
      language: 'typescript',
      filename: 'resolve-uaid.ts',
      content: `import 'dotenv/config';
import { HCS14Client } from '@hashgraphonline/standards-sdk';

const required = (name: string, value: string | undefined): string => {
  if (!value || !value.trim()) {
    throw new Error(\`\${name} is required\`);
  }
  return value.trim();
};

const hcs14 = new HCS14Client();
const uaid = required('UAID', process.env.UAID);
const didDoc = await hcs14.getResolverRegistry().resolveUaid(uaid);

console.log(didDoc?.id ?? null);`,
    },
  ],
  resources: [
    { label: "HCS-14 Spec", url: "/docs/standards/hcs-14" },
    {
      label: "HCS-14 SDK Overview",
      url: "/docs/libraries/standards-sdk/hcs-14/overview",
    },
    { label: "HCS-14 Recipes", url: "/docs/libraries/standards-sdk/hcs-14/recipes" },
    {
      label: "HCS-14 Hedera Issuer",
      url: "/docs/libraries/standards-sdk/hcs-14/hedera",
    },
    { label: "HCS-11 Profiles", url: "/docs/standards/hcs-11" },
  ],
};
