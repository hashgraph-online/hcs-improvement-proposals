import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

interface AlgoliaHit {
  objectID: string;
  url: string;
  hierarchy?: Record<string, string | null>;
  content?: string | null;
  _snippetResult?: {
    content?: {
      value: string;
    };
  };
}

type AlgoliaConfig = {
  appId: string;
  apiKey: string;
  indexName: string;
};

type SearchState = {
  hits: AlgoliaHit[];
  loading: boolean;
  noResults: boolean;
};

const DEFAULT_HITS_PER_PAGE = 20;

const getAlgoliaConfig = (siteConfig: unknown): AlgoliaConfig | null => {
  if (!siteConfig || typeof siteConfig !== 'object') return null;
  if (!('themeConfig' in siteConfig) || !siteConfig.themeConfig) return null;
  if (typeof siteConfig.themeConfig !== 'object') return null;
  if (!('algolia' in siteConfig.themeConfig)) return null;

  const algolia = siteConfig.themeConfig.algolia;
  if (!algolia || typeof algolia !== 'object') return null;
  if (!('appId' in algolia) || !('apiKey' in algolia) || !('indexName' in algolia)) return null;

  const appId = algolia.appId;
  const apiKey = algolia.apiKey;
  const indexName = algolia.indexName;

  if (typeof appId !== 'string' || typeof apiKey !== 'string' || typeof indexName !== 'string') {
    return null;
  }

  return { appId, apiKey, indexName };
};

const getTitle = (hit: AlgoliaHit): string => {
  return (
    hit.hierarchy?.lvl2 ||
    hit.hierarchy?.lvl1 ||
    hit.hierarchy?.lvl0 ||
    hit.content ||
    hit.url
  );
};

const getSnippetNode = (hit: AlgoliaHit): ReactNode => {
  const snippet = hit._snippetResult?.content?.value;
  if (snippet) {
    return <span dangerouslySetInnerHTML={{ __html: snippet }} />;
  }
  return hit.content ?? null;
};

const SearchResultItem = ({ hit }: { hit: AlgoliaHit }): ReactNode => {
  return (
    <li className="margin-bottom--md">
      <Link to={hit.url}>{getTitle(hit)}</Link>
      <div className="text--muted">{getSnippetNode(hit)}</div>
    </li>
  );
};

export default function SearchPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const algoliaConfig = useMemo(() => getAlgoliaConfig(siteConfig), [siteConfig]);

  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>({
    hits: [],
    loading: false,
    noResults: false,
  });

  const handleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  useEffect(() => {
    if (!algoliaConfig) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setState({ hits: [], loading: false, noResults: false });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setState((prev) => ({ ...prev, loading: true, noResults: false }));
      try {
        const searchEndpoint = `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(
          algoliaConfig.indexName,
        )}/query`;

        const response = await fetch(searchEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Algolia-API-Key': algoliaConfig.apiKey,
            'X-Algolia-Application-Id': algoliaConfig.appId,
          },
          body: JSON.stringify({ query: trimmed, hitsPerPage: DEFAULT_HITS_PER_PAGE }),
          signal: controller.signal,
        });

        if (!response.ok) {
          setState({ hits: [], loading: false, noResults: true });
          return;
        }

        const data = (await response.json()) as { hits?: AlgoliaHit[] };
        const hits = data.hits ?? [];
        setState({ hits, loading: false, noResults: hits.length === 0 });
      } catch (_error) {
        if (controller.signal.aborted) return;
        setState({ hits: [], loading: false, noResults: true });
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [algoliaConfig, query]);

  return (
    <Layout title="Search" description="Search Hashgraph Online">
      <main className="container margin-vert--lg">
        <h1>Search</h1>
        <p className="text--muted">
          Powered by{' '}
          <a href="https://www.algolia.com/" rel="noopener noreferrer" target="_blank">
            Algolia
          </a>
          .
        </p>

        {!algoliaConfig ? (
          <p className="text--muted">Search is not configured.</p>
        ) : (
          <>
            <label htmlFor="hol-search-input" className="sr-only">
              Search query
            </label>
            <input
              id="hol-search-input"
              type="search"
              className="input input--lg"
              placeholder="Search…"
              value={query}
              onChange={handleQueryChange}
              autoComplete="off"
            />

            <div className="margin-top--lg">
              {state.loading ? (
                <p className="text--muted">Searching…</p>
              ) : state.noResults ? (
                <p className="text--muted">No results.</p>
              ) : state.hits.length > 0 ? (
                <ul className="clean-list">
                  {state.hits.map((hit) => (
                    <SearchResultItem key={hit.objectID} hit={hit} />
                  ))}
                </ul>
              ) : null}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}

