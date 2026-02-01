import React, { useState, memo } from 'react';
import { Card, Button, LoadingSpinner, OptimizedImage } from '../ui';
import './ProductCard.css';

/**
 * Enhanced ProductCard component with modern styling
 * Supports hover effects, loading states, and accessibility
 * Memoized for performance optimization
 */
const ProductCard = memo(({
  product,
  onAddToCart,
  loading = false,
  variant = 'default',
  showQuickActions = true,
  className = '',
  ...props
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (isAddingToCart || !onAddToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart({
        id: product.name,
        product,
        amount: 1,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? `₹${price.toFixed(2)}` : `₹${price}`;
  };

  const discountPercentage = product.discount > 0 
    ? Math.round(((product.oprice - product.dprice) / product.oprice) * 100)
    : 0;

  const cardClasses = [
    'product-card',
    `product-card--${variant}`,
    loading && 'product-card--loading',
    className
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <Card className={cardClasses} padding="medium">
        <div className="product-card-skeleton">
          <LoadingSpinner.Skeleton height="200px" variant="rectangular" />
          <div className="product-card-skeleton-content">
            <LoadingSpinner.Skeleton height="1.5rem" width="80%" />
            <LoadingSpinner.Skeleton height="1rem" width="60%" />
            <LoadingSpinner.Skeleton height="2rem" width="40%" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cardClasses}
      hover
      padding="none"
      {...props}
    >
      {/* Product Image */}
      <div className="product-card-image-container">
        <OptimizedImage.Product
          imageName={product.item_id}
          productName={product.name}
          context="card"
          className="product-card-image"
          placeholder="/images/placeholder-product.jpg"
          fallback="/images/default-product.jpg"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="product-card-badge product-card-badge--discount">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Quick Actions Overlay */}
        {showQuickActions && (
          <div className="product-card-overlay">
            <div className="product-card-quick-actions">
              <Button
                variant="ghost"
                size="small"
                className="product-card-quick-action"
                aria-label={`View ${product.name} details`}
              >
                <svg className="product-card-quick-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="small"
                className="product-card-quick-action"
                aria-label={`Add ${product.name} to wishlist`}
              >
                <svg className="product-card-quick-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Product Content */}
      <Card.Body className="product-card-content">
        <div className="product-card-header">
          <h3 className="product-card-title">
            {product.name}
          </h3>
          {product.shortDesc && (
            <p className="product-card-description">
              {product.shortDesc}
            </p>
          )}
        </div>

        <div className="product-card-pricing">
          {product.discount > 0 ? (
            <div className="product-card-price-group">
              <span className="product-card-price product-card-price--current">
                {formatPrice(product.dprice)}
              </span>
              <span className="product-card-price product-card-price--original">
                {formatPrice(product.oprice)}
              </span>
            </div>
          ) : (
            <span className="product-card-price product-card-price--single">
              {formatPrice(product.oprice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="product-card-stock">
            {product.stock > 0 ? (
              <span className="product-card-stock-status product-card-stock-status--in-stock">
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            ) : (
              <span className="product-card-stock-status product-card-stock-status--out-of-stock">
                Out of Stock
              </span>
            )}
          </div>
        )}
      </Card.Body>

      {/* Product Actions */}
      <Card.Footer className="product-card-footer">
        <Button
          variant="primary"
          fullWidth
          loading={isAddingToCart}
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </Card.Footer>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;