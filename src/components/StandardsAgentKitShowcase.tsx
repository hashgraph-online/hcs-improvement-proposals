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
    title: 'Core Client',
    href: '/docs/libraries/standards-agent-kit/core-client',
    description: 'Core client functionality for building AI agents that interact with HCS standards',
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