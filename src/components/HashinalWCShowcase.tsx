import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const hashinalWCData = [
  {
    title: 'Installation',
    href: '/docs/libraries/hashinal-wc/installation',
    description: 'Get started with Hashinal Wallet Connect by installing and setting up the library',
    icon: '📦',
  },
  {
    title: 'Methods',
    href: '/docs/libraries/hashinal-wc/methods',
    description: 'Explore all available methods for interacting with Hedera wallets',
    icon: '🛠️',
  },
  {
    title: 'Topics',
    href: '/docs/libraries/hashinal-wc/topics',
    description: 'Learn about important topics and concepts in Hashinal Wallet Connect',
    icon: '📚',
  },
  {
    title: 'Usage with React',
    href: '/docs/libraries/hashinal-wc/usage-with-react',
    description: 'Integrate Hashinal Wallet Connect with your React applications',
    icon: '⚛️',
  },
  {
    title: 'Usage with Next.js',
    href: '/docs/libraries/hashinal-wc/usage-with-nextjs',
    description: 'Integrate Hashinal Wallet Connect with Next.js applications',
    icon: '▲',
  },
  {
    title: 'Usage with Vite',
    href: '/docs/libraries/hashinal-wc/usage-with-vite',
    description: 'Integrate Hashinal Wallet Connect with Vite-powered applications',
    icon: '⚡',
  },
  {
    title: 'Usage with Recursion',
    href: '/docs/libraries/hashinal-wc/usage-with-recursion',
    description: 'Combine Hashinal Wallet Connect with HCS-3 Recursion for powerful dApps',
    icon: '🔄',
  },
];

export default function HashinalWCShowcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="Hashinal Wallet Connect"
      subtitle="Connect and interact with Hedera wallets in your applications"
      items={hashinalWCData}
    />
  );
}