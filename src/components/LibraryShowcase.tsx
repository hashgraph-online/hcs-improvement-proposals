import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const libraryData = [
  {
    title: 'Recursion SDK',
    href: '/docs/libraries/recursion-sdk',
    description: 'HCS-3 Recursion SDK - Build decentralized applications with on-graph resource loading',
    icon: '🔄',
  },
  {
    title: 'Hashinal Wallet Connect',
    href: '/docs/libraries/hashinal-wc',
    description: 'Connect and interact with Hedera wallets in your applications',
    icon: '🔐',
  },
  {
    title: 'Standards SDK',
    href: '/docs/libraries/standards-sdk',
    description: 'Official SDK for implementing HCS standards in your applications',
    icon: '📦',
  },
  {
    title: 'Go SDK',
    href: '/docs/libraries/go-sdk',
    description: 'Go reference implementation for HCS standards and Registry Broker workflows',
    icon: '🐹',
  },
  {
    title: 'Python SDK',
    href: '/docs/libraries/python-sdk',
    description: 'Python implementation of Standards SDK workflows, mirror-node, and inscriber flows',
    icon: '🐍',
  },
  {
    title: 'Standards Agent Kit',
    href: '/docs/libraries/standards-agent-kit',
    description: 'AI agent toolkit for interacting with HCS standards',
    icon: '🤖',
  },
  {
    title: 'Conversational Agent',
    href: '/docs/libraries/conversational-agent',
    description: 'Conversational AI agent implementing HCS-10 communication, HCS-2 registries, and content inscription',
    icon: '💬',
  },
  {
    title: 'AI Plugin Scanner',
    href: '/docs/libraries/ai-plugin-scanner',
    description: 'Repo for HOL Guard and plugin-scanner across Codex, Claude, Gemini, and OpenCode ecosystems',
    icon: '🔍',
  },
];

export default function LibraryShowcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="Libraries"
      subtitle="Explore our comprehensive collection of libraries and SDKs for building on Hedera"
      items={libraryData}
    />
  );
}
