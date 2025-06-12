import React, { type ReactNode, useState, useMemo } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import type {Props} from '@theme/BlogListPage';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';

// Search and filter component
function BlogSearchFilters({ items, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extract all unique tags and authors from blog posts
  const { allTags, allAuthors } = useMemo(() => {
    const tagsSet = new Set<string>();
    const authorsSet = new Set<string>();

    items.forEach((post) => {
      // Extract tags
      if (post.content.metadata.tags) {
        post.content.metadata.tags.forEach((tag) => {
          tagsSet.add(tag.label);
        });
      }
      // Extract authors
      if (post.content.metadata.authors) {
        post.content.metadata.authors.forEach((author) => {
          authorsSet.add(author.name);
        });
      }
    });

    return {
      allTags: Array.from(tagsSet).sort(),
      allAuthors: Array.from(authorsSet).sort(),
    };
  }, [items]);

  // Update filters
  React.useEffect(() => {
    onFilterChange({ searchQuery, selectedTags, selectedAuthors });
  }, [searchQuery, selectedTags, selectedAuthors, onFilterChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors(prev =>
      prev.includes(author) ? prev.filter(a => a !== author) : [...prev, author]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedAuthors([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedAuthors.length > 0;

  return (
    <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '0.5rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem' }}>Search & Filter</h3>
      
      {/* Search Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.5rem',
              fontSize: '0.875rem',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--ifm-background-color)',
              color: 'var(--ifm-font-color-base)',
            }}
          />
          <FaSearch
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ifm-color-emphasis-600)',
              fontSize: '0.875rem',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ifm-color-emphasis-600)',
                padding: 0,
              }}
            >
              <FaTimes style={{ fontSize: '0.875rem' }} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <FaFilter style={{ fontSize: '0.75rem' }} /> {showFilters ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div style={{ marginBottom: '1rem' }}>
          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>Tags</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.7rem',
                      borderRadius: '1rem',
                      border: '1px solid',
                      borderColor: selectedTags.includes(tag) ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
                      backgroundColor: selectedTags.includes(tag) ? 'var(--ifm-color-primary)' : 'transparent',
                      color: selectedTags.includes(tag) ? 'white' : 'var(--ifm-font-color-base)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authors Filter */}
          {allAuthors.length > 0 && (
            <div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: '600' }}>Authors</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {allAuthors.map((author) => (
                  <button
                    key={author}
                    onClick={() => toggleAuthor(author)}
                    style={{
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.7rem',
                      borderRadius: '1rem',
                      border: '1px solid',
                      borderColor: selectedAuthors.includes(author) ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
                      backgroundColor: selectedAuthors.includes(author) ? 'var(--ifm-color-primary)' : 'transparent',
                      color: selectedAuthors.includes(author) ? 'white' : 'var(--ifm-font-color-base)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          style={{
            padding: '0.375rem 0.75rem',
            backgroundColor: 'transparent',
            color: 'var(--ifm-color-primary)',
            border: '1px solid var(--ifm-color-primary)',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            width: '100%',
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props & { filteredItems: any[], filters: any, setFilters: any }): ReactNode {
  const {metadata, sidebar, filteredItems, filters, setFilters, items} = props;
  
  const hasActiveFilters = filters.searchQuery || filters.selectedTags.length > 0 || filters.selectedAuthors.length > 0;
  
  return (
    <BlogLayout sidebar={sidebar}>
      <BlogSearchFilters items={items} onFilterChange={setFilters} />
      {hasActiveFilters && (
        <div style={{ marginBottom: '1rem', color: 'var(--ifm-color-emphasis-700)', fontSize: '0.875rem' }}>
          Showing {filteredItems.length} of {items.length} posts
        </div>
      )}
      <BlogPostItems items={filteredItems} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  const [filters, setFilters] = useState({
    searchQuery: '',
    selectedTags: [],
    selectedAuthors: [],
  });

  // Filter blog posts based on search and filters
  const filteredItems = useMemo(() => {
    return props.items.filter((post) => {
      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const title = post.content.metadata.title.toLowerCase();
        const description = post.content.metadata.description?.toLowerCase() || '';
        const frontMatter = post.content.frontMatter;
        const content = JSON.stringify(frontMatter).toLowerCase();
        
        if (!title.includes(query) && !description.includes(query) && !content.includes(query)) {
          return false;
        }
      }

      // Tag filter
      if (filters.selectedTags.length > 0) {
        const postTags = post.content.metadata.tags?.map(tag => tag.label) || [];
        if (!filters.selectedTags.some(tag => postTags.includes(tag))) {
          return false;
        }
      }

      // Author filter
      if (filters.selectedAuthors.length > 0) {
        const postAuthors = post.content.metadata.authors?.map(author => author.name) || [];
        if (!filters.selectedAuthors.some(author => postAuthors.includes(author))) {
          return false;
        }
      }

      return true;
    });
  }, [props.items, filters]);

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} filteredItems={filteredItems} filters={filters} setFilters={setFilters} />
    </HtmlClassNameProvider>
  );
}