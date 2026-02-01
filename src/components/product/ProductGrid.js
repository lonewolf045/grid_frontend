import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

/**
 * ProductGrid component with responsive behavior
 * Supports different grid layouts, loading states, and empty states
 */
const ProductGrid = ({
  products = [],
  loading = false,
  columns = 'auto',
  gap = 'medium',
  onAddToCart,
  emptyMessage = 'No products found',
  emptyDescription = 'Try adjusting your search or browse our categories.',
  showQuickActions = true,
  cardVariant = 'default',
  className = '',
  ...props
}) => {
  const gridClasses = [
    'product-grid',
    `product-grid--columns-${columns}`,
    `product-grid--gap-${gap}`,
    loading && 'product-grid--loading',
    className
  ].filter(Boolean).join(' ');

  // Loading state
  if (loading) {
    return (
      <div className={gridClasses} {...props}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard
            key={`skeleton-${index}`}
            product={{}}
            loading={true}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="product-grid-empty-content">
          <div className="product-grid-empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h3 className="product-grid-empty-title">
            {emptyMessage}
          </h3>
          <p className="product-grid-empty-description">
            {emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={gridClasses} {...props}>
      {products.map((product, index) => (
        <ProductCard
          key={product.item_id || product.id || index}
          product={product}
          onAddToCart={onAddToCart}
          showQuickActions={showQuickActions}
          variant={cardVariant}
        />
      ))}
    </div>
  );
};

/**
 * ProductGridSection component for organized product display
 */
const ProductGridSection = ({
  title,
  subtitle,
  products,
  loading,
  onAddToCart,
  onViewAll,
  showViewAll = false,
  maxItems,
  className = '',
  ...gridProps
}) => {
  const displayProducts = maxItems ? products?.slice(0, maxItems) : products;

  return (
    <section className={`product-grid-section ${className}`}>
      {(title || subtitle) && (
        <div className="product-grid-section-header">
          <div className="product-grid-section-info">
            {title && (
              <h2 className="product-grid-section-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="product-grid-section-subtitle">
                {subtitle}
              </p>
            )}
          </div>
          {showViewAll && onViewAll && (
            <button
              className="product-grid-section-view-all"
              onClick={onViewAll}
            >
              View All
              <svg className="product-grid-section-view-all-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}
      
      <ProductGrid
        products={displayProducts}
        loading={loading}
        onAddToCart={onAddToCart}
        {...gridProps}
      />
    </section>
  );
};

// Attach sub-component to main component
ProductGrid.Section = ProductGridSection;

export default ProductGrid;