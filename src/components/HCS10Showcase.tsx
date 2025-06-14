import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const hcs10Data = [
  {
    title: 'Base Client',
    href: '/docs/libraries/standards-sdk/hcs-10/base-client',
    description: 'Core client implementation for HCS-10 OpenConvAI standard',
    icon: '🤖',
  },
  {
    title: 'Browser Integration',
    href: '/docs/libraries/standards-sdk/hcs-10/browser',
    description: 'Browser-specific implementation and utilities for HCS-10',
    icon: '🌐',
  },
  {
    title: 'Connections Manager',
    href: '/docs/libraries/standards-sdk/hcs-10/connections-manager',
    description: 'Manage AI agent connections and communication channels',
    icon: '🔗',
  },
  {
    title: 'Examples',
    href: '/docs/libraries/standards-sdk/hcs-10/examples',
    description: 'Practical examples of implementing HCS-10 OpenConvAI agents',
    icon: '📚',
  },
  {
    title: 'Server Implementation',
    href: '/docs/libraries/standards-sdk/hcs-10/server',
    description: 'Server-side implementation for HCS-10 agent systems',
    icon: '⚙️',
  },
];

export default function HCS10Showcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="HCS-10: OpenConvAI"
      subtitle="SDK components for building AI agents that communicate through Hedera's Consensus Service"
      items={hcs10Data}
    />
  );
}