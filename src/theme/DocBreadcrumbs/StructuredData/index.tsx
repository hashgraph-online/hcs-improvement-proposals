import React, { type ReactNode } from 'react';

import Head from '@docusaurus/Head';
import { useBreadcrumbsStructuredData } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocBreadcrumbs/StructuredData';
import type { BreadcrumbList, ListItem, WithContext } from 'schema-dts';

const withTrailingSlash = (rawUrl: string): string => {
  try {
    const url = new URL(rawUrl);
    if (!url.pathname.endsWith('/')) {
      const lastSegment = url.pathname.split('/').filter(Boolean).at(-1) ?? '';
      if (lastSegment.length > 0 && !lastSegment.includes('.')) {
        url.pathname = `${url.pathname}/`;
      }
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
};

const normalizeListItem = (listItem: ListItem): ListItem => {
  if (typeof listItem.item !== 'string') {
    return listItem;
  }

  const item = withTrailingSlash(listItem.item);
  if (item === listItem.item) {
    return listItem;
  }

  return {
    ...listItem,
    item,
  };
};

const normalizeBreadcrumbItems = (
  structuredData: WithContext<BreadcrumbList>,
): WithContext<BreadcrumbList> => {
  if (!structuredData.itemListElement || !Array.isArray(structuredData.itemListElement)) {
    return structuredData;
  }

  const itemListElement = structuredData.itemListElement.map((element) =>
    typeof element === 'string' ? element : normalizeListItem(element),
  );

  return {
    ...structuredData,
    itemListElement,
  };
};

export default function DocBreadcrumbsStructuredData(props: Props): ReactNode {
  const structuredData = useBreadcrumbsStructuredData({
    breadcrumbs: props.breadcrumbs,
  });

  return (
    <Head>
      <script type='application/ld+json'>
        {JSON.stringify(normalizeBreadcrumbItems(structuredData))}
      </script>
    </Head>
  );
}
