import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../../Context';
import { Button } from '../ui';
import './Navigation.css';
import logo from '../../logo.png';

/**
 * Enhanced Navigation component with responsive behavior
 * Supports mobile hamburger menu, accessibility, and modern UX patterns
 */
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, cart, logout } = useContext(Context);
  const location = useLocation();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (logout) {
      logout(e);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false);
  };

  // Calculate total quantity of items in cart
  const cartTotalQuantity = Object.values(cart).reduce((total, item) => {
    return total + (item.amount || 1);
  }, 0);

  // Determine badge styling based on count
  const getBadgeClass = (count) => {
    let baseClass = 'navbar-cart-badge';
    if (count > 99) {
      baseClass += ' navbar-cart-badge--large';
    }
    if (count > 10) {
      baseClass += ' navbar-cart-badge--warning';
    }
    if (count > 20) {
      baseClass += ' navbar-cart-badge--danger';
    }
    return baseClass;
  };

  const getMobileBadgeClass = (count) => {
    let baseClass = 'navbar-mobile-cart-badge';
    if (count > 99) {
      baseClass += ' navbar-mobile-cart-badge--large';
    }
    return baseClass;
  };

  // Format count display (show 99+ for counts over 99)
  const formatCount = (count) => {
    return count > 99 ? '99+' : count.toString();
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-container">
        {/* Brand Section */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-brand-link" aria-label="Bhanumati ka Pitara - Home">
            <img 
              src={logo} 
              alt="Bhanumati ka Pitara Logo" 
              className="navbar-logo"
            />
            <span className="navbar-brand-text">
              Bhanumati ka Pitara
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-burger ${isMobileMenuOpen ? 'navbar-burger--active' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            ref={mobileMenuRef}
          >
            <span className="navbar-burger-line" aria-hidden="true"></span>
            <span className="navbar-burger-line" aria-hidden="true"></span>
            <span className="navbar-burger-line" aria-hidden="true"></span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu navbar-menu--desktop">
          <div className="navbar-nav">
            <Link 
              to="/products" 
              className={`navbar-link ${isActivePath('/products') ? 'navbar-link--active' : ''}`}
            >
              Products
            </Link>

            {user && user.accessLevel < 1 && (
              <Link 
                to="/add-product" 
                className={`navbar-link ${isActivePath('/add-product') ? 'navbar-link--active' : ''}`}
              >
                Add Product
              </Link>
            )}

            {user && user.accessLevel >= 1 && (
              <Link 
                to="/smart-bag" 
                className={`navbar-link ${isActivePath('/smart-bag') ? 'navbar-link--active' : ''}`}
              >
                Smart Bag
              </Link>
            )}

            {user && user.accessLevel >= 1 && (
              <Link 
                to="/order-history" 
                className={`navbar-link ${isActivePath('/order-history') ? 'navbar-link--active' : ''}`}
              >
                Order History
              </Link>
            )}
          </div>

          <div className="navbar-actions">
            {/* Cart Link */}
            <Link 
              to="/cart" 
              className={`navbar-cart ${isActivePath('/cart') ? 'navbar-cart--active' : ''}`}
              aria-label={`Shopping cart with ${cartTotalQuantity} items`}
            >
              <svg className="navbar-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="navbar-cart-text">Cart</span>
              {cartTotalQuantity > 0 && (
                <span 
                  className={getBadgeClass(cartTotalQuantity)} 
                  aria-label={`${cartTotalQuantity} items in cart`}
                >
                  {formatCount(cartTotalQuantity)}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="navbar-user-menu" ref={userMenuRef}>
                <button
                  className="navbar-user-button"
                  onClick={toggleUserMenu}
                  aria-label="User account menu"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="navbar-user-avatar">
                    {user.email && user.email.charAt(0).toUpperCase()}
                  </div>
                  <svg className="navbar-user-chevron" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="navbar-user-dropdown" role="menu">
                    <div className="navbar-user-info">
                      <span className="navbar-user-email">{user.email}</span>
                    </div>
                    <div className="navbar-user-divider"></div>
                    <Link 
                      to="/profile" 
                      className="navbar-user-dropdown-item"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="navbar-user-dropdown-item"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <div className="navbar-user-divider"></div>
                    <button 
                      className="navbar-user-dropdown-item navbar-user-dropdown-item--logout"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth-buttons">
                <Link to="/login">
                  <Button variant="ghost" size="small">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="small">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`navbar-menu navbar-menu--mobile ${isMobileMenuOpen ? 'navbar-menu--mobile-open' : ''}`}>
          <div className="navbar-mobile-content">
            <div className="navbar-mobile-nav">
              <Link 
                to="/products" 
                className={`navbar-mobile-link ${isActivePath('/products') ? 'navbar-mobile-link--active' : ''}`}
              >
                Products
              </Link>

              {user && user.accessLevel < 1 && (
                <Link 
                  to="/add-product" 
                  className={`navbar-mobile-link ${isActivePath('/add-product') ? 'navbar-mobile-link--active' : ''}`}
                >
                  Add Product
                </Link>
              )}

              {user && user.accessLevel >= 1 && (
                <Link 
                  to="/smart-bag" 
                  className={`navbar-mobile-link ${isActivePath('/smart-bag') ? 'navbar-mobile-link--active' : ''}`}
                >
                  Smart Bag
                </Link>
              )}

              {user && user.accessLevel >= 1 && (
                <Link 
                  to="/order-history" 
                  className={`navbar-mobile-link ${isActivePath('/order-history') ? 'navbar-mobile-link--active' : ''}`}
                >
                  Order History
                </Link>
              )}

              <Link 
                to="/cart" 
                className={`navbar-mobile-link ${isActivePath('/cart') ? 'navbar-mobile-link--active' : ''}`}
              >
                <div className="navbar-mobile-cart">
                  <span>Cart</span>
                  {cartTotalQuantity > 0 && (
                    <span className={getMobileBadgeClass(cartTotalQuantity)}>
                      {formatCount(cartTotalQuantity)}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <div className="navbar-mobile-actions">
              {user ? (
                <div className="navbar-mobile-user">
                  <div className="navbar-mobile-user-info">
                    <div className="navbar-mobile-user-avatar">
                      {user.email && user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="navbar-mobile-user-email">{user.email}</span>
                  </div>
                  <div className="navbar-mobile-user-links">
                    <Link to="/profile" className="navbar-mobile-user-link">
                      Profile
                    </Link>
                    <Link to="/settings" className="navbar-mobile-user-link">
                      Settings
                    </Link>
                    <button 
                      className="navbar-mobile-user-link navbar-mobile-logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="navbar-mobile-auth">
                  <Link to="/login" className="navbar-mobile-auth-link">
                    <Button variant="outline" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="navbar-mobile-auth-link">
                    <Button variant="primary" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="navbar-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navigation;