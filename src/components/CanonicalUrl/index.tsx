import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function CanonicalUrl({path}: {path: string}): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash from base URL if present
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const url = `${baseUrl}${normalizedPath}`;
  
  return (
    <Head>
      <link rel="canonical" href={url} />
    </Head>
  );
}
