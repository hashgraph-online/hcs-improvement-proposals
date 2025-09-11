import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const agentKitData = [
  {
    title: 'Overview',
    href: '/docs/libraries/standards-agent-kit/overview',
    description: 'TypeScript library for implementing the HCS-10 OpenConvAI Standard',
    icon: '📖',
  },
  {
    title: 'Builders',
    href: '/docs/libraries/standards-agent-kit/builders',
    description: 'HCS‑10/2/6 + Inscriber builders with wallet delegation',
    icon: '🏗️',
  },
  {
    title: 'Core Client',
    href: '/docs/libraries/standards-agent-kit/core-client',
    description: 'Low‑level HCS‑10 client wrapper (SDK integration)',
    icon: '🤖',
  },
  {
    title: 'Examples',
    href: '/docs/libraries/standards-agent-kit/examples',
    description: 'Practical examples of building AI agents with the Standards Agent Kit',
    icon: '📚',
  },
  {
    title: 'LangChain Tools',
    href: '/docs/libraries/standards-agent-kit/langchain-tools',
    description: 'Integration tools for using the agent kit with LangChain framework',
    icon: '🔗',
  },
  {
    title: 'Wallet Integration',
    href: '/docs/libraries/standards-agent-kit/wallet-integration',
    description: 'Configure dApp signers, transaction bytes, and wallet submit',
    icon: '👛',
  },
  {
    title: 'Plugins',
    href: '/docs/libraries/standards-agent-kit/plugins',
    description: 'Extensible plugin system for adding custom functionality to your agents',
    icon: '🔌',
  },
];

export default function StandardsAgentKitShowcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="Standards Agent Kit"
      subtitle="AI agent toolkit for interacting with HCS standards"
      items={agentKitData}
    />
  );
}
