import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { 
  getBestImageFormat,
  ProductImageOptimizer 
} from '../../utils/imageOptimization';
import './OptimizedImage.css';

/**
 * OptimizedImage component with lazy loading and error handling
 * Supports responsive images, loading states, and accessibility
 */
const OptimizedImage = ({
  src,
  alt,
  placeholder = '/images/placeholder.jpg',
  fallback = '/images/default-image.jpg',
  loading = 'lazy',
  sizes,
  srcSet,
  className = '',
  onLoad,
  onError,
  aspectRatio,
  objectFit = 'cover',
  showLoadingSpinner = true,
  blur = true,
  quality = 'auto',
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

    const loadOptimizedImage = async () => {
      try {
        // Get the best image format (WebP if supported)
        const optimizedSrc = await getBestImageFormat(src);
        
        const img = new Image();
        
        img.onload = () => {
          setCurrentSrc(optimizedSrc);
          setImageState('loaded');
          if (onLoad) onLoad();
        };
        
        img.onerror = () => {
          // Fallback to original format if optimized version fails
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setCurrentSrc(src);
            setImageState('loaded');
            if (onLoad) onLoad();
          };
          fallbackImg.onerror = () => {
            setCurrentSrc(fallback);
            setImageState('error');
            if (onError) onError();
          };
          fallbackImg.src = src;
        };
        
        // Set srcset if provided
        if (srcSet) {
          img.srcset = srcSet;
        }
        
        img.src = optimizedSrc;
      } catch (error) {
        // Fallback to original image if optimization fails
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
      }
    };

    loadOptimizedImage();
  }, [inView, src, srcSet, fallback, onLoad, onError]);

  const imageClasses = [
    'optimized-image',
    `optimized-image--${imageState}`,
    blur && imageState === 'loading' && 'optimized-image--blur',
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
      className="optimized-image-container"
      style={containerStyle}
    >
      {/* Loading Spinner */}
      {showLoadingSpinner && imageState === 'loading' && (
        <div className="optimized-image-loading">
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
        srcSet={imageState === 'loaded' ? srcSet : undefined}
        loading={loading}
        {...props}
      />

      {/* Error State */}
      {imageState === 'error' && (
        <div className="optimized-image-error">
          <svg className="optimized-image-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <span className="optimized-image-error-text">Image not available</span>
        </div>
      )}
    </div>
  );
};

/**
 * ResponsiveImage component for different screen sizes
 */
const ResponsiveImage = ({
  images = {},
  alt,
  className = '',
  ...imageProps
}) => {
  const {
    mobile,
    tablet,
    desktop,
    default: defaultSrc
  } = images;

  // Generate srcSet from provided images
  const srcSet = [
    mobile && `${mobile} 576w`,
    tablet && `${tablet} 768w`,
    desktop && `${desktop} 1200w`
  ].filter(Boolean).join(', ');

  const sizes = [
    mobile && '(max-width: 576px) 576px',
    tablet && '(max-width: 768px) 768px',
    desktop && '(max-width: 1200px) 1200px',
    '100vw'
  ].filter(Boolean).join(', ');

  return (
    <OptimizedImage
      src={defaultSrc || desktop || tablet || mobile}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`responsive-image ${className}`}
      {...imageProps}
    />
  );
};

/**
 * Avatar component for user profile images
 */
const Avatar = ({
  src,
  alt,
  size = 'medium',
  fallbackText,
  className = '',
  ...imageProps
}) => {
  const [imageError, setImageError] = useState(false);

  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  const handleError = () => {
    setImageError(true);
    if (imageProps.onError) {
      imageProps.onError();
    }
  };

  if (imageError || !src) {
    return (
      <div className={`${avatarClasses} avatar--fallback`}>
        {fallbackText && (
          <span className="avatar-fallback-text">
            {fallbackText.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={avatarClasses}
      aspectRatio="1/1"
      objectFit="cover"
      onError={handleError}
      showLoadingSpinner={false}
      {...imageProps}
    />
  );
};

// Attach sub-components to main component
OptimizedImage.Responsive = ResponsiveImage;
OptimizedImage.Avatar = Avatar;

export default OptimizedImage;

/**
 * ProductImage component optimized for e-commerce product images
 */
const ProductImage = ({
  productName,
  imageName,
  context = 'card',
  className = '',
  ...imageProps
}) => {
  const imageConfig = ProductImageOptimizer.getProductImage(imageName || productName, context);
  
  const productImageClasses = [
    'product-image',
    `product-image--${context}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <OptimizedImage
      src={imageConfig.src}
      srcSet={imageConfig.srcSet}
      sizes={imageConfig.sizes}
      alt={imageConfig.alt}
      loading={imageConfig.loading}
      className={productImageClasses}
      aspectRatio="1/1"
      objectFit="cover"
      {...imageProps}
    />
  );
};

// Attach ProductImage to main component
OptimizedImage.Product = ProductImage;