import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from '../ui';
import './ProductImage.css';

/**
 * ProductImage component with loading states and optimization
 * Supports lazy loading, error handling, and accessibility
 */
const ProductImage = ({
  src,
  alt,
  placeholder = '/images/placeholder-product.jpg',
  fallback = '/images/default-product.jpg',
  loading = 'lazy',
  sizes,
  className = '',
  onLoad,
  onError,
  aspectRatio = '1/1',
  objectFit = 'cover',
  showLoadingSpinner = true,
  ...props
}) => {
  const [imageState, setImageState] = useState('loading');
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading !== 'lazy') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Load the actual image when in view
  useEffect(() => {
    if (!inView || !src) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(src);
      setImageState('loaded');
      if (onLoad) onLoad();
    };
    
    img.onerror = () => {
      setCurrentSrc(fallback);
      setImageState('error');
      if (onError) onError();
    };
    
    img.src = src;
  }, [inView, src, fallback, onLoad, onError]);

  const imageClasses = [
    'product-image',
    `product-image--${imageState}`,
    className
  ].filter(Boolean).join(' ');

  const containerStyle = {
    aspectRatio,
    ...props.style
  };

  const imageStyle = {
    objectFit
  };

  return (
    <div 
      ref={imgRef}
      className="product-image-container"
      style={containerStyle}
    >
      {/* Loading Spinner */}
      {showLoadingSpinner && imageState === 'loading' && (
        <div className="product-image-loading">
          <LoadingSpinner size="small" variant="muted" />
        </div>
      )}

      {/* Main Image */}
      <img
        src={currentSrc}
        alt={alt}
        className={imageClasses}
        style={imageStyle}
        sizes={sizes}
        loading={loading}
        {...props}
      />

      {/* Error State */}
      {imageState === 'error' && (
        <div className="product-image-error">
          <svg className="product-image-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
        </div>
      )}
    </div>
  );
};

/**
 * ProductImageGallery component for multiple product images
 */
const ProductImageGallery = ({
  images = [],
  alt,
  className = '',
  onImageChange,
  showThumbnails = true,
  ...imageProps
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (onImageChange) {
      onImageChange(images[index], index);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThumbnailClick(index);
    }
  };

  if (!images.length) {
    return (
      <ProductImage
        src=""
        alt={alt}
        className={className}
        {...imageProps}
      />
    );
  }

  return (
    <div className={`product-image-gallery ${className}`}>
      {/* Main Image */}
      <div className="product-image-gallery-main">
        <ProductImage
          src={images[activeIndex]}
          alt={`${alt} - Image ${activeIndex + 1}`}
          {...imageProps}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="product-image-gallery-nav product-image-gallery-nav--prev"
              onClick={() => handleThumbnailClick(activeIndex > 0 ? activeIndex - 1 : images.length - 1)}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <button
              className="product-image-gallery-nav product-image-gallery-nav--next"
              onClick={() => handleThumbnailClick(activeIndex < images.length - 1 ? activeIndex + 1 : 0)}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="product-image-gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={index}
              className={`product-image-gallery-thumbnail ${
                index === activeIndex ? 'product-image-gallery-thumbnail--active' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`View image ${index + 1}`}
            >
              <ProductImage
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                showLoadingSpinner={false}
                aspectRatio="1/1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Attach sub-component to main component
ProductImage.Gallery = ProductImageGallery;

export default ProductImage;