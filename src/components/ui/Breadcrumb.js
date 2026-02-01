import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Breadcrumb Navigation Component
 * Provides hierarchical navigation showing the user's current location
 */
const Breadcrumb = ({ 
  items = [], 
  separator = '/', 
  showHome = true,
  className = '',
  ...props 
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        icon: 'home'
      });
    }

    // Generate breadcrumbs from path segments
    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push({
        label,
        href,
        isActive: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs if there's only one item
  }

  const breadcrumbClasses = [
    'breadcrumb',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav 
      className={breadcrumbClasses} 
      aria-label="Breadcrumb navigation"
      {...props}
    >
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isActive = item.isActive || isLast;

          return (
            <li 
              key={item.href || index}
              className={`breadcrumb-item ${isActive ? 'breadcrumb-item--active' : ''}`}
            >
              {!isActive && item.href ? (
                <Link 
                  to={item.href}
                  className="breadcrumb-link"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.icon && (
                    <BreadcrumbIcon icon={item.icon} />
                  )}
                  <span className="breadcrumb-text">{item.label}</span>
                </Link>
              ) : (
                <span 
                  className="breadcrumb-current"
                  aria-current="page"
                >
                  {item.icon && (
                    <BreadcrumbIcon icon={item.icon} />
                  )}
                  <span className="breadcrumb-text">{item.label}</span>
                </span>
              )}

              {!isLast && (
                <span 
                  className="breadcrumb-separator" 
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Breadcrumb Icon Component
 */
const BreadcrumbIcon = ({ icon }) => {
  const icons = {
    home: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-icon">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    products: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-icon">
        <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-icon">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-icon">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="breadcrumb-icon">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    )
  };

  return icons[icon] || null;
};

/**
 * Hook to generate breadcrumbs based on route configuration
 */
export const useBreadcrumbs = (routeConfig = {}) => {
  const location = useLocation();

  const generateFromConfig = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', href: '/', icon: 'home' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const config = routeConfig[currentPath] || routeConfig[segment];
      
      if (config) {
        breadcrumbs.push({
          label: config.label || segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath,
          icon: config.icon
        });
      } else {
        breadcrumbs.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          href: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  return generateFromConfig();
};

export default Breadcrumb;