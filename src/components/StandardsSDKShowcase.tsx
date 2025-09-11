import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const standardsSDKData = [
  {
    title: 'Overview',
    href: '/docs/libraries/standards-sdk/overview',
    description: 'Complete implementation of HCS protocols for building applications on Hedera',
    icon: '📖',
  },
  {
    title: 'HCS-2 SDK',
    href: '/docs/libraries/standards-sdk/hcs-2',
    description: 'Decentralized Topic Registry for managing HCS topics',
    icon: '📋',
  },
  {
    title: 'HCS-3 SDK',
    href: '/docs/libraries/standards-sdk/hcs-3',
    description: 'Recursion standard (SDK implementation)',
    icon: '🔄',
  },
  {
    title: 'HCS-6 SDK',
    href: '/docs/libraries/standards-sdk/hcs-6',
    description: 'Dynamic Hashinals standard (SDK implementation)',
    icon: '🧬',
  },
  {
    title: 'HCS-7 SDK', 
    href: '/docs/libraries/standards-sdk/hcs-7',
    description: 'Smart Hashinals standard (SDK implementation)',
    icon: '💎',
  },
  {
    title: 'HCS-10 SDK',
    href: '/docs/libraries/standards-sdk/hcs-10/',
    description: 'OpenConvAI Standard SDK for building AI agent communication systems',
    icon: '🤖',
  },
  {
    title: 'HCS-11 SDK',
    href: '/docs/libraries/standards-sdk/hcs-11',
    description: 'Profile Metadata standard (SDK implementation)',
    icon: '👤',
  },
  {
    title: 'HCS-12 SDK',
    href: '/docs/libraries/standards-sdk/hcs-12',
    description: 'HashLinks standard: actions, blocks, assembly (SDK implementation)',
    icon: '🧩',
  },
  {
    title: 'HCS-14 SDK',
    href: '/docs/libraries/standards-sdk/hcs-14',
    description: 'Universal Agent Identifier (UAID): AID + DID wrapper (SDK implementation)',
    icon: '🆔',
  },
  {
    title: 'HCS-20 SDK',
    href: '/docs/libraries/standards-sdk/hcs-20',
    description: 'Auditable Points Standard for creating and managing loyalty points',
    icon: '🪙',
  },
  {
    title: 'Inscribe Utilities',
    href: '/docs/libraries/standards-sdk/inscribe',
    description: 'Utilities for inscribing data to Hedera Consensus Service',
    icon: '📝',
  },
  {
    title: 'Utils & Services',
    href: '/docs/libraries/standards-sdk/utils-services',
    description: 'Common utilities and services for HCS standards implementation',
    icon: '🛠️',
  },
];

export default function StandardsSDKShowcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="Standards SDK"
      subtitle="Official SDK for implementing HCS standards in your applications"
      items={standardsSDKData}
    />
  );
}
