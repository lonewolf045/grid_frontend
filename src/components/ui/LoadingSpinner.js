import React from 'react';
import './LoadingSpinner.css';

/**
 * Enhanced LoadingSpinner component
 * Supports multiple variants, sizes, and accessibility features
 */
const LoadingSpinner = ({
  size = 'medium',
  variant = 'primary',
  text,
  overlay = false,
  className = '',
  ...props
}) => {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner--${size}`,
    `loading-spinner--${variant}`,
    overlay && 'loading-spinner--overlay',
    className
  ].filter(Boolean).join(' ');

  const SpinnerContent = () => (
    <div className={spinnerClasses} role="status" aria-label="Loading" {...props}>
      <svg className="loading-spinner__svg" viewBox="0 0 50 50">
        <circle
          className="loading-spinner__circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      {text && (
        <span className="loading-spinner__text" aria-live="polite">
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-spinner-overlay">
        <SpinnerContent />
      </div>
    );
  }

  return <SpinnerContent />;
};

/**
 * Dots Loading Spinner variant
 */
const DotsSpinner = ({
  size = 'medium',
  variant = 'primary',
  text,
  className = '',
  ...props
}) => {
  const spinnerClasses = [
    'dots-spinner',
    `dots-spinner--${size}`,
    `dots-spinner--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={spinnerClasses} role="status" aria-label="Loading" {...props}>
      <div className="dots-spinner__dot"></div>
      <div className="dots-spinner__dot"></div>
      <div className="dots-spinner__dot"></div>
      {text && (
        <span className="dots-spinner__text" aria-live="polite">
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Pulse Loading Spinner variant
 */
const PulseSpinner = ({
  size = 'medium',
  variant = 'primary',
  text,
  className = '',
  ...props
}) => {
  const spinnerClasses = [
    'pulse-spinner',
    `pulse-spinner--${size}`,
    `pulse-spinner--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={spinnerClasses} role="status" aria-label="Loading" {...props}>
      <div className="pulse-spinner__circle"></div>
      {text && (
        <span className="pulse-spinner__text" aria-live="polite">
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Skeleton Loading component for content placeholders
 */
const Skeleton = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  className = '',
  ...props
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
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
      {...props}
    />
  );
};

// Attach variants to main LoadingSpinner component
LoadingSpinner.Dots = DotsSpinner;
LoadingSpinner.Pulse = PulseSpinner;
LoadingSpinner.Skeleton = Skeleton;

export default LoadingSpinner;