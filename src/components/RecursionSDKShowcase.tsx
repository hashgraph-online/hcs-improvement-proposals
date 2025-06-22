import React from 'react';
import CategoryShowcase from './CategoryShowcase';

const recursionData = [
  {
    title: 'What is Recursion?',
    href: '/docs/libraries/recursion-sdk/what-is-recursion',
    description: 'Learn about HCS-3 and how it enables developers to reference and load on-graph resources directly from Hedera',
    icon: '🔄',
  },
  {
    title: 'Basic Usage',
    href: '/docs/libraries/recursion-sdk/usage',
    description: 'Get started with the HCS-3 Recursion SDK and build your first application',
    icon: '🚀',
  },
  {
    title: 'Available Functions',
    href: '/docs/libraries/recursion-sdk/functions',
    description: 'Complete reference for all functions available in the HCS-3 Recursion SDK',
    icon: '📚',
  },
  {
    title: 'Advanced Examples',
    href: '/docs/libraries/recursion-sdk/advanced-examples',
    description: 'Explore advanced use cases and patterns for building complex applications with HCS-3',
    icon: '🎯',
  },
];

export default function RecursionSDKShowcase(): JSX.Element {
  return (
    <CategoryShowcase
      title="Recursion SDK"
      subtitle="HCS-3 Recursion SDK - Build decentralized applications with on-graph resource loading"
      items={recursionData}
    />
  );
}