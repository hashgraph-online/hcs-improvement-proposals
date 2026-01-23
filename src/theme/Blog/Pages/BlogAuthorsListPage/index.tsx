import React, { type ReactNode } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import BlogAuthorsListPage from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPageWrapper(props: Props): ReactNode {
  return (
    <>
      <PageMetadata description="Browse Hashgraph Online blog authors and contributors." />
      <BlogAuthorsListPage {...props} />
    </>
  );
}

