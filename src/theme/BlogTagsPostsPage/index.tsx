import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useBlogTagsPostsPageTitle } from '@docusaurus/theme-common/internal';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';
import type { Props } from '@theme/BlogTagsPostsPage';
import CanonicalUrl from '@site/src/components/CanonicalUrl';

function buildTitleSuffix(pageNumber: number, totalPages: number | undefined): string {
  if (pageNumber <= 1) {
    return '';
  }
  if (totalPages && totalPages > 1) {
    return ` (Page ${pageNumber} of ${totalPages})`;
  }
  return ` (Page ${pageNumber})`;
}

function buildDescription(
  baseDescription: string | undefined,
  pageNumber: number,
): string | undefined {
  const pageSuffix = pageNumber > 1 ? ` Page ${pageNumber}.` : '';
  return `${baseDescription ?? ''}${pageSuffix}`.trim() || undefined;
}

function BlogTagsPostsPageMetadata({ tag, listMetadata }: Pick<Props, 'tag' | 'listMetadata'>): ReactNode {
  const baseTitle = useBlogTagsPostsPageTitle(tag);
  const pageNumber = listMetadata?.page ?? 1;
  const titleSuffix = buildTitleSuffix(pageNumber, listMetadata?.totalPages);
  const baseDescription =
    tag.description ??
    `Posts tagged with "${tag.label}".`;

  return (
    <>
      <PageMetadata
        title={`${baseTitle}${titleSuffix}`}
        description={buildDescription(baseDescription, pageNumber)}
      />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({
  tag,
  items,
  sidebar,
  listMetadata,
}: Props): ReactNode {
  const baseTitle = useBlogTagsPostsPageTitle(tag);
  const pageNumber = listMetadata?.page ?? 1;
  const titleSuffix = buildTitleSuffix(pageNumber, listMetadata?.totalPages);

  return (
    <BlogLayout sidebar={sidebar}>
      {tag.unlisted && <Unlisted />}
      <header className="margin-bottom--xl">
        <Heading as="h1">
          {baseTitle}
          {titleSuffix}
        </Heading>
        {tag.description && <p>{tag.description}</p>}
        <Link href={tag.allTagsPath}>
          <Translate
            id="theme.tags.tagsPageLink"
            description="The label of the link targeting the tag list page"
          >
            View All Tags
          </Translate>
        </Link>
      </header>
      <BlogPostItems items={items} />
      <BlogListPaginator metadata={listMetadata} />
    </BlogLayout>
  );
}

export default function BlogTagsPostsPage(props: Props): ReactNode {
  const pageNumber = props.listMetadata?.page ?? 1;
  const canonicalPath = pageNumber > 1
    ? `${props.tag.permalink}/page/${pageNumber}/`
    : `${props.tag.permalink}/`;

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}
    >
      <CanonicalUrl path={canonicalPath} />
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
