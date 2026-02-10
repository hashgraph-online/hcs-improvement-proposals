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
}

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
  showStatusFilter = false 
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
        <div className="elaborate-standards-header">
          <h1 className="standards-main-title">{title}</h1>
          <p className="elaborate-standards-subtitle">{subtitle}</p>
        </div>
        
        {(showSearch || showCategoryFilter || showStatusFilter) && (
          <div className="standards-filters">
            {showSearch && (
              <div className="standards-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="standards-search-input"
                />
              </div>
            )}
            
            <div className="standards-filter-group">
              {showCategoryFilter && categories.length > 1 && (
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="standards-filter-select"
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
  );
}
