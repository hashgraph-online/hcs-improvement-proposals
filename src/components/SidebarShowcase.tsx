import React from 'react';
import CategoryShowcase from './CategoryShowcase';
import {useCurrentSidebarCategory, useActivePluginAndVersion, useDocsData} from '@docusaurus/plugin-content-docs/client';

type ShowcaseItem = {
  title: string;
  href: string;
  description?: string;
  icon?: string;
};

const iconFor = (label: string): string => {
  const key = label.toLowerCase();
  if (key.includes('overview')) return '📖';
  if (key.includes('getting')) return '🚀';
  if (key.includes('tool')) return '🧰';
  if (key.includes('form')) return '📝';
  if (key.includes('memory')) return '🧠';
  if (key.includes('hashlink') || key.includes('content')) return '🔗';
  if (key.includes('mode')) return '⚙️';
  if (key.includes('plugin')) return '🔌';
  if (key.includes('wallet')) return '👛';
  if (key.includes('builder')) return '🏗️';
  if (key.includes('example')) return '📚';
  return '📄';
};

export default function SidebarShowcase({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}): JSX.Element {
  const category = useCurrentSidebarCategory();
  const apv = useActivePluginAndVersion();
  const pluginId = apv?.activePlugin?.pluginId;
  const docsData = useDocsData(pluginId);
  const currentVersionName = apv?.activeVersion?.versionName;
  const versionDocs = docsData?.versions?.find((v: any) => v.versionName === currentVersionName)?.docs || [];

  if (!category || !category.items) return <></>;

  const items: ShowcaseItem[] = (category.items as any[])
    .map((it) => {
      const href = (it && (it as any).href) || undefined;
      if (!href) return null;
      const docId = (it as any).docId as string | undefined;
      const label = (it as any).label || docId || href;
      const meta = docId
        ? versionDocs.find((d: any) => d.id === docId)
        : versionDocs.find((d: any) => d.permalink === href);
      const title = (meta && (meta.title as string)) || label;
      const description = (meta && (meta.description as string)) || '';
      return {
        title,
        href,
        description,
        icon: iconFor(title),
      } as ShowcaseItem;
    })
    .filter(Boolean) as ShowcaseItem[];

  return <CategoryShowcase title={title} subtitle={subtitle || ''} items={items} />;
}
