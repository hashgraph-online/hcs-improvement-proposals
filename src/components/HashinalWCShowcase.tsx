import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const hashintalWCData = [
  {
    title: 'Overview',
    href: '/docs/libraries/hashinal-wc/overview',
    description: 'Introduction to Hashinal Wallet Connect SDK and its core features',
    icon: '📖',
  },
  {
    title: 'Installation',
    href: '/docs/libraries/hashinal-wc/installation',
    description: 'Get started with Hashinal Wallet Connect SDK installation and setup',
    icon: '📦',
  },
  {
    title: 'API Methods',
    href: '/docs/libraries/hashinal-wc/methods',
    description: 'Complete reference for all SDK methods and their usage',
    icon: '🔧',
  },
  {
    title: 'React Integration',
    href: '/docs/libraries/hashinal-wc/usage-with-react',
    description: 'Build React applications with wallet connectivity',
    icon: '⚛️',
  },
  {
    title: 'Next.js Integration',
    href: '/docs/libraries/hashinal-wc/usage-with-nextjs',
    description: 'Server-side rendering with Next.js and wallet integration',
    icon: '▲',
  },
  {
    title: 'Vite Integration',
    href: '/docs/libraries/hashinal-wc/usage-with-vite',
    description: 'Fast development with Vite and Hedera wallets',
    icon: '⚡',
  },
  {
    title: 'Hashinals Guide',
    href: '/docs/libraries/hashinal-wc/usage-with-recursion',
    description: 'Build inscribed HTML applications using HCS-3 standard',
    icon: '🎨',
  },
  {
    title: 'HCS Topics',
    href: '/docs/libraries/hashinal-wc/topics',
    description: 'Work with Hedera Consensus Service topics and messages',
    icon: '💬',
  },
];

export default function HashinalWCShowcase() {
  return (
    <CategoryShowcase
      title="Hashinal Wallet Connect"
      subtitle="Connect and interact with Hedera wallets in your applications"
      items={hashintalWCData}
    />
  );
}