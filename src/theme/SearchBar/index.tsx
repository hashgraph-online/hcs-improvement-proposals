import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

const SearchBar: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const algoliaConfig = siteConfig?.themeConfig?.algolia as
    | {
        appId: string;
        apiKey: string;
        indexName: string;
      }
    | undefined;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<AlgoliaHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const clearSearch = useCallback(() => {
    setQuery('');
    setHits([]);
    setNoResults(false);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isExpanded) {
      root.classList.add('navbar-search-expanded');
    } else {
      root.classList.remove('navbar-search-expanded');
    }
    return () => {
      root.classList.remove('navbar-search-expanded');
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!algoliaConfig?.appId || !algoliaConfig?.apiKey || !algoliaConfig?.indexName) return;
    if (!query.trim()) {
      setHits([]);
      setNoResults(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const searchEndpoint = `https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/${encodeURIComponent(
          algoliaConfig.indexName
        )}/query`;
        const response = await fetch(searchEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Algolia-API-Key': algoliaConfig.apiKey,
            'X-Algolia-Application-Id': algoliaConfig.appId,
          },
          body: JSON.stringify({ query, hitsPerPage: 6 }),
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Algolia request failed');
        }
        const data = await response.json();
        setHits(data.hits ?? []);
        setNoResults((data.hits ?? []).length === 0);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Algolia search failed', error);
        setHits([]);
        setNoResults(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, algoliaConfig]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const firstResultUrl = hits[0]?.url;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (firstResultUrl) {
      window.location.href = firstResultUrl;
    }
  };

  const getTitle = (hit: AlgoliaHit) => {
    return (
      hit.hierarchy?.lvl2 ||
      hit.hierarchy?.lvl1 ||
      hit.hierarchy?.lvl0 ||
      hit.content ||
      hit.url
    );
  };

  const getMeta = (hit: AlgoliaHit) => {
    if (hit.hierarchy?.lvl0) return hit.hierarchy.lvl0;
    try {
      return new URL(hit.url).hostname;
    } catch (_error) {
      return hit.url;
    }
  };

  const getSnippet = (hit: AlgoliaHit) => {
    const snippet = hit._snippetResult?.content?.value;
    if (snippet) {
      return <span dangerouslySetInnerHTML={{ __html: snippet }} />;
    }
    return hit.content ?? '';
  };

  if (!algoliaConfig) {
    return null;
  }

  return (
    <div
      className={clsx('navbar-search-wrapper', { 'navbar-search-wrapper--active': isExpanded })}
      ref={containerRef}
    >
      <form onSubmit={handleSubmit} className='search-input-shell'>
        <span
          className='search-input-icon'
          aria-hidden='true'
          onClick={() => {
            if (!isExpanded) {
              setIsExpanded(true);
              setTimeout(() => {
                const input = containerRef.current?.querySelector('input');
                if (input) input.focus();
              }, 100);
            }
          }}
          style={{ cursor: isExpanded ? 'default' : 'pointer' }}
        >
          <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <circle cx='11' cy='11' r='7' />
            <line x1='16.65' y1='16.65' x2='21' y2='21' />
          </svg>
        </span>
        <input
          type='search'
          className='search-input-field'
          placeholder='Search...'
          value={query}
          onFocus={() => setIsExpanded(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!isExpanded) setIsExpanded(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              setIsExpanded(false);
              (event.target as HTMLInputElement).blur();
            }
          }}
        />
        {query && (
          <button
            type='button'
            aria-label='Clear search'
            className='search-input-clear'
            onClick={clearSearch}
          >
            ×
          </button>
        )}
        {isExpanded && !query && (
          <button
            type='button'
            aria-label='Close search'
            className='search-close-mobile'
            onClick={() => {
              setIsExpanded(false);
              const input = containerRef.current?.querySelector('input');
              if (input) input.blur();
            }}
          >
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        )}
      </form>

      {isExpanded && (query || hits.length > 0) && (
        <div className='search-suggestions-panel' role='listbox'>
          {loading ? (
            <div className='search-suggestions-empty'>Searching...</div>
          ) : noResults ? (
            <div className='search-suggestions-empty'>No matches yet. Keep typing!</div>
          ) : hits.length > 0 ? (
            <ul className='search-suggestions-list'>
              {hits.map((hit) => (
                <li key={hit.objectID} className='search-suggestions-item' role='option'>
                  <a href={hit.url}>
                    <div className='search-suggestions-title'>{getTitle(hit)}</div>
                    <div className='search-suggestions-snippet'>{getSnippet(hit)}</div>
                    <div className='search-suggestions-meta'>{getMeta(hit)}</div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className='search-suggestions-empty'>Type to search Hashgraph Online</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
