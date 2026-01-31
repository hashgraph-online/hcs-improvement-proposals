import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import Heading from '@theme/Heading';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import CanonicalUrl from '@site/src/components/CanonicalUrl';
import styles from './styles.module.css';

function parsePageNumberFromPermalink(permalink: string | undefined): number | undefined {
  if (!permalink) {
    return undefined;
  }
  const match = permalink.match(/\/page\/(\d+)\/?$/);
  if (!match) {
    return undefined;
  }
  const page = Number.parseInt(match[1] ?? '', 10);
  return Number.isFinite(page) && page > 0 ? page : undefined;
}

function resolvePageNumber(metadata: Props['metadata']): number {
  const candidates = [
    metadata?.page,
    metadata?.pageNumber,
    metadata?.blogPageNumber,
    metadata?.currentPage,
    parsePageNumberFromPermalink(metadata?.permalink),
  ];
  const found = candidates.find((value) => typeof value === 'number');
  return found ?? 1;
}

function resolveTotalPages(metadata: Props['metadata']): number | undefined {
  const candidates = [
    metadata?.totalPages,
    metadata?.numberOfPages,
    metadata?.blogTotalPages,
  ];
  const found = candidates.find((value) => typeof value === 'number');
  return found ?? undefined;
}

function buildTitleSuffix(pageNumber: number, totalPages: number | undefined): string {
  if (!pageNumber || pageNumber <= 1) {
    return '';
  }
  if (totalPages && totalPages > 1) {
    return ` (Page ${pageNumber} of ${totalPages})`;
  }
  return ` (Page ${pageNumber})`;
}

function BlogListPageMetadata({ metadata }: Pick<Props, 'metadata'>): ReactNode {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();

  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const baseTitle = isBlogOnlyMode ? siteTitle : blogTitle;

  const pageNumber = resolvePageNumber(metadata);
  const totalPages = resolveTotalPages(metadata);
  const titleSuffix = buildTitleSuffix(pageNumber, totalPages);

  const descriptionSuffix = pageNumber > 1 ? ` Page ${pageNumber}.` : '';
  const description = `${blogDescription ?? ''}${descriptionSuffix}`.trim() || undefined;

  return (
    <>
      <PageMetadata title={`${baseTitle}${titleSuffix}`} description={description} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent({
  metadata,
  items,
  sidebar,
}: Pick<Props, 'metadata' | 'items' | 'sidebar'>): ReactNode {
  const pageNumber = resolvePageNumber(metadata);
  const totalPages = resolveTotalPages(metadata);
  const titleSuffix = buildTitleSuffix(pageNumber, totalPages);

  return (
    <BlogLayout sidebar={sidebar}>
      <div className={styles.blogListWrapper}>
        <header className="margin-bottom--lg">
          <Heading as="h1">
            {metadata.blogTitle}
            {titleSuffix}
          </Heading>
        </header>
        <BlogPostItems items={items} />
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  const pageNumber = resolvePageNumber(props.metadata);
  const canonicalPath = pageNumber > 1
    ? `/blog/page/${pageNumber}/`
    : '/blog/';

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <CanonicalUrl path={canonicalPath} />
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
