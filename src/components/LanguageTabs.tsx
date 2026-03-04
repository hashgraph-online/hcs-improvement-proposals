import React from 'react';
import Tabs from '@theme/Tabs';
import { SiTypescript, SiGo } from 'react-icons/si';

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
 * import TabItem from '@theme/TabItem'; // Docusaurus core
 *
 * <LanguageTabs>
 *   <TabItem value="typescript">
 *     ```typescript
 *     // TS code here
 *     ```
 *   </TabItem>
 *   <TabItem value="go">
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
      { 
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SiTypescript color="#3178C6" /> TypeScript
          </div>
        ), 
        value: 'typescript' 
      },
      { 
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SiGo color="#00ADD8" size="1.4em" /> Go
          </div>
        ), 
        value: 'go' 
      },
    ]}>
      {children}
    </Tabs>
  );
}
