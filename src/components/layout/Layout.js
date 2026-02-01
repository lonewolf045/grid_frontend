import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import './Layout.css';

/**
 * Layout wrapper component
 * Provides consistent layout structure across all pages
 */
const Layout = ({ 
  children, 
  className = '',
  showNavigation = true,
  showFooter = true,
  containerized = true,
  ...props 
}) => {
  const layoutClasses = [
    'layout',
    className
  ].filter(Boolean).join(' ');

  const mainClasses = [
    'layout-main',
    containerized && 'layout-main--containerized'
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses} {...props}>
      {showNavigation && <Navigation />}
      
      <main className={mainClasses} role="main">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * Page Layout component for standard pages
 */
const PageLayout = ({ 
  title, 
  subtitle, 
  children, 
  actions,
  breadcrumbs,
  className = '',
  ...props 
}) => {
  return (
    <Layout className={`page-layout ${className}`} {...props}>
      {breadcrumbs && (
        <div className="page-breadcrumbs">
          {breadcrumbs}
        </div>
      )}
      
      {(title || subtitle || actions) && (
        <div className="page-header">
          <div className="page-header-content">
            {title && (
              <h1 className="page-title">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="page-subtitle">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="page-actions">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className="page-content">
        {children}
      </div>
    </Layout>
  );
};

/**
 * Centered Layout component for auth pages, etc.
 */
const CenteredLayout = ({ 
  children, 
  maxWidth = 'md',
  className = '',
  ...props 
}) => {
  const centeredClasses = [
    'centered-layout',
    `centered-layout--${maxWidth}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <Layout 
      className={centeredClasses}
      containerized={false}
      showFooter={false}
      {...props}
    >
      <div className="centered-layout-content">
        {children}
      </div>
    </Layout>
  );
};

/**
 * Full Width Layout component for landing pages, etc.
 */
const FullWidthLayout = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <Layout 
      className={`full-width-layout ${className}`}
      containerized={false}
      {...props}
    >
      {children}
    </Layout>
  );
};

// Attach sub-components to main Layout component
Layout.Page = PageLayout;
Layout.Centered = CenteredLayout;
Layout.FullWidth = FullWidthLayout;

export default Layout;