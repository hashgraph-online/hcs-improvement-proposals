import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';

interface CategoryItem {
  title: string;
  href: string;
  description: string;
  icon?: string;
  category?: string;
  status?: 'published' | 'draft';
  features?: string[];
}

interface CategoryShowcaseProps {
  title: string;
  subtitle: string;
  items: CategoryItem[];
  showSearch?: boolean;
  showCategoryFilter?: boolean;
  showStatusFilter?: boolean;
  preferCriticalAboveFoldStyles?: boolean;
}

const DEFERRED_RESULTS_STYLE: React.CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: 'auto 2800px',
};

const CRITICAL_HEADER_STYLE: React.CSSProperties = {
  marginBottom: '1.25rem',
  textAlign: 'center',
};

const CRITICAL_TITLE_STYLE: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  color: '#1f376d',
  fontFamily:
    "ui-monospace, 'SFMono-Regular', 'SF Mono', Menlo, Consolas, monospace",
  fontSize: 'clamp(2.2rem, 8vw, 3rem)',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  lineHeight: 1.05,
};

const CRITICAL_SUBTITLE_STYLE: React.CSSProperties = {
  maxWidth: '40rem',
  margin: '0 auto',
  color: '#4b5563',
  fontSize: '1rem',
  lineHeight: 1.45,
};

const CRITICAL_FILTERS_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  margin: '1.5rem 0 0',
  padding: '1rem',
  border: '1px solid rgba(85, 153, 254, 0.12)',
  borderRadius: '0.75rem',
  background: 'rgba(85, 153, 254, 0.03)',
};

const CRITICAL_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minHeight: '44px',
  padding: '0.75rem 1rem',
  border: '1px solid #d0d7e2',
  borderRadius: '0.375rem',
  background: '#ffffff',
  color: '#111827',
};

const CRITICAL_FILTER_GROUP_STYLE: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const CRITICAL_SELECT_STYLE: React.CSSProperties = {
  minWidth: '150px',
  minHeight: '44px',
  padding: '0.5rem 1rem',
  border: '1px solid #d0d7e2',
  borderRadius: '0.375rem',
  background: '#ffffff',
  color: '#111827',
};

const CategoryCard = ({ item }: { item: CategoryItem }) => (
  <div className="elaborate-standard-card">
    <div className="elaborate-standard-card-header">
      <div className="elaborate-standard-number">{item.icon || '📄'}</div>
      {item.status && (
        <div className="elaborate-standard-badges">
          <span className={`elaborate-status-badge ${item.status === 'published' ? 'elaborate-status-published' : 'elaborate-status-draft'}`}>
            {item.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
      )}
    </div>
    
    <h3 className="elaborate-standard-title">
      <Link to={item.href} className="elaborate-standard-link">
        {item.title}
      </Link>
    </h3>
    
    {item.category && (
      <div className="elaborate-standard-category">{item.category}</div>
    )}
    
    <p className="elaborate-standard-description">{item.description}</p>
    
    {item.features && (
      <div className="elaborate-standard-features">
        <strong>Key Features:</strong> {item.features.join(', ')}
      </div>
    )}
    
    <div className="elaborate-standard-actions">
      <Link to={item.href} className="elaborate-standard-cta">
        <span>Explore</span>
      </Link>
    </div>
  </div>
);

export default function CategoryShowcase({ 
  title, 
  subtitle, 
  items, 
  showSearch = false, 
  showCategoryFilter = false, 
  showStatusFilter = false,
  preferCriticalAboveFoldStyles = false,
}: CategoryShowcaseProps): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = useMemo(() => {
    if (!showCategoryFilter) return [];
    const cats = [...new Set(items.map(item => item.category).filter(Boolean))];
    return ['all', ...cats.sort()];
  }, [items, showCategoryFilter]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !showSearch || searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.features && item.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = !showCategoryFilter || selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = !showStatusFilter || selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus, items, showSearch, showCategoryFilter, showStatusFilter]);

  return (
    <div className="elaborate-standards-page">
      <div className="container margin-vert--lg">
        <div
          className="elaborate-standards-header"
          style={preferCriticalAboveFoldStyles ? CRITICAL_HEADER_STYLE : undefined}
        >
          <h1
            className="standards-main-title"
            style={preferCriticalAboveFoldStyles ? CRITICAL_TITLE_STYLE : undefined}
          >
            {title}
          </h1>
          <p
            className="elaborate-standards-subtitle"
            style={preferCriticalAboveFoldStyles ? CRITICAL_SUBTITLE_STYLE : undefined}
          >
            {subtitle}
          </p>
        </div>
        
        {(showSearch || showCategoryFilter || showStatusFilter) && (
          <div
            className="standards-filters"
            style={preferCriticalAboveFoldStyles ? CRITICAL_FILTERS_STYLE : undefined}
          >
            {showSearch && (
              <div className="standards-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="standards-search-input"
                  style={preferCriticalAboveFoldStyles ? CRITICAL_INPUT_STYLE : undefined}
                />
              </div>
            )}
            
            <div
              className="standards-filter-group"
              style={
                preferCriticalAboveFoldStyles
                  ? CRITICAL_FILTER_GROUP_STYLE
                  : undefined
              }
            >
              {showCategoryFilter && categories.length > 1 && (
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="standards-filter-select"
                  style={preferCriticalAboveFoldStyles ? CRITICAL_SELECT_STYLE : undefined}
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
              
              {showStatusFilter && (
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="standards-filter-select"
                  style={preferCriticalAboveFoldStyles ? CRITICAL_SELECT_STYLE : undefined}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              )}
            </div>
          </div>
        )}
        
        {(showSearch || showCategoryFilter || showStatusFilter) && (
          <div className="standards-results-info">
            Showing {filteredItems.length} of {items.length} items
          </div>
        )}
        
        <div style={DEFERRED_RESULTS_STYLE}>
          <div className="elaborate-standards-grid">
            {filteredItems.map((item, index) => (
              <CategoryCard key={item.href || index} item={item} />
            ))}
          </div>
          
          {filteredItems.length === 0 && (showSearch || showCategoryFilter || showStatusFilter) && (
            <div className="standards-no-results">
              No items found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
