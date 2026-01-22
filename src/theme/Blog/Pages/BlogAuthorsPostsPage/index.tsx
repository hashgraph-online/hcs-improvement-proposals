import React, { type ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import BlogAuthorsPostsPage from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';

function resolveAuthorDescription(props: Props): string {
  const authorName = props.author.name.trim();
  return props.author.description?.trim() || `Posts by ${authorName}.`;
}

export default function BlogAuthorsPostsPageWrapper(props: Props): ReactNode {
  return (
    <>
      <PageMetadata description={resolveAuthorDescription(props)} />
      <BlogAuthorsPostsPage {...props} />
    </>
  );
}

