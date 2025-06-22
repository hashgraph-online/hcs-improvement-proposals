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
    title: 'HCS-10 SDK',
    href: '/docs/libraries/standards-sdk/hcs-10/',
    description: 'OpenConvAI Standard SDK for building AI agent communication systems',
    icon: '🤖',
  },
  {
    title: 'HCS-3 Integration',
    href: '/docs/libraries/standards-sdk/hcs-3',
    description: 'SDK implementation for HCS-3 Recursion standard',
    icon: '🔄',
  },
  {
    title: 'HCS-7 Integration', 
    href: '/docs/libraries/standards-sdk/hcs-7',
    description: 'SDK implementation for HCS-7 Smart Hashinals standard',
    icon: '💎',
  },
  {
    title: 'HCS-11 Integration',
    href: '/docs/libraries/standards-sdk/hcs-11',
    description: 'SDK implementation for HCS-11 Profile Metadata standard',
    icon: '👤',
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