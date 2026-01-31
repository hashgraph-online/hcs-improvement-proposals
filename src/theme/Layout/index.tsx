import React from 'react';
import Layout from '@theme-original/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import type { Props } from '@theme/Layout';

/**
 * Generates a consistent canonical URL for the current page.
 * Uses the site URL from config and ensures trailing slashes.
 */
function CanonicalHead(): React.ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();

  const baseUrl = siteConfig.url;
  const currentPath = location.pathname;

  const normalizedPath = currentPath.startsWith('/')
    ? currentPath
    : `/${currentPath}`;

  const pathWithTrailingSlash = normalizedPath.endsWith('/')
    ? normalizedPath
    : `${normalizedPath}/`;

  const canonicalUrl = `${baseUrl}${pathWithTrailingSlash}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}

export default function LayoutWrapper(props: Props): React.JSX.Element {
  return (
    <>
      <CanonicalHead />
      <Layout {...props} />
    </>
  );
}
