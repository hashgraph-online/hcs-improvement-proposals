import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

interface LanguageTabsProps {
  children: React.ReactNode;
}

/**
 * Wraps Docusaurus Tabs/TabItem to provide a consistent multi-language
 * code switcher (TypeScript / Go) across the docs.
 *
 * Usage in MDX:
 *
 * ```mdx
 * import LanguageTabs from '@site/src/components/LanguageTabs';
 *
 * <LanguageTabs>
 *   <TabItem value="typescript" label="TypeScript">
 *     ```typescript
 *     // TS code here
 *     ```
 *   </TabItem>
 *   <TabItem value="go" label="Go">
 *     ```go
 *     // Go code here
 *     ```
 *   </TabItem>
 * </LanguageTabs>
 * ```
 *
 * The groupId ensures the user's language preference is synced across all
 * LanguageTabs instances on the site.
 */
export default function LanguageTabs({ children }: LanguageTabsProps) {
  return (
    <Tabs groupId="sdk-language" defaultValue="typescript" values={[
      { label: '🟦 TypeScript', value: 'typescript' },
      { label: '🐹 Go', value: 'go' },
    ]}>
      {children}
    </Tabs>
  );
}
