import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const libraryData = [
  {
    title: 'Recursion SDK',
    href: '/docs/category/recursion-sdk',
    description: 'HCS-3 Recursion SDK - Build decentralized applications with on-graph resource loading',
    icon: '🔄',
  },
  {
    title: 'Hashinal Wallet Connect',
    href: '/docs/category/hashinal-wallet-connect',
    description: 'Connect and interact with Hedera wallets in your applications',
    icon: '🔐',
  },
  {
    title: 'Standards SDK',
    href: '/docs/category/standards-sdk',
    description: 'Official SDK for implementing HCS standards in your applications',
    icon: '📦',
  },
  {
    title: 'Standards Agent Kit',
    href: '/docs/category/standards-agent-kit',
    description: 'AI agent toolkit for interacting with HCS standards',
    icon: '🤖',
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