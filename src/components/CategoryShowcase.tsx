import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

interface Item {
  label: string;
  href: string;
  description: string;
}

interface CategoryShowcaseProps {
  title: string;
  subtitle?: string;
  items: Item[];
}

export default function CategoryShowcase({title, subtitle, items}: CategoryShowcaseProps) {
  return (
    <div className="margin-bottom--lg">
      <Heading as="h3">{title}</Heading>
      {subtitle && <p>{subtitle}</p>}
      <ul>
        {items.map((item, i) => (
          <li key={i} className="margin-bottom--sm">
            <Link to={item.href}><strong>{item.label}</strong></Link>
            {item.description && (
              <span> - {item.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
