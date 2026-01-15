import React from 'react';
import CategoryShowcase from './CategoryShowcase';
import standardsManifest from '../data/standards-manifest.json';

interface StandardItem {
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'published' | 'draft';
  category: string;
  features: string[];
  href: string;
  icon: string;
}

export default function StandardsShowcase(): React.ReactElement {
  const standardsData = (standardsManifest as StandardItem[]).map((item) => ({
    title: item.title,
    category: item.category,
    status: item.status as 'published' | 'draft',
    description: item.description,
    features: item.features,
    href: item.href,
    icon: item.icon,
  }));

  return (
    <CategoryShowcase
      title='HCS Standards'
      subtitle='Discover the comprehensive collection of Hashgraph Consensus Standards (HCS) authored by Hashgraph Online — enabling interoperable agent communication, registries, content inscription, and application composition.'
      items={standardsData}
      showSearch={true}
      showCategoryFilter={true}
      showStatusFilter={true}
    />
  );
}
