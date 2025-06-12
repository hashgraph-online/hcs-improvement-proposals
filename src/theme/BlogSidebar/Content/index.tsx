import React, {memo, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogSidebar/Content';
import type {BlogSidebarItem} from '@docusaurus/plugin-content-blog';

function groupBlogSidebarItemsByYearMonth(items: BlogSidebarItem[]) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const result: Array<[string, Array<[string, BlogSidebarItem[]]>]> = [];
  const itemsByYearMonth = new Map<string, Map<string, BlogSidebarItem[]>>();

  items.forEach(item => {
    const date = new Date(item.date);
    const year = date.getUTCFullYear().toString();
    const month = date.getUTCMonth();
    const monthName = monthNames[month];

    if (!itemsByYearMonth.has(year)) {
      itemsByYearMonth.set(year, new Map());
    }
    
    const yearMap = itemsByYearMonth.get(year)!;
    if (!yearMap.has(monthName)) {
      yearMap.set(monthName, []);
    }
    
    yearMap.get(monthName)!.push(item);
  });

  // Convert to sorted array
  const years = Array.from(itemsByYearMonth.entries())
    .sort(([a], [b]) => b.localeCompare(a));

  years.forEach(([year, monthMap]) => {
    const months = Array.from(monthMap.entries())
      .sort(([monthA], [monthB]) => {
        const monthIndexA = monthNames.indexOf(monthA);
        const monthIndexB = monthNames.indexOf(monthB);
        return monthIndexB - monthIndexA;
      });
    
    result.push([year, months]);
  });

  return result;
}

function BlogSidebarMonthGroup({
  month,
  children,
}: {
  month: string;
  children: ReactNode;
}) {
  return (
    <div role="group" style={{ marginBottom: '1rem' }}>
      <h4 style={{ 
        fontSize: '0.875rem', 
        color: 'var(--ifm-color-emphasis-700)',
        marginBottom: '0.5rem',
        marginTop: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        opacity: 0.7,
        borderLeft: '2px solid var(--ifm-color-emphasis-300)',
        paddingLeft: '0.5rem',
        marginLeft: '0.25rem'
      }}>
        {month}
      </h4>
      <div style={{ paddingLeft: '0.5rem' }}>
        {children}
      </div>
    </div>
  );
}

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  children,
}: {
  year: string;
  yearGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role="group">
      <Heading as="h3" className={yearGroupHeadingClassName}>
        {year}
      </Heading>
      {children}
    </div>
  );
}

function BlogSidebarContent({
  items,
  yearGroupHeadingClassName,
  ListComponent,
}: Props): ReactNode {
  const themeConfig = useThemeConfig();
  
  if (themeConfig.blog.sidebar.groupByYear) {
    const itemsByYearMonth = groupBlogSidebarItemsByYearMonth(items);
    return (
      <>
        {itemsByYearMonth.map(([year, monthItems]) => (
          <BlogSidebarYearGroup
            key={year}
            year={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}>
            {monthItems.map(([month, monthPosts]) => (
              <BlogSidebarMonthGroup key={`${year}-${month}`} month={month}>
                <ListComponent items={monthPosts} />
              </BlogSidebarMonthGroup>
            ))}
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  } else {
    return <ListComponent items={items} />;
  }
}

export default memo(BlogSidebarContent);
