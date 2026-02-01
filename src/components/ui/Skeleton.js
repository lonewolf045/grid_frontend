import React from 'react';
import './Skeleton.css';

/**
 * Skeleton component for loading states
 * Provides various skeleton shapes and animations for content placeholders
 */
const Skeleton = ({
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  animation = 'wave',
  className = '',
  children,
  ...props
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    `skeleton--${animation}`,
    className
  ].filter(Boolean).join(' ');

  const style = {
    width,
    height,
    ...props.style
  };

  return (
    <div
      className={skeletonClasses}
      style={style}
      aria-label="Loading content"
      role="status"
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Text Skeleton for text content
 */
const TextSkeleton = ({
  lines = 1,
  spacing = 'normal',
  lastLineWidth = '60%',
  className = '',
  ...props
}) => {
  if (lines === 1) {
    return (
      <Skeleton
        variant="text"
        className={`text-skeleton ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className={`text-skeleton-group text-skeleton-group--${spacing} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          className="text-skeleton-line"
          {...props}
        />
      ))}
    </div>
  );
};

/**
 * Avatar Skeleton for profile pictures
 */
const AvatarSkeleton = ({
  size = 'medium',
  className = '',
  ...props
}) => {
  return (
    <Skeleton
      variant="circular"
      className={`avatar-skeleton avatar-skeleton--${size} ${className}`}
      {...props}
    />
  );
};

/**
 * Card Skeleton for card layouts
 */
const CardSkeleton = ({
  hasImage = true,
  hasAvatar = false,
  lines = 3,
  actions = 1,
  className = '',
  ...props
}) => {
  return (
    <div className={`card-skeleton ${className}`} {...props}>
      {hasImage && (
        <Skeleton
          variant="rectangular"
          height="200px"
          className="card-skeleton-image"
        />
      )}
      
      <div className="card-skeleton-content">
        {hasAvatar && (
          <div className="card-skeleton-header">
            <AvatarSkeleton size="small" />
            <div className="card-skeleton-header-text">
              <Skeleton variant="text" width="40%" height="1rem" />
              <Skeleton variant="text" width="60%" height="0.875rem" />
            </div>
          </div>
        )}
        
        <div className="card-skeleton-body">
          <TextSkeleton lines={lines} />
        </div>
        
        {actions > 0 && (
          <div className="card-skeleton-actions">
            {Array.from({ length: actions }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="80px"
                height="36px"
                className="card-skeleton-action"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Table Skeleton for table layouts
 */
const TableSkeleton = ({
  rows = 5,
  columns = 4,
  hasHeader = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`table-skeleton ${className}`} {...props}>
      {hasHeader && (
        <div className="table-skeleton-header">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              height="1.25rem"
              className="table-skeleton-header-cell"
            />
          ))}
        </div>
      )}
      
      <div className="table-skeleton-body">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="table-skeleton-row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="text"
                height="1rem"
                className="table-skeleton-cell"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * List Skeleton for list layouts
 */
const ListSkeleton = ({
  items = 5,
  hasAvatar = false,
  hasSecondaryText = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`list-skeleton ${className}`} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="list-skeleton-item">
          {hasAvatar && <AvatarSkeleton size="small" />}
          
          <div className="list-skeleton-content">
            <Skeleton variant="text" width="70%" height="1rem" />
            {hasSecondaryText && (
              <Skeleton variant="text" width="50%" height="0.875rem" />
            )}
          </div>
          
          <Skeleton variant="text" width="60px" height="0.875rem" />
        </div>
      ))}
    </div>
  );
};

/**
 * Product Grid Skeleton for product layouts
 */
const ProductGridSkeleton = ({
  items = 8,
  columns = 4,
  className = '',
  ...props
}) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: 'var(--space-6)'
  };

  return (
    <div className={`product-grid-skeleton ${className}`} style={gridStyle} {...props}>
      {Array.from({ length: items }).map((_, index) => (
        <CardSkeleton
          key={index}
          hasImage={true}
          lines={2}
          actions={1}
          className="product-grid-skeleton-item"
        />
      ))}
    </div>
  );
};

// Attach sub-components to main component
Skeleton.Text = TextSkeleton;
Skeleton.Avatar = AvatarSkeleton;
Skeleton.Card = CardSkeleton;
Skeleton.Table = TableSkeleton;
Skeleton.List = ListSkeleton;
Skeleton.ProductGrid = ProductGridSkeleton;

export default Skeleton;