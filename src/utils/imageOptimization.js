/**
 * Image Optimization Utilities
 * Provides utilities for optimizing image loading and performance
 */

/**
 * Generate responsive image sources for different screen sizes
 * @param {string} imagePath - Base image path
 * @param {string} imageName - Image filename without extension
 * @param {string} extension - Image file extension
 * @returns {object} Object with different image sizes
 */
export const generateResponsiveImageSources = (imagePath, imageName, extension = 'jpeg') => {
  const basePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  const baseImage = `${basePath}/${imageName}.${extension}`;
  
  return {
    // Original image
    original: baseImage,
    
    // Thumbnail for product cards (300x300)
    thumbnail: baseImage, // In a real app, you'd have different sizes
    
    // Medium size for product details (600x600)
    medium: baseImage,
    
    // Large size for zoom/lightbox (1200x1200)
    large: baseImage,
    
    // WebP versions (if available)
    webp: {
      thumbnail: baseImage.replace(`.${extension}`, '.webp'),
      medium: baseImage.replace(`.${extension}`, '.webp'),
      large: baseImage.replace(`.${extension}`, '.webp')
    }
  };
};

/**
 * Get optimized image path based on device pixel ratio and screen size
 * @param {string} imagePath - Base image path
 * @param {number} targetWidth - Target display width
 * @param {number} devicePixelRatio - Device pixel ratio (default: window.devicePixelRatio)
 * @returns {string} Optimized image path
 */
export const getOptimizedImagePath = (imagePath, targetWidth = 300, devicePixelRatio = null) => {
  const dpr = devicePixelRatio || (typeof window !== 'undefined' ? window.devicePixelRatio : 1);
  const actualWidth = Math.ceil(targetWidth * dpr);
  
  // In a real implementation, you would have different image sizes
  // For now, we'll use the original image but add query parameters for future optimization
  return `${imagePath}?w=${actualWidth}&q=75`;
};

/**
 * Preload critical images for better performance
 * @param {Array<string>} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  if (typeof window === 'undefined') return;
  
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Check if WebP format is supported by the browser
 * @returns {Promise<boolean>} Promise that resolves to true if WebP is supported
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Get the best image format based on browser support
 * @param {string} imagePath - Original image path
 * @returns {Promise<string>} Promise that resolves to the best image path
 */
export const getBestImageFormat = async (imagePath) => {
  const webpSupported = await supportsWebP();
  
  if (webpSupported && imagePath.includes('.jpeg')) {
    const webpPath = imagePath.replace('.jpeg', '.webp');
    // In a real app, you'd check if the WebP version exists
    return webpPath;
  }
  
  return imagePath;
};

/**
 * Lazy load images with intersection observer
 * @param {HTMLElement} imageElement - Image element to lazy load
 * @param {string} imageSrc - Image source URL
 * @param {object} options - Intersection observer options
 */
export const lazyLoadImage = (imageElement, imageSrc, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = imageSrc;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  }, defaultOptions);

  observer.observe(imageElement);
};

/**
 * Compress image quality for different use cases
 * @param {string} imagePath - Original image path
 * @param {string} quality - Quality level ('low', 'medium', 'high')
 * @returns {string} Image path with quality parameter
 */
export const getCompressedImage = (imagePath, quality = 'medium') => {
  const qualityMap = {
    low: 60,
    medium: 75,
    high: 90
  };
  
  const qualityValue = qualityMap[quality] || 75;
  return `${imagePath}${imagePath.includes('?') ? '&' : '?'}q=${qualityValue}`;
};

/**
 * Generate srcset for responsive images
 * @param {string} basePath - Base image path
 * @param {Array<number>} widths - Array of widths for different breakpoints
 * @returns {string} srcset string
 */
export const generateSrcSet = (basePath, widths = [300, 600, 900, 1200]) => {
  return widths
    .map(width => `${getOptimizedImagePath(basePath, width)} ${width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 * @param {Array<object>} breakpoints - Array of breakpoint objects
 * @returns {string} sizes string
 */
export const generateSizes = (breakpoints = []) => {
  const defaultBreakpoints = [
    { minWidth: '1200px', size: '300px' },
    { minWidth: '768px', size: '250px' },
    { minWidth: '480px', size: '200px' },
    { size: '100vw' }
  ];
  
  const points = breakpoints.length > 0 ? breakpoints : defaultBreakpoints;
  
  return points
    .map(bp => bp.minWidth ? `(min-width: ${bp.minWidth}) ${bp.size}` : bp.size)
    .join(', ');
};

/**
 * Product image optimization specifically for e-commerce
 */
export const ProductImageOptimizer = {
  /**
   * Get optimized product image for different contexts
   * @param {string} imageName - Product image name
   * @param {string} context - Context ('thumbnail', 'card', 'detail', 'zoom')
   * @returns {object} Optimized image configuration
   */
  getProductImage: (imageName, context = 'card') => {
    const basePath = '/images';
    const extension = 'jpeg';
    
    const contextConfig = {
      thumbnail: { width: 150, quality: 'medium' },
      card: { width: 300, quality: 'medium' },
      detail: { width: 600, quality: 'high' },
      zoom: { width: 1200, quality: 'high' }
    };
    
    const config = contextConfig[context] || contextConfig.card;
    const imagePath = `${basePath}/${imageName}.${extension}`;
    
    return {
      src: getOptimizedImagePath(imagePath, config.width),
      srcSet: generateSrcSet(imagePath),
      sizes: generateSizes(),
      alt: `Product image: ${imageName}`,
      loading: context === 'thumbnail' ? 'eager' : 'lazy',
      quality: config.quality
    };
  },

  /**
   * Preload critical product images (above the fold)
   * @param {Array<string>} productImages - Array of product image names
   * @param {number} count - Number of images to preload
   */
  preloadCriticalImages: (productImages, count = 4) => {
    const criticalImages = productImages
      .slice(0, count)
      .map(imageName => `/images/${imageName}.jpeg`);
    
    preloadImages(criticalImages);
  }
};

const imageOptimizationUtils = {
  generateResponsiveImageSources,
  getOptimizedImagePath,
  preloadImages,
  supportsWebP,
  getBestImageFormat,
  lazyLoadImage,
  getCompressedImage,
  generateSrcSet,
  generateSizes,
  ProductImageOptimizer
};

export default imageOptimizationUtils;