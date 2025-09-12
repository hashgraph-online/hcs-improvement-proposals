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
      const anyIt = it as any;
      const directHref: string | undefined = anyIt && anyIt.href ? anyIt.href : undefined;
      const linkDocId: string | undefined = anyIt?.link?.id as string | undefined;
      const docId: string | undefined = (anyIt?.docId as string | undefined) || linkDocId;

      let meta: any | undefined;
      if (docId) {
        meta = versionDocs.find((d: any) => d.id === docId);
      } else if (directHref) {
        // Try exact permalink match
        meta = versionDocs.find((d: any) => d && d.permalink === directHref);
        if (!meta) {
          // Try trailing-slash normalized match
          const normalize = (p: string) => (p.endsWith('/') ? p : `${p}/`);
          const hrefNorm = normalize(directHref);
          meta = versionDocs.find(
            (d: any) => d && typeof d.permalink === 'string' && normalize(d.permalink) === hrefNorm,
          );
        }
        if (!meta) {
          // Derive a potential doc id from href and try that
          const fromHrefId = directHref
            .replace(/^\/?docs\//, '')
            .replace(/^\//, '')
            .replace(/\/$/, '');
          const idCandidates = [fromHrefId, `${fromHrefId}/index`];
          meta = versionDocs.find((d: any) => d && idCandidates.includes(d.id));
        }
      }

      const href: string | undefined = directHref || (meta && meta.permalink) || undefined;
      if (!href) {
        return null;
      }

      const label: string = anyIt?.label || docId || href;
      const title: string = (meta && (meta.title as string)) || label;
      const description: string = (meta && (meta.description as string)) || '';

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
