import React from 'react';
import './Card.css';

/**
 * Enhanced Card component with consistent styling
 * Supports different variants, hover effects, and accessibility features
 */
const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  shadow = 'base',
  hover = false,
  clickable = false,
  onClick,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    `card--shadow-${shadow}`,
    hover && 'card--hover',
    clickable && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <Component
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Card Header component
 */
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Body component
 */
const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Footer component
 */
const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Title component
 */
const CardTitle = ({ children, level = 3, className = '', ...props }) => {
  const Tag = `h${level}`;
  return (
    <Tag className={`card-title ${className}`} {...props}>
      {children}
    </Tag>
  );
};

/**
 * Card Description component
 */
const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`card-description ${className}`} {...props}>
    {children}
  </p>
);

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;