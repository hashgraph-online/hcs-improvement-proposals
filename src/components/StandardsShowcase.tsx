import React from 'react';
import CategoryShowcase from './CategoryShowcase';

interface StandardsShowcaseProps {}

type JSXElement = React.ReactElement;

const standardsData = [
  {
    title: 'HCS-1: File Data Management',
    category: 'Core Data Management',
    status: 'published' as const,
    description:
      'Systematic approach to encode, chunk, upload, retrieve, and reassemble file data using Hedera Consensus Service. The foundation for data management on HCS.',
    features: [
      'Data chunking',
      'File reconstruction',
      'Consensus-based storage',
    ],
    href: '/docs/standards/hcs-1',
    icon: 'HCS-1',
  },
  {
    title: 'HCS-2: Advanced Topic Registries',
    category: 'Core Data Management',
    status: 'published' as const,
    description:
      'Advanced methodologies for managing and interacting with Topic Registries within the HCS framework, enabling organized data discovery.',
    features: ['Topic organization', 'Registry management', 'Data indexing'],
    href: '/docs/standards/hcs-2',
    icon: 'HCS-2',
  },
  {
    title: 'HCS-3: Recursion within HCS',
    category: 'Core Data Management',
    status: 'published' as const,
    description:
      'Enables recursive referencing of inscriptions within Hedera Hashgraph, standardizing how resources reference and load other resources.',
    features: [
      'Recursive references',
      'Resource loading',
      'Standardized linking',
    ],
    href: '/docs/standards/hcs-3',
    icon: 'HCS-3',
  },
  {
    title: 'HCS-5: Tokenized HCS-1 Files (Hashinals)',
    category: 'Digital Assets & NFTs',
    status: 'published' as const,
    description:
      'Standard for "inscribing" Hashinals utilizing both Hedera Consensus Service and Hedera Token Service for tokenized file assets.',
    features: ['NFT creation', 'File tokenization', 'HTS integration'],
    href: '/docs/standards/hcs-5',
    icon: 'HCS-5',
  },
  {
    title: 'HCS-6: Dynamic Hashinals',
    category: 'Digital Assets & NFTs',
    status: 'published' as const,
    description:
      'Inscribe and tokenize Hashinals with updatable metadata using non-indexed Topic IDs, enabling evolving digital assets.',
    features: ['Mutable metadata', 'Dynamic updates', 'Flexible NFTs'],
    href: '/docs/standards/hcs-6',
    icon: 'HCS-6',
  },
  {
    title: 'HCS-7: Smart Hashinals',
    category: 'Digital Assets & NFTs',
    status: 'draft' as const,
    description:
      'A Micro-DSL for Deterministic Topic Selection enabling dynamic NFTs whose metadata automatically updates based on smart contract state.',
    features: ['Smart contracts', 'WASM processing', 'State-reactive NFTs'],
    href: '/docs/standards/hcs-7',
    icon: 'HCS-7',
  },
  {
    title: 'HCS-8: Poll Topic Standard',
    category: 'Governance & Polling',
    status: 'published' as const,
    description:
      'Framework for using HCS topics to manage decentralized polls and voting mechanisms with transparent, auditable results.',
    features: ['Decentralized voting', 'Poll management', 'Result aggregation'],
    href: '/docs/standards/hcs-8',
    icon: 'HCS-8',
  },
  {
    title: 'HCS-9: Poll Metadata Schema',
    category: 'Governance & Polling',
    status: 'published' as const,
    description:
      'Defines the schema to describe and execute polls in conjunction with HCS-8, ensuring standardized poll structure and execution.',
    features: ['Poll schemas', 'Metadata standards', 'Execution framework'],
    href: '/docs/standards/hcs-9',
    icon: 'HCS-9',
  },
  {
    title: 'HCS-10: OpenConvAI Standard',
    category: 'AI & Communication',
    status: 'draft' as const,
    description:
      "Enables AI agents to autonomously discover and communicate through Hedera's Consensus Service with secure, verifiable interactions.",
    features: ['AI communication', 'Agent discovery', 'Decentralized registry'],
    href: '/docs/standards/hcs-10',
    icon: 'HCS-10',
  },
  {
    title: 'HCS-11: Profile Metadata Standard',
    category: 'Identity & Profiles',
    status: 'published' as const,
    description:
      'Standardizes profile metadata for entities on Hedera, enabling consistent identity representation across applications.',
    features: [
      'Profile metadata',
      'Identity standards',
      'Cross-app compatibility',
    ],
    href: '/docs/standards/hcs-11',
    icon: 'HCS-11',
  },
  {
    title: 'HCS-13: Schema Registry',
    category: 'Infrastructure',
    status: 'draft' as const,
    description:
      'Provides a standard way to define, register, and reference schemas for data validation and structure in the Hedera ecosystem.',
    features: ['Schema validation', 'Type-safe data', 'JSON Schema support'],
    href: '/docs/standards/hcs-13',
    icon: 'HCS-13',
  },
  {
    title: 'HCS-15: Petal Discovery',
    category: 'Identity & Profiles',
    status: 'draft' as const,
    description:
      'Enables dynamic creation of multiple account instances using the same private key, allowing for isolated profiles and asset holdings.',
    features: ['Multiple profiles', 'Account isolation', 'Same-key management'],
    href: '/docs/standards/hcs-15',
    icon: 'HCS-15',
  },
  {
    title: 'HCS-16: Flora Coordination',
    category: 'AI & Communication',
    status: 'draft' as const,
    description:
      'Defines rules for multi-party "Flora" accounts, enabling cohesive coordination, shared escrow, and state consensus between agents.',
    features: ['Multi-party coordination', 'Shared escrow', 'Agent consensus'],
    href: '/docs/standards/hcs-16',
    icon: 'HCS-16',
  },
  {
    title: 'HCS-17: State Hash Calculation',
    category: 'Infrastructure',
    status: 'draft' as const,
    description:
      'Standardized methodology for calculating cryptographic state hashes of accounts and decentralized formations for auditable verification.',
    features: ['State verification', 'Hash calculation', 'Audit trails'],
    href: '/docs/standards/hcs-17',
    icon: 'HCS-17',
  },
  {
    title: 'HCS-18: Flora Discovery Protocol',
    category: 'AI & Communication',
    status: 'draft' as const,
    description:
      'Discovery and formation protocol enabling autonomous Petal accounts to find each other and establish multi-party entities.',
    features: [
      'Agent discovery',
      'Formation protocol',
      'Autonomous coordination',
    ],
    href: '/docs/standards/hcs-18',
    icon: 'HCS-18',
  },
  {
    title: 'HCS-20: Auditable Points Standard',
    category: 'Points & Rewards',
    status: 'published' as const,
    description:
      'Manages and audits points on Hedera Hashgraph, inspired by BRC-20. Enables transparent reward systems and loyalty programs.',
    features: ['Point management', 'Audit trails', 'Reward systems'],
    href: '/docs/standards/hcs-20',
    icon: 'HCS-20',
  },
];

export default function StandardsShowcase(): React.ReactElement {
  return (
    <CategoryShowcase
      title='HCS Standards'
      subtitle='Discover the comprehensive collection of Hedera Consensus Service standards that enable powerful decentralized applications and data management on the Hedera network.'
      items={standardsData}
      showSearch={true}
      showCategoryFilter={true}
      showStatusFilter={true}
    />
  );
}
