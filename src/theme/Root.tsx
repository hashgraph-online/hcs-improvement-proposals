import React from 'react';

/**
 * Ensures the mobile navbar drawer remains interactive on markdown pages
 * by removing inert attributes that Docusaurus applies when showing
 * the secondary docs/blog panel.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hashgraph Online",
            "url": "https://hol.org",
            "logo": "https://hol.org/Logo_Icon.png",
            "sameAs": [
              "https://x.com/HashgraphOnline",
              "https://t.me/hashinals",
              "https://github.com/hashgraph-online"
            ],
            "description": "Building the future of the internet, on-graph. Open standards and infrastructure for the Hedera network."
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Hashgraph Online",
            "url": "https://hol.org",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://hol.org/search/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      {children}
    </>
  );
}
